import { createClient } from '@supabase/supabase-js';

// Migration script for English Grade 3
// Usage: npx tsx --env-file=.env.local scripts/migrate-english-to-universal.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

type Question = {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
};

const units = [
  { num: 1, name: "Hello" },
  { num: 2, name: "Our names" },
  { num: 3, name: "Our friends" },
  { num: 4, name: "Our bodies" },
  { num: 5, name: "My hobbies" },
  { num: 6, name: "Our school" },
  { num: 7, name: "Classroom instructions" },
  { num: 8, name: "My school things" },
  { num: 9, name: "Colours" },
  { num: 10, name: "Break time activities" }
];

// Unit 1 Lesson 1 Practice (15)
const u1l1Practice: Question[] = [
  { question: "How do you say 'Xin chào' in English?", options: ["Goodbye", "Hello", "Thank you", "Sorry"], correct_index: 1, explanation: "Hello là lời chào phổ biến nhất trong tiếng Anh." },
  { question: "Complete the sentence: 'Hi, I ______ Mai.'", options: ["is", "am", "are", "be"], correct_index: 1, explanation: "Cấu trúc giới thiệu tên: I am + tên (hoặc I'm + tên)." },
  { question: "When you meet a friend, you can say 'Hello' or...", options: ["Bye", "Hi", "Goodbye", "No"], correct_index: 1, explanation: "Hi là cách chào thân mật, dùng giống như Hello." },
  { question: "Who is the teacher character in Unit 1?", options: ["Miss Hien", "Mai", "Nam", "Quan"], correct_index: 0, explanation: "Miss Hien là giáo viên hướng dẫn các bạn học sinh trong Unit 1." },
  { question: "Ben says: 'Hello, I'm Ben.' What should Lucy say?", options: ["Goodbye, Ben", "Hi, Ben. I'm Lucy", "I'm fine, thanks", "Thank you"], correct_index: 1, explanation: "Khi ai đó tự giới thiệu, chúng ta nên chào lại và giới thiệu bản thân." },
  { question: "Which word starts with the letter 'h'?", options: ["Bye", "Hello", "Fine", "Mai"], correct_index: 1, explanation: "Hello bắt đầu bằng chữ 'h'." },
  { question: "Which word starts with the letter 'b'?", options: ["Hi", "Bye", "Hello", "Thank"], correct_index: 1, explanation: "Bye bắt đầu bằng chữ 'b'." },
  { question: "Choose the correct spelling of 'Xin chào':", options: ["Helo", "Hello", "Hallo", "Hilo"], correct_index: 1, explanation: "Cách viết đúng là Hello (hai chữ l)." },
  { question: "Complete the dialogue: 'Hi, Nam.' - '______, Phong.'", options: ["Goodbye", "Hello", "Fine", "Thanks"], correct_index: 1, explanation: "Chào lại Phong bằng Hello hoặc Hi." },
  { question: "What does 'I'm' stand for?", options: ["I is", "I are", "I am", "I be"], correct_index: 2, explanation: "I'm là viết tắt của I am." },
  { question: "How do you introduce yourself?", options: ["I'm [Name]", "Fine, thanks", "Goodbye", "Hello"], correct_index: 0, explanation: "Dùng 'I'm + tên' để giới thiệu bản thân." },
  { question: "Choose the odd one out (Chọn từ khác loại):", options: ["Hello", "Hi", "Goodbye", "Nam"], correct_index: 3, explanation: "Nam là tên riêng, các từ còn lại là lời chào hỏi/tạm biệt." },
  { question: "What letter is missing: 'H_llo'?", options: ["a", "e", "i", "o"], correct_index: 1, explanation: "Từ đầy đủ là Hello, nên chữ cái thiếu là 'e'." },
  { question: "What letter is missing: 'B_e'?", options: ["a", "e", "i", "y"], correct_index: 3, explanation: "Từ đầy đủ là Bye, nên chữ cái thiếu là 'y'." },
  { question: "Complete the name of this character: 'Mr. _____'", options: ["Hien", "Long", "Loc", "Nam"], correct_index: 1, explanation: "Thầy giáo trong sách tiếng Anh lớp 3 là Mr. Long." }
];

const u1l1Quiz: Question[] = [
  { question: "What is a polite way to say hello to a teacher?", options: ["Hello, teacher", "Goodbye", "Hi", "No"], correct_index: 0, explanation: "Dùng 'Hello, teacher' để chào giáo viên một cách lịch sự." },
  { question: "How do you spell 'Hello'?", options: ["H-E-L-L-O", "H-E-L-O", "H-A-L-L-O", "H-I-L-O"], correct_index: 0, explanation: "Hello đánh vần là H-E-L-L-O." },
  { question: "Choose the correct introduction:", options: ["I'm Nam.", "I Nam.", "Am Nam.", "Is Nam."], correct_index: 0, explanation: "Cấu trúc giới thiệu bản thân đầy đủ và đúng ngữ pháp là 'I'm Nam.'." },
  { question: "When you meet a new classmate, what can you say first?", options: ["Hello, I'm ...", "Goodbye", "Fine, thanks", "See you later"], correct_index: 0, explanation: "Khi gặp bạn mới, ta tự giới thiệu bằng 'Hello, I'm...'" },
  { question: "Complete: 'Hi, I _____ Ben.'", options: ["am", "is", "are", "be"], correct_index: 0, explanation: "I đi với am: I am." }
];

// Unit 1 Lesson 2 Practice (15)
const u1l2Practice: Question[] = [
  { question: "What do you say when you ask about someone's health?", options: ["What's your name?", "How old are you?", "How are you?", "Who are you?"], correct_index: 2, explanation: "How are you? dùng để hỏi thăm sức khỏe." },
  { question: "Complete: 'I'm fine, ______ you.'", options: ["thank", "thanks", "hello", "hi"], correct_index: 0, explanation: "Cụm từ đầy đủ lịch sự là 'thank you'." },
  { question: "What is another way to say 'I'm fine, thank you'?", options: ["Hello", "Fine, thanks", "Goodbye", "Bye"], correct_index: 1, explanation: "Fine, thanks là cách trả lời ngắn gọn, thân mật." },
  { question: "What do you say when you leave?", options: ["Hello", "Hi", "Goodbye", "How are you"], correct_index: 2, explanation: "Goodbye dùng khi chào tạm biệt ra về." },
  { question: "Which phrase means 'Tạm biệt' in English?", options: ["Goodbye", "Hello", "How are you", "Fine, thanks"], correct_index: 0, explanation: "Goodbye có nghĩa là Tạm biệt." },
  { question: "Teacher: 'Goodbye, class.' - Students: '______, teacher.'", options: ["Hello", "Goodbye", "Fine, thanks", "Hi"], correct_index: 1, explanation: "Học sinh chào tạm biệt giáo viên bằng Goodbye." },
  { question: "Complete the word: 'th_nks'", options: ["a", "e", "i", "o"], correct_index: 0, explanation: "Thanks viết với chữ 'a'." },
  { question: "If you are very well, you can say:", options: ["I'm bad", "Very well, thank you", "Goodbye", "Hello"], correct_index: 1, explanation: "Very well, thank you nghĩa là tôi rất khỏe, cảm ơn bạn." },
  { question: "Nam: 'How are you, Mai?' - Mai: 'Fine, ______.'", options: ["hello", "thanks", "goodbye", "hi"], correct_index: 1, explanation: "Mai trả lời sức khỏe khỏe và cảm ơn Phong bằng thanks." },
  { question: "What is the English word for 'Khỏe/Tốt'?", options: ["Hello", "Fine", "Bye", "Name"], correct_index: 1, explanation: "Fine nghĩa là khỏe, tốt." },
  { question: "Choose the correct spelling of 'Tạm biệt':", options: ["Godbye", "Goodby", "Goodbye", "Gudbye"], correct_index: 2, explanation: "Goodbye viết đúng chính tả có hai chữ 'o' và có chữ 'e' ở cuối." },
  { question: "Rearrange: 'are / how / you / ?'", options: ["How are you?", "How you are?", "Are how you?", "You how are?"], correct_index: 0, explanation: "Cấu trúc đúng câu hỏi thăm sức khỏe: How are you?" },
  { question: "Choose the odd one out:", options: ["Fine", "Well", "Goodbye", "Great"], correct_index: 2, explanation: "Goodbye là từ chào tạm biệt, các từ còn lại chỉ trạng thái sức khỏe tốt." },
  { question: "Complete: 'Goodbye. See you ______.'", options: ["later", "hello", "hi", "thanks"], correct_index: 0, explanation: "See you later là hẹn gặp lại bạn sau." },
  { question: "What is a very short way to say 'Goodbye'?", options: ["Hi", "Hello", "Bye", "Fine"], correct_index: 2, explanation: "Bye là dạng rút gọn của Goodbye." }
];

const u1l2Quiz: Question[] = [
  { question: "Rearrange the words to make a correct response: 'thanks / fine, / I'm'", options: ["I'm fine, thanks.", "Thanks fine, I'm.", "I'm thanks, fine.", "Fine, I'm thanks."], correct_index: 0, explanation: "Câu trả lời đúng trật tự: I'm fine, thanks." },
  { question: "What is the English translation of 'Hẹn gặp lại sau'?", options: ["See you later", "Hello", "How are you", "Good morning"], correct_index: 0, explanation: "See you later dịch là Hẹn gặp lại sau." },
  { question: "If you ask: 'How are you?', what is a suitable answer?", options: ["Fine, thanks.", "Goodbye.", "What's your name?", "I'm Mai."], correct_index: 0, explanation: "Hỏi sức khỏe thì trả lời Fine, thanks (Khỏe, cảm ơn)." },
  { question: "Which letters are missing in 'G_ _dbye'?", options: ["oo", "ou", "ue", "oa"], correct_index: 0, explanation: "Thiếu hai chữ 'o' trong từ Goodbye." },
  { question: "Complete the dialogue: 'Goodbye, Nam.' - '______, Phong.'", options: ["Bye", "Fine", "Thanks", "How"], correct_index: 0, explanation: "Tạm biệt Phong bằng cách nói Bye hoặc Goodbye." }
];

// Unit 1 Lesson 3 Practice (15)
const u1l3Practice: Question[] = [
  { question: "Which letter makes the sound /b/ in 'Ben'?", options: ["Letter B", "Letter H", "Letter M", "Letter L"], correct_index: 0, explanation: "Chữ cái B tạo ra âm /b/." },
  { question: "Which letter makes the sound /h/ in 'Hello'?", options: ["Letter B", "Letter H", "Letter L", "Letter N"], correct_index: 1, explanation: "Chữ cái H tạo ra âm /h/." },
  { question: "Find the word with the sound /b/:", options: ["Hi", "Hello", "Bye", "How"], correct_index: 2, explanation: "Bye bắt đầu bằng âm /b/." },
  { question: "Find the word with the sound /h/:", options: ["Bill", "Ben", "Bye", "Hi"], correct_index: 3, explanation: "Hi bắt đầu bằng âm /h/." },
  { question: "Phonics focus: '_ell_' is completed with what letters?", options: ["H and o", "B and y", "M and a", "P and e"], correct_index: 0, explanation: "H + ello tạo thành Hello." },
  { question: "Phonics focus: '_ye' is completed with what letter?", options: ["h", "b", "l", "m"], correct_index: 1, explanation: "b + ye tạo thành Bye." },
  { question: "Which name starts with the letter 'B'?", options: ["Nam", "Bill", "Mai", "Phong"], correct_index: 1, explanation: "Bill bắt đầu bằng chữ 'B'." },
  { question: "Which word does NOT start with 'h'?", options: ["Hello", "Hi", "How", "Bye"], correct_index: 3, explanation: "Bye bắt đầu bằng 'b', các từ còn lại bắt đầu bằng 'h'." },
  { question: "Which word does NOT start with 'b'?", options: ["Bye", "Ben", "Bill", "Hello"], correct_index: 3, explanation: "Hello bắt đầu bằng 'h', các từ còn lại bắt đầu bằng 'b'." },
  { question: "Choose the correct sound matching: 'H' is for...", options: ["Ben", "Hello", "Bye", "Bill"], correct_index: 1, explanation: "H phát âm là /h/, tương ứng với từ Hello." },
  { question: "Choose the correct sound matching: 'B' is for...", options: ["Hi", "How", "Hello", "Ben"], correct_index: 3, explanation: "B phát âm là /b/, tương ứng với từ Ben." },
  { question: "Unscramble: 'i-h'", options: ["hi", "ih", "he", "ha"], correct_index: 0, explanation: "Sắp xếp lại thành 'hi'." },
  { question: "Unscramble: 'e-y-b'", options: ["bye", "bey", "yeb", "eby"], correct_index: 0, explanation: "Sắp xếp lại thành 'bye'." },
  { question: "What sound does the letter 'H' make in English?", options: ["/b/", "/h/", "/m/", "/n/"], correct_index: 1, explanation: "Letter H làm ra âm /h/." },
  { question: "What sound does the letter 'B' make in English?", options: ["/b/", "/h/", "/p/", "/t/"], correct_index: 0, explanation: "Letter B làm ra âm /b/." }
];

const u1l3Quiz: Question[] = [
  { question: "Identify the word that starts with /h/ sound:", options: ["Hi", "Bye", "Ben", "Bill"], correct_index: 0, explanation: "Hi bắt đầu với âm /h/." },
  { question: "Identify the word that starts with /b/ sound:", options: ["Book", "Hello", "Hi", "How"], correct_index: 0, explanation: "Book bắt đầu bằng chữ cái B phát âm là /b/." },
  { question: "What letter is missing in '_ell_'?", options: ["H", "B", "M", "T"], correct_index: 0, explanation: "H + ello tạo thành Hello." },
  { question: "Which of the following characters has a name starting with /b/ sound?", options: ["Ben", "Nam", "Phong", "Mai"], correct_index: 0, explanation: "Ben bắt đầu với /b/." },
  { question: "Complete the spelling: 'B _ e'", options: ["y", "i", "a", "o"], correct_index: 0, explanation: "Bye có nghĩa là tạm biệt." }
];

// Unit 2 Lesson 1 Practice (15)
const u2l1Practice: Question[] = [
  { question: "What is the question to ask for someone's name?", options: ["How are you?", "What's your name?", "How old are you?", "Who are you?"], correct_index: 1, explanation: "What's your name? dùng để hỏi tên." },
  { question: "Complete: 'My name ______ Peter.'", options: ["am", "is", "are", "be"], correct_index: 1, explanation: "Chủ ngữ My name đi với động từ tobe 'is'." },
  { question: "Tony says: 'What's your name?' Mary answers: '______ Mary.'", options: ["I'm", "My", "You're", "His"], correct_index: 0, explanation: "I'm Mary nghĩa là Tôi là Mary." },
  { question: "What is the short form of 'What is'?", options: ["What're", "What's", "What'm", "What"], correct_index: 1, explanation: "What's là viết tắt của What is." },
  { question: "Choose the correct sentence:", options: ["What your name is?", "What's your name?", "What name your is?", "Name your is what?"], correct_index: 1, explanation: "Cấu trúc đúng: What's your name?" },
  { question: "Complete the word: 'n_me'", options: ["a", "e", "i", "o"], correct_index: 0, explanation: "Name viết đúng là n-a-m-e." },
  { question: "If someone says 'What's your name?', you can answer 'My name's [Name]' or...", options: ["I'm [Name]", "Goodbye", "I'm fine", "Hello"], correct_index: 0, explanation: "Dùng I'm + tên để trả lời nhanh." },
  { question: "Who is the boy character starting with 'P'?", options: ["Phong", "Peter", "Tony", "Quan"], correct_index: 1, explanation: "Peter là nhân vật nam trong sách học." },
  { question: "Who is the boy character starting with 'T'?", options: ["Peter", "Tony", "Nam", "Phong"], correct_index: 1, explanation: "Tony là nhân vật nam người nước ngoài." },
  { question: "Who is the girl character starting with 'M'?", options: ["Mai", "Mary", "Lucy", "Both Mai and Mary"], correct_index: 3, explanation: "Cả Mai và Mary đều là các nhân vật nữ bắt đầu bằng chữ M." },
  { question: "Choose the odd one out:", options: ["Peter", "Tony", "Mary", "Your"], correct_index: 3, explanation: "Your là từ sở hữu, các từ còn lại là tên riêng." },
  { question: "What does 'your' mean in Vietnamese?", options: ["Của tôi", "Của bạn", "Của cô ấy", "Của anh ấy"], correct_index: 1, explanation: "Your nghĩa là của bạn." },
  { question: "What does 'my' mean in Vietnamese?", options: ["Của tôi", "Của bạn", "Của chúng ta", "Của họ"], correct_index: 0, explanation: "My nghĩa là của tôi." },
  { question: "Complete: 'Hi, my ______ is Nam.'", options: ["name", "names", "fine", "hello"], correct_index: 0, explanation: "My name is... nghĩa là tên của tôi là..." },
  { question: "Rearrange: 'name / my / is / Mary'", options: ["Mary is my name.", "My name is Mary.", "Name is my Mary.", "My Mary is name."], correct_index: 1, explanation: "Sắp xếp đúng: My name is Mary." }
];

const u2l1Quiz: Question[] = [
  { question: "Complete: 'What ______ your name?'", options: ["is", "am", "are", "be"], correct_index: 0, explanation: "What is your name? (Tên của bạn là gì?)" },
  { question: "How do you translate 'Tên của tôi là Tony'?", options: ["My name is Tony.", "Your name is Tony.", "I Tony.", "Hello Tony."], correct_index: 0, explanation: "Dùng My name is + tên để nói Tên tôi là..." },
  { question: "If a teacher asks: 'What's your name?', what is the most appropriate response?", options: ["My name's Phong.", "I'm fine, thank you.", "Goodbye, teacher.", "How do you spell your name?"], correct_index: 0, explanation: "Hỏi tên thì trả lời giới thiệu tên." },
  { question: "Complete the sentence: 'Hi! I ______ Mary.'", options: ["am", "is", "are", "be"], correct_index: 0, explanation: "Chủ ngữ I đi kèm với động từ tobe 'am'." },
  { question: "Which word is misspelled?", options: ["naem", "name", "hello", "goodbye"], correct_index: 0, explanation: "Naem viết sai chính tả, đúng phải là Name." }
];

// Unit 2 Lesson 2 Practice (15)
const u2l2Practice: Question[] = [
  { question: "How do you ask someone to spell their name?", options: ["What is your name?", "How do you spell your name?", "How are you?", "How old are you?"], correct_index: 1, explanation: "How do you spell your name? dùng để hỏi cách đánh vần tên." },
  { question: "Complete: 'How do you ______ your name?'", options: ["say", "read", "spell", "write"], correct_index: 2, explanation: "Từ spell nghĩa là đánh vần." },
  { question: "Spelling: P-E-T-E-R is the name...", options: ["Peter", "Petra", "Tony", "Phong"], correct_index: 0, explanation: "Các chữ cái ghép lại thành Peter." },
  { question: "Spelling: L-I-N-D-A is the name...", options: ["Linda", "Lucy", "Mary", "Mai"], correct_index: 0, explanation: "Các chữ cái ghép lại thành Linda." },
  { question: "How do you spell 'Mai'?", options: ["M-A-Y", "M-A-I", "M-E-I", "M-I-A"], correct_index: 1, explanation: "Tên Mai đánh vần là M-A-I." },
  { question: "How do you spell 'Nam'?", options: ["N-A-M", "N-A-N", "M-A-N", "N-A-Y"], correct_index: 0, explanation: "Tên Nam đánh vần là N-A-M." },
  { question: "Spelling: T-O-N-Y is...", options: ["Tony", "Toby", "Tom", "Tomy"], correct_index: 0, explanation: "Các chữ cái ghép lại thành Tony." },
  { question: "What does 'spell' mean in Vietnamese?", options: ["Đọc", "Viết", "Đánh vần", "Nói"], correct_index: 2, explanation: "Spell nghĩa là đánh vần chữ cái." },
  { question: "Choose the correct spelling question:", options: ["How spell you your name?", "How do you spell your name?", "How you spell name?", "How do your name spell?"], correct_index: 1, explanation: "Câu hỏi chuẩn: How do you spell your name?" },
  { question: "What letter is double in 'Peter'?", options: ["Letter e", "Letter p", "Letter t", "No letter is double"], correct_index: 0, explanation: "Peter có hai chữ 'e' (P-e-t-e-r)." },
  { question: "Which letter is missing in 'sp_ll'?", options: ["a", "e", "i", "o"], correct_index: 1, explanation: "Spell viết với chữ 'e'." },
  { question: "Spell 'Lucy':", options: ["L-U-C-Y", "L-U-S-Y", "L-O-C-Y", "L-U-C-I"], correct_index: 0, explanation: "Lucy đánh vần là L-U-C-Y." },
  { question: "If Phong spells 'P-H-O-N-G', what name is it?", options: ["Peter", "Phong", "Phuong", "Phuc"], correct_index: 1, explanation: "Ghép các chữ cái được tên Phong." },
  { question: "Which of the following is a spelling answer?", options: ["My name's Tony.", "T-O-N-Y.", "I'm Tony.", "Hello, Tony."], correct_index: 1, explanation: "T-O-N-Y là cách đánh vần tên." },
  { question: "Spell the name 'Mary':", options: ["M-A-R-I", "M-A-R-Y", "M-E-R-Y", "M-A-R-E"], correct_index: 1, explanation: "Mary đánh vần là M-A-R-Y." }
];

const u2l2Quiz: Question[] = [
  { question: "Complete the spelling request: 'How ______ you spell your name?'", options: ["do", "does", "are", "is"], correct_index: 0, explanation: "Cấu trúc hỏi đánh vần: How do you spell your name?" },
  { question: "What is the correct spelling for 'L-I-N-D-A'?", options: ["Linda", "Lydia", "Laura", "Lucy"], correct_index: 0, explanation: "Các chữ cái L-I-N-D-A ghép lại thành Linda." },
  { question: "How do you spell the name 'Ben'?", options: ["B-E-N", "B-A-N", "B-I-N", "P-E-N"], correct_index: 0, explanation: "Ben đánh vần là B-E-N." },
  { question: "Which question is used to ask for spelling?", options: ["How do you spell your name?", "What's your name?", "How are you?", "Who are you?"], correct_index: 0, explanation: "Dùng 'How do you spell your name?' để hỏi cách đánh vần tên." },
  { question: "What name corresponds to the spelling 'M-A-R-Y'?", options: ["Mary", "Marie", "Mai", "Mimi"], correct_index: 0, explanation: "M-A-R-Y là cách đánh vần tên Mary." }
];

// Unit 2 Lesson 3 Practice (15)
const u2l3Practice: Question[] = [
  { question: "Which letter makes the sound /p/ in 'Peter'?", options: ["Letter P", "Letter T", "Letter M", "Letter N"], correct_index: 0, explanation: "Chữ cái P phát âm là /p/." },
  { question: "Which letter makes the sound /t/ in 'Tony'?", options: ["Letter P", "Letter T", "Letter B", "Letter H"], correct_index: 1, explanation: "Chữ cái T phát âm là /t/." },
  { question: "Find the word starting with the sound /p/:", options: ["Tony", "Peter", "Mai", "Nam"], correct_index: 1, explanation: "Peter bắt đầu bằng âm /p/." },
  { question: "Find the word starting with the sound /t/:", options: ["Peter", "Tony", "Mary", "Lucy"], correct_index: 1, explanation: "Tony bắt đầu bằng âm /t/." },
  { question: "Which name does NOT start with the sound /p/?", options: ["Peter", "Phong", "Pat", "Tony"], correct_index: 3, explanation: "Tony bắt đầu bằng /t/." },
  { question: "Which word does NOT start with the sound /t/?", options: ["Tony", "Teddy", "Teacher", "Peter"], correct_index: 3, explanation: "Peter bắt đầu bằng /p/." },
  { question: "Choose the word with /p/ sound:", options: ["pen", "ten", "hen", "men"], correct_index: 0, explanation: "Pen bắt đầu bằng /p/." },
  { question: "Choose the word with /t/ sound:", options: ["pen", "ten", "bag", "name"], correct_index: 1, explanation: "Ten bắt đầu bằng /t/." },
  { question: "What sound does the letter 'P' make?", options: ["/b/", "/p/", "/t/", "/h/"], correct_index: 1, explanation: "Letter P phát âm là /p/." },
  { question: "What sound does the letter 'T' make?", options: ["/t/", "/p/", "/d/", "/s/"], correct_index: 0, explanation: "Letter T phát âm là /t/." },
  { question: "Spelling: '_en' is a writing tool starting with /p/. What is the word?", options: ["pen", "ten", "ben", "hen"], correct_index: 0, explanation: "P + en = Pen (bút mực)." },
  { question: "Spelling: '_wo' is a number starting with /t/. What is the word?", options: ["two", "ten", "toy", "tea"], correct_index: 0, explanation: "T + wo = Two (số 2)." },
  { question: "Identify the letter of sound /p/ in 'spelling':", options: ["s", "p", "e", "l"], correct_index: 1, explanation: "Chữ cái thứ 2 là p phát âm là /p/." },
  { question: "Identify the letter of sound /t/ in 'teacher':", options: ["t", "e", "a", "c"], correct_index: 0, explanation: "Chữ cái đầu tiên là t phát âm là /t/." },
  { question: "Choose the name that has both 'p' and 't' sounds in spelling (không nhất thiết ở đầu):", options: ["Peter", "Tony", "Pat", "Mary"], correct_index: 2, explanation: "Pat có P ở đầu /p/ và T ở cuối /t/." }
];

const u2l3Quiz: Question[] = [
  { question: "Which of the following words starts with /p/ sound?", options: ["Pencil", "Table", "Name", "Hello"], correct_index: 0, explanation: "Pencil bắt đầu bằng chữ P phát âm là /p/." },
  { question: "Which word starts with /t/ sound?", options: ["Ten", "Pen", "Ben", "Mary"], correct_index: 0, explanation: "Ten bắt đầu bằng chữ T phát âm là /t/." },
  { question: "What is the starting sound of the name 'Peter'?", options: ["/p/", "/t/", "/b/", "/h/"], correct_index: 0, explanation: "Peter bắt đầu bằng âm /p/." },
  { question: "What is the starting sound of the name 'Tony'?", options: ["/t/", "/p/", "/b/", "/d/"], correct_index: 0, explanation: "Tony bắt đầu bằng âm /t/." },
  { question: "Which letter represents the sound /p/ in the word 'map'?", options: ["p", "m", "a", "no letter"], correct_index: 0, explanation: "Chữ cái p ở cuối từ map phát âm là /p/." }
];

// Helper to generate dynamic English Grade 3 questions for Unit 3-10
const themes: Record<number, { vocab: string[], grammar: string, qWords: string[], phonics: string[] }> = {
  3: { vocab: ["friend", "nice", "new", "they"], grammar: "This is my friend... / Are they your friends?", qWords: ["friend", "meet", "they", "nice"], phonics: ["/f/", "/n/", "friend", "nice"] },
  4: { vocab: ["eye", "ear", "nose", "mouth", "face", "hand", "head", "hair"], grammar: "Touch your... / Open your... / Close your...", qWords: ["touch", "open", "close", "mouth", "nose", "face"], phonics: ["/e/", "/o/", "elbow", "open"] },
  5: { vocab: ["running", "swimming", "singing", "dancing", "painting", "drawing", "reading"], grammar: "I like... / My hobby is...", qWords: ["hobby", "like", "singing", "dancing", "drawing"], phonics: ["/i/", "/u/", "singing", "running"] },
  6: { vocab: ["school", "classroom", "library", "gym", "computer room", "playground"], grammar: "This/That is our... / Is that our...?", qWords: ["school", "gym", "library", "playground", "classroom"], phonics: ["/c/", "/g/", "computer", "gym"] },
  7: { vocab: ["stand", "sit", "open", "close", "speak", "listen", "look", "come", "go"], grammar: "May I...? / Yes, you can / No, you can't", qWords: ["come", "go", "sit", "stand", "permission", "can"], phonics: ["/s/", "/d/", "sit", "down"] },
  8: { vocab: ["pen", "pencil", "ruler", "rubber", "notebook", "book", "school bag"], grammar: "I have a... / These/Those are my...", qWords: ["pen", "ruler", "rubber", "pencil", "school bag"], phonics: ["/r/", "/p/", "ruler", "pencil"] },
  9: { vocab: ["red", "blue", "green", "yellow", "black", "white", "orange", "brown"], grammar: "What colour is it? / What colour are they?", qWords: ["colour", "red", "blue", "yellow", "green"], phonics: ["/b/", "/bl/", "brown", "black"] },
  10: { vocab: ["football", "chess", "table tennis", "badminton", "basketball", "hide-and-seek"], grammar: "I play... / Do you like...? / Yes, I do / No, I don't", qWords: ["break time", "play", "football", "chess", "badminton"], phonics: ["/ch/", "/f/", "chess", "football"] }
};

function getVietnameseTranslation(word: string): string {
  const dict: Record<string, string> = {
    friend: "bạn bè / người bạn", nice: "vui / đẹp", new: "mới", they: "họ / chúng nó",
    eye: "con mắt", ear: "cái tai", nose: "cái mũi", mouth: "cái miệng", face: "khuôn mặt", hand: "bàn tay", head: "cái đầu", hair: "mái tóc",
    running: "chạy bộ", swimming: "bơi lội", singing: "ca hát", dancing: "nhảy múa", painting: "tô màu/vẽ tranh", drawing: "vẽ", reading: "đọc sách",
    school: "trường học", classroom: "lớp học", library: "thư viện", gym: "phòng thể dục", "computer room": "phòng máy tính", playground: "sân chơi",
    stand: "đứng", sit: "ngồi", open: "mở", close: "đóng", speak: "nói", listen: "nghe", look: "nhìn", come: "vào/đến", go: "đi",
    pen: "bút mực", pencil: "bút chì", ruler: "cây thước", rubber: "cục tẩy", notebook: "vở ghi bài", book: "sách", "school bag": "cặp sách",
    red: "màu đỏ", blue: "màu xanh dương", green: "màu xanh lá", yellow: "màu vàng", black: "màu đen", white: "màu trắng", orange: "màu cam", brown: "màu nâu",
    football: "đá bóng", chess: "cờ vua", "table tennis": "bóng bàn", badminton: "cầu lông", basketball: "bóng rổ", "hide-and-seek": "trốn tìm"
  };
  return dict[word] ?? word;
}

function getDistractorWord(unit: number, index: number): string {
  const distractors: Record<number, string[]> = {
    3: ["teacher", "classroom", "school", "pencil"],
    4: ["red", "blue", "chess", "running"],
    5: ["book", "library", "mouth", "hello"],
    6: ["singing", "ruler", "nose", "thanks"],
    7: ["green", "bag", "friend", "hobby"],
    8: ["gym", "dancing", "ear", "bye"],
    9: ["stand", "badminton", "face", "school"],
    10: ["rubber", "classroom", "head", "name"]
  };
  return distractors[unit]?.[index % 4] ?? "hello";
}

function shuffleOptions(options: string[], correct: string): string[] {
  const unique = Array.from(new Set(options));
  if (!unique.includes(correct)) {
    unique[0] = correct;
  }
  return unique.sort(() => 0.5 - Math.random());
}

function getGrammarQuestion(unit: number, index: number): { questionText: string, options: string[], correctText: string, explanation: string } {
  if (unit === 3) {
    if (index % 3 === 0) {
      return {
        questionText: "This is my friend, Mary. - Hello, Mary. Nice to ______ you.",
        options: ["see", "meet", "say", "how"],
        correctText: "meet",
        explanation: "Nice to meet you nghĩa là Rất vui được gặp bạn."
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "______ they your friends? - Yes, they are.",
        options: ["Is", "Am", "Are", "Be"],
        correctText: "Are",
        explanation: "Chủ ngữ số nhiều 'they' đi với động từ tobe 'Are' trong câu hỏi."
      };
    } else {
      return {
        questionText: "Is he your friend? - No, he ______.",
        options: ["is", "isn't", "aren't", "not"],
        correctText: "isn't",
        explanation: "Trả lời phủ định số ít: No, he isn't (viết tắt của is not)."
      };
    }
  } else if (unit === 4) {
    if (index % 3 === 0) {
      return {
        questionText: "Touch ______ face, please.",
        options: ["you", "your", "me", "my"],
        correctText: "your",
        explanation: "Cấu trúc mệnh lệnh hướng dẫn ai đó: Touch your + bộ phận cơ thể (Hãy chạm vào ... của bạn)."
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "______ your eyes.",
        options: ["Open", "Close", "Touch", "Both Open and Close"],
        correctText: "Both Open and Close",
        explanation: "Chúng ta có thể mở mắt (Open your eyes) hoặc nhắm mắt (Close your eyes)."
      };
    } else {
      return {
        questionText: "What do you do when the teacher says: 'Close your mouth'?",
        options: ["Mở miệng ra", "Nhắm mắt lại", "Ngậm miệng lại", "Vẫy tay chào"],
        correctText: "Ngậm miệng lại",
        explanation: "Close your mouth nghĩa là Hãy ngậm miệng/đóng miệng lại."
      };
    }
  } else if (unit === 5) {
    if (index % 3 === 0) {
      return {
        questionText: "What is ______ hobby? - I like swimming.",
        options: ["you", "your", "my", "I"],
        correctText: "your",
        explanation: "What is your hobby? dùng để hỏi sở thích của bạn."
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "My hobby is ______.",
        options: ["run", "running", "runs", "ran"],
        correctText: "running",
        explanation: "Sau cấu trúc 'My hobby is' thường dùng danh động từ (V-ing)."
      };
    } else {
      return {
        questionText: "I ______ dancing.",
        options: ["like", "likes", "am like", "hobby"],
        correctText: "like",
        explanation: "Cấu trúc diễn tả sở thích: I + like + V-ing."
      };
    }
  } else if (unit === 6) {
    if (index % 3 === 0) {
      return {
        questionText: "______ is our classroom. (Vật ở gần)",
        options: ["This", "That", "These", "Those"],
        correctText: "This",
        explanation: "This dùng để chỉ một vật ở gần người nói."
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "______ is our gym. (Vật ở xa)",
        options: ["This", "That", "These", "Those"],
        correctText: "That",
        explanation: "That dùng để chỉ một vật ở xa người nói."
      };
    } else {
      return {
        questionText: "Is that our school? - Yes, it ______.",
        options: ["is", "am", "are", "isn't"],
        correctText: "is",
        explanation: "Trả lời khẳng định cho câu hỏi Is that...?: Yes, it is."
      };
    }
  } else if (unit === 7) {
    if (index % 3 === 0) {
      return {
        questionText: "______ I come in, teacher?",
        options: ["May", "Can", "Do", "Are"],
        correctText: "May",
        explanation: "May I come in? là câu xin phép vào lớp lịch sự."
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "May I go out? - Yes, you ______.",
        options: ["can", "may", "do", "are"],
        correctText: "can",
        explanation: "Câu trả lời đồng ý cho phép phổ biến là: Yes, you can."
      };
    } else {
      return {
        questionText: "May I speak? - No, you ______.",
        options: ["can", "can't", "don't", "aren't"],
        correctText: "can't",
        explanation: "Câu trả lời từ chối cho phép: No, you can't."
      };
    }
  } else if (unit === 8) {
    if (index % 3 === 0) {
      return {
        questionText: "I ______ a ruler and a pen.",
        options: ["has", "have", "am", "is"],
        correctText: "have",
        explanation: "Chủ ngữ 'I' đi với động từ 'have' (tôi có)."
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "______ are my books. (Vật số nhiều ở gần)",
        options: ["This", "That", "These", "Those"],
        correctText: "These",
        explanation: "These dùng để chỉ nhiều vật ở gần người nói."
      };
    } else {
      return {
        questionText: "______ are my pencils. (Vật số nhiều ở xa)",
        options: ["This", "That", "These", "Those"],
        correctText: "Those",
        explanation: "Those dùng để chỉ nhiều vật ở xa người nói."
      };
    }
  } else if (unit === 9) {
    if (index % 3 === 0) {
      return {
        questionText: "What colour ______ it? - It is red.",
        options: ["is", "are", "am", "be"],
        correctText: "is",
        explanation: "Hỏi màu sắc của 1 vật: What colour is it?"
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "What colour ______ they? - They are blue.",
        options: ["is", "are", "am", "be"],
        correctText: "are",
        explanation: "Hỏi màu sắc của nhiều vật: What colour are they?"
      };
    } else {
      return {
        questionText: "The pencil case is ______.",
        options: ["green", "pen", "ruler", "book"],
        correctText: "green",
        explanation: "Chỗ trống cần một từ chỉ màu sắc (green), các từ còn lại là đồ dùng học tập."
      };
    }
  } else {
    if (index % 3 === 0) {
      return {
        questionText: "What do you do at break time? - I ______ football.",
        options: ["play", "plays", "playing", "played"],
        correctText: "play",
        explanation: "Thì hiện tại đơn với chủ ngữ 'I' đi với động từ nguyên mẫu 'play'."
      };
    } else if (index % 3 === 1) {
      return {
        questionText: "Do you like playing chess? - Yes, I ______.",
        options: ["do", "like", "am", "don't"],
        correctText: "do",
        explanation: "Trả lời khẳng định cho câu hỏi Do you...?: Yes, I do."
      };
    } else {
      return {
        questionText: "Do you like playing badminton? - No, I ______.",
        options: ["do", "don't", "not", "am not"],
        correctText: "don't",
        explanation: "Trả lời phủ định cho câu hỏi Do you...?: No, I don't."
      };
    }
  }
}

function getPhonicsQuestion(unit: number, index: number): { questionText: string, options: string[], correctText: string, explanation: string } {
  const unitPhonics: Record<number, { sound1: string, sound2: string, example1: string, example2: string }> = {
    3: { sound1: "/f/", sound2: "/n/", example1: "friend", example2: "nice" },
    4: { sound1: "/e/", sound2: "/o/", example1: "elbow", example2: "open" },
    5: { sound1: "/i/", sound2: "/u/", example1: "singing", example2: "running" },
    6: { sound1: "/c/", sound2: "/g/", example1: "computer", example2: "gym" },
    7: { sound1: "/s/", sound2: "/d/", example1: "sit", example2: "down" },
    8: { sound1: "/r/", sound2: "/p/", example1: "ruler", example2: "pencil" },
    9: { sound1: "/b/", sound2: "/bl/", example1: "brown", example2: "black" },
    10: { sound1: "/ch/", sound2: "/f/", example1: "chess", example2: "football" }
  };

  const p = unitPhonics[unit];
  if (index % 3 === 0) {
    return {
      questionText: `Which letter makes the sound ${p.sound1} in '${p.example1}'?`,
      options: [`Letter ${p.example1.charAt(0).toUpperCase()}`, `Letter ${p.example2.charAt(0).toUpperCase()}`, "Letter X", "Letter Z"],
      correctText: `Letter ${p.example1.charAt(0).toUpperCase()}`,
      explanation: `Từ ${p.example1} bắt đầu bằng chữ cái ${p.example1.charAt(0).toUpperCase()} phát âm là ${p.sound1}.`
    };
  } else if (index % 3 === 1) {
    return {
      questionText: `Which word starts with the sound ${p.sound2}?`,
      options: [p.example2, p.example1, "hello", "bye"],
      correctText: p.example2,
      explanation: `Từ ${p.example2} bắt đầu bằng âm ${p.sound2}.`
    };
  } else {
    return {
      questionText: `Identify the missing letters: '_${p.example1.slice(1)}' starts with sound ${p.sound1}.`,
      options: [p.example1.charAt(0), p.example2.charAt(0), "x", "y"],
      correctText: p.example1.charAt(0),
      explanation: `Ghép chữ cái ${p.example1.charAt(0)} vào được từ ${p.example1}.`
    };
  }
}

function generateQuestionsForUnit(unit: number, lesson: number, count: number, offset: number = 0): Question[] {
  const theme = themes[unit];
  if (!theme) return [];

  if (lesson === 1) {
    return Array.from({ length: count }, (_, i) => {
      const idx = i + offset;
      const word = theme.vocab[idx % theme.vocab.length];
      const capWord = word.charAt(0).toUpperCase() + word.slice(1);
      const opts = shuffleOptions([word, getDistractorWord(unit, idx), getDistractorWord(unit, idx + 1), getDistractorWord(unit, idx + 2)], word);
      return {
        question: `What is the correct English word for '${getVietnameseTranslation(word)}'?`,
        options: opts,
        correct_index: opts.indexOf(word),
        explanation: `${capWord} nghĩa là '${getVietnameseTranslation(word)}' trong tiếng Anh.`
      };
    });
  } else if (lesson === 2) {
    return Array.from({ length: count }, (_, i) => {
      const idx = i + offset;
      const { questionText, options, correctText, explanation } = getGrammarQuestion(unit, idx);
      const shuffled = shuffleOptions(options, correctText);
      return {
        question: questionText,
        options: shuffled,
        correct_index: shuffled.indexOf(correctText),
        explanation
      };
    });
  } else {
    return Array.from({ length: count }, (_, i) => {
      const idx = i + offset;
      const { questionText, options, correctText, explanation } = getPhonicsQuestion(unit, idx);
      const shuffled = shuffleOptions(options, correctText);
      return {
        question: questionText,
        options: shuffled,
        correct_index: shuffled.indexOf(correctText),
        explanation
      };
    });
  }
}

function getYoutubeIdForLesson(unit: number, lesson: number): string {
  const ytIds: Record<string, string> = {
    "1-1": "BxICEiI8bus", "1-2": "IL1zoFabdR0", "1-3": "rkdfQPLMyV0",
    "2-1": "jOxyKwBr4xI", "2-2": "pnWT0B-BDRw", "2-3": "79f0zwMlQVI",
    "3-1": "bFyWPD_JyaE", "3-2": "tDCx6rnMofY", "3-3": "N3qVVIDeZEA",
    "4-1": "UOc_3Pe_SUI", "4-2": "muzK3elF3Fc", "4-3": "-uit3OagQqk",
    "5-1": "DoUT-BprWMI", "5-2": "L2KqOM3TL3A", "5-3": "nlzR6isFGNY",
    "6-1": "lVsjNWfTti8", "6-2": "oiAfW4Gro9U", "6-3": "MM6_3gUfFzQ",
    "7-1": "jukwgYFa7Sk", "7-2": "6K7PvBsa5vc", "7-3": "NbLumxu91tE",
    "8-1": "44WHQk3HFZk", "8-2": "m6CqwnL4dHo", "8-3": "QzUPbu6gg7E",
    "9-1": "TzXQmO783Dc", "9-2": "gjQCJyVzSg0", "9-3": "ip7zzwB1yTs",
    "10-1": "jOeNlYu2WkA", "10-2": "T2BbuWe7Bss", "10-3": "AF2LDajzaKM"
  };
  return ytIds[`${unit}-${lesson}`] ?? "BxICEiI8bus";
}

async function migrate() {
  console.log("🚀 Starting English Grade 3 Migration...");

  // 1. Subject
  const { data: subject } = await supabase
    .from('universal_subjects')
    .upsert({ slug: 'tieng_anh', name_vi: 'Tiếng Anh', icon: '🔤' }, { onConflict: 'slug' })
    .select().single();

  if (!subject) {
    throw new Error("Failed to create subject 'tieng_anh'");
  }

  // 2. Content Source
  const { data: source } = await supabase
    .from('content_sources')
    .upsert({ 
        subject_id: subject!.id, 
        slug: 'tieng-anh-3-global-success', 
        name: 'Tiếng Anh 3 - Global Success' 
    }, { onConflict: 'slug' })
    .select().single();

  if (!source) {
    throw new Error("Failed to create content source");
  }

  // 3. Root Node
  const { data: rootNode } = await supabase
    .from('curriculum_nodes')
    .upsert({
        source_id: source!.id,
        type: 'course',
        slug: 'lop-3',
        title: 'Tiếng Anh lớp 3',
        path: 'tieng_anh_3',
        depth: 0
    }, { onConflict: 'source_id,slug' })
    .select().single();

  if (!rootNode) {
    throw new Error("Failed to create root course node");
  }

  const topicCache = new Map<string, string>();
  const topicSlugs = new Map<string, string>();
  const topicNodes = new Map<string, any>();
  const unitQuestionsMap = new Map<string, string[]>();

  let absoluteLessonCount = 0;

  for (const unitItem of units) {
    const unitLabel = `Unit ${unitItem.num}: ${unitItem.name}`;
    const topicSlug = `unit-${unitItem.num}`;
    
    // Create or get unit node
    const { data: topicNode } = await supabase
      .from('curriculum_nodes')
      .upsert({
          source_id: source!.id,
          parent_id: rootNode!.id,
          type: 'unit',
          slug: topicSlug,
          title: unitLabel,
          path: `tieng_anh_3.unit_${unitItem.num}`,
          depth: 1,
          sort_key: unitItem.num
      }, { onConflict: 'source_id,slug' })
      .select().single();
    
    if (!topicNode) {
      console.error(`Failed to upsert unit node ${unitLabel}`);
      continue;
    }

    const unitId = topicNode.id;
    topicCache.set(unitLabel, unitId);
    topicSlugs.set(unitLabel, topicSlug);
    topicNodes.set(unitLabel, topicNode);
    unitQuestionsMap.set(unitId, []);

    // Each Unit has 3 lessons
    for (let lessonNum = 1; lessonNum <= 3; lessonNum++) {
      absoluteLessonCount++;
      const lessonSlug = `unit-${unitItem.num}-lesson-${lessonNum}`;
      const title = `Unit ${unitItem.num} - Lesson ${lessonNum}`;
      const summary = `Học từ vựng, ngữ pháp và phát âm bài Unit ${unitItem.num} Lesson ${lessonNum}`;
      const ytId = getYoutubeIdForLesson(unitItem.num, lessonNum);

      console.log(`Processing ${title}...`);

      const { data: lessonNode, error: lessonError } = await supabase
        .from('curriculum_nodes')
        .upsert({
            source_id: source!.id,
            parent_id: unitId,
            type: 'lesson',
            slug: lessonSlug,
            title: title,
            path: `tieng_anh_3.unit_${unitItem.num}.${lessonSlug.replace(/-/g, '_')}`,
            depth: 2,
            sort_key: lessonNum,
            metadata: {
                page: `${10 + unitItem.num * 6 + lessonNum * 2}`,
                youtube_id: ytId,
                videos: [{ youtube_id: ytId, title: title }]
            }
        }, { onConflict: 'source_id,slug' })
        .select().single();

      if (lessonError || !lessonNode) {
        console.error(`Error upserting lesson node:`, lessonError);
        continue;
      }

      // Get practice questions
      let practiceQuestions: Question[] = [];
      let quizQuestions: Question[] = [];

      if (unitItem.num === 1) {
        if (lessonNum === 1) { practiceQuestions = u1l1Practice; quizQuestions = u1l1Quiz; }
        else if (lessonNum === 2) { practiceQuestions = u1l2Practice; quizQuestions = u1l2Quiz; }
        else { practiceQuestions = u1l3Practice; quizQuestions = u1l3Quiz; }
      } else if (unitItem.num === 2) {
        if (lessonNum === 1) { practiceQuestions = u2l1Practice; quizQuestions = u2l1Quiz; }
        else if (lessonNum === 2) { practiceQuestions = u2l2Practice; quizQuestions = u2l2Quiz; }
        else { practiceQuestions = u2l3Practice; quizQuestions = u2l3Quiz; }
      } else {
        practiceQuestions = generateQuestionsForUnit(unitItem.num, lessonNum, 15, 0);
        quizQuestions = generateQuestionsForUnit(unitItem.num, lessonNum, 5, 15); // offset 15 to avoid duplicate questions
      }

      // 3. Seed Practice set (15 questions)
      const { data: practiceSet, error: prSetError } = await supabase
        .from('exercise_sets')
        .upsert({
            title: `Luyện tập tự do: ${title}`,
            type: 'practice',
            metadata: { node_id: lessonNode.id }
        })
        .select().single();

      if (prSetError || !practiceSet) {
        console.error(`Error creating practice set:`, prSetError);
      } else {
        for (let i = 0; i < practiceQuestions.length; i++) {
          const p = practiceQuestions[i];
          const { data: question } = await supabase
            .from('quiz_questions')
            .insert({
                quiz_id: '00000000-0000-0000-0000-000000000000',
                question: p.question,
                options: p.options,
                correct_index: p.correct_index,
                explanation: p.explanation,
                order_index: i
            })
            .select().single();
          
          if (question) {
            await supabase.from('exercise_questions').insert({
                set_id: practiceSet.id,
                question_id: question.id,
                sort_key: i
            });
            // Cache for exam selection
            unitQuestionsMap.get(unitId)?.push(question.id);
          }
        }
      }

      // 4. Seed Quiz set (5 questions)
      const { data: quizSet, error: qSetError } = await supabase
        .from('exercise_sets')
        .upsert({
            title: `Đánh giá tính điểm: ${title}`,
            type: 'quiz',
            metadata: { node_id: lessonNode.id }
        })
        .select().single();

      if (qSetError || !quizSet) {
        console.error(`Error creating quiz set:`, qSetError);
      } else {
        for (let i = 0; i < quizQuestions.length; i++) {
          const p = quizQuestions[i];
          const { data: question } = await supabase
            .from('quiz_questions')
            .insert({
                quiz_id: '00000000-0000-0000-0000-000000000000',
                question: p.question,
                options: p.options,
                correct_index: p.correct_index,
                explanation: p.explanation,
                order_index: i
            })
            .select().single();
          
          if (question) {
            await supabase.from('exercise_questions').insert({
                set_id: quizSet.id,
                question_id: question.id,
                sort_key: i
            });
          }
        }
      }

      // 5. Visual map node
      // 3D placement logic similar to math
      const isOdd = lessonNum % 2 === 1;
      const posX = isOdd ? 220 : 380;
      // We map the absolute lesson index: 1 to 30
      const posY = 100 + (absoluteLessonCount * 160) + (unitItem.num * 100); // add a gap between units

      await supabase.from('learning_path_nodes').upsert({
          curriculum_node_id: lessonNode.id,
          node_type: 'lesson',
          position_x: posX,
          position_y: posY,
          visual_theme: 'star',
          reward_config: { xp: 100, energy: 1 }
      }, { onConflict: 'curriculum_node_id' });

      console.log(`✅ Migrated English ${title}`);
    }
  }

  // 6. Seed Unit/Chapter Exams (10-question boss level represented as 3D treasure chests)
  console.log("🚀 Seeding English Chapter Exams...");
  for (const [unitId, questionsList] of Array.from(unitQuestionsMap.entries())) {
    if (questionsList.length === 0) continue;
    const unitNode = Array.from(topicNodes.values()).find(u => u.id === unitId);
    if (!unitNode) continue;

    const examSlug = `kiem-tra-${unitNode.slug}`;
    const { data: examNode } = await supabase
      .from('curriculum_nodes')
      .upsert({
          source_id: source.id,
          parent_id: unitId,
          type: 'exam',
          slug: examSlug,
          title: `Kiểm tra cuối chương: ${unitNode.title.split(':')[0]}`,
          path: `${unitNode.path}.kiem_tra`,
          depth: 2,
          sort_key: 999
      }, { onConflict: 'source_id,slug' })
      .select().single();

    if (examNode) {
      const shuffled = [...questionsList].sort(() => 0.5 - Math.random());
      const examQuestions = shuffled.slice(0, Math.min(10, shuffled.length));

      const { data: exSet } = await supabase
        .from('exercise_sets')
        .upsert({
            title: `Kiểm tra cuối chương: ${unitNode.title}`,
            type: 'exam',
            metadata: { node_id: examNode.id }
        })
        .select().single();

      if (exSet) {
        for (let i = 0; i < examQuestions.length; i++) {
          await supabase.from('exercise_questions').upsert({
            set_id: exSet.id,
            question_id: examQuestions[i],
            sort_key: i
          }, { onConflict: 'set_id,question_id' });
        }
      }

      // Position Chapter Exam right after the unit's last lesson
      const { data: siblingNodes } = await supabase
        .from('curriculum_nodes')
        .select('id')
        .eq('parent_id', unitId)
        .neq('type', 'exam');
      
      let maxY = 300;
      if (siblingNodes && siblingNodes.length > 0) {
        const siblingIds = siblingNodes.map(s => s.id);
        const { data: lpNodes } = await supabase
          .from('learning_path_nodes')
          .select('position_y')
          .in('curriculum_node_id', siblingIds);
        if (lpNodes && lpNodes.length > 0) {
          maxY = Math.max(...lpNodes.map(l => l.position_y));
        }
      }

      await supabase.from('learning_path_nodes').upsert({
        curriculum_node_id: examNode.id,
        node_type: 'boss',
        position_x: 300,
        position_y: maxY + 180,
        visual_theme: 'nebula',
        reward_config: { xp: 300, energy: 0 }
      }, { onConflict: 'curriculum_node_id' });

      console.log(`Seeded Chapter Exam for unit "${unitNode.title}" with ${examQuestions.length} questions.`);
    }
  }

  console.log("🎉 English Seeding Complete!");
}

migrate().catch(console.error);
