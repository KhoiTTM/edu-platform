import os
import json

search_dir = "D:\\Backups\\Projects\\convert_pdf_json\\output\\json\\mindset-for-ielts-foundation"
found = []

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".json") or file.endswith(".txt") or file.endswith("json"):
            if not file.endswith(".json"):
                continue
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    content = data.get("content", "")
                    if "badminton" in content.lower() or "excursions" in content.lower():
                        found.append((path, content[:150].replace('\n', ' ')))
            except Exception as e:
                pass

print(f"Found {len(found)} files:")
for f in found:
    print(f)
