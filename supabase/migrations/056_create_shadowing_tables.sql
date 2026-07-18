-- Create shadowing_lessons table
CREATE TABLE IF NOT EXISTS public.shadowing_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    audio_url VARCHAR(255) NOT NULL,
    repeat_offset DOUBLE PRECISION DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create shadowing_sentences table
CREATE TABLE IF NOT EXISTS public.shadowing_sentences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES public.shadowing_lessons(id) ON DELETE CASCADE NOT NULL,
    sentence_index INTEGER NOT NULL,
    start_time_ms INTEGER NOT NULL,
    end_time_ms INTEGER NOT NULL,
    content TEXT NOT NULL,
    content_vi TEXT NOT NULL,
    words_jsonb JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_lesson_sentence_index UNIQUE (lesson_id, sentence_index)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_shadowing_lessons_slug ON public.shadowing_lessons(slug);
CREATE INDEX IF NOT EXISTS idx_shadowing_sentences_lesson_id ON public.shadowing_sentences(lesson_id);
CREATE INDEX IF NOT EXISTS idx_shadowing_sentences_timing ON public.shadowing_sentences(start_time_ms, end_time_ms);

-- Enable Row Level Security (RLS)
ALTER TABLE public.shadowing_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shadowing_sentences ENABLE ROW LEVEL SECURITY;

-- Allow public read access to both tables (since they are educational content assets)
CREATE POLICY "Allow public read access on shadowing_lessons" 
ON public.shadowing_lessons FOR SELECT USING (true);

CREATE POLICY "Allow public read access on shadowing_sentences" 
ON public.shadowing_sentences FOR SELECT USING (true);
