"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, BookOpen, Target, PenTool } from "lucide-react";

export function TopNavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Trang chủ", icon: Layout, color: "text-sky-400", activeBg: "bg-sky-500/20", border: "border-sky-500" },
    { href: "/hoc-tap", label: "Học bài", icon: BookOpen, color: "text-emerald-400", activeBg: "bg-emerald-500/20", border: "border-emerald-500" },
    { href: "/luyen-tap", label: "Luyện tập", icon: Target, color: "text-fuchsia-400", activeBg: "bg-fuchsia-500/20", border: "border-fuchsia-500" },
    { href: "/assessment-studio", label: "Đánh giá", icon: PenTool, color: "text-amber-400", activeBg: "bg-amber-500/20", border: "border-amber-500" },
  ];

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex items-center gap-2">
        {links.map(link => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black uppercase tracking-wider text-sm transition-all duration-300 border-2
                ${isActive ? `${link.activeBg} ${link.border} ${link.color} shadow-[0_0_15px_rgba(255,255,255,0.1)]` : `border-transparent text-slate-400 hover:bg-slate-800 hover:text-white`}`}
            >
              <Icon size={18} className={`${isActive ? '' : 'text-slate-500'}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t-2 border-slate-800/80 bg-[#0f172a]/95 px-2 py-2 md:hidden justify-around pb-safe">
        {links.map(link => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 w-[72px] h-14 rounded-xl font-bold uppercase tracking-widest text-[9px] transition-all
                ${isActive ? `${link.activeBg} ${link.color} border border-${link.border.replace('border-','')}` : `text-slate-500 hover:text-slate-300`}`}
            >
              <Icon size={20} className={`${isActive ? link.color : 'text-slate-500'}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
