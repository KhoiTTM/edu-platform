import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import IELTSSkillsNav from '@/components/learning/IELTSSkillsNav';
import type { Lesson } from '@/types/database';

export default async function ListeningPage() {
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
          .filter(n => n.type === 'unit' || n.type === 'lesson')
          .map(n => ({
            id: n.id,
            title: n.title,
            slug: n.slug,
            lesson_index: n.sort_key,
            youtube_video_id: n.metadata?.youtube_id,
            page_hint: n.metadata?.page_hint || `Unit ${n.slug.split('-')[1] || ''}`,
            skill_focus: n.metadata?.skill_focus,
          }))
          .filter(l => 
            l.skill_focus === 'listening' || 
            /listening|nghe/i.test(l.title) || 
            !!l.youtube_video_id
          );
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <IELTSSkillsNav />

      <header className="rounded-2xl border border-sky-900/40 bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-slate-950 p-6 shadow-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
          🎧 IELTS LISTENING
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-white">Luyện Kỹ Năng Nghe</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          {lessons.length} buổi có nội dung nghe — bám sát giáo trình Mindset for IELTS Foundation.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const hasVideo = !!lesson.youtube_video_id;
          const unitMatch = lesson.title.match(/U(\d+)/i);
          const unit = unitMatch?.[1] ?? '?';

          const card = (
            <div className={`group flex flex-col gap-3 rounded-2xl border p-5 backdrop-blur-md transition-all duration-200 ${
              hasVideo
                ? 'border-line bg-surface/30 hover:border-sky-500/40 hover:bg-surface/60 hover:shadow-lg cursor-pointer'
                : 'border-line/40 bg-surface/10 opacity-60 cursor-not-allowed'
            }`}>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-sky-950/60 px-2 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-900/40 uppercase">
                  Unit {unit}
                </span>
                <span className="text-[10px] text-slate-500">Buổi {lesson.lesson_index}</span>
              </div>

              <h3 className={`text-sm font-semibold leading-snug transition-colors ${hasVideo ? 'text-white group-hover:text-sky-400' : 'text-slate-500'}`}>
                {lesson.title.replace(/^Buổi \d+:\s*/, '')}
              </h3>

              {lesson.page_hint && (
                <p className="text-[11px] text-slate-500">📖 {lesson.page_hint}</p>
              )}

              {hasVideo ? (
                <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                  🎧 Luyện nghe ngay →
                </div>
              ) : (
                <p className="mt-auto text-[11px] text-slate-600 italic">Buổi lý thuyết — không có track nghe</p>
              )}
            </div>
          );

          return hasVideo ? (
            <Link key={lesson.id} href={`/listening/${lesson.id}`}>{card}</Link>
          ) : (
            <div key={lesson.id}>{card}</div>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <div className="rounded-2xl border border-line bg-surface/30 p-10 text-center">
          <p className="text-slate-400">Không tìm thấy buổi nghe nào.</p>
          <p className="mt-2 text-xs text-slate-600">Kiểm tra Supabase đã có dữ liệu chưa.</p>
        </div>
      )}
    </div>
  );
}
