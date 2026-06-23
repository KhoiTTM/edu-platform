import * as fs from 'fs';
import * as path from 'path';

// Locate the fetched raw content file for advice-on-family-visit
const rawFilePath = path.resolve('C:\\Users\\minhkhoi.MINHKHOI2-PC\\.gemini\\antigravity\\brain\\d24e7d17-4dc6-4fd5-8da0-cfbbe259d030\\.system_generated\\steps\\4864\\content.md');

if (!fs.existsSync(rawFilePath)) {
  console.error("Raw content file not found!");
  process.exit(1);
}

const content = fs.readFileSync(rawFilePath, 'utf8');
const nextDataMatch = content.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);

if (!nextDataMatch) {
  console.error("Could not find __NEXT_DATA__ script tag!");
  process.exit(1);
}

try {
  const jsonData = JSON.parse(nextDataMatch[1]);
  if (jsonData.props?.pageProps?.encryptedData) {
    const decoded = decodeURIComponent(jsonData.props.pageProps.encryptedData);
    const decodedJson = JSON.parse(decoded);
    
    const targetDir = path.resolve('d:/Backups/Projects/edu-platform/scratch');
    fs.writeFileSync(path.join(targetDir, 'dol_advice_decoded.json'), JSON.stringify(decodedJson, null, 2), 'utf8');
    console.log("Decoded and saved advice-on-family-visit JSON data!");
  }
} catch (err) {
  console.error("Error parsing or decoding advice page data:", err);
}
