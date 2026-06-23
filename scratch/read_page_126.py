import json
path = "D:\\Backups\\Projects\\convert_pdf_json\\output\\json\\mindset-for-ielts-foundation\\unit_1\\page_126.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
    print(data["content"])
