-- Migration 013: Backfill skill_focus for all mindset-ielts lessons
-- Run this in Supabase Dashboard → SQL Editor

-- First, run migrations 008 and 010 if not already run.
-- This script assumes lessons already exist (from 010_ielts_roadmap.sql).

-- Backfill skill_focus based on title keywords
UPDATE public.lessons
SET skill_focus =
  CASE
    WHEN title ILIKE '%Listening%' OR title ILIKE '%Nghe%' THEN 'listening'
    WHEN title ILIKE '%Speaking%' OR title ILIKE '%Nói%'   THEN 'speaking'
    WHEN title ILIKE '%Reading%'  OR title ILIKE '%Đọc%'   THEN 'reading'
    WHEN title ILIKE '%Writing%'  OR title ILIKE '%Viết%'  THEN 'writing'
    WHEN title ILIKE '%Grammar%'  OR title ILIKE '%Ngữ pháp%' OR title ILIKE '%Vocabulary%' THEN 'grammar'
    ELSE 'reading' -- default fallback
  END
WHERE subject_slug = 'mindset-ielts';

-- Verify results
SELECT title, skill_focus FROM public.lessons WHERE subject_slug = 'mindset-ielts' ORDER BY lesson_index;
