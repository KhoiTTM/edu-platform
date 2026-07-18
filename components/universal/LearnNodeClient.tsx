"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, Home, Layout, BookOpen, Trophy, ArrowRight, Loader2, Sparkles, Award, CheckCircle2, XCircle, HelpCircle, FileText, Copy, Terminal, Compass, Check } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";

// ── Lazy-loaded heavy components (code-split, not in initial JS bundle) ─────
const AssessmentRenderer = dynamic(
  () => import('./AssessmentRenderer').then(m => ({ default: m.AssessmentRenderer })),
  { ssr: false, loading: () => <div className="flex items-center justify-center p-16"><Loader2 className="animate-spin text-sky-500" size={32} /></div> }
);
const AssessmentResultCard = dynamic(
  () => import('../assessment/AssessmentResultCard').then(m => ({ default: m.AssessmentResultCard })),
  { ssr: false }
);
const WorkbookAnswerSheet = dynamic(
  () => import('./WorkbookAnswerSheet').then(m => ({ default: m.WorkbookAnswerSheet })),
  { ssr: false, loading: () => <div className="flex items-center justify-center p-10"><Loader2 className="animate-spin text-emerald-500" size={28} /></div> }
);
const CurriculumMap = dynamic(
  () => import('./CurriculumMap').then(m => ({ default: m.CurriculumMap })),
  { ssr: false, loading: () => <div className="flex items-center justify-center p-10"><Loader2 className="animate-spin text-indigo-500" size={28} /></div> }
);
const TiengVietLessonView = dynamic(
  () => import('./TiengVietLessonView').then(m => ({ default: m.TiengVietLessonView })),
  { ssr: false, loading: () => <div className="flex items-center justify-center p-10"><Loader2 className="animate-spin text-amber-500" size={28} /></div> }
);
const AITeacherChat = dynamic(
  () => import('@/components/learning/AITeacherChat'),
  { ssr: false, loading: () => <div className="flex items-center justify-center p-6"><Loader2 className="animate-spin text-rose-400" size={24} /></div> }
);
// ─────────────────────────────────────────────────────────────────────────────

interface LearnNodeClientProps {
  node: {
    id: string;
    title: string;
    slug: string;
    path: string;
    type: string;
    metadata: any;
  };
  breadcrumbs: { title: string; slug: string; path: string }[];
  subjectSlug: string;
  conceptId?: string;
  childNodes?: { id: string; title: string; slug: string; type: string }[];
}

function GrammarTutorialRenderer({ content }: { content: string }) {
  const [activeTab, setActiveTab] = useState(1);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  if (!content) return <p className="text-slate-500 italic">Bài học này chưa có nội dung hướng dẫn từ AI.</p>;

  // Helper to format inline tags (**bold**, *italic*, `code`, and $math$)
  const formatText = (text: string) => {
    let formatted = text
      .replace(/\$([^\$]+)\$/g, (match, p1) => {
        let math = p1
          // Fractions \frac{A}{B}
          .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="inline-flex flex-col text-center align-middle mx-0.5"><span class="border-b border-current px-0.5 text-[11px] leading-none pb-0.5">$1</span><span class="text-[11px] leading-none pt-0.5">$2</span></span>')
          // Geometry & Trig symbols
          .replace(/\\widehat\{([^{}]+)\}/g, '∠$1')
          .replace(/\\circ/g, '°')
          .replace(/\\parallel/g, '∥')
          .replace(/\\perp/g, '⊥')
          // Symbols
          .replace(/\\in/g, '∈')
          .replace(/\\neq/g, '≠')
          .replace(/\\mathbb\{Z\}/g, 'ℤ')
          .replace(/\\mathbb\{Q\}/g, 'ℚ')
          .replace(/\\mathbb\{R\}/g, 'ℝ')
          .replace(/\\mathbb\{N\}/g, 'ℕ')
          .replace(/\\mathbb\{C\}/g, 'ℂ')
          .replace(/\\notin/g, '∉')
          .replace(/\\subset/g, '⊂')
          .replace(/\\supset/g, '⊃')
          .replace(/\\cap/g, '∩')
          .replace(/\\cup/g, '∪')
          .replace(/\\le/g, '≤')
          .replace(/\\ge/g, '≥')
          .replace(/\\times/g, '×')
          .replace(/\\div/g, '÷')
          .replace(/\\approx/g, '≈')
          .replace(/\\pm/g, '±')
          .replace(/\\infty/g, '∞')
          // Subscripts & Superscripts
          .replace(/\^\{?([^\{\}]+)\}?/g, '<sup>$1</sup>')
          .replace(/_\{?([^\{\}]+)\}?/g, '<sub>$1</sub>');

        return `<span class="font-mono text-amber-300 bg-amber-500/5 px-1 py-0.5 rounded border border-amber-500/10 italic">${math}</span>`;
      })
      .replace(/`([^`]+)`/g, '<code class="bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded px-1.5 py-0.5 font-mono text-[13px]">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-extrabold">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<span class="text-amber-400 font-medium italic">$1</span>');
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  // Parse the content by section
  const titleMatch = content.match(/^###\s+([^\n]+)/);
  const mainTitle = titleMatch ? titleMatch[1] : "Hướng dẫn Ngữ pháp & Từ vựng";

  const parts = content.split(/####\s+(\d+)\.\s*/);
  const sections: { index: number; title: string; content: string }[] = [];

  for (let i = 1; i < parts.length; i += 2) {
    const index = parseInt(parts[i], 10);
    const bodyText = parts[i + 1] || "";
    const firstLineEnd = bodyText.indexOf('\n');
    let title = "";
    let body = "";
    if (firstLineEnd !== -1) {
      title = bodyText.substring(0, firstLineEnd).trim();
      body = bodyText.substring(firstLineEnd).trim();
    } else {
      title = bodyText.trim();
    }
    sections.push({ index, title, content: body });
  }

  // Define tab icons
  const tabIcons: Record<number, React.ReactNode> = {
    1: <Sparkles className="w-4 h-4" />,
    2: <BookOpen className="w-4 h-4" />,
    3: <Compass className="w-4 h-4" />,
    4: <HelpCircle className="w-4 h-4" />,
    5: <Award className="w-4 h-4" />,
  };

  // Extract the current active section
  const currentSection = sections.find(s => s.index === activeTab) || sections[0];

  const handleCopyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  // Render Section Content helper
  const renderSectionContent = (sec: typeof currentSection) => {
    if (!sec) return null;

    const blocks = sec.content.split('\n\n');

    if (sec.index === 1) {
      // INTRO TAB: Large card style containing rich formatting
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-950/10 via-slate-900/60 to-slate-950/80 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[80px] pointer-events-none" />
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Sparkles size={24} className="animate-pulse" />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-xl font-bold text-white tracking-tight">{sec.title}</h3>
                <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-4">
                  {blocks.map((block, bidx) => {
                    const trimmed = block.trim();
                    if (!trimmed || trimmed === "---") return null;

                    // Support lists in intro card
                    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                      const items = trimmed.split('\n').map(item => {
                        const line = item.replace(/^[\-\*\s]+/, '').trim();
                        const matchParts = line.match(/^\*\*([^*]+)\*\*:\s*(.*)/);
                        if (matchParts) {
                          return { key: matchParts[1], val: matchParts[2] };
                        }
                        return { key: "", val: line };
                      });
                      return (
                        <div key={bidx} className="grid gap-3 sm:grid-cols-2 my-2">
                          {items.map((item, iidx) => (
                            <div key={iidx} className="p-3.5 rounded-2xl border border-line bg-slate-950/40 shadow-sm flex flex-col gap-1 hover:border-rose-500/10 transition">
                              {item.key && (
                                <span className="text-[11px] font-black text-rose-300">
                                  {item.key}
                                </span>
                              )}
                              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                                {formatText(item.val)}
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    }

                    // Support blockquotes in intro card
                    if (trimmed.startsWith('> ')) {
                      const lines = trimmed.split('\n').map(l => l.replace(/^>\s*/, '').replace(/`/g, '').trim()).filter(Boolean);
                      return (
                        <div key={bidx} className="my-3 rounded-2xl border border-line bg-slate-950/60 overflow-hidden shadow-lg">
                          <div className="p-4 font-mono text-xs text-amber-300 space-y-1.5 bg-gradient-to-r from-slate-950 via-slate-900/30 to-slate-950">
                            {lines.map((line, lidx) => (
                              <p key={lidx} className="flex gap-2 leading-relaxed">
                                <span className="text-rose-500/50 select-none">&gt;</span>
                                {formatText(line)}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return <p key={bidx}>{formatText(trimmed)}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (sec.index === 2) {
      // CORE KNOWLEDGE TAB: Grid cards for lists + formatted code block for formulas
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {blocks.map((block, bidx) => {
            const trimmed = block.trim();
            if (!trimmed || trimmed === "---") return null;

            // Subheadings: #####
            if (trimmed.startsWith('##### ')) {
              return (
                <h4 key={bidx} className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-100 flex items-center gap-2 mt-6 first:mt-0">
                  <span className="h-3 w-1 bg-rose-500 rounded-full" />
                  {trimmed.replace(/^#+\s+/, '')}
                </h4>
              );
            }

            // Formulas: > blockquotes
            if (trimmed.startsWith('> ')) {
              const lines = trimmed.split('\n').map(l => l.replace(/^>\s*/, '').replace(/`/g, '').trim()).filter(Boolean);
              return (
                <div key={bidx} className="my-4 rounded-2xl border border-line bg-slate-950/60 overflow-hidden shadow-lg">
                  <div className="bg-surface px-4 py-2 border-b border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 uppercase font-bold">
                      <Terminal size={12} className="text-rose-500" /> Công thức cấu trúc
                    </span>
                    <button 
                      onClick={() => handleCopyFormula(lines.join('\n'))}
                      className="text-[10px] font-bold text-slate-400 hover:text-white transition flex items-center gap-1"
                    >
                      {copiedFormula === lines.join('\n') ? "✓ Đã copy" : "Copy"}
                    </button>
                  </div>
                  <div className="p-5 font-mono text-xs md:text-sm text-amber-300 space-y-2 bg-gradient-to-r from-slate-950 via-slate-900/50 to-slate-950">
                    {lines.map((line, lidx) => (
                      <p key={lidx} className="flex gap-2">
                        <span className="text-rose-500/50 select-none">&gt;</span>
                        {formatText(line)}
                      </p>
                    ))}
                  </div>
                </div>
              );
            }

            // Bullet Lists (Items & Vocabulary Cards)
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').map(item => {
                const line = item.replace(/^[\-\*\s]+/, '').trim();
                // Match pattern "**Key**: Value"
                const matchParts = line.match(/^\*\*([^*]+)\*\*:\s*(.*)/);
                if (matchParts) {
                  return { key: matchParts[1], val: matchParts[2] };
                }
                return { key: "", val: line };
              });

              return (
                <div key={bidx} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, iidx) => (
                    <div key={iidx} className="p-4 rounded-2xl border border-slate-850 bg-gradient-to-b from-slate-900/50 to-slate-950/40 hover:border-rose-500/20 hover:from-slate-900/80 hover:to-slate-950/60 shadow transition-all duration-300 group flex flex-col justify-between gap-1.5">
                      <span className="text-xs font-black text-rose-300 group-hover:text-rose-400 transition-colors">
                        {item.key || 'Tiêu điểm'}
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        {formatText(item.val)}
                      </p>
                    </div>
                  ))}
                </div>
              );
            }

            // Standard paragraphs
            return (
              <p key={bidx} className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                {formatText(trimmed)}
              </p>
            );
          })}
        </div>
      );
    }

    if (sec.index === 3) {
      // DETAILED USAGE TAB: Clean breakdown cards
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {blocks.map((block, bidx) => {
            const trimmed = block.trim();
            if (!trimmed || trimmed === "---") return null;

            // Check if it is a list
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').map(item => item.replace(/^[\-\*\s]+/, '').trim());
              return (
                <div key={bidx} className="space-y-3">
                  {items.map((item, iidx) => (
                    <div key={iidx} className="flex gap-3 items-start bg-slate-950/40 border border-slate-850 p-4 rounded-xl text-slate-300 text-xs md:text-sm shadow-inner">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
                        {iidx + 1}
                      </div>
                      <div className="leading-relaxed">{formatText(item)}</div>
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div key={bidx} className="p-4 rounded-2xl bg-surface/30 border border-slate-850/60 text-xs md:text-sm text-slate-300 leading-relaxed">
                {formatText(trimmed)}
              </div>
            );
          })}
        </div>
      );
    }

    if (sec.index === 4) {
      // EXAMPLES TAB: Beautiful side-by-side Correct/Incorrect cards
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-xs text-slate-400">Xem kĩ các ví dụ thực tế dưới đây để tránh các lỗi sai kinh điển khi thi IELTS:</p>
          <div className="grid gap-4 md:grid-cols-2">
            {blocks.map((block, bidx) => {
              const lines = block.trim().split('\n');
              return lines.map((line, lidx) => {
                const lineTrim = line.trim();
                if (!lineTrim || lineTrim === "---") return null;

                const isCorrect = lineTrim.startsWith('* ✓') || lineTrim.startsWith('✓') || lineTrim.includes('✓') || lineTrim.toLowerCase().includes('đúng:');
                const isIncorrect = lineTrim.startsWith('* ✗') || lineTrim.startsWith('✗') || lineTrim.includes('✗') || lineTrim.toLowerCase().includes('sai:');

                if (isCorrect) {
                  return (
                    <div key={`${bidx}-${lidx}`} className="flex flex-col gap-2 bg-emerald-950/10 border border-emerald-500/20 p-5 rounded-2xl shadow hover:bg-emerald-950/20 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px]">✓</span>
                        <span className="text-[10px] font-black text-emerald-400 tracking-wider uppercase">Cấu trúc khuyên dùng (Correct)</span>
                      </div>
                      <div className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed">
                        {formatText(lineTrim.replace(/^[\*\s✓✗]+/, '').replace(/^Đúng:\s*/i, ''))}
                      </div>
                    </div>
                  );
                }

                if (isIncorrect) {
                  return (
                    <div key={`${bidx}-${lidx}`} className="flex flex-col gap-2 bg-rose-950/10 border border-rose-500/20 p-5 rounded-2xl shadow hover:bg-rose-950/20 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-extrabold text-[10px]">✗</span>
                        <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase">Lỗi sai thường gặp (Incorrect)</span>
                      </div>
                      <div className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed">
                        {formatText(lineTrim.replace(/^[\*\s✓✗]+/, '').replace(/^Sai:\s*/i, ''))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={`${bidx}-${lidx}`} className="md:col-span-2 bg-slate-950/30 border border-slate-850 p-4 rounded-xl text-xs text-slate-400 leading-relaxed italic">
                    {formatText(lineTrim.replace(/^[\*\s]+/, ''))}
                  </div>
                );
              });
            })}
          </div>
        </div>
      );
    }

    if (sec.index === 5) {
      // SUMMARY/TAKEAWAY TAB: Modern checklist design
      return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {blocks.map((block, bidx) => {
            const trimmed = block.trim();
            if (!trimmed || trimmed === "---") return null;

            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').map(item => item.replace(/^[\-\*\s]+/, '').trim());
              return (
                <div key={bidx} className="grid gap-3">
                  {items.map((item, iidx) => (
                    <div key={iidx} className="flex gap-3 items-center bg-gradient-to-r from-rose-950/20 to-slate-950/40 border border-slate-850 p-4 rounded-2xl shadow-sm hover:border-rose-500/20 transition-all duration-300">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white font-bold text-xs shadow-md shadow-rose-500/25">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <div className="text-xs md:text-sm text-slate-200 font-bold leading-relaxed">{formatText(item)}</div>
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <p key={bidx} className="text-xs md:text-sm text-slate-400 leading-relaxed italic text-center">
                {formatText(trimmed)}
              </p>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-850 flex items-center justify-between">
        <span className="text-[11px] font-black text-rose-400 tracking-widest uppercase">Giáo trình Tích hợp</span>
        <span className="text-[10px] text-slate-500 font-semibold">{mainTitle}</span>
      </div>

      {/* Modern Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-850 pb-3">
        {sections.map((sec) => (
          <button
            key={sec.index}
            onClick={() => setActiveTab(sec.index)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 relative ${
              activeTab === sec.index
                ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20 scale-[1.02]"
                : "bg-slate-950/60 border border-slate-850 text-slate-400 hover:text-white hover:border-line"
            }`}
          >
            {tabIcons[sec.index]}
            <span>{sec.title.split('(')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Tab Panel Content Container */}
      <div className="min-h-[300px]">
        {renderSectionContent(currentSection)}
      </div>
    </div>
  );
}

export function LearnNodeClient({ 
  node, 
  breadcrumbs, 
  subjectSlug, 
  conceptId, 
  childNodes 
}: LearnNodeClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const backSlug = breadcrumbs.find(b => b.path.split('.').length === 2)?.slug || 
                   (breadcrumbs.length > 0 ? breadcrumbs[0].slug : '');

  // Check if it is an English subject supporting speaking (tieng-anh-3, mindset-foundation, ielts)
  let unitNum = 1;
  if (node.title) {
    const titleUnitMatch = node.title.match(/U(\d+)/i);
    if (titleUnitMatch) {
      unitNum = parseInt(titleUnitMatch[1], 10);
    } else {
      const unitMatch = node.slug ? node.slug.match(/(unit-\d+)/i) : null;
      const unitId = unitMatch ? unitMatch[1].toLowerCase() : null;
      unitNum = unitId ? parseInt(unitId.split('-')[1], 10) : 1;
    }
  }
  
  const lessonSlug = node.slug;
  const courseSlug = (node as any).content_sources?.slug || 
                     (node.slug ? node.slug.match(/^([a-z0-9-]+)-(unit-\d+)/i)?.[1] : null);

  const hasSpeaking = !!(courseSlug && lessonSlug && (
    courseSlug.includes('tieng-anh') || 
    courseSlug.includes('mindset') || 
    courseSlug.includes('ielts') || 
    subjectSlug.includes('tieng_anh') || 
    subjectSlug.includes('ielts')
  ));

  const [isGrammarFocus] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('focus') === 'grammar';
    }
    return false;
  });

  const isGrammar = isGrammarFocus ||
                    node.metadata?.skill_focus === 'grammar' ||
                    (subjectSlug === 'tieng_viet' && node.type === 'lesson') ||
                    (node.title && /grammar|ngữ pháp|vocabulary|từ vựng/i.test(node.title));

  const isExam = node.type === 'exam';

  const [currentPart, setCurrentPart] = useState<'video' | 'ai-tutorial' | 'practice' | 'quiz'>(
    isGrammar ? 'ai-tutorial' : (isExam ? 'quiz' : 'video')
  );
  
  const [completed, setCompleted] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(true);
  const [studentName, setStudentName] = useState("Học sinh");
  const [activeSubView, setActiveSubView] = useState<'hub' | 'theory' | 'quiz' | 'warmup' | 'book-work'>('hub');
  const [warmupQuizSession, setWarmupQuizSession] = useState<any>(null);
  const [warmupCompleted, setWarmupCompleted] = useState<boolean>(false);
  const [bookCompleted, setBookCompleted] = useState<boolean>(false);
  const [chatGptPromptCopied, setChatGptPromptCopied] = useState<boolean>(false);
  const [handcraftedExams, setHandcraftedExams] = useState<any[]>([]);
  const [isFetchingHandcrafted, setIsFetchingHandcrafted] = useState<boolean>(true);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string>("");
  const [isPickingRandom, setIsPickingRandom] = useState<boolean>(false);

  const handleRandomExam = async () => {
    if (handcraftedExams.length === 0) return;
    setIsPickingRandom(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsPickingRandom(false);
        return;
      }

      // Fetch all attempts for this user
      const { data: sessions } = await supabase
        .from('learning_sessions')
        .select('summary_metrics')
        .eq('user_id', user.id);

      const attemptsMap: Record<string, number> = {};
      sessions?.forEach((s: any) => {
        const metrics = s.summary_metrics as any;
        if (metrics && metrics.type === 'exam' && metrics.exam_id) {
          attemptsMap[metrics.exam_id] = (attemptsMap[metrics.exam_id] || 0) + 1;
        }
      });

      // Classify exams
      const unattempted = handcraftedExams.filter(exam => !attemptsMap[exam.id]);
      
      let selectedExam;
      if (unattempted.length > 0) {
        // Pick a random unattempted exam
        const randomIndex = Math.floor(Math.random() * unattempted.length);
        selectedExam = unattempted[randomIndex];
      } else {
        // Find minimum attempt count
        let minAttempts = Infinity;
        handcraftedExams.forEach(exam => {
          const count = attemptsMap[exam.id] || 0;
          if (count < minAttempts) {
            minAttempts = count;
          }
        });

        // Filter exams with minimum attempts
        const candidateExams = handcraftedExams.filter(exam => (attemptsMap[exam.id] || 0) === minAttempts);
        const randomIndex = Math.floor(Math.random() * candidateExams.length);
        selectedExam = candidateExams[randomIndex];
      }

      if (selectedExam) {
        router.push(`/test-assessment?examId=${selectedExam.id}`);
      }
    } catch (err) {
      console.error("Error picking random exam:", err);
    } finally {
      setIsPickingRandom(false);
    }
  };


  useEffect(() => {
    if (node.metadata?.videos && node.metadata.videos.length > 0) {
      setActiveVideoId(node.metadata.videos[0].youtube_id);
    } else {
      setActiveVideoId(node.metadata?.youtube_id || "");
    }
  }, [node.id, node.metadata]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase.from('learning_events').select('metadata').eq('user_id', user.id).eq('event_type', 'lesson_visited');
        if (data) {
           const slugs = data.map(d => {
             if (d.metadata?.slug) return d.metadata.slug;
             if (d.metadata?.url) {
               const parts = d.metadata.url.split('/');
               return parts[parts.length - 1];
             }
             return null;
           }).filter(Boolean);
           const examsStr = localStorage.getItem('completed_exams');
           const exams = examsStr ? JSON.parse(examsStr) : [];
           setCompletedNodes([...new Set([...slugs, ...exams])]);
        }
      } catch (e) {}
    };
    fetchCompleted();
  }, []);

  const lessonSessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Fire tracking event for lesson visited (marks the start of the session)
    if (!node || !subjectSlug) return;
    if (node.type !== 'lesson' && node.type !== 'grammar') return;

    const sessionId =
      typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${node.id}_${Date.now()}`;
    lessonSessionIdRef.current = sessionId;

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'lesson_visited',
        subject_slug: subjectSlug,
        session_id: sessionId,
        metadata: {
          title: node.title,
          url: window.location.pathname
        }
      })
    }).catch(console.error);

    const sendExitEvent = () => {
      const sid = lessonSessionIdRef.current;
      if (!sid) return;
      lessonSessionIdRef.current = null;
      const payload = JSON.stringify({
        type: 'lesson_exited',
        subject_slug: subjectSlug,
        session_id: sid,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/events', new Blob([payload], { type: 'application/json' }));
      } else {
        fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendExitEvent();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('beforeunload', sendExitEvent);

    return () => {
      sendExitEvent();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('beforeunload', sendExitEvent);
    };
  }, [node, subjectSlug]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("id", user.id)
            .single();
          if (data?.display_name) {
            setStudentName(data.display_name);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!subjectSlug) return;
    
    const fetchHandcraftedExams = async () => {
      setIsFetchingHandcrafted(true);
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        // 1. Get Grade from breadcrumbs
        const courseBreadcrumb = breadcrumbs.find(b => b.slug.startsWith('lop-') || b.slug.startsWith('grade-'));
        const gradeNum = courseBreadcrumb 
          ? parseInt(courseBreadcrumb.slug.replace(/^(lop|grade)-/, ''), 10) 
          : 7;

        // 2. Get Unit number from breadcrumbs
        const unitBreadcrumb = breadcrumbs.find(b => b.slug.startsWith('chuong-') || b.slug.startsWith('unit-'));
        const unitNum = unitBreadcrumb 
          ? parseInt(unitBreadcrumb.slug.match(/(?:chuong|unit)-(\d+)/i)?.[1] || '1', 10) 
          : 1;

        // 3. Fetch assessment collections for subject and grade
        const { data: collections } = await supabase
          .from('assessment_collections')
          .select(`
            id,
            units,
            exams (
              id,
              title,
              exam_number,
              total_questions
            )
          `)
          .eq('subject_slug', subjectSlug)
          .eq('grade', gradeNum)
          .eq('status', 'published');

        if (collections) {
          const matchingCollections = collections.filter((c: any) => c.units?.includes(unitNum)) || [];
          const exams = matchingCollections
            .flatMap((c: any) => c.exams || [])
            .sort((a: any, b: any) => a.exam_number - b.exam_number);
          setHandcraftedExams(exams);
        }
      } catch (err) {
        console.error("Error fetching handcrafted exams:", err);
      } finally {
        setIsFetchingHandcrafted(false);
      }
    };

    fetchHandcraftedExams();
  }, [subjectSlug, breadcrumbs]);

  const [practiceSession, setPracticeSession] = useState<any>(null);
  const [quizSession, setQuizSession] = useState<any>(null);
  const [isFetchingPractice, setIsFetchingPractice] = useState(false);
  const [isFetchingQuiz, setIsFetchingQuiz] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    if (!subjectSlug) return;
    
    let isMounted = true;

    const fetchPractice = async () => {
      setIsFetchingPractice(true);
      try {
        const res = await fetch('/api/assessment/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectSlug,
            conceptIds: conceptId ? [conceptId] : [node.id],
            difficulty: 'medium',
            count: 15
          })
        });
        const data = await res.json();
        if (isMounted) setPracticeSession(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setIsFetchingPractice(false);
      }
    };

    const fetchQuiz = async () => {
      setIsFetchingQuiz(true);
      try {
        const res = await fetch('/api/assessment/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectSlug,
            conceptIds: conceptId ? [conceptId] : [node.id],
            difficulty: 'hard',
            count: 20
          })
        });
        const data = await res.json();
        if (isMounted) setQuizSession(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setIsFetchingQuiz(false);
      }
    };

    if (!isExam) {
      if (subjectSlug === "mindset-ielts") {
        // Lazy-load ieltsQuizzes only for IELTS subject (45KB avoided for all other subjects)
        (async () => {
        const { getCumulativeQuestionsForUnit, getCumulativeVocabularyQuiz } = await import("@/lib/ieltsQuizzes");
        const dummySessionId = "practice_" + node.id;
        const rawQs = getCumulativeQuestionsForUnit(unitNum, dummySessionId, 25);
        const questionsWithType = rawQs.map(q => ({
          ...q,
          type: q.type || 'multiple_choice'
        }));
        setPracticeSession({
          id: dummySessionId,
          questions: questionsWithType
        });

        // Generate spaced retrieval vocabulary warmup quiz for Step 1
        const warmupId = "warmup_" + node.id;
        const warmupQs = getCumulativeVocabularyQuiz(unitNum, warmupId, 10);
        const warmupQsWithType = warmupQs.map(q => ({
          ...q,
          type: q.type || 'multiple_choice'
        }));
        setWarmupQuizSession({
          id: warmupId,
          questions: warmupQsWithType
        });
        })(); // end async IIFE
      } else {
        fetchPractice();
      }
    }
    fetchQuiz();

    return () => {
      isMounted = false;
    };
  }, [subjectSlug, conceptId, node.id, isExam, unitNum]);

  const handleAssessmentComplete = async (answers: any[]) => {
    const activeSession = currentPart === 'practice' ? practiceSession : quizSession;
    if (!activeSession) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeSession.id,
          answers
        })
      });
      const data = await res.json();
      
      if (currentPart === 'practice') {
        setCurrentPart('quiz');
      } else {
        setResultData(data);
        setCompleted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── KHTN 7 Lesson Layout ──────────────────────────────────────────────────
  if (subjectSlug === "khtn" && node.type === "lesson") {
    const hasTutorial = !!node.metadata?.grammar_tutorial;
    const backHref = `/learn/khtn/lop-7`;

    if (activeSubView === 'theory' || (hasTutorial && activeSubView === 'hub')) {
      return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-surface/40 p-3 rounded-2xl border border-line shadow backdrop-blur">
            <Link
              href={backHref}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-line text-slate-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Khoa học tự nhiên 7</span>
              <span className="text-xs font-bold text-emerald-400">Quay lại danh sách bài</span>
            </div>
          </div>

          <div className="bg-surface/40 border border-emerald-950/40 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200 tracking-tight uppercase mb-6 border-b border-line pb-4">
              📗 {node.title}
            </h1>

            {hasTutorial ? (
              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <GrammarTutorialRenderer content={node.metadata?.grammar_tutorial} />
              </div>
            ) : (
              <p className="text-slate-500 italic">Bài học này chưa có nội dung lý thuyết.</p>
            )}

            <div className="p-6 mt-8 rounded-3xl bg-slate-950/50 border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-extrabold text-white text-base">Đã nắm vững lý thuyết?</p>
                <p className="text-xs text-slate-500">Làm bài tập trắc nghiệm để kiểm tra kiến thức ngay.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={backHref}
                  className="px-5 py-3 bg-surface-raised hover:bg-slate-700 text-slate-300 font-extrabold rounded-2xl transition active:scale-95 text-xs"
                >
                  Quay lại
                </Link>
                <button
                  onClick={() => setActiveSubView('quiz')}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2 shadow-lg shadow-emerald-600/25 text-xs"
                >
                  ✍️ Luyện bài tập ngay ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (subjectSlug === "mindset-ielts") {
    // IELTS Coordinator Layout
    const lowercaseTitle = node.title.toLowerCase();
    const isListening = /listening|nghe/i.test(lowercaseTitle) || node.metadata?.skill_focus === 'listening';
    const isReading = /reading|đọc/i.test(lowercaseTitle) || node.metadata?.skill_focus === 'reading';
    const isWriting = /writing|viết/i.test(lowercaseTitle) || node.metadata?.skill_focus === 'writing';
    const isSpeaking = /speaking|nói/i.test(lowercaseTitle) || node.metadata?.skill_focus === 'speaking';
    const isGrammar = isGrammarFocus || /grammar|ngữ pháp|vocabulary|từ vựng/i.test(lowercaseTitle) || node.metadata?.skill_focus === 'grammar';
    const isShadowing = /shadowing|chép chính tả|dictation/i.test(lowercaseTitle) || node.metadata?.skill_focus === 'shadowing';

    let skillName = "Đọc hiểu (Reading)";
    let skillIcon = "📖";
    let skillHref = `/reading/${node.id}?backUrl=${encodeURIComponent(pathname)}`;

    if (isListening) {
      skillName = "Luyện nghe (Listening)";
      skillIcon = "🎧";
      skillHref = `/listening/${node.id}?backUrl=${encodeURIComponent(pathname)}`;
    } else if (isShadowing) {
      skillName = "Chép chính tả & Shadowing (Shadowing)";
      skillIcon = "🎙️";
      skillHref = `/listening/${node.id}?backUrl=${encodeURIComponent(pathname)}`;
    } else if (isWriting) {
      skillName = "Luyện viết (Writing)";
      skillIcon = "✍️";
      skillHref = `/writing/${node.id}?backUrl=${encodeURIComponent(pathname)}`;
    } else if (isSpeaking) {
      skillName = "Luyện nói (Speaking)";
      skillIcon = "🗣️";
      skillHref = `/speaking/mindset-ielts/${node.slug}/session-1?backUrl=${encodeURIComponent(pathname)}`;
    } else if (isGrammar) {
      skillName = "Ngữ pháp & Từ vựng (Grammar)";
      skillIcon = "📝";
      skillHref = ""; // Grammar content is directly shown inside coordinator
    }

    // Direct UI render for Grammar units so it doesn't load a timeline hub
    if (isGrammar && activeSubView === 'hub') {
      return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 select-none font-sans animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-surface/40 p-3 rounded-2xl border border-line shadow backdrop-blur">
            <Link
              href="/hoc-tap/mindset-ielts/grammar"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-line text-slate-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Học Ngữ pháp & Từ Vựng</span>
              <span className="text-xs font-bold text-rose-400">Quay lại danh sách bài học</span>
            </div>
          </div>

          <div className="bg-surface/40 border border-rose-950/40 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-64 bg-rose-500/5 blur-[120px] pointer-events-none" />
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-200 tracking-tight uppercase mb-6 border-b border-line pb-4">
              📝 {node.title.replace(/^Buổi \d+:\s*/, '')}
            </h1>

            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <GrammarTutorialRenderer content={node.metadata?.grammar_tutorial} />
            </div>

            <div className="p-6 mt-8 rounded-3xl bg-slate-950/50 border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-extrabold text-white text-base">Đã nắm vững lý thuyết?</p>
                <p className="text-xs text-slate-500">Bắt đầu làm bài tập thực hành ngay để củng cố kiến thức.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/hoc-tap/mindset-ielts/grammar"
                  className="px-5 py-3 bg-surface-raised hover:bg-slate-700 text-slate-300 font-extrabold rounded-2xl transition active:scale-95 text-xs flex items-center justify-center"
                >
                  Quay lại
                </Link>
                <button
                  onClick={() => setActiveSubView('quiz')}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2 shadow-lg shadow-rose-600/25 text-xs"
                >
                  ✍️ Luyện bài tập ngay ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // THEORY SUB-VIEW (Dedicated fullscreen theory study screen)
    if (activeSubView === 'theory') {
      return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 select-none font-sans animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-surface/40 p-3 rounded-2xl border border-line shadow backdrop-blur">
            <button
              onClick={() => setActiveSubView('hub')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-line text-slate-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Lý Thuyết & Từ Vựng</span>
              <span className="text-xs font-bold text-amber-400">Quay lại Buổi học chính</span>
            </div>
          </div>

          <div className="bg-surface/40 border border-line p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-64 bg-amber-500/5 blur-[120px] pointer-events-none" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase mb-6 border-b border-line pb-4">
              📘 HƯỚNG DẪN HỌC LÝ THUYẾT & TỪ VỰNG
            </h1>
            
            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <GrammarTutorialRenderer content={node.metadata?.grammar_tutorial} />
            </div>

            <div className="p-6 mt-8 rounded-3xl bg-slate-950/50 border border-line/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-extrabold text-white text-base">Đã nắm rõ lý thuyết?</p>
                <p className="text-xs text-slate-500">Hãy nhấn hoàn thành để quay về làm các bước tiếp theo.</p>
              </div>
              <button 
                onClick={() => setActiveSubView('hub')}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2 shadow-lg shadow-amber-600/25"
              >
                Hoàn thành & Quay lại ➔
              </button>
            </div>
          </div>
        </div>
      );
    }

    // BOOK STUDY AND EXTERNAL AI TEACHER SUB-VIEW
    if (activeSubView === 'book-work') {
      const pageNumStr = node.metadata?.page_hint || `Unit ${unitNum}`;
      const chatGptPrompt = `Hãy đóng vai là một giáo viên dạy IELTS chuyên nghiệp. Hãy hướng dẫn tôi học sách Mindset for IELTS phần ${pageNumStr} có chủ đề "${node.title}". Hãy đưa ra 3 bài tập nhỏ bám sát nội dung này, sau đó chấm điểm và sửa lỗi ngữ pháp một cách chi tiết cho tôi bằng tiếng Việt nhé!`;

      const copyPrompt = () => {
        navigator.clipboard.writeText(chatGptPrompt);
        setChatGptPromptCopied(true);
        setTimeout(() => setChatGptPromptCopied(false), 2000);
      };

      return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 select-none font-sans animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-surface/40 p-3 rounded-2xl border border-line shadow backdrop-blur">
            <button
              onClick={() => setActiveSubView('hub')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-line text-slate-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Học theo sách giáo trình</span>
              <span className="text-xs font-bold text-amber-400">Quay lại Buổi học chính</span>
            </div>
          </div>

          <div className="bg-surface/40 border border-line p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-[50%] h-64 bg-sky-500/5 blur-[120px] pointer-events-none" />
            
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 mb-3">
                📖 TEXTBOOK STUDY STEP
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                HƯỚNG DẪN HỌC THEO SÁCH GIÁO TRÌNH
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Yêu cầu bắt buộc: Học sinh kết hợp mở sách giấy Mindset for IELTS để hoàn thành bài học.
              </p>
            </div>

            {/* Instruction cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">BƯỚC A: MỞ SÁCH HỌC</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Em hãy mở sách giáo trình Mindset for IELTS tại phần bài: <strong className="text-white bg-surface px-2 py-0.5 rounded border border-line">{pageNumStr}</strong>. Đọc lý thuyết và hoàn thành các bài tập viết/đọc trong sách.
                </p>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">BƯỚC B: HỌC VÀ CHẤM ĐIỂM CÙNG AI</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Sao chép câu lệnh (Prompt) chuẩn ở bên dưới và mở ChatGPT/Claude (hoặc AI Teacher ở cột bên phải) để được chấm điểm và sửa lỗi bài tập trong sách chi tiết.
                </p>
              </div>
            </div>

            {/* ChatGPT Prompt box */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-line space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prompt chuẩn gửi ChatGPT / AI bên ngoài:</span>
                <button
                  onClick={copyPrompt}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 ${
                    chatGptPromptCopied ? "bg-emerald-600 text-white" : "bg-surface-raised text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {chatGptPromptCopied ? "✓ Đã sao chép!" : "Copy Prompt"}
                </button>
              </div>
              <div className="bg-surface/50 p-4 rounded-xl border border-slate-850 text-xs text-slate-300 font-mono select-all leading-relaxed whitespace-pre-wrap">
                {chatGptPrompt}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://chatgpt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-[11px] flex items-center gap-1.5 shadow-md shadow-emerald-600/10"
                >
                  🌐 Mở ChatGPT ➔
                </a>
                <a
                  href="https://claude.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition text-[11px] flex items-center gap-1.5 shadow-md shadow-amber-600/10"
                >
                  🌐 Mở Claude AI ➔
                </a>
              </div>
            </div>

            {/* Submit completion */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-extrabold text-white text-sm">Đã hoàn thành làm bài và tự học theo sách?</p>
                <p className="text-[11px] text-slate-500">Nhấn nút bên cạnh để ghi nhận hoàn thành bước này.</p>
              </div>
              <button 
                onClick={() => {
                  setBookCompleted(true);
                  setActiveSubView('hub');
                }}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-1.5 shadow-lg shadow-amber-600/20 shrink-0"
              >
                Xác nhận đã học xong sách ➔
              </button>
            </div>
          </div>
        </div>
      );
    }

    // WARMUP SPACED RETRIEVAL SUB-VIEW
    if (activeSubView === 'warmup') {
      return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 select-none font-sans animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-surface/40 p-3 rounded-2xl border border-line shadow backdrop-blur">
            <button
              onClick={() => setActiveSubView('hub')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-line text-slate-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Khởi Động Lũy Kế</span>
              <span className="text-xs font-bold text-amber-400">Quay lại Buổi học chính</span>
            </div>
          </div>

          <div className="bg-surface/40 border border-line p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-64 bg-amber-500/5 blur-[120px] pointer-events-none" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase mb-2">
              🔥 KHỞI ĐỘNG: ÔN TẬP TỪ VỰNG LŨY KẾ
            </h1>
            <p className="text-xs text-slate-400 mb-6 border-b border-line pb-4">
              Hệ thống tự động lựa chọn 10 từ vựng từ các bài học trước để kiểm tra trí nhớ của em. Hãy chọn đáp án nghĩa tiếng Việt đúng nhất.
            </p>

            <div className="space-y-6">
              {warmupQuizSession ? (
                <AssessmentRenderer 
                  questions={warmupQuizSession.questions || []}
                  mode="practice"
                  onComplete={() => {
                    setWarmupCompleted(true);
                    setActiveSubView('hub');
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-16 bg-slate-950/40 rounded-3xl border border-slate-850">
                  <Loader2 className="animate-spin text-amber-500 mb-4" size={40} />
                  <p className="text-slate-400 font-bold">Đang tải câu hỏi khởi động...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // QUIZ SUB-VIEW (Dedicated fullscreen quiz practice screen)
    if (activeSubView === 'quiz') {
      return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 select-none font-sans animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-surface/40 p-3 rounded-2xl border border-line shadow backdrop-blur">
            <button
              onClick={() => setActiveSubView('hub')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-line text-slate-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Bài Tập Củng Cố</span>
              <span className="text-xs font-bold text-amber-400">Quay lại Buổi học chính</span>
            </div>
          </div>

          <div className="bg-surface/40 border border-line p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-64 bg-amber-500/5 blur-[120px] pointer-events-none" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase mb-6 border-b border-line pb-4">
              📝 BÀI TẬP TRẮC NGHIỆM CỦNG CỐ TÍCH LŨY
            </h1>

            <div className="space-y-6">
              {isSubmitting || isFetchingPractice || !practiceSession ? (
                <div className="flex flex-col items-center justify-center p-16 bg-slate-950/40 rounded-3xl border border-slate-850">
                  <Loader2 className="animate-spin text-amber-500 mb-4" size={40} />
                  <p className="text-slate-400 font-bold">
                    {isSubmitting ? "Đang chấm điểm..." : "Đang tải câu hỏi..."}
                  </p>
                </div>
              ) : completed ? (
                <div className="space-y-6 text-center">
                  <div className="rounded-xl border border-emerald-950 bg-emerald-950/15 p-8">
                    <span className="text-emerald-400 font-extrabold text-lg block">✓ Đã Hoàn Thành Bài Luyện Tập Trắc Nghiệm</span>
                    <p className="text-xs text-slate-400 mt-2">Hệ thống đã ghi nhận kết quả làm bài của em.</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setCompleted(false);
                        setResultData(null);
                        setCurrentPart('practice');
                      }}
                      className="px-5 py-3 bg-surface-raised hover:bg-slate-700 text-slate-200 font-bold rounded-2xl transition"
                    >
                      Làm lại bài trắc nghiệm
                    </button>
                    <button
                      onClick={() => setActiveSubView('hub')}
                      className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl transition"
                    >
                      Quay lại Buổi học chính ➔
                    </button>
                  </div>
                </div>
              ) : (
                <AssessmentRenderer 
                  questions={practiceSession.questions || []}
                  mode="practice"
                  onComplete={handleAssessmentComplete}
                />
              )}
            </div>
          </div>
        </div>
      );
    }

    // MAIN COORDINATOR HUB VIEW
    return (
      <div className="max-w-full px-4 md:px-8 space-y-6 pb-20 select-none font-sans">
        {/* BACK TO ROADMAP BUTTON */}
        <div className="flex items-center gap-3 bg-surface/40 p-3 rounded-2xl border border-line shadow backdrop-blur">
          <Link
            href={`/hoc-tap/${subjectSlug}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-raised border border-line text-slate-400 hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Điều Phối Buổi Học</span>
            <span className="text-xs font-bold text-amber-400">Quay lại Lộ trình Mindset IELTS</span>
          </div>
        </div>

        {/* HEADER BRAND CARD */}
        <header className="rounded-2xl border border-line bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950 p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            {skillIcon} IELTS SESSION COORDINATOR
          </span>
          <h1 className="mt-3 text-2xl font-black text-white uppercase tracking-tight">
            {node.title}
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            Giáo trình: <span className="text-amber-400 font-semibold">{node.metadata?.page_hint || `Unit ${unitNum}`}</span>
          </p>
        </header>

        {/* DUAL-COLUMN WORKSPACE */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN: COORDINATOR TIMELINE */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step-by-Step timeline */}
            <div className="rounded-2xl border border-line bg-surface/20 p-6 shadow-xl backdrop-blur-md space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-line pb-3">
                🎯 LỘ TRÌNH NHIỆM VỤ (STEP BY STEP)
              </h2>

              <div className="space-y-6">
                
                {/* STEP 1: WARMUP RETRIEVAL */}
                <div className="relative pl-8 border-l-2 border-slate-850 pb-4">
                  <div className={`absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    warmupCompleted ? "bg-emerald-600 text-white" : "bg-surface-raised border border-line text-slate-400"
                  }`}>
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Bước 1: Khởi động & Ôn tập lũy kế</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Làm mini-quiz kiểm tra nhanh từ vựng đã học ở các bài học trước để củng cố trí nhớ dài hạn.
                    </p>
                    {warmupCompleted ? (
                      <div className="mt-3 flex items-center justify-between bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-xl text-emerald-400 text-xs">
                        <span>✓ Đã hoàn thành ôn tập từ vựng cũ</span>
                        <button
                          onClick={() => {
                            setWarmupCompleted(false);
                            setActiveSubView('warmup');
                          }}
                          className="font-bold text-amber-400 hover:underline"
                        >
                          Làm lại
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveSubView('warmup')}
                        className="mt-3 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 text-xs font-bold text-white transition hover:bg-amber-500 shadow-md shadow-amber-500/15"
                      >
                        🔥 Bắt đầu Khởi động ➔
                      </button>
                    )}
                  </div>
                </div>

                {/* STEP 2: TEXTBOOK STUDY */}
                <div className="relative pl-8 border-l-2 border-slate-850 pb-4">
                  <div className={`absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    bookCompleted ? "bg-emerald-600 text-white" : "bg-surface-raised border border-line text-slate-400"
                  }`}>
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Bước 2: Học trong sách & Chấm bài cùng AI</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Mở sách Mindset IELTS theo trang hướng dẫn, hoàn thành bài tập và dùng Prompt gửi ChatGPT chấm điểm/sửa lỗi.
                    </p>
                    {bookCompleted ? (
                      <div className="mt-3 flex items-center justify-between bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-xl text-emerald-400 text-xs">
                        <span>✓ Đã hoàn thành học theo sách giáo trình</span>
                        <button
                          onClick={() => {
                            setBookCompleted(false);
                            setActiveSubView('book-work');
                          }}
                          className="font-bold text-amber-400 hover:underline"
                        >
                          Học lại
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveSubView('book-work')}
                        className="mt-3 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-sky-600 px-4 text-xs font-bold text-white transition hover:bg-sky-500 shadow-md shadow-sky-500/15"
                      >
                        📖 Xem hướng dẫn học sách ➔
                      </button>
                    )}
                  </div>
                </div>

                {/* STEP 3: THEORY */}
                <div className="relative pl-8 border-l-2 border-slate-850 pb-4">
                  <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-surface-raised border border-line text-[10px] font-bold text-slate-400">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Bước 3: Đọc hướng dẫn lý thuyết mới</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Nắm rõ các từ vựng tiêu điểm và quy tắc ngữ pháp chính của bài học hôm nay.
                    </p>
                    {node.metadata?.grammar_tutorial ? (
                      <button
                        onClick={() => setActiveSubView('theory')}
                        className="mt-3 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-surface-raised border border-line px-4 text-xs font-bold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                      >
                        📘 Bắt đầu học Lý thuyết ➔
                      </button>
                    ) : (
                      <p className="text-[10px] text-slate-500 italic mt-2">Buổi học này không có tài liệu lý thuyết.</p>
                    )}
                  </div>
                </div>

                {/* STEP 4: PRACTICE SKILL */}
                {skillHref && (
                  <div className="relative pl-8 border-l-2 border-slate-850 pb-4">
                    <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-surface-raised border border-line text-[10px] font-bold text-slate-400">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Bước 4: Luyện kỹ năng thực tế ({skillName})</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Chuyển tiếp đến phòng luyện tập chuyên biệt dành riêng cho kỹ năng {skillName.replace("Luyện ", "")}.
                      </p>
                      <Link
                        href={skillHref}
                        className="mt-3 inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl bg-slate-850 border border-line px-4 text-xs font-bold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                      >
                        {skillIcon} Vào Phòng {skillName} ➔
                      </Link>
                    </div>
                  </div>
                )}

                {/* STEP 5: COMPREHENSION QUIZ */}
                <div className="relative pl-8 border-l-2 border-slate-850 pb-4">
                  <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-surface-raised border border-line text-[10px] font-bold text-slate-400">
                    5
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Bước 5: Bài kiểm tra tổng kết củng cố tích lũy</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Làm 25 câu trắc nghiệm (15 câu bài mới + 10 câu ôn cũ) để chấm điểm tự động.
                    </p>

                    <div className="mt-3">
                      {completed ? (
                        <div className="rounded-xl border border-emerald-950 bg-emerald-950/15 p-4 flex items-center justify-between">
                          <span className="text-emerald-400 font-bold text-xs">✓ Đã Hoàn Thành Bài Luyện Tập Trắc Nghiệm</span>
                          <button
                            onClick={() => setActiveSubView('quiz')}
                            className="text-[10px] font-bold text-amber-400 hover:underline"
                          >
                            Xem lại / Làm lại
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveSubView('quiz')}
                          className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl bg-surface-raised border border-line px-4 text-xs font-bold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                        >
                          📝 Bắt đầu làm Quiz ➔
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* STEP 6: REFLEX SPEAKING */}
                <div className="relative pl-8 pb-4">
                  <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-surface-raised border border-line text-[10px] font-bold text-slate-400">
                    6
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Bước 6: Luyện nói phản xạ IELTS Speaking</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Luyện nói 1-1 với AI Examiner bằng giọng nói, xoay quanh từ vựng và ngữ pháp của bài học hôm nay. Đây là nhiệm vụ cuối cùng để hoàn thành buổi học!
                    </p>
                    <Link
                      href={`/speaking/mindset-ielts/${node.slug}/session-1?backUrl=${encodeURIComponent(pathname)}`}
                      className="mt-3 inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-500 shadow-md shadow-emerald-500/15"
                    >
                      🗣️ Vào phòng IELTS Speaking ➔
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: COACH ARIA CHAT */}
          <div className="lg:col-span-5 sticky top-24">
            <AITeacherChat
              mode="warmup"
              sessionInfo={{
                title: node.title,
                summary: node.metadata?.summary || node.metadata?.description || `Điều phối buổi học Unit ${unitNum}`
              }}
              studentName={studentName}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full px-4 md:px-8 space-y-8 pb-20 select-none">
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
        <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
          <Home size={12} /> Dashboard
        </Link>
        {breadcrumbs.map((bc, idx) => (
          <div key={`bc-${idx}-${bc.slug}`} className="flex items-center gap-2">
            <ChevronRight size={10} />
            {idx === breadcrumbs.length - 1 ? (
              <span className="text-sky-400">{bc.title}</span>
            ) : (
              <Link href={`/learn/${subjectSlug}/${bc.slug}`} className="hover:text-white transition-colors">
                {bc.title}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isExam ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'}`}>
                {isExam ? <Trophy size={20} /> : (node.type === 'lesson' ? <BookOpen size={20} /> : <Layout size={20} />)}
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                {node.title}
            </h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl">
          {isExam
            ? "Bài đánh giá năng lực cuối chương. Hãy tập trung làm bài thật tốt nhé!"
            : subjectSlug === 'tieng_viet'
            ? "Đọc bài trong sách và trả lời các câu hỏi luyện tập bên dưới."
            : "Hoàn thành tuần tự 3 bước học tập: Xem video giảng bài -> Luyện tập hiểu bài -> Làm quiz tính điểm."}
        </p>
      </div>

      {node.type !== 'lesson' && node.type !== 'exam' && !isGrammar ? (
        <CurriculumMap nodes={childNodes || []} subjectSlug={subjectSlug} completedNodes={completedNodes} />
      ) : subjectSlug === 'tieng_viet' && node.type === 'lesson' ? (
        <TiengVietLessonView
          node={node}
          isBookOpen={isBookOpen}
          setIsBookOpen={setIsBookOpen}
          questions={practiceSession?.questions || []}
          isLoadingQuestions={isFetchingPractice || !practiceSession}
        />
      ) : !completed ? (
        <div className="space-y-6">
          {!isExam && (
            <div className="grid grid-cols-3 gap-2 bg-surface/50 p-2.5 rounded-2xl border border-line shadow-inner text-center text-xs font-bold">
              <button 
                onClick={() => currentPart !== 'quiz' && setCurrentPart(isGrammar ? 'ai-tutorial' : 'video')}
                className={`py-2 rounded-xl transition ${currentPart === (isGrammar ? 'ai-tutorial' : 'video') ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {isGrammar ? (subjectSlug === 'toan' ? '1. Lý thuyết bài học' : '1. Hướng dẫn học AI') : '1. Bài giảng Video'}
              </button>
              <button 
                onClick={() => currentPart !== 'quiz' && setCurrentPart('practice')}
                className={`py-2 rounded-xl transition ${currentPart === 'practice' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'} disabled:opacity-30`}
              >
                2. Luyện tập
              </button>
              <button 
                onClick={() => setCurrentPart('quiz')}
                className={`py-2 rounded-xl transition ${currentPart === 'quiz' ? 'bg-amber-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                3. Đánh giá tính điểm
              </button>
            </div>
          )}

          {currentPart === 'video' && (
            <div className="space-y-6">
              {node.metadata?.videos && node.metadata.videos.length > 1 && (
                <div className="flex flex-wrap gap-2 p-1.5 bg-surface/60 rounded-2xl border border-line">
                  {node.metadata.videos.map((vid: any) => (
                    <button
                      key={vid.youtube_id}
                      onClick={() => setActiveVideoId(vid.youtube_id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeVideoId === vid.youtube_id
                          ? "bg-sky-500 text-white shadow-lg"
                          : "text-slate-400 hover:text-slate-200 hover:bg-surface-raised/50"
                      }`}
                    >
                      {vid.title || "Video"}
                    </button>
                  ))}
                </div>
              )}

              {activeVideoId ? (
                <div className="space-y-6">
                  {/* YouTube Lecture Video */}
                  <div className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-line shadow-2xl">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${activeVideoId}?rel=0`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Sách Mềm External Link Card Helper for Tiếng Anh 7 */}
                  {subjectSlug === "tieng-anh-7" && (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/30 to-indigo-950/20 border border-sky-500/20 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                          📖 SÁCH GIÁO KHOA MỀM TƯƠNG TÁC
                        </span>
                        <p className="text-xs text-slate-350 mt-1 leading-relaxed">
                          Nhấn nút bên cạnh để mở sách lật tương tác của **Tiếng Anh 7** trong tab mới để kết hợp thực hành làm bài tập.
                        </p>
                      </div>
                      <a 
                        href="https://sachmem.net/trial/books/292/units"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl transition active:scale-95 flex items-center gap-1.5 shadow-md shadow-sky-600/10 text-xs shrink-0"
                      >
                        🌐 Mở Sách Mềm (Web Gốc) ➔
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-16 text-center text-slate-500 italic bg-surface/50 rounded-3xl border border-line">
                  Bài học này chưa có video bài giảng.
                </div>
              )}

              <div className="p-6 rounded-3xl bg-surface/40 border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="font-extrabold text-white text-base">Xem xong video rồi?</p>
                  <p className="text-xs text-slate-500">
                    {hasSpeaking 
                      ? "Hãy chọn Luyện tập trắc nghiệm hoặc Luyện nói với AI Teacher nhé!" 
                      : "Chuyển sang làm bài luyện tập không tính điểm để hiểu bài nhé!"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-end w-full sm:w-auto">
                  <button 
                    onClick={() => setCurrentPart('practice')}
                    className={`px-5 py-3 ${hasSpeaking ? 'bg-surface-raised hover:bg-slate-700 text-white border border-line' : 'bg-sky-600 hover:bg-sky-500 text-white'} font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2`}
                  >
                    Bắt đầu luyện tập <ChevronRight size={18} />
                  </button>
                  {hasSpeaking && (
                    <Link
                      href={`/speaking/${courseSlug}/${lessonSlug}/session-1?backUrl=${encodeURIComponent(pathname)}`}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2"
                    >
                      🗣️ Luyện nói với AI <ArrowRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentPart === 'ai-tutorial' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {node.metadata?.page && (
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h4 className="text-amber-400 font-bold text-lg">Yêu cầu học tập</h4>
                      <p className="text-slate-300 text-sm mt-1">
                        Môn học này có nhiều hình ảnh và thực hành đặc thù. 
                        {node.metadata?.drive_file_id 
                          ? ` Sách giáo khoa đã được đính kèm bên dưới, hãy cuộn tới trang ${node.metadata.page} để xem các hình ảnh trực quan nhé!`
                          : ` Hãy kết hợp mở Sách giáo khoa trang ${node.metadata.page} để đạt hiệu quả tốt nhất nhé!`
                        }
                      </p>
                    </div>
                  </div>
                  {node.metadata?.drive_file_id && subjectSlug === 'tieng_viet' && (
                    <button
                      onClick={() => setIsBookOpen(prev => !prev)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                        isBookOpen
                          ? "bg-amber-600/20 border-amber-500/40 text-amber-300 hover:bg-amber-600/30"
                          : "bg-sky-600/20 border-sky-500/40 text-sky-300 hover:bg-sky-600/30"
                      }`}
                    >
                      <BookOpen size={16} />
                      {isBookOpen ? "Ẩn Sách" : "Hiện Sách"}
                    </button>
                  )}
                </div>
              )}

              {node.metadata?.drive_file_id && subjectSlug === 'tieng_viet' ? (
                <div className="flex flex-col md:flex-row gap-6 w-full items-stretch min-h-[600px] md:min-h-[750px]">
                  {/* LEFT: Drive PDF Viewer (Collapsible) */}
                  <div
                    className={`transition-all duration-300 overflow-hidden rounded-3xl border border-line bg-slate-950 flex flex-col ${
                      isBookOpen ? "w-full md:w-1/2 opacity-100" : "w-0 opacity-0 pointer-events-none border-0"
                    }`}
                  >
                    <iframe 
                      src={`https://drive.google.com/file/d/${node.metadata.drive_file_id}/preview`} 
                      width="100%" 
                      height="100%" 
                      allow="autoplay"
                      className="border-0 w-full flex-1"
                    ></iframe>
                  </div>

                  {/* RIGHT: AI Tutorial & Reading content */}
                  <div className={`transition-all duration-300 flex-1 flex flex-col justify-between p-8 rounded-3xl bg-surface/40 border border-line backdrop-blur-md shadow-2xl relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-[50%] h-64 bg-rose-500/5 blur-[120px] pointer-events-none" />
                    <div className="flex-1 overflow-y-auto">
                      <GrammarTutorialRenderer content={node.metadata?.grammar_tutorial} />
                    </div>
                    
                    <div className="p-6 mt-8 rounded-3xl bg-slate-950/50 border border-line/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="font-extrabold text-white text-base">Đã nắm rõ lý thuyết?</p>
                        <p className="text-xs text-slate-500">Chuyển sang làm bài luyện tập không tính điểm để kiểm tra hiểu biết nhé!</p>
                      </div>
                      <button 
                        onClick={() => setCurrentPart('practice')}
                        className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2 shrink-0"
                      >
                        Bắt đầu luyện tập <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {node.metadata?.drive_file_id && (
                    <div className="w-full h-[600px] md:h-[800px] rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-slate-950">
                      <iframe 
                        src={`https://drive.google.com/file/d/${node.metadata.drive_file_id}/preview`} 
                        width="100%" 
                        height="100%" 
                        allow="autoplay"
                        className="rounded-2xl border-0"
                      ></iframe>
                    </div>
                  )}
                  <div className="bg-surface/40 border border-line p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[50%] h-64 bg-rose-500/5 blur-[120px] pointer-events-none" />
                    <GrammarTutorialRenderer content={node.metadata?.grammar_tutorial} />
                    
                    <div className="p-6 mt-8 rounded-3xl bg-slate-950/50 border border-line/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="font-extrabold text-white text-base">Đã nắm rõ lý thuyết?</p>
                        <p className="text-xs text-slate-500">Chuyển sang làm bài luyện tập không tính điểm để kiểm tra hiểu biết nhé!</p>
                      </div>
                      <button 
                        onClick={() => setCurrentPart('practice')}
                        className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl transition active:scale-95 flex items-center gap-2"
                      >
                        Bắt đầu luyện tập <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {currentPart === 'quiz' && handcraftedExams.length > 0 ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="p-8 rounded-[2rem] bg-surface/60 border-2 border-line backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                      <h2 className="font-['Outfit'] text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2 mb-2">
                        🏆 Bài luyện tập tính điểm
                      </h2>
                      <p className="text-sm text-slate-400 font-medium">
                        Hãy lựa chọn một đề thi dưới đây hoặc làm một đề ngẫu nhiên để tích lũy XP.
                      </p>
                    </div>
                    <button
                      onClick={handleRandomExam}
                      disabled={isPickingRandom}
                      className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Sparkles size={16} className="animate-pulse" />
                      {isPickingRandom ? "Đang chọn đề..." : "Luyện đề Ngẫu nhiên"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {handcraftedExams.map((exam, index) => {
                      return (
                        <Link 
                          key={exam.id}
                          href={`/test-assessment?examId=${exam.id}`}
                          className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-sky-500/50 hover:bg-surface/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-sky-500/10 group-hover:bg-sky-500/20 text-sky-400 rounded-full font-black text-xl border border-sky-500/20">
                              {index + 1}
                            </div>
                            <div className="space-y-1 flex-1">
                              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-tight">
                                {exam.title}
                              </h3>
                              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                                {exam.total_questions || 20} câu hỏi • Tính điểm tích lũy
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-sky-400 group-hover:text-sky-300">
                            <span>Bắt đầu làm ➔</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (currentPart === 'practice' || currentPart === 'quiz') && (() => {
            const isLoading = isSubmitting || (currentPart === 'practice' ? isFetchingPractice : isFetchingQuiz);
            const activeSession = currentPart === 'practice' ? practiceSession : quizSession;
            return (
              <div className="space-y-6 animate-in fade-in duration-300">
                {isLoading || !activeSession ? (
                  <div className="flex flex-col items-center justify-center p-16 bg-surface/50 rounded-3xl border border-line">
                    <Loader2 className="animate-spin text-sky-500 mb-4" size={40} />
                    <p className="text-slate-400 font-bold">
                      {isSubmitting ? "Đang chấm điểm..." : "Đang tải câu hỏi..."}
                    </p>
                  </div>
                ) : (subjectSlug === 'khtn' || subjectSlug === 'khtn-7') && currentPart === 'practice' ? (
                  <WorkbookAnswerSheet 
                    lessonSlug={node.slug} 
                    driveLink="https://drive.google.com/file/d/1kCimCZYM3q-A60PXOyRhO7PROTR-2eF3/view?usp=sharing" 
                  />
                ) : (
                  <AssessmentRenderer 
                    questions={activeSession.questions || []}
                    mode={currentPart}
                    onComplete={handleAssessmentComplete}
                  />
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto mt-10 animate-in zoom-in-95 duration-700">
          <AssessmentResultCard 
            score={resultData?.score || 0}
            correctCount={resultData?.correctCount || 0}
            totalCount={resultData?.totalCount || 0}
            onContinue={() => {
              if (resultData?.score >= 70) {
                router.push(`/learn/${subjectSlug}/${backSlug}`);
              } else {
                setCompleted(false);
                setResultData(null);
                setCurrentPart('video');
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
