import { PdfViewer } from "@/components/PdfViewer";
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
      <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-950">
        <h2 className="font-display text-lg font-semibold">Sách {bookTitle}</h2>
        <p className="mt-2">
          Giáo viên chưa gắn link PDF trên Supabase Storage. Upload file vào bucket{" "}
          <code className="rounded bg-white/80 px-1 py-0.5 text-xs">textbooks</code>{" "}
          rồi cập nhật cột <code className="rounded bg-white/80 px-1 py-0.5 text-xs">textbook_pdf_url</code>{" "}
          trong bảng <code className="rounded bg-white/80 px-1 py-0.5 text-xs">subjects</code>.
        </p>
        {pageHint && (
          <p className="mt-3 font-medium">
            Phần cần đọc cho bài này: <span className="text-brand-800">{pageHint}</span>
          </p>
        )}
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-1 font-display text-xl font-semibold text-slate-900">
        {bookTitle}
      </h2>
      {pageHint && (
        <p className="mb-3 text-sm text-slate-600">
          <span className="font-semibold text-brand-700">Đọc trong sách:</span>{" "}
          {pageHint}
        </p>
      )}
      <PdfViewer url={pdfUrl} title={`${bookTitle} — ${lessonTitle}`} />
    </section>
  );
}
