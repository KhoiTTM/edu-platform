import { NextResponse } from 'next/server';
import { submitAssessmentSession } from '@/lib/assessment/engine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, answers } = body;

    if (!sessionId || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Missing or invalid sessionId or answers' }, { status: 400 });
    }

    const result = await submitAssessmentSession(
      'mock-user-id', // In a real app, get from Supabase auth session
      sessionId,
      answers
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
