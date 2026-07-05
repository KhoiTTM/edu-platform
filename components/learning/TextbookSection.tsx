import { PdfViewer } from "@/components/flipbook/PdfViewer";
import type { Subject } from "@/types/database";

type Props = {
  subject: Subject | null;
  pageHint: string | null;
  lessonTitle: string;
};

export function TextbookSection({ subject, pageHint, lessonTitle }: Props) {
  const pdfUrl = subject?.textbook_pdf_url;
  const bookTitle = subject?.textbook_title ?? subject?.label_vi ?? "Sách giáo khoa";

  if (!pdfUrl) {
    return (
      <section className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-5 text-sm text-amber-400 backdrop-blur-md">
        <h2 className="font-display text-lg font-semibold">Sách {bookTitle}</h2>
        <p className="mt-2 text-slate-300">
          Giáo viên chưa gắn link PDF trên Supabase Storage. Upload file vào bucket{" "}
          <code className="rounded bg-slate-950 px-1 py-0.5 text-xs text-sky-400">textbooks</code>{" "}
          rồi cập nhật cột <code className="rounded bg-slate-950 px-1 py-0.5 text-xs text-sky-400">textbook_pdf_url</code>{" "}
          trong bảng <code className="rounded bg-slate-950 px-1 py-0.5 text-xs text-sky-400">subjects</code>.
        </p>
        {pageHint && (
          <p className="mt-3 font-medium text-amber-300">
            Phần cần đọc cho bài này: <span className="text-sky-400 font-semibold">{pageHint}</span>
          </p>
        )}
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-1 font-display text-xl font-semibold text-white">
        {bookTitle}
      </h2>
      {pageHint && (
        <p className="mb-3 text-sm text-slate-400">
          <span className="font-semibold text-sky-500">Đọc trong sách:</span>{" "}
          {pageHint}
        </p>
      )}
      <PdfViewer url={pdfUrl} title={`${bookTitle} — ${lessonTitle}`} />
    </section>
  );
}
