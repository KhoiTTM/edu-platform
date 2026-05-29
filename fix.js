const fs = require('fs');
const file = 'content/assessments/pending/1 - Copy - Copy - Copy.json';
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
const fixed = [...lines.slice(0, 16), '      "question_data": {', ...lines.slice(195)];
fs.writeFileSync(file, fixed.join('\n'));
