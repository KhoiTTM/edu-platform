# Title
Generate Interactive Theory Content for KHTN 7 Lessons (Chapter 1 & 2)

# Goal
Replace the default video player interface for KHTN 7 lessons with the interactive 5-tab Theory Reading UI (similar to Math 7 logic). This requires formatting textbook theory from JSON files into Markdown and updating the `metadata` column of the `curriculum_nodes`.

# Background context
Currently, clicking a KHTN 7 lesson opens the video player UI which says "Bài học này chưa có video". The user wants to learn through reading theory instead. By setting `skill_focus: 'grammar'` and injecting formatted markdown into `grammar_tutorial` within the node's `metadata`, the frontend `LearnNodeClient` will automatically switch to the interactive 5-tab AI tutorial interface.

# Files involved
- `scripts/seed-khtn7-theory.ts` (New script to be created)
- `docs/Assement Studio/SGK_KHTN_7_JSON/Chuong_1/` (Source JSON files)
- `docs/Assement Studio/SGK_KHTN_7_JSON/Chuong_2/` (Source JSON files)

# DB changes
- Update the `metadata` JSONB column of the `curriculum_nodes` table where `type = 'lesson'` and `source_id` belongs to KHTN 7.

# APIs involved
None. Pure DB logic via Supabase client.

# Dependencies
KHTN 7 `curriculum_nodes` must already exist.

# Implementation checklist
- [ ] Create a new script `scripts/seed-khtn7-theory.ts`.
- [ ] Fetch all `lesson` nodes for `khtn-7-ket-noi` from `curriculum_nodes` (Chapters 1 & 2).
- [ ] For each lesson, read the corresponding JSON source file (e.g., `bai-1-nguyen-tu` maps to the parsed content of Chapter 1). *Hint: You may need to manually map the lesson slugs to specific JSON pages or combine the theory text from the JSON.*
- [ ] Extract the theory content and format it exactly into this Markdown structure to ensure the 5 UI tabs render correctly:
  ```markdown
  ### Lý thuyết: {Tên bài học}

  #### 1. Khái quát
  [Giới thiệu chung về bài học...]

  #### 2. Kiến thức cốt lõi
  [Các định nghĩa, khái niệm. Dùng format blockquote `> nội dung` cho các định lý/công thức quan trọng]

  #### 3. Phân tích chi tiết
  [Giải thích sâu hơn từ các hoạt động trong SGK...]

  #### 4. Ví dụ minh hoạ
  * ✓ Đúng: [Ví dụ đúng]
  * ✗ Sai: [Lưu ý thường gặp]

  #### 5. Tổng kết
  - [Điểm cần nhớ 1]
  - [Điểm cần nhớ 2]
  ```
- [ ] Update the `curriculum_nodes` table to set:
  ```json
  "metadata": {
    "skill_focus": "grammar",
    "grammar_tutorial": "<your_formatted_markdown_string>"
  }
  ```
- [ ] Run the script. Verify that visiting `http://localhost:3000/learn/khtn/bai-1-nguyen-tu` shows the 5-tab theory UI instead of the video player.

# Future extension notes
This establishes the pattern for automating theory extraction for all future chapters.

# Known risks
- Markdown parsing in the UI is strict. Ensure exactly 4 hashes (`#### 1. `, `#### 2. `) are used for the tab splits, or the UI tabs will break.
- Ensure you merge existing `metadata` so you don't accidentally overwrite `page` or `youtube_id` if we need them later.
