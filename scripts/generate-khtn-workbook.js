const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../docs/Assement Studio/SGK_KHTN_BT_7/Chuong_I');
const outputFile = path.join(__dirname, '../content/khtn-7-workbook.json');

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json') && f.startsWith('page_'));
files.sort();

const workbookData = {};

let currentLesson = null;
let currentLessonSlug = null;

// Helper to normalize lesson names to slugs
function createSlug(title) {
  if (!title) return null;
  return title.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

files.forEach(file => {
  if (file === 'page_003.json' || file === 'page_004.json') return; // Ignore garbage test files

  const filePath = path.join(inputDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  if (data.lesson_title) {
    currentLesson = data.lesson_title;
    // Extract lesson number: e.g., "Bài 1: ..." -> "bai-1"
    const match = currentLesson.match(/bài\s+(\d+)/i);
    if (match) {
      currentLessonSlug = `bai-${match[1]}`;
      // Initialize if not exists
      if (!workbookData[currentLessonSlug]) {
        workbookData[currentLessonSlug] = {
          title: currentLesson,
          questions: []
        };
      }
    }
  }

  if (currentLessonSlug && data.sections) {
    data.sections.forEach(sec => {
      let secPrefix = '';
      if (sec.title) {
        const match = sec.title.match(/^(\d+\.\d+)/);
        if (match) secPrefix = match[1];
      }

      if (sec.questions) {
        sec.questions.forEach(q => {
          if (q.id) {
            let finalId = q.id;
            if (secPrefix && !q.id.includes('.')) {
              finalId = `${secPrefix}.${q.id}`;
            } else if (secPrefix && finalId === 'question') {
              finalId = secPrefix;
            }
            
            const existingQ = workbookData[currentLessonSlug].questions.find(q => q.id === finalId);
            if (existingQ) {
              // Merge options
              if (q.options && q.options.length > 0) {
                existingQ.options = [...existingQ.options, ...q.options];
                existingQ.optionsCount = existingQ.options.length;
              }
            } else {
              workbookData[currentLessonSlug].questions.push({
                id: finalId,
                type: q.answer_type || 'multiple_choice',
                page: data.page,
                text: q.question || q.problem || q.instruction || '',
                options: q.options || [],
                optionsCount: q.options ? q.options.length : 4 // fallback to 4
              });
            }
          }
        });
      }
      if (sec.exercises) {
         sec.exercises.forEach(ex => {
            if (ex.id) {
              let finalId = ex.id;
              if (secPrefix && !ex.id.includes('.')) {
                finalId = `${secPrefix}.${ex.id}`;
              }
              let isMatching = ex.answer_type === 'matching';
              let text = ex.problem || ex.instruction || '';
              let matchingItems = [];
              if (text.includes('Cột A') && text.includes('Cột B')) {
                isMatching = true;
                const colA = text.split('Cột B')[0];
                const matches = colA.match(/\d+\)/g);
                if (matches) {
                   matchingItems = matches.map(m => m.replace(')', ''));
                }
              }

              const existingEx = workbookData[currentLessonSlug].questions.find(q => q.id === finalId);
              if (existingEx) {
                // Merge options if any
                if (ex.options && ex.options.length > 0) {
                  existingEx.options = [...existingEx.options, ...ex.options];
                  existingEx.optionsCount = existingEx.options.length;
                }
              } else {
                workbookData[currentLessonSlug].questions.push({
                  id: finalId,
                  type: isMatching ? 'matching' : (ex.answer_type || 'short_answer'),
                  page: data.page,
                  text: text,
                  matchingItems: matchingItems,
                  options: ex.options || [],
                  optionsCount: 0
                });
              }
            }
         });
      }
    });
  }
});

// Since parsing OCR answers perfectly is hard, we will leave answers empty for now.
// The app will just record the student's submission.

if (!fs.existsSync(path.dirname(outputFile))) {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(workbookData, null, 2));
console.log('Workbook data generated at:', outputFile);
