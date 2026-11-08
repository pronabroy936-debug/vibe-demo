/* =========================================================
   VIBE (All-in-one hub) mobile prototype – front-end only demo
   No backend, no real authentication. Everything is simulated.
   ========================================================= */
(function () {
  "use strict";

  const LOGO = "assets/logo/vibe-logo.png";   // full logo with "ALL-IN-ONE HUB"
  const MARK = "assets/logo/vibe-mark.png";   // compact "VIBE" word for the home header

  /* ---------- Icons (inline SVG, stroke style) ---------- */
  const s = (p, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
  const I = {
    back: s('<path d="M15 18l-6-6 6-6"/>'),
    user: s('<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>'),
    userFill: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7.5" r="4"/><path d="M4 20.5c.6-4.2 3.9-6.5 8-6.5s7.4 2.3 8 6.5z"/></svg>',
    store: s('<path d="M4 9.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5"/><path d="M3 9.5l1.6-4.6A1.4 1.4 0 0 1 5.9 4h12.2a1.4 1.4 0 0 1 1.3.9L21 9.5"/><path d="M3 9.5h18"/><path d="M9 20v-5h6v5"/><path d="M9 12.5h6"/>'),
    wifi: s('<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.3a9.5 9.5 0 0 1 13 0"/><path d="M8.6 15.5a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>'),
    tv: s('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 3l4 4 4-4"/><path d="M10.5 11v5l4-2.5z" fill="currentColor"/>'),
    guest: s('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.2c1.2-2 3.2-3.2 5.5-3.2s4.3 1.2 5.5 3.2"/>'),
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    checkBig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    key: s('<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M17 6l3 3"/><path d="M15 8l2 2"/>'),
    card: s('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 15h4"/>'),
    search: s('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
    monitor: s('<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'),
    router: s('<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 16.5h.01M10.5 16.5h.01"/><path d="M15 13l2-6"/><path d="M13.5 6.5a4.5 4.5 0 0 1 6 0"/><path d="M11.5 4a7.5 7.5 0 0 1 10 0"/>'),
    masks: s('<path d="M3 4.5c3 1 6 1 9 0v6a4.5 4.5 0 0 1-9 0z"/><path d="M12 9.5c3 1 6 1 9 0v6a4.5 4.5 0 0 1-9 0"/><path d="M5.5 8.5h.01M9.5 8.5h.01M6 12.5c1 .8 2.5.8 3.5 0"/><path d="M14.5 13.5h.01M18.5 13.5h.01M15 17.3c1-.8 2.5-.8 3.5 0"/>'),
    lang: s('<rect x="2.5" y="3.5" width="11" height="11" rx="2"/><rect x="10.5" y="9.5" width="11" height="11" rx="2"/><path d="M5.5 11.5L8 6.5l2.5 5M6.3 10h3.4"/><path d="M13.5 13.5h5M16 12.5v1M14.5 18c1.8-.6 3-2 3.5-4.5M15 15.5c.8 1.3 2 2.2 3.5 2.6"/>'),
    trophy: s('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5"/><path d="M12 14v3M8.5 20.5h7M9.5 17h5v3.5h-5z"/>'),
    clap: s('<rect x="3" y="9" width="18" height="11" rx="1.5"/><path d="M3 9l1.5-4.5L20 4l1 5"/><path d="M8 4.3l2.3 4.4M13.5 4.2l2.3 4.6"/>'),
    news: s('<rect x="3" y="4" width="15" height="16" rx="2"/><path d="M18 8h3v10a2 2 0 0 1-2 2"/><path d="M7 8h7M7 12h7M7 16h4"/>'),
    kids: s('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4 4 0 0 0 7 0"/><circle cx="9" cy="10" r=".8" fill="currentColor"/><circle cx="15" cy="10" r=".8" fill="currentColor"/>'),
    music: s('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
    lamp: s('<path d="M12 3c-1.5 2-2.5 3.3-2.5 4.8a2.5 2.5 0 0 0 5 0C14.5 6.3 13.5 5 12 3z"/><path d="M5 14h14l-2 4H7z"/><path d="M12 10.5V14M9 21h6"/>'),
    globe: s('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    chev: s('<path d="M9 6l6 6-6 6"/>'),
    close: s('<path d="M6 6l12 12M18 6L6 18"/>'),
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
    full: s('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    vol: s('<path d="M4 9.5h4l5-4v13l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>'),
    heart: s('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    gear: s('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
    swap: s('<path d="M7 4L3 8l4 4"/><path d="M3 8h14"/><path d="M17 20l4-4-4-4"/><path d="M21 16H7"/>'),
    logout: s('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5"/><path d="M5 12h11"/>'),
  };

  /* ---------- User types ---------- */
  const USER_TYPES = {
    customer: { title: "Customer", desc: "Continue as a Customer", icon: I.user },
    lco: { title: "LCO", desc: "Continue as a Partner/LCO", icon: I.store },
    broadband: { title: "Broadband", desc: "Continue with your broadband connection", icon: I.wifi },
    cable: { title: "Cable TV", desc: "Continue with your Cable TV service provider", icon: I.tv },
    guest: { title: "Guest", desc: "Explore available content without a subscription", icon: I.guest },
  };

  // Extra (non-mobile) fields used by some login types
  const EXTRA = {
    vsc: {
      label: "VSC number", icon: I.card, placeholder: "Enter VSC Number", maxlength: 16, inputmode: "numeric",
      clean: (v) => v.replace(/\D/g, "").slice(0, 16),
      valid: (v) => /^\d{8,16}$/.test(v),
      hint: "8–16 digit number printed on your set-top box / viewing card",
      err: "Enter a valid VSC number (8–16 digits)",
      short: "VSC No",
    },
    bbid: {
      label: "User ID", icon: I.wifi, placeholder: "Enter Broadband User ID", maxlength: 20, inputmode: "text",
      clean: (v) => v.replace(/[^A-Za-z0-9._-]/g, "").slice(0, 20),
      valid: (v) => /^[A-Za-z0-9._-]{4,20}$/.test(v),
      hint: "4–20 characters (letters, numbers, . _ -) from your broadband account",
      err: "Enter a valid User ID (4–20 characters)",
      short: "User ID",
    },
    lco: {
      label: "LCO code", icon: I.key, placeholder: "Enter LCO Code (e.g. LCO1234)", maxlength: 8, inputmode: "text",
      clean: (v) => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8),
      valid: (v) => /^[A-Z]{3}\d{3,5}$/.test(v),
      hint: "3 letters followed by 3–5 digits",
      err: "Enter a valid LCO code, e.g. LCO1234",
      short: "LCO Code",
    },
  };

  // Login screen configuration per user type
  const LOGIN = {
    cable: {
      // Cable users register ONCE with VSC + mobile; after that they log in with mobile only
      sub: "Registered cable user? Login with your mobile number",
      subReg: "New cable customer? Register once with your VSC & mobile number",
      label: "Join as Cable User",
      btn: "Login",
      btnReg: "Register",
      extra: "vsc",
      extraOnlyOnRegister: true,
      done: "Login successful",
      doneMsg: "Welcome back! You are logged in with your registered mobile number.",
      doneReg: "Registration successful",
      doneRegMsg: "Your Cable TV connection is registered. Next time, just log in with your mobile number.",
    },
    broadband: {
      // Broadband users register ONCE with User ID + mobile; after that they log in with mobile only
      sub: "Registered broadband user? Login with your mobile number",
      subReg: "New broadband customer? Register once with your User ID & mobile number",
      label: "Join as Broadband User",
      btn: "Login",
      btnReg: "Register",
      extra: "bbid",
      extraOnlyOnRegister: true,
      done: "Login successful",
      doneMsg: "Welcome back! You are logged in with your registered mobile number.",
      doneReg: "Registration successful",
      doneRegMsg: "Your broadband connection is registered. Next time, just log in with your mobile number.",
    },
    lco: {
      sub: "Partner login for Local Cable Operators",
      label: "Partner / LCO Login",
      btn: "Login",
      extra: "lco",
      done: "Welcome, Partner",
      doneMsg: "LCO partner login was simulated successfully.",
    },
    guest: {
      // Guests register and log in with the mobile number only (no VSC / User ID)
      sub: "Explore content without a subscription – just your mobile number",
      label: "Join as Guest",
      btn: "Continue",
      track: true,
      done: "Welcome back!",
      doneMsg: "You are logged in as a guest.",
      doneReg: "Guest registration successful",
      doneRegMsg: "You can now explore available content. Next time, just log in with your mobile number.",
    },
  };

  /* ---------- Channel guide demo data ---------- */
  // [channel, programme, language, gradient colours]
  const GENRES = [
    { key: "sports", name: "Sports", icon: I.trophy, count: 29, items: [
      ["Star Sports 1", "T20 Highlights", "Hindi", ["#c8a96a", "#1f6b3a"]],
      ["Star Sports 2", "Champions Trophy Highlights", "English", ["#2b1055", "#d76d1f"]],
      ["Star Sports 3", "Pro Kabaddi Live", "Tamil", ["#0f2027", "#2c5364"]],
      ["Sony Ten 1", "Football Matchday", "English", ["#134e5e", "#71b280"]],
      ["Sports18", "Tennis Open Final", "Hindi", ["#1d2b64", "#6f86d6"]],
      ["DD Sports", "Hockey League", "Hindi", ["#3a1c71", "#d76d77"]],
    ] },
    { key: "entertainment", name: "Entertainment", icon: I.monitor, count: 97, items: [
      ["Star Plus", "Sayoni", "Hindi", ["#f6d6a8", "#b31217"]],
      ["Zee TV", "Ganga Mai Ki Betiyan", "Hindi", ["#1e3c72", "#7b4397"]],
      ["Colors", "Dhruv Tara", "Hindi", ["#00b4db", "#e1245e"]],
      ["Sony TV", "Family Hour", "Hindi", ["#ff512f", "#3a1c71"]],
      ["Sun TV", "Evening Serial", "Tamil", ["#f7971e", "#7a1f1f"]],
      ["Star Maa", "Prime Drama", "Telugu", ["#8e2de2", "#f7797d"]],
    ] },
    { key: "movies", name: "Movies", icon: I.clap, count: 49, items: [
      ["Star Gold", "Ravan Vadh", "Hindi", ["#e53935", "#7b1010"]],
      ["Zee Cinema", "2.0", "Hindi", ["#0f2027", "#3a7bd5"]],
      ["Sony Max", "Weekend Blockbuster", "Hindi", ["#355c7d", "#c06c84"]],
      ["&pictures", "Action Special", "Hindi", ["#232526", "#c0392b"]],
      ["Colors Cineplex", "Superhit Sunday", "Hindi", ["#41295a", "#2f0743"]],
      ["Star Movies", "Hollywood Night", "English", ["#000428", "#004e92"]],
    ] },
    { key: "news", name: "News", icon: I.news, count: 125, items: [
      ["R. Bharat", "Live & Breaking", "Hindi", ["#d31027", "#1c3faa"]],
      ["Aaj Tak", "Aaj Ka Agenda", "Hindi", ["#ff416c", "#8e0e00"]],
      ["NDTV India", "Prime Time", "Hindi", ["#cb2d3e", "#2c3e50"]],
      ["Times Now", "The Newshour", "English", ["#1a2980", "#c33764"]],
      ["Puthiya Thalaimurai", "Seithigal", "Tamil", ["#e65c00", "#b31217"]],
      ["TV9 Kannada", "Top Stories", "Kannada", ["#ee0979", "#141e30"]],
    ] },
    { key: "kids", name: "Kids", icon: I.kids, count: 18, items: [
      ["Pogo", "Cartoon Marathon", "Hindi", ["#11998e", "#38ef7d"]],
      ["Cartoon Network", "Morning Toons", "English", ["#f7971e", "#ffd200"]],
      ["Nick", "Fun Time", "Hindi", ["#f12711", "#f5af19"]],
      ["Disney Junior", "Little Stories", "English", ["#00c6ff", "#0072ff"]],
    ] },
    { key: "music", name: "Music", icon: I.music, count: 22, items: [
      ["9XM", "Bollywood Top 20", "Hindi", ["#8e2de2", "#4a00e0"]],
      ["MTV Beats", "Chill Hits", "Hindi", ["#fc466b", "#3f5efb"]],
      ["Zing", "Retro Rewind", "Hindi", ["#f953c6", "#b91d73"]],
      ["Sun Music", "Melody Time", "Tamil", ["#ff9966", "#ff5e62"]],
    ] },
    { key: "devotional", name: "Devotional", icon: I.lamp, count: 16, items: [
      ["Aastha", "Morning Aarti", "Hindi", ["#f7971e", "#c0392b"]],
      ["Sanskar", "Bhajan Sandhya", "Hindi", ["#ff8008", "#ffc837"]],
      ["SVBC", "Suprabhatam", "Telugu", ["#b24592", "#f15f79"]],
    ] },
    { key: "infotainment", name: "Infotainment", icon: I.globe, count: 14, items: [
      ["Discovery", "Planet Wild", "English", ["#134e5e", "#71b280"]],
      ["Nat Geo", "Mega Structures", "English", ["#f2c94c", "#232526"]],
      ["History TV18", "Ancient Secrets", "Hindi", ["#3e5151", "#decba4"]],
    ] },
  ];
  const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi",
    "Gujarati", "Punjabi", "Odia", "Assamese", "Urdu", "Bhojpuri", "Nepali"];
  const OTT = [["Play+ Originals", ["#ff3fd0", "#9b5cff"]], ["CineBox", ["#e53935", "#7b1010"]], ["KidsFlix", ["#11998e", "#38ef7d"]],
    ["Bhakti Plus", ["#ff8008", "#ffc837"]], ["NewsNow", ["#1a2980", "#26d0ce"]], ["MusicMax", ["#8e2de2", "#4a00e0"]]];

  // Programme time slots generated around the current time so the guide always looks "live"
  const fmt = (d) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  function slot(i) {
    const now = new Date();
    const start = new Date(now);
    start.setSeconds(0, 0);
    start.setMinutes(Math.floor(now.getMinutes() / 15) * 15 - (i % 3) * 15);
    const end = new Date(start.getTime() + [30, 60, 45, 90][i % 4] * 60000);
    const pct = Math.min(95, Math.max(5, Math.round(((now - start) / (end - start)) * 100)));
    return { time: `${fmt(start)} - ${fmt(end)}`, pct };
  }
  // Flat channel list with ids
  const CHANNELS = [];
  GENRES.forEach((g) => g.items.forEach(([name, show, lang, colors]) => {
    const id = CHANNELS.length;
    CHANNELS.push({ id, name, show, lang, colors, genre: g.key });
  }));

  const grad = (g, deg = 135) => `linear-gradient(${deg}deg, ${g.join(", ")})`;

  /* ---------- Registered users (Cable TV & Broadband) ----------
     Front-end only: kept in this browser's localStorage so a mobile number
     registered once (with VSC / User ID) can log in again with mobile only,
     also after reload. Stored per user type. Falls back to memory if storage is blocked. */
  const Registry = (() => {
    const KEY = "vibe.registeredUsers";
    let mem = {};
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return mem; } };
    const save = (o) => { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* memory only */ } };
    return {
      get: (type, mobile) => (load()[type] || {})[mobile] || null,
      add: (type, mobile, id) => { const o = load(); (o[type] = o[type] || {})[mobile] = { id, at: Date.now() }; save(o); },
      clear: () => save({}),
      count: () => Object.values(load()).reduce((n, t) => n + Object.keys(t).length, 0),
    };
  })();

  /* ---------- App state ---------- */
  const state = {
    role: "customer",       // customer | lco | guest   (first page)
    service: "cable",       // broadband | cable   (customer step 2)
    session: null,          // { type, mobile, vsc | bbid | lco }
    filter: { genre: null, lang: null, q: "" },
  };

  /* ---------- DOM helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const host = $("#screens");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Toasts ---------- */
  function toast(msg, type = "info", ms = 2400) {
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.innerHTML = `<i></i><span></span>`;
    t.lastChild.textContent = msg;
    $("#toastWrap").appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 300); }, ms);
  }

  /* ---------- Loader ---------- */
  function showLoader(text = "Loading…") { $("#loaderText").textContent = text; $("#loader").hidden = false; }
  function hideLoader() { $("#loader").hidden = true; }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- Bottom sheet ---------- */
  function openSheet(html, onMount) {
    const bd = $("#sheetBackdrop"), sh = $("#sheet");
    sh.innerHTML = `<div class="grab"></div>${html}`;
    bd.hidden = false;
    bd.onclick = (e) => { if (e.target === bd) closeSheet(); };
    onMount && onMount(sh);
  }
  function closeSheet() { $("#sheetBackdrop").hidden = true; }

  /* =========================================================
     Router – keeps an in-memory stack and mirrors it into
     browser history so the Android back button works.
     ========================================================= */
  const stack = [];
  let animating = false;

  function canUseHistory() {
    try { history.replaceState(history.state, ""); return true; } catch (e) { return false; }
  }
  const HISTORY = canUseHistory();

  function render(route, dir) {
    const old = host.lastElementChild;
    const el = SCREENS[route.name](route.params || {});
    el.classList.add("screen");
    host.appendChild(el);
    if (!old || dir === "none") {
      if (old) old.remove();
      el.classList.add("enter-fade");
      return;
    }
    animating = true;
    el.classList.add(dir === "back" ? "enter-back" : "enter-fwd");
    old.classList.add(dir === "back" ? "exit-back" : "exit-fwd");
    if (dir === "back") old.style.zIndex = 2; // keep outgoing screen on top when going back
    setTimeout(() => { old.remove(); animating = false; }, 380);
  }

  function go(name, params = {}) {
    if (animating) return;
    closeSheet();
    stack.push({ name, params });
    if (HISTORY) { try { history.pushState({ depth: stack.length }, ""); } catch (e) { /* file:// edge cases */ } }
    render(stack[stack.length - 1], "fwd");
  }
  function back() {
    if (animating) return;
    if (!$("#sheetBackdrop").hidden) { closeSheet(); return; }
    if (stack.length <= 1) { toast("You are on the first screen"); return; }
    if (HISTORY) history.back(); else popRoute();
  }
  function popRoute() {
    if (stack.length <= 1) return;
    stack.pop();
    render(stack[stack.length - 1], "back");
  }
  // Replace the whole stack (e.g. after login or logout)
  function reset(name, params = {}, dir = "back") {
    closeSheet();
    stack.length = 0;
    stack.push({ name, params });
    if (HISTORY) history.replaceState({ depth: 1 }, "");
    render(stack[0], dir);
  }
  window.addEventListener("popstate", () => {
    if (!$("#sheetBackdrop").hidden) { closeSheet(); if (HISTORY) history.pushState({ depth: stack.length }, ""); return; }
    if (stack.length > 1) popRoute();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#splash")) back(); });

  /* =========================================================
     Shared building blocks
     ========================================================= */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* Auto-scrolling entertainment banner behind the logo.
     Rows of poster tiles scroll endlessly, alternating direction. */
  const BANNER_TITLES = [
    ["Neon Skies", "MOVIE"], ["Champions Cup", "LIVE"], ["Paper Hearts", "ROMANCE"], ["Quantum Kid", "SCI-FI"],
    ["Kids Zone", "KIDS"], ["Rhythm Nation", "MUSIC"], ["Iron Monsoon", "ACTION"], ["News 24x7", "LIVE"],
    ["Desert Run", "ADVENTURE"], ["Laugh Riot", "COMEDY"], ["Deep Blue", "THRILLER"], ["Wild Trails", "FAMILY"],
    ["Cine Gold", "MOVIES"], ["Silent Valley", "DRAMA"], ["Midnight Express", "NEW"], ["Planet Wild", "DOCU"],
  ];
  const BANNER_COLORS = [
    ["#ff6a00", "#ee0979"], ["#0d3b66", "#26c6da"], ["#f857a6", "#ff5858"], ["#00c6ff", "#0072ff"],
    ["#11998e", "#38ef7d"], ["#8e2de2", "#4a00e0"], ["#232526", "#5b6a7a"], ["#8e0e00", "#1f1c18"],
    ["#c79081", "#dfa579"], ["#f7971e", "#ffd200"], ["#141e30", "#3a6186"], ["#56ab2f", "#a8e063"],
    ["#b8860b", "#3e2723"], ["#1b3a1f", "#c0ca33"], ["#3b1f6e", "#c2185b"], ["#134e5e", "#71b280"],
  ];
  function bannerHTML() {
    const rows = [];
    for (let r = 0; r < 4; r++) {
      let tiles = "";
      for (let i = 0; i < 8; i++) {
        const k = (i * 3 + r * 5) % BANNER_TITLES.length;
        const [t, tag] = BANNER_TITLES[k];
        tiles += `<span class="bt" style="background:linear-gradient(160deg, ${BANNER_COLORS[k].join(", ")})"><i>${tag}</i><b>${t}</b></span>`;
      }
      // Track contains the tiles twice so translateX(-50%) loops seamlessly
      rows.push(`<div class="track${r % 2 ? " rev" : ""}" style="animation-duration:${26 + r * 6}s">${tiles}${tiles}</div>`);
    }
    return `<div class="banner" aria-hidden="true">${rows.join("")}</div>`;
  }

  /* Ambient layer for the welcome/login screens: drifting neon glows + twinkling sparkles */
  function ambientHTML() {
    let seed = 11;
    const r = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    let stars = "";
    for (let i = 0; i < 16; i++) {
      const size = 6 + Math.round(r() * 8);
      stars += `<b style="left:${(r() * 94).toFixed(1)}%;top:${(18 + r() * 78).toFixed(1)}%;width:${size}px;height:${size}px;animation-delay:${(r() * 4).toFixed(2)}s;animation-duration:${(2.6 + r() * 2.4).toFixed(2)}s"></b>`;
    }
    return `<div class="ambient" aria-hidden="true"><i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i>${stars}</div>`;
  }

  /* Neon heartbeat + wave line, echoing the line through the VIBE logo */
  const PULSE = `
    <svg class="pulse-line" viewBox="0 0 320 28" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#ff3fd0"/><stop offset=".5" stop-color="#9b5cff"/><stop offset="1" stop-color="#2fd8ff"/></linearGradient></defs>
      <path class="pl-base" d="M0 14 H70 l6 -9 l6 18 l6 -22 l6 22 l5 -9 H128 C150 14 160 4 182 4 S214 24 236 24 S270 6 292 10 S310 14 320 14"/>
      <path class="pl-run" d="M0 14 H70 l6 -9 l6 18 l6 -22 l6 22 l5 -9 H128 C150 14 160 4 182 4 S214 24 236 24 S270 6 292 10 S310 14 320 14"/>
    </svg>`;
  const ARROW = `<span class="arr" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`;

  function heroHTML(withBack) {
    return `
      ${ambientHTML()}
      <div class="hero">
        ${bannerHTML()}
        ${withBack ? `<button class="back-btn" data-act="back" aria-label="Back">${I.back}</button>` : ""}
        <img class="logo" src="${LOGO}" alt="VIBE – All-in-one hub" />
      </div>
      <h1 class="headline">Entertainment,<em>your way.</em></h1>
      ${PULSE}`;
  }

  function choiceHTML(key, selected) {
    const u = USER_TYPES[key];
    return `
      <button class="choice${selected ? " selected" : ""}" data-key="${key}" role="radio" aria-checked="${selected}">
        <span class="c-icon">${u.icon}</span>
        <span class="c-text"><b>${u.title}</b><small>${u.desc}</small></span>
        <span class="radio">${I.check}</span>
      </button>`;
  }

  // Single-select behaviour for a group of .choice cards
  function bindChoices(root, onChange) {
    $$(".choice", root).forEach((c) =>
      c.addEventListener("click", () => {
        $$(".choice", root).forEach((o) => { o.classList.remove("selected"); o.setAttribute("aria-checked", "false"); });
        c.classList.add("selected");
        c.setAttribute("aria-checked", "true");
        onChange(c.dataset.key);
      })
    );
  }

  function bindCommon(root) {
    $$('[data-act="back"]', root).forEach((b) => b.addEventListener("click", back));
  }

  function setLoading(btn, on) {
    btn.classList.toggle("loading", on);
    const sp = $(".spin", btn);
    if (on && !sp) btn.insertAdjacentHTML("afterbegin", '<span class="spin"></span>');
    if (!on && sp) sp.remove();
  }

  function shake(node) { node.classList.remove("invalid"); void node.offsetWidth; node.classList.add("invalid"); }

  /* =========================================================
     Screens
     ========================================================= */
  const SCREENS = {
    /* ---- Login / registration (per user type) ---- */
    login({ type = "cable", signup = false }) {
      const cfg = LOGIN[type];
      const ex = cfg.extra ? EXTRA[cfg.extra] : null;
      const once = !!cfg.extraOnlyOnRegister;      // Cable TV / Broadband: VSC / User ID only for first-time registration
      let reg = once ? signup : false;              // current mode for "once" types
      const needEx = () => !!ex && (!once || reg);
      const root = el(`
        <section class="screen-auth" data-screen="login-${type}">
          <div class="auth">
            ${heroHTML(true)}
            <p class="sub" id="subTxt"></p>
            <div class="row-between">
              <span class="role-label">${cfg.label}</span>
              <button class="link" data-act="change">Change Selection</button>
            </div>
            ${ex ? `
            <div class="ex-wrap" id="exWrap">
              <label class="field" id="exField">
                ${ex.icon}
                <input id="extra" type="text" inputmode="${ex.inputmode}" maxlength="${ex.maxlength}" autocomplete="off" placeholder="${ex.placeholder}" aria-label="${ex.label}" />
              </label>
              <p class="hint" id="exHint">${ex.hint}</p>
            </div>` : ""}
            <label class="field" id="mobField">
              ${I.userFill}
              <input id="mobile" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national" placeholder="Enter Mobile No" aria-label="Mobile number" />
            </label>
            <p class="hint" id="hint">10-digit mobile number</p>
            <button class="btn dim" id="submit"><span class="lbl"></span>${ARROW}</button>
            ${once ? `<button class="link mode-switch" id="modeSwitch"></button>` : ""}
          </div>
        </section>`);

      bindCommon(root);
      // "Change Selection": step back if we came from a selection screen, else open it
      $('[data-act="change"]', root).addEventListener("click", () => {
        const prev = stack[stack.length - 2];
        if (prev && (prev.name === "role" || prev.name === "service")) back();
        else go("role");
      });

      const mob = $("#mobile", root), hint = $("#hint", root), btn = $("#submit", root), field = $("#mobField", root);
      const xin = $("#extra", root), xHint = $("#exHint", root), xField = $("#exField", root), xWrap = $("#exWrap", root);
      const sw = $("#modeSwitch", root);
      const mobOk = () => /^[6-9]\d{9}$/.test(mob.value);
      const valid = () => mobOk() && (!needEx() || ex.valid(xin.value));

      // Switch between "login with mobile" and "first-time registration with VSC / User ID"
      function setMode(r, animate) {
        if (once) reg = r;
        const isReg = once ? reg : signup;
        $("#subTxt", root).textContent = once && isReg ? cfg.subReg : cfg.sub;
        $(".lbl", btn).textContent = isReg ? (cfg.btnReg || "Register") : cfg.btn;
        if (xWrap) {
          xWrap.hidden = !needEx();
          if (animate && !xWrap.hidden) { xWrap.classList.remove("reveal"); void xWrap.offsetWidth; xWrap.classList.add("reveal"); }
        }
        if (sw) sw.textContent = reg ? "Already registered? Login with mobile number" : `New user? Register with ${ex.label}`;
        btn.classList.toggle("dim", !valid());
        updateMobHint();
      }

      function updateMobHint() {
        const n = mob.value.length;
        if (n === 0) { hint.textContent = "10-digit mobile number"; hint.className = "hint"; }
        else if (n < 10) { hint.textContent = `${n}/10 digits`; hint.className = "hint"; }
        else if (!/^[6-9]/.test(mob.value)) { hint.textContent = "Mobile number must start with 6, 7, 8 or 9"; hint.className = "hint err"; }
        else if (once && Registry.get(type, mob.value)) { hint.textContent = `✓ Registered ${USER_TYPES[type].title} user – no ${ex.label} needed`; hint.className = "hint ok"; }
        else if (cfg.track) {
          // Guest: mobile only – first time registers, after that logs in
          const known = Registry.get(type, mob.value);
          hint.textContent = known ? "✓ Registered guest – login with your mobile number" : "✓ New number – you'll be registered as a guest";
          hint.className = "hint ok";
          $(".lbl", btn).textContent = known ? "Login" : "Register";
          return;
        }
        else if (once && !reg) { hint.textContent = "✓ Valid mobile number"; hint.className = "hint ok"; }
        else { hint.textContent = "✓ Valid mobile number"; hint.className = "hint ok"; }
      }

      if (ex) xin.addEventListener("input", () => {
        xin.value = ex.clean(xin.value);
        xField.classList.remove("invalid");
        if (!xin.value) { xHint.textContent = ex.hint; xHint.className = "hint"; }
        else if (ex.valid(xin.value)) { xHint.textContent = `✓ Valid ${ex.label}`; xHint.className = "hint ok"; }
        else { xHint.textContent = cfg.extra === "vsc" ? `${xin.value.length} digits entered` : ex.hint; xHint.className = "hint"; }
        btn.classList.toggle("dim", !valid());
      });
      if (ex) xin.addEventListener("keydown", (e) => { if (e.key === "Enter") mob.focus(); });

      mob.addEventListener("input", () => {
        mob.value = mob.value.replace(/\D/g, "").slice(0, 10);
        field.classList.remove("invalid");
        updateMobHint();
        btn.classList.toggle("dim", !valid());
      });
      mob.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
      if (sw) sw.addEventListener("click", () => { setMode(!reg, true); (reg ? xin : mob).focus(); });

      btn.addEventListener("click", async () => {
        if (needEx() && !ex.valid(xin.value)) {
          shake(xField);
          xHint.textContent = ex.err; xHint.className = "hint err";
          toast(ex.err, "error");
          return xin.focus();
        }
        if (!mobOk()) {
          shake(field);
          hint.textContent = mob.value.length < 10 ? "Please enter a valid 10-digit mobile number" : "Mobile number must start with 6, 7, 8 or 9";
          hint.className = "hint err";
          toast("Please enter a valid mobile number", "error");
          return mob.focus();
        }
        mob.blur();
        setLoading(btn, true);
        await wait(1300);
        setLoading(btn, false);

        let registered = signup;   // which success message to show
        let extraVal = ex && needEx() ? xin.value : undefined;

        if (once) {
          const known = Registry.get(type, mob.value);
          if (!reg && !known) {
            // Not registered yet → ask for VSC / User ID once
            setMode(true, true);
            toast(`New number – enter your ${ex.label} to register (first time only)`, "error", 3200);
            return xin.focus();
          }
          if (reg && known) {
            // Already registered → just log in, keep the original VSC / User ID
            toast("This number is already registered – logged in with mobile", "info", 3000);
            registered = false;
            extraVal = known.id;
          } else if (reg) {
            Registry.add(type, mob.value, xin.value);
            registered = true;
          } else {
            registered = false;
            extraVal = known.id;
          }
        }

        if (cfg.track) {
          // Guest: no extra ID – the mobile number alone registers the first time
          registered = !Registry.get(type, mob.value);
          if (registered) Registry.add(type, mob.value, "");
        }

        state.session = { type, mobile: mob.value };
        if (cfg.extra && extraVal) state.session[cfg.extra] = extraVal;

        const tracked = once || !!cfg.track;
        const extraLine = extraVal ? `${ex.short}: ${esc(extraVal)}<br/>` : "";
        const title = tracked ? (registered ? cfg.doneReg : cfg.done) : (signup ? "Registration successful" : cfg.done);
        const msg = tracked ? (registered ? cfg.doneRegMsg : cfg.doneMsg) : (signup ? "Your account has been registered for this demo." : cfg.doneMsg);
        openSheet(`
          <div class="ok-badge">${I.checkBig}</div>
          <h3>${title}</h3>
          <p>${msg}<br/>${extraLine}Mobile: +91 ${mob.value.replace(/(\d{5})(\d{5})/, "$1 $2")}</p>
          <span class="demo-tag">Demo • No real OTP sent</span>
          <button class="btn" id="toHome">Continue to Home</button>`, (sh) => {
          $("#toHome", sh).addEventListener("click", () => enterHome(type));
        });
        toast(registered ? "Registered successfully (demo)" : "Logged in successfully (demo)", "success");
      });

      setMode(reg, false);
      return root;
    },

    /* ---- First page: Customer / LCO ---- */
    role({ first = false }) {
      const root = el(`
        <section data-screen="role">
          <div class="auth">
            ${heroHTML(!first)}
            <p class="sub">Choose an option to continue</p>
            <div class="choices" role="radiogroup" aria-label="User type">
              ${choiceHTML("customer", state.role === "customer")}
              ${choiceHTML("lco", state.role === "lco")}
              ${choiceHTML("guest", state.role === "guest")}
            </div>
            <button class="btn" id="cont"><span class="lbl">Continue</span>${ARROW}</button>
            <div class="features">
              <div class="feat-row">
                <span class="feat">${I.tv}<b>Live TV</b></span>
                <span class="feat">${I.monitor}<b>OTT Apps</b></span>
                <span class="feat">${I.wifi}<b>Broadband</b></span>
              </div>
              <p class="feat-cap">Everything you watch — all in one hub</p>
              <p class="terms">By continuing you agree to VIBE's <button class="tlink" data-toast="Terms of Service (demo)">Terms</button> &amp; <button class="tlink" data-toast="Privacy Policy (demo)">Privacy Policy</button></p>
            </div>
          </div>
        </section>`);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      bindCommon(root);
      bindChoices(root, (k) => (state.role = k));
      $("#cont", root).addEventListener("click", () => {
        if (state.role === "lco") go("login", { type: "lco" });
        else if (state.role === "guest") go("login", { type: "guest" });
        else go("service");
      });
      return root;
    },

    /* ---- Broadband / Cable TV / Guest ---- */
    service() {
      const root = el(`
        <section data-screen="service">
          <div class="auth">
            ${heroHTML(true)}
            <p class="sub">Log in / Register</p>
            <button class="link right" data-act="change">Change user type</button>
            <div class="choices" role="radiogroup" aria-label="Connection type">
              ${choiceHTML("broadband", state.service === "broadband")}
              ${choiceHTML("cable", state.service === "cable")}
            </div>
            <button class="btn" id="cont"><span class="lbl">Login</span>${ARROW}</button>
            <button class="link signup" id="signup">Sign up?</button>
          </div>
        </section>`);
      bindCommon(root);
      $('[data-act="change"]', root).addEventListener("click", back);
      bindChoices(root, (k) => (state.service = k));
      $("#cont", root).addEventListener("click", async () => {
        // Every type (Guest included) goes to its login / registration screen
        go("login", { type: state.service });
      });
      $("#signup", root).addEventListener("click", () => {
        go("login", { type: state.service, signup: true });
      });
      return root;
    },

    /* ---- Home: live TV guide (after login) ---- */
    home() {
      const f = state.filter;
      const root = el(`
        <section class="screen-fixed tv" data-screen="home">
          <div class="tv-scroll" id="tvScroll">
            <header class="tv-head">
              <div class="brand">
                <img src="${MARK}" alt="VIBE" />
                <small>&amp; OTT Partners</small>
              </div>
              <span class="vsep"></span>
              <div class="gp-row three">
                <button class="gp" data-act="ott">${I.monitor}<span>OTT</span></button>
                <button class="gp${f.q ? " on" : ""}" data-act="search">${I.search}<span>Search</span></button>
                <button class="gp" data-act="profile">${I.userFill}<span>Profile</span></button>
              </div>
            </header>
            <div class="gp-row three wide">
              <button class="gp" data-act="lts">${I.router}<span>LTS</span></button>
              <button class="gp${f.genre ? " on" : ""}" data-act="genre">${I.masks}<span>${f.genre ? GENRES.find((g) => g.key === f.genre).name : `Genre (${GENRES.length})`}</span></button>
              <button class="gp${f.lang ? " on" : ""}" data-act="lang">${I.lang}<span>${f.lang || `Language (${LANGUAGES.length})`}</span></button>
            </div>
            <div class="searchbar" id="searchbar" ${f.q ? "" : "hidden"}>
              ${I.search}
              <input id="q" type="search" placeholder="Search channels or shows" value="${esc(f.q)}" aria-label="Search channels" />
              <button data-act="clear-q" aria-label="Clear search">${I.close}</button>
            </div>
            <div class="filters" id="filters"></div>
            <div id="sections"></div>
          </div>
          <button class="fab" data-act="fab" aria-label="Watch live TV">${I.tv}</button>
        </section>`);

      const sections = $("#sections", root);
      const draw = () => {
        sections.innerHTML = guideHTML();
        $("#filters", root).innerHTML = filterChips();
        bindGuide(root);
      };

      $('[data-act="ott"]', root).addEventListener("click", () => openSheet(`
        <h3>OTT Partners</h3>
        <p>Stream apps included with your VIBE pack.</p>
        <div class="ott-grid">${OTT.map(([n, c]) => `<button class="ott" style="background:${grad(c)}" data-ott="${n}">${n}</button>`).join("")}</div>`, (sh) => {
        $$("[data-ott]", sh).forEach((b) => b.addEventListener("click", () => { closeSheet(); toast(`Opening ${b.dataset.ott} (demo)`); }));
      }));
      $('[data-act="lts"]', root).addEventListener("click", () => openSheet(`
        <h3>LTS</h3>
        <p>Live TV services linked to your connection.</p>
        <div class="opt-list">
          ${[["My Packs", "View active channel packs"], ["Recharge", "Renew your Cable TV subscription"], ["Set-top Box", "VSC & device details"], ["Support", "Raise a service request"]]
            .map(([t, d]) => `<button class="opt" data-lts="${t}"><span><b>${t}</b><small>${d}</small></span>${I.chev}</button>`).join("")}
        </div>`, (sh) => {
        $$("[data-lts]", sh).forEach((b) => b.addEventListener("click", () => { closeSheet(); toast(`${b.dataset.lts}: available in the full app`); }));
      }));
      $('[data-act="genre"]', root).addEventListener("click", () => pickSheet("Genre", ["All", ...GENRES.map((g) => g.name)],
        f.genre ? GENRES.find((g) => g.key === f.genre).name : "All", (v) => {
          f.genre = v === "All" ? null : GENRES.find((g) => g.name === v).key;
          refreshHome(root, draw);
        }));
      $('[data-act="lang"]', root).addEventListener("click", () => pickSheet("Language", ["All", ...LANGUAGES], f.lang || "All", (v) => {
        f.lang = v === "All" ? null : v;
        refreshHome(root, draw);
      }));
      $('[data-act="search"]', root).addEventListener("click", () => {
        const bar = $("#searchbar", root);
        bar.hidden = !bar.hidden;
        if (!bar.hidden) $("#q", root).focus();
      });
      $("#q", root).addEventListener("input", (e) => { f.q = e.target.value.trim(); $('[data-act="search"]', root).classList.toggle("on", !!f.q); draw(); });
      $('[data-act="clear-q"]', root).addEventListener("click", () => {
        f.q = ""; $("#q", root).value = ""; $("#searchbar", root).hidden = true;
        $('[data-act="search"]', root).classList.remove("on"); draw();
      });
      $('[data-act="profile"]', root).addEventListener("click", () => go("profile"));
      $('[data-act="fab"]', root).addEventListener("click", () => playChannel(CHANNELS[0].id));
      draw();
      return root;
    },

    /* ---- See All for one genre ---- */
    genre({ key }) {
      const g = GENRES.find((x) => x.key === key);
      const list = filtered(g);
      const root = el(`
        <section class="tv" data-screen="genre-${key}">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2><span class="sec-ic">${g.icon}</span>${g.name} (${g.count})</h2>
          </header>
          <div class="ch-grid">${list.map((c) => cardHTML(c, true)).join("")}</div>
          <p class="more-note">Showing ${list.length} of ${g.count} channels in this demo</p>
        </section>`);
      bindCommon(root);
      bindCards(root);
      return root;
    },

    /* ---- Simulated player ---- */
    player({ id }) {
      const c = CHANNELS[id];
      const sl = slot(id);
      const g = GENRES.find((x) => x.key === c.genre);
      const next = CHANNELS.filter((x) => x.genre === c.genre && x.id !== id);
      const root = el(`
        <section class="tv" data-screen="player">
          <div class="video" style="background:${grad(c.colors)}">
            <button class="back-btn" data-act="back" aria-label="Back">${I.back}</button>
            <span class="live-badge"><i></i>LIVE</span>
            <div class="video-title">${esc(c.show)}</div>
            <div class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="vctrl">
              <button data-act="pp" aria-label="Pause">${I.pause}</button>
              <div class="vbar"><i style="width:${sl.pct}%"></i></div>
              <button data-toast="Volume (demo)" aria-label="Volume">${I.vol}</button>
              <button data-toast="Full screen is not available in this demo" aria-label="Full screen">${I.full}</button>
            </div>
          </div>
          <div class="p-info">
            <h2>${esc(c.name)}</h2>
            <p>${esc(c.show)}</p>
            <div class="ch-meta"><span class="t">${I.clock}${sl.time}</span><span class="lang">${c.lang}</span></div>
            <div class="p-actions">
              <button class="gp" data-toast="Added to favourites">${I.heart}<span>Favourite</span></button>
              <button class="gp" data-toast="Reminder set for the next show">${I.clock}<span>Remind</span></button>
            </div>
          </div>
          <div class="sec-head"><h4><span class="sec-ic">${g.icon}</span>More in ${g.name}</h4></div>
          <div class="rail">${next.map((x) => cardHTML(x)).join("")}</div>
        </section>`);
      bindCommon(root);
      bindCards(root, true);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      const pp = $('[data-act="pp"]', root), video = $(".video", root);
      pp.addEventListener("click", () => {
        const paused = video.classList.toggle("paused");
        pp.innerHTML = paused ? I.play : I.pause;
        toast(paused ? "Paused" : "Playing");
      });
      return root;
    },

    /* ---- Profile ---- */
    profile() {
      const sess = state.session || {};
      const type = sess.type || "guest";
      const label = { guest: "Guest User", cable: "Cable TV User", broadband: "Broadband User", lco: "LCO Partner" }[type];
      const root = el(`
        <section class="tv" data-screen="profile">
          <header class="sub-head">
            <button class="back-btn static" data-act="back" aria-label="Back">${I.back}</button>
            <h2>Profile</h2>
          </header>
          <div class="profile-card">
            <div class="avatar">${label[0]}</div>
            <div><b>${label}</b>
              <small>${sess.mobile ? "+91 " + sess.mobile : "Not signed in"}</small>
              ${sess.vsc ? `<small>VSC No: ${sess.vsc}</small>` : ""}
              ${sess.bbid ? `<small>User ID: ${esc(sess.bbid)}</small>` : ""}
              ${sess.lco ? `<small>LCO Code: ${sess.lco}</small>` : ""}
            </div>
          </div>
          <div class="menu">
            <button data-toast="Your watchlist is empty">${I.heart}My Watchlist<span class="chev">${I.chev}</span></button>
            <button data-toast="Settings are not available in this demo">${I.gear}Settings<span class="chev">${I.chev}</span></button>
            <button data-act="switch">${I.swap}Change user type<span class="chev">${I.chev}</span></button>
            <button data-act="reset-reg">${I.card}Reset demo registrations<span class="chev">${Registry.count()} saved</span></button>
            <button class="danger" data-act="logout">${I.logout}${type === "guest" ? "Exit guest mode" : "Logout"}</button>
          </div>
        </section>`);
      bindCommon(root);
      $$("[data-toast]", root).forEach((b) => b.addEventListener("click", () => toast(b.dataset.toast)));
      $('[data-act="switch"]', root).addEventListener("click", () => reset("role", { first: true }));
      $('[data-act="reset-reg"]', root).addEventListener("click", (e) => {
        Registry.clear();
        $(".chev", e.currentTarget).textContent = "0 saved";
        toast("Demo registrations cleared – Cable, Broadband & Guest users must register again", "success", 3000);
      });
      $('[data-act="logout"]', root).addEventListener("click", async () => {
        showLoader("Signing out…");
        await wait(700);
        hideLoader();
        state.session = null;
        Object.assign(state.filter, { genre: null, lang: null, q: "" });
        reset("role", { first: true });
        toast("Signed out", "success");
      });
      return root;
    },
  };

  // After login the home screen becomes the root, so Back does not return to the login form
  function enterHome() {
    closeSheet();
    reset("home", {}, "fwd");
  }

  /* =========================================================
     Live TV guide helpers
     ========================================================= */
  function filtered(g) {
    const { lang, q } = state.filter;
    const ql = q.toLowerCase();
    return CHANNELS.filter((c) => c.genre === g.key && (!lang || c.lang === lang) &&
      (!ql || c.name.toLowerCase().includes(ql) || c.show.toLowerCase().includes(ql)));
  }

  function cardHTML(c, grid = false) {
    const sl = slot(c.id);
    return `
      <button class="ch-card${grid ? " in-grid" : ""}" data-ch="${c.id}">
        <div class="thumb" style="background:${grad(c.colors)}">
          <span class="live-badge"><i></i>LIVE</span>
          <b class="prog">${esc(c.show)}</b>
          <span class="prog-bar"><i style="width:${sl.pct}%"></i></span>
        </div>
        <div class="ch-name">${esc(c.name)}</div>
        <div class="ch-meta"><span class="t">${I.clock}${sl.time}</span><span class="lang">${c.lang}</span></div>
      </button>`;
  }

  function guideHTML() {
    const html = GENRES.filter((g) => !state.filter.genre || g.key === state.filter.genre).map((g) => {
      const list = filtered(g);
      if (!list.length) return "";
      return `
        <div class="sec">
          <div class="sec-head">
            <h4><span class="sec-ic">${g.icon}</span>${g.name} (${g.count})</h4>
            <button class="see-all" data-genre="${g.key}">See All ${I.chev}</button>
          </div>
          <div class="rail">${list.map((c) => cardHTML(c)).join("")}</div>
        </div>`;
    }).join("");
    return html || `<div class="empty">${I.search}<b>No channels found</b><p>Try another genre, language or search term.</p><button class="pill" data-act="reset-filters">Clear filters</button></div>`;
  }

  function filterChips() {
    const f = state.filter, chips = [];
    if (f.genre) chips.push(["genre", GENRES.find((g) => g.key === f.genre).name]);
    if (f.lang) chips.push(["lang", f.lang]);
    if (f.q) chips.push(["q", `“${esc(f.q)}”`]);
    return chips.map(([k, v]) => `<button class="fchip" data-clear="${k}">${v}${I.close}</button>`).join("");
  }

  function refreshHome(root, draw) {
    const f = state.filter;
    $('[data-act="genre"] span', root).textContent = f.genre ? GENRES.find((g) => g.key === f.genre).name : `Genre (${GENRES.length})`;
    $('[data-act="genre"]', root).classList.toggle("on", !!f.genre);
    $('[data-act="lang"] span', root).textContent = f.lang || `Language (${LANGUAGES.length})`;
    $('[data-act="lang"]', root).classList.toggle("on", !!f.lang);
    draw();
  }

  function bindGuide(root) {
    bindCards(root);
    $$("[data-genre]", root).forEach((b) => b.addEventListener("click", () => go("genre", { key: b.dataset.genre })));
    const draw = () => { $("#sections", root).innerHTML = guideHTML(); $("#filters", root).innerHTML = filterChips(); bindGuide(root); };
    $$("[data-clear]", root).forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.clear;
      if (k === "q") { state.filter.q = ""; $("#q", root).value = ""; $("#searchbar", root).hidden = true; $('[data-act="search"]', root).classList.remove("on"); }
      else state.filter[k] = null;
      refreshHome(root, draw);
    }));
    const rf = $('[data-act="reset-filters"]', root);
    if (rf) rf.addEventListener("click", () => {
      Object.assign(state.filter, { genre: null, lang: null, q: "" });
      $("#q", root).value = ""; $("#searchbar", root).hidden = true; $('[data-act="search"]', root).classList.remove("on");
      refreshHome(root, draw);
    });
  }

  function bindCards(root, replace = false) {
    $$("[data-ch]", root).forEach((b) => b.addEventListener("click", () => playChannel(+b.dataset.ch, replace)));
  }

  function playChannel(id, replace = false) {
    if ((state.session || {}).type === "guest") {
      openSheet(`
        <h3>Subscribe to watch</h3>
        <p>Live channels need an active Cable TV or Broadband connection.</p>
        <button class="btn" id="subCable">Register Cable TV (VSC + Mobile)</button>
        <button class="btn ghost" id="subBb">Register Broadband (User ID + Mobile)</button>
        <button class="btn ghost" id="subPrev">Watch 2-minute preview</button>`, (sh) => {
        $("#subCable", sh).addEventListener("click", () => { state.service = "cable"; go("login", { type: "cable", signup: true }); });
        $("#subBb", sh).addEventListener("click", () => { state.service = "broadband"; go("login", { type: "broadband", signup: true }); });
        $("#subPrev", sh).addEventListener("click", () => { closeSheet(); openPlayer(id, replace); toast("Preview mode (demo)"); });
      });
      return;
    }
    openPlayer(id, replace);
  }
  function openPlayer(id, replace) {
    if (replace && stack[stack.length - 1].name === "player") {
      // Switch channel inside the player without stacking players
      stack[stack.length - 1] = { name: "player", params: { id } };
      render(stack[stack.length - 1], "none");
      return;
    }
    go("player", { id });
  }

  // Generic single-choice bottom sheet
  function pickSheet(title, options, current, onPick) {
    openSheet(`
      <h3>${title}</h3>
      <div class="pick-list">
        ${options.map((o) => `<button class="pick${o === current ? " on" : ""}" data-v="${esc(o)}"><span>${esc(o)}</span><span class="radio">${I.check}</span></button>`).join("")}
      </div>`, (sh) => {
      $$("[data-v]", sh).forEach((b) => b.addEventListener("click", () => {
        $$(".pick", sh).forEach((p) => p.classList.remove("on"));
        b.classList.add("on");
        setTimeout(() => { closeSheet(); onPick(b.dataset.v); }, 160);
      }));
    });
  }

  /* ---------- Status-bar clock (desktop frame) ---------- */
  function tick() {
    const d = new Date();
    $("#sbTime").textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  tick(); setInterval(tick, 30000);

  /* ---------- Opening animation (VIBE intro video) ----------
     Plays once when the app opens, then fades into the first page.
     If the video cannot autoplay, an animated logo is shown instead. */
  function runSplash() {
    const sp = $("#splash");
    if (!sp) return;
    const v = $("#splashVideo"), bgv = $("#splashBg"), bar = $("#splashBar");
    const skip = $("#splashSkip"), snd = $("#splashSound");
    let finished = false, usedFallback = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      try { v.pause(); bgv.pause(); } catch (e) { /* ignore */ }
      sp.classList.add("done");
      document.removeEventListener("keydown", onKey);
      setTimeout(() => sp.remove(), 650);
    };
    const fallback = () => {
      if (usedFallback || finished) return;
      usedFallback = true;
      v.hidden = bgv.hidden = snd.hidden = true;
      $("#splashFallback").hidden = false;
      bar.style.transition = "width 2.8s linear";
      requestAnimationFrame(() => (bar.style.width = "100%"));
      setTimeout(finish, 3000);
    };
    const onKey = (e) => { if (["Escape", "Enter", " "].includes(e.key)) { e.preventDefault(); finish(); } };

    skip.addEventListener("click", finish);
    document.addEventListener("keydown", onKey);
    snd.addEventListener("click", () => {
      v.muted = !v.muted;
      snd.classList.toggle("on", !v.muted);
      snd.setAttribute("aria-label", v.muted ? "Turn sound on" : "Turn sound off");
      if (v.paused) v.play().catch(() => {});
    });
    v.addEventListener("timeupdate", () => {
      if (v.duration) bar.style.width = `${(v.currentTime / v.duration) * 100}%`;
      if (Math.abs(bgv.currentTime - v.currentTime) > 0.3) bgv.currentTime = v.currentTime; // keep the blurred copy in sync
    });
    v.addEventListener("ended", finish);
    v.addEventListener("error", fallback);

    const p = v.play();
    bgv.play().catch(() => {});
    if (p && p.catch) p.catch(fallback);
    // Safety nets: video never starts → logo animation; something stalls → open the app anyway
    setTimeout(() => { if (!finished && v.currentTime === 0) fallback(); }, 2500);
    setTimeout(finish, 15000);
  }

  /* ---------- Boot: first page = Customer / LCO selection ---------- */
  stack.push({ name: "role", params: { first: true } });
  if (HISTORY) history.replaceState({ depth: 1 }, "");
  render(stack[0], "none");
  runSplash();
})();
