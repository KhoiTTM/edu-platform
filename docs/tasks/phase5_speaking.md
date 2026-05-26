# Phase 5 — Polish & Emotion

Mục tiêu của Phase này là biến hệ thống từ "hoạt động được" (functional) thành "đáng yêu và thân thiện" (delightful), giảm thiểu cảm giác rô-bốt và xử lý lỗi một cách tinh tế.

- [x] **1. Friendly Error Handling (Xử lý lỗi API & Quota)**
  - [x] Bắt các lỗi kỹ thuật từ server (ví dụ: `429 Quota Exceeded`, `503 All models failed`).
  - [x] Trong `hooks/useSpeakingSession.ts`, thay vì hiển thị lỗi thô ra UI, hãy map chúng sang các câu thông báo thân thiện.
  - [x] Ví dụ: *"Oops! Hệ thống AI đang hơi quá tải vì có quá nhiều bạn đang học. Bạn chờ Aria 1 phút rồi nhấn Gửi lại nhé! 😅"*

- [x] **2. Emotional Micro-copy (Tinh chỉnh text UI)**
  - [x] Khi Aria đang generate câu trả lời (loading), thay vì chỉ quay spinner vòng vòng, hãy hiển thị luân phiên các dòng text vui vẻ (tham khảo Design Doc):
    - *"Aria is reading your answer carefully..."*
    - *"Hmm, let me think about what you said..."*
    - *"Aria is finding the perfect follow-up..."*
  - [x] Tinh chỉnh text nút bấm theo trạng thái (vd: 🎙️ Speak, 🔴 I'm listening...).

- [x] **3. Animations & Visual Polish**
  - [x] Thêm hiệu ứng Confetti (pháo giấy) khi học viên hoàn thành session (lúc render component `SpeakingSessionComplete.tsx`).
  - [x] Cải thiện animation trượt lên (slide in) của các khung chat để có cảm giác tự nhiên giống app nhắn tin thật.

- [x] **4. Best Moment & Debrief UI**
  - [x] Làm nổi bật thẻ "Best Moment" (Câu nói hay nhất của bạn trong buổi hôm nay) ở trang kết quả.
  - [x] Đảm bảo AriaDebrief rendering ra đẹp, có các icon nhấn mạnh thành quả để đẩy cảm xúc người học lên cao nhất.

- [x] **5. QA & Supabase Data Verification**
  - [x] Xác nhận dữ liệu thực sự được đẩy lên Supabase (`speaking_sessions` và `unit_speaking_progress`) khi kết thúc session.
  - [x] Chắc chắn rằng `session_summary` được lưu đầy đủ để Aria có thể "nhớ" cho Session tiếp theo.
