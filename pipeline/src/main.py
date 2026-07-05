import argparse
import os
import sys
from pathlib import Path

# Add src to path so we can import core
sys.path.append(str(Path(__file__).parent.parent))

from src.core.pdf_processor import PDFProcessor
from src.core.layout_detector import LayoutDetector
from src.core.ocr_engine import OCREngine
from src.core.packager import Packager

def main():
    parser = argparse.ArgumentParser(description="AI Pipeline for PDF Digitization")
    parser.add_argument("pdf", help="Path to PDF file")
    parser.add_argument("--slug", required=True, help="Book slug (e.g., khtn7)")
    parser.add_argument("--pages", type=int, default=10, help="Number of pages to process")
    parser.add_argument("--start-page", type=int, default=1, help="First page to process (1-indexed)")
    parser.add_argument("--dpi", type=int, default=150, help="DPI for image extraction")

    args = parser.parse_args()

    print(f"=== Starting AI Pipeline for {args.pdf} ===")

    book_dir = Path("public/books") / args.slug

    # 1. PDF to Images. Use render_scale=2 to match this book package's
    # existing metadata.json (renderScale: 2) and pages/*.webp images.
    processor = PDFProcessor(output_dir=str(book_dir), render_scale=2, image_format="webp")
    pages_info = processor.process(args.pdf, max_pages=args.pages, start_page=args.start_page)
    
    # Initialize AI Engines
    detector = LayoutDetector("yolov8n.pt") # Warning: using standard YOLO for demo
    ocr = OCREngine(gpu=False)
    packager = Packager(book_slug=args.slug)
    
    # 2 & 3. Layout Detection & OCR
    print("\n--- Running AI Extraction ---")
    
    all_questions = []
    
    for page in pages_info:
        img_path = page["image_path"]
        page_num = page["page"]
        
        print(f"Processing Page {page_num}...")
        
        # Detect Layout (Hotspots)
        detected_boxes = detector.detect(img_path)
        
        hotspots = []
        text_blocks = []
        
        for idx, box_info in enumerate(detected_boxes):
            bbox_arr = box_info["bbox"]
            conf = box_info["confidence"]
            
            # Convert array [x1, y1, x2, y2] to object {x, y, width, height}
            bbox = {
                "x": bbox_arr[0],
                "y": bbox_arr[1],
                "width": bbox_arr[2] - bbox_arr[0],
                "height": bbox_arr[3] - bbox_arr[1]
            }
            
            # OCR the bounding box
            text = ocr.extract_text(img_path, bbox_arr)
            
            # If text is empty, maybe it's an image, skip creating question
            if not text.strip():
                continue
                
            activity_id = f"ai-{page_num}-{idx}"
            
            hotspots.append({
                "id": f"hs-{activity_id}",
                "type": "input",
                "activityId": activity_id,
                "bbox": bbox
            })

            # Also add to text_blocks for visualization
            text_blocks.append({
                "id": f"tb-{page_num}-{idx}",
                "text": text,
                "bbox": bbox,
                "order": idx
            })
            
            # Create question object
            q_obj = {
                "id": activity_id,
                "bookPage": page_num,
                "type": "essay", # Default to essay since we aren't parsing ABCD yet
                "text": text,
                "options": [],
                "optionsCount": 0,
                "correctAnswer": ""
            }
            all_questions.append(q_obj)
            
        print(f"  -> Found {len(hotspots)} text blocks/questions")
        
        # 4. Save Page Data
        packager.save_page_data(
            page_num,
            hotspots,
            text_blocks,
            size=page["size_pt"],
            image_rel_path=page["image_rel_path"],
        )
        
    # Save all questions to workbook
    if all_questions:
        packager.add_to_workbook(all_questions)
        print(f"  -> Saved {len(all_questions)} questions to workbook")
        
    print("\n=== Pipeline Complete ===")

if __name__ == "__main__":
    main()
