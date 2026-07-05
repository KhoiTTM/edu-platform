-- Migration 031: Add grade to question_bank
ALTER TABLE public.question_bank 
    ADD COLUMN IF NOT EXISTS grade INTEGER DEFAULT 3;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_question_bank_grade ON public.question_bank(grade);
