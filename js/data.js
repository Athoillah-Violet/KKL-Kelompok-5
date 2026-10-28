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
 * 1. Gunakan path relatif (misal: "assets/images/...") ATAU link Google Drive langsung.
 *    Untuk deploy GitHub tanpa upload file besar: isi js/asset-drive-map.js (path → link Drive).
 *    Sistem otomatis mengenali Google Drive untuk gambar, video (embed), dan audio.
 * 2. Galeri "Explore" akan otomatis menggabungkan destinasi wisata, industri,
 *    dan momen. Anda TIDAK PERLU memasukkan data yang sama dua kali.
 * 3. Jika suatu field belum Anda miliki, Anda dapat membiarkannya atau
 *    menggunakan placeholder yang tersedia.
 * ====================================================================
 */

const siteConfig = {
  // Identitas Website & Kelompok
  siteTitle: "KKL BALI — Kelompok 5",
  brandName: "KKL BALI",
  groupName: "Kelompok 5", // Identitas Kelompok 5
  institutionName: "[Nama Program Studi / Universitas]", // [Placeholder] Contoh: Teknik Informatika - Universitas Indonesia
  activityName: "Kunjungan Kerja Lapangan (KKL) Bali",
  travelPeriod: "[Bulan Tahun, misal: Oktober 2026]", // [Placeholder] Periode perjalanan
  totalMembers: 10,
  
  // Kontak atau tautan repositori (opsional, jika kosong tidak akan dimunculkan)
  repoUrl: "https://github.com/",
  instagramUrl: "", // Kosongkan jika tidak ada
  
  // Audio Latar (Musik Ambient)
  // Bisa file lokal seperti "assets/audio/wonderland-indonesia.mp3"
  // Atau link Google Drive langsung (link share apa pun dari Google Drive)
  bgAudioSrc: "assets/audio/wonderland-indonesia.mp3",
  
  // Teks pembuka bagian "Tentang Kami"
  about: {
    badge: "Awal Mula",
    title: "Tentang Perjalanan Kami",
    subtitle: "Merekam jejak ilmu, eksplorasi budaya pulau dewata, dan persahabatan yang mengakar erat.",
    paragraphs: [
      "Kunjungan Kerja Lapangan (KKL) ini bukan sekadar agenda akademik wajib, melainkan jendela pembuka wawasan yang mempertemukan kami langsung dengan denyut industri kreatif, tradisi agrikultur berkelanjutan, serta kekayaan pusaka kultural Pulau Bali.",
      "Selama perjalanan, 10 anggota Kelompok 5 berproses bersama: belajar mengamati dinamika profesional di lapangan, menyerap kearifan lokal masyarakat Bali, dan merajut momen kebersamaan yang terekam utuh dalam arsip jurnal digital ini."
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
      { label: "Durasi Perjalanan", value: "3 Hari Penuh" },
      { label: "Destinasi Kunjungan", value: "6 Destinasi Utama" },
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
  titleLine1: "KKL BALI,",
  titleLine2: "KELOMPOK 5",
  quote: "Sepuluh orang, satu perjalanan, dan cerita yang akan selalu dikenang.",
  
  // Metadata Hero yang tampil di badge
  metaBadges: [
    { label: "Kegiatan", value: "KKL Lapangan" },
    { label: "Lokasi", value: "Bali, Indonesia" },
    { label: "Kelompok", value: "Kelompok 5 (10 Orang)" }
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
    date: "[18 / Agustus / 2026]", // [Placeholder] Contoh: 12 Oktober 2026
    title: "Kedatangan & Inisiasi Langkah di Bali",
    location: "Universitas PGRI SEMARANG",
    description: "Tiba di UPGRIS, briefing koordinasi, Berangkat sampai Pelabuhan Ketapang - Gili Manuk .",
    photo: "keberangkatan.jpg",
    alt: "Kedatangan di pesisir Bali"
  },
  {
    dayNumber: "02",
    dayLabel: "Hari 02",
    date: "[19 / Agustus / 2026]", // [Placeholder]
    title: "Walcome to Bali",
    location: "Gianyar / Denpasar",
    description: "Awal perjalanan elihat keindahan candi, belanja di JOGER dan melihat pertujjukan di devdane show.",
    photo: "hari2.jpg",
    alt: "Kunjungan industri kreatif Bali"
  },
  {
    dayNumber: "03",
    dayLabel: "Hari 03",
    date: "[20 / Agustus / 2026]", // [Placeholder]
    title: "Jalan-jalan di pantai bali bersama prodi, senang di hati",
    location: "Kintamani & Ubud",
    description: "melihat keindahan pantai Kuta dan Pandawa serta melihat tarian kecak di penghujung sore",
    photo: "pantai",
    alt: "Terasering hijau Tegalalang Ubud"
  },
  {
    dayNumber: "04",
    dayLabel: "Hari 04",
    date: "[21 / Angustus / 2026]", // [Placeholder]
    title: "Goodby Bali",
    location: "Bangli & Uluwatu",
    description: "perjalanan bisa usai tapi kenangan akan selalu ada di setiap peristiwa.",
    photo: "pulang",
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
    title: "Candi Kuning Bedugul",
    location: "Candikuning, Baturiti, Tabanan, Bali",
    badge: "Heritage & Landscape",
    description: "Candikuning adalah sebuah desa wisata di dataran tinggi Bedugul, Bali, yang terkenal dengan udaranya yang sejuk, agrowisata yang subur, dan ikon terkenal seperti pura tepi danau Pura Ulun Danu Beratan. Desa ini menjadi pusat wisata utama yang menyediakan Pasar Candi Kuning (terkenal dengan stroberi segar dan rempah-rempah) serta Kebun Raya Bali yang sangat luas.",
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
    title: "Devdan Show: Treasure of the Archipelago",
    location: "Lot BC, Benoa, Kuta Selatan, Badung, Bali",
    badge: "Agrikultur & Subak",
    description: "Pertunjukan teater pemenang penghargaan ini mengemas keberagaman budaya Nusantara—mulai dari Bali, Jawa, Sumatera, Kalimantan, hingga Papua—menjadi satu mahakarya spektakuler. Gak cuma tarian tradisional, kamu bakal dibuat takjub sama kombinasi akrobat udara kelas dunia, tarian modern hip-hop, atraksi api, hingga efek visual megah hujan di dalam ruangan! ",
    experience: "Menemukan Indonesia dalam satu malam, merayakan keberagaman dalam satu panggung. Devdan adalah bukti bahwa perbedaan adalah anugerah terindah.",
    cover: "assets/images/destinations/devdan.jpg",
    coverAlt: "Terasering Tegalalang Ubud berkilau cahaya matahari pagi",
    photos: [
      {
        src: "assets/images/destinations/devdan2.jpg",
        alt: "Terasering Tegalalang Ubud",
        caption: "Lanskap berundak Tegalalang dengan sorot sinar pagi menembus dedaunan kelapa."
      },
      {
        src: "assets/images/destinations/devdan3.jpg",
        alt: "Petak sawah bertingkat",
        caption: "Kerapian petak-petak padi yang terairi sempurna lewat kearifan sistem Subak."
      },
      {
        src: "assets/images/destinations/devdan4.jpg",
        alt: "Pondok kayu di tengah sawah",
        caption: "Gubuk peristirahatan petani lokal di tengah hamparan padi yang mulai menghijau."
      }
    ]
  },
  {
    id: "wisata-03",
    category: "wisata",
    title: "Pesona Keindahan dan Legenda Sunset Pantai Kuta",
    location: "Badung, Bali",
    badge: "Pantai Wisata",
    description: "Pantai ikonik di Bali yang terkenal di kancah dunia dengan hamparan pasir putih luas serta ombak yang sempurna untuk berselancar. Menawarkan panorama matahari terbenam (sunset) yang memukau dan suasana pantai yang selalu hidup setiap hari.",
     experience: "Suasana sore hari di Pantai Kuta selalu memberikan ketenangan tersendiri, menikmati deburan ombak sambil menyaksikan langit perlahan berubah menjadi jingga keemasan.",
    cover: "assets/images/destinations/kuta.jpg",
    coverAlt: "Jalan utama Desa Adat Penglipuran yang bersih dan tertata",
    photos: [
      {
        src: "assets/images/destinations/kuta1.jpg",
        alt: "Jalan utama Penglipuran",
        caption: "Lorong asri Desa Penglipuran dihiasi bunga kamboja dan arsitektur bata merah seragam."
      },
      {
        src: "assets/images/destinations/kuta2.jpg",
        alt: "Detail gerbang angkul-angkul",
        caption: "Gerbang pekarangan tradisional bernuansa kayu sirap dan ornamen ukiran Bali."
      },
      {
        src: "assets/images/destinations/kuta3.jpg",
        alt: "Pekarangan warga Penglipuran",
        caption: "Kesejukan ruang terbuka hijau di dalam lingkungan perumahan adat Bangli."
      }
    ]
  },
  {
    id: "wisata-04",
    category: "wisata",
    title: "Eksotisme Tebing Kapur dan Pesona Pantai Pandawa",
    location: "Kuta Selatan, Badung, Bali",
    badge: "PANTAI & BAHARIs",
    description: "Pantai megah yang tersembunyi di balik tebing kapur tinggi dengan ukiran lima patung Ksatria Pandawa. Memiliki pasir putih bersih dan air laut yang tenang, sangat cocok untuk berenang mau pun bermain kano.",
    experience:"Menyusuri jalan di antara tebing tinggi menuju pantai memberikan kesan yang megah, disempurnakan dengan pemandangan air laut biru jernih yang memanjakan mata.", cover: "assets/images/destinations/beratan.jpg",
    cover: "assets/images/destinations/pandawa.jpg",
    coverAlt: "Pantai Pandawa",
    photos: [
      {
        src: "assets/images/destinations/pandawa1.jpg",
        alt: "Pura Ulun Danu Beratan di tepi danau",
        caption: "Bangunan pura berundak yang menapak di tepi Danau Beratan berlatar perbukitan hijau."
      },
      {
        src: "assets/images/destinations/pandawa2.jpg",
        alt: "Kabut pagi di atas Danau Beratan",
        caption: "Selimut kabut tipis menyapa permukaan danau saat pagi mulai menyingsing."
      },
      {
        src: "assets/images/destinations/pandawa3.jpg",
        alt: "Taman tepi danau Beratan",
        caption: "Taman bunga yang tertata rapi menuntun langkah menuju pelataran pura."
      }
    ]
  },
  {
    id: "wisata-05",
    category: "wisata",
    title: "Magisnya Pementasan Tari Kecak Berlatar Sunset Pantai Pandawa",
    location: "Jimbaran, Badung, Bali",
    badge: "Pura Tebing & Samudra",
    description:  "Pertunjukan seni tradisional Bali yang ikonik dengan paduan suara puluhan penari pria tanpa baju meneriakkan 'cak!', dipentaskan di panggung terbuka di atas tebing dengan latar belakang pemandangan matahari terbenam yang spektakuler di atas Samudra Hindia.", 
     experience: "Suara koor 'cak cak cak' yang bergemuruh berpadu sempurna dengan deburan ombak dan langit senja yang dramatis, menciptakan pengalaman magis yang tak terlupakan.",
    cover: "assets/images/destinations/kecak.jpg",
    coverAlt: "Pura Luhur Uluwatu di atas tebing menghadap samudra",
    photos: [
      {
        src: "assets/images/destinations/kecak-sub1.jpg",
        alt: "Pura Luhur Uluwatu di tepi tebing",
        caption: "Arsitektur pura di ujung tebing karang dengan latar birunya Samudra Hindia."
      },
      {
        src: "assets/images/destinations/kecak-sub2.jpg",
        alt: "Tebing karang Uluwatu",
        caption: "Dinding tebing curam yang tegak berdiri menghadapi gempuran ombak dari bawah."
      },
      {
        src: "assets/images/destinations/kecak-sub3.jpg",
        alt: "Senja di Uluwatu",
        caption: "Langit jingga menemani suasana hening menjelang pertunjukan tari Kecak."
      }
    ]
  },
  {
    id: "wisata-06",
    category: "wisata",
    title: "Sensasi Kuliner Seafood Malam Hari di Tepi Pantai Jimbaran",
    location: "Jimbaran, Badung, Bali",
    badge: "Vulkanik & Pemandangan",
    description: "Pengalaman makan malam romantis di atas hamparan pasir putih Pantai Jimbaran dengan deretan meja berhiaskan lilin. Menikmati hidangan seafood segar bakar khas Bali sambil ditemani deburan ombak malam dan alunan musik akustik.",
    experience: "Menikmati santap malam beralaskan pasir pantai di bawah temaram cahaya lilin, ditemani hidangan laut lezat dengan panorama malam teluk yang tenang.",
    cover: "assets/images/destinations/jimbaran.jpg",
    coverAlt: "Panorama Gunung Batur dari dataran tinggi Kintamani",
    photos: [
      {
        src: "assets/images/destinations/jimbaran.jpg",
        alt: "Panorama Gunung Batur Kintamani",
        caption: "Siluet Gunung Batur yang tegas berlatar langit biru dataran tinggi Kintamani."
      },
      {
        src: "assets/images/destinations/jimbaran-sub1.jpg",
        alt: "Kaldera dan danau Batur",
        caption: "Hamparan kaldera vulkanik dengan Danau Batur yang membentang tenang di bawahnya."
      },
      {
        src: "assets/images/destinations/jimbaran-sub2.jpg",
        alt: "Pemandangan bukit di Kintamani",
        caption: "Perbukitan hijau dan jalan berkelok yang membelah kawasan pegunungan Bangli."
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
    companyName: "PT Victoria Care Indonesia Tbk",
    sector: "Industri Manufaktur Kosmetik & Perawatan Tubuh",
    location: "Semarang, Jawa Tengah",
    visitOrder: "Kunjungan I",
    date: "18 / Agustus / 2026",
    tagline: "Inovasi Kecantikan Lokal Berstandar Global",
    description: "Studi lapangan mengenai proses manufaktur produk kecantikan dan perawatan tubuh berteknologi modern. Kami mengamati alur kerja dari riset dan pengembangan formula, proses produksi massal berstandar CPKB, sistem kendali mutu, hingga distribusi produk ritel.",
    activities: [
      "Paparan manajemen mengenai strategi inovasi produk dan pengembangan merek lokal (seperti Herborist dan Miranda).",
      "Observasi langsung area *cleanroom* pabrik, mesin pencampuran formula, lini pengemasan otomatis, dan laboratorium QC.",
      "Sesi tanya-jawab interaktif bersama tim *Research & Development* (R&D) dan kepala divisi operasional pabrik.",
      "Analisis penerapan standar Cara Pembuatan Kosmetik yang Baik (CPKB) dan manajemen rantai pasok logistik."
    ],
    learnings: [
      "Bagaimana riset pasar dan inovasi formula menjadi kunci daya saing produk kecantikan di kancah nasional maupun internasional.",
      "Pentingnya kepatuhan terhadap standar CPKB dan quality control yang ketat pada industri manufaktur skala besar.",
      "Sinergi yang efektif antara tim R&D, lini produksi pabrik, dan tim pemasaran dalam meluncurkan produk baru ke pasar."
    ],
  
    cover: "indistri1",
    coverAlt: "Mahasiswa mengamati workshop proses cetak dan produksi kreatif",
    photos: [
      {
        src: "indistri12",
        alt: "Suasana studio workshop kreatif",
        caption: "Observasi alur sablon manual dan pembagian tugas dalam lini produksi kreatif."
      },
      {
        src: "indistri13",
        alt: "Mahasiswa mencatat arahan instruktur",
        caption: "Kelompok menyimak penjelasan teknis seputar formulasi warna dan bahan kain."
      },
      {
        src: "indistri14",
        alt: "Pajangan prototipe dan katalog produk",
        caption: "Display etalase produk jadi yang siap didistribusikan ke jaringan gerai oleh-oleh."
      }
    ]
  },
 {
    id: "industri-01",
    category: "industri",
    companyName: "Balai Diklat Industri (BDI) Denpasar",
    sector: "Pendidikan & Pengembangan Talenta Digital Kreatif",
    location: "Denpasar Timur, Bali",
    visitOrder: "Kunjungan I",
    date: "18 / Agustus / 2026",
    tagline: "Pusat Pengembangan Kompetensi SDM Industri Kreatif dan Animasi",
    description: "Studi lapangan mengenai lembaga diklat milik pemerintah di bawah Kementerian Perindustrian yang berfokus pada pencetakan talenta muda kompeten. Kami mengamati fasilitas pelatihan modern untuk animasi, gim, konten digital, serta sistem inkubator bisnis.",
    activities: [
      "Paparan profil lembaga mengenai program diklat 3-in-1 (Pelatihan, Sertifikasi Kompetensi, dan Penempatan Kerja).",
      "Observasi langsung fasilitas studio animasi, laboratorium komputer grafis, dan ruang produksi media digital.",
      "Sesi diskusi interaktif bersama instruktur dan manajemen mengenai ekosistem industri kreatif nasional.",
      "Melihat dari dekat sistem inkubasi bisnis untuk menumbuhkan wirausaha baru di bidang industri kreatif."
    ],
    learnings: [
      "Bagaimana peran strategis pemerintah dalam menjembatani dunia pendidikan dengan kebutuhan tenaga kerja industri digital.",
      "Pentingnya penguasaan teknologi animasi dan multimedia berstandar industri global bagi generasi muda.",
      "Mekanisme sertifikasi kompetensi resmi untuk memastikan daya saing lulusan di dunia kerja."
    ],
  
    cover: "https://drive.google.com/file/d/1Py6-JRISrP7uyL3Y19e67jJk9YGzvAQW/view?usp=drive_link",
    coverAlt: "Sesi edukasi pengolahan kopi berlatar panorama Gunung Batur",
    photos: [
      {
        src: "BDI-roastery.jpg",
        alt: "Pengolahan kopi tradisional Kintamani",
        caption: "Mahasiswa belajar memilah biji kopi didampingi pengrajin sangrai lokal di Kintamani."
      },
      {
        src: "BDI-sub1.jpg",
        alt: "Sortir biji kopi green bean",
        caption: "Pemeriksaan visual fisik biji kopi sebelum masuk ke tahap sangrai suhu tinggi."
      },
      {
        src: "BDI-sub2.jpg",
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
    title: "Bermain dan belajar di PT Vicroria care",
    location: "Workshop Industri",
    date: "[Catatan Hari 01]",
    caption: "Berkunjung ke PT Victoria care Indonesia, Semarang",
    cover: "assets/images/moments/moment-01.jpg",
    coverAlt: "Diskusi catatan bersama"
  },
  {
    id: "momen-02",
    category: "moments",
    title: "lebih mengnal adn berbelanja di PT Victoria care",
    location: "Workshop Industri",
    date: "[Catatan Hari 01]",
    caption: "Belajar sejarah berdirinya, dan belanja produvt di PT Victoria care Indonesia",
    cover: "assets/images/moments/moment-02.jpg",
    coverAlt: "Belajar bersama petani"
  },
  {
    id: "momen-03",
    category: "moments",
    title: "belajar di Balai Diklat Indostri Bali",
    location: "Denpasar",
    date: "[Catatan Hari 03]",
    caption: "Menajamkan pengtahuan melaluipengalaman",
    cover: "assets/images/moments/moment-03.jpg",
    coverAlt: "Langkah santai di Penglipuran"
  },
  {
    id: "momen-04",
    category: "moments",
    title: "Menunggu Detik-Detik nyanyian malam",
    location: "Pesisir Pantai",
    date: "[Catatan Hari 04]",
    caption: "Duduk berjajar di tepi pantai melihat ke balik garis cakrawala samudra.",
    cover: "assets/images/moments/moment-04.jpg",
    coverAlt: "Menunggu senja di tepi laut"
  },
  {
    id: "momen-05",
    category: "moments",
    title: "Langkah Santai di Pantai pandawa",
    location: "Pantai Pandawa",
    date: "[Catatan Hari 03]",
    caption: "Rasa letih terbayar lunas saat mata dimanjakan hamparan undakan hijau dan semilir angin pagi.",
    cover: "assets/images/moments/moment-05.jpg",
    coverAlt: "Pagi hijau di terasering"
  },
  {
    id: "momen-06",
    category: "moments",
    title: "Berkunjung dan bermain di candi kuning",
    location: "Candi Kuning",
    date: "[Catatan Hari 02]",
    caption: "Satu jepretan merangkum rasa syukur atas perjalanan yang telah kami lalui.",
    cover: "assets/images/moments/moment-06.jpg",
    coverAlt: "Petang di samudra Bali"
  }
];

/**
 * Galeri Video (Moving Memories)
 * Video unggulan utama + koleksi video pendek perjalanan.
 * Mendukung: MP4 lokal, link Google Drive (type "local" + src link Drive, atau type "drive"),
 * atau embed YouTube (type "embed").
 */
const videos = [
  {
    id: "video-featured",
    isFeatured: true,
    title: "Cinematic Recap: 10 Langkah di Pulau Dewata",
    category: "Sorotan Utama",
    duration: "[03:45]", // [Placeholder]
    description: "Rangkuman visual perjalanan KKL dari hari pertama kedatangan, sesi observasi industri, hingga keindahan alam dan momen canda tawa di balik layar.",
    type: "local", // "local" | "drive" | "embed"
    src: "assets/videos/journey-highlight.mp4", // atau langsung: "https://drive.google.com/file/d/FILE_ID/view"
    embedUrl: "", // Jika type: "embed", isi YouTube embed, mis. "https://www.youtube.com/embed/..."
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
    name: "Ahmad Athoillah Almadany (24670012)", // [Placeholder] Ganti dengan nama lengkap anggota
    role: "Web Develop",
    quote: "saat kau mau mencariku, temui aku di rassa sesalmu, Adios....",
    photo: "assets/images/members/member-01.jpg",
    alt: "Potret Anggota 01 - Ketua Kelompok",
    imagePosition: "center 20%" // Pengaturan posisi foto jika diperlukan
  },
  {
    id: "member-02",
    number: "02",
    name: "Rafi Asyam Firjatullah 24670077",
    role: "Pengacara",
    quote: "Jika HTML perlu CSS, maka aku perlu minum ES.",
    photo: "assets/images/members/member-02.jpg",
    alt: "Potret Anggota 02 - Sekretaris",
    imagePosition: "center 20%"
  },
  {
    id: "member-03",
    number: "03",
    name: "Mifgha Hanif Syahputra (24670078)",
    role: "Lord Editor",
    quote: ".Aku besar bukan karena keinginan, tapi karena itulah pencapaian",
    photo: "assets/images/members/member-03.jpg",
    alt: "Potret Anggota 03 - Bendahara",
    imagePosition: "center 20%"
  },
  {
    id: "member-04",
    number: "04",
    name: "IMAH NURAINI (24670024)",
    role: "Koordinator Dokumentasi & Foto",
    quote: "Jalan-jalan adalah aku, aku aadlah Jalan-jalan.",
    photo: "assets/images/members/member-04.jpg",
    alt: "Potret Anggota 04 - Fotografer",
    imagePosition: "center 20%"
  },
  {
    id: "member-05",
    number: "05",
    name: "Nazlia Intani R.E (24670019)",
    role: "Dokumentasi Laporan",
    quote: "Setiap senyuman dan canda tawa adalah potongan adegan dari film perjalanan terindah kita.",
    photo: "assets/images/members/member-05.jpg",
    alt: "Potret Anggota 05 - Videografer",
    imagePosition: "center 20%"
  },
  {
    id: "member-06",
    number: "06",
    name: "Samrina Muharditami (24670139)",
    role: "Laporan Builder",
    quote: "Menghubungkan ruang kelas dengan realitas dunia kerja adalah pengalaman yang membuka mata.",
    photo: "assets/images/members/member-06.jpg",
    alt: "Potret Anggota 06 - Humas",
    imagePosition: "center 20%"
  },
  {
    id: "member-07",
    number: "07",
    name: "Farid Nur Ilham (24670054)",
    role: "Lord Treveler",
    quote: "Jalanan berliku Bali mengajarkan kami arti kesabaran dan kebersamaan di sepanjang rute.",
    photo: "assets/images/members/member-07.jpg",
    alt: "Potret Anggota 07 - Akomodasi",
    imagePosition: "center 20%"
  },
  {
    id: "member-08",
    number: "08",
    name: "M.Rafisyach.A.S (24670130)",
    role: "Koordinator Lapangan & Keselamatan",
    quote: "Aku sepertinya bukan karena penampilannya, tapi karena akulah dirinya.",
    photo: "assets/images/members/member-08.jpg",
    alt: "Potret Anggota 08 - Korlap",
    imagePosition: "center 20%"
  },
  {
    id: "member-09",
    number: "09",
    name: "Muh toha mahfudz (24670113)",
    role: "Penyusun Laporan Akademik",
    quote: "Data dan wawasan yang kami dapatkan di Bali adalah bekal nyata untuk masa depan profesional kami.",
    photo: "assets/images/members/member-09.jpg",
    alt: "Potret Anggota 09 - Penyusun Laporan",
    imagePosition: "center 20%"
  },
  {
    id: "member-10",
    number: "10",
    name: "Muhammad Okta Ramadhani (24670016) ",
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
  caption: "Bersatu kita teguh bercerai kita kawin lagi. (Gubernur Kalimantan Tengah H. Agustiar Sabran, S.I.Kom.)"
};

/**
 * Konfigurasi Penutup (Closing Chapter)
 */
const closingConfig = {
  badge: "Catatan Akhir",
  title: "Hingga Perjalanan Berikutnya",
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
      src: "https://drive.google.com/file/d/1lnzwGOQtsat7wcs-G9Y68_XLr2hAkJUm/view?usp=drive_link",
      alt: "Terasering hijau Tegalalang",
      caption: "Harmoni hijau padi di Ubud"
    },
    {
      src: "https://drive.google.com/file/d/1nRXihZmKL1KI__OchhTeZP8qfNg_T5uC/view?usp=drive_link",
      alt: "Pembelajaran kopi di Kintamani",
      caption: "Wawasan proses agroindustri Kintamani"
    }
  ],
  credits: {
    institution: "[Nama Program Studi / Universitas]", // [Placeholder]
    groupName: "Kelompok 5 — KKL Bali", // Identitas Kelompok 5
    curators: "Tim Dokumentasi & Publikasi",
    year: "2026"
  }
};
