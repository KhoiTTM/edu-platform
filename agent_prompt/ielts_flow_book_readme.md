# IELTS Flow Book (Học Theo Sách Giáo Trình) - Hướng Dẫn Kỹ Thuật

Tài liệu này giải thích cấu trúc mã nguồn, vị trí các tệp tài nguyên, logic định tuyến và dữ liệu cho tính năng **IELTS Flow Book (Học theo sách giáo trình)** của phân hệ IELTS Foundation.

---

## 1. Tổng quan Tính năng

* **Mục tiêu:** Giúp học sinh học trực quan lý thuyết song song với thực hành bằng cách hiển thị bản quét trang sách (Scan Book) bên trái, và bảng tương tác nhập câu trả lời/làm trắc nghiệm bên phải.
* **Đường dẫn UI:** `/hoc-tap/mindset-ielts/flow-book` (dẫn đến danh sách các buổi học).
* **Định tuyến chi tiết bài học:** `/learn/mindset-ielts/[unit-slug]` (ví dụ: `/learn/mindset-ielts/unit-8`).

---

## 2. Bản Đồ Môn Học & Các Unit Đang Hỗ Trợ

Trên giao diện, hệ thống hiển thị hỗ trợ cho **Unit 3 đến Unit 10** — toàn bộ các unit chủ đề (topical units) của giáo trình. Trong Database và Router Segments, chúng được ánh xạ dưới dạng các buổi học liên tục từ **Buổi 8 đến Buổi 35** thông qua các slug `unit-8` đến `unit-35`:

### 📖 Unit 3: Hobbies

* **Buổi 8 (slug: `unit-8`):** Vocabulary & Listening (Bắt đầu từ trang sách giáo trình: **Page 34**)
* **Buổi 9 (slug: `unit-9`):** Grammar (Bắt đầu từ trang: **Page 36**)
* **Buổi 10 (slug: `unit-10`):** Reading & Speaking (Bắt đầu từ trang: **Page 38**)
* **Buổi 11 (slug: `unit-11`):** Writing & Vocabulary (Bắt đầu từ trang: **Page 41**)

### 📖 Unit 4: Travel and Holidays

* **Buổi 12 (slug: `unit-12`):** Reading & Vocabulary (Bắt đầu từ trang sách giáo trình: **Page 48**)
* **Buổi 13 (slug: `unit-13`):** Listening & Speaking (Bắt đầu từ trang: **Page 50**)
* **Buổi 14 (slug: `unit-14`):** Grammar (Bắt đầu từ trang: **Page 53**)
* **Buổi 15 (slug: `unit-15`):** Writing (Bắt đầu từ trang: **Page 55**)

### 📖 Unit 5: Food

* **Buổi 16 (slug: `unit-16`):** Vocabulary & Listening (Bắt đầu từ trang: **Page 60**)
* **Buổi 17 (slug: `unit-17`):** Reading & Listening / Grammar (Bắt đầu từ trang: **Page 64**)
* **Buổi 18 (slug: `unit-18`):** Writing & Speaking / Grammar & Vocabulary (Bắt đầu từ trang: **Page 67**)

### 📖 Unit 6: Transport

* **Buổi 19 (slug: `unit-19`):** Vocabulary & Reading (Bắt đầu từ trang: **Page 72**)
* **Buổi 20 (slug: `unit-20`):** Listening & Grammar — Comparatives/Superlatives (Bắt đầu từ trang: **Page 75**)
* **Buổi 21 (slug: `unit-21`):** Speaking & Writing — Grammar & Vocabulary (Bắt đầu từ trang: **Page 78**)

> ⚠️ Unit 5 và Unit 6 chỉ có **3 buổi mỗi unit** (không phải 4 như Unit 3/4) — xác nhận theo dữ liệu thật trong Supabase, không suy đoán theo khuôn mẫu cũ.

### 📖 Unit 7: Jobs, Work and Study

* **Buổi 22 (slug: `unit-22`):** Vocabulary & Listening (Bắt đầu từ trang: **Page 82**)
* **Buổi 23 (slug: `unit-23`):** Grammar & Speaking — Can/Could/Couldn't (Bắt đầu từ trang: **Page 83**)
* **Buổi 24 (slug: `unit-24`):** Reading — True/False/Not Given (Bắt đầu từ trang: **Page 85**)
* **Buổi 25 (slug: `unit-25`):** Writing — Email cho Summer Job (Bắt đầu từ trang: **Page 88**)

Unit 7 có **4 buổi**. Dữ liệu `unit7Pages` còn bao gồm các trang luyện tập cuối unit (90-92, Grammar and Vocabulary practice) gộp vào entry trang 88 (buổi Writing).

### 📖 Unit 8: Health and Medicine

* **Buổi 26 (slug: `unit-26`):** Listening & Vocabulary (Bắt đầu từ trang: **Page 93**)
* **Buổi 27 (slug: `unit-27`):** Reading & Listening — Opinion Essay, Multiple-choice (Bắt đầu từ trang: **Page 95**)
* **Buổi 28 (slug: `unit-28`):** Speaking & Writing — Should/Shouldn't, Have to/Don't have to (Bắt đầu từ trang: **Page 97**)

Unit 8 có **3 buổi**.

### 📖 Unit 9: Language

* **Buổi 29 (slug: `unit-29`):** Vocabulary & Listening (Bắt đầu từ trang: **Page 104**)
* **Buổi 30 (slug: `unit-30`):** Reading & Grammar — Going to, Collocations (Bắt đầu từ trang: **Page 108**)
* **Buổi 31 (slug: `unit-31`):** Writing — Short Essay (Bắt đầu từ trang: **Page 110**)

Unit 9 có **3 buổi**.

### 📖 Unit 10: Science and Technology

* **Buổi 32 (slug: `unit-32`):** Vocabulary & Reading (Bắt đầu từ trang: **Page 115**)
* **Buổi 33 (slug: `unit-33`):** Listening & Grammar — Will for Future (Bắt đầu từ trang: **Page 118**)
* **Buổi 34 (slug: `unit-34`):** Listening & Speaking — Describing a Gadget (Bắt đầu từ trang: **Page 121**)
* **Buổi 35 (slug: `unit-35`):** Writing — Describing a Graph (Bắt đầu từ trang: **Page 120**)

Unit 10 có **4 buổi**. Đây là **unit chủ đề (topical unit) cuối cùng** của giáo trình — không còn unit nào sau Unit 10 cùng dạng nội dung textbook. OCR folder `unit_10` có chứa thêm các trang 125 ("ANSWER KEY" — đáp án toàn sách bắt đầu từ Unit 1), 132 ("LISTENING SCRIPTS"), 137/138 (lời cảm ơn tác giả + bìa sách) — đây **không phải nội dung Unit 10**, đã bị loại bỏ khỏi `unit10Data.ts`.

### 🔚 unit-36: Review & Final Assessment (khác loại, chưa/không triển khai Flow Book)

`unit-36` trong DB có tiêu đề "Buổi 36: Review & Final Assessment" — đây là buổi ôn tập/đánh giá tổng kết, **không gắn với trang sách giáo trình cụ thể** như các unit 3-10. Vì bản chất khác (không phải nội dung textbook tuyến tính để hiển thị Flow Book), `unit-36` **chưa được đưa vào** mảng filter của `flow-book/page.tsx` và chưa có router intercept. Nếu cần hỗ trợ buổi ôn tập này, đó là một loại tính năng khác (vd. tổng hợp bài tập từ nhiều unit, hoặc bài kiểm tra cuối kỳ) — không áp dụng quy trình "đọc OCR theo trang" ở mục 5/6 dưới đây.

---

## 3. Cấu trúc Source Code & Cốt Lõi Tính Năng

### 📁 1. Router & Page Logic

* **Trang danh sách buổi học:** [app/(app)/hoc-tap/mindset-ielts/flow-book/page.tsx](../app/(app)/hoc-tap/mindset-ielts/flow-book/page.tsx)
  * Truy vấn danh sách bài học từ table `curriculum_nodes` thuộc `source_id` của IELTS (`slug = 'mindset-foundation'`, id thật: `f4c8940e-a3f6-43cd-afc6-04a714f5aca4`).
  * Lọc các node theo mảng slug cứng (hiện tại: `unit-8` đến `unit-35`, KHÔNG bao gồm `unit-36` — xem mục 2 phần "unit-36"). Mảng này phải được mở rộng thủ công mỗi khi thêm unit mới.
* **Trang hiển thị bài học tương tác:** [app/(app)/learn/[subject]/[node]/page.tsx](../app/(app)/learn/[subject]/[node]/page.tsx)
  * Đọc tham số `node` (e.g. `unit-8`).
  * Chặn kiểm tra (Intercept), theo thứ tự:
    * `unit-8` → `unit-11` (Unit 3): Render `<Unit3TextbookClient />` (ảnh scan thật).
    * `unit-12` → `unit-15` (Unit 4): Render `<GenericTextbookClient pages={unit4Pages} />` (iframe flipbook).
    * `unit-16` → `unit-18` (Unit 5): Render `<GenericTextbookClient pages={unit5Pages} />` (iframe flipbook).
    * `unit-19` → `unit-21` (Unit 6): Render `<GenericTextbookClient pages={unit6Pages} />` (iframe flipbook).
    * `unit-22` → `unit-25` (Unit 7): Render `<GenericTextbookClient pages={unit7Pages} />` (iframe flipbook).
    * `unit-26` → `unit-28` (Unit 8): Render `<GenericTextbookClient pages={unit8Pages} />` (iframe flipbook).
    * `unit-29` → `unit-31` (Unit 9): Render `<GenericTextbookClient pages={unit9Pages} />` (iframe flipbook).
    * `unit-32` → `unit-35` (Unit 10): Render `<GenericTextbookClient pages={unit10Pages} />` (iframe flipbook).
    * Mặc định (không khớp, bao gồm `unit-36`): render `<LearnNodeClient />` (luồng học Universal Learning Engine thông thường).

### 📁 2. UI Components

* **Unit 3 Viewer:** [components/Unit3TextbookClient.tsx](../components/Unit3TextbookClient.tsx)
  * Hiển thị Layout Split chia 60% bên trái (ảnh scan trang sách giáo trình thật, hỗ trợ Zoom In/Out) và 40% bên phải (câu hỏi bài tập tương tác, kiểm tra đáp án, phát âm thanh bài nghe).
* **Unit 4-10 Viewer:** [components/GenericTextbookClient.tsx](../components/GenericTextbookClient.tsx)
  * Component tổng quát, nhận `pages: TextbookPage[]` qua props.
  * **Quan trọng:** Component này render bản quét sách bằng `<iframe src="https://online.flipbuilder.com/sdtta/bsjh/mobile/index.html#p={pageNumber}">`, **KHÔNG đọc field `imagePath`**. Field `imagePath` trong các file `unitNData.ts` (N≥4) chỉ giữ để tương thích interface, luôn để chuỗi rỗng `""`. Chỉ `pageNumber` mới có tác dụng (quyết định trang nào hiện trên flipbook online).

### 📁 3. Dữ Liệu Tĩnh & Asset Paths (Hình ảnh, Âm thanh)

* **Dữ liệu Unit 3:** [lib/data/unit3Data.ts](../lib/data/unit3Data.ts)
  * Bản quét trang sách: ảnh thật tại `public/book/mindset-foundation/unit_3/page_035.png`...
  * Audio: CDN ngoài (`https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/T4S1.m4a`).
* **Dữ liệu Unit 4:** [lib/data/unit4Data.ts](../lib/data/unit4Data.ts) — `imagePath` không dùng (xem trên). Audio: `T4S2.m4a`.
* **Dữ liệu Unit 5:** [lib/data/unit5Data.ts](../lib/data/unit5Data.ts) — `imagePath` không dùng. Tái dùng audio `T4S1.m4a` làm placeholder (chưa có audio thật riêng cho Unit 5).
* **Dữ liệu Unit 6:** [lib/data/unit6Data.ts](../lib/data/unit6Data.ts) — `imagePath` không dùng. Tái dùng audio `T4S2.m4a` làm placeholder (chưa có audio thật riêng cho Unit 6).
* **Dữ liệu Unit 7:** [lib/data/unit7Data.ts](../lib/data/unit7Data.ts) — `imagePath` không dùng. Trang 82 (Listening) có `youtubeId: "jsjIWseiTfM"` (video thật) — `audioUrl: T4S1.m4a` vẫn giữ lại trong data nhưng không còn được render (xem field `youtubeId` ngay dưới).
* **Dữ liệu Unit 8:** [lib/data/unit8Data.ts](../lib/data/unit8Data.ts) — `imagePath` không dùng. Trang 93 có `youtubeId: "SPurU5V7pxw"`, trang 99 có `youtubeId: "mWPZhFuPkF0"` — cả hai là video thật, audio cũ (`T4S1.m4a`/`T4S2.m4a`) vẫn còn trong field `audioUrl` nhưng không render khi có `youtubeId`.
* **Dữ liệu Unit 9:** [lib/data/unit9Data.ts](../lib/data/unit9Data.ts) — `imagePath` không dùng. **Chưa có `youtubeId`** — tái dùng audio `T4S1.m4a` placeholder cho Listening (Sofia & Oliver discussing language project). Lý do: DB slug `unit-29`/`unit-30` (buổi Listening của Unit 9) chưa có `metadata.youtube_id` nào được gán trong bảng `curriculum_nodes` — đây là 2 buổi duy nhất trong toàn bộ Unit 1-10 còn thiếu video thật ở cả 2 hệ thống (Listening feature riêng VÀ Flow Book).
* **Dữ liệu Unit 10:** [lib/data/unit10Data.ts](../lib/data/unit10Data.ts) — `imagePath` không dùng. Trang 118 có `youtubeId: "wr8M6uUzHnY"`, trang 121 có `youtubeId: "ZN_why11kpc"` — cả hai là video thật.
* Mỗi file `unitNData.ts` (N≥4) tự khai báo lại interface `Exercise`/`TextbookPage` riêng (không import lẫn nhau) — đây là convention đã thiết lập từ `unit4Data.ts`, giữ nguyên khi tạo unit mới.
* **Quan trọng:** số lượng entry trong mảng `unitNPages` KHÔNG nhất thiết bằng số buổi (sessions) của unit đó trong DB — một buổi (slug) có thể trải nhiều trang sách liên tiếp. Router intercept chỉ cần map mỗi slug tới ĐÚNG MỘT `pageNumber` đại diện (thường là trang đầu của block kỹ năng đó); các trang còn lại trong mảng vẫn hiển thị được nếu người dùng chuyển trang trong flipbook viewer.

### 📁 3b. Field `youtubeId` — video YouTube thật, thay thế audio giả khi có

**Bổ sung sau khi phát hiện tính năng Listening riêng (`/listening/[id]`) đã có sẵn video YouTube thật cho hầu hết Unit 1-10.** `TextbookPage` (khai báo trong mỗi `unitNData.ts`, N≥3) có field tùy chọn `youtubeId?: string`. Trong [GenericTextbookClient.tsx](../components/GenericTextbookClient.tsx), nếu `activePage.youtubeId` tồn tại, component render `<iframe>` nhúng `https://www.youtube-nocookie.com/embed/{youtubeId}` (cùng pattern với [components/YouTubeEmbed.tsx](../components/YouTubeEmbed.tsx), viết trực tiếp vì component đó dùng theme sáng còn `GenericTextbookClient` theme tối) — khối `<audio src={audioUrl}>` cũ chỉ còn render khi **không có** `youtubeId` (fallback).

**Nguồn các video ID thật:** Toàn bộ video YouTube cho Unit 1-10 đã được gán từ trước bởi một tính năng khác — "Listening" (`/hoc-tap/mindset-ielts/listening` → `/listening/[id]`) — KHÔNG do agent Flow Book tạo ra. Video ID nằm trong `curriculum_nodes.metadata.youtube_id` của các slug `unit-N` tương ứng, và transcript song ngữ tương ứng nằm trong [lib/ieltsTranscripts.ts](../lib/ieltsTranscripts.ts) (key = video ID). Khi gắn `youtubeId` vào một trang Flow Book, **luôn lấy từ `metadata.youtube_id` thật trong DB của đúng slug đó** (xem cách query ở mục 5), không tự đoán hoặc tái dùng video của buổi khác.

**Bản đồ đầy đủ đã xác nhận trong DB** (slug → youtube_id; trống nghĩa là chưa có video thật):

| Unit | Slug có video | youtube_id | Trang Flow Book đã gắn |
|---|---|---|---|
| 7 | `unit-22` | `jsjIWseiTfM` | 82 |
| 8 | `unit-26` | `SPurU5V7pxw` | 93 |
| 8 | `unit-27` | `mWPZhFuPkF0` | 99 |
| 9 | *(không có)* | — | Chưa gắn được — `unit-29`/`unit-30` chưa có `youtube_id` trong DB |
| 10 | `unit-33` | `wr8M6uUzHnY` | 118 |
| 10 | `unit-34` | `ZN_why11kpc` | 121 |

Unit 3-6 cũng có video thật tương ứng trong DB (`unit-8`→`gzoYfpWvh7Q`, `unit-13`→`rkOatFNUGt4`, `unit-16`→có, `unit-17`→`WnqLsvQuwZk`, `unit-20`→`_f8Ciy-r8bM`) nhưng **CHƯA được gắn vào `unitNData.ts` của các unit đó** — chỉ Unit 7/8/10 đã được gắn trong phiên làm việc tạo field này. Nếu cần làm tiếp, lặp lại quy trình: tra `metadata.youtube_id` của slug đó trong DB → tìm entry trang tương ứng trong `unitNData.ts` (N=3..6) → thêm field `youtubeId` vào đúng entry đó.

### 📁 4. Nguồn dữ liệu thật để soạn bài (page numbers + nội dung)

Dự án sibling **`convert_pdf_json`** (`/home/khoittm/projects/convert_pdf_json`) chứa OCR từng trang sách dưới dạng JSON tại:

```text
output/json/mindset-for-ielts-foundation/unit_0N/page_0NN.json
```

Mỗi file có dạng `{"page": N, "content": "...text OCR thô..."}`. Đây là nguồn đáng tin cậy nhất để xác định số trang thật và nội dung bài tập — **đáng tin hơn các file trong `agent_prompt/` nếu có xung đột**, vì agent_prompt là tài liệu do agent trước soạn và có thể chứa suy đoán sai (xem mục cảnh báo bên dưới).

> ⚠️ **Lỗi OCR lệch ranh giới 1 trang (đã xác nhận hệ thống, 5/5 lần chuyển unit liên tiếp):** Trang cuối của một folder `unit_0N` LUÔN thuộc về unit kế tiếp (trang tổng quan/intro "IN THIS UNIT YOU WILL LEARN HOW TO..." của unit N+1). Đã xác nhận tại: `unit_05/page_071` → intro Unit 6, `unit_06/page_081` → intro Unit 7, `unit_07/page_093` → intro Unit 8, `unit_08/page_104` → intro Unit 9, `unit_09/page_115` → intro Unit 10. Đây là quy luật ổn định của cách OCR project chia folder, không phải trùng hợp — khi gặp unit mới, **luôn trừ 1 trang** khi tìm "trang cuối thật" của folder hiện tại, và đọc trực tiếp field `content` để xác nhận, không suy đoán từ tên folder.
>
> ⚠️ **OCR folder có thể chứa trang KHÔNG thuộc nội dung unit (back-matter):** folder `unit_10` (folder cuối cùng) có thêm các trang 125 ("ANSWER KEY" — đáp án toàn sách từ Unit 1), 132 ("LISTENING SCRIPTS"), 137-138 (lời cảm ơn + bìa sách) lẫn vào sau trang nội dung thật (115-124). Luôn đọc preview nội dung của MỌI trang trong folder, không giả định toàn bộ file trong folder đều là nội dung unit.
>
> ⚠️ **`sort_key` trong `curriculum_nodes` KHÔNG độc quyền cho IELTS Foundation:** dải `sort_key` 22-45 (và có thể các dải khác) bị chia sẻ/xen kẽ với một giáo trình hoàn toàn khác — "Luyện Nghe Tiếng Anh A2/A1" (shadowing), có slug dạng `luyen-nghe-a2-<id>` và `metadata.skill_focus = "shadowing"`. Khi query theo `sort_key` range, LUÔN lọc thêm theo `slug` khớp pattern `unit-N` (hoặc kiểm tra `source_id` đúng `f4c8940e-a3f6-43cd-afc6-04a714f5aca4`), KHÔNG dùng `sort_key` range làm điều kiện lọc duy nhất.

---

## 4. Cảnh báo: Độ tin cậy của tài liệu trong `agent_prompt/`

File `agent_prompt/implement_unit5_6_flow_book_prompt.md` (phiên bản cũ, nay đã ghi đè bằng [implement_next_unit_flow_book_prompt.md](implement_next_unit_flow_book_prompt.md)) từng chứa thông tin **sai**: claim Unit 5 = "Sports and Leisure" (~trang 62), Unit 6 = "Science and Technology" (~trang 76), 4 buổi/unit. Thực tế theo DB: Unit 5 = Food, Unit 6 = Transport, chỉ 3 buổi/unit, trang bắt đầu 60/72.

**Nguyên tắc khi đọc agent_prompt:** luôn đối chiếu với 2 nguồn xác thực trước khi tin theo nội dung trong các file hướng dẫn này:

1. Supabase `curriculum_nodes` (truy vấn REST trực tiếp — xem mục 5).
2. `UNIT_LABELS` trong [app/(app)/hoc-tap/mindset-ielts/page.tsx](../app/(app)/hoc-tap/mindset-ielts/page.tsx).

Nếu agent_prompt mâu thuẫn với 2 nguồn trên, **tin theo DB/code thật**, không tin theo agent_prompt.

---

## 5. Cách truy vấn DB khi Node 20 WebSocket lỗi

Trong môi trường này, khởi tạo `@supabase/supabase-js` client đầy đủ (kể cả chỉ để đọc) có thể lỗi `Node.js 20 detected without native WebSocket support` từ `@supabase/realtime-js`. Cách né: gọi trực tiếp REST PostgREST endpoint bằng `curl`:

```bash
SUPABASE_URL=$(grep "^NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d= -f2- | tr -d '"')
SUPABASE_KEY=$(grep "^SUPABASE_SERVICE_ROLE_KEY=" .env.local | cut -d= -f2- | tr -d '"')

# content_sources.id của mindset-foundation: f4c8940e-a3f6-43cd-afc6-04a714f5aca4 (đã biết, không cần query lại)
curl -s "${SUPABASE_URL}/rest/v1/curriculum_nodes?source_id=eq.f4c8940e-a3f6-43cd-afc6-04a714f5aca4&type=eq.unit&select=title,slug,sort_key,metadata->>skill_focus,metadata->>page_hint&order=sort_key.asc" \
  -H "apikey: ${SUPABASE_KEY}" -H "Authorization: Bearer ${SUPABASE_KEY}"
```

---

## 6. Hướng dẫn cho Agent sau tiếp tục chỉnh sửa & mở rộng

**Trạng thái hiện tại: Unit 3 đến Unit 10 (toàn bộ các unit chủ đề/topical units của giáo trình) đã triển khai đầy đủ Flow Book.** Không còn unit chủ đề nào tiếp theo — Unit 10 (Science and Technology, `unit-32`..`unit-35`) là unit cuối cùng dạng này. Sau `unit-35`, DB chỉ còn `unit-36: Review & Final Assessment`, một loại nội dung khác (ôn tập/đánh giá tổng kết, không gắn với trang sách cụ thể) — xem mục 2 phần "unit-36" để biết lý do KHÔNG áp dụng quy trình này cho nó.

Vì vậy, **không có "unit tiếp theo" theo nghĩa cũ** để làm. Nếu agent sau được yêu cầu mở rộng thêm, các hướng khả dĩ là:

* Hỗ trợ `unit-36` (Review & Final Assessment) — nhưng cần thiết kế khác (không phải đọc OCR theo trang tuyến tính), nên hỏi lại người dùng về cách tiếp cận trước khi bắt đầu.
* Gắn `youtubeId` thật cho Unit 3-6 (đã có video trong DB nhưng chưa gắn vào `unitNData.ts` — xem bảng ở mục 3b).
* Gán `metadata.youtube_id` cho `unit-29`/`unit-30` (Unit 9 Listening) trong DB nếu có video thật, rồi gắn `youtubeId` tương ứng vào `unit9Data.ts` — đây là buổi duy nhất còn thiếu video thật ở cả 2 hệ thống (Listening riêng và Flow Book).
* Viết lại các câu hỏi "Open listening/speaking practice" còn placeholder ở Unit 5-9 dựa trên nội dung thật của video YouTube đã gắn (nay có thể nghe trực tiếp qua iframe trong Flow Book để biết đáp án chính xác, không cần audio CDN cũ nữa).

File [implement_next_unit_flow_book_prompt.md](implement_next_unit_flow_book_prompt.md) vẫn giữ nguyên giá trị làm **quy trình mẫu** (5 bước: query DB → đọc OCR → soạn data file → thêm intercept → mở rộng filter → build) cho bất kỳ unit/nội dung tương tự nào trong tương lai, nhưng phần "Unit tiếp theo cần triển khai" ở mục 1 của file đó nay đã lỗi thời (không còn Unit 7/8 nào để làm) — đọc quy trình ở mục 2 trở đi, bỏ qua mục 1.
