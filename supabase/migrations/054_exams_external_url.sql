-- Migration 054: Thêm cột external_url vào bảng exams
-- Dùng để lưu link Flipbook/PDF thay thế cho /test-assessment
-- Khi external_url IS NOT NULL, UI sẽ mở link ngoài thay vì làm bài thông thường.

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS external_url TEXT DEFAULT NULL;
