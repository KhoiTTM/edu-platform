-- Migration 048: Exam Bank — cho phép concept_id NULL trên question_bank
--
-- NGỮ CẢNH (đọc docs/EXAM_BANK.md):
-- Câu hỏi thuộc ĐỀ THI thường là đề tổng hợp, chạm nhiều bài/concept khác nhau,
-- nên việc ép mỗi câu gắn đúng 1 concept_id (FK NOT NULL từ migration 021/024)
-- là gượng ép và là nguồn lỗi FK khi seed môn mới.
--
-- Giải pháp (Cách B): nới concept_id thành NULLABLE. Câu hỏi đề thi để concept_id = NULL,
-- và truy vết bằng subject_slug + grade + metadata_json.tags thay cho concept.
-- Runtime getExamQuestions() KHÔNG bị ảnh hưởng (chỉ đọc id/type/metadata_json/concept_id).

ALTER TABLE public.question_bank
    ALTER COLUMN concept_id DROP NOT NULL;

-- Index hỗ trợ truy vấn câu hỏi đề thi theo (môn, lớp) khi concept_id NULL
CREATE INDEX IF NOT EXISTS idx_question_bank_subject_grade
    ON public.question_bank(subject_slug, grade);

COMMENT ON COLUMN public.question_bank.concept_id IS
    'FK tới curriculum_concepts. NULL với câu hỏi đề thi tổng hợp (exam-bank), khi đó dùng subject_slug+grade+metadata_json.tags để phân loại.';
