
-- Add choose_seconds setting (word selection time)
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS choose_seconds INTEGER NOT NULL DEFAULT 15;

-- Bump server-side default ranges via app code; no constraints to change.

-- Enable cron extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 6h auto-cleanup: delete rooms older than 6h
SELECT cron.schedule(
  'cleanup-old-rooms',
  '*/15 * * * *',
  $$DELETE FROM public.rooms WHERE created_at < NOW() - INTERVAL '6 hours';$$
);

-- Empty-room cleanup: delete rooms with no players (every 5 min)
SELECT cron.schedule(
  'cleanup-empty-rooms',
  '*/5 * * * *',
  $$DELETE FROM public.rooms r
    WHERE NOT EXISTS (SELECT 1 FROM public.room_players p WHERE p.room_id = r.id)
      AND r.created_at < NOW() - INTERVAL '2 minutes';$$
);

-- Insert two-word combination words (small amount)
INSERT INTO public.word_bank (language, word, category) VALUES
  ('fa', 'برج ایفل', 'مکان'),
  ('fa', 'دیوار چین', 'مکان'),
  ('fa', 'قطب شمال', 'مکان'),
  ('fa', 'ماشین لباسشویی', 'وسایل'),
  ('fa', 'چراغ راهنمایی', 'وسایل'),
  ('fa', 'خرس قطبی', 'حیوان'),
  ('fa', 'سگ آبی', 'حیوان'),
  ('fa', 'مرد عنکبوتی', 'شخصیت'),
  ('fa', 'بابانوئل', 'شخصیت'),
  ('fa', 'پدر بزرگ', 'شخصیت'),
  ('fa', 'هندوانه قرمز', 'غذا'),
  ('fa', 'برج میلاد', 'مکان'),
  ('fa', 'سوپ مرغ', 'غذا'),
  ('fa', 'دوچرخه سواری', 'فعالیت'),
  ('fa', 'دست کش', 'وسایل'),
  ('fa', 'مسواک برقی', 'وسایل'),
  ('fa', 'کوه یخ', 'مکان'),
  ('fa', 'آدم برفی', 'شخصیت'),
  ('fa', 'گل آفتابگردان', 'گیاه'),
  ('fa', 'پروانه شب', 'حیوان'),
  ('en', 'eiffel tower', 'place'),
  ('en', 'great wall', 'place'),
  ('en', 'north pole', 'place'),
  ('en', 'washing machine', 'object'),
  ('en', 'traffic light', 'object'),
  ('en', 'polar bear', 'animal'),
  ('en', 'spider man', 'character'),
  ('en', 'santa claus', 'character'),
  ('en', 'ice cream', 'food'),
  ('en', 'french fries', 'food'),
  ('en', 'rubber duck', 'object'),
  ('en', 'shooting star', 'nature'),
  ('en', 'roller coaster', 'place'),
  ('en', 'snow man', 'character'),
  ('en', 'hot dog', 'food'),
  ('en', 'pizza slice', 'food'),
  ('en', 'soccer ball', 'object'),
  ('en', 'mountain peak', 'nature'),
  ('en', 'tennis racket', 'object'),
  ('en', 'piano keys', 'object')
ON CONFLICT DO NOTHING;
