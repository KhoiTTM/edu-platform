const fs = require('fs');

const b24 = [
  {
    "bai": 24,
    "title": "Bài 24: Biểu thức đại số",
    "questions": [
      {
        "id": "toan7-sbt-t2-24-7.1",
        "type": "essay",
        "question": "**7.1.** Viết biểu thức đại số biểu thị:\na) Hiệu các bình phương của hai số $a$ và $b$;\nb) Tổng các lập phương của hai số $x$ và $y$.",
        "explanation": "a) $a^2 - b^2$;\n\nb) $x^3 + y^3$.",
        "tags": ["chuong-7", "bai-24"]
      },
      {
        "id": "toan7-sbt-t2-24-7.2",
        "type": "essay",
        "question": "**7.2.** Viết biểu thức đại số biểu thị:\na) Thể tích của hình hộp chữ nhật có chiều dài $a$, chiều rộng $b$ và chiều cao là $a + b$;\nb) Diện tích của hình tứ giác có hai đường chéo vuông góc với nhau và độ dài của hai đường chéo đó là $p$ và $q$.",
        "explanation": "a) $V = ab(a + b)$;\n\nb) $S = \\dfrac{1}{2}pq$.\n\n*HD.* Cách 1: $S = S_1 + S_2$, trong đó $S_1$ và $S_2$ lần lượt là diện tích tam giác $ABC$ và tam giác $ADC$.\nCách 2: Vẽ hình chữ nhật có các cạnh song song với hai đường chéo của tứ giác đã cho (H.7.1) và xét các tam giác vuông bằng nhau để chứng tỏ rằng diện tích của tứ giác đã cho đúng bằng nửa diện tích của hình chữ nhật.",
        "tags": ["chuong-7", "bai-24"]
      },
      {
        "id": "toan7-sbt-t2-24-7.3",
        "type": "essay",
        "question": "**7.3.** Hãy chỉ ra các biến trong mỗi biểu thức đại số thu được ở các Bài 7.1 và 7.2.",
        "explanation": "",
        "tags": ["chuong-7", "bai-24"]
      },
      {
        "id": "toan7-sbt-t2-24-7.4",
        "type": "essay",
        "question": "**7.4.** Tính giá trị của biểu thức:\na) $2a^2b + ab^2 - 3ab$ tại $a = -2$ và $b = 4$.\nb) $xy(x + y) - (x^2 + y^2)$ tại $x = 0,5$ và $y = -1,5$.",
        "explanation": "a) $24$;\n\nb) $-1,75$.",
        "tags": ["chuong-7", "bai-24"]
      },
      {
        "id": "toan7-sbt-t2-24-7.5",
        "type": "essay",
        "question": "**7.5.** Trong hai kết luận sau, kết luận nào đúng?\na) Hai biểu thức $A(x) = (x + 1)^2$ và $B(x) = x^2 + 1$ bằng nhau với mọi giá trị của $x$. (Chẳng hạn, khi $x = 0$ thì ta có $A(0) = B(0) = 1$).\nb) Hai biểu thức $C = a(b + c)$ và $D = ab + ac$ bằng nhau với mọi giá trị của các biến $a, b$ và $c$. (Chẳng hạn, khi $a = b = c = 0$ thì $C = D = 0$).",
        "explanation": "a) Sai. Chẳng hạn tại $x = 1$, ta có $A(1) = 4$ khác với $B(1) = 2$.\n\nb) Đúng, vì đẳng thức $a(b + c) = ab + ac$ biểu thị tính chất phân phối của phép nhân đối với phép cộng.",
        "tags": ["chuong-7", "bai-24"]
      },
      {
        "id": "toan7-sbt-t2-24-7.6",
        "type": "essay",
        "question": "**7.6.** Một luống rau có $x$ hàng, mỗi hàng có $y$ cây rau ($x, y \\in \\mathbb{N}$). Trong tình huống này, biểu thức $P = xy$ biểu thị số cây rau được trồng trên luống rau đó. Hãy nêu một tình huống khác, trong đó một đại lượng được biểu thị bởi biểu thức $x - y$.",
        "explanation": "",
        "tags": ["chuong-7", "bai-24"]
      }
    ]
  }
];

const b25 = [
  {
    "bai": 25,
    "title": "Bài 25: Đa thức một biến",
    "questions": [
      {
        "id": "toan7-sbt-t2-25-7.7",
        "type": "essay",
        "question": "**7.7.** Trong các biểu thức sau đây, biểu thức nào là đa thức một biến?\na) $\\dfrac{x^2}{\\sqrt{3}} - \\sqrt{3}$;\nb) $\\sqrt{2x}$;\nc) $(1 - \\sqrt{2})x^3 + 2$;\nd) $x + \\dfrac{1}{x}$.",
        "explanation": "*HD.* Chú ý rằng $\\dfrac{x^2}{\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}}x^2$ và $(1 - \\sqrt{2})$ là một số.",
        "tags": ["chuong-7", "bai-25"]
      },
      {
        "id": "toan7-sbt-t2-25-7.8",
        "type": "essay",
        "question": "**7.8.** Thu gọn và sắp xếp mỗi đa thức sau đây theo luỹ thừa giảm của biến rồi tìm bậc, hệ số cao nhất và hệ số tự do của mỗi đa thức đó.\na) $F(x) = -2 + 4x^5 - 2x^3 - 4x^5 + 3x + 3$;\nb) $G(x) = -5x^3 + 4 - 3x + 4x^3 + x^2 + 6x - 3$.",
        "explanation": "a) $F(x) = -2x^3 + 3x + 1$;\n\nb) $G(x) = -x^3 + x^2 + 3x + 1$.",
        "tags": ["chuong-7", "bai-25"]
      },
      {
        "id": "toan7-sbt-t2-25-7.9",
        "type": "essay",
        "question": "**7.9.** Bằng cách tính giá trị của đa thức $F(x) = x^3 + 2x^2 + x$ tại các giá trị của $x$ thuộc tập hợp $\\{-2; -1; 0; 1; 2\\}$, hãy tìm hai nghiệm của đa thức $F(x)$.",
        "explanation": "$F(-2) = -2; F(-1) = 0; F(0) = 0; F(1) = 4; F(2) = 18$.\nHai nghiệm của đa thức $F(x)$ là $x = -1$ và $x = 0$.",
        "tags": ["chuong-7", "bai-25"]
      },
      {
        "id": "toan7-sbt-t2-25-7.10",
        "type": "essay",
        "question": "**7.10.** Tìm đa thức $P(x)$ bậc 3 thoả mãn các điều kiện sau:\n- $P(x)$ khuyết hạng tử bậc hai;\n- Hệ số cao nhất là $4$;\n- Hệ số tự do là $0$;\n- $x = \\dfrac{1}{2}$ là một nghiệm của $P(x)$.",
        "explanation": "$P(x) = 4x^3 - x$.",
        "tags": ["chuong-7", "bai-25"]
      },
      {
        "id": "toan7-sbt-t2-25-7.11",
        "type": "essay",
        "question": "**7.11.** Cho hai đa thức $A(x) = -x^4 + 2,5x^3 + 3x^2 - 4x$ và $B(x) = x^4 + \\sqrt{2}$.\na) Chứng tỏ rằng $x = 0$ là nghiệm của đa thức $A(x)$ nhưng không là nghiệm của đa thức $B(x)$.\nb) Chứng tỏ rằng đa thức $B(x)$ không có nghiệm.",
        "explanation": "a) *HD.* Vì $A(0) = 0$, $B(0) = \\sqrt{2} \\ne 0$.\n\nb) Ta biết rằng $x^4 \\ge 0$ với mọi giá trị của $x$. Do đó $B(x) = x^4 + \\sqrt{2} \\ge \\sqrt{2} > 0$ với mọi giá trị của $x$. Vậy $B(x)$ không có nghiệm.",
        "tags": ["chuong-7", "bai-25"]
      },
      {
        "id": "toan7-sbt-t2-25-7.12",
        "type": "essay",
        "question": "**7.12.** Biết rằng hai đa thức $G(x) = x^2 - 3x + 2$ và $H(x) = x^2 + x - 6$ có một nghiệm chung. Hãy tìm nghiệm chung đó.",
        "explanation": "Giả sử $a$ là nghiệm của cả hai đa thức, ta có $G(a) = H(a) = 0$. Từ đó suy ra:\n$(a^2 - 3a + 2) - (a^2 + a - 6) = G(a) - H(a) = 0$.\nThu gọn vế trái ta được $-4a + 8 = 0$ suy ra $a = 2$. Thử lại bằng cách tính $G(2)$ và $H(2)$, ta thấy $x = 2$ đúng là nghiệm của cả hai đa thức $G(x)$ và $H(x)$.",
        "tags": ["chuong-7", "bai-25"]
      },
      {
        "id": "toan7-sbt-t2-25-7.13",
        "type": "essay",
        "question": "**7.13.** Người ta định dùng những viên gạch với kích thước như nhau để xây một bức tường (có dạng hình hộp chữ nhật) dày $20 \\text{ cm}$, dài $6 \\text{ m}$ và cao $x \\text{ (m)}$. Số gạch đã có là $450$ viên.\na) Tìm đa thức (biến $x$) biểu thị số gạch cần mua thêm để xây tường, biết rằng cứ xây mỗi mét khối tường thì cần $542$ viên gạch. Xác định bậc và hệ số tự do của đa thức đó.\nb) Nếu chỉ dùng số gạch sẵn có thì xây được bức tường cao khoảng bao nhiêu mét? (tính chính xác đến $0,1 \\text{ m}$).",
        "explanation": "a) Bức tường có dạng hình hộp chữ nhật với ba kích thước là $0,2 \\text{ m}$; $6 \\text{ m}$ và $x \\text{ (m)}$.\nThể tích của nó là $0,2 \\cdot 6 \\cdot x = 1,2x \\text{ (m}^3\\text{)}$.\nMỗi mét khối tường xây hết $542$ viên gạch nên số gạch cần dùng để xây bức tường là $542 \\cdot 1,2x = 650,4x$ (viên). Số gạch đã có là $450$ viên.\nVậy số gạch cần mua thêm là:\n$F(x) = 650,4x - 450$.\n\nb) Nếu chỉ dùng số gạch sẵn có để xây tường thì số gạch mua thêm là $0$, tức là $650,4x - 450 = 0$. Từ đó ta tính được $x = 450 : 650,4 \\approx 0,7 \\text{ (m)}$.\nVậy nếu chỉ dùng số gạch có sẵn thì xây được bức tường cao khoảng $0,7 \\text{ m}$.",
        "tags": ["chuong-7", "bai-25"]
      },
      {
        "id": "toan7-sbt-t2-25-7.14",
        "type": "essay",
        "question": "**7.14.** Tìm các hệ số $p$ và $q$ của đa thức $F(x) = x^2 + px + q$, biết rằng với số $a$ tuỳ ý, giá trị của $F(x)$ tại $x = a$, tức là $F(a)$ luôn bằng $(a + 2)^2$.",
        "explanation": "$p = q = 4$.\n\n*HD.* Theo đề bài, với $a$ là một số tuỳ ý, ta luôn có $a^2 + pa + q = (a + 2)^2$.\nHãy chọn $a = 0$ để từ đẳng thức đó suy ra $q = 4$. Sau đó chọn $a = 1$ để suy ra $p = 4$.",
        "tags": ["chuong-7", "bai-25"]
      }
    ]
  }
];

const b26 = [
  {
    "bai": 26,
    "title": "Bài 26: Phép cộng và phép trừ đa thức một biến",
    "questions": [
      {
        "id": "toan7-sbt-t2-26-7.15",
        "type": "essay",
        "question": "**7.15.** Cho hai đa thức $A(x) = x^4 - 5x^3 + x^2 + 5x - \\dfrac{1}{3}$ và $B(x) = x^4 - 2x^3 + x^2 - 5x - \\dfrac{2}{3}$.\nHãy tính $A(x) + B(x)$ và $A(x) - B(x)$.",
        "explanation": "$A(x) + B(x) = 2x^4 - 7x^3 + 2x^2 - 1$;\n\n$A(x) - B(x) = -3x^3 + 10x + \\dfrac{1}{3}$.",
        "tags": ["chuong-7", "bai-26"]
      },
      {
        "id": "toan7-sbt-t2-26-7.16",
        "type": "essay",
        "question": "**7.16.** Cho đa thức $H(x) = x^4 - 3x^3 - x + 1$. Tìm đa thức $P(x)$ và $Q(x)$ sao cho\na) $H(x) + P(x) = x^5 - 2x^2 + 2$;\nb) $H(x) - Q(x) = -2x^3$.",
        "explanation": "a) $P(x) = (x^5 - 2x^2 + 2) - H(x) = x^5 - x^4 + 3x^3 - 2x^2 + x + 1$.\n\nb) $Q(x) = H(x) + 2x^3 = x^4 - x^3 - x + 1$.",
        "tags": ["chuong-7", "bai-26"]
      },
      {
        "id": "toan7-sbt-t2-26-7.17",
        "type": "essay",
        "question": "**7.17.** Em hãy viết hai đa thức tuỳ ý $A(x)$ và $B(x)$. Sau đó tính $C(x) = A(x) - B(x)$ và $C'(x) = B(x) - A(x)$, rồi so sánh và nêu nhận xét về bậc, các hệ số của $C(x)$ và $C'(x)$.",
        "explanation": "Trong mọi trường hợp, các hệ số của hai hạng tử cùng bậc trong hai đa thức $C(x)$ và $C'(x)$ là hai số đối nhau.",
        "tags": ["chuong-7", "bai-26"]
      },
      {
        "id": "toan7-sbt-t2-26-7.18",
        "type": "essay",
        "question": "**7.18.** Cho các đa thức $A(x) = 2x^3 - 2x^2 + x - 4$; $B(x) = 3x^3 - 2x + 3$ và $C(x) = -x^3 + 1$.\nHãy tính:\na) $A(x) + B(x) + C(x)$;\nb) $A(x) - B(x) - C(x)$.",
        "explanation": "a) $4x^3 - 2x^2 - x$;\n\nb) $-2x^2 + 3x - 8$.\n\n*HD.* Nhận xét rằng $A + B + C = A + (B + C)$ và $A - B - C = A - (B + C)$. Do đó để cho gọn, trước hết hãy tính $B + C$.",
        "tags": ["chuong-7", "bai-26"]
      },
      {
        "id": "toan7-sbt-t2-26-7.19",
        "type": "essay",
        "question": "**7.19.** Gọi $S(x)$ là tổng của hai đa thức $A(x)$ và $B(x)$. Biết rằng $x = a$ là một nghiệm của đa thức $A(x)$. Chứng minh rằng:\na) Nếu $x = a$ là một nghiệm của $B(x)$ thì $a$ cũng là một nghiệm của $S(x)$.\nb) Nếu $a$ không là nghiệm của $B(x)$ thì $a$ cũng không là nghiệm của $S(x)$.",
        "explanation": "Theo đề bài, ta có $S(x) = A(x) + B(x)$ và $A(a) = 0$. Do đó $S(a) = B(a)$.\na) Nếu $a$ là nghiệm của $B(x)$ thì $B(a) = 0$, suy ra $S(a) = B(a) = 0$. Vậy $a$ cũng là nghiệm của $S(x)$.\nb) Ngược lại, nếu $a$ không là nghiệm của $B(x)$ thì $B(a) \\ne 0$, suy ra $S(a) = B(a) \\ne 0$. Vậy $a$ không là nghiệm của $S(x)$.",
        "tags": ["chuong-7", "bai-26"]
      }
    ]
  }
];

const b27 = [
  {
    "bai": 27,
    "title": "Bài 27: Phép nhân đa thức một biến",
    "questions": [
      {
        "id": "toan7-sbt-t2-27-7.20",
        "type": "essay",
        "question": "**7.20.** Tính:\na) $(x^3 + 3x^2 - 5x - 1)(4x - 3)$;\nb) $(-2x^2 + 4x + 6)(\\dfrac{-1}{2}x + 1)$;\nc) $(x^4 + 2x^3 - 1)(x^2 - 3x + 2)$.",
        "explanation": "a) $4x^4 + 9x^3 - 29x^2 + 11x + 3$;\nb) $x^3 - 4x^2 + x + 6$;\nc) $x^6 - x^5 - 4x^4 + 4x^3 - x^2 + 3x - 2$.",
        "tags": [
          "chuong-7",
          "bai-27"
        ]
      },
      {
        "id": "toan7-sbt-t2-27-7.21",
        "type": "essay",
        "question": "**7.21.** Bằng cách rút gọn biểu thức, chứng minh rằng mỗi biểu thức sau có giá trị không phụ thuộc vào giá trị của biến.\na) $(x - 5)(2x + 3) - 2x(x - 3) + (x + 7)$;\nb) $(x^2 - 5x + 7)(x - 2) - (x^2 - 3x)(x - 4) - 5(x - 2)$.",
        "explanation": "a) $-8$; b) $-4$.\nHD. Đa thức bằng một số không đổi nên giá trị của nó không phụ thuộc vào giá trị của $x$.",
        "tags": [
          "chuong-7",
          "bai-27"
        ]
      },
      {
        "id": "toan7-sbt-t2-27-7.22",
        "type": "essay",
        "question": "**7.22.** Với giá trị nào của $x$ thì $(x^2 - 2x + 5)(x - 2) = (x^2 + x)(x - 5)$?",
        "explanation": "$x = \\dfrac{5}{7}$. HD. Chuyển vế và thu gọn, ta được $14x - 10 = 0$.",
        "tags": [
          "chuong-7",
          "bai-27"
        ]
      },
      {
        "id": "toan7-sbt-t2-27-7.23",
        "type": "essay",
        "question": "**7.23.** Rút gọn các biểu thức sau rồi tính giá trị của đa thức thu được.\na) $(4x^4 - 6x^2 + 9)(2x^2 + 3)$ tại $x = 0,5$;\nb) $(x^3 + 5x^2 + 2x + 12)(x^2 + 2x + 4) - x(7x^3 + 16x^2 + 36x + 32)$ tại $x = -2$.",
        "explanation": "a) $8x^6 + 27 = 27,125$ khi $x = 0,5$;\nb) $x^5 + 48 = 16$ khi $x = -2$.",
        "tags": [
          "chuong-7",
          "bai-27"
        ]
      },
      {
        "id": "toan7-sbt-t2-27-7.24",
        "type": "essay",
        "question": "**7.24.** Chứng minh rằng tích của hai số tự nhiên lẻ liên tiếp cộng thêm 1 thì luôn chia hết cho 4.\nGợi ý. Mỗi số tự nhiên lẻ luôn viết được dưới dạng $2n - 1$ với $n \\in \\mathbb{N}^*$, hoặc dưới dạng $2n + 1$ với $n \\in \\mathbb{N}$.",
        "explanation": "Hai số tự nhiên lẻ liên tiếp hơn kém nhau 2 đơn vị nên nếu số thứ nhất là $a = 2n - 1$ ($n \\in \\mathbb{N}^*$) thì số thứ hai là $b = a + 2 = 2n + 1$. Khi đó:\n$ab + 1 = (2n - 1)(2n + 1) + 1 = (4n^2 + 2n - 2n - 1) + 1 = 4n^2$.\nRõ ràng $4n^2$ chia hết cho 4 nên ta có điều phải chứng minh.\nChú ý. Nếu viết hai số lẻ liên tiếp là $a = 2n + 1$ và $b = a + 2 = 2n + 3$ ($n \\in \\mathbb{N}$) thì $ab + 1 = (2n + 1)(2n + 3) + 1 = 4(n^2 + 2n + 1) \\vdots 4$.",
        "tags": [
          "chuong-7",
          "bai-27"
        ]
      }
    ]
  }
];

const b28 = [
  {
    "bai": 28,
    "title": "Bài 28: Phép chia đa thức một biến",
    "questions": [
      {
        "id": "toan7-sbt-t2-28-7.25",
        "type": "essay",
        "question": "**7.25.** Tìm số tự nhiên $n$ sao cho đa thức $1,2x^5 - 3x^4 + 3,7x^2$ chia hết cho $x^n$.",
        "explanation": "$n \\in \\{0; 1; 2\\}$. HD. Đa thức đã cho chia hết cho $x^n$ nếu từng hạng tử của nó chia hết cho $x^n$, nói riêng là $3,7x^2$ chia hết cho $x^n$. Điều này xảy ra khi $n \\le 2$.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.26",
        "type": "essay",
        "question": "**7.26.** Thực hiện các phép chia sau:\na) $(-4x^5 + 3x^3 - 2x^2) : (-2x^2)$;\nb) $(0,5x^3 - 1,5x^2 + x) : 0,5x$;\nc) $(x^3 + 2x^2 - 3x + 1) : \\dfrac{1}{3}x^2$.",
        "explanation": "a) $2x^3 - 1,5x + 1$; b) $x^2 - 3x + 2$;\nc) $3x + 6$ (dư $-3x + 1$).\nHD. Cách 1. Đặt tính chia.\nCách 2. Ta có thể viết: $x^3 + 2x^2 - 3x + 1 = (3x + 6)\\dfrac{1}{3}x^2 + (-3x + 1)$.\nDo đa thức $-3x + 1$ có bậc là 1, nhỏ hơn bậc 2 của đa thức chia nên đẳng thức này chứng tỏ $3x + 6$ là thương và $-3x + 1$ là dư trong phép chia đã cho.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.27",
        "type": "essay",
        "question": "**7.27.** Đặt tính và làm phép chia sau:\na) $(x^3 - 4x^2 - x + 12) : (x - 3)$;\nb) $(2x^4 - 3x^3 + 3x^2 + 6x - 14) : (x^2 - 2)$.",
        "explanation": "a) $x^2 - x - 4$; b) $2x^2 - 3x + 7$.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.28",
        "type": "essay",
        "question": "**7.28.** Khi làm phép chia $(6x^3 - 7x^2 - x + 2) : (2x + 1)$, bạn Quỳnh cho kết quả đa thức dư là $4x + 2$.\na) Không làm phép chia, hãy cho biết bạn Quỳnh đúng hay sai, tại sao?\nb) Tìm thương và dư trong phép chia đó.",
        "explanation": "a) Quỳnh sai.\nHD. Chú ý rằng bậc của đa thức dư, nếu khác 0, phải nhỏ hơn bậc của đa thức chia.\nb) Thương là $3x^2 - 5x + 2$ và dư là 0.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.29",
        "type": "essay",
        "question": "**7.29.** Cho hai đa thức $A = 3x^4 + x^3 + 6x - 5$ và $B = x^2 + 1$. Tìm thương $Q$ và dư $R$ trong phép chia $A$ cho $B$ rồi kiểm nghiệm lại rằng $A = BQ + R$.",
        "explanation": "HD. Chia $A$ cho $B$ ta được thương là $Q = 3x^2 + x - 3$ và dư là $R = 5x - 2$.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.30",
        "type": "essay",
        "question": "**7.30.** Thực hiện các phép chia sau:\na) $(2x^4 + x^3 - 3x^2 + 5x - 2) : (x^2 - x + 1)$;\nb) $(x^4 - x^3 - x^2 + 3x) : (x^2 - 2x + 3)$.",
        "explanation": "a) $(2x^4 + x^3 - 3x^2 + 5x - 2) : (x^2 - x + 1) = 2x^2 + 3x - 2$;\nb) $(x^4 - x^3 - x^2 + 3x) : (x^2 - 2x + 3) = x^2 + x - 2$ (dư $-4x + 6$).",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.31",
        "type": "essay",
        "question": "**7.31.** Cho đa thức $A(x) = 3x^4 + 11x^3 - 5x^2 - 19x + 10$. Tìm đa thức $H(x)$ sao cho $A(x) = (3x^2 + 2x - 5) \\cdot H(x)$.",
        "explanation": "$H(x) = A(x) : (3x^2 + 2x - 5) = x^2 + 3x - 2$.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.32",
        "type": "essay",
        "question": "**7.32.** Tìm số $m$ sao cho đa thức $P(x) = 2x^3 - 3x^2 + x + m$ chia hết cho đa thức $x + 2$.",
        "explanation": "Cách 1. Thực hiện phép chia $P(x)$ cho $x + 2$, ta được thương là $2x^2 - 7x + 15$ và dư là $m - 30$.\nĐể phép chia này là phép chia hết thì $m - 30 = 0$, tức là $m = 30$.\nCách 2. Đa thức $P(x)$ chia hết cho $x + 2$ có nghĩa là ta tìm được một đa thức $Q(x)$ để $P(x) = (x + 2)Q(x)$.\nTừ đó ta có $P(-2) = 0$, tức là $-30 + m = 0$. Vậy $m = 30$.\nNgược lại, thay thế $m = 30$ vào $P(x)$ rồi chia $P(x)$ cho $x + 2$, ta thấy đây là phép chia hết.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      },
      {
        "id": "toan7-sbt-t2-28-7.33",
        "type": "essay",
        "question": "**7.33.** Cho đa thức $P(x)$. Chứng minh rằng:\na) Nếu $P(x)$ chia hết cho $x - a$ thì $a$ là một nghiệm của đa thức $P(x)$;\nb) Nếu $x = a$ là một nghiệm của đa thức $P(x)$ thì $P(x)$ chia hết cho $x - a$.",
        "explanation": "a) Giả sử $P(x)$ chia hết cho $x - a$. Gọi $Q(x)$ là đa thức thương, ta có:\n$P(x) = (x - a)Q(x)$. (1)\nTừ đẳng thức (1), ta có $P(a) = 0$. Vậy $a$ là một nghiệm của $P(x)$.\nb) Ngược lại, cho $a$ là một nghiệm của $P(x)$. Giả sử chia $P(x)$ cho $x - a$, ta được thương là $Q(x)$ và dư là $R(x)$, nghĩa là ta có:\n$P(x) = (x - a)Q(x) + R(x)$, (2)\ntrong đó hoặc $R(x) = 0$, hoặc nếu $R(x) \\neq 0$ thì $R(x)$ phải có bậc nhỏ hơn bậc của đa thức $x - a$, tức là nhỏ hơn 1.\nSau đây, ta sẽ chứng tỏ rằng chỉ có thể xảy ra $R(x) = 0$.\nThật vậy, nếu $R(x) \\neq 0$ thì do bậc của $R(x)$ nhỏ hơn 1 nên $R(x)$ có bậc 0.\nNói cách khác, $R(x)$ là một số khác 0 nào đó. Nhưng điều đó là vô lí vì khi đó đẳng thức (2) không thể xảy ra, chẳng hạn khi $x = a$ thì vế trái bằng 0 trong khi vế phải khác 0.\nVậy chỉ có thể xảy ra $R(x) = 0$, nghĩa là $P(x)$ chia hết cho $x - a$.",
        "tags": [
          "chuong-7",
          "bai-28"
        ]
      }
    ]
  }
];

fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-24.json', JSON.stringify(b24, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-25.json', JSON.stringify(b25, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-26.json', JSON.stringify(b26, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-27.json', JSON.stringify(b27, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-28.json', JSON.stringify(b28, null, 2));
