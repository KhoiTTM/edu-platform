import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

// Google Drive file IDs for KHTN 7 SBT pages
const GOOGLE_DRIVE_FILE_IDS: Record<number, string> = {
  1: "1csA2TrrcaCKm-GhxBIgZKuFkjCO7st8v",
  2: "1gSktepcX7UKVQnhIMCSlroPRK-lgIy_h",
  3: "1xmhFz1qmhhGHthufYLEgy_cJnLFWnVVG",
  4: "1DbHX3VTy-DlTSMEKd5OUeFdcr0QYv9QV",
  5: "1rWELDYJFgijkvBFq6rsVZUwR9Q5pP2Xa",
  // ... add rest as needed
};

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'khtn-pages');

async function downloadPage(pageNum: number, fileId: string) {
  try {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`⚠️  Page ${pageNum}: ${response.status}`);
      return false;
    }

    const buffer = await response.buffer();
    const filename = path.join(PUBLIC_DIR, `page-${pageNum}.jpg`);

    fs.writeFileSync(filename, buffer);
    console.log(`✅ Downloaded page ${pageNum}`);
    return true;
  } catch (err: any) {
    console.error(`❌ Error downloading page ${pageNum}:`, err.message);
    return false;
  }
}

async function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    console.log(`📁 Created directory: ${PUBLIC_DIR}`);
  }

  console.log('Starting download of KHTN 7 pages...\n');

  let downloaded = 0;
  for (const [pageNum, fileId] of Object.entries(GOOGLE_DRIVE_FILE_IDS)) {
    const success = await downloadPage(parseInt(pageNum), fileId);
    if (success) downloaded++;
    // Rate limit: wait 1 second between downloads
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n✨ Downloaded ${downloaded} pages total`);
}

run().catch(console.error);
