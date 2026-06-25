const fs = require('fs');
const path = require('path');

const jsonDir = 'D:/Backups/Projects/convert_pdf_json/output/json/starters-wordlist-picture-book/General';
const mapping = {
  1: '1OVqgdZx5SuEOrupMzpi8C0218yfGW-dI',
  2: '1liJY9LESDLaA-AvfqC1joWAu8QQ2h4Ef',
  3: '1gcLj4uQAZZU1IckyGNMx8eAW4L0Hqqc9',
  4: '1WO7PLPgi5apUERFh0KNsqYsOQfrsRw7X',
  5: '1Qu3sLjnsFvShLEapSKbTvuT_r-k-58fJ',
  6: '1yy9qY3U8c-gvo-D3f-ccxEsWuuL3-ASp',
  7: '1oJMfS_fCO9JkdRKKIW-M7tVj7XMe-pAj',
  8: '1zhW6VJ1-TIHWXr6JdURVuOHtxCQ-Y_WW',
  9: '1JVWdfCfwgsLzwa0tH3jV3SZUURPWgdCw',
  10: '1tLmmZeXXFg5QEiAN0AymB0TeWqfSkNxy',
  11: '1q9gL8NzAAZ4N7QG5NcJ3yTLHQlGUbe3J',
  12: '1KgDgj86T_cWAcWx4TAWGPVRD46nwxRiC',
  13: '1fk-CVkXDNM4-_ZFn7dKdA460b6H6-YoL',
  14: '1N1NAUqTn7IqI3k4A9-DLZkxRbIizHMkn',
  15: '13cJHLWJJFd5-GRiV1jHbbjrduhoTarLx',
  16: '1bFZllpfSxMZw-Xa138B3BSLUlD5jgwTc',
  17: '1jP320-x5EJ4RNBNE3mGNn87GCiisNwII',
  18: '1z1XLY8Fhf4fof9hE01u0NEBbV02AcZSl',
  19: '1YGqLpYRtrvD0pVi6Ayi3RE36qC7n7QYp'
};

function run() {
  const pages = [];
  for (let pageNum = 1; pageNum <= 19; pageNum++) {
    const fileNumStr = String(pageNum).padStart(3, '0');
    const filePath = path.join(jsonDir, `page_${fileNumStr}.json`);
    
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      pages.push({
        pageNumber: pageNum,
        content: data.content || '',
        imageId: mapping[pageNum] || ''
      });
    } else {
      console.warn(`File not found: ${filePath}`);
      pages.push({
        pageNumber: pageNum,
        content: '',
        imageId: mapping[pageNum] || ''
      });
    }
  }

  const outputContent = `export interface StartersPage {
  pageNumber: number;
  content: string;
  imageId: string;
}

export const startersWordlistPages: StartersPage[] = ${JSON.stringify(pages, null, 2)};
`;

  const targetPath = path.resolve(__dirname, '../lib/data/startersWordlistData.ts');
  fs.writeFileSync(targetPath, outputContent, 'utf-8');
  console.log(`Successfully compiled and written to ${targetPath}`);
}

run();
