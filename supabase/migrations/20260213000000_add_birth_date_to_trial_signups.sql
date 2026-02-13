-- Add birth_date column to trial_signups table
ALTER TABLE public.trial_signups 
ADD COLUMN birth_date DATE;

-- Add index for birth_date
CREATE INDEX idx_trial_signups_birth_date ON public.trial_signups(birth_date);
