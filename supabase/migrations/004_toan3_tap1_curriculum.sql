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
  lesson_index, volume, page_hint, subject_id,
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
  1,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10001-0000-4000-8000-000000000001', 'a3b10001-0000-4000-8000-000000000001', 'Ôn tập: Bài 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Trong số 100, chữ số 0 có giá trị là bao nhiêu?',
  '["0"]'::jsonb,
  0,
  0,
  'Chữ số 0 nằm ở hàng chục, nên có giá trị là 0.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số liền sau của số 153 là số nào?',
  '["154","163","143","152"]'::jsonb,
  0,
  1,
  'Số liền sau của một số bằng số đó cộng thêm 1: 153 + 1 = 154.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số 206 được viết thành tổng các trăm, chục, đơn vị là:',
  '["20 + 00 + 6","200 + 00 + 6","200 + 0 + 6","2 + 0 + 6"]'::jsonb,
  1,
  2,
  'Số 206 gồm 2 trăm, 0 chục và 6 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Trong số 259, chữ số 5 có giá trị là bao nhiêu?',
  '["50","5","0","500"]'::jsonb,
  0,
  3,
  'Chữ số 5 nằm ở hàng chục, nên có giá trị là 50.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số liền sau của số 312 là số nào?',
  '["313","302","311","322"]'::jsonb,
  0,
  4,
  'Số liền sau của một số bằng số đó cộng thêm 1: 312 + 1 = 313.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số 365 được viết thành tổng các trăm, chục, đơn vị là:',
  '["300 + 60 + 5","300 + 6 + 5","30 + 60 + 5","3 + 6 + 5"]'::jsonb,
  0,
  5,
  'Số 365 gồm 3 trăm, 6 chục và 5 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Trong số 418, chữ số 1 có giá trị là bao nhiêu?',
  '["10","1","100","0"]'::jsonb,
  0,
  6,
  'Chữ số 1 nằm ở hàng chục, nên có giá trị là 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số liền sau của số 471 là số nào?',
  '["481","461","470","472"]'::jsonb,
  3,
  7,
  'Số liền sau của một số bằng số đó cộng thêm 1: 471 + 1 = 472.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số 524 được viết thành tổng các trăm, chục, đơn vị là:',
  '["500 + 20 + 4","50 + 20 + 4","5 + 2 + 4","500 + 2 + 4"]'::jsonb,
  0,
  8,
  'Số 524 gồm 5 trăm, 2 chục và 4 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Trong số 577, chữ số 7 có giá trị là bao nhiêu?',
  '["70","700","7","0"]'::jsonb,
  0,
  9,
  'Chữ số 7 nằm ở hàng chục, nên có giá trị là 70.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số liền sau của số 630 là số nào?',
  '["640","631","629","620"]'::jsonb,
  1,
  10,
  'Số liền sau của một số bằng số đó cộng thêm 1: 630 + 1 = 631.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số 683 được viết thành tổng các trăm, chục, đơn vị là:',
  '["600 + 8 + 3","6 + 8 + 3","600 + 80 + 3","60 + 80 + 3"]'::jsonb,
  2,
  11,
  'Số 683 gồm 6 trăm, 8 chục và 3 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Trong số 736, chữ số 3 có giá trị là bao nhiêu?',
  '["0","30","300","3"]'::jsonb,
  1,
  12,
  'Chữ số 3 nằm ở hàng chục, nên có giá trị là 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số liền sau của số 789 là số nào?',
  '["790","788","779","799"]'::jsonb,
  0,
  13,
  'Số liền sau của một số bằng số đó cộng thêm 1: 789 + 1 = 790.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10001-0000-4000-8000-000000000001',
  'Số 842 được viết thành tổng các trăm, chục, đơn vị là:',
  '["800 + 40 + 2","800 + 4 + 2","80 + 40 + 2","8 + 4 + 2"]'::jsonb,
  0,
  14,
  'Số 842 gồm 8 trăm, 4 chục và 2 đơn vị.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  1,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10002-0000-4000-8000-000000000001', 'a3b10002-0000-4000-8000-000000000001', 'Ôn tập: Bài 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Trong số 100, chữ số 0 có giá trị là bao nhiêu?',
  '["0"]'::jsonb,
  0,
  0,
  'Chữ số 0 nằm ở hàng chục, nên có giá trị là 0.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số liền sau của số 153 là số nào?',
  '["154","143","152","163"]'::jsonb,
  0,
  1,
  'Số liền sau của một số bằng số đó cộng thêm 1: 153 + 1 = 154.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số 206 được viết thành tổng các trăm, chục, đơn vị là:',
  '["200 + 0 + 6","200 + 00 + 6","2 + 0 + 6","20 + 00 + 6"]'::jsonb,
  1,
  2,
  'Số 206 gồm 2 trăm, 0 chục và 6 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Trong số 259, chữ số 5 có giá trị là bao nhiêu?',
  '["50","5","500","0"]'::jsonb,
  0,
  3,
  'Chữ số 5 nằm ở hàng chục, nên có giá trị là 50.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số liền sau của số 312 là số nào?',
  '["302","322","311","313"]'::jsonb,
  3,
  4,
  'Số liền sau của một số bằng số đó cộng thêm 1: 312 + 1 = 313.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số 365 được viết thành tổng các trăm, chục, đơn vị là:',
  '["300 + 60 + 5","300 + 6 + 5","30 + 60 + 5","3 + 6 + 5"]'::jsonb,
  0,
  5,
  'Số 365 gồm 3 trăm, 6 chục và 5 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Trong số 418, chữ số 1 có giá trị là bao nhiêu?',
  '["10","1","100","0"]'::jsonb,
  0,
  6,
  'Chữ số 1 nằm ở hàng chục, nên có giá trị là 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số liền sau của số 471 là số nào?',
  '["472","481","470","461"]'::jsonb,
  0,
  7,
  'Số liền sau của một số bằng số đó cộng thêm 1: 471 + 1 = 472.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số 524 được viết thành tổng các trăm, chục, đơn vị là:',
  '["500 + 20 + 4","500 + 2 + 4","50 + 20 + 4","5 + 2 + 4"]'::jsonb,
  0,
  8,
  'Số 524 gồm 5 trăm, 2 chục và 4 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Trong số 577, chữ số 7 có giá trị là bao nhiêu?',
  '["70","0","7","700"]'::jsonb,
  0,
  9,
  'Chữ số 7 nằm ở hàng chục, nên có giá trị là 70.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số liền sau của số 630 là số nào?',
  '["631","629","640","620"]'::jsonb,
  0,
  10,
  'Số liền sau của một số bằng số đó cộng thêm 1: 630 + 1 = 631.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số 683 được viết thành tổng các trăm, chục, đơn vị là:',
  '["600 + 80 + 3","600 + 8 + 3","60 + 80 + 3","6 + 8 + 3"]'::jsonb,
  0,
  11,
  'Số 683 gồm 6 trăm, 8 chục và 3 đơn vị.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Trong số 736, chữ số 3 có giá trị là bao nhiêu?',
  '["300","3","0","30"]'::jsonb,
  3,
  12,
  'Chữ số 3 nằm ở hàng chục, nên có giá trị là 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số liền sau của số 789 là số nào?',
  '["788","790","779","799"]'::jsonb,
  1,
  13,
  'Số liền sau của một số bằng số đó cộng thêm 1: 789 + 1 = 790.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10002-0000-4000-8000-000000000001',
  'Số 842 được viết thành tổng các trăm, chục, đơn vị là:',
  '["800 + 40 + 2","800 + 4 + 2","80 + 40 + 2","8 + 4 + 2"]'::jsonb,
  0,
  14,
  'Số 842 gồm 8 trăm, 4 chục và 2 đơn vị.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  2,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10003-0000-4000-8000-000000000001', 'a3b10003-0000-4000-8000-000000000001', 'Ôn tập: Bài 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 200 + 100 = ?',
  '["300","290","310","298"]'::jsonb,
  0,
  0,
  'Đặt tính và tính: 200 + 100 = 300.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 235 − 118 = ?',
  '["127","107","122","117"]'::jsonb,
  3,
  1,
  'Đặt tính và tính: 235 − 118 = 117.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 270 + 136 = ?',
  '["416","396","406","404"]'::jsonb,
  2,
  2,
  'Đặt tính và tính: 270 + 136 = 406.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 305 − 154 = ?',
  '["151","161","156","141"]'::jsonb,
  0,
  3,
  'Đặt tính và tính: 305 − 154 = 151.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 340 + 172 = ?',
  '["502","512","510","522"]'::jsonb,
  1,
  4,
  'Đặt tính và tính: 340 + 172 = 512.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 375 − 190 = ?',
  '["190","195","175","185"]'::jsonb,
  3,
  5,
  'Đặt tính và tính: 375 − 190 = 185.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 410 + 208 = ?',
  '["618","608","628","616"]'::jsonb,
  0,
  6,
  'Đặt tính và tính: 410 + 208 = 618.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 445 − 226 = ?',
  '["224","229","209","219"]'::jsonb,
  3,
  7,
  'Đặt tính và tính: 445 − 226 = 219.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 480 + 244 = ?',
  '["714","724","722","734"]'::jsonb,
  1,
  8,
  'Đặt tính và tính: 480 + 244 = 724.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 515 − 262 = ?',
  '["243","253","263","258"]'::jsonb,
  1,
  9,
  'Đặt tính và tính: 515 − 262 = 253.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 550 + 280 = ?',
  '["840","820","828","830"]'::jsonb,
  3,
  10,
  'Đặt tính và tính: 550 + 280 = 830.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 585 − 298 = ?',
  '["292","297","277","287"]'::jsonb,
  3,
  11,
  'Đặt tính và tính: 585 − 298 = 287.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 620 + 316 = ?',
  '["946","926","936","934"]'::jsonb,
  2,
  12,
  'Đặt tính và tính: 620 + 316 = 936.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 655 − 334 = ?',
  '["326","331","311","321"]'::jsonb,
  3,
  13,
  'Đặt tính và tính: 655 − 334 = 321.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10003-0000-4000-8000-000000000001',
  'Tính nhẩm: 690 + 352 = ?',
  '["1042","1032","1052","1040"]'::jsonb,
  0,
  14,
  'Đặt tính và tính: 690 + 352 = 1042.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  3,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10004-0000-4000-8000-000000000001', 'a3b10004-0000-4000-8000-000000000001', 'Ôn tập: Bài 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x + 20 = 80',
  '["60","100","70","55"]'::jsonb,
  0,
  0,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 80 − 20 = 60.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x − 25 = 88',
  '["63","103","118","113"]'::jsonb,
  3,
  1,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 88 + 25 = 113.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: 96 − x = 30',
  '["66","71","126","56"]'::jsonb,
  0,
  2,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 96 − 30 = 66.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x + 35 = 104',
  '["64","139","79","69"]'::jsonb,
  3,
  3,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 104 − 35 = 69.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x − 40 = 112',
  '["142","72","152","157"]'::jsonb,
  2,
  4,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 112 + 40 = 152.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: 120 − x = 45',
  '["75","165","65","80"]'::jsonb,
  0,
  5,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 120 − 45 = 75.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x + 50 = 128',
  '["178","73","78","88"]'::jsonb,
  2,
  6,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 128 − 50 = 78.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x − 55 = 136',
  '["191","81","181","196"]'::jsonb,
  0,
  7,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 136 + 55 = 191.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: 144 − x = 60',
  '["74","84","204","89"]'::jsonb,
  1,
  8,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 144 − 60 = 84.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x + 65 = 152',
  '["87","217","97","82"]'::jsonb,
  0,
  9,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 152 − 65 = 87.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x − 70 = 160',
  '["220","90","235","230"]'::jsonb,
  3,
  10,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 160 + 70 = 230.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: 168 − x = 75',
  '["83","98","243","93"]'::jsonb,
  3,
  11,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 168 − 75 = 93.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x + 80 = 176',
  '["96","256","106","91"]'::jsonb,
  0,
  12,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 176 − 80 = 96.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: x − 85 = 184',
  '["274","269","99","259"]'::jsonb,
  1,
  13,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 184 + 85 = 269.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10004-0000-4000-8000-000000000001',
  'Tìm x biết: 192 − x = 90',
  '["282","102","107","92"]'::jsonb,
  1,
  14,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 192 − 90 = 102.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  3,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10005-0000-4000-8000-000000000001', 'a3b10005-0000-4000-8000-000000000001', 'Ôn tập: Bài 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x + 20 = 80',
  '["60","100","70","55"]'::jsonb,
  0,
  0,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 80 − 20 = 60.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x − 25 = 88',
  '["118","113","63","103"]'::jsonb,
  1,
  1,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 88 + 25 = 113.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: 96 − x = 30',
  '["56","71","126","66"]'::jsonb,
  3,
  2,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 96 − 30 = 66.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x + 35 = 104',
  '["79","64","69","139"]'::jsonb,
  2,
  3,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 104 − 35 = 69.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x − 40 = 112',
  '["152","72","142","157"]'::jsonb,
  0,
  4,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 112 + 40 = 152.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: 120 − x = 45',
  '["80","65","165","75"]'::jsonb,
  3,
  5,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 120 − 45 = 75.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x + 50 = 128',
  '["88","178","73","78"]'::jsonb,
  3,
  6,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 128 − 50 = 78.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x − 55 = 136',
  '["81","181","191","196"]'::jsonb,
  2,
  7,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 136 + 55 = 191.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: 144 − x = 60',
  '["204","89","74","84"]'::jsonb,
  3,
  8,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 144 − 60 = 84.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x + 65 = 152',
  '["82","97","217","87"]'::jsonb,
  3,
  9,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 152 − 65 = 87.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x − 70 = 160',
  '["235","220","90","230"]'::jsonb,
  3,
  10,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 160 + 70 = 230.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: 168 − x = 75',
  '["83","243","93","98"]'::jsonb,
  2,
  11,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 168 − 75 = 93.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x + 80 = 176',
  '["106","256","91","96"]'::jsonb,
  3,
  12,
  'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: x = 176 − 80 = 96.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: x − 85 = 184',
  '["274","259","99","269"]'::jsonb,
  3,
  13,
  'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: x = 184 + 85 = 269.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10005-0000-4000-8000-000000000001',
  'Tìm x biết: 192 − x = 90',
  '["107","92","282","102"]'::jsonb,
  3,
  14,
  'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: x = 192 − 90 = 102.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  4,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10006-0000-4000-8000-000000000001', 'a3b10006-0000-4000-8000-000000000001', 'Ôn tập: Bài 4'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 10 : 5 = ?',
  '["2","4","1","3"]'::jsonb,
  0,
  0,
  'Theo bảng chia 5: 10 : 5 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 5 × 3 = ?',
  '["15","8","20","13"]'::jsonb,
  0,
  1,
  'Theo bảng nhân 5: 5 × 3 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 8 : 2 = ?',
  '["4","5","8","3"]'::jsonb,
  0,
  2,
  'Theo bảng chia 2: 8 : 2 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 5 × 5 = ?',
  '["25","30","23","10"]'::jsonb,
  0,
  3,
  'Theo bảng nhân 5: 5 × 5 = 25.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 30 : 5 = ?',
  '["12","5","7","6"]'::jsonb,
  3,
  4,
  'Theo bảng chia 5: 30 : 5 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 2 × 7 = ?',
  '["12","9","14","19"]'::jsonb,
  2,
  5,
  'Theo bảng nhân 2: 2 × 7 = 14.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 40 : 5 = ?',
  '["8","16","9","7"]'::jsonb,
  0,
  6,
  'Theo bảng chia 5: 40 : 5 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 5 × 9 = ?',
  '["45","50","43","14"]'::jsonb,
  0,
  7,
  'Theo bảng nhân 5: 5 × 9 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 2 : 2 = ?',
  '["1","2","0"]'::jsonb,
  0,
  8,
  'Theo bảng chia 2: 2 : 2 = 1.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 5 × 2 = ?',
  '["8","10","7","15"]'::jsonb,
  1,
  9,
  'Theo bảng nhân 5: 5 × 2 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 15 : 5 = ?',
  '["2","6","4","3"]'::jsonb,
  3,
  10,
  'Theo bảng chia 5: 15 : 5 = 3.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 2 × 4 = ?',
  '["8","13","6"]'::jsonb,
  0,
  11,
  'Theo bảng nhân 2: 2 × 4 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 25 : 5 = ?',
  '["10","5","6","4"]'::jsonb,
  1,
  12,
  'Theo bảng chia 5: 25 : 5 = 5.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 5 × 6 = ?',
  '["11","30","35","28"]'::jsonb,
  1,
  13,
  'Theo bảng nhân 5: 5 × 6 = 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10006-0000-4000-8000-000000000001',
  'Tính: 14 : 2 = ?',
  '["7","6","8","14"]'::jsonb,
  0,
  14,
  'Theo bảng chia 2: 14 : 2 = 7.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  5,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10007-0000-4000-8000-000000000001', 'a3b10007-0000-4000-8000-000000000001', 'Ôn tập: Bài 5'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 6 : 3 = ?',
  '["4","1","3","2"]'::jsonb,
  3,
  0,
  'Theo bảng chia 3: 6 : 3 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 3 × 3 = ?',
  '["6","12","9"]'::jsonb,
  2,
  1,
  'Theo bảng nhân 3: 3 × 3 = 9.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 12 : 3 = ?',
  '["3","6","5","4"]'::jsonb,
  3,
  2,
  'Theo bảng chia 3: 12 : 3 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 3 × 5 = ?',
  '["8","12","18","15"]'::jsonb,
  3,
  3,
  'Theo bảng nhân 3: 3 × 5 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 18 : 3 = ?',
  '["5","6","7","8"]'::jsonb,
  1,
  4,
  'Theo bảng chia 3: 18 : 3 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 3 × 7 = ?',
  '["21","24","18","10"]'::jsonb,
  0,
  5,
  'Theo bảng nhân 3: 3 × 7 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 24 : 3 = ?',
  '["8","10","9","7"]'::jsonb,
  0,
  6,
  'Theo bảng chia 3: 24 : 3 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 3 × 9 = ?',
  '["12","24","30","27"]'::jsonb,
  3,
  7,
  'Theo bảng nhân 3: 3 × 9 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 30 : 3 = ?',
  '["10","11","9","12"]'::jsonb,
  0,
  8,
  'Theo bảng chia 3: 30 : 3 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 3 × 1 = ?',
  '["3","6","0","4"]'::jsonb,
  0,
  9,
  'Theo bảng nhân 3: 3 × 1 = 3.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 6 : 3 = ?',
  '["3","2","4","1"]'::jsonb,
  1,
  10,
  'Theo bảng chia 3: 6 : 3 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 3 × 3 = ?',
  '["6","12","9"]'::jsonb,
  2,
  11,
  'Theo bảng nhân 3: 3 × 3 = 9.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 12 : 3 = ?',
  '["3","5","4","6"]'::jsonb,
  2,
  12,
  'Theo bảng chia 3: 12 : 3 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 3 × 5 = ?',
  '["15","18","12","8"]'::jsonb,
  0,
  13,
  'Theo bảng nhân 3: 3 × 5 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10007-0000-4000-8000-000000000001',
  'Tính: 18 : 3 = ?',
  '["8","5","7","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 3: 18 : 3 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  5,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10008-0000-4000-8000-000000000001', 'a3b10008-0000-4000-8000-000000000001', 'Ôn tập: Bài 5'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 6 : 3 = ?',
  '["2","3","4","1"]'::jsonb,
  0,
  0,
  'Theo bảng chia 3: 6 : 3 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 3 × 3 = ?',
  '["6","12","9"]'::jsonb,
  2,
  1,
  'Theo bảng nhân 3: 3 × 3 = 9.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 12 : 3 = ?',
  '["6","4","5","3"]'::jsonb,
  1,
  2,
  'Theo bảng chia 3: 12 : 3 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 3 × 5 = ?',
  '["8","12","15","18"]'::jsonb,
  2,
  3,
  'Theo bảng nhân 3: 3 × 5 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 18 : 3 = ?',
  '["7","6","8","5"]'::jsonb,
  1,
  4,
  'Theo bảng chia 3: 18 : 3 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 3 × 7 = ?',
  '["18","10","21","24"]'::jsonb,
  2,
  5,
  'Theo bảng nhân 3: 3 × 7 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 24 : 3 = ?',
  '["10","7","9","8"]'::jsonb,
  3,
  6,
  'Theo bảng chia 3: 24 : 3 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 3 × 9 = ?',
  '["27","30","24","12"]'::jsonb,
  0,
  7,
  'Theo bảng nhân 3: 3 × 9 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 30 : 3 = ?',
  '["10","9","11","12"]'::jsonb,
  0,
  8,
  'Theo bảng chia 3: 30 : 3 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 3 × 1 = ?',
  '["4","0","6","3"]'::jsonb,
  3,
  9,
  'Theo bảng nhân 3: 3 × 1 = 3.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 6 : 3 = ?',
  '["3","1","4","2"]'::jsonb,
  3,
  10,
  'Theo bảng chia 3: 6 : 3 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 3 × 3 = ?',
  '["9","6","12"]'::jsonb,
  0,
  11,
  'Theo bảng nhân 3: 3 × 3 = 9.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 12 : 3 = ?',
  '["6","3","4","5"]'::jsonb,
  2,
  12,
  'Theo bảng chia 3: 12 : 3 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 3 × 5 = ?',
  '["15","8","18","12"]'::jsonb,
  0,
  13,
  'Theo bảng nhân 3: 3 × 5 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10008-0000-4000-8000-000000000001',
  'Tính: 18 : 3 = ?',
  '["7","5","8","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 3: 18 : 3 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  6,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10009-0000-4000-8000-000000000001', 'a3b10009-0000-4000-8000-000000000001', 'Ôn tập: Bài 6'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 8 : 4 = ?',
  '["2","3","1","5"]'::jsonb,
  0,
  0,
  'Theo bảng chia 4: 8 : 4 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 4 × 3 = ?',
  '["7","8","16","12"]'::jsonb,
  3,
  1,
  'Theo bảng nhân 4: 4 × 3 = 12.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 16 : 4 = ?',
  '["4","5","3","7"]'::jsonb,
  0,
  2,
  'Theo bảng chia 4: 16 : 4 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 4 × 5 = ?',
  '["9","20","24","16"]'::jsonb,
  1,
  3,
  'Theo bảng nhân 4: 4 × 5 = 20.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 24 : 4 = ?',
  '["7","9","6","5"]'::jsonb,
  2,
  4,
  'Theo bảng chia 4: 24 : 4 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 4 × 7 = ?',
  '["24","11","28","32"]'::jsonb,
  2,
  5,
  'Theo bảng nhân 4: 4 × 7 = 28.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 32 : 4 = ?',
  '["11","9","7","8"]'::jsonb,
  3,
  6,
  'Theo bảng chia 4: 32 : 4 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 4 × 9 = ?',
  '["36","40","13","32"]'::jsonb,
  0,
  7,
  'Theo bảng nhân 4: 4 × 9 = 36.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 40 : 4 = ?',
  '["13","9","11","10"]'::jsonb,
  3,
  8,
  'Theo bảng chia 4: 40 : 4 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 4 × 1 = ?',
  '["8","5","4","0"]'::jsonb,
  2,
  9,
  'Theo bảng nhân 4: 4 × 1 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 8 : 4 = ?',
  '["2","3","1","5"]'::jsonb,
  0,
  10,
  'Theo bảng chia 4: 8 : 4 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 4 × 3 = ?',
  '["8","7","16","12"]'::jsonb,
  3,
  11,
  'Theo bảng nhân 4: 4 × 3 = 12.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 16 : 4 = ?',
  '["7","3","5","4"]'::jsonb,
  3,
  12,
  'Theo bảng chia 4: 16 : 4 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 4 × 5 = ?',
  '["20","9","24","16"]'::jsonb,
  0,
  13,
  'Theo bảng nhân 4: 4 × 5 = 20.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10009-0000-4000-8000-000000000001',
  'Tính: 24 : 4 = ?',
  '["6","9","7","5"]'::jsonb,
  0,
  14,
  'Theo bảng chia 4: 24 : 4 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  6,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10010-0000-4000-8000-000000000001', 'a3b10010-0000-4000-8000-000000000001', 'Ôn tập: Bài 6'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 8 : 4 = ?',
  '["5","2","3","1"]'::jsonb,
  1,
  0,
  'Theo bảng chia 4: 8 : 4 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 4 × 3 = ?',
  '["7","12","16","8"]'::jsonb,
  1,
  1,
  'Theo bảng nhân 4: 4 × 3 = 12.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 16 : 4 = ?',
  '["4","5","7","3"]'::jsonb,
  0,
  2,
  'Theo bảng chia 4: 16 : 4 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 4 × 5 = ?',
  '["16","24","9","20"]'::jsonb,
  3,
  3,
  'Theo bảng nhân 4: 4 × 5 = 20.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 24 : 4 = ?',
  '["6","7","5","9"]'::jsonb,
  0,
  4,
  'Theo bảng chia 4: 24 : 4 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 4 × 7 = ?',
  '["28","24","32","11"]'::jsonb,
  0,
  5,
  'Theo bảng nhân 4: 4 × 7 = 28.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 32 : 4 = ?',
  '["7","11","9","8"]'::jsonb,
  3,
  6,
  'Theo bảng chia 4: 32 : 4 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 4 × 9 = ?',
  '["36","13","40","32"]'::jsonb,
  0,
  7,
  'Theo bảng nhân 4: 4 × 9 = 36.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 40 : 4 = ?',
  '["11","10","13","9"]'::jsonb,
  1,
  8,
  'Theo bảng chia 4: 40 : 4 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 4 × 1 = ?',
  '["5","4","8","0"]'::jsonb,
  1,
  9,
  'Theo bảng nhân 4: 4 × 1 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 8 : 4 = ?',
  '["2","3","1","5"]'::jsonb,
  0,
  10,
  'Theo bảng chia 4: 8 : 4 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 4 × 3 = ?',
  '["7","8","12","16"]'::jsonb,
  2,
  11,
  'Theo bảng nhân 4: 4 × 3 = 12.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 16 : 4 = ?',
  '["7","3","5","4"]'::jsonb,
  3,
  12,
  'Theo bảng chia 4: 16 : 4 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 4 × 5 = ?',
  '["9","16","24","20"]'::jsonb,
  3,
  13,
  'Theo bảng nhân 4: 4 × 5 = 20.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10010-0000-4000-8000-000000000001',
  'Tính: 24 : 4 = ?',
  '["9","7","5","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 4: 24 : 4 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  7,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10011-0000-4000-8000-000000000001', 'a3b10011-0000-4000-8000-000000000001', 'Ôn tập: Bài 7'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 m = ...... dm?',
  '["20","200","2","2000"]'::jsonb,
  0,
  0,
  'Vì 1 m = 10 dm nên 2 m = 20 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 dm = ...... cm?',
  '["40","4000","400","4"]'::jsonb,
  0,
  1,
  'Vì 1 dm = 10 cm nên 4 dm = 40 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 7 cm = ...... mm?',
  '["700","70","7000","7"]'::jsonb,
  1,
  2,
  'Vì 1 cm = 10 mm nên 7 cm = 70 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 m = ...... dm?',
  '["50","500","5000","5"]'::jsonb,
  0,
  3,
  'Vì 1 m = 10 dm nên 5 m = 50 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 7 dm = ...... cm?',
  '["70","700","7","7000"]'::jsonb,
  0,
  4,
  'Vì 1 dm = 10 cm nên 7 dm = 70 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 10 cm = ...... mm?',
  '["100","1000","10","10000"]'::jsonb,
  0,
  5,
  'Vì 1 cm = 10 mm nên 10 cm = 100 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 8 m = ...... dm?',
  '["80","800","8","8000"]'::jsonb,
  0,
  6,
  'Vì 1 m = 10 dm nên 8 m = 80 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 10 dm = ...... cm?',
  '["100","10000","1000","10"]'::jsonb,
  0,
  7,
  'Vì 1 dm = 10 cm nên 10 dm = 100 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 13 cm = ...... mm?',
  '["130","1300","13","13000"]'::jsonb,
  0,
  8,
  'Vì 1 cm = 10 mm nên 13 cm = 130 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 11 m = ...... dm?',
  '["11000","11","1100","110"]'::jsonb,
  3,
  9,
  'Vì 1 m = 10 dm nên 11 m = 110 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 13 dm = ...... cm?',
  '["13000","13","1300","130"]'::jsonb,
  3,
  10,
  'Vì 1 dm = 10 cm nên 13 dm = 130 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 16 cm = ...... mm?',
  '["16","1600","160","16000"]'::jsonb,
  2,
  11,
  'Vì 1 cm = 10 mm nên 16 cm = 160 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 14 m = ...... dm?',
  '["14","14000","140","1400"]'::jsonb,
  2,
  12,
  'Vì 1 m = 10 dm nên 14 m = 140 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 16 dm = ...... cm?',
  '["16000","16","1600","160"]'::jsonb,
  3,
  13,
  'Vì 1 dm = 10 cm nên 16 dm = 160 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10011-0000-4000-8000-000000000001',
  'Đổi đơn vị: 19 cm = ...... mm?',
  '["19000","19","1900","190"]'::jsonb,
  3,
  14,
  'Vì 1 cm = 10 mm nên 19 cm = 190 mm.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  7,
  'Chủ đề 1: Ôn tập và bổ sung',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10012-0000-4000-8000-000000000001', 'a3b10012-0000-4000-8000-000000000001', 'Ôn tập: Bài 7'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 m = ...... dm?',
  '["20","2","2000","200"]'::jsonb,
  0,
  0,
  'Vì 1 m = 10 dm nên 2 m = 20 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 dm = ...... cm?',
  '["4000","4","40","400"]'::jsonb,
  2,
  1,
  'Vì 1 dm = 10 cm nên 4 dm = 40 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 7 cm = ...... mm?',
  '["70","7","700","7000"]'::jsonb,
  0,
  2,
  'Vì 1 cm = 10 mm nên 7 cm = 70 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 m = ...... dm?',
  '["50","500","5","5000"]'::jsonb,
  0,
  3,
  'Vì 1 m = 10 dm nên 5 m = 50 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 7 dm = ...... cm?',
  '["70","700","7","7000"]'::jsonb,
  0,
  4,
  'Vì 1 dm = 10 cm nên 7 dm = 70 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 10 cm = ...... mm?',
  '["10000","100","1000","10"]'::jsonb,
  1,
  5,
  'Vì 1 cm = 10 mm nên 10 cm = 100 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 8 m = ...... dm?',
  '["8","8000","800","80"]'::jsonb,
  3,
  6,
  'Vì 1 m = 10 dm nên 8 m = 80 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 10 dm = ...... cm?',
  '["100","1000","10","10000"]'::jsonb,
  0,
  7,
  'Vì 1 dm = 10 cm nên 10 dm = 100 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 13 cm = ...... mm?',
  '["13000","13","1300","130"]'::jsonb,
  3,
  8,
  'Vì 1 cm = 10 mm nên 13 cm = 130 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 11 m = ...... dm?',
  '["110","1100","11","11000"]'::jsonb,
  0,
  9,
  'Vì 1 m = 10 dm nên 11 m = 110 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 13 dm = ...... cm?',
  '["13000","130","1300","13"]'::jsonb,
  1,
  10,
  'Vì 1 dm = 10 cm nên 13 dm = 130 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 16 cm = ...... mm?',
  '["16","160","16000","1600"]'::jsonb,
  1,
  11,
  'Vì 1 cm = 10 mm nên 16 cm = 160 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 14 m = ...... dm?',
  '["140","1400","14","14000"]'::jsonb,
  0,
  12,
  'Vì 1 m = 10 dm nên 14 m = 140 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 16 dm = ...... cm?',
  '["16000","16","1600","160"]'::jsonb,
  3,
  13,
  'Vì 1 dm = 10 cm nên 16 dm = 160 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10012-0000-4000-8000-000000000001',
  'Đổi đơn vị: 19 cm = ...... mm?',
  '["190","19000","1900","19"]'::jsonb,
  0,
  14,
  'Vì 1 cm = 10 mm nên 19 cm = 190 mm.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  8,
  'Chủ đề 1: Ôn tập và bổ sung',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10013-0000-4000-8000-000000000001', 'a3b10013-0000-4000-8000-000000000001', 'Ôn tập: Bài 8'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["82","66","78","72"]'::jsonb,
  3,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["112","126","129","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["184","186","176","168"]'::jsonb,
  2,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["243","252","253","234"]'::jsonb,
  0,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["330","320","310"]'::jsonb,
  1,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["232","216","228","222"]'::jsonb,
  3,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["304","287","301","294"]'::jsonb,
  3,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["386","376","368","384"]'::jsonb,
  1,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["477","468","478","459"]'::jsonb,
  1,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["570","580","560"]'::jsonb,
  0,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["372","378","366","382"]'::jsonb,
  0,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["479","462","476","469"]'::jsonb,
  3,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["576","584","568","586"]'::jsonb,
  0,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["703","684","702","693"]'::jsonb,
  3,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10013-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["820","830","810"]'::jsonb,
  0,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  9,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10014-0000-4000-8000-000000000001', 'a3b10014-0000-4000-8000-000000000001', 'Ôn tập: Bài 9'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 12 : 6 = ?',
  '["2","3","1","4"]'::jsonb,
  0,
  0,
  'Theo bảng chia 6: 12 : 6 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 6 × 3 = ?',
  '["18","9","24","12"]'::jsonb,
  0,
  1,
  'Theo bảng nhân 6: 6 × 3 = 18.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 24 : 6 = ?',
  '["6","3","5","4"]'::jsonb,
  3,
  2,
  'Theo bảng chia 6: 24 : 6 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 6 × 5 = ?',
  '["24","36","11","30"]'::jsonb,
  3,
  3,
  'Theo bảng nhân 6: 6 × 5 = 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 36 : 6 = ?',
  '["8","5","7","6"]'::jsonb,
  3,
  4,
  'Theo bảng chia 6: 36 : 6 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 6 × 7 = ?',
  '["42","48","36","13"]'::jsonb,
  0,
  5,
  'Theo bảng nhân 6: 6 × 7 = 42.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 48 : 6 = ?',
  '["9","7","8","10"]'::jsonb,
  2,
  6,
  'Theo bảng chia 6: 48 : 6 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 6 × 9 = ?',
  '["54","60","48","15"]'::jsonb,
  0,
  7,
  'Theo bảng nhân 6: 6 × 9 = 54.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 60 : 6 = ?',
  '["10","11","9","12"]'::jsonb,
  0,
  8,
  'Theo bảng chia 6: 60 : 6 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 6 × 1 = ?',
  '["0","12","6","7"]'::jsonb,
  2,
  9,
  'Theo bảng nhân 6: 6 × 1 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 12 : 6 = ?',
  '["2","3","1","4"]'::jsonb,
  0,
  10,
  'Theo bảng chia 6: 12 : 6 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 6 × 3 = ?',
  '["9","18","24","12"]'::jsonb,
  1,
  11,
  'Theo bảng nhân 6: 6 × 3 = 18.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 24 : 6 = ?',
  '["4","3","5","6"]'::jsonb,
  0,
  12,
  'Theo bảng chia 6: 24 : 6 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 6 × 5 = ?',
  '["24","36","11","30"]'::jsonb,
  3,
  13,
  'Theo bảng nhân 6: 6 × 5 = 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10014-0000-4000-8000-000000000001',
  'Tính: 36 : 6 = ?',
  '["5","6","7","8"]'::jsonb,
  1,
  14,
  'Theo bảng chia 6: 36 : 6 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  9,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10015-0000-4000-8000-000000000001', 'a3b10015-0000-4000-8000-000000000001', 'Ôn tập: Bài 9'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 12 : 6 = ?',
  '["2","4","3","1"]'::jsonb,
  0,
  0,
  'Theo bảng chia 6: 12 : 6 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 6 × 3 = ?',
  '["9","24","18","12"]'::jsonb,
  2,
  1,
  'Theo bảng nhân 6: 6 × 3 = 18.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 24 : 6 = ?',
  '["3","5","6","4"]'::jsonb,
  3,
  2,
  'Theo bảng chia 6: 24 : 6 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 6 × 5 = ?',
  '["24","11","36","30"]'::jsonb,
  3,
  3,
  'Theo bảng nhân 6: 6 × 5 = 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 36 : 6 = ?',
  '["5","7","6","8"]'::jsonb,
  2,
  4,
  'Theo bảng chia 6: 36 : 6 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 6 × 7 = ?',
  '["42","48","36","13"]'::jsonb,
  0,
  5,
  'Theo bảng nhân 6: 6 × 7 = 42.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 48 : 6 = ?',
  '["10","7","9","8"]'::jsonb,
  3,
  6,
  'Theo bảng chia 6: 48 : 6 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 6 × 9 = ?',
  '["15","48","60","54"]'::jsonb,
  3,
  7,
  'Theo bảng nhân 6: 6 × 9 = 54.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 60 : 6 = ?',
  '["10","11","12","9"]'::jsonb,
  0,
  8,
  'Theo bảng chia 6: 60 : 6 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 6 × 1 = ?',
  '["7","12","6","0"]'::jsonb,
  2,
  9,
  'Theo bảng nhân 6: 6 × 1 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 12 : 6 = ?',
  '["1","3","2","4"]'::jsonb,
  2,
  10,
  'Theo bảng chia 6: 12 : 6 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 6 × 3 = ?',
  '["18","24","12","9"]'::jsonb,
  0,
  11,
  'Theo bảng nhân 6: 6 × 3 = 18.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 24 : 6 = ?',
  '["3","5","6","4"]'::jsonb,
  3,
  12,
  'Theo bảng chia 6: 24 : 6 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 6 × 5 = ?',
  '["30","36","24","11"]'::jsonb,
  0,
  13,
  'Theo bảng nhân 6: 6 × 5 = 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10015-0000-4000-8000-000000000001',
  'Tính: 36 : 6 = ?',
  '["5","8","7","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 6: 36 : 6 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  10,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10016-0000-4000-8000-000000000001', 'a3b10016-0000-4000-8000-000000000001', 'Ôn tập: Bài 10'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 14 : 7 = ?',
  '["2","1","3","4"]'::jsonb,
  0,
  0,
  'Theo bảng chia 7: 14 : 7 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 7 × 3 = ?',
  '["28","10","21","14"]'::jsonb,
  2,
  1,
  'Theo bảng nhân 7: 7 × 3 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 28 : 7 = ?',
  '["5","4","6","3"]'::jsonb,
  1,
  2,
  'Theo bảng chia 7: 28 : 7 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 7 × 5 = ?',
  '["35","12","28","42"]'::jsonb,
  0,
  3,
  'Theo bảng nhân 7: 7 × 5 = 35.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 42 : 7 = ?',
  '["7","5","6","8"]'::jsonb,
  2,
  4,
  'Theo bảng chia 7: 42 : 7 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 7 × 7 = ?',
  '["49","56","42","14"]'::jsonb,
  0,
  5,
  'Theo bảng nhân 7: 7 × 7 = 49.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 56 : 7 = ?',
  '["8","10","7","9"]'::jsonb,
  0,
  6,
  'Theo bảng chia 7: 56 : 7 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 7 × 9 = ?',
  '["70","63","16","56"]'::jsonb,
  1,
  7,
  'Theo bảng nhân 7: 7 × 9 = 63.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 70 : 7 = ?',
  '["10","11","9","12"]'::jsonb,
  0,
  8,
  'Theo bảng chia 7: 70 : 7 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 7 × 1 = ?',
  '["0","14","7","8"]'::jsonb,
  2,
  9,
  'Theo bảng nhân 7: 7 × 1 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 14 : 7 = ?',
  '["1","2","3","4"]'::jsonb,
  1,
  10,
  'Theo bảng chia 7: 14 : 7 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 7 × 3 = ?',
  '["14","28","10","21"]'::jsonb,
  3,
  11,
  'Theo bảng nhân 7: 7 × 3 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 28 : 7 = ?',
  '["4","5","6","3"]'::jsonb,
  0,
  12,
  'Theo bảng chia 7: 28 : 7 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 7 × 5 = ?',
  '["35","42","12","28"]'::jsonb,
  0,
  13,
  'Theo bảng nhân 7: 7 × 5 = 35.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10016-0000-4000-8000-000000000001',
  'Tính: 42 : 7 = ?',
  '["5","8","7","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 7: 42 : 7 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  10,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10017-0000-4000-8000-000000000001', 'a3b10017-0000-4000-8000-000000000001', 'Ôn tập: Bài 10'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 14 : 7 = ?',
  '["2","4","3","1"]'::jsonb,
  0,
  0,
  'Theo bảng chia 7: 14 : 7 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 7 × 3 = ?',
  '["21","28","14","10"]'::jsonb,
  0,
  1,
  'Theo bảng nhân 7: 7 × 3 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 28 : 7 = ?',
  '["4","5","3","6"]'::jsonb,
  0,
  2,
  'Theo bảng chia 7: 28 : 7 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 7 × 5 = ?',
  '["12","28","42","35"]'::jsonb,
  3,
  3,
  'Theo bảng nhân 7: 7 × 5 = 35.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 42 : 7 = ?',
  '["7","6","5","8"]'::jsonb,
  1,
  4,
  'Theo bảng chia 7: 42 : 7 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 7 × 7 = ?',
  '["14","42","56","49"]'::jsonb,
  3,
  5,
  'Theo bảng nhân 7: 7 × 7 = 49.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 56 : 7 = ?',
  '["8","9","7","10"]'::jsonb,
  0,
  6,
  'Theo bảng chia 7: 56 : 7 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 7 × 9 = ?',
  '["63","70","56","16"]'::jsonb,
  0,
  7,
  'Theo bảng nhân 7: 7 × 9 = 63.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 70 : 7 = ?',
  '["10","9","11","12"]'::jsonb,
  0,
  8,
  'Theo bảng chia 7: 70 : 7 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 7 × 1 = ?',
  '["14","8","7","0"]'::jsonb,
  2,
  9,
  'Theo bảng nhân 7: 7 × 1 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 14 : 7 = ?',
  '["1","3","4","2"]'::jsonb,
  3,
  10,
  'Theo bảng chia 7: 14 : 7 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 7 × 3 = ?',
  '["14","10","28","21"]'::jsonb,
  3,
  11,
  'Theo bảng nhân 7: 7 × 3 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 28 : 7 = ?',
  '["5","4","6","3"]'::jsonb,
  1,
  12,
  'Theo bảng chia 7: 28 : 7 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 7 × 5 = ?',
  '["12","28","35","42"]'::jsonb,
  2,
  13,
  'Theo bảng nhân 7: 7 × 5 = 35.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10017-0000-4000-8000-000000000001',
  'Tính: 42 : 7 = ?',
  '["5","8","7","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 7: 42 : 7 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  11,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10018-0000-4000-8000-000000000001', 'a3b10018-0000-4000-8000-000000000001', 'Ôn tập: Bài 11'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 16 : 8 = ?',
  '["3","1","2","4"]'::jsonb,
  2,
  0,
  'Theo bảng chia 8: 16 : 8 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 8 × 3 = ?',
  '["11","32","24","16"]'::jsonb,
  2,
  1,
  'Theo bảng nhân 8: 8 × 3 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 32 : 8 = ?',
  '["5","6","3","4"]'::jsonb,
  3,
  2,
  'Theo bảng chia 8: 32 : 8 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 8 × 5 = ?',
  '["40","32","48","13"]'::jsonb,
  0,
  3,
  'Theo bảng nhân 8: 8 × 5 = 40.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 48 : 8 = ?',
  '["8","5","7","6"]'::jsonb,
  3,
  4,
  'Theo bảng chia 8: 48 : 8 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 8 × 7 = ?',
  '["64","56","15","48"]'::jsonb,
  1,
  5,
  'Theo bảng nhân 8: 8 × 7 = 56.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 64 : 8 = ?',
  '["10","7","9","8"]'::jsonb,
  3,
  6,
  'Theo bảng chia 8: 64 : 8 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 8 × 9 = ?',
  '["64","80","72","17"]'::jsonb,
  2,
  7,
  'Theo bảng nhân 8: 8 × 9 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 80 : 8 = ?',
  '["10","9","11","12"]'::jsonb,
  0,
  8,
  'Theo bảng chia 8: 80 : 8 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 8 × 1 = ?',
  '["9","0","16","8"]'::jsonb,
  3,
  9,
  'Theo bảng nhân 8: 8 × 1 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 16 : 8 = ?',
  '["3","2","1","4"]'::jsonb,
  1,
  10,
  'Theo bảng chia 8: 16 : 8 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 8 × 3 = ?',
  '["32","11","16","24"]'::jsonb,
  3,
  11,
  'Theo bảng nhân 8: 8 × 3 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 32 : 8 = ?',
  '["5","6","4","3"]'::jsonb,
  2,
  12,
  'Theo bảng chia 8: 32 : 8 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 8 × 5 = ?',
  '["32","48","13","40"]'::jsonb,
  3,
  13,
  'Theo bảng nhân 8: 8 × 5 = 40.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10018-0000-4000-8000-000000000001',
  'Tính: 48 : 8 = ?',
  '["8","5","7","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 8: 48 : 8 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  11,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10019-0000-4000-8000-000000000001', 'a3b10019-0000-4000-8000-000000000001', 'Ôn tập: Bài 11'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 16 : 8 = ?',
  '["1","3","2","4"]'::jsonb,
  2,
  0,
  'Theo bảng chia 8: 16 : 8 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 8 × 3 = ?',
  '["11","24","32","16"]'::jsonb,
  1,
  1,
  'Theo bảng nhân 8: 8 × 3 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 32 : 8 = ?',
  '["6","3","5","4"]'::jsonb,
  3,
  2,
  'Theo bảng chia 8: 32 : 8 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 8 × 5 = ?',
  '["48","40","32","13"]'::jsonb,
  1,
  3,
  'Theo bảng nhân 8: 8 × 5 = 40.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 48 : 8 = ?',
  '["8","6","7","5"]'::jsonb,
  1,
  4,
  'Theo bảng chia 8: 48 : 8 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 8 × 7 = ?',
  '["15","48","64","56"]'::jsonb,
  3,
  5,
  'Theo bảng nhân 8: 8 × 7 = 56.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 64 : 8 = ?',
  '["10","7","9","8"]'::jsonb,
  3,
  6,
  'Theo bảng chia 8: 64 : 8 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 8 × 9 = ?',
  '["72","80","64","17"]'::jsonb,
  0,
  7,
  'Theo bảng nhân 8: 8 × 9 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 80 : 8 = ?',
  '["9","12","11","10"]'::jsonb,
  3,
  8,
  'Theo bảng chia 8: 80 : 8 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 8 × 1 = ?',
  '["8","16","9","0"]'::jsonb,
  0,
  9,
  'Theo bảng nhân 8: 8 × 1 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 16 : 8 = ?',
  '["2","3","4","1"]'::jsonb,
  0,
  10,
  'Theo bảng chia 8: 16 : 8 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 8 × 3 = ?',
  '["16","11","24","32"]'::jsonb,
  2,
  11,
  'Theo bảng nhân 8: 8 × 3 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 32 : 8 = ?',
  '["6","4","5","3"]'::jsonb,
  1,
  12,
  'Theo bảng chia 8: 32 : 8 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 8 × 5 = ?',
  '["13","32","40","48"]'::jsonb,
  2,
  13,
  'Theo bảng nhân 8: 8 × 5 = 40.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10019-0000-4000-8000-000000000001',
  'Tính: 48 : 8 = ?',
  '["7","8","6","5"]'::jsonb,
  2,
  14,
  'Theo bảng chia 8: 48 : 8 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  12,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10020-0000-4000-8000-000000000001', 'a3b10020-0000-4000-8000-000000000001', 'Ôn tập: Bài 12'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 18 : 9 = ?',
  '["1","3","2","4"]'::jsonb,
  2,
  0,
  'Theo bảng chia 9: 18 : 9 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 9 × 3 = ?',
  '["27","12","18","36"]'::jsonb,
  0,
  1,
  'Theo bảng nhân 9: 9 × 3 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 36 : 9 = ?',
  '["3","5","4","6"]'::jsonb,
  2,
  2,
  'Theo bảng chia 9: 36 : 9 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 9 × 5 = ?',
  '["36","54","45","14"]'::jsonb,
  2,
  3,
  'Theo bảng nhân 9: 9 × 5 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 54 : 9 = ?',
  '["5","7","6","8"]'::jsonb,
  2,
  4,
  'Theo bảng chia 9: 54 : 9 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 9 × 7 = ?',
  '["16","54","72","63"]'::jsonb,
  3,
  5,
  'Theo bảng nhân 9: 9 × 7 = 63.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 72 : 9 = ?',
  '["7","9","8","10"]'::jsonb,
  2,
  6,
  'Theo bảng chia 9: 72 : 9 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 9 × 9 = ?',
  '["18","72","90","81"]'::jsonb,
  3,
  7,
  'Theo bảng nhân 9: 9 × 9 = 81.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 90 : 9 = ?',
  '["10","11","9","12"]'::jsonb,
  0,
  8,
  'Theo bảng chia 9: 90 : 9 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 9 × 1 = ?',
  '["9","18","0","10"]'::jsonb,
  0,
  9,
  'Theo bảng nhân 9: 9 × 1 = 9.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 18 : 9 = ?',
  '["4","1","3","2"]'::jsonb,
  3,
  10,
  'Theo bảng chia 9: 18 : 9 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 9 × 3 = ?',
  '["18","36","12","27"]'::jsonb,
  3,
  11,
  'Theo bảng nhân 9: 9 × 3 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 36 : 9 = ?',
  '["4","5","6","3"]'::jsonb,
  0,
  12,
  'Theo bảng chia 9: 36 : 9 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 9 × 5 = ?',
  '["45","36","54","14"]'::jsonb,
  0,
  13,
  'Theo bảng nhân 9: 9 × 5 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10020-0000-4000-8000-000000000001',
  'Tính: 54 : 9 = ?',
  '["5","7","8","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 9: 54 : 9 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  12,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10021-0000-4000-8000-000000000001', 'a3b10021-0000-4000-8000-000000000001', 'Ôn tập: Bài 12'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 18 : 9 = ?',
  '["2","3","1","4"]'::jsonb,
  0,
  0,
  'Theo bảng chia 9: 18 : 9 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 9 × 3 = ?',
  '["27","36","12","18"]'::jsonb,
  0,
  1,
  'Theo bảng nhân 9: 9 × 3 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 36 : 9 = ?',
  '["3","4","6","5"]'::jsonb,
  1,
  2,
  'Theo bảng chia 9: 36 : 9 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 9 × 5 = ?',
  '["45","54","36","14"]'::jsonb,
  0,
  3,
  'Theo bảng nhân 9: 9 × 5 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 54 : 9 = ?',
  '["8","6","7","5"]'::jsonb,
  1,
  4,
  'Theo bảng chia 9: 54 : 9 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 9 × 7 = ?',
  '["72","16","54","63"]'::jsonb,
  3,
  5,
  'Theo bảng nhân 9: 9 × 7 = 63.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 72 : 9 = ?',
  '["9","8","10","7"]'::jsonb,
  1,
  6,
  'Theo bảng chia 9: 72 : 9 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 9 × 9 = ?',
  '["18","81","90","72"]'::jsonb,
  1,
  7,
  'Theo bảng nhân 9: 9 × 9 = 81.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 90 : 9 = ?',
  '["12","9","11","10"]'::jsonb,
  3,
  8,
  'Theo bảng chia 9: 90 : 9 = 10.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 9 × 1 = ?',
  '["18","9","10","0"]'::jsonb,
  1,
  9,
  'Theo bảng nhân 9: 9 × 1 = 9.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 18 : 9 = ?',
  '["2","4","3","1"]'::jsonb,
  0,
  10,
  'Theo bảng chia 9: 18 : 9 = 2.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 9 × 3 = ?',
  '["27","36","12","18"]'::jsonb,
  0,
  11,
  'Theo bảng nhân 9: 9 × 3 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 36 : 9 = ?',
  '["5","6","4","3"]'::jsonb,
  2,
  12,
  'Theo bảng chia 9: 36 : 9 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 9 × 5 = ?',
  '["14","45","36","54"]'::jsonb,
  1,
  13,
  'Theo bảng nhân 9: 9 × 5 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10021-0000-4000-8000-000000000001',
  'Tính: 54 : 9 = ?',
  '["8","5","7","6"]'::jsonb,
  3,
  14,
  'Theo bảng chia 9: 54 : 9 = 6.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  13,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10022-0000-4000-8000-000000000001', 'a3b10022-0000-4000-8000-000000000001', 'Ôn tập: Bài 13'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x × 3 = 12',
  '["9","3","5","4"]'::jsonb,
  3,
  0,
  'Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = 12 : 3 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x : 4 = 5',
  '["9","20","24","16"]'::jsonb,
  1,
  1,
  'Muốn tìm số bị chia, ta lấy thương nhân với số chia: x = 5 × 4 = 20.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: 30 : x = 6',
  '["4","6","24","5"]'::jsonb,
  3,
  2,
  'Muốn tìm số chia, ta lấy số bị chia chia cho thương: x = 30 : 6 = 5.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x × 6 = 42',
  '["36","6","8","7"]'::jsonb,
  3,
  3,
  'Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = 42 : 6 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x : 7 = 8',
  '["56","15","63","49"]'::jsonb,
  0,
  4,
  'Muốn tìm số bị chia, ta lấy thương nhân với số chia: x = 8 × 7 = 56.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: 72 : x = 9',
  '["63","7","9","8"]'::jsonb,
  3,
  5,
  'Muốn tìm số chia, ta lấy số bị chia chia cho thương: x = 72 : 9 = 8.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x × 9 = 36',
  '["3","5","27","4"]'::jsonb,
  3,
  6,
  'Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = 36 : 9 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x : 3 = 5',
  '["12","18","8","15"]'::jsonb,
  3,
  7,
  'Muốn tìm số bị chia, ta lấy thương nhân với số chia: x = 5 × 3 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: 24 : x = 6',
  '["3","5","18","4"]'::jsonb,
  3,
  8,
  'Muốn tìm số chia, ta lấy số bị chia chia cho thương: x = 24 : 6 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x × 5 = 35',
  '["7","8","6","30"]'::jsonb,
  0,
  9,
  'Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = 35 : 5 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x : 6 = 8',
  '["14","48","42","54"]'::jsonb,
  1,
  10,
  'Muốn tìm số bị chia, ta lấy thương nhân với số chia: x = 8 × 6 = 48.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: 63 : x = 9',
  '["54","6","8","7"]'::jsonb,
  3,
  11,
  'Muốn tìm số chia, ta lấy số bị chia chia cho thương: x = 63 : 9 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x × 8 = 32',
  '["3","5","4","24"]'::jsonb,
  2,
  12,
  'Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = 32 : 8 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: x : 9 = 5',
  '["45","54","36","14"]'::jsonb,
  0,
  13,
  'Muốn tìm số bị chia, ta lấy thương nhân với số chia: x = 5 × 9 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10022-0000-4000-8000-000000000001',
  'Tìm x biết: 18 : x = 6',
  '["4","3","2","12"]'::jsonb,
  1,
  14,
  'Muốn tìm số chia, ta lấy số bị chia chia cho thương: x = 18 : 6 = 3.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  14,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10023-0000-4000-8000-000000000001', 'a3b10023-0000-4000-8000-000000000001', 'Ôn tập: Bài 14'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần hai của 6 là bao nhiêu?',
  '["2","4","3"]'::jsonb,
  2,
  0,
  'Để tìm Một phần hai của 6, ta lấy 6 chia cho 2: 6 : 2 = 3.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần hai","Một phần tư","Một phần ba","Toàn bộ hình"]'::jsonb,
  2,
  1,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần tư của 20 là bao nhiêu?',
  '["5","16","6","4"]'::jsonb,
  0,
  2,
  'Để tìm Một phần tư của 20, ta lấy 20 chia cho 4: 20 : 4 = 5.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 5 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Toàn bộ hình","undefined","Một phần tư","Một phần năm"]'::jsonb,
  3,
  3,
  'Tô màu 1 phần trong số 5 phần bằng nhau tức là đã tô màu Một phần năm hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần hai của 14 là bao nhiêu?',
  '["12","6","8","7"]'::jsonb,
  3,
  4,
  'Để tìm Một phần hai của 14, ta lấy 14 chia cho 2: 14 : 2 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần tư","Toàn bộ hình","Một phần ba","Một phần hai"]'::jsonb,
  2,
  5,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần tư của 16 là bao nhiêu?',
  '["4","5","3","12"]'::jsonb,
  0,
  6,
  'Để tìm Một phần tư của 16, ta lấy 16 chia cho 4: 16 : 4 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 5 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần năm","undefined","Một phần tư","Toàn bộ hình"]'::jsonb,
  0,
  7,
  'Tô màu 1 phần trong số 5 phần bằng nhau tức là đã tô màu Một phần năm hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần hai của 12 là bao nhiêu?',
  '["6","7","5","10"]'::jsonb,
  0,
  8,
  'Để tìm Một phần hai của 12, ta lấy 12 chia cho 2: 12 : 2 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Toàn bộ hình","Một phần hai","Một phần tư","Một phần ba"]'::jsonb,
  3,
  9,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần tư của 12 là bao nhiêu?',
  '["8","2","4","3"]'::jsonb,
  3,
  10,
  'Để tìm Một phần tư của 12, ta lấy 12 chia cho 4: 12 : 4 = 3.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 5 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Toàn bộ hình","Một phần tư","Một phần năm","undefined"]'::jsonb,
  2,
  11,
  'Tô màu 1 phần trong số 5 phần bằng nhau tức là đã tô màu Một phần năm hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần hai của 10 là bao nhiêu?',
  '["5","6","4","8"]'::jsonb,
  0,
  12,
  'Để tìm Một phần hai của 10, ta lấy 10 chia cho 2: 10 : 2 = 5.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần hai","Một phần tư","Toàn bộ hình","Một phần ba"]'::jsonb,
  3,
  13,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10023-0000-4000-8000-000000000001',
  'Một phần tư của 28 là bao nhiêu?',
  '["7","8","24","6"]'::jsonb,
  0,
  14,
  'Để tìm Một phần tư của 28, ta lấy 28 chia cho 4: 28 : 4 = 7.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  14,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10024-0000-4000-8000-000000000001', 'a3b10024-0000-4000-8000-000000000001', 'Ôn tập: Bài 14'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần hai của 6 là bao nhiêu?',
  '["3","4","2"]'::jsonb,
  0,
  0,
  'Để tìm Một phần hai của 6, ta lấy 6 chia cho 2: 6 : 2 = 3.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Toàn bộ hình","Một phần tư","Một phần ba","Một phần hai"]'::jsonb,
  2,
  1,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần tư của 20 là bao nhiêu?',
  '["16","5","4","6"]'::jsonb,
  1,
  2,
  'Để tìm Một phần tư của 20, ta lấy 20 chia cho 4: 20 : 4 = 5.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 5 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần tư","Toàn bộ hình","undefined","Một phần năm"]'::jsonb,
  3,
  3,
  'Tô màu 1 phần trong số 5 phần bằng nhau tức là đã tô màu Một phần năm hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần hai của 14 là bao nhiêu?',
  '["8","7","6","12"]'::jsonb,
  1,
  4,
  'Để tìm Một phần hai của 14, ta lấy 14 chia cho 2: 14 : 2 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần tư","Một phần ba","Toàn bộ hình","Một phần hai"]'::jsonb,
  1,
  5,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần tư của 16 là bao nhiêu?',
  '["4","5","3","12"]'::jsonb,
  0,
  6,
  'Để tìm Một phần tư của 16, ta lấy 16 chia cho 4: 16 : 4 = 4.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 5 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần năm","undefined","Một phần tư","Toàn bộ hình"]'::jsonb,
  0,
  7,
  'Tô màu 1 phần trong số 5 phần bằng nhau tức là đã tô màu Một phần năm hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần hai của 12 là bao nhiêu?',
  '["5","7","10","6"]'::jsonb,
  3,
  8,
  'Để tìm Một phần hai của 12, ta lấy 12 chia cho 2: 12 : 2 = 6.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần ba","Một phần tư","Một phần hai","Toàn bộ hình"]'::jsonb,
  0,
  9,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần tư của 12 là bao nhiêu?',
  '["3","8","2","4"]'::jsonb,
  0,
  10,
  'Để tìm Một phần tư của 12, ta lấy 12 chia cho 4: 12 : 4 = 3.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 5 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần năm","Một phần tư","undefined","Toàn bộ hình"]'::jsonb,
  0,
  11,
  'Tô màu 1 phần trong số 5 phần bằng nhau tức là đã tô màu Một phần năm hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần hai của 10 là bao nhiêu?',
  '["5","6","4","8"]'::jsonb,
  0,
  12,
  'Để tìm Một phần hai của 10, ta lấy 10 chia cho 2: 10 : 2 = 5.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một hình chữ nhật chia thành 3 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy hình chữ nhật?',
  '["Một phần hai","Một phần ba","Toàn bộ hình","Một phần tư"]'::jsonb,
  1,
  13,
  'Tô màu 1 phần trong số 3 phần bằng nhau tức là đã tô màu Một phần ba hình.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10024-0000-4000-8000-000000000001',
  'Một phần tư của 28 là bao nhiêu?',
  '["24","6","8","7"]'::jsonb,
  3,
  14,
  'Để tìm Một phần tư của 28, ta lấy 28 chia cho 4: 28 : 4 = 7.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  15,
  'Chủ đề 2: Bảng nhân, bảng chia',
  1
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10025-0000-4000-8000-000000000001', 'a3b10025-0000-4000-8000-000000000001', 'Ôn tập: Bài 15'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["78","82","72","66"]'::jsonb,
  2,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["112","126","129","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["186","168","184","176"]'::jsonb,
  3,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["252","234","243","253"]'::jsonb,
  2,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["320","330","310"]'::jsonb,
  0,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["222","228","232","216"]'::jsonb,
  0,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["294","301","287","304"]'::jsonb,
  0,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["376","386","384","368"]'::jsonb,
  0,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["478","459","477","468"]'::jsonb,
  3,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["570","580","560"]'::jsonb,
  0,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["382","366","372","378"]'::jsonb,
  2,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["476","462","469","479"]'::jsonb,
  2,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["586","576","584","568"]'::jsonb,
  1,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["693","703","702","684"]'::jsonb,
  0,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10025-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["810","830","820"]'::jsonb,
  2,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  15,
  'Chủ đề 2: Bảng nhân, bảng chia',
  2
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10026-0000-4000-8000-000000000001', 'a3b10026-0000-4000-8000-000000000001', 'Ôn tập: Bài 15'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["72","82","78","66"]'::jsonb,
  0,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["119","126","112","129"]'::jsonb,
  0,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["176","184","168","186"]'::jsonb,
  0,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["253","234","252","243"]'::jsonb,
  3,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["320","310","330"]'::jsonb,
  0,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["222","228","216","232"]'::jsonb,
  0,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["294","301","287","304"]'::jsonb,
  0,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["368","384","386","376"]'::jsonb,
  3,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["478","468","477","459"]'::jsonb,
  1,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["580","570","560"]'::jsonb,
  1,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["382","366","378","372"]'::jsonb,
  3,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["469","476","462","479"]'::jsonb,
  0,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["576","586","568","584"]'::jsonb,
  0,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["693","702","684","703"]'::jsonb,
  0,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10026-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["810","830","820"]'::jsonb,
  2,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  16,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10027-0000-4000-8000-000000000001', 'a3b10027-0000-4000-8000-000000000001', 'Ôn tập: Bài 16'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 10 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["10 cm","6 cm","4 cm","5 cm"]'::jsonb,
  3,
  0,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 10 : 2 = 5 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 12 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["6 cm","7 cm","5 cm","12 cm"]'::jsonb,
  0,
  1,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 12 : 2 = 6 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 14 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["7 cm","14 cm","6 cm","8 cm"]'::jsonb,
  0,
  2,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 14 : 2 = 7 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 16 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["16 cm","9 cm","7 cm","8 cm"]'::jsonb,
  3,
  3,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 16 : 2 = 8 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 18 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["10 cm","8 cm","18 cm","9 cm"]'::jsonb,
  3,
  4,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 18 : 2 = 9 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 20 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["9 cm","10 cm","20 cm","11 cm"]'::jsonb,
  1,
  5,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 20 : 2 = 10 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 22 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["22 cm","12 cm","10 cm","11 cm"]'::jsonb,
  3,
  6,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 22 : 2 = 11 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 24 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["13 cm","11 cm","24 cm","12 cm"]'::jsonb,
  3,
  7,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 24 : 2 = 12 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 26 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["13 cm","12 cm","14 cm","26 cm"]'::jsonb,
  0,
  8,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 26 : 2 = 13 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 28 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["28 cm","15 cm","13 cm","14 cm"]'::jsonb,
  3,
  9,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 28 : 2 = 14 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 30 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["30 cm","15 cm","16 cm","14 cm"]'::jsonb,
  1,
  10,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 30 : 2 = 15 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 32 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["15 cm","32 cm","17 cm","16 cm"]'::jsonb,
  3,
  11,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 32 : 2 = 16 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 34 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["17 cm","16 cm","34 cm","18 cm"]'::jsonb,
  0,
  12,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 34 : 2 = 17 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 36 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["18 cm","17 cm","36 cm","19 cm"]'::jsonb,
  0,
  13,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 36 : 2 = 18 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10027-0000-4000-8000-000000000001',
  'Cho đoạn thẳng AB dài 38 cm. M là trung điểm của AB. Độ dài đoạn thẳng AM là:',
  '["18 cm","20 cm","38 cm","19 cm"]'::jsonb,
  3,
  14,
  'M là trung điểm của AB nên AM = MB = AB : 2 = 38 : 2 = 19 cm.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  17,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10028-0000-4000-8000-000000000001', 'a3b10028-0000-4000-8000-000000000001', 'Ôn tập: Bài 17'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 3 cm. Đường kính của hình tròn đó là:',
  '["7 cm","3 cm","5 cm","6 cm"]'::jsonb,
  3,
  0,
  'Đường kính gấp 2 lần bán kính: d = 3 × 2 = 6 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có đường kính là 8 cm. Bán kính của hình tròn đó là:',
  '["8 cm","4 cm","5 cm","3 cm"]'::jsonb,
  1,
  1,
  'Bán kính bằng một nửa đường kính: r = 8 : 2 = 4 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 5 cm. Đường kính của hình tròn đó là:',
  '["11 cm","9 cm","5 cm","10 cm"]'::jsonb,
  3,
  2,
  'Đường kính gấp 2 lần bán kính: d = 5 × 2 = 10 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có đường kính là 12 cm. Bán kính của hình tròn đó là:',
  '["12 cm","6 cm","5 cm","7 cm"]'::jsonb,
  1,
  3,
  'Bán kính bằng một nửa đường kính: r = 12 : 2 = 6 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 7 cm. Đường kính của hình tròn đó là:',
  '["7 cm","14 cm","15 cm","13 cm"]'::jsonb,
  1,
  4,
  'Đường kính gấp 2 lần bán kính: d = 7 × 2 = 14 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có đường kính là 16 cm. Bán kính của hình tròn đó là:',
  '["9 cm","7 cm","16 cm","8 cm"]'::jsonb,
  3,
  5,
  'Bán kính bằng một nửa đường kính: r = 16 : 2 = 8 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 9 cm. Đường kính của hình tròn đó là:',
  '["19 cm","9 cm","18 cm","17 cm"]'::jsonb,
  2,
  6,
  'Đường kính gấp 2 lần bán kính: d = 9 × 2 = 18 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có đường kính là 20 cm. Bán kính của hình tròn đó là:',
  '["10 cm","11 cm","20 cm","9 cm"]'::jsonb,
  0,
  7,
  'Bán kính bằng một nửa đường kính: r = 20 : 2 = 10 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 11 cm. Đường kính của hình tròn đó là:',
  '["22 cm","21 cm","11 cm","23 cm"]'::jsonb,
  0,
  8,
  'Đường kính gấp 2 lần bán kính: d = 11 × 2 = 22 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có đường kính là 24 cm. Bán kính của hình tròn đó là:',
  '["13 cm","12 cm","24 cm","11 cm"]'::jsonb,
  1,
  9,
  'Bán kính bằng một nửa đường kính: r = 24 : 2 = 12 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 13 cm. Đường kính của hình tròn đó là:',
  '["26 cm","25 cm","13 cm","27 cm"]'::jsonb,
  0,
  10,
  'Đường kính gấp 2 lần bán kính: d = 13 × 2 = 26 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có đường kính là 28 cm. Bán kính của hình tròn đó là:',
  '["28 cm","15 cm","14 cm","13 cm"]'::jsonb,
  2,
  11,
  'Bán kính bằng một nửa đường kính: r = 28 : 2 = 14 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 15 cm. Đường kính của hình tròn đó là:',
  '["30 cm","15 cm","31 cm","29 cm"]'::jsonb,
  0,
  12,
  'Đường kính gấp 2 lần bán kính: d = 15 × 2 = 30 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có đường kính là 32 cm. Bán kính của hình tròn đó là:',
  '["17 cm","16 cm","32 cm","15 cm"]'::jsonb,
  1,
  13,
  'Bán kính bằng một nửa đường kính: r = 32 : 2 = 16 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10028-0000-4000-8000-000000000001',
  'Một hình tròn có bán kính là 17 cm. Đường kính của hình tròn đó là:',
  '["33 cm","17 cm","34 cm","35 cm"]'::jsonb,
  2,
  14,
  'Đường kính gấp 2 lần bán kính: d = 17 × 2 = 34 cm.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  18,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10029-0000-4000-8000-000000000001', 'a3b10029-0000-4000-8000-000000000001', 'Ôn tập: Bài 18'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh B có hai cạnh là:',
  '["Cả ba đáp án đều sai","BA và BC","CA và CB","AB và AC"]'::jsonb,
  1,
  0,
  'Góc đỉnh B được tạo bởi hai cạnh xuất phát từ đỉnh B, đó là BA và BC.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?',
  '["Thước ê-ke","Bút chì","Thước dây","Com-pa"]'::jsonb,
  0,
  1,
  'Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh D có hai cạnh là:',
  '["EC và ED","CD và CE","Cả ba đáp án đều sai","DC và DE"]'::jsonb,
  3,
  2,
  'Góc đỉnh D được tạo bởi hai cạnh xuất phát từ đỉnh D, đó là DC và DE.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?',
  '["Com-pa","Thước ê-ke","Thước dây","Bút chì"]'::jsonb,
  1,
  3,
  'Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh G có hai cạnh là:',
  '["GE và GH","EG và EH","HE và HG","Cả ba đáp án đều sai"]'::jsonb,
  0,
  4,
  'Góc đỉnh G được tạo bởi hai cạnh xuất phát từ đỉnh G, đó là GE và GH.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?',
  '["Com-pa","Thước dây","Bút chì","Thước ê-ke"]'::jsonb,
  3,
  5,
  'Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh K có hai cạnh là:',
  '["MH và MK","HK và HM","KH và KM","Cả ba đáp án đều sai"]'::jsonb,
  2,
  6,
  'Góc đỉnh K được tạo bởi hai cạnh xuất phát từ đỉnh K, đó là KH và KM.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?',
  '["Bút chì","Com-pa","Thước dây","Thước ê-ke"]'::jsonb,
  3,
  7,
  'Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh N có hai cạnh là:',
  '["Cả ba đáp án đều sai","AM và AN","MN và MA","NM và NA"]'::jsonb,
  3,
  8,
  'Góc đỉnh N được tạo bởi hai cạnh xuất phát từ đỉnh N, đó là NM và NA.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?',
  '["Bút chì","Thước dây","Com-pa","Thước ê-ke"]'::jsonb,
  3,
  9,
  'Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh B có hai cạnh là:',
  '["BA và BC","AB và AC","CA và CB","Cả ba đáp án đều sai"]'::jsonb,
  0,
  10,
  'Góc đỉnh B được tạo bởi hai cạnh xuất phát từ đỉnh B, đó là BA và BC.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?',
  '["Bút chì","Thước ê-ke","Thước dây","Com-pa"]'::jsonb,
  1,
  11,
  'Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh D có hai cạnh là:',
  '["Cả ba đáp án đều sai","EC và ED","CD và CE","DC và DE"]'::jsonb,
  3,
  12,
  'Góc đỉnh D được tạo bởi hai cạnh xuất phát từ đỉnh D, đó là DC và DE.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Để kiểm tra một góc có vuông hay không, ta thường dùng dụng cụ học tập nào?',
  '["Com-pa","Thước dây","Bút chì","Thước ê-ke"]'::jsonb,
  3,
  13,
  'Ê-ke là dụng cụ chuẩn dùng để kiểm tra và vẽ góc vuông.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10029-0000-4000-8000-000000000001',
  'Góc vuông đỉnh G có hai cạnh là:',
  '["HE và HG","Cả ba đáp án đều sai","EG và EH","GE và GH"]'::jsonb,
  3,
  14,
  'Góc đỉnh G được tạo bởi hai cạnh xuất phát từ đỉnh G, đó là GE và GH.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  19,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10030-0000-4000-8000-000000000001', 'a3b10030-0000-4000-8000-000000000001', 'Ôn tập: Bài 19'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 4 cm. Chu vi hình vuông đó là:',
  '["8 cm","16 cm"]'::jsonb,
  1,
  0,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 4 × 4 = 16 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình chữ nhật có chiều dài 7 cm, chiều rộng 5 cm. Chu vi hình chữ nhật đó là:',
  '["24 cm","12 cm","35 cm","19 cm"]'::jsonb,
  0,
  1,
  'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (7 + 5) × 2 = 24 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 6 cm. Chu vi hình vuông đó là:',
  '["12 cm","24 cm","36 cm","10 cm"]'::jsonb,
  1,
  2,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 6 × 4 = 24 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình chữ nhật có chiều dài 9 cm, chiều rộng 7 cm. Chu vi hình chữ nhật đó là:',
  '["25 cm","63 cm","16 cm","32 cm"]'::jsonb,
  3,
  3,
  'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (9 + 7) × 2 = 32 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 8 cm. Chu vi hình vuông đó là:',
  '["64 cm","16 cm","12 cm","32 cm"]'::jsonb,
  3,
  4,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 8 × 4 = 32 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình chữ nhật có chiều dài 11 cm, chiều rộng 9 cm. Chu vi hình chữ nhật đó là:',
  '["40 cm","31 cm","20 cm","99 cm"]'::jsonb,
  0,
  5,
  'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (11 + 9) × 2 = 40 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 10 cm. Chu vi hình vuông đó là:',
  '["14 cm","100 cm","20 cm","40 cm"]'::jsonb,
  3,
  6,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 10 × 4 = 40 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình chữ nhật có chiều dài 13 cm, chiều rộng 11 cm. Chu vi hình chữ nhật đó là:',
  '["24 cm","37 cm","48 cm","143 cm"]'::jsonb,
  2,
  7,
  'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (13 + 11) × 2 = 48 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 12 cm. Chu vi hình vuông đó là:',
  '["16 cm","144 cm","48 cm","24 cm"]'::jsonb,
  2,
  8,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 12 × 4 = 48 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình chữ nhật có chiều dài 15 cm, chiều rộng 13 cm. Chu vi hình chữ nhật đó là:',
  '["56 cm","28 cm","43 cm","195 cm"]'::jsonb,
  0,
  9,
  'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (15 + 13) × 2 = 56 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 14 cm. Chu vi hình vuông đó là:',
  '["18 cm","56 cm","28 cm","196 cm"]'::jsonb,
  1,
  10,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 14 × 4 = 56 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình chữ nhật có chiều dài 17 cm, chiều rộng 15 cm. Chu vi hình chữ nhật đó là:',
  '["255 cm","32 cm","49 cm","64 cm"]'::jsonb,
  3,
  11,
  'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (17 + 15) × 2 = 64 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 16 cm. Chu vi hình vuông đó là:',
  '["64 cm","32 cm","256 cm","20 cm"]'::jsonb,
  0,
  12,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 16 × 4 = 64 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình chữ nhật có chiều dài 19 cm, chiều rộng 17 cm. Chu vi hình chữ nhật đó là:',
  '["72 cm","36 cm","323 cm","55 cm"]'::jsonb,
  0,
  13,
  'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân 2: P = (19 + 17) × 2 = 72 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10030-0000-4000-8000-000000000001',
  'Một hình vuông có cạnh dài 18 cm. Chu vi hình vuông đó là:',
  '["72 cm","36 cm","324 cm","22 cm"]'::jsonb,
  0,
  14,
  'Chu vi hình vuông bằng cạnh nhân với 4: P = 18 × 4 = 72 cm.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  20,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10031-0000-4000-8000-000000000001', 'a3b10031-0000-4000-8000-000000000001', 'Ôn tập: Bài 20'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["82","72","66","78"]'::jsonb,
  1,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["112","126","129","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["176","184","168","186"]'::jsonb,
  0,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["252","234","253","243"]'::jsonb,
  3,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["310","330","320"]'::jsonb,
  2,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["216","228","232","222"]'::jsonb,
  3,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["294","287","301","304"]'::jsonb,
  0,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["376","384","368","386"]'::jsonb,
  0,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["477","468","478","459"]'::jsonb,
  1,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["560","580","570"]'::jsonb,
  2,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["382","366","378","372"]'::jsonb,
  3,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["469","479","462","476"]'::jsonb,
  0,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["586","568","576","584"]'::jsonb,
  2,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["684","702","693","703"]'::jsonb,
  2,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10031-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["820","830","810"]'::jsonb,
  0,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  21,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10032-0000-4000-8000-000000000001', 'a3b10032-0000-4000-8000-000000000001', 'Ôn tập: Bài 21'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["72","78","66","82"]'::jsonb,
  0,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["119","126","112","129"]'::jsonb,
  0,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["176","184","186","168"]'::jsonb,
  0,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["243","252","253","234"]'::jsonb,
  0,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["320","330","310"]'::jsonb,
  0,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["222","228","232","216"]'::jsonb,
  0,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["304","287","301","294"]'::jsonb,
  3,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["376","384","368","386"]'::jsonb,
  0,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["468","478","477","459"]'::jsonb,
  0,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["560","580","570"]'::jsonb,
  2,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["372","382","366","378"]'::jsonb,
  0,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["469","479","476","462"]'::jsonb,
  0,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["576","584","568","586"]'::jsonb,
  0,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["702","684","703","693"]'::jsonb,
  3,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10032-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["830","820","810"]'::jsonb,
  1,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  22,
  'Chủ đề 3: Làm quen với hình phẳng, hình khối',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10033-0000-4000-8000-000000000001', 'a3b10033-0000-4000-8000-000000000001', 'Ôn tập: Bài 22'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["72","78","66","82"]'::jsonb,
  0,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["129","112","126","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["176","184","168","186"]'::jsonb,
  0,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["234","252","243","253"]'::jsonb,
  2,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["310","330","320"]'::jsonb,
  2,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["216","232","228","222"]'::jsonb,
  3,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["301","287","294","304"]'::jsonb,
  2,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["368","384","386","376"]'::jsonb,
  3,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["459","477","478","468"]'::jsonb,
  3,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["580","560","570"]'::jsonb,
  2,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["378","372","366","382"]'::jsonb,
  1,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["476","469","462","479"]'::jsonb,
  1,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["586","568","584","576"]'::jsonb,
  3,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["684","702","693","703"]'::jsonb,
  2,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10033-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["830","810","820"]'::jsonb,
  2,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  23,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10034-0000-4000-8000-000000000001', 'a3b10034-0000-4000-8000-000000000001', 'Ôn tập: Bài 23'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 12 × 2 = ?',
  '["24","14","34","22"]'::jsonb,
  0,
  0,
  'Đặt tính rồi tính: 12 × 2 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 16 × 3 = ?',
  '["48","38","46","58"]'::jsonb,
  0,
  1,
  'Đặt tính rồi tính: 16 × 3 = 48.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 20 × 4 = ?',
  '["70","80","78","90"]'::jsonb,
  1,
  2,
  'Đặt tính rồi tính: 20 × 4 = 80.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 24 × 5 = ?',
  '["120","110","130","118"]'::jsonb,
  0,
  3,
  'Đặt tính rồi tính: 24 × 5 = 120.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 28 × 2 = ?',
  '["56","46","66","54"]'::jsonb,
  0,
  4,
  'Đặt tính rồi tính: 28 × 2 = 56.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 32 × 3 = ?',
  '["96","86","106","94"]'::jsonb,
  0,
  5,
  'Đặt tính rồi tính: 32 × 3 = 96.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 36 × 4 = ?',
  '["154","142","144","134"]'::jsonb,
  2,
  6,
  'Đặt tính rồi tính: 36 × 4 = 144.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 40 × 5 = ?',
  '["198","200","190","210"]'::jsonb,
  1,
  7,
  'Đặt tính rồi tính: 40 × 5 = 200.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 44 × 2 = ?',
  '["86","98","78","88"]'::jsonb,
  3,
  8,
  'Đặt tính rồi tính: 44 × 2 = 88.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 48 × 3 = ?',
  '["144","134","154","142"]'::jsonb,
  0,
  9,
  'Đặt tính rồi tính: 48 × 3 = 144.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 52 × 4 = ?',
  '["208","198","218","206"]'::jsonb,
  0,
  10,
  'Đặt tính rồi tính: 52 × 4 = 208.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 56 × 5 = ?',
  '["278","290","280","270"]'::jsonb,
  2,
  11,
  'Đặt tính rồi tính: 56 × 5 = 280.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 60 × 2 = ?',
  '["118","130","110","120"]'::jsonb,
  3,
  12,
  'Đặt tính rồi tính: 60 × 2 = 120.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 64 × 3 = ?',
  '["190","202","182","192"]'::jsonb,
  3,
  13,
  'Đặt tính rồi tính: 64 × 3 = 192.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10034-0000-4000-8000-000000000001',
  'Tính: 68 × 4 = ?',
  '["270","282","272","262"]'::jsonb,
  2,
  14,
  'Đặt tính rồi tính: 68 × 4 = 272.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  24,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10035-0000-4000-8000-000000000001', 'a3b10035-0000-4000-8000-000000000001', 'Ôn tập: Bài 24'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 5 lên 3 lần ta được số nào?',
  '["8","15","12","25"]'::jsonb,
  1,
  0,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 5 × 3 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 7 lên 4 lần ta được số nào?',
  '["28","38","11","24"]'::jsonb,
  0,
  1,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 7 × 4 = 28.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 9 lên 5 lần ta được số nào?',
  '["40","45","55","14"]'::jsonb,
  1,
  2,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 9 × 5 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 11 lên 6 lần ta được số nào?',
  '["76","66","17","60"]'::jsonb,
  1,
  3,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 11 × 6 = 66.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 13 lên 3 lần ta được số nào?',
  '["36","16","39","49"]'::jsonb,
  2,
  4,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 13 × 3 = 39.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 15 lên 4 lần ta được số nào?',
  '["60","70","56","19"]'::jsonb,
  0,
  5,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 15 × 4 = 60.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 17 lên 5 lần ta được số nào?',
  '["95","80","22","85"]'::jsonb,
  3,
  6,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 17 × 5 = 85.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 19 lên 6 lần ta được số nào?',
  '["124","114","25","108"]'::jsonb,
  1,
  7,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 19 × 6 = 114.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 21 lên 3 lần ta được số nào?',
  '["60","73","63","24"]'::jsonb,
  2,
  8,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 21 × 3 = 63.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 23 lên 4 lần ta được số nào?',
  '["88","102","27","92"]'::jsonb,
  3,
  9,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 23 × 4 = 92.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 25 lên 5 lần ta được số nào?',
  '["125","30","120","135"]'::jsonb,
  0,
  10,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 25 × 5 = 125.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 27 lên 6 lần ta được số nào?',
  '["156","172","33","162"]'::jsonb,
  3,
  11,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 27 × 6 = 162.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 29 lên 3 lần ta được số nào?',
  '["97","84","32","87"]'::jsonb,
  3,
  12,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 29 × 3 = 87.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 31 lên 4 lần ta được số nào?',
  '["124","35","120","134"]'::jsonb,
  0,
  13,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 31 × 4 = 124.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10035-0000-4000-8000-000000000001',
  'Gấp số 33 lên 5 lần ta được số nào?',
  '["38","175","165","160"]'::jsonb,
  2,
  14,
  'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 33 × 5 = 165.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  25,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10036-0000-4000-8000-000000000001', 'a3b10036-0000-4000-8000-000000000001', 'Ôn tập: Bài 25'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 13 : 3 có số dư là bao nhiêu?',
  '["3","2","0","1"]'::jsonb,
  3,
  0,
  'Vì 13 = 3 × 4 + 1 nên 13 : 3 = 4 (dư 1).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 22 : 4 có số dư là bao nhiêu?',
  '["2","0","4","3"]'::jsonb,
  0,
  1,
  'Vì 22 = 4 × 5 + 2 nên 22 : 4 = 5 (dư 2).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 33 : 5 có số dư là bao nhiêu?',
  '["4","5","0","3"]'::jsonb,
  3,
  2,
  'Vì 33 = 5 × 6 + 3 nên 33 : 5 = 6 (dư 3).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 46 : 6 có số dư là bao nhiêu?',
  '["4","0","6","5"]'::jsonb,
  0,
  3,
  'Vì 46 = 6 × 7 + 4 nên 46 : 6 = 7 (dư 4).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 61 : 7 có số dư là bao nhiêu?',
  '["5","0","7","6"]'::jsonb,
  0,
  4,
  'Vì 61 = 7 × 8 + 5 nên 61 : 7 = 8 (dư 5).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 38 : 8 có số dư là bao nhiêu?',
  '["7","8","0","6"]'::jsonb,
  3,
  5,
  'Vì 38 = 8 × 4 + 6 nên 38 : 8 = 4 (dư 6).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 16 : 3 có số dư là bao nhiêu?',
  '["0","1","3","2"]'::jsonb,
  1,
  6,
  'Vì 16 = 3 × 5 + 1 nên 16 : 3 = 5 (dư 1).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 26 : 4 có số dư là bao nhiêu?',
  '["3","2","4","0"]'::jsonb,
  1,
  7,
  'Vì 26 = 4 × 6 + 2 nên 26 : 4 = 6 (dư 2).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 36 : 5 có số dư là bao nhiêu?',
  '["1","0","5","2"]'::jsonb,
  0,
  8,
  'Vì 36 = 5 × 7 + 1 nên 36 : 5 = 7 (dư 1).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 53 : 6 có số dư là bao nhiêu?',
  '["0","5","6"]'::jsonb,
  1,
  9,
  'Vì 53 = 6 × 8 + 5 nên 53 : 6 = 8 (dư 5).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 33 : 7 có số dư là bao nhiêu?',
  '["5","0","7","6"]'::jsonb,
  0,
  10,
  'Vì 33 = 7 × 4 + 5 nên 33 : 7 = 4 (dư 5).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 45 : 8 có số dư là bao nhiêu?',
  '["5","0","8","6"]'::jsonb,
  0,
  11,
  'Vì 45 = 8 × 5 + 5 nên 45 : 8 = 5 (dư 5).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 19 : 3 có số dư là bao nhiêu?',
  '["2","3","0","1"]'::jsonb,
  3,
  12,
  'Vì 19 = 3 × 6 + 1 nên 19 : 3 = 6 (dư 1).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 30 : 4 có số dư là bao nhiêu?',
  '["4","0","3","2"]'::jsonb,
  3,
  13,
  'Vì 30 = 4 × 7 + 2 nên 30 : 4 = 7 (dư 2).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10036-0000-4000-8000-000000000001',
  'Phép chia 43 : 5 có số dư là bao nhiêu?',
  '["4","3","0","5"]'::jsonb,
  1,
  14,
  'Vì 43 = 5 × 8 + 3 nên 43 : 5 = 8 (dư 3).'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  26,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10037-0000-4000-8000-000000000001', 'a3b10037-0000-4000-8000-000000000001', 'Ôn tập: Bài 26'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 24 : 2 = ?',
  '["22","11","13","12"]'::jsonb,
  3,
  0,
  'Đặt tính rồi tính: 24 : 2 = 12.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 45 : 3 = ?',
  '["16","42","15","14"]'::jsonb,
  2,
  1,
  'Đặt tính rồi tính: 45 : 3 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 72 : 4 = ?',
  '["18","68","19","17"]'::jsonb,
  0,
  2,
  'Đặt tính rồi tính: 72 : 4 = 18.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 105 : 5 = ?',
  '["21","22","20","100"]'::jsonb,
  0,
  3,
  'Đặt tính rồi tính: 105 : 5 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 48 : 2 = ?',
  '["24","25","23","46"]'::jsonb,
  0,
  4,
  'Đặt tính rồi tính: 48 : 2 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 81 : 3 = ?',
  '["78","26","28","27"]'::jsonb,
  3,
  5,
  'Đặt tính rồi tính: 81 : 3 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 120 : 4 = ?',
  '["30","29","31","116"]'::jsonb,
  0,
  6,
  'Đặt tính rồi tính: 120 : 4 = 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 165 : 5 = ?',
  '["33","34","160","32"]'::jsonb,
  0,
  7,
  'Đặt tính rồi tính: 165 : 5 = 33.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 72 : 2 = ?',
  '["36","37","35","70"]'::jsonb,
  0,
  8,
  'Đặt tính rồi tính: 72 : 2 = 36.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 117 : 3 = ?',
  '["38","40","114","39"]'::jsonb,
  3,
  9,
  'Đặt tính rồi tính: 117 : 3 = 39.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 168 : 4 = ?',
  '["41","164","42","43"]'::jsonb,
  2,
  10,
  'Đặt tính rồi tính: 168 : 4 = 42.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 225 : 5 = ?',
  '["44","45","220","46"]'::jsonb,
  1,
  11,
  'Đặt tính rồi tính: 225 : 5 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 96 : 2 = ?',
  '["94","47","49","48"]'::jsonb,
  3,
  12,
  'Đặt tính rồi tính: 96 : 2 = 48.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 153 : 3 = ?',
  '["50","52","150","51"]'::jsonb,
  3,
  13,
  'Đặt tính rồi tính: 153 : 3 = 51.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10037-0000-4000-8000-000000000001',
  'Tính: 216 : 4 = ?',
  '["54","55","212","53"]'::jsonb,
  0,
  14,
  'Đặt tính rồi tính: 216 : 4 = 54.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  27,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10038-0000-4000-8000-000000000001', 'a3b10038-0000-4000-8000-000000000001', 'Ôn tập: Bài 27'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 10 đi 2 lần ta được số nào?',
  '["8","5","7","3"]'::jsonb,
  1,
  0,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 10 : 2 = 5.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 21 đi 3 lần ta được số nào?',
  '["5","9","18","7"]'::jsonb,
  3,
  1,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 21 : 3 = 7.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 36 đi 4 lần ta được số nào?',
  '["7","11","32","9"]'::jsonb,
  3,
  2,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 36 : 4 = 9.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 55 đi 5 lần ta được số nào?',
  '["9","50","13","11"]'::jsonb,
  3,
  3,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 55 : 5 = 11.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 26 đi 2 lần ta được số nào?',
  '["13","24","15","11"]'::jsonb,
  0,
  4,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 26 : 2 = 13.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 45 đi 3 lần ta được số nào?',
  '["13","17","42","15"]'::jsonb,
  3,
  5,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 45 : 3 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 68 đi 4 lần ta được số nào?',
  '["17","64","19","15"]'::jsonb,
  0,
  6,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 68 : 4 = 17.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 95 đi 5 lần ta được số nào?',
  '["17","90","19","21"]'::jsonb,
  2,
  7,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 95 : 5 = 19.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 42 đi 2 lần ta được số nào?',
  '["23","19","40","21"]'::jsonb,
  3,
  8,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 42 : 2 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 69 đi 3 lần ta được số nào?',
  '["66","21","23","25"]'::jsonb,
  2,
  9,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 69 : 3 = 23.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 100 đi 4 lần ta được số nào?',
  '["23","96","25","27"]'::jsonb,
  2,
  10,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 100 : 4 = 25.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 135 đi 5 lần ta được số nào?',
  '["27","130","25","29"]'::jsonb,
  0,
  11,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 135 : 5 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 58 đi 2 lần ta được số nào?',
  '["27","29","56","31"]'::jsonb,
  1,
  12,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 58 : 2 = 29.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 93 đi 3 lần ta được số nào?',
  '["29","31","90","33"]'::jsonb,
  1,
  13,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 93 : 3 = 31.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10038-0000-4000-8000-000000000001',
  'Giảm số 132 đi 4 lần ta được số nào?',
  '["31","35","128","33"]'::jsonb,
  3,
  14,
  'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 132 : 4 = 33.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  28,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10039-0000-4000-8000-000000000001', 'a3b10039-0000-4000-8000-000000000001', 'Ôn tập: Bài 28'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 10 quyển sách. Ngăn thứ hai có số sách gấp 2 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["20 quyển","30 quyển","12 quyển","40 quyển"]'::jsonb,
  1,
  0,
  'Bước 1: Ngăn thứ hai có: 10 × 2 = 20 quyển. Bước 2: Cả hai ngăn có: 10 + 20 = 30 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 11 quyển sách. Ngăn thứ hai có số sách gấp 3 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["55 quyển","33 quyển","44 quyển","14 quyển"]'::jsonb,
  2,
  1,
  'Bước 1: Ngăn thứ hai có: 11 × 3 = 33 quyển. Bước 2: Cả hai ngăn có: 11 + 33 = 44 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 12 quyển sách. Ngăn thứ hai có số sách gấp 4 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["60 quyển","48 quyển","72 quyển","16 quyển"]'::jsonb,
  0,
  2,
  'Bước 1: Ngăn thứ hai có: 12 × 4 = 48 quyển. Bước 2: Cả hai ngăn có: 12 + 48 = 60 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 13 quyển sách. Ngăn thứ hai có số sách gấp 2 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["26 quyển","39 quyển","52 quyển","15 quyển"]'::jsonb,
  1,
  3,
  'Bước 1: Ngăn thứ hai có: 13 × 2 = 26 quyển. Bước 2: Cả hai ngăn có: 13 + 26 = 39 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 14 quyển sách. Ngăn thứ hai có số sách gấp 3 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["42 quyển","70 quyển","17 quyển","56 quyển"]'::jsonb,
  3,
  4,
  'Bước 1: Ngăn thứ hai có: 14 × 3 = 42 quyển. Bước 2: Cả hai ngăn có: 14 + 42 = 56 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 15 quyển sách. Ngăn thứ hai có số sách gấp 4 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["75 quyển","19 quyển","90 quyển","60 quyển"]'::jsonb,
  0,
  5,
  'Bước 1: Ngăn thứ hai có: 15 × 4 = 60 quyển. Bước 2: Cả hai ngăn có: 15 + 60 = 75 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 16 quyển sách. Ngăn thứ hai có số sách gấp 2 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["18 quyển","64 quyển","32 quyển","48 quyển"]'::jsonb,
  3,
  6,
  'Bước 1: Ngăn thứ hai có: 16 × 2 = 32 quyển. Bước 2: Cả hai ngăn có: 16 + 32 = 48 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 17 quyển sách. Ngăn thứ hai có số sách gấp 3 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["20 quyển","85 quyển","51 quyển","68 quyển"]'::jsonb,
  3,
  7,
  'Bước 1: Ngăn thứ hai có: 17 × 3 = 51 quyển. Bước 2: Cả hai ngăn có: 17 + 51 = 68 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 18 quyển sách. Ngăn thứ hai có số sách gấp 4 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["22 quyển","108 quyển","72 quyển","90 quyển"]'::jsonb,
  3,
  8,
  'Bước 1: Ngăn thứ hai có: 18 × 4 = 72 quyển. Bước 2: Cả hai ngăn có: 18 + 72 = 90 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 19 quyển sách. Ngăn thứ hai có số sách gấp 2 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["57 quyển","38 quyển","76 quyển","21 quyển"]'::jsonb,
  0,
  9,
  'Bước 1: Ngăn thứ hai có: 19 × 2 = 38 quyển. Bước 2: Cả hai ngăn có: 19 + 38 = 57 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 20 quyển sách. Ngăn thứ hai có số sách gấp 3 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["100 quyển","60 quyển","80 quyển","23 quyển"]'::jsonb,
  2,
  10,
  'Bước 1: Ngăn thứ hai có: 20 × 3 = 60 quyển. Bước 2: Cả hai ngăn có: 20 + 60 = 80 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 21 quyển sách. Ngăn thứ hai có số sách gấp 4 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["105 quyển","84 quyển","25 quyển","126 quyển"]'::jsonb,
  0,
  11,
  'Bước 1: Ngăn thứ hai có: 21 × 4 = 84 quyển. Bước 2: Cả hai ngăn có: 21 + 84 = 105 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 22 quyển sách. Ngăn thứ hai có số sách gấp 2 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["66 quyển","44 quyển","88 quyển","24 quyển"]'::jsonb,
  0,
  12,
  'Bước 1: Ngăn thứ hai có: 22 × 2 = 44 quyển. Bước 2: Cả hai ngăn có: 22 + 44 = 66 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 23 quyển sách. Ngăn thứ hai có số sách gấp 3 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["69 quyển","115 quyển","92 quyển","26 quyển"]'::jsonb,
  2,
  13,
  'Bước 1: Ngăn thứ hai có: 23 × 3 = 69 quyển. Bước 2: Cả hai ngăn có: 23 + 69 = 92 quyển.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10039-0000-4000-8000-000000000001',
  'Ngăn thứ nhất có 24 quyển sách. Ngăn thứ hai có số sách gấp 4 lần ngăn thứ nhất. Cả hai ngăn có bao nhiêu quyển sách?',
  '["144 quyển","96 quyển","28 quyển","120 quyển"]'::jsonb,
  3,
  14,
  'Bước 1: Ngăn thứ hai có: 24 × 4 = 96 quyển. Bước 2: Cả hai ngăn có: 24 + 96 = 120 quyển.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  29,
  'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10040-0000-4000-8000-000000000001', 'a3b10040-0000-4000-8000-000000000001', 'Ôn tập: Bài 29'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["72","82","78","66"]'::jsonb,
  0,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["112","126","129","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["176","184","168","186"]'::jsonb,
  0,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["243","253","252","234"]'::jsonb,
  0,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["320","330","310"]'::jsonb,
  0,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["222","228","216","232"]'::jsonb,
  0,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["287","301","294","304"]'::jsonb,
  2,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["376","384","386","368"]'::jsonb,
  0,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["468","477","459","478"]'::jsonb,
  0,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["560","580","570"]'::jsonb,
  2,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["378","366","382","372"]'::jsonb,
  3,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["479","462","476","469"]'::jsonb,
  3,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["576","584","568","586"]'::jsonb,
  0,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["703","693","702","684"]'::jsonb,
  1,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10040-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["820","830","810"]'::jsonb,
  0,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  30,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10041-0000-4000-8000-000000000001', 'a3b10041-0000-4000-8000-000000000001', 'Ôn tập: Bài 30'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 cm = ...... mm?',
  '["50","5","15","500"]'::jsonb,
  0,
  0,
  'Vì 1 cm = 10 mm nên 5 cm = 50 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 6 cm = ...... mm?',
  '["16","600","6","60"]'::jsonb,
  3,
  1,
  'Vì 1 cm = 10 mm nên 6 cm = 60 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 7 cm = ...... mm?',
  '["70","17","7","700"]'::jsonb,
  0,
  2,
  'Vì 1 cm = 10 mm nên 7 cm = 70 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 8 cm = ...... mm?',
  '["8","18","800","80"]'::jsonb,
  3,
  3,
  'Vì 1 cm = 10 mm nên 8 cm = 80 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 9 cm = ...... mm?',
  '["9","90","900","19"]'::jsonb,
  1,
  4,
  'Vì 1 cm = 10 mm nên 9 cm = 90 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 10 cm = ...... mm?',
  '["20","1000","10","100"]'::jsonb,
  3,
  5,
  'Vì 1 cm = 10 mm nên 10 cm = 100 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 11 cm = ...... mm?',
  '["11","110","21","1100"]'::jsonb,
  1,
  6,
  'Vì 1 cm = 10 mm nên 11 cm = 110 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 12 cm = ...... mm?',
  '["1200","120","22","12"]'::jsonb,
  1,
  7,
  'Vì 1 cm = 10 mm nên 12 cm = 120 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 13 cm = ...... mm?',
  '["23","1300","13","130"]'::jsonb,
  3,
  8,
  'Vì 1 cm = 10 mm nên 13 cm = 130 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 14 cm = ...... mm?',
  '["24","1400","14","140"]'::jsonb,
  3,
  9,
  'Vì 1 cm = 10 mm nên 14 cm = 140 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 15 cm = ...... mm?',
  '["150","15","1500","25"]'::jsonb,
  0,
  10,
  'Vì 1 cm = 10 mm nên 15 cm = 150 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 16 cm = ...... mm?',
  '["26","160","16","1600"]'::jsonb,
  1,
  11,
  'Vì 1 cm = 10 mm nên 16 cm = 160 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 17 cm = ...... mm?',
  '["170","17","1700","27"]'::jsonb,
  0,
  12,
  'Vì 1 cm = 10 mm nên 17 cm = 170 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 18 cm = ...... mm?',
  '["28","180","18","1800"]'::jsonb,
  1,
  13,
  'Vì 1 cm = 10 mm nên 18 cm = 180 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10041-0000-4000-8000-000000000001',
  'Đổi đơn vị: 19 cm = ...... mm?',
  '["29","1900","19","190"]'::jsonb,
  3,
  14,
  'Vì 1 cm = 10 mm nên 19 cm = 190 mm.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  31,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10042-0000-4000-8000-000000000001', 'a3b10042-0000-4000-8000-000000000001', 'Ôn tập: Bài 31'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 kg = ...... g?',
  '["2000","200","20","2"]'::jsonb,
  0,
  0,
  'Vì 1 kg = 1000 g nên 2 kg = 2000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 3 kg = ...... g?',
  '["3000","300","30","3"]'::jsonb,
  0,
  1,
  'Vì 1 kg = 1000 g nên 3 kg = 3000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 kg = ...... g?',
  '["4","400","4000","40"]'::jsonb,
  2,
  2,
  'Vì 1 kg = 1000 g nên 4 kg = 4000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 kg = ...... g?',
  '["500","5000","50","5"]'::jsonb,
  1,
  3,
  'Vì 1 kg = 1000 g nên 5 kg = 5000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 6 kg = ...... g?',
  '["600","6000","60","6"]'::jsonb,
  1,
  4,
  'Vì 1 kg = 1000 g nên 6 kg = 6000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 kg = ...... g?',
  '["20","2","200","2000"]'::jsonb,
  3,
  5,
  'Vì 1 kg = 1000 g nên 2 kg = 2000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 3 kg = ...... g?',
  '["3","30","300","3000"]'::jsonb,
  3,
  6,
  'Vì 1 kg = 1000 g nên 3 kg = 3000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 kg = ...... g?',
  '["400","4","4000","40"]'::jsonb,
  2,
  7,
  'Vì 1 kg = 1000 g nên 4 kg = 4000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 kg = ...... g?',
  '["500","5","5000","50"]'::jsonb,
  2,
  8,
  'Vì 1 kg = 1000 g nên 5 kg = 5000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 6 kg = ...... g?',
  '["6000","600","60","6"]'::jsonb,
  0,
  9,
  'Vì 1 kg = 1000 g nên 6 kg = 6000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 kg = ...... g?',
  '["2","20","200","2000"]'::jsonb,
  3,
  10,
  'Vì 1 kg = 1000 g nên 2 kg = 2000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 3 kg = ...... g?',
  '["300","3000","30","3"]'::jsonb,
  1,
  11,
  'Vì 1 kg = 1000 g nên 3 kg = 3000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 kg = ...... g?',
  '["4000","400","40","4"]'::jsonb,
  0,
  12,
  'Vì 1 kg = 1000 g nên 4 kg = 4000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 kg = ...... g?',
  '["500","5","5000","50"]'::jsonb,
  2,
  13,
  'Vì 1 kg = 1000 g nên 5 kg = 5000 g.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10042-0000-4000-8000-000000000001',
  'Đổi đơn vị: 6 kg = ...... g?',
  '["6","60","600","6000"]'::jsonb,
  3,
  14,
  'Vì 1 kg = 1000 g nên 6 kg = 6000 g.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  32,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10043-0000-4000-8000-000000000001', 'a3b10043-0000-4000-8000-000000000001', 'Ôn tập: Bài 32'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 l = ...... ml?',
  '["20","200","2000","2"]'::jsonb,
  2,
  0,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 2 l = 2000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 3 l = ...... ml?',
  '["3000","3","300","30"]'::jsonb,
  0,
  1,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 3 l = 3000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 l = ...... ml?',
  '["4","40","400","4000"]'::jsonb,
  3,
  2,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 4 l = 4000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 l = ...... ml?',
  '["500","5","50","5000"]'::jsonb,
  3,
  3,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 5 l = 5000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 6 l = ...... ml?',
  '["60","600","6","6000"]'::jsonb,
  3,
  4,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 6 l = 6000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 l = ...... ml?',
  '["200","2000","20","2"]'::jsonb,
  1,
  5,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 2 l = 2000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 3 l = ...... ml?',
  '["3","30","300","3000"]'::jsonb,
  3,
  6,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 3 l = 3000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 l = ...... ml?',
  '["4000","400","40","4"]'::jsonb,
  0,
  7,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 4 l = 4000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 l = ...... ml?',
  '["5","50","500","5000"]'::jsonb,
  3,
  8,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 5 l = 5000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 6 l = ...... ml?',
  '["6000","60","600","6"]'::jsonb,
  0,
  9,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 6 l = 6000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 l = ...... ml?',
  '["2","200","2000","20"]'::jsonb,
  2,
  10,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 2 l = 2000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 3 l = ...... ml?',
  '["3000","300","3","30"]'::jsonb,
  0,
  11,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 3 l = 3000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 l = ...... ml?',
  '["400","40","4000","4"]'::jsonb,
  2,
  12,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 4 l = 4000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 l = ...... ml?',
  '["5000","500","5","50"]'::jsonb,
  0,
  13,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 5 l = 5000 ml.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10043-0000-4000-8000-000000000001',
  'Đổi đơn vị: 6 l = ...... ml?',
  '["6000","600","60","6"]'::jsonb,
  0,
  14,
  'Vì 1 lít (l) = 1000 mi-li-lít (ml) nên 6 l = 6000 ml.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  33,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10044-0000-4000-8000-000000000001', 'a3b10044-0000-4000-8000-000000000001', 'Ôn tập: Bài 33'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["37 độ C","39 độ C","42 độ C","35 độ C"]'::jsonb,
  0,
  0,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["42 độ C","35 độ C","39 độ C","37 độ C"]'::jsonb,
  3,
  1,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["35 độ C","39 độ C","37 độ C","42 độ C"]'::jsonb,
  2,
  2,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["37 độ C","39 độ C","35 độ C","42 độ C"]'::jsonb,
  0,
  3,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["42 độ C","35 độ C","39 độ C","37 độ C"]'::jsonb,
  3,
  4,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["37 độ C","39 độ C","35 độ C","42 độ C"]'::jsonb,
  0,
  5,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["35 độ C","37 độ C","39 độ C","42 độ C"]'::jsonb,
  1,
  6,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["39 độ C","37 độ C","35 độ C","42 độ C"]'::jsonb,
  1,
  7,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["42 độ C","39 độ C","37 độ C","35 độ C"]'::jsonb,
  2,
  8,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["42 độ C","35 độ C","39 độ C","37 độ C"]'::jsonb,
  3,
  9,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["37 độ C","39 độ C","35 độ C","42 độ C"]'::jsonb,
  0,
  10,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["35 độ C","42 độ C","39 độ C","37 độ C"]'::jsonb,
  3,
  11,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["35 độ C","39 độ C","37 độ C","42 độ C"]'::jsonb,
  2,
  12,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["37 độ C","39 độ C","42 độ C","35 độ C"]'::jsonb,
  0,
  13,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10044-0000-4000-8000-000000000001',
  'Nhiệt kế chỉ nhiệt độ cơ thể người bình thường khỏe mạnh là khoảng bao nhiêu?',
  '["42 độ C","35 độ C","39 độ C","37 độ C"]'::jsonb,
  3,
  14,
  'Nhiệt độ cơ thể của người khỏe mạnh bình thường xấp xỉ 37 độ C.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  34,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10045-0000-4000-8000-000000000001', 'a3b10045-0000-4000-8000-000000000001', 'Ôn tập: Bài 34'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 2 m = ...... dm?',
  '["200","20","2000","2"]'::jsonb,
  1,
  0,
  'Vì 1 m = 10 dm nên 2 m = 20 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 4 dm = ...... cm?',
  '["4","400","40","4000"]'::jsonb,
  2,
  1,
  'Vì 1 dm = 10 cm nên 4 dm = 40 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 7 cm = ...... mm?',
  '["70","700","7000","7"]'::jsonb,
  0,
  2,
  'Vì 1 cm = 10 mm nên 7 cm = 70 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 5 m = ...... dm?',
  '["50","500","5000","5"]'::jsonb,
  0,
  3,
  'Vì 1 m = 10 dm nên 5 m = 50 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 7 dm = ...... cm?',
  '["7000","7","700","70"]'::jsonb,
  3,
  4,
  'Vì 1 dm = 10 cm nên 7 dm = 70 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 10 cm = ...... mm?',
  '["100","1000","10","10000"]'::jsonb,
  0,
  5,
  'Vì 1 cm = 10 mm nên 10 cm = 100 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 8 m = ...... dm?',
  '["80","800","8","8000"]'::jsonb,
  0,
  6,
  'Vì 1 m = 10 dm nên 8 m = 80 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 10 dm = ...... cm?',
  '["10","1000","100","10000"]'::jsonb,
  2,
  7,
  'Vì 1 dm = 10 cm nên 10 dm = 100 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 13 cm = ...... mm?',
  '["130","1300","13","13000"]'::jsonb,
  0,
  8,
  'Vì 1 cm = 10 mm nên 13 cm = 130 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 11 m = ...... dm?',
  '["11000","110","1100","11"]'::jsonb,
  1,
  9,
  'Vì 1 m = 10 dm nên 11 m = 110 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 13 dm = ...... cm?',
  '["1300","130","13","13000"]'::jsonb,
  1,
  10,
  'Vì 1 dm = 10 cm nên 13 dm = 130 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 16 cm = ...... mm?',
  '["16000","1600","160","16"]'::jsonb,
  2,
  11,
  'Vì 1 cm = 10 mm nên 16 cm = 160 mm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 14 m = ...... dm?',
  '["1400","140","14","14000"]'::jsonb,
  1,
  12,
  'Vì 1 m = 10 dm nên 14 m = 140 dm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 16 dm = ...... cm?',
  '["16000","16","1600","160"]'::jsonb,
  3,
  13,
  'Vì 1 dm = 10 cm nên 16 dm = 160 cm.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10045-0000-4000-8000-000000000001',
  'Đổi đơn vị: 19 cm = ...... mm?',
  '["190","19000","1900","19"]'::jsonb,
  0,
  14,
  'Vì 1 cm = 10 mm nên 19 cm = 190 mm.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  35,
  'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10046-0000-4000-8000-000000000001', 'a3b10046-0000-4000-8000-000000000001', 'Ôn tập: Bài 35'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["78","72","66","82"]'::jsonb,
  1,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["119","126","112","129"]'::jsonb,
  0,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["186","176","168","184"]'::jsonb,
  1,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["252","234","253","243"]'::jsonb,
  3,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["310","330","320"]'::jsonb,
  2,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["232","222","216","228"]'::jsonb,
  1,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["304","294","301","287"]'::jsonb,
  1,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["384","376","386","368"]'::jsonb,
  1,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["478","459","477","468"]'::jsonb,
  3,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["570","580","560"]'::jsonb,
  0,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["382","366","378","372"]'::jsonb,
  3,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["479","462","476","469"]'::jsonb,
  3,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["584","576","586","568"]'::jsonb,
  1,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["703","684","702","693"]'::jsonb,
  3,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10046-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["820","830","810"]'::jsonb,
  0,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  36,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10047-0000-4000-8000-000000000001', 'a3b10047-0000-4000-8000-000000000001', 'Ôn tập: Bài 36'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 12 × 2 = ?',
  '["22","34","14","24"]'::jsonb,
  3,
  0,
  'Đặt tính rồi tính: 12 × 2 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 16 × 3 = ?',
  '["38","46","48","58"]'::jsonb,
  2,
  1,
  'Đặt tính rồi tính: 16 × 3 = 48.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 20 × 4 = ?',
  '["90","80","70","78"]'::jsonb,
  1,
  2,
  'Đặt tính rồi tính: 20 × 4 = 80.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 24 × 5 = ?',
  '["120","110","118","130"]'::jsonb,
  0,
  3,
  'Đặt tính rồi tính: 24 × 5 = 120.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 28 × 2 = ?',
  '["54","66","46","56"]'::jsonb,
  3,
  4,
  'Đặt tính rồi tính: 28 × 2 = 56.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 32 × 3 = ?',
  '["96","106","94","86"]'::jsonb,
  0,
  5,
  'Đặt tính rồi tính: 32 × 3 = 96.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 36 × 4 = ?',
  '["144","154","142","134"]'::jsonb,
  0,
  6,
  'Đặt tính rồi tính: 36 × 4 = 144.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 40 × 5 = ?',
  '["210","190","198","200"]'::jsonb,
  3,
  7,
  'Đặt tính rồi tính: 40 × 5 = 200.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 44 × 2 = ?',
  '["88","78","98","86"]'::jsonb,
  0,
  8,
  'Đặt tính rồi tính: 44 × 2 = 88.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 48 × 3 = ?',
  '["142","154","134","144"]'::jsonb,
  3,
  9,
  'Đặt tính rồi tính: 48 × 3 = 144.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 52 × 4 = ?',
  '["206","218","198","208"]'::jsonb,
  3,
  10,
  'Đặt tính rồi tính: 52 × 4 = 208.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 56 × 5 = ?',
  '["280","278","270","290"]'::jsonb,
  0,
  11,
  'Đặt tính rồi tính: 56 × 5 = 280.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 60 × 2 = ?',
  '["118","130","110","120"]'::jsonb,
  3,
  12,
  'Đặt tính rồi tính: 60 × 2 = 120.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 64 × 3 = ?',
  '["202","190","182","192"]'::jsonb,
  3,
  13,
  'Đặt tính rồi tính: 64 × 3 = 192.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10047-0000-4000-8000-000000000001',
  'Tính: 68 × 4 = ?',
  '["272","262","282","270"]'::jsonb,
  0,
  14,
  'Đặt tính rồi tính: 68 × 4 = 272.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  37,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10048-0000-4000-8000-000000000001', 'a3b10048-0000-4000-8000-000000000001', 'Ôn tập: Bài 37'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 24 : 2 = ?',
  '["12","11","13","22"]'::jsonb,
  0,
  0,
  'Đặt tính rồi tính: 24 : 2 = 12.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 45 : 3 = ?',
  '["14","42","16","15"]'::jsonb,
  3,
  1,
  'Đặt tính rồi tính: 45 : 3 = 15.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 72 : 4 = ?',
  '["18","19","68","17"]'::jsonb,
  0,
  2,
  'Đặt tính rồi tính: 72 : 4 = 18.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 105 : 5 = ?',
  '["100","20","21","22"]'::jsonb,
  2,
  3,
  'Đặt tính rồi tính: 105 : 5 = 21.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 48 : 2 = ?',
  '["24","23","25","46"]'::jsonb,
  0,
  4,
  'Đặt tính rồi tính: 48 : 2 = 24.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 81 : 3 = ?',
  '["26","78","28","27"]'::jsonb,
  3,
  5,
  'Đặt tính rồi tính: 81 : 3 = 27.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 120 : 4 = ?',
  '["30","29","31","116"]'::jsonb,
  0,
  6,
  'Đặt tính rồi tính: 120 : 4 = 30.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 165 : 5 = ?',
  '["34","33","160","32"]'::jsonb,
  1,
  7,
  'Đặt tính rồi tính: 165 : 5 = 33.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 72 : 2 = ?',
  '["36","37","35","70"]'::jsonb,
  0,
  8,
  'Đặt tính rồi tính: 72 : 2 = 36.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 117 : 3 = ?',
  '["38","40","39","114"]'::jsonb,
  2,
  9,
  'Đặt tính rồi tính: 117 : 3 = 39.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 168 : 4 = ?',
  '["41","43","164","42"]'::jsonb,
  3,
  10,
  'Đặt tính rồi tính: 168 : 4 = 42.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 225 : 5 = ?',
  '["220","45","46","44"]'::jsonb,
  1,
  11,
  'Đặt tính rồi tính: 225 : 5 = 45.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 96 : 2 = ?',
  '["47","49","94","48"]'::jsonb,
  3,
  12,
  'Đặt tính rồi tính: 96 : 2 = 48.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 153 : 3 = ?',
  '["50","52","150","51"]'::jsonb,
  3,
  13,
  'Đặt tính rồi tính: 153 : 3 = 51.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10048-0000-4000-8000-000000000001',
  'Tính: 216 : 4 = ?',
  '["55","212","54","53"]'::jsonb,
  2,
  14,
  'Đặt tính rồi tính: 216 : 4 = 54.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  38,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10049-0000-4000-8000-000000000001', 'a3b10049-0000-4000-8000-000000000001', 'Ôn tập: Bài 38'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 10 + 5 × 2 = ?',
  '["20","15","25","30"]'::jsonb,
  0,
  0,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 2 = 10 trước, rồi 10 + 10 = 20.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (12 + 6) × 3 = ?',
  '["54","30","44","64"]'::jsonb,
  0,
  1,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (12 + 6) = 18, sau đó nhân với 3: 18 × 3 = 54.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 14 + 7 × 4 = ?',
  '["47","84","37","42"]'::jsonb,
  3,
  2,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 4 = 28 trước, rồi 14 + 28 = 42.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (16 + 8) × 2 = ?',
  '["38","58","32","48"]'::jsonb,
  3,
  3,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (16 + 8) = 24, sau đó nhân với 2: 24 × 2 = 48.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 18 + 5 × 3 = ?',
  '["38","69","28","33"]'::jsonb,
  3,
  4,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 3 = 15 trước, rồi 18 + 15 = 33.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (20 + 6) × 4 = ?',
  '["94","104","114","44"]'::jsonb,
  1,
  5,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (20 + 6) = 26, sau đó nhân với 4: 26 × 4 = 104.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 22 + 7 × 2 = ?',
  '["41","36","31","58"]'::jsonb,
  1,
  6,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 2 = 14 trước, rồi 22 + 14 = 36.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (24 + 8) × 3 = ?',
  '["96","48","86","106"]'::jsonb,
  0,
  7,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (24 + 8) = 32, sau đó nhân với 3: 32 × 3 = 96.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 26 + 5 × 4 = ?',
  '["41","51","124","46"]'::jsonb,
  3,
  8,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 4 = 20 trước, rồi 26 + 20 = 46.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (28 + 6) × 2 = ?',
  '["58","40","68","78"]'::jsonb,
  2,
  9,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (28 + 6) = 34, sau đó nhân với 2: 34 × 2 = 68.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 30 + 7 × 3 = ?',
  '["46","51","111","56"]'::jsonb,
  1,
  10,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 3 = 21 trước, rồi 30 + 21 = 51.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (32 + 8) × 4 = ?',
  '["160","64","170","150"]'::jsonb,
  0,
  11,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (32 + 8) = 40, sau đó nhân với 4: 40 × 4 = 160.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 34 + 5 × 2 = ?',
  '["44","39","78","49"]'::jsonb,
  0,
  12,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 2 = 10 trước, rồi 34 + 10 = 44.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (36 + 6) × 3 = ?',
  '["126","54","116","136"]'::jsonb,
  0,
  13,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (36 + 6) = 42, sau đó nhân với 3: 42 × 3 = 126.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10049-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 38 + 7 × 4 = ?',
  '["71","66","180","61"]'::jsonb,
  1,
  14,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 4 = 28 trước, rồi 38 + 28 = 66.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  39,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10050-0000-4000-8000-000000000001', 'a3b10050-0000-4000-8000-000000000001', 'Ôn tập: Bài 39'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 6, số bé là 2. Số lớn gấp mấy lần số bé?',
  '["2 lần","4 lần","3 lần"]'::jsonb,
  2,
  0,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 6 : 2 = 3 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 12, số bé là 3. Số lớn gấp mấy lần số bé?',
  '["9 lần","3 lần","5 lần","4 lần"]'::jsonb,
  3,
  1,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 12 : 3 = 4 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 20, số bé là 4. Số lớn gấp mấy lần số bé?',
  '["5 lần","16 lần","6 lần","4 lần"]'::jsonb,
  0,
  2,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 20 : 4 = 5 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 30, số bé là 5. Số lớn gấp mấy lần số bé?',
  '["7 lần","6 lần","5 lần","25 lần"]'::jsonb,
  1,
  3,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 30 : 5 = 6 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 42, số bé là 6. Số lớn gấp mấy lần số bé?',
  '["7 lần","8 lần","6 lần","36 lần"]'::jsonb,
  0,
  4,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 42 : 6 = 7 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 16, số bé là 2. Số lớn gấp mấy lần số bé?',
  '["7 lần","9 lần","8 lần","14 lần"]'::jsonb,
  2,
  5,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 16 : 2 = 8 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 9, số bé là 3. Số lớn gấp mấy lần số bé?',
  '["6 lần","2 lần","4 lần","3 lần"]'::jsonb,
  3,
  6,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 9 : 3 = 3 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 16, số bé là 4. Số lớn gấp mấy lần số bé?',
  '["4 lần","5 lần","3 lần","12 lần"]'::jsonb,
  0,
  7,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 16 : 4 = 4 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 25, số bé là 5. Số lớn gấp mấy lần số bé?',
  '["6 lần","5 lần","20 lần","4 lần"]'::jsonb,
  1,
  8,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 25 : 5 = 5 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 36, số bé là 6. Số lớn gấp mấy lần số bé?',
  '["6 lần","30 lần","7 lần","5 lần"]'::jsonb,
  0,
  9,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 36 : 6 = 6 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 14, số bé là 2. Số lớn gấp mấy lần số bé?',
  '["12 lần","6 lần","8 lần","7 lần"]'::jsonb,
  3,
  10,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 14 : 2 = 7 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 24, số bé là 3. Số lớn gấp mấy lần số bé?',
  '["7 lần","9 lần","8 lần","21 lần"]'::jsonb,
  2,
  11,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 24 : 3 = 8 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 12, số bé là 4. Số lớn gấp mấy lần số bé?',
  '["3 lần","8 lần","4 lần","2 lần"]'::jsonb,
  0,
  12,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 12 : 4 = 3 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 20, số bé là 5. Số lớn gấp mấy lần số bé?',
  '["4 lần","5 lần","3 lần","15 lần"]'::jsonb,
  0,
  13,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 20 : 5 = 4 lần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10050-0000-4000-8000-000000000001',
  'Số lớn là 30, số bé là 6. Số lớn gấp mấy lần số bé?',
  '["24 lần","6 lần","5 lần","4 lần"]'::jsonb,
  2,
  14,
  'Muốn tìm số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 30 : 6 = 5 lần.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  40,
  'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10051-0000-4000-8000-000000000001', 'a3b10051-0000-4000-8000-000000000001', 'Ôn tập: Bài 40'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["82","78","72","66"]'::jsonb,
  2,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["112","129","126","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["176","168","186","184"]'::jsonb,
  0,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["252","234","253","243"]'::jsonb,
  3,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["320","330","310"]'::jsonb,
  0,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["222","228","232","216"]'::jsonb,
  0,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["287","304","301","294"]'::jsonb,
  3,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["386","368","384","376"]'::jsonb,
  3,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["468","478","459","477"]'::jsonb,
  0,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["560","580","570"]'::jsonb,
  2,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["382","372","378","366"]'::jsonb,
  1,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["469","476","462","479"]'::jsonb,
  0,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["568","584","576","586"]'::jsonb,
  2,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["693","702","703","684"]'::jsonb,
  0,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10051-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["810","830","820"]'::jsonb,
  2,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  41,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10052-0000-4000-8000-000000000001', 'a3b10052-0000-4000-8000-000000000001', 'Ôn tập: Bài 41'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["72","78","66","82"]'::jsonb,
  0,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["129","112","126","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["186","184","176","168"]'::jsonb,
  2,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["253","234","252","243"]'::jsonb,
  3,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["330","320","310"]'::jsonb,
  1,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["222","228","216","232"]'::jsonb,
  0,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["301","304","294","287"]'::jsonb,
  2,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["376","384","368","386"]'::jsonb,
  0,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["468","477","478","459"]'::jsonb,
  0,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["570","580","560"]'::jsonb,
  0,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["372","366","382","378"]'::jsonb,
  0,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["479","462","469","476"]'::jsonb,
  2,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["568","584","586","576"]'::jsonb,
  3,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["703","684","702","693"]'::jsonb,
  3,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10052-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["820","830","810"]'::jsonb,
  0,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  42,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10053-0000-4000-8000-000000000001', 'a3b10053-0000-4000-8000-000000000001', 'Ôn tập: Bài 42'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 10 + 5 × 2 = ?',
  '["30","20","25","15"]'::jsonb,
  1,
  0,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 2 = 10 trước, rồi 10 + 10 = 20.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (12 + 6) × 3 = ?',
  '["44","64","54","30"]'::jsonb,
  2,
  1,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (12 + 6) = 18, sau đó nhân với 3: 18 × 3 = 54.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 14 + 7 × 4 = ?',
  '["37","47","84","42"]'::jsonb,
  3,
  2,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 4 = 28 trước, rồi 14 + 28 = 42.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (16 + 8) × 2 = ?',
  '["48","38","58","32"]'::jsonb,
  0,
  3,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (16 + 8) = 24, sau đó nhân với 2: 24 × 2 = 48.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 18 + 5 × 3 = ?',
  '["28","38","69","33"]'::jsonb,
  3,
  4,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 3 = 15 trước, rồi 18 + 15 = 33.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (20 + 6) × 4 = ?',
  '["94","104","44","114"]'::jsonb,
  1,
  5,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (20 + 6) = 26, sau đó nhân với 4: 26 × 4 = 104.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 22 + 7 × 2 = ?',
  '["36","58","41","31"]'::jsonb,
  0,
  6,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 2 = 14 trước, rồi 22 + 14 = 36.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (24 + 8) × 3 = ?',
  '["48","96","86","106"]'::jsonb,
  1,
  7,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (24 + 8) = 32, sau đó nhân với 3: 32 × 3 = 96.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 26 + 5 × 4 = ?',
  '["41","51","124","46"]'::jsonb,
  3,
  8,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 4 = 20 trước, rồi 26 + 20 = 46.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (28 + 6) × 2 = ?',
  '["68","40","58","78"]'::jsonb,
  0,
  9,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (28 + 6) = 34, sau đó nhân với 2: 34 × 2 = 68.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 30 + 7 × 3 = ?',
  '["46","56","51","111"]'::jsonb,
  2,
  10,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 3 = 21 trước, rồi 30 + 21 = 51.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (32 + 8) × 4 = ?',
  '["150","64","160","170"]'::jsonb,
  2,
  11,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (32 + 8) = 40, sau đó nhân với 4: 40 × 4 = 160.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 34 + 5 × 2 = ?',
  '["39","49","78","44"]'::jsonb,
  3,
  12,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 5 × 2 = 10 trước, rồi 34 + 10 = 44.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: (36 + 6) × 3 = ?',
  '["126","54","116","136"]'::jsonb,
  0,
  13,
  'Thực hiện phép tính trong dấu ngoặc đơn trước: (36 + 6) = 42, sau đó nhân với 3: 42 × 3 = 126.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10053-0000-4000-8000-000000000001',
  'Tính giá trị biểu thức: 38 + 7 × 4 = ?',
  '["61","66","71","180"]'::jsonb,
  1,
  14,
  'Theo thứ tự ưu tiên: nhân chia trước, cộng trừ sau. Thực hiện 7 × 4 = 28 trước, rồi 38 + 28 = 66.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  43,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10054-0000-4000-8000-000000000001', 'a3b10054-0000-4000-8000-000000000001', 'Ôn tập: Bài 43'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["78","72","82","66"]'::jsonb,
  1,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["126","129","119","112"]'::jsonb,
  2,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["186","168","184","176"]'::jsonb,
  3,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["234","243","253","252"]'::jsonb,
  1,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["330","310","320"]'::jsonb,
  2,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["222","228","216","232"]'::jsonb,
  0,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["294","304","301","287"]'::jsonb,
  0,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["376","368","386","384"]'::jsonb,
  0,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["459","477","478","468"]'::jsonb,
  3,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["560","580","570"]'::jsonb,
  2,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["382","366","378","372"]'::jsonb,
  3,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["476","469","462","479"]'::jsonb,
  1,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["586","568","584","576"]'::jsonb,
  3,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["702","693","684","703"]'::jsonb,
  1,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10054-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["820","830","810"]'::jsonb,
  0,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id,
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
  44,
  'Chủ đề 7: Ôn tập học kì 1',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'a3c10055-0000-4000-8000-000000000001', 'a3b10055-0000-4000-8000-000000000001', 'Ôn tập: Bài 44'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 12 × 6 = ?',
  '["82","66","72","78"]'::jsonb,
  2,
  0,
  'Thực hiện phép nhân: 12 × 6 = 72.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 17 × 7 = ?',
  '["112","126","129","119"]'::jsonb,
  3,
  1,
  'Thực hiện phép nhân: 17 × 7 = 119.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 22 × 8 = ?',
  '["168","176","184","186"]'::jsonb,
  1,
  2,
  'Thực hiện phép nhân: 22 × 8 = 176.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 27 × 9 = ?',
  '["243","253","252","234"]'::jsonb,
  0,
  3,
  'Thực hiện phép nhân: 27 × 9 = 243.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 32 × 10 = ?',
  '["320","330","310"]'::jsonb,
  0,
  4,
  'Thực hiện phép nhân: 32 × 10 = 320.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 37 × 6 = ?',
  '["216","228","222","232"]'::jsonb,
  2,
  5,
  'Thực hiện phép nhân: 37 × 6 = 222.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 42 × 7 = ?',
  '["304","287","301","294"]'::jsonb,
  3,
  6,
  'Thực hiện phép nhân: 42 × 7 = 294.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 47 × 8 = ?',
  '["386","368","384","376"]'::jsonb,
  3,
  7,
  'Thực hiện phép nhân: 47 × 8 = 376.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 52 × 9 = ?',
  '["459","477","468","478"]'::jsonb,
  2,
  8,
  'Thực hiện phép nhân: 52 × 9 = 468.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 57 × 10 = ?',
  '["570","580","560"]'::jsonb,
  0,
  9,
  'Thực hiện phép nhân: 57 × 10 = 570.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 62 × 6 = ?',
  '["382","366","378","372"]'::jsonb,
  3,
  10,
  'Thực hiện phép nhân: 62 × 6 = 372.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 67 × 7 = ?',
  '["469","479","476","462"]'::jsonb,
  0,
  11,
  'Thực hiện phép nhân: 67 × 7 = 469.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 72 × 8 = ?',
  '["586","568","576","584"]'::jsonb,
  2,
  12,
  'Thực hiện phép nhân: 72 × 8 = 576.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 77 × 9 = ?',
  '["693","702","684","703"]'::jsonb,
  0,
  13,
  'Thực hiện phép nhân: 77 × 9 = 693.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'a3c10055-0000-4000-8000-000000000001',
  'Tính nhẩm phép nhân: 82 × 10 = ?',
  '["810","820","830"]'::jsonb,
  1,
  14,
  'Thực hiện phép nhân: 82 × 10 = 820.'
);
