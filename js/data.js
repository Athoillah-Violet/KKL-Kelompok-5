/**
 * ====================================================================
 * BALI KKL JOURNAL — CENTRAL DATA STORE (js/data.js)
 * ====================================================================
 * File ini adalah satu-satunya tempat Anda perlu mengedit data konten:
 * - Konfigurasi website & identitas kelompok
 * - Teks & media Hero (bisa foto atau video latar)
 * - Garis waktu kegiatan (Journey Overview)
 * - Destinasi wisata (cover, foto pendukung, cerita)
 * - Kunjungan industri (perusahaan, agenda, hal yang dipelajari)
 * - Momen & memori perjalanan
 * - Galeri video dokumentasi
 * - Profil 10 anggota kelompok
 * - Pesan penutup & catatan kredit
 *
 * PANDUAN PENGGUNA:
 * 1. Gunakan path relatif (misal: "assets/images/..."), bukan path komputer lokal.
 * 2. Galeri "Explore" akan otomatis menggabungkan destinasi wisata, industri,
 *    dan momen. Anda TIDAK PERLU memasukkan data yang sama dua kali.
 * 3. Jika suatu field belum Anda miliki, Anda dapat membiarkannya atau
 *    menggunakan placeholder yang tersedia.
 * ====================================================================
 */

const siteConfig = {
  // Identitas Website & Kelompok
  siteTitle: "BALI JOURNAL — KKL Dokumentasi Perjalanan",
  brandName: "BALI JOURNAL",
  groupName: "Kelompok KKL Bali", // [Placeholder] Ganti dengan nama kelompok Anda (misal: Kelompok 04 / Tim Ananta)
  institutionName: "[Nama Program Studi / Universitas]", // [Placeholder] Contoh: Teknik Informatika - Universitas Indonesia
  activityName: "Kunjungan Kerja Lapangan (KKL) Bali",
  travelPeriod: "[Bulan Tahun, misal: Oktober 2026]", // [Placeholder] Periode perjalanan
  totalMembers: 10,
  
  // Kontak atau tautan repositori (opsional, jika kosong tidak akan dimunculkan)
  repoUrl: "https://github.com/",
  instagramUrl: "", // Kosongkan jika tidak ada
  
  // Teks pembuka bagian "About"
  about: {
    badge: "The Genesis",
    title: "Tentang Perjalanan Kami",
    subtitle: "Merekam jejak ilmu, eksplorasi budaya pulau dewata, dan persahabatan yang mengakar erat.",
    paragraphs: [
      "Kunjungan Kerja Lapangan (KKL) ini bukan sekadar agenda akademik wajib, melainkan jendela pembuka wawasan yang mempertemukan kami langsung dengan denyut industri kreatif, tradisi agrikultur berkelanjutan, serta kekayaan pusaka kultural Pulau Bali.",
      "Selama perjalanan, 10 anggota kelompok kami berproses bersama: belajar mengamati dinamika profesional di lapangan, menyerap kearifan lokal masyarakat Bali, dan merajut momen kebersamaan yang terekam utuh dalam arsip jurnal digital ini."
    ],
    supportingPhoto1: {
      src: "assets/images/destinations/tanah-lot.jpg",
      alt: "Pesisir samudra di Bali",
      caption: "Momen refleksi di tepi samudra Pulau Dewata"
    },
    supportingPhoto2: {
      src: "assets/images/industry/creative-industry.jpg",
      alt: "Diskusi di lokasi kunjungan industri",
      caption: "Sesi observasi lapangan & dialog interaktif"
    },
    highlights: [
      { label: "Durasi Perjalanan", value: "[X] Hari Penuh" },
      { label: "Destinasi Kunjungan", value: "3 Destinasi Utama" },
      { label: "Kunjungan Industri", value: "2 Sektor Strategis" },
      { label: "Dokumentasi Tersimpan", value: "Arsip Foto & Video" }
    ]
  }
};

const heroConfig = {
  // Pilihan media latar: "image" atau "video"
  mediaType: "image", // Ubah ke "video" jika Anda ingin mengaktifkan video latar

  // Gambar Latar (Default)
  imageSrc: "assets/images/hero/hero-cover.jpg",
  imageAlt: "Panorama Danau Beratan Bedugul Bali saat matahari terbit",

  // Video Latar (Opsional — akan diputar tanpa suara/muted jika mediaType: 'video')
  videoSrc: "assets/videos/journey-highlight.mp4",
  videoPoster: "assets/images/hero/hero-cover.jpg", // Gambar penutup sebelum video diputar

  // Tipografi & Headline Hero
  eyebrow: "DOKUMENTASI KUNJUNGAN KERJA LAPANGAN",
  titleLine1: "BALI,",
  titleLine2: "BEYOND THE JOURNEY",
  quote: "Sepuluh orang, satu perjalanan, dan cerita yang akan selalu dikenang.",
  
  // Metadata Hero yang tampil di badge
  metaBadges: [
    { label: "Kegiatan", value: "KKL Lapangan" },
    { label: "Lokasi", value: "Bali, Indonesia" },
    { label: "Kolektif", value: "10 Mahasiswa" }
  ],
  
  ctaText: "Jelajahi Perjalanan",
  ctaTarget: "#explore"
};

/**
 * Ringkasan Perjalanan (Journey Overview)
 * Digunakan untuk timeline urutan kegiatan.
 * Catatan: Jika tanggal spesifik belum ada, gunakan label urutan seperti "Hari 01".
 */
const journeyOverview = [
  {
    dayNumber: "01",
    dayLabel: "Hari 01",
    date: "[Tanggal Keberangkatan]", // [Placeholder] Contoh: 12 Oktober 2026
    title: "Kedatangan & Inisiasi Langkah di Bali",
    location: "Denpasar & Sanur",
    description: "Tiba di Bali, briefing koordinasi kelompok, orientasi rute perjalanan, dan menikmati embusan angin senja pertama di pesisir.",
    photo: "assets/images/destinations/tanah-lot.jpg",
    alt: "Kedatangan di pesisir Bali"
  },
  {
    dayNumber: "02",
    dayLabel: "Hari 02",
    date: "[Tanggal Hari 02]", // [Placeholder]
    title: "Kunjungan Industri Kreatif & Craftsmanship",
    location: "Gianyar / Denpasar",
    description: "Mempelajari manajemen rantai pasok industri kreatif cinderamata, strategi branding pariwisata, dan teknik produksi modern.",
    photo: "assets/images/industry/creative-industry.jpg",
    alt: "Kunjungan industri kreatif Bali"
  },
  {
    dayNumber: "03",
    dayLabel: "Hari 03",
    date: "[Tanggal Hari 03]", // [Placeholder]
    title: "Agrowisata Kintamani & Ekologi Terasering",
    location: "Kintamani & Ubud",
    description: "Studi lapangan pengolahan kopi Arabika Kintamani dari hulu ke hilir, dilanjutkan observasi sistem irigasi Subak di Tegalalang.",
    photo: "assets/images/destinations/tegalalang.jpg",
    alt: "Terasering hijau Tegalalang Ubud"
  },
  {
    dayNumber: "04",
    dayLabel: "Hari 04",
    date: "[Tanggal Hari 04]", // [Placeholder]
    title: "Harmoni Adat Desa Penglipuran & Refleksi",
    location: "Bangli & Uluwatu",
    description: "Mendalami tata ruang berbasis kearifan lokal Tri Hita Karana di Desa Penglipuran dan ditutup siluet senja pura tebing laut.",
    photo: "assets/images/destinations/penglipuran.jpg",
    alt: "Desa adat Penglipuran yang asri"
  }
];

/**
 * Destinasi Wisata
 * Setiap destinasi memiliki cover utama dan foto pendukung untuk lightbox.
 */
const destinations = [
  {
    id: "wisata-01",
    category: "wisata",
    title: "Pura Tanah Lot & Karang Samudra",
    location: "Tabanan, Bali",
    badge: "Heritage & Landscape",
    description: "Pura legendaris yang bertakhta di atas bongkahan batu karang pesisir samudra Hindia. Di tempat ini kami menyaksikan perpaduan magis antara deburan ombak, ritual budaya sakral, dan siluet matahari terbenam yang memukau mata.",
    experience: "Menjelang sore, saat air laut mulai pasang, hembusan angin samudra dan langit jingga menjadi latar paling syahdu untuk merefleksikan kebersamaan kami selama di perantauan.",
    cover: "assets/images/destinations/tanah-lot.jpg",
    coverAlt: "Pura Tanah Lot dengan deburan ombak senja",
    photos: [
      {
        src: "assets/images/destinations/tanah-lot.jpg",
        alt: "Pemandangan utama Tanah Lot",
        caption: "Siluet Pura Tanah Lot berlatar ombak Samudra Hindia saat senja keemasan."
      },
      {
        src: "assets/images/destinations/tanah-lot-sub1.jpg",
        alt: "Batu karang dan buih ombak",
        caption: "Bongkahan karang kokoh menahan gempuran ombak pesisir barat Bali."
      },
      {
        src: "assets/images/destinations/tanah-lot-sub2.jpg",
        alt: "Komposisi kuil tebing Tanah Lot",
        caption: "Sudut pandang arsitektur pura tradisional di atas tebing batu karang."
      }
    ]
  },
  {
    id: "wisata-02",
    category: "wisata",
    title: "Terasering Sawah Tegalalang Ubud",
    location: "Ubud, Gianyar, Bali",
    badge: "Agrikultur & Subak",
    description: "Hamparan sawah berundak bertingkat-tingkat yang dibangun dengan sistem tata air tradisional Subak warisan leluhur Bali. Hawa sejuk pedalaman Ubud dan jajaran pohon kelapa tropis menghadirkan ketenangan yang luar biasa.",
    experience: "Berjalan menyusuri pematang sawah yang sempit menuntut kehati-hatian sekaligus gelak tawa ketika salah satu dari kami hampir terpeleset ke parit lumpur.",
    cover: "assets/images/destinations/tegalalang.jpg",
    coverAlt: "Terasering Tegalalang Ubud berkilau cahaya matahari pagi",
    photos: [
      {
        src: "assets/images/destinations/tegalalang.jpg",
        alt: "Terasering Tegalalang Ubud",
        caption: "Lanskap berundak Tegalalang dengan sorot sinar pagi menembus dedaunan kelapa."
      },
      {
        src: "assets/images/destinations/tegalalang-sub1.jpg",
        alt: "Petak sawah bertingkat",
        caption: "Kerapian petak-petak padi yang terairi sempurna lewat kearifan sistem Subak."
      },
      {
        src: "assets/images/destinations/tegalalang-sub2.jpg",
        alt: "Pondok kayu di tengah sawah",
        caption: "Gubuk peristirahatan petani lokal di tengah hamparan padi yang mulai menghijau."
      }
    ]
  },
  {
    id: "wisata-03",
    category: "wisata",
    title: "Desa Adat Tradisional Penglipuran",
    location: "Bangli, Bali",
    badge: "Desa Budaya Terbersih",
    description: "Desa adat yang terkenal dengan kebersihannya di kancah dunia. Deretan gerbang rumah khas Bali (Angkul-Angkul) berdiri simetris sepanjang jalan setapak batu alam yang bebas dari asap kendaraan bermotor.",
    experience: "Warga desa menyambut kami dengan senyuman ramah dan membuka pintu pekarangan rumah mereka untuk berbagi kisah filosofi arsitektur tradisional dan pelestarian hutan bambu.",
    cover: "assets/images/destinations/penglipuran.jpg",
    coverAlt: "Jalan utama Desa Adat Penglipuran yang bersih dan tertata",
    photos: [
      {
        src: "assets/images/destinations/penglipuran.jpg",
        alt: "Jalan utama Penglipuran",
        caption: "Lorong asri Desa Penglipuran dihiasi bunga kamboja dan arsitektur bata merah seragam."
      },
      {
        src: "assets/images/destinations/penglipuran-sub1.jpg",
        alt: "Detail gerbang angkul-angkul",
        caption: "Gerbang pekarangan tradisional bernuansa kayu sirap dan ornamen ukiran Bali."
      },
      {
        src: "assets/images/destinations/penglipuran-sub2.jpg",
        alt: "Pekarangan warga Penglipuran",
        caption: "Kesejukan ruang terbuka hijau di dalam lingkungan perumahan adat Bangli."
      }
    ]
  }
];

/**
 * Kunjungan Industri (Beyond the Classroom)
 * Menampilkan data perusahaan/sektor industri yang dikunjungi,
 * agenda kegiatan, dan intisari pembelajaran akademik.
 */
const industrialVisits = [
  {
    id: "industri-01",
    category: "industri",
    companyName: "[Industri Kreatif & Merchandise Bali]", // [Placeholder] Contoh: Rumah Kreatif & Pabrik Kata Joger / Kaos Krisna
    sector: "Industri Kreatif & Manajemen Brand",
    location: "Kuta / Tabanan, Bali",
    visitOrder: "Kunjungan I",
    date: "[Tanggal Kunjungan 01]", // [Placeholder]
    tagline: "Eksplorasi Nilai Tambah Desain Lokal dalam Pasar Nasional",
    description: "Studi lapangan mengenai cara mentransformasikan keunikan narasi lokal menjadi produk fesyen dan cendera mata berdaya saing tinggi. Kami mengamati alur kerja dari perancangan konsep, sablon presisi, kendali mutu, hingga etalase penjualan ritel.",
    activities: [
      "Paparan manajemen mengenai strategi hak cipta dan diferensiasi merek.",
      "Observasi langsung area workshop produksi, penyablonan tekstil, dan penjahitan.",
      "Sesi tanya-jawab interaktif bersama kepala divisi operasional dan desainer produk.",
      "Analisis sistem inventori dan pola pelayanan pelanggan di toko ritel."
    ],
    learnings: [
      "Bagaimana autentisitas lokal mampu menjadi benteng pertahanan merek terhadap serbuan produk massal.",
      "Pentingnya standardisasi kualitas (QC) pada setiap tahapan produksi manufaktur skala menengah.",
      "Kolaborasi erat antara tim desain kreatif dan tim manajemen logistik gudang."
    ],
    cover: "assets/images/industry/creative-industry.jpg",
    coverAlt: "Mahasiswa mengamati workshop proses cetak dan produksi kreatif",
    photos: [
      {
        src: "assets/images/industry/creative-industry.jpg",
        alt: "Suasana studio workshop kreatif",
        caption: "Observasi alur sablon manual dan pembagian tugas dalam lini produksi kreatif."
      },
      {
        src: "assets/images/industry/creative-sub1.jpg",
        alt: "Mahasiswa mencatat arahan instruktur",
        caption: "Kelompok menyimak penjelasan teknis seputar formulasi warna dan bahan kain."
      },
      {
        src: "assets/images/industry/creative-sub2.jpg",
        alt: "Pajangan prototipe dan katalog produk",
        caption: "Display etalase produk jadi yang siap didistribusikan ke jaringan gerai oleh-oleh."
      }
    ]
  },
  {
    id: "industri-02",
    category: "industri",
    companyName: "[Pabrik Pengolahan & Roastery Kopi Kintamani]", // [Placeholder] Contoh: Koperasi Tani Kopi Organik Kintamani
    sector: "Agroindustri & Pengolahan Pangan",
    location: "Kintamani, Bangli, Bali",
    visitOrder: "Kunjungan II",
    date: "[Tanggal Kunjungan 02]", // [Placeholder]
    tagline: "Integrasi Hulu ke Hilir Kopi Arabika Bersertifikasi Indikasi Geografis",
    description: "Mempelajari rantai pasok kopi Arabika dataran tinggi Kintamani. Dari pemetikan buah ceri merah, fermentasi basah, penjemuran di rumah kaca, penyortiran biji cacat (defect sorting), hingga proses penyangraian (roasting) modern yang menjaga cita rasa jeruk khas Kintamani.",
    activities: [
      "Kunjungan ke kebun percontohan dan pengamatan tanah vulkanik Gunung Batur.",
      "Praktik pemilahan biji kopi secara manual dan penjelasan grading kualitas green bean.",
      "Demonstrasi mesin roaster drum serta pencatatan kurva temperatur roasting.",
      "Sesi cupping kopi bersama Q-Grader bersertifikat untuk mengenali profil rasa."
    ],
    learnings: [
      "Prinsip Indikasi Geografis (IG) yang melindungi nilai ekonomis petani kopi lokal di pasar dunia.",
      "Dampak kontrol kelembapan dan suhu saat pengeringan terhadap kestabilan mutu biji kopi.",
      "Potensi diversifikasi produk turunan kopi (cascara tea dan pupuk organik kulit ceri)."
    ],
    cover: "assets/images/industry/coffee-roastery.jpg",
    coverAlt: "Sesi edukasi pengolahan kopi berlatar panorama Gunung Batur",
    photos: [
      {
        src: "assets/images/industry/coffee-roastery.jpg",
        alt: "Pengolahan kopi tradisional Kintamani",
        caption: "Mahasiswa belajar memilah biji kopi didampingi pengrajin sangrai lokal di Kintamani."
      },
      {
        src: "assets/images/industry/coffee-sub1.jpg",
        alt: "Sortir biji kopi green bean",
        caption: "Pemeriksaan visual fisik biji kopi sebelum masuk ke tahap sangrai suhu tinggi."
      },
      {
        src: "assets/images/industry/coffee-sub2.jpg",
        alt: "Pemandangan Batur dari fasilitas roasting",
        caption: "Gudang penyimpanan dan pengolahan dengan ventilasi alami berhawa sejuk pegunungan."
      }
    ]
  }
];

/**
 * Momen & Memori (Little Moments, Lasting Memories)
 * Potret spontan, kehangatan di bus perjalanan, makan malam, dan canda tawa kelompok.
 */
const moments = [
  {
    id: "momen-01",
    category: "moments",
    title: "Diskusi Ringan & Catatan Lapangan",
    location: "Workshop Industri",
    date: "[Catatan Hari 02]",
    caption: "Membagi lembaran catatan dan saling memeriksa kembali poin penting sebelum presentasi harian.",
    cover: "assets/images/moments/moment-01.jpg",
    coverAlt: "Diskusi catatan bersama"
  },
  {
    id: "momen-02",
    category: "moments",
    title: "Belajar Bersama Petani Kintamani",
    location: "Kintamani",
    date: "[Catatan Hari 03]",
    caption: "Momen hangat saat ibu-ibu petani mengajarkan kami teknik memilah biji kopi dengan teliti.",
    cover: "assets/images/moments/moment-02.jpg",
    coverAlt: "Belajar bersama petani"
  },
  {
    id: "momen-03",
    category: "moments",
    title: "Langkah Santai di Lorong Desa",
    location: "Penglipuran",
    date: "[Catatan Hari 04]",
    caption: "Menikmati udara sejuk tanpa deru knalpot, sekadar bertukar tawa di sela agenda padat.",
    cover: "assets/images/moments/moment-03.jpg",
    coverAlt: "Langkah santai di Penglipuran"
  },
  {
    id: "momen-04",
    category: "moments",
    title: "Menunggu Detik-Detik Lembayung Senja",
    location: "Pesisir Karang",
    date: "[Catatan Hari 01]",
    caption: "Duduk berjajar di tepi karang, menunggu surya berpamitan ke balik garis cakrawala samudra.",
    cover: "assets/images/moments/moment-04.jpg",
    coverAlt: "Menunggu senja di tepi laut"
  },
  {
    id: "momen-05",
    category: "moments",
    title: "Pagi Hijau yang Menyegarkan Pikiran",
    location: "Ubud Valley",
    date: "[Catatan Hari 03]",
    caption: "Rasa letih terbayar lunas saat mata dimanjakan hamparan undakan hijau dan semilir angin pagi.",
    cover: "assets/images/moments/moment-05.jpg",
    coverAlt: "Pagi hijau di terasering"
  },
  {
    id: "momen-06",
    category: "moments",
    title: "Di Ujung Petang Menjelang Pulang",
    location: "Batu Pahat Karang",
    date: "[Catatan Hari 04]",
    caption: "Satu jepretan sebelum senja benar-benar padam, merangkum rasa syukur atas perjalanan yang telah kami lalui.",
    cover: "assets/images/moments/moment-06.jpg",
    coverAlt: "Petang di samudra Bali"
  }
];

/**
 * Galeri Video (Moving Memories)
 * Video unggulan utama + koleksi video pendek perjalanan.
 * Mendukung video lokal (.mp4) atau embed YouTube.
 */
const videos = [
  {
    id: "video-featured",
    isFeatured: true,
    title: "Cinematic Recap: 10 Langkah di Pulau Dewata",
    category: "Highlight Reel",
    duration: "[03:45]", // [Placeholder]
    description: "Rangkuman visual perjalanan KKL dari hari pertama kedatangan, sesi observasi industri, hingga keindahan alam dan momen canda tawa di balik layar.",
    type: "local", // "local" atau "embed"
    src: "assets/videos/journey-highlight.mp4",
    embedUrl: "", // Jika type: "embed", isi dengan tautan YouTube embed, misal: "https://www.youtube.com/embed/..."
    poster: "assets/videos/video-poster.jpg"
  },
  {
    id: "video-02",
    isFeatured: false,
    title: "Di Balik Layar: Sesi Kunjungan Industri",
    category: "Studi Lapangan",
    duration: "[02:15]",
    description: "Dokumentasi interaksi bersama para praktisi dan serunya mengamati proses kerja di lantai produksi.",
    type: "local",
    src: "assets/videos/industry-clip.mp4", // [Placeholder] Sediakan file atau ubah ke embed
    embedUrl: "",
    poster: "assets/images/industry/creative-industry.jpg"
  },
  {
    id: "video-03",
    isFeatured: false,
    title: "Goresan Warna Senja & Kintamani",
    category: "Eksplorasi Budaya",
    duration: "[01:50]",
    description: "Keindahan alam pegunungan Kintamani dan kehangatan tradisi desa adat Bali.",
    type: "local",
    src: "assets/videos/landscape-clip.mp4", // [Placeholder]
    embedUrl: "",
    poster: "assets/images/destinations/tanah-lot.jpg"
  }
];

/**
 * Data TEPAT 10 Anggota Kelompok (The People Behind the Journey)
 * Semua data menggunakan format standar. Pengguna cukup memperbarui nama, peran,
 * kutipan, dan file foto masing-masing anggota.
 */
const teamMembers = [
  {
    id: "member-01",
    number: "01",
    name: "[Nama Anggota 01]", // [Placeholder] Ganti dengan nama lengkap anggota
    role: "Ketua Kelompok & Koordinator",
    quote: "Perjalanan terbaik bukan tentang seberapa jauh jaraknya, tapi tentang siapa yang melangkah bersama kita.",
    photo: "assets/images/members/member-01.jpg",
    alt: "Potret Anggota 01 - Ketua Kelompok",
    imagePosition: "center 20%" // Pengaturan posisi foto jika diperlukan
  },
  {
    id: "member-02",
    number: "02",
    name: "[Nama Anggota 02]",
    role: "Sekretaris & Administrasi",
    quote: "Di setiap lembar catatan dan izin perjalanan, terselip cerita kekeluargaan yang tak tergantikan.",
    photo: "assets/images/members/member-02.jpg",
    alt: "Potret Anggota 02 - Sekretaris",
    imagePosition: "center 20%"
  },
  {
    id: "member-03",
    number: "03",
    name: "[Nama Anggota 03]",
    role: "Bendahara & Manajemen Logistik",
    quote: "Menjaga ritme dan kebutuhan tim mengajari kami arti kepedulian di tengah riuhnya perjalanan.",
    photo: "assets/images/members/member-03.jpg",
    alt: "Potret Anggota 03 - Bendahara",
    imagePosition: "center 20%"
  },
  {
    id: "member-04",
    number: "04",
    name: "[Nama Anggota 04]",
    role: "Koordinator Dokumentasi & Foto",
    quote: "Membekukan detik berharga dalam bingkai lensa agar tak lekang tergerus waktu.",
    photo: "assets/images/members/member-04.jpg",
    alt: "Potret Anggota 04 - Fotografer",
    imagePosition: "center 20%"
  },
  {
    id: "member-05",
    number: "05",
    name: "[Nama Anggota 05]",
    role: "Videografer & Editor Media",
    quote: "Setiap senyuman dan canda tawa adalah potongan adegan dari film perjalanan terindah kita.",
    photo: "assets/images/members/member-05.jpg",
    alt: "Potret Anggota 05 - Videografer",
    imagePosition: "center 20%"
  },
  {
    id: "member-06",
    number: "06",
    name: "[Nama Anggota 06]",
    role: "Humas & Relasi Industri",
    quote: "Menghubungkan ruang kelas dengan realitas dunia kerja adalah pengalaman yang membuka mata.",
    photo: "assets/images/members/member-06.jpg",
    alt: "Potret Anggota 06 - Humas",
    imagePosition: "center 20%"
  },
  {
    id: "member-07",
    number: "07",
    name: "[Nama Anggota 07]",
    role: "Akomodasi & Transportasi",
    quote: "Jalanan berliku Bali mengajarkan kami arti kesabaran dan kebersamaan di sepanjang rute.",
    photo: "assets/images/members/member-07.jpg",
    alt: "Potret Anggota 07 - Akomodasi",
    imagePosition: "center 20%"
  },
  {
    id: "member-08",
    number: "08",
    name: "[Nama Anggota 08]",
    role: "Koordinator Lapangan & Keselamatan",
    quote: "Memastikan semua anggota pulang dengan selamat, membawa ilmu baru, dan kenangan berharga.",
    photo: "assets/images/members/member-08.jpg",
    alt: "Potret Anggota 08 - Korlap",
    imagePosition: "center 20%"
  },
  {
    id: "member-09",
    number: "09",
    name: "[Nama Anggota 09]",
    role: "Penyusun Laporan Akademik",
    quote: "Data dan wawasan yang kami dapatkan di Bali adalah bekal nyata untuk masa depan profesional kami.",
    photo: "assets/images/members/member-09.jpg",
    alt: "Potret Anggota 09 - Penyusun Laporan",
    imagePosition: "center 20%"
  },
  {
    id: "member-10",
    number: "10",
    name: "[Nama Anggota 10]",
    role: "Kreatif & Publikasi Publik",
    quote: "Perjalanan ini usai, namun tali persaudaraan sepuluh orang ini akan terus berlanjut.",
    photo: "assets/images/members/member-10.jpg",
    alt: "Potret Anggota 10 - Kreatif Publikasi",
    imagePosition: "center 20%"
  }
];

/**
 * Foto Kelompok Besar (Group Portrait)
 */
const groupPortrait = {
  src: "assets/images/group/group-portrait.jpg",
  alt: "Foto bersama seluruh 10 anggota kelompok KKL di Bali",
  caption: "Sepuluh jiwa, ribuan kilometer, dan satu ikatan persahabatan yang abadi di Pulau Dewata."
};

/**
 * Konfigurasi Penutup (Closing Chapter)
 */
const closingConfig = {
  badge: "Epilogue",
  title: "Until the Next Journey",
  quote: "Setiap langkah di tanah dewata telah menjadi bagian dari cerita hidup kami. Kita berangkat sebagai rekan satu tim, dan kembali sebagai keluarga.",
  paragraphs: [
    "Kunjungan Kerja Lapangan ini telah mengajarkan kami bahwa ilmu tidak hanya bersemayam di balik dinding ruang kuliah dan buku teks. Ilmu hidup di tengah masyarakat, berdenyut di lantai workshop para perajin, dan mengalir bersama kearifan tradisi yang dijaga turun-temurun.",
    "Terima kasih untuk setiap senyuman, diskusi larut malam, kerja keras menyusun laporan, dan tawa lepas di perjalanan. Arsip digital ini kami persembahkan sebagai saksi bisu jejak kaki kami di Bali."
  ],
  curatedGallery: [
    {
      src: "assets/images/hero/hero-cover.jpg",
      alt: "Danau Beratan Bedugul",
      caption: "Kedamaian fajar di Danau Beratan"
    },
    {
      src: "assets/images/destinations/tanah-lot.jpg",
      alt: "Tanah Lot saat senja",
      caption: "Cakrawala emas di pesisir Tanah Lot"
    },
    {
      src: "assets/images/destinations/tegalalang.jpg",
      alt: "Terasering hijau Tegalalang",
      caption: "Harmoni hijau padi di Ubud"
    },
    {
      src: "assets/images/industry/coffee-roastery.jpg",
      alt: "Pembelajaran kopi di Kintamani",
      caption: "Wawasan proses agroindustri Kintamani"
    }
  ],
  credits: {
    institution: "[Nama Program Studi / Universitas]", // [Placeholder]
    groupName: "Kelompok KKL Bali", // [Placeholder]
    curators: "Tim Dokumentasi & Publikasi",
    year: "2026"
  }
};
