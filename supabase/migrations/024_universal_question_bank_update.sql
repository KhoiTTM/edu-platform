-- Phase 7: Question Bank System Update
-- Evolves the question_bank table for the Universal architecture

-- 1. Add blueprint_id and hash to question_bank
ALTER TABLE public.question_bank 
    ADD COLUMN IF NOT EXISTS blueprint_id TEXT REFERENCES public.question_blueprints(id),
    ADD COLUMN IF NOT EXISTS hash TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS source_anchor JSONB,
    ADD COLUMN IF NOT EXISTS generated_by TEXT DEFAULT 'deterministic';

-- 2. Update concept_id reference (Optional but recommended for consistency)
-- For the Universal system, we strictly use curriculum_concepts. 
-- We'll allow it to be nullable or point to the new table if we want a clean break.
-- For now, let's just add the columns we need.

-- 3. Validation Logs Table
CREATE TABLE IF NOT EXISTS public.validation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_id UUID NOT NULL REFERENCES public.curriculum_concepts(id) ON DELETE CASCADE,
    blueprint_id TEXT NOT NULL REFERENCES public.question_blueprints(id) ON DELETE CASCADE,
    status TEXT NOT NULL, -- 'success', 'failed'
    error_message TEXT,
    logs TEXT[],
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.validation_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to validation_logs" ON public.validation_logs FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_question_bank_blueprint ON public.question_bank(blueprint_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_concept ON public.question_bank(concept_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_hash ON public.question_bank(hash);
