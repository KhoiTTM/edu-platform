-- Gamification Helper Functions
-- Handles XP increments and leveling logic

CREATE OR REPLACE FUNCTION public.increment_xp(user_id_param UUID, amount INTEGER)
RETURNS void AS $$
DECLARE
    current_xp INTEGER;
    current_level INTEGER;
    new_xp INTEGER;
    new_level INTEGER;
BEGIN
    -- 1. Fetch current profile
    SELECT xp, level INTO current_xp, current_level
    FROM public.gamification_profiles
    WHERE user_id = user_id_param;

    -- If no profile exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.gamification_profiles (user_id, xp, level)
        VALUES (user_id_param, amount, 1);
        RETURN;
    END IF;

    -- 2. Calculate new XP
    new_xp := current_xp + amount;
    
    -- 3. Simple Leveling logic (e.g., each level is 100 XP * level)
    new_level := floor(sqrt(new_xp / 100)) + 1;
    IF new_level < 1 THEN new_level := 1; END IF;

    -- 4. Update Profile
    UPDATE public.gamification_profiles
    SET xp = new_xp,
        level = new_level,
        updated_at = now()
    WHERE user_id = user_id_param;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
