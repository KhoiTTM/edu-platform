import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// Helper to parse CLI arguments like --subject math
function parseArgs() {
  const args = process.argv.slice(2);
  const params: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const val = args[i + 1];
      if (val && !val.startsWith('--')) {
        params[key] = val;
        i++;
      } else {
        params[key] = "true";
      }
    }
  }
  return params;
}

async function main() {
  const params = parseArgs();
  
  const subject = params['subject'];
  const grade = params['grade'];
  const volume = params['volume'] || "1";
  const lessonsArg = params['lessons'] || "all";
  const count = parseInt(params['count'] || "2", 10);
  const numQuestions = parseInt(params['questions'] || "15", 10);

  if (!subject || !grade) {
    console.error("Usage: npx tsx scripts/generate-procedural.ts --subject <sub> --grade <grade> [--lessons <all|1>] [--count <num>] [--questions <num>]");
    process.exit(1);
  }

  let maxLessons = 44; 
  if (subject === 'math' && grade === '3') {
    maxLessons = 44;
  } else if (subject === 'english' && grade === '3') {
    maxLessons = 11; // 10 English lessons + 1 review
  }

  let lessonsToGenerate: number[] = [];
  if (lessonsArg === 'all') {
    for (let i = 1; i <= maxLessons; i++) {
      lessonsToGenerate.push(i);
    }
  } else {
    lessonsToGenerate = lessonsArg.split(',').map(l => parseInt(l.trim(), 10));
  }

  const generatorPath = path.join(__dirname, 'generators', subject, `grade${grade}.ts`);
  
  if (!fs.existsSync(generatorPath)) {
    console.error(`Error: Generator not found for subject '${subject}' grade '${grade}' at ${generatorPath}`);
    process.exit(1);
  }

  console.log(`Loading generator for ${subject} Grade ${grade}...`);
  // Dynamic import the generator module using file URL for Windows support
  const generatorModule = await import(pathToFileURL(generatorPath).href);
  const generateQuestions = generatorModule.generateQuestions;

  if (typeof generateQuestions !== 'function') {
    console.error(`Error: Generator module at ${generatorPath} must export a 'generateQuestions' function.`);
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), 'content', 'assessments', 'pending');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Generating assessments... (Lessons: ${lessonsToGenerate.join(', ')}, Count per Lesson: ${count})`);
  let totalGenerated = 0;

  for (const lesson of lessonsToGenerate) {
    for (let c = 1; c <= count; c++) {
      const questions = generateQuestions(lesson, parseInt(volume, 10), numQuestions);
      if (!questions || questions.length === 0) continue;
      
      const assessmentJson = {
        title: `${subject.toUpperCase()} ${grade} - Tập ${volume} - Bài ${lesson} (Đề ${c})`,
        metadata: {
          subject: subject === 'math' ? 'Toán' : subject,
          grade: parseInt(grade, 10),
          volume: parseInt(volume, 10),
          book: `${subject === 'math' ? 'Toán' : subject} ${grade} - Kết nối tri thức`,
          lessons: [lesson],
          total_questions: questions.length,
          generated_date: new Date().toISOString().split('T')[0]
        },
        questions: questions
      };

      const filename = `${subject}-${grade}-vol${volume}-lesson${lesson}-test${c}.json`;
      const filepath = path.join(outDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(assessmentJson, null, 2), 'utf-8');
      
      totalGenerated++;
      console.log(`[+] Created ${filename} (${questions.length} questions)`);
    }
  }

  console.log(`\nSuccess! Generated ${totalGenerated} assessment files in ${outDir}`);
}

main().catch(console.error);
