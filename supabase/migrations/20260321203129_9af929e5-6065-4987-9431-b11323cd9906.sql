
-- Drop the permissive INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.partner_profiles;

-- Create restricted INSERT policy that enforces pending status and authorized level
CREATE POLICY "Users can insert own profile" ON public.partner_profiles
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND status = 'pending'
    AND level = 'authorized'
  );
