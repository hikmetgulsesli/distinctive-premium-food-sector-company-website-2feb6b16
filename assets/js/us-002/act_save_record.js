(function (global) {
  'use strict';

  function actSaveRecord() {
    if (global.app && global.app.actions && typeof global.app.actions.saveEditingItem === 'function') {
      var result = global.app.actions.saveEditingItem();
      if (!result || !result.ok) {
        return { ok: false, error: (result && result.errors && result.errors.join('; ')) || 'Save failed' };
      }
      return { ok: true };
    }
    return { ok: false, error: 'App save action is not available' };
  }

  global.__US002_ACTIONS__ = global.__US002_ACTIONS__ || {};
  global.__US002_ACTIONS__.actSaveRecord = actSaveRecord;
})(window);
