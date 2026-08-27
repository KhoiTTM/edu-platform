const fs = require('fs');

const b31 = [
  {
    "bai": 31,
    "title": "Bài 31: Quan hệ giữa góc và cạnh đối diện trong một tam giác",
    "questions": [
      {
        "id": "toan7-sbt-t2-31-1",
        "type": "essay",
        "question": "**9.1.** Tam giác $ABC$ có cạnh $BC$ dài nhất. Chứng minh số đo góc $A$ lớn hơn hoặc bằng $60^\\circ$.",
        "explanation": "HD. Do cạnh $BC$ dài nhất nên $\\widehat{A} \\ge \\widehat{B}, \\widehat{A} \\ge \\widehat{C}$. Nếu $\\widehat{A} < 60^\\circ$ thì $\\widehat{B} \\le 60^\\circ, \\widehat{C} \\le 60^\\circ$.\nDo đó $\\widehat{A} + \\widehat{B} + \\widehat{C} < 180^\\circ$, vô lí. Vậy $\\widehat{A} \\ge 60^\\circ$.",
        "tags": [
          "chuong-9",
          "bai-31"
        ]
      },
      {
        "id": "toan7-sbt-t2-31-2",
        "type": "essay",
        "question": "**9.2.** Cho tam giác $ABC$ cân tại $A$, hai điểm $D, E$ nằm trên đường thẳng $BC$, $D$ nằm giữa $B$ và $C$, $C$ nằm giữa $D$ và $E$. Hãy chứng minh $AD < AC < AE$.",
        "explanation": "HD. Nếu $AD$ vuông góc với $BC$ thì $AD < AC$ vì $AC$ là cạnh huyền của tam giác vuông $ADC$.\nNếu $AD$ không vuông góc với $BC$ thì trong hai góc bù nhau $ADB$ và $ADC$ có một góc tù và trong tam giác $ADB$ và $ADC$ có một tam giác tù, suy ra cạnh $AD < AB = AC$ hoặc $AD < AC$. Vậy ta luôn có $AD < AC$.\nTam giác $ACE$ có góc $ACE$ là góc tù (vì $ACE$ là góc bù với góc nhọn $ACB$) nên $AE > AC$.\nVậy ta có $AD < AC < AE$.",
        "tags": [
          "chuong-9",
          "bai-31"
        ]
      },
      {
        "id": "toan7-sbt-t2-31-3",
        "type": "essay",
        "question": "**9.3.** Hãy giải thích tại sao trong tam giác vuông, cạnh huyền dài nhất và trong tam giác tù, cạnh đối diện với góc tù là cạnh lớn nhất.",
        "explanation": "HD. Trong tam giác vuông, góc vuông là góc lớn nhất do hai góc còn lại đều là góc nhọn, nên cạnh đối diện với nó là cạnh huyền phải dài nhất.\nTương tự, trong tam giác tù, có một góc tù thì hai góc còn lại đều nhọn nên góc tù là góc lớn nhất; vậy cạnh đối diện góc tù là cạnh lớn nhất.",
        "tags": [
          "chuong-9",
          "bai-31"
        ]
      },
      {
        "id": "toan7-sbt-t2-31-4",
        "type": "essay",
        "question": "**9.4.** Cho tam giác $ABC$ với $AB > AC$. Gọi $M$ là trung điểm của cạnh $BC$.\na) Hãy so sánh hai góc $MAB$ và $MAC$.\n(HD. Lấy điểm $P$ sao cho $M$ là trung điểm của $AP$ rồi chứng minh hai tam giác $AMC$ và $PMB$ bằng nhau).\nb) Tia phân giác của góc $BAC$ cắt $BC$ tại $D$. Hỏi $D$ thuộc đoạn thẳng $MB$ hay đoạn thẳng $MC$? Vì sao?",
        "explanation": "HD. a) Lấy điểm $P$ sao cho $M$ là trung điểm của $AP$ thì $\\Delta AMC = \\Delta PMB$ (c-g-c) do $MC = MB, MA = MP, \\widehat{AMC} = \\widehat{PMB}$ (góc đối đỉnh). Suy ra $AC = PB$ và $\\widehat{MAC} = \\widehat{MPB}$. Do $AB > AC$ suy ra $AB > PB$.\nXét tam giác $ABP$ có $AB > PB$ nên $\\widehat{MPB} > \\widehat{MAB}$, tức là $\\widehat{MAC} > \\widehat{MAB}$.\nb) Ta có $\\widehat{MAC} > \\widehat{MAB}$, $\\widehat{DAC} = \\widehat{DAB}$. Từ đó suy ra:\n$2\\widehat{MAC} > \\widehat{MAC} + \\widehat{MAB} = \\widehat{BAC} = \\widehat{DAB} + \\widehat{DAC} = 2\\widehat{DAC}$ nên $\\widehat{MAC} > \\widehat{DAC}$.\nVậy $D$ thuộc đoạn thẳng $MC$.",
        "tags": [
          "chuong-9",
          "bai-31"
        ]
      }
    ]
  }
];

const b32 = [
  {
    "bai": 32,
    "title": "Bài 32: Quan hệ giữa đường vuông góc và đường xiên",
    "questions": [
      {
        "id": "toan7-sbt-t2-32-5",
        "type": "essay",
        "question": "**9.5.** Cho hai đường thẳng song song $c$ và $d$. Chứng minh rằng khoảng cách từ mọi điểm thuộc $c$ đến đường thẳng $d$ bằng nhau và bằng khoảng cách từ mọi điểm thuộc đường thẳng $d$ đến đường thẳng $c$ (khoảng cách đó được gọi là khoảng cách giữa hai đường thẳng song song $c$ và $d$).",
        "explanation": "Lấy $M, M'$ thuộc $c$ ($M$ khác $M'$), kẻ $MH, M'H'$ vuông góc với $d$ thì $MH \\parallel M'H'$.\nXét hai tam giác $MHH'$ và $H'M'M$ có:\n$MH'$ chung, $\\widehat{M_1} = \\widehat{H'_2}$ (so le trong), $\\widehat{M_2} = \\widehat{H'_1}$ (so le trong).\nDo đó $\\Delta MHH' = \\Delta H'M'M$ (g.c.g).\nSuy ra $MH = H'M'$ (độ dài $MH$ gọi là khoảng cách từ $d$ đến $c$).",
        "tags": [
          "chuong-9",
          "bai-32"
        ]
      },
      {
        "id": "toan7-sbt-t2-32-6",
        "type": "essay",
        "question": "**9.6.** Cho hai điểm phân biệt $M, M'$ ở cùng phía đối với đường thẳng $d$ ($M, M'$ không thuộc $d$). Chứng minh rằng nếu $M, M'$ có cùng khoảng cách đến đường thẳng $d$ thì $MM'$ song song với $d$.",
        "explanation": "HD. Kẻ $MH, M'H'$ vuông góc với $d$ thì $MH \\parallel M'H'$. Theo giả thiết $MH = M'H'$.\nXét hai tam giác $MHH'$ và $H'M'M$ có:\n$MH'$ chung, $MH = H'M', \\widehat{HMH'} = \\widehat{M'H'M}$ (so le trong).\nDo đó $\\Delta MHH' = \\Delta H'M'M$ (g.c.g). Suy ra $\\widehat{MH'H} = \\widehat{H'MM'}$, hai góc này ở vị trí so le trong nên $MM' \\parallel d$.",
        "tags": [
          "chuong-9",
          "bai-32"
        ]
      },
      {
        "id": "toan7-sbt-t2-32-7",
        "type": "essay",
        "question": "**9.7.** Dùng thước hai lề ta có thể dựng cặp đường thẳng song song với khoảng cách $h$ không đổi.\nCho góc $xOy$. Dùng thước hai lề dựng cặp đường thẳng song song gồm đường thẳng chứa tia $Ox$ và đường thẳng $x'$ (sao cho $x'$ cắt $Oy$) rồi dùng thước hai lề đó, dựng cặp đường thẳng song song gồm đường thẳng chứa tia $Oy$ và đường thẳng $y'$ (sao cho $y'$ cắt $Ox$). Hai đường thẳng $x'$ và $y'$ cắt nhau tại $P$. Chứng minh rằng tia $OP$ là tia phân giác của góc $xOy$.",
        "explanation": "HD. Do $P$ thuộc đường thẳng $x'$ nên $P$ cách $x$ khoảng cách $h$; do $P$ thuộc $y'$ nên $P$ cách $y$ một khoảng là $h$. Vậy $P$ cách đều hai đường thẳng $Ox, Oy$. Theo cách dựng, $P$ nằm trong góc $xOy$. Vậy $P$ nằm trên tia phân giác của góc $xOy$.",
        "tags": [
          "chuong-9",
          "bai-32"
        ]
      },
      {
        "id": "toan7-sbt-t2-32-8",
        "type": "essay",
        "question": "**9.8.** Cho tam giác $ABC$ cân tại $A$. Chứng minh rằng khoảng cách từ $B$ đến đường thẳng $AC$ bằng khoảng cách từ $C$ đến đường thẳng $AB$.",
        "explanation": "HD. Kẻ đoạn thẳng $BI$ vuông góc với đường thẳng $AC$ và đoạn thẳng $CK$ vuông góc với đường thẳng $AB$. Hai tam giác vuông $BCK$ và $CBI$ bằng nhau (cạnh huyền $BC$ chung, $\\widehat{B} = \\widehat{C}$ (hai góc ở đáy $BC$ của tam giác cân $ABC$)). Suy ra $BI = CK$.",
        "tags": [
          "chuong-9",
          "bai-32"
        ]
      },
      {
        "id": "toan7-sbt-t2-32-9",
        "type": "essay",
        "question": "**9.9.** Cho tam giác $ABC$ cân tại $A$ và một điểm $M$ tuỳ ý thuộc đoạn thẳng $BC$. Chứng minh rằng tổng khoảng cách từ điểm $M$ đến các đường thẳng $AB, AC$ là một số không đổi.",
        "explanation": "HD. Khi $M$ trùng $B$ hay $C$ thì tổng khoảng cách đó là $BI$ hay $CK$; theo Bài 9.8, $BI = CK$.\nKhi $M$ khác $B$, khác $C$, kẻ $MP$ vuông góc $AC$, kẻ $MQ$ vuông góc với $AB$ thì tổng khoảng cách đang xét là $MQ + MP$.\nQua $M$ kẻ đường thẳng song song với $AC$, nó cắt $AB$ tại $R$, cắt $BI$ tại $S$.\nTam giác $RBM$ cân tại $R$ do hai góc tại $B$ và $M$ bằng nhau. $MQ$ là khoảng cách từ $M$ đến $RB, BS$ là khoảng cách từ $B$ đến $RM$. Theo Bài 9.8, $BS = MQ$.\nTa có $MR \\parallel AC, MP$ và $SI$ có độ dài là khoảng cách giữa hai đường thẳng đó nên $MP = SI$.\nSuy ra $MP + MQ = BS + SI = BI = CK$.",
        "tags": [
          "chuong-9",
          "bai-32"
        ]
      }
    ]
  }
];

const b33 = [
  {
    "bai": 33,
    "title": "Bài 33: Quan hệ giữa ba cạnh của một tam giác",
    "questions": [
      {
        "id": "toan7-sbt-t2-33-10",
        "type": "essay",
        "question": "**9.10.** Cho tam giác có độ dài cạnh lớn nhất bằng $4 \\text{ cm}$. Hãy giải thích tại sao chu vi tam giác đó bé hơn $12 \\text{ cm}$ và lớn hơn $8 \\text{ cm}$.",
        "explanation": "Gọi độ dài ba cạnh tam giác là $a, b, c \\text{ (cm)}$; $a = 4, b < 4, c < 4$.\nSuy ra $a + b + c < 4 + 4 + 4 = 12$.\nMặt khác theo bất đẳng thức tam giác, $b + c > a$, suy ra $a + b + c > 2a = 8$.",
        "tags": [
          "chuong-9",
          "bai-33"
        ]
      },
      {
        "id": "toan7-sbt-t2-33-11",
        "type": "essay",
        "question": "**9.11.** Tam giác $ABC$ có $AB = 2 \\text{ cm}, BC = 5 \\text{ cm}, AC = b \\text{ (cm)}$ với $b$ là một số nguyên. Hỏi $b$ có thể bằng bao nhiêu?",
        "explanation": "Ta có $AC = b \\text{ (cm)}$ thì $5 - 2 < b < 5 + 2$ tức là $3 < b < 7$. Vì $b$ nguyên nên $b \\in \\{4; 5; 6\\}$.",
        "tags": [
          "chuong-9",
          "bai-33"
        ]
      },
      {
        "id": "toan7-sbt-t2-33-12",
        "type": "essay",
        "question": "**9.12.** Tam giác $ABC$ có $AB = 2 \\text{ cm}, BC = 3 \\text{ cm}$. Đặt $CA = b \\text{ (cm)}$.\na) Chứng minh rằng $1 < b < 5$.\nb) Giả sử rằng với $1 < b < 5$, có tam giác $ABC$ thoả mãn $AB = 2 \\text{ cm}, BC = 3 \\text{ cm}, CA = b \\text{ (cm)}$. Với mỗi tam giác đó, hãy sắp xếp ba góc $A, B, C$ theo thứ tự từ bé đến lớn.",
        "explanation": "a) Theo bất đẳng thức tam giác ta có $3 - 2 < b < 3 + 2$, tức là $1 < b < 5$.\nb) Với $1 < b \\le 2$, do $CA \\le AB < BC$ nên $\\widehat{B} \\le \\widehat{C} < \\widehat{A}$;\nVới $2 < b \\le 3$, do $AB < CA \\le BC$ nên $\\widehat{C} < \\widehat{B} \\le \\widehat{A}$;\nVới $3 < b < 5$, do $AB < BC < CA$ nên $\\widehat{C} < \\widehat{A} < \\widehat{B}$.",
        "tags": [
          "chuong-9",
          "bai-33"
        ]
      },
      {
        "id": "toan7-sbt-t2-33-13",
        "type": "essay",
        "question": "**9.13.** a) Cho $P$ là một điểm bên trong tam giác $ABC$. Chứng minh rằng $AB + AC > PB + PC$.\nb) Cho $M$ là một điểm bên trong tam giác $ABC$. Chứng minh rằng $\\dfrac{1}{2}(AB + BC + CA) < MA + MB + MC < AB + BC + CA$.",
        "explanation": "HD. a) Đường thẳng $BP$ cắt cạnh $AC$ tại $N$ thì\n$AB + AC = (AB + AN) + NC > BN + NC = (PB + NP) + NC = PB + (NP + NC) > PB + PC$.\nb) (H.9.17b) Ta có $MA + MB > AB$, $MB + MC > BC$, $MC + MA > CA$ nên ta suy ra được $2(MA + MB + MC) > AB + BC + CA$.\nMặt khác theo a), ta có $AB + AC > MB + MC$, $AC + BC > MA + MB$, $BC + BA > MC + MA$ nên ta suy ra được $2(AB + BC + CA) > 2(MA + MB + MC)$.",
        "tags": [
          "chuong-9",
          "bai-33"
        ]
      }
    ]
  }
];

const b34 = [
  {
    "bai": 34,
    "title": "Bài 34: Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong một tam giác",
    "questions": [
      {
        "id": "toan7-sbt-t2-34-1",
        "type": "essay",
        "question": "**9.14.** Cho góc $xAy$ và một điểm $G$ trong góc đó. Lấy hai điểm $M, N$ trên tia $AG$ sao cho $AM = \\dfrac{3}{2} AG$, $AN = 2AM$. Qua $N$ kẻ đường thẳng song song với đường thẳng chứa tia $Ax$, nó cắt $Ay$ tại $C$. Đường thẳng $CM$ cắt $Ax$ tại $B$.\na) Chứng minh hai tam giác $ABM$ và $NCM$ bằng nhau, từ đó suy ra $AM$ là đường trung tuyến của tam giác $ABC$.\nb) Chứng minh rằng $G$ là trọng tâm của tam giác $ABC$ vừa dựng được.",
        "explanation": "HD. (H.9.18) a) Từ $AN = 2AM$ suy ra $AM = NM$.\nTa có $\\widehat{MAB} = \\widehat{MNC}$ (góc so le trong do $NC \\parallel Ax$); $\\widehat{AMB} = \\widehat{NMC}$ (góc đối đỉnh). Vậy $\\Delta ABM = \\Delta NCM$ (g.c.g). Suy ra $MB = MC$ hay $M$ là trung điểm của $BC$. Vậy $AM$ là đường trung tuyến của tam giác $ABC$.\nb) Điểm $G$ nằm trên đường trung tuyến $AM$ của tam giác $ABC$ mà $AG = \\dfrac{2}{3} AM$ nên $G$ là trọng tâm của tam giác $ABC$.",
        "tags": [
          "chuong-9",
          "bai-34"
        ]
      },
      {
        "id": "toan7-sbt-t2-34-2",
        "type": "essay",
        "question": "**9.15.** Gọi $M$ là trung điểm của cạnh $BC$ của tam giác $ABC$ và $D$ là điểm sao cho $M$ là trung điểm của $AD$. Đường thẳng qua $D$ và trung điểm của $AB$ cắt $BC$ tại $U$, đường thẳng qua $D$ và trung điểm của $AC$ cắt $BC$ tại $V$. Chứng minh $BU = UV = VC$.",
        "explanation": "HD. (H.9.19) Đường thẳng $BM$ và đường thẳng $DU$ là hai đường trung tuyến của tam giác $ABD$ nên $U$ là trọng tâm tam giác đó, suy ra $BU = 2UM = \\dfrac{2}{3}BM$. Đường thẳng $CM$ và đường thẳng $DV$ là hai đường trung tuyến của tam giác $ACD$ nên $V$ là trọng tâm của tam giác đó, suy ra $VC = 2VM = \\dfrac{2}{3}CM$. Do $BM = CM$, nên $UV = UM + VM = \\dfrac{2}{3}BM$. Vậy $BU = VC = UV$.",
        "tags": [
          "chuong-9",
          "bai-34"
        ]
      },
      {
        "id": "toan7-sbt-t2-34-3",
        "type": "essay",
        "question": "**9.16.** a) Gọi $I$ là giao điểm của hai đường phân giác $BE$ và $CF$ của tam giác $ABC$. Đường thẳng qua $I$ song song với $BC$ cắt $AB$ tại $J$ và cắt $AC$ tại $K$. Chứng minh $JK = BJ + CK$.\nb) Đường thẳng qua $B$ vuông góc với $BI$ cắt đường thẳng qua $C$ vuông góc với $CI$ tại điểm $I'$. Qua $I'$ kẻ đường thẳng song song với $BC$ cắt $AB$ tại $J'$, cắt $AC$ tại $K'$. Chứng minh $J'K' = BJ' + CK'$.",
        "explanation": "a) Từ tính chất tia phân giác suy ra $\\widehat{JBI} = \\widehat{JIB}$, do đó $\\Delta BJI$ cân tại $J$, suy ra $JI = BJ$.\nTương tự, từ tính chất tia phân giác suy ra tam giác $KCI$ cân tại $K$ nên $KI = CK$.\nVậy $JK = JI + IK = BJ + CK$.\nb) Vì $BI'$ vuông góc với $BI$, suy ra $BI'$ là tia phân giác của góc tạo bởi $BC$ và tia đối của tia $BA$ (phân giác ngoài tại $B$). Tương tự như thế, $CI'$ là tia phân giác của góc tạo bởi $CB$ và tia đối của tia $CA$ (phân giác ngoài tại $C$). Chứng minh tiếp tục tương tự chứng minh câu a).",
        "tags": [
          "chuong-9",
          "bai-34"
        ]
      },
      {
        "id": "toan7-sbt-t2-34-4",
        "type": "essay",
        "question": "**9.17.** Tam giác $ABC$ có $AD, BE$ là hai đường phân giác và $\\widehat{BAC} = 120^\\circ$. Chứng minh rằng $DE$ là tia phân giác của góc $ADC$.",
        "explanation": "HD. (H.9.21) Gọi $Ax$ là tia đối của tia $AB$ thì ba góc $\\widehat{BAD}$, $\\widehat{DAC}$, $\\widehat{CAx}$ có cùng số đo $60^\\circ$.\nHạ $EH \\perp Bx$, $EI \\perp AD$, $EK \\perp BC$. Ta có:\n$EH = EK$ (vì $BE$ là phân giác góc $ABC$),\n$EH = EI$ (vì $AE$ là phân giác góc $DAx$).\nSuy ra $EK = EI$, hay $E$ nằm trên tia phân giác của góc $ADC$.",
        "tags": [
          "chuong-9",
          "bai-34"
        ]
      },
      {
        "id": "toan7-sbt-t2-34-5",
        "type": "essay",
        "question": "**9.18.** Cho tam giác $ABC$ với $M$ là trung điểm của $BC$. Lấy điểm $N$ sao cho $C$ là trung điểm của đoạn thẳng $BN$. Lấy điểm $P$ sao cho $M$ là trung điểm của đoạn thẳng $AP$. Chứng minh đường thẳng $AC$ đi qua trung điểm của $PN$, đường thẳng $PC$ đi qua trung điểm của $AN$.",
        "explanation": "HD. (H.9.22) Trong tam giác $ANP$, đường $NM$ là trung tuyến mà $NC = BC = 2CM$ nên $C$ là trọng tâm của tam giác $ANP$. Vậy $AC$, $PC$ là hai đường trung tuyến của tam giác đó. Vì thế $AC$ đi qua trung điểm của $PN$ và $PC$ đi qua trung điểm của $AN$.",
        "tags": [
          "chuong-9",
          "bai-34"
        ]
      }
    ]
  }
];

const b35 = [
  {
    "bai": 35,
    "title": "Bài 35: Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác",
    "questions": [
      {
        "id": "toan7-sbt-t2-35-1",
        "type": "essay",
        "question": "**9.19.** Cho tam giác $ABC$ vuông. Kẻ đường thẳng vuông góc với cạnh huyền $BC$ của tam giác $ABC$ tại điểm $D$ không thuộc đoạn $BC$. Nó cắt đường thẳng chứa cạnh $AB$ tại $E$ và cắt đường thẳng chứa cạnh $AC$ tại $F$. Xác định trực tâm của tam giác $BEF$.",
        "explanation": "HD. (H.9.23) Trong tam giác $BEF$, đường cao xuất phát từ $B$ là đường thẳng $BD$; đường cao xuất phát từ $F$ là đường thẳng $FA$. Hai đường cao cắt nhau tại $C$. Vậy $C$ là trực tâm của tam giác $BEF$.",
        "tags": [
          "chuong-9",
          "bai-35"
        ]
      },
      {
        "id": "toan7-sbt-t2-35-2",
        "type": "essay",
        "question": "**9.20.** Cho $P$ là một điểm nằm trong góc nhọn $xOy$. Gọi $M$ là điểm sao cho $Ox$ là đường trung trực của đoạn thẳng $PM$, gọi $N$ là điểm sao cho $Oy$ là đường trung trực của đoạn thẳng $PN$. Đường thẳng $MN$ cắt $Ox$ tại $R$, cắt $Oy$ tại $S$. Chứng minh tia $PO$ là tia phân giác của góc $RPS$.",
        "explanation": "HD. (H.9.24) Tam giác $OPM$ là tam giác cân tại $O$, $RPM$ là tam giác cân tại $R$ nên suy ra $\\widehat{OMR} = \\widehat{OPR}$. Tam giác $OPN$ là tam giác cân tại $O$, tam giác $SPN$ là tam giác cân tại $S$ nên suy ra $\\widehat{ONS} = \\widehat{OPS}$.\nVì $OM = OP = ON$ nên tam giác $OMN$ là tam giác cân tại $O$, do đó $\\widehat{OMR} = \\widehat{ONS}$.\nSuy ra $\\widehat{OPR} = \\widehat{OPS}$, tức $PO$ là tia phân giác của góc $RPS$.",
        "tags": [
          "chuong-9",
          "bai-35"
        ]
      },
      {
        "id": "toan7-sbt-t2-35-3",
        "type": "essay",
        "question": "**9.21.** Gọi $H$ là trực tâm của tam giác nhọn $ABC$. Khi $AH = BC$, hãy chứng minh $\\widehat{BAC} = 45^\\circ$.",
        "explanation": "HD. (H.9.25) Gọi $BJ$ là đường cao xuất phát từ $B$ của tam giác $ABC$ thì hai tam giác vuông $AHJ$ và $BCJ$ bằng nhau do các cạnh huyền $AH$ và $BC$ bằng nhau, $\\widehat{JAH} = \\widehat{JBC}$ (vì cùng phụ với $\\widehat{JCB}$). Suy ra $AJ = BJ$. Tam giác $JAB$ vuông tại $J$ nên $\\Delta JAB$ là tam giác vuông cân.\nVậy $\\widehat{BAC} = 45^\\circ$.",
        "tags": [
          "chuong-9",
          "bai-35"
        ]
      },
      {
        "id": "toan7-sbt-t2-35-4",
        "type": "essay",
        "question": "**9.22.** a) Giả sử đường trung trực $d$ của cạnh $BC$ của tam giác $ABC$ cắt cạnh $AC$ tại một điểm $D$ nằm giữa $A$ và $C$. Chứng minh $AC > AB$.\nb) Hỏi đảo lại có đúng không tức là nếu tam giác $ABC$ có $AC > AB$ thì đường trung trực $d$ của cạnh $BC$ có cắt $AC$ tại điểm nằm giữa $A$ và $C$ không?\nc) Vẫn giả sử đường trung trực $d$ của cạnh $BC$ của tam giác $ABC$ cắt cạnh $AC$ tại một điểm $D$ nằm giữa $A$ và $C$. Với $M$ là một điểm tuỳ ý thuộc $d$, $M$ khác $D$, hãy chứng minh $MA + MB > DA + DB$.",
        "explanation": "a) Nếu đường trung trực $d$ của cạnh $BC$ cắt cạnh $AC$ tại điểm $M$ nằm giữa $A$ và $C$ thì $MB = MC$ nên $AC = AM + MC = AM + MB$. Trong tam giác $ABM$, theo bất đẳng thức tam giác, ta có $AM + MB > AB$. Vậy $AC > AB$.\nb) Điều đảo lại cũng đúng: đường trung trực của $BC$ không thể đi qua $A$ vì nếu thế thì $AC = AB$, nên $d$ phải cắt đoạn thẳng $AB$ tại điểm nằm giữa $A$ và $B$, lúc đó $AB > AC$ (chứng minh tương tự câu a) hoặc phải cắt đoạn thẳng $AC$ tại điểm nằm giữa $A$ và $C$, lúc đó $AC > AB$. Vì giả thiết $AC > AB$ nên đường trung trực của đoạn thẳng $BC$ phải cắt đoạn thẳng $AC$ tại điểm nằm giữa $A$ và $C$.\nc) Do $MB = MC$ nên $MA + MB = MA + MC$; vì $M$ khác $D$, trong tam giác $AMC$ theo bất đẳng thức tam giác, ta có $MA + MC > AC = AD + DC = AD + DB$.",
        "tags": [
          "chuong-9",
          "bai-35"
        ]
      }
    ]
  }
];

const b36 = [
  {
    "bai": 36,
    "title": "Bài 36: Hình hộp chữ nhật và hình lập phương",
    "questions": [
      {
        "id": "toan7-sbt-t2-36-10.1",
        "type": "essay",
        "question": "**10.1.** Gọi tên các đỉnh, cạnh, đường chéo, mặt của hình lập phương trong Hình 10.2.\n(Mô tả: Hình lập phương $ABCD.MNPQ$ với $ABCD$ là mặt trên, $MNPQ$ là mặt dưới tương ứng).",
        "explanation": "Các đỉnh: $A, B, C, D, M, N, P, Q$.\nCác cạnh: $AB, BC, CD, DA, MN, NP, PQ, QM, AM, BN, CP, DQ$.\nCác đường chéo: $AP, BQ, CM, DN$.\nCác mặt: $ABCD, MNPQ, ABNM, BCPN, CDQP, ADQM$.",
        "tags": ["chuong-X", "bai-36"]
      },
      {
        "id": "toan7-sbt-t2-36-10.2",
        "type": "essay",
        "question": "**10.2.** Hộp đựng khối rubik có dạng là một hình lập phương có cạnh $3 \\text{ cm}$, được làm bằng bìa cứng. Tính thể tích của chiếc hộp và diện tích bìa cứng để làm chiếc hộp đó.",
        "explanation": "Thể tích của chiếc hộp là $V = 3^3 = 27$ ($\\text{cm}^3$).\nDiện tích bìa cứng dùng để làm chiếc hộp là: $S = 6 \\cdot 3^2 = 54$ ($\\text{cm}^2$).",
        "tags": ["chuong-X", "bai-36"]
      },
      {
        "id": "toan7-sbt-t2-36-10.3",
        "type": "essay",
        "question": "**10.3.** Một cái bể chứa nước có dạng hình hộp chữ nhật dài $2 \\text{ m}$, rộng $1,5 \\text{ m}$, cao $1,2 \\text{ m}$. Lúc đầu bể chứa đầy nước, sau đó người ta lấy ra 45 thùng nước, mỗi thùng 20 lít. Hỏi sau khi lấy nước ra, mực nước trong bể cao bao nhiêu?",
        "explanation": "Thể tích của bể chứa là: $V = 2 \\cdot 1,5 \\cdot 1,2 = 3,6$ ($\\text{m}^3$).\nĐổi $3,6 \\text{ m}^3 = 3\\,600 \\text{ dm}^3 = 3\\,600 \\text{ l}$.\nLượng nước lấy ra là: $20 \\cdot 45 = 900 \\text{ (l)}$.\nLượng nước còn lại trong bể là: $3\\,600 - 900 = 2\\,700 \\text{ (l)}$.\nĐổi $2\\,700 \\text{ l} = 2,7 \\text{ m}^3$.\nDiện tích đáy bể là: $2 \\cdot 1,5 = 3$ ($\\text{m}^2$).\nMực nước trong bể cao là: $2,7 : 3 = 0,9 \\text{ (m)}$.",
        "tags": ["chuong-X", "bai-36"]
      },
      {
        "id": "toan7-sbt-t2-36-10.4",
        "type": "essay",
        "question": "**10.4.** Tính thể tích của một hình lập phương, biết tổng diện tích các mặt của nó là $216 \\text{ cm}^2$.",
        "explanation": "Diện tích một mặt của hình lập phương là: $216 : 6 = 36$ ($\\text{cm}^2$).\nGọi độ dài cạnh hình lập phương là $a$. Ta có: $a^2 = 36$ nên $a = 6 \\text{ (cm)}$.\nThể tích của hình lập phương là: $V = a^3 = 6^3 = 216$ ($\\text{cm}^3$).",
        "tags": ["chuong-X", "bai-36"]
      },
      {
        "id": "toan7-sbt-t2-36-10.5",
        "type": "essay",
        "question": "**10.5.** Một bể nước dạng hình hộp chữ nhật có chiều dài $2 \\text{ m}$. Lúc đầu bể không có nước. Sau khi đổ vào bể 120 thùng nước, mỗi thùng chứa 20 lít thì mực nước trong bể cao $0,8 \\text{ m}$.\na) Tính chiều rộng của bể nước.\nb) Người ta đổ thêm vào bể 60 thùng nước nữa thì đầy bể. Hỏi bể nước cao bao nhiêu mét?",
        "explanation": "a) Thể tích nước đổ vào bể là: $V = 120 \\cdot 20 = 2\\,400 \\text{ (l)}$.\nĐổi $2\\,400 \\text{ l} = 2\\,400 \\text{ dm}^3 = 2,4 \\text{ (m}^3)$.\nChiều rộng của bể là: $2,4 : (2 \\cdot 0,8) = 1,5 \\text{ (m)}$.\nb) Lượng nước khi đầy bể là: $180 \\cdot 20 = 3\\,600 \\text{ (l)}$.\nĐổi $3\\,600 \\text{ l} = 3,6$ ($\\text{m}^3$).\nChiều cao của bể là: $3,6 : (2 \\cdot 1,5) = 1,2 \\text{ (m)}$.",
        "tags": ["chuong-X", "bai-36"]
      },
      {
        "id": "toan7-sbt-t2-36-10.6",
        "type": "essay",
        "question": "**10.6.** Bạn Hà có một bể cá có dạng hình lập phương có độ dài cạnh $10 \\text{ cm}$. Ban đầu nước trong bể có độ cao $5 \\text{ cm}$. Bạn Hà bỏ thêm vào trong bể một hòn đá trang trí chìm trong nước thì nước trong bể có độ cao $7 \\text{ cm}$ (H.10.3). Hỏi hòn đá bạn Hà bỏ vào bể có thể tích bao nhiêu $\\text{cm}^3$?",
        "explanation": "Tổng thể tích của nước và hòn đá là:\n$V_1 = 10 \\cdot 10 \\cdot 7 = 700$ ($\\text{cm}^3$).\nThể tích nước trong bể ban đầu là:\n$V_2 = 10 \\cdot 10 \\cdot 5 = 500$ ($\\text{cm}^3$).\nThể tích của hòn đá là:\n$V = V_1 - V_2 = 700 - 500 = 200$ ($\\text{cm}^3$).",
        "tags": ["chuong-X", "bai-36"]
      },
      {
        "id": "toan7-sbt-t2-36-10.7",
        "type": "essay",
        "question": "**10.7.** Một bể nước hình hộp chữ nhật có kích thước đáy là $2 \\text{ m} \\times 3 \\text{ m}$ chưa có nước. Mở vòi nước chảy vào bể trong 8 giờ, mỗi giờ vòi chảy được 500 lít nước. Hỏi khi đó mực nước trong bể cao bao nhiêu mét?",
        "explanation": "Đổi $500 \\text{ l} = 500 \\text{ dm}^3 = 0,5 \\text{ m}^3$.\nLượng nước vòi chảy vào bể trong 8 giờ là: $0,5 \\cdot 8 = 4$ ($\\text{m}^3$).\nGọi $c$ là chiều cao nước trong bể, ta có\n$2 \\cdot 3 \\cdot c = 4$ nên $c = \\dfrac{2}{3} \\text{ (m)}$.\nVậy mực nước trong bể cao $\\dfrac{2}{3} \\text{ m}$.",
        "tags": ["chuong-X", "bai-36"]
      },
      {
        "id": "toan7-sbt-t2-36-10.8",
        "type": "essay",
        "question": "**10.8.** Tính thể tích của hình hộp chữ nhật biết nó có diện tích xung quanh là $10\\,000 \\text{ cm}^2$, chiều cao bằng $50 \\text{ cm}$ và chiều dài hơn chiều rộng $12 \\text{ cm}$.",
        "explanation": "Chu vi đáy của hình hộp chữ nhật là: $10\\,000 : 50 = 200 \\text{ (cm)}$.\nNửa chu vi đáy của hình hộp chữ nhật là: $200 : 2 = 100 \\text{ (cm)}$.\nChiều dài của hình hộp chữ nhật là: $(100 + 12) : 2 = 56 \\text{ (cm)}$.\nChiều rộng của hình hộp chữ nhật là: $100 - 56 = 44 \\text{ (cm)}$.\nThể tích của hình hộp chữ nhật là: $V = 56 \\cdot 44 \\cdot 50 = 123\\,200$ ($\\text{cm}^3$).",
        "tags": ["chuong-X", "bai-36"]
      }
    ]
  }
];

const b37 = [
  {
    "bai": 37,
    "title": "Bài 37: Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác",
    "questions": [
      {
        "id": "toan7-sbt-t2-37-10.9",
        "type": "essay",
        "question": "**10.9.** Gọi tên đỉnh, cạnh đáy, cạnh bên, mặt đáy, mặt bên của hình lăng trụ đứng tứ giác $MNPQ.M'N'P'Q'$ trong Hình 10.7.",
        "explanation": "Các đỉnh: $M, N, P, Q, M', N', P', Q'$.\nCác cạnh đáy: $MN, NP, PQ, QM, M'N', N'P', P'Q', Q'M'$.\nCác cạnh bên: $MM', NN', PP', QQ'$.\nCác mặt đáy: $MNPQ, M'N'P'Q'$.\nCác mặt bên: $MNN'M', NPP'N', PQQ'P', MQQ'M'$.",
        "tags": ["chuong-X", "bai-37"]
      },
      {
        "id": "toan7-sbt-t2-37-10.10",
        "type": "essay",
        "question": "**10.10.** Tính thể tích hình lăng trụ đứng tam giác trong Hình 10.8.\n(Biết lăng trụ đứng có đáy là tam giác với chiều cao $5 \\text{ cm}$, cạnh đáy $10 \\text{ cm}$ và chiều cao lăng trụ là $15 \\text{ cm}$)",
        "explanation": "Diện tích đáy của hình lăng trụ là $S = \\dfrac{1}{2} \\cdot 10 \\cdot 5 = 25$ ($\\text{cm}^2$).\nThể tích lăng trụ là $V = S \\cdot h = 25 \\cdot 15 = 375$ ($\\text{cm}^3$).",
        "tags": ["chuong-X", "bai-37"]
      },
      {
        "id": "toan7-sbt-t2-37-10.11",
        "type": "essay",
        "question": "**10.11.** Một hình lăng trụ đứng đáy là một tứ giác có chu vi $30 \\text{ cm}$, chiều cao của hình lăng trụ là $8 \\text{ cm}$. Tính diện tích xung quanh của hình lăng trụ đó.",
        "explanation": "Diện tích xung quanh của hình lăng trụ là $S_{xq} = C \\cdot h = 30 \\cdot 8 = 240$ ($\\text{cm}^2$).",
        "tags": ["chuong-X", "bai-37"]
      },
      {
        "id": "toan7-sbt-t2-37-10.12",
        "type": "essay",
        "question": "**10.12.** Một lăng kính thuỷ tinh có dạng hình lăng trụ đứng có đáy là tam giác đều, kích thước như trong Hình 10.9 (cạnh đáy $3 \\text{ cm}$, chiều cao đáy $2,6 \\text{ cm}$, chiều cao lăng trụ $10 \\text{ cm}$).\na) Tính thể tích của lăng kính thuỷ tinh.\nb) Người ta làm một chiếc hộp bằng bìa cứng để đựng vừa khít lăng kính thuỷ tinh nói trên (hở hai đáy tam giác). Tính diện tích bìa cần dùng (bỏ qua mép nối).",
        "explanation": "a) Diện tích đáy của lăng kính là $S = \\dfrac{1}{2} \\cdot 3 \\cdot 2,6 = 3,9$ ($\\text{cm}^2$).\nThể tích lăng kính thuỷ tinh là $V = S \\cdot h = 3,9 \\cdot 10 = 39$ ($\\text{cm}^3$).\nb) Diện tích bìa cứng cần dùng là $S_{xq} = (3 + 3 + 3) \\cdot 10 = 90$ ($\\text{cm}^2$).",
        "tags": ["chuong-X", "bai-37"]
      },
      {
        "id": "toan7-sbt-t2-37-10.13",
        "type": "essay",
        "question": "**10.13.** Một hình lăng trụ đứng có hình khai triển như Hình 10.10 (các mặt bên có kích thước $5 \\text{ cm}$, $4 \\text{ cm}$, $3 \\text{ cm}$ và chiều cao $8 \\text{ cm}$). Tính diện tích xung quanh của hình lăng trụ.",
        "explanation": "Diện tích xung quanh của hình lăng trụ là\n$S_{xq} = (5 + 4 + 3) \\cdot 8 = 96$ ($\\text{cm}^2$).",
        "tags": ["chuong-X", "bai-37"]
      },
      {
        "id": "toan7-sbt-t2-37-10.14",
        "type": "essay",
        "question": "**10.14.** Cho hình lăng trụ đứng $MNPQ.M'N'P'Q'$ có đáy $MNPQ$ là hình thang vuông tại $M$ và $N$. Kích thước các cạnh như trong Hình 10.11 ($MQ = 20 \\text{ cm}$, $NP = 10 \\text{ cm}$, $MN = 8 \\text{ cm}$, chiều cao lăng trụ $15 \\text{ cm}$). Tính thể tích hình lăng trụ.",
        "explanation": "Diện tích hình thang vuông $MNPQ$ là\n$S = \\dfrac{1}{2}(MQ + NP)MN = \\dfrac{1}{2}(20 + 10) \\cdot 8 = 120$ ($\\text{cm}^2$).\nThể tích của hình lăng trụ đứng $MNPQ.M'N'P'Q'$ là\n$V = S \\cdot h = 120 \\cdot 15 = 1\\,800$ ($\\text{cm}^3$).",
        "tags": ["chuong-X", "bai-37"]
      },
      {
        "id": "toan7-sbt-t2-37-10.15",
        "type": "essay",
        "question": "**10.15.** Một hình lăng trụ đứng được ghép bởi một hình lăng trụ đứng tam giác và một hình hộp chữ nhật có kích thước như trong Hình 10.12 (Khối hộp chữ nhật có kích thước $5 \\text{ cm} \\times 6 \\text{ cm}$, lăng trụ tam giác có cạnh góc vuông $3 \\text{ cm}$ và $4 \\text{ cm}$, chiều cao chung của lăng trụ là $8 \\text{ cm}$). Tính thể tích của hình lăng trụ đứng $ABCEF.A'B'C'E'F'$.",
        "explanation": "Thể tích hình lăng trụ đứng $ABC.A'B'C'$ là\n$V_1 = S \\cdot h = \\dfrac{1}{2} \\cdot 3 \\cdot 4 \\cdot 8 = 48$ ($\\text{cm}^3$).\nThể tích hình hộp chữ nhật là $V_2 = 5 \\cdot 6 \\cdot 8 = 240$ ($\\text{cm}^3$).\nThể tích của hình lăng trụ đứng $ABCEF.A'B'C'E'F'$ là\n$V = V_1 + V_2 = 48 + 240 = 288$ ($\\text{cm}^3$).",
        "tags": ["chuong-X", "bai-37"]
      }
    ]
  }
];

fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-31.json', JSON.stringify(b31, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-32.json', JSON.stringify(b32, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-33.json', JSON.stringify(b33, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-34.json', JSON.stringify(b34, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-35.json', JSON.stringify(b35, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-36.json', JSON.stringify(b36, null, 2));
fs.writeFileSync('content/workbooks/toan7-sbt-tap2/bai-37.json', JSON.stringify(b37, null, 2));
