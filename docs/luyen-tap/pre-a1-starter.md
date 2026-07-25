# Luyện tập — Pre A1 Starter

> Đọc `docs/exam_bank.md` trước (quy tắc chung: schema DB, quy trình seed, luật cứng) — file
> này chỉ ghi phần **đặc thù riêng của môn này**. Không lặp lại quy tắc chung ở đây; nếu quy
> tắc chung thay đổi, sửa ở `exam_bank.md`, không sửa từng file môn.

## 1. Thông tin nhận diện trong DB

- `subject_slug`: `pre-a1-starter`
- `grade`: `3` (dùng chung khối lớp tiểu học, không phải lớp 3 theo nghĩa SGK)
- `volume`: không dùng để chia tập
- Format dữ liệu (xem `exam_bank.md` mục 7): **Format 3 — Luyện kỹ năng cắt ngang** (không
  gắn 1 concept/unit cụ thể, tổ chức theo `exam_type` chuyên biệt, `units` dùng số ảo).

## 2. Trạng thái hiện tại (cập nhật 2026-07-24)

- **8 collections**: `exam_type: reflex` (3), `listening` (2), `lesson` (2), `review` (1).
- Dữ liệu từ vựng lõi: 280 từ (đã bao gồm 100% từ vựng Tiếng Anh 3 Global Success và Pre A1 Starters) — định nghĩa tại `lib/data/startersVocabulary.ts`.
- Các nhóm collection theo tên hiển thị:
  1. **"Wordlist"** (`exam_type: lesson`, `units: [1]`) — luyện theo bài học, 20 đề × 20 câu,
     bao quát 100% từ vựng (400 câu nạp tĩnh). Nguồn:
     `content/exam-bank/tieng-anh/starters-wordlist-pilot.json`.
  2. **"Wordlist"** (`exam_type: reflex`, `units: [99]`) — luyện phản xạ nhanh Level 1 (có timer, thu
     gọn/mở rộng). Nguồn: `content/exam-bank/tieng-anh/pre-a1-starter-wordlist-reflex.json`,
     `pre-a1-starter-wordlist-reflex-batch2.json`.
  3. **"Wordlist Level 2"** (`exam_type: reflex`, `units: [100]`) — phản xạ nâng cao Level 2, 20 đề × 20 câu
     (400 câu). Mix từ vựng khó hơn (ngữ cảnh câu, phân loại, spelling) + nghe câu ngắn (mp3 tĩnh).
     Nguồn: `content/exam-bank/tieng-anh/starters-wordlist-reflex-level2.json`.
     Script sinh đề: `scripts/generate-wordlist-level2.ts` (seeded RNG = reproducible).
  4. **"Luyện nghe Level 2"** (`exam_type: listening`, `units: [3]`) — luyện nghe câu đơn với mp3 tĩnh, 20 đề × 15 câu (300 câu).
     Nguồn: `content/exam-bank/pre-a1-listening-level2-exams.json`.
  5. **"Luyện nghe Level 3"** (`exam_type: listening`, `units: [4]`) — luyện nghe hội thoại ngắn phân vai với mp3 tĩnh, **20 đề × 20 câu (400 câu)**. Phân bổ lặp lại (mỗi câu ~2.05 lần,
     không trùng trong cùng 1 đề) từ **195 câu hội thoại unique** có audio thật, chủ đề bám
     đủ 11 chủ đề của wordlist (My Body, At the Zoo, Clothes Shop, Colours, Birthday, Food,
     At Home, At School, At the Beach, My Street, TA3 Extra) — xem mục 5 (2026-07-25).
     Nguồn: `content/exam-bank/pre-a1-listening-level3-exams.json` (đã ghi đè phiên bản
     10 đề cũ; backup 63 câu gốc tại `pre-a1-listening-level3-exams-10de-BACKUP.json`).
     Script sinh câu mới: `scripts/generate-listening-level3-batch{2..9}.ts` (9 batch thủ
     công). Script sinh audio: `scripts/gen-audio-level3-batch{2..9}.ts` (dùng
     `ELEVENLABS_API_KEY_SECOND`, tự dừng khi hết quota). Script phân bổ cuối cùng thành đề:
     `scripts/generate-listening-level3-repeat-v2.ts` (thay `generate-listening-level3-repeat.ts`
     cũ — thuật toán cũ dùng random-cắt-đầu độc lập từng đề có thể bỏ sót câu "xui" không rơi
     vào top-N của bất kỳ lần shuffle nào; bản v2 xáo trộn toàn cục nhiều vòng rồi cắt liên
     tiếp, đảm bảo phủ đều 100% câu nguồn — xem mục 5).
  6. **"Three Practice Test"** (`exam_type: lesson`, `units: [2]`) — liên kết Flipbook ngoài
     qua `external_url`, không có câu hỏi số hoá trong DB (xem `exam_bank.md` mục 7.3).
  7. **"Luyện chính tả Level 1"** (`exam_type: review`, `units: [101]`, tab Ôn Tập) — 12 đề × 20 câu
     (240 câu) `fill_blank` luyện nhớ chính tả cả từ: khuyết NHIỀU chữ cái (10 câu/đề, VD `b a _ _ _ a`
     → chọn `nan`) hoặc khuyết toàn bộ từ (10 câu/đề, chọn cách viết đúng trong 4 cách, VD
     `cat`/`kat`/`cet`/`cta`). Câu hỏi chỉ ghi nghĩa tiếng Việt, KHÔNG có emoji/hình gợi ý. Mỗi câu
     bật flag `metadata_json.retry_until_correct: true` → chế độ làm-lại-khi-sai (xem mục 5).
     Phủ 238 từ phân biệt = toàn bộ từ ĐƠN 3-8 chữ cái trong wordlist (Đề 12 trộn lại 2 từ cũ
     `hat`, `touch` cho đủ 20 câu). Nguồn: `content/exam-bank/tieng-anh/pre-a1-spelling-level1.json`.
     Từ vựng lấy từ wordlist 280 từ (`lib/data/startersVocabulary.ts`); script sinh Đề 02-12:
     `scratch/gen-spelling-l1.ts` (seeded RNG), script verify: `scratch/check-spelling-l1.ts`.
- Script seed: `scripts/seed-exam-bank.ts` (generator chuẩn, không có script riêng).

## 3. Đặc thù riêng của môn

- Loại câu hỏi hay dùng: `multiple_choice` (dịch nghĩa 2 chiều Anh⇋Việt, chọn chữ cái điền từ
  đúng), `listening_multiple_choice`, `sentence_reorder`.
- Cấu trúc mỗi đề (20 câu, đan xen 4 dạng):
  1. **Trắc nghiệm từ vựng** (`multiple_choice`, 8 câu) — dịch nghĩa 2 chiều Anh⇋Việt.
  2. **Luyện nghe phản xạ** (`listening_multiple_choice`, 4 câu) — dùng Web Speech API (TTS)
     tự động phát âm khi câu hỏi xuất hiện, có nút loa "Listen" để nghe lại.
  3. **Luyện chính tả** (`multiple_choice` dạng điền chữ, 4 câu) — chọn chữ cái còn thiếu
     (VD: `a _ _ l e` → chọn `pp`).
  4. **Sắp xếp cấu trúc câu** (`sentence_reorder`, 4 câu) — sắp xếp từ xáo trộn thành câu hoàn
     chỉnh (VD: `This is my head`).
- Có công thức toán (KaTeX)? Không.
- Có audio/TTS? **Có — Web Speech API**, không cần file mp3 tĩnh.
- Ràng buộc bản quyền: nội dung soạn mới dựa trên wordlist, không sao chép sách có bản quyền.
- Lịch sử làm bài lưu vào `learning_sessions` (`summary_metrics.type = "exam"`) — giống các
  môn khác, không có gì đặc biệt riêng.

## 4. Việc cần làm khi mở rộng/sửa môn này

- [ ] Đọc mục 2-3 ở trên trước khi soạn thêm câu hỏi
- [ ] Soạn JSON theo template ở `exam_bank.md` mục 3, đặt trong `content/exam-bank/`
- [ ] Seed bằng generator chuẩn (dùng Bulk Insert sẵn có, xem mục 5), verify lại số liệu
      trong Supabase
- [ ] Component sắp xếp câu (`SentenceReorderRenderer.tsx`) đã có bộ lọc chặn double-click —
      không cần thêm debounce riêng khi mở rộng loại câu này
- [ ] Cập nhật lại mục 2 (trạng thái) trong chính file này sau khi seed xong

## 5. Lịch sử / ghi chú quan trọng

- **2026-07-25 — Mở rộng "Luyện nghe Level 3" từ 10 đề (150 câu) lên 20 đề (400 câu),
  dùng `ELEVENLABS_API_KEY_SECOND`:** batch audio đầu tiên (66 câu, key
  `ELEVENLABS_API_KEY`) đã cạn quota từ 2026-07-24. Người dùng cập nhật thêm
  `ELEVENLABS_API_KEY_SECOND` (tier free, 10.000 ký tự/tháng) trong `.env.local`. Test key
  bằng gọi `GET /v1/user/subscription` + 1 lần TTS thật xác nhận hoạt động tốt, quota riêng
  biệt với key cũ. Soạn **9 batch câu hội thoại mới thủ công** (KHÔNG dùng vòng lặp biến thể
  tự động như batch 1 cũ, để tránh trùng khuôn câu) ưu tiên phủ các chủ đề wordlist CHƯA có
  trong 63 câu batch 1 (My Body, At the Beach, My Street, My Friend's Birthday, thú nuôi
  tại nhà, các phòng At Home còn thiếu, At the Zoo, Clothes Shop, Favourite Food) — đối
  chiếu 11 chủ đề trong `lib/data/startersVocabulary.ts`. Sinh audio bằng script sửa lại
  đọc `ELEVENLABS_API_KEY_SECOND` thay vì key cũ, có bắt lỗi 401/429 để **tự dừng khi hết
  quota** thay vì crash — chạy 9 lần liên tiếp (kiểm tra quota còn lại giữa mỗi lần bằng
  `GET /v1/user/subscription`) cho đến khi quota còn quá thấp (~1.493 ký tự) để an toàn dừng
  hẳn, tổng cộng sinh được 132 câu mới (39+29+18+16+12+8+6+4), gộp với 63 câu batch 1 =
  **195 câu unique có audio thật**.
  **Bug tự phát hiện khi verify độc lập (đừng tin log "thành công" một mình):** script gộp
  đầu tiên dùng thuật toán "shuffle toàn bộ pool rồi cắt N câu đầu, lặp lại 20 lần độc lập
  cho 20 đề" — verify bằng Python đếm `set(audio_text)` trong output phát hiện chỉ 170-187
  câu unique xuất hiện trong 400 lượt, THIẾU so với 195 câu nguồn (một số câu "xui" không
  rơi vào top-20 của bất kỳ lần shuffle độc lập nào trong 20 lượt — hiện tượng thống kê
  bình thường với seeded RNG, không phải lỗi logic rõ ràng nên dễ bỏ sót nếu không tự đếm
  lại). Còn phát hiện thêm 1 lỗi thao tác: đọc VÀ ghi đè cùng 1 file
  `pre-a1-listening-level3-exams.json` trong cùng script khiến lần chạy thứ 2 đọc nhầm
  chính output đã trộn của lần 1 làm nguồn — sửa bằng cách luôn đọc từ file
  `-10de-BACKUP.json` riêng, không bao giờ đọc lại file đích sẽ ghi đè. Thuật toán mới
  (`generate-listening-level3-repeat-v2.ts`): xáo trộn toàn cục nhiều vòng nối liên tiếp
  thành 1 dải dài rồi cắt từng đoạn 20 câu — đảm bảo mỗi câu nguồn xuất hiện đủ số lần gần
  bằng nhau, verify lại bằng Python xác nhận đủ 195/195 câu nguồn xuất hiện trong output,
  0 câu trùng trong cùng 1 đề, rồi mới seed. **Bài học:** khi phân bổ ngẫu nhiên 1 pool nhỏ
  vào nhiều nhóm độc lập (N đề), random-cắt-đầu lặp lại N lần KHÔNG đảm bảo phủ hết pool —
  phải dùng round-robin/xáo-trộn-nối-liên-tiếp nếu cần đảm bảo phủ đều, và luôn tự đếm lại
  `set()` kết quả cuối so với nguồn thay vì tin số liệu log giữa chừng.

- **2026-07-24 — Chế độ làm-lại-khi-sai (`retry_until_correct`) cho câu trắc nghiệm/fill_blank:**
  `MultipleChoiceRenderer.tsx` nhận thêm prop `retryUntilCorrect` + `onWrongAttempt`. Khi bật:
  chọn sai KHÔNG bị chấm sai — đáp án sai giữ nguyên màu đỏ (không reset, không bấm lại được),
  hiện thông báo "Chưa đúng — em thử lại nhé!" và học sinh chọn tiếp đến khi đúng; chỉ khi
  chọn đúng mới ghi nhận kết quả (luôn là đúng). Bật bằng flag `retry_until_correct: true`
  trong `metadata_json` của từng câu — hiện chỉ được nối vào nhánh `fill_blank` fallback của
  `AssessmentRenderer.tsx`; các môn/câu không có flag giữ nguyên hành vi chấm 1 lần như cũ.
  Dùng đầu tiên cho collection "Luyện chính tả Level 1" (xem mục 2).

- **Bulk Insert:** `scripts/seed-exam-bank.ts` đã tối ưu nạp hàng loạt 20 câu hỏi trong 1
  request (thay vì 20 requests liên tục) để loại bỏ lỗi nghẽn mạng `fetch failed`, kèm cơ chế
  tự động thử lại (Retry 5 lần, delay 1s). Lệnh nạp lại/đồng bộ:
  ```bash
  npx tsx scripts/seed-exam-bank.ts content/exam-bank/tieng-anh/starters-wordlist-pilot.json
  npx tsx scripts/seed-exam-bank.ts content/exam-bank/tieng-anh/pre-a1-starter-wordlist-reflex-batch2.json
  npx tsx scripts/seed-exam-bank.ts content/exam-bank/tieng-anh/starters-wordlist-reflex-level2.json
  ```
- **Quản lý Audio tĩnh (ElevenLabs MP3):**
  * **Level 2 (Nghe câu đơn):** Audio được lưu tại thư mục [public/audio/pre-a1-starter-listening/](file:///d:/Backups/Projects/edu-platform/public/audio/pre-a1-starter-listening). Sinh tự động qua script [gen-audio-elevenlabs.ts](file:///d:/Backups/Projects/edu-platform/scripts/gen-audio-elevenlabs.ts).
  * **Level 3 (Hội thoại ngắn):** Audio được lưu tại thư mục [public/audio/pre-a1-starter-listening-l3/](file:///d:/Backups/Projects/edu-platform/public/audio/pre-a1-starter-listening-l3). Sinh tự động qua script [gen-audio-level3.ts](file:///d:/Backups/Projects/edu-platform/scripts/gen-audio-level3.ts). Script này tự động phân vai thoại (Man/Woman/Girl/Boy), gọi ElevenLabs cho từng giọng rồi ghép nối các buffer nhị phân lại để tạo thành file âm thanh đối thoại hoàn chỉnh.
- **Luyện nghe Level 3 (Hội thoại ngắn):** Xem lộ trình chi tiết tại [pre-a1-starter-listening-level3-roadmap.md](file:///d:/Backups/Projects/edu-platform/docs/luyen-tap/pre-a1-starter-listening-level3-roadmap.md).
- **Thời gian phản xạ:** Mặc định của thời gian phản xạ (timer) đã được nâng lên **60 giây** thay vì 30 giây mặc định trước đó ở các trang `luyen-tap/[subject]/page.tsx` and `test-assessment/page.tsx`.
- Trigger tự động sinh tên đã bị xóa (migration 053) — tiêu đề hiển thị chính là `title` được
  đặt lúc seed, không có gì tự ghi đè lại (đúng quy tắc chung ở `exam_bank.md` mục 6b).
