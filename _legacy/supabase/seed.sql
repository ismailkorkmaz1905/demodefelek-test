insert into public.puzzles (theme, category, answer, normalized_answer, clue, difficulty, enabled, source, notes)
select theme, category, answer, upper(answer), clue, difficulty, true, 'sample', 'Yayın öncesi manuel inceleme gerekli.'
from (
  values
  ('FUTBOL', 'Futbol Terimi', 'Galatasaray', 'Yayın öncesi gözden geçirilecek ipucu.', 1),
  ('FUTBOL', 'Futbol Terimi', 'Fenerbahçe', 'Yayın öncesi gözden geçirilecek ipucu.', 1),
  ('FUTBOL', 'Futbol Terimi', 'Beşiktaş', 'Yayın öncesi gözden geçirilecek ipucu.', 1),
  ('FUTBOL', 'Futbol Terimi', 'Trabzonspor', 'Yayın öncesi gözden geçirilecek ipucu.', 2),
  ('FUTBOL', 'Futbol Terimi', 'Şampiyonlar Ligi', 'Yayın öncesi gözden geçirilecek ipucu.', 3),
  ('GENEL KÜLTÜR', 'Günlük Hayat', 'Ankara', 'Yayın öncesi gözden geçirilecek ipucu.', 1),
  ('GENEL KÜLTÜR', 'Günlük Hayat', 'İstanbul Boğazı', 'Yayın öncesi gözden geçirilecek ipucu.', 2),
  ('GENEL KÜLTÜR', 'Günlük Hayat', 'Mimar Sinan', 'Yayın öncesi gözden geçirilecek ipucu.', 2),
  ('GENEL KÜLTÜR', 'Günlük Hayat', 'Türk Kahvesi', 'Yayın öncesi gözden geçirilecek ipucu.', 1),
  ('KARMA', 'Final', 'Gecenin Cavosu', 'Yayın öncesi gözden geçirilecek ipucu.', 3)
) as seed(theme, category, answer, clue, difficulty);
