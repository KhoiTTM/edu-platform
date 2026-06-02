import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("🚀 Cleaning up assessment_collections subject_slugs...");

  const { data: collections, error } = await supabase
    .from('assessment_collections')
    .select('id, title, subject_slug, grade');

  if (error) {
    console.error("Error fetching collections:", error);
    return;
  }

  let updatedCount = 0;

  for (const c of collections || []) {
    let targetSlug = c.subject_slug;
    let targetTitle = c.title;

    // Fix collection for Grade 7 math if it was hijacked
    if (c.id === '1a3522d0-7aab-4d0b-bdbf-4b6db5904940') {
      targetSlug = 'toan';
      targetTitle = 'Toán 7 - Tập 1';
    } else if (c.title.toUpperCase().startsWith('ENGLISH') || c.title.toUpperCase().startsWith('TIẾNG ANH')) {
      targetSlug = 'tieng_anh';
    } else if (c.title.toUpperCase().startsWith('MATH') || c.title.toUpperCase().startsWith('TOÁN')) {
      targetSlug = 'toan';
    }

    if (targetSlug !== c.subject_slug || targetTitle !== c.title) {
      console.log(`Fixing collection: "${c.title}" (ID: ${c.id}) -> Subject: ${targetSlug}, Title: ${targetTitle}`);
      const { error: updateError } = await supabase
        .from('assessment_collections')
        .update({ subject_slug: targetSlug, title: targetTitle })
        .eq('id', c.id);

      if (updateError) {
        console.error(`  - ❌ Error updating collection ${c.id}:`, updateError.message);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`\n✅ Completed database cleanup. Updated ${updatedCount} collections.`);
}

run().catch(console.error);
