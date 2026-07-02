import { createClient } from "@/lib/supabase/server";
import { Sparkles, Trophy, Star, BookOpen, Compass } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Re-usable Space Subject Card
const SubjectCard = ({ subject, grade }: { subject: any, grade: number }) => {
    const cardThemes: Record<string, { bg: string; border: string; glow: string; text: string; icon: string }> = {
        'tieng_anh': { 
            bg: 'from-emerald-950/40 via-slate-900/60 to-slate-950', 
            border: 'border-emerald-500/20 hover:border-emerald-400/50', 
            glow: 'rgba(16,185,129,0.15)',
            text: 'text-emerald-400',
            icon: '📚' 
        },
        'toan': { 
            bg: 'from-sky-950/40 via-slate-900/60 to-slate-950', 
            border: 'border-sky-500/20 hover:border-sky-400/50', 
            glow: 'rgba(14,165,233,0.15)',
            text: 'text-sky-400',
            icon: '🧮' 
        },
        'mindset-ielts': { 
            bg: 'from-indigo-950/40 via-slate-900/60 to-slate-950', 
            border: 'border-indigo-500/20 hover:border-indigo-400/50', 
            glow: 'rgba(99,102,241,0.15)',
            text: 'text-indigo-400',
            icon: '🎓' 
        },
        'pre-a1-starter': { 
            bg: 'from-amber-950/40 via-slate-900/60 to-slate-950', 
            border: 'border-amber-500/20 hover:border-amber-400/50', 
            glow: 'rgba(245,158,11,0.15)',
            text: 'text-amber-400',
            icon: '⭐' 
        },
        'khtn': { 
            bg: 'from-fuchsia-950/40 via-slate-900/60 to-slate-950', 
            border: 'border-fuchsia-500/20 hover:border-fuchsia-400/50', 
            glow: 'rgba(217,70,239,0.15)',
            text: 'text-fuchsia-400',
            icon: '🧬' 
        },
        'default': { 
            bg: 'from-slate-900/40 via-slate-900/60 to-slate-950', 
            border: 'border-slate-700/30 hover:border-slate-500/50', 
            glow: 'rgba(148,163,184,0.1)',
            text: 'text-slate-400',
            icon: '📖' 
        },
    };
    
    const theme = cardThemes[subject.slug] || cardThemes.default;

    return (
        <Link 
            href={`/luyen-tap/${subject.slug}?grade=${grade}`} 
            className={`group relative flex flex-col justify-between min-h-[220px] rounded-[2rem] border-2 ${theme.border} bg-gradient-to-br ${theme.bg} p-8 backdrop-blur-md hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
            style={{ boxShadow: `0 8px 30px ${theme.glow}` }}
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-white/10 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4">
                <span className="rounded-full bg-slate-900/80 px-3.5 py-1.5 text-[10px] font-black text-slate-400 border border-slate-800/80 uppercase tracking-widest">
                    Khối Lớp {grade}
                </span>
                <div className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300">
                    {subject.icon || theme.icon}
                </div>
            </div>

            <div>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.text}`}>Môn Học</p>
                <h3 className="text-2xl font-black text-white mt-1 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors">
                    {subject.name_vi}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {subject.description || `Luyện tập kỹ năng và củng cố kiến thức môn ${subject.name_vi} lớp ${grade}.`}
                </p>
            </div>
            
            <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-slate-800/50">
                <span className={`text-[9px] font-black uppercase tracking-widest ${theme.text} group-hover:opacity-80`}>
                    Vào luyện tập
                </span>
                <span className={`text-xs transition-transform duration-200 group-hover:translate-x-1 ${theme.text}`}>➔</span>
            </div>
        </Link>
    )
}


export default async function LuyenTapPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase.from('profiles').select('grade, grades').eq('id', user.id).single();
    const userGrades = profile?.grades || (profile?.grade ? [profile.grade] : [3]);

    const subjectMap: Record<string, string> = {
        'english': 'tieng_anh',
        'math': 'toan',
        'tienganh': 'tieng_anh',
        'tieng_anh': 'tieng_anh',
        'toan': 'toan',
        'mindset-ielts': 'tieng_anh'
    };

    const subjectsByGrade = await Promise.all(
        userGrades.map(async (g: number) => {
            const { data: units } = await supabase
                .from('curriculum_units')
                .select('subject')
                .eq('grade', g);

            const { data: collections } = await supabase
                .from('assessment_collections')
                .select('subject_slug')
                .eq('grade', g)
                .eq('status', 'published');

            const availableSubjectSlugs = Array.from(new Set([
                ...(units?.map((u: any) => subjectMap[u.subject] || u.subject) || []),
                ...(collections?.map((c: any) => subjectMap[c.subject_slug] || c.subject_slug) || [])
            ]));

            if (availableSubjectSlugs.length === 0) {
                return { grade: g, subjects: [] };
            }

            const { data: subjects } = await supabase
                .from('universal_subjects')
                .select('*')
                .in('slug', availableSubjectSlugs);

            return { grade: g, subjects: subjects || [] };
        })
    );

    const hasAnySubjects = subjectsByGrade.some(({ subjects }) => subjects.length > 0);

    return (
        <div className="flex min-h-dvh w-full flex-col pb-20 relative text-white bg-[#0f172a]">
            {/* Cosmic Blurry Nebulas */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="mx-auto max-w-5xl w-full px-6 py-12 relative z-10">
                {/* Header Section */}
                <header className="rounded-[2.5rem] border border-slate-800 bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-slate-950 p-8 md:p-10 shadow-2xl backdrop-blur-md mb-16 relative overflow-hidden text-center">
                    <div className="absolute right-0 top-0 -mt-10 -mr-10 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                    <div className="relative">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 uppercase tracking-widest mb-4">
                            🚀 Assessment Space
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                            Trung Tâm Luyện Tập
                        </h1>
                        <p className="mt-4 text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
                            Chọn một môn học dưới đây để bắt đầu thử thách kiến thức và rèn luyện phản xạ học tập.
                        </p>
                    </div>
                </header>

                {/* Subjects Grid by Grades */}
                <div className="space-y-16">
                    {hasAnySubjects ? (
                        subjectsByGrade.map(({ grade, subjects }) => {
                            if (subjects.length === 0) return null;
                            return (
                                <section key={grade} className="space-y-8">
                                    <div className="flex items-center gap-4 border-b border-slate-800/80 pb-3">
                                        <Compass className="text-cyan-400 h-5 w-5 animate-spin-slow" />
                                        <h2 className="text-lg font-black text-white uppercase tracking-widest">
                                            Khu Vực Luyện Tập Lớp {grade}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {subjects.map((subject: any) => (
                                            <SubjectCard key={subject.id} subject={subject} grade={grade} />
                                        ))}
                                    </div>
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
