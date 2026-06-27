/**
 * Script to sync existing flipbook JSON data to Supabase
 * Run: npx tsx scripts/sync-flipbooks-to-db.ts
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncKHTN7() {
  console.log('🔄 Syncing KHTN 7 SBT...');

  // Load metadata
  const metadataPath = path.join(process.cwd(), 'public/book/metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  // Get or create flipbook record
  const { data: flipbooks, error: fbError } = await supabase
    .from('flipbooks')
    .select('id')
    .eq('slug', 'khtn-7-sbt')
    .single();

  if (fbError && fbError.code !== 'PGRST116') {
    throw fbError;
  }

  let flipbookId: string;

  if (!flipbooks) {
    const { data: newFlipbook, error: insertError } = await supabase
      .from('flipbooks')
      .insert({
        slug: 'khtn-7-sbt',
        title: metadata.title,
        grade: 7,
        subject_slug: 'khtn',
        total_pages: metadata.pages.length
      })
      .select('id')
      .single();

    if (insertError) throw insertError;
    flipbookId = newFlipbook.id;
    console.log(`✅ Created flipbook: ${flipbookId}`);
  } else {
    flipbookId = flipbooks.id;
    console.log(`✅ Found existing flipbook: ${flipbookId}`);
  }

  // Sync pages
  console.log(`📄 Syncing ${metadata.pages.length} pages...`);
  for (const page of metadata.pages) {
    const { error: pageError } = await supabase
      .from('flipbook_pages')
      .upsert(
        {
          flipbook_id: flipbookId,
          page_number: page.id,
          image_url: page.image
        },
        { onConflict: 'flipbook_id,page_number' }
      );

    if (pageError) console.error(`Error syncing page ${page.id}:`, pageError);
  }

  // Sync hotspots
  console.log(`🎯 Syncing hotspots...`);
  const hotspotsDir = path.join(process.cwd(), 'public/book/hotspots');
  const hotspotsFiles = fs.readdirSync(hotspotsDir).filter(f => f.endsWith('.json'));

  for (const file of hotspotsFiles) {
    const pageMatch = file.match(/page_(\d+)/);
    if (!pageMatch) continue;

    const pageNumber = parseInt(pageMatch[1]);
    const hotspotsData = JSON.parse(fs.readFileSync(path.join(hotspotsDir, file), 'utf-8'));

    for (const hotspot of hotspotsData.elements || []) {
      const { error: hsError } = await supabase
        .from('flipbook_hotspots')
        .upsert(
          {
            flipbook_id: flipbookId,
            page_number: pageNumber,
            hotspot_id: hotspot.id,
            type: hotspot.type,
            bbox: hotspot.bbox,
            label: hotspot.label,
            correct_answer: hotspot.correctAnswer
          },
          { onConflict: 'flipbook_id,page_number,hotspot_id' }
        );

      if (hsError) console.error(`Error syncing hotspot ${hotspot.id}:`, hsError);
    }
  }

  console.log('✨ Sync complete!');
}

syncKHTN7().catch(console.error);
