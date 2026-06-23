import * as fs from 'fs';
import * as path from 'path';

// Locate the fetched raw content file
const rawFilePath = path.resolve('C:\\Users\\minhkhoi.MINHKHOI2-PC\\.gemini\\antigravity\\brain\\d24e7d17-4dc6-4fd5-8da0-cfbbe259d030\\.system_generated\\steps\\4822\\content.md');

if (!fs.existsSync(rawFilePath)) {
  console.error("Raw content file not found!");
  process.exit(1);
}

const content = fs.readFileSync(rawFilePath, 'utf8');

// The React Next.js data is contained inside the <script id="__NEXT_DATA__" type="application/json">...</script>
const nextDataMatch = content.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);

if (!nextDataMatch) {
  console.error("Could not find __NEXT_DATA__ script tag!");
  process.exit(1);
}

try {
  const jsonData = JSON.parse(nextDataMatch[1]);
  console.log("Successfully parsed Next.js raw data!");
  
  // Save the raw json structure to analyze
  const targetDir = path.resolve('d:/Backups/Projects/edu-platform/scratch');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  
  const outPath = path.join(targetDir, 'dol_next_data.json');
  fs.writeFileSync(outPath, JSON.stringify(jsonData, null, 2), 'utf8');
  console.log(`Saved Next.js parsed data to: ${outPath}`);
  
  // Let's print the top level properties to see where the dictation contents are stored
  console.log("Top Level Keys in props:", Object.keys(jsonData.props || {}));
  if (jsonData.props?.pageProps) {
    console.log("Keys in pageProps:", Object.keys(jsonData.props.pageProps));
    
    // Check if the data is encrypted or nested
    if (jsonData.props.pageProps.encryptedData) {
      console.log("Found encryptedData string. Let's decode it from URL encoding...");
      const decoded = decodeURIComponent(jsonData.props.pageProps.encryptedData);
      console.log("Decoded length:", decoded.length);
      
      // Save decoded string
      const decodedPath = path.join(targetDir, 'dol_decoded_data.json');
      try {
        const decodedJson = JSON.parse(decoded);
        fs.writeFileSync(decodedPath, JSON.stringify(decodedJson, null, 2), 'utf8');
        console.log(`Saved Decoded data to: ${decodedPath}`);
        console.log("Keys in Decoded JSON:", Object.keys(decodedJson));
      } catch (err) {
        // Might be custom encryption or simple JSON
        fs.writeFileSync(path.join(targetDir, 'dol_decoded_raw.txt'), decoded, 'utf8');
        console.log("Decoded data is not pure JSON. Saved raw to dol_decoded_raw.txt");
      }
    }
  }
  
} catch (e) {
  console.error("Error parsing JSON:", e.message);
}
