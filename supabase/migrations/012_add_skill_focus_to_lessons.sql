-- Add skill_focus column to lessons
alter table public.lessons
  add column if not exists skill_focus text;

-- Optionally add constraint or index
create index if not exists idx_lessons_skill_focus on public.lessons (skill_focus);
