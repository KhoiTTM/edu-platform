"use client";

import { useState, useRef, useEffect } from "react";
import { BookOpen, Search, X, Loader2, Sparkles, Languages, ChevronDown, RotateCcw, Zap } from "lucide-react";

type SearchHistory = {
  query: string;
  result: string;
  timestamp: string;
  mode?: "quick" | "ai";
};

export function DictionaryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [mode, setMode] = useState<"quick" | "ai">("quick");
  const resultRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("edu_dict_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveHistory = (newHistory: SearchHistory[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("edu_dict_history", JSON.stringify(newHistory));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = async (e?: React.FormEvent, searchWord?: string, forcedMode?: "quick" | "ai") => {
    if (e) e.preventDefault();
    
    const wordToSearch = searchWord || query;
    if (!wordToSearch.trim()) return;

    const currentMode = forcedMode || mode;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (currentMode === "quick") {
        // Quick offline-like translation via Google Translate client API (no AI, sub-100ms)
        const vnChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i;
        const isVietnamese = vnChars.test(wordToSearch);
        const targetLang = isVietnamese ? "en" : "vi";

        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(wordToSearch)}`
        );
        if (!res.ok) throw new Error("Không thể kết nối đến máy chủ từ điển nhanh");
        
        const json = await res.json();
        const translated = json[0].map((item: any) => item[0]).join("");

        const formattedResult = `**Từ tra cứu:** ${wordToSearch}\n\n**Nghĩa dịch nhanh:**\n👉 ${translated}`;
        setResult(formattedResult);

        // Save into history
        const timestamp = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        const updatedHistory = [
          { query: wordToSearch, result: formattedResult, timestamp, mode: "quick" as const },
          ...history.filter(h => h.query.toLowerCase() !== wordToSearch.toLowerCase())
        ].slice(0, 10);
        saveHistory(updatedHistory);
      } else {
        // AI smart lookup
        const res = await fetch("/api/ai/dictionary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: wordToSearch }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Có lỗi xảy ra");

        setResult(data.text);
        
        // Save into history
        const timestamp = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        const updatedHistory = [
          { query: wordToSearch, result: data.text, timestamp, mode: "ai" as const },
          ...history.filter(h => h.query.toLowerCase() !== wordToSearch.toLowerCase())
        ].slice(0, 10);
        
        saveHistory(updatedHistory);
      }
      if (!searchWord) setQuery("");
    } catch (err: any) {
      setError(err.message || "Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
      // Scroll result into view
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  };

  const handleSearchRef = useRef(handleSearch);
  useEffect(() => {
    handleSearchRef.current = handleSearch;
  });

  // Double-click word lookup listener
  useEffect(() => {
    const handleDblClick = () => {
      const selection = window.getSelection();
      const text = selection ? selection.toString().trim() : "";
      // Limit to single words or very short phrases (less than 40 characters)
      if (text && text.length > 0 && text.length < 40) {
        // Strip out punctuation at the start or end of the selection
        const cleanWord = text.replace(/^[.,\/#!$%\^&\*;:{}=\-_`~()?"'“‘”’]+|[.,\/#!$%\^&\*;:{}=\-_`~()?"'“‘”’]+$/g, "");
        if (cleanWord) {
          setIsOpen(true);
          setQuery(cleanWord);
          handleSearchRef.current(undefined, cleanWord, "quick");
        }
      }
    };

    document.addEventListener("dblclick", handleDblClick);
    return () => {
      document.removeEventListener("dblclick", handleDblClick);
    };
  }, []);

  const clearHistory = () => {
    saveHistory([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Dictionary Panel */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-2xl shadow-sky-500/10 backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-slate-950/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                <Languages size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Tra từ nhanh</h3>
                <p className="text-[10px] text-slate-500">Anh - Việt / Việt - Anh</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-surface-raised hover:text-white transition"
              title="Thu nhỏ"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[420px] overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {/* Mode selection tabs */}
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-line">
              <button
                type="button"
                onClick={() => {
                  setMode("quick");
                  setResult(null);
                  setError(null);
                }}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-center text-xs font-semibold transition ${
                  mode === "quick"
                    ? "bg-surface-raised text-sky-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Zap size={12} />
                Tra nhanh
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("ai");
                  setResult(null);
                  setError(null);
                }}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-center text-xs font-semibold transition ${
                  mode === "ai"
                    ? "bg-surface-raised text-sky-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Sparkles size={12} />
                Giải nghĩa AI
              </button>
            </div>

            {/* Search Input Form */}
            <form onSubmit={(e) => handleSearch(e)} className="relative flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={mode === "quick" ? "Gõ từ cần dịch nhanh..." : "Nhờ AI giải thích chi tiết từ..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-xl border border-line bg-slate-950 py-2.5 pl-3 pr-10 text-sm text-slate-200 placeholder-slate-600 outline-none ring-offset-slate-900 transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:text-sky-400 disabled:opacity-50 transition"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Quick history toggle */}
            {history.length > 0 && (
              <div className="border-t border-line/50 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-sky-400 transition"
                >
                  Lịch sử tra cứu ({history.length})
                  <ChevronDown size={12} className={`transition-transform duration-200 ${showHistory ? "rotate-180" : ""}`} />
                </button>
                {showHistory && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto scrollbar-thin py-1">
                    {history.map((h, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setQuery(h.query);
                          if (h.mode) setMode(h.mode);
                          handleSearch(undefined, h.query, h.mode);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-950 border border-line/80 px-2 py-1 text-xs text-slate-400 hover:border-sky-500/40 hover:text-sky-400 transition"
                      >
                        {h.query}
                        <span className="text-[8px] text-slate-600">({h.mode === "ai" ? "AI" : "Nhanh"})</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={clearHistory}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-950/20 border border-red-900/30 px-2 py-1 text-xs text-red-400 hover:bg-red-900/40 transition ml-auto"
                      title="Xóa lịch sử"
                    >
                      <RotateCcw size={10} />
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Loading Placeholder */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-10 space-y-2">
                <Loader2 className="animate-spin text-sky-500" size={28} />
                <p className="text-xs text-slate-500">Đang tra cứu từ điển...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-900/30 bg-red-950/20 p-3 text-xs text-red-400">
                {error}
              </div>
            )}

            {/* Dictionary Result */}
            {result && (
              <div
                ref={resultRef}
                className="rounded-xl border border-line bg-slate-950 p-4 shadow-inner space-y-2 animate-in fade-in"
              >
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                  {mode === "quick" ? <Zap size={10} /> : <Sparkles size={10} />} 
                  {mode === "quick" ? "Kết quả dịch nhanh" : "Phản hồi từ điển AI"}
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {result}
                </div>
              </div>
            )}

            {/* Welcome view when empty */}
            {!result && !loading && !error && (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 text-slate-500 space-y-2">
                <BookOpen size={36} className="text-slate-700 animate-pulse" />
                <p className="text-xs font-semibold text-slate-400">
                  {mode === "quick" ? "Gõ từ dịch siêu tốc" : "Tra từ thông minh với AI"}
                </p>
                <p className="text-[10px] text-slate-600">
                  {mode === "quick" 
                    ? "Dịch nhanh từ tiếng Anh sang tiếng Việt hoặc ngược lại trong nháy mắt!"
                    : "Học sinh gõ từ vựng để AI giải thích ngộ nghĩnh, cung cấp phát âm và ví dụ đáng yêu!"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-surface-raised ring-2 ring-slate-700 shadow-slate-950/50"
            : "hover:bg-sky-500 shadow-sky-500/20 hover:shadow-sky-500/40"
        }`}
        title="Từ điển Anh - Việt"
      >
        {isOpen ? <X size={24} /> : <BookOpen size={24} />}
      </button>
    </div>
  );
}
