-- Migration 028: Assessment Studio Schema
-- Supports offline exam generation, teacher review, and collection management

-- 1. Assessment Status Enum
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'assessment_status') THEN
        CREATE TYPE public.assessment_status AS ENUM ('draft', 'published', 'archived');
    END IF;
END $$;

-- 2. Assessment Collections
-- Logical groups of exams (e.g., "Semester 1 Mock Tests", "Unit 1 Worksheets")
CREATE TABLE IF NOT EXISTS public.assessment_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subject_slug TEXT NOT NULL, -- e.g., 'tieng_anh'
    grade INTEGER NOT NULL,
    curriculum TEXT DEFAULT 'global_success',
    semester INTEGER,
    exam_type TEXT, -- e.g., 'midterm', 'final', 'unit_test'
    difficulty_target FLOAT DEFAULT 1.0,
    prompt_context TEXT, -- The teacher's original instructions/intent
    status public.assessment_status DEFAULT 'draft',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Exams
-- Specific instances of assessments generated within a collection
CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID NOT NULL REFERENCES public.assessment_collections(id) ON DELETE CASCADE,
    exam_number INTEGER DEFAULT 1,
    title TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 45,
    total_questions INTEGER DEFAULT 0,
    generation_mode TEXT DEFAULT 'balanced', -- e.g., 'balanced', 'challenge', 'review'
    metadata_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Exam Questions
-- Junction table linking exams to the question_bank
CREATE TABLE IF NOT EXISTS public.exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    question_bank_id UUID NOT NULL REFERENCES public.question_bank(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    points FLOAT DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(exam_id, order_index)
);

-- 5. Assessment Sources
-- Registry of reference materials used for generation
CREATE TABLE IF NOT EXISTS public.assessment_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subject_slug TEXT NOT NULL,
    grade INTEGER NOT NULL,
    source_type TEXT NOT NULL, -- e.g., 'textbook', 'sample_exam', 'worksheet'
    file_url TEXT,
    metadata_json JSONB DEFAULT '{}'::jsonb,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Configuration
ALTER TABLE public.assessment_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_sources ENABLE ROW LEVEL SECURITY;

-- Policies: For now, all authenticated users can manage assessments
-- In production, this would be restricted to 'teacher' or 'admin' roles
CREATE POLICY "Enable all access for authenticated users on collections" 
    ON public.assessment_collections FOR ALL 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users on exams" 
    ON public.exams FOR ALL 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users on exam_questions" 
    ON public.exam_questions FOR ALL 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users on sources" 
    ON public.assessment_sources FOR ALL 
    USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_collections_subject_grade ON public.assessment_collections(subject_slug, grade);
CREATE INDEX IF NOT EXISTS idx_exams_collection_id ON public.exams(collection_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_exam_id ON public.exam_questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_sources_subject_grade ON public.assessment_sources(subject_slug, grade);
