import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: any = {};
envContent.split('\n').forEach((line: string) => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const conceptId = '994e0f21-d40c-46d4-89fc-fb4386d3e659'; // phep-cong-co-nho

const newExamsData = [
  {
    num: 5,
    title: 'Luyện phản xạ Toán 3 - Đề số 5: Cộng trừ nhẩm phạm vi 1000',
    questions: [
      { q: "Tính nhẩm: 350 + 50 = ?", opts: ["390", "400", "410", "420"], ans: 1 },
      { q: "Tính nhẩm: 700 - 150 = ?", opts: ["550", "600", "650", "500"], ans: 0 },
      { q: "Tính nhẩm: 420 + 80 = ?", opts: ["480", "500", "520", "490"], ans: 1 },
      { q: "Tính nhẩm: 900 - 250 = ?", opts: ["600", "650", "700", "750"], ans: 1 },
      { q: "Tính nhẩm: 150 + 150 = ?", opts: ["250", "300", "350", "400"], ans: 1 },
      { q: "Tính nhẩm: 800 - 450 = ?", opts: ["350", "400", "450", "300"], ans: 0 },
      { q: "Tính nhẩm: 640 + 60 = ?", opts: ["680", "700", "720", "740"], ans: 1 },
      { q: "Tính nhẩm: 500 - 120 = ?", opts: ["360", "380", "400", "420"], ans: 1 },
      { q: "Tính nhẩm: 270 + 130 = ?", opts: ["380", "390", "400", "410"], ans: 2 },
      { q: "Tính nhẩm: 1000 - 300 = ?", opts: ["600", "700", "800", "900"], ans: 1 },
      { q: "Tính nhẩm: 360 - 80 = ?", opts: ["260", "280", "300", "320"], ans: 1 },
      { q: "Tính nhẩm: 450 + 90 = ?", opts: ["520", "530", "540", "550"], ans: 2 },
      { q: "Tính nhẩm: 530 - 70 = ?", opts: ["450", "460", "470", "480"], ans: 1 },
      { q: "Tính nhẩm: 280 + 120 = ?", opts: ["380", "390", "400", "410"], ans: 2 },
      { q: "Tính nhẩm: 720 - 90 = ?", opts: ["610", "630", "650", "670"], ans: 1 },
      { q: "Tính nhẩm: 180 + 220 = ?", opts: ["380", "390", "400", "410"], ans: 2 },
      { q: "Tính nhẩm: 650 - 250 = ?", opts: ["300", "350", "400", "450"], ans: 2 },
      { q: "Tính nhẩm: 590 + 110 = ?", opts: ["680", "690", "700", "710"], ans: 2 },
      { q: "Tính nhẩm: 830 - 40 = ?", opts: ["770", "780", "790", "800"], ans: 2 },
      { q: "Tính nhẩm: 950 - 150 = ?", opts: ["750", "800", "850", "900"], ans: 1 }
    ]
  },
  {
    num: 6,
    title: 'Luyện phản xạ Toán 3 - Đề số 6: Nhân chia nhẩm nâng cao',
    questions: [
      { q: "Tính nhẩm: 8 x 4 = ?", opts: ["28", "30", "32", "36"], ans: 2 },
      { q: "Tính nhẩm: 63 : 7 = ?", opts: ["8", "9", "10", "7"], ans: 1 },
      { q: "Tính nhẩm: 9 x 5 = ?", opts: ["40", "45", "50", "55"], ans: 1 },
      { q: "Tính nhẩm: 72 : 8 = ?", opts: ["8", "9", "10", "7"], ans: 1 },
      { q: "Tính nhẩm: 8 x 7 = ?", opts: ["54", "56", "58", "60"], ans: 1 },
      { q: "Tính nhẩm: 54 : 6 = ?", opts: ["8", "9", "10", "7"], ans: 1 },
      { q: "Tính nhẩm: 9 x 9 = ?", opts: ["79", "80", "81", "82"], ans: 2 },
      { q: "Tính nhẩm: 48 : 8 = ?", opts: ["5", "6", "7", "8"], ans: 1 },
      { q: "Tính nhẩm: 7 x 6 = ?", opts: ["38", "40", "42", "44"], ans: 2 },
      { q: "Tính nhẩm: 36 : 4 = ?", opts: ["8", "9", "10", "7"], ans: 1 },
      { q: "Tính nhẩm: 8 x 6 = ?", opts: ["44", "46", "48", "50"], ans: 2 },
      { q: "Tính nhẩm: 56 : 7 = ?", opts: ["7", "8", "9", "6"], ans: 1 },
      { q: "Tính nhẩm: 9 x 4 = ?", opts: ["32", "34", "36", "38"], ans: 2 },
      { q: "Tính nhẩm: 81 : 9 = ?", opts: ["8", "9", "10", "7"], ans: 1 },
      { q: "Tính nhẩm: 8 x 8 = ?", opts: ["60", "64", "68", "72"], ans: 1 },
      { q: "Tính nhẩm: 45 : 9 = ?", opts: ["4", "5", "6", "7"], ans: 1 },
      { q: "Tính nhẩm: 7 x 9 = ?", opts: ["61", "63", "65", "67"], ans: 1 },
      { q: "Tính nhẩm: 64 : 8 = ?", opts: ["7", "8", "9", "6"], ans: 1 },
      { q: "Tính nhẩm: 9 x 6 = ?", opts: ["50", "52", "54", "56"], ans: 2 },
      { q: "Tính nhẩm: 42 : 7 = ?", opts: ["5", "6", "7", "8"], ans: 6, ans: 1 } // corrected
    ]
  },
  {
    num: 7,
    title: 'Luyện phản xạ Toán 3 - Đề số 7: Đơn vị đo lường cơ bản',
    questions: [
      { q: "1 m = ... cm?", opts: ["10", "100", "1000", "50"], ans: 1 },
      { q: "500 g + 500 g = ... kg?", opts: ["1", "2", "5", "10"], ans: 0 },
      { q: "1 l = ... ml?", opts: ["100", "500", "1000", "10"], ans: 2 },
      { q: "2 dm = ... cm?", opts: ["2", "20", "200", "5"], ans: 1 },
      { q: "1 kg = ... g?", opts: ["100", "500", "1000", "10"], ans: 2 },
      { q: "80 cm + 20 cm = ... m?", opts: ["1", "2", "10", "100"], ans: 0 },
      { q: "1 km = ... m?", opts: ["100", "500", "1000", "10000"], ans: 2 },
      { q: "3 l - 1000 ml = ... l?", opts: ["1", "2", "3", "2000"], ans: 1 },
      { q: "400 g + 600 g = ... kg?", opts: ["1", "2", "10", "1000"], ans: 0 },
      { q: "15 cm + 25 cm = ... dm?", opts: ["3", "4", "40", "5"], ans: 1 },
      { q: "700 ml + 300 ml = ... l?", opts: ["1", "2", "10", "1000"], ans: 0 },
      { q: "10 dm = ... m?", opts: ["1", "10", "100", "2"], ans: 0 },
      { q: "2 kg - 500 g = ... g?", opts: ["1500", "1000", "500", "2500"], ans: 0 },
      { q: "5 m - 200 cm = ... m?", opts: ["3", "4", "300", "2"], ans: 0 },
      { q: "1 l - 200 ml = ... ml?", opts: ["700", "800", "900", "600"], ans: 1 },
      { q: "150 g + 350 g = ... g?", opts: ["400", "450", "500", "550"], ans: 2 },
      { q: "60 mm = ... cm?", opts: ["6", "60", "600", "3"], ans: 0 },
      { q: "3 kg = ... g?", opts: ["30", "300", "3000", "30000"], ans: 2 },
      { q: "500 ml x 2 = ... l?", opts: ["1", "2", "10", "1000"], ans: 0 },
      { q: "4 dm + 60 cm = ... m?", opts: ["1", "10", "100", "2"], ans: 0 }
    ]
  },
  {
    num: 8,
    title: 'Luyện phản xạ Toán 3 - Đề số 8: Tìm thành phần chưa biết',
    questions: [
      { q: "Tìm x biết x + 15 = 40:", opts: ["x = 25", "x = 35", "x = 15", "x = 30"], ans: 0 },
      { q: "Tìm x biết x - 20 = 80:", opts: ["x = 60", "x = 80", "x = 100", "x = 90"], ans: 2 },
      { q: "Tìm x biết 6 x x = 48:", opts: ["x = 7", "x = 8", "x = 9", "x = 6"], ans: 1 },
      { q: "Tìm x biết 35 : x = 5:", opts: ["x = 6", "x = 7", "x = 8", "x = 9"], ans: 1 },
      { q: "Tìm x biết 50 - x = 18:", opts: ["x = 32", "x = 22", "x = 42", "x = 38"], ans: 0 },
      { q: "Tìm x biết x : 4 = 9:", opts: ["x = 32", "x = 36", "x = 40", "x = 28"], ans: 1 },
      { q: "Tìm x biết 27 + x = 60:", opts: ["x = 33", "x = 43", "x = 23", "x = 37"], ans: 0 },
      { q: "Tìm x biết x - 45 = 55:", opts: ["x = 90", "x = 100", "x = 110", "x = 80"], ans: 1 },
      { q: "Tìm x biết 9 x x = 72:", opts: ["x = 7", "x = 8", "x = 9", "x = 6"], ans: 1 },
      { q: "Tìm x biết 42 : x = 6:", opts: ["x = 6", "x = 7", "x = 8", "x = 9"], ans: 1 },
      { q: "Tìm x biết x + 120 = 300:", opts: ["x = 180", "x = 280", "x = 120", "x = 200"], ans: 0 },
      { q: "Tìm x biết 500 - x = 250:", opts: ["x = 200", "x = 250", "x = 300", "x = 150"], ans: 1 },
      { q: "Tìm x biết 8 x x = 64:", opts: ["x = 7", "x = 8", "x = 9", "x = 6"], ans: 1 },
      { q: "Tìm x biết x : 7 = 8:", opts: ["x = 54", "x = 56", "x = 58", "x = 60"], ans: 1 },
      { q: "Tìm x biết x + 85 = 100:", opts: ["x = 15", "x = 25", "x = 5", "x = 20"], ans: 0 },
      { q: "Tìm x biết x - 150 = 350:", opts: ["x = 400", "x = 450", "x = 500", "x = 550"], ans: 2 },
      { q: "Tìm x biết 7 x x = 49:", opts: ["x = 6", "x = 7", "x = 8", "x = 9"], ans: 1 },
      { q: "Tìm x biết x : 5 = 10:", opts: ["x = 45", "x = 50", "x = 55", "x = 60"], ans: 1 },
      { q: "Tìm x biết 90 : x = 9:", opts: ["x = 9", "x = 10", "x = 8", "x = 12"], ans: 1 },
      { q: "Tìm x biết x + 450 = 900:", opts: ["x = 400", "x = 450", "x = 500", "x = 550"], ans: 1 }
    ]
  },
  {
    num: 9,
    title: 'Luyện phản xạ Toán 3 - Đề số 9: Hình học và Chu vi nhẩm nhanh',
    questions: [
      { q: "Chu vi hình vuông có cạnh 5 cm là:", opts: ["15 cm", "20 cm", "25 cm", "30 cm"], ans: 1 },
      { q: "Chu vi hình tam giác có 3 cạnh là 3 cm, 4 cm, 5 cm là:", opts: ["10 cm", "11 cm", "12 cm", "15 cm"], ans: 2 },
      { q: "Một hình chữ nhật có chiều dài 6 cm, chiều rộng 4 cm, chu vi là:", opts: ["10 cm", "20 cm", "24 cm", "16 cm"], ans: 1 },
      { q: "Chu vi hình vuông có cạnh 8 dm là:", opts: ["16 dm", "24 dm", "32 dm", "36 dm"], ans: 2 },
      { q: "Chu vi hình chữ nhật có chiều dài 10 cm, chiều rộng 5 cm là:", opts: ["15 cm", "30 cm", "50 cm", "25 cm"], ans: 1 },
      { q: "Một hình tam giác đều có cạnh 6 cm. Chu vi của nó là:", opts: ["12 cm", "18 cm", "24 cm", "30 cm"], ans: 1 },
      { q: "Chu vi hình vuông có cạnh 10 mm là:", opts: ["20 mm", "30 mm", "40 mm", "50 mm"], ans: 2 },
      { q: "Một hình vuông có chu vi 16 cm. Độ dài cạnh của nó là:", opts: ["2 cm", "4 cm", "8 cm", "6 cm"], ans: 1 },
      { q: "Hình chữ nhật có chiều dài 8 cm, chiều rộng 2 cm, chu vi là:", opts: ["10 cm", "16 cm", "20 cm", "24 cm"], ans: 2 },
      { q: "Một hình tam giác có độ dài các cạnh đều bằng 8 dm. Chu vi hình đó là:", opts: ["16 dm", "24 dm", "32 dm", "20 dm"], ans: 1 },
      { q: "Chu vi hình vuông có cạnh 12 cm là:", opts: ["24 cm", "36 cm", "48 cm", "60 cm"], ans: 2 },
      { q: "Hình vuông có chu vi 36 dm. Độ dài cạnh của nó là:", opts: ["6 dm", "9 dm", "12 dm", "8 dm"], ans: 1 },
      { q: "Hình chữ nhật có chiều dài 12 cm, chiều rộng 8 cm, chu vi là:", opts: ["20 cm", "30 cm", "40 cm", "50 cm"], ans: 2 },
      { q: "Một hình tứ giác có độ dài các cạnh lần lượt là 2cm, 3cm, 4cm, 5cm. Chu vi của nó là:", opts: ["10 cm", "12 cm", "14 cm", "16 cm"], ans: 2 },
      { q: "Độ dài cạnh hình vuông có chu vi 28 cm là:", opts: ["5 cm", "6 cm", "7 cm", "8 cm"], ans: 2 },
      { q: "Một hình chữ nhật có chu vi 18 cm, chiều dài là 5 cm. Chiều rộng hình đó là:", opts: ["4 cm", "3 cm", "2 cm", "5 cm"], ans: 0 },
      { q: "Chu vi hình tam giác có độ dài các cạnh là 5cm, 10cm, 12cm là:", opts: ["22 cm", "25 cm", "27 cm", "30 cm"], ans: 2 },
      { q: "Chu vi hình vuông có cạnh 15 cm là:", opts: ["30 cm", "45 cm", "60 cm", "75 cm"], ans: 2 },
      { q: "Độ dài cạnh hình vuông có chu vi 40 cm là:", opts: ["5 cm", "10 cm", "15 cm", "8 cm"], ans: 1 },
      { q: "Một hình chữ nhật có chu vi 24 cm, chiều rộng là 4 cm. Chiều dài hình đó là:", opts: ["6 cm", "8 cm", "10 cm", "12 cm"], ans: 1 }
    ]
  },
  {
    num: 10,
    title: 'Luyện phản xạ Toán 3 - Đề số 10: Tính toán tổng hợp',
    questions: [
      { q: "Tính nhẩm: 10 + 5 x 2 = ?", opts: ["30", "20", "25", "15"], ans: 1 },
      { q: "Tính nhẩm: (30 - 10) : 5 = ?", opts: ["3", "4", "5", "6"], ans: 1 },
      { q: "Tính nhẩm: 40 - 24 : 4 = ?", opts: ["4", "34", "36", "38"], ans: 1 },
      { q: "Tính nhẩm: 5 x 6 - 10 = ?", opts: ["15", "20", "25", "30"], ans: 1 },
      { q: "Tính nhẩm: 18 + 12 : 3 = ?", opts: ["10", "20", "22", "24"], ans: 2 },
      { q: "Tính nhẩm: (15 + 15) x 2 = ?", opts: ["45", "50", "60", "70"], ans: 2 },
      { q: "Tính nhẩm: 50 - 5 x 5 = ?", opts: ["20", "25", "30", "35"], ans: 1 },
      { q: "Tính nhẩm: 4 x 8 + 8 = ?", opts: ["36", "40", "44", "48"], ans: 1 },
      { q: "Tính nhẩm: 60 : (6 + 4) = ?", opts: ["4", "5", "6", "10"], ans: 2 },
      { q: "Tính nhẩm: 100 - 50 : 2 = ?", opts: ["25", "50", "75", "85"], ans: 2 },
      { q: "Tính nhẩm: 30 x 3 - 40 = ?", opts: ["30", "40", "50", "60"], ans: 2 },
      { q: "Tính nhẩm: (20 + 80) : 4 = ?", opts: ["20", "25", "30", "35"], ans: 1 },
      { q: "Tính nhẩm: 7 x 7 - 9 = ?", opts: ["38", "40", "42", "44"], ans: 1 },
      { q: "Tính nhẩm: 12 x (10 - 7) = ?", opts: ["24", "36", "48", "30"], ans: 1 },
      { q: "Tính nhẩm: 90 : 3 + 20 = ?", opts: ["40", "50", "60", "70"], ans: 1 },
      { q: "Tính nhẩm: 15 x 2 - 15 = ?", opts: ["10", "15", "20", "25"], ans: 1 },
      { q: "Tính nhẩm: (100 - 20) : 8 = ?", opts: ["8", "10", "12", "15"], ans: 1 },
      { q: "Tính nhẩm: 6 x 5 + 30 = ?", opts: ["50", "60", "70", "80"], ans: 1 },
      { q: "Tính nhẩm: 72 : 9 x 5 = ?", opts: ["35", "40", "45", "50"], ans: 1 },
      { q: "Tính nhẩm: 5 x (3 + 7) = ?", opts: ["15", "35", "50", "45"], ans: 2 }
    ]
  }
];

async function run() {
  console.log('Inserting 6 new reflex collections...');

  for (const item of newExamsData) {
    const colTitle = `Toán 3 - Tập 1 - Chương 1 - Bài 2 - Đề ${item.num}`;
    
    // 1. Insert collection
    const { data: newCol, error: colErr } = await supabase
      .from('assessment_collections')
      .insert({
        title: colTitle,
        subject_slug: 'toan',
        grade: 3,
        curriculum: 'global_success',
        exam_type: 'reflex',
        difficulty_target: 1,
        status: 'published',
        units: [1, 2],
        sequence_number: item.num,
        volume: 1
      })
      .select('id')
      .single();

    if (colErr || !newCol) {
      console.error(`Error inserting collection ${colTitle}:`, colErr);
      continue;
    }

    console.log(`Inserted Collection: ${colTitle} (ID: ${newCol.id})`);

    // 2. Insert exam
    const { data: newExam, error: examErr } = await supabase
      .from('exams')
      .insert({
        collection_id: newCol.id,
        exam_number: 1,
        title: item.title,
        duration_minutes: 10,
        total_questions: item.questions.length,
        generation_mode: 'balanced'
      })
      .select('id')
      .single();

    if (examErr || !newExam) {
      console.error(`Error inserting exam ${item.title}:`, examErr);
      continue;
    }

    console.log(`Inserted Exam: ${item.title} (ID: ${newExam.id})`);

    // 3. For each question, insert to question_bank and link to exam
    for (let index = 0; index < item.questions.length; index++) {
      const qData = item.questions[index];
      
      const { data: qBank, error: qBankErr } = await supabase
        .from('question_bank')
        .insert({
          concept_id: conceptId,
          type: 'mcq',
          difficulty: 1.0,
          metadata_json: {
            question: qData.q,
            options: qData.opts,
            correct_index: qData.ans,
            explanation: `Kết quả đúng của phép tính/câu hỏi là ${qData.opts[qData.ans]}.`
          },
          source: 'handcrafted',
          grade: 3
        })
        .select('id')
        .single();

      if (qBankErr || !qBank) {
        console.error(`Error inserting question ${qData.q}:`, qBankErr);
        continue;
      }

      // Link to exam
      const { error: linkErr } = await supabase
        .from('exam_questions')
        .insert({
          exam_id: newExam.id,
          question_bank_id: qBank.id,
          order_index: index + 1,
          points: 1.0
        });

      if (linkErr) {
        console.error(`Error linking question ${qData.q} to exam:`, linkErr);
      }
    }

    console.log(`Finished inserting questions for ${item.title}`);
  }

  console.log('All 6 reflex exams successfully generated and inserted.');
}

run();
