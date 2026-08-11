# Circle 4 Kita — Collective Four Digital Playground

> **Portal digital interaktif** dari 4 sahabat lintas jurusan (TI, PGSD, Sains Data & Farmasi). Bukan web formal — ini tempat hangout, bereksperimen, dan berbagi hal seru secara publik.

---

## 🚀 Fitur Lengkap

### 🎮 Widget Crew (4 Kartu Anggota Interaktif)
| Widget | Jurusan | Deskripsi |
|--------|---------|-----------|
| **Gacha Spot Roll** | Teknik Informatika | Randomizer rekomendasi spot nongkrong / WFC |
| **Deep Talk Deck** | PGSD | Kartu pertanyaan mind-bending untuk obrolan malam |
| **Data Curator & Trend** | Sains Data | Spotify Live Simulator, Audio DNA & Micro-Poll opini publik |
| **Night Owl Rescue Kit** | Farmasi | Kalkulator kesehatan lembur (kafein + tidur) |

### 🌍 Fitur Publik
| Fitur | Deskripsi |
|-------|-----------|
| **Urban Map Indonesia** | Peta Leaflet interaktif real-data spot WFC, Hidden Gem & Thrift se-Indonesia (30+ spot) |
| **Calc Share** | Kalkulator patungan jujur (pajak + service charge) |
| **Open Dialogue Q&A** | Tanya anonim — dijawab dari perspektif 4 jurusan |
| **Digital Sticker Board** | Guestbook dengan emoji sticker picker, tersimpan di localStorage |
| **Spot Vault** | Album digital kenangan tempat dengan foto drag & drop, page flip |

### ✨ Fitur Teknis
- 🗺️ **Leaflet.js** — Peta interaktif OpenStreetMap se-Indonesia
- 🔍 **Live Search** — Cari spot atau kota langsung dari search bar
- 💾 **LocalStorage Persistence** — Semua data tersimpan di browser
- 🎵 **Spotify Live Simulator** — Track & Audio DNA rotating tiap 8 detik
- 📊 **IntersectionObserver** — Active nav highlight & section reveal animation
- 🔔 **Toast Notification** — Feedback interaksi yang elegan
- ⬆️ **Scroll-to-Top** — Tombol muncul saat scroll > 400px
- 📱 **Mobile Responsive** — Hamburger menu + layout fleksibel
- 🖱️ **Mouse Parallax** — Glow orb mengikuti kursor
- ✨ **Particle Canvas** — Background partikel animasi
- 👁️ **Visitor Counter** — Penghitung kunjungan berbasis localStorage

---

## 📂 Struktur File

```
circle4kita/
├── index.html        # Halaman utama — semua section & widget
├── styles.css        # Design system lengkap — tema Cyber Amber
├── script.js         # Logic interaktif — semua event handler & data
├── images/           # Foto kenangan untuk Spot Vault
└── README.md         # Dokumentasi ini
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Warna Utama | `#ffa200` (Cyber Amber) |
| Warna Aksen | `#00e5ff` (Cyber Cyan) |
| Background | `#060911` (Obsidian Slate) |
| Font Utama | Plus Jakarta Sans |
| Font Kode | Fira Code |
| Radius | `--radius-lg: 28px` |

---

## ⚡ Cara Menjalankan

### Lokal (Development)
```bash
# Python (tanpa install)
python -m http.server 8000

# Node.js (jika terinstall)
npx serve .

# Live Server (VS Code extension)
# Klik kanan index.html → Open with Live Server
```
Akses: `http://localhost:8000`

### Online (Deploy)
Upload semua file ke:
- **GitHub Pages** — Gratis, connect ke GitHub repo
- **Netlify** — Drag & drop folder ke netlify.com/drop
- **Vercel** — `vercel deploy` dari CLI

---

## 🛠️ Kustomisasi

### 1. Ganti Nama & Handle Sosmed Anggota
Cari komentar `<!-- GANTI: ... -->` di `index.html`:

```html
<!-- Contoh untuk anggota TI -->
<h3 class="about-name" data-member="ti">@NamaAsliKamu_TI</h3>

<a href="https://instagram.com/USERNAME_IG_KAMU" ...>📷 Instagram</a>
<a href="https://github.com/USERNAME_GH_KAMU" ...>⚡ GitHub</a>
```

### 2. Ganti Sosmed & Email Circle
```html
<!-- Di footer index.html -->
<a href="https://instagram.com/AKUN_CIRCLE">📷</a>
<a href="https://tiktok.com/@AKUN_CIRCLE">🎵</a>

<!-- Di script.js baris ~938 -->
window.open(`mailto:EMAIL_CIRCLE@gmail.com?subject=...`)
```

### 3. Tambah Foto di Spot Vault
Taruh foto di folder `images/` lalu tambahkan di `script.js` bagian `initialMemories`:

```js
{
  id: 4,
  place: 'Nama Cafe, Kota',
  location: 'Kota',
  date: '10 Agustus 2026',
  attendees: 'Full Squad',
  rating: '⭐⭐⭐⭐⭐ (5/5 Peak Vibe)',
  photo: 'images/nama_foto_kamu.jpg',
  story: 'Cerita kenangan di sini...'
}
```

### 4. Tambah Spot ke Urban Map
Tambahkan di array `initialRealPlaces` di `script.js`:

```js
{
  id: 31,
  name: 'Nama Spot',
  city: 'Jakarta',       // Harus cocok dengan cityCoords key
  category: 'wfc',       // 'wfc', 'gem', atau 'thrift'
  categoryLabel: 'WFC Cozy',
  rating: '⭐ 4.8',
  price: 'Rp 25k–50k',
  desc: 'Deskripsi spot...',
  tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10'],
  lat: -6.2088, lng: 106.8456,
  gmaps: 'https://maps.google.com/?q=Nama+Spot'
}
```

---

## 📦 Dependencies (CDN — tidak perlu install)

| Library | Versi | Kegunaan |
|---------|-------|----------|
| Leaflet.js | 1.9.4 | Peta interaktif |
| Plus Jakarta Sans | Google Fonts | Font utama |
| Fira Code | Google Fonts | Font monospace |
| OpenStreetMap | — | Tile map gratis |

---

## 🗺️ Kota yang Didukung Urban Map

**Jawa & Bali:** Jakarta, Bandung, Surabaya, Yogyakarta, Malang, Semarang, Solo, Bali
**Sumatra:** Medan, Palembang, Padang, Bandar Lampung, Pekanbaru
**Kalimantan:** Samarinda, Balikpapan, Pontianak, Banjarmasin
**Sulawesi & NTB:** Makassar, Manado, Lombok
**Papua & Maluku:** Jayapura, Ambon

---

## 🔮 Roadmap (Ide Pengembangan)

- [ ] Deploy ke domain `.id` khusus Circle 4
- [ ] Integrasi Google Maps API untuk rating real-time
- [ ] Dark/Light mode toggle
- [ ] Share Spot Vault ke Instagram Story
- [ ] Push Notification lewat WhatsApp saat ada review baru

---

## 📝 Catatan Pengembang

> Semua data spot Urban Map bersumber dari **Google Maps, ulasan medsos, & observasi langsung**. Rating bersifat estimasi berdasarkan data publik yang tersedia.
>
> Foto di Spot Vault disimpan sebagai **Base64 di localStorage** — tidak dikirim ke server mana pun. Data hanya ada di browser kamu.
>
> Seluruh fitur berjalan **100% client-side** tanpa backend. Aman, cepat, dan gratis di-host.

---

*© 2026 Circle 4 Kita — Collective Four | Cyber Amber × Obsidian Slate*
