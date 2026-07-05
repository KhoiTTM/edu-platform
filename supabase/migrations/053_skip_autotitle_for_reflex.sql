-- Migration 053: Xóa hoàn toàn trigger tự động đặt tên assessment_collections
-- Từ nay title do seeder chỉ định, không tự sinh nữa.

-- 1) Xóa trigger khỏi bảng
DROP TRIGGER IF EXISTS trigger_reorder_assessment_collections ON public.assessment_collections;

-- 2) Xóa hàm trigger
DROP FUNCTION IF EXISTS public.reorder_assessment_sequences_trigger();

-- 3) Xóa hàm generate_assessment_title (tất cả overload)
DROP FUNCTION IF EXISTS public.generate_assessment_title(text, integer, integer, integer[], integer, text);
DROP FUNCTION IF EXISTS public.generate_assessment_title(text, integer, integer, integer[], integer);

-- 4) Đặt lại title cho tất cả collection của pre-a1-starter
--    - Tab "Luyện tập theo bài học" (exam_type = 'lesson') → "Wordlist"
--    - Tab "Luyện tập phản xạ"  (exam_type = 'reflex')  → "Wordlist"
UPDATE public.assessment_collections
SET title = 'Wordlist'
WHERE subject_slug = 'pre-a1-starter';
