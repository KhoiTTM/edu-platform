import * as fs from 'fs';
import * as path from 'path';

const decodedPath = path.resolve('d:/Backups/Projects/edu-platform/scratch/dol_advice_decoded.json');
const data = JSON.parse(fs.readFileSync(decodedPath, 'utf8'));

const dictation = data.data?.data?.dictation;
if (dictation) {
  console.log("Name:", dictation.name);
  console.log("Audio Full URL:", dictation.sourceFile?.url);
  console.log("Total sentences:", dictation.sentences?.length);
  
  if (dictation.sentences && dictation.sentences.length > 0) {
    const outputSentences = dictation.sentences.map((s, idx) => ({
      index: idx,
      start: s.start,
      end: s.end,
      content: s.content,
      contentVi: s.contentVi,
      words: s.words
    }));
    
    // Save to a clean data file in scratch directory
    fs.writeFileSync(
      path.resolve('d:/Backups/Projects/edu-platform/scratch/advice_sentences.json'), 
      JSON.stringify({
        title: dictation.name,
        audio_url: dictation.sourceFile?.url,
        sentences: outputSentences
      }, null, 2), 
      'utf8'
    );
    console.log("Saved cleaned sentences output to scratch/advice_sentences.json");
  }
}
