-- Update display_name for Cherry
UPDATE public.profiles
SET display_name = 'Cherry'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'tranngocbaonhi.cherry@gmail.com'
);
