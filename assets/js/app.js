(function () {
  'use strict';

  var state;
  var root;
  var unsubscribe;

  var SURFACES = {
    OPERATIONS: 'SURF_ITEM_OPERATIONS',
    EDITOR: 'SURF_ITEM_EDITOR',
    INSIGHTS: 'SURF_INSIGHTS'
  };

  var ICONS = {
    notifications: '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    account_circle: '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 18a5 5 0 0 1 10 0"/></svg>',
    arrow_back: '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>',
    more_horiz: '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>',
    dashboard: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
    inventory_2: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12 20.7 7"/><path d="M12 22V12"/></svg>',
    insights: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    settings: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.14a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
    logout: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
    search: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    filter: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    export: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    review: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    add: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    save: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    cancel: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    check: '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  function icon(name) {
    return ICONS[name] || '';
  }

  function readFixtureData() {
    try {
      var el = document.getElementById('fixture-data');
      if (el && el.textContent) {
        return JSON.parse(el.textContent);
      }
    } catch (err) {
      console.warn('Fixture data parse failed, using empty data', err);
    }
    return { items: [], categories: [], activity: [], preferences: {} };
  }

  function mergePersistedData(fixture, storage) {
    var itemsResult = storage.loadItems();
    var prefResult = storage.loadPreferences();
    var lastError = null;
    var storageStatus = 'ready';

    var items = fixture.items || [];
    var preferences = Object.assign({}, fixture.preferences || {});

    if (!itemsResult.ok) {
      lastError = itemsResult.error;
      storageStatus = 'recovered';
      storage.reset();
    } else if (itemsResult.data) {
      items = itemsResult.data;
      storageStatus = 'loaded';
    }

    if (!prefResult.ok) {
      lastError = lastError || prefResult.error;
      storageStatus = storageStatus === 'loaded' ? 'recovered' : storageStatus;
      window.localStorage.removeItem(storage.keys.PREFERENCES);
    } else if (prefResult.data) {
      preferences = Object.assign(preferences, prefResult.data);
    }

    return {
      items: items,
      categories: fixture.categories || [],
      activity: fixture.activity || [],
      preferences: preferences,
      storageStatus: storageStatus,
      lastError: lastError
    };
  }

  function init() {
    root = document.querySelector('[data-setfarm-root]');
    if (!root) root = document.body;

    var fixture = readFixtureData();
    var storage = window.__KOZMAYE_STORAGE__;
    var initial = mergePersistedData(fixture, storage);

    state = window.__KOZMAYE_STATE__.create(initial, storage);
    if (initial.storageStatus) state.setState({ storageStatus: initial.storageStatus });
    if (initial.lastError) state.setState({ lastError: initial.lastError });

    window.app = {
      state: state.getState,
      actions: state.actions,
      filteredItems: state.filteredItems,
      version: '1.0.0',
      ready: true
    };

    render();
    if (unsubscribe) unsubscribe();
    unsubscribe = state.subscribe(function () {
      render();
    });

    window.setfarmStaticReady = true;
  }

  function render() {
    var s = state.getState();
    root.innerHTML = '';
    root.appendChild(buildShell(s));
  }

  function buildShell(s) {
    var shell = el('div', { className: 'app-layout' });
    shell.appendChild(buildHeader(s));
    shell.appendChild(buildBody(s));
    shell.appendChild(buildFooter(s));
    return shell;
  }

  function buildHeader(s) {
    var header = el('header', { className: 'app-header' });
    var brand = el('div', { className: 'app-brand' }, 'Köz & Maye');

    var topNav = el('nav', { className: 'app-top-nav', 'aria-label': 'Primary' });
    topNav.appendChild(navLink('Operations', SURFACES.OPERATIONS, s.activeSurface === SURFACES.OPERATIONS, false));
    topNav.appendChild(navLink('Editor', SURFACES.EDITOR, s.activeSurface === SURFACES.EDITOR, true));
    topNav.appendChild(navLink('Insights', SURFACES.INSIGHTS, s.activeSurface === SURFACES.INSIGHTS, false));

    var actions = el('div', { className: 'app-header-actions' });
    actions.appendChild(iconButton('notifications', 'Notifications', 'ACT_OPEN_NOTIFICATIONS'));
    actions.appendChild(iconButton('account_circle', 'Account', 'ACT_OPEN_ACCOUNT'));

    header.appendChild(brand);
    header.appendChild(topNav);
    header.appendChild(actions);
    return header;
  }

  function navLink(label, surfaceId, active, opensEditor) {
    var a = el('a', {
      className: 'app-nav-link' + (active ? ' is-active' : ''),
      href: '#',
      'data-action-id': 'ACT_NAVIGATE_' + surfaceId
    }, label);
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (opensEditor) {
        state.actions.createNewItem();
      } else {
        state.actions.setSurface(surfaceId);
      }
    });
    return a;
  }

  function iconButton(iconName, ariaLabel, actionId) {
    var btn = el('button', {
      type: 'button',
      className: 'icon-button',
      'aria-label': ariaLabel,
      'data-action-id': actionId || ''
    });
    btn.innerHTML = icon(iconName);
    btn.addEventListener('click', function () {
      state.actions.setActivePanel('notifications');
    });
    return btn;
  }

  function buildBody(s) {
    var body = el('div', { className: 'app-body' });
    var sidebar = buildSidebar(s);
    var main = el('main', { className: 'app-main', 'data-testid': 'setfarm-app-main' });

    if (s.lastError) {
      main.appendChild(buildErrorBanner(s.lastError));
    }

    if (s.activeSurface === SURFACES.OPERATIONS) {
      main.appendChild(buildOperationsSurface(s));
    } else if (s.activeSurface === SURFACES.EDITOR) {
      main.appendChild(buildEditorSurface(s));
    } else if (s.activeSurface === SURFACES.INSIGHTS) {
      main.appendChild(buildInsightsSurface(s));
    } else {
      main.appendChild(buildOperationsSurface(s));
    }

    body.appendChild(sidebar);
    body.appendChild(main);
    return body;
  }

  function buildSidebar(s) {
    var sidebar = el('aside', { className: 'app-sidebar' });
    var nav = el('nav', { className: 'app-sidebar-nav', 'aria-label': 'Secondary' });

    var links = [
      { label: 'dashboard', icon: 'dashboard', surface: SURFACES.OPERATIONS },
      { label: 'Inventory', icon: 'inventory_2', surface: SURFACES.OPERATIONS },
      { label: 'Schedule', icon: 'insights', surface: SURFACES.INSIGHTS },
      { label: 'Clients', icon: 'account_circle', surface: SURFACES.OPERATIONS },
      { label: 'settings', icon: 'settings', surface: SURFACES.OPERATIONS },
      { label: 'Support', icon: 'review', surface: SURFACES.OPERATIONS },
      { label: 'logout', icon: 'logout', surface: SURFACES.OPERATIONS }
    ];

    links.forEach(function (link) {
      var a = el('a', {
        className: 'app-sidebar-link',
        href: '#',
        'data-action-id': 'ACT_SIDEBAR_' + link.label.toUpperCase().replace(/\s/g, '_')
      });
      a.innerHTML = icon(link.icon) + '<span>' + escapeHtml(link.label) + '</span>';
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (link.surface && link.surface !== s.activeSurface) {
          state.actions.setSurface(link.surface);
        }
      });
      nav.appendChild(a);
    });

    sidebar.appendChild(nav);
    return sidebar;
  }

  function buildFooter(s) {
    var footer = el('footer', { className: 'app-footer' });
    var links = el('div', { className: 'app-footer-links' });
    ['Privacy Policy', 'Terms of Service', 'Inventory API'].forEach(function (label) {
      var a = el('a', { href: '#', className: 'app-footer-link' }, label);
      a.addEventListener('click', function (e) { e.preventDefault(); });
      links.appendChild(a);
    });
    var status = el('div', { className: 'app-storage-status' }, 'Storage: ' + s.storageStatus);
    footer.appendChild(links);
    footer.appendChild(status);
    return footer;
  }

  function buildErrorBanner(message) {
    var banner = el('div', { className: 'app-error-banner', role: 'alert' });
    banner.textContent = message;
    var close = el('button', { type: 'button', className: 'app-error-close', 'aria-label': 'Dismiss' });
    close.innerHTML = icon('cancel');
    close.addEventListener('click', function () { state.actions.clearError(); });
    banner.appendChild(close);
    return banner;
  }

  function buildOperationsSurface(s) {
    var surface = el('div', { className: 'surface operations-surface', 'data-surface-id': SURFACES.OPERATIONS });

    var toolbar = el('div', { className: 'surface-toolbar' });
    var title = el('h1', { className: 'surface-title' }, 'Item Operations');
    var createBtn = el('button', {
      type: 'button',
      className: 'btn btn-primary',
      'data-action-id': 'ACT_CREATE_RECORD'
    });
    createBtn.innerHTML = icon('add') + '<span>Create New Item</span>';
    createBtn.addEventListener('click', function () { state.actions.createNewItem(); });
    toolbar.appendChild(title);
    toolbar.appendChild(createBtn);

    var filters = el('div', { className: 'filters-row' });
    var searchWrap = el('label', { className: 'search-field' });
    searchWrap.innerHTML = icon('search');
    var searchInput = el('input', {
      type: 'text',
      placeholder: 'Search records...',
      'data-action-id': 'ACT_SEARCH_RECORDS',
      value: s.searchQuery
    });
    searchInput.addEventListener('input', function () { state.actions.setSearch(this.value); });
    searchWrap.appendChild(searchInput);

    var categorySelect = buildSelect('Category', s.categoryFilter, ['All'].concat(s.categories || []), function (val) {
      state.actions.setCategoryFilter(val);
    });
    var statusSelect = buildSelect('Status', s.statusFilter, ['All', 'active', 'out_of_stock'], function (val) {
      state.actions.setStatusFilter(val);
    });

    filters.appendChild(searchWrap);
    filters.appendChild(categorySelect);
    filters.appendChild(statusSelect);

    var list = el('div', { className: 'records-list' });
    var filtered = state.filteredItems();
    if (filtered.length === 0) {
      var empty = el('div', { className: 'empty-state' });
      var retryBtn = el('button', {
        type: 'button',
        className: 'btn btn-secondary',
        'data-action-id': 'ACT_RETRY_LOAD'
      }, 'Retry Load');
      retryBtn.addEventListener('click', function () {
        state.actions.setSearch('');
        state.actions.setCategoryFilter('All');
        state.actions.setStatusFilter('All');
      });
      empty.innerHTML = '<p>No records match your filters.</p>';
      empty.appendChild(retryBtn);
      list.appendChild(empty);
    } else {
      filtered.forEach(function (item) {
        list.appendChild(buildRecordCard(item, s.selectedItem && s.selectedItem.id === item.id));
      });
    }

    var preview = el('div', { className: 'preview-panel' });
    preview.appendChild(buildPreview(s.selectedItem));

    var content = el('div', { className: 'operations-content' });
    content.appendChild(list);
    content.appendChild(preview);

    surface.appendChild(toolbar);
    surface.appendChild(filters);
    surface.appendChild(content);
    return surface;
  }

  function buildRecordCard(item, selected) {
    var card = el('div', {
      className: 'record-card' + (selected ? ' is-selected' : ''),
      'data-record-id': item.id
    });
    var header = el('div', { className: 'record-card-header' });
    var name = el('h3', { className: 'record-name' }, item.name);
    var badge = el('span', { className: 'record-status status-' + item.status }, item.status);
    header.appendChild(name);
    header.appendChild(badge);

    var meta = el('div', { className: 'record-meta' });
    meta.textContent = item.category + ' · $' + formatPrice(item.price) + ' · Stock ' + formatStock(item.stock);

    var actions = el('div', { className: 'record-actions' });
    var editBtn = el('button', {
      type: 'button',
      className: 'btn btn-text',
      'data-action-id': 'ACT_SELECT_RECORD'
    }, 'Edit Item');
    editBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      state.actions.editItem(item.id);
    });
    var moreBtn = el('button', {
      type: 'button',
      className: 'icon-button',
      'aria-label': 'More options',
      'data-action-id': 'ACT_MORE_OPTIONS'
    });
    moreBtn.innerHTML = icon('more_horiz');
    moreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      state.actions.deleteItem(item.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(moreBtn);

    card.appendChild(header);
    card.appendChild(meta);
    card.appendChild(actions);
    card.addEventListener('click', function () { state.actions.selectItem(item.id); });
    return card;
  }

  function buildPreview(item) {
    var panel = el('div', { className: 'item-preview' });
    if (!item) {
      panel.innerHTML = '<p class="empty-preview">Select an item to preview details.</p>';
      return panel;
    }
    panel.innerHTML = '<h2 class="preview-title">' + escapeHtml(item.name) + '</h2>' +
      '<p class="preview-meta">' + escapeHtml(item.category) + ' · $' + formatPrice(item.price) + '</p>' +
      '<p class="preview-description">' + escapeHtml(item.description) + '</p>' +
      '<p class="preview-stock">Stock: ' + formatStock(item.stock) + '</p>';
    return panel;
  }

  function buildEditorSurface(s) {
    var surface = el('div', { className: 'surface editor-surface', 'data-surface-id': SURFACES.EDITOR });
    var item = s.editingItem || { id: 'new-' + Date.now(), name: '', category: 'Bakery', price: 0, description: '', stock: 0, featured: false, status: 'active', updatedAt: new Date().toISOString() };

    var header = el('div', { className: 'surface-toolbar' });
    var backBtn = el('button', {
      type: 'button',
      className: 'icon-button',
      'aria-label': 'Back',
      'data-action-id': 'ACT_BACK_TO_OPERATIONS'
    });
    backBtn.innerHTML = icon('arrow_back');
    backBtn.addEventListener('click', function () { state.actions.cancelEdit(); });
    var title = el('h1', { className: 'surface-title' }, s.editingItem && s.editingItem.name ? 'Edit Item' : 'Create Item');
    header.appendChild(backBtn);
    header.appendChild(title);

    var form = el('form', { className: 'editor-form' });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var result = state.actions.saveEditingItem();
      if (!result.ok) {
        state.setState({ lastError: result.errors.join('; ') });
      }
    });

    form.appendChild(buildTextField('Name', 'name', item.name, 'e.g. Sourdough Boule', 'text'));
    form.appendChild(buildSelectField('Category', 'category', item.category, s.categories || []));
    form.appendChild(buildTextField('Price', 'price', item.price, '0.00', 'number'));
    form.appendChild(buildTextAreaField('Description', 'description', item.description, 'Describe the flavor profile, ingredients, and crafting process...'));
    form.appendChild(buildTextField('Stock', 'stock', item.stock, '', 'number'));
    form.appendChild(buildCheckboxField('Featured', 'featured', item.featured));

    var actions = el('div', { className: 'form-actions' });
    var cancelBtn = el('button', {
      type: 'button',
      className: 'btn btn-secondary',
      'data-action-id': 'ACT_CANCEL_EDIT'
    });
    cancelBtn.innerHTML = icon('cancel') + '<span>Cancel Edit</span>';
    cancelBtn.addEventListener('click', function () { state.actions.cancelEdit(); });
    var saveBtn = el('button', {
      type: 'submit',
      className: 'btn btn-primary',
      'data-action-id': 'ACT_SAVE_RECORD'
    });
    saveBtn.innerHTML = icon('save') + '<span>Save Record</span>';
    var updateImgBtn = el('button', {
      type: 'button',
      className: 'btn btn-text',
      'data-action-id': 'ACT_UPDATE_IMAGE'
    }, 'Update Image');
    updateImgBtn.addEventListener('click', function () { alert('Image upload not implemented in this scope.'); });

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);
    actions.appendChild(updateImgBtn);
    form.appendChild(actions);

    surface.appendChild(header);
    surface.appendChild(form);
    return surface;
  }

  function buildInsightsSurface(s) {
    var surface = el('div', { className: 'surface insights-surface', 'data-surface-id': SURFACES.INSIGHTS });

    var toolbar = el('div', { className: 'surface-toolbar' });
    var title = el('h1', { className: 'surface-title' }, 'Insights');
    var filterBtn = el('button', {
      type: 'button',
      className: 'btn btn-secondary',
      'data-action-id': 'ACT_FILTER_INSIGHTS'
    });
    filterBtn.innerHTML = icon('filter') + '<span>Filter</span>';
    filterBtn.addEventListener('click', function () { state.actions.setActivePanel('filter'); });
    var exportBtn = el('button', {
      type: 'button',
      className: 'btn btn-secondary',
      'data-action-id': 'ACT_EXPORT_SUMMARY'
    });
    exportBtn.innerHTML = icon('export') + '<span>Export Summary</span>';
    exportBtn.addEventListener('click', function () { alert('Summary exported to console.'); console.log(state.getState()); });
    toolbar.appendChild(title);
    toolbar.appendChild(filterBtn);
    toolbar.appendChild(exportBtn);

    var metrics = el('div', { className: 'metrics-row' });
    metrics.appendChild(buildMetricCard('Total Items', s.counts.total));
    metrics.appendChild(buildMetricCard('Active', s.counts.active));
    metrics.appendChild(buildMetricCard('Out of Stock', s.counts.outOfStock));
    metrics.appendChild(buildMetricCard('Featured', s.counts.featured));

    var lower = el('div', { className: 'insights-content' });
    var activityPanel = el('div', { className: 'insights-panel' });
    activityPanel.innerHTML = '<h2 class="panel-title">Recent Activity</h2>';
    var activityList = el('ul', { className: 'activity-list' });
    (s.activity || []).forEach(function (evt) {
      var li = el('li', { className: 'activity-item' });
      li.innerHTML = '<span class="activity-type">' + escapeHtml(evt.type) + '</span>' +
        '<span class="activity-message">' + escapeHtml(evt.message) + '</span>';
      activityList.appendChild(li);
    });
    activityPanel.appendChild(activityList);

    var stockPanel = el('div', { className: 'insights-panel' });
    stockPanel.innerHTML = '<h2 class="panel-title">Stock Follow-up</h2>';
    var reviewBtn = el('button', {
      type: 'button',
      className: 'btn btn-primary',
      'data-action-id': 'ACT_REVIEW_STOCK'
    });
    reviewBtn.innerHTML = icon('review') + '<span>Review Stock</span>';
    reviewBtn.addEventListener('click', function () { state.actions.setSurface(SURFACES.OPERATIONS); });
    var hint = el('p', { className: 'insights-hint' }, 'Items with zero stock need attention.');
    stockPanel.appendChild(hint);
    stockPanel.appendChild(reviewBtn);

    lower.appendChild(activityPanel);
    lower.appendChild(stockPanel);

    surface.appendChild(toolbar);
    surface.appendChild(metrics);
    surface.appendChild(lower);
    return surface;
  }

  function buildMetricCard(label, value) {
    var card = el('div', { className: 'metric-card' });
    var val = el('div', { className: 'metric-value' }, String(value));
    var lbl = el('div', { className: 'metric-label' }, label);
    card.appendChild(val);
    card.appendChild(lbl);
    return card;
  }

  function buildTextField(label, name, value, placeholder, type) {
    var group = el('div', { className: 'form-group' });
    var lbl = el('label', { className: 'form-label', for: 'field-' + name }, label);
    var input = el('input', {
      type: type,
      id: 'field-' + name,
      name: name,
      className: 'form-input',
      placeholder: placeholder || '',
      value: value === undefined || value === null ? '' : value
    });
    input.addEventListener('input', function () {
      var patch = {};
      patch[name] = type === 'number' ? (this.value === '' ? '' : Number(this.value)) : this.value;
      state.actions.updateEditingItem(patch);
    });
    group.appendChild(lbl);
    group.appendChild(input);
    return group;
  }

  function buildSelectField(label, name, value, options) {
    var group = el('div', { className: 'form-group' });
    var lbl = el('label', { className: 'form-label', for: 'field-' + name }, label);
    var select = el('select', { id: 'field-' + name, name: name, className: 'form-input' });
    options.forEach(function (opt) {
      var option = el('option', { value: opt }, opt);
      if (opt === value) option.setAttribute('selected', 'selected');
      select.appendChild(option);
    });
    select.addEventListener('change', function () {
      var patch = {};
      patch[name] = this.value;
      state.actions.updateEditingItem(patch);
    });
    group.appendChild(lbl);
    group.appendChild(select);
    return group;
  }

  function buildTextAreaField(label, name, value, placeholder) {
    var group = el('div', { className: 'form-group' });
    var lbl = el('label', { className: 'form-label', for: 'field-' + name }, label);
    var textarea = el('textarea', {
      id: 'field-' + name,
      name: name,
      className: 'form-input form-textarea',
      placeholder: placeholder || ''
    });
    textarea.value = value || '';
    textarea.addEventListener('input', function () {
      var patch = {};
      patch[name] = this.value;
      state.actions.updateEditingItem(patch);
    });
    group.appendChild(lbl);
    group.appendChild(textarea);
    return group;
  }

  function buildCheckboxField(label, name, checked) {
    var group = el('label', { className: 'checkbox-field' });
    var input = el('input', {
      type: 'checkbox',
      name: name,
      className: 'form-checkbox'
    });
    if (checked) input.setAttribute('checked', 'checked');
    input.addEventListener('change', function () {
      var patch = {};
      patch[name] = this.checked;
      state.actions.updateEditingItem(patch);
    });
    var span = el('span', { className: 'checkbox-label' }, label);
    group.appendChild(input);
    group.appendChild(span);
    return group;
  }

  function buildSelect(label, value, options, onChange) {
    var wrap = el('div', { className: 'filter-select' });
    var lbl = el('label', { className: 'filter-label' }, label);
    var select = el('select', { className: 'form-input' });
    options.forEach(function (opt) {
      var option = el('option', { value: opt }, opt);
      if (opt === value) option.setAttribute('selected', 'selected');
      select.appendChild(option);
    });
    select.addEventListener('change', function () { onChange(this.value); });
    wrap.appendChild(lbl);
    wrap.appendChild(select);
    return wrap;
  }

  function el(tag, attrs, text) {
    var element = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === 'className') {
          element.className = attrs[key];
        } else if (key === 'textContent') {
          element.textContent = attrs[key];
        } else {
          element.setAttribute(key, attrs[key]);
        }
      });
    }
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function formatPrice(value) {
    if (value === null || value === undefined || value === '') return '0.00';
    var num = Number(value);
    if (isNaN(num)) return '0.00';
    return num.toFixed(2);
  }

  function formatStock(value) {
    if (value === null || value === undefined || value === '') return '0';
    var num = Number(value);
    if (isNaN(num)) return '0';
    return String(num);
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
