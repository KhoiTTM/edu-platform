# Tiến độ OCR — Sách Bài Tập KHTN 7

> File này theo dõi trạng thái OCR từng bài của sách SBT KHTN 7 (`sbt_khtn7.pdf`, 147 trang).  
> Cập nhật mỗi khi hoàn thành 1 bài mới.

## Trạng thái hiện tại

**Đã OCR xong: Bài 1–15** (195 câu, trang 1–45)  
**Tiếp theo: Bài 16** (bắt đầu trang 46, index PDF 45)

## Bảng theo dõi

| Bài | Tên bài | Trang PDF | Số câu | MCQ | Trạng thái |
|-----|---------|-----------|--------|-----|------------|
| 1 | Phương pháp và kĩ năng học tập môn Khoa học tự nhiên | 1–4 | 11 | 2 | ✅ Xong |
| 2 | Nguyên tử | 5–10 | 21 | 12 | ✅ Xong |
| 3 | Nguyên tố hoá học | 11–14 | 15 | 2 | ✅ Xong |
| 4 | Sơ lược về bảng tuần hoàn các nguyên tố hoá học | 15–19 | 28 | 1 | ✅ Xong |
| 5 | Phân tử - Đơn chất - Hợp chất | 20–23 | 16 | 6 | ✅ Xong |
| 6 | Giới thiệu về liên kết hoá học | 24–25 | 13 | 5 | ✅ Xong |
| 7 | Hoá trị và công thức hoá học | 26–29 | 17 | 4 | ✅ Xong |
| 8 | Tốc độ chuyển động | 30–31 | 10 | 4 | ✅ Xong |
| 9 | Đo tốc độ | 32 | 4 | 0 | ✅ Xong |
| 10 | Đồ thị quãng đường – thời gian | 33–35 | 10 | 4 | ✅ Xong |
| 11 | Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông | 35–37 | 6 | 3 | ✅ Xong |
| 12 | Sóng âm | 38–39 | 10 | 3 | ✅ Xong |
| 13 | Độ to và độ cao của âm | 39–41 | 12 | 6 | ✅ Xong |
| 14 | Phản xạ âm, chống ô nhiễm tiếng ồn | 41–43 | 13 | 6 | ✅ Xong |
| 15 | Năng lượng ánh sáng. Tia sáng, vùng tối | 44–45 | 9 | 5 | ✅ Xong |
| 16–? | (các bài tiếp theo) | 46+ | ? | ? | ⏳ Chưa làm |

> Trang bắt đầu của bài chưa OCR chỉ là ước tính — **luôn render ảnh xác nhận** trước khi OCR (xem Bước 0 trong `agent_prompt/implement_text_only_quiz_pipeline_prompt.md`).

## Cách làm tiếp 1 bài mới

### Bước 0 — Xác định range trang

```python
import pypdfium2 as pdfium
pdf = pdfium.PdfDocument('/home/khoittm/projects/flipbook_generator/sbt_khtn7.pdf')
scratchdir = '/tmp/claude-1000/-home-khoittm-projects-edu-platform/a85d9e19-1dfb-4a19-89b4-af287013c21d/scratchpad'
for p in range(PAGE_START - 1, PAGE_START + 4):   # ±4 trang quanh dự đoán
    pdf[p].render(scale=1.5).to_pil().save(f'{scratchdir}/check_p{p+1:03d}.png')
```
Đọc ảnh bằng Read tool → xác nhận trang bắt đầu/kết thúc chính xác, ghi vào bảng trên.

### Bước 1 — Render scale=2 để OCR

```python
for p in range(PAGE_IDX_START, PAGE_IDX_END + 1):   # 0-indexed
    pdf[p].render(scale=2).to_pil().save(f'{scratchdir}/baiN_p{p+1:03d}.png')
```

### Bước 2 — OCR + filter watermark

```python
import easyocr
reader = easyocr.Reader(['vi', 'en'], gpu=False)

WATERMARKS = {
    "KẾT NỐI TRI THỨC VỚI CUỘC SỐNG","KET NOI TRI THUC VOI CUOC SONG",
    "KẾT NỐL TRI THỨC","VÚI CUỘc SỐNG","Vutcjocstig","KẾT NỐI TRI THỨC",
    "VỚI CUỘC SỐNG","KET NOI TRI THUC","VOI CUOC SONG",
    "NỐI TRI THỨC VỚI CUỘC SỐNG","TRI THỨC VỚI CUỘC SỐNG",
    "KẾT NỐI TRI THỨC VỚI","NỐI TRI THỨC",
}

all_text = ""
for p in range(PAGE_NUM_START, PAGE_NUM_END + 1):   # 1-indexed display
    result = reader.readtext(f'{scratchdir}/baiN_p{p:03d}.png', detail=1)
    items = [{"x": bbox[0][0], "y": bbox[0][1], "text": text}
             for bbox, text, conf in result if text.strip() not in WATERMARKS]
    items.sort(key=lambda it: (round(it["y"]/15), it["x"]))
    all_text += " ".join(it["text"] for it in items) + "\n"
```

### Bước 3 — DP parse

```python
import re

candidates = []
for m in re.finditer(r'(?:(?<=\s)|^)(\d{1,2})\s*\.\s*(\d{1,2})\s*\.?\s*', all_text):
    candidates.append((m.start(), m.end(), int(m.group(1)), int(m.group(2))))

# DP longest valid chain
n = len(candidates)
dp = [1]*n; parent = [-1]*n

def valid(pb, pc, cb, cc):
    if pb == 0 and pc == 0: return True
    if cb == pb and cc > pc: return True
    if cb == pb + 1: return True
    return False

for i in range(1, n):
    ib, ic = candidates[i][2], candidates[i][3]
    for j in range(i-1, -1, -1):
        jb, jc = candidates[j][2], candidates[j][3]
        if valid(jb, jc, ib, ic) and dp[j]+1 > dp[i]:
            dp[i] = dp[j]+1; parent[i] = j

best_end = max(range(n), key=lambda i: dp[i])
chain = []; cur = best_end
while cur != -1: chain.append(cur); cur = parent[cur]
chain.reverse()
```

Sau khi có chain: in ra danh sách `N.M` rồi **đối chiếu với ảnh** để phát hiện câu bị mất marker (xem mục "Xử lý thiếu marker" bên dưới).

### Bước 4 — Tách MCQ / essay + map đáp án

```python
option_pat = re.compile(
    r'^(.*?)\s*\bA\s*[\.\)]\s*(.*?)\s*\bB\s*[\.\)]\s*(.*?)\s*\bC\s*[\.\)]\s*(.*?)\s*\bD\s*[\.\)]\s*(.*?)$',
    re.DOTALL
)

with open('content/khtn7-answer-key.json') as f:
    answer_key = json.load(f)['answers']   # key: "N.M", value: "A"/"B"/... hoặc text dài

new_qs = []
for (b, c), raw in segments.items():
    m = option_pat.match(raw.replace('\n', ' '))
    if m:
        ans_raw = answer_key.get(f"{b}.{c}", "")
        # Lấy chữ cái đầu: "C." → "C", "A. ..." → "A"
        ans_letter = ans_raw.strip()[0] if ans_raw.strip() and ans_raw.strip()[0] in 'ABCD' else ""
        q = {"id": f"khtn7-{b}-{c}", "bai": b, "cau": c, "type": "multiple_choice",
             "stem": m.group(1).strip(),
             "options": [m.group(i).strip() for i in range(2,6)],
             "answer": ans_letter}
    else:
        q = {"id": f"khtn7-{b}-{c}", "bai": b, "cau": c, "type": "essay",
             "stem": raw.strip(), "answer": ""}
    new_qs.append(q)
```

### Bước 5 — Append vào JSON + cập nhật LESSON_TITLES

```python
# Append
with open('content/khtn7-questions.json') as f:
    existing = json.load(f)
existing = [q for q in existing if q['bai'] != BAI_NUM]   # xóa nếu chạy lại
existing.extend(new_qs)
with open('content/khtn7-questions.json', 'w', encoding='utf-8') as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)
```

Sau đó **bắt buộc** cập nhật `LESSON_TITLES` ở **2 file**:
- `app/(app)/(flipbook)/flipbooks/[bookSlug]/quiz/page.tsx`
- `app/(app)/(flipbook)/flipbooks/[bookSlug]/quiz/[bai]/page.tsx`

```typescript
// Thêm dòng mới vào LESSON_TITLES['khtn7']:
N: "Bài N. <Tên bài>",
```

Và cập nhật bảng theo dõi ở đầu file này.

---

## Xử lý thiếu marker (câu bị OCR mất số thứ tự)

Sau khi có chain DP, so sánh danh sách câu với ảnh:
- Nếu thiếu `N.M` trong chain → OCR mất marker → thêm thủ công vào `questions_raw` dict với nội dung đọc từ ảnh
- Nếu có false positive (câu lạ trong chain) → kiểm tra ảnh, xóa khỏi dict

Kinh nghiệm thực tế:
- **Bài 5, câu 5.4**: "phân tử O2." trước marker khiến lookbehind nhận nhầm → patch xóa "O2." trong text
- **Bài 5, câu 5.15**: "D.6, 2, 1." trước marker → patch xóa dấu chấm thừa
- **Bài 7, câu 7.8**: marker dính vào text của 7.7, DP bỏ qua → thêm thủ công từ ảnh
- **Câu có sub-question MCQ** (như 7.7a, 7.7b): DP chỉ nhận được 1 entry, gộp cả 2 sub vào 1 stem — giữ nguyên, không cần tách

## Đáp án (answer key)

`content/khtn7-answer-key.json` đã có **361 đáp án**, bao phủ tất cả bài (trang 93–138 của sách). Không cần OCR lại phần đáp án khi làm bài mới — chỉ cần map bằng key `"N.M"`.

Đáp án MCQ thường có dạng `"C."` hoặc `"B"` — lấy ký tự đầu để so sánh. Đáp án tự luận là text dài — không dùng để tự chấm, chỉ để tham khảo.
