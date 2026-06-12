# Demodefelek

Demodefelek, host kontrollü Türkçe kelime-çark oyunudur.

Canlı yayında host tek ekranı kontrol eder. Yarışmacılar uygulamaya bağlanmaz. Yayıncı, OBS üzerinden static sayfayı ve gerekiyorsa harici kamera kaynaklarını yayına alır.

## Proje Yapısı

Demodefelek static-only production yapısı kullanır.

Aktif kaynak:

```text
static-demo/
```

GitHub Pages çıktısı:

```text
docs/
```

Production deploy için build gerekmez. GitHub Pages `/docs` klasörünü servis eder.

## Local Çalıştırma

Static demo:

```bat
cd static-demo
python -m http.server 5173
```

Local URL:

```text
http://localhost:5173
```

Production preview:

```bat
cd docs
python -m http.server 5174
```

Preview URL:

```text
http://localhost:5174
```

## GitHub Pages

GitHub Pages ayarı:

```text
Repository > Settings > Pages
Source: Deploy from a branch
Branch: main
Folder: /docs
```

Production URL:

```text
https://ismailkorkmaz1905.github.io/demodefelek/
```

Test URL:

```text
https://ismailkorkmaz1905.github.io/demodefelek-test/
```

## Deploy Akışı

1. Değişiklikleri `static-demo/` içinde yap.
2. `docs/` çıktısını `static-demo/` ile senkron tut.
3. Local `docs` preview ile kontrol et.
4. Önce test remote'a pushla.
5. Kullanıcı açıkça "Production'a pushla" demeden production remote'a push yapma.

Test deploy:

```bash
git push test main:main
```

Production deploy:

```bash
git push origin main
```

## Aktif Dosyalar

```text
static-demo/index.html
static-demo/styles.css
docs/index.html
docs/styles.css
README.md
.gitignore
```

## Proje Dokümantasyonu

Yayın ve proje içi dokümantasyon dosyaları `project-docs/` altında tutulur.

```text
project-docs/BROADCAST_CHECKLIST.md
```

`docs/` klasörü yalnızca GitHub Pages public site çıktısı için kullanılır.

## Özel Soru Havuzu

Host, Kurulum ekranından kendi sorularını ekleyebilir, listedeki özel soruları düzenleyebilir veya CSV dosyasıyla toplu soru yükleyebilir.

Desteklenen CSV kolonları:

```text
answer,category,title,speaker,difficulty
cevap,kategori,başlık,ipucu,konuşmacı,zorluk
```

Özel sorular ve havuz ayarları cihaz bazlı olarak tarayıcı localStorage içinde saklanır:

```text
demodefelek.customPuzzles.v1
demodefelek.customPuzzleSettings.v1
demodefelek.puzzleList.v1
```

Kurulum ekranındaki Bulmaca Cevapları bölümünde hazır cevaplar ve host tarafından eklenen cevaplar düzenlenebilir. Kaydetme localStorage içinde `version`, `updatedAt` ve `puzzles` alanlarıyla saklanır.

## Notlar

- Oyun host kontrollüdür.
- Yarışmacı sayısı 1-4 arasındadır.
- Yarışmacılar uygulamaya bağlanmaz.
- Backend gerekmez.
- Supabase gerekmez.
- Auth gerekmez.
- Oda kodu gerekmez.
- Build gerekmez.
- Static hosting ile çalışır.
- OBS Browser Source içinde URL olarak açılabilir.

## OBS Browser Source

Local yayın testi:

```text
http://localhost:5173
```

GitHub Pages yayın:

```text
https://ismailkorkmaz1905.github.io/demodefelek/
```

Önerilen OBS ayarları:

- Width: 1920
- Height: 1080
- FPS: 60 veya 30
- Shutdown source when not visible: kapalı
- Refresh browser when scene becomes active: kapalı

Yarışmacı kamera görüntüleri uygulamanın parçası değildir. Yayıncı Discord veya başka kamera kaynaklarını OBS içinde ayrı source olarak ekler.
