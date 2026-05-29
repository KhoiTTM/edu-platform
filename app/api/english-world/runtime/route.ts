import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Runtime Selection Engine
 * Selects questions for a lesson session.
 * - For a normal lesson, it's 60% new concepts + 40% review concepts.
 * - For a review session, it's 100% review concepts for that subject.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const nodeId = searchParams.get('nodeId');
    const subject = searchParams.get('subject');
    const isReview = searchParams.get('isReview') === 'true';

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let conceptIds: string[] = [];

    if (isReview) {
        // Full review mode: fetch from user's queue for the specific subject
        if (!subject) return NextResponse.json({ error: "Subject is required for review" }, { status: 400 });

        const { data: reviewQueue } = await supabase
            .from('adaptive_review_queue')
            .select(`
                concept_id,
                curriculum_concepts!inner(
                    id, 
                    curriculum_lessons!inner(
                        unit_id,
                        curriculum_units!inner(
                            subject
                        )
                    )
                )
            `)
            .eq('user_id', user.id)
            .eq('curriculum_concepts.curriculum_lessons.curriculum_units.subject', subject)
            .order('priority', { ascending: false })
            .limit(10);
        
        conceptIds = reviewQueue?.map(r => r.concept_id) || [];

    } else if (nodeId) {
        // Normal Lesson: 60% new, 40% review
        const { data: lessonConcepts } = await supabase
            .from('curriculum_concepts')
            .select('id')
            .eq('lesson_id', nodeId);
        
        const newConcepts = lessonConcepts?.map(c => c.id) || [];

        const { data: reviewQueue } = await supabase
            .from('adaptive_review_queue')
            .select('concept_id')
            .eq('user_id', user.id)
            .limit(Math.floor(newConcepts.length * 0.4)); // 40% review

        const reviewConcepts = reviewQueue?.map(r => r.concept_id) || [];

        conceptIds = [...new Set([...newConcepts, ...reviewConcepts])];
    }

    if (conceptIds.length === 0) {
        return NextResponse.json({ steps: [] }); // Return empty if no concepts found
    }

    // Fetch pre-generated questions from bank for the selected concepts
    const { data: questions, error } = await supabase
        .from('question_bank')
        .select('*')
        .in('concept_id', conceptIds)
        .in('status', ['approved', 'draft']) // Get approved or draft questions
        .limit(20);

    if (error) throw error;

    // Shuffle and pick 8-10 for a good session
    const shuffled = (questions || []).sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    // Map to the StepData format the lesson engine expects
    const steps = selected.map(q => ({
        ...q.metadata_json,
        id: q.id, // Use question_bank ID as the unique key
        type: q.type, 
        concept_id: q.concept_id // Pass concept_id for result tracking
    }));

    return NextResponse.json({ steps });
  } catch (error: any) {
    console.error("Runtime Selection Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
