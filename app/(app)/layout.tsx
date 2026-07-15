import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/SignOutButton";
import { Star, Flame, Heart } from "lucide-react";
import { HeartProvider } from "@/components/gamification/HeartProvider";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { TopNavLinks } from "@/components/TopNavLinks";
import { LoginTracker } from "@/components/LoginTracker";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, grade, role")
    .eq("id", user.id)
    .single();

  const { data: gamificationData } = await supabase
    .from("gamification_profiles")
    .select("xp, level, rank, streak, energy")
    .eq("user_id", user.id)
    .maybeSingle();

  const gamification = gamificationData || { xp: 0, level: 1, energy: 5 };

  const name = profile?.display_name ?? user.email?.split("@")[0] ?? "Student";
  const grade = profile?.grade ?? 3;

  return (
    <div className="min-h-dvh flex flex-col relative text-white font-['Outfit']">
      <LoginTracker />
      {/* Global Background */}
      <SpaceBackground />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-line/80 bg-surface/80 backdrop-blur-md px-4 md:px-8 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        
        {/* Left: Brand / Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 border-2 border-sky-200 text-lg font-black text-white shadow-[0_3px_0_#0284c7]">
            E
            <div className="absolute top-0.5 left-1 right-1 h-1 bg-white/20 rounded-full pointer-events-none"></div>
          </span>
          <span className="hidden lg:block font-['Outfit'] font-black text-white uppercase tracking-widest text-lg drop-shadow-md">
            EduVerse
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <div className="flex-1 flex justify-center px-4">
            <TopNavLinks role={profile?.role ?? "student"} />
        </div>

        {/* Right: Gamification Stats & Profile */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-3">
                <div className="rounded-xl bg-yellow-500/10 border-2 border-yellow-500/30 px-3 py-1.5 flex items-center gap-1.5 text-yellow-400 font-extrabold text-xs shadow-inner hover:bg-yellow-500/20 transition-colors cursor-default">
                    <Star size={14} fill="currentColor" />
                    <span>{gamification.xp}</span>
                </div>
                <div className="rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 px-3 py-1.5 flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs shadow-inner hover:bg-emerald-500/20 transition-colors cursor-default">
                    <Flame size={14} fill="currentColor" />
                    <span>Lv {gamification.level}</span>
                </div>
                <div className="rounded-xl bg-rose-500/10 border-2 border-rose-500/30 px-3 py-1.5 flex items-center gap-1.5 text-rose-400 font-extrabold text-xs shadow-inner hover:bg-rose-500/20 transition-colors cursor-default">
                    <Heart size={14} fill="currentColor" />
                    <span>{gamification.energy}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 border-l-2 border-line/50 pl-3 md:pl-4">
                <div className="hidden sm:block text-right">
                    <p className="truncate font-black text-white uppercase tracking-tight text-sm max-w-[100px]">{name}</p>
                    <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Lớp {grade}</p>
                </div>
                <SignOutButton className="rounded-xl border-2 border-line bg-surface-raised/80 px-3 py-2 text-[10px] font-black text-slate-300 uppercase tracking-widest shadow-[0_3px_0_#1e293b] active:translate-y-[2px] active:shadow-none transition-all hover:bg-slate-700 hover:text-white" />
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10 relative z-10 pb-24 md:pb-10">
        <HeartProvider>
          {children}
        </HeartProvider>
      </main>
    </div>
  );
}
