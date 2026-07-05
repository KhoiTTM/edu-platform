import json
import os
from pathlib import Path

class Packager:
    def __init__(self, book_slug: str, public_dir: str = "public", content_dir: str = "content"):
        self.book_slug = book_slug
        self.public_dir = Path(public_dir)
        self.content_dir = Path(content_dir)
        
        self.book_dir = self.public_dir / "books" / book_slug
        self.page_data_dir = self.book_dir / "page_data"
        self.workbook_path = self.content_dir / f"{book_slug}-workbook.json"
        
        self.page_data_dir.mkdir(parents=True, exist_ok=True)
        self.content_dir.mkdir(parents=True, exist_ok=True)

    def save_page_data(self, page_num: int, hotspots: list, text_blocks: list = None, size: dict = None, image_rel_path: str = None):
        """
        Saves page_xxx.json with hotspots and text blocks.
        Conforms to lib/schema/page.schema.json: requires size, rotation,
        and each hotspot requires a `type` from the activityKind enum.
        """
        padded_num = str(page_num).zfill(3)
        page_file = self.page_data_dir / f"page_{padded_num}.json"

        # Preserve existing size/rotation/image if the page file already exists
        # (e.g. produced by an earlier full-book preparation step) instead of
        # clobbering it with pipeline defaults.
        existing = {}
        if page_file.exists():
            with open(page_file, "r", encoding="utf-8") as f:
                try:
                    existing = json.load(f)
                except json.JSONDecodeError:
                    pass

        for hs in hotspots:
            hs.setdefault("type", "input")

        data = {
            "page": page_num,
            "image": image_rel_path or existing.get("image") or f"page_{padded_num}.png",
            "size": size or existing.get("size") or {"width": 511, "height": 726},
            "rotation": existing.get("rotation", 0),
            "hotspots": hotspots,
            "textBlocks": text_blocks or []
        }

        with open(page_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def add_to_workbook(self, questions: list):
        """
        Append questions to the centralized workbook json.
        """
        workbook = {}
        if self.workbook_path.exists():
            with open(self.workbook_path, "r", encoding="utf-8") as f:
                try:
                    workbook = json.load(f)
                except json.JSONDecodeError:
                    pass

        # We'll put AI extracted questions in a generic lesson called "ai-extracted"
        lesson_key = "ai-extracted"
        if lesson_key not in workbook:
            workbook[lesson_key] = {
                "title": "Câu hỏi AI bóc tách",
                "pages": [],
                "questions": []
            }
            
        for q in questions:
            # Check if exists
            exists = any(ex_q["id"] == q["id"] for ex_q in workbook[lesson_key]["questions"])
            if not exists:
                workbook[lesson_key]["questions"].append(q)
                if q["bookPage"] not in workbook[lesson_key]["pages"]:
                    workbook[lesson_key]["pages"].append(q["bookPage"])

        with open(self.workbook_path, "w", encoding="utf-8") as f:
            json.dump(workbook, f, ensure_ascii=False, indent=2)
