import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { buildExamTitle } from '../lib/assessment/buildExamTitle';

const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env';
const envConfig = fs.readFileSync(envFile, 'utf-8')
  .split('\n')
  .filter(line => line.includes('='))
  .reduce((acc: any, line) => {
    const [key, ...val] = line.split('=');
    acc[key.trim()] = val.join('=').trim().replace(/^['"]|['"]$/g, '');
    return acc;
  }, {});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || envConfig.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SUBJECT_SLUG = 'tieng-anh-7';
const SOURCE_SLUG = 'tieng-anh-7-global-success-sbt';
const GRADE = 7;

const unitArg = process.argv[2];
if (!unitArg || Number.isNaN(Number(unitArg))) {
  console.error('Usage: npx tsx scripts/migrate-tienganh7-unit-to-db.ts <unitNumber>');
  process.exit(1);
}
const UNIT_NUM = Number(unitArg);

type QBRow = {
  concept_id: string;
  type: 'multiple_choice' | 'fill_in_blank' | 'matching' | 'categorization' | 'true_false_no_info' | 'essay';
  difficulty: number;
  metadata_json: Record<string, any>;
  source: 'handcrafted';
  grade: number;
};

function buildQuestions(unitJson: any, conceptId: string): { rows: QBRow[]; skipped: { id: string; type: string; reason: string }[] } {
  const rows: QBRow[] = [];
  const skipped: { id: string; type: string; reason: string }[] = [];

  for (const section of unitJson.sections) {
    for (const ex of section.exercises) {
      switch (ex.type) {
        case 'multiple_choice':
        case 'multiple_choice_cloze': {
          for (const q of ex.questions) {
            if (!q.answer) {
              skipped.push({ id: `${ex.id}.${q.num}`, type: ex.type, reason: 'no fixed answer' });
              continue;
            }
            const letters = Object.keys(q.options);
            const options = letters.map((l) => q.options[l]);
            rows.push({
              concept_id: conceptId,
              type: 'multiple_choice',
              difficulty: 1.0,
              source: 'handcrafted',
              grade: GRADE,
              metadata_json: {
                question: q.stem || ex.instruction,
                options,
                correctOption: q.options[q.answer],
                exercise_id: ex.id,
                question_num: q.num,
                instruction: ex.instruction,
              },
            });
          }
          break;
        }
        case 'fill_blank_verb_form':
        case 'fill_blank_word_bank': {
          if (ex.passage_template && ex.answers) {
            const parts = (ex.passage_template as string).split('____');
            const sentences = parts.slice(0, -1).map((part: string, i: number) => ({
              template: `${part}__`,
              correct_answer: ex.answers[String(i + 1)],
            }));
            rows.push({
              concept_id: conceptId,
              type: 'fill_in_blank',
              difficulty: 1.0,
              source: 'handcrafted',
              grade: GRADE,
              metadata_json: {
                instruction: ex.instruction,
                sentences,
                exercise_id: ex.id,
                word_bank: ex.word_bank,
              },
            });
          } else if (Array.isArray(ex.questions)) {
            // Variant: per-sentence questions with a letter/word answer keyed into word_bank,
            // instead of one long passage_template (e.g. Unit 4 B.2, Unit 10 B.1).
            const wordBank = ex.word_bank;
            for (const q of ex.questions) {
              if (!q.answer) {
                skipped.push({ id: `${ex.id}.${q.num}`, type: ex.type, reason: 'no fixed answer' });
                continue;
              }
              const resolvedAnswer = wordBank && !Array.isArray(wordBank) && wordBank[q.answer] ? wordBank[q.answer] : q.answer;
              rows.push({
                concept_id: conceptId,
                type: 'essay',
                difficulty: 1.0,
                source: 'handcrafted',
                grade: GRADE,
                metadata_json: {
                  question: q.stem,
                  explanation: resolvedAnswer,
                  exercise_id: ex.id,
                  question_num: q.num,
                  word_bank: wordBank,
                  free_response: true,
                },
              });
            }
          } else {
            skipped.push({ id: ex.id, type: ex.type, reason: 'missing passage_template/answers and questions[]' });
          }
          break;
        }
        case 'matching': {
          if (!ex.answers || !ex.column_a || !ex.column_b) {
            skipped.push({ id: ex.id, type: ex.type, reason: 'missing column_a/column_b/answers' });
            break;
          }
          const pairs = Object.entries(ex.answers as Record<string, string>).map(([aKey, bKey]) => ({
            left: ex.column_a[aKey],
            right: ex.column_b[bKey as string],
          }));
          rows.push({
            concept_id: conceptId,
            type: 'matching',
            difficulty: 1.0,
            source: 'handcrafted',
            grade: GRADE,
            metadata_json: {
              instruction: ex.instruction,
              pairs,
              passage: ex.passage,
              exercise_id: ex.id,
            },
          });
          break;
        }
        case 'dialogue_matching': {
          if (!ex.answers || !ex.dialogue || !ex.options) {
            skipped.push({ id: ex.id, type: ex.type, reason: 'missing dialogue/options/answers' });
            break;
          }
          const pairs = Object.entries(ex.answers as Record<string, string>).map(([blankNum, letter]) => {
            const turn = ex.dialogue.find((t: any) => String(t.blank) === blankNum);
            const prevIdx = ex.dialogue.indexOf(turn) - 1;
            const context = ex.dialogue[prevIdx]?.line || '';
            return { left: `(${blankNum}) ${context}`, right: ex.options[letter as string] };
          });
          rows.push({
            concept_id: conceptId,
            type: 'matching',
            difficulty: 1.0,
            source: 'handcrafted',
            grade: GRADE,
            metadata_json: {
              instruction: ex.instruction,
              pairs,
              exercise_id: ex.id,
            },
          });
          break;
        }
        case 'label_and_classify':
        case 'classify_table': {
          if (!ex.classify_answers) {
            skipped.push({ id: ex.id, type: ex.type, reason: 'missing classify_answers' });
            break;
          }
          const groups = Object.entries(ex.classify_answers as Record<string, string[]>).map(([name, items]) => ({
            name,
            items,
          }));
          rows.push({
            concept_id: conceptId,
            type: 'categorization',
            difficulty: 1.0,
            source: 'handcrafted',
            grade: GRADE,
            metadata_json: {
              instruction: ex.instruction,
              groups,
              exercise_id: ex.id,
            },
          });
          break;
        }
        case 'fill_blank_list': {
          if (!Array.isArray(ex.questions)) {
            skipped.push({ id: ex.id, type: ex.type, reason: 'missing questions[]' });
            break;
          }
          for (const q of ex.questions) {
            if (!q.answer) {
              skipped.push({ id: `${ex.id}.${q.num}`, type: ex.type, reason: 'no fixed answer' });
              continue;
            }
            rows.push({
              concept_id: conceptId,
              type: 'essay',
              difficulty: 1.0,
              source: 'handcrafted',
              grade: GRADE,
              metadata_json: {
                question: q.stem,
                explanation: q.answer,
                exercise_id: ex.id,
                question_num: q.num,
                word_bank: ex.word_bank,
                free_response: true,
              },
            });
          }
          break;
        }
        case 'true_false_no_info': {
          for (const q of ex.questions) {
            if (!q.answer) {
              skipped.push({ id: `${ex.id}.${q.num}`, type: ex.type, reason: 'no fixed answer' });
              continue;
            }
            rows.push({
              concept_id: conceptId,
              type: 'true_false_no_info',
              difficulty: 1.0,
              source: 'handcrafted',
              grade: GRADE,
              metadata_json: {
                statement: q.stem,
                correct_answer: q.answer,
                passage: ex.shared_passage_ref ? undefined : ex.passage,
                exercise_id: ex.id,
                question_num: q.num,
              },
            });
          }
          break;
        }
        case 'picture_fill_blank': {
          for (const q of ex.questions) {
            if (!q.answer) {
              skipped.push({ id: `${ex.id}.${q.num}`, type: ex.type, reason: 'no fixed answer' });
              continue;
            }
            rows.push({
              concept_id: conceptId,
              type: 'essay',
              difficulty: 1.0,
              source: 'handcrafted',
              grade: GRADE,
              metadata_json: {
                question: `${q.stem}${q.image_desc ? ` [${q.image_desc}]` : ''}`,
                explanation: q.answer,
                exercise_id: ex.id,
                question_num: q.num,
              },
            });
          }
          break;
        }
        case 'sentence_analysis': {
          for (const q of ex.questions) {
            rows.push({
              concept_id: conceptId,
              type: 'essay',
              difficulty: 1.0,
              source: 'handcrafted',
              grade: GRADE,
              metadata_json: {
                question: `${ex.instruction}\n\n${q.sentence}`,
                explanation: q.answer,
                exercise_id: ex.id,
                question_num: q.num,
                free_response: true,
              },
            });
          }
          break;
        }
        case 'guided_speaking':
        case 'sentence_building':
        case 'guided_writing':
        case 'guided_writing_paragraph':
        case 'open_table': {
          const explanation = JSON.stringify(
            ex.suggested_answers || ex.questions?.map((q: any) => q.suggested_answer).filter(Boolean) || ex.note || '',
            null,
            2
          );
          rows.push({
            concept_id: conceptId,
            type: 'essay',
            difficulty: 1.0,
            source: 'handcrafted',
            grade: GRADE,
            metadata_json: {
              question: ex.instruction,
              explanation,
              exercise_id: ex.id,
              free_response: true,
            },
          });
          break;
        }
        case 'word_search':
        case 'crossword':
        case 'underline_classify':
        case 'paragraph_ordering':
        case 'error_identification':
        case 'synonym_finding':
        case 'mind_map_speaking':
        case 'read_aloud_stress': {
          skipped.push({ id: ex.id, type: ex.type, reason: 'no gradable UI in DB assessment system yet — kept in JSON only' });
          break;
        }
        default: {
          // Generic fallback for one-off/rare types (sentence_transformation, count_stresses,
          // circle_and_rewrite, short_answer_reading, classify_table-as-questions, stress_marking, etc.):
          // if the exercise has a per-question `answer`, insert it as a free-response `essay` row
          // rather than dropping the content entirely.
          if (Array.isArray(ex.questions) && ex.questions.some((q: any) => q.answer !== undefined)) {
            for (const q of ex.questions) {
              if (q.answer === undefined) {
                skipped.push({ id: `${ex.id}.${q.num}`, type: ex.type, reason: 'no fixed answer' });
                continue;
              }
              rows.push({
                concept_id: conceptId,
                type: 'essay',
                difficulty: 1.0,
                source: 'handcrafted',
                grade: GRADE,
                metadata_json: {
                  question: `${ex.instruction}\n\n${q.stem}`,
                  explanation: String(q.answer),
                  exercise_id: ex.id,
                  question_num: q.num,
                  free_response: true,
                },
              });
            }
          } else {
            skipped.push({ id: ex.id, type: ex.type, reason: 'unmapped type, no fallback possible' });
          }
        }
      }
    }
  }
  return { rows, skipped };
}

async function migrate() {
  console.log(`=== Migrate Tieng Anh 7 Unit ${UNIT_NUM} to Supabase ===\n`);

  const jsonPath = path.join('content', 'workbooks', `tienganh7-sbt-unit${UNIT_NUM}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error('ABORT: file not found', jsonPath);
    return;
  }
  const unitJson = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // 1. universal_subjects (must already exist)
  const { data: subject, error: subjErr } = await supabase
    .from('universal_subjects')
    .select('id, slug')
    .eq('slug', SUBJECT_SLUG)
    .single();
  if (subjErr || !subject) {
    console.error('ABORT: universal_subjects row not found for slug', SUBJECT_SLUG, subjErr);
    return;
  }
  console.log('Found subject:', subject.id);

  // 2. content_sources (create if missing)
  let { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', SOURCE_SLUG)
    .single();
  if (!source) {
    const { data: newSource, error: srcErr } = await supabase
      .from('content_sources')
      .insert({
        subject_id: subject.id,
        slug: SOURCE_SLUG,
        name: 'Tiếng Anh 7 - Global Success - Sách bài tập',
        provider: 'Global Success (NXB Giáo dục Việt Nam / Pearson)',
      })
      .select('id')
      .single();
    if (srcErr || !newSource) {
      console.error('ABORT: failed to create content_source', srcErr);
      return;
    }
    source = newSource;
    console.log('Created content_source:', source.id);
  } else {
    console.log('Found existing content_source:', source.id);
  }

  // 3. concepts (one per unit, create if missing)
  const conceptSlug = `tieng-anh-7-unit-${unitJson.unit}`;
  let { data: concept } = await supabase
    .from('concepts')
    .select('id')
    .eq('slug', conceptSlug)
    .single();
  if (!concept) {
    const { data: newConcept, error: conceptErr } = await supabase
      .from('concepts')
      .insert({
        source_id: source.id,
        slug: conceptSlug,
        title: unitJson.title,
        description: unitJson.source,
      })
      .select('id')
      .single();
    if (conceptErr || !newConcept) {
      console.error('ABORT: failed to create concept', conceptErr);
      return;
    }
    concept = newConcept;
    console.log('Created concept:', concept.id);
  } else {
    console.log('Found existing concept (already migrated?):', concept.id);
  }

  // Guard against double-insert: check if question_bank rows already exist for this concept.
  const { count: existingCount } = await supabase
    .from('question_bank')
    .select('id', { count: 'exact', head: true })
    .eq('concept_id', concept.id);
  if (existingCount && existingCount > 0) {
    console.error(`ABORT: concept ${conceptSlug} already has ${existingCount} question_bank rows. Refusing to insert duplicates. Delete them first if you want to re-run.`);
    return;
  }

  // 4. Build question_bank rows from JSON
  const { rows, skipped } = buildQuestions(unitJson, concept.id);
  console.log(`\nBuilt ${rows.length} question_bank rows, skipped ${skipped.length} exercises:`);
  skipped.forEach((s) => console.log(`  - ${s.id} (${s.type}): ${s.reason}`));

  const { data: insertedQuestions, error: qbErr } = await supabase
    .from('question_bank')
    .insert(rows)
    .select('id, type');
  if (qbErr || !insertedQuestions) {
    console.error('ABORT: failed to insert question_bank rows', qbErr);
    return;
  }
  console.log(`\nInserted ${insertedQuestions.length} question_bank rows.`);

  // 5. assessment_collections + exams + exam_questions (one exam bundling the whole unit)
  const examTitle = buildExamTitle({ subjectLabel: 'Tiếng Anh 7', group: 'sbt', position: unitJson.title });

  const { data: collection, error: colErr } = await supabase
    .from('assessment_collections')
    .insert({
      title: examTitle,
      subject_slug: SUBJECT_SLUG,
      grade: GRADE,
      curriculum: 'global_success',
      exam_type: null, // null => workbook tab, matches existing luyen-tap page logic
      status: 'published',
      units: [UNIT_NUM],
    })
    .select('id')
    .single();
  if (colErr || !collection) {
    console.error('ABORT: failed to create assessment_collection', colErr);
    return;
  }
  console.log('Created assessment_collection:', collection.id);

  const { data: exam, error: examErr } = await supabase
    .from('exams')
    .insert({
      collection_id: collection.id,
      exam_number: 1,
      title: examTitle,
      total_questions: insertedQuestions.length,
    })
    .select('id')
    .single();
  if (examErr || !exam) {
    console.error('ABORT: failed to create exam', examErr);
    return;
  }
  console.log('Created exam:', exam.id);

  const examQuestions = insertedQuestions.map((q, i) => ({
    exam_id: exam.id,
    question_bank_id: q.id,
    order_index: i,
  }));
  const { error: eqErr } = await supabase.from('exam_questions').insert(examQuestions);
  if (eqErr) {
    console.error('ABORT: failed to link exam_questions', eqErr);
    return;
  }
  console.log(`Linked ${examQuestions.length} exam_questions.`);

  console.log('\n=== Migration complete ===');
  console.log(`Exam ID for testing: ${exam.id}`);
  console.log(`Test URL: /test-assessment?examId=${exam.id}`);
}

migrate().catch(console.error);
