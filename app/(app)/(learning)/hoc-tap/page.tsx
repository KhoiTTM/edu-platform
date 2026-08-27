import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, Globe2, Calculator, FlaskConical, GraduationCap, ArrowRight, Zap, Star } from "lucide-react";

export default async function HocTapPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // 1. Fetch user's selected grades
  const { data: profile } = await supabase
    .from("profiles")
    .select("grades, display_name, role")
    .eq("id", user.id)
    .single();

  const userGrades = profile?.role === "admin" ? [3, 7] : (profile?.grades || [3]);
  const gradesToFetch = [...new Set([...userGrades, 0])].sort((a, b) => a - b);

  // 2. Fetch subjects for each grade
  const subjectsByGrade = await Promise.all(
    gradesToFetch.map(async (g) => {
      const { data, error } = await supabase.rpc("get_subjects_by_grade", { p_grade: g });
      
      if (error) {
        console.error(`Error fetching subjects for grade ${g}:`, error);
        const { data: allSubjects } = await supabase
          .from("universal_subjects")
          .select("id, slug, name_vi, name_en, description, icon");
        
        if (allSubjects) {
          if (g === 3 || g === 7) {
             return { grade: g, subjects: allSubjects.filter(s => ['toan', 'tieng_anh'].includes(s.slug)) };
          }
          if (g === 0) {
             return { grade: g, subjects: allSubjects.filter(s => ['mindset-ielts', 'pre-a1-starter'].includes(s.slug)) };
          }
        }
        return { grade: g, subjects: [] };
      }
      let gradeSubjects = data || [];
      if (g === 0) {
        const hasStarter = gradeSubjects.some((s: any) => s.slug === 'pre-a1-starter');
        if (!hasStarter) {
          gradeSubjects = [
            ...gradeSubjects,
            {
              id: 'a4fe2b0c-3dac-4aa8-a78e-e1bdecba0e68',
              slug: 'pre-a1-starter',
              name_vi: 'Pre A1 Starter',
              name_en: 'Pre A1 Starter',
              description: 'Giáo trình và từ vựng chuẩn Cambridge Pre A1 Starters cho trẻ em',
              icon: '⭐'
            }
          ];
        }
        const hasPE = gradeSubjects.some((s: any) => s.slug === 'practical-english');
        if (!hasPE) {
          gradeSubjects = [
            ...gradeSubjects,
            {
              id: 'c8a2b3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e',
              slug: 'practical-english',
              name_vi: 'Practical English',
              name_en: 'Practical English',
              description: 'Tiếng Anh thực tế qua video',
              icon: '🎬'
            }
          ];
        }
      } else {
        // Prevent Cambridge subjects leaking into grade categories
        gradeSubjects = gradeSubjects.filter((s: any) => !['pre-a1-starter', 'mindset-ielts'].includes(s.slug));
      }
      return { grade: g, subjects: gradeSubjects };
    })
  );

  const neonColors = [
    { border: "border-cyan-500/20 hover:border-cyan-400/50", text: "text-cyan-400", glow: "rgba(6,182,212,0.15)" },
    { border: "border-fuchsia-500/20 hover:border-fuchsia-400/50", text: "text-fuchsia-400", glow: "rgba(217,70,239,0.15)" },
    { border: "border-emerald-500/20 hover:border-emerald-400/50", text: "text-emerald-400", glow: "rgba(16,185,129,0.15)" },
    { border: "border-amber-500/20 hover:border-amber-400/50", text: "text-amber-400", glow: "rgba(245,158,11,0.15)" },
    { border: "border-indigo-500/20 hover:border-indigo-400/50", text: "text-indigo-400", glow: "rgba(99,102,241,0.15)" },
  ];

  const getSubjectIcon = (slug: string, className: string) => {
    switch(slug) {
        case 'toan': return <Calculator className={className} />;
        case 'tieng_anh': return <Globe2 className={className} />;
        case 'khoa_hoc': return <FlaskConical className={className} />;
        case 'tieng_viet': return <BookOpen className={className} />;
        case 'mindset-ielts': return <GraduationCap className={className} />;
        case 'pre-a1-starter': return <Star className={className} />;
        case 'practical-english': return <Globe2 className={className} />;
        default: return <BookOpen className={className} />;
    }
  };

  const getSubjectLink = (slug: string, grade: number) => {
    if (slug === 'mindset-ielts') return `/hoc-tap/mindset-ielts`;
    if (slug === 'pre-a1-starter') return `/hoc-tap/pre-a1-starter`;
    if (slug === 'practical-english') return `/hoc-tap/practical-english`;
    if (slug === 'tieng_viet') return `/hoc-tap/tieng_viet`;
    const nodeSlug = grade === 0 ? (slug === 'mindset-ielts' ? 'ielts-foundation' : 'global') : `lop-${grade}`;
    return `/learn/${slug}/${nodeSlug}`;
  };

  return (
    <div className="flex min-h-dvh w-full flex-col pb-20 relative text-white bg-surface">
      {/* Cosmic Blurry Nebulas */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl w-full px-6 py-12 relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors bg-sky-900/30 px-4 py-2 rounded-full border border-sky-500/30 backdrop-blur-md mb-8"
          >
            ← Bảng điều khiển
          </Link>

          <header className="rounded-3xl border border-line/80 bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-slate-950 py-4 px-6 shadow-xl backdrop-blur-md mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="absolute right-0 top-0 -mt-6 -mr-6 h-24 w-24 bg-cyan-500/5 blur-2xl pointer-events-none" />
            <div className="relative text-left">
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[9px] font-semibold text-cyan-400 border border-cyan-500/20 uppercase tracking-widest">
                    🚀 Cosmic Knowledge Portal
                </span>
                <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight uppercase mt-1">
                  Hệ thống Trạm Tri thức
                </h1>
            </div>
            <p className="text-xs text-slate-400 max-w-sm md:text-right leading-relaxed font-semibold relative z-10">
              Chọn một trạm tri thức dưới đây để bắt đầu hành trình học tập của bạn.
            </p>
          </header>

          <div className="space-y-16">
            {subjectsByGrade.map(({ grade, subjects }, groupIndex) => {
              if (subjects.length === 0) return null;
              
              const isUniversal = grade === 0;
              const sectionTitle = isUniversal ? "CamBridge English" : `Khu Vực Lớp ${grade}`;
              const sectionIcon = isUniversal ? <Globe2 size={20} className="text-fuchsia-400" /> : <GraduationCap size={20} className="text-sky-400" />;

              return (
                <section key={grade} className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-line/80 pb-3">
                    <div className={`p-2 rounded-xl bg-white/5 border ${isUniversal ? 'border-fuchsia-500/30' : 'border-sky-500/30'} backdrop-blur-md`}>
                      {sectionIcon}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white uppercase tracking-widest">
                        {sectionTitle}
                      </h2>
                    </div>
                  </div>

                  <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {subjects.map((subject: any, index: number) => {
                      const color = neonColors[(index + groupIndex) % neonColors.length];
                      return (
                        <li key={subject.slug}>
                          <Link
                            href={getSubjectLink(subject.slug, grade)}
                            className={`group relative flex flex-col justify-between min-h-[150px] rounded-3xl border-2 bg-gradient-to-br from-slate-900/40 via-slate-900/60 to-slate-950 p-5 backdrop-blur-md hover:-translate-y-1.5 transition-all duration-300 overflow-hidden ${color.border}`}
                            style={{ boxShadow: `0 8px 30px ${color.glow}` }}
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-white/10 transition-colors"></div>
                            
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <div className={`p-2 rounded-xl bg-black/40 border border-white/10 ${color.text}`}>
                                    {getSubjectIcon(subject.slug, "w-6 h-6")}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-all group-hover:translate-x-0.5" />
                                </div>
                            </div>
                            
                            <div className="mt-auto relative z-10">
                                <h3 className="font-black text-lg tracking-tight text-white leading-tight">
                                    {subject.name_vi}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-2">
                                  <span className={`text-[8px] font-black uppercase tracking-widest ${color.text}`}>
                                    Vào trạm học
                                  </span>
                                  <Zap size={8} className={`${color.text} animate-pulse`} />
                                </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          {subjectsByGrade.every(g => g.subjects.length === 0) && (
             <div className="mt-20 rounded-[3rem] border-2 border-dashed border-line bg-surface/40 p-16 text-center text-slate-400 backdrop-blur-md shadow-2xl animate-in fade-in duration-1000">
             <Globe2 className="w-20 h-20 mx-auto mb-6 opacity-30 text-slate-500 animate-pulse" />
             <p className="text-2xl font-black text-white uppercase tracking-tight">Chưa có trạm không gian nào</p>
             <p className="mt-4 text-sm text-slate-500 font-bold max-w-xs mx-auto">
               Hãy kiểm tra lại cài đặt khối lớp của bạn hoặc liên hệ hỗ trợ.
             </p>
             <Link href="/settings" className="mt-8 inline-flex items-center gap-2 text-xs font-black text-sky-400 uppercase tracking-widest hover:text-sky-300">
               Đi tới Cài đặt ➔
             </Link>
           </div>
          )}
      </div>
    </div>
  );
}
