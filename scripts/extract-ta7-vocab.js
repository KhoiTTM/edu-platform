const fs = require('fs');
const path = require('path');

const workbooksDir = path.join(__dirname, '..', 'content', 'workbooks');
const outputFilePath = path.join(__dirname, '..', 'content', 'wordlists', 'tienganh7-draft-wordlist.json');

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
    // Only extract from specific keys that likely contain target words
    const targetKeys = ['answer', 'options', 'suggested_answers', 'words_to_find', 'classify_answers', 'stem', 'question', 'text'];
    for (const [key, value] of Object.entries(obj)) {
      if (targetKeys.includes(key) && typeof value === 'string') {
        strings.push(value);
      } else if (targetKeys.includes(key) && typeof value === 'object') {
         extractStrings(value, strings);
      } else if (typeof value === 'object') {
        extractStrings(value, strings);
      }
    }
  }
  return strings;
}

function generateWordlist() {
  const files = fs.readdirSync(workbooksDir).filter(f => f.startsWith('tienganh7-sbt-unit') && f.endsWith('.json'));
  
  let allWords = new Set();
  
  files.forEach(file => {
    const filePath = path.join(workbooksDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Extract strings
    const strings = extractStrings(data);
    
    strings.forEach(str => {
      // Tokenize
      const words = str.toLowerCase().split(/[^a-z]+/);
      words.forEach(w => {
        if (w.length > 2 && !stopWords.has(w)) {
          allWords.add(w);
        }
      });
    });
  });

  const wordArray = Array.from(allWords).sort();
  
  // Format to standard wordlist JSON structure
  const wordlistJSON = wordArray.map((word, index) => ({
    id: `ta7-vocab-${index + 1}`,
    english: word,
    vietnamese: "", // To be filled
    ipa: "", // To be filled
    audio_url: "" // To be filled
  }));

  // Ensure output directory exists
  const dir = path.dirname(outputFilePath);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, JSON.stringify({ words: wordlistJSON }, null, 2), 'utf-8');
  console.log(`Extracted ${wordArray.length} unique words to ${outputFilePath}`);
}

generateWordlist();
