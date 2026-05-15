/**
 * Tạo file SQL seed Toán 3 tập 1.
 * Chạy: npx tsx scripts/generate-toan3-sql.ts
 */
import { writeFileSync } from "fs";
import { expandToAppLessons } from "../lib/curriculum/toan3-tap1";

const SUBJECT_ID = "cccccccc-cccc-cccc-cccc-cccccccc3001";
const rows = expandToAppLessons();

function esc(s: string) {
  return s.replace(/'/g, "''");
}

function lessonUuid(index: number) {
  const n = String(index).padStart(4, "0");
  return `a3b1${n}-0000-4000-8000-000000000001`;
}

function quizUuid(index: number) {
  const n = String(index).padStart(4, "0");
  return `a3c1${n}-0000-4000-8000-000000000001`;
}

const lines: string[] = [];
lines.push(`-- Toán lớp 3 Tập 1 — ${rows.length} bài học trên app (mỗi video = 1 bài)`);
lines.push(`-- Chạy sau 003_subjects_textbook.sql`);
lines.push("");

lines.push(`alter table public.lessons
  add column if not exists book_lesson_number int,
  add column if not exists topic_label text,
  add column if not exists video_part smallint not null default 0;
`);
lines.push("");

lines.push(`delete from public.quiz_questions where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'toan' and l.volume = 1
);`);
lines.push(`delete from public.quiz_attempts where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'toan' and l.volume = 1
);`);
lines.push(`delete from public.quizzes where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1
);`);
lines.push(`delete from public.schedule_entries where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1
);`);
lines.push(`delete from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1;`);
lines.push("");

for (const r of rows) {
  const lessonId = lessonUuid(r.lesson_index);
  const quizId = quizUuid(r.lesson_index);
  const yt = r.youtube_video_id ? `'${r.youtube_video_id}'` : "null";

  lines.push(`insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  '${lessonId}', 3,
  '${esc(r.title)}',
  '${esc(r.summary)}',
  ${yt},
  'toan', 'Toán',
  ${r.lesson_index}, 1,
  '${esc(r.page_hint)}',
  '${SUBJECT_ID}',
  null,
  ${r.book_lesson_number},
  '${esc(r.topic_label)}',
  ${r.video_part}
);`);

  lines.push(`insert into public.quizzes (id, lesson_id, title) values (
  '${quizId}', '${lessonId}', 'Ôn tập: Bài ${r.book_lesson_number}'
);`);

  r.practice.forEach((q, qi) => {
    const opts = JSON.stringify(q.options).replace(/'/g, "''");
    lines.push(`insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  '${quizId}',
  '${esc(q.question)}',
  '${opts}'::jsonb,
  ${q.correct_index},
  ${qi},
  '${esc(q.explanation)}'
);`);
  });
  lines.push("");
}

const out = "supabase/migrations/004_toan3_tap1_curriculum.sql";
writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${rows.length} lessons to ${out}`);
