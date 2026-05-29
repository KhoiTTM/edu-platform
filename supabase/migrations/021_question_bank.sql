-- Question Bank Pipeline
CREATE TABLE IF NOT EXISTS public.question_bank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    type VARCHAR NOT NULL,
    difficulty FLOAT DEFAULT 1.0,
    metadata_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    source VARCHAR CHECK (source IN ('handcrafted', 'ai_generated')) NOT NULL,
    usage_count INTEGER DEFAULT 0,
    quality_score FLOAT DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users and anon users for the game
CREATE POLICY "Enable read access for all users" ON public.question_bank
    FOR SELECT
    USING (true);

-- Allow all operations for authenticated users (or service role for backend scripts)
-- Since it's a demo/internal, we'll allow all for now or check if there is an admin role.
-- Typically service_role bypasses RLS anyway, but let's allow authenticated to insert just in case.
CREATE POLICY "Enable insert for authenticated users" ON public.question_bank
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Enable update for authenticated users" ON public.question_bank
    FOR UPDATE
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
