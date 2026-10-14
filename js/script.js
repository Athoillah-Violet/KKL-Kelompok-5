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
  initLightbox();
  initExploreFilter();
  initBackToTop();
  setupImageFallbacks();
});

/**
 * 1. INJEKSI KONTEN DINAMIS DARI DATA.JS
 */
function initSiteContent() {
  if (typeof siteConfig === "undefined") {
    console.warn("data.js belum dimuat atau format tidak sesuai.");
    return;
  }

  // 1.1 Meta Tag & Header Brand
  document.title = siteConfig.siteTitle || "BALI JOURNAL — KKL Bali";
  
  const brandTitleEl = document.getElementById("brand-title");
  if (brandTitleEl) brandTitleEl.textContent = siteConfig.brandName || "BALI JOURNAL";

  const brandTaglineEl = document.getElementById("brand-tagline");
  if (brandTaglineEl) brandTaglineEl.textContent = siteConfig.activityName || "KKL DOKUMENTASI";

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
    if (heroConfig.mediaType === "video" && heroConfig.videoSrc) {
      mediaContainer.innerHTML = `
        <video 
          class="hero-media-video" 
          autoplay 
          muted 
          loop 
          playsinline 
          poster="${heroConfig.videoPoster || heroConfig.imageSrc}"
        >
          <source src="${heroConfig.videoSrc}" type="video/mp4">
          <img src="${heroConfig.imageSrc}" alt="${heroConfig.imageAlt}" class="hero-media-image">
        </video>
      `;
    } else {
      mediaContainer.innerHTML = `
        <img 
          src="${heroConfig.imageSrc}" 
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
  if (titleLine1El) titleLine1El.textContent = heroConfig.titleLine1 || "BALI,";

  const titleLine2El = document.getElementById("hero-title-line2");
  if (titleLine2El) titleLine2El.textContent = heroConfig.titleLine2 || "BEYOND THE JOURNEY";

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
    p1Container.innerHTML = `
      <div class="about-photo-card card-primary" onclick="openSingleLightbox('${ab.supportingPhoto1.src}', '${escapeQuotes(ab.supportingPhoto1.caption)}')">
        <img 
          src="${ab.supportingPhoto1.src}" 
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
    p2Container.innerHTML = `
      <div class="about-photo-card card-secondary" onclick="openSingleLightbox('${ab.supportingPhoto2.src}', '${escapeQuotes(ab.supportingPhoto2.caption)}')">
        <img 
          src="${ab.supportingPhoto2.src}" 
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

  container.innerHTML = journeyOverview.map(item => `
    <div class="timeline-card">
      <div class="timeline-card-media" onclick="openSingleLightbox('${item.photo}', '${escapeQuotes(item.title)}')">
        <img 
          src="${item.photo}" 
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
  `).join("");
}

/**
 * Global Lightbox Data Store
 */
let lightboxGalleryItems = [];
let currentLightboxIndex = 0;

/**
 * Render Explore Section (Single Source of Truth)
 * Menggabungkan data dari destinations, industrialVisits, dan moments secara otomatis!
 */
function renderExploreGallery() {
  const galleryGrid = document.getElementById("explore-gallery-grid");
  if (!galleryGrid) return;

  lightboxGalleryItems = [];
  const compiledItems = [];

  // 1. Dari Destinations
  if (typeof destinations !== "undefined" && Array.isArray(destinations)) {
    destinations.forEach(dest => {
      compiledItems.push({
        id: dest.id,
        category: "wisata",
        categoryLabel: "Wisata",
        title: dest.title,
        location: dest.location,
        desc: dest.description,
        src: dest.cover,
        alt: dest.coverAlt || dest.title,
        caption: `${dest.title} — ${dest.location}`
      });
    });
  }

  // 2. Dari Industrial Visits
  if (typeof industrialVisits !== "undefined" && Array.isArray(industrialVisits)) {
    industrialVisits.forEach(ind => {
      compiledItems.push({
        id: ind.id,
        category: "industri",
        categoryLabel: "Kunjungan Industri",
        title: ind.companyName,
        location: ind.location,
        desc: ind.tagline || ind.description,
        src: ind.cover,
        alt: ind.coverAlt || ind.companyName,
        caption: `${ind.companyName} — ${ind.sector}`
      });
    });
  }

  // 3. Dari Moments
  if (typeof moments !== "undefined" && Array.isArray(moments)) {
    moments.forEach(mom => {
      compiledItems.push({
        id: mom.id,
        category: "moments",
        categoryLabel: "Moments",
        title: mom.title,
        location: mom.location,
        desc: mom.caption,
        src: mom.cover,
        alt: mom.coverAlt || mom.title,
        caption: `${mom.title} (${mom.location})`
      });
    });
  }

  // Simpan ke lightbox store
  lightboxGalleryItems = compiledItems;

  // Render cards
  galleryGrid.innerHTML = compiledItems.map((item, index) => `
    <div class="gallery-item" data-category="${item.category}" data-index="${index}" onclick="openLightbox(${index})">
      <div class="gallery-item-media">
        <img 
          src="${item.src}" 
          alt="${item.alt}" 
          class="gallery-item-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, '${escapeQuotes(item.title)}')"
        >
        <span class="gallery-badge ${item.category}">${escapeHtml(item.categoryLabel)}</span>
        <div class="gallery-zoom-overlay">
          <div class="zoom-icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
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
  `).join("");

  // Update counter badges di filter buttons
  updateFilterCounters(compiledItems);
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
 * Filter Kategori Galeri Explore
 */
function initExploreFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");
      const items = document.querySelectorAll(".gallery-item");

      items.forEach(item => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
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

    return `
      <article class="destination-entry ${isReversed}">
        <div class="destination-media-col">
          <div class="destination-main-photo-wrap" onclick="openSingleLightbox('${dest.cover}', '${escapeQuotes(dest.title)} — ${escapeQuotes(dest.location)}')">
            <img 
              src="${dest.cover}" 
              alt="${dest.coverAlt || dest.title}" 
              class="destination-main-photo" 
              loading="lazy" 
              decoding="async"
              onerror="handleImageError(this, '${escapeQuotes(dest.title)}')"
            >
          </div>

          ${extraPhotos.length > 1 ? `
            <div class="destination-thumbs-row">
              ${extraPhotos.map(p => `
                <div class="dest-thumb-item" onclick="openSingleLightbox('${p.src}', '${escapeQuotes(p.caption || p.alt)}')">
                  <img 
                    src="${p.src}" 
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
              `).join("")}
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

  container.innerHTML = industrialVisits.map(ind => `
    <article class="industry-card">
      <div class="industry-card-media" onclick="openSingleLightbox('${ind.cover}', '${escapeQuotes(ind.companyName)}')">
        <img 
          src="${ind.cover}" 
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
  `).join("");
}

/**
 * Render Moments & Memories
 */
function renderMoments() {
  if (typeof moments === "undefined" || !Array.isArray(moments)) return;

  const container = document.getElementById("moments-masonry");
  if (!container) return;

  container.innerHTML = moments.map(mom => `
    <div class="moment-card" onclick="openSingleLightbox('${mom.cover}', '${escapeQuotes(mom.caption || mom.title)}')">
      <div class="moment-media-wrap">
        <img 
          src="${mom.cover}" 
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
  `).join("");
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
    let videoHtml = "";

    if (featured.type === "embed" && featured.embedUrl) {
      videoHtml = `
        <iframe 
          class="video-embed-iframe" 
          src="${featured.embedUrl}" 
          title="${escapeHtml(featured.title)}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      `;
    } else if (featured.src) {
      videoHtml = `
        <video 
          class="video-element" 
          controls 
          preload="metadata" 
          poster="${featured.poster || ''}"
          onerror="handleVideoError(this)"
        >
          <source src="${featured.src}" type="video/mp4">
          Browser Anda tidak mendukung pemutaran video HTML5.
        </video>
      `;
    } else {
      videoHtml = `
        <div class="video-fallback-notice">
          <div class="video-fallback-icon">🎬</div>
          <div class="video-fallback-title">Video Belum Tersedia</div>
          <p class="video-fallback-text">Tambahkan file video lokal ke <code>assets/videos/</code> atau atur link embed YouTube di <code>js/data.js</code>.</p>
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
              src="${sec.poster || 'assets/videos/video-poster.jpg'}" 
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

  if (targetVideo.type === "embed" && targetVideo.embedUrl) {
    playerWrapper.innerHTML = `
      <iframe 
        class="video-embed-iframe" 
        src="${targetVideo.embedUrl}?autoplay=1" 
        title="${escapeHtml(targetVideo.title)}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    `;
  } else if (targetVideo.src) {
    playerWrapper.innerHTML = `
      <video 
        class="video-element" 
        controls 
        autoplay 
        poster="${targetVideo.poster || ''}"
        onerror="handleVideoError(this)"
      >
        <source src="${targetVideo.src}" type="video/mp4">
      </video>
    `;
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
    groupWrap.innerHTML = `
      <div class="group-portrait-card">
        <div class="group-portrait-wrap" onclick="openSingleLightbox('${groupPortrait.src}', '${escapeQuotes(groupPortrait.caption || 'Foto Kelompok KKL Bali')}')">
          <img 
            src="${groupPortrait.src}" 
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
    teamGrid.innerHTML = teamMembers.map(member => `
      <article class="member-card">
        <div class="member-photo-wrap" onclick="openSingleLightbox('${member.photo}', '${escapeQuotes(member.name)} — ${escapeQuotes(member.role)}')">
          <img 
            src="${member.photo}" 
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
    `).join("");
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
    mosaicGrid.innerHTML = closingConfig.curatedGallery.map(m => `
      <div class="mosaic-item" onclick="openSingleLightbox('${m.src}', '${escapeQuotes(m.caption || m.alt)}')">
        <img 
          src="${m.src}" 
          alt="${m.alt}" 
          class="mosaic-img" 
          loading="lazy" 
          decoding="async"
          onerror="handleImageError(this, 'Highlights')"
        >
      </div>
    `).join("");
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
  if (brandEl) brandEl.textContent = siteConfig.brandName || "BALI JOURNAL";

  const subEl = document.getElementById("footer-brand-sub");
  if (subEl) subEl.textContent = `${siteConfig.activityName || "KKL Bali"} — ${siteConfig.institutionName || ""}`;

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

  // Sticky header background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

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
};

/**
 * Buka Lightbox untuk foto tunggal (misal dari about atau destinations)
 */
window.openSingleLightbox = function(src, caption) {
  // Cek apakah item sudah ada di koleksi
  let existingIndex = lightboxGalleryItems.findIndex(i => i.src === src);
  if (existingIndex !== -1) {
    openLightbox(existingIndex);
  } else {
    // Tambahkan item sementara ke lightbox
    lightboxGalleryItems.push({
      src: src,
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
    counterEl.textContent = `${currentLightboxIndex + 1} / ${lightboxGalleryItems.length}`;
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
