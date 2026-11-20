(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var MEDIA = window.SITE_MEDIA || { selected: [], works: [] };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // run fn once the load screen has lifted (or straight away if it isn't showing)
  function whenIntroDone(fn) {
    var r = document.documentElement;
    if (!r.classList.contains('intro') || r.classList.contains('intro-done')) fn();
    else document.addEventListener('intro:done', fn, { once: true });
  }
  var LINKEDIN = 'https://www.linkedin.com/in/abraham-akinbote-253707260/';

  /* Portfolio categories (order = tab order) */
  var CATS = [
    { id: 'brand',   label: 'Brand identity',  blurb: 'Logos, brand boards and identity systems.' },
    { id: 'web',     label: 'Websites',        blurb: 'Responsive websites designed and built for clients.' },
    { id: 'social',  label: 'Social media',    blurb: 'Campaign graphics, carousels and paid-ad creatives.' },
    { id: 'motion',  label: 'Motion & video',  blurb: 'Motion graphics, short-form edits and video ads.' },
    { id: 'graphic', label: 'Graphic design',  blurb: 'Flyers, event artwork, print and stationery.' }
  ];
  function catById(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; return null; }

  /* ---------- CV data ---------- */
  var SKILLS = [
    { name: 'Graphic Design',          level: 'Advanced',   pct: 92, cat: 'graphic', tint: '#ece6fb', ink: '#6b4fd8',
      desc: 'Campaign artwork, flyers and promotional materials with a clear visual message.',
      icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>' },
    { name: 'Brand Identity & Strategy', level: 'Advanced', pct: 92, cat: 'brand',   tint: '#e3eafc', ink: '#3f5bb5',
      desc: 'Cohesive identities and brand assets that communicate personality and positioning.',
      icon: '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>' },
    { name: 'Social Media Design',     level: 'Advanced',   pct: 92, cat: 'social',  tint: '#fbe4ee', ink: '#c03d78',
      desc: 'Scroll-stopping campaign content that stays consistent across platforms.',
      icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>' },
    { name: 'UI / UX Design',          level: 'Advanced',   pct: 90, cat: 'web',     tint: '#e0f1fb', ink: '#1f7fb3',
      desc: 'Intuitive interfaces with clear structure, hierarchy and flow.',
      icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/><path d="M8 21h8"/>' },
    { name: 'Web Design & Dev',        level: 'Proficient', pct: 76, cat: 'web',     tint: '#e0f4ec', ink: '#1f8a5c',
      desc: 'Modern, responsive websites designed and built to grow with the brand.',
      icon: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>' },
    { name: 'Motion Graphics & Video', level: 'Proficient', pct: 76, cat: 'motion',  tint: '#fdeadf', ink: '#c75d22',
      desc: 'Motion content and short-form video for campaigns and promotions.',
      icon: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3"/>' },
    { name: 'Paid Ads & Marketing',    level: 'Proficient', pct: 76, cat: 'social',  tint: '#fbf2d9', ink: '#a27a0c',
      desc: 'Paid campaigns on Meta and TikTok that support brand growth.',
      icon: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>' },
    { name: 'AI-Assisted Workflows',   level: 'Proficient', pct: 76, cat: null,      tint: '#e8eaf0', ink: '#4a5060',
      desc: 'Using AI tools to research, design and ship faster without losing craft.',
      icon: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>' }
  ];

  // Edit this list to match the tools you actually use.
  var ICON_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';
  var TOOLS = [
    ['Photoshop', 'adobephotoshop'], ['Illustrator', 'adobeillustrator'], ['After Effects', 'adobeaftereffects'],
    ['Premiere Pro', 'adobepremierepro'], ['Figma', 'figma'], ['Canva', 'canva'], ['Framer', 'framer'],
    ['Claude', 'claude'], ['ChatGPT', 'openai'], ['Meta Ads', 'meta'], ['TikTok Ads', 'tiktok'], ['n8n', 'n8n'], ['HubSpot', 'hubspot'], ['Notion', 'notion']
  ];

  var EXPERIENCE = [
    { name: 'Morgan Oxford', role: 'Brand Designer & Digital Marketer', when: 'Dec 2025 to Oct 2026', loc: 'United Kingdom', logo: 'morgan-oxford', points: [
      'Built a cohesive visual identity and brand assets that communicate the company’s personality and positioning.',
      'Produced digital marketing content for social media and promotional campaigns, consistent across platforms.',
      'Created and managed paid advertising campaigns on Meta and TikTok to support brand growth.'] },
    { name: 'AkawoPay', role: 'Social Media & Motion Designer', when: 'Feb 2025 to Dec 2025', logo: 'akawopay', points: [
      'Created social media graphics and motion content for campaigns and promotions.',
      'Communicated financial and brand messages clearly with a consistent visual style across platforms.'] },
    { name: 'TravelDeer', role: 'Graphic Designer', when: 'Jan 2024 to Feb 2025', logo: 'traveldeer', points: [
      'Designed graphics, social media content and promotional materials for travel marketing campaigns.',
      'Developed creative concepts that communicate travel experiences and services effectively.'] },
    { name: 'Quill Audit', role: 'Quill Advocate', when: 'Jul 2023 to Jan 2024', logo: 'quill-audit', points: [
      'Represented and promoted the Quill brand, products and initiatives across digital communities.',
      'Engaged online communities and helped strengthen brand visibility.'] },
    { name: 'Kiem Travels', role: 'Brand Designer & Digital Marketer', when: 'Contract', logo: 'kiem-travels', points: [
      'Developed the brand identity, created campaign content and managed paid ads on Meta and TikTok.'] },
    { name: 'Jetsoft Travels', role: 'Brand Designer & Digital Marketer', when: 'Contract', logo: null, points: [
      'Developed the brand identity, produced social content and managed paid ads on Meta and TikTok.'] },
    { name: 'K Jibson Travels', role: 'Brand Designer & Web Designer', when: 'Contract', logo: 'kjibson-travels', points: [
      'Created the brand identity and a modern, user-friendly website that improved brand visibility.'] },
    { name: 'D’elis Beauty', role: 'Brand Identity Designer & Web Designer', when: 'Contract', loc: 'USA', logo: 'delis-beauty', points: [
      'Delivered a complete visual identity, a polished website and cohesive brand assets.'] },
    { name: 'The Signature Events & Co.', role: 'Brand Designer', when: 'Contract', logo: 'signature-events', points: [
      'Developed a refined visual identity and branded marketing materials for events and campaigns.'] },
    { name: 'Elite Savers', role: 'Social Media Designer', when: 'Contract', logo: 'elite-savers', points: [
      'Designed social media graphics that communicate financial and brand messages clearly.'] },
    { name: 'Hariikestyles', role: 'Web Designer & Developer', when: 'Contract', logo: 'hariikestyles', points: [
      'Designed and built responsive web interfaces that improved usability and brand presentation.'] },
    { name: 'The Forever Church', role: 'Graphic Designer', when: 'Contract', logo: 'forever-church', points: [
      'Designed event and programme materials with a consistent, professional visual identity.'] },
    { name: 'Christ the Solution Ministry', role: 'Graphic & Web Designer', when: 'Contract', loc: 'Ireland', logo: 'christ-the-solution', points: [
      'Designed promotional materials and maintained web experiences reflecting the ministry’s identity.'] },
    { name: 'Infinity Prime', role: 'Brand Identity & Social Media Designer', when: 'Contract', logo: 'infinity-prime', points: [
      'Created a complete visual identity and cohesive digital assets for the real estate company.'] },
    { name: 'Keyvah Beauty', role: 'Graphic Designer', when: 'Contract', logo: 'keyvah-beauty', points: [
      'Created beauty-focused campaign graphics aligned with the brand’s identity and audience.'] },
    { name: 'Zew Initiative', role: 'Web Designer', when: 'Contract', logo: 'zew-initiative', points: [
      'Translated brand requirements into responsive layouts with clearer structure and hierarchy.'] },
    { name: 'NK Kreativity Concept', role: 'Graphic Designer', when: 'Part-time', logo: 'nk-kreativity', points: [
      'Created visual designs and promotional materials for brands, working directly with clients.'] }
  ];
  var EXP_VISIBLE = 6;

  /* ---------- helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function initials(name) {
    return name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }
  function logoHTML(x, size) {
    return x.logo
      ? '<img class="logo-tile" src="assets/img/logos/' + x.logo + '.png" alt="" width="' + size + '" height="' + size + '" loading="lazy">'
      : '<span class="initials" aria-hidden="true">' + initials(x.name) + '</span>';
  }

  /* Cloudinary: add automatic format/quality and a target width */
  function cld(url, width) {
    if (!url || url.indexOf('res.cloudinary.com') === -1 || url.indexOf('/upload/') === -1) return url;
    return url.replace('/upload/', '/upload/f_auto,q_auto' + (width ? ',w_' + width : '') + '/');
  }

  var ICONS = {
    image: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>',
    video: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3"/></svg>',
    website: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8Z"/></svg>',
    out: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4m0 0H5.5M12 4v6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };
  var TYPE_LABEL = { image: 'Image', video: 'Video', website: 'Website' };

  function placeholderHTML(item) {
    return '<div class="ph">' + (ICONS[item.type] || ICONS.image) +
      '<b>' + esc(item.client) + '</b><small>' + TYPE_LABEL[item.type || 'image'] + ' coming soon</small></div>';
  }

  // inner HTML for a media tile; width = thumbnail width requested from Cloudinary
  function mediaInner(item, width) {
    var cat = catById(item.cat);
    var tag = '<span class="type-tag">' + esc(cat ? cat.label : TYPE_LABEL[item.type]) + '</span>';
    if (!item.src) return tag + placeholderHTML(item);
    if (item.type === 'video') {
      return tag + '<video muted loop playsinline preload="metadata"' + (item.poster ? ' poster="' + esc(cld(item.poster, width)) + '"' : '') +
        ' src="' + esc(cld(item.src, width * 2)) + '"></video><span class="play-badge">' + ICONS.play + '</span>';
    }
    var html = tag + '<img src="' + esc(cld(item.src, width)) + '" alt="' + esc(item.client + ': ' + item.title) + '" loading="lazy" decoding="async">';
    return html;
  }

  // A media tile. Returns the element to insert; attach the preview click to card._hit
  // (for websites with a live link the tile is a wrapper holding the preview button
  // plus a "View live website" link, since a link can't sit inside a button).
  function mediaCard(item, tagName, extraClass) {
    var live = item.type === 'website' && item.href;
    var hit = el(tagName || 'button', { 'class': live ? 'card-hit' : (extraClass || ''), 'data-type': item.type || 'image' });
    if (hit.tagName === 'BUTTON') { hit.type = 'button'; hit.setAttribute('aria-label', 'View ' + item.client + ': ' + item.title); }
    hit.innerHTML = '<div class="slide-media">' + mediaInner(item, 640) + '</div>' +
      '<div class="slide-info"><h3>' + esc(item.title) + '</h3><p>' + esc(item.client) + '</p></div>';
    // videos preview on hover
    var v = $('video', hit);
    if (v) {
      hit.addEventListener('mouseenter', function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
      hit.addEventListener('mouseleave', function () { v.pause(); });
    }
    if (!live) { hit._hit = hit; return hit; }
    var wrap = el('div', { 'class': (extraClass || '') + ' has-live', 'data-type': 'website' });
    wrap.appendChild(hit);
    wrap.appendChild(liveLink(item));
    wrap._hit = hit;
    return wrap;
  }
  function liveLink(item, extra) {
    var a = el('a', { 'class': 'live-btn' + (extra ? ' ' + extra : ''), href: item.href, target: '_blank', rel: 'noopener',
      'aria-label': 'View the live ' + item.client + ' website (opens in a new tab)' });
    a.innerHTML = 'View live website ' + ICONS.out;
    return a;
  }

  /* ---------- header: scrolled state + mobile menu ---------- */
  var header = $('.site-header');
  var nav = $('#siteNav');
  var menuToggle = $('#menuToggle');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('is-locked', open);
  }
  menuToggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuToggle.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

  if ('IntersectionObserver' in window) {
    var links = $$('.nav a[href^="#"]');
    if (links.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) { l.classList.toggle('is-current', l.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['about', 'work', 'skills', 'experience', 'contact'].forEach(function (id) {
        var s = document.getElementById(id); if (s) spy.observe(s);
      });
    }
  }

  /* ---------- CV menus (header + contact): view or download ---------- */
  $$('.cv-menu').forEach(function (menu) {
    var btn = $('.cv-btn', menu), items = $$('[role="menuitem"]', menu);
    var set = function (open, focusFirst) {
      menu.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open && focusFirst) items[0].focus();
    };
    btn.addEventListener('click', function () { set(!menu.classList.contains('is-open')); });
    btn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); set(true, true); } });
    items.forEach(function (a, i) {
      a.addEventListener('click', function () { set(false); });
      a.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); }
      });
    });
    document.addEventListener('click', function (e) { if (!menu.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { set(false); btn.focus(); }
    });
  });

  /* ---------- lightbox (shared) ---------- */
  var lightbox = $('#lightbox');
  var lb = { list: [], i: 0, trigger: null };
  function lbShow(i) {
    var n = lb.list.length;
    lb.i = (i + n) % n;
    var item = lb.list[lb.i];
    var stage = $('#lbStage');
    if (!item.src) stage.innerHTML = placeholderHTML(item);
    else if (item.type === 'video') stage.innerHTML = '<video controls autoplay playsinline' + (item.poster ? ' poster="' + esc(cld(item.poster, 1600)) + '"' : '') + ' src="' + esc(cld(item.src)) + '"></video>';
    else stage.innerHTML = '<img src="' + esc(cld(item.src, 1800)) + '" alt="' + esc(item.client + ': ' + item.title) + '">';
    $('#lbTitle').textContent = item.client + ': ' + item.title;
    var lbLive = $('#lbLive');
    if (lbLive) { lbLive.innerHTML = ''; if (item.type === 'website' && item.href) lbLive.appendChild(liveLink(item, 'live-btn-light')); }
    $('#lbCount').textContent = String(lb.i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
  }
  function lbOpen(list, i, trigger) {
    lb.list = list.slice();
    if (!lb.list.length) return;
    var target = list[i];
    lb.trigger = trigger;
    lbShow(Math.max(0, lb.list.indexOf(target)));
    lightbox.showModal();
    document.body.classList.add('is-locked');
  }
  if (lightbox) {
    lightbox.addEventListener('close', function () {
      $('#lbStage').innerHTML = '';     // stops any playing video
      document.body.classList.remove('is-locked');
      if (lb.trigger) lb.trigger.focus();
    });
    $('#lbClose').addEventListener('click', function () { lightbox.close(); });
    $('#lbPrev').addEventListener('click', function () { lbShow(lb.i - 1); });
    $('#lbNext').addEventListener('click', function () { lbShow(lb.i + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') lbShow(lb.i + 1);
      if (e.key === 'ArrowLeft') lbShow(lb.i - 1);
    });
    var tx = null;
    lightbox.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) lbShow(lb.i + (dx < 0 ? 1 : -1));
      tx = null;
    });
  }

  /* ---------- local time (Kragujevac) ---------- */
  var clock = $('#localTime');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Belgrade', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- work wheel in the hero ---------- */
  var zone = $('#wheelZone'), hub = $('#wheelHub'), disc = $('#wheelDisc');
  if (zone && disc) {
    var wItems = (MEDIA.reel || []).filter(function (x) { return x.src; });
    var W = { cardW: 340, cardH: 255, gap: 46, speed: 58, rimTop: 150, zoneH: 420 };
    var wScale = function () { return Math.min(1, Math.max(0.55, (window.innerWidth - 120) / 1320)); };
    var solve = function () {
      var s = wScale(), half = Math.PI / wSlots.length;
      W.w = W.cardW * s; W.h = W.cardH * s;
      W.r = (W.w * Math.cos(half) + W.h * Math.sin(half) + W.gap * s) / (2 * Math.sin(half));
      W.spin = (2 * Math.PI * W.r) / (W.speed * s);   // seconds per turn, same rim speed at any size
      return s;
    };
    var posterOf = function (url) { return url.replace('/upload/', '/upload/so_2,f_auto,q_auto,w_700/').replace(/\.\w+$/, '.jpg'); };
    var held = new Set(), wVideos = [];
    // repeat the set round the rim so the disc is big and the arc gentle
    var wSlots = [];
    while (wItems.length && wSlots.length < 32) wSlots = wSlots.concat(wItems);

    wSlots.forEach(function (item, n) {
      var i = n % wItems.length;
      var c = el('button', { 'class': 'wcard', type: 'button', 'aria-label': 'View ' + item.client + ': ' + item.title });
      var cap = '<figcaption><b>' + esc(item.client) + '</b>' + esc(item.title) + '</figcaption>';
      if (item.type === 'video') {
        c.innerHTML = '<div class="wcard-in"><video muted loop playsinline preload="none" poster="' + esc(item.poster ? cld(item.poster, 700) : posterOf(item.src)) +
          '" src="' + esc(cld(item.src, 800)) + '"></video><span class="play-badge">' + ICONS.play + '</span>' + cap + '</div>';
        wVideos.push($('video', c));
      } else {
        c.innerHTML = '<div class="wcard-in"><img src="' + esc(cld(item.src, 700)) + '" alt="" loading="lazy" decoding="async">' + cap + '</div>';
      }
      c.addEventListener('click', function () { lbOpen(wItems, i, c); });
      // hovering a card eases the wheel to a stop (pointer devices only)
      c.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch' && window.innerWidth > 640) held.add(c); });
      c.addEventListener('pointerleave', function () { held.delete(c); });
      c.addEventListener('focus', function () { held.add(c); });
      c.addEventListener('blur', function () { held.delete(c); });
      disc.appendChild(c);
    });

    var fit = function () {
      var s = solve();
      // phones: hub sits above, cards ride the bottom of the rim so the arc curves up
      W.flip = window.innerWidth <= 640;
      zone.classList.toggle('is-flip', W.flip);
      var zh = (W.flip ? 330 : W.zoneH) * s;
      zone.style.height = zh + 'px';
      hub.style.top = (W.flip ? zh - W.rimTop * s - W.r : W.rimTop * s + W.r) + 'px';
      $$('.wcard', disc).forEach(function (c, i) {
        c.style.width = W.w + 'px'; c.style.height = W.h + 'px';
        c.style.transform = 'rotate(' + (i / wSlots.length) * 360 + 'deg) translateY(' + (W.flip ? W.r : -W.r) + 'px) translate(-50%, -50%)';
      });
    };
    fit();
    window.addEventListener('resize', function () { fit(); if (window.innerWidth <= 640) held.clear(); });

    if (!reduceMotion && wSlots.length) {
      var angle = 0, rate = 1, last = performance.now(), EASE = 0.28;
      var turn = function (now) {
        var dt = Math.min(0.05, (now - last) / 1000); last = now;
        rate += ((held.size ? 0 : 1) - rate) * (1 - Math.exp(-dt / EASE));   // smooth slow-down / speed-up
        angle += (W.flip ? 1 : -1) * (360 / W.spin) * dt * rate;   // cards always travel right to left
        disc.style.transform = 'rotate(' + angle + 'deg)';
        requestAnimationFrame(turn);
      };
      requestAnimationFrame(turn);
    }

    // videos only play while the wheel is on screen
    if ('IntersectionObserver' in window && !reduceMotion) {
      new IntersectionObserver(function (en) {
        wVideos.forEach(function (v) { if (en[0].isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
      }).observe(zone);
    }
  }

  /* ---------- selected work slider ---------- */
  var slider = $('#workSlider');
  if (slider) {
    var selected = MEDIA.selected || [];
    selected.forEach(function (item, i) {
      var s = mediaCard(item, 'button', 'slide');
      s.setAttribute('aria-roledescription', 'slide');
      if (s._hit.tagName === 'BUTTON') s._hit.addEventListener('click', function () { if (!dragMoved) lbOpen(selected, i, s._hit); });
      slider.appendChild(s);
    });

    var progress = $('#slideProgress');
    function step() { var s = $('.slide', slider); return s ? s.getBoundingClientRect().width + parseFloat(getComputedStyle(slider).columnGap || 16) : 300; }
    function atEnd() { return slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 4; }
    function go(dir) {
      if (dir > 0 && atEnd()) slider.scrollTo({ left: 0 });
      else if (dir < 0 && slider.scrollLeft <= 4) slider.scrollTo({ left: slider.scrollWidth });
      else slider.scrollBy({ left: dir * step() });
    }
    $('#slideNext').addEventListener('click', function () { go(1); restart(); });
    $('#slidePrev').addEventListener('click', function () { go(-1); restart(); });
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); restart(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); restart(); }
    });
    slider.addEventListener('scroll', function () {
      var max = slider.scrollWidth - slider.clientWidth;
      progress.style.width = (max > 0 ? Math.max(8, slider.scrollLeft / max * 100) : 100) + '%';
    }, { passive: true });
    progress.style.width = '8%';

    // autoplay, paused while the visitor interacts
    var timer = null, paused = false;
    function restart() { clearInterval(timer); if (!reduceMotion) timer = setInterval(function () { if (!paused && !document.hidden) go(1); }, 3800); }
    ['mouseenter', 'focusin', 'touchstart'].forEach(function (ev) { slider.addEventListener(ev, function () { paused = true; }, { passive: true }); });
    ['mouseleave', 'focusout', 'touchend'].forEach(function (ev) { slider.addEventListener(ev, function () { paused = false; }, { passive: true }); });
    restart();

    // mouse drag to scroll (touch scrolls natively)
    var dragX = 0, dragStart = 0, dragging = false, dragMoved = false;
    slider.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      dragging = true; dragMoved = false; dragX = e.clientX; dragStart = slider.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - dragX;
      if (Math.abs(dx) > 5) { dragMoved = true; slider.classList.add('is-dragging'); }
      if (dragMoved) slider.scrollLeft = dragStart - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!dragging) return;
      dragging = false; slider.classList.remove('is-dragging');
      setTimeout(function () { dragMoved = false; }, 0);
    });
  }

  /* ---------- skills + preview ---------- */
  var skillsGrid = $('#skillsGrid');
  if (skillsGrid) {
    var preview = $('#skillPreview'), pGrid = $('#skillPreviewGrid'), pTitle = $('#skillPreviewTitle'), pMore = $('#skillPreviewMore');
    var openSkill = null;

    SKILLS.forEach(function (s, i) {
      var clickable = !!s.cat;
      var card = el(clickable ? 'button' : 'div', { 'class': 'skill-card reveal', style: '--tint:' + s.tint + ';--tint-ink:' + s.ink + ';--lvl:' + s.pct + '%' });
      if (clickable) { card.type = 'button'; card.setAttribute('aria-expanded', 'false'); card.setAttribute('aria-controls', 'skillPreview'); }
      card.innerHTML =
        '<span class="skill-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + s.icon + '</svg></span>' +
        '<h3>' + esc(s.name) + '</h3><p>' + esc(s.desc) + '</p>' +
        '<div class="skill-level"><span>' + s.level + '</span>' + (clickable ? '<span class="skill-hint">See work ' + ICONS.out + '</span>' : '') + '</div>' +
        '<div class="skill-bar"><span></span></div>';
      if (clickable) card.addEventListener('click', function () { toggleSkill(i, card); });
      skillsGrid.appendChild(card);
    });

    function toggleSkill(i, card) {
      var s = SKILLS[i];
      $$('.skill-card[aria-expanded]', skillsGrid).forEach(function (c) { c.setAttribute('aria-expanded', 'false'); });
      if (openSkill === i) { openSkill = null; preview.classList.remove('is-open'); return; }
      openSkill = i;
      card.setAttribute('aria-expanded', 'true');
      var items = (MEDIA.works || []).filter(function (w) { return w.cat === s.cat; });
      var cat = catById(s.cat);
      pTitle.textContent = s.name;
      pMore.href = 'portfolio.html?cat=' + s.cat;
      pMore.textContent = 'Show more ' + cat.label.toLowerCase() + (items.length > 4 ? ' (' + items.length + ')' : '');
      pGrid.innerHTML = '';
      items.slice(0, 4).forEach(function (item, k) {
        var c = mediaCard(item, 'button', 'media-card');
        if (c._hit.tagName === 'BUTTON') c._hit.addEventListener('click', function () { lbOpen(items, k, c._hit); });
        pGrid.appendChild(c);
      });
      preview.classList.add('is-open');
      setTimeout(function () {
        var r = preview.getBoundingClientRect();
        if (r.top > window.innerHeight * .7) window.scrollBy({ top: r.top - window.innerHeight * .35, behavior: reduceMotion ? 'auto' : 'smooth' });
      }, 120);
    }
  }

  /* ---------- tools ---------- */
  var toolsGrid = $('#toolsGrid');
  if (toolsGrid) {
    toolsGrid.innerHTML = TOOLS.map(function (t) {
      return '<div class="tool reveal"><span class="tool-icon"><img src="' + ICON_CDN + t[1] + '.svg" alt="" width="32" height="32" loading="lazy"></span><span>' + esc(t[0]) + '</span></div>';
    }).join('');
  }

  /* ---------- experience cards (3 per row, tap for details) ---------- */
  var expList = $('#expList');
  if (expList) {
    var expToggle = $('#expToggle'), expLabel = $('#expToggleLabel');
    $('#expCount').textContent = EXPERIENCE.length;
    EXPERIENCE.forEach(function (x, i) {
      var item = el('div', { 'class': 'exp-item' + (i >= EXP_VISIBLE ? ' is-hidden' : '') });
      var pid = 'exp-panel-' + i;
      item.innerHTML =
        '<button class="exp-row" type="button" aria-expanded="false" aria-controls="' + pid + '">' +
          logoHTML(x, 44) +
          '<span class="exp-name">' + esc(x.name) + '</span>' +
          '<span class="exp-role">' + esc(x.role) + '</span>' +
          '<span class="exp-when">' + esc(x.when) + (x.loc ? ' · ' + esc(x.loc) : '') + '</span>' +
          '<span class="exp-plus" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="exp-panel" id="' + pid + '" role="region" aria-label="' + esc(x.name) + ' details"><div><ul>' +
          x.points.map(function (pt) { return '<li>' + esc(pt) + '</li>'; }).join('') +
        '</ul></div></div>';
      var row = $('.exp-row', item);
      row.addEventListener('click', function () { row.setAttribute('aria-expanded', String(row.getAttribute('aria-expanded') !== 'true')); });
      expList.appendChild(item);
    });
    expLabel.textContent = 'Show all ' + EXPERIENCE.length + ' roles';
    expToggle.addEventListener('click', function () {
      var open = expToggle.getAttribute('aria-expanded') !== 'true';
      $$('.exp-item', expList).forEach(function (it, i) { if (i >= EXP_VISIBLE) it.classList.toggle('is-hidden', !open); });
      expToggle.setAttribute('aria-expanded', String(open));
      expLabel.textContent = open ? 'Show fewer roles' : 'Show all ' + EXPERIENCE.length + ' roles';
      if (!open) $('#experience').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* ---------- PORTFOLIO PAGE ---------- */
  var pfList = $('#pfList');
  if (pfList) {
    var PER_PAGE = 4;               // designs shown per category before "Show more"
    var MORE_STEP = 24;             // designs added each time "Show more" is clicked
    var filters = $('#pfFilters');
    var works = MEDIA.works || [];

    var allBtn = el('button', { 'class': 'filter is-active', role: 'tab', 'aria-selected': 'true', 'data-filter': 'all', type: 'button' }, 'All <sup>' + works.length + '</sup>');
    filters.appendChild(allBtn);

    CATS.forEach(function (cat) {
      var items = works.filter(function (w) { return w.cat === cat.id; });
      filters.appendChild(el('button', { 'class': 'filter', role: 'tab', 'aria-selected': 'false', 'data-filter': cat.id, type: 'button' }, esc(cat.label) + ' <sup>' + items.length + '</sup>'));

      var group = el('section', { 'class': 'pf-group', id: 'cat-' + cat.id, 'data-cat': cat.id, 'aria-labelledby': 'cat-' + cat.id + '-title' });
      group.innerHTML =
        '<header class="pf-group-head"><div><span class="label">' + String(CATS.indexOf(cat) + 1).padStart(2, '0') + ' · ' + items.length + ' pieces</span>' +
        '<h2 id="cat-' + cat.id + '-title">' + esc(cat.label) + '</h2><p>' + esc(cat.blurb) + '</p></div></header>' +
        '<div class="media-grid"></div>';
      var grid = $('.media-grid', group);
      items.forEach(function (item, k) {
        var c = mediaCard(item, 'button', 'media-card' + (k >= PER_PAGE ? ' is-extra' : ''));
        if (c._hit.tagName === 'BUTTON') c._hit.addEventListener('click', function () { lbOpen(items, k, c._hit); });
        grid.appendChild(c);
      });
      if (items.length > PER_PAGE) {
        var moreWrap = el('div', { 'class': 'pf-more' });
        var more = el('button', { 'class': 'btn btn-soft', type: 'button' });
        moreWrap.appendChild(more);
        group.appendChild(moreWrap);
        var shown = PER_PAGE;
        var label = function () {
          var left = items.length - shown;
          more.textContent = left > 0 ? 'Show more (' + left + ')' : 'Show less';
        };
        label();
        more.addEventListener('click', function () {
          var cards = $$('.media-card', grid);
          if (shown >= items.length) {
            shown = PER_PAGE;
            cards.forEach(function (c, k) { c.classList.toggle('is-shown', false); });
            group.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
          } else {
            shown = Math.min(items.length, shown + MORE_STEP);
            cards.forEach(function (c, k) { if (k < shown) c.classList.add('is-shown'); });
          }
          label();
        });
      }
      pfList.appendChild(group);
    });

    function applyFilter(f, scroll) {
      $$('.filter', filters).forEach(function (b) {
        var on = b.dataset.filter === f;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      $$('.pf-group', pfList).forEach(function (g) { g.classList.toggle('is-hidden', f !== 'all' && g.dataset.cat !== f); });
      if (scroll) {
        var bar = $('.pf-bar');
        if (bar.getBoundingClientRect().top <= header.offsetHeight + 1) {
          window.scrollTo({ top: pfList.getBoundingClientRect().top + window.scrollY - bar.offsetHeight - header.offsetHeight, behavior: 'instant' });
        }
      }
      var url = new URL(location.href);
      if (f === 'all') url.searchParams.delete('cat'); else url.searchParams.set('cat', f);
      history.replaceState(null, '', url);
    }
    $$('.filter', filters).forEach(function (b) { b.addEventListener('click', function () { applyFilter(b.dataset.filter, true); }); });

    var startCat = new URLSearchParams(location.search).get('cat');
    if (startCat && catById(startCat)) applyFilter(startCat, false);
  }

  /* ---------- scroll reveal ---------- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (n, i) { n.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(n); });
  } else {
    $$('.reveal').forEach(function (n) { n.classList.add('is-in'); });
  }

  /* ---------- hero counters ---------- */
  if (!reduceMotion) {
    $$('.hero-stats dd[data-count]').forEach(function (dd) {
      var target = Number(dd.dataset.count);
      var suffix = dd.querySelector('span') ? dd.querySelector('span').outerHTML : '';
      var start = null, dur = 1400;
      function frame(t) {
        if (start === null) start = t;
        var p = Math.min(1, (t - start) / dur);
        dd.innerHTML = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      whenIntroDone(function () { setTimeout(function () { requestAnimationFrame(frame); }, 600); });
    });
  }

  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
})();
