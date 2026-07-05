import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const romToInt: Record<string, number> = {
  'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 
  'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10
};

const CHUNKS_SIZE = 15;
const BASE_DIR = 'D:/Backups/Projects/convert_pdf_json/output/JSON/SBT_KHTN_07';

async function seedKHTN() {
  console.log("Fetching concept for KHTN 7...");
  const { data: concept } = await supabase.from('concepts').select('id').limit(1).single();
  let conceptId = null;
  if (concept) {
    conceptId = concept.id;
  }
  
  // Clear existing KHTN assessments to prevent duplicates
  await supabase.from('assessment_collections').delete().eq('subject_slug', 'khtn');
  if (conceptId) {
    await supabase.from('question_bank').delete().eq('concept_id', conceptId).eq('status', 'draft');
  }

  for (const rom of Object.keys(romToInt)) {
    const chapNum = romToInt[rom];
    console.log(`\nProcessing Chapter ${rom} (Unit ${chapNum})...`);
    
    // 1. Load answers
    const ansDir = path.join(BASE_DIR, `Answers_Chuong_${rom}`);
    let fullAnswerText = "";
    if (fs.existsSync(ansDir)) {
      for (const file of fs.readdirSync(ansDir)) {
        if (!file.endsWith('.json')) continue;
        const data = JSON.parse(fs.readFileSync(path.join(ansDir, file), 'utf-8'));
        if (data.content) {
          fullAnswerText += "\n" + data.content;
        }
      }
    }
    
    // 2. Load questions
    const exDir = path.join(BASE_DIR, `Chuong_${rom}`);
    const questionsToInsert: any[] = [];
    
    if (fs.existsSync(exDir)) {
      for (const file of fs.readdirSync(exDir)) {
        if (!file.endsWith('.json')) continue;
        const data = JSON.parse(fs.readFileSync(path.join(exDir, file), 'utf-8'));
        if (!data.sections) continue;
        
        for (const section of data.sections) {
          if (section.type === 'câu_hỏi_trắc_nghiệm' && section.questions) {
            for (const q of section.questions) {
              if (q.answer_type !== 'multiple_choice' || !q.options || q.options.length < 2) continue;
              
              const id = q.id;
              // Find answer in fullAnswerText
              const regex = new RegExp(`(?:^|\\s)${id.replace('.', '\\.')}\\s*[-.=:]?\\s*([A-D])`, 'i');
              const match = fullAnswerText.match(regex);
              
              if (match && match[1]) {
                const ansLetter = match[1].toUpperCase();
                let correctIndex = -1;
                const cleanOptions = q.options.map((opt: string, idx: number) => {
                  if (opt.startsWith(`${ansLetter}.`) || opt.startsWith(`${ansLetter} `)) {
                    correctIndex = idx;
                  }
                  return opt.replace(/^[A-D]\.\s*/, '').trim();
                });
                
                if (correctIndex !== -1) {
                  questionsToInsert.push({
                      subject_slug: 'khtn',
                      concept_id: conceptId,
                      type: 'multiple_choice',
                      metadata_json: {
                        question: q.question,
                        options: cleanOptions,
                        correct_index: correctIndex,
                        explanation: `Câu hỏi ${id} trong SBT KHTN 7`
                      },
                      difficulty: 2.0,
                      source: 'handcrafted',
                      status: 'draft',
                      grade: 7
                    });
                } else {
                  console.log(`  [Skip] ID ${id}: Found answer letter ${ansLetter} but could not match with options.`);
                }
              } else {
                console.log(`  [Skip] ID ${id}: Could not find answer in OCR text.`);
              }
            }
          }
        }
      }
    }
    
    console.log(`Found ${questionsToInsert.length} valid multiple choice questions for Chapter ${rom}.`);
    
    if (questionsToInsert.length > 0) {
      // Insert to question_bank
      const { data: inserted, error: insertErr } = await supabase.from('question_bank').insert(questionsToInsert).select('id');
      if (insertErr) {
        console.error("  Error inserting questions:", insertErr);
        continue;
      }
      
      const ids = inserted.map((q: any) => q.id);
      
      // Create assessment collections
      let chunkIdx = 1;
      for (let i = 0; i < ids.length; i += CHUNKS_SIZE) {
        const chunk = ids.slice(i, i + CHUNKS_SIZE);
        const { data: coll, error: collErr } = await supabase.from('assessment_collections').insert({
          subject_slug: 'khtn',
          title: `KHTN 7 - SBT - Chương ${rom} - Đề ${chunkIdx}`,
          grade: 7,
          volume: 1,
          units: [chapNum],
          status: 'published'
        }).select().single();
        
        if (collErr) {
          console.error("  Error creating collection:", collErr);
        } else if (coll) {
          const { data: exam, error: examErr } = await supabase.from('exams').insert({
            collection_id: coll.id,
            title: `Đề thi Chương ${rom} - Đề ${chunkIdx}`,
            exam_number: chunkIdx,
            total_questions: chunk.length,
            duration_minutes: 20,
            generation_mode: 'handcrafted',
            metadata_json: { unit: chapNum }
          }).select().single();
          
          if (examErr) {
             console.error("Error creating exam:", examErr);
          } else {
            const mapping = chunk.map((qid: string, index: number) => ({
              exam_id: exam.id,
              question_bank_id: qid,
              order_index: index
            }));
            await supabase.from('exam_questions').insert(mapping);
          }
        }
        chunkIdx++;
      }
      console.log(`  ✅ Created ${chunkIdx - 1} exams for Chapter ${rom}.`);
    }
  }
  
  console.log("\nDone seeding KHTN!");
}

seedKHTN().catch(console.error);
