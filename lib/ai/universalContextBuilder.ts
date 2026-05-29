import { createClient } from "@/lib/supabase/server";

export interface UniversalAIContext {
  userId: string;
  nodeTitle: string;
  conceptTitle: string;
  masteryScore: number;
  questionText: string;
  explanation: string;
}

/**
 * Builds a highly focused context string for the AI Tutor.
 * Combines curriculum data, learner's mastery, and current task state.
 */
export async function buildUniversalContext(
  userId: string, 
  nodeId: string, 
  questionId: string
): Promise<UniversalAIContext | null> {
  const supabase = await createClient();

  try {
    // 1. Fetch Node & Concept Info
    const { data: qData } = await supabase
      .from("quiz_questions")
      .select("question, explanation, concept_id")
      .eq("id", questionId)
      .single();

    const { data: nodeData } = await supabase
      .from("curriculum_nodes")
      .select("id, title, metadata")
      .eq("id", nodeId)
      .single();

    if (!qData || !nodeData) return null;

    // Try to find the associated concept
    // 1. Check question directly (Highest precision)
    // 2. Check bridge table for lesson
    // 3. Check node metadata
    let conceptId = qData.concept_id;
    
    if (!conceptId) {
      const { data: lc } = await supabase
        .from("lesson_concepts")
        .select("concept_id")
        .eq("lesson_id", nodeId)
        .limit(1)
        .maybeSingle();
      
      conceptId = lc?.concept_id || (nodeData.metadata as any)?.concept_id;
    }

    let conceptTitle = "General Topic";
    let masteryScore = 0;

    if (conceptId) {
      const { data: concept } = await supabase
        .from("concepts")
        .select("title")
        .eq("id", conceptId)
        .single();

      if (concept) conceptTitle = concept.title;

      // 2. Fetch User Mastery for this concept
      const { data: mastery } = await supabase
        .from("user_concept_mastery")
        .select("mastery_score")
        .eq("user_id", userId)
        .eq("concept_id", conceptId)
        .maybeSingle();

      if (mastery) masteryScore = mastery.mastery_score;
    }

    return {
      userId,
      nodeTitle: nodeData.title,
      conceptTitle,
      masteryScore,
      questionText: qData.question,
      explanation: qData.explanation || ""
    };
  } catch (err) {
    console.error("Context Builder Error:", err);
    return null;
  }
}

/**
 * Formats the context into a string for the AI prompt.
 */
export function formatUniversalContextForPrompt(ctx: UniversalAIContext): string {
  return `
--- LEARNER CONTEXT ---
- Current Lesson: ${ctx.nodeTitle}
- Target Concept: ${ctx.conceptTitle}
- Learner Mastery Score: ${ctx.masteryScore}/100
- Current Question: "${ctx.questionText}"
- Standard Explanation: "${ctx.explanation}"
-----------------------
`;
}
