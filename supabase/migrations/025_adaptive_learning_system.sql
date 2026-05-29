-- Phase 8: Adaptive Learning System
-- Tables for mastery tracking and spaced repetition (SRS)

-- 1. Mastery Tracking
-- Stores long-term progress for each concept per user
CREATE TABLE IF NOT EXISTS public.mastery_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES public.curriculum_concepts(id) ON DELETE CASCADE,
    mastery_score FLOAT DEFAULT 0.0, -- 0 to 100
    correct_streak INTEGER DEFAULT 0,
    last_reviewed_at TIMESTAMPTZ DEFAULT now(),
    
    -- SM-2 Specific Fields
    interval INTEGER DEFAULT 0, -- days
    ease_factor FLOAT DEFAULT 2.5,
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, concept_id)
);

-- 2. Adaptive Review Queue
-- Transient table for concepts that need immediate or upcoming review
CREATE TABLE IF NOT EXISTS public.adaptive_review_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES public.curriculum_concepts(id) ON DELETE CASCADE,
    next_review_at TIMESTAMPTZ NOT NULL,
    priority INTEGER DEFAULT 1, -- higher is more urgent
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, concept_id)
);

-- RLS
ALTER TABLE public.mastery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adaptive_review_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own mastery" ON public.mastery_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own review queue" ON public.adaptive_review_queue FOR SELECT USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_mastery_user_concept ON public.mastery_tracking(user_id, concept_id);
CREATE INDEX IF NOT EXISTS idx_review_queue_next_review ON public.adaptive_review_queue(next_review_at);
CREATE INDEX IF NOT EXISTS idx_review_queue_user ON public.adaptive_review_queue(user_id);
