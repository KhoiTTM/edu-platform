const fs = require('fs');
const path = require('path');

const libDir = path.join(__dirname, '..', 'lib');
const outputFilePath = path.join(__dirname, '..', 'content', 'wordlists', 'ielts-draft-wordlist.json');

const stopWords = new Set([
  'a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'being', 'been',
  'has', 'have', 'had', 'do', 'does', 'did', 'i', 'you', 'he', 'she', 'it',
  'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'me', 'him',
  'us', 'them', 'to', 'in', 'on', 'at', 'for', 'from', 'of', 'with', 'by',
  'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out',
  'against', 'during', 'without', 'before', 'under', 'around', 'among', 'and',
  'but', 'or', 'so', 'because', 'if', 'although', 'unless', 'when', 'where',
  'why', 'how', 'what', 'which', 'who', 'whom', 'whose', 'that', 'this',
  'these', 'those', 'not', 'no', 'yes', 'up', 'down', 'here', 'there', 'very',
  'just', 'too', 'also', 'well', 'only', 'even', 'now', 'then', 'than',
  'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must',
  'some', 'any', 'many', 'much', 'more', 'most', 'other', 'another', 'such',
  'few', 'little', 'less', 'least', 'own', 'same', 'different', 'all', 'both',
  'each', 'every', 'either', 'neither', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'
]);

function extractStrings(obj, strings = []) {
  if (typeof obj === 'string') {
    strings.push(obj);
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      extractStrings(item, strings);
    }
  } else if (obj && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        strings.push(value);
      } else if (typeof value === 'object') {
        extractStrings(value, strings);
      }
    }
  }
  return strings;
}

function generateWordlist() {
  const files = ['ieltsTranscripts.ts', 'ieltsQuizzes.ts', 'ieltsReadingPassages.ts'];
  let allWords = new Set();
  
  files.forEach(file => {
    const filePath = path.join(libDir, file);
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract strings using simple regex for TS files since they are not JSON
    const stringMatches = content.match(/(['"`])(.*?)\1/gs);
    if (stringMatches) {
        stringMatches.forEach(match => {
            // Remove the quotes
            const str = match.slice(1, -1);
            const words = str.toLowerCase().split(/[^a-z]+/);
            words.forEach(w => {
                if (w.length > 2 && !stopWords.has(w)) {
                    allWords.add(w);
                }
            });
        });
    }
  });

  const wordArray = Array.from(allWords).sort();
  
  const wordlistJSON = wordArray.map((word, index) => ({
    id: `ielts-vocab-${index + 1}`,
    english: word,
    vietnamese: "",
    ipa: "",
    audio_url: ""
  }));

  const dir = path.dirname(outputFilePath);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, JSON.stringify({ words: wordlistJSON }, null, 2), 'utf-8');
  console.log(`Extracted ${wordArray.length} unique words to ${outputFilePath}`);
}

generateWordlist();
