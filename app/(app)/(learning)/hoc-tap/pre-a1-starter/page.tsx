import Link from 'next/link';
import { BookOpen, Star, ChevronLeft, Sparkles, ArrowRight } from "lucide-react";

export default function PreA1StarterPage() {
  const books = [
    {
      id: 'starters-wordlist',
      title: 'Starters Wordlist',
      description: 'Quyển sách từ vựng kèm hình ảnh minh họa sinh động chuẩn Cambridge Pre A1 Starters.',
      coverColor: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      glowColor: 'rgba(245,158,11,0.3)',
      totalPages: 19,
      icon: '⭐',
      path: '/hoc-tap/pre-a1-starter/starters-wordlist',
      isExternal: false
    },
    {
      id: 'get-ready-starters',
      title: 'Get Ready For Starters - OXFORD',
      description: 'Giáo trình chuẩn bị cho kỳ thi Cambridge English Starters từ nhà xuất bản Oxford.',
      coverColor: 'from-violet-500 to-purple-600',
      textColor: 'text-purple-400',
      glowColor: 'rgba(139,92,246,0.3)',
      totalPages: 120,
      icon: '📖',
      path: 'https://online.flipbuilder.com/sdtta/dime/',
      isExternal: true
    },
    {
      id: 'fun-for-starters',
      title: 'Fun For Starters - 4th Edition',
      description: 'Giáo trình ôn luyện kỹ năng thi Cambridge English Starters phiên bản thứ 4 sinh động và thú vị.',
      coverColor: 'from-sky-500 to-blue-600',
      textColor: 'text-sky-400',
      glowColor: 'rgba(14,165,233,0.3)',
      totalPages: 112,
      icon: '🎉',
      path: 'https://online.flipbuilder.com/sdtta/ptjs/',
      isExternal: true
    }
  ];

  return (
    <div className="flex min-h-dvh w-full flex-col pb-20 relative text-white bg-surface">
      <div className="mx-auto max-w-5xl w-full px-6 py-12 relative z-10">
        <Link
          href="/hoc-tap"
          className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors bg-sky-900/30 px-4 py-2 rounded-full border border-sky-500/30 backdrop-blur-md mb-8"
        >
          ← Chọn môn học
        </Link>

        {/* Header */}
        <header className="rounded-2xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950 p-6 md:p-8 shadow-xl backdrop-blur-md mb-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              🇬🇧 CAMBRIDGE ENGLISH
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-white tracking-tight">
              Pre A1 Starter
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Chương trình tiếng Anh khởi đầu cho học sinh tiểu học, giúp xây dựng nền tảng từ vựng và tự tin giao tiếp.
            </p>
          </div>
        </header>

        {/* Books List Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-line pb-3">
            <BookOpen className="text-sky-400 h-5 w-5" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Danh Sách Giáo Trình</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Link 
                key={book.id} 
                href={book.path}
                target={book.isExternal ? "_blank" : undefined}
                rel={book.isExternal ? "noopener noreferrer" : undefined}
                className="group flex flex-col justify-between min-h-[260px] rounded-[2.5rem] border-2 border-line bg-surface/40 p-7 backdrop-blur-md hover:border-amber-500/50 hover:-translate-y-1.5 hover:bg-surface-raised/60 transition-all duration-300 relative overflow-hidden"
                style={{ boxShadow: `0 8px 30px ${book.glowColor}` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-white/10 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${book.coverColor} flex items-center justify-center text-3xl shadow-lg`}>
                    {book.icon}
                  </div>
                  <span className="rounded-full bg-surface-raised/80 px-3 py-1 text-[10px] font-black text-slate-400 border border-line uppercase whitespace-nowrap">
                    {book.totalPages} Trang
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xl font-black text-white leading-tight group-hover:text-amber-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-line/60">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 group-hover:text-sky-300">
                      Mở sách học ngay
                    </span>
                    <ArrowRight size={12} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
