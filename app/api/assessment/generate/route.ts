import { NextResponse } from 'next/server';
import { GenerationEngine, GenerationRequest } from '@/lib/assessment/generation-engine';

/**
 * POST /api/assessment/generate
 * Generates an exam draft based on teacher requirements.
 */
export async function POST(request: Request) {
  try {
    const body: GenerationRequest = await request.json();

    if (!body.subject || !body.grade || !body.unitNumbers || !body.count) {
      return NextResponse.json({ error: "Missing required fields: subject, grade, unitNumbers, count" }, { status: 400 });
    }

    const engine = new GenerationEngine();
    const draft = await engine.generateDraft(body);

    return NextResponse.json(draft);
  } catch (error: any) {
    console.error("Assessment Generation API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
