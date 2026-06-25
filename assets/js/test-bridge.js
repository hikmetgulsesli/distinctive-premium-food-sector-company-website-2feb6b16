window.__SETFARM_TEST_BRIDGE__ = {
  stack: 'static-html',
  ready: true,
  version: '1.0.0'
};

window.addEventListener('load', function () {
  if (window.app && typeof window.app.state === 'function') {
    window.__SETFARM_TEST_BRIDGE__.appReady = true;
    window.__SETFARM_TEST_BRIDGE__.appState = window.app.state();
  }
});
