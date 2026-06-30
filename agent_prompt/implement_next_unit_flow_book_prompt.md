# Hướng Dẫn Kỹ Thuật: Phát Triển Tiếp Unit Mới Cho IELTS Flow Book

Chào Agent tiếp theo! Nhiệm vụ của bạn là mở rộng tính năng **IELTS Flow Book (Học theo sách giáo trình)** bằng cách bổ sung dữ liệu và cấu hình cho unit tiếp theo của giáo trình *Mindset for IELTS Foundation*. Đọc kỹ [ielts_flow_book_readme.md](ielts_flow_book_readme.md) trước — đặc biệt mục 4 (cảnh báo độ tin cậy tài liệu) và mục 5 (cách truy vấn DB) — vì các bước dưới đây phụ thuộc vào đó.

> ⚠️ Phiên bản trước của file này (`implement_unit5_6_flow_book_prompt.md`) chứa thông tin **sai** về chủ đề và số trang của Unit 5/6 (claim Sports/Tech, trong khi DB thật là Food/Transport). Bài học rút ra: **không suy đoán hoặc dùng kiến thức huấn luyện về sách giáo trình — luôn lấy số liệu từ DB thật và OCR thật**, theo đúng quy trình ở mục 2 dưới đây.

---

## 1. ĐÃ HOÀN THÀNH — Unit 3 đến Unit 10 (không còn "unit tiếp theo" dạng textbook)

> ⚠️ **Mục này đã lỗi thời theo nghĩa gốc.** Khi file này được soạn lần đầu, Unit 7 (Jobs) là unit tiếp theo cần làm. Tại thời điểm cập nhật này, **Unit 7, 8, 9 và 10 đã được triển khai xong** (xem [ielts_flow_book_readme.md](ielts_flow_book_readme.md) mục 2 để biết chi tiết từng buổi/trang). Unit 10 (Science and Technology, `unit-32`..`unit-35`) là **unit chủ đề cuối cùng** của giáo trình — không còn unit nào sau đó cùng dạng nội dung textbook tuyến tính.
>
> Sau `unit-35`, DB chỉ còn `unit-36: Review & Final Assessment` — một buổi ôn tập/đánh giá tổng kết, KHÔNG gắn với trang sách giáo trình cụ thể như Unit 3-10. Áp dụng quy trình "đọc OCR theo trang → soạn `unitNData.ts`" ở mục 2 dưới đây **không phù hợp** cho `unit-36`, vì nó không có một range trang sách cố định để map vào. Nếu được yêu cầu triển khai `unit-36`, nên hỏi lại người dùng về cách tiếp cận mong muốn (vd. tổng hợp lại câu hỏi từ các unit trước, hay một dạng bài kiểm tra riêng) trước khi bắt đầu, vì đây là một loại tính năng khác, không phải "unit kế tiếp" theo khuôn mẫu cũ.
>
> **Phần còn lại của file này (mục 2 trở đi) vẫn là quy trình mẫu hợp lệ** — giữ nguyên giá trị tham khảo cho bất kỳ unit/nội dung tương tự nào cần thêm trong tương lai (ví dụ nếu phát hiện giáo trình có thêm unit chủ đề mới, hoặc cần áp dụng pattern này cho một giáo trình IELTS khác). Chỉ riêng mục 1 (danh sách "unit tiếp theo") là không còn áp dụng được trực tiếp.

Lịch sử (để tham khảo cách lập luận, không còn là việc cần làm): Unit 7 có 4 buổi (`unit-22` Vocabulary & Listening, `unit-23` Grammar & Speaking, `unit-24` Reading, `unit-25` Writing), bắt đầu thật từ trang 82 (trang 81 là trang tổng quan/lead-in của unit, đã lệch vào cuối folder `unit_06/page_081.json` theo quy luật lệch 1 trang). Unit 8 (Health) có 3 buổi từ `unit-26`, bắt đầu trang 93. Unit 9 (Language) có 3 buổi từ `unit-29`, bắt đầu trang 104. Unit 10 (Tech) có 4 buổi từ `unit-32`, bắt đầu trang 115, kết thúc trang 124 (trang 125 trở đi trong folder `unit_10/` là Answer Key/Listening Scripts/bìa sách — không phải nội dung unit).

---

## 2. Quy trình triển khai (đã verify hoạt động tốt qua Unit 5/6)

### Bước 2.1: Xác nhận chủ đề & số buổi thật từ Supabase

Đừng tin số liệu ở mục 1 trên mà không kiểm tra lại — DB là nguồn duy nhất đáng tin. Dùng REST trực tiếp (client JS có thể lỗi WebSocket trên Node 20, xem README mục 5):

```bash
SUPABASE_URL=$(grep "^NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d= -f2- | tr -d '"')
SUPABASE_KEY=$(grep "^SUPABASE_SERVICE_ROLE_KEY=" .env.local | cut -d= -f2- | tr -d '"')

curl -s "${SUPABASE_URL}/rest/v1/curriculum_nodes?source_id=eq.f4c8940e-a3f6-43cd-afc6-04a714f5aca4&slug=in.(unit-22,unit-23,unit-24,unit-25,unit-26)&select=title,slug,sort_key,metadata" \
  -H "apikey: ${SUPABASE_KEY}" -H "Authorization: Bearer ${SUPABASE_KEY}" | python3 -m json.tool
```

Ghi lại: tên unit/chủ đề thật (field `title`, dạng `"Buổi N: UX - <Topic> (<Skill focus>)"`), và đúng bao nhiêu buổi thuộc unit đó (dừng lại khi `title` đổi sang `UX+1`).

### Bước 2.2: Tìm trang thật & nội dung thật trong `convert_pdf_json`

```bash
find /home/khoittm/projects/convert_pdf_json/output/json/mindset-for-ielts-foundation -ipath "*unit_07*" | sort
```

Đọc **nội dung thật** (`content` field) của vài trang đầu/cuối — đừng tin tên folder. Lỗi lệch ranh giới 1 trang đã xảy ra ở cả Unit 5→6 và Unit 6→7 (trang cuối của 1 folder thường đã là trang mở đầu unit kế). Tìm đúng trang có in tiêu đề `"UNIT /0N: <TOPIC>"` để xác định điểm bắt đầu thật.

Đọc toàn bộ nội dung các trang trong phạm vi unit để hiểu cấu trúc bài tập (thường theo block kỹ năng: "VOCABULARY AND READING", "GRAMMAR AND SPEAKING", "LISTENING", "SPEAKING", "WRITING") — đây là cơ sở để chia trang thành đúng số buổi xác định ở Bước 2.1.

### Bước 2.3: Soạn file dữ liệu `lib/data/unit7Data.ts`

Theo đúng mẫu của `lib/data/unit5Data.ts` / `lib/data/unit6Data.ts` (không phải `unit4Data.ts` về convention import — mỗi file tự khai báo `Exercise`/`TextbookPage` riêng, không import lẫn nhau):

```typescript
export interface Exercise {
  id: string;
  title: string;
  type: "matching" | "multiple-choice" | "fill-blank" | "table-matching" | "text-area" | "grammar-table";
  questionText: string;
  options?: string[];
  correctAnswers: string[];
  placeholder?: string;
}

export interface TextbookPage {
  pageNumber: number;
  imagePath: string; // Keep for interface compatibility, though we render flipbook iframe
  title: string;
  exercises: Exercise[];
  audioUrl?: string;
}

export const unit7Pages: TextbookPage[] = [
  {
    pageNumber: 81, // số trang thật xác nhận ở Bước 2.2, KHÔNG suy đoán
    imagePath: "", // luôn để trống — GenericTextbookClient render qua iframe theo pageNumber, không đọc imagePath
    title: "Jobs (Vocabulary & Listening)",
    exercises: [
      // soạn từ nội dung OCR thật đọc được ở Bước 2.2, không bịa đặt câu hỏi/đáp án
    ]
  }
  // ... một entry cho mỗi buổi xác định ở Bước 2.1
];
```

Mỗi `pageNumber` tương ứng với 1 buổi học (1 entry = 1 session), không phải 1 trang sách vật lý — một buổi có thể gộp nội dung từ nhiều trang sách liên tiếp vào 1 entry (xem cách `unit5Data.ts`/`unit6Data.ts` gộp 3-4 trang sách/buổi).

### Bước 2.4: Đăng ký Router & Cấu hình Interceptor

Mở [app/(app)/learn/[subject]/[node]/page.tsx](../app/(app)/learn/[subject]/[node]/page.tsx):

1. Import `unit7Pages` từ `@/lib/data/unit7Data`.
2. Thêm block intercept theo đúng vị trí (sau block Unit 6, trước `return (...)` cuối cùng):

```typescript
// Intercept Unit 7 (Jobs)
const unit7InitialPages: Record<string, number> = {
  "unit-22": 81, // điền số trang thật xác nhận ở Bước 2.1-2.2
  "unit-23": 0,  // ...
  "unit-24": 0,
  "unit-25": 0
};

if (unit7InitialPages[node] !== undefined) {
  return (
    <GenericTextbookClient
      pages={unit7Pages}
      initialPage={unit7InitialPages[node]}
      backUrl={`/hoc-tap/${subject}`}
      subjectSlug={subject}
      unitTitle="Unit 7: Jobs, Work and Study"
    />
  );
}
```

### Bước 2.5: Cập nhật bộ lọc hiển thị trên UI

Mở [app/(app)/hoc-tap/mindset-ielts/flow-book/page.tsx](../app/(app)/hoc-tap/mindset-ielts/flow-book/page.tsx), tìm mảng filter slug (gần dòng cuối phần `.filter(...)`), thêm các slug mới (`'unit-22'`, `'unit-23'`, `'unit-24'`, `'unit-25'`) vào mảng hiện có — **không xóa các slug Unit 3-6 đã có**.

---

## 3. Xác minh kết quả

* Chạy `npm run build` để đảm bảo không có lỗi TypeScript. Build phải pass sạch (warning ESLint về `<img>`/hooks ở các file không liên quan là bình thường, không phải lỗi chặn build).
* Nếu có thể chạy dev server, truy cập `/hoc-tap/mindset-ielts/flow-book` để kiểm tra card mới hiện ra, và `/learn/mindset-ielts/unit-22` (hoặc slug tương ứng) để kiểm tra iframe load đúng trang flipbook + bài tập tương tác hiển thị đúng.
* Sau khi xong, cập nhật mục 2 và 6 trong [ielts_flow_book_readme.md](ielts_flow_book_readme.md) với thông tin unit thật vừa làm (giống cách Unit 5-10 đã được thêm vào), và cập nhật mục 1 của file này nếu có một unit/nội dung mới cần triển khai tiếp theo (tính đến thời điểm Unit 10 hoàn thành, không còn unit chủ đề nào nữa — xem cảnh báo ở đầu mục 1).
