-- Scale guardrails: learning_events was the fastest-growing table with no
-- index on event_type/created_at and no FK on session_id. question_bank.metadata_json
-- is an unconstrained JSONB — nothing stops a future importer from pasting
-- base64 image data into it as more subjects/exams get added.

-- 1. learning_events: index the columns dashboards/cleanup jobs will filter by
CREATE INDEX IF NOT EXISTS idx_learning_events_event_type ON public.learning_events(event_type);
CREATE INDEX IF NOT EXISTS idx_learning_events_created_at ON public.learning_events(created_at);
CREATE INDEX IF NOT EXISTS idx_learning_events_subject_slug ON public.learning_events(subject_slug);

-- 2. learning_events.session_id: add FK now that dangling rows (from before
-- sessions existed, or from clients that skipped session creation) are set NULL
-- rather than left orphaned and unenforceable.
UPDATE public.learning_events le
SET session_id = NULL
WHERE le.session_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.learning_sessions ls WHERE ls.id = le.session_id
  );

ALTER TABLE public.learning_events
  ADD CONSTRAINT fk_learning_events_session
  FOREIGN KEY (session_id) REFERENCES public.learning_sessions(id) ON DELETE SET NULL;

-- 3. learning_sessions: dashboard/history queries filter by subject and sort by date
CREATE INDEX IF NOT EXISTS idx_learning_sessions_subject_slug ON public.learning_sessions(subject_slug);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_started_at ON public.learning_sessions(started_at);

-- 4. question_bank.metadata_json: guard against embedded binary/base64 blobs.
-- 100KB is generous for text/option/explanation fields; images belong in
-- Supabase Storage referenced by URL, not inlined here.
ALTER TABLE public.question_bank
  ADD CONSTRAINT chk_question_bank_metadata_size
  CHECK (pg_column_size(metadata_json) < 102400);
