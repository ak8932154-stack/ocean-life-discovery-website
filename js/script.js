/**
 * ==============================================================================
 * Ocean Life Discovery Website - Master Client-Side JavaScript
 * Academic Lab Project Submission
 * 
 * Interactive Features Implemented:
 * 1. Responsive Navigation Bar Toggle (Mobile / Tablet)
 * 2. Dynamic Filter & Live Search Catalog for Marine Species
 * 3. XML Marine Life Database Fetcher, DOMParser & Dynamic Table Generator
 * 4. Interactive Bathymetric Depth & Hydrostatic Pressure Simulator
 * 5. Interactive Underwater Optical Lightbox Modal with Keyboard Navigation
 * 6. Interactive Ocean Literacy Quiz with Real-time Scoring & DOM Feedback
 * 7. Comprehensive Form Validation with Regex, Error DOM States & Success Modal
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initSpeciesCatalog();
  initXmlDatabaseViewer();
  initDepthSimulator();
  initGalleryLightbox();
  initOceanQuiz();
  initConservationFormValidation();
});

/* ------------------------------------------------------------------------------
   1. Responsive Navigation Bar Handler
   ------------------------------------------------------------------------------ */
function initMobileNavigation() {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
      const isExpanded = mainNav.classList.contains('show');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close navigation when clicking outside on mobile
    document.addEventListener('click', (event) => {
      if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
        mainNav.classList.remove('show');
      }
    });
  }
}

/* ------------------------------------------------------------------------------
   2. Marine Species Catalog: Live Search & Category Filtering (DOM Manipulation)
   ------------------------------------------------------------------------------ */
function initSpeciesCatalog() {
  const searchInput = document.getElementById('speciesSearchInput');
  const filterBtns = document.querySelectorAll('.filter-btn[data-category]');
  const speciesCards = document.querySelectorAll('.species-card');
  const countBadge = document.getElementById('speciesCountBadge');
  const speciesGrid = document.getElementById('speciesGrid');

  if (!speciesGrid || !searchInput) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function filterSpecies() {
    let visibleCount = 0;

    speciesCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardText = (card.getAttribute('data-name') || '' + ' ' + card.innerText).toLowerCase();

      const matchesCategory = (activeCategory === 'all' || cardCategory.toLowerCase() === activeCategory.toLowerCase());
      const matchesSearch = searchQuery === '' || cardText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = visibleCount;
    }

    // Dynamic Empty State Feedback
    let emptyMsg = document.getElementById('speciesEmptyMsg');
    if (visibleCount === 0) {
      if (!emptyMsg) {
        emptyMsg = document.createElement('div');
        emptyMsg.id = 'speciesEmptyMsg';
        emptyMsg.style.gridColumn = '1 / -1';
        emptyMsg.style.padding = '2.5rem';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.backgroundColor = 'white';
        emptyMsg.style.borderRadius = '8px';
        emptyMsg.style.border = '1px solid #cbd5e1';
        emptyMsg.innerHTML = '<h3 style="color:#061e38;">No matching species found</h3><p style="text-align:center;">Please adjust your search terms or select "All Taxa".</p>';
        speciesGrid.appendChild(emptyMsg);
      }
    } else if (emptyMsg) {
      emptyMsg.remove();
    }
  }

  // Live search input listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    filterSpecies();
  });

  // Category filter button listeners
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category') || 'all';
      filterSpecies();
    });
  });

  // Modal Specimen Detail Profile Click Handler
  const specimenButtons = document.querySelectorAll('.open-specimen-modal');
  const speciesModal = document.getElementById('speciesModalOverlay');
  const closeModalBtn = document.getElementById('closeSpeciesModalBtn');
  const modalTitle = document.getElementById('modalSpeciesTitle');
  const modalScientific = document.getElementById('modalSpeciesScientific');
  const modalDetails = document.getElementById('modalSpeciesDetails');

  if (speciesModal && closeModalBtn) {
    specimenButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.species-card');
        if (!card) return;

        const commonName = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Marine Specimen';
        const scientificName = card.querySelector('.species-scientific') ? card.querySelector('.species-scientific').textContent : '';
        const metaItems = card.querySelectorAll('.species-meta li');
        const descText = card.querySelector('p') ? card.querySelector('p').textContent : '';

        modalTitle.textContent = commonName;
        modalScientific.textContent = scientificName;

        let metaHtml = '<div style="background:#f1f5f9; padding:1.2rem; border-radius:6px; margin-bottom:1rem;"><ul style="list-style:none; padding:0;">';
        metaItems.forEach((li) => {
          metaHtml += `<li style="margin-bottom:0.4rem;">${li.innerHTML}</li>`;
        });
        metaHtml += '</ul></div>';

        modalDetails.innerHTML = metaHtml + `<h4>Ecological Description:</h4><p style="text-align:justify;">${descText}</p>`;
        speciesModal.classList.add('active');
      });
    });

    closeModalBtn.addEventListener('click', () => {
      speciesModal.classList.remove('active');
    });

    speciesModal.addEventListener('click', (e) => {
      if (e.target === speciesModal) {
        speciesModal.classList.remove('active');
      }
    });
  }
}

/* ------------------------------------------------------------------------------
   3. XML Marine Life Database Fetcher, DOMParser & Demonstration (Requirement 6)
   ------------------------------------------------------------------------------ */
function initXmlDatabaseViewer() {
  const btnParseXml = document.getElementById('btnParseXml');
  const btnToggleRawXml = document.getElementById('btnToggleRawXml');
  const rawXmlContainer = document.getElementById('rawXmlContainer');
  const xmlCodeDisplay = document.getElementById('xmlCodeDisplay');
  const parsedXmlOutput = document.getElementById('parsedXmlOutput');
  const xmlTableBody = document.getElementById('xmlTableBody');

  if (!btnParseXml) return;

  // Embedded well-formed XML backup to guarantee immediate display even when opened offline via file:// protocol
  const embeddedXmlString = `<?xml version="1.0" encoding="UTF-8"?>
<oceanLifeCatalog version="2.4" lastUpdated="2026-11-23">
  <metadata>
    <title>Global Ocean Life &amp; Marine Species Directory</title>
    <institution>Marine Biology Discovery Laboratory</institution>
    <totalRecords>10</totalRecords>
    <dataStandard>OBIS-Compliant Taxonomic Standard</dataStandard>
  </metadata>
  <speciesList>
    <species id="SP001">
      <commonName>Blue Whale</commonName>
      <scientificName>Balaenoptera musculus</scientificName>
      <taxonomy><class>Mammalia</class></taxonomy>
      <habitat>Open Pelagic Waters</habitat>
      <depthZone minMeters="0" maxMeters="500">0 - 500m</depthZone>
      <conservationStatus code="EN">Endangered</conservationStatus>
      <diet>Carnivore (Antarctic Krill)</diet>
    </species>
    <species id="SP002">
      <commonName>Green Sea Turtle</commonName>
      <scientificName>Chelonia mydas</scientificName>
      <taxonomy><class>Reptilia</class></taxonomy>
      <habitat>Tropical Coastal Reefs</habitat>
      <depthZone minMeters="0" maxMeters="110">0 - 110m</depthZone>
      <conservationStatus code="EN">Endangered</conservationStatus>
      <diet>Herbivore (Seagrasses &amp; Algae)</diet>
    </species>
    <species id="SP003">
      <commonName>Clown Anemonefish</commonName>
      <scientificName>Amphiprion ocellaris</scientificName>
      <taxonomy><class>Actinopterygii</class></taxonomy>
      <habitat>Tropical Indo-Pacific Reefs</habitat>
      <depthZone minMeters="1" maxMeters="15">1 - 15m</depthZone>
      <conservationStatus code="LC">Least Concern</conservationStatus>
      <diet>Omnivore (Plankton &amp; Algae)</diet>
    </species>
    <species id="SP004">
      <commonName>Giant Oceanic Manta Ray</commonName>
      <scientificName>Mobula birostris</scientificName>
      <taxonomy><class>Chondrichthyes</class></taxonomy>
      <habitat>Pelagic Oceans &amp; Seamounts</habitat>
      <depthZone minMeters="0" maxMeters="1000">0 - 1,000m</depthZone>
      <conservationStatus code="EN">Endangered</conservationStatus>
      <diet>Filter Feeder (Plankton &amp; Small Fish)</diet>
    </species>
    <species id="SP005">
      <commonName>Giant Pacific Octopus</commonName>
      <scientificName>Enteroctopus dofleini</scientificName>
      <taxonomy><class>Cephalopoda</class></taxonomy>
      <habitat>Benthic Kelp Forests</habitat>
      <depthZone minMeters="0" maxMeters="750">0 - 750m</depthZone>
      <conservationStatus code="LC">Least Concern</conservationStatus>
      <diet>Carnivore (Crabs &amp; Mollusks)</diet>
    </species>
    <species id="SP006">
      <commonName>Deep Sea Anglerfish</commonName>
      <scientificName>Melanocetus johnsonii</scientificName>
      <taxonomy><class>Actinopterygii</class></taxonomy>
      <habitat>Midnight Bathypelagic</habitat>
      <depthZone minMeters="1000" maxMeters="3000">1,000 - 3,000m</depthZone>
      <conservationStatus code="LC">Least Concern</conservationStatus>
      <diet>Deep Pelagic Piscivore</diet>
    </species>
    <species id="SP007">
      <commonName>Moon Jellyfish</commonName>
      <scientificName>Aurelia aurita</scientificName>
      <taxonomy><class>Scyphozoa</class></taxonomy>
      <habitat>Coastal Inshore Waters</habitat>
      <depthZone minMeters="0" maxMeters="200">0 - 200m</depthZone>
      <conservationStatus code="LC">Least Concern</conservationStatus>
      <diet>Carnivore (Planktonic Larvae)</diet>
    </species>
    <species id="SP008">
      <commonName>Great White Shark</commonName>
      <scientificName>Carcharodon carcharias</scientificName>
      <taxonomy><class>Chondrichthyes</class></taxonomy>
      <habitat>Temperate Coastal Shelves</habitat>
      <depthZone minMeters="0" maxMeters="1200">0 - 1,200m</depthZone>
      <conservationStatus code="VU">Vulnerable</conservationStatus>
      <diet>Apex Marine Mammals &amp; Fish</diet>
    </species>
    <species id="SP009">
      <commonName>Emperor Penguin</commonName>
      <scientificName>Aptenodytes forsteri</scientificName>
      <taxonomy><class>Aves</class></taxonomy>
      <habitat>Antarctic Pack Ice</habitat>
      <depthZone minMeters="0" maxMeters="535">0 - 535m</depthZone>
      <conservationStatus code="NT">Near Threatened</conservationStatus>
      <diet>Carnivore (Krill, Squid, Fish)</diet>
    </species>
    <species id="SP010">
      <commonName>Staghorn Coral</commonName>
      <scientificName>Acropora cervicornis</scientificName>
      <taxonomy><class>Anthozoa</class></taxonomy>
      <habitat>Tropical Shallow Reefs</habitat>
      <depthZone minMeters="0" maxMeters="30">0 - 30m</depthZone>
      <conservationStatus code="CR">Critically Endangered</conservationStatus>
      <diet>Photosynthetic Symbiosis</diet>
    </species>
  </speciesList>
</oceanLifeCatalog>`;

  let cachedXmlString = '';

  // Asynchronously fetch external XML or fallback smoothly
  async function loadXmlSource() {
    if (cachedXmlString) return cachedXmlString;
    try {
      const response = await fetch('marine_data.xml');
      if (!response.ok) throw new Error('Network error');
      cachedXmlString = await response.text();
    } catch (err) {
      console.warn('Note: fetch() from local file protocol resolved to embedded XML dataset.');
      cachedXmlString = embeddedXmlString;
    }
    return cachedXmlString;
  }

  // Toggle Raw XML Viewer Button
  if (btnToggleRawXml && rawXmlContainer) {
    btnToggleRawXml.addEventListener('click', async () => {
      const isVisible = rawXmlContainer.style.display === 'block';
      if (isVisible) {
        rawXmlContainer.style.display = 'none';
        btnToggleRawXml.innerHTML = '<span>📄</span> Show Raw XML Source';
      } else {
        const xmlText = await loadXmlSource();
        xmlCodeDisplay.textContent = xmlText;
        rawXmlContainer.style.display = 'block';
        btnToggleRawXml.innerHTML = '<span>📄</span> Hide Raw XML Source';
      }
    });
  }

  // Parse XML via DOMParser and Inject into DOM Table
  btnParseXml.addEventListener('click', async () => {
    const xmlText = await loadXmlSource();
    
    // Parse using standard W3C DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    // Check for parse error
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      alert('Error parsing XML document: ' + parseError.textContent);
      return;
    }

    const speciesNodes = xmlDoc.querySelectorAll('species');
    xmlTableBody.innerHTML = ''; // Clear previous table rows

    speciesNodes.forEach((node) => {
      const id = node.getAttribute('id') || 'N/A';
      const commonName = node.querySelector('commonName') ? node.querySelector('commonName').textContent : 'N/A';
      const scientificName = node.querySelector('scientificName') ? node.querySelector('scientificName').textContent : 'N/A';
      const className = node.querySelector('taxonomy class') ? node.querySelector('taxonomy class').textContent : 'N/A';
      const depthZone = node.querySelector('depthZone') ? node.querySelector('depthZone').textContent : 'N/A';
      const status = node.querySelector('conservationStatus') ? node.querySelector('conservationStatus').textContent : 'N/A';
      const diet = node.querySelector('diet') ? node.querySelector('diet').textContent : 'N/A';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><code>${id}</code></td>
        <td><strong>${commonName}</strong></td>
        <td><em>${scientificName}</em></td>
        <td>${className}</td>
        <td>${depthZone}</td>
        <td><span class="species-badge ${status.includes('Endangered') ? 'badge-endangered' : (status.includes('Vulnerable') ? 'badge-vulnerable' : 'badge-least-concern')}">${status}</span></td>
        <td>${diet}</td>
      `;
      xmlTableBody.appendChild(row);
    });

    parsedXmlOutput.style.display = 'block';
    btnParseXml.innerHTML = '<span>✔️</span> XML Database Successfully Parsed (' + speciesNodes.length + ' Records)';
    btnParseXml.classList.remove('btn-primary');
    btnParseXml.classList.add('btn-secondary');
    btnParseXml.style.backgroundColor = '#059669';
    btnParseXml.style.color = '#ffffff';

    // Smooth scroll down to the generated table
    parsedXmlOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ------------------------------------------------------------------------------
   4. Interactive Bathymetric Depth & Hydrostatic Pressure Simulator
   ------------------------------------------------------------------------------ */
function initDepthSimulator() {
  const depthSlider = document.getElementById('depthSlider');
  const depthValueDisplay = document.getElementById('depthValueDisplay');
  const depthSimulatorBox = document.getElementById('depthSimulatorBox');
  const readoutZone = document.getElementById('readoutZone');
  const readoutZoneDesc = document.getElementById('readoutZoneDesc');
  const readoutPressure = document.getElementById('readoutPressure');
  const readoutLight = document.getElementById('readoutLight');
  const readoutLightDesc = document.getElementById('readoutLightDesc');
  const readoutTemp = document.getElementById('readoutTemp');
  const readoutTempDesc = document.getElementById('readoutTempDesc');
  const readoutOrganisms = document.getElementById('readoutOrganisms');
  const presetBtns = document.querySelectorAll('.depth-preset-btn');

  if (!depthSlider || !depthValueDisplay) return;

  function updateSimulator(depth) {
    depthValueDisplay.textContent = `${depth.toLocaleString()} m`;

    // Calculate Hydrostatic Pressure (1 atm at surface + 1 atm every 10 meters)
    const pressureAtm = (1 + (depth / 10)).toFixed(1);
    const pressurePsi = (pressureAtm * 14.696).toFixed(0);
    readoutPressure.textContent = `${parseFloat(pressureAtm).toLocaleString()} atm (${parseFloat(pressurePsi).toLocaleString()} psi)`;

    // Calculate Dynamic Environmental Parameters & Zones
    if (depth <= 200) {
      // Epipelagic (Sunlight Zone)
      readoutZone.textContent = 'Epipelagic (Sunlight Zone)';
      readoutZoneDesc.textContent = 'The euphotic zone receives full solar radiance, supporting net planetary photosynthesis and major fisheries.';
      const lightPct = Math.max(5, (100 - (depth / 200) * 90)).toFixed(0);
      readoutLight.textContent = `${lightPct}% Solar Penetration`;
      readoutLightDesc.textContent = 'Abundant photon flux drives photosynthetic phytoplankton, macro-algae, and symbiotic zooxanthellae.';
      const tempC = (28 - (depth / 200) * 14).toFixed(1);
      readoutTemp.textContent = `${tempC} °C`;
      readoutTempDesc.textContent = 'Warm solar-heated surface mixed layer, prone to seasonal thermal variations.';
      readoutOrganisms.textContent = 'Phytoplankton, Green Sea Turtles, Coral Polyps, Flying Fish, Bottlenose Dolphins, Pelagic Tuna.';
      depthSimulatorBox.style.background = 'linear-gradient(180deg, #caf0f8 0%, #0077b6 100%)';
    } else if (depth <= 1000) {
      // Mesopelagic (Twilight Zone)
      readoutZone.textContent = 'Mesopelagic (Twilight Zone)';
      readoutZoneDesc.textContent = 'The dysphotic twilight realm where sunlight diminishes rapidly; insufficient for photosynthesis.';
      readoutLight.textContent = '< 1% (Minimal Faint Blue)';
      readoutLightDesc.textContent = 'Only high-energy blue-cyan wavelengths penetrate; organisms rely on tubular eyes and counter-illumination.';
      const tempC = (14 - ((depth - 200) / 800) * 10).toFixed(1);
      readoutTemp.textContent = `${tempC} °C`;
      readoutTempDesc.textContent = 'Main oceanic thermocline: steep and rapid decline in ambient seawater temperature.';
      readoutOrganisms.textContent = 'Lanternfish, Bristlemouths, Hatchetfish, Giant Squid, Bioluminescent Siphonophores.';
      depthSimulatorBox.style.background = 'linear-gradient(180deg, #0077b6 0%, #023e8a 100%)';
    } else if (depth <= 4000) {
      // Bathypelagic (Midnight Zone)
      readoutZone.textContent = 'Bathypelagic (Midnight Zone)';
      readoutZoneDesc.textContent = 'The aphotic midnight stratum: perpetual darkness, immense pressure, and reliance on marine snow detritus.';
      readoutLight.textContent = '0% (Total Solar Darkness)';
      readoutLightDesc.textContent = 'Absolute darkness. The sole illumination arises from biological luminescence (luciferin-luciferase).';
      readoutTemp.textContent = '3.5 °C to 2.0 °C';
      readoutTempDesc.textContent = 'Perpetually cold, stable isothermal conditions throughout the global oceanic abyss.';
      readoutOrganisms.textContent = 'Deep Sea Anglerfish, Gulper Eel, Vampire Squid, Fangtooth, Dumbo Octopus.';
      depthSimulatorBox.style.background = 'linear-gradient(180deg, #023e8a 0%, #03045e 100%)';
    } else if (depth <= 6000) {
      // Abyssopelagic (The Abyss)
      readoutZone.textContent = 'Abyssopelagic (The Abyss)';
      readoutZoneDesc.textContent = 'Covers over 80% of the planetary seafloor. Barophilic biochemistry, near-freezing water, and extreme hydrostatic forces.';
      readoutLight.textContent = '0% (Pitch Blackness)';
      readoutLightDesc.textContent = 'Lightless abyssal plains covered in biogenic pelagic ooze sediment.';
      readoutTemp.textContent = '1.5 °C';
      readoutTempDesc.textContent = 'Cold dense Antarctic Bottom Water (AABW) circulating along the ocean floor.';
      readoutOrganisms.textContent = 'Tripod Fish, Deep-Sea Holothurians (Sea Pigs), Grenadiers, Chemotrophic Vent Polychaetes.';
      depthSimulatorBox.style.background = 'linear-gradient(180deg, #03045e 0%, #090826 100%)';
    } else {
      // Hadalpelagic (Trenches)
      readoutZone.textContent = 'Hadalpelagic (Oceanic Trenches)';
      readoutZoneDesc.textContent = 'Ultra-deep V-shaped subduction trenches plunging to the Challenger Deep (10,920m). Crushing pressure exceeding 1,000 atm.';
      readoutLight.textContent = '0% (Total Aphotic)';
      readoutLightDesc.textContent = 'Perpetual lightless trench canyon systems isolated in extreme isolation.';
      readoutTemp.textContent = '1.0 °C to 2.5 °C';
      readoutTempDesc.textContent = 'Slight geothermal warming from tectonic friction within deep subducting oceanic trenches.';
      readoutOrganisms.textContent = 'Mariana Snailfish (Pseudoliparis swirei), Hirondellea gigas Amphipods, Barophilic Chemolithoautotrophs.';
      depthSimulatorBox.style.background = 'linear-gradient(180deg, #05041a 0%, #010008 100%)';
    }
  }

  depthSlider.addEventListener('input', (e) => {
    updateSimulator(parseInt(e.target.value, 10));
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const presetDepth = parseInt(btn.getAttribute('data-depth'), 10);
      depthSlider.value = presetDepth;
      updateSimulator(presetDepth);
    });
  });

  // Initial trigger
  updateSimulator(parseInt(depthSlider.value, 10));
}

/* ------------------------------------------------------------------------------
   5. Interactive Underwater Optical Lightbox Modal (DOM Manipulation)
   ------------------------------------------------------------------------------ */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxSource = document.getElementById('lightboxSource');
  const lightboxHabitat = document.getElementById('lightboxHabitat');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  const filterBtns = document.querySelectorAll('.filter-btn[data-gallery-filter]');

  if (!lightboxModal || galleryItems.length === 0) return;

  let currentIndex = 0;
  let activeItems = Array.from(galleryItems);

  // Gallery category filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-gallery-filter');
      activeItems = [];

      galleryItems.forEach((item) => {
        const itemCat = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCat === filterVal) {
          item.style.display = 'block';
          activeItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  function openLightbox(item) {
    currentIndex = activeItems.indexOf(item);
    if (currentIndex === -1) currentIndex = 0;
    renderLightboxItem();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function renderLightboxItem() {
    if (activeItems.length === 0) return;
    const item = activeItems[currentIndex];
    const imgEl = item.querySelector('img');
    const title = item.getAttribute('data-title') || 'Underwater Specimen';
    const desc = item.getAttribute('data-desc') || '';
    const photog = item.getAttribute('data-photographer') || 'Marine Optical Survey';
    const habitat = item.getAttribute('data-habitat') || 'Ocean Realm';

    lightboxImage.src = imgEl.src;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightboxSource.textContent = photog;
    lightboxHabitat.textContent = habitat;
    lightboxCounter.textContent = `${currentIndex + 1} / ${activeItems.length}`;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % activeItems.length;
    renderLightboxItem();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    renderLightboxItem();
  }

  // Click triggers
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  // Close when clicking modal backdrop
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ------------------------------------------------------------------------------
   6. Interactive Ocean Literacy Quiz (DOM Evaluation & Feedback)
   ------------------------------------------------------------------------------ */
function initOceanQuiz() {
  const submitBtn = document.getElementById('submitQuizBtn');
  const resetBtn = document.getElementById('resetQuizBtn');
  const quizForm = document.getElementById('oceanQuizForm');
  const resultDisplay = document.getElementById('quizResultDisplay');
  const resultHeading = document.getElementById('quizResultHeading');
  const scoreText = document.getElementById('quizScoreText');
  const feedbackText = document.getElementById('quizFeedbackText');

  if (!submitBtn || !quizForm) return;

  const answerKey = {
    q1: 'b', // 50% - 80%
    q2: 'c', // Carbonate ions
    q3: 'b', // 101 atm
    q4: 'a'  // Zooxanthellae
  };

  submitBtn.addEventListener('click', () => {
    let score = 0;
    const total = Object.keys(answerKey).length;
    let answeredCount = 0;

    for (const [qKey, correctVal] of Object.entries(answerKey)) {
      const selected = quizForm.querySelector(`input[name="${qKey}"]:checked`);
      if (selected) {
        answeredCount++;
        if (selected.value === correctVal) {
          score++;
        }
      }
    }

    if (answeredCount < total) {
      alert(`Please answer all ${total} questions before evaluating your score (${answeredCount}/${total} answered).`);
      return;
    }

    const percentage = Math.round((score / total) * 100);
    resultDisplay.style.display = 'block';

    if (percentage === 100) {
      resultHeading.textContent = '🌟 Master Oceanographer: Perfect Score (100%)!';
      resultDisplay.style.borderColor = '#10b981';
      resultDisplay.style.backgroundColor = '#ecfdf5';
      feedbackText.textContent = 'Outstanding scientific comprehension! You demonstrated exceptional mastery of marine biogeochemistry, bathymetric gradients, and ecological symbiosis.';
    } else if (percentage >= 75) {
      resultHeading.textContent = `🌊 Marine Biology Scholar (${percentage}%)`;
      resultDisplay.style.borderColor = '#0077b6';
      resultDisplay.style.backgroundColor = '#f0f9ff';
      feedbackText.textContent = 'Commendable ocean literacy! You possess a robust foundation in marine conservation principles and ocean dynamics.';
    } else {
      resultHeading.textContent = `🔍 Junior Ocean Explorer (${percentage}%)`;
      resultDisplay.style.borderColor = '#f59e0b';
      resultDisplay.style.backgroundColor = '#fffbeb';
      feedbackText.textContent = 'A promising start! Review the ecosystems and species modules to deepen your understanding of oceanic zones and chemical cycles.';
    }

    scoreText.textContent = `You correctly answered ${score} out of ${total} scientific questions (${percentage}%).`;
    resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      quizForm.reset();
      resultDisplay.style.display = 'none';
    });
  }
}

/* ------------------------------------------------------------------------------
   7. Comprehensive Form Validation & DOM Confirmation Modal
   ------------------------------------------------------------------------------ */
function initConservationFormValidation() {
  const form = document.getElementById('marinePledgeForm');
  if (!form) return;

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const regionSelect = document.getElementById('geographicRegion');
  const reportTypeSelect = document.getElementById('reportType');
  const dateInput = document.getElementById('observationDate');
  const narrativeTextarea = document.getElementById('narrativeStatement');
  const charCountDisplay = document.getElementById('charCount');
  const urgencySlider = document.getElementById('urgencySlider');
  const urgencyLabel = document.getElementById('urgencyValueLabel');

  // Modal elements
  const submissionModal = document.getElementById('submissionModal');
  const modalUserName = document.getElementById('modalUserName');
  const modalConfirmCode = document.getElementById('modalConfirmCode');
  const modalActionType = document.getElementById('modalActionType');
  const modalRegion = document.getElementById('modalRegion');
  const modalCommitmentCount = document.getElementById('modalCommitmentCount');
  const closeModalBtn = document.getElementById('closeSubmissionModalBtn');

  // Real-time character counter
  if (narrativeTextarea && charCountDisplay) {
    narrativeTextarea.addEventListener('input', () => {
      charCountDisplay.textContent = narrativeTextarea.value.length;
    });
  }

  // Real-time urgency slider label
  if (urgencySlider && urgencyLabel) {
    const tierLabels = [
      'Tier 1: Minimal Routine Observation',
      'Tier 2: Routine Action',
      'Tier 3: Moderate Ecological Concern',
      'Tier 4: Critical Priority Concern',
      'Tier 5: Acute Emergency Incident'
    ];
    urgencySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      urgencyLabel.textContent = tierLabels[val - 1] || `Tier ${val}`;
    });
  }

  // Helper validation functions
  function validateField(inputEl, errorEl, condition) {
    if (!condition) {
      inputEl.classList.add('is-invalid');
      inputEl.classList.remove('is-valid');
      if (errorEl) errorEl.classList.add('active');
      return false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
      if (errorEl) errorEl.classList.remove('active');
      return true;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time blur listeners
  fullNameInput.addEventListener('blur', () => {
    validateField(fullNameInput, document.getElementById('nameError'), fullNameInput.value.trim().length >= 3);
  });

  emailInput.addEventListener('blur', () => {
    validateField(emailInput, document.getElementById('emailError'), emailRegex.test(emailInput.value.trim()));
  });

  regionSelect.addEventListener('change', () => {
    validateField(regionSelect, document.getElementById('regionError'), regionSelect.value !== '');
  });

  reportTypeSelect.addEventListener('change', () => {
    validateField(reportTypeSelect, document.getElementById('reportTypeError'), reportTypeSelect.value !== '');
  });

  dateInput.addEventListener('change', () => {
    validateField(dateInput, document.getElementById('dateError'), dateInput.value !== '');
  });

  narrativeTextarea.addEventListener('blur', () => {
    validateField(narrativeTextarea, document.getElementById('narrativeError'), narrativeTextarea.value.trim().length >= 20);
  });

  // Form submission listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(fullNameInput, document.getElementById('nameError'), fullNameInput.value.trim().length >= 3);
    const isEmailValid = validateField(emailInput, document.getElementById('emailError'), emailRegex.test(emailInput.value.trim()));
    const isRegionValid = validateField(regionSelect, document.getElementById('regionError'), regionSelect.value !== '');
    const isReportValid = validateField(reportTypeSelect, document.getElementById('reportTypeError'), reportTypeSelect.value !== '');
    const isDateValid = validateField(dateInput, document.getElementById('dateError'), dateInput.value !== '');
    const isNarrativeValid = validateField(narrativeTextarea, document.getElementById('narrativeError'), narrativeTextarea.value.trim().length >= 20);

    // Validate Checkboxes (at least one must be checked)
    const checkedBoxes = form.querySelectorAll('input[name="pledgeActions"]:checked');
    const checkboxError = document.getElementById('checkboxError');
    const isCheckboxesValid = checkedBoxes.length > 0;
    if (!isCheckboxesValid) {
      if (checkboxError) checkboxError.classList.add('active');
    } else {
      if (checkboxError) checkboxError.classList.remove('active');
    }

    const isFormValid = isNameValid && isEmailValid && isRegionValid && isReportValid && isDateValid && isNarrativeValid && isCheckboxesValid;

    if (!isFormValid) {
      const firstInvalid = form.querySelector('.is-invalid') || checkboxError;
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Dynamic Success State: Populate confirmation modal with DOM manipulation
    const randomCode = 'OCD-2026-' + Math.floor(100000 + Math.random() * 900000);
    modalUserName.textContent = fullNameInput.value.trim();
    modalConfirmCode.textContent = randomCode;
    modalActionType.textContent = reportTypeSelect.value;
    modalRegion.textContent = regionSelect.value;
    modalCommitmentCount.textContent = checkedBoxes.length;

    submissionModal.classList.add('active');

    // Reset Form fields upon successful validation
    form.reset();
    form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    if (charCountDisplay) charCountDisplay.textContent = '0';
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      submissionModal.classList.remove('active');
    });
  }

  submissionModal.addEventListener('click', (e) => {
    if (e.target === submissionModal) {
      submissionModal.classList.remove('active');
    }
  });
}
