import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import IELTSSkillsNav from '@/components/learning/IELTSSkillsNav';
import { BookOpen, Sparkles, Award } from 'lucide-react';

export default async function GrammarPage() {
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
          .filter(n => n.type === 'unit')
          .map(n => ({
            id: n.id,
            title: n.title,
            slug: n.slug,
            lesson_index: n.sort_key,
            youtube_video_id: n.metadata?.youtube_id,
            page_hint: n.metadata?.page_hint || `Unit ${n.slug.split('-')[1]}`,
            summary: n.metadata?.summary,
            skill_focus: n.metadata?.skill_focus,
          }))
          .filter(l => 
            l.skill_focus === 'grammar' || 
            /grammar|ngữ pháp|vocabulary|từ vựng/i.test(l.title)
          );
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <IELTSSkillsNav />

      {/* HEADER CARD */}
      <header className="rounded-2xl border border-rose-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[80px] pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 border border-rose-500/20 uppercase tracking-wider">
            <Award size={12} /> GRAMMAR & VOCABULARY
          </span>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tight">
            Ngữ Pháp & Từ Vựng
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Học {lessons.length} buổi chuyên sâu về cấu trúc ngữ pháp học thuật, cụm từ vựng cốt lõi và bài luyện tập nâng cao bám sát giáo trình Mindset for IELTS Foundation.
          </p>
        </div>
      </header>

      {/* LESSONS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const unitMatch = lesson.title.match(/U(\d+)/i);
          const unit = unitMatch?.[1] ?? '?';

          return (
            <Link 
              key={lesson.id} 
              href={`/learn/mindset-ielts/${lesson.slug}?focus=grammar`}
              className="block group"
            >
              <div className="flex flex-col gap-4 rounded-2xl border border-line bg-gradient-to-b from-slate-900/40 to-slate-950/20 p-5 shadow-xl transition-all duration-300 hover:border-rose-500/40 hover:from-slate-900/60 hover:to-slate-950/40 hover:shadow-rose-950/10 cursor-pointer h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-rose-950/60 px-2 py-0.5 text-[9px] font-black text-rose-400 border border-rose-900/40 uppercase tracking-wider">
                    Unit {unit}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">Buổi {lesson.lesson_index}</span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white leading-snug group-hover:text-rose-400 transition-colors font-display">
                    {lesson.title.replace(/^Buổi \d+:\s*/, '')}
                  </h3>
                  {lesson.page_hint && (
                    <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <BookOpen size={10} /> {lesson.page_hint}
                    </p>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mt-1">
                  {lesson.summary?.replace(/\[.*?\]/g, '').trim() || 'Luyện chuyên đề ngữ pháp và từ vựng tích hợp.'}
                </p>

                <div className="mt-auto pt-2 border-t border-slate-900/40 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300 transition-colors">
                  <span>Học bài ngay ➔</span>
                  <Sparkles size={12} className="text-rose-400/60 group-hover:text-rose-400 animate-pulse" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <div className="rounded-2xl border border-line bg-surface/30 p-12 text-center flex flex-col items-center justify-center space-y-2">
          <BookOpen size={32} className="text-slate-600" />
          <p className="text-xs text-slate-500 font-semibold">Hiện chưa có buổi ôn luyện Ngữ pháp & Từ vựng nào được xuất bản.</p>
        </div>
      )}
    </div>
  );
}
