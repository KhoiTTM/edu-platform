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
  
  // Also include Grade 0 for universal subjects like IELTS if not already there
  // but we'll handle it separately or merge it. 
  // For now, let's fetch subjects for each selected grade + grade 0.
  const gradesToFetch = [...new Set([...userGrades, 0])].sort((a, b) => a - b);

  // 2. Fetch subjects for each grade
  const subjectsByGrade = await Promise.all(
    gradesToFetch.map(async (g) => {
      const { data, error } = await supabase.rpc("get_subjects_by_grade", { p_grade: g });
      
      if (error) {
        console.error(`Error fetching subjects for grade ${g}:`, error);
        
        // Fallback: If RPC fails, try to fetch all subjects and filter them manually
        // This is a safety measure to ensure the dashboard doesn't stay empty.
        const { data: allSubjects } = await supabase
          .from("universal_subjects")
          .select("id, slug, name_vi, name_en, description, icon");
        
        if (allSubjects) {
          // Heuristic: If it's a known grade, show Math and English by default
          // unless the RPC failure was due to some other critical issue.
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
      }
      return { grade: g, subjects: gradeSubjects };
    })
  );

  const neonColors = [
    { border: "border-cyan-500/50", text: "text-cyan-400", glow: "0 0 30px rgba(6,182,212,0.3)" },
    { border: "border-fuchsia-500/50", text: "text-fuchsia-400", glow: "0 0 30px rgba(217,70,239,0.3)" },
    { border: "border-emerald-500/50", text: "text-emerald-400", glow: "0 0 30px rgba(16,185,129,0.3)" },
    { border: "border-amber-500/50", text: "text-amber-400", glow: "0 0 30px rgba(245,158,11,0.3)" },
    { border: "border-indigo-500/50", text: "text-indigo-400", glow: "0 0 30px rgba(99,102,241,0.3)" },
  ];

  const getSubjectIcon = (slug: string, className: string) => {
    switch(slug) {
        case 'toan': return <Calculator className={className} />;
        case 'tieng_anh': return <Globe2 className={className} />;
        case 'khoa_hoc': return <FlaskConical className={className} />;
        case 'tieng_viet': return <BookOpen className={className} />;
        case 'mindset-ielts': return <GraduationCap className={className} />;
        case 'pre-a1-starter': return <Star className={className} />;
        default: return <BookOpen className={className} />;
    }
  };

  const getSubjectLink = (slug: string, grade: number) => {
    if (slug === 'mindset-ielts') return `/hoc-tap/mindset-ielts`;
    if (slug === 'pre-a1-starter') return `/hoc-tap/pre-a1-starter`;
    // Convention: root node slug is lop-3, lop-7, or subject-specific
    const nodeSlug = grade === 0 ? (slug === 'mindset-ielts' ? 'ielts-foundation' : 'global') : `lop-${grade}`;
    return `/learn/${slug}/${nodeSlug}`;
  };

  return (
    <div className="flex min-h-dvh w-full flex-col pb-20 relative">
      <div className="mx-auto max-w-5xl w-full px-6 py-12 relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors bg-sky-900/30 px-4 py-2 rounded-full border border-sky-500/30 backdrop-blur-md mb-8"
          >
            ← Bảng điều khiển
          </Link>

          <header className="mb-16 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-sm tracking-wide uppercase">
              Hệ thống Trạm Tri thức
            </h1>
            <p className="mt-4 text-slate-300 font-bold text-sm tracking-widest uppercase opacity-70">
              Chọn lộ trình học tập của bạn
            </p>
          </header>

          <div className="space-y-20">
            {subjectsByGrade.map(({ grade, subjects }, groupIndex) => {
              if (subjects.length === 0) return null;
              
              const isUniversal = grade === 0;
              const sectionTitle = isUniversal ? "CamBridge English" : `Khu Vực Lớp ${grade}`;
              const sectionIcon = isUniversal ? <Globe2 size={24} className="text-fuchsia-400" /> : <GraduationCap size={24} className="text-sky-400" />;

              return (
                <section key={grade} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${groupIndex * 150}ms` }}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-2xl bg-white/5 border-2 ${isUniversal ? 'border-fuchsia-500/30' : 'border-sky-500/30'} backdrop-blur-md`}>
                      {sectionIcon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight uppercase">
                        {sectionTitle}
                      </h2>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">
                        {isUniversal ? "Tài nguyên học tập cho mọi lứa tuổi" : `Giáo trình chuẩn cho học sinh khối ${grade}`}
                      </p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent ml-4"></div>
                  </div>

                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject: any, index: number) => {
                      const color = neonColors[(index + groupIndex) % neonColors.length];
                      return (
                        <li key={subject.slug}>
                          <Link
                            href={getSubjectLink(subject.slug, grade)}
                            className={`group flex min-h-[200px] flex-col rounded-[2.5rem] border-2 bg-slate-900/50 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/80 ${color.border} relative overflow-hidden`}
                            style={{ boxShadow: color.glow }}
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-white/10 transition-colors"></div>
                            
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className={`p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner ${color.text}`}>
                                    {getSubjectIcon(subject.slug, "w-8 h-8")}
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                                    <ArrowRight className={`w-6 h-6 text-white/50 group-hover:text-white transition-all group-hover:translate-x-0.5`} />
                                </div>
                            </div>
                            
                            <div className="mt-auto relative z-10">
                                <span className="font-black text-2xl tracking-tight text-white drop-shadow-md">
                                    {subject.name_vi}
                                </span>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${color.text}`}>
                                    Vào trạm học
                                  </span>
                                  <Zap size={10} className={`${color.text} animate-pulse`} />
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
             <div className="mt-20 rounded-[3rem] border-2 border-dashed border-slate-700 bg-slate-900/40 p-16 text-center text-slate-400 backdrop-blur-md shadow-2xl animate-in fade-in duration-1000">
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
