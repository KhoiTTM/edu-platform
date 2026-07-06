# LUYỆN NGHE THEO CÂU (Sentence Listening Quiz) — Pre A1 Starter

> Mục tiêu: học sinh Pre A1 chưa nghe được cả bài listening dài → tách thành **từng câu ngắn**,
> nghe 1 câu rồi CHỌN câu đúng trong các phương án. Dạng dictation/comprehension mức câu.

## 1. Quyết định kiến trúc (quan trọng)

- **Nguồn audio = TTS (Web Speech API)**, KHÔNG tải/cắt audio YouTube.
  Lý do: (a) né bản quyền video YouTube; (b) không cần ngân hàng file audio — chỉ cần
  **ngân hàng TEXT**; (c) tận dụng hạ tầng TTS đã có. Nghe lại nhiều lần, chỉnh tốc độ được.
- **Không cần bảng audio.** Mỗi câu chỉ lưu `audio_text` (câu cần nghe). Runtime đọc real-time.
- Nếu sau này muốn giọng người thật: chỉ dùng audio CÓ QUYỀN (tự thu / CC), hoặc embed
  YouTube nhảy tới mốc thời gian (không tải về). KHÔNG host lại audio YouTube.

## 2. Loại câu hỏi

Tái dùng loại đã có: **`listening_multiple_choice`** (xem `docs/PRE_A1_STARTER.md` mục 2.2 —
đã có renderer TTS + nút "🔊 Nghe"). Ta dùng nó ở mức CÂU thay vì mức TỪ.

### Schema `metadata_json`
```json
{
  "audio_text": "The cat is on the table.",     // TTS đọc câu này (nội dung để NGHE)
  "question": "Nghe và chọn câu em vừa nghe:",   // hướng dẫn hiển thị
  "options": [
    "The cat is on the table.",
    "The cat is under the table.",
    "The dog is on the table.",
    "The cat is on the chair."
  ],
  "correct_index": 0,
  "explanation": "…(tùy chọn)",
  "tags": ["listening", "topic-animals"]
}
```
- `audio_text`: câu HS phải nghe (TTS đọc). CHỈ đọc, không hiện chữ câu này.
- `options`: các câu gần giống (khác 1 từ) để rèn phân biệt nghe. `correct_index` = câu đúng.
- Runtime: `AssessmentRenderer` đã chuyền `audio_text` xuống `MultipleChoiceRenderer` → hiện nút Nghe.

## 3. Nguyên tắc SOẠN câu (bám scope Pre A1)

- Câu ngắn, đơn giản, CHỈ dùng từ trong wordlist Pre A1 (`lib/data/startersVocabulary.ts`, 215 từ / 10 chủ đề).
- Mẫu câu Pre A1: "This is a …", "I can see a …", "The … is …", "It's (colour).", "I have a …".
- Distractor (options sai) khác câu đúng **đúng 1 chỗ** (đổi 1 danh từ / giới từ / màu) để luyện nghe chi tiết.
- Nội dung câu do Claude/GV TỰ SOẠN — không chép từ tài liệu có bản quyền.

## 4. Data & Seed

- File: `content/exam-bank/pre-a1-listening-sentences.json` (theo template exam-bank).
- Collection gợi ý: `subject_slug="pre-a1-starter"`, `grade=3`, `exam_type="lesson"` hoặc `"listening"`,
  `title="Luyện nghe theo câu"`. (Xem tên nhóm hiển thị: `docs/PRE_A1_STARTER.md` mục 3.)
- Seed bằng generator chung: `npx tsx scripts/seed-exam-bank.ts content/exam-bank/pre-a1-listening-sentences.json`.
- Lịch sử: tự lưu `learning_sessions` (type='exam') như các đề khác.

## 5. Việc cần làm (khi triển khai)

Hạ tầng ĐÃ SẴN SÀNG — không cần code mới:
- `listening_multiple_choice` đã có trong generator (`RENDERABLE_TYPES` + validate) và
  trong `AssessmentRenderer` (case dòng ~107, chuyền `audio_text` xuống TTS). Đã dùng cho
  đề luyện từ vựng Pre A1 (`starters-wordlist-pilot.json`).

Chỉ còn phần NỘI DUNG:
1. Soạn 1 đề mẫu (~8–10 câu) mức CÂU (audio_text là câu, options là câu gần giống) → verify.
2. Test TTS phát + chấm trên trình duyệt học sinh dùng.
3. Nhân rộng thành ngân hàng theo 10 chủ đề wordlist.

## 6. Giới hạn đã biết

- Giọng TTS máy (không tự nhiên bằng người bản xứ). Chấp nhận được cho luyện phân biệt câu Pre A1.
- Chất lượng giọng phụ thuộc trình duyệt/OS (Web Speech API). Nên test trên trình duyệt học sinh dùng.
