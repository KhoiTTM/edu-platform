import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import IELTSSkillsNav from '@/components/IELTSSkillsNav';
import type { Lesson } from '@/types/database';

const UNIT_LABELS: Record<number, string> = {
  1: 'Daily Life', 2: 'House & Home', 3: 'Hobbies',
  4: 'Travel', 5: 'Food', 6: 'Transport',
  7: 'Jobs', 8: 'Health', 9: 'Language', 10: 'Tech',
};

const SKILL_COLORS: Record<string, string> = {
  listening: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  speaking:  'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  reading:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  writing:   'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30',
  grammar:   'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

export default async function MindsetIELTSPage() {
  const supabase = await createClient();

  // 1. Fetch IELTS Source
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'mindset-foundation')
    .maybeSingle();

  let lessons: any[] = [];
  
  if (source) {
    // 2. Fetch all nodes for this source (Units and Lessons)
    const { data: nodes } = await supabase
      .from('curriculum_nodes')
      .select('id, title, slug, type, sort_key, metadata')
      .eq('source_id', source.id)
      .order('sort_key', { ascending: true });

    if (nodes) {
        // Map nodes to the structure expected by the UI
        lessons = nodes
          .filter(n => n.type === 'unit') // The legacy 'lessons' are now 'unit' nodes in hierarchical engine
          .map(n => ({
            id: n.id,
            title: n.title,
            lesson_index: n.sort_key,
            youtube_video_id: n.metadata?.youtube_id,
            skill_focus: n.metadata?.skill_focus,
            page_hint: n.metadata?.page_hint || `Unit ${n.slug.split('-')[1]}`,
          }));
    }
  }

  // Group by unit number
  const byUnit: Record<number, any[]> = {};
  for (const l of lessons) {
    const m = l.title.match(/U(\d+)/i);
    const unit = m ? parseInt(m[1]) : (l.lesson_index ? Math.ceil(l.lesson_index / 3.6) : 0); // fallback grouping
    if (!byUnit[unit]) byUnit[unit] = [];
    byUnit[unit].push(l);
  }

  const unitNums = Object.keys(byUnit)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="rounded-2xl border border-sky-900/40 bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-indigo-950/20 p-6 md:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
            📘 MINDSET FOR IELTS FOUNDATION
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-white tracking-tight">
            Lộ Trình 36 Buổi
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-xl">
            Toàn bộ lộ trình học IELTS Foundation bám sát giáo trình. Click vào từng buổi để bắt đầu học.
          </p>
          <div className="mt-5 flex items-center gap-6 border-t border-slate-800 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tổng buổi học</p>
              <p className="text-2xl font-bold text-white">{lessons.length} Buổi</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Số Unit</p>
              <p className="text-2xl font-bold text-white">10 Units</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Có bài nghe</p>
              <p className="text-2xl font-bold text-sky-400">
                {lessons.filter(l => l.youtube_video_id).length} Buổi
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Skill Nav */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lọc theo kỹ năng:</span>
        <IELTSSkillsNav />
      </div>

      {/* Units */}
      {unitNums.map((unit) => (
        <section key={unit} className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white shadow-md shadow-sky-500/20">
              {unit}
            </span>
            <h2 className="text-base font-bold text-white">
              Unit {unit}: {UNIT_LABELS[unit] ?? '—'}
            </h2>
            <span className="text-xs text-slate-500">{byUnit[unit].length} buổi</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {byUnit[unit].map((lesson) => {
              const hasVideo = !!lesson.youtube_video_id;
              const skill = (lesson.skill_focus || 'reading') as string;
              const skillColor = SKILL_COLORS[skill] ?? SKILL_COLORS.reading;
              const href = hasVideo ? `/listening/${lesson.id}` : '#';

              // Parse skill tags from title
              const skillLabels: string[] = [];
              if (/listening|nghe/i.test(lesson.title)) skillLabels.push('Listening');
              if (/speaking|nói/i.test(lesson.title)) skillLabels.push('Speaking');
              if (/reading|đọc/i.test(lesson.title)) skillLabels.push('Reading');
              if (/writing|viết/i.test(lesson.title)) skillLabels.push('Writing');
              if (/grammar|ngữ pháp|vocabulary/i.test(lesson.title)) skillLabels.push('Grammar');

              const card = (
                <div className={`group flex flex-col gap-3 rounded-2xl border bg-slate-900/30 p-4 backdrop-blur-md transition-all duration-200 ${
                  hasVideo
                    ? 'border-slate-800 hover:border-sky-500/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-sky-950/20 cursor-pointer'
                    : 'border-slate-800/50 opacity-70 cursor-not-allowed'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-500">Buổi {lesson.lesson_index}</span>
                    {hasVideo ? (
                      <span className="flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-400 border border-sky-500/20">
                        🎧 Có bài nghe
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500 border border-slate-700">
                        Tự học
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-semibold leading-snug transition-colors ${hasVideo ? 'text-white group-hover:text-sky-400' : 'text-slate-400'}`}>
                    {lesson.title.replace(/^Buổi \d+:\s*/, '')}
                  </h3>

                  {lesson.page_hint && (
                    <p className="text-[11px] text-slate-500">📖 {lesson.page_hint}</p>
                  )}

                  {/* Skill tags parsed from title */}
                  {skillLabels.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {skillLabels.map(s => (
                        <span key={s} className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${SKILL_COLORS[s.toLowerCase()] ?? SKILL_COLORS.reading}`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {hasVideo && (
                    <div className="mt-auto pt-1">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                        Vào phòng luyện nghe →
                      </span>
                    </div>
                  )}
                </div>
              );

              return hasVideo ? (
                <Link key={lesson.id} href={href}>{card}</Link>
              ) : (
                <div key={lesson.id}>{card}</div>
              );
            })}
          </div>
        </section>
      ))}

      {lessons.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-10 text-center">
          <p className="text-slate-400">Chưa có dữ liệu buổi học.</p>
          <p className="mt-2 text-xs text-slate-600">
            Vui lòng chạy migration SQL trong Supabase Dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
