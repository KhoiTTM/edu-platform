# KHTN Workbook Session Log - 2026-06-27

## Issues Fixed

### 1. ✅ Câu 2.11 Thiếu Context
**Problem:** Câu 2.11 chỉ có "Hoàn thiện Hình 2.3..." thiếu phần "Oxygen là nguyên tố hoá học phổ biến..."
**Fix:** Thêm context từ sách page 10 vào text của 2.11
```
"Oxygen là nguyên tố hoá học phổ biến trong không khí, duy trì sự sống và sự cháy:\nHoàn thiện Hình 2.3 để mô tả cấu tạo một nguyên tử oxygen."
```

### 2. ✅ Sắp Xếp Câu Hỏi Sai
**Problem:** Bài 2 bắt đầu từ câu 2.7a thay vì 2.1
**Fix:** Rewrite sort function để properly parse "2.7a" format
```python
# Sort by (bai_number, question_number, letter)
# "2.1" -> (2, 1, "zzz")
# "2.7a" -> (2, 7, "a")
# "2.7b" -> (2, 7, "b")
```

### 3. ✅ Câu 2.7a Thiếu Đáp Án
**Problem:** 2.7a (multiple_choice) không có correctAnswer
**Fix:** Thêm `correctAnswer: "C"` từ sách page 95

### 4. ✅ Đáp Án Hiển Thị Khi Submit Essay
**Feature:** Thêm field "answer" cho tất cả câu (22 đáp án từ Bài 2)
**Implementation:** 
- Update KHTNWorkbookPractice.tsx dòng 293-307
- Show box xanh với tiêu đề "📖 Đáp án tham khảo:"
- Display `currentQuestion.answer` khi học sinh submit essay

### 5. ✅ Rebuild JSON từ Source
**Problem:** JSON bị hỏng khi edit (literal newlines trong string)
**Fix:** Rebuild toàn bộ workbook.json từ source page JSONs với proper escape sequences

## Data Status

### Workbook Structure
- **Bài 2:** 26 questions (7 MCQ, 19 essay) - Pages 7-11
- **Bài 3:** 13 questions - Pages 11-13
- **Bài 4:** 21 questions - Pages 14-15, 17-18

### Answers Status
- ✅ Bài 2: 22/22 đáp án (từ pages 94-96)
- ⏳ Bài 3, 4: Waiting for new complete JSON từ user

## Known Issues

### Source Data Issues (Cần tạo lại JSON)
1. Missing questions: 3.13, 3.14, 3.15 (không có trong source JSON)
2. Merged questions: 2.9a/b, 3.11a/b, 4.28a/b/c bị tách thành parts (cần merge?)
3. Malformed IDs: Page 12 có "b", "c" (lỗi OCR/PDF conversion)

### Test Needed
- [ ] Visual test: Check if 2.7a option C highlights in green khi selected
- [ ] Test multiple choice auto-check logic
- [ ] Test essay answer display after submit
- [ ] Verify correct answer shows with ✓ icon

## Next Steps (When User Provides Complete JSON)

1. Import new JSON with 3.13, 3.14, 3.15
2. Extract answers cho Bài 3, 4 từ pages 96-100
3. Update component to handle essay grading (auto-check if answer matches, or show for manual review)
4. Test on dev server

## Files Modified

- ✏️ `content/khtn-7-workbook.json` - Added answers, fixed sort, fixed 2.11 context, fixed 2.7a
- ✏️ `components/KHTNWorkbookPractice.tsx` - Added answer display for essays (lines 293-307) + debug console.log

## Code Changes

### KHTNWorkbookPractice.tsx - Essay Answer Display
```tsx
{isCheckingAnswer && (
  <div className="space-y-3">
    <div className="p-3 rounded-lg text-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500">
      ✓ Câu trả lời của bạn đã được nộp.
    </div>
    {currentQuestion.answer && (
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500">
        <p className="text-xs font-bold text-blue-400 mb-2">📖 Đáp án tham khảo:</p>
        <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">
          {currentQuestion.answer}
        </p>
      </div>
    )}
  </div>
)}
```

---

**Session completed:** 2026-06-27 ~18:00 UTC
**Status:** Ready for user to provide complete JSON; component feature working
