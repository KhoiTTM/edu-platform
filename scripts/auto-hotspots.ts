import fs from "fs";
import path from "path";

const WORKBOOK_PATH = path.join(process.cwd(), "content", "khtn-7-workbook.json");
const BOOK_DIR = path.join(process.cwd(), "public", "books", "khtn7");
const PAGE_DATA_DIR = path.join(BOOK_DIR, "page_data");
const METADATA_PATH = path.join(BOOK_DIR, "metadata.json");

function run() {
  const workbookRaw = fs.readFileSync(WORKBOOK_PATH, "utf-8");
  const workbook = JSON.parse(workbookRaw);

  const questionsByPage: Record<number, any[]> = {};
  let totalActivities = 0;

  // Group questions by bookPage
  for (const lesson of Object.values(workbook) as any[]) {
    if (lesson.questions) {
      for (const q of lesson.questions) {
        const pageNum = q.bookPage || q.page; // Fallback to page if bookPage is missing
        if (!pageNum) continue;

        if (!questionsByPage[pageNum]) {
          questionsByPage[pageNum] = [];
        }
        questionsByPage[pageNum].push(q);
        totalActivities++;
      }
    }
  }

  console.log(`Found ${totalActivities} questions across ${Object.keys(questionsByPage).length} pages.`);

  // Process each page
  for (const [pageNumStr, questions] of Object.entries(questionsByPage)) {
    const pageNum = parseInt(pageNumStr);
    const paddedPage = pageNum.toString().padStart(3, "0");
    const pageFile = path.join(PAGE_DATA_DIR, `page_${paddedPage}.json`);

    if (fs.existsSync(pageFile)) {
      const pageDataRaw = fs.readFileSync(pageFile, "utf-8");
      const pageData = JSON.parse(pageDataRaw);

      pageData.hotspots = [];

      // Evenly distribute hotspots vertically
      const totalQ = questions.length;
      const startY = 0.1;
      const endY = 0.9;
      const heightPerQ = (endY - startY) / totalQ;

      questions.forEach((q, idx) => {
        const top = startY + idx * heightPerQ;
        const bottom = top + heightPerQ * 0.8; // Leave 20% gap

        pageData.hotspots.push({
          id: `hs-auto-${q.id}`,
          activityId: String(q.id),
          bbox: [0.1, top, 0.9, bottom]
        });
      });

      fs.writeFileSync(pageFile, JSON.stringify(pageData, null, 2), "utf-8");
      console.log(`✅ Updated page_${paddedPage}.json with ${totalQ} hotspots.`);
    } else {
      console.warn(`⚠️ Warning: ${pageFile} does not exist for questions.`);
    }
  }

  // Update metadata.json
  if (fs.existsSync(METADATA_PATH)) {
    const metaRaw = fs.readFileSync(METADATA_PATH, "utf-8");
    const meta = JSON.parse(metaRaw);
    meta.activityCount = totalActivities;
    fs.writeFileSync(METADATA_PATH, JSON.stringify(meta, null, 2), "utf-8");
    console.log(`✅ Updated metadata.json with activityCount: ${totalActivities}`);
  }

  console.log("🚀 Xong! Đã tự động bóc tách (giả lập) tọa độ cho tất cả câu hỏi KHTN 7.");
}

run();
