import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/universal/SettingsForm";
import { Settings, ShieldCheck } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("grades")
    .eq("id", user.id)
    .single();

  const initialGrades = profile?.grades || [3];

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-8 select-none relative z-10">
      
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-500/10 border-2 border-sky-500/30 text-sky-400">
            <Settings size={28} />
          </div>
          <div>
            <h1 className="font-['Outfit'] text-3xl font-black tracking-tight text-white uppercase">
              Cài đặt tài khoản
            </h1>
            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">
              Tùy chỉnh lộ trình học tập của bạn
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Card */}
      <section className="bg-surface/60 p-8 rounded-[2.5rem] border-2 border-line shadow-xl backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-['Outfit'] text-lg font-black text-white flex items-center gap-2 mb-6">
            <ShieldCheck size={20} className="text-emerald-400" />
            Lựa chọn khối lớp
          </h2>
          
          <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed">
            Bạn có thể chọn một hoặc nhiều khối lớp để cùng lúc theo dõi nội dung học tập. 
            Hệ thống sẽ tự động tổng hợp bài học từ tất cả các khối lớp bạn đã chọn vào bảng điều khiển.
          </p>

          <SettingsForm initialGrades={initialGrades} />
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-sky-500/10 blur-[100px] pointer-events-none"></div>
      </section>

      {/* Footer Info */}
      <div className="text-center">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          BrightPath Academy &copy; 2026 • AI-Powered Learning
        </p>
      </div>
    </div>
  );
}
