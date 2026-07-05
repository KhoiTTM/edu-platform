-- Dọn dẹp các bảng cũ không còn sử dụng

-- 1. Nhóm Dữ liệu cũ (Phiên bản V1)
DROP TABLE IF EXISTS public.quiz_attempts CASCADE;
DROP TABLE IF EXISTS public.quiz_questions CASCADE;
DROP TABLE IF EXISTS public.quizzes CASCADE;
DROP TABLE IF EXISTS public.weekly_lesson_schedule CASCADE;
DROP TABLE IF EXISTS public.schedule_entries CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.subjects CASCADE;

-- 2. Nhóm Tính năng nháp (Speaking/Listening)
DROP TABLE IF EXISTS public.learner_speaking_notes CASCADE;
DROP TABLE IF EXISTS public.unit_speaking_progress CASCADE;
DROP TABLE IF EXISTS public.speaking_sessions CASCADE;

-- 3. Nhóm Engine Đánh giá bản Nháp (Từ Migration 020)
DROP TABLE IF EXISTS public.review_items CASCADE;
DROP TABLE IF EXISTS public.review_sessions CASCADE;
DROP TABLE IF EXISTS public.concept_reviews CASCADE;
DROP TABLE IF EXISTS public.assessment_items CASCADE;
DROP TABLE IF EXISTS public.assessment_sessions CASCADE;
DROP TABLE IF EXISTS public.assessment_templates CASCADE;
