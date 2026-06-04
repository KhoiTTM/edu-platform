import * as fs from 'fs';
import * as path from 'path';

function mergeExams() {
  const baseDir = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON');
  const mainPath = path.join(baseDir, 'chu_diem_1_exams.json');
  const part2aPath = path.join(baseDir, 'chu_diem_1_exams_part2a.json');
  const part2bPath = path.join(baseDir, 'chu_diem_1_exams_part2b.json');

  const mainData = JSON.parse(fs.readFileSync(mainPath, 'utf-8'));
  const part2aData = JSON.parse(fs.readFileSync(part2aPath, 'utf-8'));
  const part2bData = JSON.parse(fs.readFileSync(part2bPath, 'utf-8'));

  // Add exams from part2a and part2b to mainData.exams
  mainData.exams.push(...part2aData.exams);
  mainData.exams.push(...part2bData.exams);

  // Write back
  fs.writeFileSync(mainPath, JSON.stringify(mainData, null, 2));
  console.log(`Merged exams. Total exams: ${mainData.exams.length}`);
}
mergeExams();
