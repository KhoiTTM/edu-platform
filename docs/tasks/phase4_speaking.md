# Phase 4 — Retry Loop & Fallback System

Mục tiêu của Phase này là giúp hệ thống xử lý mượt mà các tình huống học viên gặp khó khăn trong việc trả lời (im lặng quá lâu, câu trả lời quá ngắn, hoặc yêu cầu thử lại), đảm bảo Aria luôn giữ được nhịp độ trò chuyện mà không làm học viên áp lực.

- [x] **Xử lý khoảng lặng (Silence Timeout)**
  - [x] Trong `hooks/useSpeakingSession.ts`, thêm logic theo dõi thời gian (ví dụ `setTimeout` 60s hoặc 120s) khi đến lượt người dùng.
  - [x] Nếu quá thời gian mà chưa có text/voice input, kích hoạt trạng thái "silence_timeout".
  - [x] Gọi API để Aria đưa ra một lời gợi ý nhẹ nhàng (ví dụ: "No rush! If you're not sure where to start, try...").

- [x] **Xử lý câu trả lời quá ngắn (Short Response Nudge)**
  - [x] Kiểm tra `wordCount` của input người dùng trong `useSpeakingSession.ts`.
  - [x] Nếu dưới 5 từ (ví dụ: "I don't know", "Yes", "Maybe"), gửi flag `isShortResponse: true` lên API.
  - [x] Trong `route.ts`, cập nhật prompt để Aria phản hồi bằng "gentle expansion move" thay vì ép buộc (ví dụ: chia nhỏ câu hỏi ra, hoặc hỏi một khía cạnh cụ thể hơn).

- [x] **Tính năng "Try that again" (Learner-requested Retry)**
  - [x] Thêm nút `[🔄 Try that again]` vào giao diện khi học viên đang bí (có thể đặt cạnh Input Area hoặc trong Scaffolding Panel).
  - [x] Khi click, gọi một API đặc biệt hoặc mode `retry_prompt` để Aria đưa ra một câu hỏi đơn giản hơn thay thế cho câu hỏi vừa rồi.

- [x] **Ngăn chặn lạc đề (Topic Drift Handling)**
  - [x] Cập nhật system prompt trong `route.ts` yêu cầu Aria nhận diện nếu học viên nói về một chủ đề hoàn toàn không liên quan.
  - [x] Nếu lạc đề, Aria sẽ phản hồi lại nội dung đó ngắn gọn và khéo léo lái câu chuyện về lại chủ đề chính của Unit.

- [x] **Integration & UX**
  - [x] Đảm bảo các thông báo gợi ý của Aria xuất hiện tự nhiên trên giao diện `AriaConversationBubble.tsx`.
  - [x] Kiểm thử toàn bộ flow: Cố tình im lặng 1 phút -> Trả lời 1 từ -> Nhấn Try again.
