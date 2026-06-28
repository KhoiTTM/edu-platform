# Hướng Dẫn Kỹ Thuật: Phát Triển Tiếp Unit 5 & Unit 6 Cho IELTS Flow Book

Chào Agent tiếp theo! Nhiệm vụ của bạn là tiếp tục mở rộng tính năng **IELTS Flow Book (Học theo sách giáo trình)** bằng cách bổ sung dữ liệu và cấu hình cho hai đơn vị bài học tiếp theo: **Unit 5** và **Unit 6** của giáo trình *Mindset for IELTS Foundation*.

Dưới đây là các bước chi tiết bạn cần thực hiện:

---

## 1. Tìm hiểu vị trí sách giáo trình trực tuyến
Mã nguồn hiển thị bản quét trang sách của Unit 4 được tải trực tuyến thông qua thẻ `<iframe>` trỏ đến liên kết Flipbook:
`https://online.flipbuilder.com/sdtta/bsjh/mobile/index.html#p=[Trang_Số]`

Bạn hãy dùng trình duyệt hoặc phân tích đường dẫn này để xem nội dung giáo trình trực tuyến:
- **Unit 5 (Sports and Leisure):** Thường bắt đầu từ khoảng trang **62** trở đi.
- **Unit 6 (Science and Technology):** Thường bắt đầu từ khoảng trang **76** trở đi.
*(Hãy tự kiểm tra số trang chính xác của Unit 5 và Unit 6 bằng cách thay đổi số trang `#p=...` trên đường link để định vị đúng các trang của Unit này).*

---

## 2. Các bước triển khai

### Bước 2.1: Trích xuất và biên soạn dữ liệu bài tập tương tác
1. Tạo 2 tệp dữ liệu tĩnh mới:
   - `lib/data/unit5Data.ts`
   - `lib/data/unit6Data.ts`
2. Đọc nội dung bài tập của các trang tương ứng trên Flipbook trực tuyến, tự giải bài tập để lấy đáp án chuẩn (correct answers).
3. Biên soạn dữ liệu theo cấu trúc chuẩn `TextbookPage[]` (tương tự như cấu trúc mẫu trong `lib/data/unit4Data.ts`):
   ```typescript
   export const unit5Pages: TextbookPage[] = [
     {
       pageNumber: 62,
       imagePath: "", // Để trống vì chúng ta dùng Iframe nhúng Flipbook
       title: "Sports and leisure (Lead-in)",
       exercises: [
         {
           id: "p62-ex1",
           title: "Exercise 1: Match the sports to the pictures...",
           type: "fill-blank",
           questionText: "Match the words...",
           correctAnswers: ["football", "basketball", ...],
           placeholder: "e.g. football, basketball..."
         }
       ]
     }
   ];
   ```

### Bước 2.2: Đăng ký Router & Cấu hình Interceptor bài học
Mở file [app/(app)/learn/[subject]/[node]/page.tsx](file:///d:/Backups/Projects/edu-platform/app/%28app%29/learn/%5Bsubject%5D/%5Bnode%5D/page.tsx):
1. Import `unit5Pages` từ `@/lib/data/unit5Data` và `unit6Pages` từ `@/lib/data/unit6Data`.
2. Ánh xạ các slug buổi học (e.g. `unit-16` đến `unit-23`) với số trang bắt đầu của Unit 5 & Unit 6.
3. Bổ sung block kiểm tra điều kiện (Interceptor) để render `GenericTextbookClient` cho Unit 5 & Unit 6:
   ```typescript
   // Ví dụ cấu hình cho Unit 5
   const unit5InitialPages: Record<string, number> = {
     "unit-16": 62,
     "unit-17": 64,
     // ... điền tiếp các buổi học tiếp theo tương ứng
   };

   if (unit5InitialPages[node] !== undefined) {
     return (
       <GenericTextbookClient
         pages={unit5Pages}
         initialPage={unit5InitialPages[node]}
         backUrl={`/hoc-tap/${subject}`}
         subjectSlug={subject}
         unitTitle="Unit 5: Sports and Leisure"
       />
     );
   }
   ```

### Bước 2.3: Cập nhật bộ lọc hiển thị trên UI
Mở file [app/(app)/hoc-tap/mindset-ielts/flow-book/page.tsx](file:///d:/Backups/Projects/edu-platform/app/%28app%29/hoc-tap/mindset-ielts/flow-book/page.tsx):
- Tìm đến dòng code filter danh sách bài học (khoảng dòng 35-36):
  ```typescript
  .filter(l => ['unit-8', 'unit-9', 'unit-10', 'unit-11', 'unit-12', 'unit-13', 'unit-14', 'unit-15'].includes(l.slug));
  ```
- Bổ sung thêm các slug của Unit 5 và Unit 6 (e.g., `'unit-16'`, `'unit-17'`, ... cho đến hết các buổi học mới được cấu hình) vào mảng để cho phép các buổi học này xuất hiện trên giao diện IELTS Flow Book.

---

## 3. Xác minh kết quả
- Chạy lệnh `npm run build` để đảm bảo Next.js biên dịch hoàn tất không có lỗi kiểu dữ liệu (TypeScript compiler errors).
- Truy cập trình duyệt `http://localhost:3000/hoc-tap/mindset-ielts/flow-book` để kiểm tra các Unit mới đã hiển thị đầy đủ và tương tác mượt mà.
