"use client";

type Props = {
  url: string;
  title: string;
};

export function PdfViewer({ url, title }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2 sm:px-4">
        <span className="truncate text-sm font-medium text-slate-700">
          {title}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          Open separately
        </a>
      </div>
      <div className="relative aspect-[3/4] w-full bg-slate-100 sm:aspect-[4/3] lg:aspect-[16/10]">
        <iframe
          title={`PDF: ${title}`}
          src={`${url}#view=FitH`}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <p className="border-t border-slate-100 px-3 py-2 text-xs text-slate-500 sm:px-4">
        Tip: On iPad, use two fingers to scroll inside the document.
      </p>
    </div>
  );
}
