# Luyện tập — Pre A1 Starter

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `pre-a1-starter`
- `grade`: `3` (dùng chung khối lớp tiểu học, không phải lớp 3 theo nghĩa SGK)
- `volume`: không dùng để chia tập
- Format dữ liệu (xem `exam_bank.md` mục 7): **Format 3 — Luyện kỹ năng cắt ngang** (không
  gắn 1 concept/unit cụ thể, tổ chức theo `exam_type` chuyên biệt, `units` dùng số ảo).

## 2. Trạng thái hiện tại (khảo sát trực tiếp Supabase — 2026-07-10)

- **5 collections**: `exam_type: reflex` (2), `listening` (1), `lesson` (2).
- Dữ liệu từ vựng lõi: 215 từ, chia 10 chủ đề (My Body, At the Zoo, Colours, Food...) — định
  nghĩa tại `lib/data/startersVocabulary.ts`.
- 3 nhóm collection theo tên hiển thị:
  1. **"Wordlist"** (`exam_type: lesson`, `units: [1]`) — luyện theo bài học, 20 đề × 20 câu,
     bao quát 100% từ vựng (400 câu nạp tĩnh). Nguồn:
     `content/exam-bank/starters-wordlist-pilot.json`.
  2. **"Wordlist"** (`exam_type: reflex`, `units: [99]`) — luyện phản xạ nhanh (có timer, thu
     gọn/mở rộng). Nguồn: `content/exam-bank/pre-a1-starter-wordlist-reflex.json`,
     `pre-a1-starter-wordlist-reflex-batch2.json`.
  3. **"Three Practice Test"** (`exam_type: lesson`, `units: [2]`) — liên kết Flipbook ngoài
     qua `external_url`, không có câu hỏi số hoá trong DB (xem `exam_bank.md` mục 7.3).
- Script seed: `scripts/seed-exam-bank.ts` (generator chuẩn, không có script riêng).

## 3. Đặc thù riêng của môn

- Loại câu hỏi hay dùng: `multiple_choice` (dịch nghĩa 2 chiều Anh⇋Việt, chọn chữ cái điền từ
  đúng), `listening_multiple_choice`, `sentence_reorder`.
- Cấu trúc mỗi đề (20 câu, đan xen 4 dạng):
  1. **Trắc nghiệm từ vựng** (`multiple_choice`, 8 câu) — dịch nghĩa 2 chiều Anh⇋Việt.
  2. **Luyện nghe phản xạ** (`listening_multiple_choice`, 4 câu) — dùng Web Speech API (TTS)
     tự động phát âm khi câu hỏi xuất hiện, có nút loa "Listen" để nghe lại.
  3. **Luyện chính tả** (`multiple_choice` dạng điền chữ, 4 câu) — chọn chữ cái còn thiếu
     (VD: `a _ _ l e` → chọn `pp`).
  4. **Sắp xếp cấu trúc câu** (`sentence_reorder`, 4 câu) — sắp xếp từ xáo trộn thành câu hoàn
     chỉnh (VD: `This is my head`).
- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? **Có — Web Speech API**, không cần file mp3 tĩnh.
- Ràng buộc bản quyền: nội dung soạn mới dựa trên wordlist, không sao chép sách có bản quyền.
- Lịch sử làm bài lưu vào `learning_sessions` (`summary_metrics.type = "exam"`) — giống các
  môn khác, không có gì đặc biệt riêng.

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi soạn thêm câu hỏi
- [ ] Soạn JSON theo template ở `exam_bank.md` mục 3, đặt trong `content/exam-bank/`
- [ ] Seed bằng generator chuẩn (dùng Bulk Insert sẵn có, xem mục 5), verify lại số liệu
      trong Supabase
- [ ] Component sắp xếp câu (`SentenceReorderRenderer.tsx`) đã có bộ lọc chặn double-click —
      không cần thêm debounce riêng khi mở rộng loại câu này
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed xong

## 5. Lịch sử / ghi chú quan trọng

- **Bulk Insert:** `scripts/seed-exam-bank.ts` đã tối ưu nạp hàng loạt 20 câu hỏi trong 1
  request (thay vì 20 requests liên tục) để loại bỏ lỗi nghẽn mạng `fetch failed`, kèm cơ chế
  tự động thử lại (Retry 5 lần, delay 1s). Lệnh nạp lại/đồng bộ:
  ```bash
  npx tsx scripts/seed-exam-bank.ts content/exam-bank/starters-wordlist-pilot.json
  npx tsx scripts/seed-exam-bank.ts content/exam-bank/pre-a1-starter-wordlist-reflex-batch2.json
  ```
- Trigger tự động sinh tên đã bị xóa (migration 053) — tiêu đề hiển thị chính là `title` được
  đặt lúc seed, không có gì tự ghi đè lại (đúng quy tắc chung ở `exam_bank.md` mục 6b).
