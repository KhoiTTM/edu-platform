"use client";

import { useEffect, useRef } from "react";

export function KaTeXSpan({ latex }: { latex: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    import("katex").then((katex) => {
      if (ref.current) {
        ref.current.innerHTML = katex.default.renderToString(latex, {
          throwOnError: false,
          displayMode: false,
        });
      }
    });
  }, [latex]);
  return <span ref={ref}>{latex}</span>;
}

// Parse inline markdown-ish tags ($latex$, **bold**, *italic*, `code`) into React nodes.
export function formatText(text: string): React.ReactNode {
  if (typeof text !== "string") return text;

  const tokens = text.split(/(\n|\$[^$]+\$|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return (
    <span>
      {tokens.map((token, i) => {
        if (token === "\n") {
          return <br key={i} />;
        }
        if (token.startsWith("$") && token.endsWith("$")) {
          const latex = token.slice(1, -1);
          return <KaTeXSpan key={i} latex={latex} />;
        }
        if (token.startsWith("**") && token.endsWith("**")) {
          return <strong key={i} className="text-white font-extrabold">{token.slice(2, -2)}</strong>;
        }
        if (token.startsWith("*") && token.endsWith("*")) {
          return <span key={i} className="text-amber-400 font-medium italic">{token.slice(1, -1)}</span>;
        }
        if (token.startsWith("`") && token.endsWith("`")) {
          return <code key={i} className="bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded px-1.5 py-0.5 font-mono text-[13px]">{token.slice(1, -1)}</code>;
        }
        return <span key={i}>{token}</span>;
      })}
    </span>
  );
}
