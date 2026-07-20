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
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name, grade')
    .or("display_name.ilike.%rio%,email.ilike.%rio%");

  if (!profiles || profiles.length === 0) {
    console.log("No student 'Rio' found.");
    return;
  }

  const rio = profiles[0];
  console.log(`=== HỌC SINH: ${rio.display_name} | Lớp: ${rio.grade} ===`);

  // Query learning sessions
  const { data: sessions, error: sessError } = await supabase
    .from('learning_sessions')
    .select('subject_slug, started_at, duration_seconds, summary_metrics')
    .eq('user_id', rio.id)
    .order('started_at', { ascending: false })
    .limit(40);

  if (sessError) {
    console.error("Error fetching sessions:", sessError);
    return;
  }

  console.log(`\n=== 40 PHIÊN HỌC TẬP GẦN ĐÂY NHẤT ===`);
  const subjectStats: Record<string, { count: number, totalDuration: number, scores: number[], totals: number[] }> = {};

  sessions?.forEach((s: any) => {
    const metrics = s.summary_metrics || {};
    const dateStr = new Date(s.started_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    const scoreText = metrics.score !== undefined ? ` | Điểm: ${metrics.score}/${metrics.total}` : '';
    const typeText = metrics.type === 'exam' ? 'Luyện đề' : 'Học bài';
    
    console.log(`[${dateStr}] Môn: ${s.subject_slug} | ${typeText}: ${metrics.unit_topic || 'N/A'}${scoreText} (${Math.round(s.duration_seconds / 60)} phút)`);

    if (!subjectStats[s.subject_slug]) {
      subjectStats[s.subject_slug] = { count: 0, totalDuration: 0, scores: [], totals: [] };
    }
    subjectStats[s.subject_slug].count++;
    subjectStats[s.subject_slug].totalDuration += (s.duration_seconds || 0);
    if (metrics.score !== undefined) {
      subjectStats[s.subject_slug].scores.push(metrics.score);
      subjectStats[s.subject_slug].totals.push(metrics.total);
    }
  });

  console.log(`\n=== THỐNG KÊ TỔNG QUAN THEO MÔN HỌC (Gần đây) ===`);
  for (const [subject, stat] of Object.entries(subjectStats)) {
    const avgScore = stat.scores.length > 0 
      ? (stat.scores.reduce((a, b) => a + b, 0) / stat.totals.reduce((a, b) => a + b, 0) * 100).toFixed(1) + '%'
      : 'N/A';
    console.log(`- Môn [${subject}]: ${stat.count} phiên | Tổng thời gian: ${Math.round(stat.totalDuration / 60)} phút | Tỷ lệ đúng TB: ${avgScore}`);
  }
}

run();
