import { existsSync, copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const src = "node_modules/katex/dist";
const cssOut = "app/katex.min.css";
const fontsOut = "public/fonts";

if (!existsSync(cssOut)) {
  let css = readFileSync(join(src, "katex.min.css"), "utf8");
  css = css.replace(/url\(fonts\//g, "url(/fonts/");
  writeFileSync(cssOut, css);
  console.log("katex.min.css copied to app/");
}

if (!existsSync(fontsOut)) {
  mkdirSync(fontsOut, { recursive: true });
  for (const f of readdirSync(join(src, "fonts"))) {
    copyFileSync(join(src, "fonts", f), join(fontsOut, f));
  }
  console.log("KaTeX fonts copied to public/fonts/");
}
