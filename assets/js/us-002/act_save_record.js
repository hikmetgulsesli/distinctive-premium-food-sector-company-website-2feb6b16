(function (global) {
  'use strict';

  function actSaveRecord() {
    if (global.app && global.app.actions && typeof global.app.actions.saveEditingItem === 'function') {
      var result = global.app.actions.saveEditingItem();
      if (!result || !result.ok) {
        var errors = result && result.errors;
        var message;
        if (Array.isArray(errors)) {
          message = errors.join('; ');
        } else if (typeof errors === 'string') {
          message = errors;
        } else {
          message = 'Save failed';
        }
        return { ok: false, error: message };
      }
      return { ok: true };
    }
    return { ok: false, error: 'App save action is not available' };
  }

  global.__US002_ACTIONS__ = global.__US002_ACTIONS__ || {};
  global.__US002_ACTIONS__.actSaveRecord = actSaveRecord;
})(window);
