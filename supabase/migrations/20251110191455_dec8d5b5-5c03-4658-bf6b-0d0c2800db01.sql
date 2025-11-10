-- Create table to store trial signups
CREATE TABLE public.trial_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but we'll create a policy that allows inserts from anyone)
ALTER TABLE public.trial_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert trial signups (public form)
CREATE POLICY "Anyone can insert trial signups"
ON public.trial_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create index for email lookups
CREATE INDEX idx_trial_signups_email ON public.trial_signups(email);
CREATE INDEX idx_trial_signups_created_at ON public.trial_signups(created_at DESC);