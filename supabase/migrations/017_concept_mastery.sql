-- Concept Mastery Tracking
-- This table tracks the learner's mastery of specific concepts over time

CREATE TABLE IF NOT EXISTS public.user_concept_mastery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    mastery_score INT DEFAULT 0 CHECK (mastery_score >= 0 AND mastery_score <= 100),
    confidence_score FLOAT DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 1),
    last_reviewed_at TIMESTAMPTZ DEFAULT now(),
    next_review_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, concept_id)
);

-- Enable RLS
ALTER TABLE public.user_concept_mastery ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Users can manage their own mastery records" ON public.user_concept_mastery;
CREATE POLICY "Users can manage their own mastery records" ON public.user_concept_mastery
    FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_concept_mastery_user_id ON public.user_concept_mastery(user_id);
CREATE INDEX IF NOT EXISTS idx_user_concept_mastery_concept_id ON public.user_concept_mastery(concept_id);
