# Môn học Practical English (PE)

Môn học `Practical English` là một chuyên mục đặc biệt nằm trong tính năng **Học tập**, được thiết kế chủ yếu dưới dạng các bài học video ngắn dọc (như YouTube Shorts / TikTok Reels). Môn học này nhằm giúp học sinh tiếp thu kiến thức Tiếng Anh thực tế thông qua các nội dung sinh động.

## Kiến trúc Dữ liệu

Dữ liệu của môn học không lưu trong cơ sở dữ liệu Supabase mà được cấu hình tĩnh thông qua file JSON tại:
`content/practical-english-lessons.json`

Giao diện danh sách bài học và chi tiết bài học nằm tại:
- `app/(app)/(learning)/hoc-tap/practical-english/page.tsx`
- `app/(app)/(learning)/hoc-tap/practical-english/[lessonSlug]/page.tsx`

### Cấu trúc JSON của một bài học

```json
{
  "id": "lesson-10",
  "group": "Core English Grammar",
  "slug": "bai-10-core-grammar-ed-ing",
  "title": "Tính từ -ED và -ING",
  "description": "Ngữ pháp cốt lõi: Phân biệt cách dùng tính từ đuôi -ED và đuôi -ING.",
  "videoUrl": "https://drive.google.com/file/d/VIDEO_ID/preview",
  "aspectRatio": "vertical",
  "thumbnail": "/images/practical-english/core-grammar-base.jpg",
  "thumbnailText": "-ED / -ING"
}
```

## Các tính năng đặc biệt (UI Features)

1. **Gom nhóm bài học (Grouping):**
   - Giao diện danh sách sẽ tự động đọc thuộc tính `"group"` (ví dụ: `Origin and History` hoặc `Core English Grammar`) và gom tất cả các bài học có cùng Group lại với nhau thành từng khu vực hiển thị.

2. **Poster tự động đè chữ (Dynamic Text Overlay):**
   - Thay vì phải thiết kế một ảnh Thumbnail mới hoàn toàn bằng Photoshop/AI mỗi khi thêm bài học, môn học này sử dụng cơ chế đè chữ bằng CSS trực tiếp trên web.
   - Trường `"thumbnail"` sẽ trỏ tới một ảnh nền gốc (Base Poster).
   - Trường `"thumbnailText"` chứa nội dung chữ ngắn gọn (như `AS`, `OFF`, `-ED / -ING`). Giao diện trang web sẽ render đoạn text này bằng font chữ lớn, màu trắng có viền và bóng đổ đen nổi bật (comic style) đè lên vùng trống phía dưới của bức ảnh gốc.

## Hướng dẫn Thêm bài học mới (Workflow)

Quy trình chuẩn để đội ngũ quản lý nội dung thêm một bài học mới vào môn học này như sau:

**Bước 1: Chuẩn bị Video**
- Có thể dùng video quay sẵn hoặc dùng script `yt-dlp` tải video từ các nền tảng như Facebook Reels về máy tính.

**Bước 2: Upload Video lên Google Drive**
- Upload file video `.mp4` lên thư mục Google Drive.
- Bật chia sẻ chia sẻ tệp với quyền **"Bất kỳ ai có liên kết"** (Anyone with the link).
- Lấy đường dẫn chia sẻ (thường có dạng `https://drive.google.com/file/d/VIDEO_ID/view...`).

**Bước 3: Chuyển đổi link nhúng iframe**
- Bắt buộc phải thay đổi đoạn `/view...` ở cuối link Google Drive thành `/preview`. Link này sẽ được iframe trên web tự động nhận diện và phát đúng chuẩn video.

**Bước 4: Cập nhật JSON**
- Mở file `content/practical-english-lessons.json`.
- Copy một object bài học cũ và dán nối tiếp xuống dưới cùng.
- Sửa lại các thông tin: `id`, `slug`, `title`, `description`, `videoUrl` (điền link `/preview`), `group`, và đặc biệt là cụm từ muốn in lên hình vào trường `thumbnailText`.
- Sau khi save, giao diện web sẽ tự động sinh bài mới.

*(Lưu ý mở rộng: Nếu muốn thêm một Series / Chủ đề bài học hoàn toàn mới, bạn có thể thiết kế thêm một bức "Base Poster" mới (để chừa vùng không gian ở dưới cho chữ) và lưu vào `public/images/practical-english/`, sau đó trỏ đường dẫn `"thumbnail"` vào hình mới này).*
