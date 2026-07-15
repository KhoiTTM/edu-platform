"use server";

import { createClient } from "@/lib/supabase/server";
import * as fs from "fs";
import * as path from "path";

// Đọc phiếu đáp án từ content/<slug>-answers.json (KHÔNG chứa đề bài — xem file đó).
export async function getBookAnswerSheet(slug: string) {
  try {
    const p = path.join(process.cwd(), "content", `${slug}-answers.json`);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    console.error("[getBookAnswerSheet]", e);
    return null;
  }
}

// Lưu lịch sử làm bài "Luyện tập theo sách" vào learning_sessions.
// Dùng type='exam' để trang chủ + phụ huynh (vốn chỉ nhận diện type='exam') hiển thị điểm.
export async function saveBookPracticeAttempt(
  slug: string,
  subjectSlug: string,
  unit: number,
  unitTitle: string,
  score: number,
  total: number,
  detail: any[],
  durationSeconds?: number
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const now = new Date();
  const duration = durationSeconds ?? 0;
  const startedAt = new Date(now.getTime() - duration * 1000);
  const { error } = await supabase.from("learning_sessions").insert({
    user_id: user.id,
    subject_slug: subjectSlug,
    started_at: startedAt.toISOString(),
    ended_at: now.toISOString(),
    duration_seconds: duration,
    summary_metrics: {
      type: "exam",
      sub_type: "book_practice",
      book_slug: slug,
      unit,
      unit_topic: unitTitle,
      score,
      total,
      answers: detail,
    },
  });

  if (error) {
    console.error("[saveBookPracticeAttempt] insert error:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
