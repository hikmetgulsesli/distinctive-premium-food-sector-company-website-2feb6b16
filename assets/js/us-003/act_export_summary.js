(function (global) {
  'use strict';

  function getState() {
    if (global.app && typeof global.app.state === 'function') {
      return global.app.state() || {};
    }
    return {};
  }

  function showToast(message) {
    var existing = document.getElementById('insights-export-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'insights-export-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    toast.style.cssText = [
      'position: fixed',
      'bottom: 24px',
      'right: 24px',
      'z-index: 1000',
      'padding: 14px 20px',
      'background: #262626',
      'color: #ffffff',
      'border-radius: 4px',
      'font-size: 14px',
      'font-weight: 500',
      'box-shadow: 0 10px 30px rgba(38, 38, 38, 0.12)',
      'opacity: 0',
      'transform: translateY(12px)',
      'transition: opacity 0.2s ease, transform 0.2s ease'
    ].join(';');

    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(function () {
        toast.remove();
      }, 200);
    }, 3000);
  }

  function buildSummary(state) {
    var items = state.items || [];
    var counts = state.counts || {};
    var activeFilter = 'all';
    if (global.app && typeof global.app.activeFilter === 'function') {
      activeFilter = global.app.activeFilter();
    }

    return {
      exportedAt: new Date().toISOString(),
      surface: 'SURF_INSIGHTS',
      counts: {
        total: counts.total !== undefined ? counts.total : items.length,
        active: counts.active !== undefined ? counts.active : items.filter(function (i) { return i.status === 'active'; }).length,
        outOfStock: counts.outOfStock !== undefined ? counts.outOfStock : items.filter(function (i) { return i.status === 'out_of_stock'; }).length,
        featured: counts.featured !== undefined ? counts.featured : items.filter(function (i) { return i.featured; }).length
      },
      activeFilter: activeFilter,
      items: items.map(function (item) {
        return {
          id: item.id,
          name: item.name,
          category: item.category,
          status: item.status,
          stock: item.stock,
          featured: item.featured,
          price: item.price
        };
      })
    };
  }

  function actExportSummary() {
    if (!global.app || typeof global.app.state !== 'function') {
      return { ok: false, error: 'App state is not available' };
    }

    var state = getState();
    var summary = buildSummary(state);
    var summaryText = JSON.stringify(summary, null, 2);

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(summaryText).catch(function () {});
      }
    } catch (_) {}

    if (typeof console !== 'undefined' && console.log) {
      console.log('[EXPORT SUMMARY]', summary);
    }

    showToast('Exported summary (' + summary.counts.total + ' items)');

    return { ok: true, summary: summary };
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action-id="ACT_EXPORT_SUMMARY"]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    actExportSummary();
  }, true);

  global.__US003_ACTIONS__ = global.__US003_ACTIONS__ || {};
  global.__US003_ACTIONS__.actExportSummary = actExportSummary;
})(window);
