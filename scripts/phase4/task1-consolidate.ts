import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'D:\\Backups\\Projects\\convert_pdf_json\\output\\JSON\\mindset-for-ielts-foundation';
const OUTPUT_DIR = path.join(process.cwd(), 'scripts', 'phase4', 'data');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function consolidateData() {
  console.log(`Scanning source directory: ${SOURCE_DIR}`);
  const items = fs.readdirSync(SOURCE_DIR);
  
  const unitFolders = items.filter(item => {
    const fullPath = path.join(SOURCE_DIR, item);
    return fs.statSync(fullPath).isDirectory() && item.toLowerCase().includes('unit');
  });

  const unitTexts: Record<string, string> = {};

  for (const folder of unitFolders) {
    const match = folder.match(/\d+/);
    if (!match) continue;
    
    let unitNum = parseInt(match[0], 10);
    // Only process Unit 2 to 10
    if (unitNum < 2 || unitNum > 10) continue;

    const unitFormatted = unitNum.toString().padStart(2, '0');
    console.log(`Processing ${folder} -> UNIT_${unitFormatted}...`);

    const folderPath = path.join(SOURCE_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
    
    // Sort pages naturally
    files.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    });

    let rawText = '';
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(content);
        if (json.content) {
            rawText += `--- PAGE ${file} ---\n`;
            rawText += json.content + '\n\n';
        }
      } catch (e) {
        console.error(`Error reading ${filePath}`, e);
      }
    }

    if (!unitTexts[unitFormatted]) unitTexts[unitFormatted] = '';
    unitTexts[unitFormatted] += rawText;
  }

  for (const [unitFormatted, rawText] of Object.entries(unitTexts)) {
    if (rawText.length > 0) {
      const outPath = path.join(OUTPUT_DIR, `UNIT_${unitFormatted}_raw.txt`);
      fs.writeFileSync(outPath, rawText, 'utf-8');
      console.log(`✅ Saved ${outPath} (${rawText.length} chars)`);
    }
  }
}

consolidateData().catch(console.error);
