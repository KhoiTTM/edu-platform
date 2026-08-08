const fs = require('fs');
const path = require('path');

function convertJsonToTxt(jsonFilename, txtFilename) {
  const jsonPath = path.join(__dirname, '..', 'content', 'wordlists', jsonFilename);
  const txtPath = path.join(__dirname, '..', 'content', 'wordlists', txtFilename);
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const wordsList = data.words.map(w => w.english).join('\n');
  
  fs.writeFileSync(txtPath, wordsList, 'utf-8');
  console.log(`Converted ${jsonFilename} to ${txtFilename} (${data.words.length} words)`);
}

convertJsonToTxt('tienganh7-draft-wordlist.json', 'tienganh7-draft-wordlist.txt');
convertJsonToTxt('ielts-draft-wordlist.json', 'ielts-draft-wordlist.txt');
