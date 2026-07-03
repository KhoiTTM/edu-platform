"use client";

import { useEffect, useRef } from "react";

function KaTeXSpan({ latex }: { latex: string }) {
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

function FormatLine({ text }: { text: string }) {
  const tokens = text.split(/(\$[^$]+\$|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span>
      {tokens.map((token, i) => {
        if (token.startsWith("$") && token.endsWith("$")) {
          return <KaTeXSpan key={i} latex={token.slice(1, -1)} />;
        }
        if (token.startsWith("**") && token.endsWith("**")) {
          return <strong key={i}>{token.slice(2, -2)}</strong>;
        }
        if (token.startsWith("*") && token.endsWith("*")) {
          return <em key={i}>{token.slice(1, -1)}</em>;
        }
        return <span key={i}>{token}</span>;
      })}
    </span>
  );
}

export function MathText({ text, className }: { text: string; className?: string }) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i}>
          <FormatLine text={line} />
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}
