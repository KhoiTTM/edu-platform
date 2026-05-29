-- Phase 2: Canonical Curriculum System
-- This migration defines the core tables for the deterministic curriculum engine

-- 1. Curriculum Units
CREATE TABLE IF NOT EXISTS public.curriculum_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL, -- e.g., 'english', 'math'
    grade INTEGER NOT NULL,
    unit_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    book_name TEXT NOT NULL, -- e.g., 'Global Success 3'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(subject, grade, unit_number, book_name)
);

-- 2. Curriculum Lessons
CREATE TABLE IF NOT EXISTS public.curriculum_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID NOT NULL REFERENCES public.curriculum_units(id) ON DELETE CASCADE,
    lesson_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    page_start INTEGER,
    page_end INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(unit_id, lesson_number)
);

-- 3. Curriculum Concepts
CREATE TABLE IF NOT EXISTS public.curriculum_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES public.curriculum_lessons(id) ON DELETE CASCADE,
    concept_type TEXT NOT NULL, -- e.g., 'vocabulary', 'sentence_pattern', 'phonics'
    content_json JSONB NOT NULL,
    difficulty FLOAT DEFAULT 1.0,
    source_anchor JSONB NOT NULL, -- e.g., {"book": "...", "unit": 1, "page": 10, "activity": "..."}
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Concept Dependencies
CREATE TABLE IF NOT EXISTS public.concept_dependencies (
    concept_id UUID NOT NULL REFERENCES public.curriculum_concepts(id) ON DELETE CASCADE,
    depends_on_concept_id UUID NOT NULL REFERENCES public.curriculum_concepts(id) ON DELETE CASCADE,
    PRIMARY KEY (concept_id, depends_on_concept_id),
    CHECK (concept_id <> depends_on_concept_id)
);

-- RLS Configuration
ALTER TABLE public.curriculum_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concept_dependencies ENABLE ROW LEVEL SECURITY;

-- Default Read-only Policies for public data
CREATE POLICY "Allow public read access to curriculum_units" ON public.curriculum_units FOR SELECT USING (true);
CREATE POLICY "Allow public read access to curriculum_lessons" ON public.curriculum_lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read access to curriculum_concepts" ON public.curriculum_concepts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to concept_dependencies" ON public.concept_dependencies FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_curriculum_units_subject_grade ON public.curriculum_units(subject, grade);
CREATE INDEX IF NOT EXISTS idx_curriculum_lessons_unit_id ON public.curriculum_lessons(unit_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_lesson_id ON public.curriculum_concepts(lesson_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_type ON public.curriculum_concepts(concept_type);
