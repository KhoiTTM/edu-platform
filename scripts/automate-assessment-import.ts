import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const PENDING_DIR = path.join(process.cwd(), 'content/assessments/pending');
const IMPORTED_DIR = path.join(process.cwd(), 'content/assessments/imported');

async function processFiles() {
  console.log("--- Starting Batch Import ---");
  
  if (!fs.existsSync(PENDING_DIR)) {
    console.error("Pending directory not found.");
    return;
  }

  const files = fs.readdirSync(PENDING_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} files to process.`);

  // Get a valid concept_id for fallback
  const { data: fallbackConcept } = await supabase
    .from('concepts')
    .select('id')
    .limit(1)
    .single();

  for (const file of files) {
    const filePath = path.join(PENDING_DIR, file);
    console.log(`\nProcessing: ${file}`);

    try {
        const rawContent = fs.readFileSync(filePath, 'utf8');
        // Simple cleanup for missing quotes if common AI output issues occur
        // This is a basic fix, might need more robust parser if JSON is very broken
        let cleanJson = rawContent;
        if (!rawContent.trim().startsWith('{')) {
             throw new Error("Invalid start of file");
        }

        const data = JSON.parse(cleanJson);
        
        // 1. Create Collection
        const { data: col, error: colError } = await supabase
            .from('assessment_collections')
            .insert({
                title: data.title,
                subject_slug: data.metadata?.subject === "Tiếng Anh" ? "tieng_anh" : (data.metadata?.subject === "Toán" ? "math" : (data.metadata?.subject === "IELTS" ? "ielts" : (data.metadata?.subject?.toLowerCase() || 'tieng_anh'))),
                grade: data.metadata?.grade || 3,
                volume: data.metadata?.volume || 1,
                // Extract unit numbers from string like "Unit 1" and keep only the largest
                units: (() => {
                    const parsedUnits = data.metadata?.units?.map((u: any) => {
                        if (typeof u === 'number') return u;
                        return parseInt(u.replace(/\D/g, ''));
                    }).filter((n: number) => !isNaN(n)) || [];
                    return parsedUnits.length > 0 ? [Math.max(...parsedUnits)] : [];
                })(),
                reference_book: data.metadata?.book,
                status: 'published'
            })
            .select()
            .single();

        if (colError) throw colError;

        // 2. Create Exam
        const { data: exam, error: examError } = await supabase
            .from('exams')
            .insert({
                collection_id: col.id,
                title: data.title,
                total_questions: data.questions?.length || 0,
                generation_mode: 'manual_import'
            })
            .select()
            .single();

        if (examError) throw examError;

        // 3. Import Questions
        for (let i = 0; i < (data.questions || []).length; i++) {
            const q = data.questions[i];
            const { data: newQ, error: qError } = await supabase
                .from('question_bank')
                .insert({
                    concept_id: fallbackConcept?.id,
                    subject_slug: col.subject_slug,
                    grade: col.grade,
                    type: q.type,
                    difficulty: 1.0,
                    metadata_json: q.question_data,
                    source: 'manual_import',
                    source_anchor: q.source_anchor,
                    status: 'approved'
                })
                .select()
                .single();

            if (!qError && newQ) {
                await supabase.from('exam_questions').insert({
                    exam_id: exam.id,
                    question_bank_id: newQ.id,
                    order_index: i
                });
            }
        }

        console.log(`Successfully imported: ${file}`);
        
        // Move to imported
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '_');
        const newFileName = `imported_${dateStr}_${file.replace(/\s+/g, '').toLowerCase()}`;
        fs.renameSync(filePath, path.join(IMPORTED_DIR, newFileName));

    } catch (err: any) {
        console.error(`Failed to process ${file}:`, err.message);
    }
  }

  console.log("\n--- Batch Import Finished ---");
}

processFiles().catch(console.error);
