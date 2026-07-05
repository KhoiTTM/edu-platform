"use client";

import { useState } from "react";
import { Copy, ExternalLink, CheckCircle, Volume2, ArrowLeft, Settings, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateSpeakingPrompt, generateIeltsPrompt } from "@/lib/speaking/prompt-generator";

interface SpeakingLaunchpadProps {
  subjectType: 'ielts' | 'general_k12';
  studentLevel: string;
  unitTopic: string;
  lessonSummary?: string;
  keyVocab?: string[];
  precedingTopics?: string[];
  precedingVocab?: string[];
  sessionId: string;
  unitId: string;
  backUrl: string;
}

export function SpeakingLaunchpad({ 
  subjectType,
  studentLevel,
  unitTopic,
  lessonSummary,
  keyVocab,
  precedingTopics,
  precedingVocab,
  sessionId, 
  unitId, 
  backUrl 
}: SpeakingLaunchpadProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Settings states
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('slow');
  const [feedbackLang, setFeedbackLang] = useState<'english' | 'bilingual'>(
    subjectType === 'ielts' ? 'english' : 'bilingual'
  );
  const [focus, setFocus] = useState<'general' | 'pronunciation' | 'grammar'>('general');
  const [ieltsPart, setIeltsPart] = useState<1 | 2 | 3>(1);
  const [targetBand, setTargetBand] = useState<string>(
    subjectType === 'ielts' && studentLevel.includes("Band") 
      ? studentLevel.split(" ").pop()! 
      : "6.5"
  );

  // Dynamically generate the speaking prompt on the client side based on settings
  const promptText = subjectType === 'ielts'
    ? generateIeltsPrompt(unitTopic, ieltsPart, targetBand, lessonSummary, keyVocab)
    : generateSpeakingPrompt({

        subjectType,
        studentLevel,
        topic: unitTopic,
        lessonSummary,
        keyVocab,
        precedingTopics,
        precedingVocab,
        speed,
        feedbackLang,
        focus
      });


  const handleCopyAndGo = async (url: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(url);
      setTimeout(() => setCopied(null), 3000);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to copy", err);
      window.open(url, "_blank");
    }
  };


  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
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
        <ArrowLeft size={16} /> Quay lại bài học
      </Link>

      <div className="bg-surface/60 p-8 rounded-[2rem] border border-line shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-sky-500/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center border border-sky-500/20 mb-4 shadow-inner">
            <Volume2 className="text-sky-400" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 font-display uppercase">Phòng Luyện Nói AI</h1>
          <p className="text-slate-400 text-sm">
            Chủ đề: <span className="text-sky-400 font-extrabold">{unitTopic}</span>
          </p>
        </div>

        <div className="space-y-6">

          {/* AI Teacher Configuration Panel */}
          <div className="bg-slate-950/40 rounded-2xl p-6 border border-line/80 space-y-5">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-line pb-3">
              <Settings className="text-sky-400" size={18} /> Cấu hình Giáo viên AI
            </h3>
            
            <div className="space-y-4">
              {/* IELTS Part Selection (IELTS Only) */}
              {subjectType === 'ielts' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phần thi IELTS Speaking:</label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-line">
                    <button
                      onClick={() => setIeltsPart(1)}
                      className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${ieltsPart === 1 ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Part 1
                    </button>
                    <button
                      onClick={() => setIeltsPart(2)}
                      className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${ieltsPart === 2 ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Part 2
                    </button>
                    <button
                      onClick={() => setIeltsPart(3)}
                      className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${ieltsPart === 3 ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Part 3
                    </button>
                  </div>
                </div>
              )}

              {subjectType === 'ielts' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Band Goal:</label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-line">
                    <button
                      onClick={() => setTargetBand("6.5")}
                      className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${targetBand === "6.5" ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      6.5
                    </button>
                    <button
                      onClick={() => setTargetBand("7.0")}
                      className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${targetBand === "7.0" ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      7.0
                    </button>
                    <button
                      onClick={() => setTargetBand("7.5")}
                      className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${targetBand === "7.5" ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      7.5+
                    </button>
                  </div>
                </div>
              )}

              {/* Speaking Speed */}
              <div className="space-y-2">

                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tốc độ nói của AI:</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-line">
                  <button
                    onClick={() => setSpeed('slow')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${speed === 'slow' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    🐢 Chậm (0.7x)
                  </button>
                  <button
                    onClick={() => setSpeed('medium')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${speed === 'medium' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    👤 Bình thường (1.0x)
                  </button>
                  <button
                    onClick={() => setSpeed('fast')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${speed === 'fast' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    ⚡ Nhanh (1.2x)
                  </button>
                </div>
              </div>

              {/* Feedback Language */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ngôn ngữ giải thích lỗi sai:</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-line">
                  <button
                    onClick={() => setFeedbackLang('english')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${feedbackLang === 'english' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    🇺🇸 Chỉ Tiếng Anh
                  </button>
                  <button
                    onClick={() => setFeedbackLang('bilingual')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${feedbackLang === 'bilingual' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    🇻🇳 Song ngữ Anh - Việt
                  </button>
                </div>
              </div>

              {/* Practice Focus */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trọng tâm kiểm tra & sửa lỗi:</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-line">
                  <button
                    onClick={() => setFocus('general')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${focus === 'general' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    ⚖️ Tổng hợp
                  </button>
                  <button
                    onClick={() => setFocus('pronunciation')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${focus === 'pronunciation' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    🗣️ Phát âm
                  </button>
                  <button
                    onClick={() => setFocus('grammar')}
                    className={`py-1.5 text-xs font-extrabold rounded-lg transition-all ${focus === 'grammar' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    ✍️ Ngữ pháp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-slate-950/50 rounded-2xl p-6 border border-line">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">1</span> 
              Cách thực hiện
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                Bấm nút sao chép AI Teacher tương ứng ở dưới. Hệ thống sẽ tự động cấu hình theo các cài đặt của bạn ở trên.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                Trang web hoặc app **Gemini / ChatGPT** sẽ tự động mở ra. Dán (Paste) cấu hình vào khung chat và gửi đi.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                Ấn vào biểu tượng **Micro / Live Voice** trên ứng dụng điện thoại hoặc trình duyệt để nói chuyện trực tiếp.
              </li>
            </ul>
            {keyVocab && keyVocab.length > 0 && (
              <div className="mt-4 pt-4 border-t border-line/80 flex items-start gap-2 text-xs text-slate-500">
                <Info size={14} className="text-sky-400 flex-shrink-0 mt-0.5" />
                <p>
                  <span className="text-slate-300 font-bold">Từ vựng mục tiêu:</span> {keyVocab.join(", ")}. Hãy cố gắng sử dụng các từ này trong buổi nói nhé!
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => handleCopyAndGo("https://gemini.google.com")}
              className="flex-1 relative group overflow-hidden rounded-2xl p-1 animate-pulse"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 opacity-70 group-hover:opacity-100 transition-opacity animate-gradient-x" />
              <div className="relative bg-surface px-4 py-4 rounded-xl flex items-center justify-center gap-2 transition-transform group-hover:scale-[0.99] group-active:scale-95 h-full">
                {copied === "https://gemini.google.com" ? (
                  <>
                    <CheckCircle className="text-emerald-400 animate-bounce" />
                    <span className="font-black text-white text-sm tracking-wide">Đã copy cấu hình!</span>
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
              <div className="relative bg-surface px-4 py-4 rounded-xl flex items-center justify-center gap-2 transition-transform group-hover:scale-[0.99] group-active:scale-95 h-full">
                {copied === "https://chatgpt.com" ? (
                  <>
                    <CheckCircle className="text-emerald-400 animate-bounce" />
                    <span className="font-black text-white text-sm tracking-wide">Đã copy cấu hình!</span>
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
          <div className="pt-6 mt-6 border-t border-line/80">
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
              Hệ thống sẽ ghi nhận tiến độ của bạn vào lịch sử học tập.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

