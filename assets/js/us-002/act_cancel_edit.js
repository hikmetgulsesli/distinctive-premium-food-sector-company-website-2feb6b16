(function (global) {
  'use strict';

  function actCancelEdit() {
    if (global.app && global.app.actions && typeof global.app.actions.cancelEdit === 'function') {
      global.app.actions.cancelEdit();
      return { ok: true };
    }
    return { ok: false, error: 'App cancel action is not available' };
  }

  global.__US002_ACTIONS__ = global.__US002_ACTIONS__ || {};
  global.__US002_ACTIONS__.actCancelEdit = actCancelEdit;
})(window);
