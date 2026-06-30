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
