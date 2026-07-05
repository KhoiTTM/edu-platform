-- Speaking journey sessions
CREATE TABLE IF NOT EXISTS public.speaking_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  unit_id         TEXT NOT NULL,           -- e.g., 'unit-5'
  session_number  SMALLINT NOT NULL,       -- 1, 2, 3, or 4
  
  -- Status
  status          TEXT DEFAULT 'not_started',  -- not_started | in_progress | complete
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  
  -- Quality metrics (lightweight)
  turn_count          SMALLINT DEFAULT 0,
  avg_words_per_turn  SMALLINT,
  scaffolding_used    BOOLEAN DEFAULT false,
  retries_triggered   SMALLINT DEFAULT 0,
  
  -- Content (for Aria memory)
  session_summary     TEXT,     -- AI-generated 2-sentence summary for next session
  best_moment_text    TEXT,     -- Learner's best sentence
  topics_covered      TEXT[],   -- e.g., ['daily_routine', 'preferences', 'opinions']
  
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, unit_id, session_number)
);

-- Unit speaking progress (denormalized for fast reads)
CREATE TABLE IF NOT EXISTS public.unit_speaking_progress (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  unit_id         TEXT NOT NULL,
  
  sessions_complete   SMALLINT DEFAULT 0,   -- 0-4
  unit_complete       BOOLEAN DEFAULT false,
  last_session_at     TIMESTAMPTZ,
  next_session_due    TIMESTAMPTZ,          -- spaced repetition nudge
  
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, unit_id)
);

-- Learner speaking vocabulary (lightweight memory)
CREATE TABLE IF NOT EXISTS public.learner_speaking_notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  unit_id     TEXT NOT NULL,
  
  note_type   TEXT NOT NULL,   -- 'saved_vocab' | 'aria_tip' | 'learner_strength'
  content     TEXT NOT NULL,
  saved_at    TIMESTAMPTZ DEFAULT NOW(),
  
  source_session  SMALLINT    -- which session generated this
);

-- RLS
ALTER TABLE public.speaking_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unit_speaking_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_speaking_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own their speaking data" ON public.speaking_sessions;
CREATE POLICY "Users own their speaking data" ON public.speaking_sessions
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own their progress" ON public.unit_speaking_progress;
CREATE POLICY "Users own their progress" ON public.unit_speaking_progress
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own their notes" ON public.learner_speaking_notes;
CREATE POLICY "Users own their notes" ON public.learner_speaking_notes
  FOR ALL USING (auth.uid() = user_id);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS speaking_sessions_user_unit_idx ON public.speaking_sessions (user_id, unit_id);
CREATE INDEX IF NOT EXISTS unit_speaking_progress_user_idx ON public.unit_speaking_progress (user_id);
