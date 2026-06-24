import { createClient } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Re-usable Subject Card
const SubjectCard = ({ subject, grade }: { subject: any, grade: number }) => {
    const colors: Record<string, any> = {
        'tieng_anh': { bg: 'bg-emerald-500', shadow: 'shadow-[0_8px_0_#059669]', icon: '📚' },
        'toan': { bg: 'bg-sky-500', shadow: 'shadow-[0_8px_0_#0284c7]', icon: '🧮' },
        'mindset-ielts': { bg: 'bg-indigo-500', shadow: 'shadow-[0_8px_0_#4f46e5]', icon: '🎓' },
        'default': { bg: 'bg-slate-500', shadow: 'shadow-[0_8px_0_#475569]', icon: '📖' },
    };
    const color = colors[subject.slug] || colors.default;

    return (
        <Link href={`/luyen-tap/${subject.slug}?grade=${grade}`} className={`group relative block p-8 rounded-3xl border-4 border-slate-900/50 text-white transition-all duration-300 hover:-translate-y-2 ${color.bg} ${color.shadow}`}>
            <div className={`absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300`}>
                {color.icon}
            </div>
            <p className="text-sm font-black uppercase tracking-widest opacity-80">Môn học</p>
            <h2 className="text-4xl font-black mt-2">{subject.name_vi} <span className="text-2xl opacity-75">- Lớp {grade}</span></h2>
            <p className="mt-4 font-semibold opacity-90">{subject.description || `Luyện tập kỹ năng cho môn ${subject.name_vi} lớp ${grade}`}</p>
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
        <div className="max-w-4xl mx-auto">
            <header className="mb-12 text-center">
                <h1 className="text-6xl font-black tracking-tighter text-slate-800 dark:text-white mb-4">
                    Trung Tâm Luyện Tập
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto">
                    Chọn một môn học để bắt đầu hành trình chinh phục kiến thức của bạn.
                </p>
            </header>

            <div className="space-y-12">
                {hasAnySubjects ? (
                    subjectsByGrade.map(({ grade, subjects }) => {
                        if (subjects.length === 0) return null;
                        return (
                            <section key={grade} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
                                        Khu vực Lớp {grade}
                                    </h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {subjects.map((subject: any) => (
                                        <SubjectCard key={subject.id} subject={subject} grade={grade} />
                                    ))}
                                </div>
                            </section>
                        );
                    })
                ) : (
                    <div className="p-12 text-center bg-slate-100 dark:bg-slate-800/50 rounded-3xl">
                        <h3 className="text-2xl font-bold">Chưa có môn học</h3>
                        <p className="text-slate-500 mt-2">Hiện tại chưa có môn học nào được chỉ định cho khối lớp của bạn. Vui lòng quay lại sau.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
