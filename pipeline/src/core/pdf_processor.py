import os
import pypdfium2 as pdfium
from pathlib import Path
from PIL import Image

class PDFProcessor:
    def __init__(self, output_dir: str, dpi: int = 300, render_scale: float = None, image_format: str = "webp"):
        self.output_dir = Path(output_dir)
        self.dpi = dpi
        # render_scale takes precedence over dpi when set, to match an existing
        # book package's metadata.json renderScale (e.g. 2x → matches existing pages/*.webp).
        self.render_scale = render_scale
        self.image_format = image_format

    def process(self, pdf_path: str, max_pages: int = None, start_page: int = 1) -> list:
        """
        Converts PDF to images for pages [start_page, start_page + max_pages - 1]
        (1-indexed, inclusive). Images are saved to `pages/page_NNN.<ext>` under
        output_dir, matching the Book Package layout expected by lib/book-viewer-core.
        Returns a list of dictionaries with page info.
        """
        pdf_path = Path(pdf_path)
        if not pdf_path.exists():
            raise FileNotFoundError(f"PDF not found: {pdf_path}")

        pages_dir = self.output_dir / "pages"
        pages_dir.mkdir(parents=True, exist_ok=True)

        print(f"Loading PDF: {pdf_path.name}")
        pdf = pdfium.PdfDocument(str(pdf_path))
        total_pages = len(pdf)

        end_page = total_pages
        if max_pages:
            end_page = min(total_pages, start_page + max_pages - 1)

        scale = self.render_scale if self.render_scale else self.dpi / 72.0
        print(f"Converting pages {start_page}-{end_page} at scale={scale}...")

        page_info_list = []

        for page_num in range(start_page, end_page + 1):
            i = page_num - 1
            padded_num = str(page_num).zfill(3)
            out_filename = f"page_{padded_num}.{self.image_format}"
            out_path = pages_dir / out_filename

            # Extract page as PIL Image
            page = pdf[i]
            page_size_pt = page.get_size()
            bitmap = page.render(scale=scale)
            pil_image = bitmap.to_pil()

            if self.image_format == "webp":
                pil_image.save(out_path, format="WEBP", quality=85)
            else:
                pil_image.save(out_path, format=self.image_format.upper())

            page_info_list.append({
                "page": page_num,
                "image_path": str(out_path),
                "image_rel_path": f"pages/{out_filename}",
                "image_name": out_filename,
                "width": pil_image.width,
                "height": pil_image.height,
                "size_pt": {"width": page_size_pt[0], "height": page_size_pt[1]},
            })
            print(f"  Saved {out_filename}")

        pdf.close()
        return page_info_list
