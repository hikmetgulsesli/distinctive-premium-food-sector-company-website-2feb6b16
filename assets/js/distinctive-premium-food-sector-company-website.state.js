(function (global) {
  'use strict';

  var DEFAULT_SURFACE = 'SURF_ITEM_OPERATIONS';

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function createState(initialData, storage) {
    var items = deepClone(initialData.items || []);
    var preferences = Object.assign({}, initialData.preferences || { defaultCategory: 'All', sortBy: 'updatedAt' });

    var state = {
      activeSurface: DEFAULT_SURFACE,
      selectedItem: null,
      editingItem: null,
      storageStatus: 'ready',
      lastError: null,
      activePanel: 'list',
      counts: {
        total: items.length,
        active: items.filter(function (i) { return i.status === 'active'; }).length,
        outOfStock: items.filter(function (i) { return i.status === 'out_of_stock'; }).length,
        featured: items.filter(function (i) { return i.featured; }).length
      },
      searchQuery: '',
      categoryFilter: 'All',
      statusFilter: 'All',
      sortBy: preferences.sortBy || 'updatedAt',
      items: items,
      preferences: preferences,
      activity: deepClone(initialData.activity || [])
    };

    var listeners = [];

    function persist() {
      var itemResult = storage.saveItems(state.items);
      var prefResult = storage.savePreferences(state.preferences);
      if (!itemResult.ok || !prefResult.ok) {
        state.storageStatus = 'error';
        state.lastError = (itemResult.error || prefResult.error || 'Persistence failed');
      } else {
        state.storageStatus = 'saved';
      }
    }

    function recomputeCounts() {
      state.counts.total = state.items.length;
      state.counts.active = state.items.filter(function (i) { return i.status === 'active'; }).length;
      state.counts.outOfStock = state.items.filter(function (i) { return i.status === 'out_of_stock'; }).length;
      state.counts.featured = state.items.filter(function (i) { return i.featured; }).length;
    }

    function filteredItems() {
      return state.items.filter(function (item) {
        var matchesSearch = !state.searchQuery ||
          item.name.toLowerCase().indexOf(state.searchQuery.toLowerCase()) !== -1 ||
          item.description.toLowerCase().indexOf(state.searchQuery.toLowerCase()) !== -1;
        var matchesCategory = state.categoryFilter === 'All' || item.category === state.categoryFilter;
        var matchesStatus = state.statusFilter === 'All' || item.status === state.statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      }).sort(function (a, b) {
        if (state.sortBy === 'price') return a.price - b.price;
        if (state.sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
    }

    function setSurface(surfaceId) {
      state.activeSurface = surfaceId;
      state.activePanel = 'list';
      if (surfaceId !== 'SURF_ITEM_EDITOR') {
        state.editingItem = null;
      }
      notify();
    }

    function selectItem(itemId) {
      var found = state.items.find(function (i) { return i.id === itemId; }) || null;
      state.selectedItem = found;
      notify();
    }

    function editItem(itemId) {
      var found = state.items.find(function (i) { return i.id === itemId; }) || null;
      state.editingItem = found ? deepClone(found) : createBlankItem();
      state.activeSurface = 'SURF_ITEM_EDITOR';
      state.activePanel = 'form';
      notify();
    }

    function createNewItem() {
      state.editingItem = createBlankItem();
      state.selectedItem = null;
      state.activeSurface = 'SURF_ITEM_EDITOR';
      state.activePanel = 'form';
      notify();
    }

    function createBlankItem() {
      return {
        id: 'new-' + Date.now(),
        name: '',
        category: 'Bakery',
        price: 0,
        description: '',
        stock: 0,
        featured: false,
        status: 'active',
        updatedAt: new Date().toISOString()
      };
    }

    function updateEditingItem(patch) {
      if (!state.editingItem) return;
      Object.keys(patch).forEach(function (key) {
        state.editingItem[key] = patch[key];
      });
      notify();
    }

    function validateItem(item) {
      var errors = [];
      if (!item.name || item.name.trim().length === 0) errors.push('Name is required');
      if (item.price === '' || isNaN(Number(item.price)) || Number(item.price) < 0) errors.push('Price must be a non-negative number');
      if (item.stock === '' || isNaN(Number(item.stock)) || Number(item.stock) < 0) errors.push('Stock must be a non-negative number');
      return errors;
    }

    function saveEditingItem() {
      if (!state.editingItem) return { ok: false, errors: ['No item being edited'] };
      var errors = validateItem(state.editingItem);
      if (errors.length) return { ok: false, errors: errors };

      var item = deepClone(state.editingItem);
      item.price = Number(item.price);
      item.stock = Number(item.stock);
      item.updatedAt = new Date().toISOString();

      var existingIndex = state.items.findIndex(function (i) { return i.id === item.id; });
      if (existingIndex >= 0) {
        state.items[existingIndex] = item;
      } else {
        item.id = 'item-' + Date.now();
        state.items.unshift(item);
      }
      recomputeCounts();
      state.selectedItem = item;
      state.editingItem = null;
      state.activeSurface = 'SURF_ITEM_OPERATIONS';
      state.activePanel = 'list';
      state.lastError = null;
      persist();
      notify();
      return { ok: true };
    }

    function cancelEdit() {
      state.editingItem = null;
      state.activeSurface = 'SURF_ITEM_OPERATIONS';
      state.activePanel = 'list';
      state.lastError = null;
      notify();
    }

    function deleteItem(itemId) {
      state.items = state.items.filter(function (i) { return i.id !== itemId; });
      if (state.selectedItem && state.selectedItem.id === itemId) state.selectedItem = null;
      recomputeCounts();
      persist();
      notify();
    }

    function setSearch(query) {
      state.searchQuery = query;
      notify();
    }

    function setCategoryFilter(value) {
      state.categoryFilter = value;
      notify();
    }

    function setStatusFilter(value) {
      state.statusFilter = value;
      notify();
    }

    function setSortBy(value) {
      state.sortBy = value;
      state.preferences.sortBy = value;
      persist();
      notify();
    }

    function setActivePanel(panel) {
      state.activePanel = panel;
      notify();
    }

    function clearError() {
      state.lastError = null;
      notify();
    }

    function recoverFromCorruption(message) {
      state.lastError = message;
      state.storageStatus = 'recovered';
      persist();
      notify();
    }

    function notify() {
      var snapshot = getState();
      listeners.forEach(function (cb) {
        try { cb(snapshot); } catch (_) {}
      });
    }

    function subscribe(callback) {
      listeners.push(callback);
      return function unsubscribe() {
        var idx = listeners.indexOf(callback);
        if (idx >= 0) listeners.splice(idx, 1);
      };
    }

    function getState() {
      return deepClone(state);
    }

    function setState(patch) {
      Object.keys(patch).forEach(function (key) {
        state[key] = patch[key];
      });
      recomputeCounts();
      notify();
    }

    return {
      getState: getState,
      setState: setState,
      subscribe: subscribe,
      filteredItems: filteredItems,
      actions: {
        setSurface: setSurface,
        selectItem: selectItem,
        editItem: editItem,
        createNewItem: createNewItem,
        updateEditingItem: updateEditingItem,
        saveEditingItem: saveEditingItem,
        cancelEdit: cancelEdit,
        deleteItem: deleteItem,
        setSearch: setSearch,
        setCategoryFilter: setCategoryFilter,
        setStatusFilter: setStatusFilter,
        setSortBy: setSortBy,
        setActivePanel: setActivePanel,
        clearError: clearError,
        recoverFromCorruption: recoverFromCorruption
      }
    };
  }

  global.__KOZMAYE_STATE__ = { create: createState };
})(window);
