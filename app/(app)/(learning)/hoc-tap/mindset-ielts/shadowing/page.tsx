import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import IELTSSkillsNav from '@/components/learning/IELTSSkillsNav';
import { shadowingLessons } from '@/lib/shadowingData';

export default async function ShadowingPage() {
  const supabase = await createClient();

  // 1. Fetch IELTS Source
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'mindset-foundation')
    .maybeSingle();

  let lessons: any[] = [];
  
  if (source) {
    // 2. Fetch all nodes for this source
    const { data: nodes } = await supabase
      .from('curriculum_nodes')
      .select('id, title, slug, type, sort_key, metadata')
      .eq('source_id', source.id)
      .order('sort_key', { ascending: true });

    if (nodes) {
        lessons = nodes
          .filter(n => n.type === 'lesson' && n.metadata?.skill_focus === 'shadowing' && !!shadowingLessons[n.slug])
          .map(n => ({
            id: n.id,
            title: n.title,
            slug: n.slug,
            lesson_index: n.sort_key,
            youtube_video_id: n.metadata?.youtube_id,
            page_hint: n.metadata?.page_hint || `Unit ${n.slug.split('-')[1] || ''}`,
            skill_focus: n.metadata?.skill_focus,
          }));
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <IELTSSkillsNav />

      <header className="rounded-2xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950 p-6 shadow-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          🎙️ IELTS DICTATION & SHADOWING
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-white">Chép Chính Tả & Shadowing</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          {lessons.length} buổi luyện nghe chép chính tả và nói nhại giọng bản xứ — bám sát giáo trình Mindset for IELTS.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const unitMatch = lesson.title.match(/U(\d+)/i);
          const unit = unitMatch?.[1] ?? '?';

          const card = (
            <div className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface/30 p-5 backdrop-blur-md transition-all duration-200 hover:border-indigo-500/40 hover:bg-surface/60 hover:shadow-lg cursor-pointer h-full">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-950/60 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-900/40 uppercase">
                  Unit {unit}
                </span>
                <span className="text-[10px] text-slate-500">Buổi {lesson.lesson_index}</span>
              </div>

              <h3 className="text-sm font-semibold leading-snug transition-colors text-white group-hover:text-indigo-400">
                {lesson.title.replace(/^Buổi \d+:\s*/, '')}
              </h3>

              {lesson.page_hint && (
                <p className="text-[11px] text-slate-500">📖 {lesson.page_hint}</p>
              )}

              <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                🎙️ Vào phòng luyện ngay →
              </div>
            </div>
          );

          return (
            <Link key={lesson.id} href={`/listening/${lesson.id}`}>{card}</Link>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <div className="rounded-2xl border border-line bg-surface/30 p-10 text-center">
          <p className="text-slate-400">Không tìm thấy buổi shadowing nào.</p>
          <p className="mt-2 text-xs text-slate-600">Kiểm tra Supabase đã có dữ liệu chưa.</p>
        </div>
      )}
    </div>
  );
}
