-- Toán lớp 3 Tập 1 — 55 bài học trên app (mỗi video = 1 bài)
-- Chạy sau 003_subjects_textbook.sql

alter table public.lessons
  add column if not exists book_lesson_number int,
  add column if not exists topic_label text,
  add column if not exists video_part smallint not null default 0;


delete from public.quiz_questions where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'toan' and l.volume = 1
);
delete from public.quiz_attempts where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'toan' and l.volume = 1
);
delete from public.quizzes where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1
);
delete from public.schedule_entries where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1
);
delete from public.lessons where grade = 3 and subject_slug = 'toan' and volume = 1;

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10001-0000-4000-8000-000000000001', 3,
  'Bài 1: Ôn tập các số đến 1 000 — Luyện tập (trang 6–7)',
  'Xem video và đọc sách Trang 6.',
  'WXd0BHS8eFc',
  'toan', 'Toán',
  1, 1,
  'Trang 6',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  1,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10001-0000-4000-8000-000000000001', 'a3b10001-0000-4000-8000-000000000001', 'Ôn tập: Bài 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số 999 liền sau là:',
  '["998","1000","990","1001"]'::jsonb,
  1,
  0,
  'Liền sau = cộng 1: 999 + 1 = 1000.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Trong số 735, chữ số 3 có giá trị:',
  '["3","30","300","700"]'::jsonb,
  1,
  1,
  'Chữ số 3 ở hàng chục → giá trị 30.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10002-0000-4000-8000-000000000001', 3,
  'Bài 1: Ôn tập các số đến 1 000 — Luyện tập tiếp (trang 8)',
  'Xem video và đọc sách Trang 6.',
  'Nd_nqrmqShg',
  'toan', 'Toán',
  2, 1,
  'Trang 6',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  1,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10002-0000-4000-8000-000000000001', 'a3b10002-0000-4000-8000-000000000001', 'Ôn tập: Bài 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số 999 liền sau là:',
  '["998","1000","990","1001"]'::jsonb,
  1,
  0,
  'Liền sau = cộng 1: 999 + 1 = 1000.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Trong số 735, chữ số 3 có giá trị:',
  '["3","30","300","700"]'::jsonb,
  1,
  1,
  'Chữ số 3 ở hàng chục → giá trị 30.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10003-0000-4000-8000-000000000001', 3,
  'Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1 000 — Ôn tập cộng, trừ',
  'Xem video và đọc sách Trang 9.',
  '0GFTtEFD4Bw',
  'toan', 'Toán',
  3, 1,
  'Trang 9',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  2,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10003-0000-4000-8000-000000000001', 'a3b10003-0000-4000-8000-000000000001', 'Ôn tập: Bài 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  '456 + 328 = ?',
  '["774","784","684","794"]'::jsonb,
  1,
  0,
  '6+8=14, viết 4 nhớ 1; 5+2+1=8; 4+3=7 → 784.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  '900 − 275 = ?',
  '["625","635","615","725"]'::jsonb,
  0,
  1,
  '0−5 mượn, 9−1−7=1 ở hàng trăm… → 625.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10004-0000-4000-8000-000000000001', 3,
  'Bài 3: Tìm thành phần trong phép cộng, phép trừ — Phần 1',
  'Xem video và đọc sách Trang 11.',
  '9fWxTEsAxqA',
  'toan', 'Toán',
  4, 1,
  'Trang 11',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  3,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10004-0000-4000-8000-000000000001', 'a3b10004-0000-4000-8000-000000000001', 'Ôn tập: Bài 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'x + 45 = 120. Tìm x:',
  '["65","75","165","55"]'::jsonb,
  1,
  0,
  'Số hạng chưa biết: x = 120 − 45 = 75.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'a − 32 = 48. Tìm a:',
  '["16","80","70","90"]'::jsonb,
  1,
  1,
  'Số bị trừ: a = 48 + 32 = 80.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10005-0000-4000-8000-000000000001', 3,
  'Bài 3: Tìm thành phần trong phép cộng, phép trừ — Tiếp theo',
  'Xem video và đọc sách Trang 11.',
  'm5cnILHDdko',
  'toan', 'Toán',
  5, 1,
  'Trang 11',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  3,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10005-0000-4000-8000-000000000001', 'a3b10005-0000-4000-8000-000000000001', 'Ôn tập: Bài 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'x + 45 = 120. Tìm x:',
  '["65","75","165","55"]'::jsonb,
  1,
  0,
  'Số hạng chưa biết: x = 120 − 45 = 75.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'a − 32 = 48. Tìm a:',
  '["16","80","70","90"]'::jsonb,
  1,
  1,
  'Số bị trừ: a = 48 + 32 = 80.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10006-0000-4000-8000-000000000001', 3,
  'Bài 4: Ôn tập bảng nhân 2; 5, bảng chia 2; 5 — Bảng nhân 2, 5 và chia 2, 5',
  'Xem video và đọc sách Trang 14.',
  'pU20z34l0A8',
  'toan', 'Toán',
  6, 1,
  'Trang 14',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  4,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10006-0000-4000-8000-000000000001', 'a3b10006-0000-4000-8000-000000000001', 'Ôn tập: Bài 4'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  '5 × 7 = ?',
  '["30","35","12","25"]'::jsonb,
  1,
  0,
  'Theo bảng nhân 5: 5 × 7 = 35.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  '20 : 5 = ?',
  '["4","5","15","25"]'::jsonb,
  0,
  1,
  '20 : 5 = 4 vì 5 × 4 = 20.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10007-0000-4000-8000-000000000001', 3,
  'Bài 5: Bảng nhân 3, bảng chia 3 — Phần 1',
  'Xem video và đọc sách Trang 16.',
  'xCAjEAcn2vk',
  'toan', 'Toán',
  7, 1,
  'Trang 16',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  5,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10007-0000-4000-8000-000000000001', 'a3b10007-0000-4000-8000-000000000001', 'Ôn tập: Bài 5'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  '3 × 8 = ?',
  '["21","24","27","11"]'::jsonb,
  1,
  0,
  'Bảng nhân 3: 3 × 8 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  '27 : 3 = ?',
  '["8","9","7","6"]'::jsonb,
  1,
  1,
  '27 : 3 = 9.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10008-0000-4000-8000-000000000001', 3,
  'Bài 5: Bảng nhân 3, bảng chia 3 — Tiếp theo',
  'Xem video và đọc sách Trang 16.',
  'gP0ncgW7lWc',
  'toan', 'Toán',
  8, 1,
  'Trang 16',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  5,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10008-0000-4000-8000-000000000001', 'a3b10008-0000-4000-8000-000000000001', 'Ôn tập: Bài 5'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  '3 × 8 = ?',
  '["21","24","27","11"]'::jsonb,
  1,
  0,
  'Bảng nhân 3: 3 × 8 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  '27 : 3 = ?',
  '["8","9","7","6"]'::jsonb,
  1,
  1,
  '27 : 3 = 9.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10009-0000-4000-8000-000000000001', 3,
  'Bài 6: Bảng nhân 4, bảng chia 4 — Phần 1',
  'Xem video và đọc sách Trang 19.',
  'BS8i1Xj-Hbk',
  'toan', 'Toán',
  9, 1,
  'Trang 19',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  6,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10009-0000-4000-8000-000000000001', 'a3b10009-0000-4000-8000-000000000001', 'Ôn tập: Bài 6'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  '4 × 6 = ?',
  '["20","24","10","28"]'::jsonb,
  1,
  0,
  '4 × 6 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  '32 : 4 = ?',
  '["6","7","8","9"]'::jsonb,
  2,
  1,
  '32 : 4 = 8.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10010-0000-4000-8000-000000000001', 3,
  'Bài 6: Bảng nhân 4, bảng chia 4 — Tiếp theo',
  'Xem video và đọc sách Trang 19.',
  'RvcZYtiMp-8',
  'toan', 'Toán',
  10, 1,
  'Trang 19',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  6,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10010-0000-4000-8000-000000000001', 'a3b10010-0000-4000-8000-000000000001', 'Ôn tập: Bài 6'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  '4 × 6 = ?',
  '["20","24","10","28"]'::jsonb,
  1,
  0,
  '4 × 6 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  '32 : 4 = ?',
  '["6","7","8","9"]'::jsonb,
  2,
  1,
  '32 : 4 = 8.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10011-0000-4000-8000-000000000001', 3,
  'Bài 7: Ôn tập hình học và đo lường — Phần 1',
  'Xem video và đọc sách Trang 21.',
  'Yy7G9HMj3YE',
  'toan', 'Toán',
  11, 1,
  'Trang 21',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  7,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10011-0000-4000-8000-000000000001', 'a3b10011-0000-4000-8000-000000000001', 'Ôn tập: Bài 7'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Hình có 3 cạnh và 3 góc là:',
  '["Hình vuông","Hình tam giác","Hình tròn","Đường thẳng"]'::jsonb,
  1,
  0,
  'Tam giác có đúng 3 cạnh và 3 góc.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  '1 m = ? cm',
  '["10","100","1000","50"]'::jsonb,
  1,
  1,
  '1 mét = 100 xăng-ti-mét.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10012-0000-4000-8000-000000000001', 3,
  'Bài 7: Ôn tập hình học và đo lường — Tiếp theo',
  'Xem video và đọc sách Trang 21.',
  'nlrhY95G274',
  'toan', 'Toán',
  12, 1,
  'Trang 21',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  7,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10012-0000-4000-8000-000000000001', 'a3b10012-0000-4000-8000-000000000001', 'Ôn tập: Bài 7'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Hình có 3 cạnh và 3 góc là:',
  '["Hình vuông","Hình tam giác","Hình tròn","Đường thẳng"]'::jsonb,
  1,
  0,
  'Tam giác có đúng 3 cạnh và 3 góc.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  '1 m = ? cm',
  '["10","100","1000","50"]'::jsonb,
  1,
  1,
  '1 mét = 100 xăng-ti-mét.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10013-0000-4000-8000-000000000001', 3,
  'Bài 8: Luyện tập chung — Luyện tập chung',
  'Xem video và đọc sách Trang 24.',
  'uAPA4WpoCR0',
  'toan', 'Toán',
  13, 1,
  'Trang 24',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  8,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10013-0000-4000-8000-000000000001', 'a3b10013-0000-4000-8000-000000000001', 'Ôn tập: Bài 8'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 8?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10014-0000-4000-8000-000000000001', 3,
  'Bài 9: Bảng nhân 6, bảng chia 6 — Phần 1',
  'Xem video và đọc sách Trang 28.',
  '5c736YjiXbQ',
  'toan', 'Toán',
  14, 1,
  'Trang 28',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  9,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10014-0000-4000-8000-000000000001', 'a3b10014-0000-4000-8000-000000000001', 'Ôn tập: Bài 9'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  '6 × 4 = ?',
  '["20","24","10","28"]'::jsonb,
  1,
  0,
  '6 × 4 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  '42 : 6 = ?',
  '["6","7","8","9"]'::jsonb,
  1,
  1,
  '42 : 6 = 7.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10015-0000-4000-8000-000000000001', 3,
  'Bài 9: Bảng nhân 6, bảng chia 6 — Tiếp theo',
  'Xem video và đọc sách Trang 28.',
  'NwI8T9QVn10',
  'toan', 'Toán',
  15, 1,
  'Trang 28',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  9,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10015-0000-4000-8000-000000000001', 'a3b10015-0000-4000-8000-000000000001', 'Ôn tập: Bài 9'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  '6 × 4 = ?',
  '["20","24","10","28"]'::jsonb,
  1,
  0,
  '6 × 4 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  '42 : 6 = ?',
  '["6","7","8","9"]'::jsonb,
  1,
  1,
  '42 : 6 = 7.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10016-0000-4000-8000-000000000001', 3,
  'Bài 10: Bảng nhân 7, bảng chia 7 — Phần 1',
  'Xem video và đọc sách Trang 31.',
  'cOrIMRgPqdo',
  'toan', 'Toán',
  16, 1,
  'Trang 31',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  10,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10016-0000-4000-8000-000000000001', 'a3b10016-0000-4000-8000-000000000001', 'Ôn tập: Bài 10'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  '7 × 5 = ?',
  '["30","35","12","42"]'::jsonb,
  1,
  0,
  '7 × 5 = 35.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  '56 : 7 = ?',
  '["6","7","8","9"]'::jsonb,
  2,
  1,
  '56 : 7 = 8.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10017-0000-4000-8000-000000000001', 3,
  'Bài 10: Bảng nhân 7, bảng chia 7 — Tiếp theo',
  'Xem video và đọc sách Trang 31.',
  'Cr43p0tjtJw',
  'toan', 'Toán',
  17, 1,
  'Trang 31',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  10,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10017-0000-4000-8000-000000000001', 'a3b10017-0000-4000-8000-000000000001', 'Ôn tập: Bài 10'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  '7 × 5 = ?',
  '["30","35","12","42"]'::jsonb,
  1,
  0,
  '7 × 5 = 35.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  '56 : 7 = ?',
  '["6","7","8","9"]'::jsonb,
  2,
  1,
  '56 : 7 = 8.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10018-0000-4000-8000-000000000001', 3,
  'Bài 11: Bảng nhân 8, bảng chia 8 — Phần 1',
  'Xem video và đọc sách Trang 33.',
  '7Zd81dAaReA',
  'toan', 'Toán',
  18, 1,
  'Trang 33',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  11,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10018-0000-4000-8000-000000000001', 'a3b10018-0000-4000-8000-000000000001', 'Ôn tập: Bài 11'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  '8 × 3 = ?',
  '["21","24","11","32"]'::jsonb,
  1,
  0,
  '8 × 3 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  '64 : 8 = ?',
  '["7","8","9","6"]'::jsonb,
  1,
  1,
  '64 : 8 = 8.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10019-0000-4000-8000-000000000001', 3,
  'Bài 11: Bảng nhân 8, bảng chia 8 — Tiếp theo',
  'Xem video và đọc sách Trang 33.',
  'HQMw93PTtYM',
  'toan', 'Toán',
  19, 1,
  'Trang 33',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  11,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10019-0000-4000-8000-000000000001', 'a3b10019-0000-4000-8000-000000000001', 'Ôn tập: Bài 11'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  '8 × 3 = ?',
  '["21","24","11","32"]'::jsonb,
  1,
  0,
  '8 × 3 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  '64 : 8 = ?',
  '["7","8","9","6"]'::jsonb,
  1,
  1,
  '64 : 8 = 8.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10020-0000-4000-8000-000000000001', 3,
  'Bài 12: Bảng nhân 9, bảng chia 9 — Phần 1',
  'Xem video và đọc sách Trang 36.',
  'H1HpwYvD1hI',
  'toan', 'Toán',
  20, 1,
  'Trang 36',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  12,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10020-0000-4000-8000-000000000001', 'a3b10020-0000-4000-8000-000000000001', 'Ôn tập: Bài 12'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  '9 × 6 = ?',
  '["45","54","15","63"]'::jsonb,
  1,
  0,
  '9 × 6 = 54.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  '81 : 9 = ?',
  '["8","9","7","10"]'::jsonb,
  1,
  1,
  '81 : 9 = 9.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10021-0000-4000-8000-000000000001', 3,
  'Bài 12: Bảng nhân 9, bảng chia 9 — Tiếp theo',
  'Xem video và đọc sách Trang 36.',
  'KW9nkIqzRPQ',
  'toan', 'Toán',
  21, 1,
  'Trang 36',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  12,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10021-0000-4000-8000-000000000001', 'a3b10021-0000-4000-8000-000000000001', 'Ôn tập: Bài 12'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  '9 × 6 = ?',
  '["45","54","15","63"]'::jsonb,
  1,
  0,
  '9 × 6 = 54.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  '81 : 9 = ?',
  '["8","9","7","10"]'::jsonb,
  1,
  1,
  '81 : 9 = 9.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10022-0000-4000-8000-000000000001', 3,
  'Bài 13: Tìm thành phần trong phép nhân, phép chia — Video bài giảng',
  'Xem video và đọc sách Trang 39.',
  'A19ruFYX4R4',
  'toan', 'Toán',
  22, 1,
  'Trang 39',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  13,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10022-0000-4000-8000-000000000001', 'a3b10022-0000-4000-8000-000000000001', 'Ôn tập: Bài 13'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'x × 6 = 42. Tìm x:',
  '["6","7","8","36"]'::jsonb,
  1,
  0,
  'x = 42 : 6 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'a : 5 = 9. Tìm a:',
  '["4","14","45","40"]'::jsonb,
  2,
  1,
  'Số bị chia: a = 9 × 5 = 45.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10023-0000-4000-8000-000000000001', 3,
  'Bài 14: Một phần mấy — Phần 1',
  'Xem video và đọc sách Trang 42.',
  'TsJKc3XGxSM',
  'toan', 'Toán',
  23, 1,
  'Trang 42',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  14,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10023-0000-4000-8000-000000000001', 'a3b10023-0000-4000-8000-000000000001', 'Ôn tập: Bài 14'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần ba của 12 là:',
  '["3","4","6","9"]'::jsonb,
  1,
  0,
  '12 : 3 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Hình chia 4 phần bằng nhau, tô màu 1 phần → đã tô:',
  '["Một phần hai","Một phần ba","Một phần tư","Cả hình"]'::jsonb,
  2,
  1,
  '1 trong 4 phần bằng nhau là một phần tư.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10024-0000-4000-8000-000000000001', 3,
  'Bài 14: Một phần mấy — Tiếp theo',
  'Xem video và đọc sách Trang 42.',
  'LQNvUpu1lLM',
  'toan', 'Toán',
  24, 1,
  'Trang 42',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  14,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10024-0000-4000-8000-000000000001', 'a3b10024-0000-4000-8000-000000000001', 'Ôn tập: Bài 14'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần ba của 12 là:',
  '["3","4","6","9"]'::jsonb,
  1,
  0,
  '12 : 3 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Hình chia 4 phần bằng nhau, tô màu 1 phần → đã tô:',
  '["Một phần hai","Một phần ba","Một phần tư","Cả hình"]'::jsonb,
  2,
  1,
  '1 trong 4 phần bằng nhau là một phần tư.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10025-0000-4000-8000-000000000001', 3,
  'Bài 15: Luyện tập chung — Phần 1',
  'Xem video và đọc sách Trang 46.',
  'jx598fQD26A',
  'toan', 'Toán',
  25, 1,
  'Trang 46',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  15,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10025-0000-4000-8000-000000000001', 'a3b10025-0000-4000-8000-000000000001', 'Ôn tập: Bài 15'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 15?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10026-0000-4000-8000-000000000001', 3,
  'Bài 15: Luyện tập chung — Tiếp theo',
  'Xem video và đọc sách Trang 46.',
  'jLrDdw7xcMo',
  'toan', 'Toán',
  26, 1,
  'Trang 46',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  15,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10026-0000-4000-8000-000000000001', 'a3b10026-0000-4000-8000-000000000001', 'Ôn tập: Bài 15'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 15?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10027-0000-4000-8000-000000000001', 3,
  'Bài 16: Điểm ở giữa, trung điểm của đoạn thẳng',
  'Chủ đề 3: Làm quen với hình phẳng, hình khối. Đọc sách Trang 49, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  27, 1,
  'Trang 49',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  16,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10027-0000-4000-8000-000000000001', 'a3b10027-0000-4000-8000-000000000001', 'Ôn tập: Bài 16'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 16?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10028-0000-4000-8000-000000000001', 3,
  'Bài 17: Hình tròn. Tâm, bán kính, đường kính của hình tròn',
  'Chủ đề 3: Làm quen với hình phẳng, hình khối. Đọc sách Trang 52, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  28, 1,
  'Trang 52',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  17,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10028-0000-4000-8000-000000000001', 'a3b10028-0000-4000-8000-000000000001', 'Ôn tập: Bài 17'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 17?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10029-0000-4000-8000-000000000001', 3,
  'Bài 18: Góc, góc vuông, góc không vuông',
  'Chủ đề 3: Làm quen với hình phẳng, hình khối. Đọc sách Trang 54, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  29, 1,
  'Trang 54',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  18,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10029-0000-4000-8000-000000000001', 'a3b10029-0000-4000-8000-000000000001', 'Ôn tập: Bài 18'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 18?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10030-0000-4000-8000-000000000001', 3,
  'Bài 19: Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông',
  'Chủ đề 3: Làm quen với hình phẳng, hình khối. Đọc sách Trang 56, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  30, 1,
  'Trang 56',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  19,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10030-0000-4000-8000-000000000001', 'a3b10030-0000-4000-8000-000000000001', 'Ôn tập: Bài 19'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 19?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10031-0000-4000-8000-000000000001', 3,
  'Bài 20: Thực hành vẽ góc vuông, vẽ đường tròn, hình vuông, hình chữ nhật và vẽ trang trí',
  'Chủ đề 3: Làm quen với hình phẳng, hình khối. Đọc sách Trang 61, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  31, 1,
  'Trang 61',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  20,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10031-0000-4000-8000-000000000001', 'a3b10031-0000-4000-8000-000000000001', 'Ôn tập: Bài 20'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 20?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10032-0000-4000-8000-000000000001', 3,
  'Bài 21: Khối lập phương, khối hộp chữ nhật',
  'Chủ đề 3: Làm quen với hình phẳng, hình khối. Đọc sách Trang 63, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  32, 1,
  'Trang 63',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  21,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10032-0000-4000-8000-000000000001', 'a3b10032-0000-4000-8000-000000000001', 'Ôn tập: Bài 21'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 21?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10033-0000-4000-8000-000000000001', 3,
  'Bài 22: Luyện tập chung',
  'Chủ đề 3: Làm quen với hình phẳng, hình khối. Đọc sách Trang 65, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  33, 1,
  'Trang 65',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  22,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10033-0000-4000-8000-000000000001', 'a3b10033-0000-4000-8000-000000000001', 'Ôn tập: Bài 22'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 22?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10034-0000-4000-8000-000000000001', 3,
  'Bài 23: Nhân số có hai chữ số với số có một chữ số',
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100. Đọc sách Trang 67, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  34, 1,
  'Trang 67',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  23,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10034-0000-4000-8000-000000000001', 'a3b10034-0000-4000-8000-000000000001', 'Ôn tập: Bài 23'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 23?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10035-0000-4000-8000-000000000001', 3,
  'Bài 24: Gấp một số lên một số lần',
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100. Đọc sách Trang 70, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  35, 1,
  'Trang 70',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  24,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10035-0000-4000-8000-000000000001', 'a3b10035-0000-4000-8000-000000000001', 'Ôn tập: Bài 24'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 24?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10036-0000-4000-8000-000000000001', 3,
  'Bài 25: Phép chia hết, phép chia có dư',
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100. Đọc sách Trang 72, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  36, 1,
  'Trang 72',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  25,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10036-0000-4000-8000-000000000001', 'a3b10036-0000-4000-8000-000000000001', 'Ôn tập: Bài 25'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 25?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10037-0000-4000-8000-000000000001', 3,
  'Bài 26: Chia số có hai chữ số cho số có một chữ số',
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100. Đọc sách Trang 75, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  37, 1,
  'Trang 75',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  26,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10037-0000-4000-8000-000000000001', 'a3b10037-0000-4000-8000-000000000001', 'Ôn tập: Bài 26'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 26?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10038-0000-4000-8000-000000000001', 3,
  'Bài 27: Giảm một số đi một số lần',
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100. Đọc sách Trang 79, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  38, 1,
  'Trang 79',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  27,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10038-0000-4000-8000-000000000001', 'a3b10038-0000-4000-8000-000000000001', 'Ôn tập: Bài 27'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 27?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10039-0000-4000-8000-000000000001', 3,
  'Bài 28: Bài toán giải bằng hai bước tính',
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100. Đọc sách Trang 81, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  39, 1,
  'Trang 81',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  28,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10039-0000-4000-8000-000000000001', 'a3b10039-0000-4000-8000-000000000001', 'Ôn tập: Bài 28'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 28?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10040-0000-4000-8000-000000000001', 3,
  'Bài 29: Luyện tập chung',
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100. Đọc sách Trang 83, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  40, 1,
  'Trang 83',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  29,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10040-0000-4000-8000-000000000001', 'a3b10040-0000-4000-8000-000000000001', 'Ôn tập: Bài 29'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 29?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10041-0000-4000-8000-000000000001', 3,
  'Bài 30: Mi-li-mét',
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ. Đọc sách Trang 85, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  41, 1,
  'Trang 85',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  30,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10041-0000-4000-8000-000000000001', 'a3b10041-0000-4000-8000-000000000001', 'Ôn tập: Bài 30'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 30?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10042-0000-4000-8000-000000000001', 3,
  'Bài 31: Gam',
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ. Đọc sách Trang 87, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  42, 1,
  'Trang 87',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  31,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10042-0000-4000-8000-000000000001', 'a3b10042-0000-4000-8000-000000000001', 'Ôn tập: Bài 31'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 31?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10043-0000-4000-8000-000000000001', 3,
  'Bài 32: Mi-li-lít',
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ. Đọc sách Trang 89, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  43, 1,
  'Trang 89',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  32,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10043-0000-4000-8000-000000000001', 'a3b10043-0000-4000-8000-000000000001', 'Ôn tập: Bài 32'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 32?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10044-0000-4000-8000-000000000001', 3,
  'Bài 33: Nhiệt độ. Đơn vị đo nhiệt độ',
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ. Đọc sách Trang 91, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  44, 1,
  'Trang 91',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  33,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10044-0000-4000-8000-000000000001', 'a3b10044-0000-4000-8000-000000000001', 'Ôn tập: Bài 33'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 33?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10045-0000-4000-8000-000000000001', 3,
  'Bài 34: Thực hành và trải nghiệm với các đơn vị mi-li-mét, gam, mi-li-lít, độ C',
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ. Đọc sách Trang 93, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  45, 1,
  'Trang 93',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  34,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10045-0000-4000-8000-000000000001', 'a3b10045-0000-4000-8000-000000000001', 'Ôn tập: Bài 34'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 34?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10046-0000-4000-8000-000000000001', 3,
  'Bài 35: Luyện tập chung',
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ. Đọc sách Trang 95, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  46, 1,
  'Trang 95',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  35,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10046-0000-4000-8000-000000000001', 'a3b10046-0000-4000-8000-000000000001', 'Ôn tập: Bài 35'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 35?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10047-0000-4000-8000-000000000001', 3,
  'Bài 36: Nhân số có ba chữ số với số có một chữ số',
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000. Đọc sách Trang 97, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  47, 1,
  'Trang 97',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  36,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10047-0000-4000-8000-000000000001', 'a3b10047-0000-4000-8000-000000000001', 'Ôn tập: Bài 36'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 36?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10048-0000-4000-8000-000000000001', 3,
  'Bài 37: Chia số có ba chữ số cho số có một chữ số',
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000. Đọc sách Trang 99, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  48, 1,
  'Trang 99',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  37,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10048-0000-4000-8000-000000000001', 'a3b10048-0000-4000-8000-000000000001', 'Ôn tập: Bài 37'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 37?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10049-0000-4000-8000-000000000001', 3,
  'Bài 38: Biểu thức số. Tính giá trị của biểu thức số',
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000. Đọc sách Trang 104, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  49, 1,
  'Trang 104',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  38,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10049-0000-4000-8000-000000000001', 'a3b10049-0000-4000-8000-000000000001', 'Ôn tập: Bài 38'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 38?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10050-0000-4000-8000-000000000001', 3,
  'Bài 39: So sánh số lớn gấp mấy lần số bé',
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000. Đọc sách Trang 109, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  50, 1,
  'Trang 109',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  39,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10050-0000-4000-8000-000000000001', 'a3b10050-0000-4000-8000-000000000001', 'Ôn tập: Bài 39'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 39?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10051-0000-4000-8000-000000000001', 3,
  'Bài 40: Luyện tập chung',
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000. Đọc sách Trang 111, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  51, 1,
  'Trang 111',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  40,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10051-0000-4000-8000-000000000001', 'a3b10051-0000-4000-8000-000000000001', 'Ôn tập: Bài 40'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 40?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10052-0000-4000-8000-000000000001', 3,
  'Bài 41: Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000',
  'Chủ đề 7: Ôn tập học kì 1. Đọc sách Trang 113, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  52, 1,
  'Trang 113',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  41,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10052-0000-4000-8000-000000000001', 'a3b10052-0000-4000-8000-000000000001', 'Ôn tập: Bài 41'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 41?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10053-0000-4000-8000-000000000001', 3,
  'Bài 42: Ôn tập biểu thức số',
  'Chủ đề 7: Ôn tập học kì 1. Đọc sách Trang 116, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  53, 1,
  'Trang 116',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  42,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10053-0000-4000-8000-000000000001', 'a3b10053-0000-4000-8000-000000000001', 'Ôn tập: Bài 42'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 42?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10054-0000-4000-8000-000000000001', 3,
  'Bài 43: Ôn tập hình học và đo lường',
  'Chủ đề 7: Ôn tập học kì 1. Đọc sách Trang 118, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  54, 1,
  'Trang 118',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  43,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10054-0000-4000-8000-000000000001', 'a3b10054-0000-4000-8000-000000000001', 'Ôn tập: Bài 43'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 43?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, pdf_url,
  book_lesson_number, topic_label, video_part
) values (
  'a3b10055-0000-4000-8000-000000000001', 3,
  'Bài 44: Ôn tập chung',
  'Chủ đề 7: Ôn tập học kì 1. Đọc sách Trang 120, làm bài tập trong SGK.',
  null,
  'toan', 'Toán',
  55, 1,
  'Trang 120',
  'cccccccc-cccc-cccc-cccc-cccccccc3001',
  null,
  44,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10055-0000-4000-8000-000000000001', 'a3b10055-0000-4000-8000-000000000001', 'Ôn tập: Bài 44'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Sau khi xem video và đọc sách, bạn đã nắm ý chính Bài 44?',
  '["Rồi, tôi có thể làm bài tập","Chưa, cần xem lại","Chỉ xem video","Chưa mở sách"]'::jsonb,
  0,
  0,
  'Nên vừa xem video vừa đọc đúng trang trong sách giáo khoa rồi làm bài tập.'
);
