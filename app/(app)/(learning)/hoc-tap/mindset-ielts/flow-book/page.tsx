import IELTSSkillsNav from '@/components/learning/IELTSSkillsNav';

const FLIPBOOK_URL = 'https://online.flipbuilder.com/sdtta/bsjh/mobile/index.html#p=1';

export default function FlowBookPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <IELTSSkillsNav />

      <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-slate-950 p-8 shadow-xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
          📖 IELTS FLOW BOOK
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-white">Học Theo Sách Giáo Trình</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
          Mở sách giáo trình dạng lật trang (flipbook) để học và ôn tập theo đúng nội dung sách.
        </p>

        <a
          href={FLIPBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition-all"
        >
          📖 Mở sách giáo trình →
        </a>

        <p className="mt-4 text-[11px] text-slate-500">Sách sẽ mở trong một tab mới.</p>
      </div>
    </div>
  );
}
