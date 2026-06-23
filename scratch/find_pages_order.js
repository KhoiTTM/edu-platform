const fs = require('fs');
const path = require('path');

const dir = 'D:\\Backups\\Projects\\convert_pdf_json\\output\\json\\mindset-for-ielts-foundation\\unit_03';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const pages = [];
files.forEach(f => {
  const fileContent = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  // Extract page number from footer/header in content
  const pageNoMatch = fileContent.content.match(/UNIT\s+\d+\s+(\d+)|(\d+)\s+UNIT\s+\d+/i);
  const detectedBookPage = pageNoMatch ? (pageNoMatch[1] || pageNoMatch[2]) : null;
  pages.push({
    file: f,
    jsonPage: fileContent.page,
    detectedBookPage,
    snippet: fileContent.content.substring(0, 150).replace(/\n/g, ' ')
  });
});

pages.sort((a, b) => a.jsonPage - b.jsonPage);
console.log(JSON.stringify(pages, null, 2));
