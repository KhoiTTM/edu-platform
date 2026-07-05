try:
    import easyocr
except ImportError:
    easyocr = None
import cv2
import numpy as np
import torch

class OCREngine:
    def __init__(self, gpu: bool = False):
        if easyocr:
            use_gpu = gpu and torch.cuda.is_available()
            print(f"Initializing EasyOCR (GPU={use_gpu})...")
            self.ocr = easyocr.Reader(['vi', 'en'], gpu=use_gpu)
        else:
            self.ocr = None
            print("Warning: easyocr not installed. OCR will be skipped.")

    def extract_text(self, image_path: str, bbox: list = None) -> str:
        """
        Extracts text from the image using EasyOCR. 
        If bbox is provided (normalized [x1, y1, x2, y2]), it crops the image first.
        """
        if not self.ocr:
            return "OCR Not Available"
            
        img = cv2.imread(image_path)
        if img is None:
            return ""
            
        if bbox:
            h, w, _ = img.shape
            x1, y1, x2, y2 = bbox
            px1, py1 = int(x1 * w), int(y1 * h)
            px2, py2 = int(x2 * w), int(y2 * h)
            
            px1, py1 = max(0, px1), max(0, py1)
            px2, py2 = min(w, px2), min(h, py2)
            
            if px2 <= px1 or py2 <= py1:
                return ""
                
            img = img[py1:py2, px1:px2]

        result = self.ocr.readtext(img, detail=0)
        return "\n".join(result)
