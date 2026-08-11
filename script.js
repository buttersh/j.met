// DOM Elements Selection
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// 1. TI Wizard (Gacha Spot Roll)
const gachaBtn = document.getElementById('gachaBtn');
const gachaResult = document.getElementById('gachaResult');
const spinOptionsInput = document.getElementById('spinOptionsInput');

// 2. PGSD Educator (Deep Talk Deck)
const icebreakerBtn = document.getElementById('icebreakerBtn');
const questionOutput = document.getElementById('questionOutput');
const deepTalkCard = document.getElementById('deepTalkCard');
const newQuestionInput = document.getElementById('newQuestionInput');
const addQuestionBtn = document.getElementById('addQuestionBtn');
// 3. Sains Data (Mood Poll Vote Grid)
const moodVoteGrid = document.getElementById('moodVoteGrid');
const barChill = document.getElementById('barChill');
const barEpic = document.getElementById('barEpic');
const barStudy = document.getElementById('barStudy');
const countChill = document.getElementById('countChill');
const countEpic = document.getElementById('countEpic');
const countStudy = document.getElementById('countStudy');

// 4. Farmasi (Night Owl Rescue Kit)
const sleepForm = document.getElementById('sleepForm');
const studyHoursInput = document.getElementById('studyHours');
const coffeeCupsInput = document.getElementById('coffeeCups');
const hoursVal = document.getElementById('hoursVal');
const cupsVal = document.getElementById('cupsVal');
const sleepOutput = document.getElementById('sleepOutput');

// 5. Calc Share Elements
const calcShareForm = document.getElementById('calcShareForm');
const calcShareResult = document.getElementById('calcShareResult');

// 6. Urban Map Elements
const mapTabs = document.getElementById('mapTabs');
const placeList = document.getElementById('placeList');

// 7. Open Dialogue Elements
const openDialogForm = document.getElementById('openDialogForm');
const dialogList = document.getElementById('dialogList');

// 8. Guestbook Elements
const guestStickerForm = document.getElementById('guestStickerForm');
const stickerPicker = document.getElementById('stickerPicker');
const guestbookEntries = document.getElementById('guestbookEntries');

// 9. Contact Form Elements
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

// Data Collections
const hangoutSpots = [
  { name: 'Cyber Loft 💻', tag: 'WFC Cozy', desc: 'Spot kerja nyaman dengan wifi super cepat & ambient neon amber warm.' },
  { name: 'Amber Alley ☕', tag: 'Hidden Gem', desc: 'Kopi lokal pilihan dengan atmosfer tenang & cocok untuk deep talk santai.' },
  { name: 'Study Block 24h 📚', tag: 'WFC Quiet', desc: 'Workstation lembur aman 24 jam dengan colokan listrik melimpah.' },
  { name: 'Roof Talk 🌙', tag: 'Refreshing Spot', desc: 'Area rooftop sejuk dengan pemandangan kota malam hari untuk nugas leluasa.' },
  { name: 'Retro Vault 👕', tag: 'Thrifting Spot', desc: 'Tempat thrifting terpercaya untuk berburu outfit vintage kuliah yang estetik.' }
];

const icebreakerQuestions = [
  'Kalau circle kita bikin produk bareng, ide apa yang paling gila tapi bakal laku?',
  'Apa makanan malam paling aneh yang jadi penyelamat kamu pas lembur tugas?',
  'Jika bisa time-travel untuk menyelesaikan 1 deadline, kamu pilih ke tanggal berapa?',
  'Lagu apa yang paling cepat mengubah suasana hati kamu pas lagi jenuh?',
  'Prinsip atau quote apa yang selalu kamu pegang pas dikejar deadline berat?'
];

const systemDeepTalkQuestions = [
  'Apa hal kecil yang bisa bikin harimu langsung lebih ringan?',
  'Skenario idealmu untuk quality time sama teman seperti apa?',
  'Kalau kamu bisa memberi nasihat ke dirimu 5 tahun lalu, apa yang kamu bilang?',
  'Topik apa yang biasanya bikin obrolan kalian jadi lebih dalam dan meaningful?',
  'Apa kebiasaan baru yang pengen kamu mulai tapi belum berani coba?'
];

const storedDeepTalkExtras = JSON.parse(localStorage.getItem('circle4_deep_talk_questions')) || [];
let customDeepTalkQuestions = [...storedDeepTalkExtras];

function saveCustomDeepTalkQuestions() {
  localStorage.setItem('circle4_deep_talk_questions', JSON.stringify(customDeepTalkQuestions));
}

function addCustomQuestion(questionText) {
  const trimmed = questionText.trim();
  if (!trimmed) return false;
  customDeepTalkQuestions.push(trimmed);
  saveCustomDeepTalkQuestions();
  renderDeepTalkDeck();
  return true;
}

function getDeepTalkDeck() {
  return [
    ...icebreakerQuestions.map(q => ({ text: q, source: 'Dasar' })),
    ...systemDeepTalkQuestions.map(q => ({ text: q, source: 'Sistem' })),
    ...customDeepTalkQuestions.map(q => ({ text: q, source: 'User' }))
  ];
}

const initialDialogs = [
  {
    question: 'Bagaimana cara membagi waktu antara nugas, organisasi, dan nongkrong?',
    answer: '💡 <strong>Perspektif 4 Jurusan:</strong><br>• <em>TI:</em> Pakai time-blocking & prioritaskan task utama.<br>• <em>PGSD:</em> Jaga komunikasi dan utamakan istirahat berkualitas.<br>• <em>Sains Data:</em> Evaluasi jam produktif harianmu berdasarkan data.<br>• <em>Farmasi:</em> Atur ritme metabolisme tubuh agar tidak gampang lelah.'
  },
  {
    question: 'Kopi apa yang aman buat lambung kalau mau lembur malam?',
    answer: '💡 <strong>Perspektif Farmasi & Circle:</strong> Pilih cold brew atau campurkan susu plant-based (oat milk) untuk menetralkan kadar asam. Jangan lupa minum 2 gelas air putih hangat!'
  }
];

const initialGuestbook = [
  {
    emoji: '🚀',
    name: 'Ahmad M.',
    message: 'Keren banget vibe Cyber Amber-nya! Sukses terus buat Circle 4 Kita 🙌',
    time: '19:45'
  },
  {
    emoji: '✨',
    name: 'Dinda K.',
    message: 'Suka banget sama kalkulator patungan dan Night Owl Rescue Kit-nya, berguna bgt!',
    time: '20:10'
  }
];

let selectedSticker = '🚀';
let dialogResponses = JSON.parse(localStorage.getItem('circle4_dialogs')) || initialDialogs;
let guestbookEntriesData = JSON.parse(localStorage.getItem('circle4_guestbook')) || initialGuestbook;

// Utility Functions
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─────────────────────────────────────────────
// LIVE DYNAMIC ENGINE — Spotify Live Simulator
// Makes Sains Data card feel truly alive & real
// ─────────────────────────────────────────────
const liveTrackList = [
  { title: 'Neon Pulse', artist: 'Circle Mix', mood: 'Hyperpop', spotifyUrl: 'https://open.spotify.com/search/Neon%20Pulse%20Circle%20Mix' },
  { title: 'Starlight (Lo-fi Remix)', artist: 'Tulus × Lo-fi Collective', mood: 'Lofi', spotifyUrl: 'https://open.spotify.com/search/Starlight%20Tulus%20Lo-fi' },
  { title: 'Yang Terbaik Dariku', artist: 'Ada Band — Akustik Ver.', mood: 'Chill Indie', spotifyUrl: 'https://open.spotify.com/search/Yang%20Terbaik%20Dariku%20Ada%20Band' },
  { title: 'Lathi', artist: 'Weird Genius ft. Sara Fajira', mood: 'Hyperpop', spotifyUrl: 'https://open.spotify.com/track/2yTup8nY0VdwkMym73R7wS' },
  { title: 'Senja Kala', artist: 'Hindia', mood: 'Chill Indie', spotifyUrl: 'https://open.spotify.com/search/Senja%20Kala%20Hindia' },
  { title: 'Study Flow', artist: 'Lo-fi Girl Radio', mood: 'Lofi', spotifyUrl: 'https://open.spotify.com/search/Study%20Flow%20Lo-fi%20Girl' },
  { title: 'Ruang Sendiri', artist: 'Tulus', mood: 'Chill Indie', spotifyUrl: 'https://open.spotify.com/search/Ruang%20Sendiri%20Tulus' },
  { title: 'Runtuh', artist: 'Feby Putri ft. Fiersa Besari', mood: 'Chill Indie', spotifyUrl: 'https://open.spotify.com/search/Runtuh%20Feby%20Putri' },
  { title: 'Baik', artist: 'Isyana Sarasvati', mood: 'Pop Hits', spotifyUrl: 'https://open.spotify.com/search/Baik%20Isyana%20Sarasvati' },
  { title: 'Digital Love', artist: 'Daft Punk', mood: 'Hyperpop', spotifyUrl: 'https://open.spotify.com/search/Digital%20Love%20Daft%20Punk' },
];

const moodProfiles = {
  'Chill Indie': { chill: [55,75], hyper: [10,20], lofi: [10,20] },
  'Hyperpop':    { chill: [20,35], hyper: [45,65], lofi: [5,15] },
  'Lofi':        { chill: [30,45], hyper: [5,15], lofi: [40,60] },
  'Pop Hits':    { chill: [35,50], hyper: [25,40], lofi: [10,20] },
};

const DEFAULT_SPOTIFY_EMBED = 'https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp';
const SPOTIFY_PLAYLIST_STORAGE_KEY = 'circle4_spotify_playlists';
const LEGACY_SPOTIFY_PLAYLIST_STORAGE_KEY = 'circle4_playlists';
const spotifyMoodPlaylists = {
  happy: {
    label: 'Circle Hits: Naykila + Tulus',
    url: DEFAULT_SPOTIFY_EMBED
  },
  cheerful: {
    label: 'Indie Indonesia: Hindia + Tenxi',
    url: DEFAULT_SPOTIFY_EMBED
  },
  galau: {
    label: 'Galau Nadin',
    url: DEFAULT_SPOTIFY_EMBED
  },
  sad: {
    label: 'Dangdut Chill',
    url: DEFAULT_SPOTIFY_EMBED
  },
  dj: {
    label: 'Dance Rising',
    url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0BcQWzuB7ZO'
  },
  hiphop: {
    label: 'RapCaviar',
    url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd'
  },
  pop: {
    label: 'Pop Hits Indonesia',
    url: DEFAULT_SPOTIFY_EMBED
  },
  jj: {
    label: 'Hot Hits Indonesia',
    url: DEFAULT_SPOTIFY_EMBED
  }
};

function isValidSpotifyEmbedUrl(u) {
  return typeof u === 'string' && /^https:\/\/open\.spotify\.com\/embed\/(playlist|track)\/[A-Za-z0-9]+$/.test(u);
}

// Load user-customized playlist URLs from localStorage and merge
function loadCustomPlaylists() {
  try {
    if (localStorage.getItem(LEGACY_SPOTIFY_PLAYLIST_STORAGE_KEY)) {
      localStorage.removeItem(LEGACY_SPOTIFY_PLAYLIST_STORAGE_KEY);
    }
    const saved = JSON.parse(localStorage.getItem(SPOTIFY_PLAYLIST_STORAGE_KEY) || '{}');
    let updated = false;
    Object.keys(saved).forEach(k => {
      if (saved[k] && spotifyMoodPlaylists[k]) {
        const normalized = normalizeSpotifyEmbedUrl(saved[k]);
        if (isValidSpotifyEmbedUrl(normalized)) {
          spotifyMoodPlaylists[k].url = normalized;
        } else {
          delete saved[k];
          updated = true;
        }
      }
    });
    if (updated) {
      localStorage.setItem(SPOTIFY_PLAYLIST_STORAGE_KEY, JSON.stringify(saved));
    }
  } catch (e) {
    console.warn('Failed loading custom playlists', e);
  }
}

// Interactive editor: prompt user for playlist URLs per mood and save
function editPlaylistsPrompt() {
  const keys = Object.keys(spotifyMoodPlaylists);
  const saved = JSON.parse(localStorage.getItem(SPOTIFY_PLAYLIST_STORAGE_KEY) || '{}');
  keys.forEach(k => {
    const current = saved[k] || spotifyMoodPlaylists[k].url || '';
    const input = prompt(`Masukkan URL embed Spotify untuk kategori '${spotifyMoodPlaylists[k].label}' (kosong = biarkan default):`, current);
    if (input !== null) {
      const trimmed = input.trim();
      if (trimmed) {
        const normalized = normalizeSpotifyEmbedUrl(trimmed);
        if (isValidSpotifyEmbedUrl(normalized)) {
          saved[k] = normalized;
        } else {
          alert(`URL untuk kategori '${spotifyMoodPlaylists[k].label}' tidak valid. Gunakan URL embed Spotify atau playlist ID yang benar.`);
        }
      } else {
        delete saved[k];
      }
    }
  });
  localStorage.setItem(SPOTIFY_PLAYLIST_STORAGE_KEY, JSON.stringify(saved));
  loadCustomPlaylists();
  const active = document.querySelector('.spotify-menu-item.active');
  if (active) setSpotifyMood(active.dataset.mood);
  else setSpotifyMood('happy');
  alert('Daftar playlist disimpan. Masukkan URL Spotify yang benar: https://open.spotify.com/track/ID atau https://open.spotify.com/playlist/ID, lalu ia akan dikonversi ke embed URL.');
}

function normalizeSpotifyEmbedUrl(u) {
  if (!u) return u;
  try {
    const clean = u.trim().split('?')[0];
    if (/^https:\/\/open\.spotify\.com\/embed\/(track|playlist)\/[A-Za-z0-9]+$/.test(clean)) {
      return clean;
    }
    const m = clean.match(/^https?:\/\/open\.spotify\.com\/(track|playlist)\/([A-Za-z0-9]+)$/);
    if (m && m[2]) {
      return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
    }
    return clean;
  } catch (e) {
    return u;
  }
}

function randInRange([min, max]) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

const spotifyEmbed = document.getElementById('spotifyEmbed');
const spotifyMenuToggle = document.getElementById('spotifyMenuToggle');
const spotifyMenuPanel = document.getElementById('spotifyMenuPanel');
const spotifyMenuItems = document.querySelectorAll('.spotify-menu-item');
const spotifyMoodLink = document.getElementById('spotifyMoodLink');
const spotifyTrackLink = document.getElementById('spotifyTrackLink');

function setSpotifyMood(moodKey) {
  const mood = spotifyMoodPlaylists[moodKey] || spotifyMoodPlaylists.happy;
  const moodUrl = isValidSpotifyEmbedUrl(mood.url) ? mood.url : DEFAULT_SPOTIFY_EMBED;
  if (spotifyEmbed) spotifyEmbed.src = moodUrl;
  if (spotifyMoodLink) {
    spotifyMoodLink.href = moodUrl.replace('/embed', '');
    spotifyMoodLink.textContent = `Putar`;
    spotifyMoodLink.setAttribute('aria-label', `Putar playlist di Spotify — ${mood.label}`);
  }
  spotifyMenuItems.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mood === moodKey);
  });
}

spotifyMenuItems.forEach(btn => {
  btn.addEventListener('click', () => {
    setSpotifyMood(btn.dataset.mood);
    if (spotifyMenuPanel) spotifyMenuPanel.classList.add('hidden');
  });
});

if (spotifyMenuToggle && spotifyMenuPanel) {
  spotifyMenuToggle.addEventListener('click', () => {
    spotifyMenuPanel.classList.toggle('hidden');
  });
}

// wire up edit button
const editPlaylistsBtn = document.getElementById('editPlaylistsBtn');
if (editPlaylistsBtn) {
  editPlaylistsBtn.addEventListener('click', () => {
    editPlaylistsPrompt();
  });
}
const autoFillIndoBtn = document.getElementById('autoFillIndoBtn');
if (autoFillIndoBtn) {
  autoFillIndoBtn.addEventListener('click', () => {
    const indoUrl = spotifyMoodPlaylists.jj.url || DEFAULT_SPOTIFY_EMBED;
    const keys = Object.keys(spotifyMoodPlaylists);
    const saved = JSON.parse(localStorage.getItem(SPOTIFY_PLAYLIST_STORAGE_KEY) || '{}');
    keys.forEach(k => { saved[k] = indoUrl; });
    localStorage.setItem(SPOTIFY_PLAYLIST_STORAGE_KEY, JSON.stringify(saved));
    loadCustomPlaylists();
    setSpotifyMood('jj');
    alert('Semua kategori diisi dengan Hot Hits Indonesia. Anda bisa meng-edit satu-per-satu lewat Edit Playlists.');
  });
}
const resetPlaylistsBtn = document.getElementById('resetPlaylistsBtn');
if (resetPlaylistsBtn) {
  resetPlaylistsBtn.addEventListener('click', () => {
    if (confirm('Reset semua playlist kustom dan kembalikan ke default?')) {
      localStorage.removeItem(SPOTIFY_PLAYLIST_STORAGE_KEY);
      loadCustomPlaylists();
      setSpotifyMood('happy');
      alert('Overrides playlist dihapus. Jika embed masih error, refresh halaman.');
      location.reload();
    }
  });
}

// Initialize Spotify playlist mapping once, preserving saved overrides
(function initSpotifyPlaylists() {
  try {
    const saved = JSON.parse(localStorage.getItem(SPOTIFY_PLAYLIST_STORAGE_KEY) || '{}');
    if (!Object.keys(saved).length) {
      const indoUrl = spotifyMoodPlaylists.jj.url || DEFAULT_SPOTIFY_EMBED;
      const defaultMapping = {
        happy: indoUrl,
        cheerful: indoUrl,
        galau: indoUrl,
        sad: indoUrl,
        dj: spotifyMoodPlaylists.dj.url,
        hiphop: spotifyMoodPlaylists.hiphop.url,
        pop: indoUrl,
        jj: indoUrl
      };
      Object.keys(defaultMapping).forEach(k => {
        defaultMapping[k] = normalizeSpotifyEmbedUrl(defaultMapping[k]);
      });
      localStorage.setItem(SPOTIFY_PLAYLIST_STORAGE_KEY, JSON.stringify(defaultMapping));
    }
    loadCustomPlaylists();
    setSpotifyMood('happy');
  } catch (e) {
    console.warn('Spotify init failed', e);
  }
})();

function runLiveSpotify() {
  const trackEl = document.getElementById('nowPlayingTrack');
  if (!trackEl) return;

  const track = randomChoice(liveTrackList);
  const profile = moodProfiles[track.mood] || moodProfiles['Chill Indie'];
  const chill = randInRange(profile.chill);

// Micro-poll removed — no toggle needed
  const hyper = randInRange(profile.hyper);
  const lofi = Math.max(0, 100 - chill - hyper);

  // Update now playing
  trackEl.textContent = `${track.title} — ${track.artist} ⚡`;
  if (spotifyTrackLink) {
    spotifyTrackLink.href = track.spotifyUrl || 'https://open.spotify.com';
    spotifyTrackLink.textContent = `Buka`;
    spotifyTrackLink.setAttribute('aria-label', `Buka track di Spotify — ${track.title} oleh ${track.artist}`);
  }

  // Update Audio DNA bars
  const chillBar = document.querySelector('.dna-segment.chill');
  const hyperBar = document.querySelector('.dna-segment.pop');
  const lofiBar  = document.querySelector('.dna-segment.lofi');
  if (chillBar) { chillBar.style.width = chill + '%'; chillBar.textContent = `${chill}% Chill`; }
  if (hyperBar) { hyperBar.style.width = hyper + '%'; hyperBar.textContent = `${hyper}% Hyper`; }
  if (lofiBar)  { lofiBar.style.width  = lofi  + '%'; lofiBar.textContent  = `${lofi}% Lofi`; }

  // Update mood label
  const dnaTitle = document.querySelector('.dna-title');
  if (dnaTitle) dnaTitle.textContent = `CIRCLE AUDIO DNA — ${track.mood.toUpperCase()} MODE`;
}

// Rotate track every 8 seconds
runLiveSpotify();
setInterval(runLiveSpotify, 8000);

// Live equalizer bar height animation (done in CSS, but also randomize slightly via JS)
function animateEqualizer() {
  const bars = document.querySelectorAll('.equalizer .bar');
  bars.forEach(bar => {
    const h = 4 + Math.floor(Math.random() * 20);
    bar.style.height = h + 'px';
  });
}
setInterval(animateEqualizer, 180);

// Live "status" cycling for About section member cards
const statusCycleData = {
  'status-dev':    ['🟢 Growth mode on', '⚡ Building ideas', '💡 New solution unlocked', '🧠 Thinking in code'],
  'status-talk':   ['☕ Warm and thoughtful', '🎙️ Calm listener', '💬 Caring and present', '🌙 Gentle energy'],
  'status-data':   ['📊 Reading patterns', '🔍 Curious and analytical', '🧮 Turning data into insight', '📈 Learning every day'],
  'status-health': ['🧪 Careful and grounded', '⚗️ Health-first mindset', '💊 Focused on balance', '🌿 Caring for wellbeing'],
};

function cycleAboutStatuses() {
  Object.entries(statusCycleData).forEach(([cls, options]) => {
    const el = document.querySelector(`.${cls}`);
    if (el) el.textContent = randomChoice(options);
  });
}
setInterval(cycleAboutStatuses, 5000);

// Live visitor counter (localStorage-based, increments each visit)
(function() {
  let count = parseInt(localStorage.getItem('c4_visitors') || '0', 10);
  count++;
  localStorage.setItem('c4_visitors', count);
  const heroDesc = document.querySelector('.hero-section p');
  if (heroDesc) {
    const badge = document.createElement('div');
    badge.style.cssText = 'margin-top: 0.6rem; font-size: 0.78rem; color: var(--cyan); font-weight: 800; letter-spacing: 0.08em;';
    badge.textContent = `👁 ${count.toLocaleString()} kunjungan ke halaman ini`;
    heroDesc.insertAdjacentElement('afterend', badge);
  }
})();

// Live current time displayed in hero
(function updateLiveClock() {
  const now = new Date();
  const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const tgl = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  let clockEl = document.getElementById('liveClock');
  if (!clockEl) {
    clockEl = document.createElement('div');
    clockEl.id = 'liveClock';
    clockEl.style.cssText = 'font-size: 0.78rem; color: var(--amber-light); font-weight: 700; letter-spacing: 0.05em; margin-top: 0.3rem;';
    const header = document.querySelector('.section-header');
    if (header) header.appendChild(clockEl);
  }
  clockEl.textContent = `🕒 ${jam} — ${tgl}`;
  setTimeout(updateLiveClock, 1000);
})();

// 1. Teknik Informatika — Spin Spot Selector
if (gachaBtn && gachaResult) {
  gachaBtn.addEventListener('click', () => {
    gachaBtn.disabled = true;

    const userChoices = spinOptionsInput ? spinOptionsInput.value
      .split(/\r?\n/)
      .map(item => item.trim())
      .filter(Boolean) : [];

    const hasUserChoices = userChoices.length >= 2;
    const selectedChoice = hasUserChoices
      ? randomChoice(userChoices)
      : randomChoice(hangoutSpots);

    // Spin Animation
    gachaResult.innerHTML = `
      <div class="gacha-placeholder">
        <img src="images/spin-icon.svg" alt="Spin pilihan" class="gacha-icon" />
        <span>Memutar pilihan spot...</span>
      </div>
    `;

    setTimeout(() => {
      if (hasUserChoices) {
        gachaResult.innerHTML = `
          <div class="gacha-card">
            <div class="gacha-card-tag">🎯 Pilihanmu</div>
            <div class="gacha-card-name">${escapeHtml(selectedChoice)}</div>
            <div class="gacha-card-desc">Spin memilih satu opsi dari daftar pilihanmu.</div>
          </div>
        `;
      } else {
        gachaResult.innerHTML = `
          <div class="gacha-card">
            <div class="gacha-card-tag">📍 ${escapeHtml(selectedChoice.tag)}</div>
            <div class="gacha-card-name">${escapeHtml(selectedChoice.name)}</div>
            <div class="gacha-card-desc">${escapeHtml(selectedChoice.desc)}</div>
          </div>
        `;
      }
      gachaBtn.disabled = false;
    }, 900);
  });
}

// 2. PGSD Educator — Deep Talk Deck
if (icebreakerBtn && questionOutput && deepTalkCard) {
  icebreakerBtn.addEventListener('click', () => {
    deepTalkCard.classList.add('flip-anim');
    setTimeout(() => {
      const allQuestions = getDeepTalkDeck().map(item => item.text);
      questionOutput.textContent = `"${escapeHtml(randomChoice(allQuestions))}"`;
      deepTalkCard.classList.remove('flip-anim');
    }, 200);
  });
}

if (addQuestionBtn && newQuestionInput) {
  addQuestionBtn.addEventListener('click', () => {
    const added = addCustomQuestion(newQuestionInput.value);
    if (added) {
      showToast('✅ Pertanyaanmu sudah ditambahkan ke dek Deep Talk!');
      newQuestionInput.value = '';
    } else {
      showToast('⚠️ Tulis pertanyaan terlebih dahulu sebelum menambahkan.', 'info');
    }
  });
}

// Public Micro-Poll removed — strip data and handlers

// 4. Farmasi — Night Owl Rescue Kit (Sliders & Formatting)
if (studyHoursInput && hoursVal) {
  studyHoursInput.addEventListener('input', () => {
    hoursVal.textContent = `${studyHoursInput.value} jam`;
  });
}

if (coffeeCupsInput && cupsVal) {
  coffeeCupsInput.addEventListener('input', () => {
    cupsVal.textContent = `${coffeeCupsInput.value} gelas`;
  });
}

if (sleepForm && sleepOutput) {
  sleepForm.addEventListener('submit', e => {
    e.preventDefault();
    const hours = Number(studyHoursInput.value) || 1;
    const cups = Number(coffeeCupsInput.value) || 0;
    
    const idealSleep = Math.max(5, 9 - Math.min(hours, 6));
    let coffeeNote = '';
    let potionTip = '';

    if (cups >= 3) {
      coffeeNote = '⚠️ Konsumsi kafein tinggi. Wajib minum 2-3 gelas air hangat sekarang.';
      potionTip = 'Oleskan pelembab wajah, redupkan layar HP/laptop, dan mandi air hangat sebelum tidur.';
    } else if (cups >= 1) {
      coffeeNote = '☕ Kadar kafein sedang. Aman untuk menyelesaikan sesi nugas.';
      potionTip = 'Seduh teh chamomile hangat setelah selesai untuk tidur yang lebih nyenyak.';
    } else {
      coffeeNote = '🍵 Hidrasi tubuh dalam kondisi sangat baik.';
      potionTip = 'Lakukan peregangan 5 menit untuk meredakan ketegangan leher dan punggung.';
    }

    sleepOutput.style.display = 'block';
    sleepOutput.innerHTML = `
      <div class="rescue-row">
        <span class="rescue-icon">🌙</span>
        <div class="rescue-text">
          <strong>TARGET TIDUR</strong>
          <span>Targetkan tidur selama <b>${idealSleep} jam</b> malam ini.</span>
        </div>
      </div>
      <div class="rescue-row">
        <span class="rescue-icon">☕</span>
        <div class="rescue-text">
          <strong>ANALISIS KAFEIN</strong>
          <span>${coffeeNote}</span>
        </div>
      </div>
      <div class="rescue-row">
        <span class="rescue-icon">🧪</span>
        <div class="rescue-text">
          <strong>RAMUAN LIFESTYLE</strong>
          <span>${potionTip}</span>
        </div>
      </div>
    `;
  });
}

// 5. Calc Share Split Bill Calculator (with Data Stat Insight)
const calcStatInsight = document.getElementById('calcStatInsight');
const calcMoodChip = document.getElementById('calcMoodChip');
const calcPerPerson = document.getElementById('calcPerPerson');
const calcBudgetTip = document.getElementById('calcBudgetTip');

if (calcShareForm && calcShareResult) {
  calcShareForm.addEventListener('submit', e => {
    e.preventDefault();
    const total = Number(document.getElementById('totalBill').value) || 0;
    const tax = Number(document.getElementById('taxRate').value) || 0;
    const service = Number(document.getElementById('serviceRate').value) || 0;
    const people = Math.max(1, Number(document.getElementById('peopleCount').value) || 1);

    const taxAmt = total * (tax / 100);
    const serviceAmt = total * (service / 100);
    const grandTotal = total + taxAmt + serviceAmt;
    const share = grandTotal / people;

    calcShareResult.innerHTML = `
      💸 <strong>Rincian Patungan Jujur:</strong><br>
      • Subtotal: Rp ${Math.round(total).toLocaleString('id-ID')}<br>
      • Pajak + Service (${tax + service}%): Rp ${Math.round(taxAmt + serviceAmt).toLocaleString('id-ID')}<br>
      • <strong>Grand Total:</strong> Rp ${Math.round(grandTotal).toLocaleString('id-ID')}<br>
      🤝 <strong>Porsi Per Orang (${people} org):</strong> <span style="color: var(--cyan); font-weight: 800; font-size: 1.1rem;">Rp ${Math.round(share).toLocaleString('id-ID')}</span>
    `;

    if (calcPerPerson) calcPerPerson.textContent = `Rp ${Math.round(share).toLocaleString('id-ID')}`;

    if (calcBudgetTip) {
      if (share > 80000) {
        calcBudgetTip.textContent = 'Pilih menu yang lebih hemat';
      } else if (share > 50000) {
        calcBudgetTip.textContent = 'Bisa dibagi dua kali cek';
      } else {
        calcBudgetTip.textContent = 'Yuk, lanjut nongkrong santai';
      }
    }

    if (calcMoodChip) {
      if (share > 90000) {
        calcMoodChip.textContent = '😅 Butuh cek ulang';
      } else if (share > 60000) {
        calcMoodChip.textContent = '🧾 Masih aman';
      } else {
        calcMoodChip.textContent = '💸 Siap patungan';
      }
    }

    if (calcStatInsight) {
      const savedAmount = Math.round(people * 22000);
      calcStatInsight.innerHTML = `
        📊 <strong>Data Stat Insight:</strong> Mengisi air putih daripada beli es kopi tambahan tiap nongkrong bisa menghemat hingga <strong>Rp ${savedAmount.toLocaleString('id-ID')}</strong> total untuk grup kalian bulan ini!
      `;
    }
  });
}

// 6. Urban Map Indonesia — Real Data & Leaflet Map Integration (Seluruh Indonesia)
const cityCoords = {
  jakarta: [-6.2088, 106.8456],
  bandung: [-6.9175, 107.6191],
  surabaya: [-7.2575, 112.7521],
  yogyakarta: [-7.7956, 110.3695],
  malang: [-7.9666, 112.6326],
  semarang: [-6.9667, 110.4167],
  solo: [-7.5755, 110.8243],
  bali: [-8.4095, 115.1889],
  medan: [3.5952, 98.6722],
  palembang: [-2.9761, 104.7754],
  padang: [-0.9471, 100.4172],
  lampung: [-5.4500, 105.2667],
  pekanbaru: [0.5071, 101.4478],
  samarinda: [-0.5022, 117.1536],
  balikpapan: [-1.2379, 116.8529],
  pontianak: [-0.0263, 109.3425],
  banjarmasin: [-3.3194, 114.5908],
  makassar: [-5.1477, 119.4327],
  manado: [1.4748, 124.8428],
  lombok: [-8.5833, 116.1167],
  jayapura: [-2.5489, 140.7183],
  ambon: [-3.6954, 128.1814]
};

const initialRealPlaces = [
  // JAWA & BALI
  {
    id: 1, name: 'Kopi Nako Daur Baur', city: 'Jakarta', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 25k–45k', desc: 'Spot WFC outdoor & indoor paling hijau di pusat Jakarta. Colokan banyak, tempat dingin, dan es kopi susu aren-nya mantap (Sumber: Google Maps 4.800+ ulasan).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10', '☕ Rp 25k–45k'], lat: -6.2132, lng: 106.8000, gmaps: 'https://maps.google.com/?q=Kopi+Nako+Senayan+Park'
  },
  {
    id: 2, name: 'Passer Baroe Vintage & Thrift', city: 'Jakarta', category: 'thrift', categoryLabel: 'Thrifting', rating: '⭐ 4.7',
    price: 'Rp 25k–150k', desc: 'Pusat thrifting legendaris Jakarta. Berburu jaket kulit, sweater vintage, dan kemeja retro kualitas impor dengan harga terjangkau.',
    tags: ['✨ Vibe 10/10', '💰 Rp 25k–150k', '🛍️ Pasar Baru'], lat: -6.1643, lng: 106.8331, gmaps: 'https://maps.google.com/?q=Passer+Baroe+Jakarta'
  },
  {
    id: 3, name: 'One Eighty Coffee & Music', city: 'Bandung', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.9',
    price: 'Rp 30k–65k', desc: 'Cafe estetik unik dengan kolam air jernih tempat meja makan di Dago. Suasana sejuk & santai untuk deep talk (Sumber: Google Maps 12.000+ ulasan).',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 9/10', '☕ Rp 30k–65k'], lat: -6.8906, lng: 107.6106, gmaps: 'https://maps.google.com/?q=One+Eighty+Coffee+Bandung'
  },
  {
    id: 4, name: 'Omah Kopi Selasar Sunaryo', city: 'Bandung', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.8',
    price: 'Rp 28k–55k', desc: 'Cafe galeri seni di kawasan Dago Pakar. Udara pegunungan sejuk, pemandangan bukit indah, tempat inspiratif untuk karya kreatif.',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 10/10', '☕ Rp 28k–55k'], lat: -6.8587, lng: 107.6322, gmaps: 'https://maps.google.com/?q=Selasar+Sunaryo+Art+Space+Bandung'
  },
  {
    id: 5, name: 'Matcha Kopi & Cafe Tunjungan', city: 'Surabaya', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.8',
    price: 'Rp 20k–40k', desc: 'Spot WFC & nongkrong di koridor heritage Tunjungan Surabaya. Wifi cepat, matcha hangat khas, dan suasana kota tua (Sumber: Google Maps).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10', '☕ Rp 20k–40k'], lat: -7.2575, lng: 112.7378, gmaps: 'https://maps.google.com/?q=Jalan+Tunjungan+Surabaya'
  },
  {
    id: 6, name: 'Kopisae Margorejo', city: 'Surabaya', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.7',
    price: 'Rp 18k–35k', desc: 'Workstation favorit mahasiswa Surabaya. Colokan melimpah di setiap meja, tempat tenang untuk koding & skripsi.',
    tags: ['🔌 Colokan 10/10', '🤫 Quiet Level 9/10', '☕ Rp 18k–35k'], lat: -7.3150, lng: 112.7420, gmaps: 'https://maps.google.com/?q=Kopisae+Margorejo+Surabaya'
  },
  {
    id: 7, name: 'Blanco Coffee and Books', city: 'Yogyakarta', category: 'wfc', categoryLabel: 'WFC Quiet', rating: '⭐ 4.8',
    price: 'Rp 18k–35k', desc: 'Spot favorit mahasiswa Jogja di dekat Tugu. Hening, interior kayu vintage, koleksi buku banyak, wifi kencang (Sumber: Google Maps 3.500+ ulasan).',
    tags: ['🔌 Colokan 10/10', '🤫 Quiet Level 10/10', '☕ Rp 18k–35k'], lat: -7.7828, lng: 110.3671, gmaps: 'https://maps.google.com/?q=Blanco+Coffee+Books+Yogyakarta'
  },
  {
    id: 8, name: 'Kopi Klotok Pakem', city: 'Yogyakarta', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.8',
    price: 'Rp 15k–30k', desc: 'Kuliner & kopi tradisional hits Jogja tepi sawah Pakem. Pisang goreng hangat & lodeh ndeso favorit pengunjung.',
    tags: ['✨ Vibe 10/10', '💰 Rp 15k–30k', '🌾 Alam Sawah'], lat: -7.6580, lng: 110.4280, gmaps: 'https://maps.google.com/?q=Warung+Kopi+Klotok+Jogja'
  },
  {
    id: 9, name: 'Toko Kopi Tuku & Thrift Kayutangan', city: 'Malang', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 15k–30k', desc: 'Spot heritage koridor Kayutangan Malang. Vibes vintage hangat, cocok untuk nugas santai sambil cuci mata (Sumber: Medsos Hits Malang).',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 8/10', '☕ Rp 15k–30k'], lat: -7.9786, lng: 112.6315, gmaps: 'https://maps.google.com/?q=Kayutangan+Heritage+Malang'
  },
  {
    id: 10, name: 'Nakoa Cafe Suhat', city: 'Malang', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.7',
    price: 'Rp 18k–35k', desc: 'WFC center 24 jam paling populer di Malang Suhat. Colokan banyak, tempat luas, pilihan pastry lezat.',
    tags: ['🔌 Colokan 10/10', '🤫 Quiet Level 8/10', '☕ Rp 18k–35k'], lat: -7.9480, lng: 112.6170, gmaps: 'https://maps.google.com/?q=Nakoa+Cafe+Suhat+Malang'
  },
  {
    id: 11, name: 'Spiegel Bar & Bistro Kota Lama', city: 'Semarang', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.8',
    price: 'Rp 30k–75k', desc: 'Cafe resto mewah di bangunan heritage tahun 1895 Kota Lama Semarang. Atmosfer klasik hangat & kopi nikmat (Sumber: Google Maps 4.200+ ulasan).',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 9/10', '☕ Rp 30k–75k'], lat: -6.9678, lng: 110.4281, gmaps: 'https://maps.google.com/?q=Spiegel+Kota+Lama+Semarang'
  },
  {
    id: 12, name: 'Loewy Coffee & Co Candisari', city: 'Semarang', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.7',
    price: 'Rp 22k–45k', desc: 'Spot WFC tenang di Semarang Atas. Pemandangan lampu kota malam hari, wifi kencang, dan tempat duduk ergonomis.',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 9/10', '☕ Rp 22k–45k'], lat: -7.0050, lng: 110.4220, gmaps: 'https://maps.google.com/?q=Loewy+Coffee+Semarang'
  },
  {
    id: 13, name: 'Tiga Tjeret Cafe Heritage', city: 'Solo', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.7',
    price: 'Rp 15k–35k', desc: 'Wedangan & cafe modern paling hits di Solo depan Pura Mangkunegaran. Aneka sate & kopi rempah lezat (Sumber: Google Maps).',
    tags: ['✨ Vibe 10/10', '💰 Rp 15k–35k', '🍵 Wedangan Hits'], lat: -7.5689, lng: 110.8245, gmaps: 'https://maps.google.com/?q=Tiga+Tjeret+Solo'
  },
  {
    id: 14, name: 'Satu Tujuan Coffee Solo', city: 'Solo', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 18k–38k', desc: 'Spot WFC modern minimalist dengan pencahayaan terang dan colokan di tiap meja. Ramah laptop & diskusi.',
    tags: ['🔌 Colokan 10/10', '🤫 Quiet Level 9/10', '☕ Rp 18k–38k'], lat: -7.5540, lng: 110.7720, gmaps: 'https://maps.google.com/?q=Satu+Tujuan+Coffee+Solo'
  },
  {
    id: 15, name: 'Titik Dua Ubud Creative Hub', city: 'Bali', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.9',
    price: 'Rp 35k–80k', desc: 'Boutique hotel & creative hub dengan arsitektur bata merah ikonis di Ubud. Tempat sangat inspiratif untuk karya kreatif (Sumber: Google Maps).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 9/10', '☕ Rp 35k–80k'], lat: -8.5186, lng: 115.2635, gmaps: 'https://maps.google.com/?q=Titik+Dua+Ubud+Bali'
  },
  {
    id: 16, name: 'Livingstone Cafe & Bakery Seminyak', city: 'Bali', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 35k–90k', desc: 'Pusat croissant & kopi WFC hits di Bali. Tempat luas ber-AC dingin, wifi 150Mbps, cocok untuk digital nomad.',
    tags: ['🔌 Colokan 10/10', '🤫 Quiet Level 8/10', '☕ Rp 35k–90k'], lat: -8.6750, lng: 115.1580, gmaps: 'https://maps.google.com/?q=Livingstone+Bakery+Bali'
  },

  // SUMATRA
  {
    id: 17, name: 'Kopiloka Kesawan Heritage', city: 'Medan', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 20k–40k', desc: 'Spot WFC di kawasan kota tua Kesawan Medan. Tempat sejuk, interior kolonial mewah, wifi kencang (Sumber: Google Maps).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10', '☕ Rp 20k–40k'], lat: 3.5952, lng: 98.6722, gmaps: 'https://maps.google.com/?q=Kesawan+Medan'
  },
  {
    id: 18, name: 'Kopi Janji Jiwa & Thrift Kambang Iwak', city: 'Palembang', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.7',
    price: 'Rp 18k–35k', desc: 'Spot nongkrong tepi taman Kambang Iwak Palembang. Udara sejuk, suasana tenang untuk diskusi kelompok (Sumber: Google Maps).',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 9/10', '☕ Rp 18k–35k'], lat: -2.9800, lng: 104.7500, gmaps: 'https://maps.google.com/?q=Kambang+Iwak+Palembang'
  },
  {
    id: 19, name: 'Kopi Nawa Beachfront', city: 'Padang', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 20k–40k', desc: 'Spot kopi WFC tepi Pantai Padang. Menikmati sunset Samudra Hindia sambil koding & minum kopi aren lokal (Sumber: Google Maps).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10', '☕ Rp 20k–40k'], lat: -0.9471, lng: 100.4172, gmaps: 'https://maps.google.com/?q=Pantai+Padang+Cafe'
  },
  {
    id: 20, name: 'El\'s Coffee Bandar Lampung', city: 'Lampung', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 22k–45k', desc: 'Pusat kopi asli Lampung favorit anak muda & mahasiswa. Workstation nyaman dengan meja luas (Sumber: Google Maps).',
    tags: ['🔌 Colokan 10/10', '🤫 Quiet Level 8/10', '☕ Rp 22k–45k'], lat: -5.4500, lng: 105.2667, gmaps: 'https://maps.google.com/?q=Els+Coffee+Lampung'
  },
  {
    id: 21, name: 'Kopi Karang & House of Coffee', city: 'Pekanbaru', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.7',
    price: 'Rp 20k–40k', desc: 'Spot WFC modern paling nyaman di Pekanbaru. AC dingin, colokan banyak, dan aneka kopi pilihan (Sumber: Google Maps).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10', '☕ Rp 20k–40k'], lat: 0.5071, lng: 101.4478, gmaps: 'https://maps.google.com/?q=Kopi+Pekanbaru'
  },

  // KALIMANTAN
  {
    id: 22, name: 'Kopi Mahakam Riverfront', city: 'Samarinda', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.8',
    price: 'Rp 20k–38k', desc: 'Cafe santai tepi Sungai Mahakam Samarinda. Pemandangan jembatan indah pas matahari terbenam, sejuk & damai (Sumber: Google Maps).',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 9/10', '☕ Rp 20k–38k'], lat: -0.5022, lng: 117.1536, gmaps: 'https://maps.google.com/?q=Teplok+Mahakam+Samarinda'
  },
  {
    id: 23, name: 'Kilang Mandiri Beach Cafe', city: 'Balikpapan', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.9',
    price: 'Rp 25k–50k', desc: 'Cafe tepi pantai dengan angin sepoi-sepoi & suara ombak Balikpapan. Cocok banget buat refreshing & nugas malam (Sumber: Google Maps).',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 9/10', '☕ Rp 25k–50k'], lat: -1.2700, lng: 116.8300, gmaps: 'https://maps.google.com/?q=Pantai+Kilang+Mandiri+Balikpapan'
  },
  {
    id: 24, name: 'Kopi Asiang Legendaris', city: 'Pontianak', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.8',
    price: 'Rp 12k–25k', desc: 'Kedai kopi hainan bertelanjang dada paling legendaris di Pontianak Jalan Gajah Mada. Cita rasa kopi saring otentik (Sumber: Google Maps 5.000+ ulasan).',
    tags: ['✨ Vibe 10/10', '💰 Rp 12k–25k', '☕ Kopi Saring Hainan'], lat: -0.0263, lng: 109.3425, gmaps: 'https://maps.google.com/?q=Warung+Kopi+Asiang+Pontianak'
  },
  {
    id: 25, name: 'Kopi Dermaga Martapura', city: 'Banjarmasin', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.7',
    price: 'Rp 15k–32k', desc: 'Nongkrong santai tepi Sungai Martapura Banjarmasin. Pemandangan perahu klotok lalu lalang & kopi lokal nikmat (Sumber: Google Maps).',
    tags: ['✨ Vibe 9/10', '💰 Rp 15k–32k', '🚤 Sungai Martapura'], lat: -3.3194, lng: 114.5908, gmaps: 'https://maps.google.com/?q=Martapura+Banjarmasin'
  },

  // SULAWESI & OTHERS
  {
    id: 26, name: 'Dapur Kopi Pantai Losari', city: 'Makassar', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 20k–42k', desc: 'Spot kopi khas Makassar dekat Pantai Losari. Tempat kerja ber-AC dingin, pisang epe lezat, colokan melimpah (Sumber: Google Maps).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10', '☕ Rp 20k–42k'], lat: -5.1477, lng: 119.4327, gmaps: 'https://maps.google.com/?q=Pantai+Losari+Makassar'
  },
  {
    id: 27, name: 'Kolektif Coffee Boulevard', city: 'Manado', category: 'wfc', categoryLabel: 'WFC Cozy', rating: '⭐ 4.8',
    price: 'Rp 22k–45k', desc: 'Spot WFC kekinian di kawasan Manado Town Square. Wifi super cepat, pencahayaan terang untuk koding (Sumber: Google Maps).',
    tags: ['🔌 Colokan 9/10', '🤫 Quiet Level 8/10', '☕ Rp 22k–45k'], lat: 1.4748, lng: 124.8428, gmaps: 'https://maps.google.com/?q=Boulevard+Manado'
  },
  {
    id: 28, name: 'Kopi Tepi Pantai Senggigi', city: 'Lombok', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.9',
    price: 'Rp 25k–55k', desc: 'Cafe sunset cantik tepi Pantai Senggigi Lombok. Kopi khas Rembiga & suasana pantai tenang (Sumber: Google Maps).',
    tags: ['✨ Vibe 10/10', '💰 Rp 25k–55k', '🌅 Sunset Senggigi'], lat: -8.5000, lng: 116.0500, gmaps: 'https://maps.google.com/?q=Senggigi+Beach+Lombok'
  },
  {
    id: 29, name: 'Kopi Senja Teluk Jayapura', city: 'Jayapura', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.9',
    price: 'Rp 25k–50k', desc: 'Spot kopi estetik dengan pemandangan lanskap Teluk Youtefa yang memukau. Suasana sangat tenang & sejuk (Sumber: Google Maps).',
    tags: ['🔌 Colokan 8/10', '🤫 Quiet Level 10/10', '☕ Rp 25k–50k'], lat: -2.5489, lng: 140.7183, gmaps: 'https://maps.google.com/?q=Jembatan+Youtefa+Jayapura'
  },
  {
    id: 30, name: 'Kopi Sibu-Sibu Legendaris', city: 'Ambon', category: 'gem', categoryLabel: 'Hidden Gem', rating: '⭐ 4.8',
    price: 'Rp 15k–35k', desc: 'Kedai kopi rempah biji pala ikonis Ambon. Tempat kumpul seniman & mahasiswa dengan lagu-lagu Ambon nan merdu (Sumber: Google Maps).',
    tags: ['✨ Vibe 10/10', '💰 Rp 15k–35k', '🍵 Kopi Biji Pala'], lat: -3.6954, lng: 128.1814, gmaps: 'https://maps.google.com/?q=Kedai+Kopi+Sibu+Sibu+Ambon'
  }
];

let realPlacesData = JSON.parse(localStorage.getItem('circle4_real_places')) || initialRealPlaces;
let currentCityFilter = 'all';
let currentCategoryFilter = 'all';
let currentSearchQuery = '';
let mapInstance = null;
let mapMarkers = [];

// Leaflet Map Initialization
function initRealMap() {
  const mapContainer = document.getElementById('indonesiaMap');
  if (!mapContainer || typeof L === 'undefined') return;

  if (mapInstance) {
    mapInstance.remove();
  }

  // Center map on Indonesia archipelago
  mapInstance = L.map('indonesiaMap').setView([-2.5, 118.0], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);

  updateMapMarkers();
}

function updateMapMarkers() {
  if (!mapInstance || typeof L === 'undefined') return;

  // Clear existing markers
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  const filtered = filterPlacesData();

  filtered.forEach(spot => {
    if (spot.lat && spot.lng) {
      const marker = L.marker([spot.lat, spot.lng]).addTo(mapInstance);
      
      const popupHtml = `
        <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.5; color: #060911;">
          <strong style="font-size: 0.95rem; color: #d97706;">${escapeHtml(spot.name)}</strong> (${escapeHtml(spot.city)})<br>
          <span style="font-weight: 700; color: #2563eb;">${spot.rating}</span> • <em>${escapeHtml(spot.categoryLabel)}</em><br>
          <p style="margin: 0.3rem 0; color: #4b5563;">"${escapeHtml(spot.desc)}"</p>
          <a href="${spot.gmaps}" target="_blank" rel="noopener" style="color: #0284c7; font-weight: 700; text-decoration: none;">🧭 Open Google Maps &rarr;</a>
        </div>
      `;

      marker.bindPopup(popupHtml);
      mapMarkers.push(marker);
    }
  });
}

function filterPlacesData() {
  return realPlacesData.filter(spot => {
    const matchCity = currentCityFilter === 'all' || spot.city.toLowerCase() === currentCityFilter.toLowerCase();
    const matchCat = currentCategoryFilter === 'all' || spot.category === currentCategoryFilter;
    
    let matchQuery = true;
    if (currentSearchQuery) {
      const q = currentSearchQuery.toLowerCase();
      matchQuery = spot.name.toLowerCase().includes(q) || 
                   spot.city.toLowerCase().includes(q) || 
                   spot.desc.toLowerCase().includes(q);
    }

    return matchCity && matchCat && matchQuery;
  });
}

function renderRealPlacesList() {
  if (!placeList) return;
  const filtered = filterPlacesData();

  if (!filtered.length) {
    placeList.innerHTML = '<li style="color: var(--text-muted); font-style: italic;">Tidak ada tempat yang cocok dengan pencarian / filter kota ini. Coba ketik nama kota lain atau tambahkan ulasan kamu!</li>';
    return;
  }

  placeList.innerHTML = filtered.map(spot => `
    <li data-category="${spot.category}">
      <div class="spot-main">
        <div>
          <strong style="font-size: 1rem; color: var(--amber-light);">${escapeHtml(spot.name)}</strong>
          <span style="font-size: 0.8rem; color: var(--cyan); margin-left: 0.4rem; font-weight: 700;">📍 ${escapeHtml(spot.city)} • ${spot.rating}</span>
        </div>
        <p class="spot-desc">"${escapeHtml(spot.desc)}"</p>
        <div class="spot-data-tags">
          ${spot.tags.map(t => `<span class="data-badge">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-end;">
        <span class="spot-tag">${escapeHtml(spot.categoryLabel)}</span>
        <button class="btn-play-mini" onclick="panToSpot(${spot.lat}, ${spot.lng}, '${escapeHtml(spot.name)}')">📍 Map View</button>
      </div>
    </li>
  `).join('');
}

window.panToSpot = function(lat, lng, name) {
  if (mapInstance && lat && lng) {
    mapInstance.flyTo([lat, lng], 13, { duration: 1.2 });
    mapMarkers.forEach(m => {
      const p = m.getPopup();
      if (p && p.getContent().includes(name)) {
        m.openPopup();
      }
    });
    const mapEl = document.getElementById('indonesiaMap');
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

// Search Input Live Listener
const searchSpotInput = document.getElementById('searchSpotInput');
if (searchSpotInput) {
  searchSpotInput.addEventListener('input', e => {
    currentSearchQuery = e.target.value.trim();
    
    // Auto center map if city name matches known coords
    const matchedCityKey = Object.keys(cityCoords).find(k => k === currentSearchQuery.toLowerCase());
    if (matchedCityKey && mapInstance) {
      mapInstance.flyTo(cityCoords[matchedCityKey], 11, { duration: 1.2 });
    }

    renderRealPlacesList();
    updateMapMarkers();
  });
}

// City Filter Event
const cityFilterSelect = document.getElementById('cityFilterSelect');
if (cityFilterSelect) {
  cityFilterSelect.addEventListener('change', e => {
    currentCityFilter = e.target.value;
    
    const cityKey = currentCityFilter.toLowerCase();
    if (cityCoords[cityKey] && mapInstance) {
      mapInstance.flyTo(cityCoords[cityKey], 11, { duration: 1.2 });
    } else if (currentCityFilter === 'all' && mapInstance) {
      mapInstance.flyTo([-2.5, 118.0], 5, { duration: 1.2 });
    }

    renderRealPlacesList();
    updateMapMarkers();
  });
}

// Category Filter Event
if (mapTabs) {
  mapTabs.addEventListener('click', e => {
    if (e.target.classList.contains('map-tab')) {
      document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentCategoryFilter = e.target.dataset.tab;
      renderRealPlacesList();
      updateMapMarkers();
    }
  });
}

// Add Review Form Submission
const addReviewForm = document.getElementById('addReviewForm');
if (addReviewForm) {
  addReviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const nameCity = document.getElementById('revSpotName').value.trim();
    const category = document.getElementById('revCategory').value;
    const ratingInput = document.getElementById('revRating').value.trim() || '4.8';
    const priceInput = document.getElementById('revPrice').value.trim() || 'Rp 20k–40k';
    const comment = document.getElementById('revComment').value.trim();

    if (!nameCity || !comment) return;

    // Default to Bandung center coords if unknown
    const newSpot = {
      id: Date.now(),
      name: nameCity,
      city: nameCity.includes('—') ? nameCity.split('—')[1].trim() : 'Indonesia',
      category,
      categoryLabel: category === 'wfc' ? 'WFC Cozy' : (category === 'gem' ? 'Hidden Gem' : 'Thrifting'),
      rating: `⭐ ${ratingInput.includes('⭐') ? ratingInput.replace('⭐', '').trim() : ratingInput}`,
      price: priceInput,
      desc: comment,
      tags: ['✨ User Review', `💰 ${priceInput}`],
      lat: -6.9175 + (Math.random() - 0.5) * 0.1,
      lng: 107.6191 + (Math.random() - 0.5) * 0.1,
      gmaps: `https://maps.google.com/?q=${encodeURIComponent(nameCity)}`
    };

    realPlacesData.unshift(newSpot);
    localStorage.setItem('circle4_real_places', JSON.stringify(realPlacesData));

    document.getElementById('revSpotName').value = '';
    document.getElementById('revRating').value = '';
    document.getElementById('revPrice').value = '';
    document.getElementById('revComment').value = '';

    showToast('✅ Ulasan spot berhasil ditambahkan ke peta!');
    renderRealPlacesList();
    updateMapMarkers();
  });
}

// Initial Map Load
setTimeout(initRealMap, 300);
renderRealPlacesList();

// 7. Open Dialogue Render & Submit
function renderDialogs() {
  if (!dialogList) return;
  dialogList.innerHTML = dialogResponses.length
    ? dialogResponses.map(item => `
        <div class="dialog-card">
          <div class="dialog-q">Q: ${escapeHtml(item.question)}</div>
          <div class="dialog-a">${item.answer}</div>
        </div>
      `).join('')
    : '<div style="color: var(--text-muted); font-style: italic;">Belum ada pertanyaan anonim.</div>';
}

if (openDialogForm) {
  openDialogForm.addEventListener('submit', e => {
    e.preventDefault();
    const qEl = document.getElementById('anonQuestion');
    const question = qEl.value.trim();
    if (!question) return;

    const answers = [
      '💡 <strong>Perspektif 4 Jurusan:</strong><br>• <em>TI:</em> Temukan pola efisien & otomatisasi proses.<br>• <em>PGSD:</em> Ciptakan suasana belajar yang menyenangkan.<br>• <em>Sains Data:</em> Kelola prioritas berdasarkan dampaknya.<br>• <em>Farmasi:</em> Pastikan asupan nutrisi & waktu istirahat seimbang.',
      '💡 <strong>Perspektif 4 Jurusan:</strong><br>• <em>TI:</em> Selesaikan modul paling rumit lebih dulu.<br>• <em>PGSD:</em> Komunikasikan kendala secara terbuka.<br>• <em>Sains Data:</em> Lakukan breakdown task secara sistematis.<br>• <em>Farmasi:</em> Atur jeda istirahat tiap 45 menit.'
    ];

    dialogResponses.unshift({
      question,
      answer: randomChoice(answers)
    });

    localStorage.setItem('circle4_dialogs', JSON.stringify(dialogResponses));
    qEl.value = '';
    renderDialogs();
  });
}

// 8. Guestbook Sticker Picker & Render
if (stickerPicker) {
  stickerPicker.addEventListener('click', e => {
    if (e.target.classList.contains('sticker-opt')) {
      document.querySelectorAll('.sticker-opt').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      selectedSticker = e.target.dataset.emoji || '🚀';
    }
  });
}

function renderGuestbook() {
  if (!guestbookEntries) return;
  guestbookEntries.innerHTML = guestbookEntriesData.length
    ? guestbookEntriesData.map(item => `
        <div class="sticker-card">
          <div class="sticker-header">
            <span class="sticker-author">${item.emoji || '🚀'} ${escapeHtml(item.name)}</span>
            <span class="sticker-time">${item.time || 'Baru saja'}</span>
          </div>
          <p class="sticker-msg">${escapeHtml(item.message)}</p>
        </div>
      `).join('')
    : '<div style="color: var(--text-muted); font-style: italic;">Belum ada stiker terpasang.</div>';
}

if (guestStickerForm) {
  guestStickerForm.addEventListener('submit', e => {
    e.preventDefault();
    const nameEl = document.getElementById('stickerName');
    const msgEl = document.getElementById('stickerMessage');

    const name = nameEl.value.trim() || 'Anonim';
    const message = msgEl.value.trim();
    if (!message) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    guestbookEntriesData.unshift({
      emoji: selectedSticker,
      name,
      message,
      time
    });

    localStorage.setItem('circle4_guestbook', JSON.stringify(guestbookEntriesData));
    nameEl.value = '';
    msgEl.value = '';
    renderGuestbook();
  });
}

// 9. Contact Form Handler — with mailto fallback + toast
if (contactForm && formResponse) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const nameVal = contactForm.name.value.trim();
    const emailVal = contactForm.email.value.trim();
    const messageVal = contactForm.message.value.trim();

    if (!nameVal || !emailVal || !messageVal) return;

    // Try mailto (opens email client)
    const subject = encodeURIComponent(`[Circle 4] Pesan dari ${nameVal}`);
    const body = encodeURIComponent(`Dari: ${nameVal}\nEmail: ${emailVal}\n\nPesan:\n${messageVal}`);
    // GANTI: alamat email circle yang benar
    window.open(`mailto:GANTI_EMAIL@gmail.com?subject=${subject}&body=${body}`, '_self');

    formResponse.style.display = 'block';
    formResponse.textContent = `✨ Terima kasih, ${nameVal}! Pesan sedang diarahkan ke email kami.`;
    showToast(`✅ Pesan dari ${nameVal} siap dikirim!`);
    contactForm.reset();
  });
}

// Mobile Navigation Toggle
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  // Close menu on nav link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// ─── Toast Notification System ───
function showToast(message, type = 'success') {
  const toast = document.getElementById('toastNotif');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast-notif show ${type}`;
  setTimeout(() => { toast.className = 'toast-notif'; }, 3500);
}

// ─── Scroll-to-Top Button ───
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Active Nav Highlight via IntersectionObserver ───
(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ─── Section Reveal Animation ───
(function() {
  const targets = document.querySelectorAll('.squad-card, .about-card, .feature-card, .memory-card');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => { el.classList.add('will-reveal'); io.observe(el); });
})();

// Initializations
renderDialogs();
renderGuestbook();

// ─────────────────────────────────────────────
// 10. Spot Vault — Digital Album Book & File Upload System
// ─────────────────────────────────────────────
const initialMemories = [
  {
    id: 1,
    place: 'One Eighty Coffee & Music',
    location: 'Dago, Bandung',
    date: '14 Februari 2026',
    attendees: 'Full Squad (TI, PGSD, Data, Farmasi)',
    rating: '⭐⭐⭐⭐⭐ (5/5 Peak Vibe)',
    photo: 'images/memory_bandung.png',
    story: 'Momen pertama kalinya kita berempat nugas bareng di kolam air One Eighty! TI koding bug, PGSD nyiapin kuis deep talk, Sains Data sibuk bikin playlist, dan Farmasi sibuk ngingetin kita buat minum air putih.'
  },
  {
    id: 2,
    place: 'Kopi Nako Daur Baur',
    location: 'Senayan Park, Jakarta',
    date: '28 Januari 2026',
    attendees: 'TI, Data & Farmasi',
    rating: '⭐⭐⭐⭐⭐ (5/5 Peak Vibe)',
    photo: 'images/memory_jakarta.png',
    story: 'Nongkrong rooftop sunset yang super sejuk! Di tempat ini pertama kali ide bikin website Collective Four ini dicetuskan sambil minum es kopi susu aren.'
  },
  {
    id: 3,
    place: 'Blanco Coffee and Books',
    location: 'Tugu, Yogyakarta',
    date: '10 Desember 2025',
    attendees: 'PGSD & TI',
    rating: '⭐⭐⭐⭐ (4/5 Solid Spot)',
    photo: 'images/memory_jogja.png',
    story: 'Sesi nugas malam di Jogja dekat Tugu. Hening banget, banyak buku vintage, dan tempatnya bikin ide mengalir tanpa henti.'
  }
];

let memoriesData = JSON.parse(localStorage.getItem('circle4_memories')) || initialMemories;
let currentBookPageIndex = 0;
let uploadedPhotoBase64 = '';

const albumBook = document.getElementById('albumBook');
const memoryGrid = document.getElementById('memoryGrid');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageIndicator = document.getElementById('pageIndicator');
const addMemoryForm = document.getElementById('addMemoryForm');

// File Drop Zone Elements
const photoDropZone = document.getElementById('photoDropZone');
const memPhotoFile = document.getElementById('memPhotoFile');
const photoPreviewWrap = document.getElementById('photoPreviewWrap');
const photoPreviewImg = document.getElementById('photoPreviewImg');
const dropText = document.getElementById('dropText');

// Render Album Book Page Flip
function renderAlbumBook() {
  if (!albumBook || !memoriesData.length) return;

  if (currentBookPageIndex < 0) currentBookPageIndex = 0;
  if (currentBookPageIndex >= memoriesData.length) currentBookPageIndex = memoriesData.length - 1;

  const item = memoriesData[currentBookPageIndex];
  const totalPages = memoriesData.length;

  if (pageIndicator) {
    pageIndicator.textContent = `Halaman ${currentBookPageIndex + 1} dari ${totalPages}`;
  }

  if (prevPageBtn) prevPageBtn.disabled = (currentBookPageIndex === 0);
  if (nextPageBtn) nextPageBtn.disabled = (currentBookPageIndex === totalPages - 1);

  albumBook.innerHTML = `
    <div class="album-page-layout">
      <div class="album-photo-frame">
        <span class="album-passport-stamp">📍 ${escapeHtml(item.location.toUpperCase())} • VISITED</span>
        <img src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.place)}" onerror="this.src='images/memory_bandung.png'" />
      </div>
      <div class="album-details">
        <div style="font-size: 0.8rem; font-weight: 800; color: var(--amber-light); letter-spacing: 0.1em; text-transform: uppercase;">
          ${escapeHtml(item.rating)}
        </div>
        <h3 class="album-title">${escapeHtml(item.place)}</h3>
        <div class="album-location-date">
          📍 ${escapeHtml(item.location)} &nbsp;•&nbsp; 📅 ${escapeHtml(item.date)}
        </div>
        <div class="album-note">
          "${escapeHtml(item.story)}"
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; margin-top: 0.5rem;">
          👥 Anggota Hadir: <strong style="color: var(--cyan);">${escapeHtml(item.attendees)}</strong>
        </div>
      </div>
    </div>
  `;
}

if (prevPageBtn) {
  prevPageBtn.addEventListener('click', () => {
    if (currentBookPageIndex > 0) {
      currentBookPageIndex--;
      renderAlbumBook();
    }
  });
}

if (nextPageBtn) {
  nextPageBtn.addEventListener('click', () => {
    if (currentBookPageIndex < memoriesData.length - 1) {
      currentBookPageIndex++;
      renderAlbumBook();
    }
  });
}

// Render All Grid Cards
function renderMemories() {
  if (!memoryGrid) return;
  memoryGrid.innerHTML = memoriesData.map((item, idx) => `
    <article class="memory-card">
      <div class="memory-photo-wrap">
        <img src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.place)}" class="memory-img" onerror="this.src='images/memory_bandung.png'" />
        <span class="memory-rating-badge">${escapeHtml(item.rating)}</span>
      </div>
      <div class="memory-body">
        <div>
          <h3 class="memory-place">${escapeHtml(item.place)}</h3>
          <div class="memory-meta">
            <span>📍 ${escapeHtml(item.location)}</span>
            <span>📅 ${escapeHtml(item.date)}</span>
          </div>
          <p class="memory-story">"${escapeHtml(item.story)}"</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.8rem;">
          <div class="memory-attendees">👥 ${escapeHtml(item.attendees)}</div>
          <button class="btn-play-mini" onclick="openAlbumPage(${idx})">📖 Buka Halaman</button>
        </div>
      </div>
    </article>
  `).join('');
}

window.openAlbumPage = function(index) {
  currentBookPageIndex = index;
  renderAlbumBook();
  const bookEl = document.getElementById('albumBook');
  if (bookEl) bookEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// Drag & Drop File Upload Logic (FileReader Base64)
if (photoDropZone && memPhotoFile) {
  photoDropZone.addEventListener('click', () => memPhotoFile.click());

  ['dragenter', 'dragover'].forEach(eventName => {
    photoDropZone.addEventListener(eventName, e => {
      e.preventDefault();
      photoDropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    photoDropZone.addEventListener(eventName, e => {
      e.preventDefault();
      photoDropZone.classList.remove('dragover');
    });
  });

  photoDropZone.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelected(files[0]);
    }
  });

  memPhotoFile.addEventListener('change', e => {
    if (e.target.files.length) {
      handleFileSelected(e.target.files[0]);
    }
  });
}

function handleFileSelected(file) {
  if (!file || !file.type.startsWith('image/')) {
    alert('Silakan pilih file gambar (JPG, PNG, WEBP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedPhotoBase64 = e.target.result;
    if (photoPreviewImg && photoPreviewWrap) {
      photoPreviewImg.src = uploadedPhotoBase64;
      photoPreviewWrap.style.display = 'block';
    }
    if (dropText) {
      dropText.innerHTML = `✅ Foto <strong>"${escapeHtml(file.name)}"</strong> berhasil diunggah!`;
    }
  };
  reader.readAsDataURL(file);
}

// Add New Memory Form Submission
if (addMemoryForm) {
  addMemoryForm.addEventListener('submit', e => {
    e.preventDefault();
    const place = document.getElementById('memPlace').value.trim();
    const rawDate = document.getElementById('memDate').value;
    const attendees = document.getElementById('memAttendees').value.trim() || 'Full Squad';
    const rating = document.getElementById('memRating').value;
    const story = document.getElementById('memStory').value.trim();

    if (!place || !story) return;

    let formattedDate = rawDate;
    if (rawDate) {
      const d = new Date(rawDate);
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      formattedDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } else {
      formattedDate = 'Baru saja';
    }

    const photoToUse = uploadedPhotoBase64 || 'images/memory_bandung.png';

    const newMemory = {
      id: Date.now(),
      place,
      location: place.includes(',') ? place.split(',')[1].trim() : 'Indonesia',
      date: formattedDate,
      attendees,
      rating,
      photo: photoToUse,
      story
    };

    memoriesData.unshift(newMemory);
    localStorage.setItem('circle4_memories', JSON.stringify(memoriesData));

    // Reset Form & Preview
    addMemoryForm.reset();
    uploadedPhotoBase64 = '';
    if (photoPreviewWrap) photoPreviewWrap.style.display = 'none';
    if (dropText) {
      dropText.innerHTML = 'Drag & Drop foto di sini, atau <strong>Klik untuk Upload Foto dari HP/PC</strong>';
    }

    currentBookPageIndex = 0;
    renderAlbumBook();
    renderMemories();
    showToast('📖 Lembaran berhasil disimpan ke Spot Vault!');
  });
}

// Initial Calls
renderAlbumBook();
renderMemories();

// ─────────────────────────────────────────────
// Particle Canvas Background System
// ─────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let particles = [];

  const COLORS = [
    'rgba(255, 162, 0,',
    'rgba(255, 200, 80,',
    'rgba(0, 229, 255,',
  ];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawnParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size  = Math.random() * 2.5 + 0.5;
    return {
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    -(Math.random() * 0.4 + 0.1),
      size,
      alpha: Math.random() * 0.6 + 0.15,
      life:  Math.random() * 180 + 60,
      age:   0,
      color,
    };
  }

  function initPool() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
    for (let i = 0; i < count; i++) {
      const p = spawnParticle();
      p.age = Math.floor(Math.random() * p.life);
      particles.push(p);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.age++;
      p.x += p.vx;
      p.y += p.vy;

      const fadeZone = 30;
      let a = p.alpha;
      if (p.age < fadeZone) a *= p.age / fadeZone;
      else if (p.age > p.life - fadeZone) a *= (p.life - p.age) / fadeZone;

      ctx.beginPath();
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      grd.addColorStop(0, `${p.color} ${a})`);
      grd.addColorStop(1, `${p.color} 0)`);
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      if (p.age >= p.life || p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
        particles[i] = spawnParticle();
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  initPool();
  draw();

  window.addEventListener('resize', () => {
    resize();
    initPool();
  });
})();

// ─────────────────────────────────────────────
// Mouse Parallax — Glow Orbs follow cursor subtly
// ─────────────────────────────────────────────
(function initParallax() {
  const orbs = document.querySelectorAll('.glow-orb');
  if (!orbs.length) return;

  const strengths = [0.025, 0.015, 0.035, 0.020];

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    orbs.forEach((orb, i) => {
      const s = strengths[i] || 0.02;
      const ox = dx * s;
      const oy = dy * s;
      orb.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
      orb.style.transform  = `translate(${ox}px, ${oy}px)`;
    });
  });
})();
