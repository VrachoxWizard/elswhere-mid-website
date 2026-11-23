/**
 * Elsewhere — A Different Kind of Getaway
 * Interactive Core Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Data: Curated Destinations ---
  const destinations = [
    {
      country: "SWITZERLAND",
      coords: "45°55' N · 09°15' E",
      collection1: "THE ALPINE",
      collection2: "COLLECTION",
      counter: "01 / 04",
      eyebrow: "A DIFFERENT KIND OF GETAWAY",
      title1: "Get Lost.",
      title2: "Feel Found.",
      subtitle: "For the places you've never seen, the moments <span class=\"hide-mobile-br\"><br></span>you've never felt, and the stories you'll never forget."
    },
    {
      country: "NORWAY",
      coords: "61°12' N · 07°04' E",
      collection1: "THE SOGNEFJORD",
      collection2: "COLLECTION",
      counter: "02 / 04",
      eyebrow: "WHERE DEEP WATERS MEET SILENT CRAGS",
      title1: "Still Waters.",
      title2: "Endless Light.",
      subtitle: "Carved by millennia of glacial ice, where midnight sun <span class=\"hide-mobile-br\"><br></span>watches over secluded fjord sanctuaries."
    },
    {
      country: "HOKKAIDO",
      coords: "43°34' N · 142°51' E",
      collection1: "THE VOLCANIC",
      collection2: "COLLECTION",
      counter: "03 / 04",
      eyebrow: "CEDAR FORESTS & THERMAL SPRINGS",
      title1: "Soft Snow.",
      title2: "Ancient Warmth.",
      subtitle: "Unbroken powder snowfields and natural geothermal onsens <span class=\"hide-mobile-br\"><br></span>nestled in the silent northern wilderness."
    },
    {
      country: "ITALY",
      coords: "46°30' N · 12°00' E",
      collection1: "THE DOLOMITI",
      collection2: "COLLECTION",
      counter: "04 / 04",
      eyebrow: "PINK LIMESTONE TOWERS & HIGH PASTURES",
      title1: "Pale Peaks.",
      title2: "Golden Glow.",
      subtitle: "Dramatic limestone pinnacles catching the evening enrosadira light <span class=\"hide-mobile-br\"><br></span>high above timeless high meadows."
    }
  ];

  let currentSlide = 0;

  // --- DOM Elements ---
  const hudCountry = document.getElementById('hudCountry');
  const hudCoords = document.getElementById('hudCoords');
  const hudCollLine1 = document.getElementById('hudCollLine1');
  const hudCollLine2 = document.getElementById('hudCollLine2');
  const slideCounter = document.getElementById('slideCounter');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');

  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');

  const btnToggleMenu = document.getElementById('btnToggleMenu');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const navDrawer = document.getElementById('navDrawer');

  const btnPlanEscape = document.getElementById('btnPlanEscape');
  const escapeModal = document.getElementById('escapeModal');
  const btnCloseModal = document.getElementById('btnCloseModal');

  const btnViewMockup = document.getElementById('btnViewMockup');
  const btnViewFullscreen = document.getElementById('btnViewFullscreen');

  // --- Carousel Slide Update ---
  function updateSlide(index, animate = true) {
    if (!hudCountry || !heroTitle) return;
    currentSlide = (index + destinations.length) % destinations.length;
    const dest = destinations[currentSlide];

    if (animate) {
      hudCountry.style.opacity = '0';
      hudCoords.style.opacity = '0';
      slideCounter.style.opacity = '0';

      setTimeout(() => {
        if (!hudCountry) return;
        hudCountry.textContent = dest.country;
        hudCoords.textContent = dest.coords;
        hudCollLine1.textContent = dest.collection1;
        hudCollLine2.textContent = dest.collection2;
        slideCounter.textContent = dest.counter;

        heroEyebrow.textContent = dest.eyebrow;
        heroTitle.innerHTML = `<span class="title-line">${dest.title1}</span><span class="title-line">${dest.title2}</span>`;
        heroSubtitle.innerHTML = dest.subtitle;

        hudCountry.style.opacity = '1';
        hudCoords.style.opacity = '1';
        slideCounter.style.opacity = '1';
      }, 150);
    } else {
      hudCountry.textContent = dest.country;
      hudCoords.textContent = dest.coords;
      hudCollLine1.textContent = dest.collection1;
      hudCollLine2.textContent = dest.collection2;
      slideCounter.textContent = dest.counter;
      heroEyebrow.textContent = dest.eyebrow;
      heroTitle.innerHTML = `<span class="title-line">${dest.title1}</span><span class="title-line">${dest.title2}</span>`;
      heroSubtitle.innerHTML = dest.subtitle;
    }
  }

  if (prevSlideBtn && nextSlideBtn) {
    prevSlideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateSlide(currentSlide - 1);
    });

    nextSlideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateSlide(currentSlide + 1);
    });
  }

  // --- Navigation Drawer ---
  function openDrawer() {
    if (!navDrawer) return;
    navDrawer.classList.add('open');
    navDrawer.setAttribute('aria-hidden', 'false');
    btnToggleMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!navDrawer) return;
    navDrawer.classList.remove('open');
    navDrawer.setAttribute('aria-hidden', 'true');
    btnToggleMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (btnToggleMenu) btnToggleMenu.addEventListener('click', openDrawer);
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      if (escapeModal && escapeModal.open) escapeModal.close();
    }
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (navDrawer && navDrawer.classList.contains('open')) {
      if (!navDrawer.contains(e.target) && !btnToggleMenu.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // --- Escape Booking Modal ---
  if (btnPlanEscape && escapeModal) {
    btnPlanEscape.addEventListener('click', () => {
      escapeModal.showModal();
    });
  }

  if (btnCloseModal && escapeModal) {
    btnCloseModal.addEventListener('click', () => {
      escapeModal.close();
    });
  }

  if (escapeModal) {
    escapeModal.addEventListener('click', (e) => {
      // Backdrop click
      const rect = escapeModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        escapeModal.close();
      }
    });
  }

  // --- View Mode Switcher ---
  function setViewMode(mode) {
    if (!btnViewMockup || !btnViewFullscreen) return;
    if (mode === 'fullscreen') {
      document.body.classList.remove('mode-mockup');
      document.body.classList.add('mode-fullscreen');
      btnViewFullscreen.classList.add('active');
      btnViewMockup.classList.remove('active');
    } else {
      document.body.classList.remove('mode-fullscreen');
      document.body.classList.add('mode-mockup');
      btnViewMockup.classList.add('active');
      btnViewFullscreen.classList.remove('active');
    }
  }

  if (btnViewMockup && btnViewFullscreen) {
    btnViewMockup.addEventListener('click', () => setViewMode('mockup'));
    btnViewFullscreen.addEventListener('click', () => setViewMode('fullscreen'));
  }

  // Keyboard shortcut toggle 'm' or 'f'
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'f' || e.key === 'F') {
      setViewMode('fullscreen');
    } else if (e.key === 'm' || e.key === 'M') {
      setViewMode('mockup');
    }
  });

  // URL param detection (?view=mockup or default fullscreen)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === 'mockup') {
    setViewMode('mockup');
  } else if (btnViewFullscreen) {
    setViewMode('fullscreen');
  }

  // --- Dynamic Category & Region Filter Logic (Inner Pages) ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.cards-grid article');
  const elementBands = document.querySelectorAll('.element-bands-stack .element-band');

  function applyFilter(filterVal) {
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterVal);
    });

    // Filter standard cards (places, journeys, journal)
    cards.forEach(card => {
      const region = card.getAttribute('data-region');
      const category = card.getAttribute('data-category');
      const matches = filterVal === 'all' || region === filterVal || category === filterVal;
      card.style.display = matches ? 'flex' : 'none';
    });

    // Filter elemental bands on experiences.html
    if (elementBands.length > 0) {
      elementBands.forEach(band => {
        const bandElement = band.getAttribute('data-element');
        const matches = filterVal === 'all' || bandElement === filterVal;
        band.style.display = matches ? 'grid' : 'none';
      });
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-filter');
      applyFilter(filterVal);
    });
  });

  const filterParam = urlParams.get('filter');
  if (filterParam) {
    applyFilter(filterParam);
  }

  // --- Journeys: Interactive Expedition Route Dossier Switcher ---
  const expeditionTabs = document.querySelectorAll('.expedition-tab');
  const dossierCode = document.getElementById('dossierCode');
  const dossierTitle = document.getElementById('dossierTitle');
  const dossierLead = document.getElementById('dossierLead');
  const metricDuration = document.getElementById('metricDuration');
  const metricAscent = document.getElementById('metricAscent');
  const metricTransit = document.getElementById('metricTransit');
  const metricGroup = document.getElementById('metricGroup');
  const timelineList = document.getElementById('timelineList');

  const expeditionData = {
    'haute-route': {
      code: 'DOSSIER REF: EXP-HAUTE-01',
      title: 'The Haute Route: Chamonix to Zermatt',
      lead: 'The classic high-altitude ski mountaineering traverse linking the two capitals of European alpinism across glaciated passes, wind-carved cols, and high granite refuges.',
      duration: '8 Days / 7 Nights',
      ascent: '+6,450 m',
      transit: 'Heli-Drop & Skins',
      group: 'Private (1–4)',
      stages: [
        { day: '01', title: 'Argentière to Trient Refuge', detail: 'Ascent over Col du Chardonnet (3,323m) into Swiss Valais' },
        { day: '02', title: 'Trient to Prafleuri High Hut', detail: 'Crossing the Grand Désert Glacier under the shadows of Mont Fort' },
        { day: '03', title: 'Prafleuri to Refuge des Dix', detail: 'Traverse of Pas du Chat and Lac des Dix moraine' },
        { day: '04', title: 'Refuge des Dix to Vignettes', detail: 'Ascent of Pigne d\'Arolla (3,790m summit col)' },
        { day: '05', title: 'Vignettes to Zermatt Valley', detail: 'Glacier descent beneath the north face of the Matterhorn' }
      ]
    },
    'bernina-traverse': {
      code: 'DOSSIER REF: EXP-BERNINA-02',
      title: 'Bernina Glacier Traverse: Pontresina to Poschiavo',
      lead: 'An austere crossing of the Eastern Alps highest glaciated massif, navigating the Biancograt razor ridge and staying in solar-powered granite observatories.',
      duration: '6 Days / 5 Nights',
      ascent: '+4,820 m',
      transit: 'Glacier Flight & Skins',
      group: 'Private (1–2)',
      stages: [
        { day: '01', title: 'Pontresina to Tschierva Hut', detail: 'Skinning through Roseg Valley to the foot of Biancograt' },
        { day: '02', title: 'Piz Morteratsch Col', detail: 'Crampon traverse across Pers Glacier moraines' },
        { day: '03', title: 'Diavolezza High Camp', detail: 'Stargazing at 2,978m with 360° views of Piz Palü' },
        { day: '04', title: 'Piz Palü Ridge Traverse', detail: 'Navigating the eastern knife-edge snow arête' },
        { day: '05', title: 'Descent to Val Poschiavo', detail: 'Final run through ancient larch forests to Poschiavo' }
      ]
    },
    'valais-passes': {
      code: 'DOSSIER REF: EXP-VALAIS-03',
      title: 'Valais High Passes & Glacial Tarns',
      lead: 'A silent, untracked journey connecting isolated stone shepherd hamlets, frozen high-alpine tarns, and forgotten border passes.',
      duration: '7 Days / 6 Nights',
      ascent: '+4,280 m',
      transit: 'Ski-Plane & Skins',
      group: 'Private (1–4)',
      stages: [
        { day: '01', title: 'Verbier to Louvie Sanctum', detail: 'Ascent above the cloud line to frozen Lac de Louvie' },
        { day: '02', title: 'Grand Désert Granite Plateau', detail: 'Navigating the wind-sculpted granite slab wilderness' },
        { day: '03', title: 'Col de Chassoure Pass', detail: 'Sunset camp overlooking the Grand Combin massif' },
        { day: '04', title: 'Arolla Valley Grange', detail: 'Overnight in restored 18th-century stone grange' },
        { day: '05', title: 'Evolène Finish & Feast', detail: 'Traditional timber village descent and alpine tasting' }
      ]
    },
    'engadin-circuit': {
      code: 'DOSSIER REF: EXP-ENGADIN-04',
      title: 'Engadin Solitary Circuit & High Valleys',
      lead: 'Circumambulating the high lakes of the Upper Engadin on skins, staying in architectural refuges made of local pine and quarried gneiss.',
      duration: '5 Days / 4 Nights',
      ascent: '+3,180 m',
      transit: 'Private Sled & Skins',
      group: 'Private (1–6)',
      stages: [
        { day: '01', title: 'Sils Maria to Fex Valley', detail: 'Skinning into the car-free valley of frozen silence' },
        { day: '02', title: 'Muottas Muragl Crest', detail: 'Panoramic twilight view across all four Engadin lakes' },
        { day: '03', title: 'Morteratsch Glacier Foot', detail: 'Exploration of blue ice caves and glacial crevasses' },
        { day: '04', title: 'Maloja Pass Watershed', detail: 'Tracking the continental watershed divide' },
        { day: '05', title: 'St. Moritz Sanctuary Return', detail: 'Private cedar thermal bath and culinary tasting' }
      ]
    }
  };

  if (expeditionTabs.length > 0 && dossierTitle) {
    expeditionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        expeditionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const routeKey = tab.getAttribute('data-route') || 'haute-route';
        const data = expeditionData[routeKey] || expeditionData['haute-route'];

        if (dossierCode) dossierCode.textContent = data.code;
        if (dossierTitle) dossierTitle.textContent = data.title;
        if (dossierLead) dossierLead.textContent = data.lead;
        if (metricDuration) metricDuration.textContent = data.duration;
        if (metricAscent) metricAscent.textContent = data.ascent;
        if (metricTransit) metricTransit.textContent = data.transit;
        if (metricGroup) metricGroup.textContent = data.group;

        if (timelineList && data.stages) {
          timelineList.innerHTML = data.stages.map(stage => `
            <div class="timeline-step">
              <span class="step-num">${stage.day}</span>
              <div class="step-content">
                <h3 class="step-title">${stage.title}</h3>
                <p class="step-desc">${stage.detail}</p>
              </div>
            </div>
          `).join('');
        }
      });
    });
  }

  // --- Experiences: Interactive Ritual Selector & Floating Bar ---
  const ritualButtons = document.querySelectorAll('.btn-select-ritual');
  const ritualBar = document.getElementById('ritualBar');
  const ritualCount = document.getElementById('ritualCount');
  let selectedRitualsCount = 0;

  if (ritualButtons.length > 0) {
    ritualButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isSelected = btn.classList.toggle('selected');
        const textSpan = btn.querySelector('.ritual-select-text');

        if (isSelected) {
          selectedRitualsCount++;
          if (textSpan) textSpan.textContent = 'Ritual Selected';
          btn.style.background = 'var(--color-cream)';
          btn.style.color = 'var(--color-navy-dark)';
        } else {
          selectedRitualsCount = Math.max(0, selectedRitualsCount - 1);
          if (textSpan) textSpan.textContent = 'Add to Escape Rituals';
          btn.style.background = '';
          btn.style.color = '';
        }

        if (ritualCount) {
          ritualCount.textContent = `${selectedRitualsCount} / 4`;
        }

        if (ritualBar) {
          if (selectedRitualsCount > 0) {
            ritualBar.classList.add('visible');
          } else {
            ritualBar.classList.remove('visible');
          }
        }
      });
    });
  }

  // Initial state: slide 0
  updateSlide(0, false);
});
