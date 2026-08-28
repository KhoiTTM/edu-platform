import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    lessonSlug: string;
  }>;
}

export default async function PracticalEnglishLessonPage({ params }: PageProps) {
  const { lessonSlug } = await params;
  
  const dataPath = path.resolve(process.cwd(), "content/practical-english-lessons.json");
  let lessons = [];
  try {
    const fileContents = fs.readFileSync(dataPath, "utf8");
    lessons = JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading lessons:", error);
  }

  const lesson = lessons.find((l: any) => l.slug === lessonSlug);

  if (!lesson) {
    notFound();
  }

  // Lấy lịch sử học của user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let isCompleted = false;
  if (user) {
    const { data: session } = await supabase
      .from("learning_sessions")
      .select("id")
      .eq("user_id", user.id)
      .eq("subject_slug", "practical-english")
      .contains("summary_metrics", { unit_topic: lesson.title, sub_type: "video_lesson" })
      .maybeSingle();
      
    if (session) {
      isCompleted = true;
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-surface text-white pb-20">
      <div className="mx-auto max-w-4xl w-full px-6 py-8">
        <Link
          href="/hoc-tap/practical-english"
          className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Danh sách bài học
        </Link>

        <header className="mb-8 border-b border-line/80 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                {lesson.title}
              </h1>
              <p className="mt-2 text-slate-400">
                {lesson.description}
              </p>
            </div>
          </div>
        </header>

        <div className="flex justify-center mb-8">
          <div 
            className={`rounded-2xl overflow-hidden shadow-2xl bg-black border border-line w-full relative ${
              lesson.aspectRatio === 'vertical' ? 'max-w-[400px] aspect-[9/16]' : 'max-w-[800px] aspect-video'
            }`}
          >
           {lesson.videoUrl ? (
               <video 
                 src={(() => {
                   const match = lesson.videoUrl.match(/\/d\/(.+?)\//);
                   return match && match[1] 
                     ? `https://drive.google.com/uc?export=download&id=${match[1]}`
                     : lesson.videoUrl;
                 })()}
                 controls
                 playsInline
                 className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                 poster={lesson.thumbnail || undefined}
               />
             ) : (
               <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                 Đang cập nhật video...
               </div>
             )}
          </div>
        </div>

        {!isCompleted && (
          <div className="flex justify-center mt-8">
             <form action={async () => {
                "use server";
                const sb = await createClient();
                const { data: { user: u } } = await sb.auth.getUser();
                if (!u) return;
                
                const { error } = await sb.from("learning_sessions").insert({
                  user_id: u.id,
                  subject_slug: "practical-english",
                  summary_metrics: {
                    type: "exam",
                    sub_type: "video_lesson",
                    unit_topic: lesson.title,
                    score: 1,
                    total: 1
                  }
                });
                if (error) console.error("INSERT ERROR:", error);
                
                const { revalidatePath } = await import("next/cache");
                revalidatePath(`/hoc-tap/practical-english`);
                revalidatePath(`/hoc-tap/practical-english/${lessonSlug}`);
             }}>
               <button type="submit" className="px-8 py-3 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(192,38,211,0.4)]">
                 Đánh dấu đã hoàn thành
               </button>
             </form>
          </div>
        )}
      </div>
    </div>
  );
}
