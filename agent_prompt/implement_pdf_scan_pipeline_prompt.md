# [ĐÃ NGỪNG DÙNG] Hướng dẫn Bóc tách Sách Scan bằng Hotspot/Review (PDF Scan Pipeline cũ)

> ⚠️ **LƯU Ý DÀNH CHO AGENT TƯƠNG LAI: KHÔNG LÀM THEO QUY TRÌNH DƯỚI ĐÂY.**
>
> Toàn bộ luồng mô tả trong file này — khoanh vùng (hotspot) câu hỏi trên ảnh trang bằng OpenCV, review qua web UI tại `/review` — **đã bị xóa hoàn toàn khỏi dự án** (route `/interactive-workbook`, `/review`, component `BookEditor`/`BookViewer`/`QuestionEditorForm`, `lib/book-viewer-core/`, `lib/schema/`, toàn bộ ảnh trang scan trong `public/books/[slug]/`).
>
> **Lý do xóa:** Chiếm dung lượng lớn (~28MB ảnh/sách) và độ chính xác kém — OpenCV layout detection (chỉ là dilate + contour theo kernel cố định, không phải AI/deep learning thật) thường gộp nhiều câu hỏi liền nhau vào 1 hotspot, không tách đúng ranh giới từng câu.
>
> **Dùng quy trình thay thế:** [`implement_text_only_quiz_pipeline_prompt.md`](./implement_text_only_quiz_pipeline_prompt.md) — OCR toàn trang (không cắt theo khung), tách câu hỏi theo số thứ tự `Bài.Câu` in sẵn trong sách bằng thuật toán quy hoạch động. Chính xác hơn, không cần lưu ảnh, không cần review thủ công từng khung.
>
> File này được giữ lại chỉ để tham khảo lịch sử và để agent tương lai hiểu *tại sao* không nên quay lại cách tiếp cận này. Nội dung gốc bên dưới không còn áp dụng được với code hiện tại.

---

## Nội dung gốc (lịch sử — không còn đúng với codebase hiện tại)

Sách Scan thường chỉ có hình ảnh nguyên trang, không copy được chữ. Pipeline cũ dùng:
1. `pypdfium2`: Cắt PDF thành các ảnh chất lượng cao.
2. `OpenCV (Contours)`: Tự động phân tích Layout, nhận diện viền đen để khoanh vùng (hotspot) từng khối văn bản/câu hỏi.
3. `EasyOCR`: Nhận diện chữ (OCR) trên từng khối văn bản đã được khoanh vùng.

Quy trình cũ: chạy `python pipeline/src/main.py [pdf] --slug [bookSlug] --pages N` → sinh `public/books/[slug]/page_data/page_xxx.json` (hotspot + bbox) và `content/[slug]-workbook.json` (text OCR theo hotspot) → user mở `/review` để click từng khung, sửa lỗi chính tả, gắn đáp án.

Cả 3 thứ này (route `/review`, file ảnh, component liên quan) đều đã bị xóa — xem ghi chú đầu file.
