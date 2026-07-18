"use server";

import { createClient } from "@/lib/supabase/server";
import type { AdviceData, SentenceItem, WordItem } from "./shadowingTypes";

export async function getShadowingLesson(lessonSlug: string): Promise<AdviceData | null> {
  const supabase = await createClient();

  // 1. Fetch the lesson metadata
  const { data: lesson, error: lessonErr } = await supabase
    .from("shadowing_lessons")
    .select("id, title, audio_url, repeat_offset")
    .eq("slug", lessonSlug)
    .maybeSingle();

  if (lessonErr || !lesson) {
    // Fallback: If not found, fetch the default lesson
    const { data: defaultLesson, error: defaultErr } = await supabase
      .from("shadowing_lessons")
      .select("id, title, audio_url, repeat_offset")
      .eq("slug", "luyen-nghe-a2-tong-ket-2025")
      .maybeSingle();

    if (defaultErr || !defaultLesson) return null;
    return fetchLessonData(defaultLesson.id, defaultLesson.title, defaultLesson.audio_url, defaultLesson.repeat_offset);
  }

  return fetchLessonData(lesson.id, lesson.title, lesson.audio_url, lesson.repeat_offset);
}

async function fetchLessonData(
  lessonId: string, 
  title: string, 
  audioUrl: string, 
  repeatOffset: number
): Promise<AdviceData | null> {
  const supabase = await createClient();

  // 2. Fetch all sentences belonging to the lesson
  const { data: sentences, error: sentencesErr } = await supabase
    .from("shadowing_sentences")
    .select("sentence_index, start_time_ms, end_time_ms, content, content_vi, words_jsonb")
    .eq("lesson_id", lessonId)
    .order("sentence_index", { ascending: true });

  if (sentencesErr || !sentences) {
    return null;
  }

  // 3. Map to AdviceData schema format
  const mappedSentences: SentenceItem[] = sentences.map((s: any) => ({
    index: s.sentence_index,
    start: s.start_time_ms,
    end: s.end_time_ms,
    content: s.content,
    contentVi: s.content_vi,
    words: s.words_jsonb as WordItem[]
  }));

  return {
    title,
    audio_url: audioUrl,
    repeat_offset: repeatOffset,
    sentences: mappedSentences
  };
}
