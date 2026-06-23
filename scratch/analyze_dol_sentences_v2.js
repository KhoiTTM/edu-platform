import * as fs from 'fs';
import * as path from 'path';

const decodedPath = path.resolve('d:/Backups/Projects/edu-platform/scratch/dol_decoded_data.json');
const data = JSON.parse(fs.readFileSync(decodedPath, 'utf8'));

const dictation = data.data?.data?.dictation;
if (dictation) {
  console.log("audio sourceFile object:", dictation.sourceFile);
  console.log("Number of sentences in array:", dictation.sentences?.length);
  
  if (dictation.sentences && dictation.sentences.length > 0) {
    console.log("First sentence raw keys:", Object.keys(dictation.sentences[0]));
    console.log("First sentence content:");
    console.log("EN:", dictation.sentences[0].sentence);
    console.log("VN:", dictation.sentences[0].sentenceVi);
    console.log("Start time:", dictation.sentences[0].startTime);
    console.log("End time:", dictation.sentences[0].endTime);
    console.log("Audio file info:", dictation.sentences[0].fileInfo);
  }
}
