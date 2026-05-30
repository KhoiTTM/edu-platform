"use client";

import { useState } from "react";
import { Copy, ExternalLink, CheckCircle, Volume2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SpeakingLaunchpadProps {
  promptText: string;
  unitTopic: string;
  sessionId: string;
  unitId: string;
  backUrl: string;
}

export function SpeakingLaunchpad({ promptText, unitTopic, sessionId, unitId, backUrl }: SpeakingLaunchpadProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCopyAndGo = async (url: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(url);
      setTimeout(() => setCopied(null), 3000);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to copy", err);
      // Fallback
      window.open(url, "_blank");
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Phase 3: Send to API to mark complete in speaking_sessions
      const res = await fetch("/api/speaking/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId, sessionId }),
      });
      if (res.ok) {
        setIsCompleted(true);
        setTimeout(() => {
          router.push(backUrl);
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-emerald-950/20 rounded-3xl border border-emerald-500/30 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-emerald-400" size={40} />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Tuyệt vời!</h2>
        <p className="text-slate-400">Bạn đã hoàn thành phiên luyện nói. Hệ thống đang cập nhật kết quả...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Back button */}
      <Link href={backUrl} className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mb-4">
        <ArrowLeft size={16} /> Quay lại danh sách
      </Link>

      <div className="bg-slate-900/60 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-sky-500/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center border border-sky-500/20 mb-4 shadow-inner">
            <Volume2 className="text-sky-400" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Phòng Tập Nói AI</h1>
          <p className="text-slate-400">
            Chủ đề: <span className="text-emerald-400 font-bold">{unitTopic}</span>
          </p>
        </div>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">1</span> 
              Cách thực hiện
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                Bấm nút màu xanh bên dưới để sao chép cấu hình Giám khảo AI.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                Trang web <b>Gemini.google.com</b> sẽ tự động mở ra. Dán cấu hình vào khung chat và gửi.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                Bấm biểu tượng <b>Micro (Gemini Live)</b> trên app/web để bắt đầu thi nói bằng giọng nói thật.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => handleCopyAndGo("https://gemini.google.com")}
              className="flex-1 relative group overflow-hidden rounded-2xl p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 opacity-70 group-hover:opacity-100 transition-opacity animate-gradient-x" />
              <div className="relative bg-slate-900 px-4 py-4 rounded-xl flex items-center justify-center gap-2 transition-transform group-hover:scale-[0.99] group-active:scale-95 h-full">
                {copied === "https://gemini.google.com" ? (
                  <>
                    <CheckCircle className="text-emerald-400" />
                    <span className="font-black text-white text-sm tracking-wide">Đã Copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="text-sky-400 group-hover:text-white transition-colors" size={20} />
                    <span className="font-black text-white text-sm tracking-wide">Mở bằng Gemini</span>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  </>
                )}
              </div>
            </button>

            <button
              onClick={() => handleCopyAndGo("https://chatgpt.com")}
              className="flex-1 relative group overflow-hidden rounded-2xl p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity animate-gradient-x" />
              <div className="relative bg-slate-900 px-4 py-4 rounded-xl flex items-center justify-center gap-2 transition-transform group-hover:scale-[0.99] group-active:scale-95 h-full">
                {copied === "https://chatgpt.com" ? (
                  <>
                    <CheckCircle className="text-emerald-400" />
                    <span className="font-black text-white text-sm tracking-wide">Đã Copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="text-emerald-400 group-hover:text-white transition-colors" size={20} />
                    <span className="font-black text-white text-sm tracking-wide">Mở bằng ChatGPT</span>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Completion area */}
          <div className="pt-6 mt-6 border-t border-slate-800/80">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs">2</span> 
              Sau khi nói xong
            </h3>
            <button
              onClick={handleComplete}
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-white transition-all shadow-[0_4px_0_rgb(16,185,129)] active:translate-y-[4px] active:shadow-none bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đã luyện tập xong"}
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Hệ thống sẽ ghi nhận tiến độ của bạn vào mục Tiếng Anh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
