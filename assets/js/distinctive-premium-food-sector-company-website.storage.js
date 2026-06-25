(function (global) {
  'use strict';

  var PREFIX = 'kozmaye:';
  var KEYS = {
    ITEMS: PREFIX + 'items',
    PREFERENCES: PREFIX + 'preferences'
  };

  function isAvailable() {
    try {
      var testKey = PREFIX + '__test__';
      global.localStorage.setItem(testKey, '1');
      global.localStorage.removeItem(testKey);
      return true;
    } catch (_) {
      return false;
    }
  }

  function get(key) {
    if (!isAvailable()) return null;
    try {
      var raw = global.localStorage.getItem(key);
      return raw === null ? null : raw;
    } catch (err) {
      return { __storageError: err.message };
    }
  }

  function set(key, value) {
    if (!isAvailable()) return { ok: false, error: 'localStorage unavailable' };
    try {
      global.localStorage.setItem(key, value);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  function remove(key) {
    if (!isAvailable()) return false;
    try {
      global.localStorage.removeItem(key);
      return true;
    } catch (_) {
      return false;
    }
  }

  function parseJSON(raw) {
    if (raw === null || raw === undefined) return { value: null, corrupted: false };
    if (raw && typeof raw === 'object' && raw.__storageError) {
      return { value: null, corrupted: true, error: raw.__storageError };
    }
    try {
      return { value: JSON.parse(raw), corrupted: false };
    } catch (err) {
      return { value: null, corrupted: true, error: err.message };
    }
  }

  var storage = {
    available: isAvailable(),
    keys: KEYS,

    loadItems: function () {
      var result = parseJSON(get(KEYS.ITEMS));
      if (result.corrupted) {
        return { ok: false, error: result.error || 'Corrupted item data', data: null };
      }
      return { ok: true, data: result.value };
    },

    saveItems: function (items) {
      var result = set(KEYS.ITEMS, JSON.stringify(items));
      if (!result.ok) {
        return { ok: false, error: result.error };
      }
      return { ok: true };
    },

    loadPreferences: function () {
      var result = parseJSON(get(KEYS.PREFERENCES));
      if (result.corrupted) {
        return { ok: false, error: result.error || 'Corrupted preferences', data: null };
      }
      return { ok: true, data: result.value };
    },

    savePreferences: function (preferences) {
      var result = set(KEYS.PREFERENCES, JSON.stringify(preferences));
      if (!result.ok) {
        return { ok: false, error: result.error };
      }
      return { ok: true };
    },

    reset: function () {
      remove(KEYS.ITEMS);
      remove(KEYS.PREFERENCES);
      return true;
    },

    status: function () {
      return {
        available: isAvailable(),
        itemKey: KEYS.ITEMS,
        preferenceKey: KEYS.PREFERENCES
      };
    }
  };

  global.__KOZMAYE_STORAGE__ = storage;
})(window);
