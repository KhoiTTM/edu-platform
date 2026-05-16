-- English Grade 3 Part 1 Curriculum
-- Mapping Units to YouTube videos + Practice Quizzes

-- Subject ID: cccccccc-cccc-cccc-cccc-cccccccc3003 (Tiếng Anh 3 Tập 1)

-- Delete existing lessons/quizzes for this subject to avoid duplication
delete from public.lessons where subject_id = 'cccccccc-cccc-cccc-cccc-cccccccc3003';

-- Helper to insert lesson and quiz
-- We use deterministic IDs: aaaaaaaa-aaaa-aaaa-aaaa-ea0301XX for lessons
-- and bbbbbbbb-bbbb-bbbb-bbbb-ea0301XX for quizzes

insert into public.lessons (id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi, lesson_index, volume, page_hint, subject_id) values
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030101', 3, 'Unit 1: Hello - Lesson 1', 'Greeting people and introducing yourself.', 'BxICEiI8bus', 'tieng_anh', 'Tiếng Anh', 1, 1, 'Trang 8', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030102', 3, 'Unit 1: Hello - Lesson 2', 'Greeting people and introducing yourself (Part 2).', 'IL1zoFabdR0', 'tieng_anh', 'Tiếng Anh', 2, 1, 'Trang 10', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030103', 3, 'Unit 1: Hello - Lesson 3', 'Phonics and review of Unit 1.', 'rkdfQPLMyV0', 'tieng_anh', 'Tiếng Anh', 3, 1, 'Trang 12', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030104', 3, 'Unit 2: Our names - Lesson 1', 'Asking and answering about names.', 'jOxyKwBr4xI', 'tieng_anh', 'Tiếng Anh', 4, 1, 'Trang 14', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030105', 3, 'Unit 2: Our names - Lesson 2', 'Spelling names.', 'pnWT0B-BDRw', 'tieng_anh', 'Tiếng Anh', 5, 1, 'Trang 16', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030106', 3, 'Unit 2: Our names - Lesson 3', 'Phonics and review of Unit 2.', '79f0zwMlQVI', 'tieng_anh', 'Tiếng Anh', 6, 1, 'Trang 18', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030107', 3, 'Unit 3: Our friends - Lesson 1', 'Introducing friends.', 'bFyWPD_JyaE', 'tieng_anh', 'Tiếng Anh', 7, 1, 'Trang 20', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030108', 3, 'Unit 3: Our friends - Lesson 2', 'Asking and answering about friends.', 'tDCx6rnMofY', 'tieng_anh', 'Tiếng Anh', 8, 1, 'Trang 22', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030109', 3, 'Unit 3: Our friends - Lesson 3', 'Phonics and review of Unit 3.', 'N3qVVIDeZEA', 'tieng_anh', 'Tiếng Anh', 9, 1, 'Trang 24', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030110', 3, 'Unit 4: Our bodies - Lesson 1', 'Identifying body parts.', 'UOc_3Pe_SUI', 'tieng_anh', 'Tiếng Anh', 10, 1, 'Trang 26', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030111', 3, 'Unit 4: Our bodies - Lesson 2', 'Following body-related instructions.', 'muzK3elF3Fc', 'tieng_anh', 'Tiếng Anh', 11, 1, 'Trang 28', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030112', 3, 'Unit 4: Our bodies - Lesson 3', 'Phonics and review of Unit 4.', '-uit3OagQqk', 'tieng_anh', 'Tiếng Anh', 12, 1, 'Trang 30', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030113', 3, 'Unit 5: My hobbies - Lesson 1', 'Talking about hobbies.', 'DoUT-BprWMI', 'tieng_anh', 'Tiếng Anh', 13, 1, 'Trang 32', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030114', 3, 'Unit 5: My hobbies - Lesson 2', 'Asking about hobbies.', 'L2KqOM3TL3A', 'tieng_anh', 'Tiếng Anh', 14, 1, 'Trang 34', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030115', 3, 'Unit 5: My hobbies - Lesson 3', 'Phonics and review of Unit 5.', 'nlzR6isFGNY', 'tieng_anh', 'Tiếng Anh', 15, 1, 'Trang 36', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030116', 3, 'Unit 6: Our school - Lesson 1', 'Identifying school facilities.', 'lVsjNWfTti8', 'tieng_anh', 'Tiếng Anh', 16, 1, 'Trang 42', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030117', 3, 'Unit 6: Our school - Lesson 2', 'Asking and answering about school facilities.', 'oiAfW4Gro9U', 'tieng_anh', 'Tiếng Anh', 17, 1, 'Trang 44', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030118', 3, 'Unit 6: Our school - Lesson 3', 'Phonics and review of Unit 6.', 'MM6_3gUfFzQ', 'tieng_anh', 'Tiếng Anh', 18, 1, 'Trang 46', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030119', 3, 'Unit 7: Classroom instructions - Lesson 1', 'Common classroom commands.', 'jukwgYFa7Sk', 'tieng_anh', 'Tiếng Anh', 19, 1, 'Trang 48', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030120', 3, 'Unit 7: Classroom instructions - Lesson 2', 'Asking for permission in class.', '6K7PvBsa5vc', 'tieng_anh', 'Tiếng Anh', 20, 1, 'Trang 50', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030121', 3, 'Unit 7: Classroom instructions - Lesson 3', 'Phonics and review of Unit 7.', 'NbLumxu91tE', 'tieng_anh', 'Tiếng Anh', 21, 1, 'Trang 52', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030122', 3, 'Unit 8: My school things - Lesson 1', 'Identifying school supplies.', '44WHQk3HFZk', 'tieng_anh', 'Tiếng Anh', 22, 1, 'Trang 54', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030123', 3, 'Unit 8: My school things - Lesson 2', 'Asking and answering about school supplies.', 'm6CqwnL4dHo', 'tieng_anh', 'Tiếng Anh', 23, 1, 'Trang 56', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030124', 3, 'Unit 8: My school things - Lesson 3', 'Phonics and review of Unit 8.', 'QzUPbu6gg7E', 'tieng_anh', 'Tiếng Anh', 24, 1, 'Trang 58', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030125', 3, 'Unit 9: Colours - Lesson 1', 'Identifying colours.', 'TzXQmO783Dc', 'tieng_anh', 'Tiếng Anh', 25, 1, 'Trang 60', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030126', 3, 'Unit 9: Colours - Lesson 2', 'Asking about colours.', 'gjQCJyVzSg0', 'tieng_anh', 'Tiếng Anh', 26, 1, 'Trang 62', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030127', 3, 'Unit 9: Colours - Lesson 3', 'Phonics and review of Unit 9.', 'ip7zzwB1yTs', 'tieng_anh', 'Tiếng Anh', 27, 1, 'Trang 64', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030128', 3, 'Unit 10: Break time activities - Lesson 1', 'Talking about break time activities.', 'jOeNlYu2WkA', 'tieng_anh', 'Tiếng Anh', 28, 1, 'Trang 66', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030129', 3, 'Unit 10: Break time activities - Lesson 2', 'Asking about break time activities.', 'T2BbuWe7Bss', 'tieng_anh', 'Tiếng Anh', 29, 1, 'Trang 68', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
('aaaaaaaa-aaaa-aaaa-aaaa-0000ea030130', 3, 'Unit 10: Break time activities - Lesson 3', 'Phonics and review of Unit 10.', 'AF2LDajzaKM', 'tieng_anh', 'Tiếng Anh', 30, 1, 'Trang 70', 'cccccccc-cccc-cccc-cccc-cccccccc3003');

-- Insert Quizzes for each lesson
insert into public.quizzes (id, lesson_id, title)
select 
  replace(id::text, 'aaaaaaaa', 'bbbbbbbb')::uuid,
  id,
  'Practice: ' || title
from public.lessons
where subject_id = 'cccccccc-cccc-cccc-cccc-cccccccc3003';

-- Insert Quiz Questions
-- Unit 1
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'How do you say ''Xin chào'' in English?', '["Goodbye", "Hello", "Thank you", "Sorry"]'::jsonb, 1, 0, 'Hello là lời chào phổ biến nhất.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Complete: ''Hi, I ______ Mai.''', '["is", "am", "are", "be"]'::jsonb, 1, 1, 'Cấu trúc giới thiệu tên: I am + tên (hoặc I''m + tên).'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'When you meet a friend, you can say ''Hello'' or...', '["Bye", "Hi", "Goodbye", "No"]'::jsonb, 1, 2, 'Hi là cách chào thân mật, dùng giống như Hello.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Question: ''How are you?'' - Answer: ''I''m ______, thank you.''', '["fine", "hello", "bye", "hi"]'::jsonb, 0, 3, 'Fine nghĩa là khỏe, dùng để trả lời câu hỏi thăm sức khỏe.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'What do you say when you leave?', '["Hello", "Hi", "Goodbye", "How are you"]'::jsonb, 2, 4, 'Goodbye (Tạm biệt) dùng khi chào tạm biệt.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Which word starts with the letter ''h''?', '["Bye", "Hello", "Fine", "Mai"]'::jsonb, 1, 5, 'Hello bắt đầu bằng chữ ''h''.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Which word starts with the letter ''b''?', '["Hi", "Bye", "Hello", "Thank"]'::jsonb, 1, 6, 'Bye bắt đầu bằng chữ ''b''.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Ben: ''Hello, I''m Ben.'' - Lucy: ''______, Ben. I''m Lucy.''', '["Bye", "Hi", "Goodbye", "Fine"]'::jsonb, 1, 7, 'Khi ai đó chào mình, mình nên chào lại bằng Hi hoặc Hello.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Complete the sentence: ''I''m fine, ______ you.''', '["thank", "thanks", "hello", "hi"]'::jsonb, 0, 8, 'Cụm từ đầy đủ là ''thank you'' (cảm ơn bạn).'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Who is the teacher character often seen in Unit 1?', '["Miss Hien", "Mai", "Nam", "Quan"]'::jsonb, 0, 9, 'Cô Hiền (Miss Hien) là nhân vật giáo viên trong sách.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'What does ''fine'' mean in Vietnamese?', '["Tốt/Khỏe", "Tạm biệt", "Xin chào", "Cảm ơn"]'::jsonb, 0, 10, 'Fine dùng để chỉ tình trạng sức khỏe tốt.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'What is the meaning of ''Thank you''?', '["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"]'::jsonb, 2, 11, 'Thank you dùng để bày tỏ lòng biết ơn.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'If someone says ''Goodbye'', you should say...', '["Hello", "Bye", "Hi", "How are you"]'::jsonb, 1, 12, 'Khi tạm biệt, ta chào lại bằng Bye hoặc Goodbye.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'Choose the correct spelling:', '["Helo", "Hello", "Hallo", "Hilo"]'::jsonb, 1, 13, 'Cách viết đúng là Hello (hai chữ l).'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'How do you introduce yourself?', '["I''m [Name]", "Fine, thanks", "Goodbye", "Hello"]'::jsonb, 0, 14, 'Dùng ''I''m + tên'' để tự giới thiệu bản thân.');
-- Unit 2
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030104', 'What is ______ name?', '["you", "your", "my", "I"]'::jsonb, 1, 0, 'Tính từ sở hữu "your" đi với "name".'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030104', 'My name ______ Peter.', '["am", "is", "are", "be"]'::jsonb, 1, 1, 'Chủ ngữ số ít "My name" đi với "is".'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030105', 'How do you ______ your name?', '["say", "read", "spell", "write"]'::jsonb, 2, 0, 'Hỏi cách đánh vần dùng từ "spell".'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030105', 'L-I-N-D-A. It is ______.', '["Linda", "Linder", "Lida", "Lina"]'::jsonb, 0, 1, 'Đánh vần từng chữ cái ghép lại thành Linda.');

-- Unit 3
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030107', 'This ______ my friend, Mary.', '["am", "is", "are", "be"]'::jsonb, 1, 0, 'Giới thiệu một người dùng "This is".'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030107', 'They ______ my friends.', '["am", "is", "are", "be"]'::jsonb, 2, 1, 'Chủ ngữ số nhiều "They" đi với "are".');

-- Unit 4
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030110', 'Touch your ______.', '["nose", "is", "fine", "book"]'::jsonb, 0, 0, 'Nose (mũi) là một bộ phận cơ thể.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030110', 'Open your ______.', '["mouth", "hand", "leg", "foot"]'::jsonb, 0, 1, 'Mouth (miệng) có thể mở ra.');

-- Unit 5
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030113', 'I like ______.', '["sing", "singing", "sings", "sang"]'::jsonb, 1, 0, 'Sau "like" thường là động từ đuôi -ing.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030113', 'My hobby is ______.', '["dance", "dancing", "dances", "danced"]'::jsonb, 1, 1, 'Sở thích của tôi là nhảy múa (dancing).');

-- Unit 6
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030116', 'Is this our ______?', '["school", "hello", "fine", "am"]'::jsonb, 0, 0, 'School (trường học) là một địa điểm.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030116', 'The ______ is big.', '["gym", "hi", "nice", "spell"]'::jsonb, 0, 1, 'Gym (phòng thể dục) có thể to lớn.');

-- Unit 7
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030119', '______ your book, please.', '["Open", "Hello", "Fine", "Is"]'::jsonb, 0, 0, 'Mở sách là "Open your book".'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030119', 'May I ______ in?', '["come", "go", "sit", "stand"]'::jsonb, 0, 1, 'Xin phép vào lớp là "May I come in?".');

-- Unit 8
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030122', 'I have a ______.', '["pen", "hello", "spell", "is"]'::jsonb, 0, 0, 'Pen (bút mực) là đồ dùng học tập.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030122', 'These are my ______.', '["pencils", "pencil", "a pencil", "is pencil"]'::jsonb, 0, 1, '"These are" đi với danh từ số nhiều.');

-- Unit 9
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030125', 'What ______ is it? - It is red.', '["colour", "name", "hobby", "friend"]'::jsonb, 0, 0, 'Hỏi về màu sắc dùng "What colour".'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030125', 'The sky is ______.', '["blue", "red", "green", "yellow"]'::jsonb, 0, 1, 'Bầu trời thường có màu xanh dương (blue).');

-- Unit 10
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030128', 'I play ______ at break time.', '["football", "hello", "colour", "spell"]'::jsonb, 0, 0, 'Football là một môn thể thao chơi trong giờ ra chơi.'),
('bbbbbbbb-aaaa-aaaa-aaaa-0000ea030128', 'Do you like ______? - Yes, I do.', '["chess", "is", "am", "are"]'::jsonb, 0, 1, 'Chess (cờ vua) là một hoạt động.');
