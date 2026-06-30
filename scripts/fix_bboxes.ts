import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'books', 'khtn7', 'page_data');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(dir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let modified = false;

    if (content.hotspots) {
      content.hotspots.forEach((hs: any) => {
        if (Array.isArray(hs.bbox)) {
          hs.bbox = {
            x: hs.bbox[0],
            y: hs.bbox[1],
            width: hs.bbox[2] - hs.bbox[0],
            height: hs.bbox[3] - hs.bbox[1]
          };
          modified = true;
        }
      });
    }

    if (content.textBlocks) {
      content.textBlocks.forEach((tb: any) => {
        if (Array.isArray(tb.bbox)) {
          tb.bbox = {
            x: tb.bbox[0],
            y: tb.bbox[1],
            width: tb.bbox[2] - tb.bbox[0],
            height: tb.bbox[3] - tb.bbox[1]
          };
          modified = true;
        }
      });
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`Fixed ${file}`);
    }
  }
});
