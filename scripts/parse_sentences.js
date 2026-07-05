const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../scratch/advice_sentences.json');
const outputPath = path.join(__dirname, '../lib/adviceSentences.ts');

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const tsContent = `export interface WordItem {
  key: number;
  type: 'BLANK' | 'TEXT' | 'PUNCTUATION';
  value: string;
}

export interface SentenceItem {
  index: number;
  start: number;
  end: number;
  content: string;
  contentVi: string;
  words: WordItem[];
}

export interface AdviceData {
  title: string;
  audio_url: string;
  sentences: SentenceItem[];
}

export const adviceData: AdviceData = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log('Successfully written lib/adviceSentences.ts');
