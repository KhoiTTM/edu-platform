import * as fs from 'fs';
import * as path from 'path';

const decodedPath = path.resolve('d:/Backups/Projects/edu-platform/scratch/dol_decoded_data.json');
const data = JSON.parse(fs.readFileSync(decodedPath, 'utf8'));

const dictation = data.data?.data?.dictation;
if (dictation) {
  console.log("Dictation Keys:", Object.keys(dictation));
  console.log("Audio Path:", dictation.audioPath);
  console.log("Audio Full URL:", dictation.audioUrl);
  console.log("Detail Keys:", Object.keys(dictation.detail || {}));
  
  const sentences = dictation.detail?.sentences;
  if (sentences) {
     console.log("Number of sentences:", sentences.length);
     console.log("First 3 sentences sample:");
     sentences.slice(0, 3).forEach((s, idx) => {
       console.log(`\nSentence ${idx + 1}:`);
       console.log(" - text (EN):", s.text);
       console.log(" - translate (VN):", s.translate);
       console.log(" - audio url (sentence):", s.audioUrl);
       console.log(" - hint words:", s.words?.map(w => w.text).join(' '));
     });
  }
} else {
  console.log("dictation not found under data.data.dictation");
}
