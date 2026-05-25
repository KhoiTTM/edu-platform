import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ieltsTranscripts } from "@/lib/ieltsTranscripts";
import type { Lesson } from "@/types/database";

export default async function ListeningCatalogPage() {
  const supabase = await createClient();
  
  // Verify authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch only IELTS lessons that have listening tracks (youtube_video_id is not null)
  const { data: lessonsData, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("subject_slug", "mindset-ielts")
    .not("youtube_video_id", "is", null)
    .order("lesson_index", { ascending: true });

  if (error) {
    console.error("Error fetching listening lessons:", error);
  }

  const listeningLessons = (lessonsData ?? []) as Lesson[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Navigation Breadcrumb */}
      <nav className="text-sm text-slate-500">
        <Link href="/hoc-tap" className="font-medium text-sky-500 hover:text-sky-400">
          Chọn môn
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <Link href="/hoc-tap/mindset-ielts" className="font-medium text-sky-500 hover:text-sky-400">
          IELTS Foundation
        </Link>
        <span className="mx-2 text-slate-700">/</span>
        <span className="font-medium text-white">Luyện Nghe Chuyên Sâu</span>
      </nav>

      {/* Hero Header Section */}
      <header className="mt-6 rounded-2xl border border-sky-950/40 bg-gradient-to-br from-sky-950/30 via-slate-900/60 to-indigo-950/20 p-6 md:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 -mb-6 -ml-6 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl"></div>
        
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
            🎧 TÍNH NĂNG MỚI
          </span>
          <h1 className="font-display mt-3 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
            IELTS Listening Practice
          </h1>
          <p className="mt-2.5 text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            Phương pháp <span className="text-sky-400 font-bold">Luyện Nghe 3 Lần</span> (3-Step Listening) chuẩn khoa học giúp tăng phản xạ nghe-nói, ghi nhớ từ vựng theo ngữ cảnh và chinh phục kỹ năng nghe IELTS dễ dàng.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-5 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tổng số buổi nghe</p>
              <p className="mt-1 text-2xl font-bold text-white">{listeningLessons.length} Buổi</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phương pháp luyện</p>
              <p className="mt-1 text-base font-bold text-sky-400">Deep Listening x3</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mức độ bài tập</p>
              <p className="mt-1 text-sm font-bold text-emerald-400">15 Câu Trắc Nghiệm/Buổi</p>
            </div>
          </div>
        </div>
      </header>

      {/* Method Explanation Accordion/Grid */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-slate-200">
          💡 Quy Trình Luyện Nghe 3 Bước Là Gì?
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 shadow-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-xs font-bold text-sky-400 border border-sky-500/20">
              1
            </span>
            <h3 className="mt-3 font-semibold text-sm text-white">Bước 1: Nghe Không Phụ Đề</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Nghe chay hoàn toàn để nắm nội dung chính (Gist Listening) và rèn luyện kỹ năng phán đoán từ vựng.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 shadow-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              2
            </span>
            <h3 className="mt-3 font-semibold text-sm text-white">Bước 2: Phân Tích Song Ngữ</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Nghe kèm theo Transcript tiếng Anh và bản dịch tiếng Việt để phân tích ngữ nghĩa, nối âm và từ vựng mới.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 shadow-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400 border border-indigo-500/20">
              3
            </span>
            <h3 className="mt-3 font-semibold text-sm text-white">Bước 3: Nói Đuổi Shadowing</h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Nghe dừng nói nhại liên tục để đồng bộ hóa phát âm, trọng âm câu và tốc độ phát âm chuẩn bản xứ.
            </p>
          </div>
        </div>
      </section>

      {/* Listening Lessons List */}
      <section className="mt-8 space-y-4">
        <h2 className="font-display text-lg font-bold text-slate-200">
          🎧 Chọn Buổi Luyện Nghe Hôm Nay
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {listeningLessons.map((lesson, idx) => {
            const transcriptInfo = ieltsTranscripts[lesson.youtube_video_id!];
            const unitNumber = lesson.title.match(/U(\d+)/i)?.[1] ?? "1";
            
            return (
              <div 
                key={lesson.id} 
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/30 p-5 transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-sky-950/20 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-md bg-sky-950/60 px-2 py-0.5 text-[10px] font-bold text-sky-400 uppercase border border-sky-900/40">
                      Unit {unitNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Buổi {lesson.lesson_index}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-semibold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
                    {lesson.title.replace(/Buổi \d+:\s*/, "")}
                  </h3>
                  
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {transcriptInfo?.description || lesson.summary || "Buổi luyện nghe tiếng Anh chuyên sâu bám sát đề thi."}
                  </p>

                  {/* Key vocabulary tags */}
                  {transcriptInfo?.keyVocabulary && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {transcriptInfo.keyVocabulary.slice(0, 2).map((v) => (
                        <span key={v.word} className="inline-block rounded bg-slate-900/80 px-2 py-0.5 text-[9px] text-slate-300 border border-slate-800">
                          {v.word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href={`/listening/${lesson.id}`}
                  className="mt-5 inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl bg-sky-600 px-4 text-xs font-semibold text-white transition hover:bg-sky-500 shadow-md shadow-sky-500/10"
                >
                  🎧 Vào phòng luyện nghe
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
