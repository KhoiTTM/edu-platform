import fs from 'fs';
import path from 'path';

const chapters = ['Chuong_1', 'Chuong_2'];
const basePath = path.join(__dirname, '../docs/Assement Studio/SGK_KHTN_7_JSON');

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

let allMd = '';
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
    md += `* ✓ Đúng: [Ví dụ đúng]\n* ✗ Sai: [Lưu ý thường gặp]\n`;
  }
  md += `\n`;

  md += `#### 5. Tổng kết\n`;
  md += `- Nắm vững các khái niệm cơ bản về ${title.split(': ')[1] || title}.\n`;
  if (data.objectives.length > 0) {
    md += data.objectives.map((o: string) => `- ${o}`).join('\n');
  }
  md += `\n`;
  
  allMd += '===' + title + '===\n' + md + '\n';
}

fs.writeFileSync(path.join(__dirname, '../temp_md.txt'), allMd, 'utf-8');
