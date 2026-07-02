import json

with open("content/exam-bank/toan7-pilot-hk1.json", "r", encoding="utf-8") as f:
    content = f.read()

# Replace double backslashes followed by delimiters with single dollar sign
# In the raw text of the JSON file, the delimiters are written as \\( and \\)
content = content.replace("\\\\(", "$")
content = content.replace("\\\\)", "$")
content = content.replace("\\\\[", "$")
content = content.replace("\\\\]", "$")

# Parse to verify it is still valid JSON
parsed = json.loads(content)

with open("content/exam-bank/toan7-pilot-hk1.json", "w", encoding="utf-8") as f:
    json.dump(parsed, f, ensure_ascii=False, indent=2)

print("Successfully replaced math delimiters with $ in content/exam-bank/toan7-pilot-hk1.json")
