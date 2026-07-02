import { vocabTopics, allVocabWords } from '../lib/data/startersVocabulary';

console.log("================ STARTERS VOCABULARY BOOK SUMMARY ================");
console.log(`Tổng số từ vựng: ${allVocabWords.length} từ`);
console.log(`Tổng số chủ đề: ${vocabTopics.length} chủ đề\n`);

vocabTopics.forEach((topic, index) => {
  console.log(`${index + 1}. Chủ đề: ${topic.title} (${topic.titleVi})`);
  console.log(`   - Số lượng từ: ${topic.words.length} từ`);
  console.log(`   - Các từ vựng: ${topic.words.map(w => `${w.english} (${w.vietnamese})`).join(', ')}\n`);
});
