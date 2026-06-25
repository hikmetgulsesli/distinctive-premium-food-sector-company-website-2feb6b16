(function (global) {
  'use strict';

  function actRetryLoad() {
    if (global.app && global.app.actions) {
      if (typeof global.app.actions.setSearch === 'function') {
        global.app.actions.setSearch('');
      }
      if (typeof global.app.actions.setCategoryFilter === 'function') {
        global.app.actions.setCategoryFilter('All');
      }
      if (typeof global.app.actions.setStatusFilter === 'function') {
        global.app.actions.setStatusFilter('All');
      }
      if (typeof global.app.actions.clearError === 'function') {
        global.app.actions.clearError();
      }
      return { ok: true };
    }
    return { ok: false, error: 'App actions are not available' };
  }

  global.__US002_ACTIONS__ = global.__US002_ACTIONS__ || {};
  global.__US002_ACTIONS__.actRetryLoad = actRetryLoad;
})(window);
