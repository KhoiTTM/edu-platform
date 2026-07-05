import { createClient } from '@supabase/supabase-js';

// Migration script to move legacy IELTS lessons/quizzes to Universal Engine
// Usage: npx tsx scripts/migrate-ielts-to-universal.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("🚀 Starting IELTS Migration to Universal Engine...");

  // 1. Ensure Subject exists
  const { data: subject } = await supabase
    .from('universal_subjects')
    .upsert({ slug: 'mindset-ielts', name_vi: 'IELTS Mindset', icon: '🎓' }, { onConflict: 'slug' })
    .select().single();

  // 2. Ensure Source exists
  const { data: source } = await supabase
    .from('content_sources')
    .upsert({ 
        subject_id: subject!.id, 
        slug: 'mindset-foundation', 
        name: 'Mindset for IELTS Foundation' 
    }, { onConflict: 'slug' })
    .select().single();

  // 3. Create Root Node
  const { data: rootNode } = await supabase
    .from('curriculum_nodes')
    .upsert({
        source_id: source!.id,
        type: 'course',
        slug: 'ielts-foundation',
        title: 'IELTS Foundation',
        path: 'ielts',
        depth: 0
    }, { onConflict: 'source_id,slug' })
    .select().single();

  // 4. Fetch legacy IELTS lessons
  const { data: legacyLessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject_slug', 'mindset-ielts')
    .order('lesson_index', { ascending: true });

  if (!legacyLessons) return;

  console.log(`Found ${legacyLessons.length} legacy lessons.`);

  for (const lesson of legacyLessons) {
    // Create Unit Node
    const unitSlug = `unit-${lesson.book_lesson_number || lesson.lesson_index}`;
    const { data: unitNode } = await supabase
      .from('curriculum_nodes')
      .upsert({
          source_id: source!.id,
          parent_id: rootNode!.id,
          type: 'unit',
          slug: unitSlug,
          title: lesson.title,
          path: `ielts.${unitSlug.replace(/-/g, '_')}`,
          depth: 1,
          sort_key: lesson.lesson_index,
          metadata: {
              legacy_id: lesson.id,
              youtube_id: lesson.youtube_video_id,
              skill_focus: lesson.skill_focus
          }
      }, { onConflict: 'source_id,slug' })
      .select().single();

    // Link Legacy Lesson to this Node
    await supabase.from('node_lessons').upsert({
        node_id: unitNode!.id,
        lesson_id: lesson.id
    }, { onConflict: 'node_id,lesson_id' });

    // 5. Migrate Quizzes to Exercise Sets
    const { data: legacyQuizzes } = await supabase
      .from('quizzes')
      .select('*')
      .eq('lesson_id', lesson.id);

    if (legacyQuizzes) {
        for (const quiz of legacyQuizzes) {
            const { data: exSet } = await supabase
              .from('exercise_sets')
              .upsert({
                  title: quiz.title,
                  type: 'quiz',
                  metadata: { legacy_quiz_id: quiz.id, node_id: unitNode!.id }
              })
              .select().single();

            // Fetch questions
            const { data: questions } = await supabase
              .from('quiz_questions')
              .select('id, order_index')
              .eq('quiz_id', quiz.id);
            
            if (questions) {
                for (const q of questions) {
                    await supabase.from('exercise_questions').upsert({
                        set_id: exSet!.id,
                        question_id: q.id,
                        sort_key: q.order_index
                    }, { onConflict: 'set_id,question_id' });
                }
            }
        }
    }
    console.log(`Migrated ${lesson.title}`);
  }

  console.log("✅ IELTS Migration Complete!");
}

migrate().catch(console.error);
