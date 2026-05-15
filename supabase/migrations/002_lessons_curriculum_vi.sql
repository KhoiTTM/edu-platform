-- Curriculum: môn học (tiếng Việt), thứ tự bài, giải thích câu hỏi
-- Chạy sau 001_schema.sql trong Supabase → SQL Editor

alter table public.lessons
  add column if not exists subject_slug text not null default 'toan',
  add column if not exists subject_label_vi text not null default 'Toán',
  add column if not exists lesson_index int not null default 1;

alter table public.quiz_questions
  add column if not exists explanation text;

create index if not exists lessons_grade_subject_lesson_idx
  on public.lessons (grade, subject_slug, lesson_index);

-- Cập nhật nội dung mẫu (UUID cố định từ bản seed 001)
update public.lessons set
  subject_slug = 'tieng_anh',
  subject_label_vi = 'Tiếng Anh',
  lesson_index = 1,
  title = 'Bài 1: Chào hỏi và từ chỉ người',
  summary = 'Học các câu chào đơn giản và câu hỏi Who/What cơ bản.'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3001';

update public.lessons set
  subject_slug = 'toan',
  subject_label_vi = 'Toán',
  lesson_index = 1,
  title = 'Bài 1: Dãy số và quy luật',
  summary = 'Nhận biết số chẵn, lẻ và quy luật trong dãy số.'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa3002';

update public.lessons set
  subject_slug = 'toan',
  subject_label_vi = 'Toán',
  lesson_index = 1,
  title = 'Bài 1: Biểu thức đại số',
  summary = 'Rút gọn biểu thức có chứa ẩn và hiểu hệ số.'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7001';

update public.lessons set
  subject_slug = 'tieng_anh',
  subject_label_vi = 'Tiếng Anh',
  lesson_index = 1,
  title = 'Bài 1: Từ vựng đồ thị và khoa học',
  summary = 'Từ vựng đọc biểu đồ, trục và xu hướng dữ liệu.'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa7002';

update public.quizzes set title = 'Ôn tập: Chào hỏi và đọc hiểu'
where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001';
update public.quizzes set title = 'Ôn tập: Dãy số'
where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002';
update public.quizzes set title = 'Ôn tập: Biểu thức'
where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001';
update public.quizzes set title = 'Ôn tập: Đồ thị'
where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002';

-- Thay toàn bộ câu hỏi (không dùng id cố định vì seed 001 sinh uuid ngẫu nhiên cho câu hỏi)
delete from public.quiz_questions where quiz_id in (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002'
);

insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001',
  'Từ "Hello" thường được dùng để làm gì?',
  '["Chào khi gặp", "Nói tạm biệt", "Xin lỗi", "Cảm ơn"]'::jsonb,
  0,
  0,
  '"Hello" là lời chào thông dụng khi bắt đầu cuộc trò chuyện hoặc khi gặp ai đó.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001',
  'Câu hỏi "Who is she?" đang hỏi về điều gì?',
  '["Về người (ai)", "Về thời gian", "Về địa điểm", "Về lý do"]'::jsonb,
  0,
  1,
  '"Who" = ai — dùng khi hỏi về người.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3001',
  '"Goodbye" có nghĩa gần nhất với:',
  '["Tạm biệt", "Xin chào", "Xin phép", "Chúc mừng"]'::jsonb,
  0,
  2,
  '"Goodbye" dùng khi kết thúc cuộc trò chuyện hoặc rời đi — tương đương "tạm biệt".'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002',
  'Dãy 2, 4, 6, 8, … là dãy số gì?',
  '["Số chẵn tăng dần", "Số lẻ tăng dần", "Số nguyên tố", "Số chia hết cho 5"]'::jsonb,
  0,
  0,
  'Mỗi số cách nhau 2 đơn vị và đều chia hết cho 2 → đây là dãy số chẵn liên tiếp.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002',
  'Số tiếp theo của …, 10, 12, 14 là:',
  '["15", "16", "18", "20"]'::jsonb,
  1,
  1,
  'Quy luật cộng 2: 10+2=12, 12+2=14, 14+2=16.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb3002',
  'Trong các số sau, số nào là số lẻ?',
  '["12", "18", "21", "30"]'::jsonb,
  2,
  2,
  'Số lẻ không chia hết cho 2. 21 : 2 dư 1 nên là số lẻ.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001',
  'Rút gọn: 5x + 3x − 2x',
  '["6x", "10x", "8x", "4x"]'::jsonb,
  0,
  0,
  'Cộng hệ số cùng ẩn x: (5+3−2)x = 6x.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001',
  'Biểu thức nào biểu thị "một số trừ đi 7"?',
  '["7 − n", "n − 7", "n + 7", "7n"]'::jsonb,
  1,
  1,
  '"n trừ 7" viết là n − 7. Lưu ý 7 − n là "7 trừ đi một số".'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7001',
  'Hệ số của x trong 12x + 4 là:',
  '["4", "12", "16", "x"]'::jsonb,
  1,
  2,
  'Hệ số là số nhân với ẩn x, ở đây là 12.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002',
  'Trục ngang (trục x) trên biểu đồ đường thường biểu thị:',
  '["Giá trị lớn nhất", "Thời gian hoặc nhóm đối tượng", "Màu sắc", "Tiêu đề bài"]'::jsonb,
  1,
  0,
  'Trục x thường là biến độc lập: thời gian (ngày/tháng) hoặc danh mục so sánh.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002',
  'Đường biểu đồ đi lên dốc từ trái sang phải thường cho thấy:',
  '["Giá trị giảm", "Giá trị tăng", "Không đổi", "Dữ liệu sai"]'::jsonb,
  1,
  1,
  'Độ dốc dương → khi biến trục x tăng, giá trị trục dọc cũng tăng.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbb7002',
  'Khi đọc biểu đồ, chú thích (legend) giúp ta:',
  '["Tắt trục tọa độ", "Phân biệt các chuỗi dữ liệu/màu", "Xóa tiêu đề", "Ẩn số liệu"]'::jsonb,
  1,
  2,
  'Chú thích giải thích đường/cột/màu tương ứng với nhóm dữ liệu nào.'
);
