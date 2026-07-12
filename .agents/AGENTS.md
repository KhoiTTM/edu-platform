# Project-Scoped Rules cho edu-platform

Quy tắc bắt buộc đối với tất cả Agent hoạt động trong workspace này:

1. **ĐỌC NGỮ CẢNH TRƯỚC TIÊN**:
   - Trước khi tạo code mới, tái cấu trúc, hoặc phân tích hệ thống, bạn BẮT BUỘC phải đọc và hiểu file `docs/CONTEXT.md`.
   - File này chứa thiết kế kiến trúc cốt lõi, sự phân chia 6 module, và các luật cứng của dự án.
   - Nếu bạn tạo Sub-agent, hãy cung cấp cho sub-agent lệnh đọc file `docs/CONTEXT.md` ngay trong prompt khởi tạo.

2. **GIAO TIẾP QUA TÀI LIỆU**:
   - Nếu bạn đưa ra một quyết định kiến trúc quan trọng, hãy ghi chép lại vào thư mục `docs/`.
   - Đảm bảo tính nhất quán (Consistency) bằng cách bám sát kiến trúc Question-centric và 3 tầng: Content, Attempts, Progress đã định nghĩa.

3. **EXAM BANK (tạo đề thi) — QUY TẮC CỐT LÕI: ĐỀ CHỈ "CÓ" KHI ĐÃ SEED LÊN DATABASE**:
   - Trước khi tạo/seed đề hoặc chạy SQL lên `assessment_collections`/`question_bank`, BẮT BUỘC đọc `docs/EXAM_BANK.md` — đặc biệt mục 4 (quy trình chuẩn), mục 4b (nguồn ảnh/PDF), và mục 6 "Bẫy đã biết".
   - **`/luyen-tap` luôn đọc từ database, KHÔNG đọc file JSON.** Soạn đề vẫn bắt đầu bằng file JSON (trong `content/exam-bank/` hoặc `content/workbooks/`) — nhưng đó chỉ là bản nháp/đối chiếu, KHÔNG phải đích cuối. Một đề coi là "xong" chỉ khi đã chạy generator/migrate script và verify có thật trong Supabase (đếm `exam_questions`, không chỉ tin `total_questions`) — file JSON đã soạn xong nhưng chưa seed thì học sinh KHÔNG thấy được gì cả.
   - **Giữ lại file JSON sau khi seed** — không xoá. Dùng làm bản backup/đối chiếu khi phát hiện lỗi nội dung về sau (ví dụ đợt vá 9 câu KHTN 7 bị gán sai `type`).
   - Tạo đề qua generator `scripts/seed-exam-bank.ts` (ngân hàng câu hỏi chung) hoặc script migrate riêng từng môn (sách bài tập 1-1, xem mục 7.4 EXAM_BANK.md) — KHÔNG ghi DB thủ công.
   - **Trigger tự sinh tên đã bị XÓA từ migration `053`.** Không còn cơ chế nào tự đặt/bảo vệ `title`/`sequence_number` của `assessment_collections` — mọi script seed PHẢI tự gán `title` rõ ràng, ưu tiên dùng `lib/assessment/buildExamTitle.ts` để nhất quán (xem mục 7.1 EXAM_BANK.md). `UPDATE title` giờ an toàn (không bị ghi đè lại) nhưng vẫn phải cẩn thận không đụng nhầm đề khác.
   - Ảnh/PDF sách gốc dùng để soạn câu hỏi hoặc hiển thị cho học sinh lấy từ **Google Drive** — không tải về commit vào `public/book/`, `content/pdfs/` (xem mục 4b EXAM_BANK.md).
   - Loại câu hỏi runtime render được: xem `components/universal/AssessmentRenderer.tsx`. Thêm loại mới = thêm renderer + case + cập nhật validator trong generator.
   - Nội dung đề phải GỐC (không sao chép sách có bản quyền); với Tiếng Anh 3 chỉ dùng từ trong `docs/TIENGANH3_TAP1_SCOPE.md`. Ngoại lệ: sách bài tập bám sát 1-1 (SBT) được chép nguyên văn đề bài vì mục đích là luyện đúng theo sách, không phải soạn đề mới.

4. **CẢNH BÁO MÔI TRƯỜNG GHI FILE LỚN**: công cụ ghi đôi khi cắt cụt file >~11KB (chèn NUL ở cuối). Sau khi sửa file lớn, LUÔN verify bằng `tsc --noEmit` / parser; nếu cụt, vá đuôi qua shell hoặc khôi phục từ git.

5. **PRE A1 STARTER & BULK SEEDING**:
   - Khi tạo câu hỏi liên quan đến phát âm (TTS) cho môn `pre-a1-starter`, sử dụng thuộc tính `audio_text` trong `metadata_json` với kiểu câu hỏi `listening_multiple_choice`.
   - Nạp đề thi qua seeder `seed-exam-bank.ts` phải sử dụng cấu trúc Bulk Insert tích hợp sẵn (tự động gom nhóm các câu hỏi thành 1 request và liên kết hàng loạt) để tối ưu hóa hiệu suất và tránh lỗi mạng cloud. Bắt buộc đọc kĩ tài liệu `docs/luyen-tap/pre-a1-starter.md`.

6. **TOÁN — RENDER CÔNG THỨC TOÁN HỌC**:
   - Đề thi môn Toán (và bất kỳ môn nào có công thức) dùng cú pháp `$...$` trong `metadata_json` để đánh dấu LaTeX inline.
   - Runtime render qua `KaTeXSpan` (dynamic `import("katex")` trong `useEffect`) trong `MultipleChoiceRenderer.tsx`. MathJax 3 load từ CDN làm fallback tổng thể trong `app/layout.tsx`.
   - `transpilePackages: ["katex"]` trong `next.config.ts` là BẮT BUỘC — thiếu nó Webpack không resolve được katex dù đã `npm install`.
   - CSS + fonts KaTeX được sinh tự động qua `scripts/setup-katex.mjs` (chạy khi `postinstall` và `build`). Hai path này trong `.gitignore` — **KHÔNG commit**, không cần copy tay.
   - Xem đầy đủ quy ước LaTeX, ký hiệu hay dùng, và bảng lỗi đã biết tại `docs/EXAM_BANK.md` mục 3b.
   - Đề Toán 7 HK1 mẫu: `content/exam-bank/toan7-hk1-de01.json` — tham khảo cú pháp trước khi tạo đề mới.

7. **KHTN 7 SBT & ĐỀ LUYỆN TẬP — SEED VÀ SỬ DỤNG DATABASE**:
   - Toàn bộ đề luyện tập, câu hỏi và metadata (kể cả sách bài tập bám sách 1-1 như KHTN 7,
     Tiếng Anh 7) đều **seed lên database Supabase** (`assessment_collections`, `exams`,
     `question_bank`, `exam_questions` — xem mục 1, 7 `docs/EXAM_BANK.md`). Runtime
     (`/luyen-tap`) chỉ đọc DB.
   - **MUST:** Khi thêm hoặc cập nhật bài tập mới, bắt buộc chạy script seed/migrate tương ứng
     rồi **verify lại trong Supabase** (không chỉ chạy xong là coi như done) — file JSON soạn
     sẵn không tự động "lên app".
   - File JSON nguồn (`content/exam-bank/`, `content/workbooks/`) **vẫn giữ lại** trong repo
     sau khi seed — dùng làm bản nháp đối chiếu và backup/restore, KHÔNG phải cơ chế fallback
     runtime. KHÔNG dựng thêm local-JSON-fallback đọc trực tiếp từ `public/`/`content/` để
     "phòng khi DB lỗi" — điều đó tạo ra 2 nguồn sự thật lệch nhau (đã từng gây lỗi thật: 9 câu
     KHTN 7 bị mất `options` do script chỉ tin field `type` trong JSON thay vì kiểm tra dữ
     liệu đã seed). Nếu DB không khả dụng, đó là sự cố cần sửa hạ tầng, không phải lý do để
     giữ 1 đường vòng qua JSON.

8. **NHIỀU MÁY CÙNG LÀM VIỆC TRÊN REPO NÀY (Linux + Windows)**:
   - User chạy agent trên ít nhất 2 máy (Linux và Windows) cùng trỏ vào repo GitHub `KhoiTTM/edu-platform`. Công cụ đồng bộ giữa 2 máy chỉ sync **file code**, KHÔNG sync lịch sử Git — mỗi máy có `.git` độc lập.
   - Sự cố đã xảy ra (2026-07-05): 26 commit nằm im trên Linux từ 2026-06-26 không được push; trong lúc đó Windows tạo và push 148 commit refactor lớn lên GitHub. Hai nhánh phân kỳ (diverged) cả `ahead` lẫn `behind`, phải xử lý bằng WIP commit + merge `-X theirs` + resolve tay 11 file conflict.
   - **BẮT BUỘC** đầu mỗi phiên: chạy `git fetch origin && git status -sb` trước khi sửa bất kỳ file nào. Nếu thấy cả `ahead` và `behind` đều khác 0 → đây là phân kỳ thật, DỪNG LẠI và hỏi user chiến lược merge (không tự ý chọn `-X ours`/`-X theirs`).
   - Với việc sửa nhiều file/nhiều bước (refactor, đổi theme...), ưu tiên tạo nhánh riêng thay vì commit thẳng vào `main`, để giảm nguy cơ đụng độ với phiên đang chạy song song trên máy kia.
   - Trước khi kết thúc phiên, nếu còn commit chưa push, hỏi user có muốn push ngay không — không để tồn đọng nhiều ngày như sự cố trên.
