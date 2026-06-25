(function (global) {
  'use strict';

  function actSelectRecord(itemId) {
    if (global.app && global.app.actions && typeof global.app.actions.selectItem === 'function') {
      global.app.actions.selectItem(itemId);
      return { ok: true };
    }
    return { ok: false, error: 'App select action is not available' };
  }

  function actEditRecord(itemId) {
    if (global.app && global.app.actions && typeof global.app.actions.editItem === 'function') {
      global.app.actions.editItem(itemId);
      return { ok: true };
    }
    return { ok: false, error: 'App edit action is not available' };
  }

  global.__US002_ACTIONS__ = global.__US002_ACTIONS__ || {};
  global.__US002_ACTIONS__.actSelectRecord = actSelectRecord;
  global.__US002_ACTIONS__.actEditRecord = actEditRecord;
})(window);
