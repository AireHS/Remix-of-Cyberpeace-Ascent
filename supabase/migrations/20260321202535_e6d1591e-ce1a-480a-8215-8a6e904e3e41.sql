
-- Create admin role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: users can view their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Admin policies for partner_profiles: admins can view and update all
CREATE POLICY "Admins can view all profiles" ON public.partner_profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles" ON public.partner_profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for partner_resources: admins can do everything
CREATE POLICY "Admins can view all resources" ON public.partner_resources
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert resources" ON public.partner_resources
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resources" ON public.partner_resources
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resources" ON public.partner_resources
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Make current user (marco123@gmail.com) an admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('31d0cfd9-43a5-4213-9076-77e85734d966', 'admin');
