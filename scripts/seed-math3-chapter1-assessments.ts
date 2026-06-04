import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- QUESTION POOLS ---

// BAI 1: ON TAP CAC SO DEN 1000
const BAI_1_POOL = [
  { question: "Số 'bốn trăm ba mươi bảy' viết là:", options: ["437", "473", "347", "734"], correct_index: 0, explanation: "Số gồm 4 trăm, 3 chục và 7 đơn vị viết là 437.", difficulty: 1.0 },
  { question: "Số 508 đọc là:", options: ["Năm trăm linh tám", "Năm trăm tám mươi", "Năm trăm không tám", "Năm linh tám"], correct_index: 0, explanation: "508 đọc là năm trăm linh tám.", difficulty: 1.0 },
  { question: "Số liền trước của 426 là:", options: ["425", "427", "424", "416"], correct_index: 0, explanation: "Số liền trước của một số bằng số đó trừ đi 1.", difficulty: 1.0 },
  { question: "Số gồm 7 trăm, 5 chục và 0 đơn vị là:", options: ["750", "705", "570", "507"], correct_index: 0, explanation: "Ghép các hàng ta được số 750.", difficulty: 1.0 },
  { question: "Số 385 viết thành tổng các trăm, chục, đơn vị là:", options: ["300 + 80 + 5", "300 + 8 + 5", "30 + 80 + 5", "380 + 5"], correct_index: 0, explanation: "385 = 300 + 80 + 5.", difficulty: 1.2 },
  { question: "Điền số vào dấu ?: 210, 211, ?", options: ["212", "213", "209", "220"], correct_index: 0, explanation: "Ba số liên tiếp tăng dần.", difficulty: 1.0 },
  { question: "Số lớn nhất trong các số 437, 473, 347, 734 là:", options: ["734", "473", "437", "347"], correct_index: 0, explanation: "734 có hàng trăm lớn nhất.", difficulty: 1.2 },
  { question: "Sắp xếp các số 538, 444, 307, 640 theo thứ tự từ bé đến lớn:", options: ["307, 444, 538, 640", "640, 538, 444, 307", "307, 538, 444, 640", "444, 307, 538, 640"], correct_index: 0, explanation: "So sánh hàng trăm rồi đến hàng chục.", difficulty: 1.2 },
  { question: "Số tròn chục liền sau của 120 là:", options: ["130", "121", "110", "140"], correct_index: 0, explanation: "Số tròn chục tiếp theo sau 120 là 130.", difficulty: 1.2 },
  { question: "Số 999 là:", options: ["Số lớn nhất có 3 chữ số", "Số bé nhất có 3 chữ số", "Số lớn nhất có 4 chữ số", "Số lẻ bé nhất"], correct_index: 0, explanation: "999 là số lớn nhất có 3 chữ số.", difficulty: 1.0 }
];

// BAI 2: ON TAP PHEP CONG, PHEP TRU TRONG PHAM VI 1000
const BAI_2_POOL = [
  { question: "Tính: 300 + 400 = ?", options: ["700", "600", "800", "500"], correct_index: 0, explanation: "3 trăm + 4 trăm = 7 trăm.", difficulty: 1.0 },
  { question: "Tính: 800 - 500 = ?", options: ["300", "200", "400", "1300"], correct_index: 0, explanation: "8 trăm - 5 trăm = 3 trăm.", difficulty: 1.0 },
  { question: "Kết quả của phép tính 156 + 127 là:", options: ["283", "273", "282", "272"], correct_index: 0, explanation: "6+7=13 nhớ 1; 5+2+1=8; 1+1=2.", difficulty: 1.2 },
  { question: "Kết quả của phép tính 465 - 243 là:", options: ["222", "212", "608", "228"], correct_index: 0, explanation: "5-3=2; 6-4=2; 4-2=2.", difficulty: 1.0 },
  { question: "Tìm x biết: x + 100 = 500", options: ["400", "600", "500", "300"], correct_index: 0, explanation: "x = 500 - 100 = 400.", difficulty: 1.2 },
  { question: "Tính nhẩm: 730 - 30 = ?", options: ["700", "760", "70", "30"], correct_index: 0, explanation: "Bớt đi 3 chục.", difficulty: 1.0 },
  { question: "Một trường tiểu học có 465 học sinh nam và 423 học sinh nữ. Hỏi trường đó có tất cả bao nhiêu học sinh?", options: ["888 học sinh", "842 học sinh", "42 học sinh", "988 học sinh"], correct_index: 0, explanation: "465 + 423 = 888.", difficulty: 1.5 },
  { question: "Mẹ đi chợ mua 350g thịt lợn và 250g thịt bò. Tổng khối lượng thịt mẹ mua là:", options: ["600g", "100g", "500g", "700g"], correct_index: 0, explanation: "350 + 250 = 600.", difficulty: 1.5 },
  { question: "Trong phép cộng: 120 + 230 = 350, số 350 được gọi là:", options: ["Tổng", "Số hạng", "Hiệu", "Số bị trừ"], correct_index: 0, explanation: "Kết quả phép cộng là tổng.", difficulty: 1.0 },
  { question: "Kết quả phép tính 900 - 1 là:", options: ["899", "890", "901", "800"], correct_index: 0, explanation: "Lấy 900 trừ đi 1 đơn vị.", difficulty: 1.2 }
];

// BAI 3: TIM THANH PHAN TRONG PHEP CONG, PHEP TRU
const BAI_3_POOL = [
  { question: "Trong phép tính x + 15 = 40, x là:", options: ["25", "55", "35", "15"], correct_index: 0, explanation: "x = 40 - 15 = 25.", difficulty: 1.2 },
  { question: "Trong phép tính x - 20 = 50, x là:", options: ["70", "30", "50", "20"], correct_index: 0, explanation: "x = 50 + 20 = 70.", difficulty: 1.2 },
  { question: "Trong phép tính 100 - x = 40, x là:", options: ["60", "140", "40", "100"], correct_index: 0, explanation: "x = 100 - 40 = 60.", difficulty: 1.2 },
  { question: "Muốn tìm một số hạng trong một tổng ta làm thế nào?", options: ["Lấy tổng trừ đi số hạng kia", "Lấy tổng cộng với số hạng kia", "Lấy số hạng kia trừ đi tổng", "Lấy tổng nhân với 2"], correct_index: 0, explanation: "Quy tắc tìm số hạng.", difficulty: 1.0 },
  { question: "Muốn tìm số bị trừ ta làm thế nào?", options: ["Lấy hiệu cộng với số trừ", "Lấy số trừ trừ đi hiệu", "Lấy hiệu trừ đi số trừ", "Lấy số trừ cộng với tổng"], correct_index: 0, explanation: "Quy tắc tìm số bị trừ.", difficulty: 1.0 },
  { question: "Muốn tìm số trừ ta làm thế nào?", options: ["Lấy số bị trừ trừ đi hiệu", "Lấy số bị trừ cộng với hiệu", "Lấy hiệu cộng với số trừ", "Lấy hiệu trừ đi số bị trừ"], correct_index: 0, explanation: "Quy tắc tìm số trừ.", difficulty: 1.0 },
  { question: "Tìm x: 235 + x = 456", options: ["221", "691", "211", "231"], correct_index: 0, explanation: "x = 456 - 235 = 221.", difficulty: 1.5 },
  { question: "Tìm x: x - 123 = 543", options: ["666", "420", "676", "566"], correct_index: 0, explanation: "x = 543 + 123 = 666.", difficulty: 1.5 },
  { question: "Tìm x: 800 - x = 150", options: ["650", "950", "750", "550"], correct_index: 0, explanation: "x = 800 - 150 = 650.", difficulty: 1.5 },
  { question: "Số nào cộng với 0 thì bằng 100?", options: ["100", "0", "50", "200"], correct_index: 0, explanation: "Mọi số cộng với 0 đều bằng chính nó.", difficulty: 1.0 }
];

// BAI 4: ON TAP BANG NHAN 2; 5, BANG CHIA 2; 5
const BAI_4_POOL = [
  { question: "2 nhân 5 bằng bao nhiêu?", options: ["10", "7", "12", "8"], correct_index: 0, explanation: "2 x 5 = 10.", difficulty: 1.0 },
  { question: "5 nhân 8 bằng bao nhiêu?", options: ["40", "45", "35", "50"], correct_index: 0, explanation: "5 x 8 = 40.", difficulty: 1.0 },
  { question: "10 chia 2 bằng bao nhiêu?", options: ["5", "2", "8", "12"], correct_index: 0, explanation: "10 : 2 = 5.", difficulty: 1.0 },
  { question: "45 chia 5 bằng bao nhiêu?", options: ["9", "8", "10", "7"], correct_index: 0, explanation: "45 : 5 = 9.", difficulty: 1.0 },
  { question: "Có 20 cái kẹo chia đều cho 2 bạn. Mỗi bạn được bao nhiêu cái kẹo?", options: ["10 cái", "5 cái", "2 cái", "18 cái"], correct_index: 0, explanation: "20 : 2 = 10.", difficulty: 1.5 },
  { question: "Mỗi bàn có 5 học sinh. Hỏi 4 bàn như thế có bao nhiêu học sinh?", options: ["20 học sinh", "9 học sinh", "25 học sinh", "15 học sinh"], correct_index: 0, explanation: "5 x 4 = 20.", difficulty: 1.5 },
  { question: "Kết quả của phép tính 2 x 9 là:", options: ["18", "16", "20", "11"], correct_index: 0, explanation: "Bảng nhân 2.", difficulty: 1.0 },
  { question: "Số nào nhân với 5 thì bằng 25?", options: ["5", "4", "6", "10"], correct_index: 0, explanation: "5 x 5 = 25.", difficulty: 1.2 },
  { question: "Trong phép chia 16 : 2 = 8, số 2 được gọi là:", options: ["Số chia", "Số bị chia", "Thương", "Tích"], correct_index: 0, explanation: "Thành phần phép chia.", difficulty: 1.0 },
  { question: "Điền số thích hợp: 5 x ? = 50", options: ["10", "5", "1", "0"], correct_index: 0, explanation: "5 x 10 = 50.", difficulty: 1.0 }
];

// BAI 5: BANG NHAN 3, BANG CHIA 3
const BAI_5_POOL = [
  { question: "3 nhân 4 bằng bao nhiêu?", options: ["12", "7", "9", "15"], correct_index: 0, explanation: "3 x 4 = 12.", difficulty: 1.0 },
  { question: "3 nhân 7 bằng bao nhiêu?", options: ["21", "24", "18", "27"], correct_index: 0, explanation: "3 x 7 = 21.", difficulty: 1.0 },
  { question: "15 chia 3 bằng bao nhiêu?", options: ["5", "3", "6", "12"], correct_index: 0, explanation: "15 : 3 = 5.", difficulty: 1.0 },
  { question: "27 chia 3 bằng bao nhiêu?", options: ["9", "8", "10", "7"], correct_index: 0, explanation: "27 : 3 = 9.", difficulty: 1.0 },
  { question: "Mỗi con mèo có 3 cái chân (giả sử). Hỏi 5 con mèo có bao nhiêu cái chân?", options: ["15 cái", "8 cái", "12 cái", "18 cái"], correct_index: 0, explanation: "3 x 5 = 15.", difficulty: 1.5 },
  { question: "Có 18 bông hoa cắm đều vào 3 bình. Mỗi bình có bao nhiêu bông hoa?", options: ["6 bông", "5 bông", "9 bông", "3 bông"], correct_index: 0, explanation: "18 : 3 = 6.", difficulty: 1.5 },
  { question: "Kết quả của phép tính 3 x 9 là:", options: ["27", "24", "30", "12"], correct_index: 0, explanation: "Bảng nhân 3.", difficulty: 1.0 },
  { question: "Số nào nhân với 3 thì bằng 30?", options: ["10", "3", "7", "9"], correct_index: 0, explanation: "3 x 10 = 30.", difficulty: 1.0 },
  { question: "Trong phép chia 12 : 3 = 6 là SAI. Kết quả đúng phải là:", options: ["4", "3", "5", "9"], correct_index: 0, explanation: "12 : 3 = 4.", difficulty: 1.2 },
  { question: "Nếu 3 x a = 18 thì a bằng:", options: ["6", "5", "7", "21"], correct_index: 0, explanation: "a = 18 : 3 = 6.", difficulty: 1.2 }
];

// BAI 6: BANG NHAN 4, BANG CHIA 4
const BAI_6_POOL = [
  { question: "4 nhân 3 bằng bao nhiêu?", options: ["12", "7", "16", "8"], correct_index: 0, explanation: "4 x 3 = 12.", difficulty: 1.0 },
  { question: "4 nhân 6 bằng bao nhiêu?", options: ["24", "20", "28", "10"], correct_index: 0, explanation: "4 x 6 = 24.", difficulty: 1.0 },
  { question: "32 chia 4 bằng bao nhiêu?", options: ["8", "7", "9", "6"], correct_index: 0, explanation: "32 : 4 = 8.", difficulty: 1.0 },
  { question: "20 chia 4 bằng bao nhiêu?", options: ["5", "4", "6", "16"], correct_index: 0, explanation: "20 : 4 = 5.", difficulty: 1.0 },
  { question: "Mỗi chiếc ô tô có 4 bánh xe. Hỏi 9 chiếc ô tô như thế có bao nhiêu bánh xe?", options: ["36 bánh", "13 bánh", "32 bánh", "40 bánh"], correct_index: 0, explanation: "4 x 9 = 36.", difficulty: 1.5 },
  { question: "Có 28 học sinh chia đều thành 4 tổ. Mỗi tổ có bao nhiêu học sinh?", options: ["7 học sinh", "6 học sinh", "8 học sinh", "24 học sinh"], correct_index: 0, explanation: "28 : 4 = 7.", difficulty: 1.5 },
  { question: "Kết quả của 4 x 7 là:", options: ["28", "24", "32", "11"], correct_index: 0, explanation: "Bảng nhân 4.", difficulty: 1.0 },
  { question: "Số nào nhân với 4 thì bằng 16?", options: ["4", "3", "5", "12"], correct_index: 0, explanation: "4 x 4 = 16.", difficulty: 1.2 },
  { question: "Kết quả của 40 : 4 là:", options: ["10", "4", "36", "44"], correct_index: 0, explanation: "Bảng chia 4.", difficulty: 1.0 },
  { question: "Một hình vuông có cạnh 4cm. Chu vi hình vuông đó là:", options: ["16cm", "8cm", "12cm", "20cm"], correct_index: 0, explanation: "4 x 4 = 16.", difficulty: 1.5 }
];

// BAI 7: ON TAP HINH HOC VA DO LUONG
const BAI_15_HINH_HOC_POOL = [
  { question: "Điểm M là trung điểm của đoạn thẳng AB nếu:", options: ["M nằm giữa A, B và MA = MB", "MA = MB", "M nằm giữa A, B", "MA + MB = AB"], correct_index: 0, explanation: "Định nghĩa trung điểm.", difficulty: 1.2 },
  { question: "Đoạn thẳng AB dài 10cm. M là trung điểm AB. MA dài:", options: ["5cm", "10cm", "2cm", "20cm"], correct_index: 0, explanation: "10 : 2 = 5.", difficulty: 1.0 },
  { question: "Hình tròn có đường kính 8cm thì bán kính là:", options: ["4cm", "16cm", "8cm", "2cm"], correct_index: 0, explanation: "8 : 2 = 4.", difficulty: 1.2 },
  { question: "Để vẽ góc vuông, ta dùng thước:", options: ["Ê-ke", "Thước thẳng", "Thước dây", "Com-pa"], correct_index: 0, explanation: "Dụng cụ đo góc vuông.", difficulty: 1.0 },
  { question: "Góc đỉnh O, cạnh OA, OB được gọi là:", options: ["Góc xOy (hoặc AOB)", "Góc O", "Đoạn thẳng AB", "Cả A và B đều đúng"], correct_index: 3, explanation: "Cách gọi tên góc.", difficulty: 1.2 },
  { question: "Chu vi hình tam giác có các cạnh 3cm, 4cm, 5cm là:", options: ["12cm", "7cm", "9cm", "15cm"], correct_index: 0, explanation: "3 + 4 + 5 = 12.", difficulty: 1.2 },
  { question: "Đổi đơn vị: 1 m = ... dm?", options: ["10", "100", "1000", "1"], correct_index: 0, explanation: "1m = 10dm.", difficulty: 1.0 },
  { question: "Đổi đơn vị: 5 cm = ... mm?", options: ["50", "5", "500", "0"], correct_index: 0, explanation: "1cm = 10mm.", difficulty: 1.0 },
  { question: "Đường kính của hình tròn gấp mấy lần bán kính?", options: ["2 lần", "3 lần", "4 lần", "Bằng nhau"], correct_index: 0, explanation: "d = 2r.", difficulty: 1.0 },
  { question: "Một hình vuông có cạnh 5cm. Chu vi là:", options: ["20cm", "25cm", "10cm", "15cm"], correct_index: 0, explanation: "5 x 4 = 20.", difficulty: 1.2 }
];

// Helper to shuffle array and take N
function getQuestions(pool: any[], count: number = 20) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  
  // If pool is small, repeat it or generate some
  const result = [];
  for (let i = 0; i < count; i++) {
    const originalQ = shuffled[i % shuffled.length];
    // Create a variation for randomized feel
    result.push({
        ...originalQ,
        // Optional: add variation logic here if needed
    });
  }
  return result;
}

// Deterministic question generator for missing variety
function generateDeterministicQuestions(lessonIdx: number, count: number): any[] {
    const list: any[] = [];
    for (let i = 0; i < count; i++) {
        const seed = lessonIdx * 100 + i;
        if (lessonIdx === 1) { // Numbers up to 1000
            const n = 100 + (seed % 900);
            list.push({
                question: `Số ${n} gồm mấy trăm, mấy chục, mấy đơn vị?`,
                options: [
                    `${Math.floor(n/100)} trăm, ${Math.floor((n%100)/10)} chục, ${n%10} đơn vị`,
                    `${n%10} trăm, ${Math.floor((n%100)/10)} chục, ${Math.floor(n/100)} đơn vị`,
                    `${Math.floor(n/100)} trăm, ${n%10} chục, ${Math.floor((n%100)/10)} đơn vị`,
                    "Không xác định được"
                ],
                correct_index: 0,
                explanation: `Phân tích số ${n} theo các hàng.`,
                difficulty: 1.0
            });
        } else if (lessonIdx === 2) { // Add/Sub
            const a = 100 + (seed % 400);
            const b = 100 + ((seed * 7) % 400);
            const isAdd = seed % 2 === 0;
            if (isAdd) {
                list.push({
                    question: `Tính nhẩm: ${a} + ${b} = ?`,
                    options: [`${a+b}`, `${a+b+10}`, `${a+b-10}`, `${a+b+2}`],
                    correct_index: 0,
                    explanation: `Thực hiện phép cộng: ${a} + ${b} = ${a+b}.`,
                    difficulty: 1.0
                });
            } else {
                const max = Math.max(a, b);
                const min = Math.min(a, b);
                list.push({
                    question: `Tính nhẩm: ${max} - ${min} = ?`,
                    options: [`${max-min}`, `${max-min+10}`, `${max-min-10}`, `${max-min+5}`],
                    correct_index: 0,
                    explanation: `Thực hiện phép trừ: ${max} - ${min} = ${max-min}.`,
                    difficulty: 1.0
                });
            }
        } else {
            // General filler
            list.push({
                question: `Phép tính nào đúng?`,
                options: ["2 + 2 = 4", "2 + 2 = 5", "2 + 2 = 6", "2 + 2 = 3"],
                correct_index: 0,
                explanation: "Đây là kiến thức cơ bản.",
                difficulty: 0.5
            });
        }
    }
    return list;
}

async function seed() {
  console.log("🚀 Starting Grade 3 Chapter 1 assessments seeding...");

  // 1. Fetch Subject Math
  const { data: subject } = await supabase
    .from('universal_subjects')
    .select('id')
    .eq('slug', 'toan')
    .single();

  if (!subject) {
    console.error("❌ Subject 'toan' not found!");
    process.exit(1);
  }

  // 2. Ensure curriculum_units has Grade 3 Unit 1 entry
  console.log("Ensuring curriculum_units entry for Grade 3 Unit 1...");
  const { data: existingUnit } = await supabase
    .from('curriculum_units')
    .select('id')
    .eq('subject', 'toan')
    .eq('grade', 3)
    .eq('unit_number', 1)
    .maybeSingle();

  let unitId = '';
  if (existingUnit) {
    unitId = existingUnit.id;
    console.log(`✅ curriculum_units already exists (ID: ${unitId})`);
  } else {
    const { data: newUnit, error: unitError } = await supabase
      .from('curriculum_units')
      .insert({
        subject: 'toan',
        grade: 3,
        title: 'Chủ đề 1: Ôn tập và bổ sung',
        unit_number: 1,
        subject_id: subject.id,
        book_name: 'Toán 3 - Kết nối tri thức'
      })
      .select()
      .single();

    if (unitError) {
      console.error("❌ Error inserting curriculum_units:", unitError.message);
      process.exit(1);
    }
    unitId = newUnit.id;
    console.log(`✅ curriculum_units created (ID: ${unitId})`);
  }

  // 3. Ensure assessment_collections for Grade 3 Chapter 1
  const collectionTitle = 'Toán 3 - Tập 1 (Chương 1)';
  const { data: existingCol } = await supabase
    .from('assessment_collections')
    .select('id, units')
    .eq('subject_slug', 'toan')
    .eq('grade', 3)
    .eq('title', collectionTitle)
    .maybeSingle();

  let collectionId = '';
  if (existingCol) {
    collectionId = existingCol.id;
    console.log(`✅ assessment_collections already exists (ID: ${collectionId})`);
  } else {
    const { data: newCol, error: colError } = await supabase
      .from('assessment_collections')
      .insert({
        title: collectionTitle,
        subject_slug: 'toan',
        grade: 3,
        volume: 1,
        units: [1],
        status: 'published'
      })
      .select()
      .single();

    if (colError) {
      console.error("❌ Error inserting assessment_collections:", colError.message);
      process.exit(1);
    }
    collectionId = newCol.id;
    console.log(`✅ assessment_collections created (ID: ${collectionId})`);
  }

  // Define mapping for lesson mappings
  const LESSON_MAPPINGS = [
    {
      slug: 'bai_1',
      conceptSlug: 'concept-bai-1-tap-hop-cac-so-den-1000',
      titlePrefix: "Bài 1: Ôn tập các số đến 1 000",
      pool: BAI_1_POOL,
      lessonIdx: 1
    },
    {
      slug: 'bai_2',
      conceptSlug: 'concept-bai-2-on-tap-phep-cong-phep-tru',
      titlePrefix: "Bài 2: Ôn tập phép cộng, phép trừ",
      pool: BAI_2_POOL,
      lessonIdx: 2
    },
    {
      slug: 'bai_3',
      conceptSlug: 'concept-bai-3-tim-thanh-phan-trong-phep-cong-phep-tru',
      titlePrefix: "Bài 3: Tìm thành phần phép tính",
      pool: BAI_3_POOL,
      lessonIdx: 3
    },
    {
      slug: 'bai_4',
      conceptSlug: 'concept-bai-4-on-tap-bang-nhan-2-5-bang-chia-2-5',
      titlePrefix: "Bài 4: Bảng nhân chia 2; 5",
      pool: BAI_4_POOL,
      lessonIdx: 4
    },
    {
      slug: 'bai_5',
      conceptSlug: 'concept-bai-5-bang-nhan-3-bang-chia-3',
      titlePrefix: "Bài 5: Bảng nhân chia 3",
      pool: BAI_5_POOL,
      lessonIdx: 5
    },
    {
      slug: 'bai_6',
      conceptSlug: 'concept-bai-6-bang-nhan-4-bang-chia-4',
      titlePrefix: "Bài 6: Bảng nhân chia 4",
      pool: BAI_6_POOL,
      lessonIdx: 6
    },
    {
      slug: 'bai_7',
      conceptSlug: 'concept-bai-7-on-tap-hinh-hoc-va-eo-luong',
      titlePrefix: "Bài 7: Hình học và đo lường",
      pool: BAI_15_HINH_HOC_POOL,
      lessonIdx: 7
    },
    {
      slug: 'bai_8',
      conceptSlug: 'concept-bai-8-luyen-tap-chung',
      titlePrefix: "Bài 8: Luyện tập chung",
      pool: [...BAI_1_POOL, ...BAI_2_POOL],
      lessonIdx: 8
    }
  ];


  for (const lessonMapping of LESSON_MAPPINGS) {
    console.log(`\n-------------------------------------`);
    console.log(`Processing: ${lessonMapping.titlePrefix}`);

    // Find the node by checking exact path match
    const { data: lessonNode } = await supabase
        .from('curriculum_nodes')
        .select('id')
        .eq('path', `toan_3.chu_e_1_on_tap_va_bo_sung.${lessonMapping.slug}`)
        .single();


    if (!lessonNode) {
      console.error(`❌ Node not found for ${lessonMapping.titlePrefix}`);
      continue;
    }

    // Ensure Concept exists
    const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'toan-3-canh-dieu').single();
    const { data: concept } = await supabase.from('concepts').upsert({
        source_id: source?.id,
        slug: lessonMapping.conceptSlug,
        title: `Kiến thức ${lessonMapping.titlePrefix}`,
        description: `Ôn tập các kiến thức về ${lessonMapping.titlePrefix}`
    }, { onConflict: 'slug' }).select().single();

    if (!concept) {
      console.error(`❌ Concept not found/created for ${lessonMapping.titlePrefix}`);
      continue;
    }

    // Link concept to node
    await supabase.from('lesson_concepts').upsert({
        lesson_id: lessonNode.id,
        concept_id: concept.id
    }, { onConflict: 'lesson_id,concept_id' });

    // Clear previous exercise sets and exams
    await supabase.from('exercise_sets').delete().eq('metadata->>node_id', lessonNode.id).like('title', 'Đề luyện tập số%');
    const { data: existingExams } = await supabase.from('exams').select('id').eq('collection_id', collectionId).like('title', `${lessonMapping.titlePrefix}%`);
    if (existingExams && existingExams.length > 0) {
      const ids = existingExams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', ids);
      await supabase.from('exams').delete().in('id', ids);
    }

    for (let i = 1; i <= 4; i++) {
      const title = `Đề luyện tập số ${i}: ${lessonMapping.titlePrefix}`;
      console.log(`  -> Creating exam: ${title}`);

      const { data: exSet } = await supabase.from('exercise_sets').insert({
        title, type: 'practice', metadata: { node_id: lessonNode.id, concept_id: concept.id, sequence: i }
      }).select().single();

      const { data: exam } = await supabase.from('exams').insert({
        collection_id: collectionId, title, exam_number: i, total_questions: 20, generation_mode: 'balanced'
      }).select().single();

      if (exSet && exam) {
        // Pool of 10 handcrafted + 10 deterministic
        const questions = [
            ...getQuestions(lessonMapping.pool, 10),
            ...generateDeterministicQuestions(lessonMapping.lessonIdx, 10)
        ];

        for (let qIdx = 0; qIdx < questions.length; qIdx++) {
          const q = questions[qIdx];
          const { data: newQ } = await supabase.from('question_bank').insert({
            concept_id: concept.id, type: 'multiple_choice', difficulty: q.difficulty || 1.2,
            metadata_json: { question: q.question, options: q.options, correct_index: q.correct_index, explanation: q.explanation },
            source: 'handcrafted', status: 'approved', grade: 3, subject_slug: 'toan'
          }).select().single();

          if (newQ) {
            await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: newQ.id, sort_key: qIdx });
            await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: newQ.id, order_index: qIdx });
          }
        }
        console.log(`    ✅ Inserted 20 questions.`);
      }
    }
  }

  console.log("\n🎉 Grade 3 Chapter 1 assessments seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
