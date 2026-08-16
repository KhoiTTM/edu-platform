"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, RotateCcw, Sparkles, Volume2, VolumeX } from "lucide-react";
import { allVocabWords, getDistractors, vocabTopics, VocabWord } from "@/lib/data/startersVocabulary";
import { pooyanLevel2Sentences } from "@/lib/data/pooyanLevel2Sentences";

// ─── Config ───────────────────────────────────────────────────────────────────

const ROUND_COUNT = 10;
const BALLOONS_PER_ROUND = 4;
const BACK_URL = "/luyen-tap/pre-a1-starter";

const BACKGROUND_MUSIC_URLS = [
  "/audio/music-for-game/background/armotonic-adventure-boy-559098.mp3",
  "/audio/music-for-game/background/bombinsound-kids-happy-background-music-21-second-495403.mp3",
  "/audio/music-for-game/background/freesound_community-8bit-music-for-game-68698.mp3",
  "/audio/music-for-game/background/jeussfl2009-music-for-games-153673.mp3",
  "/audio/music-for-game/background/lucadialessandro-arcade-melody-295434.mp3",
  "/audio/music-for-game/background/n2kstudio-music-for-game-fun-kid-game-163649.mp3",
  "/audio/music-for-game/background/phatphrogstudio-phatphrogstudiocom-victory-fanfare-1-474658.mp3",
  "/audio/music-for-game/background/phatphrogstudio-phatphrogstudiocom-victory-fanfare-2-474663.mp3",
];

const CORRECT_POP_URLS = [
  "/audio/music-for-game/tough/freesound_community-balloon-pop-98266.mp3",
  "/audio/music-for-game/tough/universfield-party-balloon-pop-323588.mp3",
];

type GameLevel = "level1" | "level2";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Tiếng "buzz" ngắn tự sinh bằng Web Audio API cho lượt bắn trật — không có file âm thanh
// riêng cho trường hợp này, sinh trực tiếp để tránh phải tải thêm asset.
function playWrongBuzz() {
  if (typeof window === "undefined") return;
  const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextCtor) return;
  const ctx = new AudioContextCtor();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
  osc.onended = () => ctx.close();
}

const level2WordIds = [...new Set(pooyanLevel2Sentences.map(s => s.wordId))];
const level2Words = level2WordIds
  .map(id => allVocabWords.find(w => w.id === id))
  .filter((w): w is VocabWord => !!w);

function pickSessionWords(level: GameLevel, count: number): VocabWord[] {
  const pool = level === "level2" ? level2Words : allVocabWords.filter(w => !!w.emoji);
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

function pickSentenceForWord(wordId: string) {
  const candidates = pooyanLevel2Sentences.filter(s => s.wordId === wordId);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

const topicIdByWordId = new Map<string, string>();
for (const topic of vocabTopics) {
  for (const w of topic.words) topicIdByWordId.set(w.id, topic.id);
}

// Ưu tiên nhiễu cùng chủ đề (VD nghe "horse" thì nhiễu là các con vật khác) để buộc phải nghe
// rõ từ chính xác thay vì đoán theo loại chung chung; chủ đề nhỏ không đủ từ thì bù bằng
// getDistractors (cùng loại từ, rồi tới toàn bộ pool) để luôn đủ số bóng cần thiết.
function buildBalloons(word: VocabWord): VocabWord[] {
  const topicId = topicIdByWordId.get(word.id);
  const sameTopicPool = topicId
    ? allVocabWords.filter(w => w.id !== word.id && !!w.emoji && topicIdByWordId.get(w.id) === topicId)
    : [];
  const fromTopic = shuffle(sameTopicPool).slice(0, BALLOONS_PER_ROUND - 1);

  const distractors = [...fromTopic];
  if (distractors.length < BALLOONS_PER_ROUND - 1) {
    const usedIds = new Set([word.id, ...distractors.map(d => d.id)]);
    const needed = BALLOONS_PER_ROUND - 1 - distractors.length;
    const backfill = getDistractors(word, needed + usedIds.size).filter(w => !usedIds.has(w.id));
    distractors.push(...backfill.slice(0, needed));
  }

  return shuffle([...distractors, word]);
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────

function IntroScreen({
  level,
  onLevelChange,
  onStart,
}: {
  level: GameLevel;
  onLevelChange: (level: GameLevel) => void;
  onStart: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto py-8 text-center">
      <div className="text-7xl">🎈</div>
      <div>
        <h2 className="text-3xl font-black text-white">Bắn Bóng Từ Vựng</h2>
        <p className="text-slate-400 text-sm mt-2">
          {level === "level1"
            ? "Nghe từ tiếng Anh, rồi chạm đúng bóng bay mang nghĩa của từ đó!"
            : "Nghe cả câu tiếng Anh, rồi chạm đúng bóng bay mang từ khoá trong câu!"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={() => onLevelChange("level1")}
          className={`rounded-2xl border-2 p-4 text-left transition ${
            level === "level1"
              ? "border-fuchsia-500 bg-fuchsia-950/40"
              : "border-line bg-surface-raised/30 hover:border-fuchsia-500/40"
          }`}
        >
          <p className="text-sm font-black text-white">Cấp độ 1</p>
          <p className="text-xs text-slate-400 mt-1">Nghe từ · 280 từ</p>
        </button>
        <button
          onClick={() => onLevelChange("level2")}
          className={`rounded-2xl border-2 p-4 text-left transition ${
            level === "level2"
              ? "border-fuchsia-500 bg-fuchsia-950/40"
              : "border-line bg-surface-raised/30 hover:border-fuchsia-500/40"
          }`}
        >
          <p className="text-sm font-black text-white">Cấp độ 2</p>
          <p className="text-xs text-slate-400 mt-1">Nghe câu · {level2Words.length} từ · âm thật</p>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full text-left">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-line p-4 flex items-center gap-3">
          <Volume2 className="text-sky-400 shrink-0" size={20} />
          <p className="text-sm text-slate-300">
            {level === "level1" ? "Nghe kỹ từ tiếng Anh được đọc to" : "Nghe kỹ cả câu, tìm từ khoá chính"}
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-fuchsia-900/30 to-slate-900 border border-line p-4 flex items-center gap-3">
          <span className="text-xl shrink-0">🎈</span>
          <p className="text-sm text-slate-300">Chạm vào bóng bay có nghĩa đúng đang bay qua</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-line p-4 flex items-center gap-3">
          <Sparkles className="text-emerald-400 shrink-0" size={20} />
          <p className="text-sm text-slate-300">Mỗi câu chỉ được chạm 1 lần — nghe thật kỹ trước khi chọn!</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wide shadow-lg transition active:scale-95"
      >
        Bắt đầu chơi
      </button>
    </div>
  );
}

// ─── Play Screen ──────────────────────────────────────────────────────────────

interface Balloon {
  word: VocabWord;
  lane: number;
  ltr: boolean;
}

function PlayScreen({
  level,
  currentWord,
  roundIndex,
  total,
  muted,
  onSpeakingChange,
  onRoundResult,
}: {
  level: GameLevel;
  currentWord: VocabWord;
  roundIndex: number;
  total: number;
  muted: boolean;
  onSpeakingChange: (speaking: boolean) => void;
  onRoundResult: (correct: boolean) => void;
}) {
  const [balloons] = useState<Balloon[]>(() =>
    buildBalloons(currentWord).map((word, lane) => ({
      word,
      lane,
      ltr: lane % 2 === 0,
    }))
  );
  const [wrongLane, setWrongLane] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [sentence] = useState(() => (level === "level2" ? pickSentenceForWord(currentWord.id) : null));
  const [popSoundUrl] = useState(() => pickRandom(CORRECT_POP_URLS));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const popRef = useRef<HTMLAudioElement | null>(null);

  function playPrompt() {
    onSpeakingChange(true);
    if (level === "level2" && sentence) {
      const audio = audioRef.current;
      if (!audio) {
        onSpeakingChange(false);
        return;
      }
      audio.onended = () => onSpeakingChange(false);
      audio.play().catch(() => onSpeakingChange(false));
    } else {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(currentWord.english);
        utt.lang = "en-US";
        utt.rate = 0.75;
        utt.onend = () => onSpeakingChange(false);
        utt.onerror = () => onSpeakingChange(false);
        window.speechSynthesis.speak(utt);
      } else {
        onSpeakingChange(false);
      }
    }
  }

  useEffect(() => {
    const t = setTimeout(() => playPrompt(), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  useEffect(() => {
    return () => onSpeakingChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTap(balloon: Balloon) {
    if (answered) return;
    const correct = balloon.word.id === currentWord.id;
    setAnswered(true);
    setWasCorrect(correct);
    if (correct) {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
      if (!muted) popRef.current?.play().catch(() => {});
      playPrompt();
    } else {
      setWrongLane(balloon.lane);
      if (!muted) playWrongBuzz();
    }
    setTimeout(() => onRoundResult(correct), 3000);
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto py-4">
      {level === "level2" && sentence && (
        <audio ref={audioRef} src={sentence.audioUrl} preload="auto" />
      )}
      <audio ref={popRef} src={popSoundUrl} preload="auto" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
          Từ {roundIndex + 1}/{total}
        </span>
        <div className="flex-1 mx-4 h-2 rounded-full bg-surface-raised/60 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${((roundIndex + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-3">
          {level === "level1" ? (
            <h2 className="text-2xl font-black text-white tracking-wide">{currentWord.english}</h2>
          ) : (
            <h2 className="text-sm font-bold text-slate-400 tracking-wide">Nghe kỹ câu và chọn đúng bóng bay</h2>
          )}
          <button
            onClick={playPrompt}
            className="p-2 rounded-full border border-line bg-surface-raised/60 text-sky-400 hover:text-white hover:bg-sky-600/40 transition active:scale-90"
            aria-label="Nghe lại"
          >
            <Volume2 size={16} />
          </button>
        </div>
        {answered && (
          <p className={`text-sm font-semibold ${wasCorrect ? "text-emerald-400" : "text-rose-400"}`}>
            {wasCorrect ? "Chính xác! 🎉" : `Sai rồi — đáp án đúng là "${currentWord.english}"`}
          </p>
        )}
        {level === "level2" && answered && sentence && (
          <p className="text-sm text-slate-300">{sentence.audioText}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {balloons.map(balloon => {
          const isTargetBalloon = balloon.word.id === currentWord.id;
          const isWrongPick = wrongLane === balloon.lane;
          return (
            <div
              key={balloon.word.id}
              className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border border-line bg-surface-raised/30 transition-colors ${
                answered && isTargetBalloon ? "bg-emerald-500/10 border-emerald-500/50" : ""
              } ${isWrongPick ? "bg-rose-500/10 border-rose-500/50" : ""}`}
            >
              <motion.div
                className="absolute inset-y-0 flex items-center"
                initial={{ x: balloon.ltr ? "-10%" : "110%" }}
                animate={
                  answered
                    ? { x: "50%" }
                    : { x: balloon.ltr ? ["-10%", "110%"] : ["110%", "-10%"] }
                }
                transition={
                  answered
                    ? { duration: 0.3 }
                    : { duration: 6 + balloon.lane * 0.7, repeat: Infinity, ease: "linear" }
                }
              >
                <motion.button
                  onClick={() => handleTap(balloon)}
                  disabled={answered}
                  animate={isWrongPick ? { y: [-6, 6, -6, 6, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-sky-500/80 to-indigo-600/80 border-2 shadow-lg flex items-center justify-center text-3xl sm:text-4xl select-none active:scale-90 disabled:pointer-events-none transition-opacity ${
                    answered && !isTargetBalloon ? "opacity-30 border-white/10" : "border-white/20"
                  } ${answered && isTargetBalloon ? "ring-4 ring-emerald-400/60" : ""}`}
                >
                  {balloon.word.emoji}
                </motion.button>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────

function ResultScreen({
  score,
  total,
  onRetry,
}: {
  score: number;
  total: number;
  onRetry: () => void;
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    if (pct >= 80) confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
  }, [pct]);

  const grade =
    pct >= 90 ? { label: "Xuất sắc! 🏆", color: "text-amber-400", emoji: "🏆" }
    : pct >= 70 ? { label: "Tốt lắm! 🌟", color: "text-sky-400", emoji: "⭐" }
    : pct >= 50 ? { label: "Khá ổn! 💪", color: "text-emerald-400", emoji: "💪" }
    : { label: "Cần cố gắng hơn! 📚", color: "text-rose-400", emoji: "📚" };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto py-8 text-center">
      <div className="text-7xl">{grade.emoji}</div>
      <div>
        <h2 className={`text-3xl font-black ${grade.color}`}>{grade.label}</h2>
        <p className="text-slate-400 text-sm mt-2">Bài luyện tập hoàn thành!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border border-line p-5">
          <p className="text-2xl font-black text-white">{pct}%</p>
          <p className="text-xs text-slate-400 mt-1">Điểm số</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-line p-5">
          <p className="text-2xl font-black text-emerald-400">
            {score}/{total}
          </p>
          <p className="text-xs text-slate-400 mt-1">Trả lời đúng</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wide shadow-lg transition active:scale-95"
        >
          <RotateCcw size={15} /> Chơi lại
        </button>
        <Link
          href={BACK_URL}
          className="w-full py-3 rounded-2xl border border-line bg-surface-raised/40 text-slate-300 hover:bg-slate-700/60 font-semibold text-sm transition text-center"
        >
          Về Pre A1 Starter
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Stage = "intro" | "playing" | "result";

export default function PooyanVocabGame() {
  const [stage, setStage] = useState<Stage>("intro");
  const [level, setLevel] = useState<GameLevel>("level1");
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundKey, setRoundKey] = useState(0);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const wordsRef = useRef<VocabWord[]>([]);
  const scoreRef = useRef(0);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicRef.current) return;
    musicRef.current.volume = 0.12;
    if (musicUrl && stage === "playing" && !muted && !speaking) {
      musicRef.current.play().catch(() => {});
    } else {
      musicRef.current.pause();
    }
  }, [musicUrl, stage, muted, speaking]);

  // Cleanup chỉ chạy khi component unmount (route đổi trang) — cố ý đọc musicRef.current tại
  // thời điểm unmount thay vì mount, vì <audio> chỉ render sau khi startGame() set musicUrl.
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      musicRef.current?.pause();
    };
  }, []);

  function startGame() {
    const words = pickSessionWords(level, ROUND_COUNT);
    wordsRef.current = words;
    scoreRef.current = 0;
    setSessionWords(words);
    setRoundIndex(0);
    setScore(0);
    setRoundKey(k => k + 1);
    setMusicUrl(pickRandom(BACKGROUND_MUSIC_URLS));
    setStage("playing");
  }

  function handleRoundResult(correct: boolean) {
    if (correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
    if (roundIndex + 1 >= wordsRef.current.length) {
      setStage("result");
    } else {
      setRoundIndex(i => i + 1);
      setRoundKey(k => k + 1);
    }
  }

  const currentWord = sessionWords[roundIndex];

  return (
    <div className="min-h-dvh bg-surface-deep text-slate-100 flex flex-col">
      {musicUrl && <audio ref={musicRef} src={musicUrl} loop preload="auto" />}

      <header className="sticky top-0 z-20 border-b border-line bg-surface/50 backdrop-blur-md px-6 py-4 flex items-center gap-4 flex-wrap">
        <Link
          href={BACK_URL}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line bg-surface-raised text-slate-300 hover:text-white text-xs font-medium transition"
        >
          <ChevronLeft size={15} /> Quay lại
        </Link>
        <div className="flex-1">
          <h1 className="text-sm font-extrabold text-white flex items-center gap-1.5">
            🎈 Bắn Bóng Từ Vựng
          </h1>
          <p className="text-[10px] text-slate-400">Pre A1 Starters · Trò chơi luyện từ vựng</p>
        </div>
        <button
          onClick={() => setMuted(m => !m)}
          className="p-2 rounded-full border border-line bg-surface-raised text-slate-300 hover:text-white transition"
          aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        {stage === "intro" && (
          <IntroScreen level={level} onLevelChange={setLevel} onStart={startGame} />
        )}
        {stage === "playing" && currentWord && (
          <PlayScreen
            key={roundKey}
            level={level}
            muted={muted}
            onSpeakingChange={setSpeaking}
            currentWord={currentWord}
            roundIndex={roundIndex}
            total={sessionWords.length}
            onRoundResult={handleRoundResult}
          />
        )}
        {stage === "result" && (
          <ResultScreen score={score} total={sessionWords.length} onRetry={startGame} />
        )}
      </div>
    </div>
  );
}
