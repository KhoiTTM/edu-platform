-- Assessment & Review Engine Foundation
-- This migration establishes the tables and structures for the Assessment & Review system

-- 1. Assessment Templates
CREATE TABLE IF NOT EXISTS public.assessment_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES public.universal_subjects(id) ON DELETE SET NULL,
    assessment_type TEXT NOT NULL, -- e.g., 'diagnostic', 'checkpoint', 'final'
    name TEXT NOT NULL,
    generation_rules JSONB DEFAULT '{}'::jsonb,
    scoring_rules JSONB DEFAULT '{}'::jsonb,
    review_rules JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Assessment Sessions
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.assessment_templates(id) ON DELETE SET NULL,
    curriculum_node_id UUID REFERENCES public.curriculum_nodes(id) ON DELETE SET NULL,
    assessment_type TEXT NOT NULL,
    generated_by TEXT DEFAULT 'system', -- 'system', 'ai'
    generated_context JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'draft', -- 'draft', 'in_progress', 'completed', 'cancelled'
    score NUMERIC(5,2),
    max_score NUMERIC(5,2),
    mastery_delta JSONB DEFAULT '{}'::jsonb,
    weak_concepts UUID[] DEFAULT '{}'::uuid[],
    time_spent_seconds INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Assessment Items
CREATE TABLE IF NOT EXISTS public.assessment_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.quiz_questions(id) ON DELETE SET NULL,
    concept_id UUID REFERENCES public.concepts(id) ON DELETE SET NULL,
    source_type TEXT DEFAULT 'bank', -- 'bank', 'ai_generated'
    difficulty TEXT DEFAULT 'medium',
    position INT NOT NULL,
    user_answer JSONB,
    is_correct BOOLEAN,
    time_spent_seconds INT DEFAULT 0,
    hints_used INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Concept Reviews (SM-2 Spaced Repetition)
CREATE TABLE IF NOT EXISTS public.concept_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    next_review_at TIMESTAMPTZ DEFAULT now(),
    review_interval_days NUMERIC(10,2) DEFAULT 0,
    review_strength NUMERIC(5,2) DEFAULT 0, -- Equivalent to 'ease' factor
    retention_score NUMERIC(5,2) DEFAULT 0,
    last_reviewed_at TIMESTAMPTZ,
    review_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, concept_id)
);

-- 5. Review Sessions
CREATE TABLE IF NOT EXISTS public.review_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    review_type TEXT NOT NULL, -- 'spaced_repetition', 'targeted_weakness', 'custom'
    generated_from TEXT DEFAULT 'system',
    status TEXT DEFAULT 'in_progress',
    score NUMERIC(5,2),
    concepts_reviewed UUID[] DEFAULT '{}'::uuid[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Review Items
CREATE TABLE IF NOT EXISTS public.review_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.review_sessions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.quiz_questions(id) ON DELETE SET NULL,
    concept_id UUID REFERENCES public.concepts(id) ON DELETE SET NULL,
    priority_score NUMERIC(5,2) DEFAULT 0,
    user_answer JSONB,
    is_correct BOOLEAN,
    reviewed_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Alter existing tables
-- Alter user_concept_mastery
ALTER TABLE public.user_concept_mastery 
    ADD COLUMN IF NOT EXISTS subject_slug TEXT,
    ADD COLUMN IF NOT EXISTS attempts INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS correct_attempts INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_attempt_at TIMESTAMPTZ;

-- Change types for mastery_score and confidence_score to NUMERIC for better precision
DO $$ 
BEGIN 
    -- Drop existing constraints if they exist (they might be named differently or need to be updated for NUMERIC)
    ALTER TABLE public.user_concept_mastery DROP CONSTRAINT IF EXISTS user_concept_mastery_mastery_score_check;
    ALTER TABLE public.user_concept_mastery DROP CONSTRAINT IF EXISTS user_concept_mastery_confidence_score_check;

    -- Alter column types
    ALTER TABLE public.user_concept_mastery ALTER COLUMN mastery_score TYPE NUMERIC(5,2);
    ALTER TABLE public.user_concept_mastery ALTER COLUMN confidence_score TYPE NUMERIC(5,2);

    -- Re-add constraints
    ALTER TABLE public.user_concept_mastery ADD CONSTRAINT user_concept_mastery_mastery_score_check 
        CHECK (mastery_score >= 0 AND mastery_score <= 100);
    ALTER TABLE public.user_concept_mastery ADD CONSTRAINT user_concept_mastery_confidence_score_check 
        CHECK (confidence_score >= 0 AND confidence_score <= 1);
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error altering user_concept_mastery: %', SQLERRM;
END $$;

-- Alter quiz_questions
ALTER TABLE public.quiz_questions
    ADD COLUMN IF NOT EXISTS concept_id UUID REFERENCES public.concepts(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'medium',
    ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'human',
    ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'vi',
    ADD COLUMN IF NOT EXISTS question_type TEXT DEFAULT 'mcq';

-- Alter curriculum_nodes
ALTER TABLE public.curriculum_nodes
    ADD COLUMN IF NOT EXISTS assessment_config JSONB DEFAULT '{}'::jsonb;

-- 8. RLS Enablement
ALTER TABLE public.assessment_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concept_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_items ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies
-- Assessment Templates: Public read for active templates
CREATE POLICY "Public templates are viewable by everyone" ON public.assessment_templates
    FOR SELECT USING (is_active = true);

-- Assessment Sessions: Users manage their own sessions
CREATE POLICY "Users can manage their own assessment sessions" ON public.assessment_sessions
    FOR ALL USING (auth.uid() = user_id);

-- Assessment Items: Users can read items of their own sessions
CREATE POLICY "Users can manage items of their own sessions" ON public.assessment_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.assessment_sessions
            WHERE id = session_id AND user_id = auth.uid()
        )
    );

-- Concept Reviews: Users manage their own reviews
CREATE POLICY "Users can manage their own concept reviews" ON public.concept_reviews
    FOR ALL USING (auth.uid() = user_id);

-- Review Sessions: Users manage their own sessions
CREATE POLICY "Users can manage their own review sessions" ON public.review_sessions
    FOR ALL USING (auth.uid() = user_id);

-- Review Items: Users can read items of their own sessions
CREATE POLICY "Users can manage items of their own review sessions" ON public.review_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.review_sessions
            WHERE id = session_id AND user_id = auth.uid()
        )
    );

-- 10. Indexes
CREATE INDEX IF NOT EXISTS idx_assessment_templates_subject_id ON public.assessment_templates(subject_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_user_id ON public.assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_template_id ON public.assessment_sessions(template_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_node_id ON public.assessment_sessions(curriculum_node_id);
CREATE INDEX IF NOT EXISTS idx_assessment_items_session_id ON public.assessment_items(session_id);
CREATE INDEX IF NOT EXISTS idx_assessment_items_question_id ON public.assessment_items(question_id);
CREATE INDEX IF NOT EXISTS idx_concept_reviews_user_id ON public.concept_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_concept_reviews_concept_id ON public.concept_reviews(concept_id);
CREATE INDEX IF NOT EXISTS idx_review_sessions_user_id ON public.review_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_review_items_session_id ON public.review_items(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_concept_id ON public.quiz_questions(concept_id);
