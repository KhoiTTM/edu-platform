-- 36-Session Roadmap for Mindset For IELTS Foundation
-- This script replaces existing IELTS lessons with the detailed roadmap.

-- Clear old IELTS data to start fresh with the 36-session roadmap
delete from public.lessons where subject_slug = 'mindset-ielts';

-- Update subject description
update public.subjects 
set label_vi = 'Mindset For IELTS Foundation (36 Buổi)'
where slug = 'mindset-ielts';

-- Insert 36 Sessions (Lessons)
insert into public.lessons (id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi, lesson_index, volume, subject_id, page_hint)
values
-- UNIT 1: DAILY LIFE
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee010001', 0, 'Buổi 1: U1 - Daily Life (Reading & Vocabulary)', 
'[Đọc] Ava, Michael, Nina (tr.12). [Từ vựng] Hoạt động hàng ngày (tr.10). BBC: Morning routines', 
null, 'mindset-ielts', 'IELTS Foundation', 1, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 10, 12'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee010002', 0, 'Buổi 2: U1 - Daily Life (Listening & Writing)', 
'[Nghe] Gia đình Jack (Ex 17, tr.16). [Viết] Lịch trình Julia Grant (tr.14). BBC: Modern life is stressful', 
'2r7kEF70Afs', 'mindset-ielts', 'IELTS Foundation', 2, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 14, 16'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee010003', 0, 'Buổi 3: U1 - Daily Life (Speaking & Review)', 
'[Nói] Mô tả một ngày bình thường (tr.16). [Ôn tập] Make vs Do (tr.17). BBC: Work-life balance', 
null, 'mindset-ielts', 'IELTS Foundation', 3, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 16, 17'),

-- UNIT 2: HOUSE AND HOME
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee020004', 0, 'Buổi 4: U2 - House and Home (Vocabulary & Speaking)', 
'[Từ vựng] Tên phòng & Đồ vật (tr.20-21). [Nói] Mô tả phòng ngủ (tr.22). BBC: Shared living', 
null, 'mindset-ielts', 'IELTS Foundation', 4, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 20, 22'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee020005', 0, 'Buổi 5: U2 - House and Home (Listening & Reading)', 
'[Nghe] Giorgio mô tả phòng (tr.23). [Đọc] Ghi chú chỗ ở (tr.24). BBC: Decorating your home', 
'RCuvLzqdBZ8', 'mindset-ielts', 'IELTS Foundation', 5, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 23, 24'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee020006', 0, 'Buổi 6: U2 - House and Home (Grammar & Listening)', 
'[Ngữ pháp] am/is/are, do/does, can (tr.24). [Nghe] Hội thoại chỗ ở (tr.25). BBC: Smart homes', 
'LRPNZf_5j-I', 'mindset-ielts', 'IELTS Foundation', 6, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 24, 25'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee020007', 0, 'Buổi 7: U2 - House and Home (Writing & Review)', 
'[Viết] Email mô tả căn phòng 60-80 từ (tr.29). [Ôn tập] Wordsearch (tr.31). BBC: Living in small spaces', 
null, 'mindset-ielts', 'IELTS Foundation', 7, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 29, 31'),

-- UNIT 3: HOBBIES
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee030008', 0, 'Buổi 8: U3 - Hobbies (Vocabulary & Listening)', 
'[Từ vựng] Thể thao (tr.34). [Nghe] Kỳ nghỉ mạo hiểm (tr.35). BBC: Extreme sports', 
'gzoYfpWvh7Q', 'mindset-ielts', 'IELTS Foundation', 8, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 34, 35'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee030009', 0, 'Buổi 9: U3 - Hobbies (Grammar)', 
'[Ngữ pháp] Hiện tại đơn vs Tiếp diễn (tr.36-38). BBC: Photography popularity', 
null, 'mindset-ielts', 'IELTS Foundation', 9, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 36, 38'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee030010', 0, 'Buổi 10: U3 - Hobbies (Reading & Speaking)', 
'[Đọc] Bài về Aimee Fuller (tr.39). [Nói] Mô tả ảnh thể thao (tr.40). BBC: Competitive hobbies', 
null, 'mindset-ielts', 'IELTS Foundation', 10, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 39, 40'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee030011', 0, 'Buổi 11: U3 - Hobbies (Writing & Vocabulary)', 
'[Viết] Tin nhắn trả lời Richard (tr.41). [Từ vựng] Play/Do/Go (tr.42). BBC: Is your hobby a career?', 
null, 'mindset-ielts', 'IELTS Foundation', 11, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 41, 42'),

-- UNIT 4: TRAVEL
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee040012', 0, 'Buổi 12: U4 - Travel (Reading & Vocabulary)', 
'[Đọc] 8 loại hình du lịch (tr.47). [Từ vựng] Holiday activities (tr.45). BBC: Ecotourism', 
null, 'mindset-ielts', 'IELTS Foundation', 12, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 45, 47'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee040013', 0, 'Buổi 13: U4 - Travel (Listening & Speaking)', 
'[Nghe] Phỏng vấn Anna (tr.49). [Nói] Kể về kỳ nghỉ dùng as/so/because (tr.51). BBC: Learning language abroad', 
'rkOatFNUGt4', 'mindset-ielts', 'IELTS Foundation', 13, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 49, 51'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee040014', 0, 'Buổi 14: U4 - Travel (Grammar)', 
'[Ngữ pháp] Quá khứ đơn & Động từ bất quy tắc (tr.51-52). BBC: My last holiday', 
null, 'mindset-ielts', 'IELTS Foundation', 14, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 51, 52'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee040015', 0, 'Buổi 15: U4 - Travel (Writing)', 
'[Viết] Email kể về kỳ nghỉ 150-175 từ (tr.53). BBC: The future of travel', 
null, 'mindset-ielts', 'IELTS Foundation', 15, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 53'),

-- UNIT 5: FOOD
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee050016', 0, 'Buổi 16: U5 - Food (Vocabulary & Listening)', 
'[Từ vựng] Thành phần & Cách nấu (tr.61-62). [Nghe] Lễ hội đồ ăn (tr.61). BBC: Street food', 
'RXLcmf5GZQ', 'mindset-ielts', 'IELTS Foundation', 16, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 61, 62'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee050017', 0, 'Buổi 17: U5 - Food (Reading & Listening)', 
'[Đọc] Công thức Bulgogi (tr.64). [Nghe] Quy trình làm sủi cảo (tr.62). BBC: Ultra-processed food', 
'WnqLsvQuwZk', 'mindset-ielts', 'IELTS Foundation', 17, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 62, 64'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee050018', 0, 'Buổi 18: U5 - Food (Writing & Speaking)', 
'[Viết] Hướng dẫn nấu ăn (tr.64). [Nói] Bữa ăn yêu thích (tr.65). BBC: Eating habits', 
null, 'mindset-ielts', 'IELTS Foundation', 18, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 64, 65'),

-- UNIT 6: TRANSPORT
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee060019', 0, 'Buổi 19: U6 - Transport (Vocabulary & Reading)', 
'[Từ vựng] Places in city (tr.71). [Đọc] Biển hiệu/tin nhắn (tr.72). BBC: Mega-cities', 
null, 'mindset-ielts', 'IELTS Foundation', 19, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 71, 72'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee060020', 0, 'Buổi 20: U6 - Transport (Listening & Grammar)', 
'[Nghe] Sơ đồ Northfields (tr.72-74). [Ngữ pháp] So sánh hơn/nhất (tr.75). BBC: The logic of traffic', 
'_f8Ciy-r8bM', 'mindset-ielts', 'IELTS Foundation', 20, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 72, 75'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee060021', 0, 'Buổi 21: U6 - Transport (Speaking & Writing)', 
'[Nói] Giao thông quê hương (tr.76). [Viết] Email gợi ý địa điểm (tr.76). BBC: Electric cars', 
null, 'mindset-ielts', 'IELTS Foundation', 21, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 76'),

-- UNIT 7: JOBS
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee070022', 0, 'Buổi 22: U7 - Jobs (Vocabulary & Listening)', 
'[Từ vựng] Kỹ năng (tr.80). [Nghe] Radio về Jack Riley (tr.81). BBC: First job', 
'jsjIWseiTfM', 'mindset-ielts', 'IELTS Foundation', 22, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 80, 81'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee070023', 0, 'Buổi 23: U7 - Jobs (Grammar & Speaking)', 
'[Ngữ pháp] Can/Could (tr.82). [Nói] Questionnaire kỹ năng (tr.83). BBC: Four-day work week', 
null, 'mindset-ielts', 'IELTS Foundation', 23, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 82, 83'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee070024', 0, 'Buổi 24: U7 - Jobs (Reading)', 
'[Đọc] True/False/Not Given về summer jobs (tr.84-86). BBC: Is your job automated?', 
null, 'mindset-ielts', 'IELTS Foundation', 24, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 84, 86'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee070025', 0, 'Buổi 25: U7 - Jobs (Writing)', 
'[Viết] Email xin việc hè (tr.86-87). BBC: Working from home', 
null, 'mindset-ielts', 'IELTS Foundation', 25, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 86, 87'),

-- UNIT 8: HEALTH
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee080026', 0, 'Buổi 26: U8 - Health (Listening & Vocabulary)', 
'[Nghe] Thảo luận lối sống (tr.92). [Từ vựng] Hoạt động lành mạnh (tr.93). BBC: The power of sleep', 
'SPurU5V7pxw', 'mindset-ielts', 'IELTS Foundation', 26, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 92, 93'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee080027', 0, 'Buổi 27: U8 - Health (Reading & Listening)', 
'[Đọc] Bài luận thể thao (tr.94-96). [Nghe] Cách thư giãn (tr.97). BBC: Exercising in the heat', 
'mWPZhFuPkF0', 'mindset-ielts', 'IELTS Foundation', 27, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 94, 97'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee080028', 0, 'Buổi 28: U8 - Health (Speaking & Writing)', 
'[Nói] Mô tả ảnh sức khỏe (tr.97). [Viết] Email lời khuyên sức khỏe (tr.98). BBC: Mental health', 
null, 'mindset-ielts', 'IELTS Foundation', 28, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 97, 98'),

-- UNIT 9: LANGUAGE
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee090029', 0, 'Buổi 29: U9 - Language (Vocabulary & Listening)', 
'[Từ vựng] Cách học tiếng Anh (tr.103). [Nghe] Sofia & Oliver (tr.105). BBC: Why learn English?', 
null, 'mindset-ielts', 'IELTS Foundation', 29, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 103, 105'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee090030', 0, 'Buổi 30: U9 - Language (Reading & Grammar)', 
'[Đọc] Chàng trai nói 20 ngôn ngữ (tr.107). [Ngữ pháp] Going to (tr.104). BBC: Bilingual brains', 
null, 'mindset-ielts', 'IELTS Foundation', 30, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 104, 107'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee090031', 0, 'Buổi 31: U9 - Language (Writing)', 
'[Viết] Essay từ điển online 220-250 từ (tr.108-110). BBC: Slang and new words', 
null, 'mindset-ielts', 'IELTS Foundation', 31, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 108, 110'),

-- UNIT 10: TECH
('aaaaaaaa-aaaa-aaaa-aaaa-0000ee100032', 0, 'Buổi 32: U10 - Tech (Vocabulary & Reading)', 
'[Từ vựng] Thiết thiết bị công nghệ (tr.114). [Đọc] Bài về Internet (tr.115-116). BBC: Social media', 
null, 'mindset-ielts', 'IELTS Foundation', 32, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 114, 116'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee100033', 0, 'Buổi 33: U10 - Tech (Listening & Grammar)', 
'[Nghe] Bài giảng Smartphone (tr.116-117). [Ngữ pháp] Will/Won''t (tr.118). BBC: Future of AI', 
'wr8M6uUzHnY', 'mindset-ielts', 'IELTS Foundation', 33, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 116, 118'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee100034', 0, 'Buổi 34: U10 - Tech (Listening & Speaking)', 
'[Nghe] Lorenzo nói về gadget (tr.120). [Nói] Thiết bị muốn mua (tr.121). BBC: Dependent on phones?', 
'ZN_why11kpc', 'mindset-ielts', 'IELTS Foundation', 34, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 120, 121'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee100035', 0, 'Buổi 35: U10 - Tech (Writing)', 
'[Viết] Mô tả biểu đồ line graph (tr.120). BBC: Space technology', 
null, 'mindset-ielts', 'IELTS Foundation', 35, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 120'),

('aaaaaaaa-aaaa-aaaa-aaaa-0000ee100036', 0, 'Buổi 36: Review & Final Assessment', 
'[Tổng kết] Ôn tập toàn bộ 10 Units & Đánh giá tiến độ. BBC: Review highlight', 
null, 'mindset-ielts', 'IELTS Foundation', 36, 1, 'cccccccc-cccc-cccc-cccc-cccccccc0001', 'Trang 10-120')
on conflict (id) do update set
  title = excluded.title,
  summary = excluded.summary,
  youtube_video_id = excluded.youtube_video_id,
  page_hint = excluded.page_hint;
