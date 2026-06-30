# SCOPE — Sách bài tập Tiếng Anh 3, Tập 1 (Global Success)

> Phạm vi dùng để tạo exam bank **"Sách bài tập Tiếng Anh 3 - Tập 1"**.
> **MUST:** Chỉ dùng các từ trong Wordlist dưới đây (nguồn: wordlist tienganh3-tap1.pdf, tr.78–80).
> Không dùng từ ngoài danh sách. Hình ảnh do Claude TỰ TẠO (SVG/icon), KHÔNG dùng ảnh trong PDF.

## 1. Wordlist (phạm vi từ vựng cho phép)

Nhóm theo chủ đề để tiện ra đề. Tất cả từ dưới đây nằm trong wordlist gốc.

**Lời chào / xã giao:** hello, hi, bye, goodbye, thank you, please, yes, no, this is.

**Đại từ / sở hữu:** I, you, he, she, they, it, my, your, our, this, that, these (this/that).

**Đếm số 1–10:** one, two, three, four, five, six, seven, eight, nine, ten.

**Màu sắc:** black, blue, brown, green, orange, purple, red, white, yellow.

**Đồ dùng học tập:** book, eraser, notebook, pen, pencil, pencil case, ruler, school bag, school, art room, classroom, computer room, library, music room, playground, gym.

**Hành động / động từ:** chat, come in, cook, dance, do, draw, go out, open, paint, play, run, sing, sit down, speak, stand up, swim, touch, walk, break time.

**Cơ thể (bodies):** ear, eye, face, hair, hand, mouth, nose.

**Thể thao / trò chơi:** badminton, basketball, chess, football, table tennis, volleyball, word puzzle.

**Trường học / người:** teacher, Mr, Ms, friend, English, Vietnamese.

**Từ để hỏi / khác:** how, what, have, fine.

## 1b. Phân bổ theo Unit (Book map — Tập 1: "Me and my friends")

Mỗi đề bám 1 Unit, lượng kiến thức = đúng phạm vi Unit đó (từ vựng + mẫu câu + phonics).
Mỗi đề mix các type bám 5 section A–E (xem mục 3 / EXAM_BANK.md 5b).

| Unit | Chủ đề | Mẫu câu chính | Từ vựng trọng tâm | Phonics |
|---|---|---|---|---|
| Starter | Số & chữ cái | (ôn) | one–ten, A–Z | — |
| **Unit 1 — Hello** | Chào hỏi, giới thiệu mình | "Hello/Hi. I'm…", "How are you? — I'm fine, thank you.", "Goodbye./Bye." | hello, hi, bye, goodbye, thank you, fine, I, you | h, b |
| **Unit 2 — Our names** | Hỏi–đáp tên, tuổi | "What's your name? — My name's…", "How old are you? — I'm … years old." | name, what, your, how, old, my + số 1–10 | M, N |
| **Unit 3 — Our friends** | Giới thiệu người khác | "This is… / That's…", "Is this/that…? — Yes, it is./No, it isn't." | friend, it, Mr, Ms, this, that, he, she, they | th |
| **Unit 4 — Our bodies** | Bộ phận cơ thể, mệnh lệnh | "What's this? — It's…", "Touch…/Open…" | ear, eye, face, hair, hand, mouth, nose, touch, open | h, ea |
| **Unit 5 — My hobbies** | Sở thích | "What's your hobby? — I like…", "What's he/she doing? — He/She's…" | cooking, dancing, drawing, painting, running, singing, swimming, walking | p, r |

**Gợi ý phân bổ đề:** mỗi Unit → vài đề (vd 2–3 đề/Unit). Dùng `tags: ["unit-1"]`… trong
`metadata_json` để truy vết Unit. `exam_number` đánh liên tục trong collection.

## 2. Cấu trúc câu (sentence patterns) trong phạm vi Tập 1

Ra đề chỉ dùng các mẫu câu lớp 3 Tập 1:
- Chào hỏi: "Hello/Hi. I'm ...", "This is ...", "Goodbye. / Bye."
- Giới thiệu: "What's your name? — My name's ...", "How are you? — I'm fine, thank you."
- Sở hữu đồ vật: "Do you have a ...? — Yes, I do. / No, I don't."
- Màu sắc: "What colour is it? — It's (orange)."
- Hành động (hiện tại tiếp diễn đơn giản): "What's he/she doing? — He/She's (singing)."
- Đếm số lượng: "How many ...? — I have (five)."

## 3. Mapping type câu hỏi → renderer (đầy đủ, cho Tiếng Anh 3)

Xem bảng tổng ở `docs/EXAM_BANK.md` mục 5b. 4 type chủ lực dùng được ngay:
`multiple_choice`, `fill_blank`, `matching`/`match_pair`, `sentence_reorder`.
Hình minh hoạ (màu sắc, đồ vật, hành động) → Claude tự vẽ SVG, lưu `public/images/`.

## 4. Quy ước đặt collection cho bộ đề này

```
title: "Sách bài tập Tiếng Anh 3 - Tập 1"
subject_slug: "tieng_anh"
grade: 3
volume: 1
exam_type: "midterm"   (rơi vào tab "Luyện tập theo ôn tập" — đã chốt)
reference_book: "Global Success - Tiếng Anh 3 Tập 1"
```
