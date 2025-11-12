-- Drop the trigger for automatic updated_at
DROP TRIGGER IF EXISTS update_quiz_responses_updated_at ON public.quiz_responses;