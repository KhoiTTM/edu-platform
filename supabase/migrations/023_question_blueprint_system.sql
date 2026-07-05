-- Phase 3: Question Blueprint System
-- Defines reusable educational interaction templates

-- 1. Question Blueprints Table
CREATE TABLE IF NOT EXISTS public.question_blueprints (
    id TEXT PRIMARY KEY, -- e.g., 'vocab_to_image', 'sentence_reorder'
    title TEXT NOT NULL,
    description TEXT,
    supported_concepts TEXT[] NOT NULL, -- e.g., ['vocabulary']
    interaction_type TEXT NOT NULL, -- e.g., 'tap', 'drag', 'reorder', 'match', 'type', 'speak'
    pedagogy_type TEXT NOT NULL, -- e.g., 'recall', 'recognition', 'comprehension'
    difficulty_scaling BOOLEAN DEFAULT true,
    metadata_schema JSONB DEFAULT '{}'::jsonb, -- JSON Schema for required concept data
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Concept to Blueprint Mapping (Optional helper table if many-to-many is complex)
-- For now, supported_concepts array in blueprints is enough.

-- RLS Configuration
ALTER TABLE public.question_blueprints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to question_blueprints" ON public.question_blueprints FOR SELECT USING (true);

-- Seed Initial Blueprints for Grade 3 English
INSERT INTO public.question_blueprints (id, title, description, supported_concepts, interaction_type, pedagogy_type, difficulty_scaling)
VALUES 
('vocab_to_image', 'Vocabulary to Image', 'Identify a word based on an image.', ARRAY['vocabulary'], 'tap', 'recognition', true),
('vocab_to_word', 'Vocabulary to Word', 'Translate or identify a word from text.', ARRAY['vocabulary'], 'tap', 'recall', true),
('sentence_reorder', 'Sentence Reorder', 'Arrange words in the correct order.', ARRAY['sentence_pattern'], 'reorder', 'application', true),
('fill_blank', 'Fill in the Blank', 'Complete a sentence with the correct word.', ARRAY['vocabulary', 'grammar_micro_pattern'], 'type', 'recall', true),
('match_pair', 'Match Pairs', 'Match related words or concepts.', ARRAY['vocabulary', 'phonics'], 'match', 'comprehension', true),
('tap_correct_word', 'Tap Correct Word', 'Pick the correct word among distractors.', ARRAY['vocabulary'], 'tap', 'recognition', false);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blueprints_interaction ON public.question_blueprints(interaction_type);
CREATE INDEX IF NOT EXISTS idx_blueprints_pedagogy ON public.question_blueprints(pedagogy_type);
