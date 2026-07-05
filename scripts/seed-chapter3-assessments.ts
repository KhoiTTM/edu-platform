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

// --- PREREQUISITE QUESTIONS (Grade 6 Geometry) ---
const GEOMETRY_6_PREREQ = [
  { question: "Tính chu vi hình chữ nhật có chiều dài 8cm và chiều rộng 5cm.", options: ["26cm", "13cm", "40cm", "21cm"], correct_index: 0, explanation: "$C = (8 + 5) \\cdot 2 = 26$ cm.", difficulty: 1.0 },
  { question: "Diện tích hình vuông có cạnh bằng 6cm là:", options: ["$36 cm^2$", "$24 cm^2$", "$12 cm^2$", "$18 cm^2$"], correct_index: 0, explanation: "$S = 6^2 = 36 cm^2$.", difficulty: 1.0 },
  { question: "Hình hộp chữ nhật có bao nhiêu mặt?", options: ["6 mặt", "4 mặt", "8 mặt", "12 mặt"], correct_index: 0, explanation: "Hình hộp chữ nhật có 6 mặt là các hình chữ nhật.", difficulty: 1.0 },
  { question: "Tính thể tích hình lập phương có cạnh bằng 3cm.", options: ["$27 cm^3$", "$9 cm^3$", "$12 cm^3$", "$54 cm^3$"], correct_index: 0, explanation: "$V = 3^3 = 27 cm^3$.", difficulty: 1.2 },
  { question: "Diện tích tam giác có độ dài đáy 10cm và chiều cao 4cm là:", options: ["$20 cm^2$", "$40 cm^2$", "$14 cm^2$", "$7 cm^2$"], correct_index: 0, explanation: "$S = \\frac{1}{2} \\cdot 10 \\cdot 4 = 20 cm^2$.", difficulty: 1.0 },
  { question: "Một hình hộp chữ nhật có chiều dài 5cm, chiều rộng 3cm và chiều cao 4cm. Thể tích của nó là:", options: ["$60 cm^3$", "$12 cm^3$", "$20 cm^3$", "$15 cm^3$"], correct_index: 0, explanation: "$V = 5 \\cdot 3 \\cdot 4 = 60 cm^3$.", difficulty: 1.2 },
  { question: "Hình nào sau đây có 4 cạnh bằng nhau và 4 góc vuông?", options: ["Hình vuông", "Hình chữ nhật", "Hình thoi", "Hình bình hành"], correct_index: 0, explanation: "Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.", difficulty: 1.0 },
  { question: "Tính chu vi tam giác đều có cạnh bằng 7cm.", options: ["21cm", "14cm", "28cm", "49cm"], correct_index: 0, explanation: "$C = 7 \\cdot 3 = 21$ cm.", difficulty: 1.0 },
  { question: "Hình lập phương có bao nhiêu đỉnh?", options: ["8 đỉnh", "6 đỉnh", "12 đỉnh", "4 đỉnh"], correct_index: 0, explanation: "Hình lập phương có 8 đỉnh.", difficulty: 1.0 },
  { question: "Đường thẳng song song là hai đường thẳng:", options: ["Không có điểm chung", "Có một điểm chung", "Có vô số điểm chung", "Vuông góc với nhau"], correct_index: 0, explanation: "Hai đường thẳng song song là hai đường thẳng không có điểm chung.", difficulty: 1.0 },
  { question: "Diện tích hình thang có hai đáy là 6cm, 10cm và chiều cao 5cm là:", options: ["$40 cm^2$", "$80 cm^2$", "$31 cm^2$", "$30 cm^2$"], correct_index: 0, explanation: "$S = \\frac{(6+10) \\cdot 5}{2} = 40 cm^2$.", difficulty: 1.2 },
  { question: "Hình thoi có hai đường chéo là 8cm và 10cm. Diện tích hình thoi là:", options: ["$40 cm^2$", "$80 cm^2$", "$18 cm^2$", "$36 cm^2$"], correct_index: 0, explanation: "$S = \\frac{1}{2} \\cdot 8 \\cdot 10 = 40 cm^2$.", difficulty: 1.2 },
  { question: "Số đo góc vuông là bao nhiêu độ?", options: ["$90^\\circ$", "$180^\\circ$", "$60^\\circ$", "$45^\\circ$"], correct_index: 0, explanation: "Góc vuông có số đo bằng $90^\\circ$.", difficulty: 1.0 },
  { question: "Tổng số cạnh của một hình hộp chữ nhật là:", options: ["12 cạnh", "8 cạnh", "6 cạnh", "10 cạnh"], correct_index: 0, explanation: "Hình hộp chữ nhật có 12 cạnh.", difficulty: 1.0 },
  { question: "Hai góc kề bù có tổng số đo bằng:", options: ["$180^\\circ$", "$90^\\circ$", "$360^\\circ$", "$0^\\circ$"], correct_index: 0, explanation: "Hai góc kề bù có tổng số đo bằng $180^\\circ$.", difficulty: 1.2 }
];

// --- LESSON SPECIFIC QUESTIONS ---

// BAI 8: Hinh lang tru dung
const BAI_8_SPECIFIC = [
  { question: "Các mặt bên của hình lăng trụ đứng tam giác là hình gì?", options: ["Hình chữ nhật", "Hình tam giác", "Hình bình hành", "Hình vuông"], correct_index: 0, explanation: "Tất cả các mặt bên của hình lăng trụ đứng là hình chữ nhật.", difficulty: 1.0 },
  { question: "Một hình lăng trụ đứng tam giác có bao nhiêu mặt, bao nhiêu đỉnh?", options: ["5 mặt, 6 đỉnh", "6 mặt, 8 đỉnh", "4 mặt, 4 đỉnh", "3 mặt, 3 đỉnh"], correct_index: 0, explanation: "Lăng trụ đứng tam giác có 2 đáy, 3 mặt bên (tổng 5 mặt) và 6 đỉnh.", difficulty: 1.2 },
  { question: "Công thức tính diện tích xung quanh của hình lăng trụ đứng là:", options: ["$S_{xq} = C_{đáy} \\cdot h$", "$S_{xq} = S_{đáy} \\cdot h$", "$S_{xq} = 2 \\cdot C_{đáy} \\cdot h$", "$S_{xq} = \\frac{1}{2} C_{đáy} \\cdot h$"], correct_index: 0, explanation: "Diện tích xung quanh bằng chu vi đáy nhân với chiều cao.", difficulty: 1.2 },
  { question: "Một hình lăng trụ đứng tứ giác có chu vi đáy 20cm, chiều cao 10cm. Diện tích xung quanh là:", options: ["$200 cm^2$", "$100 cm^2$", "$400 cm^2$", "$20 cm^2$"], correct_index: 0, explanation: "$S_{xq} = 20 \\cdot 10 = 200 cm^2$.", difficulty: 1.2 },
  { question: "Hình lăng trụ đứng tam giác có hai đáy là hai tam giác:", options: ["Bằng nhau", "Đồng dạng", "Có diện tích bằng nhau nhưng không bằng nhau", "Vuông cân"], correct_index: 0, explanation: "Hai đáy của hình lăng trụ đứng là hai đa giác bằng nhau nằm trên hai mặt phẳng song song.", difficulty: 1.0 },
  { question: "Thể tích của hình lăng trụ đứng có diện tích đáy 12 cm² và chiều cao 5 cm là:", options: ["$60 cm^3$", "$30 cm^3$", "$17 cm^3$", "$120 cm^3$"], correct_index: 0, explanation: "$V = S \\cdot h = 12 \\cdot 5 = 60 cm^3$.", difficulty: 1.2 },
  { question: "Một hình lăng trụ đứng có đáy là hình vuông cạnh 4cm, chiều cao 10cm. Thể tích là:", options: ["$160 cm^3$", "$40 cm^3$", "$64 cm^3$", "$80 cm^3$"], correct_index: 0, explanation: "$S_{đáy} = 4^2 = 16 cm^2$. $V = 16 \\cdot 10 = 160 cm^3$.", difficulty: 1.5 },
  { question: "Số cạnh của một hình lăng trụ đứng ngũ giác (đáy là ngũ giác) là:", options: ["15 cạnh", "10 cạnh", "12 cạnh", "20 cạnh"], correct_index: 0, explanation: "Đáy trên 5 cạnh, đáy dưới 5 cạnh, 5 cạnh bên. Tổng cộng $5 \\cdot 3 = 15$ cạnh.", difficulty: 1.5 },
  { question: "Độ dài cạnh bên của hình lăng trụ đứng chính là:", options: ["Chiều cao của lăng trụ", "Chu vi đáy", "Đường chéo của đáy", "Đường chéo của mặt bên"], correct_index: 0, explanation: "Độ dài các cạnh bên song song và bằng nhau là chiều cao.", difficulty: 1.0 },
  { question: "Một lăng trụ đứng tam giác có các cạnh đáy là 3cm, 4cm, 5cm và chiều cao 8cm. Diện tích xung quanh là:", options: ["$96 cm^2$", "$48 cm^2$", "$60 cm^2$", "$120 cm^2$"], correct_index: 0, explanation: "$C_{đáy} = 3 + 4 + 5 = 12$ cm. $S_{xq} = 12 \\cdot 8 = 96 cm^2$.", difficulty: 1.5 }
];

// LUYEN TAP CHUNG
const LUYEN_TAP_SPECIFIC = [
  { question: "Diện tích xung quanh của hình lăng trụ đứng tam giác có chu vi đáy $C$ và chiều cao $h$ là:", options: ["$C \\cdot h$", "$2C \\cdot h$", "$S_{đáy} \\cdot h$", "$C + h$"], correct_index: 0, explanation: "$S_{xq} = C \\cdot h$.", difficulty: 1.0 },
  { question: "Tính thể tích khối gỗ hình lăng trụ đứng tam giác có diện tích đáy 20 cm² và chiều cao 15 cm.", options: ["$400 cm^3$", "$300 cm^3$", "$600 cm^3$", "$200 cm^3$"], correct_index: 1, explanation: "$V = 20 \\cdot 15 = 300 cm^3$.", difficulty: 1.2 },
  { question: "Một hình lăng trụ đứng có đáy là tam giác vuông có hai cạnh góc vuông 3cm và 4cm, chiều cao 10cm. Thể tích là:", options: ["$60 cm^3$", "$120 cm^3$", "$30 cm^3$", "$70 cm^3$"], correct_index: 0, explanation: "$S_{đáy} = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6 cm^2$. $V = 6 \\cdot 10 = 60 cm^3$.", difficulty: 1.5 },
  { question: "Số mặt của hình lăng trụ đứng tứ giác là:", options: ["6 mặt", "4 mặt", "8 mặt", "12 mặt"], correct_index: 0, explanation: "Gồm 2 đáy và 4 mặt bên.", difficulty: 1.0 },
  { question: "Nếu tăng chiều cao của lăng trụ đứng lên 2 lần và giữ nguyên diện tích đáy thì thể tích tăng lên bao nhiêu lần?", options: ["2 lần", "4 lần", "8 lần", "Không đổi"], correct_index: 0, explanation: "$V = S \\cdot h$, nên nếu $h$ tăng 2 lần thì $V$ tăng 2 lần.", difficulty: 1.2 },
  { question: "Cho hình lăng trụ đứng tam giác có diện tích xung quanh 120 cm², chu vi đáy 20 cm. Chiều cao của nó là:", options: ["6 cm", "12 cm", "10 cm", "5 cm"], correct_index: 0, explanation: "$h = S_{xq} : C = 120 : 20 = 6$ cm.", difficulty: 1.5 },
  { question: "Hình lăng trụ đứng tam giác có bao nhiêu cạnh đáy?", options: ["6 cạnh đáy", "3 cạnh đáy", "9 cạnh đáy", "5 cạnh đáy"], correct_index: 0, explanation: "Gồm 3 cạnh đáy trên và 3 cạnh đáy dưới, tổng là 6 cạnh đáy.", difficulty: 1.2 },
  { question: "Một cái hộp dạng lăng trụ đứng tứ giác đáy là hình thoi có hai đường chéo 6cm và 8cm, chiều cao 10cm. Thể tích hộp là:", options: ["$240 cm^3$", "$480 cm^3$", "$120 cm^3$", "$140 cm^3$"], correct_index: 0, explanation: "$S_{đáy} = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24 cm^2$. $V = 24 \\cdot 10 = 240 cm^3$.", difficulty: 1.8 },
  { question: "Diện tích toàn phần của lăng trụ đứng bằng:", options: ["$S_{xq} + 2S_{đáy}$", "$S_{xq} + S_{đáy}$", "$2S_{xq} + S_{đáy}$", "$C \\cdot h + S_{đáy}$"], correct_index: 0, explanation: "Diện tích toàn phần bằng diện tích xung quanh cộng diện tích hai đáy.", difficulty: 1.5 },
  { question: "Các mặt bên của hình lăng trụ đứng có vuông góc với mặt đáy không?", options: ["Có", "Không", "Chỉ lăng trụ tứ giác mới có", "Chỉ lăng trụ tam giác mới có"], correct_index: 0, explanation: "Theo định nghĩa lăng trụ đứng, các cạnh bên vuông góc với mặt đáy, do đó các mặt bên (là hình chữ nhật) cũng vuông góc với mặt đáy.", difficulty: 1.5 }
];

// ON TAP CHUONG 3
const ON_TAP_SPECIFIC = [
  { question: "Hình lăng trụ đứng tứ giác có 8 đỉnh, vậy nó có bao nhiêu cạnh?", options: ["12 cạnh", "16 cạnh", "10 cạnh", "8 cạnh"], correct_index: 0, explanation: "Lăng trụ đứng tứ giác có 12 cạnh.", difficulty: 1.0 },
  { question: "Diện tích xung quanh của lăng trụ đứng tam giác có 3 cạnh đáy 5cm, 12cm, 13cm và chiều cao 10cm là:", options: ["$300 cm^2$", "$150 cm^2$", "$30 cm^2$", "$600 cm^2$"], correct_index: 0, explanation: "$C_{đáy} = 5 + 12 + 13 = 30$ cm. $S_{xq} = 30 \\cdot 10 = 300 cm^2$.", difficulty: 1.5 },
  { question: "Thể tích của hình lăng trụ đứng tam giác ABC.A'B'C' có đáy ABC là tam giác vuông tại A, AB=3, AC=4, chiều cao AA'=10 là:", options: ["60", "120", "30", "70"], correct_index: 0, explanation: "$S_{ABC} = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6$. $V = 6 \\cdot 10 = 60$.", difficulty: 1.5 },
  { question: "Khẳng định nào sau đây là SAI?", options: ["Lăng trụ đứng có các mặt bên là hình bình hành", "Lăng trụ đứng có các mặt bên là hình chữ nhật", "Lăng trụ đứng có các cạnh bên song song và bằng nhau", "Lăng trụ đứng có hai đáy bằng nhau"], correct_index: 0, explanation: "Mặt bên lăng trụ đứng phải là hình chữ nhật, không chỉ là hình bình hành tổng quát.", difficulty: 1.2 },
  { question: "Một bể cá hình lăng trụ đứng tứ giác có đáy là hình chữ nhật dài 60cm, rộng 40cm. Mực nước trong bể cao 30cm. Thể tích nước là:", options: ["$72,000 cm^3$", "$24,000 cm^3$", "$100,000 cm^3$", "$12,000 cm^3$"], correct_index: 0, explanation: "$V = 60 \\cdot 40 \\cdot 30 = 72000 cm^3$.", difficulty: 1.5 },
  { question: "Tổng số mặt của một hình lăng trụ đứng lục giác (đáy 6 cạnh) là:", options: ["8 mặt", "6 mặt", "12 mặt", "18 mặt"], correct_index: 0, explanation: "2 mặt đáy + 6 mặt bên = 8 mặt.", difficulty: 1.5 },
  { question: "Diện tích xung quanh của một hình lập phương (lăng trụ đứng tứ giác đặc biệt) cạnh a là:", options: ["$4a^2$", "$6a^2$", "$a^3$", "$4a$"], correct_index: 0, explanation: "4 mặt bên hình vuông diện tích $a^2$ nên $S_{xq} = 4a^2$.", difficulty: 1.2 },
  { question: "Một cái lăng trụ đứng tam giác có diện tích đáy là $S$ và thể tích là $V$. Chiều cao $h$ được tính bằng:", options: ["$h = V : S$", "$h = S : V$", "$h = V \\cdot S$", "$h = 3V : S$"], correct_index: 0, explanation: "Từ $V = S \\cdot h \\Rightarrow h = V : S$.", difficulty: 1.2 },
  { question: "Cho hình lăng trụ đứng tứ giác có đáy là hình thang cân, độ dài 2 đáy là 4cm, 10cm, chiều cao hình thang là 4cm. Chiều cao lăng trụ là 10cm. Thể tích là:", options: ["$280 cm^3$", "$560 cm^3$", "$140 cm^3$", "$100 cm^3$"], correct_index: 0, explanation: "$S_{đáy} = \\frac{(4+10) \\cdot 4}{2} = 28 cm^2$. $V = 28 \\cdot 10 = 280 cm^3$.", difficulty: 1.8 },
  { question: "Tính diện tích toàn phần của lăng trụ đứng tam giác có $S_{xq} = 100 cm^2$ và đáy là tam giác vuông có 2 cạnh góc vuông 3cm, 4cm.", options: ["$112 cm^2$", "$106 cm^2$", "$100 cm^2$", "$107 cm^2$"], correct_index: 0, explanation: "$S_{đáy} = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6 cm^2$. $S_{tp} = 100 + 2 \\cdot 6 = 112 cm^2$.", difficulty: 1.8 }
];

// Helper to shuffle array and take N
function getQuestions(prereqPool: any[], specificPool: any[], count: number = 20) {
  const shuffledPrereq = [...prereqPool].sort(() => 0.5 - Math.random());
  const shuffledSpecific = [...specificPool].sort(() => 0.5 - Math.random());
  
  // Take 10 from each to make 20
  return [...shuffledPrereq.slice(0, 10), ...shuffledSpecific.slice(0, 10)];
}

async function seed() {
  console.log("🚀 Starting Chapter 3 assessments seeding...");

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

  // 2. Ensure curriculum_units has Grade 7 Unit 3 entry
  console.log("Ensuring curriculum_units entry for Chapter 3...");
  const { data: existingUnit } = await supabase
    .from('curriculum_units')
    .select('id')
    .eq('subject', 'toan')
    .eq('grade', 7)
    .eq('unit_number', 3)
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
        grade: 7,
        title: 'Chương 3: Hình học trực quan',
        unit_number: 3,
        subject_id: subject.id,
        book_name: 'Toán 7 - Kết nối tri thức'
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

  // 3. Ensure assessment_collections has Grade 7 Unit 3 entry
  console.log("Ensuring assessment_collections entry for Unit 3...");
  const { data: existingCol } = await supabase
    .from('assessment_collections')
    .select('id')
    .eq('subject_slug', 'toan')
    .eq('grade', 7)
    .eq('volume', 1)
    .contains('units', [3])
    .maybeSingle();

  let collectionId = '';
  if (existingCol) {
    collectionId = existingCol.id;
    console.log(`✅ assessment_collections already exists (ID: ${collectionId})`);
  } else {
    // Check if there is a 'Toán 7 - Tập 1' collection already (maybe hijacked or partial)
    const { data: mainCol } = await supabase
      .from('assessment_collections')
      .select('id, units')
      .eq('subject_slug', 'toan')
      .eq('grade', 7)
      .eq('volume', 1)
      .eq('title', 'Toán 7 - Tập 1')
      .maybeSingle();

    if (mainCol) {
      collectionId = mainCol.id;
      // Update units to include 3 if not present
      if (!mainCol.units.includes(3)) {
        await supabase
          .from('assessment_collections')
          .update({ units: [...mainCol.units, 3] })
          .eq('id', collectionId);
        console.log(`✅ Updated collection ${collectionId} to include Unit 3`);
      }
    } else {
      const { data: newCol, error: colError } = await supabase
        .from('assessment_collections')
        .insert({
          title: 'Toán 7 - Tập 1',
          subject_slug: 'toan',
          grade: 7,
          volume: 1,
          units: [3],
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
  }

  // 4. Ensure "Luyện tập chung" node exists in curriculum_nodes
  console.log("Ensuring 'Luyện tập chung' node exists for Chapter 3...");
  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'toan-7-ket-noi').single();
  const { data: chapterNode } = await supabase.from('curriculum_nodes').select('id').eq('slug', 'chuong-3-hinh-hoc-truc-quan').single();
  
  if (source && chapterNode) {
    const { data: ltcNode } = await supabase
      .from('curriculum_nodes')
      .upsert({
        source_id: source.id,
        parent_id: chapterNode.id,
        type: 'lesson',
        slug: 'luyen-tap-chung-chuong-3',
        title: 'Luyện tập chung (Chương 3)',
        path: `toan_7.chuong_3.luyen_tap_chung`,
        depth: 2,
        sort_key: 2,
        metadata: { skill_focus: 'grammar' }
      }, { onConflict: 'source_id,slug' })
      .select()
      .single();
    
    if (ltcNode) {
       console.log("✅ 'Luyện tập chung' node ensured.");
       // Link concept
       const { data: concept } = await supabase.from('concepts').upsert({
        source_id: source.id,
        slug: 'concept-luyen-tap-chung-chuong-3',
        title: `Kiến thức Luyện tập chung (Chương 3)`,
        description: `Ôn tập tổng hợp hình lăng trụ đứng.`
      }, { onConflict: 'slug' }).select().single();

      if (concept) {
        await supabase.from('lesson_concepts').upsert({
          lesson_id: ltcNode.id,
          concept_id: concept.id
        }, { onConflict: 'lesson_id,concept_id' });
      }
    }
  }

  // Define mapping for lesson mappings
  const LESSON_MAPPINGS = [
    {
      slug: 'bai-8-hinh-lang-tru-dung',
      conceptSlug: 'concept-bai-8-hinh-lang-tru-dung',
      titlePrefix: "Bài 8: Hình lăng trụ đứng",
      specificPool: BAI_8_SPECIFIC
    },
    {
      slug: 'luyen-tap-chung-chuong-3',
      conceptSlug: 'concept-luyen-tap-chung-chuong-3',
      titlePrefix: "Luyện tập chung (Chương 3)",
      specificPool: LUYEN_TAP_SPECIFIC
    },
    {
      slug: 'kiem-tra-chuong-3',
      conceptSlug: 'concept-kiem-tra-chuong-3',
      titlePrefix: "Ôn tập chương III",
      specificPool: ON_TAP_SPECIFIC
    }
  ];

  for (const lessonMapping of LESSON_MAPPINGS) {
    console.log(`\n-------------------------------------`);
    console.log(`Processing: ${lessonMapping.slug}`);

    const { data: lessonNode } = await supabase.from('curriculum_nodes').select('id').eq('slug', lessonMapping.slug).single();
    const { data: concept } = await supabase.from('concepts').select('id').eq('slug', lessonMapping.conceptSlug).single();

    if (!lessonNode || !concept) {
      console.error(`❌ Node or Concept not found for ${lessonMapping.slug}`);
      continue;
    }

    // Clear previous
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
        const questions = getQuestions(GEOMETRY_6_PREREQ, lessonMapping.specificPool, 20);
        for (let qIdx = 0; qIdx < questions.length; qIdx++) {
          const q = questions[qIdx];
          const { data: newQ } = await supabase.from('question_bank').insert({
            concept_id: concept.id, type: 'multiple_choice', difficulty: q.difficulty || 1.2,
            metadata_json: { question: q.question, options: q.options, correct_index: q.correct_index, explanation: q.explanation },
            source: 'handcrafted', status: 'approved', grade: 7, subject_slug: 'toan'
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

  console.log("\n🎉 Chapter 3 assessments seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
