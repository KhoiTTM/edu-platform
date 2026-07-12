# Học bài — {Tên môn} {Lớp} {Tập (nếu có)}

> Chưa có tài liệu quy tắc chung riêng cho "Học bài" như `docs/exam_bank.md` có cho "Luyện
> tập" — file này tự đứng độc lập, mô tả đầy đủ cách môn này hoạt động. Nếu phát hiện quy tắc
> lặp lại giống nhau ở nhiều môn học bài, cân nhắc tách ra `docs/hoc-bai/_chung.md` sau.

## 1. Route & component chính

- Route học sinh học: `app/(app)/(learning)/___`
- Component render chính: `components/learning/___`
- Kiểu học: `Danh sách bài học + video` | `Lesson-engine (Duolingo-style)` | `Sách/Flipbook` | `___`

## 2. Nguồn nội dung bài học

- Nội dung bài học nằm ở: `DB (bảng ___)` | `file JSON (content/___)` | `hardcode trong component`
- Nếu có video: nguồn (YouTube/khác) và cách nhúng: `___`
- Nếu dùng curriculum_nodes/lesson-engine: `source_id`/`slug` liên quan: `___`

## 3. Trạng thái hiện tại

- Đã có: `___`
- Còn thiếu / chưa làm: `___`

## 4. Đặc thù riêng của môn

- Có công thức toán (KaTeX)? `có / không`
- Có audio/TTS? `có / không`
- Ràng buộc bản quyền nội dung: `___`

## 5. Liên kết với Luyện tập

- Môn này có bộ luyện tập tương ứng ở `docs/luyen-tap/___.md` không: `có / không`
- Có dùng chung nguồn dữ liệu (concept_id, subject_slug...) với luyện tập không: `___`

## 6. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 1-2 ở trên trước khi sửa
- [ ] Nếu đổi cấu trúc dữ liệu, kiểm tra ảnh hưởng tới `docs/luyen-tap/___.md` (mục 5)
- [ ] Cập nhật lại mục 3 (trạng thái) sau khi làm xong

## 7. Lịch sử / ghi chú quan trọng

(Các quyết định, lỗi đã gặp, bài học riêng của môn này)
