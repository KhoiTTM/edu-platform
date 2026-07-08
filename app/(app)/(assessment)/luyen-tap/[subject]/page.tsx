"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Star, ChevronRight, CheckCircle2, Play, Trophy, ChevronDown, ChevronUp } from "lucide-react";

async function getAssessmentMap(subject: string, grade?: number) {
  // KHTN 7: đọc từ JSON thay vì DB
  if (subject === "khtn" && grade === 7) {
    const { default: questions } = await import("@/content/workbooks/khtn7-questions.json");
    const LESSON_TITLES: Record<number, string> = {
      1: "Bài 1: Phương pháp và kĩ năng học tập môn Khoa học tự nhiên",
      2: "Bài 2: Nguyên tử",
      3: "Bài 3: Nguyên tố hoá học",
      4: "Bài 4: Sơ lược về bảng tuần hoàn các nguyên tố hoá học",
      5: "Bài 5: Phân tử - Đơn chất - Hợp chất",
      6: "Bài 6: Giới thiệu về liên kết hoá học",
      7: "Bài 7: Hoá trị và công thức hoá học",
      8: "Bài 8: Tốc độ chuyển động",
      9: "Bài 9: Đo tốc độ",
      10: "Bài 10: Đồ thị quãng đường – thời gian",
      11: "Bài 11: Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông",
      12: "Bài 12: Sóng âm",
      13: "Bài 13: Độ to và độ cao của âm",
      14: "Bài 14: Phản xạ âm, chống ô nhiễm tiếng ồn",
      15: "Bài 15: Năng lượng ánh sáng. Tia sáng, vùng tối",
      16: "Bài 16: Sự phản xạ ánh sáng",
      17: "Bài 17: Ảnh của vật qua gương phẳng",
      18: "Bài 18: Nam châm",
      19: "Bài 19: Từ trường",
      20: "Bài 20: Chế tạo nam châm điện đơn giản",
      21: "Bài 21: Khái quát về trao đổi chất và chuyển hoá năng lượng",
      22: "Bài 22: Quang hợp ở thực vật",
      23: "Bài 23: Một số yếu tố ảnh hưởng đến quang hợp",
      24: "Bài 24: Thực hành: Chứng minh quang hợp ở cây xanh",
      25: "Bài 25: Hô hấp tế bào",
      26: "Bài 26: Một số yếu tố ảnh hưởng đến hô hấp tế bào",
      27: "Bài 27: Thực hành: Hô hấp ở thực vật",
      28: "Bài 28: Trao đổi khí ở sinh vật",
      29: "Bài 29: Vai trò của nước và chất dinh dưỡng đối với sinh vật",
      30: "Bài 30: Trao đổi nước và chất dinh dưỡng ở thực vật",
      31: "Bài 31: Trao đổi nước và chất dinh dưỡng ở động vật",
      32: "Bài 32: Thực hành: Chứng minh thân vận chuyển nước và lá thoát hơi nước",
      33: "Bài 33: Cảm ứng ở sinh vật và tập tính ở động vật",
      34: "Bài 34: Vận dụng hiện tượng cảm ứng ở sinh vật vào thực tiễn",
      35: "Bài 35: Thực hành: Cảm ứng ở sinh vật",
      36: "Bài 36: Khái quát về sinh trưởng và phát triển ở sinh vật",
      37: "Bài 37: Ứng dụng sinh trưởng và phát triển ở sinh vật vào thực tiễn",
      38: "Bài 38: Thực hành: Quan sát, mô tả sự sinh trưởng và phát triển ở một số sinh vật",
      39: "Bài 39: Sinh sản vô tính ở sinh vật",
      40: "Bài 40: Sinh sản hữu tính ở sinh vật",
      41: "Bài 41: Một số yếu tố ảnh hưởng và điều hoà, điều khiển sinh sản ở sinh vật",
      42: "Bài 42: Cơ thể sinh vật là một thể thống nhất",
    };
    const countByBai: Record<number, number> = {};
    for (const q of questions as any[]) {
      countByBai[q.bai] = (countByBai[q.bai] || 0) + 1;
    }
    const workbooks = Object.entries(countByBai)
      .map(([bai, count]) => ({
        id: `khtn7-bai-${bai}`,
        bai: Number(bai),
        title: LESSON_TITLES[Number(bai)] || `Bài ${bai}`,
        total_questions: count,
      }))
      .sort((a, b) => a.bai - b.bai);
    // Fetch reviews from DB (lesson/reflex exams still served from static JSON above)
    const { createClient: createClientForKhtn } = await import("@/lib/supabase/client");
    const supabaseKhtn = createClientForKhtn();
    const REVIEW_TYPES_KHTN = new Set(["review", "midterm", "final", "exam"]);
    const { data: khtnCollections } = await supabaseKhtn
      .from("assessment_collections")
      .select(`id, title, volume, units, sequence_number, exam_type, exams (id, title, total_questions, exam_number, external_url)`)
      .eq("subject_slug", "khtn")
      .eq("grade", 7)
      .eq("status", "published")
      .in("exam_type", ["review", "midterm", "final", "exam"]);
    const reviewMapKhtn = new Map<number, { volume: number; units: Map<number, any> }>();
    for (const c of (khtnCollections || []) as any[]) {
      if (!REVIEW_TYPES_KHTN.has(c.exam_type)) continue;
      const unitNum = Array.isArray(c.units) ? c.units[0] : 1;
      if (!reviewMapKhtn.has(c.volume)) reviewMapKhtn.set(c.volume, { volume: c.volume, units: new Map() });
      const volEntry = reviewMapKhtn.get(c.volume)!;
      if (!volEntry.units.has(unitNum)) volEntry.units.set(unitNum, { unit: unitNum, title: c.title, exams: [] });
      volEntry.units.get(unitNum)!.exams.push(...(c.exams || []));
    }
    const reviewsKhtn = Array.from(reviewMapKhtn.values())
      .sort((a, b) => a.volume - b.volume)
      .map((v) => ({ volume: v.volume, units: Array.from(v.units.values()).sort((a, b) => a.unit - b.unit) }));
    return { lessons: [], workbooks, reviews: reviewsKhtn, reflex: [] };
  }

  // Tiếng Anh 7 SBT: đọc từ JSON thay vì DB
  if (subject === "tieng-anh-7" && grade === 7) {
    const res = await fetch("/api/workbooks/tienganh7", { cache: "no-store" });
    const { units } = await res.json();
    const workbooks = (units as { unit: number; title: string; total_questions: number }[]).map((u) => ({
      id: `tienganh7-unit-${u.unit}`,
      bai: u.unit,
      title: u.title,
      total_questions: u.total_questions,
    }));
    return { lessons: [], workbooks, reviews: [], reflex: [] };
  }

  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();

  let query = supabase
    .from("assessment_collections")
    .select(`id, title, volume, units, sequence_number, exam_type, subject_slug, grade, exams (id, title, total_questions, exam_number, external_url)`)
    .eq("subject_slug", subject)
    .eq("status", "published")
    .order("volume", { ascending: true })
    .order("sequence_number", { ascending: true });

  if (grade) query = query.eq("grade", grade);

  const { data: collections } = await query;

  if (!collections) return { lessons: [], workbooks: [], reviews: [], reflex: [] };

  const lessonMap = new Map<number, { volume: number; units: Map<number, any> }>();
  const reviewMap = new Map<number, { volume: number; units: Map<number, any> }>();
  const workbookList: any[] = [];

  const REVIEW_TYPES = new Set(["review", "midterm", "final", "exam"]);

  for (const c of collections as any[]) {
    const unitNum = Array.isArray(c.units) ? c.units[0] : 1;
    const examType: string | null = c.exam_type;

    if (examType === "reflex") continue;

    if (examType === null) {
      for (const exam of c.exams || []) {
        workbookList.push({ ...exam, bai: unitNum, collection_title: c.title });
      }
      continue;
    }

    const targetMap = REVIEW_TYPES.has(examType) ? reviewMap : lessonMap;
    if (!targetMap.has(c.volume)) targetMap.set(c.volume, { volume: c.volume, units: new Map() });
    const volEntry = targetMap.get(c.volume)!;
    if (!volEntry.units.has(unitNum)) {
      volEntry.units.set(unitNum, { unit: unitNum, title: c.title, exams: [] });
    }
    volEntry.units.get(unitNum)!.exams.push(...(c.exams || []));
  }

  const toVolumes = (m: Map<number, { volume: number; units: Map<number, any> }>) =>
    Array.from(m.values())
      .sort((a, b) => a.volume - b.volume)
      .map((v) => ({ volume: v.volume, units: Array.from(v.units.values()).sort((a, b) => a.unit - b.unit) }));

  const lessons = toVolumes(lessonMap);
  const reviews = toVolumes(reviewMap);
  const workbooks = workbookList.sort((a, b) => a.bai - b.bai);

  const reflexMap = new Map<string, any>();
  for (const c of collections as any[]) {
    if (c.exam_type !== "reflex") continue;
    const key = c.id as string;
    if (!reflexMap.has(key)) reflexMap.set(key, { id: c.id, volume: c.volume, title: c.title, sequence_number: c.sequence_number ?? 99, exams: [] });
    reflexMap.get(key)!.exams.push(...(c.exams || []));
  }
  const reflex = Array.from(reflexMap.values()).sort((a, b) => a.sequence_number - b.sequence_number);

  return { lessons, workbooks, reviews, reflex };
}

export default function SubjectMapPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = params.subject as string;
  const gradeParam = searchParams.get("grade");
  const gradeNum = gradeParam ? parseInt(gradeParam, 10) : undefined;
  const [mounted, setMounted] = useState(false);
  const [volumes, setVolumes] = useState<any[]>([]);
  const [workbooks, setWorkbooks] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reflexes, setReflexes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"lesson" | "workbook" | "review" | "reflex">(
    subject === "tieng-anh-7" ? "workbook" : "lesson"
  );
  const [completedExams, setCompletedExams] = useState<string[]>([]);
  const [collapsedUnits, setCollapsedUnits] = useState<Record<string, boolean>>({});
  const [collapsedReflex, setCollapsedReflex] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPickingRandom, setIsPickingRandom] = useState(false);
  const [timerLimit, setTimerLimit] = useState(30);

  const subjectTitles: Record<string, string> = {
    tieng_anh: "Tiếng Anh",
    toan: "Toán học",
    "tieng-viet": "Tiếng Việt",
    tieng_viet: "Tiếng Việt",
    khtn: "Khoa học tự nhiên",
  };
  const subjectName = subject
    ? subjectTitles[subject] || subject.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  useEffect(() => {
    setMounted(true);
    if (subject) {
      async function loadData() {
        setIsLoading(true);
        const data = await getAssessmentMap(subject, gradeNum);
        setVolumes(data.lessons || []);
        setWorkbooks(data.workbooks || []);
        setReviews(data.reviews || []);
        setReflexes(data.reflex || []);
        try {
          const stored = JSON.parse(localStorage.getItem("completed_exams") || "[]");
          setCompletedExams(stored);
        } catch (e) {}
        setIsLoading(false);
      }
      loadData();
    }
    const handlePageShow = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("completed_exams") || "[]");
        setCompletedExams(stored);
      } catch (e) {}
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [subject, gradeNum, router]);

  const toggleUnit = (unitKey: string) => {
    setCollapsedUnits((prev) => ({ ...prev, [unitKey]: prev[unitKey] !== false ? false : true }));
  };

  const pickRandom = async (exams: any[], timer?: number) => {
    if (!exams || exams.length === 0) return;
    setIsPickingRandom(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsPickingRandom(false); return; }
      const { data: sessions } = await supabase.from("learning_sessions").select("summary_metrics").eq("user_id", user.id);
      const attemptsMap: Record<string, number> = {};
      sessions?.forEach((s: any) => {
        const m = s.summary_metrics as any;
        if (m?.type === "exam" && m.exam_id) attemptsMap[m.exam_id] = (attemptsMap[m.exam_id] || 0) + 1;
      });
      const unattempted = exams.filter((e) => !attemptsMap[e.id]);
      let selected: any;
      if (unattempted.length > 0) {
        selected = unattempted[Math.floor(Math.random() * unattempted.length)];
      } else {
        const min = Math.min(...exams.map((e) => attemptsMap[e.id] || 0));
        const candidates = exams.filter((e) => (attemptsMap[e.id] || 0) === min);
        selected = candidates[Math.floor(Math.random() * candidates.length)];
      }
      if (selected) router.push(`/test-assessment?examId=${selected.id}${timer ? `&timer=${timer}` : ""}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPickingRandom(false);
    }
  };

  if (!mounted || !subject) return (
    <div className="flex items-center justify-center h-full bg-surface text-white">
      <p>Loading subject...</p>
    </div>
  );

  let globalIndex = 0;
  const unitColors = ["bg-indigo-600/85", "bg-fuchsia-600/85", "bg-cyan-600/85", "bg-emerald-600/85"];
  const unitGlows = ["rgba(79,70,229,0.4)", "rgba(217,70,239,0.4)", "rgba(6,182,212,0.4)", "rgba(16,185,129,0.4)"];

  const ExamTable = ({ exams, onRandom, timer }: { exams: any[]; onRandom?: () => void; timer?: number }) => (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-slate-950/40 backdrop-blur-md shadow-xl">
      {onRandom && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-line/80 bg-surface/30">
          <span className="text-xs font-bold text-slate-400">Danh sách đề luyện tập</span>
          <button onClick={onRandom} disabled={isPickingRandom}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50">
            <Sparkles size={14} className="animate-pulse" />
            {isPickingRandom ? "Đang chọn..." : "Luyện đề Ngẫu nhiên"}
          </button>
        </div>
      )}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-line bg-surface/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
            <th className="px-6 py-3.5 w-16 text-center">STT</th>
            <th className="px-6 py-3.5">Tên đề luyện tập</th>
            <th className="px-6 py-3.5 w-32 text-center">Số câu</th>
            <th className="px-6 py-3.5 w-36 text-center">Trạng thái</th>
            <th className="px-6 py-3.5 w-36 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-sm font-bold text-slate-200">
          {exams.map((exam: any, idx: number) => {
            const isCompleted = exam.is_completed || completedExams.includes(exam.id);
            // Nếu đề có external_url → mở link ngoài (Flipbook, PDF...)
            const externalUrl = exam.external_url || exam.metadata_json?.external_url;
            const href = externalUrl ?? `/test-assessment?examId=${exam.id}${timer ? `&timer=${timer}` : ""}`;
            const isExternal = !!externalUrl;
            return (
              <tr key={exam.id} className={clsx("transition-all duration-150 group hover:bg-surface-raised/20", isCompleted && "text-slate-500")}>
                <td className="px-6 py-4 text-center font-black text-slate-400 group-hover:text-cyan-400 transition-colors">{++globalIndex}</td>
                <td className="px-6 py-4">
                  <Link href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}
                    className={clsx("hover:text-cyan-400 transition-colors block leading-snug", isCompleted ? "line-through decoration-slate-600/50" : "font-extrabold")}>
                    {exam.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  {isExternal
                    ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/30 text-xs font-black text-violet-400">📖 Flipbook</span>
                    : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface/60 border border-line text-xs font-black text-slate-300"><Star size={12} className="text-amber-400 fill-amber-400" />{exam.total_questions || 15} Câu</span>
                  }
                </td>
                <td className="px-6 py-4 text-center">
                  {isCompleted
                    ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider"><CheckCircle2 size={12} />Đã làm</span>
                    : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-black uppercase tracking-wider"><Play size={12} />Sẵn sàng</span>}
                </td>
                <td className="px-6 py-4 text-center">
                  <Link href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}
                    className={clsx("inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150",
                      isExternal
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white shadow-md shadow-purple-500/10"
                        : isCompleted ? "border border-line text-slate-400 hover:bg-surface-raised hover:text-white" : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-blue-500/10")}>
                    {isExternal ? "Mở Flipbook" : isCompleted ? "Làm lại" : "Luyện tập"}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <main className="mx-auto flex min-h-dvh w-full flex-col pb-20 relative text-white bg-surface">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-surface/50 backdrop-blur-md px-6 py-4 shadow-lg">
        <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-sm tracking-wide">
          {subjectName} {gradeNum ? `- Lớp ${gradeNum}` : ""}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 relative z-10 max-w-5xl mx-auto w-full">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            <p className="mt-6 font-bold text-cyan-400 tracking-widest uppercase animate-pulse">Đang tải...</p>
          </div>
        )}

        {!isLoading && (
          <div className="flex justify-center mb-10">
            <div className="flex bg-surface/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-sm gap-1 flex-wrap justify-center">
              <button onClick={() => setActiveTab("lesson")}
                className={clsx("px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === "lesson" ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white")}>
                Luyện tập theo bài học
              </button>
              <button onClick={() => setActiveTab("workbook")}
                className={clsx("px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === "workbook" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-teal-500/20" : "text-slate-400 hover:text-white")}>
                Luyện theo Sách bài tập
              </button>
              <button onClick={() => setActiveTab("review")}
                className={clsx("px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === "review" ? "bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-pink-500/20" : "text-slate-400 hover:text-white")}>
                Ôn Tập
              </button>
              <button onClick={() => setActiveTab("reflex")}
                className={clsx("px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 select-none",
                  activeTab === "reflex" ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-lg shadow-rose-500/20" : "text-slate-400 hover:text-white")}>
                Luyện Tập phản xạ
              </button>
            </div>
          </div>
        )}

        {/* Lessons */}
        {!isLoading && activeTab === "lesson" && volumes.map((volume, volIndex) => (
          <div key={`vol-${volume.volume}`} className="mb-16">
            <div className="mb-10 flex items-center gap-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-[0.2em] drop-shadow-lg">Tập {volume.volume}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            </div>
            {volume.units.map((unit: any, unitIdx: number) => {
              const colorIdx = (volIndex * 2 + unitIdx) % unitColors.length;
              const unitKey = `vol-${volume.volume}-unit-${unit.unit}`;
              const isCollapsed = collapsedUnits[unitKey] !== false;
              const completedCount = unit.exams.filter((e: any) => e.is_completed || completedExams.includes(e.id)).length;
              return (
                <div key={`unit-${unit.unit}`} className="mb-12">
                  <div onClick={() => toggleUnit(unitKey)}
                    className={clsx("mb-6 rounded-2xl p-5 text-white border border-white/20 backdrop-blur-md relative overflow-hidden flex justify-between items-center cursor-pointer select-none active:scale-[0.99] transition-transform duration-100", unitColors[colorIdx])}
                    style={{ boxShadow: `0 8px 32px ${unitGlows[colorIdx]}` }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                    <div className="flex-1 pr-4">
                      <h2 className="text-2xl font-black tracking-wider drop-shadow-md line-clamp-1">{unit.title}</h2>
                      <p className="text-xs font-bold text-white/80 mt-1 line-clamp-2">{unit.description}</p>
                      <p className="font-bold text-white/60 mt-1.5 uppercase tracking-widest text-[9px]">{isCollapsed ? "Nhấp để mở rộng" : "Nhấp để thu nhỏ"}</p>
                    </div>
                    <div className="flex items-center gap-3 z-10">
                      <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/20">{completedCount}/{unit.exams.length} Đề</div>
                      <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                        {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                      </div>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <ExamTable exams={unit.exams} onRandom={() => pickRandom(unit.exams)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
        {!isLoading && activeTab === "lesson" && volumes.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold text-xl border-2 border-dashed border-line rounded-2xl bg-surface-raised/30">Chưa có đề luyện tập.</div>
        )}

        {/* Workbook / SBT */}
        {!isLoading && activeTab === "workbook" && (
          <div className="w-full overflow-hidden rounded-2xl border border-line bg-slate-950/40 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-line/80 bg-surface/30">
              <span className="text-xs font-bold text-slate-400">Danh sách bài trong Sách bài tập</span>
              <span className="text-xs font-bold text-emerald-400">{workbooks.length} bài</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3.5 w-16 text-center">STT</th>
                  <th className="px-6 py-3.5">Tên bài luyện tập</th>
                  <th className="px-6 py-3.5 w-32 text-center">Số câu</th>
                  <th className="px-6 py-3.5 w-36 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm font-bold text-slate-200">
                {workbooks.map((exam: any, idx: number) => {
                  const isCompleted = completedExams.includes(exam.id);
                  // KHTN 7 / Tiếng Anh 7 SBT → link đến flipbook quiz theo bai/unit number
                  const isKhtn7 = subject === "khtn" && gradeNum === 7;
                  const isTiengAnh7 = subject === "tieng-anh-7" && gradeNum === 7;
                  const href = isKhtn7
                    ? `/flipbooks/khtn7/quiz/${exam.bai}`
                    : isTiengAnh7
                    ? `/flipbooks/tienganh7/quiz/${exam.bai}`
                    : `/test-assessment?examId=${exam.id}`;
                  return (
                    <tr key={exam.id} className={clsx("transition-all duration-150 group hover:bg-surface-raised/20", isCompleted && "text-slate-500")}>
                      <td className="px-6 py-4 text-center font-black text-slate-400 group-hover:text-emerald-400 transition-colors">{idx + 1}</td>
                      <td className="px-6 py-4">
                        <Link href={href} className={clsx("hover:text-emerald-400 transition-colors block leading-snug", isCompleted ? "line-through decoration-slate-600/50" : "font-extrabold")}>
                          {exam.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface/60 border border-line text-xs font-black text-slate-300">
                          <Star size={12} className="text-amber-400 fill-amber-400" />{exam.total_questions || "?"} Câu
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link href={href} className={clsx("inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all active:scale-95 duration-150",
                          isCompleted ? "border border-line text-slate-400 hover:bg-surface-raised hover:text-white" : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-teal-500/10")}>
                          {isCompleted ? "Làm lại" : "Luyện tập"}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {workbooks.length === 0 && (
              <div className="text-center py-20 text-slate-400 font-bold text-xl">Chưa có bài SBT nào.</div>
            )}
          </div>
        )}

        {/* Reviews */}
        {!isLoading && activeTab === "review" && reviews.map((volume, volIndex) => (
          <div key={`rev-${volume.volume}`} className="mb-16">
            <div className="mb-10 flex items-center gap-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-[0.2em] drop-shadow-lg">Tập {volume.volume}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
            </div>
            {volume.units.map((unit: any, unitIdx: number) => {
              const colorIdx = (volIndex * 2 + unitIdx) % unitColors.length;
              const unitKey = `rev-${volume.volume}-unit-${unit.unit}`;
              const isCollapsed = collapsedUnits[unitKey] !== false;
              const isPlaceholder = !unit.exams || unit.exams.length === 0;
              return (
                <div key={`rev-unit-${unit.unit}`} className="mb-12">
                  <div onClick={() => !isPlaceholder && toggleUnit(unitKey)}
                    className={clsx("mb-6 rounded-2xl p-5 text-white border relative overflow-hidden flex justify-between items-center transition-transform duration-100",
                      !isPlaceholder ? "cursor-pointer active:scale-[0.99] select-none border-white/20 backdrop-blur-md" : "border-dashed border-line/60 bg-surface/20 text-slate-500",
                      !isPlaceholder ? unitColors[colorIdx] : "")}
                    style={!isPlaceholder ? { boxShadow: `0 8px 32px ${unitGlows[colorIdx]}` } : undefined}>
                    <div className="flex-1 pr-4">
                      <h2 className={clsx("text-2xl font-black tracking-wider drop-shadow-md line-clamp-1", isPlaceholder && "text-slate-500")}>{unit.title}</h2>
                      {!isPlaceholder && <p className="font-bold text-white/60 mt-1.5 uppercase tracking-widest text-[9px]">{isCollapsed ? "Nhấp để mở rộng" : "Nhấp để thu nhỏ"}</p>}
                    </div>
                    <div className="flex items-center gap-3 z-10">
                      {!isPlaceholder
                        ? <><div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/20">{unit.exams.filter((e: any) => e.is_completed || completedExams.includes(e.id)).length}/{unit.exams.length} Đề</div><div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">{isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}</div></>
                        : <div className="bg-surface/60 px-3 py-1 rounded-full text-xs font-black border border-line text-slate-500">Sắp ra mắt</div>}
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {!isCollapsed && !isPlaceholder && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <ExamTable exams={unit.exams} onRandom={() => pickRandom(unit.exams)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
        {!isLoading && activeTab === "review" && reviews.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold text-xl border-2 border-dashed border-line rounded-2xl bg-surface-raised/30">Chưa có đề ôn tập.</div>
        )}

        {/* Reflex */}
        {!isLoading && activeTab === "reflex" && (
          <div className="flex flex-col">
            <div className="mb-8 p-6 rounded-3xl bg-surface/60 border border-line backdrop-blur-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">⏱️ CÀI ĐẶT THỜI GIAN PHẢN XẠ</h3>
                <p className="text-xs text-slate-400 mt-1 font-bold">Chọn giới hạn thời gian làm bài cho mỗi câu hỏi. Mặc định là 30 giây.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-line">
                {[10, 20, 30, 60].map((time) => (
                  <button key={time} onClick={() => setTimerLimit(time)}
                    className={clsx("px-4 py-2 rounded-xl text-xs font-black transition-all select-none duration-150 active:scale-95",
                      timerLimit === time ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-rose-500/20" : "text-slate-400 hover:text-white")}>
                    {time} giây
                  </button>
                ))}
              </div>
            </div>
            {reflexes.map((vol: any) => {
              const reflexKey = `reflex-${vol.id ?? vol.volume}`;
              const isReflexCollapsed = collapsedReflex[reflexKey] !== false;
              const doneCount = (vol.exams || []).filter((e: any) => completedExams.includes(e.id)).length;
              return (
                <div key={vol.id ?? reflexKey} className="mb-10">
                  {/* Header card — click to toggle */}
                  <div
                    onClick={() => setCollapsedReflex(prev => ({ ...prev, [reflexKey]: !isReflexCollapsed }))}
                    className="mb-4 rounded-2xl p-5 text-white border relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-600/85 to-rose-600/85 cursor-pointer active:scale-[0.99] transition-transform duration-100 select-none"
                    style={{ boxShadow: "0 8px 32px rgba(244,63,94,0.4)" }}>
                    <div className="flex-1 pr-4">
                      <h2 className="text-2xl font-black tracking-wider drop-shadow-md">{vol.title}</h2>
                      <p className="font-bold text-white/60 mt-1 uppercase tracking-widest text-[9px]">{isReflexCollapsed ? "Nhấp để mở rộng" : "Nhấp để thu nhỏ"}</p>
                    </div>
                    <div className="flex items-center gap-3 z-10">
                      <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/20">
                        {doneCount}/{(vol.exams || []).length} Đề
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); pickRandom(vol.exams, timerLimit); }}
                        disabled={isPickingRandom}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white text-rose-600 font-extrabold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50 hover:bg-slate-50">
                        <Sparkles size={14} className="animate-pulse" />
                        {isPickingRandom ? "Đang chọn..." : "Ngẫu nhiên"}
                      </button>
                      <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                        {isReflexCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                      </div>
                    </div>
                  </div>
                  {/* Collapsible exam list */}
                  <AnimatePresence initial={false}>
                    {!isReflexCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden">
                        <ExamTable exams={vol.exams} timer={timerLimit} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            {reflexes.length === 0 && (
              <div className="text-center py-20 text-slate-400 font-bold text-xl border-2 border-dashed border-line rounded-2xl bg-surface-raised/30">Không có đề luyện phản xạ.</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
