/**
 * ====================================================================
 * BALI KKL JOURNAL — JAVASCRIPT LOGIC ENGINE (js/script.js)
 * ====================================================================
 * Mengelola seluruh interaktivitas website:
 * - Inisialisasi & injeksi konten dinamis dari js/data.js
 * - Navigasi responsif & active link indicator (ScrollSpy)
 * - Mobile hamburger drawer
 * - Filter kategori galeri Explore
 * - Sistem Lightbox komprehensif (keyboard, backdrop, prev/next, counter)
 * - Konfigurasi video hero & moving memories player
 * - Penanganan fallback gambar otomatis (tidak ada broken image)
 * - Tombol Back to Top
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi seluruh modul
  initSiteContent();
  initNavigation();
  initBackgroundAudio();
  initLightbox();
  initExploreFilter();
  initGalleryMarqueeInteractions();
  initBackToTop();
  setupImageFallbacks();
  initScrollAnimations();
});

/**
 * ====================================================================
 * GOOGLE DRIVE ASSET RESOLVER HELPERS
 * ====================================================================
 * Mengubah link share Google Drive menjadi direct streaming / image URL
 * Mendukung berbagai format link share Google Drive.
 */
function normalizeMediaUrl(url) {
  if (!url || typeof url !== "string") return "";
  return url.trim().replace(/^hhttps:\/\//i, "https://");
}

function extractGoogleDriveId(url) {
  const normalized = normalizeMediaUrl(url);
  if (!normalized) return null;
  const match =
    normalized.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    normalized.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function isGoogleDriveUrl(url) {
  const normalized = normalizeMediaUrl(url);
  return Boolean(
    normalized &&
      (normalized.includes("drive.google.com") ||
        normalized.includes("docs.google.com/uc"))
  );
}

/**
 * Resolusi path lokal + assetDriveMap → metadata Drive (jika ada).
 */
function getAssetSource(url) {
  const original = normalizeMediaUrl(url);
  if (!original) {
    return { original: "", mapped: "", fileId: null, isDrive: false, embedUrl: null };
  }

  let mapped = original;
  if (typeof assetDriveMap === "object" && assetDriveMap !== null && assetDriveMap[original]) {
    mapped = normalizeMediaUrl(String(assetDriveMap[original]));
  }

  const fileId = extractGoogleDriveId(mapped) || extractGoogleDriveId(original);
  const isDrive = Boolean(fileId);

  return {
    original,
    mapped,
    fileId,
    isDrive,
    embedUrl: fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null,
    imageUrl: fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w1920` : null,
    audioStreamUrls: fileId
      ? [
          `https://drive.usercontent.google.com/download?id=${fileId}&export=download`,
          `https://docs.google.com/uc?export=download&id=${fileId}&confirm=t`,
        ]
      : [],
  };
}

function isDriveMediaSource(url) {
  return getAssetSource(url).isDrive;
}

function getDriveEmbedUrl(url) {
  const meta = getAssetSource(url);
  return meta.embedUrl || normalizeMediaUrl(url);
}

/**
 * Mengubah path lokal / link Drive menjadi URL yang bisa dipakai di web.
 * Path lokal bisa di-override lewat assetDriveMap (js/asset-drive-map.js).
 */
function resolveAssetUrl(url, type = "image") {
  if (!url || typeof url !== "string") return url || "";
  const meta = getAssetSource(url);
  const trimmed = meta.mapped;

  if (meta.isDrive && meta.fileId) {
    if (type === "image") return meta.imageUrl;
    if (type === "audio") return meta.audioStreamUrls[0];
    if (type === "video-embed" || type === "video") return meta.embedUrl;
  }
  return trimmed;
}

/** HTML player untuk satu entri video (MP4 lokal, Drive, atau YouTube embed). */
function buildVideoPlayerHtml(video, options = {}) {
  if (!video) return "";
  const { autoplay = false, extraClass = "video-element" } = options;
  const title = escapeHtml(video.title || "Video dokumentasi");
  const poster = resolveAssetUrl(video.poster || "", "image");

  if (video.type === "embed" && video.embedUrl) {
    const embedSrc = autoplay && !video.embedUrl.includes("autoplay")
      ? `${video.embedUrl}${video.embedUrl.includes("?") ? "&" : "?"}autoplay=1`
      : video.embedUrl;
    return `
      <iframe 
        class="video-embed-iframe" 
        src="${embedSrc}" 
        title="${title}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    `;
  }

  const rawSrc = video.src || video.driveSrc || "";
  if (video.type === "drive" || isDriveMediaSource(rawSrc)) {
    const embedUrl = getDriveEmbedUrl(rawSrc);
    return `
      <iframe 
        class="video-embed-iframe drive-embed-player" 
        src="${embedUrl}" 
        title="${title}" 
        loading="lazy"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture" 
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;
  }

  if (rawSrc) {
    if (isDriveMediaSource(rawSrc)) {
      const embedUrl = getDriveEmbedUrl(rawSrc);
      return `
        <iframe 
          class="video-embed-iframe drive-embed-player" 
          src="${embedUrl}" 
          title="${title}" 
          loading="lazy"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture" 
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      `;
    }
    const videoSrc = getAssetSource(rawSrc).mapped;
    return `
      <video 
        class="${extraClass}" 
        controls 
        ${autoplay ? "autoplay " : ""}
        preload="metadata" 
        poster="${poster}"
        onerror="handleVideoError(this)"
      >
        <source src="${videoSrc}" type="video/mp4">
        Browser Anda tidak mendukung pemutaran video HTML5.
      </video>
    `;
  }

  return "";
}

/**
 * 1. INJEKSI KONTEN DINAMIS DARI DATA.JS
 */
function initSiteContent() {
  if (typeof siteConfig === "undefined") {
    console.warn("data.js belum dimuat atau format tidak sesuai.");
    return;
  }

  // 1.1 Meta Tag & Header Brand
  document.title = siteConfig.siteTitle || "KKL BALI — Kelompok 5";
  
  const brandTitleEl = document.getElementById("brand-title");
  if (brandTitleEl) brandTitleEl.textContent = siteConfig.brandName || "KKL BALI";

  const brandTaglineEl = document.getElementById("brand-tagline");
  if (brandTaglineEl) brandTaglineEl.textContent = siteConfig.groupName || "Kelompok 5";

  // 1.2 Render Hero Section
  renderHeroSection();

  // 1.3 Render About Section
  renderAboutSection();

  // 1.4 Render Journey Overview (Timeline)
  renderJourneyOverview();

  // 1.5 Render Explore Gallery (Single Source of Truth)
  renderExploreGallery();

  // 1.6 Render Destinations Section
  renderDestinations();

  // 1.7 Render Industrial Visits Section
  renderIndustrialVisits();

  // 1.8 Render Moments Section
  renderMoments();

  // 1.9 Render Video Gallery
  renderVideos();

  // 1.10 Render Team Members (10 Anggota) & Group Portrait
  renderTeam();

  // 1.11 Render Closing Chapter
  renderClosing();

  // 1.12 Render Footer
  renderFooter();
}

/**
 * Render Hero Section
 */
function renderHeroSection() {
  if (typeof heroConfig === "undefined") return;

  const mediaContainer = document.getElementById("hero-media-wrapper");
  if (mediaContainer) {
    const heroImg = resolveAssetUrl(heroConfig.imageSrc, "image");
    const heroPoster = resolveAssetUrl(heroConfig.videoPoster || heroConfig.imageSrc, "image");
    
    if (heroConfig.mediaType === "video" && heroConfig.videoSrc) {
      if (isDriveMediaSource(heroConfig.videoSrc)) {
        const embedUrl = getDriveEmbedUrl(heroConfig.videoSrc);
        mediaContainer.innerHTML = `
          <iframe 
            class="hero-media-video hero-media-drive-embed" 
            src="${embedUrl}" 
            title="Video hero KKL Bali"
            allow="autoplay; encrypted-media; fullscreen" 
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        `;
      } else {
        mediaContainer.innerHTML = `
          <video 
            class="hero-media-video" 
            autoplay 
            muted 
            loop 
            playsinline 
            poster="${heroPoster}"
          >
            <source src="${resolveAssetUrl(heroConfig.videoSrc, "video")}" type="video/mp4">
            <img src="${heroImg}" alt="${heroConfig.imageAlt}" class="hero-media-image">
          </video>
        `;
      }
    } else {
      mediaContainer.innerHTML = `
        <img 
          src="${heroImg}" 
          alt="${heroConfig.imageAlt || 'Hero Bali'}" 
          class="hero-media-image"
          onerror="handleImageError(this, 'Panorama Bali')"
        >
      `;
    }
  }

  const eyebrowEl = document.getElementById("hero-eyebrow");
  if (eyebrowEl && heroConfig.eyebrow) eyebrowEl.textContent = heroConfig.eyebrow;

  const titleLine1El = document.getElementById("hero-title-line1");
  if (titleLine1El) titleLine1El.textContent = heroConfig.titleLine1 || "KKL BALI,";

  const titleLine2El = document.getElementById("hero-title-line2");
  if (titleLine2El) titleLine2El.textContent = heroConfig.titleLine2 || "KELOMPOK 5";

  const quoteEl = document.getElementById("hero-quote");
  if (quoteEl) quoteEl.textContent = heroConfig.quote || "";

  // Badges
  const badgesContainer = document.getElementById("hero-badges");
  if (badgesContainer && Array.isArray(heroConfig.metaBadges)) {
    badgesContainer.innerHTML = heroConfig.metaBadges.map(b => `
      <div class="hero-badge-item">
        <span class="hero-badge-label">${escapeHtml(b.label)}</span>
        <span class="hero-badge-val">${escapeHtml(b.value)}</span>
      </div>
    `).join("");
  }

  // CTA Button
  const ctaBtn = document.getElementById("hero-cta-btn");
  if (ctaBtn) {
    ctaBtn.textContent = heroConfig.ctaText || "Jelajahi Perjalanan";
    ctaBtn.setAttribute("href", heroConfig.ctaTarget || "#explore");
  }
}

/**
 * Render About Section
 */
function renderAboutSection() {
  if (!siteConfig || !siteConfig.about) return;
  const ab = siteConfig.about;

  const badgeEl = document.getElementById("about-badge");
  if (badgeEl) badgeEl.textContent = ab.badge || "The Genesis";

  const titleEl = document.getElementById("about-title");
  if (titleEl) titleEl.textContent = ab.title || "Tentang Perjalanan";

  const subtitleEl = document.getElementById("about-subtitle");
  if (subtitleEl) subtitleEl.textContent = ab.subtitle || "";

  const paragraphsContainer = document.getElementById("about-paragraphs");
  if (paragraphsContainer && Array.isArray(ab.paragraphs)) {
    paragraphsContainer.innerHTML = ab.paragraphs.map(p => `
      <p class="about-paragraph">${escapeHtml(p)}</p>
    `).join("");
  }

  // Supporting Photos
  const p1Container = document.getElementById("about-photo-1-container");
  if (p1Container && ab.supportingPhoto1) {
    const p1Src = resolveAssetUrl(ab.supportingPhoto1.src, "image");
    p1Container.innerHTML = `
      <div class="about-photo-card card-primary" onclick="openSingleLightbox('${p1Src}', '${escapeQuotes(ab.supportingPhoto1.caption)}')">
        <img 
          src="${p1Src}" 
          alt="${ab.supportingPhoto1.alt || 'Dokumentasi KKL'}" 
          class="about-photo-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, 'Dokumentasi Perjalanan')"
        >
        <div class="photo-caption-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <span>${escapeHtml(ab.supportingPhoto1.caption || "")}</span>
        </div>
      </div>
    `;
  }

  const p2Container = document.getElementById("about-photo-2-container");
  if (p2Container && ab.supportingPhoto2) {
    const p2Src = resolveAssetUrl(ab.supportingPhoto2.src, "image");
    p2Container.innerHTML = `
      <div class="about-photo-card card-secondary" onclick="openSingleLightbox('${p2Src}', '${escapeQuotes(ab.supportingPhoto2.caption)}')">
        <img 
          src="${p2Src}" 
          alt="${ab.supportingPhoto2.alt || 'Dokumentasi KKL'}" 
          class="about-photo-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, 'Dokumentasi KKL')"
        >
        <div class="photo-caption-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${escapeHtml(ab.supportingPhoto2.caption || "")}</span>
        </div>
      </div>
    `;
  }

  // Highlights
  const statsContainer = document.getElementById("about-stats-grid");
  if (statsContainer && Array.isArray(ab.highlights)) {
    statsContainer.innerHTML = ab.highlights.map(h => `
      <div class="stat-item">
        <div class="stat-value">${escapeHtml(h.value)}</div>
        <div class="stat-label">${escapeHtml(h.label)}</div>
      </div>
    `).join("");
  }
}

/**
 * Render Journey Overview (Timeline)
 */
function renderJourneyOverview() {
  if (typeof journeyOverview === "undefined" || !Array.isArray(journeyOverview)) return;

  const container = document.getElementById("journey-timeline");
  if (!container) return;

  container.innerHTML = journeyOverview.map(item => {
    const photoSrc = resolveAssetUrl(item.photo, "image");
    return `
    <div class="timeline-card">
      <div class="timeline-card-media" onclick="openSingleLightbox('${photoSrc}', '${escapeQuotes(item.title)}')">
        <img 
          src="${photoSrc}" 
          alt="${item.alt || item.title}" 
          class="timeline-card-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, '${escapeQuotes(item.dayLabel)}')"
        >
        <span class="timeline-day-badge">${escapeHtml(item.dayLabel || "Hari")}</span>
      </div>
      <div class="timeline-card-body">
        <div class="timeline-meta">
          <span>${escapeHtml(item.date || "")}</span>
          <span class="timeline-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${escapeHtml(item.location || "")}
          </span>
        </div>
        <h3 class="timeline-title">${escapeHtml(item.title)}</h3>
        <p class="timeline-desc">${escapeHtml(item.description)}</p>
      </div>
    </div>
  `;
  }).join("");
}

/**
 * Global Lightbox Data Store & Explore Cache
 */
let lightboxGalleryItems = [];
let currentLightboxIndex = 0;
let exploreCompiledCache = [];

/**
 * Render Explore Section (Single Source of Truth)
 * Menggabungkan data dari destinations, industrialVisits, dan moments secara otomatis!
 * Mendukung Auto-Loop Horizontal Marquee tanpa jeda/lompatan, dengan filter & lightbox aktif.
 */
function renderExploreGallery(selectedCategory = "all") {
  const galleryGrid = document.getElementById("explore-gallery-grid");
  if (!galleryGrid) return;

  if (!exploreCompiledCache.length) {
    const compiled = [];

    // 1. Dari Destinations
    if (typeof destinations !== "undefined" && Array.isArray(destinations)) {
      destinations.forEach(dest => {
        compiled.push({
          id: dest.id,
          category: "wisata",
          categoryLabel: "Wisata",
          title: dest.title,
          location: dest.location,
          desc: dest.description,
          src: resolveAssetUrl(dest.cover, "image"),
          alt: dest.coverAlt || dest.title,
          caption: `${dest.title} — ${dest.location}`
        });
      });
    }

    // 2. Dari Industrial Visits
    if (typeof industrialVisits !== "undefined" && Array.isArray(industrialVisits)) {
      industrialVisits.forEach(ind => {
        compiled.push({
          id: ind.id,
          category: "industri",
          categoryLabel: "Kunjungan Industri",
          title: ind.companyName,
          location: ind.location,
          desc: ind.tagline || ind.description,
          src: resolveAssetUrl(ind.cover, "image"),
          alt: ind.coverAlt || ind.companyName,
          caption: `${ind.companyName} — ${ind.sector}`
        });
      });
    }

    // 3. Dari Moments
    if (typeof moments !== "undefined" && Array.isArray(moments)) {
      moments.forEach(mom => {
        compiled.push({
          id: mom.id,
          category: "moments",
          categoryLabel: "Momen",
          title: mom.title,
          location: mom.location,
          desc: mom.caption,
          src: resolveAssetUrl(mom.cover, "image"),
          alt: mom.coverAlt || mom.title,
          caption: `${mom.title} (${mom.location})`
        });
      });
    }

    // Berikan index permanen untuk Lightbox Store
    exploreCompiledCache = compiled.map((it, idx) => ({ ...it, originalIndex: idx }));
    lightboxGalleryItems = exploreCompiledCache;
    updateFilterCounters(exploreCompiledCache);
  }

  // Filter item yang aktif
  const activeItems = selectedCategory === "all"
    ? exploreCompiledCache
    : exploreCompiledCache.filter(item => item.category === selectedCategory);

  if (!activeItems.length) {
    galleryGrid.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--text-secondary); width: 100%;">
        Tidak ada foto dalam kategori ini.
      </div>
    `;
    return;
  }

  // Agar loop horizontal benar-benar mulus tanpa kedipan, celah, atau lompatan:
  // Pastikan satu set memiliki minimal 8 item (melebihi lebar layar ultrawide sekalipun)
  let loopSet = [...activeItems];
  while (loopSet.length < 8) {
    loopSet = loopSet.concat(activeItems);
  }

  // Kecepatan gerak horizontal konstan dan stabil (~50px per detik)
  const isMobile = window.innerWidth <= 768;
  const cardWidth = isMobile ? (280 + 16) : (330 + 24);
  const totalGroupWidth = loopSet.length * cardWidth;
  const speed = 50; // pixels per second
  const duration = Math.max(Math.round(totalGroupWidth / speed), 25);

  const createCardHtml = (item) => `
    <div class="gallery-item" data-category="${item.category}" onclick="openLightbox(${item.originalIndex})" role="button" tabindex="0" aria-label="${escapeHtml(item.title)}">
      <div class="gallery-item-media">
        <img 
          src="${item.src}" 
          alt="${escapeHtml(item.alt)}" 
          class="gallery-item-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, '${escapeQuotes(item.title)}')"
        >
        <span class="gallery-badge ${item.category}">${escapeHtml(item.categoryLabel)}</span>
        <div class="gallery-zoom-overlay" aria-hidden="true">
          <div class="zoom-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
        </div>
      </div>
      <div class="gallery-item-content">
        <div class="gallery-item-meta">
          <span class="gallery-item-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${escapeHtml(item.location || "")}
          </span>
        </div>
        <h3 class="gallery-item-title">${escapeHtml(item.title)}</h3>
        <p class="gallery-item-desc">${escapeHtml(item.desc || "")}</p>
      </div>
    </div>
  `;

  const groupHtml = loopSet.map(createCardHtml).join("");

  // Injeksi dua kelompok identik yang bergerak bersamaan untuk loop matematis tanpa celah
  galleryGrid.style.setProperty("--marquee-duration", `${duration}s`);
  galleryGrid.innerHTML = `
    <div class="gallery-marquee-group" id="marquee-group-1">
      ${groupHtml}
    </div>
    <div class="gallery-marquee-group" id="marquee-group-2" aria-hidden="true">
      ${groupHtml}
    </div>
  `;

  // Pastikan event interaksi hover & sentuhan terpasang
  initGalleryMarqueeInteractions();
}

/**
 * Inisialisasi Kontrol Interaksi Marquee Galeri:
 * - Jeda sementara saat kursor masuk ke galeri (Desktop), resume dari posisi terakhir saat keluar
 * - Jeda sementara saat disentuh (Mobile), resume halus setelah interaksi selesai
 * - Aksesibilitas keyboard (fokus & navigasi Enter/Space)
 */
function initGalleryMarqueeInteractions() {
  const viewport = document.getElementById("gallery-marquee-viewport");
  if (!viewport || viewport.dataset.interactionsBound) return;
  viewport.dataset.interactionsBound = "true";

  let touchTimeout = null;

  // 1. Mouse Events (Desktop)
  viewport.addEventListener("mouseenter", () => {
    viewport.classList.add("is-paused");
  });

  viewport.addEventListener("mouseleave", () => {
    viewport.classList.remove("is-paused");
  });

  // 2. Touchscreen Events (Mobile & Tablet)
  viewport.addEventListener("touchstart", () => {
    clearTimeout(touchTimeout);
    viewport.classList.add("is-paused");
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    clearTimeout(touchTimeout);
    // Berikan jeda 1.2 detik setelah sentuhan selesai agar pengguna nyaman sebelum lanjut otomatis
    touchTimeout = setTimeout(() => {
      viewport.classList.remove("is-paused");
    }, 1200);
  }, { passive: true });

  viewport.addEventListener("touchcancel", () => {
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      viewport.classList.remove("is-paused");
    }, 1200);
  }, { passive: true });

  // 3. Keyboard navigation & Enter/Space to open lightbox
  const galleryGrid = document.getElementById("explore-gallery-grid");
  if (galleryGrid) {
    galleryGrid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".gallery-item");
        if (card) {
          e.preventDefault();
          card.click();
        }
      }
    });
  }
}

/**
 * Update hitungan item di tombol filter
 */
function updateFilterCounters(items) {
  const counts = {
    all: items.length,
    wisata: items.filter(i => i.category === "wisata").length,
    industri: items.filter(i => i.category === "industri").length,
    moments: items.filter(i => i.category === "moments").length
  };

  const countAll = document.getElementById("count-all");
  if (countAll) countAll.textContent = counts.all;

  const countWisata = document.getElementById("count-wisata");
  if (countWisata) countWisata.textContent = counts.wisata;

  const countIndustri = document.getElementById("count-industri");
  if (countIndustri) countIndustri.textContent = counts.industri;

  const countMoments = document.getElementById("count-moments");
  if (countMoments) countMoments.textContent = counts.moments;
}

/**
 * Filter Kategori Galeri Explore (dengan Auto-Loop Marquee dinamis)
 */
function initExploreFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const category = btn.getAttribute("data-filter");
      renderExploreGallery(category);
    });
  });
}

/**
 * Render Destinations Section (Editorial Asymmetric Layout)
 */
function renderDestinations() {
  if (typeof destinations === "undefined" || !Array.isArray(destinations)) return;

  const container = document.getElementById("destinations-list");
  if (!container) return;

  container.innerHTML = destinations.map((dest, idx) => {
    const isReversed = idx % 2 === 1 ? "reversed" : "";
    const extraPhotos = Array.isArray(dest.photos) ? dest.photos : [];
    const coverUrl = resolveAssetUrl(dest.cover, "image");

    return `
      <article class="destination-entry ${isReversed}">
        <div class="destination-media-col">
          <div class="destination-main-photo-wrap" onclick="openSingleLightbox('${escapeQuotes(coverUrl)}', '${escapeQuotes(dest.title)} — ${escapeQuotes(dest.location)}')">
            <img 
              src="${coverUrl}" 
              alt="${dest.coverAlt || dest.title}" 
              class="destination-main-photo" 
              loading="lazy" 
              decoding="async"
              onerror="handleImageError(this, '${escapeQuotes(dest.title)}')"
            >
          </div>

          ${extraPhotos.length > 1 ? `
            <div class="destination-thumbs-row">
              ${extraPhotos.map(p => {
                const thumbUrl = resolveAssetUrl(p.src, "image");
                return `
                <div class="dest-thumb-item" onclick="openSingleLightbox('${escapeQuotes(thumbUrl)}', '${escapeQuotes(p.caption || p.alt)}')">
                  <img 
                    src="${thumbUrl}" 
                    alt="${p.alt}" 
                    class="dest-thumb-img" 
                    loading="lazy" 
                    decoding="async"
                    onerror="handleImageError(this, 'Galeri ${escapeQuotes(dest.title)}')"
                  >
                  <div class="dest-thumb-overlay">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  </div>
                </div>
              `;
              }).join("")}
            </div>
          ` : ""}
        </div>

        <div class="destination-info-col">
          <div class="destination-meta-top">
            <span class="destination-badge">${escapeHtml(dest.badge || "Wisata Bali")}</span>
            <span class="destination-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${escapeHtml(dest.location || "")}
            </span>
          </div>

          <h3 class="destination-name">${escapeHtml(dest.title)}</h3>
          <p class="destination-desc">${escapeHtml(dest.description)}</p>

          ${dest.experience ? `
            <div class="destination-experience-box">
              <div class="destination-experience-title">Catatan Perjalanan</div>
              <p class="destination-experience-text">"${escapeHtml(dest.experience)}"</p>
            </div>
          ` : ""}
        </div>
      </article>
    `;
  }).join("");
}

/**
 * Render Industrial Visits Section
 */
function renderIndustrialVisits() {
  if (typeof industrialVisits === "undefined" || !Array.isArray(industrialVisits)) return;

  const container = document.getElementById("industry-card-deck");
  if (!container) return;

  container.innerHTML = industrialVisits.map(ind => {
    const coverUrl = resolveAssetUrl(ind.cover, "image");
    return `
    <article class="industry-card">
      <div class="industry-card-media" onclick="openSingleLightbox('${escapeQuotes(coverUrl)}', '${escapeQuotes(ind.companyName)}')">
        <img 
          src="${coverUrl}" 
          alt="${ind.coverAlt || ind.companyName}" 
          class="industry-card-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, '${escapeQuotes(ind.companyName)}')"
        >
        <div class="industry-card-media-footer">
          <span class="industry-order-tag">${escapeHtml(ind.visitOrder || "Kunjungan Industri")}</span>
          <div style="font-size: 0.8125rem; opacity: 0.9;">${escapeHtml(ind.date || "")} • ${escapeHtml(ind.location || "")}</div>
        </div>
      </div>

      <div class="industry-card-body">
        <div class="industry-header">
          <div class="industry-sector-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            ${escapeHtml(ind.sector || "")}
          </div>
          <h3 class="industry-company-name">${escapeHtml(ind.companyName)}</h3>
          <p class="industry-tagline">${escapeHtml(ind.tagline || "")}</p>
        </div>

        <p class="industry-desc">${escapeHtml(ind.description)}</p>

        <div class="industry-details-grid">
          ${Array.isArray(ind.activities) && ind.activities.length ? `
            <div>
              <div class="industry-block-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                Agenda Kegiatan
              </div>
              <ul class="industry-list">
                ${ind.activities.map(act => `<li class="industry-list-item">${escapeHtml(act)}</li>`).join("")}
              </ul>
            </div>
          ` : ""}

          ${Array.isArray(ind.learnings) && ind.learnings.length ? `
            <div>
              <div class="industry-block-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Hal yang Dipelajari
              </div>
              <ul class="industry-list">
                ${ind.learnings.map(lrn => `<li class="industry-list-item">${escapeHtml(lrn)}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
        </div>
      </div>
    </article>
  `;
  }).join("");
}

/**
 * Render Moments & Memories
 */
function renderMoments() {
  if (typeof moments === "undefined" || !Array.isArray(moments)) return;

  const container = document.getElementById("moments-masonry");
  if (!container) return;

  container.innerHTML = moments.map(mom => {
    const coverUrl = resolveAssetUrl(mom.cover, "image");
    return `
    <div class="moment-card" onclick="openSingleLightbox('${escapeQuotes(coverUrl)}', '${escapeQuotes(mom.caption || mom.title)}')">
      <div class="moment-media-wrap">
        <img 
          src="${coverUrl}" 
          alt="${mom.coverAlt || mom.title}" 
          class="moment-card-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, '${escapeQuotes(mom.title)}')"
        >
      </div>
      <div class="moment-card-caption">${escapeHtml(mom.title)}</div>
      <div class="moment-card-meta">
        <span>${escapeHtml(mom.location || "")}</span>
        <span>${escapeHtml(mom.date || "")}</span>
      </div>
      <p class="moment-card-desc">"${escapeHtml(mom.caption || "")}"</p>
    </div>
  `;
  }).join("");
}

/**
 * Render Video Gallery
 */
function renderVideos() {
  if (typeof videos === "undefined" || !Array.isArray(videos)) return;

  const featured = videos.find(v => v.isFeatured) || videos[0];
  const secondaries = videos.filter(v => v !== featured);

  const playerContainer = document.getElementById("featured-video-player-container");
  if (playerContainer && featured) {
    let videoHtml = buildVideoPlayerHtml(featured);

    if (!videoHtml) {
      videoHtml = `
        <div class="video-fallback-notice">
          <div class="video-fallback-icon">🎬</div>
          <div class="video-fallback-title">Video Belum Tersedia</div>
          <p class="video-fallback-text">Tambahkan file MP4, link Google Drive, atau embed YouTube di <code>js/data.js</code> (lihat README).</p>
        </div>
      `;
    }

    playerContainer.innerHTML = `
      <div class="cinema-player-card">
        <div class="video-player-wrapper">
          ${videoHtml}
        </div>
        <div class="cinema-player-meta">
          <div>
            <span class="industry-order-tag" style="background: var(--color-olive); margin-bottom: 8px;">${escapeHtml(featured.category || "Video")}</span>
            <h3 class="cinema-title">${escapeHtml(featured.title)}</h3>
            <p class="cinema-desc">${escapeHtml(featured.description || "")}</p>
          </div>
          ${featured.duration ? `<span class="cinema-duration-badge">⏱ ${escapeHtml(featured.duration)}</span>` : ""}
        </div>
      </div>
    `;
  }

  // Secondary Videos Grid
  const secondaryContainer = document.getElementById("secondary-videos-grid");
  if (secondaryContainer) {
    if (secondaries.length > 0) {
      secondaryContainer.innerHTML = secondaries.map(sec => `
        <div class="secondary-video-card">
          <div class="sec-video-media">
            <img 
              src="${resolveAssetUrl(sec.poster || "assets/videos/video-poster.jpg", "image")}" 
              alt="${sec.title}" 
              class="sec-video-poster"
              onerror="handleImageError(this, 'Video Poster')"
            >
            <div class="sec-video-play-btn" onclick="playSecondaryVideo('${sec.id}')">▶</div>
          </div>
          <div class="sec-video-body">
            <span class="industry-order-tag" style="font-size: 0.6875rem; padding: 2px 8px; margin-bottom: 6px;">${escapeHtml(sec.category || "Video")}</span>
            <h4 class="sec-video-title">${escapeHtml(sec.title)}</h4>
            <p class="sec-video-desc">${escapeHtml(sec.description || "")}</p>
          </div>
        </div>
      `).join("");
    } else {
      secondaryContainer.innerHTML = "";
    }
  }

  // Sinkronkan interaksi video dengan musik latar
  bindVideoAudioCoordination();
}

/**
 * Memainkan video sekunder ke player utama
 */
window.playSecondaryVideo = function(videoId) {
  if (typeof videos === "undefined") return;
  const targetVideo = videos.find(v => v.id === videoId);
  if (!targetVideo) return;

  const playerWrapper = document.querySelector(".video-player-wrapper");
  if (!playerWrapper) return;

  const playerHtml = buildVideoPlayerHtml(targetVideo, { autoplay: true });
  if (playerHtml) {
    playerWrapper.innerHTML = playerHtml;
    if (targetVideo.type === "embed" || isDriveMediaSource(targetVideo.src || targetVideo.driveSrc || "")) {
      if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
        wasMusicPlayingBeforeVideo = true;
        updateAudioButtonState(false);
      }
    } else {
      bindVideoAudioCoordination();
    }
  }

  // Update judul
  const cinemaTitle = document.querySelector(".cinema-title");
  if (cinemaTitle) cinemaTitle.textContent = targetVideo.title;

  const cinemaDesc = document.querySelector(".cinema-desc");
  if (cinemaDesc) cinemaDesc.textContent = targetVideo.description || "";

  // Scroll ke player
  playerWrapper.scrollIntoView({ behavior: "smooth", block: "center" });
};

/**
 * Render Team (10 Anggota) & Group Portrait
 */
function renderTeam() {
  // 1. Group Portrait
  const groupWrap = document.getElementById("group-portrait-container");
  if (groupWrap && typeof groupPortrait !== "undefined") {
    const groupSrc = resolveAssetUrl(groupPortrait.src, "image");
    groupWrap.innerHTML = `
      <div class="group-portrait-card">
        <div class="group-portrait-wrap" onclick="openSingleLightbox('${escapeQuotes(groupSrc)}', '${escapeQuotes(groupPortrait.caption || 'Foto Kelompok KKL Bali')}')">
          <img 
            src="${groupSrc}" 
            alt="${groupPortrait.alt || 'Foto Seluruh Anggota Kelompok'}" 
            class="group-portrait-img" 
            loading="lazy" 
            decoding="async"
            onerror="handleImageError(this, 'Foto Kelompok 10 Anggota')"
          >
        </div>
        <div class="group-portrait-caption">
          <span>${escapeHtml(groupPortrait.caption || "Sepuluh individu, satu perjalanan.")}</span>
          <span class="group-badge">10 Anggota Lengkap</span>
        </div>
      </div>
    `;
  }

  // 2. Member Profiles (Tepat 10 Anggota)
  const teamGrid = document.getElementById("team-grid");
  if (teamGrid && typeof teamMembers !== "undefined" && Array.isArray(teamMembers)) {
    teamGrid.innerHTML = teamMembers.map(member => {
      const photoUrl = resolveAssetUrl(member.photo, "image");
      return `
      <article class="member-card">
        <div class="member-photo-wrap" onclick="openSingleLightbox('${escapeQuotes(photoUrl)}', '${escapeQuotes(member.name)} — ${escapeQuotes(member.role)}')">
          <img 
            src="${photoUrl}" 
            alt="${member.alt || member.name}" 
            class="member-photo" 
            style="object-position: ${member.imagePosition || 'center 20%'};"
            loading="lazy" 
            decoding="async"
            onerror="handleImageError(this, '${escapeQuotes(member.name)}')"
          >
          <span class="member-number-badge">${escapeHtml(member.number || "00")}</span>
        </div>
        <div class="member-info">
          <span class="member-role">${escapeHtml(member.role || "Anggota")}</span>
          <h3 class="member-name">${escapeHtml(member.name)}</h3>
          ${member.quote ? `<p class="member-quote">"${escapeHtml(member.quote)}"</p>` : ""}
        </div>
      </article>
    `;
    }).join("");
  }
}

/**
 * Render Closing Chapter
 */
function renderClosing() {
  if (typeof closingConfig === "undefined") return;

  const badgeEl = document.getElementById("closing-badge");
  if (badgeEl) badgeEl.textContent = closingConfig.badge || "Epilogue";

  const titleEl = document.getElementById("closing-title");
  if (titleEl) titleEl.textContent = closingConfig.title || "Until the Next Journey";

  const quoteEl = document.getElementById("closing-quote");
  if (quoteEl && closingConfig.quote) quoteEl.textContent = `"${closingConfig.quote}"`;

  const paragraphsEl = document.getElementById("closing-paragraphs");
  if (paragraphsEl && Array.isArray(closingConfig.paragraphs)) {
    paragraphsEl.innerHTML = closingConfig.paragraphs.map(p => `
      <p class="closing-paragraph">${escapeHtml(p)}</p>
    `).join("");
  }

  // Mosaic Grid
  const mosaicGrid = document.getElementById("closing-mosaic-grid");
  if (mosaicGrid && Array.isArray(closingConfig.curatedGallery)) {
    mosaicGrid.innerHTML = closingConfig.curatedGallery.map(m => {
      const mosaicSrc = resolveAssetUrl(m.src, "image");
      return `
      <div class="mosaic-item" onclick="openSingleLightbox('${escapeQuotes(mosaicSrc)}', '${escapeQuotes(m.caption || m.alt)}')">
        <img 
          src="${mosaicSrc}" 
          alt="${m.alt}" 
          class="mosaic-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, 'Highlights')"
        >
      </div>
    `;
    }).join("");
  }

  // Credits Signature
  const creditsEl = document.getElementById("credits-signature");
  if (creditsEl && closingConfig.credits) {
    const cr = closingConfig.credits;
    creditsEl.innerHTML = `
      <div class="credits-title">Arsip Dokumentasi Resmi</div>
      <div class="credits-body">${escapeHtml(cr.groupName || "Kelompok KKL")}</div>
      <div class="credits-institution">${escapeHtml(cr.institution || "")} • ${escapeHtml(cr.year || "2026")}</div>
    `;
  }
}

/**
 * Render Footer
 */
function renderFooter() {
  if (typeof siteConfig === "undefined") return;

  const brandEl = document.getElementById("footer-brand-title");
  if (brandEl) brandEl.textContent = siteConfig.brandName || "KKL BALI";

  const subEl = document.getElementById("footer-brand-sub");
  if (subEl) subEl.textContent = `${siteConfig.groupName || "Kelompok 5"} — ${siteConfig.activityName || "KKL Bali"}`;

  const copyYear = document.getElementById("footer-copy-year");
  if (copyYear) copyYear.textContent = new Date().getFullYear();
}

/**
 * 2. NAVIGASI, SCROLLSPY & MOBILE MENU
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link, .mobile-nav-drawer .nav-link");
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");

  // Perhalus transisi navbar saat scroll menggunakan IntersectionObserver pada seksi hero
  const heroSection = document.getElementById("hero");
  if (header && heroSection && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Saat hero masih terlihat di bagian atas, navbar semitransparan
        // Begitu melewati batas hero, navbar berubah perlahan menjadi krem terang #FFFEFA
        if (entry.isIntersecting) {
          header.classList.remove("scrolled");
        } else {
          header.classList.add("scrolled");
        }
      });
    }, {
      root: null,
      threshold: 0,
      rootMargin: "-80px 0px 0px 0px"
    });
    navObserver.observe(heroSection);
  } else if (header) {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scrollPos > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on link click
    mobileDrawer.querySelectorAll(".nav-link, .nav-cta-btn").forEach(link => {
      link.addEventListener("click", () => closeMobileMenu());
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (mobileDrawer.classList.contains("open") && !mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileToggle.classList.add("open");
    mobileToggle.setAttribute("aria-expanded", "true");
    mobileDrawer.classList.add("open");
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove("open");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileDrawer.classList.remove("open");
  }

  // Auto-close mobile drawer on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992 && mobileDrawer.classList.contains("open")) {
      closeMobileMenu();
    }
  }, { passive: true });

  // Active Link Indicator (ScrollSpy)
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/**
 * 3. SISTEM LIGHTBOX FOTO
 */
function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!modal) return;

  // Tutup lewat tombol close
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // Navigasi prev/next
  if (prevBtn) prevBtn.addEventListener("click", prevLightboxImage);
  if (nextBtn) nextBtn.addEventListener("click", nextLightboxImage);

  // Tutup lewat klik backdrop luar
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("lightbox-main-stage") || e.target.classList.contains("lightbox-img-wrapper")) {
      closeLightbox();
    }
  });

  // Navigasi keyboard
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevLightboxImage();
    if (e.key === "ArrowRight") nextLightboxImage();
  });
}

/**
 * Buka Lightbox dengan indeks galeri
 */
window.openLightbox = function(index) {
  if (!lightboxGalleryItems.length) return;

  currentLightboxIndex = (index + lightboxGalleryItems.length) % lightboxGalleryItems.length;
  updateLightboxContent();

  const modal = document.getElementById("lightbox-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.classList.add("lightbox-open");
  }

  // Jeda galeri foto selama modal lightbox terbuka
  const viewport = document.getElementById("gallery-marquee-viewport");
  if (viewport) viewport.classList.add("is-paused");
};

/**
 * Buka Lightbox untuk foto tunggal (misal dari about atau destinations)
 */
window.openSingleLightbox = function(src, caption) {
  const resolvedSrc = resolveAssetUrl(src, "image");
  // Cek apakah item sudah ada di koleksi
  let existingIndex = lightboxGalleryItems.findIndex(i => i.src === resolvedSrc || i.src === src);
  if (existingIndex !== -1) {
    openLightbox(existingIndex);
  } else {
    // Tambahkan item sementara ke lightbox
    lightboxGalleryItems.push({
      src: resolvedSrc,
      caption: caption || "Dokumentasi KKL Bali",
      title: caption || "Dokumentasi",
      alt: caption || "Foto Bali"
    });
    openLightbox(lightboxGalleryItems.length - 1);
  }
};

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.classList.remove("lightbox-open");
  }

  // Lanjutkan gerakan galeri foto setelah lightbox ditutup
  const viewport = document.getElementById("gallery-marquee-viewport");
  if (viewport) viewport.classList.remove("is-paused");
}

function prevLightboxImage() {
  if (lightboxGalleryItems.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxGalleryItems.length) % lightboxGalleryItems.length;
  updateLightboxContent();
}

function nextLightboxImage() {
  if (lightboxGalleryItems.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxGalleryItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = lightboxGalleryItems[currentLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");
  const counterEl = document.getElementById("lightbox-counter");

  if (imgEl) {
    imgEl.style.opacity = "0.4";
    imgEl.style.transform = "scale(0.97)";
    imgEl.src = item.src;
    imgEl.alt = item.alt || "Dokumentasi Bali";

    imgEl.onload = () => {
      imgEl.style.opacity = "1";
      imgEl.style.transform = "scale(1)";
    };
    imgEl.onerror = () => {
      imgEl.style.opacity = "1";
      imgEl.style.transform = "scale(1)";
      handleImageError(imgEl, item.caption || "Dokumentasi");
    };
  }

  if (captionEl) {
    captionEl.textContent = item.caption || item.title || "";
  }

  if (counterEl) {
    counterEl.textContent = `${currentLightboxIndex + 1} dari ${lightboxGalleryItems.length}`;
  }
}

/**
 * 4. BACK TO TOP BUTTON
 */
function initBackToTop() {
  const btn = document.getElementById("back-to-top-btn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 5. SAFE IMAGE FALLBACK SYSTEM
 * Mencegah broken image icon jika pengguna belum memasukkan foto
 */
function setupImageFallbacks() {
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", function() {
      handleImageError(this, this.getAttribute("alt") || "Dokumentasi");
    });
  });
}

window.handleImageError = function(imgEl, title) {
  if (!imgEl || imgEl.dataset.fallbackApplied) return;
  imgEl.dataset.fallbackApplied = "true";

  // Ganti gambar dengan placeholder SVG data URL yang elegan bernuansa tropikal editorial
  const safeTitle = escapeXml(title || "Dokumentasi KKL Bali");
  const svgPlaceholder = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22450%22%20viewBox%3D%220%200%20600%20450%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22%23F7F4EC%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20fill%3D%22none%22%20stroke%3D%22%23606C38%22%20stroke-width%3D%221.5%22%20stroke-dasharray%3D%226%2C6%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22190%22%20r%3D%2245%22%20fill%3D%22%23606C38%22%20opacity%3D%220.15%22%2F%3E%3Cpath%20d%3D%22M280%20180h40v20h-40z%22%20fill%3D%22%23606C38%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22270%22%20font-family%3D%22serif%22%20font-size%3D%2218%22%20fill%3D%22%23283618%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%3E${safeTitle}%3C%2Ftext%3E%3Ctext%20x%3D%22300%22%20y%3D%22295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20fill%3D%22%2374746B%22%20text-anchor%3D%22middle%22%3EPlaceholder%20Dokumentasi%20KKL%3C%2Ftext%3E%3C%2Fsvg%3E`;

  imgEl.src = svgPlaceholder;
};

window.handleVideoError = function(videoEl) {
  if (!videoEl || videoEl.dataset.fallbackApplied) return;
  videoEl.dataset.fallbackApplied = "true";

  const parent = videoEl.parentElement;
  if (parent) {
    parent.innerHTML = `
      <div class="video-fallback-notice">
        <div class="video-fallback-icon">🎬</div>
        <div class="video-fallback-title">Video Belum Tersedia</div>
        <p class="video-fallback-text">Letakkan file MP4 Anda di folder <code>assets/videos/</code> atau tautkan embed video pada file <code>js/data.js</code>.</p>
      </div>
    `;
  }
};

/**
 * Utility String Helpers
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeQuotes(str) {
  if (!str) return "";
  return String(str).replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * ====================================================================
 * 6. SISTEM MUSIK LATAR (WONDERLAND INDONESIA)
 * ====================================================================
 */
let bgAudio = null;
let isMusicPlaying = false;
let wasMusicPlayingBeforeVideo = false;
let userManuallyPaused = false;
let bgAudioUsesDriveEmbed = false;
let bgAudioDriveEmbedUrl = null;
let bgAudioStreamAttempt = 0;

function initBackgroundAudio() {
  bgAudio = document.getElementById("bg-audio");
  const desktopBtn = document.getElementById("audio-toggle-btn");
  const mobileBtn = document.getElementById("mobile-audio-toggle-btn");
  const drivePanel = document.getElementById("bg-audio-drive-panel");
  const driveFrame = document.getElementById("bg-audio-drive-iframe");

  if (!bgAudio) return;

  let audioMeta = null;
  if (typeof siteConfig !== "undefined" && siteConfig.bgAudioSrc) {
    audioMeta = getAssetSource(siteConfig.bgAudioSrc);
    if (audioMeta.isDrive) {
      bgAudioDriveEmbedUrl = audioMeta.embedUrl;
      bgAudioStreamAttempt = 0;
      applyBackgroundAudioStreamUrl(audioMeta.audioStreamUrls[0]);
    } else {
      const audioUrl = audioMeta.mapped;
      applyBackgroundAudioStreamUrl(audioUrl);
    }
  }

  // Set volume awal yang nyaman (background ambience)
  bgAudio.volume = 0.45;

  function applyBackgroundAudioStreamUrl(url) {
    if (!url || !bgAudio) return;
    bgAudio.src = url;
    const sourceEl = bgAudio.querySelector("source");
    if (sourceEl) sourceEl.src = url;
  }

  function openDriveAudioPanel() {
    if (!drivePanel || !driveFrame || !bgAudioDriveEmbedUrl) return;
    drivePanel.hidden = false;
    if (!driveFrame.src || driveFrame.src === "about:blank") {
      driveFrame.src = bgAudioDriveEmbedUrl;
    }
    isMusicPlaying = true;
    updateAudioButtonState(true);
  }

  function closeDriveAudioPanel() {
    if (!drivePanel || !driveFrame) return;
    drivePanel.hidden = true;
    driveFrame.src = "about:blank";
    isMusicPlaying = false;
    updateAudioButtonState(false);
  }

  // Fungsi untuk memulai pemutaran musik
  function startMusic() {
    if (userManuallyPaused) return;

    if (bgAudioUsesDriveEmbed) {
      openDriveAudioPanel();
      return;
    }

    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isMusicPlaying = true;
          updateAudioButtonState(true);
          removeAutoPlayListeners();
        })
        .catch(() => {
          // Jika browser menuntut interaksi fisik terlebih dahulu,
          // tunggu sentuhan/klik/scroll pertama dari pengunjung
          isMusicPlaying = false;
          updateAudioButtonState(false);
        });
    }
  }

  // Fungsi toggle Play / Pause saat tombol ditekan
  function toggleMusic() {
    if (bgAudioUsesDriveEmbed) {
      const panelOpen = drivePanel && !drivePanel.hidden;
      if (panelOpen) {
        userManuallyPaused = true;
        closeDriveAudioPanel();
        removeAutoPlayListeners();
      } else {
        userManuallyPaused = false;
        openDriveAudioPanel();
        removeAutoPlayListeners();
      }
      return;
    }

    if (bgAudio.paused) {
      userManuallyPaused = false;
      startMusic();
    } else {
      bgAudio.pause();
      userManuallyPaused = true; // Tandai bahwa user sengaja mematikan musik
      isMusicPlaying = false;
      wasMusicPlayingBeforeVideo = false;
      updateAudioButtonState(false);
      removeAutoPlayListeners();
    }
  }

  // Listener untuk memulai audio pada interaksi pertama jika autoplay awal dibatasi browser
  const autoPlayEvents = ["click", "touchstart", "scroll", "keydown"];
  function onFirstUserInteraction() {
    if (!userManuallyPaused && bgAudio && bgAudio.paused) {
      startMusic();
    }
  }

  function addAutoPlayListeners() {
    autoPlayEvents.forEach(evt => {
      window.addEventListener(evt, onFirstUserInteraction, { once: true, passive: true });
    });
  }

  function removeAutoPlayListeners() {
    autoPlayEvents.forEach(evt => {
      window.removeEventListener(evt, onFirstUserInteraction);
    });
  }

  // Pasang listener klik pada tombol desktop dan mobile
  if (desktopBtn) desktopBtn.addEventListener("click", toggleMusic);
  if (mobileBtn) mobileBtn.addEventListener("click", toggleMusic);

  // Penanganan error jika file audio gagal dimuat
  bgAudio.addEventListener("error", (e) => {
    if (audioMeta && audioMeta.isDrive && audioMeta.audioStreamUrls.length) {
      bgAudioStreamAttempt += 1;
      if (bgAudioStreamAttempt < audioMeta.audioStreamUrls.length) {
        applyBackgroundAudioStreamUrl(audioMeta.audioStreamUrls[bgAudioStreamAttempt]);
        bgAudio.load();
        if (!userManuallyPaused) startMusic();
        return;
      }
      bgAudioUsesDriveEmbed = true;
      bgAudioDriveEmbedUrl = audioMeta.embedUrl;
      console.warn("Streaming audio Drive diblokir browser — memakai pemutar embed Drive.");
      if (!userManuallyPaused) openDriveAudioPanel();
      return;
    }
    console.warn("Gagal memuat file audio latar:", e);
    [desktopBtn, mobileBtn].forEach(btn => {
      if (!btn) return;
      btn.style.opacity = "0.5";
      btn.setAttribute("title", "File audio belum siap atau format tidak didukung.");
    });
  });

  const drivePanelClose = document.getElementById("bg-audio-drive-close");
  if (drivePanelClose) {
    drivePanelClose.addEventListener("click", () => {
      userManuallyPaused = true;
      closeDriveAudioPanel();
    });
  }

  // Sinkronisasi status audio saat diinterupsi atau dijeda
  bgAudio.addEventListener("pause", () => {
    if (!wasMusicPlayingBeforeVideo) {
      isMusicPlaying = false;
      updateAudioButtonState(false);
    }
  });

  bgAudio.addEventListener("play", () => {
    isMusicPlaying = true;
    updateAudioButtonState(true);
  });

  // Inisialisasi koordinasi video
  bindVideoAudioCoordination();

  // Jalankan musik langsung saat pertama kali membuka web!
  addAutoPlayListeners();
  startMusic();
}

/**
 * Koordinasi Video Galeri & Musik Latar
 * Menjeda musik latar saat video diputar, dan melanjutkannya saat video selesai/dijeda
 */
function bindVideoAudioCoordination() {
  const videoElements = document.querySelectorAll("video:not(#bg-audio)");
  videoElements.forEach(vid => {
    if (vid.dataset.audioBound) return;
    vid.dataset.audioBound = "true";

    vid.addEventListener("play", () => {
      if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
        wasMusicPlayingBeforeVideo = true;
        updateAudioButtonState(false);
      }
    });

    vid.addEventListener("pause", () => {
      if (wasMusicPlayingBeforeVideo && bgAudio && bgAudio.paused) {
        bgAudio.play().then(() => {
          wasMusicPlayingBeforeVideo = false;
          updateAudioButtonState(true);
        }).catch(err => console.warn("Lanjut musik dicegah:", err));
      }
    });

    vid.addEventListener("ended", () => {
      if (wasMusicPlayingBeforeVideo && bgAudio && bgAudio.paused) {
        bgAudio.play().then(() => {
          wasMusicPlayingBeforeVideo = false;
          updateAudioButtonState(true);
        }).catch(err => console.warn("Lanjut musik dicegah:", err));
      }
    });
  });
}

/**
 * Update Tampilan Tombol Audio (Desktop & Mobile)
 */
function updateAudioButtonState(playing) {
  const desktopBtn = document.getElementById("audio-toggle-btn");
  const mobileBtn = document.getElementById("mobile-audio-toggle-btn");

  [desktopBtn, mobileBtn].forEach(btn => {
    if (!btn) return;
    const playIcon = btn.querySelector(".audio-icon-play");
    const pauseIcon = btn.querySelector(".audio-icon-pause");
    const label = btn.querySelector(".audio-label");

    if (playing) {
      btn.classList.add("playing");
      btn.setAttribute("aria-label", "Jeda Musik Latar");
      btn.setAttribute("title", "Jeda Musik: Wonderland Indonesia");
      if (playIcon) playIcon.style.display = "none";
      if (pauseIcon) pauseIcon.style.display = "inline-block";
      if (label) label.textContent = "Musik Aktif";
    } else {
      btn.classList.remove("playing");
      btn.setAttribute("aria-label", "Putar Musik Latar");
      btn.setAttribute("title", "Putar Musik: Wonderland Indonesia");
      if (playIcon) playIcon.style.display = "inline-block";
      if (pauseIcon) pauseIcon.style.display = "none";
      if (label) label.textContent = "Musik";
    }
  });
}

/**
 * ====================================================================
 * 8. SISTEM ANIMASI SCROLL MULTI-EFEK (BERAGAM SESUAI TEMA & POSISI)
 * ====================================================================
 * Menerapkan animasi khusus dan beragam pada tiap elemen sesuai tema
 * dan posisinya di layar:
 * - Top Reading Progress Bar (Sunset Bali gradient)
 * - Section Header: Badge pop, title slide, subtitle fade terkoordinasi
 * - Chapter Divider: Garis ornamen memanjang dari tengah ke samping
 * - About Section: Text slide dari kiri, foto komposisi miring (tilt polaroid)
 * - Timeline: Card bergantian meluncur dari kiri dan kanan + badge pop
 * - Explore Marquee: Aperture focus & frame unblur
 * - Wisata (Destinasi): Efek asimetris (media & deskripsi saling mendekat sesuai orientasi)
 * - Industri: 3D perspective card lift bertingkat
 * - Momen: Scrapbook polaroid dengan rotasi organik bervariasi
 * - Video Sinematik: Zoom lensa bioskop ekspansif
 * - Profil 10 Anggota: Gelombang bertingkat (wave) dengan bukaan foto lingkaran
 * - Catatan Penutup: Warm golden glow & stempel tanda tangan resmi
 * - Menghormati prefers-reduced-motion dan hemat performa (60fps)
 */
function initScrollAnimations() {
  // 1. Indikator Progress Membaca di Bagian Paling Atas Layar
  initReadingProgressBar();

  // 2. Aksesibilitas: Hormati preferensi jika pengguna membatasi animasi gerak
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[class*='reveal-']").forEach(el => {
      el.classList.add("is-revealed");
    });
    return;
  }

  // 3. Konfigurasi Efek Animasi Spesifik Sesuai Tema & Posisi Objek

  // 3.1 Hero Elements (Entrance terkoordinasi)
  const heroEyebrow = document.getElementById("hero-eyebrow");
  if (heroEyebrow) heroEyebrow.classList.add("reveal-badge");

  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) heroTitle.classList.add("reveal-fade-up");

  const heroQuote = document.getElementById("hero-quote");
  if (heroQuote) heroQuote.classList.add("reveal-fade-up");

  const heroBadges = document.querySelectorAll(".hero-badge-item");
  heroBadges.forEach((b, idx) => {
    b.classList.add("reveal-stagger");
    b.style.setProperty("--stagger-index", idx);
  });

  const heroActions = document.querySelector(".hero-actions");
  if (heroActions) heroActions.classList.add("reveal-fade-up");

  // 3.2 Seluruh Section Header (Badge elastis, judul, dan subjudul terkoordinasi)
  document.querySelectorAll(".section-header").forEach(header => {
    header.classList.add("reveal-header");
  });

  // 3.3 Seluruh Chapter Divider (Garis ornamen merekah dari tengah)
  document.querySelectorAll(".chapter-divider").forEach(div => {
    div.classList.add("reveal-divider");
  });

  // 3.4 Bagian About (Tentang Perjalanan)
  const aboutText = document.querySelector(".about-text-content");
  if (aboutText) aboutText.classList.add("reveal-fade-left");

  const aboutStats = document.querySelectorAll("#about-stats-grid .stat-item");
  aboutStats.forEach((stat, idx) => {
    stat.classList.add("reveal-stagger");
    stat.style.setProperty("--stagger-index", idx);
  });

  const aboutPhoto1 = document.querySelector("#about-photo-1-container .about-photo-card");
  if (aboutPhoto1) aboutPhoto1.classList.add("reveal-photo-tilt-left");

  const aboutPhoto2 = document.querySelector("#about-photo-2-container .about-photo-card");
  if (aboutPhoto2) aboutPhoto2.classList.add("reveal-photo-tilt-right");

  // 3.5 Timeline Ringkasan Perjalanan (Kartu bergantian dari Kiri dan Kanan)
  const timelineCards = document.querySelectorAll("#journey-timeline .timeline-card");
  timelineCards.forEach((card, idx) => {
    if (idx % 2 === 0) {
      card.classList.add("reveal-timeline-card-left");
    } else {
      card.classList.add("reveal-timeline-card-right");
    }
  });

  // 3.6 Bagian Eksplorasi Galeri
  const filterTabs = document.querySelector(".filter-tabs-wrapper");
  if (filterTabs) filterTabs.classList.add("reveal-fade-up");

  const marqueeViewport = document.getElementById("gallery-marquee-viewport");
  if (marqueeViewport) marqueeViewport.classList.add("reveal-scale-focus");

  const marqueeHint = document.querySelector(".marquee-hint-bar");
  if (marqueeHint) marqueeHint.classList.add("reveal-fade-up");

  // 3.7 Destinasi Wisata (Asimetris: Media & Info bergerak saling mendekat sesuai posisinya)
  const destinationEntries = document.querySelectorAll("#destinations-list .destination-entry");
  destinationEntries.forEach(entry => {
    const isReversed = entry.classList.contains("reversed");
    const mediaCol = entry.querySelector(".destination-media-col");
    const infoCol = entry.querySelector(".destination-info-col");

    if (mediaCol) {
      mediaCol.classList.add(isReversed ? "reveal-fade-right" : "reveal-fade-left");
    }
    if (infoCol) {
      infoCol.classList.add(isReversed ? "reveal-fade-left" : "reveal-fade-right");
    }

    // Thumbnail strip foto pendukung
    entry.querySelectorAll(".dest-thumb-item").forEach((thumb, tIdx) => {
      thumb.classList.add("reveal-stagger");
      thumb.style.setProperty("--stagger-index", tIdx);
    });

    const expBox = entry.querySelector(".destination-experience-box");
    if (expBox) expBox.classList.add("reveal-fade-up");
  });

  // 3.8 Kunjungan Industri (Efek 3D Perspective Lift bertingkat)
  const industryCards = document.querySelectorAll("#industry-card-deck .industry-card");
  industryCards.forEach((card, idx) => {
    card.classList.add("reveal-card-3d");
    card.style.setProperty("--stagger-index", idx % 3);
  });

  // 3.9 Momen Kebersamaan (Scrapbook Polaroid dengan Sudut Miring Alami Beragam)
  const momentCards = document.querySelectorAll("#moments-masonry .moment-card");
  const polaroidTilts = ["-2.8deg", "2.2deg", "-1.8deg", "2.6deg", "-2.2deg", "1.6deg"];
  momentCards.forEach((card, idx) => {
    card.classList.add("reveal-polaroid");
    card.style.setProperty("--polaroid-rot", polaroidTilts[idx % polaroidTilts.length]);
    card.style.setProperty("--stagger-index", idx % 4);
  });

  // 3.10 Galeri Video Sinematik
  const cinemaPlayer = document.querySelector("#featured-video-player-container .cinema-player-card");
  if (cinemaPlayer) cinemaPlayer.classList.add("reveal-cinema-zoom");

  const secondaryVideos = document.querySelectorAll("#secondary-videos-grid .secondary-video-card");
  secondaryVideos.forEach((sec, idx) => {
    sec.classList.add("reveal-fade-up");
    sec.classList.add("reveal-stagger");
    sec.style.setProperty("--stagger-index", idx % 4);
  });

  // 3.11 Tim Kami (10 Anggota & Group Portrait)
  const groupPortrait = document.querySelector("#group-portrait-container .group-portrait-card");
  if (groupPortrait) groupPortrait.classList.add("reveal-scale-focus");

  const memberCards = document.querySelectorAll("#team-grid .member-card");
  memberCards.forEach((card, idx) => {
    card.classList.add("reveal-team-card");
    card.style.setProperty("--stagger-index", idx % 5);
  });

  // 3.12 Catatan Penutup (Closing Editorial, Mosaik Foto & Cap Resmi)
  const closingEditorial = document.querySelector(".closing-editorial-box");
  if (closingEditorial) closingEditorial.classList.add("reveal-warm-glow");

  const mosaicItems = document.querySelectorAll("#closing-mosaic-grid .mosaic-item");
  mosaicItems.forEach((item, idx) => {
    item.classList.add("reveal-mosaic-tile");
    item.style.setProperty("--stagger-index", idx % 6);
  });

  const creditsSignature = document.getElementById("credits-signature");
  if (creditsSignature) creditsSignature.classList.add("reveal-stamp");

  // 3.13 Footer
  const footerTop = document.querySelector(".footer-top-row");
  if (footerTop) footerTop.classList.add("reveal-fade-up");

  const footerBottom = document.querySelector(".footer-bottom-row");
  if (footerBottom) footerBottom.classList.add("reveal-fade-up");

  // 4. Inisialisasi IntersectionObserver untuk Memicu Animasi Saat Objek Memasuki Layar
  const allRevealElements = document.querySelectorAll(
    ".reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-focus, " +
    ".reveal-badge, .reveal-header, .reveal-divider, .reveal-photo-tilt-left, " +
    ".reveal-photo-tilt-right, .reveal-timeline-card-left, .reveal-timeline-card-right, " +
    ".reveal-card-3d, .reveal-polaroid, .reveal-cinema-zoom, .reveal-team-card, " +
    ".reveal-warm-glow, .reveal-mosaic-tile, .reveal-stamp, .reveal-stagger"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });

    allRevealElements.forEach(el => {
      // Jika elemen sudah berada dalam viewport saat halaman dimuat (seperti bagian hero),
      // aktifkan langsung dengan transisi halus
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        setTimeout(() => el.classList.add("is-revealed"), 50);
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback untuk browser lawas tanpa dukungan IntersectionObserver
    allRevealElements.forEach(el => el.classList.add("is-revealed"));
  }
}

/**
 * Indikator Progress Scroll Membaca di Header Paling Atas
 */
function initReadingProgressBar() {
  const progressBar = document.getElementById("scroll-progress-bar");
  if (!progressBar) return;

  let ticking = false;

  function updateProgress() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = Math.min(Math.max(scrolled, 0), 100) + "%";
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
}

