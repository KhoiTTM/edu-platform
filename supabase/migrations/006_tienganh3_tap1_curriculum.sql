-- English Grade 3 Part 1 Curriculum
-- Mapping Units to YouTube videos

-- Subject ID: cccccccc-cccc-cccc-cccc-cccccccc3003 (Tiếng Anh 3 Tập 1)

-- Delete existing lessons for this subject to avoid duplication during development
delete from public.lessons where subject_id = 'cccccccc-cccc-cccc-cccc-cccccccc3003';

insert into public.lessons (
  id, grade, title, summary, youtube_video_id,
  subject_slug, subject_label_vi, lesson_index, volume, page_hint, subject_id
) values 
-- Unit 1
(gen_random_uuid(), 3, 'Unit 1: Hello - Lesson 1', 'Greeting people and introducing yourself.', 'BxICEiI8bus', 'tieng_anh', 'Tiếng Anh', 1, 1, 'Trang 8', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 1: Hello - Lesson 2', 'Greeting people and introducing yourself (Part 2).', 'IL1zoFabdR0', 'tieng_anh', 'Tiếng Anh', 2, 1, 'Trang 10', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 1: Hello - Lesson 3', 'Phonics and review of Unit 1.', 'rkdfQPLMyV0', 'tieng_anh', 'Tiếng Anh', 3, 1, 'Trang 12', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 2
(gen_random_uuid(), 3, 'Unit 2: Our names - Lesson 1', 'Asking and answering about names.', 'jOxyKwBr4xI', 'tieng_anh', 'Tiếng Anh', 4, 1, 'Trang 14', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 2: Our names - Lesson 2', 'Spelling names.', 'pnWT0B-BDRw', 'tieng_anh', 'Tiếng Anh', 5, 1, 'Trang 16', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 2: Our names - Lesson 3', 'Phonics and review of Unit 2.', '79f0zwMlQVI', 'tieng_anh', 'Tiếng Anh', 6, 1, 'Trang 18', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 3
(gen_random_uuid(), 3, 'Unit 3: Our friends - Lesson 1', 'Introducing friends.', 'bFyWPD_JyaE', 'tieng_anh', 'Tiếng Anh', 7, 1, 'Trang 20', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 3: Our friends - Lesson 2', 'Asking and answering about friends.', 'tDCx6rnMofY', 'tieng_anh', 'Tiếng Anh', 8, 1, 'Trang 22', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 3: Our friends - Lesson 3', 'Phonics and review of Unit 3.', 'N3qVVIDeZEA', 'tieng_anh', 'Tiếng Anh', 9, 1, 'Trang 24', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 4
(gen_random_uuid(), 3, 'Unit 4: Our bodies - Lesson 1', 'Identifying body parts.', 'UOc_3Pe_SUI', 'tieng_anh', 'Tiếng Anh', 10, 1, 'Trang 26', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 4: Our bodies - Lesson 2', 'Following body-related instructions.', 'muzK3elF3Fc', 'tieng_anh', 'Tiếng Anh', 11, 1, 'Trang 28', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 4: Our bodies - Lesson 3', 'Phonics and review of Unit 4.', '-uit3OagQqk', 'tieng_anh', 'Tiếng Anh', 12, 1, 'Trang 30', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 5
(gen_random_uuid(), 3, 'Unit 5: My hobbies - Lesson 1', 'Talking about hobbies.', 'DoUT-BprWMI', 'tieng_anh', 'Tiếng Anh', 13, 1, 'Trang 32', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 5: My hobbies - Lesson 2', 'Asking about hobbies.', 'L2KqOM3TL3A', 'tieng_anh', 'Tiếng Anh', 14, 1, 'Trang 34', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 5: My hobbies - Lesson 3', 'Phonics and review of Unit 5.', 'nlzR6isFGNY', 'tieng_anh', 'Tiếng Anh', 15, 1, 'Trang 36', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 6
(gen_random_uuid(), 3, 'Unit 6: Our school - Lesson 1', 'Identifying school facilities.', 'lVsjNWfTti8', 'tieng_anh', 'Tiếng Anh', 16, 1, 'Trang 42', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 6: Our school - Lesson 2', 'Asking and answering about school facilities.', 'oiAfW4Gro9U', 'tieng_anh', 'Tiếng Anh', 17, 1, 'Trang 44', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 6: Our school - Lesson 3', 'Phonics and review of Unit 6.', 'MM6_3gUfFzQ', 'tieng_anh', 'Tiếng Anh', 18, 1, 'Trang 46', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 7
(gen_random_uuid(), 3, 'Unit 7: Classroom instructions - Lesson 1', 'Common classroom commands.', 'jukwgYFa7Sk', 'tieng_anh', 'Tiếng Anh', 19, 1, 'Trang 48', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 7: Classroom instructions - Lesson 2', 'Asking for permission in class.', '6K7PvBsa5vc', 'tieng_anh', 'Tiếng Anh', 20, 1, 'Trang 50', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 7: Classroom instructions - Lesson 3', 'Phonics and review of Unit 7.', 'NbLumxu91tE', 'tieng_anh', 'Tiếng Anh', 21, 1, 'Trang 52', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 8
(gen_random_uuid(), 3, 'Unit 8: My school things - Lesson 1', 'Identifying school supplies.', '44WHQk3HFZk', 'tieng_anh', 'Tiếng Anh', 22, 1, 'Trang 54', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 8: My school things - Lesson 2', 'Asking and answering about school supplies.', 'm6CqwnL4dHo', 'tieng_anh', 'Tiếng Anh', 23, 1, 'Trang 56', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 8: My school things - Lesson 3', 'Phonics and review of Unit 8.', 'QzUPbu6gg7E', 'tieng_anh', 'Tiếng Anh', 24, 1, 'Trang 58', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 9
(gen_random_uuid(), 3, 'Unit 9: Colours - Lesson 1', 'Identifying colours.', 'TzXQmO783Dc', 'tieng_anh', 'Tiếng Anh', 25, 1, 'Trang 60', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 9: Colours - Lesson 2', 'Asking about colours.', 'gjQCJyVzSg0', 'tieng_anh', 'Tiếng Anh', 26, 1, 'Trang 62', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 9: Colours - Lesson 3', 'Phonics and review of Unit 9.', 'ip7zzwB1yTs', 'tieng_anh', 'Tiếng Anh', 27, 1, 'Trang 64', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
-- Unit 10
(gen_random_uuid(), 3, 'Unit 10: Break time activities - Lesson 1', 'Talking about break time activities.', 'jOeNlYu2WkA', 'tieng_anh', 'Tiếng Anh', 28, 1, 'Trang 66', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 10: Break time activities - Lesson 2', 'Asking about break time activities.', 'T2BbuWe7Bss', 'tieng_anh', 'Tiếng Anh', 29, 1, 'Trang 68', 'cccccccc-cccc-cccc-cccc-cccccccc3003'),
(gen_random_uuid(), 3, 'Unit 10: Break time activities - Lesson 3', 'Phonics and review of Unit 10.', 'AF2LDajzaKM', 'tieng_anh', 'Tiếng Anh', 30, 1, 'Trang 70', 'cccccccc-cccc-cccc-cccc-cccccccc3003');
