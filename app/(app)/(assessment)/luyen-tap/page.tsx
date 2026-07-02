import { createClient } from "@/lib/supabase/server";
import { BookOpen, Globe2, Calculator, FlaskConical, GraduationCap, ArrowRight, Zap, Star, Compass } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LuyenTapPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase.from('profiles').select('grade, grades, role').eq('id', user.id).single();
    const userGrades = profile?.role === 'admin' ? [3, 7] : (profile?.grades || (profile?.grade ? [profile.grade] : [3]));
    const gradesToFetch = [...new Set([...userGrades, 0])].sort((a, b) => a - b);

    const subjectMap: Record<string, string> = {
        'english': 'tieng_anh',
        'math': 'toan',
        'tienganh': 'tieng_anh',
        'tieng_anh': 'tieng_anh',
        'toan': 'toan',
        'mindset-ielts': 'tieng_anh'
    };

    const subjectsByGrade = await Promise.all(
        gradesToFetch.map(async (g: number) => {
            const { data: units } = await supabase
                .from('curriculum_units')
                .select('subject')
                .eq('grade', g);

            const { data: collections } = await supabase
                .from('assessment_collections')
                .select('subject_slug')
                .eq('grade', g)
                .eq('status', 'published');

            let availableSubjectSlugs = Array.from(new Set([
                ...(units?.map((u: any) => subjectMap[u.subject] || u.subject) || []),
                ...(collections?.map((c: any) => subjectMap[c.subject_slug] || c.subject_slug) || [])
            ]));

            if (g === 0) {
                // Ensure universal subjects are fetched
                availableSubjectSlugs = Array.from(new Set([...availableSubjectSlugs, 'pre-a1-starter', 'mindset-ielts']));
            }

            if (availableSubjectSlugs.length === 0) {
                return { grade: g, subjects: [] };
            }

            const { data: subjects } = await supabase
                .from('universal_subjects')
                .select('*')
                .in('slug', availableSubjectSlugs);

            let gradeSubjects = subjects || [];
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

    const hasAnySubjects = subjectsByGrade.some(({ subjects }) => subjects.length > 0);

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
            case 'pre-a1-starter': return <Star className={className} />;
            default: return <BookOpen className={className} />;
        }
    };

    return (
        <div className="flex min-h-dvh w-full flex-col pb-20 relative text-white bg-[#0f172a]">
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

                <header className="rounded-[2.5rem] border border-slate-800 bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-slate-950 p-8 md:p-10 shadow-2xl backdrop-blur-md mb-16 relative overflow-hidden text-center">
                    <div className="absolute right-0 top-0 -mt-10 -mr-10 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                    <div className="relative">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 uppercase tracking-widest mb-4">
                            🚀 Cosmic Practice Station
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight uppercase">
                            Trung Tâm Luyện Tập
                        </h1>
                        <p className="mt-4 text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
                            Chọn một môn học dưới đây để bắt đầu thử thách kiến thức và rèn luyện phản xạ học tập.
                        </p>
                    </div>
                </header>

                <div className="space-y-16">
                    {hasAnySubjects ? (
                        subjectsByGrade.map(({ grade, subjects }, groupIndex) => {
                            if (subjects.length === 0) return null;
                            
                            const isUniversal = grade === 0;
                            const sectionTitle = isUniversal ? "CamBridge English" : `Khu Vực Lớp ${grade}`;
                            const sectionIcon = isUniversal ? <Globe2 size={20} className="text-fuchsia-400" /> : <GraduationCap size={20} className="text-sky-400" />;

                            return (
                                <section key={grade} className="space-y-6">
                                    <div className="flex items-center gap-4 border-b border-slate-800/80 pb-3">
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
                                                        href={`/luyen-tap/${subject.slug}?grade=${grade}`}
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
                                                                Vào luyện tập
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
                        })
                    ) : (
                        <div className="p-16 text-center border border-dashed border-slate-800 bg-slate-950/40 backdrop-blur-md rounded-3xl">
                            <BookOpen className="mx-auto h-12 w-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-300">Chưa có môn học</h3>
                            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">Hiện tại chưa có môn luyện tập nào được chỉ định cho tài khoản của bạn. Vui lòng liên hệ quản trị viên.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
