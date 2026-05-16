-- Lịch học theo tuần: Toán lớp 3 tập 1, Thứ 2–Thứ 6, 10:00
-- Mốc: 01/06/2026 (Thứ Hai) = Tuần 1, mỗi ngày 1 tiết Toán → lesson_index 1..55

create table if not exists public.weekly_lesson_schedule (
  id uuid primary key default gen_random_uuid(),
  grade smallint not null check (grade in (3, 7)),
  subject_slug text not null,
  volume smallint not null default 1 check (volume in (1, 2)),
  term_start_date date not null default '2026-06-01',
  week_number int not null check (week_number >= 1),
  weekday smallint not null check (weekday between 1 and 5),
  lesson_index int not null,
  start_time time not null default '10:00:00',
  end_time time not null default '10:45:00',
  unique (grade, subject_slug, volume, term_start_date, week_number, weekday)
);

create index if not exists weekly_schedule_grade_subject_idx
  on public.weekly_lesson_schedule (grade, subject_slug, volume, term_start_date);

alter table public.weekly_lesson_schedule enable row level security;

drop policy if exists "weekly_schedule_select_grade" on public.weekly_lesson_schedule;
create policy "weekly_schedule_select_grade" on public.weekly_lesson_schedule
  for select using (
    auth.role() = 'authenticated'
    and grade = (select p.grade from public.profiles p where p.id = auth.uid())
  );

insert into public.weekly_lesson_schedule (
  grade, subject_slug, volume, term_start_date, week_number, weekday, lesson_index, start_time, end_time
)
select
  3, 'toan', 1, '2026-06-01'::date,
  (n + 4) / 5 as week_number,
  ((n - 1) % 5) + 1 as weekday,
  n as lesson_index,
  '10:00:00'::time,
  '10:45:00'::time
from generate_series(1, 55) as n
on conflict (grade, subject_slug, volume, term_start_date, week_number, weekday) do update set
  lesson_index = excluded.lesson_index,
  start_time = excluded.start_time,
  end_time = excluded.end_time;
