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

async function run() {
  console.log("=== Bắt đầu quét lỗi cấu trúc câu hỏi Điền từ (fill_in_blank) toàn hệ thống ===");

  let page = 0;
  const pageSize = 1000;
  let hasMore = true;
  let totalScanned = 0;
  let errorCount = 0;
  let fixedCount = 0;

  while (hasMore) {
    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data: questions, error } = await supabase
      .from('question_bank')
      .select('id, type, metadata_json')
      .in('type', ['fill_in_blank', 'fill_blank'])
      .range(from, to);

    if (error) {
      console.error("Error querying database:", error);
      break;
    }

    if (!questions || questions.length === 0) {
      hasMore = false;
      break;
    }

    totalScanned += questions.length;

    for (const q of questions) {
      const meta = q.metadata_json || {};
      const sentences = meta.sentences || [];

      if (sentences.length > 0) {
        let isCorrupted = false;
        
        // Kiểm tra xem có phần tử nào chứa ô điền '__' nhưng không có correct_answer
        sentences.forEach((s: any) => {
          if (s.template && s.template.includes('__') && s.correct_answer === undefined) {
            isCorrupted = true;
          }
        });

        if (isCorrupted) {
          errorCount++;
          console.log(`\n[LỖI] Phát hiện câu hỏi ID: ${q.id} | Số câu: ${sentences.length}`);

          // Cố gắng tự động vá lỗi nếu phát hiện đáp án bị ghép bằng dấu chấm phẩy ';' ở phần tử trước đó
          let didFix = false;
          for (let i = 0; i < sentences.length; i++) {
            const s = sentences[i];
            
            // Tìm ô bị thiếu correct_answer
            if (s.template && s.template.includes('__') && s.correct_answer === undefined) {
              // Kiểm tra xem ô phía trước có chứa dấu chấm phẩy không
              if (i > 0 && sentences[i - 1].correct_answer && sentences[i - 1].correct_answer.includes(';')) {
                const prevAnswers = sentences[i - 1].correct_answer.split(';').map((a: string) => a.trim());
                
                if (prevAnswers.length >= 2) {
                  sentences[i - 1].correct_answer = prevAnswers[0];
                  s.correct_answer = prevAnswers[1];
                  didFix = true;
                  console.log(`  -> Tự động vá: Tách prevAnswer '${prevAnswers.join('; ')}' cho câu ${i} và câu ${i + 1}`);
                }
              }
            }
          }

          if (didFix) {
            const { error: updateError } = await supabase
              .from('question_bank')
              .update({ metadata_json: meta })
              .eq('id', q.id);

            if (updateError) {
              console.error(`  -> Lỗi cập nhật DB cho câu ${q.id}:`, updateError.message);
            } else {
              fixedCount++;
              console.log(`  -> Đã sửa thành công trên Database!`);
            }
          } else {
            console.warn(`  -> CẢNH BÁO: Không thể tự động vá cho câu hỏi ID ${q.id}. Chi tiết sentences:`, JSON.stringify(sentences, null, 2));
          }
        }
      }
    }

    if (questions.length < pageSize) {
      hasMore = false;
    } else {
      page++;
    }
  }

  console.log(`\n=== TỔNG KẾT QUÉT CÂU HỎI ĐIỀN TỪ ===`);
  console.log(`- Tổng số câu hỏi điền từ đã quét: ${totalScanned}`);
  console.log(`- Số câu hỏi phát hiện bị lỗi: ${errorCount}`);
  console.log(`- Đã sửa lỗi thành công: ${fixedCount}/${errorCount}`);
}

run();
