-- English Grade 3 Volume 1 Curriculum Seed
-- Generated programmatically with 15 highly educational practice questions per lesson

alter table public.lessons
  add column if not exists book_lesson_number int,
  add column if not exists topic_label text,
  add column if not exists video_part smallint not null default 0;

delete from public.quiz_questions where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'tieng_anh' and l.volume = 1
);
delete from public.quiz_attempts where quiz_id in (
  select q.id from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  where l.grade = 3 and l.subject_slug = 'tieng_anh' and l.volume = 1
);
delete from public.quizzes where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'tieng_anh' and volume = 1
);
delete from public.schedule_entries where lesson_id in (
  select id from public.lessons where grade = 3 and subject_slug = 'tieng_anh' and volume = 1
);
delete from public.lessons where grade = 3 and subject_slug = 'tieng_anh' and volume = 1;

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030101', 3,
  'Unit 1: Hello - Lesson 1',
  'Greeting people and introducing yourself.',
  'BxICEiI8bus',
  'tieng_anh', 'Tiếng Anh',
  1, 1,
  'Trang 8',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 1: Hello',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030101', 'Bài tập: Unit 1: Hello - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'How do you say ''Xin chào'' in English?',
  '["Goodbye","Hello","Thank you","Sorry"]'::jsonb,
  1,
  0,
  'Hello là lời chào phổ biến nhất trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Complete the sentence: ''Hi, I ______ Mai.''',
  '["is","am","are","be"]'::jsonb,
  1,
  1,
  'Cấu trúc giới thiệu tên: I am + tên (hoặc I''m + tên).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'When you meet a friend, you can say ''Hello'' or...',
  '["Bye","Hi","Goodbye","No"]'::jsonb,
  1,
  2,
  'Hi là cách chào thân mật, dùng giống như Hello.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Who is the teacher character in Unit 1?',
  '["Miss Hien","Mai","Nam","Quan"]'::jsonb,
  0,
  3,
  'Miss Hien là giáo viên hướng dẫn các bạn học sinh trong Unit 1.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Ben says: ''Hello, I''m Ben.'' What should Lucy say?',
  '["Goodbye, Ben","Hi, Ben. I''m Lucy","I''m fine, thanks","Thank you"]'::jsonb,
  1,
  4,
  'Khi ai đó tự giới thiệu, chúng ta nên chào lại và giới thiệu bản thân.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Which word starts with the letter ''h''?',
  '["Bye","Hello","Fine","Mai"]'::jsonb,
  1,
  5,
  'Hello bắt đầu bằng chữ ''h''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Which word starts with the letter ''b''?',
  '["Hi","Bye","Hello","Thank"]'::jsonb,
  1,
  6,
  'Bye bắt đầu bằng chữ ''b''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Choose the correct spelling of ''Xin chào'':',
  '["Helo","Hello","Hallo","Hilo"]'::jsonb,
  1,
  7,
  'Cách viết đúng là Hello (hai chữ l).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Complete the dialogue: ''Hi, Nam.'' - ''______, Phong.''',
  '["Goodbye","Hello","Fine","Thanks"]'::jsonb,
  1,
  8,
  'Chào lại Phong bằng Hello hoặc Hi.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'What does ''I''m'' stand for?',
  '["I is","I are","I am","I be"]'::jsonb,
  2,
  9,
  'I''m là viết tắt của I am.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'How do you introduce yourself?',
  '["I''m [Name]","Fine, thanks","Goodbye","Hello"]'::jsonb,
  0,
  10,
  'Dùng ''I''m + tên'' để giới thiệu bản thân.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Choose the odd one out (Chọn từ khác loại):',
  '["Hello","Hi","Goodbye","Nam"]'::jsonb,
  3,
  11,
  'Nam là tên riêng, các từ còn lại là lời chào hỏi/tạm biệt.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'What letter is missing: ''H_llo''?',
  '["a","e","i","o"]'::jsonb,
  1,
  12,
  'Từ đầy đủ là Hello, nên chữ cái thiếu là ''e''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'What letter is missing: ''B_e''?',
  '["a","e","i","y"]'::jsonb,
  3,
  13,
  'Từ đầy đủ là Bye, nên chữ cái thiếu là ''y''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030101',
  'Complete the name of this character: ''Mr. _____''',
  '["Hien","Long","Loc","Nam"]'::jsonb,
  1,
  14,
  'Thầy giáo trong sách tiếng Anh lớp 3 là Mr. Long.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030102', 3,
  'Unit 1: Hello - Lesson 2',
  'Greeting people and introducing yourself (Part 2).',
  'IL1zoFabdR0',
  'tieng_anh', 'Tiếng Anh',
  2, 1,
  'Trang 10',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 1: Hello',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030102', 'Bài tập: Unit 1: Hello - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'What do you say when you ask about someone''s health?',
  '["What''s your name?","How old are you?","How are you?","Who are you?"]'::jsonb,
  2,
  0,
  'How are you? dùng để hỏi thăm sức khỏe.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Complete: ''I''m fine, ______ you.''',
  '["thank","thanks","hello","hi"]'::jsonb,
  0,
  1,
  'Cụm từ đầy đủ lịch sự là ''thank you''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'What is another way to say ''I''m fine, thank you''?',
  '["Hello","Fine, thanks","Goodbye","Bye"]'::jsonb,
  1,
  2,
  'Fine, thanks là cách trả lời ngắn gọn, thân mật.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'What do you say when you leave?',
  '["Hello","Hi","Goodbye","How are you"]'::jsonb,
  2,
  3,
  'Goodbye dùng khi chào tạm biệt ra về.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Which phrase means ''Tạm biệt'' in English?',
  '["Goodbye","Hello","How are you","Fine, thanks"]'::jsonb,
  0,
  4,
  'Goodbye có nghĩa là Tạm biệt.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Teacher: ''Goodbye, class.'' - Students: ''______, teacher.''',
  '["Hello","Goodbye","Fine, thanks","Hi"]'::jsonb,
  1,
  5,
  'Học sinh chào tạm biệt giáo viên bằng Goodbye.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Complete the word: ''th_nks''',
  '["a","e","i","o"]'::jsonb,
  0,
  6,
  'Thanks viết với chữ ''a''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'If you are very well, you can say:',
  '["I''m bad","Very well, thank you","Goodbye","Hello"]'::jsonb,
  1,
  7,
  'Very well, thank you nghĩa là tôi rất khỏe, cảm ơn bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Nam: ''How are you, Mai?'' - Mai: ''Fine, ______.''',
  '["hello","thanks","goodbye","hi"]'::jsonb,
  1,
  8,
  'Mai trả lời sức khỏe khỏe và cảm ơn Phong bằng thanks.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'What is the English word for ''Khỏe/Tốt''?',
  '["Hello","Fine","Bye","Name"]'::jsonb,
  1,
  9,
  'Fine nghĩa là khỏe, tốt.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Choose the correct spelling of ''Tạm biệt'':',
  '["Godbye","Goodby","Goodbye","Gudbye"]'::jsonb,
  2,
  10,
  'Goodbye viết đúng chính tả có hai chữ ''o'' và có chữ ''e'' ở cuối.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Rearrange: ''are / how / you / ?''',
  '["How are you?","How you are?","Are how you?","You how are?"]'::jsonb,
  0,
  11,
  'Cấu trúc đúng câu hỏi thăm sức khỏe: How are you?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Choose the odd one out:',
  '["Fine","Well","Goodbye","Great"]'::jsonb,
  2,
  12,
  'Goodbye là từ chào tạm biệt, các từ còn lại chỉ trạng thái sức khỏe tốt.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'Complete: ''Goodbye. See you ______.''',
  '["later","hello","hi","thanks"]'::jsonb,
  0,
  13,
  'See you later là hẹn gặp lại bạn sau.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030102',
  'What is a very short way to say ''Goodbye''?',
  '["Hi","Hello","Bye","Fine"]'::jsonb,
  2,
  14,
  'Bye là dạng rút gọn của Goodbye.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030103', 3,
  'Unit 1: Hello - Lesson 3',
  'Phonics and review of Unit 1.',
  'rkdfQPLMyV0',
  'tieng_anh', 'Tiếng Anh',
  3, 1,
  'Trang 12',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 1: Hello',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030103', 'Bài tập: Unit 1: Hello - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Which letter makes the sound /b/ in ''Ben''?',
  '["Letter B","Letter H","Letter M","Letter L"]'::jsonb,
  0,
  0,
  'Chữ cái B tạo ra âm /b/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Which letter makes the sound /h/ in ''Hello''?',
  '["Letter B","Letter H","Letter L","Letter N"]'::jsonb,
  1,
  1,
  'Chữ cái H tạo ra âm /h/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Find the word with the sound /b/:',
  '["Hi","Hello","Bye","How"]'::jsonb,
  2,
  2,
  'Bye bắt đầu bằng âm /b/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Find the word with the sound /h/:',
  '["Bill","Ben","Bye","Hi"]'::jsonb,
  3,
  3,
  'Hi bắt đầu bằng âm /h/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Phonics focus: ''_ell_'' is completed with what letters?',
  '["H and o","B and y","M and a","P and e"]'::jsonb,
  0,
  4,
  'H + ello tạo thành Hello.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Phonics focus: ''_ye'' is completed with what letter?',
  '["h","b","l","m"]'::jsonb,
  1,
  5,
  'b + ye tạo thành Bye.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Which name starts with the letter ''B''?',
  '["Nam","Bill","Mai","Phong"]'::jsonb,
  1,
  6,
  'Bill bắt đầu bằng chữ ''B''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Which word does NOT start with ''h''?',
  '["Hello","Hi","How","Bye"]'::jsonb,
  3,
  7,
  'Bye bắt đầu bằng ''b'', các từ còn lại bắt đầu bằng ''h''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Which word does NOT start with ''b''?',
  '["Bye","Ben","Bill","Hello"]'::jsonb,
  3,
  8,
  'Hello bắt đầu bằng ''h'', các từ còn lại bắt đầu bằng ''b''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Choose the correct sound matching: ''H'' is for...',
  '["Ben","Hello","Bye","Bill"]'::jsonb,
  1,
  9,
  'H phát âm là /h/, tương ứng với từ Hello.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Choose the correct sound matching: ''B'' is for...',
  '["Hi","How","Hello","Ben"]'::jsonb,
  3,
  10,
  'B phát âm là /b/, tương ứng với từ Ben.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Unscramble: ''i-h''',
  '["hi","ih","he","ha"]'::jsonb,
  0,
  11,
  'Sắp xếp lại thành ''hi''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'Unscramble: ''e-y-b''',
  '["bye","bey","yeb","eby"]'::jsonb,
  0,
  12,
  'Sắp xếp lại thành ''bye''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'What sound does the letter ''H'' make in English?',
  '["/b/","/h/","/m/","/n/"]'::jsonb,
  1,
  13,
  'Letter H làm ra âm /h/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030103',
  'What sound does the letter ''B'' make in English?',
  '["/b/","/h/","/p/","/t/"]'::jsonb,
  0,
  14,
  'Letter B làm ra âm /b/.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030201', 3,
  'Unit 2: Our names - Lesson 1',
  'Practice vocabulary and main speaking pattern for Our names.',
  'jOxyKwBr4xI',
  'tieng_anh', 'Tiếng Anh',
  4, 1,
  'Trang 22',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 2: Our names',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030201', 'Bài tập: Unit 2: Our names - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'What is the question to ask for someone''s name?',
  '["How are you?","What''s your name?","How old are you?","Who are you?"]'::jsonb,
  1,
  0,
  'What''s your name? dùng để hỏi tên.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Complete: ''My name ______ Peter.''',
  '["am","is","are","be"]'::jsonb,
  1,
  1,
  'Chủ ngữ My name đi với động từ tobe ''is''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Tony says: ''What''s your name?'' Mary answers: ''______ Mary.''',
  '["I''m","My","You''re","His"]'::jsonb,
  0,
  2,
  'I''m Mary nghĩa là Tôi là Mary.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'What is the short form of ''What is''?',
  '["What''re","What''s","What''m","What"]'::jsonb,
  1,
  3,
  'What''s là viết tắt của What is.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Choose the correct sentence:',
  '["What your name is?","What''s your name?","What name your is?","Name your is what?"]'::jsonb,
  1,
  4,
  'Cấu trúc đúng: What''s your name?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Complete the word: ''n_me''',
  '["a","e","i","o"]'::jsonb,
  0,
  5,
  'Name viết đúng là n-a-m-e.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'If someone says ''What''s your name?'', you can answer ''My name''s [Name]'' or...',
  '["I''m [Name]","Goodbye","I''m fine","Hello"]'::jsonb,
  0,
  6,
  'Dùng I''m + tên để trả lời nhanh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Who is the boy character starting with ''P''?',
  '["Phong","Peter","Tony","Quan"]'::jsonb,
  1,
  7,
  'Peter là nhân vật nam trong sách học.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Who is the boy character starting with ''T''?',
  '["Peter","Tony","Nam","Phong"]'::jsonb,
  1,
  8,
  'Tony là nhân vật nam người nước ngoài.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Who is the girl character starting with ''M''?',
  '["Mai","Mary","Lucy","Both Mai and Mary"]'::jsonb,
  3,
  9,
  'Cả Mai và Mary đều là các nhân vật nữ bắt đầu bằng chữ M.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Choose the odd one out:',
  '["Peter","Tony","Mary","Your"]'::jsonb,
  3,
  10,
  'Your là từ sở hữu, các từ còn lại là tên riêng.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'What does ''your'' mean in Vietnamese?',
  '["Của tôi","Của bạn","Của cô ấy","Của anh ấy"]'::jsonb,
  1,
  11,
  'Your nghĩa là của bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'What does ''my'' mean in Vietnamese?',
  '["Của tôi","Của bạn","Của chúng ta","Của họ"]'::jsonb,
  0,
  12,
  'My nghĩa là của tôi.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Complete: ''Hi, my ______ is Nam.''',
  '["name","names","fine","hello"]'::jsonb,
  0,
  13,
  'My name is... nghĩa là tên của tôi là...'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030201',
  'Rearrange: ''name / my / is / Mary''',
  '["Mary is my name.","My name is Mary.","Name is my Mary.","My Mary is name."]'::jsonb,
  1,
  14,
  'Sắp xếp đúng: My name is Mary.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030202', 3,
  'Unit 2: Our names - Lesson 2',
  'Grammar study, listening training, and writing activities for Our names.',
  'pnWT0B-BDRw',
  'tieng_anh', 'Tiếng Anh',
  5, 1,
  'Trang 24',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 2: Our names',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030202', 'Bài tập: Unit 2: Our names - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'How do you ask someone to spell their name?',
  '["What is your name?","How do you spell your name?","How are you?","How old are you?"]'::jsonb,
  1,
  0,
  'How do you spell your name? dùng để hỏi cách đánh vần tên.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Complete: ''How do you ______ your name?''',
  '["say","read","spell","write"]'::jsonb,
  2,
  1,
  'Từ spell nghĩa là đánh vần.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Spelling: P-E-T-E-R is the name...',
  '["Peter","Petra","Tony","Phong"]'::jsonb,
  0,
  2,
  'Các chữ cái ghép lại thành Peter.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Spelling: L-I-N-D-A is the name...',
  '["Linda","Lucy","Mary","Mai"]'::jsonb,
  0,
  3,
  'Các chữ cái ghép lại thành Linda.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'How do you spell ''Mai''?',
  '["M-A-Y","M-A-I","M-E-I","M-I-A"]'::jsonb,
  1,
  4,
  'Tên Mai đánh vần là M-A-I.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'How do you spell ''Nam''?',
  '["N-A-M","N-A-N","M-A-N","N-A-Y"]'::jsonb,
  0,
  5,
  'Tên Nam đánh vần là N-A-M.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Spelling: T-O-N-Y is...',
  '["Tony","Toby","Tom","Tomy"]'::jsonb,
  0,
  6,
  'Các chữ cái ghép lại thành Tony.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'What does ''spell'' mean in Vietnamese?',
  '["Đọc","Viết","Đánh vần","Nói"]'::jsonb,
  2,
  7,
  'Spell nghĩa là đánh vần chữ cái.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Choose the correct spelling question:',
  '["How spell you your name?","How do you spell your name?","How you spell name?","How do your name spell?"]'::jsonb,
  1,
  8,
  'Câu hỏi chuẩn: How do you spell your name?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'What letter is double in ''Peter''?',
  '["Letter e","Letter p","Letter t","No letter is double"]'::jsonb,
  0,
  9,
  'Peter có hai chữ ''e'' (P-e-t-e-r).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Which letter is missing in ''sp_ll''?',
  '["a","e","i","o"]'::jsonb,
  1,
  10,
  'Spell viết với chữ ''e''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Spell ''Lucy'':',
  '["L-U-C-Y","L-U-S-Y","L-O-C-Y","L-U-C-I"]'::jsonb,
  0,
  11,
  'Lucy đánh vần là L-U-C-Y.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'If Phong spells ''P-H-O-N-G'', what name is it?',
  '["Peter","Phong","Phuong","Phuc"]'::jsonb,
  1,
  12,
  'Ghép các chữ cái được tên Phong.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Which of the following is a spelling answer?',
  '["My name''s Tony.","T-O-N-Y.","I''m Tony.","Hello, Tony."]'::jsonb,
  1,
  13,
  'T-O-N-Y là cách đánh vần tên.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030202',
  'Spell the name ''Mary'':',
  '["M-A-R-I","M-A-R-Y","M-E-R-Y","M-A-R-E"]'::jsonb,
  1,
  14,
  'Mary đánh vần là M-A-R-Y.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030203', 3,
  'Unit 2: Our names - Lesson 3',
  'Phonics practice and comprehensive review for Our names.',
  '79f0zwMlQVI',
  'tieng_anh', 'Tiếng Anh',
  6, 1,
  'Trang 26',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 2: Our names',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030203', 'Bài tập: Unit 2: Our names - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Which letter makes the sound /p/ in ''Peter''?',
  '["Letter P","Letter T","Letter M","Letter N"]'::jsonb,
  0,
  0,
  'Chữ cái P phát âm là /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Which letter makes the sound /t/ in ''Tony''?',
  '["Letter P","Letter T","Letter B","Letter H"]'::jsonb,
  1,
  1,
  'Chữ cái T phát âm là /t/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Find the word starting with the sound /p/:',
  '["Tony","Peter","Mai","Nam"]'::jsonb,
  1,
  2,
  'Peter bắt đầu bằng âm /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Find the word starting with the sound /t/:',
  '["Peter","Tony","Mary","Lucy"]'::jsonb,
  1,
  3,
  'Tony bắt đầu bằng âm /t/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Which name does NOT start with the sound /p/?',
  '["Peter","Phong","Pat","Tony"]'::jsonb,
  3,
  4,
  'Tony bắt đầu bằng /t/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Which word does NOT start with the sound /t/?',
  '["Tony","Teddy","Teacher","Peter"]'::jsonb,
  3,
  5,
  'Peter bắt đầu bằng /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Choose the word with /p/ sound:',
  '["pen","ten","hen","men"]'::jsonb,
  0,
  6,
  'Pen bắt đầu bằng /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Choose the word with /t/ sound:',
  '["pen","ten","bag","name"]'::jsonb,
  1,
  7,
  'Ten bắt đầu bằng /t/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'What sound does the letter ''P'' make?',
  '["/b/","/p/","/t/","/h/"]'::jsonb,
  1,
  8,
  'Letter P phát âm là /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'What sound does the letter ''T'' make?',
  '["/t/","/p/","/d/","/s/"]'::jsonb,
  0,
  9,
  'Letter T phát âm là /t/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Spelling: ''_en'' is a writing tool starting with /p/. What is the word?',
  '["pen","ten","ben","hen"]'::jsonb,
  0,
  10,
  'P + en = Pen (bút mực).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Spelling: ''_wo'' is a number starting with /t/. What is the word?',
  '["two","ten","toy","tea"]'::jsonb,
  0,
  11,
  'T + wo = Two (số 2).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Identify the letter of sound /p/ in ''spelling'':',
  '["s","p","e","l"]'::jsonb,
  1,
  12,
  'Chữ cái thứ 2 là p phát âm là /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Identify the letter of sound /t/ in ''teacher'':',
  '["t","e","a","c"]'::jsonb,
  0,
  13,
  'Chữ cái đầu tiên là t phát âm là /t/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030203',
  'Choose the name that has both ''p'' and ''t'' sounds in spelling (không nhất thiết ở đầu):',
  '["Peter","Tony","Pat","Mary"]'::jsonb,
  2,
  14,
  'Pat có P ở đầu /p/ và T ở cuối /t/.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030301', 3,
  'Unit 3: Our friends - Lesson 1',
  'Practice vocabulary and main speaking pattern for Our friends.',
  'bFyWPD_JyaE',
  'tieng_anh', 'Tiếng Anh',
  7, 1,
  'Trang 28',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 3: Our friends',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030301', 'Bài tập: Unit 3: Our friends - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 1: What is the correct English word for ''bạn bè / người bạn''?',
  '["classroom","friend","school","pencil"]'::jsonb,
  1,
  0,
  'Friend nghĩa là ''bạn bè / người bạn'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 2: What is the correct English word for ''vui / đẹp''?',
  '["school","classroom","nice","pencil"]'::jsonb,
  2,
  1,
  'Nice nghĩa là ''vui / đẹp'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 3: What is the correct English word for ''mới''?',
  '["new","classroom","school","pencil"]'::jsonb,
  0,
  2,
  'New nghĩa là ''mới'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 4: What is the correct English word for ''họ / chúng nó''?',
  '["they","pencil","classroom","school"]'::jsonb,
  0,
  3,
  'They nghĩa là ''họ / chúng nó'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 5: What is the correct English word for ''bạn bè / người bạn''?',
  '["school","classroom","pencil","friend"]'::jsonb,
  3,
  4,
  'Friend nghĩa là ''bạn bè / người bạn'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 6: What is the correct English word for ''vui / đẹp''?',
  '["pencil","classroom","nice","school"]'::jsonb,
  2,
  5,
  'Nice nghĩa là ''vui / đẹp'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 7: What is the correct English word for ''mới''?',
  '["school","pencil","classroom","new"]'::jsonb,
  3,
  6,
  'New nghĩa là ''mới'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 8: What is the correct English word for ''họ / chúng nó''?',
  '["they","classroom","pencil","school"]'::jsonb,
  0,
  7,
  'They nghĩa là ''họ / chúng nó'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 9: What is the correct English word for ''bạn bè / người bạn''?',
  '["friend","classroom","pencil","school"]'::jsonb,
  0,
  8,
  'Friend nghĩa là ''bạn bè / người bạn'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 10: What is the correct English word for ''vui / đẹp''?',
  '["classroom","pencil","nice","school"]'::jsonb,
  2,
  9,
  'Nice nghĩa là ''vui / đẹp'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 11: What is the correct English word for ''mới''?',
  '["pencil","new","classroom","school"]'::jsonb,
  1,
  10,
  'New nghĩa là ''mới'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 12: What is the correct English word for ''họ / chúng nó''?',
  '["they","classroom","school","pencil"]'::jsonb,
  0,
  11,
  'They nghĩa là ''họ / chúng nó'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 13: What is the correct English word for ''bạn bè / người bạn''?',
  '["friend","classroom","school","pencil"]'::jsonb,
  0,
  12,
  'Friend nghĩa là ''bạn bè / người bạn'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 14: What is the correct English word for ''vui / đẹp''?',
  '["nice","pencil","school","classroom"]'::jsonb,
  0,
  13,
  'Nice nghĩa là ''vui / đẹp'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030301',
  'Question 15: What is the correct English word for ''mới''?',
  '["new","pencil","classroom","school"]'::jsonb,
  0,
  14,
  'New nghĩa là ''mới'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030302', 3,
  'Unit 3: Our friends - Lesson 2',
  'Grammar study, listening training, and writing activities for Our friends.',
  'tDCx6rnMofY',
  'tieng_anh', 'Tiếng Anh',
  8, 1,
  'Trang 30',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 3: Our friends',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030302', 'Bài tập: Unit 3: Our friends - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 1: This is my friend, Mary. - Hello, Mary. Nice to ______ you.',
  '["see","meet","how","say"]'::jsonb,
  1,
  0,
  'Nice to meet you nghĩa là Rất vui được gặp bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 2: ______ they your friends? - Yes, they are.',
  '["Is","Am","Be","Are"]'::jsonb,
  3,
  1,
  'Chủ ngữ số nhiều ''they'' đi với động từ tobe ''Are'' trong câu hỏi.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 3: Is he your friend? - No, he ______.',
  '["is","isn''t","aren''t","not"]'::jsonb,
  1,
  2,
  'Trả lời phủ định số ít: No, he isn''t (viết tắt của is not).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 4: This is my friend, Mary. - Hello, Mary. Nice to ______ you.',
  '["say","meet","how","see"]'::jsonb,
  1,
  3,
  'Nice to meet you nghĩa là Rất vui được gặp bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 5: ______ they your friends? - Yes, they are.',
  '["Is","Am","Are","Be"]'::jsonb,
  2,
  4,
  'Chủ ngữ số nhiều ''they'' đi với động từ tobe ''Are'' trong câu hỏi.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 6: Is he your friend? - No, he ______.',
  '["not","aren''t","isn''t","is"]'::jsonb,
  2,
  5,
  'Trả lời phủ định số ít: No, he isn''t (viết tắt của is not).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 7: This is my friend, Mary. - Hello, Mary. Nice to ______ you.',
  '["how","see","meet","say"]'::jsonb,
  2,
  6,
  'Nice to meet you nghĩa là Rất vui được gặp bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 8: ______ they your friends? - Yes, they are.',
  '["Is","Am","Be","Are"]'::jsonb,
  3,
  7,
  'Chủ ngữ số nhiều ''they'' đi với động từ tobe ''Are'' trong câu hỏi.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 9: Is he your friend? - No, he ______.',
  '["is","isn''t","not","aren''t"]'::jsonb,
  1,
  8,
  'Trả lời phủ định số ít: No, he isn''t (viết tắt của is not).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 10: This is my friend, Mary. - Hello, Mary. Nice to ______ you.',
  '["how","see","meet","say"]'::jsonb,
  2,
  9,
  'Nice to meet you nghĩa là Rất vui được gặp bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 11: ______ they your friends? - Yes, they are.',
  '["Be","Are","Am","Is"]'::jsonb,
  1,
  10,
  'Chủ ngữ số nhiều ''they'' đi với động từ tobe ''Are'' trong câu hỏi.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 12: Is he your friend? - No, he ______.',
  '["is","isn''t","aren''t","not"]'::jsonb,
  1,
  11,
  'Trả lời phủ định số ít: No, he isn''t (viết tắt của is not).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 13: This is my friend, Mary. - Hello, Mary. Nice to ______ you.',
  '["say","meet","see","how"]'::jsonb,
  1,
  12,
  'Nice to meet you nghĩa là Rất vui được gặp bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 14: ______ they your friends? - Yes, they are.',
  '["Are","Am","Be","Is"]'::jsonb,
  0,
  13,
  'Chủ ngữ số nhiều ''they'' đi với động từ tobe ''Are'' trong câu hỏi.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030302',
  'Question 15: Is he your friend? - No, he ______.',
  '["not","aren''t","isn''t","is"]'::jsonb,
  2,
  14,
  'Trả lời phủ định số ít: No, he isn''t (viết tắt của is not).'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030303', 3,
  'Unit 3: Our friends - Lesson 3',
  'Phonics practice and comprehensive review for Our friends.',
  'N3qVVIDeZEA',
  'tieng_anh', 'Tiếng Anh',
  9, 1,
  'Trang 32',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 3: Our friends',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030303', 'Bài tập: Unit 3: Our friends - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 1: Which letter makes the sound /f/ in ''friend''?',
  '["Letter Z","Letter X","Letter N","Letter F"]'::jsonb,
  3,
  0,
  'Từ friend bắt đầu bằng chữ cái F phát âm là /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 2: Which word starts with the sound /n/?',
  '["hello","bye","friend","nice"]'::jsonb,
  3,
  1,
  'Từ nice bắt đầu bằng âm /n/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 3: Identify the missing letters: ''_riend'' starts with sound /f/.',
  '["f","n","y","x"]'::jsonb,
  0,
  2,
  'Ghép chữ cái f vào được từ friend.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 4: Which letter makes the sound /f/ in ''friend''?',
  '["Letter N","Letter F","Letter Z","Letter X"]'::jsonb,
  1,
  3,
  'Từ friend bắt đầu bằng chữ cái F phát âm là /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 5: Which word starts with the sound /n/?',
  '["nice","friend","hello","bye"]'::jsonb,
  0,
  4,
  'Từ nice bắt đầu bằng âm /n/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 6: Identify the missing letters: ''_riend'' starts with sound /f/.',
  '["f","y","n","x"]'::jsonb,
  0,
  5,
  'Ghép chữ cái f vào được từ friend.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 7: Which letter makes the sound /f/ in ''friend''?',
  '["Letter Z","Letter X","Letter N","Letter F"]'::jsonb,
  3,
  6,
  'Từ friend bắt đầu bằng chữ cái F phát âm là /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 8: Which word starts with the sound /n/?',
  '["hello","friend","bye","nice"]'::jsonb,
  3,
  7,
  'Từ nice bắt đầu bằng âm /n/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 9: Identify the missing letters: ''_riend'' starts with sound /f/.',
  '["f","n","x","y"]'::jsonb,
  0,
  8,
  'Ghép chữ cái f vào được từ friend.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 10: Which letter makes the sound /f/ in ''friend''?',
  '["Letter Z","Letter F","Letter N","Letter X"]'::jsonb,
  1,
  9,
  'Từ friend bắt đầu bằng chữ cái F phát âm là /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 11: Which word starts with the sound /n/?',
  '["bye","hello","friend","nice"]'::jsonb,
  3,
  10,
  'Từ nice bắt đầu bằng âm /n/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 12: Identify the missing letters: ''_riend'' starts with sound /f/.',
  '["y","n","f","x"]'::jsonb,
  2,
  11,
  'Ghép chữ cái f vào được từ friend.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 13: Which letter makes the sound /f/ in ''friend''?',
  '["Letter Z","Letter X","Letter N","Letter F"]'::jsonb,
  3,
  12,
  'Từ friend bắt đầu bằng chữ cái F phát âm là /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 14: Which word starts with the sound /n/?',
  '["hello","friend","bye","nice"]'::jsonb,
  3,
  13,
  'Từ nice bắt đầu bằng âm /n/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030303',
  'Question 15: Identify the missing letters: ''_riend'' starts with sound /f/.',
  '["y","f","x","n"]'::jsonb,
  1,
  14,
  'Ghép chữ cái f vào được từ friend.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030401', 3,
  'Unit 4: Our bodies - Lesson 1',
  'Practice vocabulary and main speaking pattern for Our bodies.',
  'UOc_3Pe_SUI',
  'tieng_anh', 'Tiếng Anh',
  10, 1,
  'Trang 34',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 4: Our bodies',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030401', 'Bài tập: Unit 4: Our bodies - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 1: What is the correct English word for ''con mắt''?',
  '["chess","blue","eye","running"]'::jsonb,
  2,
  0,
  'Eye nghĩa là ''con mắt'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 2: What is the correct English word for ''cái tai''?',
  '["ear","blue","chess","running"]'::jsonb,
  0,
  1,
  'Ear nghĩa là ''cái tai'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 3: What is the correct English word for ''cái mũi''?',
  '["nose","running","blue","chess"]'::jsonb,
  0,
  2,
  'Nose nghĩa là ''cái mũi'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 4: What is the correct English word for ''cái miệng''?',
  '["blue","running","mouth","chess"]'::jsonb,
  2,
  3,
  'Mouth nghĩa là ''cái miệng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 5: What is the correct English word for ''khuôn mặt''?',
  '["running","chess","blue","face"]'::jsonb,
  3,
  4,
  'Face nghĩa là ''khuôn mặt'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 6: What is the correct English word for ''bàn tay''?',
  '["running","hand","blue","chess"]'::jsonb,
  1,
  5,
  'Hand nghĩa là ''bàn tay'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 7: What is the correct English word for ''cái đầu''?',
  '["chess","running","blue","head"]'::jsonb,
  3,
  6,
  'Head nghĩa là ''cái đầu'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 8: What is the correct English word for ''mái tóc''?',
  '["chess","running","blue","hair"]'::jsonb,
  3,
  7,
  'Hair nghĩa là ''mái tóc'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 9: What is the correct English word for ''con mắt''?',
  '["running","chess","blue","eye"]'::jsonb,
  3,
  8,
  'Eye nghĩa là ''con mắt'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 10: What is the correct English word for ''cái tai''?',
  '["ear","running","blue","chess"]'::jsonb,
  0,
  9,
  'Ear nghĩa là ''cái tai'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 11: What is the correct English word for ''cái mũi''?',
  '["chess","blue","nose","running"]'::jsonb,
  2,
  10,
  'Nose nghĩa là ''cái mũi'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 12: What is the correct English word for ''cái miệng''?',
  '["chess","blue","running","mouth"]'::jsonb,
  3,
  11,
  'Mouth nghĩa là ''cái miệng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 13: What is the correct English word for ''khuôn mặt''?',
  '["face","chess","blue","running"]'::jsonb,
  0,
  12,
  'Face nghĩa là ''khuôn mặt'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 14: What is the correct English word for ''bàn tay''?',
  '["hand","blue","chess","running"]'::jsonb,
  0,
  13,
  'Hand nghĩa là ''bàn tay'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030401',
  'Question 15: What is the correct English word for ''cái đầu''?',
  '["head","blue","running","chess"]'::jsonb,
  0,
  14,
  'Head nghĩa là ''cái đầu'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030402', 3,
  'Unit 4: Our bodies - Lesson 2',
  'Grammar study, listening training, and writing activities for Our bodies.',
  'muzK3elF3Fc',
  'tieng_anh', 'Tiếng Anh',
  11, 1,
  'Trang 36',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 4: Our bodies',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030402', 'Bài tập: Unit 4: Our bodies - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 1: Touch ______ face, please.',
  '["your","you","my","me"]'::jsonb,
  0,
  0,
  'Cấu trúc mệnh lệnh hướng dẫn ai đó: Touch your + bộ phận cơ thể (Hãy chạm vào ... của bạn).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 2: ______ your eyes.',
  '["Both Open and Close","Close","Open","Touch"]'::jsonb,
  0,
  1,
  'Chúng ta có thể mở mắt (Open your eyes) hoặc nhắm mắt (Close your eyes).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 3: What do you do when the teacher says: ''Close your mouth''?',
  '["Mở miệng ra","Vẫy tay chào","Nhắm mắt lại","Ngậm miệng lại"]'::jsonb,
  3,
  2,
  'Close your mouth nghĩa là Hãy ngậm miệng/đóng miệng lại.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 4: Touch ______ face, please.',
  '["your","you","my","me"]'::jsonb,
  0,
  3,
  'Cấu trúc mệnh lệnh hướng dẫn ai đó: Touch your + bộ phận cơ thể (Hãy chạm vào ... của bạn).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 5: ______ your eyes.',
  '["Open","Close","Touch","Both Open and Close"]'::jsonb,
  3,
  4,
  'Chúng ta có thể mở mắt (Open your eyes) hoặc nhắm mắt (Close your eyes).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 6: What do you do when the teacher says: ''Close your mouth''?',
  '["Nhắm mắt lại","Mở miệng ra","Ngậm miệng lại","Vẫy tay chào"]'::jsonb,
  2,
  5,
  'Close your mouth nghĩa là Hãy ngậm miệng/đóng miệng lại.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 7: Touch ______ face, please.',
  '["you","your","me","my"]'::jsonb,
  1,
  6,
  'Cấu trúc mệnh lệnh hướng dẫn ai đó: Touch your + bộ phận cơ thể (Hãy chạm vào ... của bạn).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 8: ______ your eyes.',
  '["Open","Close","Both Open and Close","Touch"]'::jsonb,
  2,
  7,
  'Chúng ta có thể mở mắt (Open your eyes) hoặc nhắm mắt (Close your eyes).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 9: What do you do when the teacher says: ''Close your mouth''?',
  '["Mở miệng ra","Vẫy tay chào","Nhắm mắt lại","Ngậm miệng lại"]'::jsonb,
  3,
  8,
  'Close your mouth nghĩa là Hãy ngậm miệng/đóng miệng lại.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 10: Touch ______ face, please.',
  '["my","me","your","you"]'::jsonb,
  2,
  9,
  'Cấu trúc mệnh lệnh hướng dẫn ai đó: Touch your + bộ phận cơ thể (Hãy chạm vào ... của bạn).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 11: ______ your eyes.',
  '["Touch","Both Open and Close","Open","Close"]'::jsonb,
  1,
  10,
  'Chúng ta có thể mở mắt (Open your eyes) hoặc nhắm mắt (Close your eyes).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 12: What do you do when the teacher says: ''Close your mouth''?',
  '["Mở miệng ra","Vẫy tay chào","Nhắm mắt lại","Ngậm miệng lại"]'::jsonb,
  3,
  11,
  'Close your mouth nghĩa là Hãy ngậm miệng/đóng miệng lại.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 13: Touch ______ face, please.',
  '["my","me","your","you"]'::jsonb,
  2,
  12,
  'Cấu trúc mệnh lệnh hướng dẫn ai đó: Touch your + bộ phận cơ thể (Hãy chạm vào ... của bạn).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 14: ______ your eyes.',
  '["Both Open and Close","Touch","Close","Open"]'::jsonb,
  0,
  13,
  'Chúng ta có thể mở mắt (Open your eyes) hoặc nhắm mắt (Close your eyes).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030402',
  'Question 15: What do you do when the teacher says: ''Close your mouth''?',
  '["Mở miệng ra","Vẫy tay chào","Nhắm mắt lại","Ngậm miệng lại"]'::jsonb,
  3,
  14,
  'Close your mouth nghĩa là Hãy ngậm miệng/đóng miệng lại.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030403', 3,
  'Unit 4: Our bodies - Lesson 3',
  'Phonics practice and comprehensive review for Our bodies.',
  '-uit3OagQqk',
  'tieng_anh', 'Tiếng Anh',
  12, 1,
  'Trang 38',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 4: Our bodies',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030403', 'Bài tập: Unit 4: Our bodies - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 1: Which letter makes the sound /e/ in ''elbow''?',
  '["Letter E","Letter Z","Letter O","Letter X"]'::jsonb,
  0,
  0,
  'Từ elbow bắt đầu bằng chữ cái E phát âm là /e/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 2: Which word starts with the sound /o/?',
  '["bye","hello","elbow","open"]'::jsonb,
  3,
  1,
  'Từ open bắt đầu bằng âm /o/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 3: Identify the missing letters: ''_lbow'' starts with sound /e/.',
  '["o","e","x","y"]'::jsonb,
  1,
  2,
  'Ghép chữ cái e vào được từ elbow.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 4: Which letter makes the sound /e/ in ''elbow''?',
  '["Letter X","Letter Z","Letter E","Letter O"]'::jsonb,
  2,
  3,
  'Từ elbow bắt đầu bằng chữ cái E phát âm là /e/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 5: Which word starts with the sound /o/?',
  '["bye","elbow","open","hello"]'::jsonb,
  2,
  4,
  'Từ open bắt đầu bằng âm /o/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 6: Identify the missing letters: ''_lbow'' starts with sound /e/.',
  '["x","o","e","y"]'::jsonb,
  2,
  5,
  'Ghép chữ cái e vào được từ elbow.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 7: Which letter makes the sound /e/ in ''elbow''?',
  '["Letter E","Letter O","Letter Z","Letter X"]'::jsonb,
  0,
  6,
  'Từ elbow bắt đầu bằng chữ cái E phát âm là /e/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 8: Which word starts with the sound /o/?',
  '["bye","open","elbow","hello"]'::jsonb,
  1,
  7,
  'Từ open bắt đầu bằng âm /o/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 9: Identify the missing letters: ''_lbow'' starts with sound /e/.',
  '["y","o","e","x"]'::jsonb,
  2,
  8,
  'Ghép chữ cái e vào được từ elbow.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 10: Which letter makes the sound /e/ in ''elbow''?',
  '["Letter O","Letter X","Letter Z","Letter E"]'::jsonb,
  3,
  9,
  'Từ elbow bắt đầu bằng chữ cái E phát âm là /e/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 11: Which word starts with the sound /o/?',
  '["bye","hello","elbow","open"]'::jsonb,
  3,
  10,
  'Từ open bắt đầu bằng âm /o/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 12: Identify the missing letters: ''_lbow'' starts with sound /e/.',
  '["x","y","o","e"]'::jsonb,
  3,
  11,
  'Ghép chữ cái e vào được từ elbow.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 13: Which letter makes the sound /e/ in ''elbow''?',
  '["Letter X","Letter O","Letter E","Letter Z"]'::jsonb,
  2,
  12,
  'Từ elbow bắt đầu bằng chữ cái E phát âm là /e/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 14: Which word starts with the sound /o/?',
  '["elbow","bye","open","hello"]'::jsonb,
  2,
  13,
  'Từ open bắt đầu bằng âm /o/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030403',
  'Question 15: Identify the missing letters: ''_lbow'' starts with sound /e/.',
  '["y","x","o","e"]'::jsonb,
  3,
  14,
  'Ghép chữ cái e vào được từ elbow.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030501', 3,
  'Unit 5: My hobbies - Lesson 1',
  'Practice vocabulary and main speaking pattern for My hobbies.',
  'DoUT-BprWMI',
  'tieng_anh', 'Tiếng Anh',
  13, 1,
  'Trang 40',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 5: My hobbies',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030501', 'Bài tập: Unit 5: My hobbies - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 1: What is the correct English word for ''chạy bộ''?',
  '["hello","running","library","mouth"]'::jsonb,
  1,
  0,
  'Running nghĩa là ''chạy bộ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 2: What is the correct English word for ''bơi lội''?',
  '["swimming","mouth","library","hello"]'::jsonb,
  0,
  1,
  'Swimming nghĩa là ''bơi lội'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 3: What is the correct English word for ''ca hát''?',
  '["mouth","library","hello","singing"]'::jsonb,
  3,
  2,
  'Singing nghĩa là ''ca hát'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 4: What is the correct English word for ''nhảy múa''?',
  '["dancing","mouth","hello","library"]'::jsonb,
  0,
  3,
  'Dancing nghĩa là ''nhảy múa'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 5: What is the correct English word for ''tô màu/vẽ tranh''?',
  '["mouth","library","hello","painting"]'::jsonb,
  3,
  4,
  'Painting nghĩa là ''tô màu/vẽ tranh'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 6: What is the correct English word for ''vẽ''?',
  '["drawing","library","mouth","hello"]'::jsonb,
  0,
  5,
  'Drawing nghĩa là ''vẽ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 7: What is the correct English word for ''đọc sách''?',
  '["mouth","library","reading","hello"]'::jsonb,
  2,
  6,
  'Reading nghĩa là ''đọc sách'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 8: What is the correct English word for ''chạy bộ''?',
  '["hello","running","library","mouth"]'::jsonb,
  1,
  7,
  'Running nghĩa là ''chạy bộ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 9: What is the correct English word for ''bơi lội''?',
  '["library","swimming","hello","mouth"]'::jsonb,
  1,
  8,
  'Swimming nghĩa là ''bơi lội'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 10: What is the correct English word for ''ca hát''?',
  '["hello","singing","library","mouth"]'::jsonb,
  1,
  9,
  'Singing nghĩa là ''ca hát'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 11: What is the correct English word for ''nhảy múa''?',
  '["hello","dancing","library","mouth"]'::jsonb,
  1,
  10,
  'Dancing nghĩa là ''nhảy múa'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 12: What is the correct English word for ''tô màu/vẽ tranh''?',
  '["hello","mouth","library","painting"]'::jsonb,
  3,
  11,
  'Painting nghĩa là ''tô màu/vẽ tranh'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 13: What is the correct English word for ''vẽ''?',
  '["drawing","library","mouth","hello"]'::jsonb,
  0,
  12,
  'Drawing nghĩa là ''vẽ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 14: What is the correct English word for ''đọc sách''?',
  '["hello","mouth","library","reading"]'::jsonb,
  3,
  13,
  'Reading nghĩa là ''đọc sách'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030501',
  'Question 15: What is the correct English word for ''chạy bộ''?',
  '["running","mouth","library","hello"]'::jsonb,
  0,
  14,
  'Running nghĩa là ''chạy bộ'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030502', 3,
  'Unit 5: My hobbies - Lesson 2',
  'Grammar study, listening training, and writing activities for My hobbies.',
  'L2KqOM3TL3A',
  'tieng_anh', 'Tiếng Anh',
  14, 1,
  'Trang 42',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 5: My hobbies',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030502', 'Bài tập: Unit 5: My hobbies - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 1: What is ______ hobby? - I like swimming.',
  '["you","your","my","I"]'::jsonb,
  1,
  0,
  'What is your hobby? dùng để hỏi sở thích của bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 2: My hobby is ______.',
  '["running","ran","runs","run"]'::jsonb,
  0,
  1,
  'Sau cấu trúc ''My hobby is'' thường dùng danh động từ (V-ing).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 3: I ______ dancing.',
  '["am like","likes","like","hobby"]'::jsonb,
  2,
  2,
  'Cấu trúc diễn tả sở thích: I + like + V-ing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 4: What is ______ hobby? - I like swimming.',
  '["you","your","my","I"]'::jsonb,
  1,
  3,
  'What is your hobby? dùng để hỏi sở thích của bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 5: My hobby is ______.',
  '["running","runs","run","ran"]'::jsonb,
  0,
  4,
  'Sau cấu trúc ''My hobby is'' thường dùng danh động từ (V-ing).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 6: I ______ dancing.',
  '["like","likes","am like","hobby"]'::jsonb,
  0,
  5,
  'Cấu trúc diễn tả sở thích: I + like + V-ing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 7: What is ______ hobby? - I like swimming.',
  '["I","my","your","you"]'::jsonb,
  2,
  6,
  'What is your hobby? dùng để hỏi sở thích của bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 8: My hobby is ______.',
  '["run","running","runs","ran"]'::jsonb,
  1,
  7,
  'Sau cấu trúc ''My hobby is'' thường dùng danh động từ (V-ing).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 9: I ______ dancing.',
  '["am like","likes","hobby","like"]'::jsonb,
  3,
  8,
  'Cấu trúc diễn tả sở thích: I + like + V-ing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 10: What is ______ hobby? - I like swimming.',
  '["I","you","your","my"]'::jsonb,
  2,
  9,
  'What is your hobby? dùng để hỏi sở thích của bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 11: My hobby is ______.',
  '["running","runs","run","ran"]'::jsonb,
  0,
  10,
  'Sau cấu trúc ''My hobby is'' thường dùng danh động từ (V-ing).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 12: I ______ dancing.',
  '["am like","like","likes","hobby"]'::jsonb,
  1,
  11,
  'Cấu trúc diễn tả sở thích: I + like + V-ing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 13: What is ______ hobby? - I like swimming.',
  '["I","my","your","you"]'::jsonb,
  2,
  12,
  'What is your hobby? dùng để hỏi sở thích của bạn.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 14: My hobby is ______.',
  '["runs","running","run","ran"]'::jsonb,
  1,
  13,
  'Sau cấu trúc ''My hobby is'' thường dùng danh động từ (V-ing).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030502',
  'Question 15: I ______ dancing.',
  '["hobby","likes","like","am like"]'::jsonb,
  2,
  14,
  'Cấu trúc diễn tả sở thích: I + like + V-ing.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030503', 3,
  'Unit 5: My hobbies - Lesson 3',
  'Phonics practice and comprehensive review for My hobbies.',
  'nlzR6isFGNY',
  'tieng_anh', 'Tiếng Anh',
  15, 1,
  'Trang 44',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 5: My hobbies',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030503', 'Bài tập: Unit 5: My hobbies - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 1: Which letter makes the sound /i/ in ''singing''?',
  '["Letter Z","Letter X","Letter R","Letter S"]'::jsonb,
  3,
  0,
  'Từ singing bắt đầu bằng chữ cái S phát âm là /i/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 2: Which word starts with the sound /u/?',
  '["bye","singing","hello","running"]'::jsonb,
  3,
  1,
  'Từ running bắt đầu bằng âm /u/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 3: Identify the missing letters: ''_inging'' starts with sound /i/.',
  '["y","s","r","x"]'::jsonb,
  1,
  2,
  'Ghép chữ cái s vào được từ singing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 4: Which letter makes the sound /i/ in ''singing''?',
  '["Letter R","Letter S","Letter X","Letter Z"]'::jsonb,
  1,
  3,
  'Từ singing bắt đầu bằng chữ cái S phát âm là /i/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 5: Which word starts with the sound /u/?',
  '["running","singing","hello","bye"]'::jsonb,
  0,
  4,
  'Từ running bắt đầu bằng âm /u/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 6: Identify the missing letters: ''_inging'' starts with sound /i/.',
  '["r","s","x","y"]'::jsonb,
  1,
  5,
  'Ghép chữ cái s vào được từ singing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 7: Which letter makes the sound /i/ in ''singing''?',
  '["Letter S","Letter Z","Letter X","Letter R"]'::jsonb,
  0,
  6,
  'Từ singing bắt đầu bằng chữ cái S phát âm là /i/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 8: Which word starts with the sound /u/?',
  '["running","singing","hello","bye"]'::jsonb,
  0,
  7,
  'Từ running bắt đầu bằng âm /u/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 9: Identify the missing letters: ''_inging'' starts with sound /i/.',
  '["y","x","r","s"]'::jsonb,
  3,
  8,
  'Ghép chữ cái s vào được từ singing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 10: Which letter makes the sound /i/ in ''singing''?',
  '["Letter S","Letter R","Letter Z","Letter X"]'::jsonb,
  0,
  9,
  'Từ singing bắt đầu bằng chữ cái S phát âm là /i/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 11: Which word starts with the sound /u/?',
  '["hello","bye","singing","running"]'::jsonb,
  3,
  10,
  'Từ running bắt đầu bằng âm /u/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 12: Identify the missing letters: ''_inging'' starts with sound /i/.',
  '["s","r","y","x"]'::jsonb,
  0,
  11,
  'Ghép chữ cái s vào được từ singing.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 13: Which letter makes the sound /i/ in ''singing''?',
  '["Letter S","Letter R","Letter X","Letter Z"]'::jsonb,
  0,
  12,
  'Từ singing bắt đầu bằng chữ cái S phát âm là /i/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 14: Which word starts with the sound /u/?',
  '["bye","singing","running","hello"]'::jsonb,
  2,
  13,
  'Từ running bắt đầu bằng âm /u/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030503',
  'Question 15: Identify the missing letters: ''_inging'' starts with sound /i/.',
  '["s","r","x","y"]'::jsonb,
  0,
  14,
  'Ghép chữ cái s vào được từ singing.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030601', 3,
  'Unit 6: Our school - Lesson 1',
  'Practice vocabulary and main speaking pattern for Our school.',
  'lVsjNWfTti8',
  'tieng_anh', 'Tiếng Anh',
  16, 1,
  'Trang 46',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 6: Our school',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030601', 'Bài tập: Unit 6: Our school - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 1: What is the correct English word for ''trường học''?',
  '["ruler","school","nose","thanks"]'::jsonb,
  1,
  0,
  'School nghĩa là ''trường học'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 2: What is the correct English word for ''lớp học''?',
  '["nose","ruler","classroom","thanks"]'::jsonb,
  2,
  1,
  'Classroom nghĩa là ''lớp học'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 3: What is the correct English word for ''thư viện''?',
  '["thanks","library","ruler","nose"]'::jsonb,
  1,
  2,
  'Library nghĩa là ''thư viện'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 4: What is the correct English word for ''phòng thể dục''?',
  '["gym","ruler","nose","thanks"]'::jsonb,
  0,
  3,
  'Gym nghĩa là ''phòng thể dục'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 5: What is the correct English word for ''phòng máy tính''?',
  '["thanks","nose","ruler","computer room"]'::jsonb,
  3,
  4,
  'Computer room nghĩa là ''phòng máy tính'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 6: What is the correct English word for ''sân chơi''?',
  '["playground","ruler","nose","thanks"]'::jsonb,
  0,
  5,
  'Playground nghĩa là ''sân chơi'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 7: What is the correct English word for ''trường học''?',
  '["school","thanks","ruler","nose"]'::jsonb,
  0,
  6,
  'School nghĩa là ''trường học'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 8: What is the correct English word for ''lớp học''?',
  '["ruler","nose","classroom","thanks"]'::jsonb,
  2,
  7,
  'Classroom nghĩa là ''lớp học'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 9: What is the correct English word for ''thư viện''?',
  '["thanks","library","nose","ruler"]'::jsonb,
  1,
  8,
  'Library nghĩa là ''thư viện'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 10: What is the correct English word for ''phòng thể dục''?',
  '["gym","ruler","thanks","nose"]'::jsonb,
  0,
  9,
  'Gym nghĩa là ''phòng thể dục'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 11: What is the correct English word for ''phòng máy tính''?',
  '["computer room","ruler","nose","thanks"]'::jsonb,
  0,
  10,
  'Computer room nghĩa là ''phòng máy tính'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 12: What is the correct English word for ''sân chơi''?',
  '["thanks","playground","ruler","nose"]'::jsonb,
  1,
  11,
  'Playground nghĩa là ''sân chơi'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 13: What is the correct English word for ''trường học''?',
  '["thanks","school","nose","ruler"]'::jsonb,
  1,
  12,
  'School nghĩa là ''trường học'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 14: What is the correct English word for ''lớp học''?',
  '["thanks","classroom","ruler","nose"]'::jsonb,
  1,
  13,
  'Classroom nghĩa là ''lớp học'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030601',
  'Question 15: What is the correct English word for ''thư viện''?',
  '["thanks","nose","library","ruler"]'::jsonb,
  2,
  14,
  'Library nghĩa là ''thư viện'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030602', 3,
  'Unit 6: Our school - Lesson 2',
  'Grammar study, listening training, and writing activities for Our school.',
  'oiAfW4Gro9U',
  'tieng_anh', 'Tiếng Anh',
  17, 1,
  'Trang 48',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 6: Our school',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030602', 'Bài tập: Unit 6: Our school - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 1: ______ is our classroom. (Vật ở gần)',
  '["Those","These","That","This"]'::jsonb,
  3,
  0,
  'This dùng để chỉ một vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 2: ______ is our gym. (Vật ở xa)',
  '["This","Those","These","That"]'::jsonb,
  3,
  1,
  'That dùng để chỉ một vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 3: Is that our school? - Yes, it ______.',
  '["are","is","am","isn''t"]'::jsonb,
  1,
  2,
  'Trả lời khẳng định cho câu hỏi Is that...?: Yes, it is.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 4: ______ is our classroom. (Vật ở gần)',
  '["Those","These","That","This"]'::jsonb,
  3,
  3,
  'This dùng để chỉ một vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 5: ______ is our gym. (Vật ở xa)',
  '["This","Those","That","These"]'::jsonb,
  2,
  4,
  'That dùng để chỉ một vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 6: Is that our school? - Yes, it ______.',
  '["is","am","are","isn''t"]'::jsonb,
  0,
  5,
  'Trả lời khẳng định cho câu hỏi Is that...?: Yes, it is.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 7: ______ is our classroom. (Vật ở gần)',
  '["This","These","That","Those"]'::jsonb,
  0,
  6,
  'This dùng để chỉ một vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 8: ______ is our gym. (Vật ở xa)',
  '["That","This","These","Those"]'::jsonb,
  0,
  7,
  'That dùng để chỉ một vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 9: Is that our school? - Yes, it ______.',
  '["is","isn''t","am","are"]'::jsonb,
  0,
  8,
  'Trả lời khẳng định cho câu hỏi Is that...?: Yes, it is.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 10: ______ is our classroom. (Vật ở gần)',
  '["These","That","This","Those"]'::jsonb,
  2,
  9,
  'This dùng để chỉ một vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 11: ______ is our gym. (Vật ở xa)',
  '["Those","These","That","This"]'::jsonb,
  2,
  10,
  'That dùng để chỉ một vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 12: Is that our school? - Yes, it ______.',
  '["is","am","are","isn''t"]'::jsonb,
  0,
  11,
  'Trả lời khẳng định cho câu hỏi Is that...?: Yes, it is.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 13: ______ is our classroom. (Vật ở gần)',
  '["That","This","Those","These"]'::jsonb,
  1,
  12,
  'This dùng để chỉ một vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 14: ______ is our gym. (Vật ở xa)',
  '["Those","These","That","This"]'::jsonb,
  2,
  13,
  'That dùng để chỉ một vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030602',
  'Question 15: Is that our school? - Yes, it ______.',
  '["is","am","are","isn''t"]'::jsonb,
  0,
  14,
  'Trả lời khẳng định cho câu hỏi Is that...?: Yes, it is.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030603', 3,
  'Unit 6: Our school - Lesson 3',
  'Phonics practice and comprehensive review for Our school.',
  'MM6_3gUfFzQ',
  'tieng_anh', 'Tiếng Anh',
  18, 1,
  'Trang 50',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 6: Our school',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030603', 'Bài tập: Unit 6: Our school - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 1: Which letter makes the sound /c/ in ''computer''?',
  '["Letter C","Letter G","Letter X","Letter Z"]'::jsonb,
  0,
  0,
  'Từ computer bắt đầu bằng chữ cái C phát âm là /c/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 2: Which word starts with the sound /g/?',
  '["bye","hello","gym","computer"]'::jsonb,
  2,
  1,
  'Từ gym bắt đầu bằng âm /g/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 3: Identify the missing letters: ''_omputer'' starts with sound /c/.',
  '["g","x","c","y"]'::jsonb,
  2,
  2,
  'Ghép chữ cái c vào được từ computer.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 4: Which letter makes the sound /c/ in ''computer''?',
  '["Letter G","Letter Z","Letter X","Letter C"]'::jsonb,
  3,
  3,
  'Từ computer bắt đầu bằng chữ cái C phát âm là /c/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 5: Which word starts with the sound /g/?',
  '["gym","hello","computer","bye"]'::jsonb,
  0,
  4,
  'Từ gym bắt đầu bằng âm /g/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 6: Identify the missing letters: ''_omputer'' starts with sound /c/.',
  '["g","c","x","y"]'::jsonb,
  1,
  5,
  'Ghép chữ cái c vào được từ computer.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 7: Which letter makes the sound /c/ in ''computer''?',
  '["Letter Z","Letter X","Letter G","Letter C"]'::jsonb,
  3,
  6,
  'Từ computer bắt đầu bằng chữ cái C phát âm là /c/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 8: Which word starts with the sound /g/?',
  '["hello","bye","computer","gym"]'::jsonb,
  3,
  7,
  'Từ gym bắt đầu bằng âm /g/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 9: Identify the missing letters: ''_omputer'' starts with sound /c/.',
  '["x","c","y","g"]'::jsonb,
  1,
  8,
  'Ghép chữ cái c vào được từ computer.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 10: Which letter makes the sound /c/ in ''computer''?',
  '["Letter Z","Letter X","Letter G","Letter C"]'::jsonb,
  3,
  9,
  'Từ computer bắt đầu bằng chữ cái C phát âm là /c/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 11: Which word starts with the sound /g/?',
  '["hello","gym","computer","bye"]'::jsonb,
  1,
  10,
  'Từ gym bắt đầu bằng âm /g/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 12: Identify the missing letters: ''_omputer'' starts with sound /c/.',
  '["y","x","g","c"]'::jsonb,
  3,
  11,
  'Ghép chữ cái c vào được từ computer.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 13: Which letter makes the sound /c/ in ''computer''?',
  '["Letter C","Letter G","Letter Z","Letter X"]'::jsonb,
  0,
  12,
  'Từ computer bắt đầu bằng chữ cái C phát âm là /c/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 14: Which word starts with the sound /g/?',
  '["computer","gym","hello","bye"]'::jsonb,
  1,
  13,
  'Từ gym bắt đầu bằng âm /g/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030603',
  'Question 15: Identify the missing letters: ''_omputer'' starts with sound /c/.',
  '["x","g","y","c"]'::jsonb,
  3,
  14,
  'Ghép chữ cái c vào được từ computer.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030701', 3,
  'Unit 7: Classroom instructions - Lesson 1',
  'Practice vocabulary and main speaking pattern for Classroom instructions.',
  'jukwgYFa7Sk',
  'tieng_anh', 'Tiếng Anh',
  19, 1,
  'Trang 52',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 7: Classroom instructions',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030701', 'Bài tập: Unit 7: Classroom instructions - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 1: What is the correct English word for ''đứng''?',
  '["bag","hobby","stand","friend"]'::jsonb,
  2,
  0,
  'Stand nghĩa là ''đứng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 2: What is the correct English word for ''ngồi''?',
  '["friend","bag","hobby","sit"]'::jsonb,
  3,
  1,
  'Sit nghĩa là ''ngồi'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 3: What is the correct English word for ''mở''?',
  '["bag","hobby","open","friend"]'::jsonb,
  2,
  2,
  'Open nghĩa là ''mở'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 4: What is the correct English word for ''đóng''?',
  '["bag","hobby","close","friend"]'::jsonb,
  2,
  3,
  'Close nghĩa là ''đóng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 5: What is the correct English word for ''nói''?',
  '["bag","speak","hobby","friend"]'::jsonb,
  1,
  4,
  'Speak nghĩa là ''nói'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 6: What is the correct English word for ''nghe''?',
  '["hobby","listen","friend","bag"]'::jsonb,
  1,
  5,
  'Listen nghĩa là ''nghe'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 7: What is the correct English word for ''nhìn''?',
  '["friend","look","bag","hobby"]'::jsonb,
  1,
  6,
  'Look nghĩa là ''nhìn'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 8: What is the correct English word for ''vào/đến''?',
  '["come","bag","friend","hobby"]'::jsonb,
  0,
  7,
  'Come nghĩa là ''vào/đến'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 9: What is the correct English word for ''đi''?',
  '["hobby","bag","go","friend"]'::jsonb,
  2,
  8,
  'Go nghĩa là ''đi'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 10: What is the correct English word for ''đứng''?',
  '["hobby","friend","bag","stand"]'::jsonb,
  3,
  9,
  'Stand nghĩa là ''đứng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 11: What is the correct English word for ''ngồi''?',
  '["sit","friend","hobby","bag"]'::jsonb,
  0,
  10,
  'Sit nghĩa là ''ngồi'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 12: What is the correct English word for ''mở''?',
  '["friend","bag","open","hobby"]'::jsonb,
  2,
  11,
  'Open nghĩa là ''mở'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 13: What is the correct English word for ''đóng''?',
  '["hobby","friend","bag","close"]'::jsonb,
  3,
  12,
  'Close nghĩa là ''đóng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 14: What is the correct English word for ''nói''?',
  '["speak","bag","hobby","friend"]'::jsonb,
  0,
  13,
  'Speak nghĩa là ''nói'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030701',
  'Question 15: What is the correct English word for ''nghe''?',
  '["bag","hobby","listen","friend"]'::jsonb,
  2,
  14,
  'Listen nghĩa là ''nghe'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030702', 3,
  'Unit 7: Classroom instructions - Lesson 2',
  'Grammar study, listening training, and writing activities for Classroom instructions.',
  '6K7PvBsa5vc',
  'tieng_anh', 'Tiếng Anh',
  20, 1,
  'Trang 54',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 7: Classroom instructions',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030702', 'Bài tập: Unit 7: Classroom instructions - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 1: ______ I come in, teacher?',
  '["May","Can","Do","Are"]'::jsonb,
  0,
  0,
  'May I come in? là câu xin phép vào lớp lịch sự.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 2: May I go out? - Yes, you ______.',
  '["are","can","do","may"]'::jsonb,
  1,
  1,
  'Câu trả lời đồng ý cho phép phổ biến là: Yes, you can.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 3: May I speak? - No, you ______.',
  '["aren''t","don''t","can","can''t"]'::jsonb,
  3,
  2,
  'Câu trả lời từ chối cho phép: No, you can''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 4: ______ I come in, teacher?',
  '["Can","Are","Do","May"]'::jsonb,
  3,
  3,
  'May I come in? là câu xin phép vào lớp lịch sự.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 5: May I go out? - Yes, you ______.',
  '["can","may","are","do"]'::jsonb,
  0,
  4,
  'Câu trả lời đồng ý cho phép phổ biến là: Yes, you can.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 6: May I speak? - No, you ______.',
  '["can","don''t","can''t","aren''t"]'::jsonb,
  2,
  5,
  'Câu trả lời từ chối cho phép: No, you can''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 7: ______ I come in, teacher?',
  '["Do","Can","May","Are"]'::jsonb,
  2,
  6,
  'May I come in? là câu xin phép vào lớp lịch sự.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 8: May I go out? - Yes, you ______.',
  '["may","are","can","do"]'::jsonb,
  2,
  7,
  'Câu trả lời đồng ý cho phép phổ biến là: Yes, you can.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 9: May I speak? - No, you ______.',
  '["don''t","can''t","can","aren''t"]'::jsonb,
  1,
  8,
  'Câu trả lời từ chối cho phép: No, you can''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 10: ______ I come in, teacher?',
  '["May","Can","Do","Are"]'::jsonb,
  0,
  9,
  'May I come in? là câu xin phép vào lớp lịch sự.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 11: May I go out? - Yes, you ______.',
  '["do","are","may","can"]'::jsonb,
  3,
  10,
  'Câu trả lời đồng ý cho phép phổ biến là: Yes, you can.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 12: May I speak? - No, you ______.',
  '["can","can''t","don''t","aren''t"]'::jsonb,
  1,
  11,
  'Câu trả lời từ chối cho phép: No, you can''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 13: ______ I come in, teacher?',
  '["May","Can","Do","Are"]'::jsonb,
  0,
  12,
  'May I come in? là câu xin phép vào lớp lịch sự.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 14: May I go out? - Yes, you ______.',
  '["can","may","do","are"]'::jsonb,
  0,
  13,
  'Câu trả lời đồng ý cho phép phổ biến là: Yes, you can.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030702',
  'Question 15: May I speak? - No, you ______.',
  '["can","aren''t","can''t","don''t"]'::jsonb,
  2,
  14,
  'Câu trả lời từ chối cho phép: No, you can''t.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030703', 3,
  'Unit 7: Classroom instructions - Lesson 3',
  'Phonics practice and comprehensive review for Classroom instructions.',
  'NbLumxu91tE',
  'tieng_anh', 'Tiếng Anh',
  21, 1,
  'Trang 56',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 7: Classroom instructions',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030703', 'Bài tập: Unit 7: Classroom instructions - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 1: Which letter makes the sound /s/ in ''sit''?',
  '["Letter Z","Letter S","Letter D","Letter X"]'::jsonb,
  1,
  0,
  'Từ sit bắt đầu bằng chữ cái S phát âm là /s/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 2: Which word starts with the sound /d/?',
  '["down","sit","bye","hello"]'::jsonb,
  0,
  1,
  'Từ down bắt đầu bằng âm /d/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 3: Identify the missing letters: ''_it'' starts with sound /s/.',
  '["s","d","x","y"]'::jsonb,
  0,
  2,
  'Ghép chữ cái s vào được từ sit.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 4: Which letter makes the sound /s/ in ''sit''?',
  '["Letter S","Letter D","Letter Z","Letter X"]'::jsonb,
  0,
  3,
  'Từ sit bắt đầu bằng chữ cái S phát âm là /s/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 5: Which word starts with the sound /d/?',
  '["bye","sit","down","hello"]'::jsonb,
  2,
  4,
  'Từ down bắt đầu bằng âm /d/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 6: Identify the missing letters: ''_it'' starts with sound /s/.',
  '["s","y","x","d"]'::jsonb,
  0,
  5,
  'Ghép chữ cái s vào được từ sit.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 7: Which letter makes the sound /s/ in ''sit''?',
  '["Letter S","Letter D","Letter X","Letter Z"]'::jsonb,
  0,
  6,
  'Từ sit bắt đầu bằng chữ cái S phát âm là /s/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 8: Which word starts with the sound /d/?',
  '["sit","down","hello","bye"]'::jsonb,
  1,
  7,
  'Từ down bắt đầu bằng âm /d/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 9: Identify the missing letters: ''_it'' starts with sound /s/.',
  '["s","y","x","d"]'::jsonb,
  0,
  8,
  'Ghép chữ cái s vào được từ sit.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 10: Which letter makes the sound /s/ in ''sit''?',
  '["Letter Z","Letter X","Letter D","Letter S"]'::jsonb,
  3,
  9,
  'Từ sit bắt đầu bằng chữ cái S phát âm là /s/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 11: Which word starts with the sound /d/?',
  '["bye","sit","down","hello"]'::jsonb,
  2,
  10,
  'Từ down bắt đầu bằng âm /d/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 12: Identify the missing letters: ''_it'' starts with sound /s/.',
  '["x","d","s","y"]'::jsonb,
  2,
  11,
  'Ghép chữ cái s vào được từ sit.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 13: Which letter makes the sound /s/ in ''sit''?',
  '["Letter X","Letter Z","Letter D","Letter S"]'::jsonb,
  3,
  12,
  'Từ sit bắt đầu bằng chữ cái S phát âm là /s/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 14: Which word starts with the sound /d/?',
  '["hello","sit","bye","down"]'::jsonb,
  3,
  13,
  'Từ down bắt đầu bằng âm /d/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030703',
  'Question 15: Identify the missing letters: ''_it'' starts with sound /s/.',
  '["y","x","d","s"]'::jsonb,
  3,
  14,
  'Ghép chữ cái s vào được từ sit.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030801', 3,
  'Unit 8: My school things - Lesson 1',
  'Practice vocabulary and main speaking pattern for My school things.',
  '44WHQk3HFZk',
  'tieng_anh', 'Tiếng Anh',
  22, 1,
  'Trang 58',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 8: My school things',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030801', 'Bài tập: Unit 8: My school things - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 1: What is the correct English word for ''bút mực''?',
  '["bye","ear","dancing","pen"]'::jsonb,
  3,
  0,
  'Pen nghĩa là ''bút mực'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 2: What is the correct English word for ''bút chì''?',
  '["bye","ear","dancing","pencil"]'::jsonb,
  3,
  1,
  'Pencil nghĩa là ''bút chì'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 3: What is the correct English word for ''cây thước''?',
  '["bye","ear","dancing","ruler"]'::jsonb,
  3,
  2,
  'Ruler nghĩa là ''cây thước'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 4: What is the correct English word for ''cục tẩy''?',
  '["bye","ear","dancing","rubber"]'::jsonb,
  3,
  3,
  'Rubber nghĩa là ''cục tẩy'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 5: What is the correct English word for ''vở ghi bài''?',
  '["notebook","bye","ear","dancing"]'::jsonb,
  0,
  4,
  'Notebook nghĩa là ''vở ghi bài'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 6: What is the correct English word for ''sách''?',
  '["bye","book","dancing","ear"]'::jsonb,
  1,
  5,
  'Book nghĩa là ''sách'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 7: What is the correct English word for ''cặp sách''?',
  '["bye","ear","dancing","school bag"]'::jsonb,
  3,
  6,
  'School bag nghĩa là ''cặp sách'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 8: What is the correct English word for ''bút mực''?',
  '["pen","ear","bye","dancing"]'::jsonb,
  0,
  7,
  'Pen nghĩa là ''bút mực'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 9: What is the correct English word for ''bút chì''?',
  '["pencil","dancing","bye","ear"]'::jsonb,
  0,
  8,
  'Pencil nghĩa là ''bút chì'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 10: What is the correct English word for ''cây thước''?',
  '["ear","bye","dancing","ruler"]'::jsonb,
  3,
  9,
  'Ruler nghĩa là ''cây thước'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 11: What is the correct English word for ''cục tẩy''?',
  '["dancing","ear","rubber","bye"]'::jsonb,
  2,
  10,
  'Rubber nghĩa là ''cục tẩy'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 12: What is the correct English word for ''vở ghi bài''?',
  '["notebook","dancing","ear","bye"]'::jsonb,
  0,
  11,
  'Notebook nghĩa là ''vở ghi bài'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 13: What is the correct English word for ''sách''?',
  '["bye","ear","dancing","book"]'::jsonb,
  3,
  12,
  'Book nghĩa là ''sách'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 14: What is the correct English word for ''cặp sách''?',
  '["bye","dancing","school bag","ear"]'::jsonb,
  2,
  13,
  'School bag nghĩa là ''cặp sách'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030801',
  'Question 15: What is the correct English word for ''bút mực''?',
  '["pen","ear","bye","dancing"]'::jsonb,
  0,
  14,
  'Pen nghĩa là ''bút mực'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030802', 3,
  'Unit 8: My school things - Lesson 2',
  'Grammar study, listening training, and writing activities for My school things.',
  'm6CqwnL4dHo',
  'tieng_anh', 'Tiếng Anh',
  23, 1,
  'Trang 60',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 8: My school things',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030802', 'Bài tập: Unit 8: My school things - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 1: I ______ a ruler and a pen.',
  '["is","have","has","am"]'::jsonb,
  1,
  0,
  'Chủ ngữ ''I'' đi với động từ ''have'' (tôi có).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 2: ______ are my books. (Vật số nhiều ở gần)',
  '["This","Those","That","These"]'::jsonb,
  3,
  1,
  'These dùng để chỉ nhiều vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 3: ______ are my pencils. (Vật số nhiều ở xa)',
  '["This","Those","These","That"]'::jsonb,
  1,
  2,
  'Those dùng để chỉ nhiều vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 4: I ______ a ruler and a pen.',
  '["has","have","is","am"]'::jsonb,
  1,
  3,
  'Chủ ngữ ''I'' đi với động từ ''have'' (tôi có).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 5: ______ are my books. (Vật số nhiều ở gần)',
  '["This","That","Those","These"]'::jsonb,
  3,
  4,
  'These dùng để chỉ nhiều vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 6: ______ are my pencils. (Vật số nhiều ở xa)',
  '["These","That","This","Those"]'::jsonb,
  3,
  5,
  'Those dùng để chỉ nhiều vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 7: I ______ a ruler and a pen.',
  '["am","have","is","has"]'::jsonb,
  1,
  6,
  'Chủ ngữ ''I'' đi với động từ ''have'' (tôi có).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 8: ______ are my books. (Vật số nhiều ở gần)',
  '["This","That","These","Those"]'::jsonb,
  2,
  7,
  'These dùng để chỉ nhiều vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 9: ______ are my pencils. (Vật số nhiều ở xa)',
  '["This","Those","That","These"]'::jsonb,
  1,
  8,
  'Those dùng để chỉ nhiều vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 10: I ______ a ruler and a pen.',
  '["have","has","is","am"]'::jsonb,
  0,
  9,
  'Chủ ngữ ''I'' đi với động từ ''have'' (tôi có).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 11: ______ are my books. (Vật số nhiều ở gần)',
  '["That","This","Those","These"]'::jsonb,
  3,
  10,
  'These dùng để chỉ nhiều vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 12: ______ are my pencils. (Vật số nhiều ở xa)',
  '["This","Those","That","These"]'::jsonb,
  1,
  11,
  'Those dùng để chỉ nhiều vật ở xa người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 13: I ______ a ruler and a pen.',
  '["has","is","have","am"]'::jsonb,
  2,
  12,
  'Chủ ngữ ''I'' đi với động từ ''have'' (tôi có).'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 14: ______ are my books. (Vật số nhiều ở gần)',
  '["Those","These","That","This"]'::jsonb,
  1,
  13,
  'These dùng để chỉ nhiều vật ở gần người nói.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030802',
  'Question 15: ______ are my pencils. (Vật số nhiều ở xa)',
  '["Those","This","These","That"]'::jsonb,
  0,
  14,
  'Those dùng để chỉ nhiều vật ở xa người nói.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030803', 3,
  'Unit 8: My school things - Lesson 3',
  'Phonics practice and comprehensive review for My school things.',
  'QzUPbu6gg7E',
  'tieng_anh', 'Tiếng Anh',
  24, 1,
  'Trang 62',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 8: My school things',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030803', 'Bài tập: Unit 8: My school things - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 1: Which letter makes the sound /r/ in ''ruler''?',
  '["Letter X","Letter P","Letter R","Letter Z"]'::jsonb,
  2,
  0,
  'Từ ruler bắt đầu bằng chữ cái R phát âm là /r/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 2: Which word starts with the sound /p/?',
  '["ruler","hello","pencil","bye"]'::jsonb,
  2,
  1,
  'Từ pencil bắt đầu bằng âm /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 3: Identify the missing letters: ''_uler'' starts with sound /r/.',
  '["r","p","x","y"]'::jsonb,
  0,
  2,
  'Ghép chữ cái r vào được từ ruler.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 4: Which letter makes the sound /r/ in ''ruler''?',
  '["Letter Z","Letter R","Letter X","Letter P"]'::jsonb,
  1,
  3,
  'Từ ruler bắt đầu bằng chữ cái R phát âm là /r/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 5: Which word starts with the sound /p/?',
  '["ruler","hello","bye","pencil"]'::jsonb,
  3,
  4,
  'Từ pencil bắt đầu bằng âm /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 6: Identify the missing letters: ''_uler'' starts with sound /r/.',
  '["y","x","p","r"]'::jsonb,
  3,
  5,
  'Ghép chữ cái r vào được từ ruler.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 7: Which letter makes the sound /r/ in ''ruler''?',
  '["Letter R","Letter P","Letter X","Letter Z"]'::jsonb,
  0,
  6,
  'Từ ruler bắt đầu bằng chữ cái R phát âm là /r/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 8: Which word starts with the sound /p/?',
  '["pencil","bye","ruler","hello"]'::jsonb,
  0,
  7,
  'Từ pencil bắt đầu bằng âm /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 9: Identify the missing letters: ''_uler'' starts with sound /r/.',
  '["x","y","r","p"]'::jsonb,
  2,
  8,
  'Ghép chữ cái r vào được từ ruler.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 10: Which letter makes the sound /r/ in ''ruler''?',
  '["Letter R","Letter P","Letter X","Letter Z"]'::jsonb,
  0,
  9,
  'Từ ruler bắt đầu bằng chữ cái R phát âm là /r/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 11: Which word starts with the sound /p/?',
  '["pencil","ruler","hello","bye"]'::jsonb,
  0,
  10,
  'Từ pencil bắt đầu bằng âm /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 12: Identify the missing letters: ''_uler'' starts with sound /r/.',
  '["r","x","p","y"]'::jsonb,
  0,
  11,
  'Ghép chữ cái r vào được từ ruler.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 13: Which letter makes the sound /r/ in ''ruler''?',
  '["Letter Z","Letter X","Letter P","Letter R"]'::jsonb,
  3,
  12,
  'Từ ruler bắt đầu bằng chữ cái R phát âm là /r/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 14: Which word starts with the sound /p/?',
  '["ruler","bye","hello","pencil"]'::jsonb,
  3,
  13,
  'Từ pencil bắt đầu bằng âm /p/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030803',
  'Question 15: Identify the missing letters: ''_uler'' starts with sound /r/.',
  '["y","x","p","r"]'::jsonb,
  3,
  14,
  'Ghép chữ cái r vào được từ ruler.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030901', 3,
  'Unit 9: Colours - Lesson 1',
  'Practice vocabulary and main speaking pattern for Colours.',
  'TzXQmO783Dc',
  'tieng_anh', 'Tiếng Anh',
  25, 1,
  'Trang 64',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 9: Colours',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030901', 'Bài tập: Unit 9: Colours - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 1: What is the correct English word for ''màu đỏ''?',
  '["face","school","badminton","red"]'::jsonb,
  3,
  0,
  'Red nghĩa là ''màu đỏ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 2: What is the correct English word for ''màu xanh dương''?',
  '["blue","badminton","face","school"]'::jsonb,
  0,
  1,
  'Blue nghĩa là ''màu xanh dương'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 3: What is the correct English word for ''màu xanh lá''?',
  '["badminton","green","school","face"]'::jsonb,
  1,
  2,
  'Green nghĩa là ''màu xanh lá'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 4: What is the correct English word for ''màu vàng''?',
  '["face","badminton","yellow","school"]'::jsonb,
  2,
  3,
  'Yellow nghĩa là ''màu vàng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 5: What is the correct English word for ''màu đen''?',
  '["black","badminton","face","school"]'::jsonb,
  0,
  4,
  'Black nghĩa là ''màu đen'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 6: What is the correct English word for ''màu trắng''?',
  '["badminton","white","face","school"]'::jsonb,
  1,
  5,
  'White nghĩa là ''màu trắng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 7: What is the correct English word for ''màu cam''?',
  '["school","face","orange","badminton"]'::jsonb,
  2,
  6,
  'Orange nghĩa là ''màu cam'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 8: What is the correct English word for ''màu nâu''?',
  '["brown","badminton","face","school"]'::jsonb,
  0,
  7,
  'Brown nghĩa là ''màu nâu'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 9: What is the correct English word for ''màu đỏ''?',
  '["red","badminton","face","school"]'::jsonb,
  0,
  8,
  'Red nghĩa là ''màu đỏ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 10: What is the correct English word for ''màu xanh dương''?',
  '["school","face","badminton","blue"]'::jsonb,
  3,
  9,
  'Blue nghĩa là ''màu xanh dương'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 11: What is the correct English word for ''màu xanh lá''?',
  '["face","badminton","green","school"]'::jsonb,
  2,
  10,
  'Green nghĩa là ''màu xanh lá'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 12: What is the correct English word for ''màu vàng''?',
  '["badminton","face","yellow","school"]'::jsonb,
  2,
  11,
  'Yellow nghĩa là ''màu vàng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 13: What is the correct English word for ''màu đen''?',
  '["school","face","badminton","black"]'::jsonb,
  3,
  12,
  'Black nghĩa là ''màu đen'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 14: What is the correct English word for ''màu trắng''?',
  '["white","school","badminton","face"]'::jsonb,
  0,
  13,
  'White nghĩa là ''màu trắng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030901',
  'Question 15: What is the correct English word for ''màu cam''?',
  '["school","face","badminton","orange"]'::jsonb,
  3,
  14,
  'Orange nghĩa là ''màu cam'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030902', 3,
  'Unit 9: Colours - Lesson 2',
  'Grammar study, listening training, and writing activities for Colours.',
  'gjQCJyVzSg0',
  'tieng_anh', 'Tiếng Anh',
  26, 1,
  'Trang 66',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 9: Colours',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030902', 'Bài tập: Unit 9: Colours - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 1: What colour ______ it? - It is red.',
  '["am","are","be","is"]'::jsonb,
  3,
  0,
  'Hỏi màu sắc của 1 vật: What colour is it?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 2: What colour ______ they? - They are blue.',
  '["am","be","are","is"]'::jsonb,
  2,
  1,
  'Hỏi màu sắc của nhiều vật: What colour are they?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 3: The pencil case is ______.',
  '["green","pen","ruler","book"]'::jsonb,
  0,
  2,
  'Chỗ trống cần một từ chỉ màu sắc (green), các từ còn lại là đồ dùng học tập.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 4: What colour ______ it? - It is red.',
  '["be","am","are","is"]'::jsonb,
  3,
  3,
  'Hỏi màu sắc của 1 vật: What colour is it?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 5: What colour ______ they? - They are blue.',
  '["be","am","are","is"]'::jsonb,
  2,
  4,
  'Hỏi màu sắc của nhiều vật: What colour are they?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 6: The pencil case is ______.',
  '["green","pen","ruler","book"]'::jsonb,
  0,
  5,
  'Chỗ trống cần một từ chỉ màu sắc (green), các từ còn lại là đồ dùng học tập.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 7: What colour ______ it? - It is red.',
  '["be","am","is","are"]'::jsonb,
  2,
  6,
  'Hỏi màu sắc của 1 vật: What colour is it?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 8: What colour ______ they? - They are blue.',
  '["are","is","be","am"]'::jsonb,
  0,
  7,
  'Hỏi màu sắc của nhiều vật: What colour are they?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 9: The pencil case is ______.',
  '["book","pen","green","ruler"]'::jsonb,
  2,
  8,
  'Chỗ trống cần một từ chỉ màu sắc (green), các từ còn lại là đồ dùng học tập.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 10: What colour ______ it? - It is red.',
  '["is","are","be","am"]'::jsonb,
  0,
  9,
  'Hỏi màu sắc của 1 vật: What colour is it?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 11: What colour ______ they? - They are blue.',
  '["is","be","am","are"]'::jsonb,
  3,
  10,
  'Hỏi màu sắc của nhiều vật: What colour are they?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 12: The pencil case is ______.',
  '["ruler","pen","book","green"]'::jsonb,
  3,
  11,
  'Chỗ trống cần một từ chỉ màu sắc (green), các từ còn lại là đồ dùng học tập.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 13: What colour ______ it? - It is red.',
  '["be","am","are","is"]'::jsonb,
  3,
  12,
  'Hỏi màu sắc của 1 vật: What colour is it?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 14: What colour ______ they? - They are blue.',
  '["am","are","is","be"]'::jsonb,
  1,
  13,
  'Hỏi màu sắc của nhiều vật: What colour are they?'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030902',
  'Question 15: The pencil case is ______.',
  '["green","pen","ruler","book"]'::jsonb,
  0,
  14,
  'Chỗ trống cần một từ chỉ màu sắc (green), các từ còn lại là đồ dùng học tập.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030903', 3,
  'Unit 9: Colours - Lesson 3',
  'Phonics practice and comprehensive review for Colours.',
  'ip7zzwB1yTs',
  'tieng_anh', 'Tiếng Anh',
  27, 1,
  'Trang 68',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 9: Colours',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea030903', 'Bài tập: Unit 9: Colours - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 1: Which letter makes the sound /b/ in ''brown''?',
  '["Letter B","Letter Z","Letter X"]'::jsonb,
  0,
  0,
  'Từ brown bắt đầu bằng chữ cái B phát âm là /b/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 2: Which word starts with the sound /bl/?',
  '["black","bye","hello","brown"]'::jsonb,
  0,
  1,
  'Từ black bắt đầu bằng âm /bl/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 3: Identify the missing letters: ''_rown'' starts with sound /b/.',
  '["y","x","b"]'::jsonb,
  2,
  2,
  'Ghép chữ cái b vào được từ brown.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 4: Which letter makes the sound /b/ in ''brown''?',
  '["Letter X","Letter Z","Letter B"]'::jsonb,
  2,
  3,
  'Từ brown bắt đầu bằng chữ cái B phát âm là /b/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 5: Which word starts with the sound /bl/?',
  '["black","brown","bye","hello"]'::jsonb,
  0,
  4,
  'Từ black bắt đầu bằng âm /bl/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 6: Identify the missing letters: ''_rown'' starts with sound /b/.',
  '["b","x","y"]'::jsonb,
  0,
  5,
  'Ghép chữ cái b vào được từ brown.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 7: Which letter makes the sound /b/ in ''brown''?',
  '["Letter Z","Letter B","Letter X"]'::jsonb,
  1,
  6,
  'Từ brown bắt đầu bằng chữ cái B phát âm là /b/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 8: Which word starts with the sound /bl/?',
  '["black","brown","bye","hello"]'::jsonb,
  0,
  7,
  'Từ black bắt đầu bằng âm /bl/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 9: Identify the missing letters: ''_rown'' starts with sound /b/.',
  '["b","x","y"]'::jsonb,
  0,
  8,
  'Ghép chữ cái b vào được từ brown.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 10: Which letter makes the sound /b/ in ''brown''?',
  '["Letter Z","Letter B","Letter X"]'::jsonb,
  1,
  9,
  'Từ brown bắt đầu bằng chữ cái B phát âm là /b/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 11: Which word starts with the sound /bl/?',
  '["bye","hello","brown","black"]'::jsonb,
  3,
  10,
  'Từ black bắt đầu bằng âm /bl/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 12: Identify the missing letters: ''_rown'' starts with sound /b/.',
  '["y","x","b"]'::jsonb,
  2,
  11,
  'Ghép chữ cái b vào được từ brown.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 13: Which letter makes the sound /b/ in ''brown''?',
  '["Letter B","Letter X","Letter Z"]'::jsonb,
  0,
  12,
  'Từ brown bắt đầu bằng chữ cái B phát âm là /b/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 14: Which word starts with the sound /bl/?',
  '["black","brown","hello","bye"]'::jsonb,
  0,
  13,
  'Từ black bắt đầu bằng âm /bl/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea030903',
  'Question 15: Identify the missing letters: ''_rown'' starts with sound /b/.',
  '["y","x","b"]'::jsonb,
  2,
  14,
  'Ghép chữ cái b vào được từ brown.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea031001', 3,
  'Unit 10: Break time activities - Lesson 1',
  'Practice vocabulary and main speaking pattern for Break time activities.',
  'jOeNlYu2WkA',
  'tieng_anh', 'Tiếng Anh',
  28, 1,
  'Trang 70',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  1,
  'Unit 10: Break time activities',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea031001', 'Bài tập: Unit 10: Break time activities - Lesson 1'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 1: What is the correct English word for ''đá bóng''?',
  '["football","name","head","classroom"]'::jsonb,
  0,
  0,
  'Football nghĩa là ''đá bóng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 2: What is the correct English word for ''cờ vua''?',
  '["name","head","classroom","chess"]'::jsonb,
  3,
  1,
  'Chess nghĩa là ''cờ vua'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 3: What is the correct English word for ''bóng bàn''?',
  '["head","classroom","name","table tennis"]'::jsonb,
  3,
  2,
  'Table tennis nghĩa là ''bóng bàn'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 4: What is the correct English word for ''cầu lông''?',
  '["classroom","badminton","name","head"]'::jsonb,
  1,
  3,
  'Badminton nghĩa là ''cầu lông'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 5: What is the correct English word for ''bóng rổ''?',
  '["name","head","classroom","basketball"]'::jsonb,
  3,
  4,
  'Basketball nghĩa là ''bóng rổ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 6: What is the correct English word for ''trốn tìm''?',
  '["name","head","classroom","hide-and-seek"]'::jsonb,
  3,
  5,
  'Hide-and-seek nghĩa là ''trốn tìm'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 7: What is the correct English word for ''đá bóng''?',
  '["head","classroom","football","name"]'::jsonb,
  2,
  6,
  'Football nghĩa là ''đá bóng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 8: What is the correct English word for ''cờ vua''?',
  '["chess","head","name","classroom"]'::jsonb,
  0,
  7,
  'Chess nghĩa là ''cờ vua'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 9: What is the correct English word for ''bóng bàn''?',
  '["name","classroom","head","table tennis"]'::jsonb,
  3,
  8,
  'Table tennis nghĩa là ''bóng bàn'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 10: What is the correct English word for ''cầu lông''?',
  '["name","head","badminton","classroom"]'::jsonb,
  2,
  9,
  'Badminton nghĩa là ''cầu lông'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 11: What is the correct English word for ''bóng rổ''?',
  '["name","head","classroom","basketball"]'::jsonb,
  3,
  10,
  'Basketball nghĩa là ''bóng rổ'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 12: What is the correct English word for ''trốn tìm''?',
  '["head","name","classroom","hide-and-seek"]'::jsonb,
  3,
  11,
  'Hide-and-seek nghĩa là ''trốn tìm'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 13: What is the correct English word for ''đá bóng''?',
  '["football","classroom","head","name"]'::jsonb,
  0,
  12,
  'Football nghĩa là ''đá bóng'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 14: What is the correct English word for ''cờ vua''?',
  '["head","classroom","name","chess"]'::jsonb,
  3,
  13,
  'Chess nghĩa là ''cờ vua'' trong tiếng Anh.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031001',
  'Question 15: What is the correct English word for ''bóng bàn''?',
  '["table tennis","classroom","head","name"]'::jsonb,
  0,
  14,
  'Table tennis nghĩa là ''bóng bàn'' trong tiếng Anh.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea031002', 3,
  'Unit 10: Break time activities - Lesson 2',
  'Grammar study, listening training, and writing activities for Break time activities.',
  'T2BbuWe7Bss',
  'tieng_anh', 'Tiếng Anh',
  29, 1,
  'Trang 72',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  2,
  'Unit 10: Break time activities',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea031002', 'Bài tập: Unit 10: Break time activities - Lesson 2'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 1: What do you do at break time? - I ______ football.',
  '["played","playing","play","plays"]'::jsonb,
  2,
  0,
  'Thì hiện tại đơn với chủ ngữ ''I'' đi với động từ nguyên mẫu ''play''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 2: Do you like playing chess? - Yes, I ______.',
  '["am","like","don''t","do"]'::jsonb,
  3,
  1,
  'Trả lời khẳng định cho câu hỏi Do you...?: Yes, I do.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 3: Do you like playing badminton? - No, I ______.',
  '["am not","not","don''t","do"]'::jsonb,
  2,
  2,
  'Trả lời phủ định cho câu hỏi Do you...?: No, I don''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 4: What do you do at break time? - I ______ football.',
  '["play","plays","playing","played"]'::jsonb,
  0,
  3,
  'Thì hiện tại đơn với chủ ngữ ''I'' đi với động từ nguyên mẫu ''play''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 5: Do you like playing chess? - Yes, I ______.',
  '["like","do","don''t","am"]'::jsonb,
  1,
  4,
  'Trả lời khẳng định cho câu hỏi Do you...?: Yes, I do.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 6: Do you like playing badminton? - No, I ______.',
  '["don''t","do","am not","not"]'::jsonb,
  0,
  5,
  'Trả lời phủ định cho câu hỏi Do you...?: No, I don''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 7: What do you do at break time? - I ______ football.',
  '["playing","plays","play","played"]'::jsonb,
  2,
  6,
  'Thì hiện tại đơn với chủ ngữ ''I'' đi với động từ nguyên mẫu ''play''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 8: Do you like playing chess? - Yes, I ______.',
  '["am","don''t","do","like"]'::jsonb,
  2,
  7,
  'Trả lời khẳng định cho câu hỏi Do you...?: Yes, I do.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 9: Do you like playing badminton? - No, I ______.',
  '["do","don''t","am not","not"]'::jsonb,
  1,
  8,
  'Trả lời phủ định cho câu hỏi Do you...?: No, I don''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 10: What do you do at break time? - I ______ football.',
  '["played","plays","play","playing"]'::jsonb,
  2,
  9,
  'Thì hiện tại đơn với chủ ngữ ''I'' đi với động từ nguyên mẫu ''play''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 11: Do you like playing chess? - Yes, I ______.',
  '["like","do","don''t","am"]'::jsonb,
  1,
  10,
  'Trả lời khẳng định cho câu hỏi Do you...?: Yes, I do.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 12: Do you like playing badminton? - No, I ______.',
  '["do","don''t","not","am not"]'::jsonb,
  1,
  11,
  'Trả lời phủ định cho câu hỏi Do you...?: No, I don''t.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 13: What do you do at break time? - I ______ football.',
  '["play","plays","playing","played"]'::jsonb,
  0,
  12,
  'Thì hiện tại đơn với chủ ngữ ''I'' đi với động từ nguyên mẫu ''play''.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 14: Do you like playing chess? - Yes, I ______.',
  '["don''t","like","do","am"]'::jsonb,
  2,
  13,
  'Trả lời khẳng định cho câu hỏi Do you...?: Yes, I do.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031002',
  'Question 15: Do you like playing badminton? - No, I ______.',
  '["do","don''t","not","am not"]'::jsonb,
  1,
  14,
  'Trả lời phủ định cho câu hỏi Do you...?: No, I don''t.'
);

insert into public.lessons (
  id, grade, title, summary, youtube_video_id, subject_slug, subject_label_vi,
  lesson_index, volume, page_hint, subject_id, book_lesson_number, topic_label, video_part
) values (
  'aaaaaaaa-aaaa-aaaa-aaaa-0000ea031003', 3,
  'Unit 10: Break time activities - Lesson 3',
  'Phonics practice and comprehensive review for Break time activities.',
  'AF2LDajzaKM',
  'tieng_anh', 'Tiếng Anh',
  30, 1,
  'Trang 74',
  'cccccccc-cccc-cccc-cccc-cccccccc3003',
  3,
  'Unit 10: Break time activities',
  0
);
insert into public.quizzes (id, lesson_id, title) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003', 'aaaaaaaa-aaaa-aaaa-aaaa-0000ea031003', 'Bài tập: Unit 10: Break time activities - Lesson 3'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 1: Which letter makes the sound /ch/ in ''chess''?',
  '["Letter Z","Letter C","Letter F","Letter X"]'::jsonb,
  1,
  0,
  'Từ chess bắt đầu bằng chữ cái C phát âm là /ch/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 2: Which word starts with the sound /f/?',
  '["football","bye","chess","hello"]'::jsonb,
  0,
  1,
  'Từ football bắt đầu bằng âm /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 3: Identify the missing letters: ''_hess'' starts with sound /ch/.',
  '["c","f","y","x"]'::jsonb,
  0,
  2,
  'Ghép chữ cái c vào được từ chess.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 4: Which letter makes the sound /ch/ in ''chess''?',
  '["Letter Z","Letter X","Letter F","Letter C"]'::jsonb,
  3,
  3,
  'Từ chess bắt đầu bằng chữ cái C phát âm là /ch/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 5: Which word starts with the sound /f/?',
  '["bye","hello","chess","football"]'::jsonb,
  3,
  4,
  'Từ football bắt đầu bằng âm /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 6: Identify the missing letters: ''_hess'' starts with sound /ch/.',
  '["c","f","y","x"]'::jsonb,
  0,
  5,
  'Ghép chữ cái c vào được từ chess.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 7: Which letter makes the sound /ch/ in ''chess''?',
  '["Letter C","Letter F","Letter Z","Letter X"]'::jsonb,
  0,
  6,
  'Từ chess bắt đầu bằng chữ cái C phát âm là /ch/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 8: Which word starts with the sound /f/?',
  '["hello","chess","football","bye"]'::jsonb,
  2,
  7,
  'Từ football bắt đầu bằng âm /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 9: Identify the missing letters: ''_hess'' starts with sound /ch/.',
  '["y","x","f","c"]'::jsonb,
  3,
  8,
  'Ghép chữ cái c vào được từ chess.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 10: Which letter makes the sound /ch/ in ''chess''?',
  '["Letter Z","Letter X","Letter C","Letter F"]'::jsonb,
  2,
  9,
  'Từ chess bắt đầu bằng chữ cái C phát âm là /ch/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 11: Which word starts with the sound /f/?',
  '["hello","chess","football","bye"]'::jsonb,
  2,
  10,
  'Từ football bắt đầu bằng âm /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 12: Identify the missing letters: ''_hess'' starts with sound /ch/.',
  '["c","y","f","x"]'::jsonb,
  0,
  11,
  'Ghép chữ cái c vào được từ chess.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 13: Which letter makes the sound /ch/ in ''chess''?',
  '["Letter X","Letter Z","Letter F","Letter C"]'::jsonb,
  3,
  12,
  'Từ chess bắt đầu bằng chữ cái C phát âm là /ch/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 14: Which word starts with the sound /f/?',
  '["chess","bye","football","hello"]'::jsonb,
  2,
  13,
  'Từ football bắt đầu bằng âm /f/.'
);
insert into public.quiz_questions (quiz_id, question, options, correct_index, order_index, explanation) values (
  'bbbbbbbb-aaaa-aaaa-aaaa-0000ea031003',
  'Question 15: Identify the missing letters: ''_hess'' starts with sound /ch/.',
  '["x","f","y","c"]'::jsonb,
  3,
  14,
  'Ghép chữ cái c vào được từ chess.'
);
