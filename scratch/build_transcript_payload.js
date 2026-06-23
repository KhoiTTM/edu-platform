import * as fs from 'fs';
import * as path from 'path';

// Clean sentence extractor that exports key data for ieltsTranscripts.ts
const data = JSON.parse(fs.readFileSync(path.resolve('d:/Backups/Projects/edu-platform/scratch/advice_sentences.json'), 'utf8'));

const ieltsLines = data.sentences.map((s) => {
  // Try to find if there are any words that were BLANK to act as keyPhrase or just extract a clean phrase
  const cleanContent = s.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  const words = cleanContent.split(' ');
  const keyPhrase = words.slice(0, Math.min(3, words.length)).join(' ');
  
  return {
    english: s.content,
    vietnamese: s.contentVi,
    time: `${Math.floor(s.start / 1000)}s - ${Math.floor(s.end / 1000)}s`,
    keyPhrase: keyPhrase,
    phraseNote: `Mốc thời gian phát âm từ ${Math.round(s.start/100)/10} giây đến ${Math.round(s.end/100)/10} giây`
  };
});

fs.writeFileSync(
  path.resolve('d:/Backups/Projects/edu-platform/scratch/transcript_payload.json'),
  JSON.stringify(ieltsLines, null, 2),
  'utf8'
);
console.log("Successfully extracted payload lines:", ieltsLines.length);
