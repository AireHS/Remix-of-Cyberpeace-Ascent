
-- Enum for lead status
CREATE TYPE public.lead_status AS ENUM ('new', 'assigned', 'contacted', 'converted', 'discarded');

-- Enum for payment method preference
CREATE TYPE public.payment_method AS ENUM ('card', 'transfer_oc');

-- Enum for service type
CREATE TYPE public.service_type AS ENUM ('one_shot', 'recurring');

CREATE TABLE public.pricing_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Contact info
  full_name TEXT NOT NULL,
  corporate_email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  -- Service details
  service_slug TEXT NOT NULL,
  service_type service_type NOT NULL,
  payment_method payment_method NOT NULL DEFAULT 'transfer_oc',
  estimated_value NUMERIC,
  currency TEXT NOT NULL DEFAULT 'USD',
  calculation_params JSONB DEFAULT '{}',
  -- CRM
  status lead_status NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_notes TEXT,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_leads ENABLE ROW LEVEL SECURITY;

-- Public insert (no auth needed for lead capture form)
CREATE POLICY "Anyone can submit a pricing lead"
ON public.pricing_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins full access
CREATE POLICY "Admins can view all leads"
ON public.pricing_leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.pricing_leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.pricing_leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_pricing_leads_updated_at
BEFORE UPDATE ON public.pricing_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for country-based assignment
CREATE INDEX idx_pricing_leads_country ON public.pricing_leads(country);
CREATE INDEX idx_pricing_leads_status ON public.pricing_leads(status);
