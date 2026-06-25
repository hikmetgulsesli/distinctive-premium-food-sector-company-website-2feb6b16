(function (global) {
  'use strict';

  function actCreateRecord() {
    if (global.app && global.app.actions && typeof global.app.actions.createNewItem === 'function') {
      global.app.actions.createNewItem();
      return { ok: true };
    }
    return { ok: false, error: 'App create action is not available' };
  }

  global.__US002_ACTIONS__ = global.__US002_ACTIONS__ || {};
  global.__US002_ACTIONS__.actCreateRecord = actCreateRecord;
})(window);
