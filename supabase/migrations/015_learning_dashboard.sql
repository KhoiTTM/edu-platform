-- 1. Raw Events (Layer 1)
CREATE TABLE IF NOT EXISTS public.learning_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID,
    event_type TEXT NOT NULL,
    subject_slug TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Learning Sessions (Layer 2)
CREATE TABLE IF NOT EXISTS public.learning_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_slug TEXT NOT NULL,
    started_at TIMESTAMPTZ DEFAULT now(),
    ended_at TIMESTAMPTZ,
    duration_seconds INT DEFAULT 0,
    summary_metrics JSONB DEFAULT '{}'::jsonb
);

-- 3. Dashboard Snapshots (Layer 3)
CREATE TABLE IF NOT EXISTS public.user_dashboard_stats (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    current_streak INT DEFAULT 0,
    total_learning_minutes INT DEFAULT 0,
    last_ai_insight TEXT,
    last_ai_insight_at TIMESTAMPTZ,
    subject_progress JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_dashboard_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can insert their own events" ON public.learning_events
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select their own events" ON public.learning_events
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own sessions" ON public.learning_sessions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own stats" ON public.user_dashboard_stats
    FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_learning_events_user_id ON public.learning_events(user_id);
CREATE INDEX idx_learning_events_session_id ON public.learning_events(session_id);
CREATE INDEX idx_learning_sessions_user_id ON public.learning_sessions(user_id);

-- Function to initialize stats on user creation (optional but good practice)
-- Or we can just upsert in the API. Let's do upsert in API for simplicity.
