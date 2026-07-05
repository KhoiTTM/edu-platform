import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Concept ID for Math Grade 3 (concept-math3-bai_1)
const conceptId = '92e7a582-84c7-49d0-a802-8d731da20b27';

// Reusable SVG generators/templates with parameters to create variation!
function generateSvgFractionCake(num: number, den: number, label1: string, label2: string): string {
  // We'll generate two circles next to each other
  // Circle A (representing num/den)
  const angle = (2 * Math.PI) / den;
  let pathsA = '';
  for (let i = 0; i < den; i++) {
    const startAngle = i * angle - Math.PI / 2;
    const endAngle = (i + 1) * angle - Math.PI / 2;
    const x1 = 90 + 70 * Math.cos(startAngle);
    const y1 = 100 + 70 * Math.sin(startAngle);
    const x2 = 90 + 70 * Math.cos(endAngle);
    const y2 = 100 + 70 * Math.sin(endAngle);
    
    const fill = i < num ? '#6366f1' : 'none';
    const opacity = i < num ? '0.6' : '1';
    
    pathsA += `<path d="M 90 100 L ${x1} ${y1} A 70 70 0 0 1 ${x2} ${y2} Z" fill="${fill}" opacity="${opacity}" stroke="#4f46e5" stroke-width="2"/>\n`;
  }

  // Circle B (representing a different fraction, e.g., 1 out of den-1 or similar)
  const denB = den + 1;
  const angleB = (2 * Math.PI) / denB;
  let pathsB = '';
  for (let i = 0; i < denB; i++) {
    const startAngle = i * angleB - Math.PI / 2;
    const endAngle = (i + 1) * angleB - Math.PI / 2;
    const x1 = 90 + 70 * Math.cos(startAngle);
    const y1 = 100 + 70 * Math.sin(startAngle);
    const x2 = 90 + 70 * Math.cos(endAngle);
    const y2 = 100 + 70 * Math.sin(endAngle);
    
    // just color 1 slice for Circle B
    const fill = i < 1 ? '#10b981' : 'none';
    const opacity = i < 1 ? '0.6' : '1';
    
    pathsB += `<path d="M 90 100 L ${x1} ${y1} A 70 70 0 0 1 ${x2} ${y2} Z" fill="${fill}" opacity="${opacity}" stroke="#059669" stroke-width="2"/>\n`;
  }

  return `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <!-- HÌNH A -->
  <g transform="translate(10, 0)">
    <circle cx="90" cy="100" r="70" fill="none" stroke="#6366f1" stroke-width="4"/>
    ${pathsA}
    <text x="90" y="190" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">${label1}</text>
  </g>

  <!-- HÌNH B -->
  <g transform="translate(220, 0)">
    <circle cx="90" cy="100" r="70" fill="none" stroke="#10b981" stroke-width="4"/>
    ${pathsB}
    <text x="90" y="190" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" font-weight="bold">${label2}</text>
  </g>
</svg>`;
}

function generateSvgRectangle(width: number, area: number): string {
  const height = area / width;
  return `<svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <!-- Background border -->
  <rect x="10" y="10" width="340" height="100" rx="10" fill="none" stroke="#475569" stroke-width="2"/>
  <!-- Dimension rectangle (shifted to the right) -->
  <rect x="110" y="30" width="200" height="50" fill="#f59e0b" fill-opacity="0.2" stroke="#d97706" stroke-width="3"/>
  <!-- Dimension text -->
  <text x="210" y="25" font-family="sans-serif" font-size="14" fill="#fba518" text-anchor="middle">Chiều dài: ${width} cm</text>
  <text x="100" y="60" font-family="sans-serif" font-size="14" fill="#fba518" text-anchor="end">Chiều rộng: ?</text>
  <text x="210" y="60" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Diện tích = ${area} cm²</text>
</svg>`;
}

const examsData = [
  {
    exam_number: 6,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 6 (SVG tự động)',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 7 và 8 là:",
          options: ["56", "15", "49", "64"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 7: 7 x 8 = 56."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 415, số trừ là 172, số bị trừ là:",
          options: ["243", "587", "577", "343"],
          correct_index: 1,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 415 + 172 = 587."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 8, 16, 24, 32, ..., 72, 80. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["40, 48, 56, 64", "36, 40, 44, 48", "40, 45, 50, 55", "48, 56, 64, 72"],
          correct_index: 0,
          explanation: "Quy luật: các số liên tiếp tăng dần 8 đơn vị. Các số cần điền là: 40, 48, 56, 64."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà vẽ hai mô hình hình tròn dưới đây để biểu diễn phân số. Hình nào được tô màu đúng một phần tư (1/4) hình?",
          options: ["Hình A", "Hình B", "Cả hai hình", "Không hình nào"],
          correct_index: 0,
          image_url: generateSvgFractionCake(1, 4, "Hình A", "Hình B"),
          explanation: "Hình A được chia thành 4 phần và tô màu 1 phần, biểu diễn phân số 1/4."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 9 lên 7 lần ta được:",
          options: ["16", "63", "54", "72"],
          correct_index: 1,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 9 x 7 = 63."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cho hình chữ nhật có diện tích và chiều dài như hình vẽ dưới đây. Chiều rộng của hình chữ nhật đó là:",
          options: ["2 cm", "3 cm", "4 cm", "5 cm"],
          correct_index: 2,
          image_url: generateSvgRectangle(8, 32),
          explanation: "Chiều rộng = Diện tích : Chiều dài. Phép tính: 32 : 8 = 4 (cm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 6 x ___ = 48",
          choices: ["7", "8", "9", "6"],
          correct_answer: "8"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 138 = 469",
          choices: ["331", "231", "321", "341"],
          correct_answer: "331"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 40 : ___ = 8",
          choices: ["4", "5", "6", "7"],
          correct_answer: "5"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 720 - ___ = 450",
          choices: ["270", "370", "260", "280"],
          correct_answer: "270"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/4 số con bọ cánh cam trong tổng số 36 con bọ cánh cam là ___ con.",
          choices: ["9", "8", "7", "10"],
          correct_answer: "9"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/6 số con bọ cánh cam trong tổng số 36 con bọ cánh cam là ___ con.",
          choices: ["6", "5", "4", "7"],
          correct_answer: "6"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 4 tầng; mỗi tầng cao 5m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["9 m", "20 m", "15 m", "25 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 5 x 4 = 20 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (20m) giảm đi 5 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["4 m", "5 m", "15 m", "6 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 5 = 20 : 5 = 4 (m)."
        }
      }
    ]
  },
  {
    exam_number: 7,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 7 (SVG tự động)',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 9 và 5 là:",
          options: ["45", "14", "40", "54"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 9: 9 x 5 = 45."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 526, số trừ là 283, số bị trừ là:",
          options: ["243", "809", "799", "343"],
          correct_index: 1,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 526 + 283 = 809."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 9, 18, 27, 36, ..., 81, 90. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["45, 54, 63, 72", "40, 45, 50, 55", "45, 50, 55, 60", "54, 63, 72, 81"],
          correct_index: 0,
          explanation: "Quy luật: các số liên tiếp tăng dần 9 đơn vị. Các số cần điền là: 45, 54, 63, 72."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà vẽ hai mô hình hình tròn dưới đây để biểu diễn phân số. Hình nào được tô màu đúng một phần năm (1/5) hình?",
          options: ["Hình A", "Hình B", "Cả hai hình", "Không hình nào"],
          correct_index: 0,
          image_url: generateSvgFractionCake(1, 5, "Hình A", "Hình B"),
          explanation: "Hình A được chia thành 5 phần và tô màu 1 phần, biểu diễn phân số 1/5."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 7 lên 9 lần ta được:",
          options: ["16", "63", "56", "70"],
          correct_index: 1,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 7 x 9 = 63."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cho hình chữ nhật có diện tích và chiều dài như hình vẽ dưới đây. Chiều rộng của hình chữ nhật đó là:",
          options: ["3 cm", "4 cm", "5 cm", "6 cm"],
          correct_index: 2,
          image_url: generateSvgRectangle(9, 45),
          explanation: "Chiều rộng = Diện tích : Chiều dài. Phép tính: 45 : 9 = 5 (cm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 8 x ___ = 56",
          choices: ["6", "7", "8", "9"],
          correct_answer: "7"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 269 = 782",
          choices: ["513", "413", "523", "503"],
          correct_answer: "513"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 48 : ___ = 8",
          choices: ["5", "6", "7", "8"],
          correct_answer: "6"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 905 - ___ = 562",
          choices: ["343", "443", "333", "353"],
          correct_answer: "343"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/5 số con bọ cánh cam trong tổng số 40 con bọ cánh cam là ___ con.",
          choices: ["8", "7", "9", "6"],
          correct_answer: "8"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/8 số con bọ cánh cam trong tổng số 40 con bọ cánh cam là ___ con.",
          choices: ["5", "6", "4", "7"],
          correct_answer: "5"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 5 tầng; mỗi tầng cao 4m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["9 m", "20 m", "15 m", "24 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 4 x 5 = 20 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (20m) giảm đi 4 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["5 m", "4 m", "15 m", "6 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 4 = 20 : 4 = 5 (m)."
        }
      }
    ]
  },
  {
    exam_number: 8,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 8 (SVG tự động)',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 6 và 9 là:",
          options: ["54", "15", "48", "60"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 6: 6 x 9 = 54."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 612, số trừ là 145, số bị trừ là:",
          options: ["467", "757", "747", "567"],
          correct_index: 1,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 612 + 145 = 757."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 4, 8, 12, 16, ..., 36, 40. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["20, 24, 28, 32", "18, 20, 22, 24", "20, 22, 24, 26", "24, 28, 32, 36"],
          correct_index: 0,
          explanation: "Quy luật: các số liên tiếp tăng dần 4 đơn vị. Các số cần điền là: 20, 24, 28, 32."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà vẽ hai mô hình hình tròn dưới đây để biểu diễn phân số. Hình nào được tô màu đúng một phần ba (1/3) hình?",
          options: ["Hình A", "Hình B", "Cả hai hình", "Không hình nào"],
          correct_index: 0,
          image_url: generateSvgFractionCake(1, 3, "Hình A", "Hình B"),
          explanation: "Hình A được chia thành 3 phần và tô màu 1 phần, biểu diễn phân số 1/3."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 8 lên 8 lần ta được:",
          options: ["16", "64", "56", "72"],
          correct_index: 1,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 8 x 8 = 64."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cho hình chữ nhật có diện tích và chiều dài như hình vẽ dưới đây. Chiều rộng của hình chữ nhật đó là:",
          options: ["3 cm", "4 cm", "5 cm", "6 cm"],
          correct_index: 1,
          image_url: generateSvgRectangle(7, 28),
          explanation: "Chiều rộng = Diện tích : Chiều dài. Phép tính: 28 : 7 = 4 (cm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 9 x ___ = 72",
          choices: ["7", "8", "9", "6"],
          correct_answer: "8"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 185 = 596",
          choices: ["411", "311", "401", "421"],
          correct_answer: "411"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 54 : ___ = 9",
          choices: ["5", "6", "7", "8"],
          correct_answer: "6"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 604 - ___ = 482",
          choices: ["122", "222", "112", "132"],
          correct_answer: "122"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/5 số con bọ cánh cam trong tổng số 35 con bọ cánh cam là ___ con.",
          choices: ["7", "6", "8", "5"],
          correct_answer: "7"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/7 số con bọ cánh cam trong tổng số 35 con bọ cánh cam là ___ con.",
          choices: ["5", "6", "4", "7"],
          correct_answer: "5"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 3 tầng; mỗi tầng cao 6m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["9 m", "18 m", "12 m", "24 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 6 x 3 = 18 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (18m) giảm đi 3 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["6 m", "5 m", "12 m", "4 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 3 = 18 : 3 = 6 (m)."
        }
      }
    ]
  },
  {
    exam_number: 9,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 9 (SVG tự động)',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 8 và 6 là:",
          options: ["48", "14", "42", "56"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 8: 8 x 6 = 48."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 472, số trừ là 319, số bị trừ là:",
          options: ["153", "791", "781", "253"],
          correct_index: 1,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 472 + 319 = 791."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 3, 6, 9, 12, ..., 27, 30. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["15, 18, 21, 24", "14, 16, 18, 20", "15, 17, 19, 21", "18, 21, 24, 27"],
          correct_index: 0,
          explanation: "Quy luật: các số liên tiếp tăng dần 3 đơn vị. Các số cần điền là: 15, 18, 21, 24."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà vẽ hai mô hình hình tròn dưới đây để biểu diễn phân số. Hình nào được tô màu đúng một phần sáu (1/6) hình?",
          options: ["Hình A", "Hình B", "Cả hai hình", "Không hình nào"],
          correct_index: 0,
          image_url: generateSvgFractionCake(1, 6, "Hình A", "Hình B"),
          explanation: "Hình A được chia thành 6 phần và tô màu 1 phần, biểu diễn phân số 1/6."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 9 lên 6 lần ta được:",
          options: ["15", "54", "45", "63"],
          correct_index: 1,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 9 x 6 = 54."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cho hình chữ nhật có diện tích và chiều dài như hình vẽ dưới đây. Chiều rộng của hình chữ nhật đó là:",
          options: ["3 cm", "4 cm", "5 cm", "6 cm"],
          correct_index: 0,
          image_url: generateSvgRectangle(6, 18),
          explanation: "Chiều rộng = Diện tích : Chiều dài. Phép tính: 18 : 6 = 3 (cm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 7 x ___ = 63",
          choices: ["7", "8", "9", "6"],
          correct_answer: "9"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 319 = 791",
          choices: ["472", "372", "462", "482"],
          correct_answer: "472"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 36 : ___ = 6",
          choices: ["5", "6", "7", "8"],
          correct_answer: "6"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 505 - ___ = 341",
          choices: ["164", "264", "154", "174"],
          correct_answer: "164"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/4 số con bọ cánh cam trong tổng số 28 con bọ cánh cam là ___ con.",
          choices: ["7", "6", "8", "9"],
          correct_answer: "7"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/7 số con bọ cánh cam trong tổng số 28 con bọ cánh cam là ___ con.",
          choices: ["4", "5", "3", "6"],
          correct_answer: "4"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 4 tầng; mỗi tầng cao 6m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["10 m", "24 m", "18 m", "30 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 6 x 4 = 24 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (24m) giảm đi 4 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["6 m", "5 m", "18 m", "8 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 4 = 24 : 4 = 6 (m)."
        }
      }
    ]
  }
];

async function seed() {
  console.log("Looking for math grade 3 midterm collection...");
  const { data: collection, error: colError } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'toan')
    .eq('grade', 3)
    .eq('exam_type', 'midterm')
    .single();

  if (colError || !collection) {
    console.error("Error finding midterm collection. Make sure you seeded midterm exams first.", colError);
    return;
  }

  console.log(`Found Collection ID: ${collection.id}. Removing any existing Exams (6,7,8,9)...`);
  const numbers = examsData.map(e => e.exam_number);
  const { data: existingExams } = await supabase
    .from('exams')
    .select('id')
    .eq('collection_id', collection.id)
    .in('exam_number', numbers);

  if (existingExams && existingExams.length > 0) {
    const examIds = existingExams.map(e => e.id);
    await supabase.from('exam_questions').delete().in('exam_id', examIds);
    await supabase.from('exams').delete().in('id', examIds);
  }

  for (const examData of examsData) {
    console.log(`Seeding ${examData.title}...`);
    const { data: exam, error: examError } = await supabase
      .from('exams')
      .insert({
        collection_id: collection.id,
        title: examData.title,
        exam_number: examData.exam_number,
        total_questions: examData.questions.length,
        generation_mode: 'manual_import'
      })
      .select()
      .single();

    if (examError) {
      console.error(`Error creating exam ${examData.title}:`, examError);
      continue;
    }

    console.log(`Created Exam ID: ${exam.id}`);

    for (let i = 0; i < examData.questions.length; i++) {
      const q = examData.questions[i];
      
      // Insert question into question_bank
      const { data: newQ, error: qError } = await supabase
        .from('question_bank')
        .insert({
          concept_id: conceptId,
          subject_slug: 'toan',
          grade: 3,
          type: q.type,
          difficulty: q.difficulty,
          metadata_json: q.metadata_json,
          source: 'manual_import',
          source_anchor: {
            book: "Đề thi giữa kỳ 1",
            page: 1,
            lesson: `Đề số ${examData.exam_number}`
          },
          status: 'approved'
        })
        .select()
        .single();

      if (qError) {
        console.error(`Error inserting question ${i + 1} for exam ${examData.exam_number}:`, qError.message);
        continue;
      }

      // Link question to exam
      const { error: linkError } = await supabase
        .from('exam_questions')
        .insert({
          exam_id: exam.id,
          question_bank_id: newQ.id,
          order_index: i
        });
      
      if (linkError) {
        console.error(`Error linking question ${i + 1}:`, linkError.message);
      }
    }
  }

  console.log("Seeding all 4 additional SVG exams (6, 7, 8, 9) completed successfully!");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
