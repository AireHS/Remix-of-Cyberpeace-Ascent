
-- Create enum for partner levels
CREATE TYPE public.partner_level AS ENUM ('authorized', 'gold', 'platinum');

-- Create enum for resource categories
CREATE TYPE public.resource_category AS ENUM (
  'sales_playbook', 
  'storytelling', 
  'presentations', 
  'technical_guides', 
  'case_studies', 
  'marketing_materials',
  'certifications',
  'competitive_intelligence'
);

-- Create partner_profiles table
CREATE TABLE public.partner_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  level partner_level NOT NULL DEFAULT 'authorized',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner_resources table
CREATE TABLE public.partner_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category resource_category NOT NULL,
  min_level partner_level NOT NULL DEFAULT 'authorized',
  file_url TEXT,
  thumbnail_url TEXT,
  file_type TEXT DEFAULT 'pdf',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_resources ENABLE ROW LEVEL SECURITY;

-- Partner profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON public.partner_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.partner_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.partner_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Resources: approved partners can view resources at their level or below
CREATE POLICY "Approved partners can view resources" ON public.partner_resources
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.partner_profiles pp
      WHERE pp.user_id = auth.uid()
        AND pp.status = 'approved'
        AND (
          (pp.level = 'platinum') OR
          (pp.level = 'gold' AND min_level IN ('authorized', 'gold')) OR
          (pp.level = 'authorized' AND min_level = 'authorized')
        )
    )
  );

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_partner_profiles_updated_at
  BEFORE UPDATE ON public.partner_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
