# Edu Platform - Tổng quan dự án (Project Overview)

Tài liệu này cung cấp bức tranh toàn cảnh về kiến trúc, công nghệ và các tính năng cốt lõi của Edu Platform. Mục đích là để bất kỳ lập trình viên hoặc AI Agent nào mới tham gia dự án cũng có thể nhanh chóng nắm bắt và tiếp tục phát triển hệ thống một cách dễ dàng.

## 1. Công nghệ cốt lõi (Tech Stack)
- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS + Lucide React (Icons)
- **Database & Auth:** Supabase (PostgreSQL)
- **AI Engine:** Google Generative AI (Gemini 3.5/2.5/1.5)
- **Khác:** Web Speech API (nhận diện giọng nói), canvas-confetti (hiệu ứng)

## 2. Cấu trúc thư mục (Directory Structure)
```text
edu-platform/
├── app/                  # Next.js App Router (Routes, Pages, API)
│   ├── (app)/            # Nhóm các route yêu cầu đăng nhập (Dashboard, Bài học, Quiz)
│   ├── api/ai/           # Các Endpoint giao tiếp với AI (Aria Teacher, Dictionary)
│   └── login/            # Trang đăng nhập Supabase Auth
├── components/           # Các UI Components dùng chung
│   ├── speaking/         # Các Component phục vụ tính năng Speaking Journey
│   └── listening/        # Các Component phục vụ tính năng Listening
├── hooks/                # Custom React Hooks chứa logic phức tạp
│   ├── useSpeakingSession.ts # Quản lý trạng thái phiên hội thoại AI
│   └── useVoiceInput.ts  # Tích hợp Micro & Nhận diện giọng nói
├── lib/                  # Tiện ích, Database Client và Data cứng (Hardcoded data)
│   ├── supabase/         # Supabase Client (Browser/Server)
│   ├── speaking/         # Logic trích xuất ngữ cảnh (Curriculum Context)
│   └── ieltsQuizzes.ts   # Dữ liệu nội dung các Unit của IELTS Mindset
├── scripts/              # Chứa các file sinh dữ liệu động (Data Seeding)
├── supabase/migrations/  # File SQL tạo bảng, RLS và nạp dữ liệu ban đầu
└── docs/                 # Tài liệu kỹ thuật chi tiết cho từng tính năng
```

## 3. Các tính năng cốt lõi (Core Features)

### 3.1. Hệ thống Bài học & Trắc nghiệm (Core Curriculum)
- Hệ thống hỗ trợ đa môn học (Toán, Tiếng Anh...).
- Dữ liệu được lưu trên Supabase (`lessons`, `quizzes`, `quiz_questions`).
- **Data Seeding:** Được sinh tự động từ code (vd: `scripts/generate-toan3-sql.ts`) giúp tạo ra hàng nghìn câu hỏi chuẩn xác mà không cần nhập tay.

### 3.2. Listening Module
- **Luồng hoạt động:** Phát âm thanh/video → Bài tập điền từ (Fill-in-the-blanks) → Xem Transcript và đối chiếu kết quả.
- **Tài liệu tham khảo:** `docs/listening_feature_summary.md`

### 3.3. Speaking Journey (AI Tutor - Aria)
- Đây là tính năng phức tạp nhất, đóng vai trò như một người bạn/giám khảo luyện nói tiếng Anh.
- **Kiến trúc:** Client Components (`SpeakingJourneyClient`) kết nối với Server API (`api/ai/teacher/route.ts`).
- **Luồng ngữ cảnh:** Context được trích xuất tự động qua `curriculumContextBuilder.ts` (lấy từ vựng, ngữ pháp của bài học đó) để mớm cho AI, giúp AI luôn trò chuyện đúng trọng tâm bài học.
- **Tính năng phụ trợ:** Hỗ trợ nhận diện giọng nói (Web Speech API), Gợi ý câu (Sentence Starters), Xin gợi ý (Hint), Thử lại (Retry), và cơ chế chống im lặng (Silence timeout).
- **Tài liệu tham khảo:** `docs/speaking_feature_quickref.md` & `docs/speaking_feature_design.md`

### 3.4. AI Dictionary (Tra từ điển thông minh)
- Hiển thị dưới dạng Popup góc màn hình.
- Học sinh quét/chọn bất kỳ từ nào, hệ thống gọi API `api/ai/dictionary` giải nghĩa từ vựng đó ngay trong ngữ cảnh bài học.

### 3.5. Learning Identity Dashboard (Mới)
- Trang Dashboard tập trung vào việc hiển thị cảm xúc, tiến độ và thói quen học tập của người dùng.
- **Kiến trúc dữ liệu 3 lớp (3-Layer Data Model):**
  - **Layer 1 (Raw Events):** Lưu các sự kiện chi tiết như `speaking_turn_completed` vào bảng `learning_events` (Fire-and-forget).
  - **Layer 2 (Sessions):** Nhóm các sự kiện thành phiên học trong bảng `learning_sessions`.
  - **Layer 3 (Snapshots):** Tổng hợp tức thì vào bảng `user_dashboard_stats` giúp UI tải ngay lập tức (O(1)).
- **Tính năng AI:** Chứa Component `AIInsightPanel` và `MemoryVault`, sử dụng Gemini để phân tích hành trình học và mớm lời động viên cá nhân hóa (được cache để tối ưu chi phí).
- **Tài liệu tham khảo:** `docs/dashboard_feature_design.md`

## 4. Hướng dẫn thêm tính năng mới (How to extend)
Hệ thống được thiết kế theo hướng Component-Driven và API-First. Khi muốn phát triển tính năng mới:

1. **Phát triển Môn học mới (vd: Toán lớp 4):**
   - Không cần code React. Chỉ cần viết script tạo SQL (tương tự `generate-toan3-sql.ts`), định nghĩa thuật toán sinh câu hỏi và chạy file SQL đó trên Supabase. UI sẽ tự động tương thích.
   
2. **Phát triển Module mới (vd: Writing Tutor):**
   - **Bước 1:** Tạo giao diện nhập văn bản trong `components/writing/`.
   - **Bước 2:** Tạo prompt chuyên biệt cho AI chấm bài trong `api/ai/teacher/route.ts` (thêm 1 case `mode: "writing_feedback"`).
   - **Bước 3:** Viết custom hook (vd: `useWritingSession.ts`) để gửi bài học sinh lên AI và xử lý JSON (điểm số, lỗi sai) trả về.

3. **Cập nhật nội dung giáo trình (Mindset IELTS):**
   - Thay đổi các metadata (từ vựng trọng tâm, grammar) tại `lib/ieltsQuizzes.ts`.
   - Thay đổi script audio tại `lib/ieltsTranscripts.ts`.

## 5. Lưu ý quan trọng
- Khi làm việc với Supabase Server Components trong Next.js 15, bắt buộc phải `await params` (ví dụ `const { id } = await params;`) nếu không sẽ báo lỗi warning.
- Model AI chính hiện tại đang được tối ưu cho **Gemini 3.5 Flash** vì chi phí rẻ, tốc độ phản hồi tính bằng ms và hỗ trợ ngữ cảnh tiếng Việt rất tốt. Mọi thay đổi Prompt cần bám sát cấu trúc của model này.
