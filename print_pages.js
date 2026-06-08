const fs = require('fs');
const path = require('path');

const p = 'D:/Backups/Projects/convert_pdf_json/output/JSON/mindset-for-ielts-foundation/UNIT_01';
const files = fs.readdirSync(p).filter(f=>f.endsWith('.json')).sort();
let out = '';
files.forEach(f => {
  const c = JSON.parse(fs.readFileSync(path.join(p,f),'utf8'));
  out += '\n--- PAGE ' + c.page + ' ---\n' + c.content;
});
fs.writeFileSync('pages.txt', out);
console.log("Written to pages.txt");
