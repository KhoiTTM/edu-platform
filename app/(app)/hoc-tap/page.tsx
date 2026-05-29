import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, Globe2, Calculator, FlaskConical, GraduationCap, ArrowRight } from "lucide-react";

type Row = {
  subject_slug: string;
  subject_label_vi: string;
};

export default async function HocTapPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade, display_name")
    .eq("id", user!.id)
    .single();

  const grade = profile?.grade ?? 3;

  const { data: rows, error } = await supabase
    .from("lessons")
    .select("subject_slug, subject_label_vi, grade")
    .in("grade", [grade, 0]);

  if (error) {
    console.error("Error fetching lessons:", error);
  }

  const map = new Map<string, string>();
  for (const r of (rows ?? []) as Row[]) {
    if (r.subject_slug && r.subject_label_vi) {
      map.set(r.subject_slug, r.subject_label_vi);
    }
  }

  const subjects = [...map.entries()].sort((a, b) =>
    a[1].localeCompare(b[1], "vi")
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
        default: return <BookOpen className={className} />;
    }
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

          <header className="mb-12 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-sm tracking-wide uppercase">
              KHÁM PHÁ TRI THỨC
            </h1>
            <p className="mt-4 text-slate-300 font-medium text-lg bg-black/20 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm inline-flex items-center gap-2 shadow-lg">
              Lớp {grade} <span className="text-sky-400">•</span> Chọn trạm không gian
            </p>
          </header>

          {subjects.length === 0 ? (
            <div className="mt-10 rounded-3xl border-2 border-dashed border-slate-700 bg-slate-900/60 p-12 text-center text-slate-400 backdrop-blur-md shadow-2xl">
              <Globe2 className="w-16 h-16 mx-auto mb-4 opacity-50 text-slate-500" />
              <p className="text-xl font-bold">Chưa có môn học nào ở khu vực này.</p>
              <p className="mt-2 text-sm text-slate-500">
                Hãy chờ quản trị viên thiết lập thêm các trạm tri thức mới.
              </p>
            </div>
          ) : (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map(([slug, label], index) => {
                const color = neonColors[index % neonColors.length];
                return (
                  <li key={slug}>
                    <Link
                      href={`/hoc-tap/${slug}`}
                      className={`group flex min-h-[180px] flex-col rounded-3xl border-2 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/80 ${color.border} relative overflow-hidden`}
                      style={{ boxShadow: color.glow }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-white/10 transition-colors"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className={`p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner ${color.text}`}>
                              {getSubjectIcon(slug, "w-8 h-8")}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                              <ArrowRight className={`w-5 h-5 text-white/50 group-hover:text-white transition-colors`} />
                          </div>
                      </div>
                      
                      <div className="mt-auto relative z-10">
                          <span className="font-black text-2xl tracking-wide text-white drop-shadow-md">
                              {label}
                          </span>
                          <span className={`block mt-2 text-sm font-bold uppercase tracking-widest ${color.text} flex items-center gap-2`}>
                              Truy cập trạm <span className="animate-pulse">●</span>
                          </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
      </div>
    </div>
  );
}
