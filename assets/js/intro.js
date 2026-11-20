/* =========================================================
   LOAD SCREEN
   Covers the page while it arrives: name centred, a counter low
   on the screen. At 100 the panel drops like a curtain and the
   page settles in behind it. Plays once per tab (sessionStorage),
   so moving between pages in the same visit skips it.
   ========================================================= */
(function () {
  'use strict';
  var root = document.documentElement;
  var loader = document.getElementById('loader');
  var count = document.getElementById('loaderCount');
  if (!root.classList.contains('intro') || !loader) { if (loader) loader.remove(); return; }

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MIN = REDUCED ? 200 : 1700;
  var jumpTo = location.hash.length > 1 ? location.hash : '';

  // a reload would otherwise restore an old scroll position under the curtain
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // "ready" = markup + fonts, with a ceiling so the curtain always lifts
  var loaded = false;
  var ready = function () { loaded = true; };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready);
  window.addEventListener('load', ready);
  setTimeout(ready, 4000);

  // block scroll inputs while the curtain is up (iOS ignores overflow alone)
  var KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
  var stop = function (e) {
    if (root.classList.contains('intro-done')) return;
    if (e.type === 'keydown' && KEYS.indexOf(e.key) === -1) return;
    e.preventDefault();
  };
  window.addEventListener('wheel', stop, { passive: false });
  window.addEventListener('touchmove', stop, { passive: false });
  window.addEventListener('keydown', stop);

  function reveal() {
    try { sessionStorage.setItem('aa-intro-seen', '1'); } catch (e) {}
    count.textContent = '100';
    loader.classList.add('done');
    root.classList.add('intro-done');
    window.scrollTo(0, 0);
    if (jumpTo) {
      var t = document.querySelector(jumpTo);
      if (t) requestAnimationFrame(function () { t.scrollIntoView({ behavior: 'instant', block: 'start' }); });
    }
    document.dispatchEvent(new CustomEvent('intro:done'));
    loader.addEventListener('transitionend', function () { loader.remove(); }, { once: true });
    setTimeout(function () { if (loader.parentNode) loader.remove(); }, 1400);
  }

  var t0 = performance.now(), shown = 0;
  function tick(now) {
    var t = Math.min(1, (now - t0) / MIN);
    var target = Math.round((1 - Math.pow(1 - t, 3)) * 100);
    if (!loaded) target = Math.min(target, 99);   // hold at 99 until the page is really there
    if (target > shown) { shown = target; count.textContent = String(shown); }
    if (shown >= 100) { setTimeout(reveal, 250); return; }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
