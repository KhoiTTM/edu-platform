import * as fs from 'fs';
import * as path from 'path';

const decodedPath = path.resolve('d:/Backups/Projects/edu-platform/scratch/dol_decoded_data.json');
if (!fs.existsSync(decodedPath)) {
  console.error("Decoded file not found!");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(decodedPath, 'utf8'));

// Explore the nested 'data' object or check properties
console.log("Keys in 'data':", Object.keys(data.data || {}));
if (data.data) {
  // Let's print out what the structure looks like
  console.log("Dictation details:");
  console.log("Title:", data.urlInfo?.dol?.title);
  console.log("Description:", data.urlInfo?.dol?.description);
  console.log("Static fileInfo (e.g. image):", data.urlInfo?.dol?.fileInfo?.url);

  // If there's a nested question/script block, let's explore it:
  const contentKeys = Object.keys(data.data);
  contentKeys.forEach(k => {
    const val = data.data[k];
    console.log(`- data.${k} type:`, typeof val);
    if (val && typeof val === 'object') {
       console.log(`  Keys:`, Object.keys(val).slice(0, 10));
       if (Array.isArray(val)) {
         console.log(`  Length:`, val.length);
         console.log(`  First item sample:`, JSON.stringify(val[0]).slice(0, 300));
       }
    } else {
       console.log(`  Value:`, String(val).slice(0, 200));
    }
  });
}
