import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/SignOutButton";

const nav = [
  { href: "/dashboard", label: "Trang chủ", icon: "◆" },
  { href: "/hoc-tap", label: "Học bài", icon: "📚" },
  { href: "/schedule", label: "Lịch học", icon: "☰" },
  { href: "/scores", label: "Điểm số", icon: "★" },
];

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
    .select("display_name, grade")
    .eq("id", user.id)
    .single();

  const name = profile?.display_name ?? user.email?.split("@")[0] ?? "Student";
  const grade = profile?.grade ?? 3;

  return (
    <div className="min-h-dvh bg-[#020617] lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0f172a] lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
            B
          </span>
          <span className="font-display font-semibold text-white">
            BrightPath
          </span>
        </div>
        <div className="border-b border-slate-800 px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Signed in as
          </p>
          <p className="mt-0.5 truncate font-medium text-white">{name}</p>
          <p className="mt-1 inline-flex rounded-full bg-sky-900/50 px-2 py-0.5 text-xs font-semibold text-sky-400">
            Grade {grade}
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <span className="text-sky-500">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-800 p-3">
          <SignOutButton className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white" />
        </div>
      </aside>

      {/* Mobile / tablet top bar */}
      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-slate-800 bg-[#0f172a]/90 px-4 py-3 backdrop-blur-md lg:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-xs font-bold text-white shadow-lg shadow-sky-500/20">
              B
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {name}
              </p>
              <p className="text-xs text-slate-400">Grade {grade}</p>
            </div>
          </Link>
          <SignOutButton className="shrink-0 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300" />
        </header>

        <nav className="flex border-b border-slate-800 bg-[#0f172a] px-2 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-lg text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>

        {/* Bottom safe area on tablets */}
        <div className="pb-safe lg:hidden" aria-hidden />
      </div>
    </div>
  );
}
