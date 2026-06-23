import * as fs from 'fs';
import * as path from 'path';

const decodedPath = path.resolve('d:/Backups/Projects/edu-platform/scratch/dol_decoded_data.json');
const data = JSON.parse(fs.readFileSync(decodedPath, 'utf8'));

const dictation = data.data?.data?.dictation;
if (dictation && dictation.sentences && dictation.sentences.length > 0) {
  const s0 = dictation.sentences[0];
  console.log("Sentence 0 keys:", Object.keys(s0));
  console.log("start:", s0.start);
  console.log("end:", s0.end);
  console.log("content:", s0.content);
  console.log("contentVi:", s0.contentVi);
  console.log("words sample (first 3):", s0.words ? s0.words.slice(0, 3) : 'none');
}
