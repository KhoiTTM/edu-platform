const fs = require('fs');
const path = require('path');

// Read from convert_pdf_json output
const inputDir = path.join(__dirname, '../../convert_pdf_json/output/json/sbt_tienganh_07');
const outputFile = path.join(__dirname, '../content/english7-workbook.json');

// Get all unit folders
const unitDirs = fs.readdirSync(inputDir).filter(f => {
  const fullPath = path.join(inputDir, f);
  return fs.statSync(fullPath).isDirectory() && (f.match(/^unit_/) || f === 'general');
});

// Sort units numerically
unitDirs.sort((a, b) => {
  if (a === 'general') return 1;
  if (b === 'general') return -1;
  const numA = parseInt(a.match(/\d+/)?.[0]) || 0;
  const numB = parseInt(b.match(/\d+/)?.[0]) || 0;
  return numA - numB;
});

const workbookData = {};

unitDirs.forEach(unitDir => {
  const isGeneral = unitDir === 'general';
  const unitNum = isGeneral ? 0 : parseInt(unitDir.match(/\d+/)[0]);
  const unitKey = isGeneral ? 'general' : `unit-${unitNum}`;

  // Read all JSON files in this unit
  const unitPath = path.join(inputDir, unitDir);
  const jsonFiles = fs.readdirSync(unitPath)
    .filter(f => f.endsWith('.json'))
    .sort((a, b) => {
      const pageA = parseInt(a.match(/\d+/)?.[0]) || 0;
      const pageB = parseInt(b.match(/\d+/)?.[0]) || 0;
      return pageA - pageB;
    });

  const unitTitle = isGeneral ? 'General/Reference' : `Unit ${unitNum}`;
  workbookData[unitKey] = {
    title: unitTitle,
    questions: []
  };

  let questionCounter = 0;

  jsonFiles.forEach((file, fileIdx) => {
    const filePath = path.join(unitPath, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const pageNum = parseInt(file.match(/\d+/)[0]) || 0;

      // Since English 7 SBT has unstructured content, we'll create a generic question per page
      // with the full text content
      if (data.content) {
        const content = data.content;

        // Split content into sections (rough heuristic: by numbered exercises)
        const sections = content.split(/\n(?=\d+\.)/);

        sections.forEach((section, secIdx) => {
          if (section.trim().length > 20) { // Only include non-empty sections
            questionCounter++;
            const questionId = `${unitNum}.${questionCounter}`;

            workbookData[unitKey].questions.push({
              id: questionId,
              type: 'reading_exercise',
              page: pageNum,
              text: section.trim().substring(0, 200), // Take first 200 chars as preview
              fullContent: section.trim(),
              optionsCount: 0
            });
          }
        });
      }
    } catch (e) {
      console.warn(`Warning: Could not parse ${file}:`, e.message);
    }
  });

  console.log(`✅ ${unitTitle}: ${workbookData[unitKey].questions.length} sections extracted`);
});

// Ensure output directory exists
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(workbookData, null, 2));
console.log('\n✨ English 7 workbook generated at:', outputFile);

// Print summary
let totalQuestions = 0;
Object.values(workbookData).forEach(unit => {
  totalQuestions += unit.questions.length;
});
console.log(`📊 Total units: ${Object.keys(workbookData).length}`);
console.log(`📊 Total question sections: ${totalQuestions}`);
