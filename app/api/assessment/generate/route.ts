import { NextResponse } from 'next/server';
import { GenerationEngine, GenerationRequest } from '@/lib/assessment/generation-engine';
import { QuestionBankSearchService } from '@/lib/assessment/search-service';

/**
 * POST /api/assessment/generate
 * Generates an exam draft based on teacher requirements, OR practice questions for students.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Student Practice Request
    if (body.subjectSlug && body.conceptIds) {
      const searchService = new QuestionBankSearchService();
      const questions = await searchService.findQuestionsByConcepts(body.conceptIds, body.count || 15);
      return NextResponse.json({
        id: "practice_" + Date.now(),
        title: "Luyện tập",
        questions: questions
      });
    }

    // 2. Teacher Assessment Studio Request
    if (!body.subject || !body.grade || !body.unitNumbers || !body.count) {
      return NextResponse.json({ error: "Missing required fields: subject, grade, unitNumbers, count" }, { status: 400 });
    }

    const engine = new GenerationEngine();
    const draft = await engine.generateDraft(body as GenerationRequest);

    return NextResponse.json(draft);
  } catch (error: any) {
    console.error("Assessment Generation API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
