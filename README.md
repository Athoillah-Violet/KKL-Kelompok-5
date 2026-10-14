# 🌴 KKL BALI — KELOMPOK 5 (Website Dokumentasi Perjalanan)

Website arsip digital jurnal perjalanan **Kunjungan Kerja Lapangan (KKL) Kelompok 5 ke Bali**. Didesain dengan konsep **Tropical Cinematic Editorial Journal**, menggabungkan estetika fotografi editorial majalah, nuansa dokumenter sinematik Bali, dan kemudahan kustomisasi konten.

Website ini **100% statis**, menggunakan Vanilla HTML5, CSS3, dan JavaScript, serta siap di-hosting langsung di **GitHub Pages**.

---

## 📁 Struktur Direktori Proyek

```
web KKL/
│
├── index.html                  # Struktur utama halaman web (Section A - L)
├── README.md                   # Panduan teknis & tutorial pemakaian
├── .nojekyll                   # Memastikan GitHub Pages menyajikan file statis langsung
│
├── css/
│   └── style.css               # Desain, tipografi, grid editorial, dan responsivitas
│
├── js/
│   ├── data.js                 # PUSAT DATA KONTEN (Semua teks, foto & video diatur di sini)
│   └── script.js               # Mesin interaksi (Lightbox, filter, scrollspy, video player)
│
└── assets/
    ├── images/
    │   ├── hero/               # Foto latar hero (hero-cover.jpg)
    │   ├── destinations/       # Foto destinasi wisata (cover & galeri pendukung)
    │   ├── industry/           # Foto kunjungan industri & workshop
    │   ├── moments/            # Foto momen kebersamaan, candid & bus
    │   ├── members/            # Foto portrait 10 anggota (member-01.jpg s.d. member-10.jpg)
    │   └── group/              # Foto portrait seluruh anggota kelompok (group-portrait.jpg)
    │
    └── videos/                 # Video perjalanan (.mp4) & thumbnail poster
```

---

## 🚀 Cara Menjalankan Website Secara Lokal

Anda tidak memerlukan build tool, bundler, atau backend.

### Opsi 1: Menggunakan Python (Rekomendasi)
Buka terminal / PowerShell di folder proyek ini (`d:\web KKL`), lalu jalankan:
```bash
python -m http.server 8080
```
Buka browser di: `http://localhost:8080/`

### Opsi 2: Menggunakan Node.js
```bash
npx serve .
```

### Opsi 3: Menggunakan VS Code Live Server
Klik kanan pada file `index.html` lalu pilih **Open with Live Server**.

---

## 📸 PANDUAN LENGKAP: Mengganti Foto & Video di Setiap Bagian

Semua penggantian media dilakukan melalui dua langkah mudah:
1. **Simpan file foto/video** ke dalam folder `assets/images/...` atau `assets/videos/`.
2. **Perbarui nama file/path** pada file [`js/data.js`](js/data.js).

---

### 1. FOTO HERO (Latar Belakang Utama Paling Atas)
* **Lokasi file:** `assets/images/hero/hero-cover.jpg`
* **Rasio ideal:** Landscape `16:9` (resolusi disarankan `1920x1080` atau `2560x1440`).
* **Pengaturan di `js/data.js` (pada `heroConfig`):**
  ```javascript
  const heroConfig = {
    mediaType: "image", // Gunakan "image" untuk foto latar
    imageSrc: "assets/images/hero/hero-cover.jpg",
    imageAlt: "Panorama Danau Beratan Bedugul",
    ...
  };
  ```

---

### 2. VIDEO LATAR HERO (Jika Ingin Menggunakan Video di Bagian Paling Atas)
* **Lokasi file:** `assets/videos/journey-highlight.mp4`
* **Format:** MP4 H.264 (video tanpa audio / muted otomatis agar tidak mengganggu).
* **Pengaturan di `js/data.js` (pada `heroConfig`):**
  ```javascript
  const heroConfig = {
    mediaType: "video", // Ubah dari "image" menjadi "video"
    videoSrc: "assets/videos/journey-highlight.mp4",
    videoPoster: "assets/images/hero/hero-cover.jpg", // Tampil saat video sedang dimuat
    ...
  };
  ```

---

### 3. FOTO DI BAGIAN "ABOUT THE JOURNEY"
* **Lokasi file:** `assets/images/destinations/` atau `assets/images/industry/`
* **Rasio ideal:** `4:3`
* **Pengaturan di `js/data.js` (pada `siteConfig.about`):**
  ```javascript
  supportingPhoto1: {
    src: "assets/images/destinations/tanah-lot.jpg",
    alt: "Pesisir samudra di Bali",
    caption: "Momen refleksi di tepi samudra Pulau Dewata"
  },
  supportingPhoto2: {
    src: "assets/images/industry/creative-industry.jpg",
    alt: "Diskusi di lokasi kunjungan industri",
    caption: "Sesi observasi lapangan & dialog interaktif"
  }
  ```

---

### 4. FOTO TIMELINE "JOURNEY OVERVIEW"
* **Lokasi file:** `assets/images/...`
* **Rasio ideal:** `16:10` atau `4:3`
* **Pengaturan di `js/data.js` (pada `journeyOverview`):**
  ```javascript
  {
    dayNumber: "01",
    dayLabel: "Hari 01",
    date: "12 Oktober 2026",
    title: "Kedatangan & Inisiasi Langkah di Bali",
    location: "Denpasar & Sanur",
    description: "Tiba di Bali, briefing koordinasi kelompok...",
    photo: "assets/images/destinations/tanah-lot.jpg" // Ganti path foto di sini
  }
  ```

---

### 5. FOTO DESTINASI WISATA (Bagian Wisata & Galeri Tambahan)
Setiap destinasi memiliki 1 foto cover utama dan beberapa foto galeri pendukung:
* **Lokasi file:** `assets/images/destinations/`
* **Rasio ideal:** Cover `16:10` atau `4:3`, thumbnail `4:3`
* **Pengaturan di `js/data.js` (pada `destinations`):**
  ```javascript
  {
    id: "wisata-01",
    title: "Pura Tanah Lot & Karang Samudra",
    location: "Tabanan, Bali",
    cover: "assets/images/destinations/tanah-lot.jpg", // Foto cover utama
    photos: [
      {
        src: "assets/images/destinations/tanah-lot.jpg",
        caption: "Siluet Pura Tanah Lot berlatar ombak Samudra Hindia."
      },
      {
        src: "assets/images/destinations/tanah-lot-sub1.jpg",
        caption: "Batu karang dan buih ombak pesisir barat Bali."
      }
    ]
  }
  ```
> **Catatan Otomatis:** Foto destinasi ini akan **otomatis** masuk ke galeri filter **Explore the Journey** tanpa perlu Anda ketik ulang!

---

### 6. FOTO KUNJUNGAN INDUSTRI ("BEYOND THE CLASSROOM")
* **Lokasi file:** `assets/images/industry/`
* **Rasio ideal:** `4:3` atau `16:10`
* **Pengaturan di `js/data.js` (pada `industrialVisits`):**
  ```javascript
  {
    id: "industri-01",
    companyName: "Pabrik Kata-Kata Joger Bali",
    sector: "Industri Kreatif & Manajemen Brand",
    cover: "assets/images/industry/creative-industry.jpg", // Foto utama industri
    photos: [
      {
        src: "assets/images/industry/creative-industry.jpg",
        caption: "Observasi alur sablon manual di workshop."
      }
    ]
  }
  ```

---

### 7. FOTO MOMEN KEBERSAMAAN ("MOMENTS & MEMORIES")
* **Lokasi file:** `assets/images/moments/`
* **Rasio ideal:** Kotak `1:1` atau `4:3`
* **Pengaturan di `js/data.js` (pada `moments`):**
  ```javascript
  {
    id: "momen-01",
    title: "Diskusi Ringan & Catatan Lapangan",
    location: "Workshop Industri",
    date: "Hari 02",
    caption: "Membagi lembaran catatan dan saling memeriksa poin evaluasi.",
    cover: "assets/images/moments/moment-01.jpg" // Ganti path foto momen
  }
  ```

---

### 8. VIDEO DOKUMENTASI ("MOVING MEMORIES")
Mendukung 2 opsi: **File MP4 Lokal** atau **Embed YouTube**.

#### Opsi A: Menggunakan File MP4 Lokal
1. Simpan video ke `assets/videos/video-anda.mp4`
2. Simpan thumbnail gambar ke `assets/videos/video-poster.jpg`
3. Edit `js/data.js` (pada `videos`):
   ```javascript
   {
     id: "video-featured",
     isFeatured: true, // true untuk video utama paling besar
     title: "Cinematic Recap: 10 Langkah di Bali",
     type: "local",
     src: "assets/videos/video-anda.mp4",
     poster: "assets/videos/video-poster.jpg",
     duration: "03:45"
   }
   ```

#### Opsi B: Menggunakan Link YouTube
Jika Anda mengunggah video ke YouTube:
```javascript
{
  id: "video-featured",
  isFeatured: true,
  title: "Cinematic Recap Bali KKL",
  type: "embed",
  embedUrl: "https://www.youtube.com/embed/KODE_VIDEO_YOUTUBE",
  poster: "assets/videos/video-poster.jpg"
}
```

---

### 9. FOTO KELOMPOK BESAR (GROUP PORTRAIT)
* **Lokasi file:** `assets/images/group/group-portrait.jpg`
* **Rasio ideal:** Panorama / Landscape `16:9`
* **Pengaturan di `js/data.js` (pada `groupPortrait`):**
  ```javascript
  const groupPortrait = {
    src: "assets/images/group/group-portrait.jpg",
    alt: "Foto bersama seluruh 10 anggota kelompok KKL di Bali",
    caption: "Sepuluh jiwa, ribuan kilometer, dan satu ikatan persahabatan yang abadi."
  };
  ```

---

### 10. FOTO PROFIL 10 ANGGOTA KELOMPOK
* **Lokasi file:** `assets/images/members/member-01.jpg` sampai `member-10.jpg`
* **Rasio ideal:** Portrait tegak `3:4` (misal ukuran `600x800` px atau `900x1200` px).
* **Pengaturan di `js/data.js` (pada `teamMembers`):**
  ```javascript
  {
    id: "member-01",
    number: "01",
    name: "Ahmad Fauzi",
    role: "Ketua Kelompok & Koordinator",
    quote: "Perjalanan terbaik bukan tentang jarak, tapi tentang siapa yang melangkah bersama kita.",
    photo: "assets/images/members/member-01.jpg", // File foto portrait
    imagePosition: "center 20%" // Atur fokus wajah jika foto terlalu atas/bawah
  },
  ... (sampai member-10)
  ```

---

### 11. FOTO HIGHLIGHT DI BAGIAN PENUTUP ("CLOSING CHAPTER")
* **Pengaturan di `js/data.js` (pada `closingConfig.curatedGallery`):**
  Pilih 4 foto terbaik yang mewakili perjalanan Anda:
  ```javascript
  curatedGallery: [
    { src: "assets/images/hero/hero-cover.jpg", caption: "Kedamaian Danau Beratan" },
    { src: "assets/images/destinations/tanah-lot.jpg", caption: "Cakrawala senja Tanah Lot" },
    { src: "assets/images/destinations/tegalalang.jpg", caption: "Harmoni sawah Ubud" },
    { src: "assets/images/industry/coffee-roastery.jpg", caption: "Wawasan kopi Kintamani" }
  ]
  ```

---

## 🛡️ Sistem Fallback Gambar Aman (Safe Image System)
Jika ada foto yang belum Anda masukkan atau nama file salah ketik, website **TIDAK AKAN** menampilkan ikon silang gambar rusak (broken image) dan **layout tidak akan pernah berantakan**. Sistem JavaScript kami otomatis menggantinya dengan placeholder grafis bertema editorial Bali yang rapi.

---

## 🌐 Cara Deploy ke GitHub Pages

1. **Inisialisasi Git dan Commit:**
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi website dokumentasi KKL Bali"
   ```
2. **Buat repositori baru di GitHub** (misal: `kkl-bali-journal`).
3. **Hubungkan dan Push:**
   ```bash
   git remote add origin https://github.com/USERNAME/kkl-bali-journal.git
   git branch -M main
   git push -u origin main
   ```
4. **Aktifkan GitHub Pages:**
   - Masuk ke tab **Settings** di repositori GitHub Anda.
   - Pilih menu **Pages** di sebelah kiri.
   - Pada bagian **Build and deployment > Source**, pilih **Deploy from a branch**.
   - Branch: pilih `main` dan folder `/ (root)`.
   - Klik **Save**.
5. Tunggu sekitar 1-2 menit, website Anda sudah aktif di:
   `https://USERNAME.github.io/kkl-bali-journal/`
