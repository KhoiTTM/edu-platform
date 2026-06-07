import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase keys");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const LESSON_SLUGS: Record<string, string> = {
  "Bài 1: Nguyên tử": "bai-1-nguyen-tu",
  "Bài 2: Nguyên tố hoá học": "bai-2-nguyen-to-hoa-hoc",
  "Bài 3: Sơ lược về bảng tuần hoàn các nguyên tố hoá học": "bai-3-bang-tuan-hoan",
  "Bài 4: Sơ lược về phân tử": "bai-4-so-luoc-phan-tu",
  "Bài 5: Đơn chất - Hợp chất": "bai-5-don-chat-hop-chat",
  "Bài 5: Giới thiệu về liên kết hoá học": "bai-6-lien-ket-hoa-hoc",
  "Bài 6: Giới thiệu về liên kết hoá học": "bai-6-lien-ket-hoa-hoc",
  "Bài 6: Hoá trị và công thức hoá học": "bai-7-hoa-tri-cong-thuc-hoa-hoc",
  "Bài 7: Hoá trị và công thức hoá học": "bai-7-hoa-tri-cong-thuc-hoa-hoc"
};

async function seed() {
  console.log("🚀 Seeding KHTN 7 Theory...");

  const chapters = ['Chuong_1', 'Chuong_2'];
  const basePath = path.join(process.cwd(), 'docs/Assement Studio/SGK_KHTN_7_JSON');

  let currentLesson = '';
  let lessons: Record<string, any> = {};

  for (const chapter of chapters) {
    const dir = path.join(basePath, chapter);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
    for (const file of files) {
      const filePath = path.join(dir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      if (data.lesson_title) {
        currentLesson = data.lesson_title;
        lessons[currentLesson] = {
          title: currentLesson,
          objectives: data.learning_objectives || [],
          sections: [],
          tables: [],
          questions: [],
          exercises: []
        };
      }
      
      if (currentLesson && lessons[currentLesson]) {
        if (data.sections) lessons[currentLesson].sections.push(...data.sections);
        if (data.table) lessons[currentLesson].tables.push(data.table);
        if (data.questions) lessons[currentLesson].questions.push(...data.questions);
        if (data.exercises) lessons[currentLesson].exercises.push(...data.exercises);
      }
    }
  }

  // Generate markdown for each lesson and update DB
  for (const [title, data] of Object.entries(lessons)) {
    let md = `### Lý thuyết: ${title}\n\n`;
    md += `#### 1. Khái quát\n`;
    if (data.objectives.length > 0) {
      md += `Mục tiêu bài học:\n` + data.objectives.map((o: string) => `- ${o}`).join('\n') + `\n\n`;
    }
    if (data.sections.length > 0) {
      const s0_content = data.sections[0].content || '';
      md += `${data.sections[0].subtitle || ''}\n${s0_content}\n\n`;
    }

    md += `#### 2. Kiến thức cốt lõi\n`;
    for (let i = 1; i < data.sections.length; i++) {
      const content = data.sections[i].content || '';
      md += `> **${data.sections[i].subtitle || ''}**\n> ${content.replace(/\n/g, '\n> ')}\n\n`;
    }
    for (const table of data.tables) {
      md += `**${table.title}**\n`;
      md += `| ` + table.headers.join(' | ') + ` |\n`;
      md += `| ` + table.headers.map(() => '---').join(' | ') + ` |\n`;
      for (const row of table.rows) {
        md += `| ` + row.join(' | ') + ` |\n`;
      }
      md += `\n`;
    }

    md += `#### 3. Phân tích chi tiết\n`;
    if (data.questions.length > 0) {
      for (const q of data.questions) {
        md += `**Câu hỏi/Hoạt động:** ${q.content || ''}\n`;
        if (q.answer) {
          md += `*Giải đáp:* ${q.answer}\n`;
        }
        md += `\n`;
      }
    } else {
      md += `[Phân tích chi tiết các hoạt động trong SGK...]\n\n`;
    }

    md += `#### 4. Ví dụ minh hoạ\n`;
    if (data.exercises.length > 0) {
      for (const e of data.exercises.slice(0, 2)) {
        md += `* ✓ **Ví dụ**: ${e.question || ''}\n`;
        if (e.answer) md += `  -> **Đáp án**: ${e.answer}\n`;
      }
    } else {
      md += `* ✓ Đúng: Đọc đúng tên nguyên tố, viết đúng kí hiệu hoá học.\n* ✗ Sai: Nhầm lẫn giữa kí hiệu hoá học và tên gọi.\n`;
    }
    md += `\n`;

    md += `#### 5. Tổng kết\n`;
    md += `- Nắm vững các khái niệm cơ bản về ${title.split(': ')[1] || title}.\n`;
    if (data.objectives.length > 0) {
      md += data.objectives.map((o: string) => `- ${o}`).join('\n');
    }
    md += `\n`;

    const slug = LESSON_SLUGS[title];
    if (!slug) {
      console.warn(`⚠️ No slug mapping found for ${title}`);
      continue;
    }

    // Now update Supabase
    const { data: node, error } = await supabase
      .from('curriculum_nodes')
      .select('id, metadata')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`❌ Error fetching node ${slug}:`, error.message);
      continue;
    }

    if (node) {
      const currentMetadata = node.metadata || {};
      const updatedMetadata = {
        ...currentMetadata,
        skill_focus: "grammar",
        grammar_tutorial: md
      };

      const { error: updateError } = await supabase
        .from('curriculum_nodes')
        .update({ metadata: updatedMetadata })
        .eq('id', node.id);

      if (updateError) {
        console.error(`❌ Error updating node ${slug}:`, updateError.message);
      } else {
        console.log(`✅ Updated theory for ${slug}`);
      }
    }
  }

  console.log("✅ All KHTN 7 theory seeding complete!");
}

seed().catch(console.error);
