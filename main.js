/**
 * C. SANDEEPRAJ - PORTFOLIO LOGIC ENGINE
 * High-Performance, Touch-Friendly, Android & Mobile Tested
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initPerspectiveSwitcher();
  initProcessTabs();
  initTerminal();
  initBatteryCalculator();
  initSplitSlider();
  initProjectToggles();
  initSkillRadar();
  initRecruiterModal();
  initClipboardTools();
  initLightweightParticles();
  initDesktopCursor();
});

/* ==========================================================================
   1. MOBILE NAVIGATION DRAWER (Guaranteed to work on Android & iOS)
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerRecruiterBtn = document.getElementById('drawerRecruiterBtn');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer when any link is tapped and smooth scroll
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  if (drawerRecruiterBtn) {
    drawerRecruiterBtn.addEventListener('click', () => {
      closeDrawer();
      const recruiterModal = document.getElementById('recruiterModal');
      if (recruiterModal) recruiterModal.classList.add('open');
    });
  }
}

/* ==========================================================================
   2. PERSPECTIVE SWITCHER
   ========================================================================== */
function initPerspectiveSwitcher() {
  const pills = document.querySelectorAll('.p-pill');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const perspective = pill.getAttribute('data-perspective');
      if (typeof window.drawSkillRadar === 'function') {
        window.drawSkillRadar(perspective);
      }
    });
  });
}

/* ==========================================================================
   3. 4-STAGE PROCESS TABS
   ========================================================================== */
function initProcessTabs() {
  const tabBtns = document.querySelectorAll('.p-tab-btn');
  const tabPanels = document.querySelectorAll('.process-content-card');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');

        // Trigger chart redraw if switching to battery tab
        if (targetId === 'tab-stage2' && typeof window.redrawBatteryChart === 'function') {
          setTimeout(window.redrawBatteryChart, 100);
        }
      }
    });
  });
}

/* ==========================================================================
   4. STAGE 1: TERMINAL CODE & SIMULATION
   ========================================================================== */
function initTerminal() {
  const codeArea = document.getElementById('terminalCodeArea');
  const outputArea = document.getElementById('terminalOutputArea');
  const runBtn = document.getElementById('runTermBtn');
  const clearBtn = document.getElementById('clearTermBtn');
  const sqlTab = document.getElementById('termSqlTab');
  const cTab = document.getElementById('termCTab');

  const sqlCode = `-- Voltrix Real-Time Anomaly Extraction Query
WITH FleetTelemetry AS (
  SELECT 
    vehicle_id, 
    pack_voltage, 
    pack_temp_c, 
    soc_pct,
    AVG(pack_voltage) OVER(PARTITION BY vehicle_id ORDER BY timestamp ROWS BETWEEN 30 PRECEDING AND CURRENT ROW) as rolling_v_avg
  FROM voltrix_stream_db.live_battery_telemetry
  WHERE timestamp >= NOW() - INTERVAL '5 MINUTES'
)
SELECT 
  vehicle_id,
  soc_pct,
  pack_temp_c,
  ROUND(ABS(pack_voltage - rolling_v_avg), 3) AS voltage_variance_delta,
  CASE 
    WHEN pack_temp_c > 45.0 OR ABS(pack_voltage - rolling_v_avg) > 1.25 THEN 'ALERT_THERMAL_SURGE'
    ELSE 'HEALTHY_CELL_NOMINAL'
  END AS anomaly_flag
FROM FleetTelemetry
ORDER BY voltage_variance_delta DESC;`;

  const cCode = `// pir_signal_filter.c - Low-Power Digital IIR Lowpass Algorithm
#include <stdint.h>
#include <stdbool.h>

#define ALPHA_WEIGHT 13  // 0.20 in fixed-point representation
static int32_t prev_output = 512;
static const int32_t NOISE_THRESHOLD = 95;

bool filter_pir_stream(int32_t adc_sample) {
    // Single-pole IIR Exponential Filter with zero float overhead
    int32_t filtered = ((ALPHA_WEIGHT * adc_sample) + 
                       ((64 - ALPHA_WEIGHT) * prev_output)) >> 6;
    prev_output = filtered;

    int32_t diff = filtered - 512;
    if (diff < 0) diff = -diff;

    // Reject environmental draft & thermal noise
    return (diff > NOISE_THRESHOLD); 
}`;

  let activeTab = 'sql';

  function renderCode() {
    if (!codeArea) return;
    codeArea.textContent = activeTab === 'sql' ? sqlCode : cCode;
  }
  renderCode();

  if (sqlTab && cTab) {
    sqlTab.addEventListener('click', () => {
      sqlTab.classList.add('active');
      cTab.classList.remove('active');
      activeTab = 'sql';
      renderCode();
    });

    cTab.addEventListener('click', () => {
      cTab.classList.add('active');
      sqlTab.classList.remove('active');
      activeTab = 'c';
      renderCode();
    });
  }

  if (runBtn && outputArea) {
    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      outputArea.innerHTML = `<div class="term-log-line" style="color: var(--accent-cyan);">> Compiling & streaming execution plan on [asia-south1] cluster...</div>`;

      setTimeout(() => {
        if (activeTab === 'sql') {
          outputArea.innerHTML += `
            <div class="term-log-line">> Scanned 48,290 records in 18.4ms (Memory: 1.4 MB)</div>
            <div class="term-log-line" style="color: #fff; margin-top: 4px;">
              [STREAMING TELEMETRY RESULTS]:<br>
              | VEHICLE_ID | SOC | TEMP_C | DELTA_V | ANOMALY_STATUS |<br>
              | VT-894-01  | 82% | 32.1°C | 0.038 V | HEALTHY_CELL_NOMINAL |<br>
              | VT-894-02  | 41% | 46.8°C | 1.480 V | <span style="color: #ef4444;">ALERT_THERMAL_SURGE</span> |<br>
              | VT-894-03  | 94% | 28.5°C | 0.012 V | HEALTHY_CELL_NOMINAL |
            </div>
            <div class="term-log-line" style="color: #10b981;">> Performance: Query execution speed improved by 15%.</div>
          `;
        } else {
          outputArea.innerHTML += `
            <div class="term-log-line">> Compiling pir_signal_filter.c (gcc -O3 fixed-point)...</div>
            <div class="term-log-line">> Binary Footprint: .text = 1,120 bytes, .bss = 16 bytes.</div>
            <div class="term-log-line" style="color: #10b981;">> Benchmark: 1,000 samples processed in 3.6ms. False alarm suppression: 84.2%.</div>
          `;
        }
        runBtn.disabled = false;
        outputArea.scrollTop = outputArea.scrollHeight;
      }, 700);
    });
  }

  if (clearBtn && outputArea) {
    clearBtn.addEventListener('click', () => {
      outputArea.innerHTML = `<div class="term-log-line text-muted">[Log Cleared] Ready for simulation.</div>`;
    });
  }
}

/* ==========================================================================
   5. STAGE 2: LIVE BATTERY CALCULATOR & CANVAS CHART
   ========================================================================== */
function initBatteryCalculator() {
  const rangeSoc = document.getElementById('rangeSoc');
  const rangeTemp = document.getElementById('rangeTemp');
  const rangeCycles = document.getElementById('rangeCycles');

  const labelSoc = document.getElementById('labelSoc');
  const labelTemp = document.getElementById('labelTemp');
  const labelCycles = document.getElementById('labelCycles');

  const kpiSoh = document.getElementById('kpiSoh');
  const kpiDeg = document.getElementById('kpiDeg');
  const kpiFlag = document.getElementById('kpiFlag');

  const canvas = document.getElementById('batteryChartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    calculateAndDraw();
  });

  window.redrawBatteryChart = function() {
    resizeCanvas();
    calculateAndDraw();
  };

  function calculateAndDraw() {
    if (!rangeSoc || !rangeTemp || !rangeCycles) return;

    const soc = parseInt(rangeSoc.value);
    const temp = parseInt(rangeTemp.value);
    const cycles = parseInt(rangeCycles.value);

    labelSoc.textContent = `${soc}%`;
    labelTemp.textContent = `${temp}°C`;
    labelCycles.textContent = cycles;

    // Arrhenius electro-chemical degradation simulation
    const tempPenalty = Math.max(0, (temp - 25) * 0.12);
    const cyclePenalty = (cycles / 1500) * 16;
    const soh = Math.max(65, Math.min(100, 100 - cyclePenalty - tempPenalty)).toFixed(1);
    const degRate = ((100 - soh) / cycles).toFixed(3);

    kpiSoh.textContent = `${soh}%`;
    kpiDeg.textContent = `${degRate}% / cycle`;

    if (temp > 45 || soh < 80) {
      kpiFlag.textContent = 'THERMAL SURGE ALERT';
      kpiFlag.className = 'kpi-val text-magenta';
    } else if (soh < 88) {
      kpiFlag.textContent = 'ELEVATED WEAR';
      kpiFlag.className = 'kpi-val text-amber';
    } else {
      kpiFlag.textContent = 'OPTIMAL HEALTH';
      kpiFlag.className = 'kpi-val text-green';
    }

    drawChart(parseFloat(soh), cycles, temp);
  }

  function drawChart(soh, cycles, temp) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = { top: 25, right: 25, bottom: 35, left: 45 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();

      const val = 100 - i * 10;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`${val}%`, pad.left - 35, y + 3);
    }

    // Degradation curve
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#06b6d4';

    const maxCycles = 1500;
    for (let c = 0; c <= maxCycles; c += 25) {
      const tempFactor = 1 + (temp - 25) * 0.015;
      const predictedSoh = Math.max(60, 100 - ((c / maxCycles) * 20 * tempFactor));
      const x = pad.left + (c / maxCycles) * chartW;
      const y = pad.top + ((100 - predictedSoh) / 40) * chartH;

      if (c === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Active operating point
    const currX = pad.left + (cycles / maxCycles) * chartW;
    const currY = pad.top + ((100 - soh) / 40) * chartH;

    ctx.beginPath();
    ctx.arc(currX, currY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ec4899';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Point Label
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText(`Current: ${soh}% (${cycles}c)`, Math.max(pad.left, currX - 45), currY - 12);
  }

  [rangeSoc, rangeTemp, rangeCycles].forEach((slider) => {
    slider.addEventListener('input', calculateAndDraw);
    slider.addEventListener('change', calculateAndDraw);
  });

  calculateAndDraw();
}

/* ==========================================================================
   6. STAGE 3: TOUCH & MOUSE COMPARISON SLIDER
   ========================================================================== */
function initSplitSlider() {
  const container = document.getElementById('splitSliderBox');
  const polishedSide = document.getElementById('splitPolishedSide');
  const handle = document.getElementById('splitDividerHandle');

  if (!container || !polishedSide || !handle) return;

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = container.getBoundingClientRect();
    let pos = (clientX - rect.left) / rect.width;
    pos = Math.max(0.05, Math.min(0.95, pos));

    const pct = pos * 100;
    handle.style.left = `${pct}%`;
    polishedSide.style.clipPath = `polygon(${pct}% 0, 100% 0, 100% 100%, ${pct}% 100%)`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  container.addEventListener('mousemove', (e) => {
    if (isDragging) updateSlider(e.clientX);
  });
  container.addEventListener('click', (e) => updateSlider(e.clientX));

  // Touch Events (Android & iOS)
  handle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });
  container.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches[0]) {
      updateSlider(e.touches[0].clientX);
    }
  }, { passive: true });
}

/* ==========================================================================
   7. PROJECT UNDER-THE-HOOD CODE TOGGLES & FILTERS
   ========================================================================== */
function initProjectToggles() {
  const toggleBtns = document.querySelectorAll('.toggle-code-btn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-item-card');

  // Toggle Code View
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const codeBox = document.getElementById(targetId);
      const btnText = btn.querySelector('.btn-text');

      if (codeBox) {
        const isOpen = codeBox.classList.contains('open');
        if (isOpen) {
          codeBox.classList.remove('open');
          btn.classList.remove('active');
          if (btnText) btnText.textContent = 'Inspect Code';
        } else {
          codeBox.classList.add('open');
          btn.classList.add('active');
          if (btnText) btnText.textContent = 'Hide Code';
        }
      }
    });
  });

  // Filter Categories
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. MULTI-DISCIPLINARY SKILL RADAR
   ========================================================================== */
function initSkillRadar() {
  const canvas = document.getElementById('skillRadarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const size = 380;
  canvas.width = size;
  canvas.height = size;

  const skills = [
    { name: 'Python & ML', score: 0.94 },
    { name: 'SQL & DBMS', score: 0.92 },
    { name: 'Power BI & BI', score: 0.88 },
    { name: 'UI/UX & Figma', score: 0.90 },
    { name: 'Motion & Framer', score: 0.86 },
    { name: 'C & Systems', score: 0.85 }
  ];

  window.drawSkillRadar = function(focus = 'data') {
    ctx.clearRect(0, 0, size, size);
    const center = size / 2;
    const radius = size * 0.35;
    const totalAxes = skills.length;

    // Draw concentric web rings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let level = 1; level <= 5; level++) {
      const r = (radius / 5) * level;
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw radial axes & labels
    for (let i = 0; i < totalAxes; i++) {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(x, y);
      ctx.stroke();

      const labelDist = radius + 22;
      const lx = center + Math.cos(angle) * labelDist;
      const ly = center + Math.sin(angle) * labelDist;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skills[i].name, lx, ly);
    }

    // Color based on focus
    let strokeColor = '#06b6d4';
    let fillColor = 'rgba(6, 182, 212, 0.22)';
    if (focus === 'uiux') {
      strokeColor = '#ec4899';
      fillColor = 'rgba(236, 72, 153, 0.22)';
    } else if (focus === 'embedded') {
      strokeColor = '#f59e0b';
      fillColor = 'rgba(245, 158, 11, 0.22)';
    }

    // Draw polygon
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const r = radius * skills[i].score;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw vertices
    for (let i = 0; i < totalAxes; i++) {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const r = radius * skills[i].score;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  window.drawSkillRadar();
}

/* ==========================================================================
   9. RECRUITER QUICK-VIEW MODAL
   ========================================================================== */
function initRecruiterModal() {
  const modal = document.getElementById('recruiterModal');
  const openBtn = document.getElementById('openRecruiterBtn');
  const closeBtn = document.getElementById('closeRecruiterModal');
  const roleChips = document.querySelectorAll('.m-chip');

  const scoreEl = document.getElementById('evalScoreDisplay');
  const titleEl = document.getElementById('evalTitleDisplay');
  const bulletsEl = document.getElementById('evalBulletsDisplay');
  const questionsEl = document.getElementById('evalQuestionsDisplay');

  if (!modal) return;

  const roleProfiles = {
    hybrid: {
      score: '98%',
      title: 'Top-Tier Student Engineer Match (Creative Technologist)',
      bullets: [
        'Top 10% class rank with 8.2 / 10 CGPA in B.Tech AI & Data Science at Gnanamani College of Technology.',
        'Completed 2 industrial internships during college: Tech Volt (ML Intern, -15% latency reduction) and Tech Vedhu (UI/UX Design Intern).',
        'Direct synthesis of low-level algorithms (C, SQL) with modern design systems and user-centric prototypes.',
        'Available for immediate hiring: Internship, Graduate Engineering Trainee (GET), or Entry-Level roles.'
      ],
      questions: [
        '1. "How did your machine learning preprocessing at Tech Volt reduce data pipeline latency by 15%?"',
        '2. "Can you walk us through how you built your digital IIR filtering algorithm in C for the PIR sensor project?"'
      ]
    },
    data: {
      score: '96%',
      title: 'High-Caliber Student in AI & Data Science',
      bullets: [
        'Solid foundations in Machine Learning, DBMS, Business Intelligence, and Data Visualization.',
        'National Runner-Up in the Quizoff 2026 AI Competition against nationwide collegiate participants.',
        'Presented research paper on "Quantum Computing Applications Beyond Cryptography" at TCET Mumbai.',
        'Completed Google & Coursera Professional Specializations in Applied Data Science and Data Analytics.'
      ],
      questions: [
        '1. "What thresholding techniques did you employ to eliminate environmental noise in PIR sensor streams?"',
        '2. "How would you design a real-time anomaly detection pipeline for streaming EV battery telemetry?"'
      ]
    },
    design: {
      score: '95%',
      title: 'Strong Student Profile in UI/UX & Motion Design',
      bullets: [
        'Hands-on UI/UX internship experience at Tech Vedhu (Salem, TN) designing scalable web/mobile systems.',
        'Conducted qualitative customer research across food discovery, cart interaction, and GPS live order tracking.',
        'Crafted smooth, physics-based micro-interactions and high-conversion wireframes in Figma.',
        'Quantified design impact: reduced customer drop-off by streamlining checkout navigation.'
      ],
      questions: [
        '1. "What user research methodologies did you employ during your Tech Vedhu internship?"',
        '2. "How do you apply quantitative analytics to validate and refine your Figma prototypes?"'
      ]
    }
  };

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  roleChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      roleChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const roleKey = chip.getAttribute('data-role-eval');
      const data = roleProfiles[roleKey] || roleProfiles.hybrid;

      if (scoreEl) scoreEl.textContent = data.score;
      if (titleEl) titleEl.textContent = data.title;
      if (bulletsEl) {
        bulletsEl.innerHTML = data.bullets.map((b) => `<li>${b}</li>`).join('');
      }
      if (questionsEl) {
        questionsEl.innerHTML = data.questions.join('<br>');
      }
    });
  });
}

/* ==========================================================================
   10. CLIPBOARD COPY TOOLS
   ========================================================================== */
function initClipboardTools() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const feedback = document.getElementById('copyFeedback');

  function copyText(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      if (feedback) {
        feedback.textContent = `${label} Copied to Clipboard!`;
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 2500);
      }
    }).catch(() => {
      // Fallback
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      if (feedback) {
        feedback.textContent = `${label} Copied!`;
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 2500);
      }
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyText('ssandeepraj894@gmail.com', 'Email');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyText('+918754148144', 'Phone Number');
    });
  }

  const heroLiveUrlBadge = document.getElementById('heroLiveUrlBadge');
  const badgeCopyHint = document.getElementById('badgeCopyHint');
  if (heroLiveUrlBadge) {
    heroLiveUrlBadge.addEventListener('click', () => {
      const liveUrl = window.location.origin.includes('localhost') 
        ? `${window.location.origin}/sandeepraj/portfolio` 
        : 'https://ssandeepraj894-droid.github.io/portfolio';
      
      navigator.clipboard.writeText(liveUrl).then(() => {
        if (badgeCopyHint) {
          badgeCopyHint.innerHTML = `<i class="ph ph-check"></i> Copied!`;
          badgeCopyHint.style.color = '#10b981';
          setTimeout(() => {
            badgeCopyHint.innerHTML = `<i class="ph ph-copy"></i> Copy`;
            badgeCopyHint.style.color = '';
          }, 2200);
        }
      }).catch(() => {
        copyText(liveUrl, 'Portfolio Link');
      });
    });
  }
}

/* ==========================================================================
   11. LIGHTWEIGHT CANVAS PARTICLES (Battery & Mobile Friendly)
   ========================================================================== */
function initLightweightParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Scale down particles significantly on mobile phones for 60fps performance
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 24 : 55;
  const maxDist = isMobile ? 85 : 120;

  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* ==========================================================================
   12. DESKTOP CURSOR (Disabled on Touch Devices)
   ========================================================================== */
function initDesktopCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
}
