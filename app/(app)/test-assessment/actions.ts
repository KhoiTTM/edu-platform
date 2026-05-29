"use server";

import { createClient } from "@/lib/supabase/server";

export async function getExamInfo(examId: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('exams').select('title').eq('id', examId).single();
  return data?.title || "Bài Kiểm Tra";
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
    const subjectSlug = examData.assessment_collections?.subject_slug || 'tieng_anh';
    const now = new Date().toISOString();
    
    await supabase.from('learning_sessions').insert({
      user_id: user.id,
      subject_slug: subjectSlug,
      started_at: now,
      ended_at: now,
      summary_metrics: {
        type: 'exam',
        unit_topic: examData.title,
        score: score,
        total: total
      }
    });
  }
}
