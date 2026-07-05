-- Migration 018: Visual Learning World & Gamification Engine
-- Adds Gamification Profiles, Learning Experiences, and Learning Path Nodes (Coordinates)

-- 1. Gamification Engine (XP, Level, Energy)
CREATE TABLE IF NOT EXISTS public.gamification_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    xp INTEGER DEFAULT 0 NOT NULL,
    level INTEGER DEFAULT 1 NOT NULL,
    rank VARCHAR(50) DEFAULT 'Novice' NOT NULL,
    streak INTEGER DEFAULT 0 NOT NULL,
    energy INTEGER DEFAULT 5 NOT NULL,
    focus_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for gamification_profiles
ALTER TABLE public.gamification_profiles ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view own gamification profile" ON public.gamification_profiles;
    DROP POLICY IF EXISTS "Users can update own gamification profile" ON public.gamification_profiles;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

CREATE POLICY "Users can view own gamification profile" 
    ON public.gamification_profiles FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own gamification profile" 
    ON public.gamification_profiles FOR UPDATE 
    USING (auth.uid() = user_id);


-- 2. Learning Experiences (Allows multiple ways to play the same lesson)
CREATE TABLE IF NOT EXISTS public.learning_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES public.curriculum_nodes(id) ON DELETE CASCADE,
    experience_type VARCHAR(50) NOT NULL, -- 'lesson_mode', 'boss_mode', 'speedrun'
    flow_config JSONB DEFAULT '{}'::jsonb,
    reward_config JSONB DEFAULT '{}'::jsonb,
    difficulty_mode VARCHAR(20) DEFAULT 'normal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.learning_experiences ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public can view learning experiences" ON public.learning_experiences;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

CREATE POLICY "Public can view learning experiences" 
    ON public.learning_experiences FOR SELECT 
    USING (true);


-- 3. Visual Map Graph (Learning Path Nodes)
-- Connects to curriculum_nodes to provide X,Y coordinates and visual gamification
CREATE TABLE IF NOT EXISTS public.learning_path_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curriculum_node_id UUID REFERENCES public.curriculum_nodes(id) ON DELETE CASCADE,
    node_type VARCHAR(50) DEFAULT 'lesson' NOT NULL, -- lesson, boss, checkpoint, side_quest
    unlock_rules JSONB DEFAULT '{}'::jsonb,
    position_x FLOAT DEFAULT 0.0,
    position_y FLOAT DEFAULT 0.0,
    visual_theme VARCHAR(50) DEFAULT 'default',
    reward_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(curriculum_node_id)
);

ALTER TABLE public.learning_path_nodes ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public can view learning path nodes" ON public.learning_path_nodes;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

CREATE POLICY "Public can view learning path nodes" 
    ON public.learning_path_nodes FOR SELECT 
    USING (true);
