"use client";

import { useState, useEffect } from "react";
import { Check, X, Volume2, Lightbulb } from "lucide-react";
import { formatText } from "./formatText";

interface MultipleChoiceRendererProps {
  question: React.ReactNode;
  options: string[];
  correctIndex: number;
  explanation?: string | null;
  hint?: string | null;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  disabled?: boolean;
  shuffle?: boolean;
  imageUrl?: string;
  audioText?: string;
  audioUrl?: string;
  // Chế độ luyện tập: chọn sai không bị chấm sai, chỉ báo "chưa đúng" và cho chọn lại.
  // Đáp án sai đã chọn giữ nguyên màu đỏ (không reset) để học sinh thấy mình đã sai ở đâu.
  retryUntilCorrect?: boolean;
  onWrongAttempt?: () => void;
}

// Ưu tiên phát mp3 tĩnh (đã pre-generate bằng ElevenLabs, giọng cố định theo câu);
// nếu không có file thì gọi ElevenLabs API động theo voiceRole; cuối cùng Web Speech API.
async function playAudio(
  audioUrl: string | undefined,
  text: string | undefined,
  voiceRole: string,
  speed: number
) {
  if (typeof window === "undefined") return;

  // Hủy âm thanh đang phát trước đó
  if ((window as any).activeAudio) {
    try {
      (window as any).activeAudio.pause();
    } catch (e) {}
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // 1. ƯU TIÊN mp3 tĩnh đã tạo sẵn — giọng đã cố định theo câu.
  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      audio.playbackRate = speed;
      (window as any).activeAudio = audio;
      audio.play().catch((e) => console.error("Audio file play failed:", e));
      return;
    } catch (e) {
      console.error("Audio file error:", e);
    }
  }

  // 2. Không có file tĩnh -> gọi ElevenLabs API động theo voiceRole người dùng chọn
  if (text) {
    try {
      const res = await fetch("/api/ai/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceRole }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.playbackRate = speed;
        (window as any).activeAudio = audio;
        audio.play().catch((e) => console.error("ElevenLabs audio play failed:", e));
        return;
      }
    } catch (e) {
      console.error("ElevenLabs dynamic TTS error, trying fallback...", e);
    }
  }

  // 3. Fallback sang Web Speech API (trình duyệt)
  if (text && window.speechSynthesis) {
    try {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = "en-US";
      utt.rate = speed;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const isMale = voiceRole === "teacher_men" || voiceRole === "child_boy";
        const matched = voices.find((v) => {
          const name = v.name.toLowerCase();
          return (
            v.lang.startsWith("en") &&
            (isMale
              ? name.includes("male") || name.includes("david") || name.includes("google")
              : name.includes("female") || name.includes("zira") || name.includes("google"))
          );
        });
        if (matched) utt.voice = matched;
      }
      window.speechSynthesis.speak(utt);
    } catch (e) {
      console.error("Speech play failed:", e);
    }
  }
}

export function MultipleChoiceRenderer({
  question,
  options,
  correctIndex,
  hint,
  onAnswer,
  disabled = false,
  shuffle = true,
  imageUrl,
  audioText,
  audioUrl,
  retryUntilCorrect = false,
  onWrongAttempt
}: MultipleChoiceRendererProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [actualCorrectIndex, setActualCorrectIndex] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);

  const [voiceRole, setVoiceRole] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tts-voice-role") || "teacher_women";
    }
    return "teacher_women";
  });
  const [speed, setSpeed] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const val = localStorage.getItem("tts-speed");
      return val ? parseFloat(val) : 1.0;
    }
    return 1.0;
  });

  useEffect(() => {
    if (initialized) return;
    const arr = options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
    if (shuffle) {
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    setShuffledOptions(arr.map(a => a.opt));
    setActualCorrectIndex(arr.findIndex(a => a.isCorrect));
    setSelectedIndex(null);
    setInitialized(true);
  }, [options, correctIndex, initialized, shuffle]);

  useEffect(() => {
    if (initialized && (audioUrl || audioText)) {
      playAudio(audioUrl, audioText, voiceRole, speed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, audioUrl, audioText]);

  const changeVoice = (newRole: string) => {
    setVoiceRole(newRole);
    localStorage.setItem("tts-voice-role", newRole);
    playAudio(audioUrl, audioText, newRole, speed);
  };

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    localStorage.setItem("tts-speed", newSpeed.toString());
    playAudio(audioUrl, audioText, voiceRole, newSpeed);
  };

  const handleSelect = (idx: number) => {
    if (disabled) return;
    if (retryUntilCorrect && idx !== actualCorrectIndex) {
      // Không chấm sai — chỉ đánh dấu "chưa đúng" và cho chọn lại.
      setWrongIndices(prev => (prev.includes(idx) ? prev : [...prev, idx]));
      onWrongAttempt?.();
      return;
    }
    setSelectedIndex(idx);
    onAnswer(idx === actualCorrectIndex, shuffledOptions[idx]);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium text-white leading-snug">
        {typeof question === 'string' ? formatText(question) : question}
      </div>

      {hint && (
        <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
          <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
          <span>{typeof hint === 'string' ? formatText(hint) : hint}</span>
        </div>
      )}

      {(audioUrl || audioText) && (
        <div className="flex flex-wrap items-center gap-3 py-2 bg-slate-900/30 p-3 rounded-2xl border border-white/5">
          <button
            onClick={() => playAudio(audioUrl, audioText, voiceRole, speed)}
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl shadow-[0_4px_0_rgb(14,165,233)] active:translate-y-0.5 active:shadow-none transition-all text-xs"
          >
            <Volume2 size={16} />
            Nghe (Listen)
          </button>

          <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/10 text-xs">
            <span className="text-[10px] text-slate-400 font-bold px-1.5 uppercase">Giọng:</span>
            {[
              { id: "teacher_women", label: "Cô Giáo" },
              { id: "teacher_men", label: "Thầy Giáo" },
              { id: "child_girl", label: "Bé Gái" },
              { id: "child_boy", label: "Bé Trai" }
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => changeVoice(v.id)}
                className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                  voiceRole === v.id
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/10 text-xs">
            <span className="text-[10px] text-slate-400 font-bold px-1.5 uppercase">Tốc độ:</span>
            {[
              { val: 1.0, label: "x1" },
              { val: 0.75, label: "x0.75" },
              { val: 0.5, label: "x0.5" }
            ].map((s) => (
              <button
                key={s.val}
                type="button"
                onClick={() => changeSpeed(s.val)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                  speed === s.val
                    ? "bg-violet-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="my-4 overflow-hidden rounded-2xl border border-white/10 bg-surface/50 flex justify-center p-4">
          {imageUrl.startsWith('<svg') ? (
            <div
              className="max-h-[300px] w-full max-w-[400px] flex items-center justify-center text-white"
              dangerouslySetInnerHTML={{ __html: imageUrl }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="Question Graphic" className="max-h-[300px] object-contain rounded-xl" />
          )}
        </div>
      )}

      {retryUntilCorrect && wrongIndices.length > 0 && !disabled && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-bold">
          <X size={16} className="flex-shrink-0" />
          Chưa đúng — em thử lại nhé!
        </div>
      )}

      <div className="grid gap-2">
        {shuffledOptions.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === actualCorrectIndex;
          const showResult = disabled && (isSelected || isCorrect);
          const isWrongAttempt = wrongIndices.includes(idx);

          let borderClass = "border-line bg-surface/50 hover:bg-surface-raised hover:border-line cursor-pointer";
          if (disabled) {
            borderClass = "border-line bg-surface/50 opacity-50 cursor-not-allowed";
          }
          if (isWrongAttempt) {
            // Đáp án đã chọn sai (chế độ làm lại): giữ nguyên màu đỏ, không cho bấm lại
            borderClass = "border-rose-500 bg-rose-500/10 text-rose-400 opacity-100 cursor-not-allowed";
          }
          if (showResult) {
            if (isCorrect) borderClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400 opacity-100 font-bold z-10";
            else if (isSelected) borderClass = "border-rose-500 bg-rose-500/10 text-rose-400 opacity-100 font-bold z-10";
          }

          return (
            <button
              key={idx}
              disabled={disabled || isWrongAttempt}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3 rounded-2xl border transition-all text-slate-200 text-sm flex items-center justify-between group ${borderClass}`}
            >
              <div className="flex items-center">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold mr-4 transition-colors ${
                  showResult && isCorrect ? "bg-emerald-500 border-emerald-400 text-white" :
                  (showResult && isSelected) || isWrongAttempt ? "bg-rose-500 border-rose-400 text-white" :
                  "bg-surface-raised border-line text-slate-400 group-hover:text-white group-hover:border-sky-500/50"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {formatText(option)}
              </div>

              {showResult && isCorrect && <Check size={18} className="text-emerald-400" />}
              {((showResult && isSelected && !isCorrect) || (isWrongAttempt && !showResult)) && <X size={18} className="text-rose-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
