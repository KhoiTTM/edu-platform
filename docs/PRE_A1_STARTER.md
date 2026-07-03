# NGÂN HÀNG ĐỀ & LUYỆN TẬP PRE A1 STARTER WORDLIST

Tài liệu này hướng dẫn chi tiết cách thức tổ chức, cấu trúc câu hỏi, cấu trúc dữ liệu, và cách thức vận hành phân hệ luyện tập từ vựng cho môn **Pre A1 Starter**.

---

## 1. Cấu trúc môn học & Dữ liệu Lõi
* **Dữ liệu tĩnh từ vựng**: Được định nghĩa tại [startersVocabulary.ts](file:///d:/Backups/Projects/edu-platform/lib/data/startersVocabulary.ts), gồm **215 từ vựng chia làm 10 chủ đề** (My Body, At the Zoo, Colours, Food...).
* **Ngân hàng đề thi (Exams)**: Được thiết kế dưới dạng 20 đề thi ôn tập hỗn hợp, mỗi đề 20 câu hỏi lấy ngẫu nhiên và đảm bảo bao quát 100% tất cả 215 từ vựng (tổng cộng 400 câu hỏi nạp tĩnh).
  * Vị trí lưu trữ: [starters-wordlist-pilot.json](file:///d:/Backups/Projects/edu-platform/content/exam-bank/starters-wordlist-pilot.json).

---

## 2. Cấu trúc câu hỏi hỗn hợp (Mixed Types)
Mỗi đề thi (từ Đề 01 đến Đề 20) chứa **20 câu hỏi** được thiết kế đan xen 4 dạng bài tập khác nhau để phát triển toàn diện kỹ năng của học sinh:

1. **Trắc nghiệm từ vựng (`multiple_choice`)** - *8 câu*: Dịch nghĩa từ vựng đan xen hai chiều Anh ⇋ Việt.
2. **Luyện nghe phản xạ (`listening_multiple_choice`)** - *4 câu*: 
   * Sử dụng công nghệ **Web Speech API (TTS)** để tự động phát âm thanh tiếng Anh chuẩn giọng bản xứ khi câu hỏi xuất hiện.
   * Hiển thị nút loa **Listen (Nghe phát âm)** để học sinh bấm nghe lại.
   * Yêu cầu học sinh nghe để chọn cách viết tiếng Anh đúng hoặc nghĩa tiếng Việt tương ứng.
3. **Luyện chính tả (`multiple_choice` dạng điền chữ)** - *4 câu*: Chọn chữ cái còn thiếu điền vào chỗ trống để tạo thành từ đúng (Ví dụ: `a _ _ l e` -> chọn `pp`).
4. **Sắp xếp cấu trúc câu (`sentence_reorder`)** - *4 câu*: Học sinh sắp xếp các từ xáo trộn thành câu tiếng Anh hoàn chỉnh và có nghĩa (Ví dụ: `This is my head`, `I can see a cat`...).
   * *Lưu ý*: Component [SentenceReorderRenderer.tsx](file:///d:/Backups/Projects/edu-platform/components/universal/SentenceReorderRenderer.tsx) đã được trang bị bộ lọc chặn double-click nhằm tránh lỗi trùng lặp key React.

---

## 3. Kiến trúc Database & Hiển thị Dashboard
* **Database mapping**:
  * Đề được nạp vào bảng `assessment_collections` dưới `subject_slug: "pre-a1-starter"` và `grade: 3` (để hiển thị cho các khối lớp tiểu học).
  * **Trigger tự động sinh tên đã bị xóa bỏ hoàn toàn (ở migration 053)**. Tiêu đề nhóm hiển thị trên UI chính là tiêu đề của collection được đặt khi seed:
    1. **"Wordlist"** (`exam_type = 'lesson'`, `units = [1]`): Nhóm đề luyện theo bài học.
    2. **"Wordlist"** (`exam_type = 'reflex'`, `units = [99]`): Nhóm đề luyện phản xạ nhanh (hỗ trợ thu gọn/mở rộng, tính giờ).
    3. **"Three Practice Test"** (`exam_type = 'lesson'`, `units = [2]`): Nhóm đề liên kết tài liệu ngoài.
  * **Hỗ trợ liên kết tài liệu ngoài (External URL)**: Đề thi trong nhóm "Three Practice Test" có trường `external_url` được thiết lập trỏ tới link Flipbook. Khi học sinh bấm vào, UI sẽ hiển thị nút "Mở Flipbook" để học sinh làm trực tiếp trên link ngoài.

* **Lịch sử làm bài (Attempts)**:
  * Sau khi làm bài xong, điểm số và chi tiết bài làm của học sinh sẽ tự động được lưu vào bảng `learning_sessions` thông qua cấu trúc JSONB chuẩn với `summary_metrics.type = "exam"`.

---

## 4. Cách nạp dữ liệu (Seeding)
Hệ thống nạp đề thông qua script [seed-exam-bank.ts](file:///d:/Backups/Projects/edu-platform/scripts/seed-exam-bank.ts) đã được tối ưu hóa **Bulk Insert** (nạp hàng loạt 20 câu hỏi trong 1 request thay vì 20 requests liên tục) để loại bỏ hoàn toàn lỗi nghẽn mạng `fetch failed`, đi kèm cơ chế tự động thử lại (Retry 5 lần, delay 1s).

Lệnh chạy nạp lại/đồng bộ:
```bash
npx tsx scripts/seed-exam-bank.ts content/exam-bank/starters-wordlist-pilot.json
npx tsx scripts/seed-exam-bank.ts content/exam-bank/pre-a1-starter-wordlist-reflex-batch2.json
```

