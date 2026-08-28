# Nguyên tắc tạo Base Poster cho môn Practical English (Dành cho AI Agent)

Đây là tài liệu hướng dẫn thiết kế "Base Poster" (ảnh bìa nền) cho các chuyên mục bài học thuộc môn Practical English. AI Agent khi nhận yêu cầu tạo series bài học mới BẮT BUỘC phải đọc và tuân theo các quy tắc này.

## 1. Yêu cầu kỹ thuật (Specs)
- **Công cụ:** Sử dụng tool `generate_image`.
- **Tỷ lệ ảnh (AspectRatio):** BẮT BUỘC là `9:16` (khung hình dọc chuẩn YouTube Shorts / TikTok).
- **Thư mục lưu trữ:** Bất kỳ ảnh Base Poster nào sau khi tạo thành công đều phải được copy về thư mục `public/images/practical-english/` với tên dễ nhận dạng (ví dụ: `[ten-series]-base.jpg`).

## 2. Quy tắc thiết kế (Layout & Design Guidelines)
Môn học sử dụng cơ chế **Dynamic Text Overlay** (chữ động đè lên ảnh tĩnh), do đó Base Poster CHỈ LÀ ẢNH NỀN và không được phép chứa chữ cụ thể của bài học.

1. **Phần trên cùng (Top):**
   - Phải chứa TIÊU ĐỀ CỦA SERIES (ví dụ: "CORE ENGLISH GRAMMAR", "ORIGIN AND HISTORY OF...").
   - Chữ phải to, rõ, font 3D nổi bật màu vàng (bold yellow 3D text), phong cách comic.
   
2. **Phần chính giữa (Center):**
   - Vẽ một nhân vật anime: cậu bé chibi dễ thương đeo kính (chibi anime boy with glasses).
   - Đang làm một hành động liên quan đến chủ đề (cầm kính lúp, cầm bút, đứng trước bảng...).
   - Bối cảnh (Background): Tươi sáng, có yếu tố phép thuật (magical library, glowing book, magical classroom...).
   
3. **Phần dưới cùng (Bottom) - QUY TẮC CỐT LÕI QUAN TRỌNG NHẤT:**
   - Khu vực đáy của bức ảnh BẮT BUỘC PHẢI ĐỂ TRỐNG (completely empty bottom area).
   - Không được vẽ bất kỳ chữ hay ký tự nào ở khu vực này (chỉ vẽ sàn nhà, mặt bàn gỗ, hoặc background trơn).
   - **Lý do:** Giao diện Next.js sẽ tự động dùng CSS chèn biến `thumbnailText` vào khu vực này. Nếu Agent vẽ chữ lên đây, nó sẽ bị đè chữ lộn xộn.

## 3. Mẫu Prompt tham khảo (Prompt Template)

Dưới đây là công thức Prompt để gọi tool `generate_image` chuẩn xác nhất:

> "An eye-catching vertical YouTube Shorts thumbnail in vibrant comic book style. A cute chibi anime boy with glasses [Hành động: holding a magnifying glass / pointing at a board / etc.]. The background is [Bối cảnh: a dark magical library / a bright magical classroom / etc.]. At the top, big bold yellow 3D text saying '[TÊN SERIES IN HOA]'. The bottom center is left completely empty with just the [Sàn nhà/Mặt bàn], leaving room for a large text overlay later. High quality, vibrant lighting, stylized."

## 4. Cách sử dụng ảnh sau khi tạo
Sau khi chép ảnh vào `public/images/practical-english/[name]-base.jpg`, Agent cần cấu hình file `content/practical-english-lessons.json` cho các bài học thuộc series đó:
- Dùng chung 1 ảnh Base Poster cho tất cả các bài học trong series (gán path ảnh vào thuộc tính `"thumbnail"`).
- Gán nội dung riêng của từng bài vào thuộc tính `"thumbnailText"`. Không cần tạo ảnh mới cho từng bài riêng biệt!

## 5. Ngoại lệ: Tạo Poster Cụ Thể (Specific Poster) theo ảnh mẫu
Trong một số trường hợp User yêu cầu **bắt chước chính xác một ảnh mẫu (Reference Image)** có chứa sẵn nội dung cụ thể của bài học (ví dụ: `#P.1`, `#P.2`):
1. **Tool:** Sử dụng `generate_image` kết hợp thuộc tính `ImagePaths` để truyền ảnh mẫu vào.
2. **Prompt (Quy tắc lọc rác):** Yêu cầu vẽ lại chính xác bố cục, chữ 3D theo ảnh mẫu, nhưng BẮT BUỘC PHẢI dặn AI **loại bỏ hoàn toàn các watermark (ví dụ: "English with Vincent"), icon con mắt, số lượt xem** hoặc các yếu tố rác từ ảnh gốc. Đảm bảo viền và nền sạch sẽ.
3. **Lưu file:** Lưu ảnh riêng cho bài đó (ví dụ: `menh-de-quan-he-p1.jpg`) thay vì dùng hậu tố `-base.jpg`.
4. **Cập nhật JSON:** Vì chữ đã được in cứng lên hình, BẮT BUỘC phải đặt `thumbnailText: ""` (chuỗi rỗng) trong file JSON của bài học đó, nếu không chữ động của web sẽ in đè lên làm hỏng ảnh.
