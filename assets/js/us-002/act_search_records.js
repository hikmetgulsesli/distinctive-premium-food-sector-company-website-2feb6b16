(function (global) {
  'use strict';

  function actSearchRecords(query) {
    if (global.app && global.app.actions && typeof global.app.actions.setSearch === 'function') {
      global.app.actions.setSearch(query);
      return { ok: true };
    }
    return { ok: false, error: 'App search action is not available' };
  }

  global.__US002_ACTIONS__ = global.__US002_ACTIONS__ || {};
  global.__US002_ACTIONS__.actSearchRecords = actSearchRecords;
})(window);
