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

// Correct concept ID from 'concepts' table for Math Grade 3 (concept-math3-bai_1)
const conceptId = '92e7a582-84c7-49d0-a802-8d731da20b27';

const examsData = [
  {
    exam_number: 1,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 1',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 6 và 4 là:",
          options: ["24", "10", "20", "28"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 6: 6 x 4 = 24."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 245, số trừ là 162, số bị trừ là:",
          options: ["83", "307", "407", "183"],
          correct_index: 2,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 245 + 162 = 407."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 3, 6, 9, 12, ..., 27, 30. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["13, 14, 15, 16", "23, 24, 25, 26", "14, 16, 18, 20", "15, 18, 21, 24"],
          correct_index: 3,
          explanation: "Quy luật: các số liên tiếp tăng dần 3 đơn vị. Các số cần điền là: 15, 18, 21, 24."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà đã ăn 1/2 chiếc bánh. Chiếc bánh Hà ăn là:",
          options: ["Hình A", "Hình B", "Hình C", "Hình D"],
          correct_index: 0,
          image_url: "/images/toan3-gk1-de1-q4.png",
          explanation: "Chiếc bánh ở hình A được chia thành 2 phần bằng nhau và tô màu 1 phần (3/6 = 1/2)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 7 lên 8 lần ta được:",
          options: ["15", "14", "42", "56"],
          correct_index: 3,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 7 x 8 = 56."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Bố An xây một cái bể cá hình chữ nhật và trồng hoa súng trong đó. Mỗi lá súng có dạng hình tròn đường kính 3 dm. Vậy chiều dài của bể cá là:",
          options: ["8 x 3 = 24 dm", "3 x 8 = 24 dm", "4 x 3 = 12 dm", "3 x 4 = 12 dm"],
          correct_index: 1,
          image_url: "/images/toan3-gk1-de1-q6.png",
          explanation: "Chiều dài bể cá gồm 8 lá súng xếp liền nhau, mỗi lá có đường kính 3 dm: 3 x 8 = 24 (dm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 6 x ___ = 54",
          choices: ["7", "8", "9", "6"],
          correct_answer: "9"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 169 = 582",
          choices: ["413", "313", "423", "403"],
          correct_answer: "413"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 27 : ___ = 9",
          choices: ["2", "3", "4", "5"],
          correct_answer: "3"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 605 - ___ = 461",
          choices: ["144", "244", "134", "154"],
          correct_answer: "144"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/2 số con bọ cánh cam trong tổng số 20 con bọ cánh cam là ___ con.",
          choices: ["10", "5", "8", "12"],
          correct_answer: "10"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/5 số con bọ cánh cam trong tổng số 20 con bọ cánh cam là ___ con.",
          choices: ["4", "5", "2", "6"],
          correct_answer: "4"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 3 tầng; mỗi tầng cao 4m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["7 m", "12 m", "10 m", "15 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 4 x 3 = 12 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cạnh ngôi nhà có một cây xanh, Lan Anh quan sát thấy chiều cao của cây đó bằng chiều cao của ngôi nhà (12m) giảm đi 2 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["6 m", "5 m", "8 m", "4 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 2 = 12 : 2 = 6 (m)."
        }
      }
    ]
  },
  {
    exam_number: 2,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 2',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 7 và 6 là:",
          options: ["42", "13", "35", "49"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 7: 7 x 6 = 42."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 312, số trừ là 145, số bị trừ là:",
          options: ["167", "457", "447", "267"],
          correct_index: 1,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 312 + 145 = 457."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 4, 8, 12, 16, ..., 36, 40. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["17, 18, 19, 20", "20, 24, 28, 32", "20, 22, 24, 26", "24, 28, 32, 36"],
          correct_index: 1,
          explanation: "Quy luật: các số liên tiếp tăng dần 4 đơn vị. Các số cần điền là: 20, 24, 28, 32."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà đã ăn 2/3 chiếc bánh. Chiếc bánh Hà ăn là:",
          options: ["Hình A", "Hình B", "Hình C", "Hình D"],
          correct_index: 1,
          image_url: "/images/toan3-gk1-de1-q4.png",
          explanation: "Hình B được chia thành 6 phần và tô màu 4 phần, tức là 4/6 = 2/3 chiếc bánh."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 6 lên 9 lần ta được:",
          options: ["15", "54", "45", "60"],
          correct_index: 1,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 6 x 9 = 54."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Bố An xây một cái bể cá hình chữ nhật và trồng hoa súng trong đó. Mỗi lá súng có dạng hình tròn đường kính 4 dm. Vậy chiều dài của bể cá là:",
          options: ["8 x 4 = 32 dm", "4 x 8 = 32 dm", "4 x 4 = 16 dm", "8 x 8 = 64 dm"],
          correct_index: 1,
          image_url: "/images/toan3-gk1-de1-q6.png",
          explanation: "Chiều dài bể cá gồm 8 lá súng xếp liền nhau, mỗi lá có đường kính 4 dm: 4 x 8 = 32 (dm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 7 x ___ = 56",
          choices: ["7", "8", "9", "6"],
          correct_answer: "8"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 245 = 687",
          choices: ["442", "342", "432", "452"],
          correct_answer: "442"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 32 : ___ = 8",
          choices: ["3", "4", "5", "6"],
          correct_answer: "4"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 820 - ___ = 560",
          choices: ["260", "360", "250", "270"],
          correct_answer: "260"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/2 số con bọ cánh cam trong tổng số 18 con bọ cánh cam là ___ con.",
          choices: ["9", "8", "10", "6"],
          correct_answer: "9"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/3 số con bọ cánh cam trong tổng số 18 con bọ cánh cam là ___ con.",
          choices: ["6", "5", "4", "7"],
          correct_answer: "6"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 4 tầng; mỗi tầng cao 3m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["7 m", "12 m", "10 m", "16 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 3 x 4 = 12 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (12m) giảm đi 3 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["4 m", "3 m", "9 m", "6 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 3 = 12 : 3 = 4 (m)."
        }
      }
    ]
  },
  {
    exam_number: 3,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 3',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 8 và 5 là:",
          options: ["40", "13", "35", "48"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 8: 8 x 5 = 40."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 425, số trừ là 218, số bị trừ là:",
          options: ["207", "643", "633", "217"],
          correct_index: 1,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 425 + 218 = 643."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 5, 10, 15, 20, ..., 45, 50. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["25, 30, 35, 40", "21, 22, 23, 24", "25, 27, 29, 31", "30, 35, 40, 45"],
          correct_index: 0,
          explanation: "Quy luật: các số liên tiếp tăng dần 5 đơn vị. Các số cần điền là: 25, 30, 35, 40."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà đã ăn 1/3 chiếc bánh. Chiếc bánh Hà ăn là:",
          options: ["Hình A", "Hình B", "Hình C", "Hình D"],
          correct_index: 3,
          image_url: "/images/toan3-gk1-de1-q4.png",
          explanation: "Hình D được chia thành 6 phần và tô màu 2 phần, tức là 2/6 = 1/3 chiếc bánh."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 8 lên 7 lần ta được:",
          options: ["15", "56", "48", "64"],
          correct_index: 1,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 8 x 7 = 56."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Bố An xây một cái bể cá hình chữ nhật và trồng hoa súng trong đó. Mỗi lá súng có dạng hình tròn đường kính 2 dm. Vậy chiều dài của bể cá là:",
          options: ["8 x 2 = 16 dm", "2 x 8 = 16 dm", "4 x 2 = 8 dm", "2 x 4 = 8 dm"],
          correct_index: 1,
          image_url: "/images/toan3-gk1-de1-q6.png",
          explanation: "Chiều dài bể cá gồm 8 lá súng xếp liền nhau, mỗi lá có đường kính 2 dm: 2 x 8 = 16 (dm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 8 x ___ = 64",
          choices: ["7", "8", "9", "6"],
          correct_answer: "8"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 314 = 756",
          choices: ["442", "342", "432", "452"],
          correct_answer: "442"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 45 : ___ = 9",
          choices: ["4", "5", "6", "7"],
          correct_answer: "5"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 750 - ___ = 320",
          choices: ["430", "330", "420", "450"],
          correct_answer: "430"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/3 số con bọ cánh cam trong tổng số 24 con bọ cánh cam là ___ con.",
          choices: ["8", "7", "9", "6"],
          correct_answer: "8"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/4 số con bọ cánh cam trong tổng số 24 con bọ cánh cam là ___ con.",
          choices: ["6", "5", "4", "7"],
          correct_answer: "6"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 5 tầng; mỗi tầng cao 3m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["8 m", "15 m", "12 m", "18 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiên cao mỗi tầng x số tầng. Phép tính: 3 x 5 = 15 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (15m) giảm đi 3 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["5 m", "3 m", "12 m", "6 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 3 = 15 : 3 = 5 (m)."
        }
      }
    ]
  },
  {
    exam_number: 4,
    title: 'Đề kiểm tra giữa học kỳ 1 - Đề số 4',
    questions: [
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Tích của 9 và 6 là:",
          options: ["54", "15", "45", "63"],
          correct_index: 0,
          explanation: "Tính nhẩm dựa vào bảng nhân 9: 9 x 6 = 54."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Biết hiệu là 526, số trừ là 138, số bị trừ là:",
          options: ["388", "664", "654", "488"],
          correct_index: 1,
          explanation: "Số bị trừ = Hiệu + Số trừ. Phép tính: 526 + 138 = 664."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Cho dãy số: 6, 12, 18, 24, ..., 54, 60. Các số thích hợp điền vào chỗ chấm lần lượt là:",
          options: ["30, 36, 42, 48", "25, 26, 27, 28", "30, 32, 34, 36", "36, 42, 48, 54"],
          correct_index: 0,
          explanation: "Quy luật: các số liên tiếp tăng dần 6 đơn vị. Các số cần điền là: 30, 36, 42, 48."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.1,
        metadata_json: {
          question: "Hà đã ăn 5/6 chiếc bánh. Chiếc bánh Hà ăn là:",
          options: ["Hình A", "Hình B", "Hình C", "Hình D"],
          correct_index: 2,
          image_url: "/images/toan3-gk1-de1-q4.png",
          explanation: "Hình C được chia thành 6 phần và tô màu 5 phần, tức là 5/6 chiếc bánh."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.0,
        metadata_json: {
          question: "Gấp 9 lên 8 lần ta được:",
          options: ["17", "72", "64", "81"],
          correct_index: 1,
          explanation: "Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 9 x 8 = 72."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Bố An xây một cái bể cá hình chữ nhật và trồng hoa súng trong đó. Mỗi lá súng có dạng hình tròn đường kính 5 dm. Vậy chiều dài của bể cá là:",
          options: ["8 x 5 = 40 dm", "5 x 8 = 40 dm", "4 x 5 = 20 dm", "5 x 4 = 20 dm"],
          correct_index: 1,
          image_url: "/images/toan3-gk1-de1-q6.png",
          explanation: "Chiều dài bể cá gồm 8 lá súng xếp liền nhau, mỗi lá có đường kính 5 dm: 5 x 8 = 40 (dm)."
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tính kết quả phép tính: 9 x ___ = 81",
          choices: ["7", "8", "9", "6"],
          correct_answer: "9"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: ___ + 423 = 859",
          choices: ["436", "336", "426", "446"],
          correct_answer: "436"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.1,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 54 : ___ = 6",
          choices: ["8", "9", "7", "6"],
          correct_answer: "9"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "Tìm số thích hợp điền vào chỗ trống: 920 - ___ = 480",
          choices: ["440", "340", "430", "450"],
          correct_answer: "440"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/3 số con bọ cánh cam trong tổng số 30 con bọ cánh cam là ___ con.",
          choices: ["10", "9", "8", "12"],
          correct_answer: "10"
        }
      },
      {
        type: 'fill_blank',
        difficulty: 1.2,
        metadata_json: {
          question: "1/5 số con bọ cánh cam trong tổng số 30 con bọ cánh cam là ___ con.",
          choices: ["6", "5", "4", "7"],
          correct_answer: "6"
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.2,
        metadata_json: {
          question: "Ngôi nhà gia đình Lan Anh ở có 3 tầng; mỗi tầng cao 5m. Hỏi ngôi nhà của gia đình Lan Anh cao bao nhiêu mét?",
          options: ["8 m", "15 m", "12 m", "20 m"],
          correct_index: 1,
          explanation: "Chiều cao ngôi nhà = Chiều cao mỗi tầng x số tầng. Phép tính: 5 x 3 = 15 (m)."
        }
      },
      {
        type: 'multiple_choice',
        difficulty: 1.3,
        metadata_json: {
          question: "Cây xanh cạnh nhà Lan Anh có chiều cao bằng chiều cao ngôi nhà (15m) giảm đi 5 lần. Hỏi cây đó cao bao nhiêu mét?",
          options: ["3 m", "5 m", "10 m", "4 m"],
          correct_index: 0,
          explanation: "Chiều cao của cây = chiều cao ngôi nhà : 5 = 15 : 5 = 3 (m)."
        }
      }
    ]
  }
];

async function seed() {
  console.log("Cleaning up existing midterm collections...");
  const { data: existingCols } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'toan')
    .eq('grade', 3)
    .eq('exam_type', 'midterm');
  
  if (existingCols && existingCols.length > 0) {
    const ids = existingCols.map(c => c.id);
    const { data: existingExams } = await supabase
      .from('exams')
      .select('id')
      .in('collection_id', ids);
    
    if (existingExams && existingExams.length > 0) {
      const examIds = existingExams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', examIds);
      await supabase.from('exams').delete().in('id', examIds);
    }
    await supabase.from('assessment_collections').delete().in('id', ids);
  }

  console.log("Seeding math grade 3 midterm exams...");

  // 1. Create assessment collection
  const { data: collection, error: colError } = await supabase
    .from('assessment_collections')
    .insert({
      title: 'Kiểm tra giữa học kỳ 1',
      subject_slug: 'toan',
      grade: 3,
      units: [101], // Special unit ID for midterm 1
      volume: 1,
      sequence_number: 1,
      status: 'published',
      exam_type: 'midterm',
      reference_book: 'Kết nối tri thức với cuộc sống'
    })
    .select()
    .single();

  if (colError) {
    console.error("Error creating collection:", colError);
    return;
  }

  console.log(`Created Collection ID: ${collection.id}`);

  // Loop through all 4 exams
  for (const examData of examsData) {
    // 2. Create Exam
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

    console.log(`Created Exam ID for ${examData.title}: ${exam.id}`);

    // 3. Insert Questions and link them to the Exam
    for (let i = 0; i < examData.questions.length; i++) {
      const q = examData.questions[i];
      
      // Insert into question_bank
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
        console.error(`Error inserting question ${i + 1} for ${examData.title}:`, qError.message);
        continue;
      }

      // Link to exam
      const { error: linkError } = await supabase
        .from('exam_questions')
        .insert({
          exam_id: exam.id,
          question_bank_id: newQ.id,
          order_index: i
        });
      
      if (linkError) {
        console.error(`Error linking question ${i + 1} to exam ${examData.title}:`, linkError.message);
      }
    }
  }

  console.log("Seeding all 4 exams completed successfully!");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
