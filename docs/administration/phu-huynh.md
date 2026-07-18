# Trang Phụ huynh (`/phu-huynh`)

> Trang quản trị dành cho role `parent`/`admin` (kiểm tra qua `checkParentAccess()`), KHÔNG
> phải trang học sinh. Cho phép phụ huynh xem lịch sử học tập, giao bài tập, và duyệt ngân hàng
> đề theo môn/lớp. File này mô tả toàn bộ trang — chưa có quy tắc chung tách riêng vì đây là
> trang quản trị duy nhất loại này trong dự án.

## 1. Route & cấu trúc file

- Route: `app/(app)/(administration)/phu-huynh/page.tsx` — 1 client component lớn (`"use
  client"`), 3 tab chuyển bằng state `tab`, không dùng sub-route riêng.
- Server actions: `app/(app)/(administration)/phu-huynh/actions.ts` — toàn bộ query/mutation
  của trang nằm ở đây (không tách theo tab).
- Components con: `components/administration/parent/`
  - `StudentHistoryCard.tsx` — hiển thị lịch sử học tập (tab "Lịch sử")
  - `TaskWizard.tsx` — wizard 4 bước tạo bài tập giao cho học sinh (tab "Giao bài")
  - `ActiveTasksList.tsx` — danh sách bài đã giao, bật/tắt/xoá (tab "Giao bài")
  - `ExamBankExplorer.tsx` — duyệt toàn bộ ngân hàng đề theo môn/lớp, read-only (tab "Ngân
    hàng đề")

## 2. Phân quyền

- `checkParentAccess()` (`actions.ts`) — đọc `profiles.role` của user hiện tại, trả về
  `hasAccess: role === "admin" || role === "parent"`.
- Toàn bộ hàm đọc dữ liệu học sinh khác (không phải chính mình) dùng `getAdminClient()` — tạo
  Supabase client bằng `SUPABASE_SERVICE_ROLE_KEY` để **bypass RLS**, nhưng luôn gọi
  `checkParentAccess()` trước và throw nếu không có quyền. Không tự ý thêm hàm mới đọc dữ liệu
  học sinh mà bỏ qua bước check này.
- Học sinh (`role: student`) không thấy route này trong menu — nhưng route không tự chặn ở
  tầng middleware, chỉ chặn trong từng server action. Nếu thêm action mới, luôn gọi
  `checkParentAccess()` đầu tiên.

## 3. Tab "Lịch sử" (`HistorySection` → `StudentHistoryCard`)

- Chọn học sinh bằng nút bấm (không phải dropdown) — danh sách lấy từ `getStudentList()`
  (toàn bộ `profiles.role = student`).
- 2 view con trong `StudentHistoryCard`, chuyển bằng toggle `viewMode`:
  - **"Hôm nay"** (mặc định) — timeline theo giờ trong ngày, gộp 2 nguồn:
    - Sự kiện `login` từ bảng `learning_events` (`event_type = 'login'`)
    - Các phiên học từ `learning_sessions` (`started_at` trong ngày hiện tại)
    - Lấy qua `getStudentTodayTimeline(studentId)`, sort theo thời gian tăng dần.
  - **"Lịch sử"** — danh sách 50 bản ghi gần nhất từ `learning_sessions` (không giới hạn theo
    ngày), có filter theo thời gian (24h/7 ngày/tất cả), môn học, hình thức (học bài/luyện tập).
    Lấy qua `getStudentHistory(studentId)`.
- Thống kê nhanh ở header (tổng phút học, số buổi, streak) ưu tiên đọc từ
  `getStudentDashboardStats(studentId)` (bảng `user_dashboard_stats` — streak/tổng phút được
  server tính sẵn), fallback về tính toán client-side từ `history` nếu chưa có dữ liệu.
- **Quan trọng — độ tin cậy của `started_at`/`ended_at`/`duration_seconds`:** kể từ
  2026-07-15 các luồng học (đề kiểm tra, luyện tập, sách bài tập, flipbook, học bài) đều đo
  thời gian thật (xem mục 7). Dữ liệu insert TRƯỚC thời điểm đó có `started_at = ended_at` (ghi
  1 lần lúc hoàn thành bài) — không dùng để tính thời lượng thật, chỉ dùng được làm mốc thời
  gian đã học bài gì.

## 4. Tab "Giao bài" (`TasksSection` → `TaskWizard` + `ActiveTasksList`)

- `TaskWizard` — wizard 4 bước: **Học sinh → Môn học → Tham số đề → Cài đặt & Giao**.
  - Chọn môn qua `getSubjectsForGrade(grade)` (whitelist slug cứng trong code theo lớp, không
    query hết `universal_subjects`).
  - Chọn đề/bài học cụ thể qua `getExamsForSubject()`/`getLessonsForSubject()`, hoặc chọn theo
    Unit qua `getUnitsForSubject()` (để hệ thống tự random trong phạm vi unit đã chọn).
  - Bước cuối gọi `createParentTask(input)` — tạo 1 bản ghi `parent_tasks` (cấu hình lặp lại:
    `frequency`, `active_days`), và NẾU có `start_date`/`end_date` thì sinh sẵn toàn bộ
    `daily_tasks` cho từng ngày trong khoảng đó ngay lúc tạo (không sinh lazy mỗi ngày).
- `ActiveTasksList` — liệt kê `parent_tasks` của phụ huynh hiện tại (`getMyParentTasks()`,
  enrich thêm tên học sinh/đề/bài học + trạng thái hoàn thành từ `daily_tasks` +
  `learning_sessions`), cho phép bật/tắt (`toggleParentTask`) hoặc xoá hẳn
  (`deleteParentTask`).
- Học sinh nhìn thấy các `daily_tasks` này ở đâu: `getTodayTasks()`/`getPendingTasks()` (cùng
  file `actions.ts`) — dùng ở trang học sinh (`/dashboard` hoặc tương đương), KHÔNG phải trang
  phụ huynh này. Chỉ liệt kê ở đây để biết luồng dữ liệu đi đâu tiếp.

## 5. Tab "Ngân hàng đề" (`ExamBankExplorer`)

- Read-only — duyệt toàn bộ cây `assessment_collections → exams → question_bank` theo
  (môn, lớp), qua `getExamBankData(subjectSlug, grade)`.
- Nhóm theo 3 loại hiển thị (khác cột `exam_type` gốc trong DB — xem hàm `examCategory()`):
  - `lesson` — `exam_type` là `null` hoặc `"lesson"` → hiển thị "Theo bài học"
  - `review` — mọi giá trị khác (`review`, `midterm`, `final`...) → hiển thị "Theo ôn tập"
  - `reflex` — `exam_type = "reflex"` → hiển thị "Theo phản xạ"
  - Cách nhóm này PHẢI khớp với cách trang `/luyen-tap` phân tab cho học sinh — nếu sửa logic
    phân tab ở `/luyen-tap`, kiểm tra và sửa đồng bộ `examCategory()` ở đây.
- Đọc câu hỏi qua junction `exam_questions → question_bank`, từng exam 1 query riêng (không
  gộp) — tránh giới hạn 1000 dòng của Supabase và tránh rớt câu khi join lồng nhiều bảng.
- Chỉ `admin`/`parent` xem được (`checkParentAccess()`).

## 6. Đặc thù UI

- Không dùng KaTeX riêng cho trang này — nội dung câu hỏi hiển thị trong `ExamBankExplorer` là
  text thô từ `metadata_json`, không render công thức toán đặc biệt.
- Toàn bộ trang dùng chung theme tối (`bg-surface`, `border-line`...) như trang học sinh — xem
  `docs/THEME.md` nếu cần đối chiếu class màu.

## 7. Liên kết với hệ thống tracking thời gian học (2026-07-15)

- Trang này là nơi TIÊU THỤ dữ liệu `learning_sessions`/`learning_events`, không tự ghi dữ
  liệu — việc ghi log nằm ở các trang học sinh (xem `components/LoginTracker.tsx`,
  `app/api/events/route.ts`, và action `saveExamResult`/`submitLesson`/
  `saveBookPracticeAttempt`/`saveFlipbookQuizAttempt` ở từng môn).
- Nếu tab "Hôm nay" hiển thị thiếu buổi học hoặc thời lượng sai, kiểm tra theo thứ tự:
  1. Học sinh có thực sự đăng nhập lại (session mới) không — `LoginTracker` chỉ bắn 1 event
     `login`/phiên trình duyệt (chặn bằng `sessionStorage`), không bắn lại khi chuyển trang.
  2. Luồng học đó đã được cập nhật đo thời gian thật chưa (xem danh sách 5 luồng ở mục 3) —
     nếu là dữ liệu cũ trước 2026-07-15, duration sẽ luôn hiện "—".
  3. Với luồng "Học bài" (`LearnNodeClient`) — dựa vào `sendBeacon`/`beforeunload`/
     `visibilitychange` để bắt lúc học sinh rời trang; nếu học sinh tắt tab đột ngột theo cách
     trình duyệt không kịp gửi beacon (hiếm), phiên đó sẽ có `ended_at = null`.

## 8. Việc cần làm khi mở rộng/sửa trang này

- [ ] Đọc mục 2 (phân quyền) trước khi thêm bất kỳ action mới nào đọc dữ liệu học sinh khác
- [ ] Nếu sửa cách phân loại `exam_type` ở `/luyen-tap`, đồng bộ lại `examCategory()` trong
      `ExamBankExplorer.tsx` (mục 5)
- [ ] Nếu thêm luồng học mới (môn/loại bài tập mới) sinh `learning_sessions`, áp dụng đúng
      pattern đo thời gian thật đã làm ở mục 7 — không quay lại kiểu `started_at = ended_at`
- [ ] Cập nhật lại mục 3 sau khi có thay đổi về cách tính thống kê/streak

## 9. Lịch sử / ghi chú quan trọng

- **2026-07-15 — Thêm tab "Hôm nay" + sửa tracking thời gian học thật:** trước đó
  `StudentHistoryCard` chỉ có 1 view "Lịch sử" dùng `started_at = ended_at` (ghi 1 lần lúc
  hoàn thành bài) nên không thể biết học sinh học từ mấy giờ đến mấy giờ. Đã thêm
  `LoginTracker`, sửa 5 luồng ghi `learning_sessions` để đo thời gian thật (mount → submit),
  và thêm view "Hôm nay" dạng timeline (login + từng phiên học). Đã thử thêm khối "Nhận xét AI"
  (đọc `user_dashboard_stats.last_ai_insight`) nhưng bị yêu cầu bỏ ngay sau đó — không dùng lại
  trừ khi được yêu cầu rõ.
