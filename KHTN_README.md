# KHTN (Natural Sciences) Grade 7 Workbook System

## 📚 Overview
Complete workbook system for KHTN Grade 7 extracted from PDF textbook. Currently covers **Chapter I (Chương I)** with 3 bài (lessons).

**File Location:** `content/khtn-7-workbook.json`

---

## ✅ Current Status

### Completed Content
| Bài | Title | Questions | MCQ | Essay | Pages | Status |
|-----|-------|-----------|-----|-------|-------|--------|
| 2 | Nguyên tử (Atoms) | 25 | 15 | 10 | 7-11 | ✅ COMPLETE |
| 3 | Nguyên tố hoá học (Chemical Elements) | TBD | - | - | 11-14 | ⏳ Waiting |
| 4 | Sơ lược về bảng tuần hoàn (Periodic Table) | TBD | - | - | 14-15, 17-18 | ⏳ Waiting |
| **TOTAL** | | **25+** | **15+** | **10+** | | |

### Question Breakdown (Bài 2 Complete)
- **Multiple Choice:** 15 questions - ✅ All with correctAnswer (A/B/C/D)
- **Essay:** 10 questions - ✅ All with answer reference
- **Tables:** 1 question (2.5) - ✅ Rendered as structured table

---

## 🔧 Technical Structure

### JSON Format
Each question follows this exact structure:

```json
{
  "bai-2": {
    "title": "Bài 2. Nguyên tử",
    "pages": [7, 8, 9, 10, 11],
    "questions": [
      {
        "id": "2.1",
        "page": 7,
        "bookPage": 7,
        "type": "multiple_choice",
        "text": "Phát biểu nào sau đây không mô tả mô hình nguyên tử của Rơ-dơ-pho Bo?",
        "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
        "optionsCount": 4,
        "sectionTitle": "",
        "correctAnswer": "D",
        "problem": "",
        "subItems": [],
        "answer": "D"
      },
      {
        "id": "2.5",
        "page": 8,
        "bookPage": 8,
        "type": "essay",
        "text": "Hãy viết tên, điện tích và khối lượng của các hạt cấu tạo nên nguyên tử vào chỗ trống để hoàn thiện bảng dưới đây.",
        "options": [],
        "optionsCount": 0,
        "sectionTitle": "",
        "correctAnswer": "",
        "problem": "",
        "subItems": [],
        "answer": "Hạt: Proton, Điện tích: +1, Khối lượng: 1 amu",
        "tableData": {
          "headers": ["Hạt", "Điện tích", "Khối lượng (amu)"],
          "rows": [["Proton", "?"], ["Neutron", "~0,00055"]]
        }
      }
    ]
  }
}
```

### Question Types
1. **multiple_choice** - MCQ with A, B, C, D options
   - Must have `options` array (4 items)
   - Must have `optionsCount` = 4
   - Must have `correctAnswer` (letter: "A", "B", "C", or "D")
   - Must have `answer` field with same value as correctAnswer

2. **essay** - Free text answer
   - No `options` (empty array)
   - `optionsCount` = 0
   - `correctAnswer` = "" (empty)
   - `problem` = "" (ALWAYS empty - this is critical!)
   - Must have `answer` field with answer reference for student

3. **tableData** (optional) - For questions with structured data
   - `tableData.headers` - Array of column names
   - `tableData.rows` - Array of row arrays (each row = array of cells)
   - Example: Question 2.5 with particle properties table

### Critical Rules - DO NOT VIOLATE
⚠️ **NEVER add hints or solutions to `problem` field** - it must always be empty string `""`

The workbook must be "thuần như sách" (pure like the textbook) - students write answers themselves, no hints provided.

---

## 🔍 Session 2026-06-27 Updates

### Fixed Issues
- ✅ Câu 2.11: Added missing context ("Oxygen là nguyên tố...")
- ✅ Question order: Fixed sort to start from 2.1 (not 2.7)
- ✅ Câu 2.7a: Added correctAnswer = "C"
- ✅ Câu 2.4: Merged from 2 pages into 1 question
- ✅ Câu 2.5: Merged instruction + problem, added tableData
- ✅ Duplicate 2.7: Removed, kept 2.7a + 2.7b only
- ✅ Component: Added table rendering for questions with tableData

### Data Quality (Bài 2)
- ✅ 25 questions total (15 MCQ, 10 Essay)
- ✅ 100% have answers (all with answer/correctAnswer field)
- ✅ No duplicates, proper sort order
- ✅ All instruction + problem merged into single text field
- ✅ Valid JSON, ready for production

### Known Data Issues (Source JSON)
- ⚠️ Câu 2.5 table incomplete in source (only 2 rows, should be 3)
  - Component renders correctly, but data from source is incomplete
  - Will be fixed when user provides updated JSON
- ⚠️ Bài 3: Missing questions 3.13, 3.14, 3.15 in source JSON
- ⚠️ Bài 4: Some merged questions may have similar issues

---

## 🚫 Common Mistakes to Avoid

### 1. Split Questions Across Multiple Rows
❌ **WRONG:** Storing question sub-parts (a, b, c) as separate questions
```json
{
  "id": "2.9a",
  "text": "a) Part of question..."
},
{
  "id": "2.9b", 
  "text": "b) Another part..."
}
```

✅ **CORRECT:** Merge all sub-parts into single question with full text
```json
{
  "id": "2.9",
  "text": "a) Part of question...\nb) Another part..."
}
```

**When to merge:**
- If same base ID (e.g., 2.9a + 2.9b → 2.9)
- Even if parts span 2 different textbook pages
- Preserve a), b), c), d) numbering in text for clarity

### 2. Problem Field with Content
❌ **WRONG:**
```json
"problem": "Khối lượng của electron (~0.00055 amu)..."
```

✅ **CORRECT:**
```json
"problem": ""
```

### 3. Missing Multiple Choice Answers
❌ Don't leave `correctAnswer` empty for MCQ
✅ Always fill with letter: "A", "B", "C", or "D"

### 4. Pages Mismatch
❌ Include page in list but question uses different page value
✅ Ensure `bai['pages']` = sorted list of all unique pages in questions

Example fix:
```python
pages_set = set()
for q in bai['questions']:
    pages_set.add(q['page'])
bai['pages'] = sorted(pages_set)
```

### 5. Questions Spanning Multiple Pages
⚠️ Some textbook questions (like 4.24) have parts on different pages:
- 4.24a on page 18
- 4.24b, 4.24c on page 19

**Solution:** Merge all parts into ONE question with full text, use primary page (18) as the question page.

---

## 📖 Data Source

Questions extracted from PDF textbook converted to JSON:
- **Source Directory:** `D:\Backups\Projects\convert_pdf_json\output\json\sbt_khtn_07\chuong_i\`
- **Files Used:** `page_015.json` through `page_019.json`
- **Chapter:** Chương I (Chapter 1)

### Structure of Source JSON
```json
{
  "page": 15,
  "sections": [
    {
      "type": "câu_hỏi_trắc_nghiệm",
      "questions": [...]
    },
    {
      "type": "bài_tập_tự_luận",
      "exercises": [...]
    }
  ]
}
```

---

## 🔄 Adding New Content (Next Steps)

### Process for Adding More Bài

1. **Identify source pages** in `convert_pdf_json/output/json/sbt_khtn_07/chuong_i/`
2. **Extract questions** from JSON files
3. **Check for split questions** - merge sub-parts (a,b,c,d) into single entries
4. **Verify no "problem" content** - strip all hints/solutions
5. **Build structure:**
   ```python
   bai = {
       "title": "Bài X. Title here",
       "pages": [sorted unique page numbers],
       "questions": [...]
   }
   workbook[f"bai-{number}"] = bai
   ```
6. **Validate JSON** - `python3 -m json.tool khtn-7-workbook.json`

### Example Script Template
```python
import json

# Load source page
with open('page_020.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract questions
questions = []
for section in data.get('sections', []):
    # Process multiple_choice
    for q in section.get('questions', []):
        if q['id'].startswith('5.'):
            questions.append({
                "id": q['id'],
                "page": data['page'],
                "bookPage": data['page'],
                "type": "multiple_choice",
                "text": q['question'],
                "options": q['options'],
                "optionsCount": len(q['options']),
                "sectionTitle": "",
                "correctAnswer": "",  # Fill after checking textbook
                "problem": "",
                "subItems": []
            })
    # Process essays
    for ex in section.get('exercises', []):
        if ex['id'].startswith('5.'):
            questions.append({
                "id": ex['id'],
                "page": data['page'],
                "bookPage": data['page'],
                "type": "essay",
                "text": ex['problem'],
                "options": [],
                "optionsCount": 0,
                "sectionTitle": "",
                "correctAnswer": "",
                "problem": "",
                "subItems": []
            })

# Merge to workbook and save
```

---

## 🧪 Testing & Validation

### Before Committing
```bash
# 1. Validate JSON syntax
python3 -m json.tool content/khtn-7-workbook.json > /dev/null

# 2. Run local dev server
npm run dev

# 3. Test in browser
# - Navigate to workbook section
# - Verify questions display correctly
# - Check no hints visible
# - Test MCQ options rendering
# - Test essay text areas
```

### Validation Checklist
- [ ] JSON parses without errors
- [ ] All MCQ have 4 options
- [ ] All MCQ have correctAnswer filled
- [ ] All essay questions have empty problem field
- [ ] No duplicate question IDs within bài
- [ ] Pages list matches actual question pages
- [ ] No leftover sub-part IDs (e.g., "2.9a" should be "2.9")
- [ ] Component renders without console errors

---

## 🎯 Known Questions Map (Chapter 1)

### Bài 2: Questions 2.1-2.22
- 2.1-2.8: MCQ about atoms
- 2.9: Merged (a+b) - lithium electrons and mass
- 2.10-2.22: Essay questions
- **Special:** 2.7 spans pages 9-10 (merged into single question)

### Bài 3: Questions 3.1-3.15
- 3.1-3.4: MCQ about chemical elements
- 3.5-3.12: Essay questions
- 3.13: Merged (a+b+c+d) - data table analysis
- 3.14: Merged (a+b) - isotopes
- 3.15: Merged (a+b+c) - elements in nature
- **Special:** All sub-parts on same page but logically grouped

### Bài 4: Questions 4.1-4.28
- 4.1-4.2b: Beginning questions (merged 4.2a+4.2b)
- 4.3, 4.6, 4.7: MCQ about periodic table
- 4.4, 4.5, 4.8: Essay fill-in-the-blank
- 4.17-4.28: Advanced essay questions
- 4.24: Merged (a+b+c) - spans pages 18-19
- 4.28: Merged (a+b+c) - elements in period 3

---

## 📝 Component Integration

### KHTNWorkbookPractice.tsx
The React component that displays workbook content:

**Features (✅ Implemented):**
- ✅ Sequential question display (one at a time)
- ✅ MCQ auto-check on selection (Duolingo-style)
  - Green highlight for correct answer
  - Red highlight for wrong answer
  - Letter→Index conversion (A→0, B→1, C→2, D→3)
- ✅ Essay textarea with "Nộp Câu Trả Lời" (Submit) button
- ✅ Answer reference display after submit
  - Shows in blue box with "📖 Đáp án tham khảo:"
  - Preserves whitespace/formatting
- ✅ Table rendering for structured data
  - Renders tableData.headers and tableData.rows
  - Styled with Tailwind CSS
  - Responsive with overflow-x-auto
- ✅ Navigation buttons (Previous/Next)
- ✅ Progress bar and answered count
- ✅ Completion screen with score

### API Endpoint
```
GET /api/workbook/bai-{number}
Returns: { title, pages, questions: [...] }
```

---

## 🚀 Next Steps

### For Testing (Current)
1. Start dev server: `npm run dev`
2. Navigate to `/khtn-tap/2`
3. Verify:
   - Questions display in correct order (2.1 → 2.2 → ...)
   - MCQ auto-check works (green/red highlight)
   - Table renders for 2.5
   - Essay answer display after submit

### For Bài 3, 4 (When User Provides Complete JSON)
1. User provides complete JSON with:
   - Questions 3.13, 3.14, 3.15 (currently missing from source)
   - All merged sub-questions properly combined
   - Full tableData for any table questions
2. Extract answers from pages 96-100 of answer key
3. Add to workbook.json with same structure as Bài 2
4. Update component if needed (for new question types)
5. Test on dev server

### For Enhanced Features (Future)
- [ ] Essay auto-grading using AI (Gemini API)
- [ ] Answer comparison/similarity matching
- [ ] Progress tracking/storage (Supabase)
- [ ] Question bookmarking for review
- [ ] Performance analytics

---

## 📞 Important Files & Links

- **Workbook File:** `content/khtn-7-workbook.json` (25 Bài 2 questions)
- **Component:** `components/KHTNWorkbookPractice.tsx` (quiz display)
- **Textbook Viewer:** `components/KHTNClipper.tsx` (Google Drive iframe)
- **Page Router:** `app/(app)/khtn-tap/[bai]/page.tsx`
- **Dev Server:** `npm run dev` → http://localhost:3000/khtn-tap/2

---

## 📋 Bài 2 Checklist (✅ COMPLETE)

- ✅ 25 questions extracted and structured
- ✅ 15 MCQ with correctAnswer + answer fields
- ✅ 10 Essay with answer reference
- ✅ 1 question with tableData (2.5)
- ✅ All instruction + problem merged
- ✅ No duplicates, proper sort order
- ✅ Component updated for table rendering
- ✅ Valid JSON, no syntax errors
- ✅ Ready for user testing

---

**Last Updated:** June 27, 2026 (Session 2)
**Status:** ✅ **BÀI 2 COMPLETE** | ⏳ Bài 3, 4 Waiting on User JSON
**Ready for:** Local testing, UAT, production (Bài 2 only)
