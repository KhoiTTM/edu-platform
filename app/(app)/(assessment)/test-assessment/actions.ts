"use server";

import { createClient } from "@/lib/supabase/server";

export async function getExamInfo(examId: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('exams').select('title, assessment_collections(subject_slug, exam_type, grade)').eq('id', examId).single();
  const subjectSlug = (data?.assessment_collections as any)?.subject_slug || "toan";
  const examType = (data?.assessment_collections as any)?.exam_type || "lesson";
  const grade = (data?.assessment_collections as any)?.grade || 3;
  return { title: data?.title || "Bài Kiểm Tra", subjectSlug, examType, grade };
}

export async function getExamQuestions(examId: string) {
  console.log(`
--- [ACTION] getExamQuestions for examId: ${examId} ---`);
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('exam_questions')
    .select(`
      question_bank_id,
      order_index,
      question_bank (
        id,
        type,
        metadata_json,
        concept_id
      )
    `)
    .eq('exam_id', examId)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('  [ACTION-LOG] Error fetching exam questions:', error);
    return [];
  }

  // Lấy dữ liệu assessment làm gốc, giữ nguyên metadata_json
  const questions = data.map((eq: any) => ({
    id: eq.question_bank.id,
    type: eq.question_bank.type,
    concept_id: eq.question_bank.concept_id,
    ...eq.question_bank.metadata_json // Spread các trường instruction/words hoặc question/options
  }));

  console.log(`  [ACTION-LOG] Successfully fetched ${questions.length} questions.`);
  return questions;
}

export async function saveExamResult(examId: string, score: number, total: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: examData } = await supabase
    .from('exams')
    .select('title, assessment_collections(subject_slug)')
    .eq('id', examId)
    .single();

  if (examData) {
    const coll = examData.assessment_collections as any;
    const subjectSlug = (Array.isArray(coll) ? coll[0]?.subject_slug : coll?.subject_slug) || 'tieng_anh';
    const now = new Date().toISOString();
    
    await supabase.from('learning_sessions').insert({
      user_id: user.id,
      subject_slug: subjectSlug,
      started_at: now,
      ended_at: now,
      summary_metrics: {
        type: 'exam',
        exam_id: examId,
        unit_topic: examData.title,
        score: score,
        total: total
      }
    });

    // ✅ Mark any daily_task with this exam as completed
    await supabase.rpc('complete_daily_task_by_exam', {
      p_student_id: user.id,
      p_exam_id: examId,
    });
  }
}
