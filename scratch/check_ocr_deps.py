import os
try:
    from PIL import Image
    import pytesseract
    pytesseract.get_tesseract_version()
    print("pytesseract available")
except Exception as e:
    print(f"pytesseract error or not available: {e}")
