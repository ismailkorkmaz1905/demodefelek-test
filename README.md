# Demodefelek

Demodefelek, host kontrollü Türkçe kelime-çark oyunudur.

Canlı yayında host tek ekranı kontrol eder. Yarışmacılar uygulamaya bağlanmaz. Yayıncı, OBS üzerinden static sayfayı ve gerekiyorsa harici kamera kaynaklarını yayına alır.

## Çalışan Static Demo

Kaynak demo:

```text
static-demo/index.html
static-demo/styles.css
```

Local çalıştırma:

```bat
cd static-demo
python -m http.server 5173
```

Local URL:

```text
http://localhost:5173
```

## GitHub Pages

GitHub Pages publish folder:

```text
docs/
```

GitHub Pages ayarı:

```text
Settings > Pages > Deploy from a branch > main > /docs
```

Yayın URL örneği:

```text
https://USERNAME.github.io/REPOSITORY_NAME/
```

Bu yaklaşımda build gerekmez. GitHub Pages `docs/index.html` ve `docs/styles.css` dosyalarını doğrudan servis eder.

## Ortamlar

Production:

```text
URL: https://ismailkorkmaz1905.github.io/demodefelek/
remote: origin
branch: main
publish folder: /docs
```

Test:

```text
URL: https://ismailkorkmaz1905.github.io/demodefelek-test/
remote: test
branch: main
publish folder: /docs
```

## Geliştirme ve Deploy Akışı

1. Local değişiklik yap.
2. Local docs server ile test et.
3. Commit oluştur.
4. Önce test remote'a pushla.
5. Test URL'de kullanıcı kontrol eder.
6. Kullanıcı açıkça "Production'a pushla" demeden origin'e push yapılmaz.

Test deploy:

```bash
git push test main:main
```

Production deploy:

```bash
git push origin main
```

Production koruma kuralı: test URL onayı alınmadan production değişmeyecek. Force push kullanılmayacak.

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

CSV import mevcut özel soru havuzunu tamamen değiştirir. Eski özel soruların kaybolmaması için önce export alın.

Excel dosyaları doğrudan parse edilmez. Excel dosyasını CSV olarak kaydedip yükleyin.

Özel sorular ve havuz ayarları cihaz bazlı olarak tarayıcı localStorage içinde saklanır:

```text
demodefelek.customPuzzles.v1
demodefelek.customPuzzleSettings.v1
demodefelek.puzzleList.v1
```

Custom sorularda `verified: true`, sorunun host tarafından oynanabilir olarak onaylandığı anlamına gelir. Dış kaynak doğrulaması anlamına gelmez.

Kurulum ekranındaki Bulmaca Cevapları bölümünde hazır cevaplar ve host tarafından eklenen cevaplar düzenlenebilir. Kaydetme localStorage içinde `version`, `updatedAt` ve `puzzles` alanlarıyla saklanır. Varsayılan Cevaplara Dön butonu bu listeyi temizleyip hazır puzzle listesine geri döner.

Kurulum ekranındaki özel soru listesinde cevap, kategori, ipucu, kaynak, zorluk ve aktiflik bilgisi inline düzenlenebilir. Kaydet butonu validation ve duplicate kontrolünden sonra localStorage kaydını günceller.

Özel soru havuzu JSON olarak dışa aktarılabilir:

```text
demodefelek-custom-puzzles.json
```

Kurulum ekranında hazır havuz ve özel havuz birlikte veya ayrı oynatılabilir. Production'a push yapılmadan önce değişiklikler test ortamında kontrol edilmelidir.

## Notlar

- Oyun host kontrollüdür.
- Yarışmacı sayısı 1-4 arasındadır.
- En fazla 4 kişi desteklenir.
- 1 kişi modunda sıra aynı oyuncuda kalır.
- 2-4 kişi modunda sıra aktif oyuncular arasında döner.
- Yeni Bulmaca başlatıldığında başlangıç oyuncusu aktif oyuncular arasında sırayla kayar.
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

GitHub Pages yayın örneği:

```text
https://USERNAME.github.io/REPOSITORY_NAME/
```

Önerilen OBS ayarları:

- Width: 1920
- Height: 1080
- FPS: 60 veya 30
- Shutdown source when not visible: kapalı
- Refresh browser when scene becomes active: kapalı

Yarışmacı kamera görüntüleri uygulamanın parçası değildir. Yayıncı Discord veya başka kamera kaynaklarını OBS içinde ayrı source olarak ekler.

## GitHub Hazırlık Komutları

Bu komutlar otomatik çalıştırılmadı:

```bash
git init
git add .
git commit -m "Prepare Demodefelek static demo for GitHub Pages"
git branch -M main
git remote add origin <REPO_URL>
git push -u origin main
```

## Test Komutları

```bash
npm run lint
npm run test
npm run build
```

Not: `npm run test` ve `npm run build` Vite/Vitest config yüklerken Windows `spawn EPERM` hatasına takılabilir. Bu static sayfanın bozuk olduğu anlamına gelmez. GitHub Pages `/docs` üzerinden HTML/CSS servis ettiği için Vite build aşamasına ihtiyaç yoktur.

## Legacy / Current Static Demo Tarafından Kullanılmayan Alanlar

Aşağıdaki alanlar mevcut static demo için zorunlu değildir, ancak bu aşamada silinmedi:

- `src/`
- `supabase/`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `vitest.config.ts`
- `static_server.py`

React/Vite, Supabase, oda kodu, join screen, stage route, multiplayer, RPC, RLS, Cloudflare Worker ve eski puzzle seed bilgileri mevcut static demo tarafından kullanılmayan legacy alanlar olarak değerlendirilmelidir.
