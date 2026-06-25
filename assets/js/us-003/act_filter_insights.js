(function (global) {
  'use strict';

  var FILTER_OPTIONS = [
    { key: 'all', label: 'All Items' },
    { key: 'bakery', label: 'Bakery' },
    { key: 'catering', label: 'Catering' },
    { key: 'out-of-stock', label: 'Out of Stock' },
    { key: 'featured', label: 'Featured' }
  ];

  function getState() {
    if (global.app && typeof global.app.state === 'function') {
      return global.app.state() || {};
    }
    return {};
  }

  function closeFilterMenu() {
    var existing = document.getElementById('insights-filter-menu');
    if (existing) existing.remove();
    if (closeFilterMenu.listener) {
      document.removeEventListener('click', closeFilterMenu.listener);
      closeFilterMenu.listener = null;
    }
  }

  function renderFilterMenu() {
    closeFilterMenu();

    var menu = document.createElement('div');
    menu.id = 'insights-filter-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', 'Insight filters');
    menu.style.cssText = [
      'position: fixed',
      'z-index: 1000',
      'min-width: 180px',
      'background: #ffffff',
      'border: 1px solid rgba(191, 165, 142, 0.3)',
      'border-radius: 4px',
      'box-shadow: 0 10px 30px rgba(38, 38, 38, 0.08)',
      'padding: 8px 0',
      'font-family: inherit',
      'font-size: 14px'
    ].join(';');

    FILTER_OPTIONS.forEach(function (option) {
      var item = document.createElement('button');
      item.type = 'button';
      item.setAttribute('role', 'menuitem');
      item.setAttribute('data-filter', option.key);
      item.textContent = option.label;
      item.style.cssText = [
        'display: block',
        'width: 100%',
        'padding: 10px 16px',
        'text-align: left',
        'background: transparent',
        'border: none',
        'cursor: pointer',
        'font: inherit',
        'color: #1b1c19'
      ].join(';');
      item.addEventListener('mouseenter', function () {
        item.style.background = '#f5f3ee';
      });
      item.addEventListener('mouseleave', function () {
        item.style.background = 'transparent';
      });
      menu.appendChild(item);
    });

    document.body.appendChild(menu);

    var btn = document.querySelector('[data-action-id="ACT_FILTER_INSIGHTS"]');
    if (btn) {
      var rect = btn.getBoundingClientRect();
      menu.style.top = (rect.bottom + window.scrollY + 8) + 'px';
      menu.style.left = rect.left + window.scrollX + 'px';
    }

    setTimeout(function () {
      closeFilterMenu.listener = function onOutsideClick(e) {
        if (!menu.contains(e.target) && e.target.closest('[data-action-id="ACT_FILTER_INSIGHTS"]') !== btn) {
          closeFilterMenu();
        }
      };
      document.addEventListener('click', closeFilterMenu.listener);
    }, 0);

    menu.addEventListener('click', function (e) {
      var item = e.target.closest('[data-filter]');
      if (!item) return;
      var key = item.getAttribute('data-filter');
      applyFilter(key);
      closeFilterMenu();
    });

    return menu;
  }

  function filterItems(items, key) {
    switch (key) {
      case 'bakery':
        return items.filter(function (i) { return i.category === 'Bakery'; });
      case 'catering':
        return items.filter(function (i) { return i.category === 'Catering'; });
      case 'out-of-stock':
        return items.filter(function (i) { return i.status === 'out_of_stock'; });
      case 'featured':
        return items.filter(function (i) { return i.featured; });
      default:
        return items.slice();
    }
  }

  function updateMetrics(surface, filtered, key) {
    var counts = {
      total: filtered.length,
      active: filtered.filter(function (i) { return i.status === 'active'; }).length,
      outOfStock: filtered.filter(function (i) { return i.status === 'out_of_stock'; }).length,
      featured: filtered.filter(function (i) { return i.featured; }).length
    };

    var cards = surface.querySelectorAll('.metric-card');
    if (cards.length >= 4) {
      cards[0].querySelector('.metric-value').textContent = String(counts.total);
      cards[1].querySelector('.metric-value').textContent = String(counts.active);
      cards[2].querySelector('.metric-value').textContent = String(counts.outOfStock);
      cards[3].querySelector('.metric-value').textContent = String(counts.featured);
    }

    var toolbar = surface.querySelector('.surface-toolbar');
    var existingBadge = surface.querySelector('.insights-active-filter');
    if (existingBadge) existingBadge.remove();

    if (key !== 'all' && toolbar) {
      var option = FILTER_OPTIONS.find(function (o) { return o.key === key; });
      var badge = document.createElement('span');
      badge.className = 'insights-active-filter';
      badge.textContent = 'Filtered: ' + (option ? option.label : key);
      badge.style.cssText = [
        'margin-left: auto',
        'padding: 6px 12px',
        'background: rgba(217, 123, 84, 0.12)',
        'color: #974725',
        'border-radius: 4px',
        'font-size: 12px',
        'font-weight: 700',
        'letter-spacing: 0.04em',
        'text-transform: uppercase'
      ].join(';');
      toolbar.appendChild(badge);
    }
  }

  function applyFilter(key) {
    var state = getState();
    var items = state.items || [];
    var filtered = filterItems(items, key);

    var surface = document.querySelector('[data-surface-id="SURF_INSIGHTS"]');
    if (surface) {
      updateMetrics(surface, filtered, key);
    }

    return { ok: true, filter: key, count: filtered.length };
  }

  function actFilterInsights() {
    if (!global.app || typeof global.app.state !== 'function') {
      return { ok: false, error: 'App state is not available' };
    }
    renderFilterMenu();
    return { ok: true };
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action-id="ACT_FILTER_INSIGHTS"]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    actFilterInsights();
  }, true);

  global.__US003_ACTIONS__ = global.__US003_ACTIONS__ || {};
  global.__US003_ACTIONS__.actFilterInsights = actFilterInsights;
})(window);
