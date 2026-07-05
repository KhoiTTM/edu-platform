-- Universal Learning Engine Foundation
-- This migration establishes the new schema for a flexible, hierarchical curriculum structure

-- 1. Top-level Context
CREATE TABLE IF NOT EXISTS public.universal_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name_vi TEXT NOT NULL,
    name_en TEXT,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.content_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.universal_subjects(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    provider TEXT, -- e.g., 'Cambridge', 'Canh Dieu'
    version TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Canonical Concepts System
CREATE TABLE IF NOT EXISTS public.canonical_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.universal_subjects(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES public.content_sources(id) ON DELETE SET NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(slug)
);

-- Bridge between Canonical and Specific Concepts
CREATE TABLE IF NOT EXISTS public.concept_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canonical_id UUID NOT NULL REFERENCES public.canonical_concepts(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(canonical_id, concept_id)
);

CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    level INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Curriculum Tree (Hierarchical Nodes)
CREATE TABLE IF NOT EXISTS public.curriculum_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES public.content_sources(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.curriculum_nodes(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- e.g., 'course', 'module', 'unit', 'lesson', 'step'
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    path LTREE, -- Materialized path for O(1) queries (requires ltree extension)
    depth INT DEFAULT 0,
    sort_key INT DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(source_id, slug)
);

-- Note: path LTREE requires the ltree extension to be enabled in Supabase
-- CREATE EXTENSION IF NOT EXISTS ltree;

-- 4. Exercise Composition
CREATE TABLE IF NOT EXISTS public.exercise_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'quiz', -- e.g., 'quiz', 'practice', 'exam'
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.exercise_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    set_id UUID NOT NULL REFERENCES public.exercise_sets(id) ON DELETE CASCADE,
    question_id UUID NOT NULL, -- This will link to the existing 'quiz_questions' table
    sort_key INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(set_id, question_id)
);

-- 5. Bridge Tables (Connecting new schema to old data)
CREATE TABLE IF NOT EXISTS public.lesson_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL, -- Link to existing 'lessons' table (assuming UUID)
    concept_id UUID NOT NULL REFERENCES public.concepts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(lesson_id, concept_id)
);

CREATE TABLE IF NOT EXISTS public.node_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES public.curriculum_nodes(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL, -- Link to existing 'lessons' table
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(node_id, lesson_id)
);

-- RLS Configuration
ALTER TABLE public.universal_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concept_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_lessons ENABLE ROW LEVEL SECURITY;

-- Default Read-only Policies for public data
DROP POLICY IF EXISTS "Allow public read access" ON public.universal_subjects;
CREATE POLICY "Allow public read access" ON public.universal_subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.content_sources;
CREATE POLICY "Allow public read access" ON public.content_sources FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.canonical_concepts;
CREATE POLICY "Allow public read access" ON public.canonical_concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.concepts;
CREATE POLICY "Allow public read access" ON public.concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.concept_variants;
CREATE POLICY "Allow public read access" ON public.concept_variants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.skills;
CREATE POLICY "Allow public read access" ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.curriculum_nodes;
CREATE POLICY "Allow public read access" ON public.curriculum_nodes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.exercise_sets;
CREATE POLICY "Allow public read access" ON public.exercise_sets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.exercise_questions;
CREATE POLICY "Allow public read access" ON public.exercise_questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.lesson_concepts;
CREATE POLICY "Allow public read access" ON public.lesson_concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON public.node_lessons;
CREATE POLICY "Allow public read access" ON public.node_lessons FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_sources_subject_id ON public.content_sources(subject_id);
CREATE INDEX IF NOT EXISTS idx_canonical_concepts_subject_id ON public.canonical_concepts(subject_id);
CREATE INDEX IF NOT EXISTS idx_concepts_source_id ON public.concepts(source_id);
CREATE INDEX IF NOT EXISTS idx_skills_concept_id ON public.skills(concept_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_nodes_source_id ON public.curriculum_nodes(source_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_nodes_parent_id ON public.curriculum_nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_nodes_path ON public.curriculum_nodes USING GIST (path);
CREATE INDEX IF NOT EXISTS idx_exercise_questions_set_id ON public.exercise_questions(set_id);
CREATE INDEX IF NOT EXISTS idx_lesson_concepts_lesson_id ON public.lesson_concepts(lesson_id);
CREATE INDEX IF NOT EXISTS idx_node_lessons_node_id ON public.node_lessons(node_id);
