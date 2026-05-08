
-- Create delivery phase enum
CREATE TYPE public.delivery_phase AS ENUM (
  'pending',
  'onboarding',
  'configuracion',
  'operacion',
  'revision',
  'kickoff',
  'implementacion',
  'qa',
  'entrega',
  'cerrado'
);

-- Create delivery type enum
CREATE TYPE public.delivery_type AS ENUM ('recurring', 'one_shot');

-- Add delivery columns to deal_registrations
ALTER TABLE public.deal_registrations
  ADD COLUMN delivery_type public.delivery_type DEFAULT NULL,
  ADD COLUMN delivery_phase public.delivery_phase DEFAULT 'pending',
  ADD COLUMN phase_started_at TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN phase_sla_days INTEGER DEFAULT 7,
  ADD COLUMN delivery_responsible UUID DEFAULT NULL,
  ADD COLUMN delivery_notes TEXT DEFAULT NULL;
