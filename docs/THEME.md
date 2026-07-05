# THEME — Quy ước màu sắc & Token

> App dùng **1 theme tối cố định** (không có toggle sáng/tối, không có `next-themes`).
> Toàn bộ màu nền/chữ/viền dùng chung phải đi qua **token ngữ nghĩa** ở `tailwind.config.ts`,
> không viết thẳng `slate-800`, `#0f172a`... trong component mới.

## 1. Nguồn sự thật (KHÔNG đổi cấu trúc)

Giá trị màu gốc nằm ở `app/globals.css`, khai báo dạng **R G B triplet** (không có `rgb()` bọc ngoài):

```css
:root {
  --background: 15 23 42;        /* #0f172a Deep Slate Blue — nền chính */
  --foreground: 248 250 252;     /* #f8fafc Light Slate — chữ chính */
  --foreground-muted: 148 163 184; /* #94a3b8 Slate 400 — chữ phụ */
  --card: 30 41 59;              /* #1e293b — nền card/panel nổi lên */
  --border: 51 65 85;            /* #334155 — viền mặc định */
  --accent: 56 189 248;          /* #38bdf8 */
}
```

`tailwind.config.ts` map các biến này thành token qua `rgb(var(--x) / <alpha-value>)`:

```ts
colors: {
  surface: {
    DEFAULT: "rgb(var(--background) / <alpha-value>)",
    raised:  "rgb(var(--card) / <alpha-value>)",
    deep:    "#0b0f19", // hằng số riêng, xem mục 3
  },
  ink: {
    DEFAULT: "rgb(var(--foreground) / <alpha-value>)",
    muted:   "rgb(var(--foreground-muted) / <alpha-value>)",
  },
  line: "rgb(var(--border) / <alpha-value>)",
}
```

**Vì sao dùng R-G-B triplet thay vì hex thẳng:** để class Tailwind hỗ trợ opacity modifier
(`bg-surface/80`, `border-line/50`...). Nếu định nghĩa token bằng hex (`"var(--background)"`
trỏ tới `#0f172a`), Tailwind **âm thầm không sinh ra** các class có `/NN` — bug này từng xảy ra
thật, xem lịch sử migration. Không quay lại dùng hex thẳng cho token.

## 2. Bảng token → class Tailwind

| Ý nghĩa | Token | Class ví dụ | Thay cho hex/slate cũ |
|---|---|---|---|
| Nền chính của trang | `surface` | `bg-surface` | `bg-slate-900`, `bg-[#0f172a]` |
| Nền card/panel nổi lên trên `surface` | `surface.raised` | `bg-surface-raised` | `bg-slate-800`, `bg-[#1e293b]` |
| Nền toàn màn hình cho reader/textbook | `surface.deep` | `bg-surface-deep` | `bg-[#0b0f19]` |
| Chữ chính | `ink` | `text-ink` | `text-white`, `text-slate-100` (khi là **chữ nội dung**, không phải chữ trắng trên nút màu) |
| Chữ phụ/mô tả | `ink.muted` | `text-ink-muted` | `text-slate-400`, `text-slate-500` |
| Viền mặc định | `line` | `border-line` | `border-slate-700`, `border-slate-800` |

Tất cả hỗ trợ opacity modifier: `bg-surface/80`, `border-line/50`, `bg-surface-raised/60`...

## 3. Khi KHÔNG dùng token (ngoại lệ có chủ đích)

Không phải màu tối nào cũng nên token hoá — một số nơi cố tình có bảng màu riêng:

- **`components/flipbook/FlipbookClient.tsx`** — viewer đọc sách kiểu Kindle dark mode, dùng
  palette zinc riêng (`#09090b`, `#18181b`, `#27272a`...) độc lập với theme app.
- **`components/universal/CurriculumMap.tsx`** — bản đồ học tập kiểu game, màu là chi tiết minh
  hoạ (cỏ, cây, đường mòn, badge) chứ không phải khái niệm nền/chữ. Ngoại lệ: 1 tooltip UI chuẩn
  trong file này (dòng ~467) vẫn dùng token `surface`/`line` vì nó là UI chrome thật.
- **`components/flipbook/flipbook.css`** (2 bản, `components/` và `app/(app)/(flipbook)/`) — tự
  định nghĩa `:root { --foreground, --accent, --border, ... }` riêng, khác namespace hoàn toàn với
  `app/globals.css`. Chỉ áp dụng khi ở trong flipbook viewer.
- **`app/page.tsx`** — landing page marketing, cố ý nền sáng (`bg-white`, `text-slate-900`), tách
  biệt khỏi phần app sau đăng nhập (luôn nền tối).
- **`text-white` trên nút/badge màu** (`bg-emerald-500 text-white`, `bg-indigo-600 text-white`...)
  — đây là chữ trắng cố định trên nền màu rực, không phải "chữ chính trên nền tối". Không đổi
  thành `text-ink` vì ý nghĩa khác hẳn: nút xanh lá vẫn cần chữ trắng dù theme nền có đổi màu gì.
- **Hex trong `shadow-[...]` arbitrary value** (ví dụ `shadow-[0_6px_0_#0284c7]`, hiệu ứng nút bấm
  3D kiểu Duolingo) — đã kiểm chứng: `shadow-[0_12px_0_theme(colors.surface.DEFAULT)]` **không
  resolve được** khi token dùng `<alpha-value>` placeholder, Tailwind bỏ qua class im lặng. Giữ
  hex trực tiếp ở đây, rủi ro đổi cao hơn lợi ích (chỉ là chi tiết hiệu ứng nhỏ).
- **Màu semantic** (đỏ/vàng/xanh lá cho đúng/sai/cảnh báo, ví dụ trong `AssessmentRenderer.tsx`
  đếm ngược thời gian) — không phải khái niệm nền/chữ, giữ nguyên `bg-red-500`/`emerald-500`/...

## 4. Thêm màu mới

- **Cần 1 sắc thái nền/chữ/viền lặp lại ≥ 2-3 nơi** → thêm token mới vào `tailwind.config.ts`,
  theo mẫu `surface.deep` (hằng số) nếu không cần đổi theo theme, hoặc thêm biến CSS mới trong
  `globals.css` nếu cần đồng bộ với theme sau này.
- **Chỉ dùng 1 lần, mang tính trang trí/minh hoạ** → cứ dùng class Tailwind trực tiếp
  (`bg-purple-950`, `from-amber-400 to-orange-500`...), không cần token hoá.
- Trước khi thêm token mới bằng arbitrary value hex trong `shadow-[]`/`bg-[]`, **thử build thử**
  (`npx tailwindcss -i app/globals.css -o /tmp/out.css --content "<file>"`) rồi grep xem class có
  thực sự được sinh ra không — Tailwind bỏ qua arbitrary value không hợp lệ mà không báo lỗi.

## 5. Đổi theme (rebrand màu)

Vì phần lớn UI chrome (nền/chữ/viền dùng chung) đã qua token, đổi theme = sửa 5 giá trị trong
`app/globals.css` (`--background`, `--card`, `--border`, `--foreground`, `--foreground-muted`),
build lại. Không cần sửa từng component.

**Giới hạn:** các ngoại lệ ở mục 3 (FlipbookClient, CurriculumMap, flipbook.css, landing page,
text-white trên nút màu, shadow hex, màu semantic) sẽ **không** đổi theo — đây là chủ đích, không
phải thiếu sót.

Đây vẫn là đổi màu tĩnh một lần (sửa code, build, deploy), **không phải** theme switchable lúc
runtime. Muốn có toggle sáng/tối thật cần thêm `next-themes` + `darkMode: 'class'` trong Tailwind
+ định nghĩa giá trị cho theme thứ 2 — chưa làm, vì app hiện chỉ cần 1 theme tối duy nhất.
