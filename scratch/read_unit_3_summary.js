const fs = require('fs');
const path = require('path');

const dir = 'D:\\Backups\\Projects\\convert_pdf_json\\output\\json\\mindset-for-ielts-foundation\\unit_03';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();

files.forEach(f => {
  const content = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  console.log(`=== FILE: ${f} (Page ${content.page}) ===`);
  console.log(content.content.substring(0, 500));
  console.log('\n');
});
