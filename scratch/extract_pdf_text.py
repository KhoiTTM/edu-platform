import pypdf

reader = pypdf.PdfReader("content/kiemtraHK1_toan7.pdf")
print("Total pages:", len(reader.pages))

with open("scratch/pdf_text.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(reader.pages):
        f.write(f"\n================ PAGE {i+1} ================\n")
        f.write(page.extract_text())

print("Successfully extracted all text to scratch/pdf_text.txt")
