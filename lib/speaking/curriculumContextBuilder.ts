import { ieltsTranscripts } from "../ieltsTranscripts";
import { getScriptForUnit } from "../ieltsQuizzes";

export interface CurriculumContext {
  topic: string;
  vocabulary: string[];
  targetExpressions: string[];
  communicativeGoals: string[];
  transcriptHighlights: string[];
  sentenceStarters: string[];
}

const UNIT_STARTERS: Record<number, string[]> = {
  1: ["I usually...", "In the morning, I always...", "My daily routine is...", "I'd say I often..."],
  2: ["I live in a...", "My home is in...", "My favorite room is...", "It's located near..."],
  3: ["In my free time, I love...", "I'm really into...", "I recently started...", "What I enjoy most is..."],
  4: ["My favorite trip was...", "I prefer traveling by...", "One time, I went to...", "I'd love to visit..."],
  5: ["My favorite dish is...", "I usually eat...", "I really enjoy cooking...", "I'd prefer to eat..."],
  6: ["I normally commute by...", "The traffic here is...", "Public transport is...", "I prefer driving because..."],
  7: ["In the future, I want to be...", "My dream job is...", "I think working as a...", "The best part of this job is..."],
  8: ["To stay healthy, I...", "I try to avoid...", "I think exercising is...", "When I feel stressed, I..."],
  9: ["Learning English is...", "I find it difficult to...", "The best way to learn is...", "I hope to become fluent in..."],
  10: ["I use my phone to...", "The best gadget I own is...", "Technology makes it easier to...", "In the future, I think..."]
};

export function buildCurriculumContext(unitId: string | number): CurriculumContext {
  const normalizedUnit = typeof unitId === 'string' ? parseInt(unitId.replace("unit-", ""), 10) : unitId;
  const unitNum = isNaN(normalizedUnit) ? 1 : Math.max(1, Math.min(10, normalizedUnit));

  // We use dummy student name since we only need the metadata, not the personalized steps
  const script = getScriptForUnit(unitNum, "Learner", "");
  
  // Mapping unit numbers to video IDs in transcripts
  const unitToVideoMap: Record<number, string[]> = {
    1: ["2r7kEF70Afs"],
    2: ["RCuvLzqdBZ8", "LRPNZf_5j-I"],
    3: ["gzoYfpWvh7Q"],
    4: ["rkOatFNUGt4"],
    5: ["RXLcmf5GZQ", "WnqLsvQuwZk"],
    6: ["_f8Ciy-r8bM"],
    7: ["jsjIWseiTfM"],
    8: ["SPurU5V7pxw", "mWPZhFuPkF0"],
    9: ["unit-9-placeholder"], 
    10: ["wr8M6uUzHnY", "ZN_why11kpc"]
  };

  const videoIds = unitToVideoMap[unitNum] || [];
  
  const vocabSet = new Set<string>();
  const expressionsSet = new Set<string>();
  const highlights: string[] = [];

  // Add vocab from script
  vocabSet.add(script.vocabularyWord);
  
  // Communicative goals based on grammar rule
  const topicClean = script.unitTitle.split('(')[0].trim();
  const goals = [
    `Naturally use language related to: ${topicClean}`,
    `Demonstrate understanding of: ${script.grammarRule}`,
    `Express personal thoughts and experiences about the unit topic`
  ];

  for (const vid of videoIds) {
    const transcript = ieltsTranscripts[vid];
    if (transcript) {
      transcript.keyVocabulary.forEach(v => vocabSet.add(v.word));
      
      transcript.lines.forEach(line => {
        if (line.keyPhrase) {
          expressionsSet.add(line.keyPhrase);
        }
        // Save a few interesting lines as highlights to ground the conversation
        if (highlights.length < 4 && line.english.length > 25) {
          highlights.push(line.english);
        }
      });
    }
  }

  return {
    topic: topicClean,
    vocabulary: Array.from(vocabSet),
    targetExpressions: Array.from(expressionsSet),
    communicativeGoals: goals,
    transcriptHighlights: highlights,
    sentenceStarters: UNIT_STARTERS[unitNum] || UNIT_STARTERS[1]
  };
}

export function formatContextForPrompt(context: CurriculumContext): string {
  return `
CURRICULUM GROUNDING CONTEXT:
- Unit Topic: ${context.topic}
- Core Vocabulary (Try to naturally reuse these): ${context.vocabulary.join(", ")}
- Target Expressions (Subtly reinforce these): ${context.targetExpressions.join(", ")}
- Communicative Goals: ${context.communicativeGoals.join(" | ")}
- Transcript Highlights (You may echo or paraphrase these ideas):
  ${context.transcriptHighlights.map(h => `"${h}"`).join("\n  ")}
`;
}
