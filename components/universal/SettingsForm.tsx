"use client";

import { useState } from "react";
import { updateUserGrades } from "@/app/(app)/settings/actions";
import { Check, Loader2, Save, GraduationCap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
  initialGrades: number[];
}

export function SettingsForm({ initialGrades }: SettingsFormProps) {
  const [selectedGrades, setSelectedGrades] = useState<number[]>(initialGrades);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const availableGrades = [
    { value: 3, label: "Lớp 3", description: "Toán, Tiếng Anh (Global Success)" },
    { value: 7, label: "Lớp 7", description: "Toán, Tiếng Anh & IELTS Foundation" },
  ];

  const toggleGrade = (grade: number) => {
    setSelectedGrades((prev) =>
      prev.includes(grade)
        ? prev.filter((g) => g !== grade)
        : [...prev, grade].sort()
    );
  };

  const handleSave = async () => {
    if (selectedGrades.length === 0) {
      setMessage({ type: "error", text: "Vui lòng chọn ít nhất một khối lớp." });
      return;
    }

    setIsPending(true);
    setMessage(null);

    try {
      await updateUserGrades(selectedGrades);
      setMessage({ type: "success", text: "Cập nhật cài đặt thành công!" });
      router.refresh();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Đã xảy ra lỗi khi cập nhật." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid gap-4 md:grid-cols-2">
        {availableGrades.map((grade) => {
          const isSelected = selectedGrades.includes(grade.value);
          return (
            <button
              key={grade.value}
              onClick={() => toggleGrade(grade.value)}
              disabled={isPending}
              className={`relative flex flex-col items-start p-6 rounded-[2rem] border-2 transition-all text-left group overflow-hidden ${
                isSelected
                  ? "bg-sky-500/20 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`p-2 rounded-xl ${isSelected ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                  <GraduationCap size={24} />
                </div>
                {isSelected && (
                  <div className="bg-sky-500 text-white p-1 rounded-full">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </div>
              
              <h3 className={`font-['Outfit'] text-xl font-black tracking-tight ${isSelected ? "text-white" : "text-slate-300"}`}>
                {grade.label}
              </h3>
              <p className={`text-xs font-bold mt-1 ${isSelected ? "text-sky-300/80" : "text-slate-500"}`}>
                {grade.description}
              </p>

              {/* Decorative sparkles for selected state */}
              {isSelected && (
                <Sparkles size={40} className="absolute -bottom-2 -right-2 text-sky-400/10 rotate-12" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        {message && (
          <div className={`w-full p-4 rounded-2xl border font-bold text-sm text-center animate-in zoom-in-95 duration-300 ${
            message.type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}>
            {message.text}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={isPending}
          className="group relative w-full md:w-auto md:min-w-[240px] px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_0_#0284c7] active:translate-y-[2px] active:shadow-none font-['Outfit'] font-black text-white uppercase tracking-widest flex items-center justify-center gap-2"
        >
          {isPending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {isPending ? "Đang lưu..." : "Lưu cài đặt"}
          
          <div className="absolute top-1 left-1 right-1 h-1 bg-white/20 rounded-full pointer-events-none"></div>
        </button>
      </div>
    </div>
  );
}
