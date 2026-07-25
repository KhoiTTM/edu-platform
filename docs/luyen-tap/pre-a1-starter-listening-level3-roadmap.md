# Lộ trình Phát triển Luyện nghe Level 3 — Pre A1 Starter

Tài liệu này vạch ra thiết kế kiến trúc, cấu trúc dữ liệu, và quy trình triển khai cho phân hệ **Luyện nghe Level 3** (Listening Level 3) thuộc môn `pre-a1-starter`.

---

## 1. Mục tiêu & Định hướng Level 3

* **Mục tiêu**: Nâng cấp từ nhận diện câu đơn (Level 2: nghe câu nào chọn câu đó) sang **nghe hiểu hội thoại ngắn (Short Dialogue Comprehension)**. 
* **Định hướng định dạng**: Bám sát phần thi Part 2 và Part 3 của kỳ thi Cambridge Pre A1 Starters thực tế (Nghe đoạn hội thoại ngắn hỏi-đáp về tên, tuổi, vị trí, hoạt động, màu sắc và chọn phương án đúng).
* **Khả năng tái sử dụng**: Sử dụng lại component `listening_multiple_choice` của `AssessmentRenderer` và `MultipleChoiceRenderer` để không phải code thêm UI mới, chỉ nâng cấp ở tầng dữ liệu và audio.

---

## 2. Cấu trúc câu hỏi mẫu (JSON Schema)

Mỗi đề thi Level 3 gồm **15 câu hỏi** (tương tự Level 2). Định dạng dữ liệu mẫu trong file `pre-a1-listening-level3-exams.json`:

```json
{
  "type": "listening_multiple_choice",
  "difficulty": 1.5,
  "metadata_json": {
    "audio_text": "Man: What is the dog's name?\nGirl: Its name is Happy.",
    "question": "🔊 Listen and answer: What is the dog's name?",
    "options": [
      "Happy",
      "Lucky",
      "Rocky",
      "Max"
    ],
    "correct_index": 0,
    "tags": ["listening", "dialogue", "level-3", "animals"],
    "audio_url": "/audio/pre-a1-starter-listening-l3/[hash].mp3"
  }
}
```

### Các nhóm câu hỏi phổ biến:
1. **Hỏi Tên/Chính tả**: 
   * *Hội thoại*: "Man: What's your friend's name? / Girl: Her name is May, M-A-Y."
   * *Câu hỏi*: "What is the girl's friend's name?" -> Chọn `May`.
2. **Hỏi Số lượng/Tuổi**:
   * *Hội thoại*: "Woman: How old is your brother? / Boy: He is nine years old."
   * *Câu hỏi*: "How old is the boy's brother?" -> Chọn `9`.
3. **Hỏi Vị trí (Prepositions)**:
   * *Hội thoại*: "Man: Where is your book? / Girl: It is in my schoolbag."
   * *Câu hỏi*: "Where is the book?" -> Chọn `In the schoolbag`.
4. **Hỏi Màu sắc/Mô tả**:
   * *Hội thoại*: "Woman: Look at the spider! / Boy: Yes, it is a big green spider."
   * *Câu hỏi*: "What colour is the spider?" -> Chọn `Green`.

---

## 3. Kỹ thuật sinh Audio Hội thoại (Multi-Voice Audio Generation)

Do hội thoại Level 3 có sự tương tác giữa 2 nhân vật (ví dụ: Man & Girl, Woman & Boy), việc sinh audio cần đảm bảo tính tự nhiên và phân biệt rõ giọng đọc.

### Giải pháp đề xuất: Script Nối Buffer (Audio Merger Pipeline)
Chúng ta sẽ xây dựng một script tự động:
1. Parse dòng thoại:
   * Dòng bắt đầu bằng `Man:` -> Sinh bằng giọng nam (`teacher_men`).
   * Dòng bắt đầu bằng `Girl:` -> Sinh bằng giọng bé gái (`child_girl`).
2. Gửi request riêng biệt tới ElevenLabs API cho từng dòng thoại để lấy các buffer âm thanh.
3. Chèn một khoảng nghỉ ngắn (khoảng 0.8s - 1.2s) giữa các câu thoại.
4. Ghép nối (concatenate) các buffer âm thanh này lại thành 1 file MP3 duy nhất.
5. Lưu file vào thư mục `public/audio/pre-a1-starter-listening-l3/`.

Điều này giúp tiết kiệm thời gian chỉnh sửa thủ công và đem lại trải nghiệm học tập cực kỳ sinh động cho học sinh.

---

## 4. Trạng thái Triển khai & Kết quả (Implementation Status)

- [x] **Bước 1**: Soạn thảo bộ câu hỏi hội thoại bám sát Wordlist 280 từ vựng (bao phủ 100% từ vựng cả 2 sách Pre A1 Starters và Tiếng Anh 3 Global Success).
- [x] **Bước 2**: Viết script sinh audio [gen-audio-level3.ts](file:///d:/Backups/Projects/edu-platform/scripts/gen-audio-level3.ts) thực hiện việc phân vai hội thoại (Man/Woman/Girl/Boy) và ghép nối buffer âm thanh từ ElevenLabs.
- [x] **Bước 3**: Chạy script sinh âm thanh. Do hạn mức tài khoản ElevenLabs cạn kiệt, hệ thống đã dừng ở **66 câu hỏi đầu tiên** có âm thanh hoàn chỉnh.
- [x] **Bước 4**: Viết script hoán vị và phân bổ lại [generate-listening-level3-repeat.ts](file:///d:/Backups/Projects/edu-platform/scripts/generate-listening-level3-repeat.ts) để tự động trộn và sắp xếp 66 câu hỏi có audio này thành **10 đề thi hoàn chỉnh** (mỗi đề 15 câu, đảm bảo không trùng lặp trong cùng một đề thi).
- [x] **Bước 5**: Seed thành công 10 đề thi lên database Supabase bằng `scripts/seed-exam-bank.ts`.
- [x] **Bước 6**: Kiểm tra hiển thị và chức năng phát âm thanh trên UI. Đã cập nhật tracking cả tốc độ nghe của học sinh (1.0x, 0.75x, 0.5x) vào cột `summary_metrics` của bảng `learning_sessions`.

---

## 5. Lịch sử cập nhật (Changelog)
* **2026-07-24**: Hoàn thành sinh 66 audio tĩnh (thực tế 63 câu unique), phân bổ thành 10 đề luyện nghe Level 3 và seed lên database Supabase thành công. Tích hợp tracking tốc độ phát nghe tts_speed.
* **2026-07-25**: Mở rộng lên **20 đề × 20 câu (400 câu)**, dùng `ELEVENLABS_API_KEY_SECOND`
  (key thứ 2, tier free riêng biệt) sau khi key đầu cạn quota. Soạn 9 batch câu hội thoại mới
  thủ công phủ các chủ đề wordlist còn thiếu (My Body, At the Beach, My Street, Birthday, thú
  nuôi tại nhà, At the Zoo, Clothes Shop, Favourite Food), sinh audio đến khi quota key 2 gần
  cạn — tổng 195 câu unique có audio thật. Sửa thuật toán phân bổ đề (bản cũ random-cắt-đầu
  độc lập từng đề bỏ sót một số câu; bản v2 xáo trộn-nối-liên-tiếp đảm bảo phủ đều 100%) — xem
  chi tiết đầy đủ tại `docs/luyen-tap/pre-a1-starter.md` mục 5 (2026-07-25).

