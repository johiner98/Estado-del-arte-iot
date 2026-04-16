/**
 * Estado del Arte IoT PM2.5 — main.js
 * Funcionalidades: dark mode, búsqueda, filtros por tag, expand/collapse cards, scroll-top
 */

(function () {
  'use strict';

  /* ── 1. DARK MODE ── */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Modo claro' : 'Modo oscuro');
    localStorage.setItem('theme', theme);
  }

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ── 2. SEARCH + FILTER ── */
  const searchInput  = document.getElementById('search-input');
  const cards        = Array.from(document.querySelectorAll('.study-card'));
  const noResults    = document.getElementById('no-results');
  const resultsCount = document.getElementById('results-count');
  const filterChips  = Array.from(document.querySelectorAll('.filter-chip'));

  let activeFilter = 'all';

  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function filterCards() {
    const query = normalize(searchInput.value.trim());
    let visible = 0;

    cards.forEach(card => {
      const text  = normalize(card.textContent);
      const tags  = Array.from(card.querySelectorAll('.tag')).map(t => normalize(t.textContent));

      const matchesSearch = !query || text.includes(query);
      const matchesFilter = activeFilter === 'all' || tags.some(t => t.includes(normalize(activeFilter)));

      if (matchesSearch && matchesFilter) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
    if (resultsCount) {
      resultsCount.textContent = `${visible} de ${cards.length} estudios`;
    }
  }

  searchInput.addEventListener('input', filterCards);

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      filterCards();
    });
  });

  /* ── 3. EXPAND / COLLAPSE CARDS ── */
  cards.forEach(card => {
    const body = card.querySelector('.card-body');
    if (!body) return;

    // Wrap body content in expandable div
    body.classList.add('card-body-short');

    const btn = document.createElement('button');
    btn.className = 'card-expand-btn';
    btn.textContent = '+ ver más';
    btn.setAttribute('aria-expanded', 'false');

    body.insertAdjacentElement('afterend', btn);

    // Only show button if content is actually truncated
    function checkOverflow() {
      const isTruncated = body.scrollHeight > body.clientHeight + 2;
      btn.style.display = (isTruncated || card.classList.contains('expanded')) ? 'block' : 'none';
    }

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = card.classList.toggle('expanded');
      btn.textContent = expanded ? '− ver menos' : '+ ver más';
      btn.setAttribute('aria-expanded', expanded.toString());
    });
  });

  /* ── 4. SCROLL TO TOP ── */
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 5. KEYBOARD SHORTCUT ── */
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K → focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    // Escape → clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      filterCards();
      searchInput.blur();
    }
  });

  /* ── 6. TIMELINE TOOLTIP (mobile tap) ── */
  const tlItems = document.querySelectorAll('.tl-item');
  tlItems.forEach(item => {
    const dot  = item.querySelector('.tl-dot');
    const desc = item.querySelector('.tl-desc');
    if (!dot || !desc) return;
    dot.setAttribute('title', desc.textContent.trim());
  });

  /* ── 7. TABLE: highlight "Este proyecto" row on hover ── */
  const tableRows = document.querySelectorAll('.compare-wrap tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      if (!row.classList.contains('highlight')) {
        row.style.background = 'rgba(26,58,92,0.04)';
      }
    });
    row.addEventListener('mouseleave', () => {
      if (!row.classList.contains('highlight')) {
        row.style.background = '';
      }
    });
  });

  console.log('%c[IoT PM2.5] Estado del Arte cargado ✓', 'color:#059669;font-weight:bold;');
})();
