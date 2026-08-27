import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowLeft, PlayCircle } from "lucide-react";

export const metadata = {
  title: "Practical English | Edu Platform",
};

export default async function PracticalEnglishListPage() {
  const dataPath = path.resolve(process.cwd(), "content/practical-english-lessons.json");
  let lessons = [];
  try {
    const fileContents = fs.readFileSync(dataPath, "utf8");
    lessons = JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading lessons:", error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-surface text-white pb-20">
      <div className="mx-auto max-w-5xl w-full px-6 py-8">
        <Link
          href="/hoc-tap"
          className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Practical English
          </h1>
          <p className="mt-2 text-slate-400 font-medium">
            Học tiếng Anh thực tế qua video và các tình huống giao tiếp hàng ngày.
          </p>
        </header>

        {lessons.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            Chưa có bài học nào được tạo.
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(
              lessons.reduce((acc: any, lesson: any) => {
                const group = lesson.group || "Khác";
                if (!acc[group]) acc[group] = [];
                acc[group].push(lesson);
                return acc;
              }, {})
            ).map(([groupName, groupLessons]: [string, any]) => (
              <section key={groupName}>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-line/50 pb-2">
                  {groupName}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {groupLessons.map((lesson: any) => (
                    <div key={lesson.id} className="group relative flex flex-col cursor-pointer">
                      <Link
                        href={`/hoc-tap/practical-english/${lesson.slug}`}
                        className="block relative aspect-[9/16] rounded-md overflow-hidden bg-slate-900 border border-slate-700/50 group-hover:border-slate-500 transition-colors shadow-lg"
                      >
                        {lesson.thumbnail ? (
                          <>
                            <img 
                              src={lesson.thumbnail} 
                              alt={lesson.title} 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            {lesson.thumbnailText && (
                              <div className="absolute inset-x-0 bottom-4 flex justify-center z-10 pointer-events-none drop-shadow-2xl">
                                <span 
                                  className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase"
                                  style={{
                                    WebkitTextStroke: '2px black',
                                    textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                                  }}
                                >
                                  {lesson.thumbnailText}
                                </span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                            <PlayCircle className="w-12 h-12 text-slate-500" />
                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
