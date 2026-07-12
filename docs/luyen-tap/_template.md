# Luyện tập — {Tên môn} {Lớp} {Tập (nếu có)}

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `___`
- `grade`: `___`
- `volume` (tập, nếu môn có chia tập): `___`
- Format dữ liệu (xem `exam_bank.md` mục 7): `Ngân hàng câu hỏi` | `Bám sách bài tập 1-1` | `Luyện kỹ năng cắt ngang`

## 2. Trạng thái hiện tại

- Đã seed: `___ collections`, `___ exams`, `___ câu hỏi` (cập nhật khi seed thêm)
- Còn thiếu / chưa làm: `___`
- Nguồn soạn thảo (JSON): `content/exam-bank/___` hoặc `content/workbooks/___`
- Script seed/migrate dùng cho môn này: `scripts/___`

## 3. Đặc thù riêng của môn (khác với quy tắc chung)

- Loại câu hỏi hay dùng: `___`
- Có công thức toán (KaTeX)? `có / không`
- Có audio/TTS? `có / không`
- Ràng buộc bản quyền nội dung: `___` (VD: chỉ dùng từ vựng trong scope doc, hay được chép nguyên văn vì là SBT)
- Quy ước đặt tên riêng (nếu có, ngoài `buildExamTitle.ts` chuẩn): `___`

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi soạn thêm câu hỏi
- [ ] Soạn JSON theo template ở `exam_bank.md` mục 3
- [ ] Seed bằng script ở mục 2, verify lại số liệu trong Supabase
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed xong

## 5. Lịch sử / ghi chú quan trọng

(Các quyết định, lỗi đã gặp, bài học riêng của môn này — không phải quy tắc chung)
