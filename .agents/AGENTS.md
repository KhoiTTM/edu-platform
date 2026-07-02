# Project-Scoped Rules cho edu-platform

Quy tắc bắt buộc đối với tất cả Agent hoạt động trong workspace này:

1. **ĐỌC NGỮ CẢNH TRƯỚC TIÊN**:
   - Trước khi tạo code mới, tái cấu trúc, hoặc phân tích hệ thống, bạn BẮT BUỘC phải đọc và hiểu file `docs/CONTEXT.md`.
   - File này chứa thiết kế kiến trúc cốt lõi, sự phân chia 6 module, và các luật cứng của dự án.
   - Nếu bạn tạo Sub-agent, hãy cung cấp cho sub-agent lệnh đọc file `docs/CONTEXT.md` ngay trong prompt khởi tạo.

2. **GIAO TIẾP QUA TÀI LIỆU**:
   - Nếu bạn đưa ra một quyết định kiến trúc quan trọng, hãy ghi chép lại vào thư mục `docs/`.
   - Đảm bảo tính nhất quán (Consistency) bằng cách bám sát kiến trúc Question-centric và 3 tầng: Content, Attempts, Progress đã định nghĩa.

3. **EXAM BANK (tạo đề thi)**:
   - Trước khi tạo/seed đề hoặc chạy SQL lên `assessment_collections`/`question_bank`, BẮT BUỘC đọc `docs/EXAM_BANK.md` — đặc biệt mục 6 "Bẫy đã biết".
   - Tạo đề qua generator `scripts/seed-exam-bank.ts` (file JSON trong `content/exam-bank/`), KHÔNG ghi DB thủ công.
   - **Tên collection do TRIGGER sinh theo `exam_type`** — KHÔNG đổi tên bằng `UPDATE title` (sẽ bị ghi đè). Khi UPDATE hàng loạt phải lọc `exam_type` để không phá tên đề luyện-theo-bài (`exam_type IS NULL`).
   - Loại câu hỏi runtime render được: xem `components/universal/AssessmentRenderer.tsx`. Thêm loại mới = thêm renderer + case + cập nhật validator trong generator.
   - Nội dung đề phải GỐC (không sao chép sách có bản quyền); với Tiếng Anh 3 chỉ dùng từ trong `docs/TIENGANH3_TAP1_SCOPE.md`.

4. **CẢNH BÁO MÔI TRƯỜNG GHI FILE LỚN**: công cụ ghi đôi khi cắt cụt file >~11KB (chèn NUL ở cuối). Sau khi sửa file lớn, LUÔN verify bằng `tsc --noEmit` / parser; nếu cụt, vá đuôi qua shell hoặc khôi phục từ git.

5. **PRE A1 STARTER & BULK SEEDING**:
   - Khi tạo câu hỏi liên quan đến phát âm (TTS) cho môn `pre-a1-starter`, sử dụng thuộc tính `audio_text` trong `metadata_json` với kiểu câu hỏi `listening_multiple_choice`.
   - Nạp đề thi qua seeder `seed-exam-bank.ts` phải sử dụng cấu trúc Bulk Insert tích hợp sẵn (tự động gom nhóm các câu hỏi thành 1 request và liên kết hàng loạt) để tối ưu hóa hiệu suất và tránh lỗi mạng cloud. Bắt buộc đọc kĩ tài liệu `docs/PRE_A1_STARTER.md`.

6. **TOÁN — RENDER CÔNG THỨC TOÁN HỌC**:
   - Đề thi môn Toán (và bất kỳ môn nào có công thức) dùng cú pháp `$...$` trong `metadata_json` để đánh dấu LaTeX inline.
   - Runtime render qua `KaTeXSpan` (dynamic `import("katex")` trong `useEffect`) trong `MultipleChoiceRenderer.tsx`. MathJax 3 load từ CDN làm fallback tổng thể trong `app/layout.tsx`.
   - `transpilePackages: ["katex"]` trong `next.config.ts` là BẮT BUỘC — thiếu nó Webpack không resolve được katex dù đã `npm install`.
   - CSS + fonts KaTeX được sinh tự động qua `scripts/setup-katex.mjs` (chạy khi `postinstall` và `build`). Hai path này trong `.gitignore` — **KHÔNG commit**, không cần copy tay.
   - Xem đầy đủ quy ước LaTeX, ký hiệu hay dùng, và bảng lỗi đã biết tại `docs/EXAM_BANK.md` mục 3b.
   - Đề Toán 7 HK1 mẫu: `content/exam-bank/toan7-hk1-de01.json` — tham khảo cú pháp trước khi tạo đề mới.

7. **KHTN 7 SBT — DÙNG JSON, KHÔNG DÙNG DB**:
   - `/luyen-tap/khtn?grade=7` và `/flipbooks/khtn7/quiz/[bai]` đọc câu hỏi từ `content/khtn7-questions.json` (file tĩnh trong source code), **không** từ `assessment_collections`/`question_bank` trong Supabase.
   - Lý do: Supabase free tier chỉ 500MB — dành cho user data (`learning_sessions`, `profiles`). Nội dung SBT KHTN 7 (sách cố định) phù hợp lưu trong source code và deploy cùng Vercel.
   - **KHÔNG** seed KHTN 7 lên DB. Nếu thấy rows `subject_slug='khtn' AND grade=7` trong `assessment_collections` — đó là data cũ chưa xóa, không dùng.
   - Khi thêm bài mới: chạy OCR pipeline → append vào `content/khtn7-questions.json` → cập nhật `LESSON_TITLES` trong 2 file route (`flipbooks/[bookSlug]/quiz/page.tsx` và `quiz/[bai]/page.tsx`). Xem tiến độ và quy trình tại `docs/khtn7_sbt_progress.md`.
   - Câu hỏi loại `essay` trong SBT KHTN 7 được hiển thị bởi `FlipbookQuizClient` (học sinh tự làm vào vở, `isCorrect = null`) — không tính vào điểm MCQ.
