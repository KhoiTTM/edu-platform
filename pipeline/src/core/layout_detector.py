import cv2
import numpy as np

class LayoutDetector:
    def __init__(self, use_opencv: bool = True):
        # We don't need YOLO anymore, we use OpenCV morphological operations
        self.use_opencv = use_opencv
        print("Initializing OpenCV Layout Detector (Heuristic based)...")

    def detect(self, image_path: str) -> list:
        """
        Detects text blocks in the image using OpenCV contours.
        Returns a list of dicts: {"bbox": [x1, y1, x2, y2], "confidence": conf, "class": cls}
        [x1, y1, x2, y2] are normalized coordinates (0 to 1).
        """
        img = cv2.imread(image_path)
        if img is None:
            return []

        orig_h, orig_w = img.shape[:2]
        
        # 1. Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # 2. Binarize image (Inverse binary so text is white, background is black)
        # Using Otsu's thresholding
        _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        
        # 3. Morphological operations to group text into blocks
        # We dilate horizontally to group words into lines, and vertically to group lines into paragraphs
        kernel_w = int(orig_w * 0.05) # ~5% of width
        kernel_h = int(orig_h * 0.015) # ~1.5% of height
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_w, kernel_h))
        
        dilated = cv2.dilate(binary, kernel, iterations=1)
        
        # 4. Find contours
        contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        bboxes = []
        for cnt in contours:
            x, y, w, h = cv2.boundingRect(cnt)
            
            # Filter out very small noise (e.g., less than 2% of image width or height)
            if w < orig_w * 0.02 or h < orig_h * 0.01:
                continue
                
            # Filter out giant boxes that might be page borders
            if w > orig_w * 0.95 and h > orig_h * 0.95:
                continue
                
            # Normalize coordinates
            x1 = x / orig_w
            y1 = y / orig_h
            x2 = (x + w) / orig_w
            y2 = (y + h) / orig_h
            
            # Add padding to avoid cutting off edge characters
            pad_x = 0.005
            pad_y = 0.005
            x1 = max(0.0, x1 - pad_x)
            y1 = max(0.0, y1 - pad_y)
            x2 = min(1.0, x2 + pad_x)
            y2 = min(1.0, y2 + pad_y)
            
            bboxes.append({
                "bbox": [x1, y1, x2, y2],
                "confidence": 1.0, # OpenCV contours don't have probability confidence
                "class": 0
            })
            
        # Sort bounding boxes top-to-bottom, left-to-right
        bboxes.sort(key=lambda b: (b["bbox"][1], b["bbox"][0]))
        
        return bboxes
