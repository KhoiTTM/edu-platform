import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import IELTSSkillsNav from '@/components/learning/IELTSSkillsNav';

export default async function FlowBookPage() {
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
            page_hint: n.metadata?.page_hint || `Unit ${n.slug.split('-')[1] || ''}`,
          }))
          // Currently, Unit 3 through Unit 10 are supported for Flow Book (unit-36 is Review & Final Assessment, not textbook-aligned content)
          .filter(l => ['unit-8', 'unit-9', 'unit-10', 'unit-11', 'unit-12', 'unit-13', 'unit-14', 'unit-15', 'unit-16', 'unit-17', 'unit-18', 'unit-19', 'unit-20', 'unit-21', 'unit-22', 'unit-23', 'unit-24', 'unit-25', 'unit-26', 'unit-27', 'unit-28', 'unit-29', 'unit-30', 'unit-31', 'unit-32', 'unit-33', 'unit-34', 'unit-35'].includes(l.slug));
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <IELTSSkillsNav />

      <header className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-slate-950 p-6 shadow-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
          📖 IELTS FLOW BOOK
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-white">Học Theo Sách Giáo Trình</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          {lessons.length} buổi học tích hợp bản quét sách và không gian tương tác bài tập đầy đủ.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const unitMatch = lesson.title.match(/U(\d+)/i);
          const unit = unitMatch?.[1] ?? '3';

          const card = (
            <div className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface/30 hover:border-blue-500/40 hover:bg-surface/60 hover:shadow-lg transition-all duration-200 p-5 cursor-pointer h-full">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-900/40 uppercase">
                  Unit {unit}
                </span>
                <span className="text-[10px] text-slate-500">Buổi {lesson.lesson_index}</span>
              </div>

              <h3 className="text-sm font-semibold leading-snug text-white group-hover:text-blue-400 transition-colors">
                {lesson.title.replace(/^Buổi \d+:\s*/, '')}
              </h3>

              {lesson.page_hint && (
                <p className="text-[11px] text-slate-500">📖 {lesson.page_hint}</p>
              )}

              <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                📖 Học theo sách ngay →
              </div>
            </div>
          );

          return (
            <Link key={lesson.id} href={`/learn/mindset-ielts/${lesson.slug}`}>
              {card}
            </Link>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <div className="rounded-2xl border border-line bg-surface/30 p-10 text-center">
          <p className="text-slate-400">Chưa có buổi học giáo trình nào được hỗ trợ.</p>
        </div>
      )}
    </div>
  );
}
