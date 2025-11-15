-- Add date_of_birth column to trial_signups table
ALTER TABLE public.trial_signups 
ADD COLUMN date_of_birth DATE NOT NULL DEFAULT '1990-01-01'::date;

-- Remove the default after adding the column
ALTER TABLE public.trial_signups 
ALTER COLUMN date_of_birth DROP DEFAULT;