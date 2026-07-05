import * as fs from 'fs';
import * as path from 'path';

function mergeExams() {
  const baseDir = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON');
  const part1Path = path.join(baseDir, 'chu_diem_2_exams_part1.json');
  const part2Path = path.join(baseDir, 'chu_diem_2_exams_part2.json');
  const outputPath = path.join(baseDir, 'chu_diem_2_exams.json');

  const part1Data = JSON.parse(fs.readFileSync(part1Path, 'utf-8'));
  const part2Data = JSON.parse(fs.readFileSync(part2Path, 'utf-8'));

  const combinedData = {
    meta: part1Data.meta, // Assuming meta is the same
    exams: [...part1Data.exams, ...part2Data.exams]
  };

  fs.writeFileSync(outputPath, JSON.stringify(combinedData, null, 2));
  console.log(`Merged Theme 2 exams into ${outputPath}. Total exams: ${combinedData.exams.length}`);
}
mergeExams();
