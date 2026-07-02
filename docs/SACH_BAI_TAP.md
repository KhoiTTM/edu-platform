# LUYỆN TẬP THEO SÁCH (Answer-sheet) — Quy ước & Bản quyền

> Cơ chế cho **sách có bản quyền** (SBT thương mại của NXB): KHÔNG tái tạo đề vào hệ thống.
> Học sinh đọc đề ở **sách gốc** (link Flipbook), nhập đáp án vào "phiếu" → hệ thống chấm.
> Khác hoàn toàn exam-bank (xem `docs/EXAM_BANK.md`).

## 1. RANH GIỚI BẢN QUYỀN (đọc trước khi làm sách mới)

Phân loại nguồn để biết được phép làm gì:

| Loại nguồn | Ví dụ | Được phép |
|---|---|---|
| SGK/SBT thương mại (NXB Giáo dục, Pearson...) | SBT Tiếng Anh 3/7 Global Success | **KHÔNG** chép đề. Chỉ lưu đáp án ngắn/từ khóa để chấm; đề đọc ở link gốc. |
| Đề thi trường sưu tầm (website chia sẻ) | Bộ đề HK1 Toán 7 (tailieumontoan.com) | Ràng buộc nhẹ; vẫn NÊN tạo đề tương đương (đổi số liệu) → nạp exam-bank. |
| Nội dung gốc do Claude/GV soạn | — | Tự do. |

**Nguyên tắc chung:** không sao chép nguyên văn đề bài, đoạn đọc, câu hoàn chỉnh, hình ảnh
của tài liệu có bản quyền. Đáp án dạng token ngắn (A/B/C, từ đơn, T/F/NI) hoặc từ khóa
để chấm thì được dùng. Đáp án gợi ý cho câu mở phải do Claude TỰ SOẠN (không chép "suggested
answers" của sách).

## 2. Cấu trúc data `content/[slug]-answers.json`

```
book: { slug, title, subject_slug, grade, flipbook_url }
units: [ {
  unit, title, pages, sections: [ {
    code (A-E), name, page,
    tasks: [ {
      bai, instruction_ref (mô tả NGẮN, không phải đề gốc),
      type: "text" | "choice" | "keywords" | "essay",
      graded: true|false,
      options?, answers?,            // text/choice: đáp án ngắn để chấm
      keywords?: string[][],         // keywords: mỗi câu 1 mảng từ khóa bắt buộc
      count?, sample?                // essay: không chấm; sample = gợi ý gốc (hiện sau khi nộp)
    } ]
  } ]
} ]
```

## 3. Cách chấm (AnswerSheetRenderer)

- `text`/`choice`: đúng nếu chuẩn hóa (lowercase, trim) khớp `answers[i]`.
- `keywords`: đúng nếu câu học sinh chứa ĐỦ các từ khóa của câu đó.
- `essay` (`graded:false`): không tính điểm; sau khi nộp hiện `sample` (đáp án tham khảo gốc).
- Điểm = số câu đúng / tổng câu `graded:true`. Câu không chấm không vào mẫu số.

## 4. Quy trình thêm 1 Unit / 1 sách mới

1. Đọc **trang KEYS** (đáp án) của sách để lấy đáp án ngắn từng câu.
2. Đọc **trang bài** để biết section/số câu/loại + số trang (KHÔNG chép đề).
3. Điền vào `content/[slug]-answers.json` theo schema mục 2.
4. Câu mở → tự soạn `sample` (đáp án gợi ý gốc).
5. Data đọc trực tiếp bởi server action (không qua DB) → chỉ cần hard refresh để thấy.

## 5. Lưu lịch sử

`learning_sessions` với `summary_metrics.type='exam'`, `sub_type='book_practice'`,
`subject_slug` đúng môn → tự lên trang chủ + trang Phụ Huynh (các UI đó nhận diện `type='exam'`).

## 6. Nút vào tính năng

Ở `/luyen-tap/[subject]` (tab Tiếng Anh lớp 7): nút "📚 Luyện tập theo Sách bài tập"
→ `router.push('/sach-bai-tap/sbt-tienganh7')`. Thêm sách khác = thêm điều kiện tương tự.
