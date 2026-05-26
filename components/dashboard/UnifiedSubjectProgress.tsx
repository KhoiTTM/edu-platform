"use client";

import { GraduationCap, Calculator } from "lucide-react";

interface SubjectStats {
  sessions_completed: number;
  total_minutes: number;
}

interface UnifiedSubjectProgressProps {
  subjectProgress: Record<string, SubjectStats>;
}

export function UnifiedSubjectProgress({ subjectProgress }: UnifiedSubjectProgressProps) {
  const subjects = [
    { 
      slug: "mindset-ielts", 
      name: "IELTS Mindset", 
      icon: GraduationCap, 
      color: "text-sky-400", 
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/20"
    },
    { 
      slug: "toan", 
      name: "Mathematics", 
      icon: Calculator, 
      color: "text-emerald-400", 
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subjects.map((s) => {
        const stats = subjectProgress[s.slug] || { sessions_completed: 0, total_minutes: 0 };
        return (
          <div 
            key={s.slug} 
            className={`p-6 rounded-3xl border ${s.borderColor} ${s.bgColor} space-y-4 shadow-lg`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-slate-900/50 ${s.color}`}>
                <s.icon size={24} />
              </div>
              <h3 className="font-bold text-white uppercase tracking-tight">{s.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sessions</p>
                <p className="text-2xl font-black text-white">{stats.sessions_completed}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Focus Time</p>
                <p className="text-2xl font-black text-white">{stats.total_minutes}m</p>
              </div>
            </div>

            {/* Simple progress bar mock */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-slate-500">Current Level Progress</span>
                <span className={s.color}>{Math.min(100, stats.sessions_completed * 5)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${s.color.replace('text', 'bg')} transition-all duration-1000`}
                  style={{ width: `${Math.min(100, stats.sessions_completed * 5)}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
