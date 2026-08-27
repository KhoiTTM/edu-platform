"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { ChevronLeft, RefreshCw, Sparkles, Volume2, Brain, Search, HelpCircle, Check, X } from "lucide-react";
import {
  wordAttributeList,
  ATTRIBUTE_HINTS,
  AttributeKey,
  WordAttributes,
  pickBestQuestion,
  pickQuestionPhrasing,
  filterCandidates,
  getVocabWord,
} from "@/lib/data/akinatorWordData";
import { allVocabWords, VocabWord, vocabTopics } from "@/lib/data/startersVocabulary";

// ─── Config ────────────────────────────────────────────────────────────────────
const MAX_QUESTIONS = 20;
const BACK_URL = "/luyen-tap/pre-a1-starter";

type GameMode = "ai-guesses" | "student-guesses";
type GamePhase = "select-mode" | "think" | "playing" | "result";
type Answer = "yes" | "no" | "maybe";

interface HistoryEntry {
  question: string;   // the phrasing shown to the student
  hint: string;
  answer: Answer;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function speak(text: string) {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.82;
  window.speechSynthesis?.speak(utter);
}

function playSuccess() {
  if (typeof window === "undefined") return;
  const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;
  const ctx = new AudioContextCtor();
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.25);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.3);
  });
  osc_cleanup(ctx);
}

function osc_cleanup(ctx: AudioContext) {
  setTimeout(() => ctx.close(), 2000);
}

function playWrong() {
  if (typeof window === "undefined") return;
  const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;
  const ctx = new AudioContextCtor();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.3);
  g.gain.setValueAtTime(0.12, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.35);
  osc_cleanup(ctx);
}

// Get random word with attributes
function pickRandomPlayableWord(): VocabWord & { attrs: WordAttributes } {
  const playable = wordAttributeList;
  const attrs = playable[Math.floor(Math.random() * playable.length)];
  const vocab = getVocabWord(attrs.id)!;
  return { ...vocab, attrs };
}

// ─── STUDENT GUESS MODE ────────────────────────────────────────────────────────
// The student asks Yes/No questions about a hidden word the AI "thinks" of.
// We show a list of possible question templates the student can click.

// Student question bank — all keys shown as clickable tiles.
// Labels are the "default" phrasing; TTS uses the same text.
const STUDENT_QUESTION_TEMPLATES: Array<{ key: AttributeKey; label: string }> = [
  // ── Category ──
  { key: "isAnimal",        label: "Is it an animal? 🐾" },
  { key: "isFood",          label: "Is it a food? 🍽️" },
  { key: "isDrink",         label: "Is it a drink? 🥤" },
  { key: "isClothes",       label: "Is it something you wear? 👕" },
  { key: "isBodyPart",      label: "Is it a body part? 🫀" },
  { key: "isPerson",        label: "Is it a person? 👤" },
  { key: "isFurniture",     label: "Is it furniture? 🪑" },
  { key: "isRoom",          label: "Is it a room? 🚪" },
  { key: "isSchoolThing",   label: "Is it a school item? 📚" },
  { key: "isToy",           label: "Is it a toy? 🪆" },
  // ── Life ──
  { key: "isAlive",         label: "Is it alive? 🌱" },
  { key: "canFly",          label: "Can it fly? ✈️" },
  { key: "canSwim",         label: "Can it swim? 🏊" },
  { key: "livesInWater",    label: "Does it live in water? 🌊" },
  { key: "liveIndoors",     label: "Does it live inside? 🏠" },
  { key: "isPet",           label: "Can it be a pet? 🐕" },
  { key: "hasFur",          label: "Does it have fur? 🦊" },
  { key: "hasTail",         label: "Does it have a tail? 🦓" },
  { key: "hasFourLegs",     label: "Does it have four legs? 🐾" },
  { key: "hasTwoLegs",      label: "Does it have two legs? 🐧" },
  { key: "makesSound",      label: "Does it make a sound? 🔊" },
  // ── Food ──
  { key: "isFruit",         label: "Is it a fruit? 🍊" },
  { key: "isVegetable",     label: "Is it a vegetable? 🥦" },
  { key: "isSweet",         label: "Is it sweet? 🍬" },
  { key: "canEat",          label: "Can you eat it? 😋" },
  { key: "canDrink",        label: "Can you drink it? 💧" },
  { key: "cookedBeforeEating", label: "Do you cook it first? 🍳" },
  { key: "isHotFood",       label: "Is it served hot? ♨️" },
  { key: "isColdFood",      label: "Is it served cold? ❄️" },
  // ── Shape / Feel ──
  { key: "isSmall",         label: "Is it small? ✋" },
  { key: "isLong",          label: "Is it long? 📏" },
  { key: "isRound",         label: "Is it round? ⭕" },
  { key: "isFlat",          label: "Is it flat? 📄" },
  { key: "isHard",          label: "Is it hard? 🪨" },
  { key: "isSoft",          label: "Is it soft? 🧸" },
  { key: "isColorful",      label: "Is it colourful? 🌈" },
  // ── Colour ──
  { key: "isYellow",        label: "Is it yellow? 🟡" },
  { key: "isRed",           label: "Is it red? 🔴" },
  { key: "isGreen",         label: "Is it green? 🟢" },
  { key: "isWhite",         label: "Is it white? ⬜" },
  { key: "isBrown",         label: "Is it brown? 🟤" },
  // ── Clothes ──
  { key: "isWorn",          label: "Do you wear it? 👗" },
  { key: "isWornOnHead",    label: "Do you wear it on your head? 🎩" },
  { key: "isWornOnFeet",    label: "Do you wear it on your feet? 👟" },
  { key: "coversUpperBody", label: "Does it cover your chest? 👕" },
  { key: "coversLowerBody", label: "Does it cover your legs? 👖" },
  // ── Function ──
  { key: "usedForWriting",  label: "Is it used for writing? ✏️" },
  { key: "usedForSitting",  label: "Do people sit on it? 🪑" },
  { key: "usedForSleeping", label: "Do people sleep on it? 🛏️" },
  { key: "usedAtSchool",    label: "Is it used at school? 📚" },
  { key: "usedForCooking",  label: "Is it used for cooking? 🍳" },
  { key: "usedForLooking",  label: "Is it used for looking? 👀" },
  // ── Location ──
  { key: "foundInKitchen",  label: "Is it in the kitchen? 🍳" },
  { key: "foundInBedroom",  label: "Is it in the bedroom? 🛏️" },
  { key: "foundInBathroom", label: "Is it in the bathroom? 🚿" },
  { key: "foundOutdoors",   label: "Is it usually outside? 🌳" },
  { key: "isMadeByHuman",   label: "Is it man-made? 🏭" },
];

// Compute candidate set from asked questions
function computeCandidates(history: { key: AttributeKey; answer: Answer }[]): WordAttributes[] {
  let result = [...wordAttributeList];
  for (const { key, answer } of history) {
    result = filterCandidates(result, key, answer);
  }
  return result;
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AkinatorGame() {
  const [phase, setPhase] = useState<GamePhase>("select-mode");
  const [mode, setMode] = useState<GameMode>("ai-guesses");

  // ── AI Guesses mode state ────
  const [candidates, setCandidates] = useState<WordAttributes[]>([...wordAttributeList]);
  const [asked, setAsked] = useState<Set<AttributeKey>>(new Set());
  const [currentAttr, setCurrentAttr] = useState<AttributeKey | null>(null);
  // currentPhrasing stores the randomly picked phrasing for the current attribute
  const [currentPhrasing, setCurrentPhrasing] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [aiGuess, setAiGuess] = useState<VocabWord | null>(null);
  const [guessCorrect, setGuessCorrect] = useState<boolean | null>(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);

  // ── Student Guesses mode state ────
  const [hiddenWord, setHiddenWord] = useState<(VocabWord & { attrs: WordAttributes }) | null>(null);
  const [studentHistory, setStudentHistory] = useState<{ key: AttributeKey; label: string; answer: Answer }[]>([]);
  const [studentCandidates, setStudentCandidates] = useState<WordAttributes[]>([...wordAttributeList]);
  const [studentGuess, setStudentGuess] = useState<string>("");
  const [studentResult, setStudentResult] = useState<"correct" | "wrong" | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [askedKeys, setAskedKeys] = useState<Set<AttributeKey>>(new Set());

  // ─────────────────────────────────────────────────────────────────────────────

  const startAIMode = useCallback(() => {
    const first = pickBestQuestion([...wordAttributeList], new Set());
    const phrasing = first ? pickQuestionPhrasing(first) : "";
    setCandidates([...wordAttributeList]);
    setAsked(new Set());
    setCurrentAttr(first);
    setCurrentPhrasing(phrasing);
    setHistory([]);
    setAiGuess(null);
    setGuessCorrect(null);
    setIsGuessing(false);
    setNoMoreQuestions(false);
    setMode("ai-guesses");
    setPhase("think");
  }, []);

  const startStudentMode = useCallback(() => {
    const word = pickRandomPlayableWord();
    setHiddenWord(word);
    setStudentHistory([]);
    setStudentCandidates([...wordAttributeList]);
    setStudentGuess("");
    setStudentResult(null);
    setShowReveal(false);
    setAskedKeys(new Set());
    setMode("student-guesses");
    setPhase("playing");
  }, []);

  // Strip emoji from TTS text — remove all emoji unicode ranges
  const stripEmoji = (s: string) =>
    s.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\uFE0F]/gu, "").trim();

  // ── AI MODE: Handle Yes/No/Maybe answer ────
  const handleAnswer = useCallback((answer: Answer) => {
    if (!currentAttr) return;

    // Record the phrasing that was shown (already stored in currentPhrasing)
    const hint = ATTRIBUTE_HINTS[currentAttr];
    const newHistory = [...history, { question: currentPhrasing, hint, answer }];
    setHistory(newHistory);

    const newAsked = new Set(asked);
    newAsked.add(currentAttr);
    setAsked(newAsked);

    const newCandidates = filterCandidates(candidates, currentAttr, answer);
    setCandidates(newCandidates);

    // Check if we should guess now
    if (
      newCandidates.length <= 2 ||
      newHistory.length >= MAX_QUESTIONS ||
      newCandidates.length === 0
    ) {
      setIsGuessing(true);
      const target = newCandidates.length > 0 ? newCandidates[0] : candidates[0];
      const vocab = getVocabWord(target.id);
      if (vocab) {
        setAiGuess(vocab);
        speak(`Is it a ${vocab.english}?`);
      }
      setPhase("result");
      return;
    }

    // Continue asking — pick next attribute and a RANDOM phrasing for it
    const next = pickBestQuestion(newCandidates, newAsked);
    if (!next) {
      setNoMoreQuestions(true);
      const target = newCandidates[0];
      const vocab = getVocabWord(target.id);
      if (vocab) {
        setAiGuess(vocab);
        speak(`Is it a ${vocab.english}?`);
      }
      setPhase("result");
    } else {
      const nextPhrasing = pickQuestionPhrasing(next);
      setCurrentAttr(next);
      setCurrentPhrasing(nextPhrasing);
      speak(stripEmoji(nextPhrasing));
    }
  }, [currentAttr, currentPhrasing, candidates, asked, history]);

  // ── AI MODE: Player confirms correct / wrong ────
  const handleGuessResult = (correct: boolean) => {
    setGuessCorrect(correct);
    if (correct) {
      playSuccess();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } else {
      playWrong();
    }
  };

  // ── STUDENT MODE: Ask a question ────
  const handleStudentQuestion = (key: AttributeKey, label: string) => {
    if (!hiddenWord || askedKeys.has(key)) return;
    const answer: Answer = hiddenWord.attrs[key] ? "yes" : "no";
    const newHistory = [...studentHistory, { key, label, answer }];
    setStudentHistory(newHistory);
    const newAskedKeys = new Set(askedKeys);
    newAskedKeys.add(key);
    setAskedKeys(newAskedKeys);

    const newCandidates = filterCandidates(studentCandidates, key, answer);
    setStudentCandidates(newCandidates);

    speak(label.replace(/[🐾🍽️🥤👕🫀🌈👤🏠🚪🏫🌱✈️💧✋🧤🍬🍊🥦🦊🐾😋💧✏️🍳🌳🟡🔴🟢⭕]/g, ""));
  };

  // ── STUDENT MODE: Guess the word ────
  const handleStudentGuess = () => {
    if (!hiddenWord || !studentGuess.trim()) return;
    const isCorrect = studentGuess.trim().toLowerCase() === hiddenWord.english.toLowerCase();
    setStudentResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      playSuccess();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } else {
      playWrong();
    }
    setPhase("result");
  };

  // ── STUDENT MODE: Show candidates as guess options ────
  const guessOptions = studentCandidates.slice(0, 6).map((c) => getVocabWord(c.id)).filter(Boolean) as VocabWord[];

  const reset = () => {
    setPhase("select-mode");
    setCandidates([...wordAttributeList]);
    setAsked(new Set());
    setCurrentAttr(null);
    setCurrentPhrasing("");
    setHistory([]);
    setAiGuess(null);
    setGuessCorrect(null);
    setIsGuessing(false);
    setNoMoreQuestions(false);
    setHiddenWord(null);
    setStudentHistory([]);
    setStudentCandidates([...wordAttributeList]);
    setStudentGuess("");
    setStudentResult(null);
    setShowReveal(false);
    setAskedKeys(new Set());
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <Link
          href={BACK_URL}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft size={18} />
          Quay lại
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-yellow-400" />
          <span className="font-black text-white text-base tracking-wide">English Akinator</span>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <RefreshCw size={16} />
          Chơi lại
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full">

        {/* ── SELECT MODE ── */}
        {phase === "select-mode" && (
          <div className="w-full space-y-6 text-center">
            <div>
              <div className="text-6xl mb-4">🧞</div>
              <h1 className="text-3xl font-black text-white mb-2">English Akinator</h1>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Trò chơi đoán từ tiếng Anh kiểu Akinator — luyện đọc và đặt câu hỏi!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {/* AI Guesses Mode */}
              <button
                onClick={startAIMode}
                className="group flex flex-col items-center gap-3 rounded-3xl border-2 border-indigo-500/40 bg-indigo-950/60 p-6 hover:border-indigo-400/80 hover:bg-indigo-900/60 transition-all text-left"
              >
                <div className="text-5xl">🧞</div>
                <div>
                  <h2 className="font-black text-white text-lg">AI Đoán Từ</h2>
                  <p className="text-indigo-300 text-xs mt-1 leading-relaxed">
                    Em nghĩ 1 từ bất kỳ. AI sẽ hỏi câu hỏi <strong>tiếng Anh</strong> Yes/No để đoán từ đó.
                  </p>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-indigo-600/40 text-indigo-200 text-xs font-bold">
                    📖 Luyện đọc hiểu câu hỏi
                  </div>
                </div>
              </button>

              {/* Student Guesses Mode */}
              <button
                onClick={startStudentMode}
                className="group flex flex-col items-center gap-3 rounded-3xl border-2 border-emerald-500/40 bg-emerald-950/60 p-6 hover:border-emerald-400/80 hover:bg-emerald-900/60 transition-all text-left"
              >
                <div className="text-5xl">🔍</div>
                <div>
                  <h2 className="font-black text-white text-lg">Em Đoán Từ</h2>
                  <p className="text-emerald-300 text-xs mt-1 leading-relaxed">
                    AI nghĩ 1 từ bí mật. Em hỏi câu hỏi <strong>tiếng Anh</strong> để thu hẹp và đoán từ.
                  </p>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-600/40 text-emerald-200 text-xs font-bold">
                    ✏️ Luyện đặt câu hỏi
                  </div>
                </div>
              </button>
            </div>

            <p className="text-slate-500 text-xs mt-6">
              Từ vựng từ Pre A1 Starters — {wordAttributeList.length} từ
            </p>
          </div>
        )}

        {/* ── THINK PHASE (AI Guesses) ── */}
        {phase === "think" && mode === "ai-guesses" && (
          <div className="w-full text-center space-y-6">
            <div className="text-5xl">🤔</div>
            <h2 className="text-2xl font-black text-white">Hãy nghĩ 1 từ tiếng Anh!</h2>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Chọn bất kỳ từ nào trong wordlist Pre A1 Starters mà em thích. Đừng nói cho AI biết nhé!
            </p>
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto text-sm text-slate-300">
              {[
                "🐱 cat", "🍎 apple", "👕 shirt",
                "👀 eye", "🛏 bed", "📚 book",
              ].map((w) => (
                <div key={w} className="bg-white/5 rounded-xl px-3 py-2 text-center">
                  {w}
                </div>
              ))}
              <div className="col-span-3 text-center text-slate-500 text-xs">...và nhiều từ khác</div>
            </div>
            <button
              onClick={() => {
                setPhase("playing");
                if (currentPhrasing) speak(stripEmoji(currentPhrasing));
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30"
            >
              Tôi đã nghĩ xong! Bắt đầu 🚀
            </button>
          </div>
        )}

        {/* ── PLAYING (AI Guesses) ── */}
        {phase === "playing" && mode === "ai-guesses" && currentAttr && (
          <div className="w-full space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Câu hỏi {history.length + 1}</span>
              <span>Còn {candidates.length} từ có thể</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((history.length / MAX_QUESTIONS) * 100, 100)}%` }}
              />
            </div>

            {/* AI Avatar */}
            <div className="text-center">
              <div className="inline-block text-6xl animate-bounce">🧞</div>
              <p className="text-slate-400 text-xs mt-1">AI đang hỏi...</p>
            </div>

            {/* Question Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="text-center">
                <p className="text-xl font-black text-white leading-tight">
                  {currentPhrasing}
                </p>
                <p className="text-slate-400 text-sm mt-2 italic">
                  {currentAttr ? `(${ATTRIBUTE_HINTS[currentAttr]})` : ""}
                </p>
              </div>
              <button
                onClick={() => speak(stripEmoji(currentPhrasing))}
                className="mx-auto flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition"
              >
                <Volume2 size={16} />
                Nghe lại
              </button>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleAnswer("yes")}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-emerald-600/30 border-2 border-emerald-500/40 hover:bg-emerald-600/50 hover:border-emerald-400/80 transition-all font-black text-emerald-300 hover:scale-105 active:scale-95"
              >
                <span className="text-2xl">✅</span>
                <span className="text-sm">Yes</span>
              </button>
              <button
                onClick={() => handleAnswer("no")}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-rose-600/30 border-2 border-rose-500/40 hover:bg-rose-600/50 hover:border-rose-400/80 transition-all font-black text-rose-300 hover:scale-105 active:scale-95"
              >
                <span className="text-2xl">❌</span>
                <span className="text-sm">No</span>
              </button>
              <button
                onClick={() => handleAnswer("maybe")}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-amber-600/30 border-2 border-amber-500/40 hover:bg-amber-600/50 hover:border-amber-400/80 transition-all font-black text-amber-300 hover:scale-105 active:scale-95"
              >
                <span className="text-2xl">🤔</span>
                <span className="text-sm">Maybe</span>
              </button>
            </div>

            {/* History (last 3) */}
            {history.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Câu đã hỏi:</p>
                {history.slice(-3).map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs bg-white/3 rounded-xl px-3 py-2">
                    <span className="shrink-0 mt-0.5">
                      {h.answer === "yes" ? "✅" : h.answer === "no" ? "❌" : "🤔"}
                    </span>
                    <span className="text-slate-300">{h.question}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PLAYING (Student Guesses) ── */}
        {phase === "playing" && mode === "student-guesses" && hiddenWord && (
          <div className="w-full space-y-5">
            {/* AI avatar */}
            <div className="text-center">
              <div className="inline-block text-5xl">🧞</div>
              <h2 className="text-white font-black text-lg mt-2">AI đang nghĩ 1 từ bí mật...</h2>
              <p className="text-slate-400 text-xs mt-1">
                Hỏi câu hỏi tiếng Anh để đoán từ đó là gì!
              </p>
            </div>

            {/* Remaining candidates hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Brain size={14} className="text-cyan-400" />
              <span>Còn <strong className="text-cyan-400">{studentCandidates.length}</strong> từ có thể là đáp án</span>
            </div>

            {/* Questions to click */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Chọn câu hỏi để hỏi AI:</p>
              <div className="flex flex-wrap gap-2">
                {STUDENT_QUESTION_TEMPLATES.filter((q) => !askedKeys.has(q.key)).slice(0, 12).map((q) => (
                  <button
                    key={q.key}
                    onClick={() => handleStudentQuestion(q.key, q.label)}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-900/50 hover:border-indigo-400/50 text-sm text-slate-300 hover:text-white transition-all"
                  >
                    {q.label}
                  </button>
                ))}
                {STUDENT_QUESTION_TEMPLATES.filter((q) => !askedKeys.has(q.key)).length === 0 && (
                  <p className="text-slate-500 text-xs">Đã hỏi hết câu hỏi!</p>
                )}
              </div>
            </div>

            {/* History */}
            {studentHistory.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Câu trả lời của AI:</p>
                {studentHistory.slice().reverse().map((h, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 text-xs rounded-xl px-3 py-2 border ${
                      h.answer === "yes"
                        ? "bg-emerald-950/50 border-emerald-700/30 text-emerald-300"
                        : "bg-rose-950/50 border-rose-700/30 text-rose-300"
                    }`}
                  >
                    <span>{h.answer === "yes" ? "✅ Yes!" : "❌ No!"}</span>
                    <span>{h.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Guess section */}
            {studentHistory.length >= 2 && (
              <div className="space-y-3 border-t border-white/10 pt-4">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Đoán thử! Gõ từ tiếng Anh:
                </p>

                {/* Quick guess buttons from candidates */}
                {guessOptions.length > 0 && guessOptions.length <= 8 && (
                  <div className="flex flex-wrap gap-2">
                    {guessOptions.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setStudentGuess(w.english)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all border ${
                          studentGuess === w.english
                            ? "bg-indigo-600 border-indigo-400 text-white"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-indigo-400/50"
                        }`}
                      >
                        {w.emoji && <span className="mr-1">{w.emoji}</span>}
                        {w.english}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studentGuess}
                    onChange={(e) => setStudentGuess(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStudentGuess()}
                    placeholder="Type your guess..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400/60"
                  />
                  <button
                    onClick={handleStudentGuess}
                    disabled={!studentGuess.trim()}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-black px-5 py-3 rounded-xl transition-all"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT (AI Guesses) ── */}
        {phase === "result" && mode === "ai-guesses" && aiGuess && (
          <div className="w-full text-center space-y-6">
            {guessCorrect === null ? (
              <>
                <div className="text-6xl animate-pulse">🧞</div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
                  <p className="text-slate-400 text-sm">AI nghĩ từ của em là...</p>
                  <div className="text-7xl">{aiGuess.emoji || "❓"}</div>
                  <p className="text-4xl font-black text-white">{aiGuess.english}</p>
                  <p className="text-slate-400 text-lg">({aiGuess.vietnamese})</p>
                  <p className="text-white font-black text-xl mt-4">Is it a <span className="text-yellow-400">{aiGuess.english}</span>?</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleGuessResult(true)}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-600/40 border-2 border-emerald-500 hover:bg-emerald-600/60 transition-all font-black text-emerald-300 text-lg hover:scale-105 active:scale-95"
                  >
                    <Check size={22} />
                    Yes, correct! 🎉
                  </button>
                  <button
                    onClick={() => handleGuessResult(false)}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-rose-600/40 border-2 border-rose-500 hover:bg-rose-600/60 transition-all font-black text-rose-300 text-lg hover:scale-105 active:scale-95"
                  >
                    <X size={22} />
                    No, wrong! 😅
                  </button>
                </div>

                <p className="text-slate-500 text-xs">
                  Sau {history.length} câu hỏi · Còn {candidates.length > 0 ? candidates.length : 1} ứng cử viên
                </p>
              </>
            ) : (
              <>
                {guessCorrect ? (
                  <div className="space-y-4">
                    <div className="text-6xl">🎉</div>
                    <h2 className="text-2xl font-black text-emerald-400">AI đoán đúng!</h2>
                    <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6">
                      <div className="text-5xl mb-3">{aiGuess.emoji || "🏆"}</div>
                      <p className="text-3xl font-black text-white">{aiGuess.english}</p>
                      <p className="text-slate-400 mt-1">{aiGuess.vietnamese}</p>
                    </div>
                    <p className="text-slate-400 text-sm">
                      AI dùng {history.length} câu hỏi để đoán đúng! 🧠
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-6xl">😅</div>
                    <h2 className="text-2xl font-black text-slate-300">AI thua rồi!</h2>
                    <p className="text-slate-400 text-sm">Từ của em là gì vậy? (Có thể từ đó chưa có trong database!)</p>
                  </div>
                )}

                {/* Question history review */}
                <div className="space-y-2 text-left">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Câu hỏi AI đã hỏi:</p>
                  <div className="max-h-48 overflow-y-auto space-y-1.5">
                    {history.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs bg-white/3 rounded-xl px-3 py-2">
                        <span className="text-slate-500 w-5 shrink-0">{i + 1}.</span>
                        <span className="flex-1 text-slate-300">{h.question}</span>
                        <span>{h.answer === "yes" ? "✅" : h.answer === "no" ? "❌" : "🤔"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── RESULT (Student Guesses) ── */}
        {phase === "result" && mode === "student-guesses" && hiddenWord && (
          <div className="w-full text-center space-y-6">
            {studentResult === "correct" ? (
              <>
                <div className="text-6xl">🎉</div>
                <h2 className="text-2xl font-black text-emerald-400">Đúng rồi!</h2>
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6">
                  <div className="text-5xl mb-3">{hiddenWord.emoji || "🏆"}</div>
                  <p className="text-3xl font-black text-white">{hiddenWord.english}</p>
                  <p className="text-slate-400 mt-1">{hiddenWord.vietnamese}</p>
                </div>
                <p className="text-slate-400 text-sm">
                  Em dùng {studentHistory.length} câu hỏi để đoán đúng! 🧠
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl">😅</div>
                <h2 className="text-2xl font-black text-rose-400">Chưa đúng!</h2>
                {!showReveal ? (
                  <div className="space-y-4">
                    <p className="text-slate-400 text-sm">Em muốn thử lại hay xem đáp án?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setPhase("playing");
                          setStudentResult(null);
                          setStudentGuess("");
                        }}
                        className="py-3 rounded-2xl bg-indigo-600/40 border border-indigo-500 text-indigo-300 font-bold text-sm hover:bg-indigo-600/60 transition"
                      >
                        🔄 Thử lại
                      </button>
                      <button
                        onClick={() => setShowReveal(true)}
                        className="py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/10 transition"
                      >
                        🔮 Xem đáp án
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <p className="text-slate-400 text-sm mb-3">Từ bí mật là:</p>
                    <div className="text-5xl mb-3">{hiddenWord.emoji || "❓"}</div>
                    <p className="text-3xl font-black text-white">{hiddenWord.english}</p>
                    <p className="text-slate-400 mt-1">{hiddenWord.vietnamese}</p>
                  </div>
                )}
              </>
            )}

            {/* Question history review */}
            {studentHistory.length > 0 && (
              <div className="space-y-2 text-left">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Câu hỏi em đã hỏi:</p>
                <div className="max-h-40 overflow-y-auto space-y-1.5">
                  {studentHistory.map((h, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 text-xs rounded-xl px-3 py-2 border ${
                        h.answer === "yes"
                          ? "bg-emerald-950/50 border-emerald-700/30 text-emerald-300"
                          : "bg-rose-950/50 border-rose-700/30 text-rose-300"
                      }`}
                    >
                      <span className="w-5 shrink-0 text-slate-500">{i + 1}.</span>
                      <span className="flex-1">{h.label}</span>
                      <span>{h.answer === "yes" ? "✅ Yes" : "❌ No"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Play Again Button (shown in result phase) */}
        {phase === "result" && (guessCorrect !== null || studentResult !== null || (phase === "result" && mode === "student-guesses" && showReveal)) && (
          <div className="mt-6 flex gap-3 flex-wrap justify-center">
            <button
              onClick={mode === "ai-guesses" ? startAIMode : startStudentMode}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30"
            >
              🔄 Chơi tiếp
            </button>
            <button
              onClick={reset}
              className="bg-white/10 hover:bg-white/20 text-white font-black px-6 py-3 rounded-2xl transition-all"
            >
              🏠 Chọn chế độ khác
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
