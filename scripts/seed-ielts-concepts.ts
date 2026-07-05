import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'zod'; // I'll use a simple approach for env if needed, but let's assume we can use process.env

// Simple script to seed some IELTS concepts and map them to Unit 1
// Usage: npx tsx scripts/seed-ielts-concepts.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Need service role to bypass RLS for seeding

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🚀 Seeding IELTS concepts...");

  // 1. Create IELTS Subject
  const { data: subject, error: subjectError } = await supabase
    .from('universal_subjects')
    .upsert({ 
      slug: 'mindset-ielts', 
      name_vi: 'IELTS Mindset', 
      name_en: 'IELTS Mindset Foundation' 
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (subjectError) throw subjectError;
  console.log("✅ Subject IELTS ensured.");

  // 2. Create Content Source
  const { data: source, error: sourceError } = await supabase
    .from('content_sources')
    .upsert({ 
      subject_id: subject.id,
      slug: 'mindset-foundation',
      name: 'Mindset for IELTS Foundation',
      provider: 'Cambridge'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (sourceError) throw sourceError;
  console.log("✅ Content Source ensured.");

  // 3. Create Canonical Concepts
  const canonicals = [
    { slug: 'present-simple', title: 'Thì Hiện tại đơn', subject_id: subject.id },
    { slug: 'listening-numbers', title: 'Kỹ năng nghe Số và Thời gian', subject_id: subject.id },
    { slug: 'vocab-daily-life', title: 'Từ vựng Đời sống hàng ngày', subject_id: subject.id }
  ];

  const { data: canonicalData, error: canonicalError } = await supabase
    .from('canonical_concepts')
    .upsert(canonicals, { onConflict: 'slug' })
    .select();

  if (canonicalError) throw canonicalError;
  console.log("✅ Canonical Concepts ensured.");

  // 4. Create Specific Concepts and map them
  for (const can of canonicalData) {
    const { data: concept, error: conceptError } = await supabase
      .from('concepts')
      .upsert({
        source_id: source.id,
        slug: `ielts-${can.slug}`,
        title: can.title,
        metadata: { ielts_focus: true }
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (conceptError) {
      console.warn(`Failed to seed concept ${can.slug}:`, conceptError.message);
      continue;
    }

    // Map Variant
    await supabase.from('concept_variants').upsert({
      canonical_id: can.id,
      concept_id: concept.id
    }, { onConflict: 'canonical_id,concept_id' });
  }
  console.log("✅ Concepts and Variants ensured.");

  // 5. Map to Unit 1
  const unit1LessonId = 'aaaaaaaa-aaaa-aaaa-aaaa-0000ee000102';
  
  // Get the concept IDs we just created
  const { data: createdConcepts } = await supabase
    .from('concepts')
    .select('id, slug')
    .in('slug', ['ielts-present-simple', 'ielts-listening-numbers', 'ielts-vocab-daily-life']);

  if (createdConcepts) {
    for (const concept of createdConcepts) {
      await supabase.from('lesson_concepts').upsert({
        lesson_id: unit1LessonId,
        concept_id: concept.id
      }, { onConflict: 'lesson_id,concept_id' });
    }
    console.log(`✅ Unit 1 mapped to ${createdConcepts.length} concepts.`);
  }
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
