
-- Add is_company_rep to partner_profiles
ALTER TABLE public.partner_profiles ADD COLUMN IF NOT EXISTS is_company_rep boolean NOT NULL DEFAULT false;

-- Create deal status enum
CREATE TYPE public.deal_status AS ENUM ('registered', 'in_progress', 'won', 'lost', 'expired');

-- Create deal_registrations table
CREATE TABLE public.deal_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_profile_id uuid NOT NULL REFERENCES public.partner_profiles(id) ON DELETE CASCADE,
  company_name_partner text NOT NULL, -- cached from partner profile for quick queries
  client_company text NOT NULL,
  client_contact text,
  client_email text,
  deal_description text NOT NULL,
  estimated_value numeric(12,2),
  currency text NOT NULL DEFAULT 'USD',
  status deal_status NOT NULL DEFAULT 'registered',
  notes text,
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deal_registrations ENABLE ROW LEVEL SECURITY;

-- Trigger for updated_at
CREATE TRIGGER update_deal_registrations_updated_at
  BEFORE UPDATE ON public.deal_registrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: Sellers see only their own deals
CREATE POLICY "Users can view own deals" ON public.deal_registrations
  FOR SELECT USING (
    partner_profile_id IN (
      SELECT id FROM public.partner_profiles WHERE user_id = auth.uid()
    )
  );

-- RLS: Company reps can see all deals from their company
CREATE POLICY "Company reps can view company deals" ON public.deal_registrations
  FOR SELECT USING (
    company_name_partner IN (
      SELECT company_name FROM public.partner_profiles 
      WHERE user_id = auth.uid() AND is_company_rep = true
    )
  );

-- RLS: Admins can see all deals
CREATE POLICY "Admins can view all deals" ON public.deal_registrations
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS: Approved partners can insert deals
CREATE POLICY "Approved partners can insert deals" ON public.deal_registrations
  FOR INSERT WITH CHECK (
    partner_profile_id IN (
      SELECT id FROM public.partner_profiles 
      WHERE user_id = auth.uid() AND status = 'approved'
    )
  );

-- RLS: Users can update their own deals (only notes)
CREATE POLICY "Users can update own deals" ON public.deal_registrations
  FOR UPDATE USING (
    partner_profile_id IN (
      SELECT id FROM public.partner_profiles WHERE user_id = auth.uid()
    )
  ) WITH CHECK (
    partner_profile_id IN (
      SELECT id FROM public.partner_profiles WHERE user_id = auth.uid()
    )
  );

-- RLS: Admins can update all deals (status, admin_notes)
CREATE POLICY "Admins can update all deals" ON public.deal_registrations
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
