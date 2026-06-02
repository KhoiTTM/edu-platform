# Hướng dẫn vẽ hình học (Geometry Rendering Guide)

Để xử lý phần hình học có hình vẽ trong nền tảng, chúng ta sử dụng **Inline SVG (Scalable Vector Graphics)** nhúng trực tiếp vào nội dung lý thuyết (Markdown) hoặc câu hỏi (`question_bank`). 

Do cả `MultipleChoiceRenderer` và `GrammarTutorialRenderer` đều sử dụng `dangerouslySetInnerHTML`, các thẻ SVG sẽ được trình duyệt biên dịch và hiển thị hoàn hảo, sắc nét trên mọi thiết bị và tự động ăn theo giao diện Dark Mode xịn xò của hệ thống.

---

## 1. Ưu điểm của Inline SVG
1. **Sắc nét tuyệt đối (Vectơ):** Không bị vỡ hình khi zoom hoặc hiển thị trên màn hình Retina/High-DPI.
2. **Hỗ trợ Dark Mode tự động:** Bằng cách sử dụng các màu tương thích (`stroke="currentColor"`, dùng màu Slate, Amber, Sky, Rose để đồng bộ hệ màu thiết kế).
3. **Không cần host ảnh:** Không cần tải ảnh lên S3/Storage, giúp tăng tốc độ tải trang và dễ dàng chỉnh sửa tọa độ, nhãn (labels) bằng code.
4. **Kích thước nhẹ:** Chỉ vài dòng text XML thay vì hàng chục KB ảnh bitmap.

---

## 2. Các mẫu hình học cơ bản (Templates)

Dưới đây là mã nguồn SVG của một số hình hình học phổ biến lớp 7, được tối ưu màu sắc cho giao diện tối (Dark Theme):

### Mẫu 1: Hai đường thẳng song song bị cắt bởi một cát tuyến (Góc so le trong, đồng vị)

```html
<div class="flex justify-center my-4">
  <svg width="320" height="180" viewBox="0 0 320 180" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <!-- Grid nền mờ ảo -->
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Đường thẳng a -->
    <line x1="30" y1="50" x2="290" y2="50" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="none" />
    <text x="295" y="54" fill="#38bdf8" font-size="13" font-family="monospace" font-weight="bold">a</text>

    <!-- Đường thẳng b -->
    <line x1="30" y1="130" x2="290" y2="130" stroke="#38bdf8" stroke-width="2.5" />
    <text x="295" y="134" fill="#38bdf8" font-size="13" font-family="monospace" font-weight="bold">b</text>

    <!-- Cát tuyến c -->
    <line x1="90" y1="20" x2="230" y2="160" stroke="#fbbf24" stroke-width="2" />
    <text x="80" y="25" fill="#fbbf24" font-size="13" font-family="monospace" font-weight="bold">c</text>

    <!-- Điểm giao A (trên) và B (dưới) -->
    <circle cx="120" cy="50" r="3" fill="#f43f5e" />
    <text x="110" y="44" fill="#f43f5e" font-size="12" font-family="sans-serif" font-weight="bold">A</text>
    <text x="132" y="46" fill="#94a3b8" font-size="10">1</text>
    <text x="105" y="65" fill="#94a3b8" font-size="10">2</text>

    <circle cx="200" cy="130" r="3" fill="#f43f5e" />
    <text x="210" y="145" fill="#f43f5e" font-size="12" font-family="sans-serif" font-weight="bold">B</text>
    <text x="185" y="125" fill="#94a3b8" font-size="10">3</text>
    <text x="210" y="125" fill="#94a3b8" font-size="10">4</text>
  </svg>
</div>
```

### Mẫu 2: Tam giác nhọn với đường cao (Hình học trực quan)

```html
<div class="flex justify-center my-4">
  <svg width="280" height="200" viewBox="0 0 280 200" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <!-- Tam giác ABC -->
    <polygon points="140,30 40,160 240,160" fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="2.5" />
    
    <!-- Đường cao AH -->
    <line x1="140" y1="30" x2="140" y2="160" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3,3" />
    
    <!-- Ký hiệu góc vuông tại H -->
    <path d="M 130 160 L 130 150 L 140 150" fill="none" stroke="#f43f5e" stroke-width="1.5" />

    <!-- Đỉnh và Điểm -->
    <circle cx="140" cy="30" r="3.5" fill="#ffffff" />
    <text x="135" y="22" fill="#ffffff" font-size="13" font-weight="bold">A</text>

    <circle cx="40" cy="160" r="3.5" fill="#ffffff" />
    <text x="25" y="165" fill="#ffffff" font-size="13" font-weight="bold">B</text>

    <circle cx="240" cy="160" r="3.5" fill="#ffffff" />
    <text x="248" y="165" fill="#ffffff" font-size="13" font-weight="bold">C</text>

    <circle cx="140" cy="160" r="3" fill="#f43f5e" />
    <text x="145" y="175" fill="#f43f5e" font-size="12" font-weight="bold">H</text>
  </svg>
</div>
```

### Mẫu 3: Góc kề bù / Tia phân giác

```html
<div class="flex justify-center my-4">
  <svg width="300" height="160" viewBox="0 0 300 160" class="bg-slate-950/40 border border-slate-800 rounded-2xl max-w-full shadow-lg">
    <!-- Đường thẳng xOy -->
    <line x1="30" y1="130" x2="270" y2="130" stroke="#475569" stroke-width="2" />
    <!-- Gốc O -->
    <circle cx="150" cy="130" r="4" fill="#f43f5e" />
    <text x="146" y="148" fill="#ffffff" font-size="12" font-weight="bold">O</text>

    <!-- Tia Oz cắt góc -->
    <line x1="150" y1="130" x2="60" y2="40" stroke="#38bdf8" stroke-width="2.5" />
    
    <!-- Tia phân giác Ot -->
    <line x1="150" y1="130" x2="98" y2="78" stroke="#10b981" stroke-width="2" stroke-dasharray="4,2" />

    <!-- Ký hiệu cung tròn góc -->
    <!-- Góc xOz -->
    <path d="M 120 130 A 30 30 0 0 1 129 109" fill="none" stroke="#fbbf24" stroke-width="1.5" />
    <!-- Nhãn các đầu tia -->
    <text x="20" y="134" fill="#94a3b8" font-size="12">x</text>
    <text x="275" y="134" fill="#94a3b8" font-size="12">y</text>
    <text x="48" y="35" fill="#38bdf8" font-size="12">z</text>
    <text x="88" y="72" fill="#10b981" font-size="12">t</text>
  </svg>
</div>
```

---

## 3. Cách chèn vào câu hỏi trong File Seed/Database

Khi chuẩn bị dữ liệu trong file seed (như `seed-lesson1-content.ts`), chúng ta chỉ cần viết trực tiếp mã HTML có chứa SVG này vào trường `question` hoặc `explanation` của câu hỏi.

**Ví dụ:**

```typescript
{
  question: "Cho hình vẽ dưới đây. Biết hai đường thẳng a và b song song với nhau. Tính số đo góc A1 nếu biết góc B3 = 60°.<br/>" +
            "<div class='flex justify-center my-4'>" +
            "  <svg width='300' height='160' viewBox='0 0 300 160' class='bg-slate-950/40 border border-slate-800 rounded-2xl'>" +
            "    <line x1='30' y1='40' x2='270' y2='40' stroke='#38bdf8' stroke-width='2' />" +
            "    <line x1='30' y1='120' x2='270' y2='120' stroke='#38bdf8' stroke-width='2' />" +
            "    <line x1='80' y1='15' x2='220' y2='145' stroke='#fbbf24' stroke-width='2' />" +
            "    <text x='275' y='44' fill='#38bdf8' font-size='12'>a</text>" +
            "    <text x='275' y='124' fill='#38bdf8' font-size='12'>b</text>" +
            "    <circle cx='105' cy='40' r='3' fill='#f43f5e' />" +
            "    <text x='95' y='32' fill='#fff' font-weight='bold'>A</text>" +
            "    <text x='115' y='35' fill='#f87171' font-size='10'>1</text>" +
            "    <circle cx='185' cy='120' r='3' fill='#f43f5e' />" +
            "    <text x='195' y='135' fill='#fff' font-weight='bold'>B</text>" +
            "    <text x='170' y='115' fill='#f87171' font-size='10'>3</text>" +
            "  </svg>" +
            "</div>",
  options: ["60°", "120°", "180°", "30°"],
  correct_index: 1,
  explanation: "Vì a // b nên góc A1 và góc B3 là hai góc trong cùng phía (hoặc đồng vị/so le tương ứng tùy góc hình). Ở đây A1 và B3 kề bù hoặc so le trong. Với hình vẽ, góc A1 và góc B3 bù nhau nên A1 = 180° - 60° = 120°.",
  difficulty: 2.0
}
```

Điều này giúp hệ thống hoạt động vô cùng ổn định mà không cần cài đặt thêm thư viện đồ họa nặng nề nào khác trên frontend. Giao diện người dùng sẽ hiển thị hình vẽ cực kỳ mượt mà, phản hồi tốt trên mobile và desktop!
