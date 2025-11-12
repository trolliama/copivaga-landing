-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create quiz_responses table to store user quiz answers
CREATE TABLE public.quiz_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trial_signup_id uuid NOT NULL REFERENCES public.trial_signups(id) ON DELETE CASCADE,
  span text NOT NULL,
  answer text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quiz responses
CREATE POLICY "Anyone can insert quiz responses"
ON public.quiz_responses
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update quiz responses
CREATE POLICY "Anyone can update quiz responses"
ON public.quiz_responses
FOR UPDATE
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_quiz_responses_trial_signup_id ON public.quiz_responses(trial_signup_id);
CREATE INDEX idx_quiz_responses_span ON public.quiz_responses(span);

-- Create trigger for updated_at
CREATE TRIGGER update_quiz_responses_updated_at
  BEFORE UPDATE ON public.quiz_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();