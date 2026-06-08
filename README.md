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

## Proje Dokümantasyonu

Yayın ve proje içi dokümantasyon dosyaları `project-docs/` altında tutulur.

```text
project-docs/BROADCAST_CHECKLIST.md
```

`docs/` klasörü yalnızca GitHub Pages public site çıktısı için kullanılır.

## Notlar

- Oyun host kontrollüdür.
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
