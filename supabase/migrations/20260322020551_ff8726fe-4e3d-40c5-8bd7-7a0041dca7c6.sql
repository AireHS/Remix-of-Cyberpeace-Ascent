
-- Drop the permissive UPDATE policy for users
DROP POLICY IF EXISTS "Users can update own profile" ON public.partner_profiles;

-- Recreate with WITH CHECK that prevents changing status or level
CREATE POLICY "Users can update own profile" ON public.partner_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND status = 'pending' AND level = 'authorized');
