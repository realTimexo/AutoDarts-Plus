// ================================================================
//  AutoDarts + – content.js  v3.0
//  Hub · Dart Skin Customizer · Local Tournaments · Ranked
//  Single extension — no cross-extension conflicts possible
// ================================================================

(function() {
  const b = localStorage.getItem('autodarts-board');
  if (b) chrome.storage.local.set({ 'autodarts-board': b });
})();

// ─── Constants ────────────────────────────────────────────────────
const FONT           = "var(--chakra-fonts-body,'Open Sans',sans-serif)";
const PLUS_PATH      = '/autodarts-plus';
const CUSTOMIZE_PATH = '/autodarts-plus/customize';
const TOURNEY_PATH   = '/autodarts-plus/tournaments';
const RANKED_PATH    = '/autodarts-plus/ranked';
const SHORTCUTS_PATH = '/autodarts-plus/shortcuts';
const AI_COACH_PATH  = '/autodarts-plus/ai-coach';
const DONATE_URL     = 'https://timexo.gumroad.com/coffee';
const TOURNEY_DIV_ID = 'autodarts-tools-config';
const STORE_LINKS = {
  edge:    'https://microsoftedge.microsoft.com/addons/detail/autodarts-/emckdnomcmmjiimehoiakppgmmcfagdn',
  firefox: 'https://addons.mozilla.org/firefox/addon/autodarts-plus/',
  github:  'https://github.com/realTimexo/AutoDarts-Plus/releases'
};

// ─── Übersetzungen (nur für neuere Panel-Teile, die dieses Format nutzen) ──
function T() {
    const lng = (window.adTourney && window.adTourney.getLang) ? window.adTourney.getLang() : 'en';
    const dict = {
        en: {
            scTitle: 'Shortcuts',
            scDesc: 'Bind a keyboard key to trigger an action while you\'re on a match or menu page.',
            scNextPlayer: 'Next Player',
            scNextPlayerDesc: 'Presses AutoDarts\' own "confirm / next player" key (Space) for you.',
            scBack: 'Back',
            scBackDesc: 'Presses AutoDarts\' own "back" key (Backspace) for you.',
            scCalibrate: 'Calibrate',
            scCalibrateDesc: 'Triggers auto-calibration on your local board software.',
            scListening: 'Press a key… (Esc to cancel)',
            plusTagline: 'Enhanced features for autodarts.io / autodarts.com',
            donate: 'Donate',
            custTitle: 'Customize Darts',
            custDesc: 'Change the color and look of your dart arrows during matches. Per-part colors and custom SVG support.',
            rankedTitle: 'Ranked',
            rankedDesc: 'Climb from Bronze to World Master by beating bots. Track your rank, win rate and match history.',
            tournTitle: 'Local Tournaments',
            tournDesc: 'KO · Groups + KO · League with automatic result sync and live bracket view.',
            scHubTitle: 'Shortcuts',
            scHubDesc: 'Bind keyboard keys to Next Player, Back and Calibrate while you play.',
            aiHubTitle: 'AI Match Coach',
            aiHubDesc: 'Ask an AI about your last match - what went well, what to work on.',
            exportBtn: 'Export',
            importBtn: 'Import',
            log: 'Log',
            updAvailable: 'Update available',
            updOnVersion: "You're on v{v}. Pick where you installed this extension from:",
            logRankedStats: 'Ranked — Rank: {rank} ({pct}%), Games: {games}, Wins: {wins}, Win rate: {rate}%',
            logRankedNoUser: 'Ranked — Username not found (no match finished yet?)',
            logRankedNoGames: 'Ranked — No games played yet',
            logRankedNoData: 'Ranked — No data found',
            logTournNamedMode: 'Local Tournaments — "{name}", mode: {mode}',
            logTournNoData: 'Local Tournaments — No tournament data found',
            logCustParts: 'Customize Darts — {parts}',
            logCustFlags: 'Customize Darts — Enabled: {enabled}, Blend: {blend}, Custom SVG: {svg}',
            logCustSvgSaved: 'Customize Darts — Custom SVG saved ({len} characters)',
            logCustSvgMissing: 'Customize Darts — Custom SVG mode active but no SVG present',
            logCustNoData: 'Customize Darts — No data found',
            active: 'active', inactive: 'inactive',
            logJsonError: 'JSON parsing error: {msg}',
            logInvalidFile: 'Invalid file — no version field',
            logRankedImported: 'Ranked imported — Rank: {rank} ({pct}%), Games: {games}',
            logRankedSkipped: 'Ranked — not present in file, skipped',
            logTournImported: 'Local Tournaments imported — "{name}"',
            logTournSkipped: 'Local Tournaments — not present in file, skipped',
            logCustImported: 'Customize Darts imported — Enabled: {enabled}, Blend: {blend}, Custom SVG: {svg}',
            logCustSkipped: 'Customize Darts — not present in file, skipped',
            exportTitleAnalyzing: 'Export — Analyzing data...',
            exportTitleDone: 'Export complete',
            downloadJson: 'Download JSON',
            importTitleReading: 'Import — Reading file...',
            importTitleDone: 'Import complete',
            importTitleFailed: 'Import failed'
        },
        de: {
            scTitle: 'Tastenkürzel',
            scDesc: 'Verknüpfe eine Taste mit einer Aktion, während du auf einer Match- oder Menüseite bist.',
            scNextPlayer: 'Nächster Spieler',
            scNextPlayerDesc: 'Drückt für dich AutoDarts\' eigene "Bestätigen / Nächster Spieler"-Taste (Leertaste).',
            scBack: 'Zurück',
            scBackDesc: 'Drückt für dich AutoDarts\' eigene "Zurück"-Taste (Rücktaste).',
            scCalibrate: 'Kalibrieren',
            scCalibrateDesc: 'Startet die Auto-Kalibrierung auf deiner lokalen Board-Software.',
            scListening: 'Taste drücken… (Esc zum Abbrechen)',
            plusTagline: 'Erweiterte Funktionen für autodarts.io / autodarts.com',
            donate: 'Spenden',
            custTitle: 'Darts anpassen',
            custDesc: 'Ändere Farbe und Aussehen deiner Dart-Pfeile während des Matches. Farben pro Teil und eigene SVGs möglich.',
            rankedTitle: 'Ranked',
            rankedDesc: 'Steige von Bronze bis World Master auf, indem du Bots besiegst. Verfolge Rang, Siegquote und Match-Verlauf.',
            tournTitle: 'Lokale Turniere',
            tournDesc: 'KO · Gruppen + KO · Liga mit automatischer Ergebnis-Synchronisation und Live-Turnierbaum.',
            scHubTitle: 'Tastenkürzel',
            scHubDesc: 'Verknüpfe Tasten mit Nächster Spieler, Zurück und Kalibrieren während du spielst.',
            aiHubTitle: 'AI Match Coach',
            aiHubDesc: 'Frag eine KI zu deinem letzten Match - was lief gut, woran arbeiten.',
            exportBtn: 'Exportieren',
            importBtn: 'Importieren',
            log: 'Protokoll',
            updAvailable: 'Update verfügbar',
            updOnVersion: 'Du bist auf v{v}. Wähle, wo du diese Erweiterung installiert hast:',
            logRankedStats: 'Ranked — Rang: {rank} ({pct}%), Spiele: {games}, Siege: {wins}, Win-Rate: {rate}%',
            logRankedNoUser: 'Ranked — Username nicht gefunden (kein Spiel beendet?)',
            logRankedNoGames: 'Ranked — Noch keine Spiele gespielt',
            logRankedNoData: 'Ranked — Keine Daten gefunden',
            logTournNamedMode: 'Lokale Turniere — "{name}", Modus: {mode}',
            logTournNoData: 'Lokale Turniere — Keine Turnierdaten gefunden',
            logCustParts: 'Customize Darts — {parts}',
            logCustFlags: 'Customize Darts — Enabled: {enabled}, Blend: {blend}, Custom SVG: {svg}',
            logCustSvgSaved: 'Customize Darts — Custom SVG gespeichert ({len} Zeichen)',
            logCustSvgMissing: 'Customize Darts — Custom SVG Modus aktiv aber kein SVG vorhanden',
            logCustNoData: 'Customize Darts — Keine Daten gefunden',
            active: 'aktiv', inactive: 'inaktiv',
            logJsonError: 'JSON Parsing-Fehler: {msg}',
            logInvalidFile: 'Ungültige Datei — kein version Feld',
            logRankedImported: 'Ranked importiert — Rang: {rank} ({pct}%), Spiele: {games}',
            logRankedSkipped: 'Ranked — nicht in Datei vorhanden, übersprungen',
            logTournImported: 'Lokale Turniere importiert — "{name}"',
            logTournSkipped: 'Lokale Turniere — nicht in Datei vorhanden, übersprungen',
            logCustImported: 'Customize Darts importiert — Enabled: {enabled}, Blend: {blend}, Custom SVG: {svg}',
            logCustSkipped: 'Customize Darts — nicht in Datei vorhanden, übersprungen',
            exportTitleAnalyzing: 'Export — Analysiere Daten...',
            exportTitleDone: 'Export abgeschlossen',
            downloadJson: 'JSON herunterladen',
            importTitleReading: 'Import — Lese Datei...',
            importTitleDone: 'Import abgeschlossen',
            importTitleFailed: 'Import fehlgeschlagen'
        },
        nl: {
            scTitle: 'Sneltoetsen',
            scDesc: 'Koppel een toets aan een actie terwijl je op een wedstrijd- of menupagina bent.',
            scNextPlayer: 'Volgende speler',
            scNextPlayerDesc: 'Drukt voor jou op AutoDarts\' eigen "bevestigen / volgende speler"-toets (spatie).',
            scBack: 'Terug',
            scBackDesc: 'Drukt voor jou op AutoDarts\' eigen "terug"-toets (backspace).',
            scCalibrate: 'Kalibreren',
            scCalibrateDesc: 'Start automatische kalibratie op je lokale boardsoftware.',
            scListening: 'Druk op een toets… (Esc om te annuleren)',
            plusTagline: 'Uitgebreide functies voor autodarts.io / autodarts.com',
            donate: 'Doneren',
            custTitle: 'Darts aanpassen',
            custDesc: 'Verander de kleur en het uiterlijk van je dartpijlen tijdens wedstrijden. Kleuren per onderdeel en eigen SVG mogelijk.',
            rankedTitle: 'Ranked',
            rankedDesc: 'Klim van Brons naar World Master door bots te verslaan. Volg je rang, winratio en wedstrijdgeschiedenis.',
            tournTitle: 'Lokale Toernooien',
            tournDesc: 'KO · Groepen + KO · Competitie met automatische resultaatsynchronisatie en live schema.',
            scHubTitle: 'Sneltoetsen',
            scHubDesc: 'Koppel toetsen aan Volgende speler, Terug en Kalibreren terwijl je speelt.',
            aiHubTitle: 'AI Match Coach',
            aiHubDesc: 'Vraag een AI naar je laatste wedstrijd - wat ging goed, waar op letten.',
            exportBtn: 'Exporteren',
            importBtn: 'Importeren',
            log: 'Log',
            updAvailable: 'Update beschikbaar',
            updOnVersion: 'Je gebruikt v{v}. Kies waar je deze extensie hebt geïnstalleerd:',
            logRankedStats: 'Ranked — Rang: {rank} ({pct}%), Wedstrijden: {games}, Overwinningen: {wins}, Winratio: {rate}%',
            logRankedNoUser: 'Ranked — Gebruikersnaam niet gevonden (nog geen wedstrijd afgerond?)',
            logRankedNoGames: 'Ranked — Nog geen wedstrijden gespeeld',
            logRankedNoData: 'Ranked — Geen gegevens gevonden',
            logTournNamedMode: 'Lokale Toernooien — "{name}", modus: {mode}',
            logTournNoData: 'Lokale Toernooien — Geen toernooigegevens gevonden',
            logCustParts: 'Darts aanpassen — {parts}',
            logCustFlags: 'Darts aanpassen — Ingeschakeld: {enabled}, Verloop: {blend}, Eigen SVG: {svg}',
            logCustSvgSaved: 'Darts aanpassen — Eigen SVG opgeslagen ({len} tekens)',
            logCustSvgMissing: 'Darts aanpassen — Eigen SVG-modus actief maar geen SVG aanwezig',
            logCustNoData: 'Darts aanpassen — Geen gegevens gevonden',
            active: 'actief', inactive: 'inactief',
            logJsonError: 'JSON-parseerfout: {msg}',
            logInvalidFile: 'Ongeldig bestand — geen version-veld',
            logRankedImported: 'Ranked geïmporteerd — Rang: {rank} ({pct}%), Wedstrijden: {games}',
            logRankedSkipped: 'Ranked — niet aanwezig in bestand, overgeslagen',
            logTournImported: 'Lokale Toernooien geïmporteerd — "{name}"',
            logTournSkipped: 'Lokale Toernooien — niet aanwezig in bestand, overgeslagen',
            logCustImported: 'Darts aanpassen geïmporteerd — Ingeschakeld: {enabled}, Verloop: {blend}, Eigen SVG: {svg}',
            logCustSkipped: 'Darts aanpassen — niet aanwezig in bestand, overgeslagen',
            exportTitleAnalyzing: 'Exporteren — Gegevens analyseren...',
            exportTitleDone: 'Exporteren voltooid',
            downloadJson: 'JSON downloaden',
            importTitleReading: 'Importeren — Bestand lezen...',
            importTitleDone: 'Importeren voltooid',
            importTitleFailed: 'Importeren mislukt'
        }
    };
    return dict[lng] || dict.en;
}


// ─── Dart skin ────────────────────────────────────────────────────
const DEFAULT_COLORS = { flight:'#ffffff',shaft:'#ffffff',barrel:'#c0c0c0',point:'#d9d9d9',enabled:true,blend:false,customSvg:'',useCustomSvg:false };
const PRESET_COLORS  = [{l:'White',h:'#ffffff'},{l:'Silver',h:'#c0c0c0'},{l:'Black',h:'#1a1a1a'},{l:'Red',h:'#e53e3e'},{l:'Blue',h:'#3182ce'},{l:'Green',h:'#38a169'},{l:'Yellow',h:'#d69e2e'},{l:'Purple',h:'#805ad5'},{l:'Orange',h:'#dd6b20'},{l:'Pink',h:'#d53f8c'},{l:'Cyan',h:'#00b5d8'},{l:'Gold',h:'#b7791f'}];
const PARTS          = [{key:'flight',label:'Flight'},{key:'shaft',label:'Shaft'},{key:'barrel',label:'Barrel'},{key:'point',label:'Point'}];

// Escapes text for safe insertion into an innerHTML template (e.g. inside
// a <textarea>). window.adTourney.escapeHtml (constants.js) does the same
// thing for the local-tournament UI; this local copy exists because
// content.js is a separate, self-contained bundle.
function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

// Wraps a page-render call so a thrown error (anywhere in that render
// path - a missing DOM node, a storage read failing, whatever) can never
// leave the user staring at a permanently blank page. hideMain() runs at
// the very start of every render*Page function, before any of our own
// UI gets appended - if something throws in between, the real AutoDarts
// UI stays hidden and nothing replaces it, which looks exactly like "the
// page doesn't load". This logs the real error (so it can be diagnosed)
// and falls back to showing the underlying page again instead of a
// silent permanent blank.
async function safeRender(fn) {
  try {
    await fn();
  } catch (e) {
    console.error('[AutoDarts+] Page render failed, falling back to the underlying page:', e);
    showMain();
  }
}

// Strips script-executing content from a user-supplied SVG before it is
// ever inserted into the DOM via innerHTML: <script> tags, event-handler
// attributes (onload, onerror, onclick, ...), and javascript: URIs in
// href/xlink:href. "Custom SVG" dart skins can come from three places -
// pasted directly by the user, loaded from extension storage, or merged
// in via Import/Export of a shared config file - and every one of those
// is untrusted input as far as the DOM is concerned. This MUST be called
// on customSvg before it is stored and again before every render, not
// just once somewhere in the chain.
//
// Prefers window.DOMPurify.sanitize() (src/core/purify.js, loaded before
// this file) - a real DOMParser-based sanitizer, which handles attribute-
// context breakouts that a regex approach can't reliably catch. Falls
// back to a regex-based clean if that's unavailable for any reason.
function sanitizeSvg(svg) {
  if (!svg) return svg;
  if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
    const cleaned = window.DOMPurify.sanitize(String(svg));
    return cleaned || '';
  }
  let clean = String(svg);
  clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '');
  clean = clean.replace(/\son\w+\s*=\s*"[^"]*"/gi, '');
  clean = clean.replace(/\son\w+\s*=\s*'[^']*'/gi, '');
  clean = clean.replace(/\son\w+\s*=\s*[^\s>]+/gi, '');
  clean = clean.replace(/(href|xlink:href)\s*=\s*"(\s*javascript:[^"]*)"/gi, '$1="#"');
  clean = clean.replace(/(href|xlink:href)\s*=\s*'(\s*javascript:[^']*)'/gi, "$1='#'");
  return clean;
}

// Validates a color value is a plain hex code before it's ever
// interpolated into an SVG attribute (stop-color="${...}") - this is the
// same ^#[0-9a-fA-F]{6}$ check the manual color picker already used, now
// also applied to values coming from Import.
function isValidHexColor(v) {
  return typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v);
}

function buildSvg(c) {
  if (c.useCustomSvg && c.customSvg && c.customSvg.trim()) return sanitizeSvg(c.customSvg.trim());
  // Defense in depth: force every color through a strict hex check before
  // it's interpolated into an SVG attribute, regardless of where it came
  // from (manual picker, storage, or an imported config file). A value
  // like `#fff" onload="..."` would otherwise break out of the
  // stop-color="..." attribute.
  const safeHex = (v, fallback) => isValidHexColor(v) ? v : fallback;
  const flight = safeHex(c.flight, DEFAULT_COLORS.flight);
  const shaft  = safeHex(c.shaft,  DEFAULT_COLORS.shaft);
  const barrel = safeHex(c.barrel, DEFAULT_COLORS.barrel);
  const point  = safeHex(c.point,  DEFAULT_COLORS.point);
  const stops = c.blend
    ? `<stop offset="0%" stop-color="${flight}"/><stop offset="20%" stop-color="${flight}"/><stop offset="35%" stop-color="${shaft}"/><stop offset="55%" stop-color="${barrel}"/><stop offset="80%" stop-color="${barrel}"/><stop offset="100%" stop-color="${point}"/>`
    : `<stop offset="0%" stop-color="${flight}"/><stop offset="20%" stop-color="${flight}"/><stop offset="20%" stop-color="${shaft}"/><stop offset="35%" stop-color="${shaft}"/><stop offset="35%" stop-color="${barrel}"/><stop offset="80%" stop-color="${barrel}"/><stop offset="80%" stop-color="${point}"/><stop offset="100%" stop-color="${point}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 102"><defs><linearGradient id="dg" x1="0" y1="0" x2="477" y2="0" gradientUnits="userSpaceOnUse">${stops}</linearGradient></defs><path fill="url(#dg)" d="M26.56.5h53.65l.14.11,55.78,45,42.2-.07,42.49.07c.95-.56,6.88-4,10.06-4h152.73c2.11,0,4.43.36,6.9,1.07,1.96.56,4.03,1.35,6.13,2.34,3.16,1.48,5.42,2.94,5.98,3.31,2.04,0,23.83-.1,40.68-.1,10.34,0,16.83.03,19.29.1,5.75.16,13.13,1.98,13.95,2.19h.02s-.12.48-.12.48h0s.12.5.12.5h-.02c-.82.21-8.2,2.02-13.95,2.19-2.45.07-8.94.1-19.29.1-16.85,0-38.64-.09-40.68-.1-.56.37-2.82,1.83-5.98,3.31-3.32,1.55-8.27,3.41-13.03,3.41h-152.73c-3.19,0-9.11-3.44-10.06-4l-42.49.07-42.2-.07-55.78,45-.14.11H26.56l-.14-.27L1,51.23l-.12-.23.12-.23L26.43.77l.14-.27Z"/></svg>`;
}
const loadColors = () => new Promise(r => chrome.storage.local.get('dartColors', d => {
  const merged = d.dartColors ? {...DEFAULT_COLORS, ...d.dartColors} : {...DEFAULT_COLORS};
  // Defense in depth: sanitize on the way OUT of storage too, not just
  // going in - catches anything that was saved before this fix existed,
  // or by any code path that doesn't go through the sanitized save/import
  // handlers above.
  if (merged.customSvg) merged.customSvg = sanitizeSvg(merged.customSvg);
  if (!isValidHexColor(merged.flight)) merged.flight = DEFAULT_COLORS.flight;
  if (!isValidHexColor(merged.shaft))  merged.shaft  = DEFAULT_COLORS.shaft;
  if (!isValidHexColor(merged.barrel)) merged.barrel = DEFAULT_COLORS.barrel;
  if (!isValidHexColor(merged.point))  merged.point  = DEFAULT_COLORS.point;
  r(merged);
}));
const saveColors = c => new Promise(r => chrome.storage.local.set({dartColors:c}, r));

let _dartSkinObserver = null;
let _dartSkinInterval = null;

// Never touch the site's own logo/nav — a wide "AutoDarts" wordmark logo
// can accidentally match the aspect-ratio heuristic below, which is what
// caused the header logo to be overwritten with the custom dart skin
// after navigating back out of a match. Anything living inside the
// header/nav (or the "Autodarts" home link specifically) is off-limits
// for every strategy, not just some of them.
function isSkinExcluded(img) {
  return !!(img.closest('header') || img.closest('nav') || img.closest('a[aria-label="Autodarts"]'));
}

// ── New site (play.autodarts.com) renders the in-match "darts thrown"
// indicator as an inline <svg><path fill="#F7F8FA" d="M3.59665 0H..."/>
// icon (one big one at the top of the score header, three small ones per
// dart attempt) instead of an <img>. This is NOT the old flight/shaft/
// barrel/point image — it's a single-color glyph, so we can only give it
// one representative color, but doing that beats leaving it untouched.
// Matching happens on the exact `d` path data, which is effectively a
// fingerprint unique to this icon — there's no risk of it accidentally
// matching an unrelated element the way a loose selector could.
const DART_ICON_PATH_PREFIX = 'M3.59665 0H11.1107';
function applyInlineSvgDartIcon(colorHex) {
  const paths = document.querySelectorAll('svg path[fill="#F7F8FA"]');
  let matched = 0;
  paths.forEach(p => {
    const d = p.getAttribute('d') || '';
    if (d.startsWith(DART_ICON_PATH_PREFIX)) {
      p.setAttribute('fill', colorHex);
      matched++;
    }
  });
  return matched;
}

async function injectDartSkin() {
  const c = await loadColors(); if (!c.enabled) return;
  const src = 'data:image/svg+xml;utf8,' + encodeURIComponent(buildSvg(c));

  const tryIt = () => {
    // Bail immediately if we've since navigated away from a match page —
    // closes a race where a debounced MutationObserver/interval callback
    // from the match page fires just after `stopDartSkinInjection()` was
    // supposed to have cancelled it (e.g. right as `watchUrl` is still
    // mid-callback), which could otherwise re-run `tryIt()` against the
    // *new* (non-match) page's images.
    if (!location.pathname.includes('/matches')) return false;

    // Strategy 0: exact-match inline SVG dart icon (new site). Tried
    // first because it's a precise fingerprint match, not a heuristic —
    // if it hits, we're done and never need to touch any <img> at all.
    const iconColor = isValidHexColor(c.flight) ? c.flight : DEFAULT_COLORS.flight;
    const iconMatches = applyInlineSvgDartIcon(iconColor);
    if (iconMatches > 0) {
      console.log('[AutoDarts+] dart skin: recolored ' + iconMatches + ' inline dart-icon SVG path(s)');
      return true;
    }

    const allImgs = Array.from(document.querySelectorAll('img')).filter(img => !isSkinExcluded(img));
    if (!allImgs.length) { console.log('[AutoDarts+] dart skin: no candidate <img> elements found on this match page (site may render darts via canvas/SVG instead of <img> — please report this if it persists)'); return false; }

    // Strategy 1: dart-related attributes (works when .com uses descriptive attrs)
    const dartImgs = allImgs.filter(img =>
      (img.src && img.src.includes('dart')) ||
      (img.alt && img.alt.toLowerCase().includes('dart')) ||
      (img.className && img.className.toLowerCase().includes('dart')) ||
      (img.closest('[class*="dart"],[id*="dart"]'))
    );
    if (dartImgs.length >= 3) {
      dartImgs.slice(0, 3).forEach(img => { img.src = src; });
      console.log('[AutoDarts+] dart skin: applied via attribute match (' + dartImgs.length + ' images)');
      return true;
    }
    if (dartImgs.length > 0) {
      dartImgs.forEach(img => { img.src = src; });
      console.log('[AutoDarts+] dart skin: applied via attribute match (' + dartImgs.length + ' images)');
      return true;
    }

    // Strategy 2: aspect-ratio based — dart SVG is ~4.7:1 (477x102).
    // Require at least 3 matches (one per dart) before trusting this: a
    // single wide match is far more likely a stray banner/avatar/icon
    // than the actual in-game dart image, and applying the skin to the
    // wrong single element is how it silently "succeeds" while the real
    // darts in the match stay untouched.
    const dartShaped = allImgs.filter(img => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return false;
      const ratio = w / h;
      return ratio > 3.5 && ratio < 6.5;
    });
    if (dartShaped.length >= 3) {
      dartShaped.forEach(img => { img.src = src; });
      console.log('[AutoDarts+] dart skin: applied via aspect-ratio match (' + dartShaped.length + ' images)');
      return true;
    }
    if (dartShaped.length > 0) {
      console.log('[AutoDarts+] dart skin: found ' + dartShaped.length + ' aspect-ratio candidate(s) but need at least 3 to be confident — skipping to avoid hijacking the wrong image. Please report this (with a screenshot of the in-game dart element in DevTools) so the selector can be tightened.');
    }

    // Strategy 3: original index-based fallback (.io DOM: imgs 3-5)
    if (allImgs.length >= 6) {
      [3,4,5].forEach(i => { if (allImgs[i]) allImgs[i].src = src; });
      console.log('[AutoDarts+] dart skin: applied via index fallback');
      return true;
    }

    console.log('[AutoDarts+] dart skin: ' + allImgs.length + ' candidate image(s) found but none matched any strategy — please report the match page HTML if this keeps happening');
    return false;
  };

  if (_dartSkinObserver) _dartSkinObserver.disconnect();
  if (_dartSkinInterval) clearInterval(_dartSkinInterval);

  tryIt();
  // Keep watching for the lifetime of this match page instead of
  // disconnecting after the first success, so the skin survives a later
  // re-render (new leg, new turn, reconnect) instead of silently
  // disappearing. IMPORTANT: only watch childList/subtree (elements being
  // added/removed), NOT attributes - watching `attributes:true` on the
  // whole document.body during a live match caused a severe performance
  // problem: AutoDarts' own live camera/score UI mutates DOM attributes
  // extremely frequently during an active throw, so an attribute-level
  // observer on the whole body fired constantly and made the entire tab
  // unresponsive (no clicks registering, throws not counting, endless
  // loading spinner). childList mutations (elements appearing/
  // disappearing) are far rarer, and the callback itself is debounced on
  // top of that so a burst of mutations only triggers one check.
  let _debounceTimer = null;
  _dartSkinObserver = new MutationObserver(() => {
    if (!location.pathname.includes('/matches')) return;
    if (_debounceTimer) return;
    _debounceTimer = setTimeout(() => { _debounceTimer = null; tryIt(); }, 250);
  });
  _dartSkinObserver.observe(document.body, {childList:true, subtree:true});
  // Belt-and-braces poll (cheap - just a few querySelectorAll calls every
  // 2s) in case a re-render doesn't trigger a childList mutation we'd
  // catch above (e.g. the dart <img> src gets reset in place without the
  // element itself being replaced).
  _dartSkinInterval = setInterval(() => {
    if (!location.pathname.includes('/matches')) { stopDartSkinInjection(); return; }
    tryIt();
  }, 2000);
}

function stopDartSkinInjection() {
  if (_dartSkinObserver) { _dartSkinObserver.disconnect(); _dartSkinObserver = null; }
  if (_dartSkinInterval) { clearInterval(_dartSkinInterval); _dartSkinInterval = null; }
}

// ─── Ranked data ──────────────────────────────────────────────────
// ─── Premium ──────────────────────────────────────────────────────
// Time-limited Premium unlock via a redeemable code. Honest technical
// note (also explained in this repo's CHANGES file, and worth repeating
// here in the code itself for future-you): this is a client-side gate in
// an extension whose full source the end user's own browser executes and
// can inspect. No client-side check like this - regardless of exactly
// how the "is this code valid" question is answered - can be made robust
// against someone determined to bypass it (reading network requests,
// editing chrome.storage.local directly via devtools, or patching the
// unpacked extension's own JS). What this DOES do is work correctly and
// unintrusively for the overwhelming majority of normal users who aren't
// trying to cheat it, which is what a soft feature-gate like this is
// realistically for.
const PREMIUM_KEY = 'adPremium';
const PREMIUM_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
const FREE_GAMES_LIMIT = 3;
const CODES_URL = 'https://timexo.wuaze.com/AD-Plus/codes.txt';
const UPGRADE_URL = 'https://timexo.wuaze.com/AD-Plus/upgrade';

const loadPremium = () => new Promise(r => chrome.storage.local.get(PREMIUM_KEY, d => r({
  premiumUntil: 0, freeGamesPlayed: 0, redeemedCodes: [],
  ...(d[PREMIUM_KEY] || {})
})));
const savePremium = p => new Promise(r => chrome.storage.local.set({ [PREMIUM_KEY]: p }, r));

async function isPremiumActive() {
  const p = await loadPremium();
  return p.premiumUntil > Date.now();
}

// Counts a completed Ranked or Local Tournament match towards the free
// quota. Call this once per finished match, not per action - the limit
// is "N free games", not "N free clicks".
async function countFreeGamePlayed() {
  const p = await loadPremium();
  if (p.premiumUntil > Date.now()) return; // premium users don't consume the counter
  p.freeGamesPlayed = (p.freeGamesPlayed || 0) + 1;
  await savePremium(p);
}

async function freeGamesRemaining() {
  const p = await loadPremium();
  if (p.premiumUntil > Date.now()) return Infinity;
  return Math.max(0, FREE_GAMES_LIMIT - (p.freeGamesPlayed || 0));
}

// Redeems a code against the public code list. Since the list has no
// server-side "mark as used" mechanism (it's a static file, not a real
// backend), this can't prevent the same code being reused by different
// people who all read the same public URL - only that this specific
// browser profile can't replay the exact same code it already redeemed
// once, as a minimal, cheap safeguard.
// Local fallback code list, used only when the remote codes.txt can't be
// reached at all (network error / host issue) - not the primary source
// of truth. If the remote list is reachable, it's always checked first
// and takes priority (so revoking/rotating codes on the server side
// still works normally); this only kicks in so redemption doesn't fully
// break for users just because your free host had a bad moment. Same
// "client-side check, not real DRM" caveat applies as noted above -
// arguably more so, since this list ships inside the extension itself
// and can be read by anyone who unpacks it.
const LOCAL_FALLBACK_CODES = 'U0LP0-IL2WU-RVT84\nRGMZD-8DZFX-NKAJS\nHMOVW-GMW6T-R7YJT\nGHMCD-JU2XO-PXRWF\nUJTKC-LNF6I-SVVBA\nFUMJF-O6Y0C-JZ1S8\n6T0XH-7WENZ-G8O4L\nG28IU-JMKNX-BDDOM\nYT6RE-OUACN-IG55K\n33GGS-SLJ3P-4LZS6\nU55JC-0QGCT-XY7VW\nBSWIH-2SUFT-NHYOJ\nPDMPS-YZ1OX-6L5LI\nPE1J3-2JG0L-PI0SU\nVD446-KELU5-V1FO0\nPSL5R-2XUW0-YIQ6I\nPOM2W-ZM7S8-GZ5GG\nKS215-FPFQF-IZN6B\n1M3TD-0XEGO-Z555C\n3HI9S-84GGC-X59A6\nI5LZ5-CWIJ6-TZ31R\nI7X0R-KTI3D-LUL18\nSIZBI-ESBJ3-489Q5\nHI6Z5-M9O6E-VKI5X\nTH1DM-OJH46-3ZBWA\n8JYII-9UZO8-NZTQ0\nU8HPZ-ZLOQK-DOKHH\nL1M3T-75ELK-LSYPT\n7LMMX-HK6HV-VM860\n1JFWN-ZGCNH-YHOH6\nUPECH-EG8GP-QUPBD\nHN0OB-OBF0U-27W78\nDM814-3RODP-3A2BC\nHT6JF-YXZXX-28AV3\n3JAQ8-HRB82-OUVLQ\nDO1UT-HMXVX-RTDF6\n2DYA5-F05FF-DNKKI\n79X5L-ZMCI0-GW7G5\nXUY76-S6ABO-IMHDK\nDVP98-4YRUA-CFF3O\nXZY71-G81PP-NIMAE\n23SVP-371C2-HNT9D\nTIPSR-FN8Y0-HRQY2\n0ATZY-NVC6U-84PG5\nYBXAQ-6QILD-5SCO7\n79QPV-L51S1-U85U6\n1ELGM-PA8FI-X5OVU\nGFBET-75SG7-6INAQ\nOYIOA-H3AF3-U9Z5Q\nVCSQ2-54PM2-LV7TA\nRTU7J-723JI-V0N38\nGHX9L-MWCBH-6LG0B\n01CQ8-X27PC-KY1CE\nW4A0C-4NO56-IB04I\nR63CP-PC6NG-MKRSF\n8SI7N-UUJQT-G09MM\n830WB-051UA-RZDJ8\nW7XUC-FGM46-CGOQ9\nKBTHL-8Y556-7Y86N\nFA1QO-NKK89-GW4WO\nF7KFE-4CUTG-QK0YM\nJL7QX-5WPFF-1UHP0\nX6SY2-MJ92Y-K6CXR\nA2K2S-F6IL1-0Y337\nA0JRU-0NXZB-9Q0AT\nM6C5O-IRCFJ-6FQOI\n80D2C-6VTAF-E1P1O\nZ78GO-U9JRC-3IWKH\n1W54G-MYNCR-15ZPK\nXQPLI-ELE61-4CL2J\n418HG-PRJPM-8P0NB\nGOIIA-CBYXB-394U3\nSK0GR-GLHYX-KYDEO\nZAJ0M-G79UQ-75PIR\nQW4NJ-E7GMT-660R8\nI1VZ6-L8K4U-9W6H8\nC43MQ-FHZFG-4VPJI\nT3PIQ-6DUXT-JR52X\nM7RHB-R16KL-T7C5L\n4D1DX-LVBSY-GUZQH\nE2J69-02IDO-6Z7I8\nOCTYS-A4P0N-SL8BT\nVM18S-QR057-9YHK5\n0F543-2RASO-PYFWK\nPGK0G-JIAUS-AVW93\nAL1QH-OXXIR-XLVFP\nZ14TI-6VFHB-LY8IF\nQIXJK-PBURD-Y80OF\nWY9E7-PQ657-3J5U1\nPCW7G-4LAHC-POJE5\n0CVR2-LAVSK-7I5P2\n0H9MI-W37X8-ZSLW6\n1ZA0H-SUB0R-PQ3QD\nBPJTK-RRTDD-IMKIN\n9V0DK-KC5Z0-DCWCB\n92012-GOYJV-HL86U\n8N87Q-IPWPC-NBCE7\nOBQEQ-RKVC2-P8Y1M\nR7GRE-TJ44G-83ZF3\nZZDEC-NLF4D-Q5YMC\n70ZXN-ZXJF3-Z8QC1\nDPFXQ-ATJ52-2DA9W\nNSJ3Z-5C1HG-95M8O\n5LOK4-US9V5-JYBZU\n2WL4Q-PZFT9-KBCR4\n7XHEU-F1IJ6-CRLSF\nNX7MU-9UOUX-A9AAP\nRV2UC-QHUAU-6EBC0\nRX9YI-BSNPN-GFKRN\n8L677-0BAG9-ZNOES\nM580F-2CCF1-GQRXH\nH1XXV-1EY2R-MH84L\nRQKZ4-XA9IQ-GBO8E\nU5S0N-8OYRV-1WOLA\n2GGK6-YPG42-PXOH9\n56CWK-XIC0Y-JN6JG\nD7OPJ-XDOS3-T3FYH\n05MNQ-IMW6L-S3P54\n22DM3-B3T4Y-6U0CG\n3D64X-0CCEU-53MZ8\nEQ90M-HJ61T-YVE0O\nZ3763-R2YM5-IZE0Q\n6SIER-TUM5S-B6R7R\nN1AF1-IQM7M-MT3GP\n69QUC-05G7L-XVZSD\n6U3YR-CBDTM-CFYTE\nANLAI-C6QS3-S794A\n8DAKT-2PE7U-XW61N\nXDN2L-AA364-G6DQO\nGQMBU-R352V-9MDIX\nEGA3X-NAF5S-1PT4F\nB6CHE-50JAW-VRCJG\nJCVB0-JGKDU-X8JIO\n8F5HH-MCO26-CDJTI\nJAQ25-DFRJG-N8T3D\nAM49P-OLO6R-ANPDW\nXW4LA-52JQT-Z16G3\nJHBJO-G7Z7U-WLZN1\n7G4FG-RCMCZ-891X4\nJGVDL-QPFV5-PWUXR\n58W0O-7M7HF-9QH6C\n9M806-QA9MX-0WWQP\nTTIOH-21U32-7FXGB\n00LK5-3VR9S-URA9R\n4UNMP-IC9WL-MYEYJ\nWBDOT-ZFTJT-ETZJ4\n1GN1Y-NK3JR-OM1H4\nSG8CA-I23SS-SN4S4\nKJWML-69D9M-17I0V\n4FG1H-7V1KG-DZ9QT\nWDRS6-DS8ZD-ASRER\nTB0U3-7MF2H-QA33N\nBQ1D7-OS6CZ-73P5J\n1JL1A-MZK38-11QDR\nP9QBN-I49K2-J6FAK\nA3ZFK-XFZQO-L04KQ\nHCHR9-49WJR-N74WK\nL78EO-OL9TO-ZDGAE\nFR7HE-D57T2-NECR7\n3UWNO-MD53J-VLG2T\nS0N1M-I8OUC-2PO06\nZ2NBF-TX9RN-MRYM4\nJOCTB-B8ZJ8-2KDZS\n9JKRT-D44EY-P72XL\nONJWL-UH66R-1RBTQ\n6G7TX-9LXK5-3OVVN\n65IL9-5CCMT-0SLDG\n0JHIL-F9KKX-70IBV\n69C9I-C9BBH-ZCPI7\nR4WJE-SZ9PT-KIXYT\nK1F10-84UE6-EY8P2\n78BZU-JZTU9-132V5\nLYRRF-YZNTU-W5CWY\nT1QIX-UO097-HR5SH\nDDIER-913LD-A5THO\nL9YI3-KEW75-ZZ7O7\nBU17J-6E5LA-GLRL4\n9IU7V-TIXKP-138RO\nIWHMZ-MJ6O2-5LH12\nBHI50-VE4GQ-ZRAET\nH5KVF-7HX7O-DGYLB\n4H8PC-EVU6F-SYMUG\n1WN4B-4ZWC7-PTTEE\n5AH6X-AM6RT-9ZB3R\nCB4G2-PD0WZ-0X9SR\nSOWNX-W6YKT-MAUWV\n6L65V-ZWDD5-9QPXO\nH1IZN-GTDG8-V3HM3\nHH7FW-TFCQY-PVSZF\n5CZ91-MH9CT-WSF1I\nSDWS8-09DK2-Y7J49\n7P0KG-OZACA-P38MD\nSN6HW-L57A5-XR9GI\nYMY3S-7PBZX-ZVMZV\n90YH6-EECA3-U83A3\nTBH91-448VH-GD9SC\nF2VMP-MPXMT-J2TEB\nEOCEM-RD0MZ-KNRCW\nCBPTK-IDRMJ-RVPOV\nCMEI1-I6XB6-BA5CQ\n44TMB-7YFD4-QTO6M\n7L55X-1A5ZE-GGIAF\n01O64-9ZA6V-XV327\nELK1D-XECWY-LFIU9\nFX8U5-VNTNR-KJXAI\nPF2JT-0YY9B-W52LP\nLQLVA-V6HL6-J08Z0\nBX510-B8L27-TQL3V\n6D93G-L2K5G-WS3NH\nR6CVL-IDP0J-RS58R\n5AAS0-XAAR3-2NA40\nJCL6O-LPXNM-NFN2Z\nNPCID-Q50KP-AC43M\nE28SB-WZA03-3M57O\nB9W9D-VYQKV-M0041\nSG343-J6591-ENIHW\nP5F4U-3MQWG-L5I53\nMURY2-JADBP-JONXA\nR6AX3-P2BQ2-JODBF\nCXWNI-D931Q-JXWFV\nQQFQU-9M2PB-BP4SE\n9I9L1-HGJCI-DEQOR\nWC6EX-TAO25-ERLG9\nF7ELJ-F50OL-ENDCL\n0J7JN-4QOK7-6ZS9G\n7E0QC-IJKZU-GEH3R\n28790-FEJ7R-7V1H9\nAFY9K-5BKMI-3XLEH\nLRF9L-V7DK5-RL9VY\n9VHVB-OPMEM-6YXAV\nF9JHP-SOYNO-X50KL\n5P9JN-4X6KC-LHUZ4\nH62NU-MCQRN-U9590\nWEXFO-L2PWE-R99C1\n7VH1A-91V8T-TQTK8\n1MQZ9-RR3BB-7G80Z\n8SKJ8-FHN90-3MQNT\n3DW8R-KBW2O-JZ0MN\nDTJ5T-GO0W7-B64F6\nNAP5E-JA3G8-W5BCM\nA25BK-IW7FL-5DPN9\nLPR70-2PH6J-78EYC\nVW1AV-SZMMN-SO7OD\nZ6F77-J5ALG-L37U5\nS7C5W-CA3VB-WD4OU\nKI33F-XDLKY-RJTSR\nZ5HW6-KPE4N-K57FM\nOH8SA-Z778D-SES0B\n2Y5MG-SY6R9-534PC\n2UV71-UQ31P-MMWGJ\nSBI5L-81LUU-ZNUXU\nPDONF-ZHYLK-3MNQF\n5HP3F-J5W1B-Y2DAN\n6K7TV-QJ9ZU-X3DGV\n162GL-1VOYP-6EDHO\nH2IMN-YC83B-MB13E\nH2USX-IFJNT-OJFUK\n4SL1A-OUU6B-NBM1G\nVK5JX-DLW64-N20U5\n0JD0O-XWCCH-W6FH0\n197TP-EVN5Q-SN0OA\nK54L3-2IHYU-BQJUW\nBDNKK-9JD1C-MDJ2Y\n98HSA-LR5TB-IOFOH\n9LGUW-MVLXB-C9O1U\nHKRNH-731SO-UVHSJ\nD90FV-JA522-O44OM\nE1J6A-4EMSJ-VYS82\nEB2O6-ALAZD-00NGG\nQAS57-NV1SZ-ODMH5\nXQRIE-F9HFM-GALCX\n199WF-D2SNF-A4RLV\nCMIC5-Y2B38-EQR36\n8ER73-ETR1P-M5LNN\nPLKHJ-T7K6H-2Z2OW\n2QTSE-F2AFT-ZSDVM\nMY8DE-04MLJ-JVACX\n7BAT2-GKGYV-DTVTC\nZS9MS-CDQGP-IGD2M\nNAGY3-TAWY4-TM98R\nBOW8Q-67A2T-9X1YW\nNXIN1-FREC9-JT1TJ\n1AQ7W-6DAE8-YA27P\n5H6YQ-8SLE1-LHSDF\nF3SEO-KHOPR-8SQ3Z\nTWGQO-T2YF8-IH6VD\n1W2AQ-QK429-CCK38\nDNNX8-0FS6Z-B6IEB\n793QY-RANFO-25ZT3\nP0JC3-UGIGY-IJMO6\n6RACN-IKHSA-KUVFN\n6DUQS-UM3CP-6PQ73\n7O7WN-EJQ17-DY9LX\n6EOGR-WXB5L-VL1YI\n4JD7T-K2HLG-4A0Z4\nTP0RX-P0TIX-Y0S46\nMN9O3-YXYL3-IRNBO\nQMK60-3AW92-XH18R\nCMFDH-AUN8X-ARMAH\n4LWEO-W39EC-UCGTG\nRNTPA-TH22U-A5SPC\nO3FWQ-A5KL6-F5Z1J\n2CN53-0IPSG-ZJD9C\nIN8LO-F1RX1-VIPHE\nT1JG0-XVA40-MUG02\n18Z5A-P5TEN-SQD41\nPTNPU-Z9QWZ-F1SCR\n0V7B6-KVLTY-472S1\nV21WY-LLEIY-Y5JOK\nLPB2E-2Z660-I59O8\nL8FU3-IW6LK-C67XT\n59N44-SY68Y-T6NDP\nH8OD3-YGOIF-8TAMU\nSYENX-HRLXX-0XBIJ\nLII2Z-UCAZW-KTQYQ\n81W7Z-QZXOT-LXMR1\nYRYF4-HQ4BG-VL6BV\n45WUF-EHVD5-AVVM7\nH55WC-YBPPA-9T2IA\nRK626-SUBYH-838YL\nALOVY-J234V-1HDSN\nXPK9L-DN91J-2EVLM\nTXKUE-E20FT-T6J6W\nC60HB-BYDMK-W4SXB\nMKQI7-Q5UV4-UM3VP\nGCI3K-35IWI-UJM7T\nM3I6H-ECHI6-BSL1U\nGCGNE-9P833-QFCDI\n5NHE9-RFA69-C9H98\n06GN6-T6SM8-R54AC\nY5S5S-JAFBL-EVFXN\n41PM7-GX6VQ-YN9Y8\nW2DEQ-X8P8E-2XHLV\n9YKPA-JIYG7-J88WP\n1W3O5-9WJF4-2N7EM\nGWUR2-RVJ18-3JUQ9\nUBWST-5V6P0-2YKMW\n8GVMP-S8JER-9LRIY\nE7WKM-589B0-2QPJB\n411EJ-SUOZN-ZOKHI\nEQJ6S-JU96S-YTKQ1\nJ1QAR-5ZA7O-6RS85\n2OTTO-G3IAB-WB33P\n1KDB7-U6D4W-XSFR5\nG3KDR-U3HER-OADDM\nFFR9G-8MN80-NXLQD\nX7HSJ-V30GH-J4NLM\nSRPNE-98110-CARE4\n5GVRU-AP2I1-JCYGG\nPNGET-Z4P1N-FS1FW\n3MNCK-V8KJC-EPQUS\n3K5XZ-KZ0S5-LPFX0\nP0U20-AELY1-LGWUW\nGC2PG-WDQ1G-FVBKG\n9GDQO-T7470-PHV1Q\nL7WRQ-3ZJ7N-7K9TF\nL932D-5CGVG-AQ504\n91Y2F-MEJEK-ZYRU2\n9PHAJ-48MOZ-PK4OC\nEQGL5-ULVJ5-FG1ML\nH2GRZ-VOGC8-BWNIS\nHPMTT-F4DI7-BXEF2\nCW00H-161HX-986K8\nAMKY7-M701N-23MK9\n9RBWS-NX15Q-4NG5F\nLP3GI-9MVWX-0KCSB\nF5OD4-5PKJL-OVBXC\nWIYW4-8TGI8-PBRUV\nF8H5K-6GKHE-UGMY4\n96A1T-RGNW7-9J2KC\n7MWM7-NCZXB-CWLT0\nW0DW1-K5Q2C-K78KD\n1VTYC-91YCB-AA9TF\nEZL92-ZFSOU-CNXNQ\nY6C5S-3GYEO-Q1MTP\nEBN3W-388QF-1CX6L\nUXCXL-G7JMC-6FTTP\nQU4BL-AGXFF-ZQ5FX\nJ4VID-F1M6T-QSFNW\n5UWVL-NFGZM-DG3NQ\nLKW8P-2VL3L-MI0GP\nK87QV-HVUHK-9YFZK\n6FOE1-YSYHE-UGE9R\n7DUUV-M7OZ0-4TJPD\n5AKIY-O9OFM-7L7W6\nSU9MM-53QPH-4EY4X\nRBANS-QUJYT-APNE6\nRK2PY-LCAQ5-QX973\nCQ9F3-LSE2E-8CTXC\nGQL6E-9TADO-KMQUX\nY04K3-FO7OI-Q3OFK\nIKJ1W-D8GNI-NPM9U\nEL7G6-670HX-4E15U\nPXES8-A2DRL-XQG5T\n2Q63A-YRY10-C2MU8\nO3X9W-ZZCHO-NF3KD\nOPOHX-XK358-4QNWI\nKQI88-3BFWW-8MI4L\n6NAXX-HPCUJ-HORKV\nPLVSB-PGFPY-3O1HL\nCMPXJ-JAT0Z-0SIKM\nVKZFS-OBDGD-S4OLV\nD55GB-906WB-N4FFS\nQO0SF-003FG-M41ZU\n2808M-STZQM-VIUEJ\n7SNPY-AA2D3-88W0D\n71LSG-W7FP4-Z8KHE\nY18FK-WLDUL-99I3W\nXS1EF-CVGMB-3OV30\n5OPFF-Z81DY-D7QRQ\nNTE6R-U58WJ-PSY05\nM2IUU-T3FQJ-F54TK\nSQ3AJ-ZJNCF-WSFQV\nLUALU-4EZTJ-Z32NG\n4X1AG-C47HM-CC0B3\n8Q3QX-EWT0Z-JWA46\nSX6KS-QBMED-306W1\n1T3OZ-FC784-S4PZX\nLEOIV-SGF3X-3GF0L\nP4LM4-DD13F-29NQC\nZP3UE-HUJQ7-YDL9X\nF1532-L8GKP-L2L6U\nBW5MW-QG7PN-RAGD0\n95B85-37RMG-0SAW9\nQBN0C-0965T-YLZ0G\nQLA2V-JCXV7-TULB4\nW4GDC-FA96W-PQCIE\nIL9YY-5C91B-4IW77\n4IQAX-PY2WO-6MRZD\nWEZJV-SUI3I-JUFD4\nP7U08-QU9CR-D45SR\n9OXKH-40YJG-NVDGN\n5WLE7-TOVYF-MTSER\n0QB0W-1AYM6-O3JW2\nM9HRA-65ZGE-PRUOZ\nXRTAE-KXO4I-F6RCY\nPIZRV-IFL1V-58R76\nI3CRW-I8SD7-LYQTH\nDQXG4-H1F12-H0WT8\nJEONM-NIINI-3UPKR\nUZBQZ-14XLR-OOZ8H\nK0NRO-6O0D2-ZLVRQ\nGSEJT-KBS8E-C03B8\nGA6A3-RR2KK-G4HT5\nQ937A-F0R1X-2OHPF\nHIQVW-D2OFS-T4G20\nDQ49S-ZHFA0-BNV5J\n364JP-E75ZD-CREJO\nZTML2-0PLHF-Y65PD\n2P6GO-14H92-6LAK1\n7498M-QX3LB-SBGOT\nQQ3PR-4YFZT-JFGNZ\nUFNG8-PX2AC-RZ5BQ\n9XCGI-V3J5J-9ND0H\n1P57S-APF85-8LXOR\nFUPEA-26TTF-V4JTZ\nSRQDI-LWXCY-22HGB\n8Q1C8-GIJ9B-GK3OB\n2KJHZ-IOZY4-WSV2Y\n0CYUH-HRLR5-Q9F52\nF2WZI-DDSCU-NEUJD\nW64T0-BT19G-0OQSW\nXR1B6-RSZ65-S3X5H\nRO3JI-WM89I-TO8B7\nW8B40-6HKDB-0AO2Q\nYYATN-WLPDJ-85Z7I\n83M7V-CAGE3-Z4ZO0\n9UM0O-C6AOE-QG0XO\nK91CU-D5F7M-WZI86\nN34PY-CHH35-FYRX4\n819AL-3Q0Z9-MALD7\n48CV3-6ZF0H-9U2MC\n870LS-66WDC-2KX7H\n6WLQL-1E9CA-KIUN8\nKFWEF-VRQ2P-IDYC5\nW0WLJ-X087B-MOCFI\n292L2-ZBB7H-RECI5\n03Y3N-C40HH-6HG4G\nKRRF4-AMS4C-SY6PQ\nD16WS-KADNE-HFN1R\nV5BEQ-DUANK-G8I2X\nSVQM3-IGAAE-TO6XU\nBWKSM-P9LA6-FHYRI\nETZ49-TZET0-DXSSU\nNTZ9K-YWOM4-7CVQC\n368RM-E7MED-RQ1H0\n8G49Z-1DJSV-QUAGV\n1E9HH-AZ3SP-CP19A\nRKWZE-06VW2-62D3K\nIMNXQ-QLB10-MNKDL\nBCBLF-3AG3D-MJK23\nFY1I9-LF7O3-QU1H9\n957J2-1F407-0GXJE\nDJJOY-SM9C5-ONE6C\nSYJYJ-VTUUH-YEB3N\nPR8H2-OR83A-R55AS\nBU8QA-TLFEV-5XP1E\n3FS53-WSLP6-1F813\nGPJ7G-LKKJ0-QMKG9\nN16CM-Q9R24-4HOYD\n9DO9S-SWH63-VKA93\nWNYBK-5639B-TS04N\nE8PPC-XBZYT-S0FP3\nIO9RT-U7X1B-XMV2G\nC07XO-Q8NTU-5V9IS\n3I192-N6UJY-PBI68\nG32EK-BI7VI-4DSX9\nR3L6Z-4VY86-TKK5X\nSEN2I-2JGB0-OYXLI\n7MNV8-3EOM7-8GL3M\nTJ5W4-OQLOH-PZ0MT\nUXR0G-SZFES-M8MQU\nQ91W7-P4T6W-V4ENR\nROD72-7JYOS-63RVD\nIRO5H-VWBMU-92SCN\nI6NDY-DYAM5-CBOU8\nP0QPM-IBD0E-VO4DL\nGZQG9-PU9U0-3LLBE\nY4JYO-V12TO-8SHA6\nKJEL1-BCZAG-SRKI9\nH59U6-1TA3P-FHESQ\nWIOUF-TO8GW-VACUC\nQQXO1-4QQJ3-QU12I\n1JO3Z-JSQWZ-0QSC7\nAVUM0-PM6IT-1M12Z\n2ZBBO-FDDFI-70ZOD\n1CXKP-AT2RB-4QZYS\nYN0DN-IDBPZ-OOE16\n9NKR8-V8F5B-8ERIM\nCOHV9-TXMDQ-XIOP9\n4JSZ8-ZJCY5-XJEGD\nE7UBY-WNZV9-YQ59D\n9AK6S-KCRT6-L0CCC\nL9SKH-U0NW6-WENPY\nY1VUC-JSXJS-1VJFV\nX3FDL-XYIV6-VA3SC\nOBVD6-XPHHC-OMI2Q\nMZ6OI-UPY03-HY3CX\nCUUK9-YC2SP-HUD4X\n3H1SE-RNMDX-5LYZN\n9OVTD-MIK04-4Z4IL\nTF1HM-A4DTR-9M9YE\nS2E17-3X32M-J3GQC\n7SK19-1XPY6-TXHS1\n4JZI2-J96J1-Q9W0F\nT1OH2-AN3AM-2VAAP\nKUZRB-JKGHW-MYOJH\nPYXBO-RCNTV-5HHT2\n5KE8L-U5NHK-EVM96\nJJQLY-EW5ZN-MXNA7\nM8P7K-TMJJX-0OWSG\nLM9PQ-A7A9R-4BAJX\nOJY5P-E9J0Q-HE1BR\nFHGAN-8IFXR-67612\nUK0YT-Z7IK8-496PT\n6PR5L-K4J6Y-CJAL9\n287UR-T6FVJ-AYTW2\n5IWXI-FT3X1-6DHL8\n0V51Q-BPG2T-A7ZFQ\n1C6VG-1G7BE-PV8AA\nZ51I0-LPVON-LYNX0\nPDEVE-XEDFQ-P3WWV\nSC6KE-GJEYN-MJWVT\nP6AAY-ZU9K9-RW0A6\nCYAQV-1XCHB-4PZN8\n9IUFC-0A5IM-QR6JR\nU88UD-95G2U-CP4RE\nMT98J-05G0O-KRVA8\nY3LRJ-SGC6N-YKGAI\nYHJHE-578FA-AVB8Q\nJSTFK-PUHBM-M72QU\nRGC8T-BT706-YPKGY\n72H7A-C1GR7-DE5CL\nE9LN9-JDTCV-7R9Z0\nXZDUQ-HO5ZQ-TCVV7\n23KDT-QSGK7-G0QPU\n9VME9-FAHMD-8NCE1\n8RLPQ-C5JVN-NN36B\nFWD37-LKNY7-C4DAP\nRLWIK-9HZHF-LSKOZ\n79T7R-Y6PXT-07WFS\n5PU6D-28T3O-WTWS8\nOVTFP-3VYM4-BRG5J\nNQBZL-OJ4EJ-R46J4\nCTH79-QH25Q-18J4A\nQ8EU2-0W9MI-A62NL\nVYAXL-6CDL4-GVQD0\nN9M14-UXZ8N-DUDJB\nX1SOR-J5EQB-O37V4\nLCCYV-UITAZ-97Q0O\n9PC1L-JA5TC-UVOMP\nWZF68-ZMX4U-XPUJD\nZX9H6-Q240P-TCOUZ\nCH7W3-UFVMG-BOJPD\n16AWX-CA7HH-JGR8H\nIHZHK-KZX3C-D7BIQ\nIP2PN-B62CD-7OTXT\nMYZB0-5O5IL-91YWR\nZSIEL-2XLKX-1Y44R\n1ICNV-N5LOD-NVE2F\nGW96J-2WTWX-DLWWE\nPUH8N-F086O-3MHSO\n6Q2IY-42SK4-S0FQ9\nPNABE-NRU25-WD265\nSRMKB-GC6LT-7APSF\n2MEAV-ZQONE-20DZZ\nRG88L-7KGJY-HWPQE\nHCNPX-XJMSJ-KF5FO\nAKCEU-8KH4K-UMHH4\n29EVN-QL3AN-3YUKZ\nDHUFY-73BVD-SZS9U\nT68N7-OU03P-DNAUQ\n8YBEU-YD4AV-83J3W\nSVWN1-BAHZQ-DEWQR\nE9VNJ-XN7AI-U3F1N\nA6GBD-0LQCJ-VKFGQ\nHBVHJ-MQETA-BEYIO\n4ARXI-TWGWU-88YP9\nOJUL5-B4BFZ-2LL27\nSE4I2-SAQYK-JPN44\nF6ZTB-XJ4K7-1D70R\n8G3JN-AF94K-Q3IWP\n597XE-AF1EO-AK2OY\nMU5JS-5KJWO-8QI9Y\n7UNRE-PWSSQ-BN2TL\n9PS8D-PRDD0-13RVS\nF4EN0-40A9R-CRI9L\nKM9PN-Q8IMM-QICG9\nNI8KU-4J838-3YMZS\nP6E6A-O5SUR-UJ1DQ\nRBNYP-S6MF3-K1HFZ\n7C8TX-XRM7K-83K58\nC9OJY-MVEMP-UMZFJ\nCXO95-5NSXC-1G7YY\nWXFWT-IIF5N-1HDDL\nZ0ZHS-CO2JJ-A5BSP\nU6HHX-KHED0-K7TA7\nEE4WO-WMAXB-QPZU7\nSSYAM-1YI0X-9C4OQ\nWSCD2-GWXVB-OVU06\nX5T62-U7Q7M-UOGYJ\n2COH7-6VRQE-TIZED\nAQ1SM-4X2ZW-H4ROY\n6PHMM-CSRH8-LLTNN\nVKGDI-TNCMY-L7GZK\nG2JWE-HR3QF-36ZG2\nG8N62-GFWEG-48TKR\nEE8QL-11VNM-V6U5T\n2MMS3-2IU5G-UGEGP\nT0K9C-6WWIX-2X1TH\n92A4R-YQQSN-U4G2W\nQCBSN-WX7OU-JGMBL\nW5B8W-4GVA9-VEA43\nTC4OQ-8JPM8-27JDQ\nZK6RV-U9NOW-469GU\nDQB50-YTE8Q-NRL49\nBL4YN-AB1JB-1I035\nNIGGM-GO8IR-SEXL6\nZA7OX-N0W9S-PPY1Z\n589DP-XPW35-MCACL\nS4N3B-31IT5-6NTC0\nN86KI-3E87M-3HTFG\nROTUN-N5S0N-S51Z3\nWX1FD-38XDI-7TRM6\n12PRD-3HQ1X-YUD84\nXSFXY-JRIKC-1VHXV\nQJ1YW-GKAG9-37X3P\nS2HTH-OYF30-JCXUP\nMSCTF-0O1TO-ZL503\n1LXO4-1NVPC-5AU0K\n91Z4R-DJGMQ-MCL3R\nYBNAV-B5Q62-28X8H\n28XUZ-UHD4X-SQHBX\n40YCF-31OYW-LTII3\nEAURT-ZUTLM-OVKY5\nPYKSD-980SU-HUB1G\nOADMA-HTWKU-EGNLA\nKQB7F-7ZCCU-5C7BZ\nEJBM9-N0AU9-WNCZQ\n6FPJ4-A0B2Q-0O33P\n5FBIY-X196H-B3JMS\nXRQMT-22ZMO-UMP41\n27Y15-EJOAA-R6JJC\nEA6D1-RA1SR-OW2PI\nM8II2-WW7UG-X6K47\nUVYP2-0WVJX-G4OEK\n8CWMS-JK8O7-F43QR\nONIWT-UPSZK-92IWN\n14OQQ-ONZ6N-NHFAS\nAEZSU-F8IG8-6YGEQ\n7BJK7-VI83X-1AXJM\nMI862-GPBZM-15RPI\nKUK3W-CQM05-VWFGW\n4JCHX-OO5NX-MHRVW\n8ESIZ-1ZZEF-8WRSE\nULGOP-CT8B5-LZUBL\nYMB00-G8RI4-MRU3Z\n4L77F-IUMPY-AEGHK\nI9QGL-NE4JW-KYVR9\nKUVJH-SUZLM-X1SL8\n0HO2F-Y0PQV-P6P6L\nDNGE2-DS9XS-R97L4\nT9A16-MQ53W-O52R6\nS1NZ3-VUF6F-NTJTK\nR0246-QHCYH-GIJIG\n6QW0O-MKZAV-OVAHD\nTOEFW-EYGSF-81IDD\nM5KIJ-TG9UJ-7IF50\nCQ8RJ-2PCAB-AA4U5\nJ8ITA-P8Y42-LWKP7\nCPPIU-5K5SI-7I4X1\nMQ55R-ZA3DQ-KKIWN\nP7N2N-ZYCBG-CCSJG\nC8JM2-U2V18-I9U1Y\nZ2SXM-MBOCC-KCFW6\n89JW8-2FY9S-AN15H\nLP6NV-O5HYN-1UX34\nB8X25-YYW81-SV03A\nEWOXM-DG6LB-G3DD6\nJSZ0U-EDKFB-3B1Q9\n5GPN0-WJU25-0W9ML\nE24SN-WC1H6-3YOKH\nTCVCT-CU7JX-5DJZW\nJE5PW-WMFGP-LSVGY\n68HR1-OB425-JT6SL\n2968E-C3BTN-8DP2D\nGFDV3-T372H-F8IG3\nYKNDU-1GDOA-2949E\nO72HF-DKBWK-8EXG1\n1DUN4-V029O-M0XE4\nI7Y6X-YYJ75-T6SRM\nWFYI6-HENJ5-EHIG0\nVKLC0-AHYA4-CHX5Q\n73USH-YNDBW-BK1MW\n07SMF-YCR1K-1HDT8\nY01FB-Z9ZJQ-EMKZC\nCLXOZ-07PWI-QUTC0\nGED6N-RENE6-939MG\n59E2P-251VV-FZUUZ\nPZGCE-GOGL9-71F3A\nUFFO1-LSXMA-LU1DA\n20OEL-DDQFL-XXNLO\n1MSRR-UIQBR-685VX\nQXDU5-LGM82-GN0AS\n3N7KQ-B2VQO-C9RAU\nXTEK0-AY8FF-0HCJ4\n9YUAO-B2VA9-OXBDE\nU2XEL-PMFOB-I47C8\nVMYQ2-3GMGO-8TFO5\nU85NI-4IBGL-S71B2\nXS5I9-KGCTR-AKN4D\nVBE1L-BIN7I-8OPZ7\nYPC0D-RABQ6-J0K0Y\n5AFDB-TGTY7-1OXAZ\nXYD2B-F0G54-MDQNU\nD1B50-N2VLU-IBFA8\nFJUSW-U75PG-Q35EK\nOIR09-34NHO-MC0GM\nXNDS2-P518R-12H3X\nWFRPK-9Q228-7BIB0\nM2G85-78PEF-TA3ZO\nX4HNS-4EEX4-GXY6V\nO49NE-B6Q0Q-ZS2AD\n9ZOVW-PHLBQ-F6I85\nFZIYK-CZ535-MJXZ4\nP6QRF-6GF4R-UKX8P\nV4NIO-70GIY-ZMKXO\nIH10T-6QPXQ-J51QL\n31B1R-WRVGC-72QJ8\nC7VDO-9WHY1-65R5J\nUKF4R-73A3I-RX8SH\n9NYQX-LSVX8-4OUGF\nOB3PV-DY1JC-HCLIO\n4CJYY-26F6E-NUVB4\n2RX9K-5KM05-NZTNW\nBUEKQ-DP54P-CJYIE\n7TKLU-SW98Y-NJ4XT\nYD8T8-46UXX-OCKPV\n3QN1D-ODWIM-5WXOE\nSJ1OG-3XTC6-K3MVN\n7PUYP-T5C45-5Q7QM\nMU39G-55X7E-1WYZ8\nDB6GO-D2C6D-X2NH9\nTCTRU-P0WBO-ZA4AG\nVSYDD-23LFP-HUN32\nAPXCY-HV571-00A56\nP9TSA-QTFY0-MJWVV\nGCS0S-F9QSD-2SDRG\nZM1XQ-ZFW3V-JT1US\n8LOOD-CI3TX-0JKV1\nLFDCB-XA895-ATR5E\nLL20B-VME9R-I5W3K\n1R3UV-7I5P4-0B26E\nT4QW8-JCMBG-I4IH3\nN5JBJ-4KU3C-VT2LG\nCSQV3-M7MTL-UK3VD\nI9ZYT-QD6HV-QGIZR\nZWY4B-ULD9I-KCAOL\nMNI2V-C0KVJ-YRIEU\nZA9FP-H79AO-L70K2\nD40Q7-WJIHG-5QJS0\nGWN1W-5TRYM-E07ZU\nFOXC7-Q2ER8-MZ151\nM30HS-1XQ9P-EZV3D\nB874G-UI480-LBY8B\nH69TT-2IHSU-F0PWH\nDY44W-MZV9Q-OFS56\nEN30O-2QKO4-KSU1O\n35F20-IP5GL-1Z0U3\n7PUYL-7S9XG-12JTX\n3GCGI-J4W5N-T4FU4\nRWMO0-CYU12-17XOB\nLFROM-EDA1N-MTEA6\nXGN96-O7RJ2-LUBND\nH1JG3-2F18G-NKK3F\nZADRA-HQ4G4-W1S5E\nL6BMN-0PZQ5-BJS07\nAAVZ3-NUGT3-PQDM1\nKJVV7-8B0EH-YZWJ1\nRTDM9-LX8F7-E06X7\nJ1GCW-OZP7V-LSMCB\nEBJ7V-J7XWE-PD0W9\nX2C8J-LOEK5-JZ3FP\nE7SFC-JUB2V-3X5B1\nWX23F-I0SAY-A7DUT\n0MZJW-SLS6F-T1J15\n3VM9M-WP4FM-6GDCS\nMY9PI-N2ICE-E4M3M\nI5BAT-N9PYV-YKDFK\n86F2C-11T4Z-8ZJBW\nJY6LB-60Z2S-SWEHW\nVZ9H3-TNT83-0Y2GP\nPAQRZ-Y1TZ3-I2JAV\n8K2NA-1H0G4-V17QA\nPO6NJ-S2XMY-XXBJ0\nNMELB-B8QVJ-XR745\nS1IS0-7NCG8-QVTX2\nDS2FL-W5RSN-2FZG8\nB7Q7M-GK290-0H741\n2NJYU-NRFMJ-EPLUQ\nT04SO-AMBWB-RF4MG\n1ZNOB-D1LFS-YV0JO\n61O5V-R3O53-WNGEO\n6TNRR-RM2Q2-KERVQ\n6EF4R-W8P3X-CJ1X0\n47NAH-LF2UA-HRTDX\nYQBJK-H0TFF-CN38P\nE1A45-ZZ3QQ-KF1RJ\nQG3Q3-FSU38-5BQE1\nRM97B-0O10O-PRYYV\n4AX6N-AXMKJ-35FF2\nJBE3L-NSB9M-V80GG\n4MYTV-HANRW-T5RIW\nJBXAX-MVB29-CVO72\nM7YY8-CYK5I-2HB4J\nUF9UX-K5ZAV-9GKSF\nZ15FA-GELIJ-65HZJ\nJVBV1-IH9UU-PHY2A\nDZFKG-YFIYB-KP3U7\nFL68E-8U5P9-ERUVN\nJHOQH-N03PI-Y4ZIA\nE0HW8-WTHVV-XDZEO\nPKXDC-LQ9HW-GN5I6\nTWDRH-XY3Z1-PLCKM\nFB6E6-5IKPR-UZX67\nH7Y0H-Y7PB1-G3EU0\nP22S2-1B35D-FKRHF\nXMVC6-4J3UL-JNB2V\nRVP8W-NPYSR-LVIXQ\nULNWV-P5ZCE-T841Q\nLQUCT-N6MVK-8N27D\n87KKW-T36AM-1Q0BD\n5SX2T-97XNQ-NKFCW\nWWBHN-P0P7V-L7TQX\n1EM0W-L72HP-0H2I6\nZXLF0-WQB20-X95K5\nCULFZ-J8UGS-UYOUB\n5SF99-VV6AN-24D44\n522Z6-NXDHN-SDLAN\nCR2GJ-9QEDX-TH6S1\nJ7NJP-5A5FN-F6KK6\n6ZP9X-LTFQB-UC1EM\nB3KHF-62OZ9-OZR1X\nUBXVF-AI5ED-KYEH4\nJ6KWV-Q3ZLT-1FL2M\n9N1GT-AOQU6-L24XL\nYGNW8-24VEH-9IPZM\nVK9M9-I3OEM-QQGC5\nY48F7-01I9S-0636V\nRDII2-6VN02-6RO2Q\n5OMKD-1MCD4-0VSTH\nYS844-S4KXJ-QNUKH\nQAFSW-K80GR-WN269\n5NWQ9-8TI5H-JLJUV\n0QSAM-2229A-Z55WH\n0WHCL-XGLKA-ZWX1O\nDXAHC-Q7439-KGFZH\nUSMEL-GNU9Q-FHSNV\nVU1K3-I8ZS5-HEAWQ\nOFM85-83BNB-K4ON8\nOUAOL-BFIP5-FP8FT\nBV1N4-3W2GN-ZEECR\nHUP8S-4AZCT-CTE9T\n9GEM8-L1TKY-5E8SG\n5VYXH-JCV90-OK28P\nZFYT6-8IP4J-ZWVNY\nYFL3S-HKUXQ-HKFJU\nAVGXF-BIKYF-9UIFU\n6DERB-O6C36-4HZ35\n7IWBP-UXXW2-VF64Y\nD706U-19V7S-2IQPV\nLW3LI-X81OM-V1K5B\nV4GO9-49HPS-TTFFX\nTO81O-QCD83-4CSZB\n3RVOR-Z5Q5M-GEQ6S\nSOXKU-RITFI-2P8H7\n1QVQJ-O6YMW-MPZYV\n1PI0Y-196EE-6DV6G\n7MXH8-WEAWC-DLJ5A\nBXX66-OVKY9-3QNP1\nK4YWA-IMD2F-F7I6M\nNHW8D-AG5SQ-0HY0A\n8VRPD-4FKTH-JNZ5L\nAL3IB-CA39W-P49D8\n2XICL-E0B88-M1WLR\n57IEZ-JMW16-E43SN\nLXE1S-Q20LV-4QYVQ\nZ7LJQ-378OA-13H35\nNA5EV-W5XHW-NOB0Z\nBODHQ-EPSXS-79FQT\n3AJ7L-2KU2Y-BMKZ5\nHKI6B-07MSN-YMNM1\nRM4W4-QYRO7-BL9Y1\n4Q4XZ-WSS35-FDJR7\nKFRRP-I4SCI-9BN13\n6WV91-KP01O-7ICUC\nUPPO7-HGSEF-X58VS\nA5CBN-DNHZW-3GN8L\n841VM-C60P6-PH4Y7\nQWYVP-UTBM0-3JEFR\nDF27H-VGR40-5BNBG\nWWU4U-M4R5R-DZIJ7\nK1J8Y-2F09B-RGHIP\nRAAII-TSK1C-SJ86A\n3140E-DUJOV-V0VDU\n52UYH-A0K92-KN28N\nJ49EF-3PFL8-WQW8K\nASO69-LW764-WMGQJ\n8NO1U-BKLOK-CJO1Z\n0C6DR-EUTSK-MI54I\nRC6EH-D9LVV-X8C9W\nY33UI-0F9FT-OW3XL\n4CHT1-Y2HNT-XB33W\n2QS5E-8UP2Q-94XRN\n7FVDD-L8Y7Q-Y48SW\nGGVGX-C7BMS-5YZX8\nJCW4A-B3JYZ-RGM5S\nFCYHH-EGDJA-QZRU1\n09IEM-SLDPS-FT4UQ\nGFIYV-PQVEW-KOZJH\n1B5UG-OXN7L-YC448\n4Q18J-61VJZ-SNQGC\n70JN6-QBZUM-WL5ZF\nE69Y2-5ZFYA-XRFXQ\nU3PR5-K0MUU-Y40SS\nRF4RG-1E4QV-XX031\nWZXRU-A9WVZ-FX7C0\nWB5QK-LRW7V-IH9YB\nG9F2O-HTZW6-8Y86T\n5ED6P-OEXUQ-NBZ3V\nCLRVZ-BUNI5-IWNKZ\n3NC89-BZN25-A8ABT\nEZKVI-AF4H6-RY4LX\nWD9O7-5G5GR-C0PV9\nJ513K-NZTW8-WUSG3\n3GULI-62SS8-Z70J4\nFXJDS-DGV2J-7OO03\nL4VON-XW0Q0-CJSTT\nF8XSK-BQPB9-7GSZN\nPS2D7-P7DQ3-1I5DU\nN00CI-56801-BPXE5\n0VZM0-7NVTK-0LM38\n63KYF-I5HXK-IUDPX\nRGB7N-X5SAF-IZRS0\nKAMNS-STWQ5-JMSBR\n1A6P2-9ENXB-LW4HA\nPU7DB-ZDQEW-B1YNY\nYYVEV-LYKUI-3JDU1\nAFR41-TU32E-667FZ\nSKJQS-RIF48-5LFCG\n99SQL-SFU3P-57J8U\n40UKB-NJHA3-HJVO4\nEGYGJ-O65C7-V3K6H\nZTAFR-10O6H-6S0PO\n6UG2G-GNNAP-6EAQJ\n93I32-X81FH-HIOVY\nP792T-8EH27-JULJD\nVEESW-RCBJD-ONCGU\n126VF-VTBVS-HX12H\n0QMKY-KFFDF-SB445\nY1ZQ9-ONAEY-1IP1Z\n7NC3J-XH0X5-1ZH8H\nTFB36-2U8F5-ARNCI\n7962L-MZ2VP-TSCVH\nFPAME-6GPAA-7CM77\n5BHZZ-BFHKZ-HNK1V\nADJVE-UODIB-XOJ26\nE0ZR2-N7F3J-PPFXM\nTRJG6-G80FS-I2YOC\nS59YY-IC9IB-Q9CJ9\nI7N2Q-VVVRU-TIXU8\nUO4MJ-ZAFNL-30N23\nN9DI6-X1RWQ-TIRHU\nBBRRJ-REJE8-RLZGS\n3M3OC-WEDXM-81KSF\nDAVQM-6RA09-JIB0K\nGOE9J-KUI0F-KLQBD\nGM81M-PXSSQ-JH49S\nCJK39-KQFZC-C5S9I\nALHIB-6Q8J1-FZPVO\nHGF52-A8TX0-XR6LI\nHOYB9-INWLG-GKL5N\n8H8KQ-EQLQ1-4VWWF\n50RLB-76DU7-YQRIE\nPBPC3-VAWR6-JLSIU\nEN6Q3-EMBF0-57SWP\nLLGEG-C7MDC-VRMKS\nQU9C4-L76ID-P1EK6\n5IJ9S-9IGEV-FP35H\nYVM87-35G5O-XI2ZL\nBRJLO-8V3TB-X1BZM\n4XO4A-1ML6U-1C7F9\nOBL7S-9SP3S-Q9Z6L\n2UWUG-HYACV-2DMZM\n5972V-0DH7D-OPAAR\nPPG4P-KSV22-LBJ5E\n0D35K-G7MEL-64P22\nAJM7R-LS5MT-FOI4R\n1KK4U-EFAVX-07RZP\nSYAZO-UU2RX-7VNSW\nW1SEA-JQPDB-HRA0L\nIXU5T-V03YY-GZCN3\nKK3FE-MTK76-FS4EA\nVT5RE-XBKBF-N2IEJ\nBTXKJ-S0Z0J-15UNH\nAE6WX-AAI0Z-UZYDH\nY14VS-AEZ6A-I69YM\nRBAHY-H0P0Y-6DFUH\nN9VY1-YTG3W-YC9AK\nDYEJN-JEYS1-T5Z7F\n9XMYW-YDMP6-ODP1X\nU5ITY-URRHQ-ZRPTI\nDXNCN-D0YL3-4748B\nUTT7U-SEUYB-O0DC1\nDBL8M-STO29-PBLWS\nEIGB0-NA9A2-SNFPL\nB3V1Z-3BV54-SGM2Z\n74BUV-VR113-LDFOO\nXBC0H-RD8QF-YXQW8\nIR5EQ-R5WRE-NO7WM\nI3LC3-9PNHO-83TKB\n3H9RZ-1VJ0N-VL61M\nY7VBG-QTCKE-LK241\nX4ZDY-9VN97-QNMDD\nSQXD2-D0KQ8-VHOTE\nJAAMN-6UBOA-T4PKM\nXTWBD-ASKJD-FU5NJ\nFEV1I-OTJRH-NTWSN\nH2C4Z-KVN6K-FYMWM\nEMU4K-KFZNK-U6SSN\nG3UNG-0S91Q-W5NHO\nN8DC9-VGIG5-AEA8F\nD1B3L-JJ0LF-A21QE\nLZ8MQ-YP9AF-MLYTW\nUW422-PPPJE-9R1BW\n8I4ZG-THUGB-U8FPP\nJWIXS-UZMIB-2U3E5\nS9W98-17C1T-N2HB0\n6B5E1-FED7M-V5UDD\nO1JXP-NDLOA-QXSJC\nANH4T-4TTHL-IHG8P\nB2X3B-0WML7-3G5BC\n5JO4K-BE4I3-1F9HO\nIP4T0-QB4IV-JU4Y4\nKTDDU-ZFFW4-0WF4L\n9Y1VX-B9EW9-P91YS\nXI8SC-EYFPX-CRTGW\nYAB8J-M3LDZ-XS7P9\nF0UBX-X7FJO-TWWK5\nIPOW6-5VL7G-YVA4A\nYOFG4-AF589-U5DG5\nL6VZX-ZQC8Y-VW9D1\n44TGM-RG3CR-G5P3S\nY1DRK-NCD4T-0F89S\n34HSL-PN7V7-QDIL4\n3BUCI-4NDHV-V4Q8U\nFESGA-BYK1U-GWENV\nEM2LR-B86BF-769MR\nKLBNF-P9DY1-1RM1X\nV54ZW-GFT90-RK4S0\nARZXM-743QY-WAT79\nUGMBZ-CIYRW-VNITE\nCGFBU-LXXYI-Q67NK\n1BM70-3D3PD-NNEAB\nHB2JP-C9XLI-6H1L0\nPG9I9-68V08-6W8DP\n8IVC6-GJ195-2PT6V\nU9FPO-VNAPV-0KV67\nY5V7S-3FBX7-HJUM5\nWNEJE-U79I9-2IF6V\nH91MY-6K6P1-82MZY\n7SW1Y-EVH77-91CP5\n220J7-DJYU6-25VUO\nYLNIG-6IQOU-4XLH9\nPL1QC-ICNHE-5C1RK\nSI86G-S61V7-XPM0Y\n55DMY-0ICRW-3CEXO\nNACC9-2BSHM-R7LTQ\n2VTRR-2EG3S-6X6H5\nWX61Q-DAY15-62Y3Y\nTT2PU-4MORT-SVDV0\n74UNE-705VQ-L5VDU\nWAOCA-LZQ2H-TPVCT\nWA58Q-PE7EO-2VWJ9\nUKBM9-5XSRI-BKGSZ\nIQWGT-OEGAD-ZB7L3\nQST4K-ZB39S-JK1FL\nR5J5V-PM46R-APTWC\nVH1L8-7LFWR-AA2PV\nHII1X-1GQI3-ATYIB\n02IP5-IYBLY-13SMR\nKIC54-6KEL7-HQ0EP\nQ1P2V-VI71B-81NXM\nKZ2AW-SZY7M-KWDEC\nG6FRE-5PHGS-CJNK8\nGE8UZ-EMA18-0WTDT\nSZW8I-J2W2J-MFBOG\nZGBVB-NTYKW-6XFZ3\nM0CL2-80Q0X-ECPPL\nAX8WP-J82GN-UKE7Q\nXNRR8-GXXD4-3BHO9\nRSQIB-RRSV7-4XFTY\nCG3Q3-N7GI1-NTK89\nWXYOC-C5KBA-TRA1W\nAKCIU-IVDEA-DC9RA\nSR80P-ZKMY1-JRN6H\nJXCWJ-N21W0-M904N\nWJ5VW-U7Q2F-MWT2A\n57N2Q-II4MK-PXVBT\nD5A98-11S2D-NL0F3\n24IHI-ULF3Q-OHFRV\n7ZKN9-Z71UR-WITOW\n8FUCW-UBR0O-9BU0U\nQMH7N-5QCM8-2C4CY\nE815D-506TJ-G7LNS\n9YJ6T-1OH3F-TXNGV\nH9R1K-Y6K9J-3ZYDJ\nW1DTP-VM4S7-LTUPX\n4AFR2-YHVBV-7DY3B\n966Z2-CGPWF-ZR8MR\nYTGXL-2AFSQ-W1W3C\nMU41K-R7R93-F3S1J\nAU38A-SSJMQ-56PUW\nP8JBP-LHDI5-1UCMH\nK8R0O-3VF7B-LET3H\n1N1RZ-FKYVS-ODE9B\nESK50-7GVW5-KP246\nDBK2M-GIWFM-I7V53\nCUXIT-OD6Q3-0RI34\nE8C4M-0Y79K-WXY2C\nD5XFK-DOKQ6-LBXX4\nAVGVY-RO4G9-Z39ZK\nHY1MM-1UZX1-U7YZL\n9VCRV-AAHTK-Q72O1\nR67ZY-WPCPV-9XF21\nZSRZN-TQ57Y-E02XB\nX6DH8-RD9DS-61UC4\nODQ7A-G4Z4T-D6IN1\nVHP5Q-CSO6V-PM4W2\n4RQB2-29Q4N-WTH0W\nL5293-HU57E-QIHYI\nDZKRU-NKA9Q-4ECVR\n5RK94-A32ED-OBVTB\nAEUO4-DE5TM-G4GFD\nG5KG3-OJQ1X-AZPF3\nFIPKU-OLBQE-VL10R\nF7QKM-GRBY4-KQRRV\nUETBB-5Y9KR-0BU5R\nLYBCH-YEXPN-E0K76\nZA4CX-MPPDN-Y6Q8Y\nMXQQ6-XLM25-TXF3B\n1KZSO-ZOBKC-4NSWM\n8P6AL-M3U0A-242RL\nMOJRQ-5RHXC-5Y04B\n2C988-1Z7OC-C42Z9\n8RRYG-2XMVA-BDYVS\nYS67Q-RKPWO-L3NVP\nT3WRO-164W7-W04IO\nAOWIL-WFJMJ-4W0EU\nYQX76-3DWCW-58AG8\nADTNG-97HU7-DIRIX\nJ3JFU-AL69S-D7KKN\nVK5J4-4T6E3-SOQJ2\nFV9FF-DKXVD-28SBR\nRF63B-AJ36H-LVQ27\n0XQSO-U7RZL-IPR90\n4X8CD-EDSY6-W7WI0\nIBHD1-NR8SL-C1X26\nJJ0IQ-C8D2H-DFSS1\nU3HB0-7U1HK-7M0RS\n5A3WX-M8T5B-H3A8K\nOWE6Z-6QG2A-0ODVX\nKGTBL-NN0ZK-6XW6Q\nHLMOB-Z068Y-5ZAAF\n00P1L-E6FEZ-C31S1\nHPJBO-M10EH-D7EZO\nODKYM-EZZCR-11273\nUK34F-2XPB4-OIJEA\nUUCLC-ZX4O0-5Z8H2\nUKK4Q-XHOJ2-8COKA\n6T0ND-1CC00-8M5HK\nMO1UZ-MCPZ2-1PFEQ\nVZFPR-EY6I5-Z4ZZK\nCDFAP-YY7Y2-7DGWZ\nQYAE4-536OI-EVVTQ\nC4SOS-1M6LA-31A7L\n88R5B-K0BXH-5FF5Z\n4UM5V-ERAKL-YCG6Q\nRTD0K-N043N-BNUQX\nFE02L-EZ38D-YA5H7\n4WE4J-Q0AVK-S2DF9\nSK0P4-YRQ57-Y6K8W\nARKMZ-J8WQJ-NJSX0\nQ3PMS-ADSMK-5GJJ1\nIFYQC-NELB8-K2IL7\nZJC5B-9PT8Y-OVOE4\n59E9H-UTWMG-C15U9\nH2K60-GT5RV-Y9XFL\nYCGLV-N6LI0-KO47Z\n9IUMV-UK5W8-UXFUV\n9CQ85-659WF-41KG8\nUXMUQ-E0UW9-R3GOF\n5GNPK-UWYAU-XKFO4\nRJ7PY-JRE0K-GSVYW\nUIXGA-2AQ68-BURRZ\n74NCL-X1NZ4-5C9Q0\nXO3FK-SF03N-J6ZGY\nLHCLK-W160S-E3EJM\nT2A9C-RGVOW-ZUVVE\nXV5TG-B29VQ-JE7DV\nOI2XE-UHFGS-4IEFI\nCK71K-W3H9J-X1XS2\nSO92C-F0B0V-7NIVI\nTW1NU-H5O2O-BU9MH\nG7GX5-EN8GV-KVVX8\nFL8L5-ZSBUT-SWEM7\n66C26-PLLJD-VEV76\nB5XYN-8QXI1-EI2NJ\nC2A9A-ZEK9H-XVTEJ\nBKFPA-14ZZ3-Y5CEH\n226V6-5JVZX-9WBYK\nHSI0Y-IZN22-P1OB3\nO47PP-U4M6W-AVGIX\nBMX34-DLQNH-YVWBI\nD06NB-39WZC-KEPQZ\nYAO7G-XCDYX-TMCPY\nAQSUM-9UQCB-DG73M\nQLP8J-N9ZYA-ADH9X\n7TQQA-648T5-WU0WX\nUH5RG-JCUDX-9F5F6\n1WFH1-J6C8S-3WZ0A\nJ3RL8-A1U7J-C2HZ2\nW6BXE-UHI8H-UCR1U\nMXBFA-JZVAK-Q7Y8A\nU7BLN-AQCXW-PACW7\nWCIDC-M1ABX-3NDAI\n2MM4Q-7W7E5-MM0SS\n8TQZO-PV9XX-SJGME\nYEZ2Q-6O0G5-YWQZS\nY4CWO-EPVI6-X7G31\nHMFEI-199LE-9P81G\n3T3QY-GHIDQ-PIWLE\nUVEMN-IKRD8-1XJM6\n5I975-WSSDH-MEKB4\nG8Y0H-8UJZ5-PL208\n2UOQN-WPLY2-8CX5K\n3KH1D-DUICR-V72NI\nO28ZV-8XH5E-7ODYP\nED7ZP-6AWAH-NLR76\nBFPH2-UNW3P-DD6QZ\nDPTFM-26IAY-4LXBI\nF4X1R-Z2ZRT-LWFDQ\nGL1BQ-3VUAE-T184M\nYIM6E-WYQSS-DMXAT\nGM4IL-HHUR4-BFHRV\n8H7Y7-S0JXR-ZHWWR\n67SG4-BXQN3-JK6FC\nL477M-5KMKC-UI5NK\n5ZXQ4-FWXOY-XPBR6\nI6HPB-8N4PK-GR1AO\nVAJBV-AA6DU-6KRI0\nQ1H9O-V7ROV-J0Y1Z\nEPX3M-0KYGC-1LH1G\nS5VRU-JOSP8-52M0H\nOPLNM-Z5O9K-FN2CA\nIF93C-VPLA7-XO28B\nVRCTI-3BWH0-ZNFT0\nX8480-WR3OY-AVNJ9\nEIE3M-K0B9X-16YQQ\nAYKIB-I9MD3-EL75H\n3BBZK-DU79V-EAKCG\nYOUBM-M6388-4IJWI\nCNO8P-YGBX4-UG2FT\n3ZI94-EQPP1-15RWQ\nG9IU8-0WT54-DMH09\n3IOKC-74MLE-6B939\nNZNSM-GKM4F-M4M2M\nUPKOR-AI7Z5-926JC\n5O290-G4352-7BIIR\nERYRC-Y7QTU-8AOSP\nB6U79-K918K-5ZHUH\nJR4FM-E2PAB-KSA0T\nO7KPP-PGU96-OPW63\nWE6VH-3ZDTM-VJOH5\nNNOND-3QYW1-40MQA\n2TX0P-F2XP1-S844D\n9GF7A-U2IQ5-XHSGQ\nU1KMQ-YX1HD-IWOV8\nX7DO2-7VG11-LEIXA\nQQ6V8-EBIS9-WD18V\nJME1U-5POH3-FN2F5\nJOH0S-OXAII-QFULJ\nYGAP7-I4B22-PLDFN\nII7DY-WHCEO-H6H9L\nYGMBR-UHLIY-72DLN\nTP0IF-HPM5L-COD99\nH9DH4-5DTF0-AYM59\n2CSTZ-V34HR-R9ENL\nXNDHQ-FTYA1-01WY6\nYSOLH-MF5W6-TWR5Q\n7FWZU-6BU1K-GYQQV\nOSULY-VZ0D6-XXZ5C\nO2IYA-X5X6K-ALPYG\nLPDV0-UZ24A-6QO4G\nYKLIE-8CN9M-NNWC9\nWKXQR-ZE86C-5RZVF\n12HDN-AYGEQ-M7KLY\n1WG8J-XPS9W-89AXJ\nFGLAK-Y6YY0-02NPF\nHJB0O-8QPDQ-520SN\nFOMBZ-XJQRM-1UCFT\nK8EW6-TTRQ9-XM882\nI04TF-716H7-CGBN9\nGB2FC-JLP2Y-34TL7\n45RTE-3NUKV-LVLPI\nGZDUD-X5LBR-1YL13\nGJBP1-2PKZC-Q0MDK\n2HQXE-OR5FA-IK7RG\n28GJ7-RQVR3-C519I\nIA3QX-3XCE8-E8HNH\n7ZE9X-HAKC8-P8BOL\nSZB8N-5HK3G-0NJKY\nS7ZZ8-XKPU5-H58OX\nI8PYI-MCLRD-934C8\nK0KAF-8OG70-97XEU\nJRRWT-PVWY6-AS7N0\nCP7VD-2HOA2-R7GTU\nVB4I7-VBJFO-L9FAB\n1EPJA-C2C9O-AACFD\nAP1T7-BMXYQ-C0OWI\n4HZ8U-76HFV-SIKT4\n34DEK-8J81P-6475H\nCTHY6-BDRRW-WT3NX\nTO5DB-2PXMF-GF5L2\n14EPU-PSO2I-JU9BA\n893JG-CVCQ8-FNIYL\nWD238-F9BJZ-5KPY1\n05DUZ-XTCLM-WVD45\n3Y111-JRAOF-RH07D\nYZR7D-ADFIM-SNX7L\nOWYXH-CLLA6-BZXB4\nI8Q96-4NXTM-ESW5E\nLKBDI-E3KTB-J6P9F\nTHRNX-4MYUL-BODZX\nCJTTI-NMST7-B1HRH\n6NYMI-EH8JU-LR8G0\nJTVIB-9HMQF-V4HUP\nTBXOY-EDP4C-6D4QV\nS85UT-O313V-3F7YI\n59HQX-B4JWF-H2DEV\nH063B-OJJ5Z-R1J4N\n8OTNY-8FBK4-4TCOZ\n43S5E-134YV-ZPAND\nA498X-Q9S35-CZ1Y1\nPFH7A-OF8F9-JQO4Z\nMC2UT-AXGX5-G7CQM\nOG3OK-A1MQ8-WCV57\n7QJAC-B6C2P-ZSZS8\nSORJM-XD6A3-AX282\n5AVWX-JV39J-MSZSW\n9BJUS-4AICN-YAY37\nVVJHP-6OF1C-S3K6L\n91BYW-4SCI4-7A0R6\nCCKZY-AWBTK-25SPI\n8JUU5-4RE1E-CH8SR\nCDNXB-I83LZ-WPMQ0\nFMDRU-TMSSS-J4RGI\nJSV41-65O60-CFJTT\nPL1ZE-OK8B6-CV1TR\nEG5OC-H0HAG-QRVTB\nVS9JK-RFWT4-0OO0N\nUQWBH-7YYZX-X4I96\nBKZ82-N5TG7-L9P4K\nYSAWK-97JXL-K6DWO\n2S9EY-SN3OB-VW0NW\n7MGPT-340MM-QRK8W\nMF9FA-MFRK2-M20SG\nJJ7XF-7GG0T-LP734\n8EKF9-PJDSM-2AZU2\nQ7T0D-4UEP6-NMSX5\nEC3XX-1JBO2-LPOVR\nXAXHF-ZH626-RZ6MQ\nWU2S9-5NENZ-Z829W\nIKIC5-3X0IR-F5AAV\n82GKW-DI89F-LRIB1\nUQLKL-4D78I-NB0FJ\nFPJQ5-TJNBU-619LY\nB55BJ-ES6OL-L9FKW\nZZP68-XK4W6-1HXLM\nBT5GW-997LM-8ZIKC\n1T8UJ-OSUCE-HP4JN\nITGIA-XKL1M-4XXB4\nVU0ZN-LZS2X-U67QN\nMNQOD-CBTNB-8248Y\nKRIH7-GA5C8-VV9U5\nC5R50-US6Z9-X72R2\nF10TV-9QTKA-RDZ87\n3A6CS-I52F6-TQFR3\n6HUNT-KURNL-GQZX2\n4IONS-TEWKD-9EXTB\nJTI1M-7HSC8-M6LE4\nVEXSM-ZTHUF-H6H63\nIANWK-FD0JG-BECJV\nOLLF2-D1YPL-8QSDG\nOYBTP-X2FLV-PKUX3\nF0RQV-W0L0I-QCTEL\n08BDQ-3RG1B-I8ZL1\nWGTHJ-QEWWG-I91I1\nXZWFI-PUOD9-VQO8G\n849QQ-KCV8G-UL001\nTD91S-YPT2C-RPCV7\nZC5MN-GAHX8-O0VVW\nNF1NL-PHDMK-VRLEV\nNP9CO-DI5N9-BV01G\nP4RPU-HWEA2-GYJ1G\nVKEUP-U9WM7-S6UJB\nF6YKL-YHLF0-FI6U3\nA4WPJ-TE9JN-G61ZG\n4XDP4-KIYWO-GJK2I\n0C7XM-3PBVW-GD61L\nQY4SL-5ZN18-TCR90\nBQTHH-BOZ11-T9D04\n77LS5-YY5JA-VCH8J\n8UURJ-UQCBE-NKXZL\nZWKO9-ZCMV4-SDDT5\nK5GS2-5UC7C-U4MWV\nOHWT6-4YV8Z-3TYHE\nZXI1J-BHJBM-CIZJW\nAWXXN-6WVQJ-GFU84\nFGNRP-DS2OQ-1F6L3\nNHBDZ-NU174-LZV7H\n8CWTD-3ZD20-3NXUR\nEMWDL-W05R2-TCXNG\nFMU1C-PUA7Y-Q2OTM\nSG7IA-UMCBZ-TN0TB\n7YX8T-P99QM-O7YDW\nSK8JK-HIOE3-EMZI3\nXRKG0-59B9K-FFEGU\nXB0XE-L11NP-YMK16\nOJ7VY-0IHJK-NETIT\n1JKSA-IV8H4-G70E2\nO2FU3-0HNUJ-UEX48\nOJJEN-PO6SX-RHQXF\nL9YCB-OFK5Y-RHI8L\nX5749-FHQ3I-78M0U\n1E2J3-TCA9W-P7I4U\nX7271-8E7BP-3WL13\n6A5Y8-WMNF6-43ACP\nM1HCE-FCEMO-ZBFX2\nHE9MJ-U0L7I-AUO0M\nEL2W0-V3OW3-C2YW8\nHDGAS-BF0Q7-J8GE3\nC5PLH-RQ9HY-UW7MZ\nA81QX-A4A1I-7A791\nGL6EI-E7P7B-XFAG7\n5KWD4-YO3T0-VCU8R\nO2OKJ-6K3FX-5TPH0\nK60DL-T1N2G-3ZIQB\nHWA4F-GELUJ-D3TBJ\nKI53L-LS4HR-7IMAV\nKO84D-GP7W9-E46LX\n6CN2T-IMU6Y-00NI2\n00H4G-PZEX8-BC6A7\nO1136-OPN6L-68RD0\n90AY9-0U9T0-MDXSN\nUBN6X-HI12J-XG3N2\nCKXM7-HLVV8-E0NVJ\nI5MT6-FNPQW-6UZXC\nFZFCG-UEBJ0-0NHIS\n100KI-PY65P-1J1PG\nWVAZC-P0SIN-ESCPI\nCHLMU-GK4U2-H50E5\n5DX07-7WCCX-I6H39\n2EC10-Q201E-OSU2Q\nLRREF-CUSGU-ZPSVI\n4ROE0-DQ548-A0KWJ\nUH5AN-MU4PF-WDGVZ\n4ZSM2-XCH01-8J8SQ\nDLZY5-CAO11-5FDLV\n65BDZ-2M2W7-B9YAI\n0DGNA-HWRQ6-5ADWR\nJ8I9H-NBZDO-W52OD\n0PYAO-9GAWV-KD1PT\n6FKW5-4M8CZ-XYIB7\nPPNBV-H7UTF-YX1MB\nL12Y7-1GIY6-96BGP\n6BY0P-07J2N-877XH\nZRIFL-08BRA-81XY0\n87S9K-1VJ5O-WKALF\nHJWO3-U1CD2-CNYLM\nEOV3Q-63ZBD-38YZM\nWMBGV-H82CJ-DUXIV\n2T4GW-5ISA4-WK7JB\nUPF58-570B5-K4AS0\nWIDQ8-ZBCZF-YF2X8\n9C89I-OFLMK-7TUIZ\n6R9NG-N8Y0D-KJH6I\n0C3U6-BQW64-8RIZQ\nWOPC7-RJ480-AGB63\n5YDCL-2845V-VXSJT\nOJYC0-C45ZL-XPBXG\nURQSK-1ST93-7TLTZ\nGRJK9-6MV91-YMBWG\nR39DR-FATM4-H8JW5\nBZLJ0-JUJAB-3GANN\n5NKAS-N7XX4-D0JVK\nT77TM-11V8C-GB7LU\nO0X2Q-CJ6IG-LRCY8\n9OEDG-XPZ46-C9E7P\nGFJU7-BSSDR-XBMN1\nULZIQ-DQSLC-FXXGH\nLRZ6I-WCJHX-9SE8Q\nT2WON-2NFR2-VNPPK\nPTY03-O35V8-XUKYU\n5KE0A-87RNO-JP2FQ\n9AX1Z-8LQ3U-K40HP\n4QPKP-IBIKD-7K88Y\nMIY9A-20ODG-3STZE\nF6FE5-KMFG0-561F0\nFD7A1-YSZU3-MSRQE\nT7KNX-R7GPQ-KFH0H\nMNIW6-HTD42-4T4JK\nURLME-734AK-4ZPVF\nC2H9L-C46IN-NGSR3\nZ11CB-YWXPH-SJ2NQ\nV79TO-9E9NC-9B6K9\n4QGHC-2U079-H0X6W\n0G666-FN8PR-ENW1I\nYQYH9-Z1Y6L-EU2ZP\nU6HU4-04GW4-2SPCK\n4VUHZ-2H8W4-SZLAP\nF1IYT-UTLFG-L3HBC\nVIMEA-HZDWO-OG7N0\nISQ63-C8XCJ-DRE29\n8W10R-EVB4B-8N9CD\nIGOAT-IXPT3-FYRN6\nPOWBH-6E63C-KB7LC\nVPF7P-G9UG7-4YJ4Q\nDFJG1-DFGRF-LZHQ0\nFCHCN-9U0GA-L79SZ\nZ9NAV-6AYA7-5QCYL\n9YLR7-74X9W-U3F1Y\nMN0C0-VJYOS-H9B4P\nFUW6B-GN4PP-I9MLJ\n418LK-9NHHY-AMFDU\n4D35Y-RU31P-HDQI8\nQVIR0-F5INT-X031Q\nST913-WVFO6-WTYO2\n69O6E-45QCP-KVTI0\nA0AR6-7328I-HMHF9\nD25TN-112FO-KXNV4\nN7O8J-Z9RCE-RI3FD\nP4XJJ-11CR3-ETX54\nUGVOI-RWZJS-3U2BZ\n71MF0-QWEWP-M0H6A\nCIWIQ-L1HBU-O5UDM\nFC4VV-EJAW1-YLRCK\nS6FWO-MFLT6-PMW71\nNIL0D-PTHP8-Z33KJ\nF9QX0-3J6H5-FFN55\nSSO5S-EAN82-6JSQ5\nMYGTY-RB5E4-OZS4W\nKL7P7-E65I5-C50YA\nPYDR9-ITVW7-T52N6\n7Y7ED-QCZ1Y-7MV3P\nOONDZ-U6A3Y-KH8SL\n0L430-RLB22-WV6X2\nVV6VN-1UW70-WVF1D\n4ZHPK-PPLY4-E4XWQ\nKVTPO-9IF86-FFTGA\nDLFEK-X2NRB-L6YO4\nZSAM3-OH4I6-TKFEI\nSM2W3-AOWNF-VTF8E\nKPLVR-Q7O1O-LPHHW\nOQSSO-GHSQH-E4Z20\nVXYB5-GT5VB-O2QGK\n4PCFR-UOMGG-TDS0S\nR36CJ-BMFWD-9FE73\n56ZGJ-ZMDNY-75MJC\nGG950-MFL4X-N1PYO\nJ22BG-PBY1R-DZ358\nD2W9D-NAE95-PTNSA\nYZ9J1-12UMR-ACV3F\nZOEY7-82YO8-2X9WS\nD9ISS-TBOSN-5XBXD\nE11KB-9TSHG-QJXB3\nQSJGB-N3N4R-KFLZX\n6OD1W-IU16G-P1DL6\nQK4WO-IW4S4-3QK10\nB93BX-BZDAB-GX9IW\nZ66IZ-2O1YF-QZJ29\nAY2GC-J7R7J-4NUHT\n578VR-LI8KV-J1TZA\nDOWHJ-97Y11-EUTWZ\n9PN7R-CAMUZ-LR4HV\n2S00O-P54MJ-DGWA7\nWJXZM-9YPB1-2XB6P\n2R4IV-MAJRG-HB8QW\n4R0S2-EBT9J-QNHDB\nHIS5Z-PZAM7-X6M7U\nUD77F-HY7QD-XTGD0\n6OT47-YNWVH-SQWIG\nJR9SG-B5OQA-F4TQJ\nQDQ3C-KZFDF-5L5F5\nSFEOQ-RAOV3-KJ205\nGLX12-IEHG4-4CAM6\nRFXHG-2O4G3-L6U19\nTXCL2-LX5P1-RIW49\nKPNJD-40UG5-WIL7N\nPQF8V-7Y07G-4LYHG\nCPRPT-17RIO-O04CX\nV083W-QFBAU-6T8ZP\n54D44-HYVKQ-QHMBL\nHYNY0-9QBJO-BTI3O\nY2UF7-4TSMD-CS4OV\nHS4FJ-KTBPM-XVYMZ\nSTU6E-BXFEA-4YHUV\nLO1ME-P8ZZ7-WGBEM\nVAI1F-X1AFF-X251M\nRP7NO-1HPUU-I0Y2E\nZH11A-NXNJW-799RZ\nMB3TD-LW19D-5FYEQ\nO3QN1-C4OUA-P3XMI\nVQILX-0AF3Y-QUCAG\n114TC-JAQPT-A064L\nSYHA2-QVWQ2-6RH76\nIQ5FD-CCFS3-RIP5H\nVHGNL-3ELKF-H3GCR\nFH1HH-3UW84-LUJKU\nE55JC-HK993-X78A1\n0SQVR-XZX9Q-Y958A\nGOF36-TU1YB-K7RPV\nPFIDE-I2PYW-YPTQX\nBFNNV-G9CGV-SJKA5\n3MIPO-XO6I3-NQNY0\nJWE64-QKE8Z-7AHSI\nHBZJS-0KZCH-8VLB8\nUVZV6-33NBI-A1ZEB\nZSQ9D-P431R-XSO4H\n45W4L-NANAE-Z6DXX\nL93AK-0GH75-JS5Q8\n8I0AA-I5OH0-XIUKC\nJKGNP-SWG80-VZUYY\nPM2ME-U6JKP-9H2H2\nP2GW3-9YFPC-ZOUHD\nWBCE7-O3VQ6-J4YXN\nMEP4D-VL14U-913DS\nQYRPU-41J04-K378E\nGZS11-YXXDH-MVF7E\nZXALK-WGF2Y-C3FP9\nN5DQ9-37S27-1QK8J\n3OKZ4-ZUOVR-1FKCV\nGXSU5-LE6UB-GMY4W\nNZ5HS-KWZDD-71K39\nJZEWW-OYPRT-YSSCN\nJZT4N-4LNIB-S0XY4\n4FF9T-WYCSJ-QC935\nWRJEP-PC72C-7A6GE\nRL61T-VR582-BGNHI\nC76HA-1IBQR-R49UT\n7KUY2-EAPG8-MVGFO\nQ7RIB-UIK4X-KX9JK\nBA358-YMN8E-ZGQXW\nWNBJ3-YFCJ0-6SJ0W\nS7HHY-ZISWT-GFZUA\n48TUE-4O4P5-0V4MY\nZNQGV-8TW4W-9KNRS\nHTKDT-I76ZA-H6YZT\nN50ZW-LQ3G5-ZLHNG\nLFS8U-TIXYJ-Q6R67\n76BDO-OD7RH-284T3\nS57TI-QC6DP-UFS72\nHFUT0-V5WQX-G9BV1\nVGPT8-JZC76-3OYCG\nM8M43-FFC3K-GU2D4\nJHSPY-QJLCE-PE3S5\nOOT1R-8C0P4-PV4E5\n8A2HI-K9PYV-FJQCO\nA8W6P-FZOWR-KO3EU\n4DOYF-P1U23-5OOFX\n5T8RE-O02F1-EDOOW\nBEZJN-YTHAJ-EA1UQ\nOMWZ5-XU69M-F3213\nPOECZ-8D4UK-2V6WP\nOQLMY-HD884-84683\nY8UJY-5PF7N-W5TNY\nNXIUK-3Q6O7-3BI5R\n77W50-PNZTF-EJ97V\nAF33E-KL4IK-14UVK\nSUTI9-KZVX5-NWRMP\nKMRVT-5702D-18FC6\n4VT5K-2PN7E-G9C2A\nMZZCI-CGYOZ-YJJJ9\nYJOA4-J9ZCG-2T2JX\nB8D4K-4SVT3-SC5W9\nYNDJA-0CX08-AKWA4\nSMGKI-OKU6F-TKP0B\nIK46L-5H0HZ-E7Y1N\nR94EZ-5655H-4BTU1\nE3V1Z-DOAMP-2KYHE\nAGDUZ-XWZ88-G2WS4\nNCZRS-H9LRF-49Z49\nBO05X-2BO92-CCC2L\n0JE9W-LLXSF-GIBWB\nB3Q56-Z8O92-9HW8W\nAJLUP-3N5Z6-KLQ0E\n79MFO-H0DWP-9TZ0H\nNLQU8-HWJ52-YPANA\nVC7V6-NK6DV-FK7II\nLRWPC-Z3J62-VRT4W\nLQ53P-Z0TUU-WBPO8\nWSA2S-C5DH4-RYFEV\nMH095-998KS-8FYME\nHFL7X-OQFTL-YKHWI\nI08Q7-0JZA6-R7519\n5HZ3W-NJM8T-VGRB5\nRRATL-GBUTX-MC81P\nQZRKP-DBP73-VS6F9\nF8EEM-F9491-NEZJZ\nSTTL1-8C4KB-DE1YE\nFXK8I-CYB8E-HL0NG\nF1R0H-1PTUK-EL7AG\nJK6OY-176K2-0JPL0\nBDNAY-Z0GYS-B28RK\nNLXQL-L8S7O-DQYJY\n0O6LJ-O552Z-FIDF5\nLUZAZ-TM4PO-FLG7U\nQ9UP8-FT2V6-R0ULX\nV5S6A-MCHC9-QSRG4\nTM9ZX-JTPEX-9MHYK\nSBXKG-RTT3C-7WYV8\n5DDVY-XAQ03-4Q1J8\n3ETUH-ZIJ47-19MTR\nQALJU-S6IZI-GLNBI\n2Q6WL-JI6YH-2DTUP\nMQY1Z-HNRKW-YG0AZ\nDJW96-I4IQI-FAWEX\n8253Z-CQ8AI-B04NQ\n5UOBH-D2BDO-3ASB6\n25LO3-TGCXU-YYNKZ\nP0DTL-1IFM5-I4SDL\nJ4JFK-3NBOB-V28O7\nJ993Y-4VWTL-Q5JMK\nBUDG3-WKP5I-JNLKM\nY4YFU-300BX-GY57L\nQJ5A1-OOIZU-5BZ20\n21LWN-02U8J-AIGAE\nW0PHM-T6C40-M2THZ\nYGAVS-4JYMJ-49LBM\nUWMBX-BI761-LUVB9\nZ82OT-XHDWA-6FAO1\nDWYH0-R6G9F-SQH2I\n9WJR9-MAEK4-S67HW\nQNOV3-A5EF2-V0Q1K\nC1DNH-LG1N6-SBQGL\nRR342-1K1F3-6Z88B\nVLRHX-PG5DL-H3CKW\nPQVH2-7CKGJ-9HC57\nQ6X6D-LT9XV-MOB17\nJ8Y4W-PDOUY-7PT8J\nHF68A-2QUDG-9MA70\n4OXAE-5KJQ4-9H0F6\n0GD0T-ZWY60-J4AMX\nTBM2U-AG9DK-EU4GX\nOU5PX-ZX9QP-X7HFU\nK1Q7Y-98C0Z-WG9QL\nCKNI5-HZYZ6-GA9WZ\nN3ZYV-J5CNJ-UD50E\nS2GRP-OUR14-YZCMX\n41RHA-L6PBY-A0QEM\nF747B-8SXRP-L9ONJ\nZZ7ZE-5SW4W-ZL5UX\n7B9IU-7PB95-WHZ2E\nPU9H1-NHCE7-8XNR9\n4993N-LW1M0-2YXKW\nLB188-IXCN1-96LO4\nXCK5D-Z2U9D-OH3YG\n1CMHV-ACOYP-79207\nU4A2D-GZ7R0-T5QT4\nN3O3A-7ASTF-4ZRVU\n25896-SN2Z6-FUCGK\nTHWOL-KHUTU-FHR29\nQYT5A-NWCZC-EMB0S\nJRTVX-JSB70-ROEUI\nKZIXM-4XG2M-337QN\n88PFW-3CPGG-YOMHA\nQG238-0WACK-XTQFG\nVTX1N-9NRMO-7OAI3\nN1OPP-8ABJC-ZI836\nIRUG8-FFK61-FQSF1\n5ZZYC-0C242-U6VY6\nP70U1-MUUV2-TXYRR\nHXYSC-R9YL9-HD97C\n06H5C-A9I17-UIZ5O\nFYIM1-VXY36-2MRKV\nPD0HF-2NGO6-EH991\n48KCK-LFTH1-GGYD7\n11EX4-9NGB6-97UZ0\nI6XQ9-U9JYB-2QJHA\nYI5OU-JG9T6-C5I1C\nU4E6A-BP8UK-3S4XJ\n264SU-US35N-XXSFL\n3OH23-ZIW8L-I2I08\n58JU2-K2W0F-K8MVU\nZ8YXB-S5EWD-5J8NZ\nAIPFJ-3FNU4-V65Q3\nOSSYY-JF4SO-BOJGH\nACLIA-7ZISG-YGV9E\nSJ9JM-DTMOZ-CWPO9\nJX2HR-YH4XB-K5B4C\nG7TCD-87SI5-NTKWE\nZSQQP-Z2G13-6QZ1V\n33BWQ-6M3Z7-94RX3\nJK3T2-E0U3E-K93EC\n4D64Q-FUCOV-DMT4Y\n6KMZB-IR149-FP6OJ\nROJZ6-6BAXX-DJ3TK\nT2TV6-MZ6CB-A0M9O\nIJMUF-F4Z0T-KBP9U\n4HOG8-D55D8-82N2H\n4LV33-W5JKR-GJ474\nB8YJY-0234M-5J1N4\nOX7X3-8UDMU-LMDFO\nJY4SE-FAVVG-AOGWD\nTPG4S-2O7IG-HF7CV\nYODWF-Z10HD-3ZFSS\n0YRAX-1704L-TIZX2\nL83TF-JLB0N-BNKTU\nVB649-7NTRC-GM70G\nR5R9F-AGA3G-84Z7F\n1QSDC-DV0GR-1R3ZW\nZI43H-850OY-XK3QM\nGW06S-FPPZT-P3B2D\nA0W0Z-EM40F-WU0NO\nOY5ZZ-1NYCO-W1T0E\nMU8LH-RTWGM-ODTD8\n2AUH1-KH7T0-VEBLS\nF5KHW-L5M8I-3INVS\nSFHKH-CQ2Z3-BOEXR\nKAJN8-NJLSW-R7KC2\nY94BU-AJCJS-W5FSZ\n34JGV-8GHTG-1O601\nGOXCB-QTN0F-XLY1N\nECMO6-VBZTS-33S0I\nTBA9T-BN9SL-MCG1B\nD3PK0-FFH0B-IRACB\nRC0YN-7HIRA-SN9RQ\nK23X7-Q74XW-RDJKD\nTYKVJ-HO852-JFBUH\nFB0FT-AZV70-53NDE\nO344B-NPP43-XTKHX\nK9RHB-B5MHU-TXC2D\nTMJP0-YOVVM-WDLIZ\nAKEYP-QX3S0-WZJUX\n9O8RN-28TZH-RYN8X\nL56UY-QW5KI-FME2A\n4UFM3-F0O0J-Q4LYB\nF74AW-7F0K5-VTQOT\nZ2PHZ-QEN10-XG33S\nWDBS4-PB51F-VFD18\nO1TJX-2D6J5-B5XW1\nXO6SI-J3B7V-B7LSC\n4D8PB-ZTL5Q-ACZRC\n4AFAB-RFHS3-9PBYI\nYA3BY-GTOEI-POZTM\n0SUJB-NXD04-JFMI5\nSTUKT-EVN7U-41QWZ\nJ2UCW-Y66BC-CUTO7\nVRE6Y-LQGCX-7AAQP\nPN6F4-5A9RE-URWKB\nEA33K-Z94Y0-CNWS8\nZYSZ5-VPJTW-8L6TO\n2G5KE-XXKG8-48KPS\nAAKJP-CB98D-LE210\nQZAJZ-KPH20-VKLS2\nEB0XH-1GN6S-CUUUZ\n7VW7S-RLIFY-856HQ\nA7Q7C-GK7C3-M80DI\nA05SL-PEDDR-AH69P\nLGCK5-PEME6-AIKN9\nFY0JP-ZVAD4-35FJE\n1NTD2-MJLM8-IGZ6A\nW7IQ6-TE1VK-Z5CZH\nFGFON-CKFAA-JAYHP\n89W1H-KH3UC-8N7I9\n2XLX1-NYR0H-6SLES\nPBN3B-WOZMX-HYIC9\nRQCI5-CA7CL-VC5N1\nIM7M6-8U6VJ-57QET\nTM5BX-IN8NR-HWAX6\nBQXWX-NJLMX-KC1QB\nCY0GM-6OKHP-D7WPP\nN3QH9-WWCTI-GUFGR\nFZ41J-D12KI-JY96P\n4ZCX1-LDUW2-1UQPH\nU2L3V-IW0TO-TW90X\n9CS25-5SYTR-KBSFV\n058DL-XGJOB-P9RSI\n4A8F8-HXBRH-BJXPG\nJTABV-UQO61-8UYV3\nCHL0F-6MVVG-MV1HU\n50XYK-47TZ5-931UZ\nXYBX9-FF0K1-ZZJF3\n18I3L-2HLUI-BNWIX\nUJHCS-PBM34-OAONL\nR16TH-8P3Q9-F1I01\nRR3AY-7J32A-ZFXAP\nMF8NJ-KDJV3-BT7DN\n47IJ2-JGBS2-FMFV9\nHFVIT-E80U4-U011O\nCE769-S3WQR-TR90K\n4NZNI-30GWX-CQRCC\nJ8TR5-VL0AX-1JGX8\n24P8E-VFN93-ZA196\nKT7VH-CSQPU-M4LSD\nIOQ9K-LNL2F-76J78\n6QEF3-6IEXO-D97E1\nC2U5F-TISS7-L3E8D\nP8WWX-PQ1WQ-Y17SW\nC6PLP-HNCZQ-NFQQJ\nOUR6H-83T4J-JJSAT\n7BMPF-09TAN-DMGLN\n24B08-HIN1Y-HACE5\nO8VD5-7FMWX-KFRAX\n0J9UQ-1XLD0-NSCCQ\nFBG9U-L3TQN-DC9LY\nF8X7U-LSQCO-37BDH\nEZYKE-B7CL5-ASCOR\n4ACE5-EHUVY-7J30X\nS593R-8U3BL-AIZZ7\nX6PT9-S0VVH-BZSDI\n1EHPJ-ULHKB-P01M4\nWQ6SE-B1B1I-OBF2S\nK5WLV-EZ8GK-4QFKF\nMX7RS-7SK8T-S6CGX\nTM12W-9WY3E-13BZD\nNQXP8-KYNK7-BHIR2\n6NXQ9-ZDRQU-QOJO0\nFFN3P-W37LZ-7EB4S\nMRCTL-TNT4D-01UCF\nAJGEJ-XUQE2-QNVO3\nW88SS-UHLDO-91TD4\n9HGJX-OH7D9-KBKIM\n72NLJ-M7K62-EGNE9\nZMR3I-9P0U5-LQH8U\n8XKKR-X33LK-LGTGF\nFX398-XH7MK-FSZ7W\nJGOUH-0YDAP-QWVJI\nO7QEX-L9L7T-X1DBK\n9PSIJ-J4FKY-MD71N\nM55JR-BGA8Z-T74U7\nJSV2W-AB689-KSCQG\n1JKIA-73TSD-G45C4\n0UOR5-9BL5B-W1YZY\nRQJLW-SDYWM-PC0RQ\nS1R0B-NSV1J-C1G50\n1C3XI-KIYLT-1LMN6\nGI8JE-LZVG1-SIRMV\nPINGV-5YFE1-VX8WF\nXFCPH-MR5I0-P3A4X\nDL7MS-YM85P-B3UE1\n5R99E-7N720-B7UTM\nDHOZT-IBNJG-2FNQ0\n0A82A-4UODL-7PBJ2\nC9PIN-FBFNT-CTCXE\nUTQM4-C28ED-YGTX8\nU4XE3-U0MBR-W826F\nZCNM2-9IMV9-2VK3M\nN2C1Z-M8TPG-Q0E46\nGBV1W-11H5F-VQLJQ\nPZ9Z0-D1A5G-3TCC8\n25YNS-48SD1-JZ8GN\nB75K0-HWB5F-SB0PY\nM12FY-TRPT3-4RLJ0\nV3RS6-T1ZHY-LAC5S\n73GBL-UP9GS-ITXIA\nGJWS6-21HX3-ABY4Z\n92TU9-MROYN-V9CFQ\nU9R3C-PMHVT-5DOVF\n8G3O2-HYJP7-ZM3WL\n0E1GA-89SSU-6UKKZ\nQZBB0-UJW8S-T1LZI\nUIMYX-Z5GBQ-LZI3O\nHBKIJ-3Z3NH-3TSKK\nUXMDT-G2X6C-3OH1S\nV12HS-QJSXG-B6XBQ\nXKRKJ-W8P09-5IKK8\nTCF7F-L3PM3-0R84T\n12NBS-WVA4L-N9CZE\nJ3AOO-2TAGC-X33FI\nK4HXS-SLGBV-GGLLS\n4RYEF-QSVJW-WP0JX\n2PK0U-I2A6O-RM7RM\nIJ79E-MX56L-Z1SE8\nW8YBS-WROBB-O1442\n9E4F1-CV2VA-AV0U4\nMWZW8-OLXVI-8QGKR\nX8IMH-QXY44-SXRYL\nG5WSL-A3EZ4-UV9LB\nN12J0-OLCKJ-GGDTA\nPECYH-S0JIJ-RS2TC\nYTQY6-VGHBU-QLU1T\nXZD2J-X4VOZ-R4C9Z\nGU78M-6WAMS-YD1ES\nYQBDZ-VFNTV-NXDIA\nDH0HB-VZ8NT-6M8IK\nO4LDX-WGJHO-RQ04E\nS6J89-U9OOP-PXGO8\n6M5UV-B20NG-94LZ2\nIHGBE-FJOT8-ZB2J7\nY0LKR-P4NZV-FKY4J\nHBCQ4-A7U19-DGA2D\nUL45M-SMN1Q-D2OW7\nEU1H9-3WCXE-D4J5R\nGPKEV-8MDRI-HOBIH\nIZT10-SU4I9-EHNOK\nQXG0W-BJ0IQ-C258V\nK9RNO-J7OGY-PCRZ0\n615YL-WELVD-IGKET\nJNGRI-AF4JZ-7O9AR\nKC3FR-XNWD5-FKG1X\nUPMXF-GZX0C-0QOXR\nDCB64-RRJO1-BD2OX\n81AUV-IA43F-KC7UF\n67STG-M4NUO-0E48V\nOV7SV-0F7XD-8YN0W\n3JQ1P-99ST2-KDH1I\n0YEVX-5T24R-0TKRT\n2AICS-KO5LE-BWFYN\nK9UQ5-HYYFK-RDK5D\n5ZOTO-9ECVA-JPYO1\nDYTVG-TKMFA-FF0RH\nUPQZ8-NX9N2-6QJQQ\nUPM9M-FICZ8-3MVIN\n9PMC6-DF9JV-K2PVL\n5SJ7K-3WIJP-7J6MM\n3PUG5-1UZ8G-V636G\nNBV3C-0ZGVJ-NP4XR\nGPI4G-EWCNN-8579E\n3XNVX-4SUL8-CWQFU\nD7V58-W993X-OPW8X\nS6WH2-GFCWE-P953A\nCT2TQ-5ILPK-1T5OB\n4WJN7-W21J8-31XBC\nZYPIL-OY1AI-HSXR6\n8IBS3-54OLT-M9FBC\nYAOUH-FU9I1-WBDGF\nMS0KP-8KDJZ-Y0P4H\n8X4IV-KW5W8-4PHCJ\n98AEK-A0I9E-W7TXT\nXKNMX-EOOHD-IRPKV\nFD0NF-ZVQUK-TLT7A\nJDZ67-SKW7B-MY578\n0LLMO-PR6TZ-DV8J5\nWUKZS-XS0LK-N71CP\nTRM6Z-U1KQQ-Z6OOQ\n8PBIA-VNES6-XPB0N\nM4WEF-SUGFP-WO8E4\n9N0OZ-NZH8O-FF3IE\nRPEY3-QPNHG-6QKLG\nZY45T-WZP36-PUPS1\n0SXOT-2AWHE-QMA97\n4N834-3QJ90-VVIRL\nGD6TJ-NO1BU-4CLZG\nE6QZP-HYXYG-FSRG4\nQXSRK-X1WSD-LDS9W\n4IT7X-J79IQ-F2ZZE\nHVCIB-5OVGP-SPVW0\nFSRIC-09UB0-FWEPI\n353WM-TT6NX-4XC0V\nI9R6M-WVMU2-IN8N4\nNEVCJ-GCQNN-PO06X\n10EJZ-QY8EA-IFY1Y\nU74U1-804L9-A1D87\nZS99Q-6O3RX-H6J8B\nF9KUG-4PIHB-U8G09\nMWJ5C-C6E2U-RAOGV\nXEC18-SHCTM-RQDQ4\nKHA8E-OVPZC-ASSSP\n8NLB0-I868Q-YVB9J\nJ881D-9H7U3-JOI0B\n8T0IY-HVH5X-CI2CG\nSZXN0-KDKCG-L8GDQ\n5Q9HT-RDJMP-6RIZM\n2HVX6-ZPJ0F-ALCZB\nDLJ39-1Q0SV-VCXYK\n4ROV9-MDOLQ-QIBSQ\nI1UGI-WZK0U-AJ4IH\n0V6WC-DG1OW-FWFEL\n50FFP-RNRPT-XX1OF\nKJHM8-AW008-YGV4N\n9A1F5-H2V67-57HMD\nJPZC0-P5NU2-G6RKH\nGEHJA-N64AE-5ZBDU\nK6K3D-OFT3X-6902Q\nNBQYN-01MPZ-4FI0B\nHKECQ-7LQ1M-6TADD\nQ5EWK-5HNUX-3R4YW\n68YF0-1WSV9-KDU1S\nMXKPZ-WOD8R-E8GW8\n2ZFTG-6339J-3XVQJ\nH7TV7-6ONR2-8FA2B\nY9IRX-TQYTG-NAM3V\nAKR26-Y6X39-5JLBH\nSJMBP-8O9N8-HCGUG\nAJT59-S1HLS-XO981\n188RO-PST8H-2V3LT\n7F70U-UX23B-RTEHD\nQN3XO-QQICM-EZBGW\nUFWY9-QWCH6-EN0CB\nCQ6ZC-1DJD4-QK9U9\n9SNKI-O08WQ-IGFVO\nV7PKB-7KTVE-ZFS2E\n0OR27-KMCPV-1YF9E\nB0T8J-UUMHL-A34XU\nRM3E7-GKIMY-EJ6V2\nLP60N-D5BUL-BMRG3\nWVQ3K-66I1V-NUAR4\n735CM-KGBJ6-DBUID\nQGWMK-J9T7M-3KXHL\n8BWQE-937ED-I7KBT\nDXJZ4-TVG5U-IIWG2\n515EM-MCMHV-D3K5M\nAKG3C-ZNJ0J-OVGM0\nUBZOU-DRWIG-TPQ2P\nYSU61-9778Z-RV453\nTTE76-H0AVB-B1OUJ\nWUA4B-7D4LG-B311N\nS3BQ7-R4YKG-F765O\n4KIKG-ZO0ZO-KHS1O\nWU0HE-R5XZ5-QI2ZE\n8N1QW-NFBNX-NVKXE\nC5PWQ-TVRL0-TR0NH\n0UYEC-32Q5Q-Z38I4\nPA9G0-OI3JE-AS2EM\nLAEA1-F1O72-SVPNH\nHLI2X-WK9PX-8E35R\nJIYFL-H420S-97OLJ\n6GA17-PXBRX-JP3JZ\n5D8UE-UC4WU-NT3CK\nCL6ZP-35XRD-AH0XN\nZQBR6-N96II-JTML2\n8QU6F-OOYBS-OXUWU\nH7ICV-YZLSB-N1RAO\nMU6HZ-0YWV2-ST5WE\nRKDAF-V6KDG-8RKU2\nANINX-4J8R2-7TWJS\nDYLBP-83JE7-IF2D0\nFP9WL-JHJKA-ZLQKJ\n499GX-PSR05-DPNPO\nUJYEU-C70G3-ZXD7P\nGJ01W-NN1O1-LA5UD\nOC7G5-6WSYK-D2D66\nAO0O0-SL37W-RPILY\nBQFFJ-VVVPN-DUTZV\n0BKGY-XQUWQ-U2OO2\nQO81F-WSF0Y-DDP9K\n8RQJG-FLEQG-IVHTP\n276ON-9K8WA-QD594\nB1L1M-ZF8DH-8GPU3\nPI3IO-J05WW-WG3SC\nPZPPV-JBUE8-XXOYI\nIRRVP-WH1EV-FU6G3\nH6NLF-IMEWJ-P9YZY\nZ7BTG-POQ6Y-YSXXC\nOPHCB-0MVZK-QUNSG\nO3BSK-3KTZF-JAQBW\nFC9OB-LYOFP-BNRYS\n2PT44-MEFXB-SRA0G\nXJ0ZH-PA7QR-IW9YL\nASEL3-C6PK5-D79S9\n0NJIW-AOV3E-TZN84\nVTG01-FIAYZ-GPCRZ\n7QW7I-73HM4-3GJDK\n66IX5-VU9C5-2L2J0\nO05HD-O8W9F-FJQ9Y\nFGUJR-KN5VN-6SHRJ\n6QACW-4YP30-5BU8W\nZG4X4-JZ8LK-OXYBF\nBHYK6-1ZVQX-YU9OU\n8EX1X-R5L25-55KLK\n1UBVR-UWCVK-8ADGO\nQ4M7U-JAAFY-GR8WM\n3MEOH-3QCG5-YNQ1N\nO3CGI-ORMI7-YVL15\nJJKQU-N0V1G-H0U8Y\nR2HG9-WRIEC-5DI5U\n5HGER-EZ2J0-5J05D\nH2LGW-A5BJE-3422C\n49VM8-6VN7W-73U0P\nJVOOI-J7S9M-ILIJY\n48XNN-3WFXD-Q0GBA\nP441D-JI63C-C2LHJ\nK2YRW-HTG10-QWNJ6\nWHY10-R9VF4-UHPDS\nQAZUB-4AW4O-I5PIV\nJCHVY-M5Y0X-3KEU8\nANMDD-6HE32-QLZ8D\nPEKDY-03AKP-BECT6\nZ9NCP-NOQHH-J75VZ\n03M5H-UWX2F-YGF9W\n2XVNT-6GZTJ-1TU0J\n5RN1O-FOBYH-43YQM\nBBS9I-4WYGK-0YESF\nX848R-F1YT8-TDDDM\nSME3Q-DY45X-E2MZM\nXQZWG-DIHMK-MI9A7\nQNFS6-J5DPM-8LREZ\nBG9CG-JQ1FY-A9A1O\nOAAQ1-1KKWC-ACB2Y\n6USKH-TLE7K-B3SIU\nV7RRJ-10ASK-6GEGW\nA6SBI-R4AS3-JTQXN\nSH9UB-7H50X-Z71BG\n6LY0U-Y3TF9-YF0P4\nRXNR6-K521H-R9Q9N\n9LQQS-FTDLV-GHGTR\nWMCJP-B4VFU-3RF40\nURQ4V-GABU1-EFKMJ\nE1JDL-4RAUA-6K2YC\nPWB3W-ZHR6I-WZ40J\n4KO0B-6G9V2-IBTFQ\nI2RY8-ZV2QO-K34IG\nNQFIC-XPI9W-BZ3G0\n4XBLQ-BDDGE-LVOVN\nGIUK3-Q9K0R-WREVD\nYZ939-74WDW-OIAQX\nI0TR8-IP04R-II9OQ\nI98CB-OY7SI-MOMGL\nRBSDX-2N3Y4-L7J6K\nIGL53-2RSFG-9REFL\nJ58AJ-DHAWA-RDBQS\nQBAUT-HT8F4-GOLB9\nCBODU-R51U5-9WVWK\n2HVI5-ANACN-SXY79\nE8N5R-8R4M4-PGC38\n4YCL1-9Z9DB-B4JXA\nYFHSS-A374X-YXBWT\n81WDN-P35ZY-H12P4\n6W3PM-FKQQW-CGRDX\nLR7VA-8ST8Q-W3K43\n6KLC7-OAEBP-WHYF2\nKZDX0-DMTX1-IDMKH\nT8Y27-HMUPH-V5SYO\n3DBF9-VZO0P-JJG9F\nIA563-CNWTO-L10U5\n4RIJY-O7HRX-HBFNV\n33BF9-GBTFV-3B3YF\nGIVPQ-ZMD0B-J9NHJ\nEMKII-LW3SH-34S3A\n5AHVA-V1DK9-E4STZ\nPW866-9WKEI-ZYRRN\nB5T6V-JFHGR-MK3L0\n0Y387-SUSMK-SAFL1\nHSB7E-RACJU-0IRDK\nFDHYC-Q6MJC-DVNLG\nJPHEU-V5W8C-OD26B\nB9VAO-WN1U7-QS3LV\nIP0IH-JG9C0-WDG5Y\nB33DJ-W0FTI-ZF9NE\nV8AY9-GKD9Q-RRCGG\nTD5YI-6O0BM-X6YXW\nAKCAA-FHSOI-A7MU2\nAG7BG-GLE7P-A6TED\nUYNJ9-7YTRG-GLKYK\nNRBZI-EIB9F-554M3\n37MBI-WKTAD-EJGZ1\n0YWYN-52085-OO61A\nMANJ4-ULLS2-L24HS\nY0GSR-C25W2-KH5KN\nF8J9G-ULB41-O0O0P\nH3MFL-SBDRP-RA3J5\nWUQW3-Z0HA2-GDD93\n2L8AB-N5OMA-PGKXC\nSE3ES-B3VR4-B8K4M\nR3O4Q-N1612-T9N09\nL9BR4-EG8OB-RIYXW\nETIXI-R8UBJ-WOQKB\nKFNHH-CY3BH-CVFHO\nKWR3W-0EZX8-9IXWN\nWKXQZ-JFI2K-Q066D\nX3A6B-PYNCH-WQSCT\nKMAG0-PEYRW-OSV27\nXMA5D-FQ0GI-SY3KG\nN0B7R-Q0YHZ-O0EDL\nGGEGC-OGW93-YW8WC\nYA095-I2E5U-BZBCE\nTLUGU-UIJE3-2WVA1\n7QNBH-HI2FR-YBP6C\n4UC0S-XSY7S-5LZX4\nRJWM3-4SCVI-J46BY\nN53UK-XVV5D-YGQJ1\nHYAOB-IEQOZ-N99SI\n587N9-UY7DL-H54V3\nX51VO-IYIFN-KL0HT\nHNXCP-OB987-U8DRR\n1QYJT-UWZ4T-KPV5L\nYMC0T-SDEE0-5JRTN\nUMICC-RABCW-9URRN\nLHVK1-WUWJU-465JK\nMVZBU-YEY9F-DNSZO\nYD9O9-JGA1U-W7NFE\nGLIH4-TKRCV-SW00A\nUPZMH-LKW7Q-O5D4B\nC0V2Z-BGX0T-I1E1V\nO93SJ-R5E0A-6WP6B\n8HFQB-68PS4-2KGG6\nOV7CC-DML58-PGK1A\nYW01M-5RFVU-8MIYE\nR40DH-PZ3P4-MJHJW\nHKQTF-3QKVE-3PA9V\nIR86X-33M4E-5PN0Y\nHL5MV-FB4L0-TVHQH\n2YQX7-2QBPJ-TRSK2\nAERLA-X59IO-3DMX3\n1BQ9H-DAAI9-03SBP\n7NHUY-S4DYQ-VY9P4\n0LA09-C5RNQ-9P5QO\nCFJUC-04DD6-GQ3BS\nPSDUZ-U37JN-LP8MG\nJGBNE-N2Q0F-ZO16Q\nM8WH8-5AWY6-EOQHT\nF9RAH-EPAPB-4BRYK\nYMGW3-A07ZW-63PGU\nTZDC8-TCK0Y-X3PCO\nO1IUD-UBOG3-PBKDZ\nERRML-406U0-DCPE6\n0P7W0-43FHN-B7NM5\nTQM3Z-WUH3W-ER0FV\nWNB7K-E94L0-3X22A\nZJQRL-EQ8BN-TLGA0\nCHGDL-0WL5C-Q9P3Y\n9OHIM-P69LL-Y7ZRG\nXB4SO-C75TP-CGYRP\nXZPTW-YVMAL-WE8HI\nCNI2X-PGJTK-B23TV\nXEOL9-UA7WV-86WTH\nA1KX1-T8ANP-PEBO0\n5AG0Z-6TP04-WQRR9\n5EE2B-641RT-MV71S\n8MK26-3UBV4-1ZK8L\nTBFQP-OA21Q-7SU5D\nNVN61-7Q5SO-L28ZH\nG3MB5-9L6KF-KL7Q5\nEKAKT-P2YZT-QEQF1\n67SQ8-QHR01-5OF2U\nFGTBY-HYW3P-L0A4P\n66G6M-X9CIG-1O7N1\nVK8YT-5VXIJ-IQGC8\nB0M4H-HGUMN-AVOW5\nGRYEX-7XF8E-K9AOY\nZ7WGA-OFBT2-V0ZYC\nEG8XI-F62HT-2UQZ5\nU9B5I-JR2ND-A2BYX\nMFHYX-XW6BR-U6VFC\n4QXF3-VLZ86-P2T59\nPCGGC-BWYJ3-P7LU6\nJGTAJ-QTX6O-L471X\nR6UGK-2T5LN-YVSC4\nKQXOH-FFB7G-0D078\nZC4RW-S72BH-ENSH4\nYG83H-0PMZA-9X6FQ\nUD1Q0-5K09W-1GLK5\nGAAE1-XLS8I-S50U8\n0MJSL-34I5A-TNMMA\nRDSTI-QTTEN-R8BX0\n8UHHL-KAO2C-86VMK\n05VAV-0UJ2C-VE5OE\nDIOST-NE73Y-SMISQ\nBG34B-W34VM-PNTUT\nP3H44-WXY50-DXZMM\nOGU3D-NXP3F-98EH5\nZGLX6-LJHXK-VUEIB\nST8DS-SENC2-1YW5F\nC6Q21-MVXP3-O09VJ\nI0VXF-JB7E4-U3U5M\nOF6ID-USLY0-R2W9E\nTYR4A-W619S-E1SVM\n3BP06-EFZKY-TLQIH\nW3I24-ZAB75-RN1LC\nF726F-OCENQ-PCR1G\n723YZ-5AS8L-2NGSZ\nHF2TW-SFG4E-M9BVH\nIOYM1-EBXSP-ZDZCM\nW1OVC-R0J0Z-6VQNG\nR8026-QCP5A-ATXQI\n6JCGK-AWYNH-SC0HH\nYKIR2-PVAPX-DN0RJ\nBFQGZ-63YLT-2GNSW\n1D61V-ZNWA3-2SAO0\nQLNYO-SZK6M-DQYI6\nUWG4N-TSQAS-VUC3A\nEPFNS-9XH87-API80\nQVXBI-C2UCN-JA1RP\nETBKI-AVAT8-7P4S9\nQ48HQ-JR220-M8MJV\nK2Y6F-PM97X-MLUYO\nS933B-D9X7V-WAQ6H\nTN4V0-ZN4EB-H94JP\n5DYQV-29DAY-H5NFR\nI6T1K-D8YZO-B174F\nOZZ9H-JRV06-6RH0W\nERV1R-PKKUH-1YXIA\n4OZFY-ECUR9-DESYW\nBAB12-8GIKP-GPS5M\nXUV6A-EWW4H-GNCHV\nYP6NU-ACOJ9-JHNRM\n3YSF5-5P0C3-JAENB\n6FBHP-BQ87K-GBP3M\n65KOA-I7L4P-1KKLL\nNT2XZ-WJKX4-4WCVU\n89Y9W-XDYSC-Q4KQ9\nZ4OJQ-2PFDI-DI7FZ\nS4JW0-G26GD-XDJI8\nUPHT4-3TX1S-0TBUM\nMXVZ7-3VQIR-OY47H\n5RTSU-SK0QF-RTGY3\n6Q84T-UNJ4R-XU9PS\n9MWUI-22GWC-2AZV3\n96ZWR-SPJWX-BDNXH\nNSPQ3-DF2DF-0HE6O\n1W2LB-K4HMB-JCKLG\nK14Q3-660T1-B1VHX\nFPK1M-15MJE-6DVME\n39G47-IS1TM-6B51T\n8ZV4C-U9RK3-FRZUS\nUFL8X-V5U7X-3178U\nWQF16-NIOSB-BH6HD\n8F2OR-5AAC4-S27SG\nEYCJA-7PR0O-L89G8\nMQ70M-RGPF6-PLAPP\nPOJXI-1CY8Q-B8FQO\nDKPPK-HDAWR-JNNTY\nKP3UN-8X5UH-WZ5C9\nQCPO6-LW3PS-ULUK0\nJF3NO-D7TX1-PIGCM\nKEEQW-RNA4W-ODIB9\nFJ0P0-T1BSL-6XWSQ\n2EBQ2-ZR8QL-9D5V9\n7TZTZ-2FRAV-NLP56\n0N6CB-FMUOY-J00AI\nG0AFH-BTWI6-KEBJH\n7MJ95-FZCN2-VWPKF\n4EV98-Z0XWY-O94UF\nV5FEF-VEZCT-Q8FWE\nWPJ27-VHIFA-I15Y6\nQ1SPW-MJUFP-0RIEQ\nGC20O-MWVFB-QUMKR\nYSUDJ-KXNNB-Q7TTE\nW5QPN-9DBZV-0U3V0\nH5I5B-5N3ZN-OQML1\nHSPJH-PINOQ-MU7UQ\n46U5R-SAEQ9-VP96M\n6QP22-SAS7F-X0KE6\nTIBAR-4N7GB-NMG0Z\n566N6-BRV5K-8VDF3\nJJHF6-22LL7-9T5YO\nRM12C-IJR4W-90ABF\n1M2GL-Z50XY-2BXBV\n8I7JO-QHXKD-VX5IL\nP5VKY-1CJSD-Q99P8\n7JZS4-CE6TK-ISBT8\n0GGR2-ZF10I-WG5LG\nM11KL-6RVSX-4KDAY\n5ZVXR-AID06-LYCUJ\nZOJG3-4Q4MP-5UG9F\nZR2T9-8DA5F-6V83F\nWZPZG-CDQM3-DSHMZ\nK2SR7-II3WG-7TGHP\n0ELHU-BNQMO-TK152\nQMEWV-SJ9FR-T3WDL\nLE28H-0L7GY-6K5CN\nOOWBY-SC8NA-C20FF\nHUGUE-ELUU8-G6A0L\n2MAKY-U7MP5-CDZCZ\nWR37Q-IT4GU-FIDUT\nAZAS3-EJLXK-BIN3B\n0B9SD-QWP67-MOWKI\nPYHEF-RNHUJ-GLVTH\n0YLUO-80SKE-L1PZX\nJZONE-I12X3-G9YCE\n6LO02-FWPMP-35WSA\nPBR8M-OUTKU-6TCHM\nDFUDQ-ABHWQ-XNNY2\n41PJM-1AD6E-RZPCO\n4E3K5-Q1TBT-SHUC8\nVBKK2-DX7WA-64OY3\nJ0ENO-IXOZU-FI3ZD\nMXTBG-06P3Y-RH7KQ\nIYNF4-FCNB6-4L8W6\nKTU8D-RKWG0-BBKNE\nRD3CU-1N1YD-H2AGW\nBQGQR-OI7UR-25L7H\nOK87Y-4OS92-Z75VA\nBJJFF-DUFFD-9MNX3\nNM0FW-J9V9N-MGEXY\nQ6UCR-LDOMZ-FWRTW\nKT2UY-OKG8X-3T6TA\nLW0C1-GXT1B-6Z0NI\nUYUO1-IIRV6-R1YJ7\nX2CEQ-ESVFB-OLWA8\nRV9IZ-09AJI-9FKFY\nP8P2I-1L4T3-NR9GR\nL8IMS-MH3JH-FYKET\nZRYE2-NF1PZ-XKVDC\nHP719-FF482-32PII\n7XFLH-LIU0G-C265R\n42ZWE-ZO6H6-UHHZY\nBAXL1-E520B-9PMX9\nZMLGU-RMVRJ-45C67\nQSOMA-SKBHQ-UT34K\nDNTG2-F809U-TASA8\n0LP1R-N7TZ9-RKIEN\nI75MH-D1BK3-OD1MY\nREMYK-9OFE5-R7ZD1\n6EHC9-LVE3P-VTCTH\n84B18-HIGD4-K9S3O\nJ7UUQ-4M8KZ-942QX\n4F5C2-DJR7X-FDSAN\nT4CVW-MA1RX-VY8OL\nJIVBX-8WWNU-SC3KD\n8J2QL-C4DDK-108MT\nYGU3V-QTXDJ-PSTT5\nVUZKQ-VEID7-M3COY\nV9D2C-IYCW1-RLNFI\nPE77Z-BAH9D-6DZTH\nN81PM-C53H2-34D4M\nKFZS3-76PFX-NSYKK\nPCGAO-TYIC2-SQ18K\nLFA3A-66FT5-21LD4\nAE1XO-8HSWI-XIMWH\nUC65A-I3RG7-0I5DY\nP5JIF-KX2EQ-TOOMU\nSKU01-MPT6V-H1KDY\nS0N8L-OW9KY-WBJ96\nU1XTJ-08HA2-GH5YI\nE2OOE-KF7TO-5NVNZ\n20W1X-2Z93C-EI0IM\nPJHJY-2DBZM-0BY7Y\nGW86B-DOY29-8RKDW\nU0ARP-D9F7J-MDKZ8\nR2V7E-1ZH4R-7E2HG\nT1ADF-TY1MO-CI29N\nBAKQE-23F2F-YSL1J\nQDWNW-U0AAG-GWFOB\nQ4P4L-1EV54-VITTT\n5RMW4-MP23F-ROGCE\nED198-8O64P-T8PT0\n6AEGK-FO8FR-BMX2Z\n0ZXML-QRH26-AB03L\nYPNTJ-LJ8OH-MQETO\nYX79W-49730-T9HIX\nU51MM-0ZLFI-4QFTN\nW4F6Q-WID3L-1A2ZS\n1QJN6-GK4GQ-MHIMM\nRWSFS-2MAV2-VK3P8\nG8KS2-WXBQ8-E3MRI\nOWIDK-7ZKAJ-X9S8G\nWELBH-T3O2H-Q8S4X\nP3K0F-HIJAM-I68VN\nFU1UI-KBOI4-8YYKU\nSHSZY-7Q3LP-M17ED\nB9GH7-K5TLV-DK1S9\n6U1II-HFB55-HAB4W\nH3BZT-OKCV6-IA4FX\nKI3R5-70S1C-EJ29T\nVSTJI-O9B9J-WLMST\nMAKK1-1OKU8-ZZPQ8\nCJ0DU-DJFU5-YQ3TV\n9XOGV-SZLWX-N5H8G\n622LT-R0TGN-DVLPY\nSY78A-GN45F-YNOA8\nZHVEE-GD8LD-TRAWD\nVSV51-77325-YHM1I\nQUYVG-7BTBS-5CYPR\nHNU1X-RN20V-5CY9C\nZJ7GI-K35F0-I6TL9\nF598W-B0BEV-AR4V2\nJZYDJ-4HVRU-72YGZ\nWF9OD-026JY-1OZCX\n9DM8I-64UC9-LVKOR\nYZ3HH-O1B5L-7JFZI\n7CE7A-970WW-GRFRU\n7KRTQ-NNJWO-ADOHU\nG21JK-R6GJ3-FIXFJ\nMK93A-FIAQP-14IF4\nS93JP-095DG-TFW13\n8E57V-WLBPX-EKMYL\nZRA9A-URMHG-W3EL8\nON80P-AYOXL-MR74A\nDEPKY-PGSY1-32YEY\nVRHYK-KVCSJ-UDU40\nU7TJT-BA7Q6-9X0WU\nJP7OX-GDV3G-S8MTY\nYB8LH-K36MZ-YWSMK\n3SP7L-L3JWM-OQ1O0\nGMN21-J321K-RNNOZ\n14DLF-EZR5A-1ETE6\nSE33I-IXJLW-UUY69\n5EC4L-BXGN9-UUPWL\nTZE2N-C2E0E-H8WLJ\nEBD2P-ZGF22-QORY0\nJOJ2M-GPV6N-GIB8J\nDBMSN-JX4R9-1WBLO\n8PNAN-WPCDF-ZSB7M\n5I8H1-PTJO7-D7Z1V\nWAMHY-X08OO-5GN4I\nEM2NC-R9CHE-JY5SI\n0C7ER-QKX9F-IIPHJ\nGBPVM-8CGX6-6S69C\nH9BBY-HHOMG-8N1JM\nE30TF-E756T-PE2IG\nHUK5M-XLR75-YTGB5\n7RA4I-QFGNR-BPC8D\n6409A-QU4FP-BJ6GE\nRFIVC-CISUF-PF125\nODP4M-SA4OJ-US3JJ\nCJ8Y6-NCC5T-KVZ9P\nG6XHX-0982H-N06SR\n427NO-RQATT-TSRFS\n5T2MQ-WH962-34Q5X\n1E6MH-4EWES-N4X0L\nNYB3L-Q3IFT-B0ZZF\nKVCCV-KFLVN-6QP9E\nVQNGM-49KI9-ZU5XW\n3M8FW-M7F2S-LGNJK\nSGIZQ-BVYBI-NDRVR\n8E5O0-LAHKZ-PNVCD\nFV66N-AXO7H-T97CH\nK1SLN-0XM7V-C4A07\nJ1GBQ-027GN-ISF1K\nQG7UF-NBW2V-TREXS\nGWED8-0M7IN-8MIJF\nL5BDD-6D2OE-KCFYX\nFO0Y0-JOD49-HGZXN\nBFSY5-0I93Q-RMXAE\nUYDO2-VO253-I61X5\n568DP-4DTYZ-UC8N4\nSH7TB-GO3I8-77YTQ\n1WGHB-XVEWU-01IQH\nB0HS2-QKMTO-5YDWB\nAXFMS-4JWP5-ZT9LG\nUSTH1-9W4NI-YLI4E\nCS70C-NYWJY-8RH6D\n6LDHY-1JUIC-SC6L7\n9UBV6-OABZ1-MUDUE\nM85Q0-LBYZS-M9XE8\nM2PDZ-U857A-SHYLC\nIEHD2-POIAW-SEP74\n16GAK-1GFJZ-49FP8\nX8MAZ-T2FZJ-C2Q1H\nDAARV-5EVAR-C91DB\nIYSIM-4KQ5I-BB3T1\nSYRU9-WVXRR-Z1DZ4\n1WOLT-OP3UR-BNKX7\n5Z1AD-DC2ZO-DFENI\nRLDOH-Y0Z61-IHE5D\n835JQ-LP4LR-7ZXBA\nR0A9X-HA98G-ZSJOV\n0YGVW-C18Q8-OWCT6\nYTFY3-X90D3-DWIAY\nMH0P1-J9JFD-WQAOQ\nKMSZO-J9HRD-P294L\n8DK5F-4BAPW-V9ZNW\nAKED6-437LD-92UWS\nK24AN-60FSQ-KTLMJ\n24Z0P-WI2OQ-J5FZ0\nKHF4J-FI3DE-3IDCV\nCU0PF-SD1XX-LF5D4\n52001-6OZ6E-NBFE2\n65M2X-Q1HAI-JEQPF\n2KN3Z-FLBF6-G7W1V\nJNMIP-OD9CZ-3O8PC\nK26KC-M53B5-LI6K9\nVV5C9-AOK4P-8OJ1W\nAL611-ARXPV-ZUS2B\nP9DJT-QU3D2-JZMT9\nK0ZLH-8XDMD-PGG8X\nIX8TI-1AR6E-9SN5N\nYKJ4G-D5AS6-762SB\n1CJP5-NVTR6-6MN7C\n6YI70-3BOV5-VGRL8\nRUOBS-PPRH7-6NHF2\nJRXOH-HZV1R-5XCOO\nWYMRQ-TSDNA-DNRHH\nF50GC-8DYRW-PMDIP\n5LYW5-BGG0Z-Q5P81\n15B2Z-VP7LO-F3W00\n70CKB-OK1KV-VIXYB\nFRHHN-BSOXU-GQCX1\nJ56FX-05OX0-P97S1\nOIR53-KKPKP-VO0VO\nJYYSW-78MCB-YQMMM\nREE9M-WGTCG-5NDCQ\n5D5HO-DJP1X-01ZOR\nFNB6G-2S2OQ-W7RWF\nOJFQM-YKIEC-ETMK9\nPSDHP-UXL7D-BIUVN\n082OM-6UAE6-JCCR0\nOFWS5-YUPJ7-CQL79\nB9ALZ-OT8YF-ZOVK5\nI2NC0-VR4VA-9KVL1\nLRZ94-8C73O-Y1ML6\nNE9R2-FEDYV-6FOX9\n7UOAB-MK0TP-DF77L\n2L22D-SCN5Y-2R1MV\nB43LO-04J3A-UMDCO\nHTXOC-PRSJH-W2AQL\nEX0QX-Z76AL-6SL9Y\nZES65-EFBPC-5REU0\nDBNY9-2V153-HNWQE\nNSYM8-TT4B4-RVC1Y\n8C0RL-2DZVG-C2D0U\nC6G5B-VR3IV-QN2FS\nANR7W-9NZF4-XHCT6\n69286-BAGDV-GB1GB\nQD4AA-8W146-FKMS3\nJ1ONS-FF34S-QJGAN\nRFFS4-K8CHQ-0AYO2\n71T77-RADKQ-YASPZ\nYDE1Q-OLM17-4RZO2\n44GMN-CA6QG-P47X7\nN1HIH-06ABA-YOA52\nE2X6D-1PG5Q-90PT5\nW2BOW-NQ306-VDN0Q\nFFWD9-6NO44-HWWEQ\nRHAPF-44P38-2GO99\nPTYRH-SZ94H-8KGDN\n8EIOX-XUUI4-LT4TS\nIB4UD-5BMR8-1JP9S\n3L6JY-PK8NH-MDQ8Z\n59110-8BGBU-BOVDM\nU8422-UZW1Z-QSN94\n2SEXV-W99K2-1CUZQ\nKY4F9-05IWT-8MPLF\nCSTCG-SF2SY-DDJTP\nG64PF-RYZWU-PYETJ\nYJ83S-9T4MV-0B8G0\n9DP9A-VIXC9-GUPOL\nCJBYR-33LQ5-MI1TI\n069SU-GVWYV-2LUKT\nXWXCL-YKOTY-ENEKO\nDGIN2-LIWKA-NRYWA\nLTACC-ROAL3-VMUPN\nYH239-2UEKI-228KG\nX5JGX-8NR7I-HB21I\nNZUCC-BQ0HZ-2NXGE\n1GL1X-YKWN5-EEIAF\nFYMHO-RT3JZ-FOF7I\nMOSUO-ZASAO-ID10A\n5QFGP-SLRX5-MB8KC\nERW8D-LPH9D-FRGZW\nAKJKX-SMH8H-MR1JS\nZWN2C-9I1M5-HGQQB\n463S2-D0PJL-HC3DU\nT9BCZ-HGNJI-SVIPK\nADLM3-0HP2Q-CS16S\nIHEKW-5V4N4-J9Q0K\nV11KH-141ZN-0YYN2\nBB5JB-XIIFZ-NP8LR\nI0BTB-L4IR4-FHQI2\nKWP1P-YIN8J-AZT04\n9UK5X-1ROUS-5FLJY\n9N3F1-J0EB6-0T5XV\n0WXX5-YGYYD-34DI6\nONXL8-7NH0O-4PD2I\n8YI31-H8ON8-FN8PX\nCIYOG-ZR1AU-D90UZ\nG1L32-LA0Q2-3G4QV\nZHLZM-5YXT0-CTJJR\nXCIJF-R6CKM-ERYMF\n75WS8-9HKLG-CTGD3\nBKAWL-IM00G-CGN3O\n69XGB-6QOQG-0S2CG\nTGI4O-OT7HN-C9Y66\nFKNXD-C56UO-AQO8I\nGIKKL-OVRTV-56JVP\nQ6L7A-CLB33-CQB1T\nM4390-3STD1-YS4DN\n9WNVH-KGGRE-9XOID\n9OW7G-JDEPY-DD5T6\nTVWH7-00CO7-ETGWK\nO56UJ-EXOQ4-IWS8E\nJALPL-G2KN7-RLEJ7\nBNZLC-PLDJZ-4G3CN\nKR4ZY-ZS4VK-5U786\nY0KFV-2X6NY-LGAP1\n6EN0K-VUWVL-D4V0U\nQY41Y-4T6Z4-5UPEF\nW7PRJ-4W4H7-AGMOV\nP4CPG-ENXKG-2U19X\n4VM8I-EEB92-4GZ00\nCVFQ9-P2MJ2-KPSDS\n42KSV-1I2YC-LBTJP\nVTKJ6-HA93I-AS7P0\n00FIN-5DGAW-MGL0N\nLU93E-939BQ-HFU6Q\n54IY5-AHGO4-9TGHA\n0KSYR-BD9UK-HJTWQ\nZQ8GH-5A7BG-DYS7L\nP9HBS-0Z0OK-EUT2X\nJYHRT-P0PRN-8BPAO\nM8U4W-JCIHW-B2N82\nD6G2B-H7FIP-KUHZX\nFQXE0-GNJJW-MZ807\nBQY1I-6B1FB-IYAIA\nLVKYF-4ODBL-PE38P\n9XMSR-R3BRF-33TO7\nTD77X-Z4Y42-KU1ZA\n3PI1L-NOVH0-SN6PV\nSNWTM-BC5AP-FU5VM\nT5DJV-S2LW8-T4Z67\nKNFBY-1S74Q-1S7K7\nTV1N0-WYWBJ-1BW25\nW1I2S-KHM41-KP1RU\n4CE3Z-51UVG-9GVBD\nHQCTG-ZP5SK-9B8PS\nKEBAO-L9N8M-K4W6O\nVEMBO-ZEE43-RNLIV\nVOTM7-HOSY9-6IZ2Q\nPK8RN-RUHZ8-E05W4\nNIP1S-B4XWN-G1ZKI\nFWY3D-8I7VM-9AP7U\nW8ZIR-Q61QP-M05LL\n1ZPM9-I1Z0W-OODHJ\nAYDPL-H1HDV-GED41\nWWNQK-HQ87F-680EL\nVMRY0-O2OCO-GQ82C\nVQ674-76T9D-M9KMA\nWIZ27-0J0VB-ZIXTP\nEVU0F-7XQ3C-NM27C\n0D2K1-RK3C2-QFE2B\nBEG33-T1AE9-JCHRQ\nRRE9N-QVHFP-LBQDA\nD4LGF-UD2JR-3DCJH\nY0R5C-QFT33-884VX\nSOQGH-YO67U-SC028\nEU1DB-1T1MR-3LEKO\nI69PQ-B0T2B-7HAPG\nSV5DJ-G61IS-UAT3L\nANAQ7-L0EYC-R39ZC\nHNOG3-864L8-092T9\nNG52T-RXILO-LS240\nO6R8Q-AXH5X-D4QT5\n8YU0F-6JQ44-JULAL\nHC3R8-BASOX-HOC9H\nZNK1V-W20Z9-8P9OW\nE6S5J-3BESO-IH4O8\nY0PHI-JKU1P-B9VDK\nDNCB2-B1HCQ-E3FV2\n1WWDW-6U3BQ-YJ40S\nC1Z8W-MXFL0-79NVA\nEHW24-O6Y38-LVB3S\nHVPUB-X6FSS-DWMBZ\nAJSFS-H09IT-NQW4T\nDA9DU-WMHMG-WYTOE\nM4DF3-URJDX-4YAM9\n5O7NU-418JD-JLY11\n5Z9VG-HDK2V-VYEDA\nZWJAG-BMCM8-CAOT4\nDLMNY-8U2K5-TLQ2Z\nM5UAM-2DWBM-MG0XB\n14XVY-5B52O-3T528\nFHIHU-S69A8-IEYFP\nEQB37-NN67T-3XUQB\nHLHPB-7EO1V-26JE9\n8Q9LU-W95SE-V88Q3\nY854F-VP17O-HVKL1\nRMOCI-MAQOH-661K3\n1OEUZ-6YERJ-5SRGL\nHHNF4-QHA7P-4HI5X\nSY2FZ-EVNP2-PHF38\nHORET-JWZ80-TAQ4F\nJDMQP-9Z3TU-KCTXX\nM3M7L-4IKZY-49KV5\nNP9TU-JJ7L9-2Q4HI\n8XDZT-J3VC0-XP3ZX\nH5NCN-NXMF5-DP4DM\nBAGC4-C0RYP-HIBRU\nETYTY-MXF5G-8WPFN\nEHRNR-WQ12I-3AXUI\n1V644-5PN4Z-52A8R\n8OWEI-GPQJV-I5S38\nXC1MD-F3SR2-9FL7B\nTR4KN-49AUP-EFA5L\n5D5NM-2JHVG-O21IL\nHSOIU-0SLTA-IGA3Y\nZAKU6-50EQ9-JA8RO\n1VX4W-CZOQH-VW0QT\nRNRVU-J6PV9-SAC88\n1ZX07-V1Z8Y-3662G\n1WTMB-PRFVP-15S9K\nLV35X-HQKDL-9310U\nCN2T5-9PXOC-NTB8T\nGI784-SCS82-1VUZU\nG7EDG-ED3TV-Z6PD9\n7AFO8-F1AVG-7NWKB\nGUIDM-EC4UL-35M4N\nW5ZW0-NPRXL-G6C1W\nAVZJM-8YOH2-DEERZ\n9WOUK-L98MO-JCVVH\nUXC8S-21NSJ-LLS0N\nW9CH1-IW910-F356C\nJQHGH-LNFCI-L03LX\n6TS8Q-5TGXP-UTWJT\nSTCE6-YRN3P-LAF9V\n8SJQM-OAI69-4TO79\nYKZH0-UJ6UL-D1N9X\n7661R-55Q6B-T0CYU\nIHH5T-EH2I9-ZM87V\n10OQ2-0FJF3-CV3NU\nWY3KF-S5QG0-1CV7J\n4GSZ5-8NNGA-BZY6A\nYHDQ3-SEZBG-2LN4L\nTJNYL-908H7-NLNAB\nX7UI3-YFV9F-QZZCN\nLD924-2MJO7-WE7XB\nMHUO4-WBCFU-RGRXB\nFI4BV-SZXEC-0ZQTI\nY3UNC-9OPX2-A6HMN\nAF1XC-D144G-VNMEW\nYZ95U-C794L-KHDQM\nQ77NK-EM2UQ-AR2UH\n1OHDT-NM8WS-TK74J\nOHV1N-V9RU1-W704B\n46PMJ-ZAF96-NTWAE\n5RO5G-T40IY-IVQRG\n94V29-ILN07-26BVH\n0YINB-47PA9-ND9HF\n12O0A-5T7IQ-BMCAA\n30MY8-MO6RE-DX91R\nETDCP-Z7K4Z-M87SQ\n890NH-22AAO-PC0YT\nWSX08-K2UXH-NDH68\n7CEK3-TSHIR-ZON2Z\nRWSV3-0QRUM-UICKS\nPOIYS-HN72B-AZBWP\n5DA2P-FZVQO-G3L50\nNFWEC-4K670-3DBDP\nM8CH2-9FZ0R-PIBL8\nVVITB-WOFHF-JKVMP\nOUV16-6QAZL-KEYLS\n5IU7K-MDH0C-PPMDT\n24WIJ-5NAUR-LEC16\nABQWO-Q2DPK-OIR3H\n4AJGY-6TXLR-T6UKZ\nEJQ81-1D47N-28RX5\n90JUE-I6OA8-7MDRN\nDB01F-DMIMQ-FO067\nAU929-41QS0-NUHW6\nLJG8N-EE4LY-KOEWK\nX8GTX-CB3TN-CJM4J\nWFSUR-97D08-GTYST\n8W8DC-4U9NI-4NRMG\n5H958-HJK6A-08HQD\nDET7D-3R5YG-564FI\nKVCK1-FZCYC-SXWCS\n3JNGZ-2PNU8-D0PN8\n5TLXD-YQAY3-HMUV5\n4X25K-PP40V-TS63O\n3DI3L-K9ZYK-BW49X\nJKAMQ-SHTJR-W35GT\nABIDS-STD2G-X4FFG\n4JN54-2S9Y8-A1AJM\n0CS76-5XZE2-PD1N1\nBO81N-0R55F-JGNOG\nPTA6T-4QDR0-82QLB\nEZ7ZX-W3IIP-DO490\nDJS9W-7V5IO-WCHLK\nZC8OR-2OHQ8-GXPJ2\nEQNJ5-J2K21-NKKH9\n5XZCF-LIQPC-GSWQR\nKILJ2-LEMO0-WHDOZ\nPEBIY-ORY5J-130BJ\n2G2T4-AJAH1-B3NKT\n8K0Q4-JMHJC-2GGUH\nE85R2-IQZXI-GYNKH\n38ZCV-0VIMH-QWSZG\nSC8CB-ZDNJ9-KOQ8K\nCN73K-GFQ9M-4SN91\nZS75I-EXDQX-GTQP5\n60JG1-E0NN6-HIT2V\nO85MV-IOPGL-JP4NL\n0RM3C-YQXXG-OUEZ8\n3ULPI-QX85S-04AFL\nB7QAD-G3KP4-8Q1O3\nA3LSH-RDD6Z-1V7PD\n8Q8HJ-JGOSE-DMCQ3\nFS84B-RXKGY-6P8MX\n1YTKD-5AG0X-FA7ET\nXAK7I-G6YT3-2SG7U\nTOJRD-IBZQ7-Y30TF\nBTIGP-ZUGEV-1ZO0B\nT96M5-FXBGT-SUD9N\nIL59G-E0AIC-RHVG7\n5KP8S-5V0CV-PCNOU\nKZLQN-UI5WN-POW43\nYFK4Z-DWPU2-U3BOR\nN3OC6-I5SR7-L6RH4\nNMM8G-2LYVA-4S1ES\nJ1JCS-GQ2WU-H52TI\nEWSM0-US67Y-Z3I9C\nEI9WG-Y2AX6-0LNDJ\nJN4ZT-0EFS1-HZ9PF\nAEG8T-QIOZ3-UCGVM\n3CTE1-1R6YP-2MXEK\n5RFZC-5Q6W0-FNJSU\nWX46H-RQ48X-JN9HW\nMW29J-V4EK1-4RS8T\nIQNP2-9SO5X-3WENL\nRRKXF-N0T8N-UOWZE\nW0III-KLY4S-3654E\nS5QVH-B7HMC-58UTW\nW4QM4-EM335-K86IM\nHTDI8-ZZWCO-DAGKA\nULPOF-D0E3L-GUPUC\n5SEO4-4SHLR-WIU23\nU9YHP-OI6L4-H1Z1G\nTJNGD-8KUB0-G4AGB\n6PA8D-CMC0T-ZYLMH\nWVEG5-LZF8M-H63Q9\nPVGSZ-CD2MU-YNHWX\nSC0TA-MKS8G-EDKHK\nQAVNE-H1Z68-QYQAQ\nCUBI8-95TSZ-0P6HH\nK9XWD-178D9-1J703\nJ5JW5-ZXZ7A-1711L\n66P70-KAOL6-YPGJ8\nA7R9T-SV9UX-YQ9BU\n0ZJNU-Q3C0Z-C11W5\nOUAU6-7BG3N-EW4QN\nBTMK5-9OPDY-80H4N\n85HMT-1ZJ1C-YQY58\nBUIEO-TPLR0-N8NAK\nLN1UQ-E1WDA-UP9MA\nTPPAS-1TVC8-IHIKP\n0J01K-SN0A4-9NX5Q\n0ZQ1T-HZX4M-7YTDM\nSQPT1-EOX7V-38YJH\nG1U7S-17HFK-CL63Z\nYLDS5-LHESF-G0O8O\n6TBVQ-K200Q-NWVM1\n56H9F-E1KXH-3FWP5\nLPI5M-JFKID-NAZLE\nU466N-A970Z-KAKXO\nK9ZUM-5HKBJ-I6Z4E\n7N8CK-5MO48-9DJLC\n67I5J-8UGD6-4FV1M\nI8YSA-IXC48-OQNRY\n5IOM1-7B98A-Q4X2M\n9Y9CS-3YVBW-SSFUI\nSM3US-YQROG-SRNQN\n2B4WR-P6XEN-T1FHB\n43JCY-KPY52-SX3PO\n70J0L-V1XXS-3JY87\nRT3GI-D4XQI-FYWT0\nSAQMT-510E6-EUZL4\nW37ZP-HEIW3-HSXRW\n2B7T5-TCGV7-THFL0\nEWKUE-4XEMG-FLQGY\n9PPM9-OJM9C-20PXG\n0EH79-ROVFB-6CNSM\nALMKX-45E4V-Z8A0K\n3IMRU-PNTZA-MJTYL\nPEUZF-AEAG9-8Y3TJ\nGSC9B-YA9Q1-9WLD9\nQ5LEI-05FEB-3JBPD\nGC156-QT23Q-4ISF7\n4RLUW-5HW7I-Y1T5D\nFUH4W-X4SFI-M0AQG\nV1UVA-2ETOU-73191\nJKWP8-1O097-WBXZB\nEM6YS-1XGT1-K3V9G\nBYAYP-BOM3Y-3MTCW\nHVRQH-AC0Z9-7FT51\n3L5BP-L5V7S-A45I3\n4DK3G-D9RKX-M31GC\nX0NEO-JRRX4-2YRJW\nKN3MV-459CM-JI9WK\nSEIUM-C6YY5-G5FDO\nGFL7H-69IH1-C7PUB\nQEO6O-OCL90-EQCZG\nRBJXY-4LFNV-X9BF1\nC7ELA-84RV1-V54ZK\n5MDPE-U3KPH-D0TLD\n8PDJ0-V1D4L-J5YSY\nJ0DEV-EJ54G-KNKJW\nX4CN6-8YQ8A-RB3MH\n1RYWP-8UMKD-2K593\nDNXRI-4Y0Q0-QLCDA\nB854C-MKR72-7OQQW\n4QN3U-CBQ1P-D52VD\nWYKNO-M8JL5-DSV3E\n33WAF-1NZKW-QNJXQ\nR4N7V-ENLNX-XVXY4\nQ7QSY-2PW15-KIWJ1\nB51YW-EMUBB-BVN3H\nFIP7Q-O59Y4-21AYX\n0VUZO-O4QP3-DSUNU\nOXFGF-VUQDP-6L6J6\nDEDDQ-YCR80-R3UC5\nPXWE0-HG25P-UJWZU\nIS2GI-93447-OV0I3\nGC93Z-WVIQH-NY25X\n59YQE-8MD0I-2S51O\n8EUHA-1USIQ-BAWY8\nG3UQA-JOBK9-GM58X\nXM3I4-BEBD1-ZW358\nPLRJI-IFOH9-QTO5C\n9KM3S-C9QTO-7WCM6\nHTDJN-9ZZ15-EISH9\nH1MQD-4RYL2-JEC58\nX5DZT-7SWJ4-UA92N\n2L680-IT5T8-T5MVR\nS60XF-C9LSE-Q2I5X\nPAANJ-D98BN-E9OQV\nH0X1O-EK1O4-G8459\nA5SMB-C7T7S-0943C\nC2GPL-ISYY9-DFHLW\nV5P4G-KKIJ1-016SP\n089LU-DMB8N-S4QOA\nM0KTJ-5P0AL-V232R\nB3MQA-TZFGC-I56TL\n3XQXH-2RTUJ-ZN7VN\n6HEAH-CT1MV-VZKYQ\nVQZ1B-PSFLG-ATXD9\nSOW04-BDWJ2-6B7DA\n0XVNA-C2UZ5-UYO8E\nK8VC4-UAXTX-LRLV7\nESWQI-5H8G7-N9HZT\n3CSRR-1I5QS-WFTYR\nB271Q-B5B0N-9STH0\n8OEGY-EC7PX-FPQTX\n32ULD-63DGI-X9PVA\nWGDYQ-7V86C-YB8J1\n73BJE-1ULPE-DLZ71\nUZRGJ-JA17Y-8B9HH\n1DDT3-YA19A-HH4JZ\nFSJZ4-VQC5D-NIWBH\n4Y3Q8-BULLN-7TA11\nSV4N2-MGTQT-QMUN2\nTRU7B-F9GSP-8W0VH\nCYAAB-5QBBR-L875C\nV6R7O-5YNVA-HWPDF\n1JI9B-URIDY-ICDFI\n0U68F-0Q7M7-LDCUU\n4SXNX-W7F4V-EY57F\nIQMIT-B46UJ-AP93C\nSYT8V-FRL2B-V56BV\nOGU9X-BW4W6-SOUKF\nQ12X0-60Q78-53UZF\n83XH0-5FM31-JACB8\nXMIV4-VQ48C-FM8C2\n0QP1X-ECI2N-RI7YP\nJ6AR7-JBNI9-QLFZU\nNPPP2-RRKEX-EX1AO\nQH93F-DEORQ-6K7BI\n0BSCC-O0980-ZXUCK\nHOVJG-2LXGC-0PCYD\nOWCMW-JJVWZ-4775O\nONAL3-5LJBD-4V7Q1\n446VX-E3DVJ-V4E01\nDBV11-0U8E6-4P516\nF2WUY-9I7VR-FZ3N5\nCIQSW-EZ3CY-4CHVR\nTBBND-T7W0L-DKSAX\nWPQA4-JHV2H-QBNQ6\nC8X47-ZT030-Q3RBH\nB2WVB-MUVLO-MC86A\nFTUHG-BI9DO-T2V6A\nRLCBD-VA4TC-54DAV\n9IJHQ-7H3AH-RLB9K\nSV81V-IVWQY-R5FT1\nP5JSO-G4LS8-S98Y6\nA5EUI-UFPFK-7MG0D\n4FRJE-2AJD9-OHNUH\n38LX8-NA2DY-UQQXO\nXRHM7-I3VIV-WZ9FY\nB9SOJ-OKD0B-DNVTD\nQVF9J-YJ68I-PPRTT\n3SYHK-Q7KQA-Q7MSM\nEUB8O-TWJHB-RDHKT\nK8WF2-9QXRK-8EVM6\n9DAMP-LE1VQ-PKS8Q\n9ACXC-L62FB-TD87N\n9KA03-6OEMU-IO86S\nKOUJ9-XLAZL-JNIH7\nWX4C6-BV28H-K0YYL\n4263Q-78HTC-I32GL\n3V4K5-O9MNL-N64P1\nRZTES-KRMWT-BVA13\nHP0CC-Y0NKV-HQ6FX\n6JYPH-O256W-0WZRP\nXH9GG-QW5M1-NI2W9\n4C8AU-FA2I1-VIPBG\nDHQO3-FIRPX-RHAXB\nWQUZO-32ORU-R0Q4U\nWRDMP-IX0WH-MMN8K\n14NFA-4GVET-XAVIH\n5FZBH-YARR2-W0Y1S\nJGWSX-7Z7FF-IZ3W0\n2E3TM-NU25R-GZOVD\nDGQV9-M3DS4-BAGVB\nU80O7-4UF23-VAO3P\n46QI6-2HPOA-HZ49F\nEFVAX-R2G1I-SCR3D\nEBN0C-X8VBA-W7YYL\n8M4EN-44D3M-NWA8Y\nRMIXB-CX15L-9DYO9\nK7JM4-3F4Q3-J4WXD\n4T1EE-WO9ZU-3ANHV\nLDD4O-A0ZBZ-JI5SL\nYVIKG-H32KC-XBRVA\nFBP63-32L4P-WA10Y\n0G8QB-FV706-C40HI\nSDZG3-9KULK-D5VEW\nZGJ4B-XK59N-QZUQK\nPPOZF-XIULR-PQ0ME\nH2U73-G4GN3-9OX3S\nTUIYE-6W3B6-O0X6C\nB44J6-Q2U7E-OPIAL\nGH221-6GNHF-EO3K4\nZF35I-PVHLT-PYJMD\nMRKR5-F4XRW-9EF4Z\nLG7GM-NR7KO-114UB\n7XJ6S-LAUZF-K1MRS\nYO56M-U5ZRM-UWQRQ\nVKQU4-75FK0-F6O9W\n9OPC4-KW2EO-Z6GKW\nC0ADL-42MVD-D54PM\n4G27X-LHGTY-IV1TD\nURZI0-BCK25-70A9T\n3S9FN-HH5VY-JF4VQ\nHLT93-IBLO6-WJZPF\n4P716-U35AP-TWBL3\n4FXAK-AWLF7-S14XY\n3WS6W-USA8R-MCCQA\nF4L8W-SZB0W-H6YIF\nJGOXC-O1ORA-URB6D\nVJN51-VBZBH-84XL4\n8PYK1-G1BWL-7P8KM\nWCMJ5-7XGLM-31TXT\n6P7W6-JSS86-74IEW\nNON2P-76M7J-U3E2L\nQYQYS-WDP7Y-B0D9U\nIVGQB-4HE77-IY372\nXU5NG-SPI8E-L8405\nUAWCZ-7R8PG-S3DAE\nVA9RK-GAKLG-PTAKO\nHKG3O-2ZM2X-9CI3M\nHEN62-S85I2-LEHJ9\nAAYCU-NKSV5-HNW1H\nKON61-QOQUU-E3V1I\nUVC23-CJQYO-M7X6N\nWLT96-J6IZ0-3CGQL\nGXZ0Q-SN5RD-NQ7U5\n7CVRW-TO4VE-MRQH6\nNGMMF-D4MV6-XXF9A\nZDYMP-M5Z0P-2HPKV\nN7WAV-49GZN-D1TY3\nWK2GQ-KSWT8-1957K\nVQ2XW-XPPVK-1KST2\nC0G4G-V4H3F-TQZRI\nUN5LF-EJ5LP-HNOF5\nEG0ZC-NWDPD-1LKFA\n5KBZ8-6AIKC-C2P3R\n4EYRE-RE09B-BDGF6\nLTR77-Y9UD7-DBUKQ\nQWIWG-JY6NX-IBE05\nBJ221-KTIA9-9Z00C\n6TH0A-G99SN-BT88R\nEHNHG-XHBRY-SLE8W\nKYXG0-20YK1-OBUIP\nAU615-WR6XY-ISJUG\n3UDTO-N55LZ-A5AOJ\nNMDCZ-9XL1Y-51PNZ\nVS8HA-ZL6XA-PC7I3\nZIHNK-XH6G6-F09FE\n49VDA-MK2I7-GEFCM\nJ5WXZ-HD77Q-E77Q4\nZBNVQ-23QOQ-08EQ8\n5INAJ-DTR6T-NNL7H\nSWY0M-XG5V8-IXBV7\n3ZZOH-UI3N9-VFLPO\nG8PIM-6C6DZ-S5J9H\nJOL4Q-V6LWC-QMBQ0\n4PHXW-G0D3L-Z6Q4C\nBIIEZ-GZEG5-DJXHD\nXU8H7-1VR33-D9M7B\nALXBF-PSCFE-P819R\nR5V08-TGMPZ-P46OM\nGOAK2-71PHP-QGAQU\nWV68X-2FB1Z-8BCPT\n6L83H-3MUXE-JVIVE\nZKBQA-24GX2-M56ET\nJV5Y6-1VVGH-72LWX\nC5E8Y-9MKIS-A6LTR\nRXB96-DPYJI-2J6CH\nPNKC9-0SCBM-M3O8Y\nYKANP-DFAL5-J85V7\n1H5G5-DXM76-0X1O7\nAFHFF-AMEC1-KL6HO\nYYTT8-1UPQY-YX7A4\nAB3I3-RII1N-I664D\nWFIYC-VKORO-NR0IY\nV8OH0-D60JS-WB0AL\nPHZ6Y-EJOYB-OAR45\nC66RY-IU62V-BVZ9B\nP1MXY-7JJE8-IZRXY\nBDV4G-L6FIA-9O0IY\nT1YO7-JX2HR-CT2OO\nJ7C06-CXKU8-UBX85\nN1E6R-A7R2T-HWURY\nA49VB-XX191-KMYIV\nZWI1N-1EKZ1-99OIK\nKPNEW-4RSRU-Z3F48\nSYPYZ-DQJB3-1ZQ9Q\nKJMYE-VTNQ9-WG9FD\nDKIJ4-EGTNL-Y5NIO\nBKFQG-WDC7F-4VV4D\nQO1HP-3KYXB-R585W\nVI7Z9-O3O0R-GQYOS\nCXAZT-N7KRA-0B7FR\n55HMQ-TN4HC-JCRFO\n2GSF8-GD87L-6J6GV\n3JU0K-9CNDS-G3HDM\n38TB3-TRRQ7-4SQW6\nT1R0P-S8RZL-ZZ9N0\n9MHDD-IIFDI-79W6P\nXGX2M-5AHHP-GIJ9Z\nER9KA-QVJQT-13NWG\n2UJKT-O7F2T-Q9G65\nZZ4O1-VY1MM-FZZOS\nS4Q7L-VUDSB-1VFEL\nKW2Q7-Z6UL0-BK5KP\nQY08L-K2R73-PHN9F\nCZ3AK-5SJT2-497NE\nCJNLB-K4AJ8-QK5K3\n3F3B2-7DT3A-358BM\nX1E7H-2FCZ0-3V00B\nSW35A-6Z1ZT-LOKA3\n4RQ2F-BB1JY-OXOFB\nDIYUE-FWVOW-VU780\nKATKI-EFDZD-DBJGZ\nVEWJK-U8M04-CD3EW\n8I6DB-NDZ2W-6HE9B\nN0D0F-BHAZA-5U8WA\nQRWVX-V8S5B-FSZH8\nT971O-39XS5-UET96\n6DZQM-TMFXT-BNXYE\nG69XX-SCFFW-RRV0R\nEZRPR-IAUTP-NLT7U\nSM876-B3S01-38ZYC\nWVT0Q-6P7YW-CUZ8L\nZ1HH5-R32AN-OR3FH\n9KB2Z-5TMGT-DM5G0\nVYPF2-DKF1J-NUV7T\n8PJ3I-MT050-99R2G\nO8WT5-WSWW7-7XBIX\nP68C1-LEFTC-0OWRX\nLIJ7K-687Q0-0XMQ7\n2IA3G-XP8D2-WARY7\n67ED1-OUOGA-6HG64\nMRS64-TERSX-HIXLU\nGYNCI-SKDY2-J8JB7\n2WCAV-24N4A-WX89H\nQMO15-YL78A-47GN1\nJNQU4-1U94X-EE28G\nW8CMW-X39RA-VUNZN\nVUTSH-B9KTY-JZGLE\nDVEUG-6J28N-XD5HE\n81A3O-B3WTO-ND5HV\n8JLB6-68PA5-GBWJA\nI8YFI-0IDV1-F0J2Y\nHOSMG-A11JA-EKJL2\nPQECE-BM02N-SOJ3M\n0AE4A-5V898-8T6FG\nD122V-RUJ8J-WT7H6\n7MMK1-QBPVV-8M031\n3V342-Y0MXO-D5POM\nAVA0A-2XV52-L0BEX\nQJ8HS-2UOK7-3KX9S\nLQE6K-BP6Q6-LOVYA\n5KJOJ-JI7E1-8X5T8\n7F1YH-S1LYM-MVIYF\nTXEKX-NE1QU-U1AAR\nZZ6PG-9T6CP-M5LW9\nTXUBQ-G6M7B-AA54M\nEQNYP-NBBGU-3F9OE\n9AGMO-13UFE-X3TC4\nX7NCN-GHKSK-YJ46M\nVD0FR-B9RYG-D0QLE\nLNQEI-745KZ-7U5KG\n35V5O-5GRIF-RDMXB\nJC0Z0-W7LB6-DNYWB\nLZANP-9BONK-GHU1J\nD4UNG-2ZV6K-Z0UXY\nCY8OY-IPDKL-HI7RL\nLST6Y-DTIHH-J1VBU\n9XHTA-LLW3J-Y31TG\nP7UA1-RM4TN-DY9KR\n8SYEG-1XXJZ-75PM5\nGKBGZ-KHA2H-ANAL0\nXN5JN-PAI3L-8KU22\nTP0HS-1LO43-J7S3G\nA2OEQ-2JJMK-NHMOE\nKWHM0-478OY-206FM\nRXF3A-26I3H-4O1CA\n46EUC-8KR0S-ITSPJ\nXAI3L-G5VQR-CEVUP\n7P2AJ-0RDNZ-CBGAV\n69GYK-2UAFW-4FUCU\n7ZUXG-KBE09-BWMZX\nDDEP8-GCH3P-M0YSY\nCBIK8-HU4YO-5S1YC\nF4RAU-3D605-XIWJV\nKUNX1-YS7NX-NTHCM\nWI2D4-493NP-2PU8M\n9FUTN-YPSPH-UN550\n3U65E-5SVCY-2VIKY\nH2WPG-VE9CK-N8BVP\nKPTXO-GX5VL-V2TF5\nFB1IY-FXO3E-2IFIN\nHN3JY-5MZQU-PCEWU\n5CVW3-YV8OY-SR8OD\nH7ILD-YZJDT-UWVNZ\n53G0L-N0VJI-WELUO\nBS4PM-XFOVJ-WP8GW\nSN70N-JJIPA-P33SU\nHDR7B-WENNA-M4WKN\n54C7Q-8AXJZ-ABCY1\n7825C-O9IDE-2SLHO\nRVXSK-LSWWK-6XGA0\nLSDFT-NIZ32-87P41\n2LQ25-KTKBE-Z2H4L\nVUXBW-GP8V8-9N5CO\nG2HO3-3T6B3-VSTWH\n01IMK-A3W37-JFFI8\nZBBWT-82M7O-T7770\nSCER3-2RTJB-7MG6T\n5SWGQ-HGE74-7XY1N\nR0YUI-R7HLD-9WFKD\nAB7OY-R4XPG-0752C\nFZJHO-Y09D2-UYRHO\nEJ5CX-VQ8CK-85IQW\nA4D53-XI7TJ-1JMXE\n851UK-UUSWG-BFEET\nOG2MQ-17IO4-7ZLU7\n2BOE9-1VG1T-VY4MZ\nJXABQ-47GVZ-JHT1Q\nHBXMV-PA7J9-ZCLXN\nRM783-WLS83-S709A\nRQB1V-LRUO4-J1ALO\n9HJND-IYW6B-JV0A5\nCGW4O-RDG8O-EDC6Y\nJML8C-4GTU8-8KFVN\nXUKYL-YM4UN-01UA8\nVZSGJ-DMJ38-OSPI2\nFTAVK-J563Y-6Z0YM\nYY2QM-90WAS-LX3QU\nBEYNW-D958Y-T4J7A\nPVDPV-RG5BJ-FTFPM\nEA79O-NFPWA-XHNGV\nG872N-PYV0F-G4IIG\nMFCRV-5S34Y-GP6G3\nZOQTD-G3B3L-U9ZXM\nI63IK-2UTDI-8F1S2\n2NBME-S1TRU-F7A5L\n4SQPY-VJCYY-3J372\nMWWJW-OD799-5QSY7\n4LLKD-ZVVTD-8ETQZ\nF1RLY-I9TFW-B6NO7\nCD4UE-NZHV8-3KWCZ\nVP0FV-3I0BY-GJP5J\nHXV00-25DAP-75WYQ\nNFPIC-99UJH-4H8Q7\nEF41A-WBMY5-1GZSN\nELA6V-KUOP5-U1PYU\nMQF66-5AR3U-5Q04A\nALZC1-RMAOC-VZP3F\nZRML8-ED1T6-YVR5C\nRE9P7-CZ20G-02A90\nAC0FO-S9UJW-FL56S\nO92FD-YDLAL-XCQEY\nAAPYT-HK664-23GWG\n6RZV9-LSACO-RE8IP\nO8MO2-M1X1Q-2ABQ0\nQ6AH6-PT6HN-BYTQ1\nIDLR1-XKTPQ-5YY12\nPJFAH-BQZK8-NRYR0\nV4KMB-AS8TV-Z6K3H\nOP7TC-H563K-4UUT8\n1DW38-5BGLU-N8LKG\n380PL-A6SMN-V52DY\n47B6F-I8OPY-0XY71\nPVM2V-0RSLM-Z5EOB\n4N6HU-AQKC1-1SOWA\nLJL1H-ZOYZA-01GNK\nFAZ80-CFUPZ-9NZ5E\nPLW62-8ZRPB-EB6JG\nGXLSN-UHWCE-A2BFK\nR4SWO-VXRGB-1IZNF\nAHT75-9XLRX-M0890\nKFC6F-RTXX6-7UUV6\nZN0C4-3A3YY-0WN2V\nER9C0-VDZNJ-3RJGG\nT0NI9-V2FEB-QKX0V\nVX365-9HH58-R2PI9\nMIH80-YB0SZ-5QNM5\nGN2ST-ZQZAX-C5OFT\nR3SQ0-UK914-FRUWU\nAZLSX-WZH0L-K4MS7\nHK55M-7LBF4-48Y8L\n8VSKV-AS5GH-8E17I\nEVDE0-LFJA6-07AU7\n2DIJ0-3DIGE-HY4C0\nDZUQO-S9395-LAD5L\nRA0PB-IEO6K-3BPAF\n67AEM-RAXAR-INUW7\n9DGTU-FYTML-IBBJB\n41WF2-JGBQL-IULXK\nXZG9Q-AHO6W-7S43H\nV2PT6-86GEF-AAH2M\nATEEF-YOWRX-YGXGC\n93CSN-2DMNW-V8FR1\nE6LDU-0KZWF-62JQA\nC7USF-WOD4P-N08IC\nQ0AB8-SQ92C-LK6P2\nMR2MQ-X6IH0-B49PH\nJ8DTL-CXYC1-K3ADI\nHLCLX-A30GJ-IMZP9\nDWBQM-L5EQ0-TQXO3\nD4XXM-M73TR-0O6F9\nF4KQF-ZGBNI-V8NU2\nH0A2R-HWZLO-5BEMK\nG9888-9HRDP-2ICJS\nAZ3E0-CC1RL-KNKEZ\n3G98F-LQZ7Q-ZQZ6E\nDSR5D-MPK0S-JKAV3\nZYB2K-T16JM-N1AZI\n5QM4N-W0Q9M-BVEL2\nPJ328-DXY02-71MPH\n3CQ9S-9OH1F-G1DZ2\nPSIUJ-3GPWH-BJI72\nLB6YA-OUMG5-KC9KS\nLSVAD-1BSV9-7S8ER\nUMVPL-8VZOS-362AN\nF1YOF-YHCLL-5GAX9\n6SH4K-3962H-6FXZS\nK9QNQ-9Q0IJ-RC2CN\n0Y9FH-KVDNG-U5BAA\nBFL7S-P95LN-B4SL0\n5KE0Y-JQEF5-BFCHJ\nRIE98-6LFOK-PJKIZ\nVVNVM-14LZK-B738V\nY8O84-KKOHO-SLL20\nKTYIC-QZ9UM-7MFBU\nN4VXU-ZQ54W-KWBIT\nZ68TV-DNPNA-1CJM0\nBABQ7-BN4KA-ZC6HJ\n7CAH7-E9SRR-0NX3S\n2EZFS-SERQK-GUYTO\nKITOV-KTIN5-91FYQ\nJYF79-UF29V-PL4RV\nDYBSW-TWYYJ-ILNEC\nT8QO7-QP44X-S5L4R\nJ7NVR-2DI7P-2PPG5\nG99VV-FR21T-HSJYB\n23OPN-TISOY-M43TY\nJ9LSC-ZV3PO-U19AH\n6DGFC-UDOJU-E0R23\nG3562-FF25M-JS2VN\nXBIBC-T2D4F-3PBJD\nCA543-GZF6F-CJ0IF\nPC9YE-WO25E-2SY5L\nRMEDJ-R48RL-84WN7\nZJJZI-SK6I3-94ECR\n6L4OF-SVJBN-789WT\nZIIG1-GXBLR-2XB6E\nKMNUR-7POE4-EBT3R\n7VEDL-94ESU-5DOTJ\nFCU3X-RBF32-RNFA9\nX7X3M-TQDEB-86QUT\nAQQR1-JSKBQ-N5SJP\nOMN2H-5E14N-RB8O6\nBDX0F-J5FC2-O154U\nC8ACW-FVHIN-NM4FU\nWHLMF-JK07A-NJR7H\nPGD3I-V3O0N-2YXI8\nTNI0M-I6G96-1KTP4\n2SGN4-7ZUHO-KCTDC\nCZ2RQ-2A8BX-HGC1V\n0XWBY-BJPKL-XE501\nY3BP9-FTG7T-PYVH8\nT6WJH-2JNXN-MLLA3\nFV3Y2-QDX0A-ODL7F\nUWYPQ-GML2Q-FO5QS\n4D21M-CK8NF-TKRVD\nH0VN9-L88MY-BANH2\nRCALE-ABFC6-XDLEH\n43UQF-KVT72-CLVM1\nHF21L-4ICM3-QFATD\n54VPM-7AAYZ-1FQ2M\nTV5FW-ZVG32-A92JM\n9T5TD-N0X80-W1UNU\n9IOGQ-05Y0F-Q2B2K\n77YKC-3N820-T0F04\n69ISS-T3B0G-NR6O0\nYB8V2-EFLD7-RGW0E\nVT7PC-5PIAC-C632G\nCEX9Q-IH4XP-UP9UV\nC6PIY-RSQV6-TKDCM\n0J2JH-FO41N-XGXTB\nANT7J-GUM9F-08GA3\nKZQIV-FFJQ9-5GBOV\n30SOL-8KROM-BMGDS\n4KUMD-WTE6S-P34BG\nKCVF2-OYAQ3-60FZ7\nCZE7B-0G56Q-WJIBL\n45203-QZ8HV-AUMUM\nM4V99-399WT-LKNSR\nX2IPK-D78GS-67Z76\nHVKC2-JQH2O-IMWAI\nPFQSW-DVZFT-YF3LQ\n81WCM-9NZ9O-956CM\nDE73A-C4BN3-412TD\nTRR3N-3NF9F-JGYY3\nZJ46I-Z09OE-ZY7RR\n72NOX-DRFR7-ANUX1\nTBGIT-RJC54-CRNQF\nK35D9-3F5X9-HRAHB\nKWFHH-FDF87-W8LLL\nG0JKO-L7UPF-619CZ\n2W56A-A3S49-ZFS9C\n2L8Z7-G8VU3-SW9CL\n9U4H6-PCYQZ-HYFTE\nBE9JY-UWMOI-6TJVY\nI9YXB-TYOR5-5BLVB\nXW353-VZXA8-06U9T\n1YBVP-IN6V9-E9KDG\nWCR2K-NK7MF-DHOUB\nBAG2F-DRU4A-C1S2B\n360JP-DBNS2-HTK3N\nPQJKO-UL73G-4NT1G\nZ3N66-N7ZPK-C9FGD\nS5WJ5-1P1IS-MJ26S\n1NGJR-KWHOP-LD900\nTGKIT-E0VB4-NPNDC\nOOMQS-BWTAB-HDERM\nCRPBL-CZ26K-7QFU6\nFGZ9G-Z6MK2-G2RQ1\nKRX1R-O7FOO-XINPG\n6BO2M-VIBBH-CUKIM\nKAMGS-OR4SQ-ZRL9S\n7H2IV-K0CX9-8Z45L\nE96FI-01RWH-0ADIE\n4ZOSK-9EB9Q-E0Z64\n7PA2W-WXVWS-FMDFT\n8AGL5-D2IAQ-VTQP2\n9U0RT-FRPVV-GZW9L\nC33A4-OJL7P-M7IV5\nG8XB0-0OCA5-2F09Y\nVHXDB-VU238-D84B4\nZBOER-HPC1A-DFZHS\nZTPOU-IQ20I-ZWKDZ\n5KKMF-J9VEL-QYN07\n40U14-DWUWH-FSE14\nNIT75-7MYJC-P9IAD\nXBII9-ZKAHU-A1FZK\nP1JIB-8D8GQ-C5FG4\nCX3JR-QJPKZ-68JWV\nI4LF3-E6ZQS-G07XY\nOWQLP-MUFLU-V4DI8\n4SXPY-MLFFG-CG74P\n1XKEW-1ZH3T-L1YK9\n8HZ0P-BXD8A-6VNEE\nDNNRX-S1K8I-LV3QB\nEDWZH-J5IU2-7IOE5\n0A7G1-SO74V-P44J8\nUCZDX-WN6RP-VIIAM\nLDHBI-VTZJF-NLD4Q\nQ4IBJ-FAPC9-3XBM3\n5SJEW-IO6TY-VV6JR\nXA9Q3-JJQ28-X9JEN\nV6OL8-ZI4P0-GSKDC\nNDZS6-CTNED-IHH6S\n6OEL4-D34XO-0Z0Y7\nQT8AQ-UDZPC-I2M0G\nILYCO-EVBUR-MIGUT\nM7JX1-8EBLN-WN7NH\nW0D8R-K9MDX-G2IFT\n9WOIS-P12IJ-UMNYO\nXWIXN-BL50E-TFSLQ\n4VC93-PDN0E-J2BTV\nNVYF6-ZMHLB-JZH4O\nN6UMW-AGVEL-UE88Z\nMYKN9-0HMHQ-48RNK\n4K0WO-U1HWU-VSU5K\nAEK31-9478B-29RGZ\nC6V98-DT0B0-PJ35Z\nIP1M2-IGY14-2SEYU\nP9K41-86UJS-INFHG\nVDATG-GX9ZB-D7A1A\nN4KO6-U2TL1-3L5NJ\nQGG91-FMYQU-JYUE7\n0UNUV-J2QLJ-111T1\nOXJAT-58IYI-MRVXU\nM2LW4-EO6ET-7DUCF\nCK1H1-RII5O-VZJYT\n5RCT2-369G2-DQTES\nSH2PL-PW91P-A9ALV\nN746V-SFNHI-FELYK\nYFARJ-YYUDA-QBY6W\n6OBSU-PY0DT-BX3UA\nQAUJI-02E9K-GRYP3\n19ZBU-U5I63-KWKEX\n3ICDW-ZFI3E-ZVECF\nOC6JV-FSCE9-JPWR6\nS3R1N-GAA5U-H5KIO\n9I4FQ-T5V8E-KIPV2\nOX87K-MMLXJ-Q65K5\nV5I9O-LM65R-TDL5A\nZYM16-15MXR-UXPNM\nMJWGC-90XW9-L2YGR\nWQY4J-QW349-HFRBX\n6K4MA-XQ572-NWGYJ\nC0T72-H9HYK-JMSOL\nCPO77-DA5WI-O0VMB\nPQ0EA-3V0OX-O8HS5\n6WZNH-3SRXQ-AYWQA\n4EA61-94J0S-1ZUCR\nY3PD6-FFSVB-V4JD5\n7RFV1-ERAV4-WWEER\nIRXKM-1D9B2-4JD0U\nZ75S6-TE37W-AV9QY\n8W1O8-OYWSH-IQ0E0\nVFQVV-Y3XV5-BKDNJ\n8DSNA-DQFNO-SGIDJ\n6GU4Y-SIHUH-UPGLE\nFLZ0P-99L0I-IL3K2\nGL2NS-RUCJQ-1UC9M\n0SNQV-8K4LM-JBOFL\nXTTJE-8QNFZ-NYSQT\n2XR6O-VO6SP-MY2RV\nKN09P-ROXPK-97907\n11LB6-0XW62-V2T67\nAXI1U-W239Y-VQNQY\n8DZ5Y-W53WS-DRG7P\nG56K4-QI9PT-NC9I1\nYXUIY-ME105-JZAE6\nUQ46H-DR524-BS95I\nA8W7X-TDDI7-W6B2F\nCATXQ-JNJCT-HCUU8\nL7ETB-L59HS-LX5ML\n6JWID-AHR9L-G5BMK\n3DDF1-A17GM-MI00K\n0V9ZO-654LT-JXZO3\nHRD6V-UMYPR-E09YI\n0QSZK-ZFKFU-PNS7T\n5PB90-1W0FY-9G2KV\nHJ7RU-3LFJ3-KWH0D\nPTQK0-1TAOY-7XNNK\n0A6DD-YJ5DM-83T4I\nCYGVI-NNYLQ-W6GP7\n0C5ZK-ZE4JB-SQDAU\nPNXZP-35GYU-D8UJQ\nLCQK1-VYFZM-62SGH\n26IP0-9Y307-T0019\nPDIMU-BGVHS-PJOC8\nVMVQW-CD7GM-9KJWA\n4PGL9-K417S-SU1OI\n3TVMW-U9X45-R3XFJ\nSNMJH-HNWWJ-ARAX7\nEXM2Z-HXNI8-DC34F\nN00XY-T9DXI-J73YQ\nNV38G-ZDZHI-T16RT\nRMHX0-KEN1D-PGGRN\n29L0V-QXRMX-RMCJR\nNTGB1-15SS5-S1591\n7UD9D-OHS51-GYM1E\nVIOF9-NEUUY-D4S3G\nM0ZTT-DC349-B5XYL\n394UM-YNMWZ-F42BD\nOX8SY-Y8IML-6U4BQ\n9QQHN-26T4I-BEZQL\nG03J1-RLBFC-F45HR\nZI1JX-UEWNH-0CVXB\nFL7RD-JWCXT-3SPI5\nUZ5W7-UITNN-VLBQX\n0IMOK-B8APR-M3W01\nEWGSS-O6QMG-5NW5I\n11L9U-UMQEY-3W0HK\nYTAHB-YQ94P-9RUYS\nCWBWZ-3I0GN-27KSP\nBFYJB-KCVKM-5Q9H6\n2RJCG-KU925-E19XY\nMEG5E-HLOUN-CRZQ4\nWSZ8D-LALT4-7N6VC\nT0FNA-SY326-EC9C4\nH2RL8-3ZG0C-6Z57B\nKELEE-4S91S-H4FCN\nC496X-YO2UB-RYVEL\nG0NIC-GOLAV-13TWA\nFTHPE-CPIZX-JRWPN\nENOC1-63RB7-2ACQM\n6YPGK-CIZ3H-B0RP2\nB6VW1-HQQXR-VSM8Q\n64801-XLTTE-6TCQH\n4PKOG-M2RR6-1A4S1\nTVH5R-OTNXX-JQSVS\n77LSD-RX7FO-0QHIB\n7J7KR-Y73K4-1MVKJ\nQVGNG-S0FAY-5B53Q\n2NPQU-6KWCY-K1JLL\n3PFEF-W5DSC-GXHPE\nADJO1-Z12U9-AOW8H\n7M44R-FHF7G-ZLMU8\n32PCZ-HVYIJ-871B1\nI0ZX1-V3K97-00WR2\nWHFJG-BPUBO-DA6FG\nAID0T-69DIS-CGU2D\nLJCWF-L9VWS-SQRAD\nF87T6-0GELP-R9YD6\nC8B8H-J60FS-JFDUH\nT4IMK-TFO9O-NP0YL\nICE58-HRF73-375OB\nEZLMO-NSU5L-9C9MA\nXJDD6-D7YPJ-LHN95\nILARA-FKDI2-HKVE9\nG15SG-T460F-71O3Y\nY24A4-HYQJN-ZQA79\nKVPYH-BVT98-G65H7\nM7OOV-0HN5U-PF3JW\nSQGY8-N7T8O-SG5KU\nCQ6RU-HWMKL-18YKS\nG680T-I9TEQ-W3436\nDP0HM-ON2ZE-0MY1Q\nW1H4M-ND0Q9-V6IPL\nZWTC9-EOO7Z-UZQ18\nOADNA-LWE0Z-N6L18\n5ECQR-C7KOO-8NXIY\n63VMT-04M60-E7ZAC\n5LTHY-B09SL-7T0LF\nNUH6U-AJQBT-2ZZD8\nPK13Y-RVQ33-FZAFH\nBLI5G-TSMG3-EN9QY\nLJRQ5-SYLUB-60YD0\n0TITX-8AI6P-2Q7NO\nYDO6G-YM70O-CHFTV\nJ9VK9-WZ3WK-6J7SX\n349SY-OJ2JL-AHR37\nV7R54-O64IY-2YNU9\n9WA3A-5F6JN-82X52\nJX9IN-SLC7Q-C2D8A\nL84RF-FPRG3-Z97PU\nWEUVP-3W2WF-G887U\n4PNB0-U9H5H-WJ80W\nIE8L7-WQ84U-1QA3O\n773NC-KLYFF-Z0ERM\nSVCG5-CT4WO-0B671\n73OW3-IMDMX-BA5BG\nUH05U-CXNJT-Z62P4\n7UOYR-RW28R-D8GBI\n2MX6O-QACRM-RY9XE\nEI2IF-8349N-9JZLC\n6TZF7-MOSM7-L56MZ\nCVTKY-6MVPM-I41S0\nE445K-1X1T2-GZTRX\nFPR6T-ZITMF-PISP5\nB0IP5-CJJRI-AO2I1\nCISRE-TYQ4P-2EJMH\nX1A96-RRF1J-AMSQ6\nAK9AA-KVY0F-BBS4D\nRTJ12-5A24P-7YMAN\n4RPIX-6JIZX-ZMK9L\nS20I4-YQB3G-II2ZK\n97272-VZTR5-WI0CN\nT64SK-MLJG9-BM2QT\nY81NY-Z7NTK-HTOU5\n7AP64-R13DK-CIMU6\nIOBJT-YKSZP-5VGWU\nHDWTL-011V4-IVBRY\nBUBHJ-3WYI7-S52SU\nCLUTO-G13K7-HNDF7\nOF9U6-NPKAW-1GJ6M\nBSTTK-SF6UA-AMIS0\nSEWN4-6A62C-RAETX\nEK8XW-J4K62-SHVHZ\n9GAXQ-B6OD1-HWEEU\nR9X40-EPGUE-05U92\n3VVTT-H2ALD-9814G\n8CB9L-OD9VE-3A2GQ\n1HC7Q-JSETP-U7KXP\nYPYOD-67WFX-8AK0D\nLOD8S-6FGTM-XSM7W\nURWV4-WMAAQ-PPA6I\nI92CL-2RJJP-J2SIU\nOFXAW-4JW31-ZFLO4\nQ9FQC-HDPO2-71BTK\n7GVON-1NB7C-ZBFM2\nO30MC-EAYVE-CDJQ1\nIIQIX-M6P50-MCR1K\nZS5JL-SXGPL-HGVT8\nFGO9H-660DN-NC0QB\n25YO9-LIH6J-BKK49\nOJCJA-G49Y1-FWOXW\n5X127-JHIPH-ASLE3\n7HK4Z-PPY02-NGLCU\nYENTA-7UV04-FJ3X8\n13DLI-CPEBW-5OE8U\nTKJ56-U083N-CL6W1\nDJG97-TZ8ON-DN4GT\n7W2WY-QEOPW-TIIKR\n9KPXP-TTTS9-MKJS7\nII7FY-X30G5-1DQB5\nZZOE8-TG9T0-LO675\n4XGW9-E89MP-90QUC\n6575Y-PE77C-G8JW0\n8DYZ9-ZLECG-N7SXY\n0L7HX-MQMZK-Y5MGT\nN1594-K5TKS-67FY3\nYGNYW-D18SL-BPPOH\nPKQQA-RI58M-T84K1\nSHWXX-OYFDV-NA11B\n94UNY-EMZ4R-LWF3Q\n6YK0I-6ZGNC-K2CD3\nUETRT-7HD55-M1WOI\nL0RP8-30UWO-29XIE\nOZWFT-MTKNS-Q6NUA\nNLMN2-U777V-UTHWZ\nGP30E-JR81Y-70H5O\nMYKKZ-N5X0C-O21ZI\nNW5IW-UVI5S-M42ES\nINDMR-KBZPH-MDWKQ\nS7E4R-FTS2R-NCHVH\nY329H-WKD45-GZYRT\nUYSI3-2ISDV-PE63D\nF5HJP-B9F20-XN28O\nCMCW8-PLZDK-6SMBX\n3WM57-40NVH-NKN1Z\nRUWPK-TMQI8-9FM0O\nT7DUT-BM7OZ-G3UTB\n0Q5JK-H6TSR-GWRI8\nLDN9K-HXVQH-M6AB3\nBR4AP-CP3FW-D2J1V\n7A6AB-8T0KK-XXXN5\nXUEFA-G25UO-3E9FS\nWAF0U-IXN6A-NVCWF\nDDR8E-9SLD9-7AFCV\nKMIMN-XIYUE-AP09S\n40MNB-E45KR-J7AH1\nP0WGP-A109B-NSUHN\nKS410-TYD71-317U6\nS20C8-SVT19-KAXP8\nTDYM2-6WH3X-IXTYM\n0OZ75-F5FMN-CSA1I\n7LPVK-O6V10-T6WN1\n2PV43-2363L-DNJEJ\nM3ST9-82C36-NJOHV\n9N38R-49SSG-3RQPK\nUYMN7-JJQNT-BCFG0\nUDSX4-WDW7D-APKH3\n9CCMN-E7MTM-FKH4S\nUFV3P-LZ4V5-IXBY1\n6XNP3-YY80C-1CKU5\nHV0ZK-9P2LM-YNI9D\nY4GDC-DDHP2-RXWK0\nINADC-GJP33-Y7VJK\n0P06D-9EKTI-4NYEA\nLC66E-YGKOO-NFLH3\nRMI33-POM7Q-15WW8\nGK3LO-XS2XM-T6LUR\nRWDLO-438GC-S1W5G\n2Q590-P31G4-2Y0XL\n9LGKW-9F5N4-AY4IZ\n2R5DA-DRDI6-UKUVJ\nP8ZDI-L6WSX-3CDU7\nA7VYN-7HNF3-X34N2\n9YZ2I-4RAC8-KYUVF\nBON7Y-ECKF7-NC2GQ\nLLY34-MACP1-JYEAS\nGKBE6-SAUUM-S8RPR\n4C5XE-ZE4PO-7KMIS\n35BRZ-RAA87-61SAM\nBXNKY-EJA7Q-W5DHR\nKQ0MG-7AIC4-635YM\nKH6G2-3BI94-V3MDF\nYNP79-XQBR5-AQV8A\n3KKW5-3SR10-C782R\n0SALZ-Q6ZLF-2P1B3\n71KPH-P78N3-STXOJ\n5W9H7-UL9NY-JI19C\nUGOXN-ORUTM-QMSOZ\nRCKWG-AWKL5-5QC01\nWEGG0-3JYB7-4WQFZ\nT5794-2KJNE-V50LJ\nCWRZU-F5XFR-7DDYT\nL4ZQT-BA0HS-YHEEW\nPE08O-D5TVQ-P5GKX\nUSLZB-FTOFU-NEL2H\nO16MQ-0H0Y8-PW635\nTSVPZ-JZWST-QQ3B8\nJBZ8F-C3K3G-T8L7G\nW75TM-90QW9-VQUSQ\nCAD4E-X9AZ7-3I300\nFNUN7-02M8M-1Q22P\nO0ZT4-SEJ89-4BRKE\nSEZWJ-QPFQK-G1Z0Z\nQRSH0-JFGJP-N58Z8\nG2BIA-TT9QS-C74LY\n7KR1S-DHNX2-J8GYQ\nYHF4L-P5ZQE-GXHEB\nAKXZS-JFXU8-Z712A\nN1G6K-JAU00-U9W6G\nLVFR1-7VYEI-SFNY2\nQ3V02-ZEVE1-B9JKH\nEP9HY-AMJJK-N21Z7\nCVPRI-TR681-V5JL7\nDZQP4-Y1XAU-Q0RDD\nOWII3-JSLCE-S1P9D\nFKMO1-PLH3W-4FE82\nFXWUR-JNWB4-2H0NZ\nTW6CX-KC66L-JGTLE\nVBTEM-FIL6I-8MP9Z\nI308O-K97DT-KUVK9\nMQMX1-RRBRC-H8W6C\nSGCZ2-DGO32-3KPOS\n5S7ZF-PE90V-ZGXPG\nWC2DY-Y53EU-HBAIE\nOQU0A-DQTM7-N3S1W\nA522S-8JZQU-P8YXL\nIDCCB-P3JK2-S76WN\nJA8SB-P6SIZ-TR0ZL\n4YPNE-JHK3V-WVFRU\nVWKSI-4NLPE-9YRZC\nTC6HS-14GGL-74O9P\n4WETQ-ZJ5XK-NAUIQ\nMFZY4-VCD1H-509UC\n6GFTL-RR0XQ-5D51O\nUSSAP-IDJVB-N4Q03\nBYKDB-8J3XS-HDNGC\nI5WTH-NB10P-DD808\nBWYQ1-T4DZO-8AO6E\nLTM0I-4MHXH-SQFT7\nDS84M-TBNYR-8LRZ2\n54YID-TIO9R-H0E0J\nGEE9B-DHPEM-WMBIS\nCHZ6G-D76SW-Q5VJX\n8YPC3-GATVB-3XX3Y\n9F666-GYRS4-M8MEV\nUD5VH-75NZU-NW16Z\nAIQ03-NMZE3-C3056\nE5PDH-O5T0O-EDOM0\n1N0IE-QO12M-3B93T\nVWUGQ-YM7AK-KQ7S5\n3C48A-4DU4O-1M4P2\nOAMGB-1QD9S-Y14VU\nB2OVI-Y70HH-Y071B\nIRBFC-DIVJ2-1VOR1\nIBLS7-WLI9T-NSN8M\nKS04Z-PW9NT-LMOT1\nPD3D9-AK2TN-IWP6M\nRDXS3-KGYG0-RX20S\nS84TD-3HYR0-RNAML\nFRYMF-HJRD1-UALY4\nZGTUR-D7YHS-4GQIP\nEGPVC-995SX-2X153\n3A5UK-1ADE6-163W4\nN4ADG-VMDFL-2E53X\nSUV2H-J0R8H-RGA36\nDYTK6-7LAY6-CHHUW\nH6KVD-PJEFH-B6374\nJ2TBO-0BCEL-LZUGW\nZ2ZI2-AHKQD-OM0JD\n8QUI5-ZFQX4-SFHFD\nWTEH1-6H7A9-J1M77\nN033U-ZAM0V-R4Y5Y\n58LKA-DZKPA-94W16\nHP9SR-VBF72-O40T4\nQ33J6-HEFZL-7MVK8\nFCPNA-UXF6U-BF07E\nH72CH-ETD9N-Z6IRZ\nMEFY3-13LV0-TJ0JK\n62R8N-KLF0B-T29W5\nYQ8HS-DB3S3-V3H9K\nG4L4W-CU21U-MVHFE\nSBCZD-XTQMG-SZ12I\n0WIDU-E8INY-2EYH2\nMC9G9-S34TF-DSCOK\n4GI7S-HOPVC-1O4MQ\n6EESP-WCF2Q-6WXUN\n1S6BX-A5SV6-XS47H\nK1YX7-5J5Y0-WPN5M\nFKPLY-JBNXW-L7BYZ\n3VWEG-KSAYF-P2K9I\nCPU9C-FH7SH-HTA1W\nQM5T4-2WJLP-Y6U23\nMQQ7K-CEH54-XOXWF\n44343-MRO23-2DNUD\n3HO89-09ROS-6LG3A\nPJFXZ-G66TV-4Y141\nJAKP3-KTT0H-RHM7V\nOM0X8-3A46U-AXATT\nBU84H-JBRFG-LC4OB\nQ70AV-VHFQL-56ZB4\nDX9AB-PJQKR-BHHW6\nSQ5HR-7EZW7-20WV0\n2Z41Y-OVJMN-9F2CQ\nOADON-OPU8B-R8PH4\nCOVK2-FUMB4-L9IXS\nTHJ3P-EL31T-P4YFI\nNFB6K-X9QAL-85SUW\n8Z01L-PYEX0-0WN1S\n7EU59-CE0SG-Z7742\nGETEN-47TBD-6TJGC\nAFNDT-LYAOE-FVQ6X\n6POTP-9MACF-9O6XL\nFP5SM-WTN74-H09SZ\nI7APP-6763Y-MZBPF\nWW261-CAYL9-KBC2P\n2O31T-X1TDD-806C1\nORTRB-UW8OD-5W1IZ\nKAM8N-XCCYU-011WL\n8IS4K-U8OCV-DCDLX\nYZPHB-UQ075-5DKCX\n16MNV-67NW3-O17CC\nBNZHS-K8J86-WVBAD\nQWFM1-86ZDF-BV1VN\nPRT74-LA979-CB0GA\nE4MJN-1D4FS-YHWEZ\nF6Y5W-HU18C-ZFM99\nU9EB8-HT1LB-AHRPE\nSDN2C-0CAPQ-IKP8Q\nDBRVQ-1CPQ0-TTGY2\n1T467-FANCY-9F16W\nIULZA-7H67R-5R99Y\nB1NFE-GUZ0A-QC6D6\nMMLZA-A3UDI-F7ERC\nJL26Y-MKOCI-6WKDA\nSJTQ0-BKOV7-KLY0Z\n9E6AB-H5J3J-D2D5V\nRFNV9-W0P4S-V3HCX\nWMN61-ARRSU-QF7J3\n1V6C5-5Q8BA-ORZCV\nWQX7I-UAQ18-TWOJ9\n3XHQD-CHOPC-N867V\nN0ZJR-J0GMG-NJKYB\nEOPSI-K4Z40-H2THE\n3OKHR-GVNET-J2W54\nVESB6-6LNM8-ODIBM\nJN8KV-MR5OJ-XAU7P\nVL88U-RDQ7D-419C1\nUONCU-O6306-9IT99\nEF7K0-KB79Z-XWN3L\nDAP1O-P4JM6-FR8IR\nVZP4P-LR55F-STE5W\n9RIHC-N1TGM-MY446\nWG1JC-ORTTA-SHRTQ\n77PGR-FS102-HXUZH\nII1IN-SV6PO-ZACRF\nJ4RT4-TUF7W-6CN3I\nKNZG5-JBQ2M-MSWN3\nQIKEF-JHX6X-UB0T1\nZRPAY-W9W8V-UH31C\nR4WKI-IOUT0-LGGAN\nL4345-2AY1V-PMYT6\nTHBJ5-RTEE8-LKV22\nLTXGU-BU8DG-HWXD1\nOZ7NA-IS1M9-BYEYV\n3THPA-CWGNY-DYI6I\nHF4AB-1EP8F-MENAX\nP32CT-A4DMV-OLJYR\nF2XB8-Y66DZ-03EC1\n1B2IS-XF6IK-1920Q\nY2V0S-AVX5H-O46K6\n956B3-M8RSB-EIQT8\n2W2L7-B5BJ1-6N61Z\nI0YIW-RVNFG-TVYYI\nSISSM-JNZXH-71F42\nFQNZJ-D7Q31-97V9W\n4MJ27-ARU9M-BXFQK\n044HO-J1S6K-DIP9K\nGP6W2-C2I1B-IEY9X\nGQ47J-80HEJ-SS6OC\nIB1QL-BNFHP-31KU5\nY17E9-HF55L-XO0YC\nG3WO5-W03NS-ONSAI\nRC80Y-1QNIU-ZMB2L\nZDT65-65XD1-BH5XA\nWLCJG-AMIYR-SAR7N\nHUOGI-EK070-1EYTW\nS8YK9-Y3D8B-LR3BY\nS6NVH-43RH4-QM272\nDDM8N-CAX6H-UZR6Y\nDRA4P-EBHG0-KCP3O\nLPBTB-SIA1Y-P4U70\nS9DF0-TE5RL-HPSRH\nHA7WO-XM3AN-L659N\nUPYWX-QQ1WT-BUCFW\n54SZM-BP38H-GMA72\n90WX8-HZ48I-RZ44Y\nCFH15-KYFPX-JSZQZ\n0XGYW-KQSG8-5MNDN\n275PQ-S7TYA-VO2EU\n4IN99-AMBGW-GFP1N\nJSRQ5-OS763-KY1WJ\nH1B97-YKVTT-TDPF8\nQ0OB3-BUN8A-Z3Z0X\nHXYFQ-CLRD2-0A9IZ\nVP5O9-2BH5D-MG3ZW\nZCW0L-79R7U-TMQ7A\n4PC8K-3EP0N-4YS3X\nTRMD1-X7QB3-GZM88\nC7WPS-LNCS6-HV0VL\nM1PEM-3L9EB-BWC7Z\nJCREA-H3MK7-CO3EQ\nYWN8O-S41QI-PF0ZY\nVQWRO-OZNMT-50LDJ\nH40ZT-6TQO4-Z8O22\nAXSC9-GPWVL-WJ5AB\n0Z1OD-GRDAK-G8FYA\nI7OPB-NJLLY-5XRXC\nRRUNG-I7QG9-H2MKD\n3RELH-V3LMZ-A68T3\nCR8BA-YZE1Z-4FQXD\nPWXPE-OSAD4-PL3LO\nVSEZ7-S18RS-2QV3Y\nK1IB7-PL3AN-Y633J\nDD7SP-A5LN9-P5KP3\nAT4AS-O8TIH-6HR3M\n0GDTJ-E6GWR-K0AB4\n3NOSG-WWZD3-JKK16\nT3RWC-G45W2-YYFKJ\n5MEGX-74GLN-XHG0H\nB11QA-AHL1U-RO3YB\nPJHY3-A5YZB-97ZTM\nXKHYW-QP7K9-FY0SG\nSKCC9-PALP5-9C3FB\nRLCDO-IL4UH-QLH7Z\nXYDC5-WWZYP-7RLM8\n9LY5H-51P9J-06978\nNMBZY-PVEMD-R04DY\n4Z6IH-7XTS9-BSMUH\nYK3HP-JWFG4-MRKDD\n95OZZ-I0V79-K3AII\n2VEW7-TKSBN-UZXDS\n37H3N-JEYK7-FHGYZ\n2D5W5-9D7VJ-2IPJG\n26AX6-XEXYU-KHQJ8\nSJHR6-MHGDQ-6YWMP\nISAAO-X4VOX-WFQ79\nEDXCR-IPYJQ-A8BNB\nLX0O7-9QIVP-S5R3E\nN6UPN-I7S95-8F5DN\nD9WH4-D4QCL-0K2HC\n9F4KU-9GOZA-ZB4K7\nIVDOA-VSKGT-KTXDV\nVA2IW-BTWAS-O6W93\nQZLDJ-8N8I7-2XW4C\nRTJPS-RPE5J-M6MNE\nELK10-ZCOOS-EOI7K\nFJWQK-HOL7X-1VF9Z\n36ZNX-RGFBE-Y894L\n8T3K9-TN5YQ-05PAK\nLUAQD-V6RL1-UQ7FN\n5ZFWJ-WRF49-RSFSU\n9ZHUY-E4346-MMIV7\nIZVC5-PAQSO-YQWDG\nURH7M-7IQ1V-V17SB\nO8PF0-TPQQD-IDHRQ\nZ5F3B-CN52P-78XWF\n8EKHP-F17FQ-MIYHM\nXS5KT-XUQSZ-S3T1G\nG7K4V-KENVJ-POAFR\n4311Q-RZSFP-4UGI3\nQRXT1-JU09U-U0KIJ\n1YYED-8UOG4-625A5\nA9KXE-DXLTG-165DG\nN0YD9-9GYL0-CY8TM\nPKNAY-ZAXK9-8G618\nZ46QP-NS9OJ-33O84\nPZVMY-7NYH3-CG816\nTW2KS-AZ5OF-UI1CF\nMNJH0-VDVIY-EOVV1\nRYJ2D-QKJ14-FM21B\n3ZIBB-LDXDT-XC541\nCSBWX-SVAJW-SR55T\nYY3RI-702ZY-2M6M1\nGQ8N6-FBANC-GF3CL\nJUL18-RZDJ9-R2UVP\n2LBWW-M34G6-8T6LV\nC6CDX-QNBKU-M1XGZ\nP9TLD-MOONZ-PA97V\nOJBWQ-GAGAE-65K0O\nGSF4X-W6HQI-T8ED5\n3KBVX-C8378-GS0J9\nP0GTB-DJD7C-26WXW\n79OKD-BUE5B-PDWFQ\nY13NA-7PCJS-BJ4DM\nPOZUM-FF3NP-RXL4D\nP0N6C-0XWF6-89JZQ\n5ACCX-3DM9F-WV1QU\nXNML9-TYIZY-WOOC6\n7TJTR-5GJ0D-PI82C\nZA56T-X8KLA-36DEK\nPHEXQ-0X9B5-WP7J8\n9FZQD-UQZZ3-3OWO1\n61QNR-PQKE7-S16QM\n7AJFS-KO0DT-OGG58\nE5TRW-NHE3D-UW2P7\nD5RR6-BJVP1-0WO00\nWK5J5-TS16R-YRL49\nNKMKT-T3C89-TF3QP\nJUF1U-OXEFK-CCFR9\nUMTLR-DA8XH-VA8ZG\nNYGMX-6ESIZ-I9ZQS\n42KCP-9ZQQU-1DO3R\nCMB6D-MG3W3-CMF18\n6OO07-O6FX3-CR0B1\nJMQIM-ZBH54-Y22L3\nZUI4O-A7D87-BM760\nNGGWA-2X0HW-NHIL0\nRMUO1-JJWT3-Q3UH9\nLMC0N-THKF1-W1EXM\nC7JPT-FMO9R-PXNXM\nRWIFP-GKM2E-TXGKW\nM0D01-1IF1R-QVZY0\n2CI8Y-6G5TM-YLRB4\n0ETEY-DFX1K-IS6RO\n0HBZX-09W3S-WR6A4\nLZHIC-2A01F-0HX2X\n079QT-54NEW-PXIEO\n1XLYP-BVAGQ-YY9S4\nKR1HE-QQZ5D-GUDGC\nSJOQG-SE5C7-7C3QV\n4EAR5-XRTFK-0JT3T\nYPS24-71TN6-Z7K1D\nBOFYK-8WGZZ-W473X\n29PUU-3D3NL-ORN97\n7PO41-1YM9F-0J4P2\nXJL7D-03NRH-N5XRK\n8I67N-EOFW4-SNAL0\nA7SPU-A7GVX-D12OM\n4K7MQ-YVV5J-Z5DZL\nZ97NE-OXSYC-4A0Q0\n0SLHX-82LL4-NP4OU\nJNP6Z-OYSSX-T8KGD\nJN33F-6LXE6-ICVCY\nTVWOT-UBOJT-H0YYX\n92BOX-GPUKX-SWIAG\n1AJ22-FXMP3-1MRSJ\nCXDLN-1UKW3-618BT\nNPKHT-R41TH-1AXIN\n8I5BM-L3NVJ-JE234\nDT68W-U9TY8-16BH4\nGZX63-2OMW1-CQMD9\n92YWZ-E1FKY-4497F\nB2SUH-QH0GD-BB7ZJ\nZ1L6D-VSMUU-MLOMI\n56TU6-CO5R9-QI7SN\nQ3M11-KDO5L-18F1H\n8DY0P-HV0AT-KPBEG\nKR3PU-39LPI-YUQW5\nPZGFW-F1MEO-LUTEG\nODCWS-HLMQ5-LPX9W\nRLF9V-4973L-4OIRO\n0FF4C-QPV3Y-8S8E9\nEEHCF-RA7E9-NWOFI\n0YB53-897LC-2YUHZ\nJTQ4W-EWEG8-HJW60\n6VA8F-QB53L-CWE5L\nCTK5J-WKRZY-7W442\nFQTBO-DWJC7-D2ABL\nFE14R-JSK1C-8XTSF\nVKADU-SH69U-WUR41\n82XQM-LA484-1RMFP\n6U7YO-JE42I-D6Z3R\nUSDQ0-PR7AO-2CE73\nU2YTZ-HYIT8-ZGN2X\n9C3XL-HLLJJ-CF79G\nI1AIQ-DZG27-0FU0O\nWQWAT-9L51C-BV4P3\nC6PST-JL4L2-H5ZSF\nWFHRJ-A1305-QD2EY\nOZBVZ-ARC6W-JR8X1\nURXTK-UCN06-UV5TV\nG7X5A-AIKLC-YKUEL\nMNYI5-B5VHQ-EGC33\nDHWJF-DBPFG-FIHOH\nOWPVJ-9QPZA-V34IH\nN6VML-DWGZB-FQSV3\n20QHA-6ZW6U-EJKJE\n6P1IO-W5U4F-WEXCQ\n9PDHS-J9AOY-6VRHC\nF78ZX-LAW7L-I5RRX\nC8GW8-A65V0-OXQLW\nOO8EQ-SET6X-HXIAC\n3GRXW-HUVYL-S2RFM\nY8B5U-F9YH5-STB0M\nSAPLQ-50RY9-RZN09\nKOXFK-BTXMX-YY59R\nW5WR6-7C4BZ-3MW6D\nFZ7T3-NSFI9-6UWGH\n0I167-6K5EY-SY8GH\nQSIOL-EIFPL-L5EV0\nHAP2F-9WTR6-1NV29\nCX1Q5-SR0MF-BOGZ8\nMQF1V-V245A-XTUVD\nV9IIL-S3TOP-CH5BR\nMDG3G-QXBA1-KHP23\nTOG7S-35E5E-QRHX8\nJH7NT-NJJ8V-9XW3Q\nY3LXT-1IZY2-W8IFJ\nCLHZK-H4FLG-9F4PL\nXB7BS-ASNBE-Q41MB\nVDGUR-5DE63-SWJ2D\nLPRQA-HS5FD-698T9\nBPUG2-U6G0W-AACJ9\nZ9MSQ-GX8CS-PRGPS\nJ21DG-JS9OR-U78IQ\n1MGE9-YV7EJ-LDO0D\n57LPS-HI9MV-V9G9K\nU7SNR-QBK96-1X78R\n62R9E-1CU2C-1P02A\n855KY-AZOU3-C3TSD\nYX40A-8R2W8-1MIOE\nM7E48-IO4F4-HOJ94\nN1RGD-C3YLV-A0BQP\n8WTFA-ELBJQ-FLWJ6\nA01R4-QWN20-VT3Z8\nUT8CO-8S2R9-CVVG8\n601TB-IGF7D-F93NP\nAZG0N-RID14-BYTPW\nD22SK-1V3OU-Q84UV\nY88SV-YABQX-BR3FV\nKYCQS-TC9MV-DJ32X\nHO6TR-69GA7-SXBI7\nK40Y9-ZQMKO-WOD0E\nJKAQU-ZBAZA-U30UD\n9QIIG-XDKKU-TMG5G\nIV1I8-1P0OS-6GDS7\nCEH6Z-SA064-9CG9F\n03NKM-VI7ES-WGMBB\nHQJ8E-ZH65V-J3CA0\nNE7C7-YEN9J-DHRU5\nN85OB-Z9S7O-T1O7V\nO4GMS-2QONJ-TI9C1\nCQB87-TXOFR-ERZ8F\nLJJQX-BBPLK-ZD8SP\n47BY6-QP2HQ-T8GWF\nJVRWV-8KJLC-V5J8O\nG9FWD-IH2V1-N1GXW\nURCU0-DQP83-XBMI7\n7BCK5-VCFHO-V6UWW\nE69UE-0U9HU-8BYGR\nPPYXI-0R2QC-WI0S2\nJAS0Y-RSWMC-FC85V\nMRP6M-UQHF9-Y9ZVD\nILGO8-T5TV9-QTRVT\nF3FR9-6GAQK-NT2EG\n4Y87Y-E8PPF-B1KC2\nOKZU1-M4VTB-12FUM\nPMZAV-WFOE9-F97MZ\n9O5DF-9NWPA-BW1GP\nT6IC4-06PLU-NYZC7\nWZHZ5-CLJVY-XZIL4\nDJ0GY-3N9O6-OQIOF\nIEW5R-APESL-65O4O\nRI75M-N05R9-QG4UO\nUFRCQ-JSWVP-YLPEB\nX03AB-QJYJ6-UC46S\n9JT6R-JKGMJ-0T45V\n7OJJI-BHIQW-RHQR2\n2V5XW-WON1P-WLQLI\nA8L87-4O342-XG4GS\nLOJKK-R9OZG-PBQ9L\n638CU-FH6QV-3XFJC\nA40IL-WORKY-JTT49\nLB6VL-RDZ25-JN90X\nBYRLR-TCIVE-IX2XA\nRUNQE-AIVE5-LRU49\n0MHM3-RU9QM-IDJBW\n2PDYW-1W1SU-TZJT9\n9IZZR-E8RUX-8DQN0\nIYCPF-4XIFN-2EORG\nQP4WZ-0DHKV-KZEZA\nRABQW-P9MLM-A0CYU\nUN16A-JTIMU-VFHOT\nRUXPS-8D4HQ-T6D9Y\nW69JM-TOZVA-Y71IM\nAONMI-ZIZ8B-J6EWM\nIEPKK-9AJVF-L5HJU\n3GVT0-NGOE0-4K1N5\nYCWEV-2A2GK-NYCSG\nPDG0P-K9UDR-OLJNW\nYRQMG-5H7XH-L63UP\nY068Z-NIJHN-K75QA\nW96X0-1KTYL-H3M6O\n364VU-9QJZ5-5OP1H\nJ4EO5-CICAO-ZB6LN\nA5ME2-6EZSN-JGRQ4\nYN13Z-XCQV6-L5M5R\n7UHFD-EPYVG-43K6C\nJPQVM-CV1FX-4SZLK\nFWJP3-LARXP-9EID8\nA3SP3-0HYHE-D9WHV\nMWNIJ-ZER2W-25PI9\nYY9I1-CXFYU-GYA61\nJIZA1-NODLQ-8U171\nEAS3X-W5JP4-TMAIX\n3CFDS-4MBSQ-KUHLR\nDLXQY-ZXI1O-4N4RA\nG0YDS-INQHS-DGKDX\nV0ZVM-RB0HR-6MDF3\n5HS4Q-AUCQW-3F0KS\nQD50T-DIX9F-D96MS\nFV9E0-OQM3D-PFU3Q\nS4BIB-VYCFZ-69DMP\nQMS8H-4U6LV-QMID3\nKUY2P-SWN1C-IQNQZ\n26EB2-TGXX5-PNHGZ\nMX7RM-XL2P6-56PVE\nOGV16-XUK27-FDZ9R\nOO0C5-OD2IU-UXHFK\nXWP6K-HC8OY-OEKZG\nADO8S-0YG66-NLHHS\nN2ZSR-II6TP-IO0GD\nA2X4F-FFVS9-X2CAF\nX5499-74HWI-X62JE\n1J8ID-8YPG1-RL5ZI\n9QG0S-LKCP5-RP11T\nPP1FR-2JIAA-DTCBM\nJEKP7-20U4I-JI7GU\nM14PH-HA1NH-IQY3H\n5CHJ6-18B2Y-HFKJ4\nVU186-OMS5Q-RGVBE\nGNYC8-3R9PT-KGBR6\nJK9FB-MXE7I-SU2ZH\nNN1DB-4NHUB-S27N0\nQ0LRH-TI8RL-WFWUR\n8N1TZ-RRJLL-C1YAI\nJ31XH-41VWE-2TIP7\n0110N-RCLSN-FRL9P\n3PB7I-9YR5L-CP0DG\nL6F0N-DIXWO-6I8NU\nYTYV4-BBA7V-NBTPH\nJV5J6-D2F6S-3QE21\n11JSJ-EA3WF-9WDEQ\n1JOYP-6W631-81RLY\nK9F3J-QNIL7-U0SDD\nO1PIS-S0H50-VG0FL\nE3SSM-MTLCB-7R4PW\nBTZ3V-ORMAJ-2R5HZ\nUXXPE-WBUDO-0MD2Q\n94XNJ-NDSDP-TB394\nJVA7O-700AD-HQ5WZ\nSTWHW-MLZNX-Y57V5\nKBRTU-55N8O-XYQ4B\nRJWZO-3FNL9-IVTOL\nJGVTX-ZWECJ-F8GFW\nLC7A0-2WAHG-CKWZP\n58CAP-XJW49-0W9XY\nVKOJ2-H5ACB-7IDQ0\n8TVDK-HNEBB-Q7BFM\nU040O-0TVVY-QCN1O\nMMYQF-QZUA3-GJCO3\n2MAPI-9YY1K-J6NH6\n7TROR-03BLE-VGOAJ\nNN575-Z6OOP-6NBFB\nEBD6Z-EOC0X-O8U0Z\nACQGJ-M5YSB-5B7GD\n7H6HK-BNIKD-3BOB5\nQIOWT-X7G0T-PSL2R\n9L29R-J6LE8-KSR9D\nG63O3-18VTX-R1PSD\nD92PF-82E2H-XZ3NU\n2UANA-G5LY3-53RYY\nFALXV-Z8OJA-3UYOF\n407AG-14EOV-XR8A8\n1E2A1-38CTT-HWMMQ\nS15ZB-1U7Y4-I70UK\nBRJSX-T0F6M-2CCSA\nXZRZC-783V8-J9FH7\n84A8U-VK959-2NRKO\n161S0-76543-7I5SS\nXI1J7-2CTL2-ZSK2G\nKNB2T-G0TX2-VLZAW\nPM67K-2WTQK-EMOZ2\nDG1KZ-O5CZP-6L8XW\nEBVWD-F3H9M-469LD\n9WFCJ-H5I74-TKMG1\nI7820-WBM09-DMUR4\nZVRKK-EWLNE-EW0N0\nKBP3W-3I0QY-IGYKF\nH17WG-PVFHS-G8W4O\nTDV0F-M1LGG-Y4N4F\nPEPAB-D9795-BUBZX\nMQLFU-QYX4T-FUXT2\nE55MB-7T6KF-78SVW\nSR7ZA-NDLGL-D0VBW\nUTETE-Z0Q0P-43L0B\n3V7L5-LS1QB-XMCOZ\nSJ7TO-ALA34-ORTKU\n3K47C-N75UP-RTBTR\nV032F-IZ4ZF-35QGL\nIBOZ6-SLWG4-MQLH8\n8RGMI-E443D-BJG69\nFUHXO-7V41A-MHC73\nQXL1C-JGIB7-V0BDB\n7M92M-1IZ49-N3Y5G\n0MZSM-Z6Z8R-GQH9R\nRU69Y-PZ0XK-U9Q6S\nF3KDI-DTKLQ-G1Y5Z\nMW4CV-TETKM-16TSY\n4JW36-SY4I8-N9LL4\nP38XG-9JIH7-87ZHQ\nPOZJP-405DY-7U871\nFTLH1-MLAU6-276CZ\n9XAJ0-V8TEY-8USO4\nVH2RX-WXO12-669GK\nSNHDR-CBLVW-L502M\n4K3IR-4UAJZ-ZCH87\nXUWFF-D99N1-ILSOO\n9LIEO-7D9TE-OZWQ9\nQQD7E-Y82Z1-M6YPN\nZMXT0-E2GYE-6SR6Q\nXLHWW-JY3RA-O54FE\nVN6JO-PDMMJ-RQ0DE\n73JKZ-ON5GY-GRDFT\nLZO58-FX7Y9-K6LR2\n5SRCB-UCUXM-KVV8M\nSTKFJ-CIC1E-BF0OR\nB26RO-WZ348-OBHOB\n4J3G0-Q2IT7-OMQEO\nGV3YZ-K2TEW-MUDTX\nLRCYI-52CEW-X9YWQ\nPCSX6-9H957-MMJ6W\nWTCUK-9KHMW-YQYMH\nB2QEN-M280P-VZU49\nMTCZS-B4DTO-2BIN4\nACOG8-3IC36-XVRCN\nVNT7X-WZAUJ-BETOS\nC0NVL-A44FE-URI47\n1EKRS-CX881-FN3LL\nFYF97-NUIF2-HQ7N6\nB2HQO-2F9FN-CN0S4\nCLNTQ-OHZ9B-C6CJJ\nDLOVX-9IYMU-PH9OD\nTXMCT-XB7JY-BU6C3\nSZMJS-C1JIU-3RTU4\n8KSFO-239UY-A6RB1\nYNBCS-VGC32-HYQ7U\nDF2FD-1OHK7-QGYHT\nA9BMC-DREHP-P18VD\nN5VK3-7EPQS-43KPI\nJH64P-EAOEI-JSV51\nG2C4E-YLZ3L-2C4PC\nRSFCT-WHLD6-S04HH\n6CM4Z-T08YY-RFJ4D\nTP0GB-ECL2J-M8FFK\nZHQ91-TW6RH-7FZCA\nPH6WX-AA6GS-AG84I\nF1MXE-EPLOQ-3UN41\n25391-S0T11-DHABC\nMP6QQ-MEBK4-S2R27\nXWVNF-ZW654-FZR5K\nMRG20-E60NO-ZEYLY\nZFVK3-L9QOV-XF1QQ\nL51OM-N33E3-OIW2R\n77QHR-X9I8T-6BL6B\n9FFVI-H0TP9-BPD27\nRRY4H-CEQIY-F9DMF\nBUXLD-TNT97-NV2JR\nS8TBZ-BC9J0-TMLND\nLIO97-72BSU-84YZV\nGSAMT-5ROIT-OGRCY\n55B2I-XQ3BC-61JJ3\nTRSZ9-S3OIX-IPG3R\nEI04I-A2X5B-98KR0\nZC99L-TIO4U-UV188\nTED8J-Q02PY-8KXGP\nM56ZZ-KML7P-2OQXO\nNV6BD-7QF3K-SDJF3\n41QBB-21CHV-OLR7O\nX1P0R-ZZEMN-OU08M\n7VOZ6-XM56E-I1YXR\nNYWE2-4K7GT-G2OSN\n3Z3WF-J4W1G-FTD7M\nMS1KV-B7NX7-H67Y7\n1J3JU-41QG5-HTG9I\nFNSF3-6KBIN-Q37P1\nXQCUT-8UY78-5GLDY\nMMQIW-P5TU2-D4LHM\nXQETU-C7LS2-SFUK6\nXP8OT-D8KHN-NU3RM\n6R8X8-Q9G5X-KAYXO\nW2EZN-FN5TF-7JNIS\n8I568-DV85P-OY1TZ\nTY0DS-FLOHY-MYRO2\nJ26P3-RQ3EP-VFJ9H\nKU5JM-33RR7-SMZEN\n11HLQ-MUGFC-F9DTH\nC3O5J-FCQ7H-Y3CYE\nCYA1L-HAU58-5OUYI\n00VUJ-X2VHG-GLN8F\nKO8N9-XQDQW-RNN4R\nQDJ3T-0TGP9-0A23Y\nAMUTI-2THDA-OGROF\nTMH6J-SZUWD-DEAGD\nUHXZD-IVVLL-WPQCJ\nSOSDT-41KWA-RYK38\n5YTTT-YT2OT-PS27F\nZ9VWH-WWAJQ-L9FWO\nAGH65-WZKTV-BA203\n23NI7-VNUHU-GJ6DE\nCEUPK-107DN-6K0CF\nKA6E5-D692U-JSJVL\nZEJDY-UR64E-JFSTF\nZDMF2-CFNA2-VOUB7\nCLOOP-S6FK1-MTB81\nWA44J-5804H-M89QY\nDDQ87-3KFVG-KBWS2\nUCF5D-9P37S-N1ODB\nT1UKW-TU0PD-FEN37\nO9C13-4J1UO-Z7PPX\nKEGP7-MKWNR-U9NHZ\n1N0Q1-CBPP6-4XXTT\n2C5JO-XMZBF-XRE5V\nUR1WP-FZSL3-F6VOO\nODX7V-S83GW-DHYAB\nKD2FP-G0KXY-QWXPP\n06632-8QBFV-UT7HZ\nQJPR3-9Y5UC-1I5KY\nSEXK3-FWYPH-TXN2L\nRE1RZ-JXE2P-S9JD4\nU116U-1LIAE-H5A6Y\n3OQJI-2E9S5-E9QB3\nB48SO-SE0H4-UVTHE\n2G8IA-S51IO-HZQIB\n5SQUD-VMC57-LX4UI\nLBNYR-2ZH2I-472TO\nO99RR-G2DFR-H2GVQ\n5ZVIK-ATO10-36719\n6NGRX-1HEKB-R5RU2\nG043C-O23HL-467RM\nRZHEM-3EGXP-UNKPX\nYO6XR-AOFQK-GVJ4O\n0Q6WZ-SA1U3-56SW2\nMFS62-9CXYE-KLPG8\n9XGIQ-5GEOT-1UB55\nJW2CX-YS8U2-S9S5O\nYRWI4-33T6K-YUGR6\nHEMFL-80ZX4-ENVNX\n5POUV-F114N-KD41V\nX1FM9-9C099-77PFD\n1HJ9I-Y2IO5-4193G\nZB2E8-7PIVR-I34H9\n7Y2QN-EQ2WD-8MB7Z\nX4C9D-JQ5B7-DBQ4S\nB7NT4-V9WJZ-V8F5J\nR2TAT-RJL37-QFBNO\nJQ2NV-YVGQ1-9OID3\nSTDON-NECS6-EO73F\nIQJ5A-SHMHH-4AUVS\nEOYUF-V6SJ2-GQ27R\nS9TG6-D6FYZ-V0HUX\nNDLKT-OJ6WZ-Y5QNK\nRDPYQ-9D2MX-VL841\nN2LGP-4OPUO-RF5SL\n3ZBF3-8CXHI-8W16G\nXZ1JQ-ANZ4J-WSL0C\nT4JH7-OH6VR-0VYI0\n1RT50-GH6T2-B9E21\nKUD1M-A1ENX-CAJVY\nKWXB5-FFI2C-92HWC\nP96JR-H4NR2-MNKT5\nDWPI4-MUCTV-1YJ8X\nS8838-50MIL-P8W0F\n2GAZ4-ANRST-AGRVW\nOAKVI-H3ZLX-FY8NG\nPUP01-ALSKO-MLPSR\nUNSL8-2Y9Y6-FD2EC\nTYX3V-FXHFF-VX0IG\nLBKJP-WOYPA-MWBIB\nUTDXG-H6H00-GSAB4\nRB53W-UYL6P-DLK6F\n8FKB3-NRT3A-SKDPD\nS5B3K-4O6G0-8LS45\n2KOT2-G0I56-MD6WQ\nBB77M-L0IFW-FABDJ\nJ9Y9H-S7W11-0WOF7\nAJILW-JFHFD-5J5RM\nQ9D6J-0UP0A-1WLT2\nT4181-ETUIS-TP6VM\n6OO53-L1QEU-M7TN0\n2TDGZ-23Z21-3T7UZ\n1V1OS-84BZY-BCLBO\n1WZ9U-2IU5U-9L2ER\n7RNUJ-HANF6-YL4SQ\nP4MS8-NA9TJ-ZQYAX\nIEDVM-GRMKK-DKSFW\nD6MBN-X789S-PRT9Q\nZPH07-5S0KZ-WLFQQ\nAOAKY-I3R51-WVIQS\nJ96X3-URMFD-79OLR\nB16FB-2PCC3-9HIP9\nNYEYW-P28LN-97EJ2\n4BS4Z-70KB0-2OZJI\nISLY6-LGOSI-FMFIE\nIG9E3-FMDQV-OVU1Y\nTY5AT-7WU1G-W0O5C\nSU15Q-GE9O1-BSOCO\nZUROC-BJWHO-AY8LM\nSYUUA-250TQ-OOZS0\n9LCVZ-X184W-TG84I\nUHZNC-IPTQD-ZNDQO\nT3J1T-JUPPF-VPSN4\n09OKK-H95F8-OREJW\nQFMZC-Y5Q9P-N4O1R\nR49VP-UIK36-J55ND\n6BHOL-VMRLZ-4PVYO\nR6PPP-07MKV-KCLM9\n4FGQ5-OS6ZR-I3VU2\nPHOH5-L9PEL-WBGWZ\n7D11M-XPDM3-CFMPS\nPN6B2-MTBRX-B6OXX\n8EOON-VXOPJ-6PUDI\nAZKBC-4CE4L-UPYX9\nE7S2T-VFTTY-M2GG4\nQ0KCP-JH8FB-U8L9S\nE4NKP-AXUN7-F552S\nQULML-MT1XJ-5CVS4\nS29CD-GFFFY-RQ66M\n6PF7B-7ROAJ-RYYNE\nJNAEH-17HOS-5Z5QS\n8A0LJ-9L5TL-O9SY0\nU0R9Z-YP2WC-REEBC\nDEWR7-ATDAK-OH3GM\nOC1JP-MDRQ0-W6R5T\nNBK1L-QANBO-J20IB\nSKPC4-2XGDJ-ZYYJZ\n15LE2-H4ZN9-HJ7LF\n40703-G77RB-YTN1B\nS7C1I-FCUC2-IV2F9\nO451C-Q94OJ-YQWTF\nTSAC2-DGHQP-7C79A\nDYJ7X-GR3QE-1M8CX\n0VKG9-8L88V-088NN\nNMUEL-V7MIW-R1CTU\n5ZGOG-B5XG7-J005Z\n0LXB5-SKSVQ-HW3NG\nNZHMQ-GAQPM-3DL15\nH6KU9-FC7EC-3ZUF2\nVBUJL-TEJMX-3HKFX\nQNJHA-LULCB-JV13G\n4794S-H0BA9-QXHJG\nPYRK2-750TW-XJNMD\n8KOMO-BE91R-XIEYY\n6QZEX-VYDGQ-XZ684\n9ICCM-JHD3B-2VX1E\n08OEJ-CBSDP-4XOH2\nPXNDK-PPMGT-3LVUC\nL63IF-PCSII-HAUD1\nROI3X-SL74E-U8S2S\n25A0Q-708IY-2LTOM\n22Q5O-AGZM9-NFZN8\nVA9X5-MFTVU-5D4GT\nWSF1Q-R4ZU5-QI8DN\nDURT9-4GMHH-PF2HU\nL3J2O-20Q3U-NVUHY\nL1HEB-MBM1J-62NSG\n2WM6I-BQ4DV-PJC46\nY3WEG-PF5EB-2GL62\nK65P8-ZM82M-AKGF5\nYWIH7-V190G-3RE45\nHMJFK-1U9VN-GNT52\nCVBWH-EB2MI-ZDC2Z\n6W1R9-DBTPG-DBOZ0\nR30F5-AS3AB-8HIY7\n9FGEG-WWEOX-PYFDQ\n0MYPE-N11QD-ZJMC1\nCHXI7-U3NMR-CEVN6\nCRN9P-A0BUE-ONEW1\nRBSWW-EWN8C-PBVU9\nF89AC-32SFD-XSXXT\nZKQOJ-Y8WSW-1FGSX\nTJ1OE-XURMU-0OKEQ\nUZIL1-7EI2B-D6U08\n5KS7G-K5XH7-B46HB\n7IU4Q-8CYA8-UBD6S\nYI354-BINKL-5L8MP\n5UQ4I-JN61E-M1KAA\nQMEFK-FEVEQ-AD1M5\nH1JJI-65LVN-3F3I5\nATH7N-IQBGF-55B6G\n62JI2-Q3KW6-19K7U\nZ5DIY-18GZS-80T8M\n9GPKQ-53ZFI-6SKJK\nQMCDM-7U0NG-853ZT\nULUUO-9IWW5-6VE7U\nGXHMZ-KMA63-X4MQA\nFS2I0-GICOM-3QREO\nJWZAU-7WMW2-J5S6A\nLC6MD-3V0X9-S7KGM\n2TWYJ-WGYGP-S2F0O\nCH3GU-CESJ0-VPOQB\n43JZM-ZC9IF-8LVBO\n7K187-TM89X-EYU12\n75WJI-0BOP0-7J4U1\nDVNYF-XIC6B-BPXYB\nWVKOF-KY1XK-LGPZ4\nI7CUT-BKEE9-J3RO2\nEGV5G-H7L3P-Y1DS1\n8OFN5-NDSGH-2P03B\n6B8CH-HCOJ6-DJUCB\nBD9IF-ZLBIM-W9QN8\nRHS1T-VT4GT-DZNLZ\nMXU76-ZW2PF-TCQ7E\n1HAM9-2IN8V-XY7UY\nMIUHY-7SQ22-564H2\n4U6QO-X83AK-BELUZ\nI7SAT-U5YE5-H0WDI\nB0Z0E-Q3AZ5-TU08O\nMFQEP-KURX6-4MMLK\nUJS8J-PSXZ6-0WD0Y\nPOS7V-P8PKR-5EUWT\nTZSTB-7EGJE-LJFC1\nUGKHT-AX7DB-57OS2\n0HMYS-I5TAY-XDZKD\nVPCAZ-8076D-FW5J3\nMPR96-JOU9H-A4328\nCWYUA-NJ2OH-5WHJR\nCHSXG-W39FV-JGT9B\nZS4OO-NMINP-59KHS\n9GR3X-T499O-W2EMB\nC0B9P-MBSRU-8K5AM\nPHVWC-EGYE8-08YTM\nPGTBK-Z2MK2-0I6P3\nHK1TL-R298J-B95BR\n999TF-HXUZR-JRYN9\n605WU-R97LX-JBQVL\n2HE35-LOM3V-BXAYW\nOBFR9-6AWTP-YBZE4\nRJHA5-2YDSV-H445T\nY5F0L-9DMXG-HTNR9\n1GDRG-QIYM2-WK2TQ\nCX64K-PB1XI-ZEQEX\n2S79R-BCTA4-G07GR\n4QP7P-4A1RL-60ZT4\n418O6-A9BQS-V67E0\nCAWGD-RWLN0-X0BK8\nF1FQI-54Q84-6J9QX\nVFY55-XJLGI-3J3NV\nTKUZJ-A3P38-18W3N\n0LDLY-BUICM-E4BFX\nL6H0J-JPSI2-CS4E0\n5SZME-CVBKU-203RV\nFZEKM-8XJ6T-IOFTH\nUWQ1V-AFOBA-LBMV6\nUSGZA-6OO9B-5JYJZ\nTP2QN-HJQJY-4UUPV\n31NJ0-QY7CA-DVYJQ\nK6E14-PI5KM-T48VH\n60JC7-WV489-BQ8QK\nS4KQP-7OMQB-D4ONQ\nT736K-UKLV3-SGQLX\nPI24N-N1C9V-RBR7B\nJR2DZ-8892J-F1T5Q\n153FM-QAI5A-MU3GR\nJCZWA-XEEYF-RQUOH\n664KW-ENG9O-KIW7V\nQCM4V-BI7II-0VEDV\nK9OU0-A88AM-JKP1H\nKUQ09-VS0HS-SYSD5\nKFIEF-Z5LJO-UJFSF\nZRG5I-1QOU2-L9OTX\n94JK9-P0IQM-2NYP7\n3KL03-IZB4W-0BG14\nU1ZUD-5Q6AB-XO6CC\nIL71K-9NL1X-N21PF\nUWWC6-C36T0-3A9EY\nGYWSI-GAWGU-FJIDV\nW2HA6-HMVO9-04FO2\nV9QMO-YPAMN-A0JLU\nL1V5N-SHA98-KIKP9\nNUA8X-9N3HY-P6NE5\nRKWZY-FLGD7-WT59X\n4BMFC-RYX4Q-CRPGG\n4BHXJ-WRIOX-C4EVY\nX57OK-XYFR6-RQTQ0\nW41WR-NQMTB-OL8ZS\nYLB0B-5399Q-865L1\nGD49O-XYALQ-K4C3Y\n8EAFO-80L6D-H0KL0\nMLKDL-BSGWM-RW03A\nQNXOO-KAK09-OJCMY\nN0RPV-4HVB7-HD19H\nII20P-MOBAT-6DMSX\nHOFKN-C9LME-6F20I\nT2ALE-32Q1S-XXZ5L\nFU98F-JL6AI-QVWW5\nQR0ER-LL3SK-WGSO4\n3UNKE-PZ6PN-QK6QO\nU17ST-TW0EK-UFJ51\nCF8YW-XU2JP-ED8KO\nXQQFS-FTT88-ZNLGO\nI7D7I-9LJ8T-240D6\nIQ1WB-HT65H-EJYQM\nKPYYI-E49B9-P72TA\n7N7HH-3MJYK-8XEIR\nBKA5K-U3643-4SW94\nS8SVD-1JBEF-4EJHD\nIP4H1-HTW3N-3HTME\nHPYUN-SUR5B-BGDJT\nFLGEV-J84X4-FYQ2Q\nO7T6E-46O4I-SM1VC\nUSNQJ-J45VQ-VV1I8\nEECOG-I5Z63-DSDH2\nFD0I0-8Q15N-RQ1UR\n8M7J2-GNMK0-TZZ73\nJZ0TF-N5P51-9MDIB\nH909Y-0DT08-VF0RI\nFTG27-QVYA7-RDEX7\nTY7OM-31LQQ-9Q2U7\nHJK7L-XJ8YB-Y6HNE\nC1CXD-47CD5-MXEJH\n6U8RA-R50JD-FNENU\nQY6V4-RFP1R-MT047\nIKZ4Z-4B0UI-HJ3RG\nNBX8K-RFXGA-2R4DM\nZ2EZW-WOIE4-8H5PJ\nZOL18-XLPBV-0JLSQ\nZLI0G-1JQ1T-324RO\n0X0I1-V5EYU-IEUQB\nCUXDJ-QG92I-DQBAO\nSGU2F-XW5X8-ARCFR\nOAYWW-OEA0U-ABGH3\n9655R-YWB0B-XRPBY\nBQROU-2Z4K7-Q761X\nOVMQR-SUDQ1-Y7ZRS\nUH4PK-2EDJX-UGKDZ\nAHCTJ-GQ8ZG-E0BDK\nYL4YS-ZVNDG-FWW0O\nHY66O-YUZY7-YET8M\nU78NO-DEJ40-Z73LZ\nAYWKZ-SK80R-VU17V\nD3G1C-22D8Z-7C6C1\nKW6AM-GWV6D-69OBR\nV609G-SWS4Z-31SMT\n7AX3C-EH6TJ-N19GO\nSMDDX-0EM9F-4A4RK\nPDRWJ-UEGJ9-AQA0X\nY81U1-FHDRD-XQD21\n854YJ-E1XQY-GJ30U\nEXC0C-ZJ3JL-5TSQ6\n7EI65-QIS0Q-92U21\nNBAMQ-E56I5-UVK9S\n42TGZ-HULTB-9ZOKO\nZFZOA-USJ8I-4ZZ2H\nI4V09-4OA5G-SHU4T\nGHPMR-G2LJC-SOFCU\n7SQPY-A4KW4-MFO8Z\nMQ60M-6NPL7-6VE8M\nV7TA9-5CE9U-OREWR\nHUFTH-9SITB-IWFQ0\nZ35NR-G1OZV-A1C4B\nTM91O-DEH96-QFYOC\nX7Q5F-AXM3I-ABUHX\nEIJU0-R1P1Z-YFQQY\nHF3ER-2JFHS-U1CI6\nO7WZ9-Y3JFO-T5L44\nFIJN6-03QAO-S1EDA\nG4LLB-MFIMD-P66AD\n4FP2K-7Q7A8-Z9KMD\nS54NU-8IC45-QX0G4\nVLE4K-43JWG-U0LUT\n2GHLC-UECOZ-CMT6F\nZYII8-ZY1F4-XTUHU\nT4M2I-544XL-QHBIL\n4ZOFY-5PARF-B69CC\nDBMMM-JBJYU-YC2HZ\n0C10O-A1OER-9P3HA\n27VGY-7K9CA-EDN6Y\nVNZFQ-UJ7YY-IG7WW\nLR3VV-4QWWP-OHJR8\nQSS5Y-ZP95R-B8JJ6\n25JSZ-3ATD0-EF3OB\nDZ4IE-ETEL4-5ES3X\nH7DE0-6FB45-XPRE0\nPWGO8-RP0WB-0KHX4\nXT0AL-MZEQ5-6CP35\nU5PW7-G98IC-FLUKK\nGROJF-EN4N3-S4ATT\nGZ52W-ACI89-4A8ZW\nPJ88R-MEDFH-T1J80\nC19AE-EH9N1-44DKP\nJH4G2-W8UP3-RWFGY\nBRENG-BH9SX-SNCU7\nZOAF2-4I3XF-HPX9Q\n6UWO6-S4DQG-WX24Z\nJATQJ-HBUHE-O3QZ4\nUTVAG-03BVH-3KDVM\nC09SC-8QDXR-5AV2H\nTEDRC-XTJHE-VR49E\nU4DDE-XE7HB-ZSTCE\n93QRM-2B0R6-8ANUB\nW5RB9-6BOCC-D9BPG\nORA92-VXXSY-MHML9\n7BVFG-4OMQX-GPODV\nCAFKP-ZIJZA-PPPY9\n2XY89-NC714-JX13X\n1XG64-P2039-1R1VV\nLZTPB-IN1XS-3XJNN\nPCX49-CHE66-5XO8V\n6044G-5W75B-96IPM\nQKB3Y-Z8BLI-Q7Y1H\nG1JYI-LX5NY-U05K3\n62ZGU-CSYTC-Z6YTE\n6B06Z-9AOMO-O922W\nX7NVI-88DUP-DM80N\n8D2QQ-SIY54-WKVB9\n51RYY-SYT0O-N2KUD\nB17R7-TO7DS-11HQU\nG004Z-MG1DA-0MSNP\nV53JT-4H1OL-HUT7J\n58BTI-8Q2X1-Y1Z84\nNXVWQ-LB2W2-SZSSB\nKZCXH-MIDPA-9T74K\nQ2YZZ-RVND3-4MN8L\n59US2-HHTMQ-8UP5K\nEYBWO-M2V01-M36GO\nOTF5I-ZQJS7-QFJUB\nD1Y6C-B0UPH-KRXRZ\nD8O88-93D6J-3M4HL\nNI6XH-XC001-51MPK\nUXQ2B-GCVU6-B43X1\nOEF6S-5TXFT-XO0N4\nV2HLT-YG7BY-LY0VE\n2TNF3-ZVFK0-7F8DT\nDG5JS-7YR8H-2OR6Q\nGLJSZ-6HXOQ-E6FCO\n5ARGP-LQ4L6-3BJSQ\nUO3HN-A9HMS-6LVKL\nNJHSW-JGQQ2-X8IEY\nZM8L8-79EPL-FQ315\nMBH1H-Y7QUS-9SYQC\nGNUXF-TUAZP-T8T0Y\nMX1QW-IGBRT-SASCE\nVURJK-JNS33-MTZ2I\nS2BUW-RS7D9-DZO3C\nSBNLQ-REC5M-40436\nR94GJ-L2VRL-FAE0V\nOFJCP-Q175B-0GS75\n2BIRV-XGFR9-K30TJ\n81QZH-ISSGX-6UGL5\nLQS8K-HAX1X-WU8YJ\nTQ9KY-AWZTT-Y90S7\n4WX6T-ZWGQO-58JZ1\nQA42P-R86CW-7VGDU\nZ13Q1-5NH1Z-YSG8Z\nVA8EW-19FLU-INUIX\nQ42KJ-2FJMH-GQYQO\n1BOKL-4OBX3-TQL3R\nBEMYS-F5RB8-Z5NC2\nEKKPD-FZLYW-JSRYY\n9ASZ5-GK3EV-QB8W2\nA9UTZ-BGME7-NVG4J\n2YVB8-W5SYH-0PKKN\n5O71X-0SUP1-RSLWJ\nXZP5G-21ZSW-2Z5ZL\nN04FO-IIDKS-D97ON\nLSV9A-4AL2D-5RJ0B\nS87WD-LEYAW-SNQWH\nOLAY0-6COWU-WUO3D\nT4CX5-FYWYQ-C7NDQ\nAO9TB-27D66-ZPOCW\n49PXB-5GLII-Q0L27\nTRBPH-R4WU3-T052A\nSEUIV-VVQ1S-CFX2H\n3SM8F-4FWSJ-KPNL5\nLCC50-0AGUR-M8H7A\nE5IS4-WYZ1B-WUVUP\nXXUXK-WY1DW-C1WRY\nH1STB-FY7MC-WN45J\nS0LO0-3V2ZM-21UW3\nBWBQT-P6EA3-FA8JQ\nRX4OD-0O9GX-0VK7E\nRP0KO-WFC1T-NIWQB\nGD2BA-IMUI4-AF6GD\n8ZY72-TI0EP-AQIAK\nGO9NF-0JEWO-743QV\n1GJUF-FI04S-7Y2WV\n4YHGL-4C65G-01CL0\nB3YUD-NL2JW-8OJTV\n67JR1-GOCY2-BXFQD\nHB8DY-7TYS8-02T90\nRDACE-O2GTI-HQ31N\nWKP28-II1SK-ITRL2\n9IRIZ-WD1KG-HA3IQ\nPERBX-3OFA6-1OMGH\nI3XZS-60GCB-NV2Y5\nVJZCG-5BAP4-UDB6U\nICV6U-TKSHY-K76FP\nTEY6X-15G29-QY9HK\n8YK2T-8I18T-GQLUR\nDUN0H-FZUAC-CL2D5\nZLFO4-2VGU4-8KVKW\n2QU29-3JTKF-TWAMG\n61ONG-GTGM6-TULDB\nDFACW-8JRD1-UC4PN\n8ODQO-VI2R4-ZQ9XI\nT0WXI-8K3BU-SMGQU\nUYBZ7-5NBXJ-UX6YT\nRFV90-M4GXW-Q5JV8\n376RD-6HKCJ-8UI6C\nQFF75-VYNDN-3RT4L\n1LRQQ-482KK-WZR8C\nYRQ70-5CFZT-ZZJOL\n1R4KE-ZOEQR-APM3E\nG9GF2-39GO4-9EZ4E\nZJK6L-CNDOO-BFA8B\nYZOUF-RMSSQ-XE463\nUM81U-YXFBK-JJ77O\nMM56B-ZJQBC-3UPNO\nM82FF-K5JY0-FYP0N\n1UQ53-I0ZPC-Q4VTK\nNH3L1-NMVCI-ZNBIM\nVX88M-58XLR-1GKPV\nT5XCI-ZKJGE-QB9VP\nPUPVY-TGRSV-VQKIX\nU4QKN-PB00W-WZH7Y\nV0Z30-EOLC4-RER8N\nEQAB6-F0PCM-U8IEB\nA0JR8-OIHIS-45HBH\nT2H7O-S5RCV-HY3DM\nCD4T6-NXQGN-2DAC9\nN7SWT-1QMUE-BAND6\nDT10E-4QZNW-E1QO8\nBLCXD-VZR6L-RON2K\n4TFCZ-FMMN8-TXZOL\nS3QRB-C4ZW8-0N49L\nQDH2E-A9M5O-92DS6\n944KY-KEPT7-R7TQR\nQ9R6Q-UAPWI-Q4M80\n0C0SW-7575E-488ID\nNIFFG-LJX7H-58RSQ\nISH0Z-KTYYG-K7I1F\nKUNU3-6T524-5SZTF\nVVZE9-A5NH7-A0LNL\nV9ATX-H1BGF-63O0S\n98GOE-X5C9O-GULXL\nHKB1F-WWOPV-ATOIQ\n493F0-46LW8-WQY34\n01604-R1UWU-L7Z9G\nIJB0L-FNK8A-BH0KE\nRM3L3-VYA6T-GDIFM\nZJC1F-CTCGD-QVD6O\n3GV0H-6H0EQ-76LK9\nLWCN6-FM1OE-R068B\n0IZF7-29I2S-IPV7H\nJBIAS-GTVMH-OC6FH\nGQLDS-AXYZS-7I315\n6VCI3-20U93-NDUYS\nZ7QEG-PGRXN-JRSEW\nPFGO6-AHB21-CC9UM\nR4OOM-DLLM7-CNXBY\n6XDPQ-OU183-ZRFE4\nVNVP9-IMH6U-K2CJ4\nI8SDM-5IFOA-QY301\nFCNOV-KNDLN-7CEYK\nEJZG9-ANUCW-B55G3\nD4ZP9-O9PXM-C7DR1\nERVNM-Y3HNE-GWJQG\nQ9KV3-68QTC-I32EM\n7A4KI-9P72U-CN0X7\nVTJT2-NSE0G-K1U7Q\nE92YF-X5BC8-987AF\n5DPBH-339JG-M3V2U\nTDVM7-1332L-627C0\nR24DR-LDIP0-OAWA8\n76WEL-9YZQM-5UFPI\nL0UES-3WDFO-N6XBE\nM2APX-QXWN7-WTUX8\nHIAA3-6R2M3-2UK5Y\nPLSFA-9YLCV-CCQML\nPUJXE-2TNX2-A7Q1C\n46F5Z-8CWF9-UNGOD\nSLRZB-7A4TL-2MG2E\nYNPNI-TOGWE-9LN8L\nSCL96-U3YMS-AVT3J\nOPQUR-B2XJB-S9MZT\nE5QWH-NOG87-FSW9B\nT6DRK-R8XVJ-S5DZZ\nI6L2V-MMPPP-39GZ3\nZMIKD-1N8HN-7ED54\nM046L-R6ZV7-8CFXX\n5WB6A-FOJU6-7GTUQ\nAFKGM-EPP42-UBCCT\nAHLY9-K1ZR4-JIBS8\n5ZVDE-1V4VM-KVJ2G\nS0BL4-V7FIE-YNUYU\nSHMV7-DRHQ6-I4B6D\nSZCQO-7M6W9-RGZHE\nNTFN3-P19EC-T200O\n189LY-26OO2-USHOZ\n2ND83-CA498-EOUGO\nMWAXY-8CFWZ-WWSUA\n56190-ANUM0-HXFUF\nO5JAZ-0CXQW-D8MA9\n1CRPK-LDMTK-I1CCV\nOJWRH-90283-SD8NR\nUEINF-9GPUI-DAV42\nSNHSZ-A2Z9V-54YQE\n3KOLD-WQL1M-IHSRL\nEPHGE-B3P6K-A92XY\n3LNB7-E5366-YOGGO\nNS1NK-JX0YK-G1FHG\nBB8KF-N3QHL-R6UQE\nWOCRY-MR7Q3-7PV0Q\nP9DQ3-98JGE-1RS33\nOMWYI-QU8UV-ORODE\n17I1K-R57KR-D76NO\nX5OEW-GPWH0-0KML2\n8DM0K-YUBT4-J4G5N\n3L85I-15I3H-QVE30\nF8F90-FU694-XKVGU\nBCIS5-POHN9-UZUWW\n3VS2I-GJ8LK-JCVUJ\nYUTRI-J8ZFF-ZRUXE\n5VON5-2D3PV-RX5QG\n2XT7E-DCXW7-UHE62\n1HZKN-E9IOZ-9N3CJ\nPRSRD-LE9LD-JU1NQ\nPEF4L-UB3KQ-IJOEQ\nHNNX1-RKXFA-KLLDI\nFNG97-QPIYU-QCRSD\nJMNST-XPNN9-IT8R2\nESHXP-IUB6X-I12ZM\nUSGC3-WHP87-D89TP\nAHY6W-PT4WI-SFL2N\nA17OY-H0RS8-RULJX\nW1A73-NXK62-XUFEN\n10MGB-ZOC43-SV9YD\n76ANV-BGIDT-1TPN0\nCDQN7-IZJG8-5L0XF\n3J614-FVNBN-DO8PL\nZY34N-69Z1I-P8RWR\n0PT87-UJ6E4-WIAGT\nVC3U3-VT0XX-2E5GE\nB25G1-BL2N8-VET79\nZFA2S-6VWME-ERDBO\nMCMKW-N09V7-BRIFS\nE8ZEH-SHF8Z-OG9FZ\nKPI0D-E0NE0-DYTLI\n97QN0-4U6RG-3S4NT\nETG0I-VWN9S-48O7S\nZ7SXD-B92L5-2KLAR\n9TOFE-Y3K43-BZKUN\n6W7HB-OR1S1-BWVE4\n5SF61-F0W8P-6JU7H\n4N451-6QXDW-SYI7H\nHEHYN-ZH634-NVKMM\n0EPM2-UXTRN-BAKLN\n543IY-CRTNN-QXLHF\nN0TPX-6LRBT-N4HR4\nF74U2-TTXGZ-PQB90\nL7GEL-W3KA8-G03HH\nZN13X-YS05Z-WIS8C\nUYS3C-YTLBM-9C3AW\nAUTM5-1M1YQ-YTY36\nNE2CE-PDJCK-6DL6U\nQO94K-ACCUQ-C4PNZ\n1X992-RQR2V-FDP24\n1NHWL-7QYKC-88CMD\n3O4BG-S7SOU-I12Z7\nUT0EH-1P38B-ZHSFP\n0M3GA-SRTMN-H0U44\nUU92Y-ITWQC-1V659\n53HPL-I0C9R-3MNSP\n5CK8Z-N4GDR-H8HKW\nXTC6G-Q9YTP-MMUHV\nD5OG2-US2BH-MRDF0\nL2YHE-03Y2P-ND5CR\nDIHKK-OBE7F-UI8LO\nI3HLI-AEM3H-PRDJ8\n6E4ME-5EUFD-454C9\nWNHVR-DQLVE-T8Z3R\nMZP2O-SYXKW-W9HSG\n3ON8E-C16HT-N7M96\nJJT7E-4XP9G-5RR8O\nDILCZ-YBNCY-PVSJR\nU9DMZ-IJVEE-BXRVZ\n10ZO8-1LJ6T-ZKXSE\nVBXDH-21S1Y-S7QYU\nN9A7C-G9JWI-LEVB5\nZOFOO-CVAAS-9V5I3\nYWRMU-700QO-9YFQO\n8GJ6W-JR15W-SV65S\nXZ1G2-JRUSF-PG6JU\nG2HPY-6S1IB-IHV2G\n6JS23-WGPOM-UHOI6\nY5PKI-KBAN0-64AGU\nM9238-5KH98-9GBX9\nVPXYB-CNVUA-NHW0Q\nULR3Y-6X8K7-WPSOG\nP729P-TJTJS-ESTAZ\nVYMAN-2NEIK-HRAFG\nFXB1U-U9BYH-H8FJS\nOGEW4-72T9K-ARGFM\nD13PU-FZ793-ASYCO\n7D176-E2CBN-QNRDZ\nPO7TH-1X4WH-8CV1M\nRZI9S-IQ8XK-PW2OF\nUQNBJ-8FUX5-GLUA5\n617OA-F7JKL-TPEGK\n4417R-2DCV0-UXIPB\nQTY8E-P9DPZ-IG140\nK31CO-0N1W5-JIDKI\nB2S5Y-JKLYK-LU6JC\nITTXI-4S7NP-3GMWG\n3D4LW-03L6K-CN2QS\nJ6N46-KHWN8-34NDO\nJXOYW-YOEPA-Y66F8\nDUM2D-GY36T-MOWN7\nWTLRF-OADL2-D4RJ4\nWLW5T-FL4UQ-EN341\nMSXQK-X6IPO-T3R0R\nT56E0-6K8ZR-8V5YE\nTR2SM-MPDBT-OLW4F\nLZZTL-LL9LE-C867K\n5T9FO-PKSZR-FW7AG\nON5PM-ENKHZ-DHRYE\n12NCK-4HIET-62DUP\n4E9H5-GJKV9-60MRO\nYBQE8-4AD2S-V36LY\nXZKDL-P3K3B-B3TPC\nVQCYD-5V6L6-N2L9S\nN67WC-THOFR-RYRQF\nRAZP1-YC6DU-HJKSO\n7KIIP-GIXI3-K4QI2\n0LAV4-1G82W-86QGZ\nN522H-Q0HUR-2AU6O\nSTTHI-E3IK0-FS3IL\n95803-MBLXN-WCH1I\nZ0O8P-B3BH9-DMY1O\n9UMP2-GZDX7-LV5F1\nYBZPI-9HGHE-81VCN\n5LH5P-RRKYN-8HRAW\nE72ZB-3BEXA-H1YST\nOEGD1-TSGU6-TIHN1\nFE95L-RZYD7-M6KCJ\n9EBC6-VAMDR-Q8GHA\n0VKHO-3DWMW-6SO6I\nE6E26-EKESC-QCQQH\nONN8S-IW5BN-JE4SV\nBCQJR-ZJV8Q-SWV36\nUN8DB-V2QQI-5QO4Q\nHIUYD-67WLJ-UIREN\n3VPL4-PO2G7-IBQ7L\nAW3TO-EDDQK-4J332\n1EH1C-FJGD4-FH0MW\nVYU3O-AQEHR-8FN5U\nJPF2D-MHMHT-47G53\nDYDNO-TPWZI-1706Q\nO4SV5-MB2B1-ASBCY\n4QJYN-5OPTD-R8B5Y\n26VAA-RNOM7-0J04P\nPZB1I-GQM7G-N4HTF\nKJBZ3-YQ42T-CE60D\nU9B0P-HG56G-M91LF\nVM7OG-NRT00-X3P87\n6UZLW-HA20Q-QUYDQ\nPUHTN-BV1G1-N7E0X\n7GMP0-9ZTAJ-56Y1D\nVLHPA-EJI4E-4675U\nQQ9TK-X5GFT-Y2AI2\nK6GDC-YDB9N-SJDYF\nJIE6K-4BCJP-AO4QO\n2CIEX-4ZAS6-1YC3F\nJVGYX-CIM3X-Z428V\nG3QZB-3T5D2-TQVSZ\nZWVA1-29CQQ-C3WMW\nJGPIC-XSHWF-S74MH\nDWIBO-M34WE-YW8GD\nGVOPL-M3EKH-FG1QN\nJIG4A-W85W8-1N73P\nEWW4F-R1RPA-GEZP4\nYZ65V-Q0XOE-PULID\n5DPD8-YMSA8-V5VXK\n12JLN-Y6551-UFKY8\n06PRG-L865G-KQFC3\nNEO4S-N7JZC-60C0W\nJ9HB0-HOG2X-Y7ZQ1\n1IPLP-5XTQP-W61II\nYH90B-024TM-S8IQO\nCQWFG-FROAJ-LN7NN\nCT5ET-X10VM-297KN\n0INKY-A7C9Q-NB39M\n8KOHI-LHQB1-667D3\nTRK45-8BZPM-JY2X7\nCMM77-23UO0-A1EBQ\nVZNEY-O9JOG-KY5ZQ\nHRZYP-UPOY8-3VX0O\nLGS0Z-Z8T6L-6ULV1\nG3JSO-2HI3I-CU2IS\nNURY9-TYB7K-UK3O9\nNGTPB-BTWXP-YSNV5\n0VCZR-3E29I-8WXZA\nPAHEJ-5KT27-SQZNQ\nD8JSV-797OT-2GPLF\nFOB94-07T1Y-TRFNA\n1U70S-767VQ-ND6JA\nY3AU5-XJ3RN-DKVJU\nR908Z-BAHFD-Z3NN8\nGXZBL-VZHM8-8ZH5K\nXM4P9-L5IFI-51VLG\nMPIBW-ZQT32-GW2O0\nRG5GH-VIDJ5-K8QKH\n8QK57-F5P9O-N4FOU\n2XZEU-XHU1O-B1CJ7\nMY2ED-O5TLQ-01K5J\n929LF-2F0BL-9K1D6\nD7ZRQ-9FGEE-J63EI\nEORA5-3U67M-XNMX7\n5VHMG-DA6U7-RLC0A\nVFV8Y-GO2YO-Y1011\nA54QC-3HYKI-JHFF0\nBMPR5-FUE7Y-H7IHE\nC0T9D-18O8Z-BHDB1\nAD6R0-WMKZZ-CUZEM\nRA1EE-VB25X-UJ5QH\nDSTAE-8XMKE-X9D18\nFQY9T-3MP9W-UMMI3\nE2ODA-6L4UV-6BL1C\n2UWD9-7RTYJ-HBAAB\nFTXW8-08QE0-0MVEF\nLTM82-YEM2U-8C9HQ\n4EPD1-FAYO0-K84G5\nLVR3L-CWAVE-VJDTC\n2DFF7-GQ8RT-IH8T1\n5ZS2E-GP91E-T6QO9\nO6YU0-C0WC8-KMMPT\nV1SUE-D951R-M1804\nAZALL-UVTQR-00BWF\nCYI94-8GLEE-77XMA\nQKWXU-QB9A6-WIY5L\nUVTT9-UKLZR-DEZJ6\nVF9Q8-TDTZP-8MG9Y\n94A2G-3EKS2-X7LRS\nVQ2MI-84LVZ-TLET6\nEZT1M-88EK9-7202C\n8MDAY-WHD42-8TUNK\nAWUDX-M2TTF-KA3DI\nOJ573-HRR61-W7G3E\n2G1WS-CJG7R-EIARJ\n02H6M-JSYI3-QGGDQ\nQRIG9-U8JU6-OIUT9\n6OMXO-VGD45-VSW8C\nG7PXY-OG50C-B4HRP\n2AKRF-SF64V-XAG4N\nRMHCF-9KRQG-81AGE\nLFPYI-FJ489-LA62V\nHMAUZ-Q5XO7-DL6J6\nDCUUA-CS52M-8YBIV\nPV2SV-76SZL-BHRBF\nN1UTG-79LDW-674ME\n8E8LK-U1HN1-A7VB9\n7O4EJ-G6G5J-1J5MQ\nM8SQI-SY6WA-G4AZM\n1S9G7-DCYLX-WHMHT\n4VM0Z-NPCN4-XQOXD\nBLYRQ-9KCYX-9KVLS\nPAY1A-VVO7B-IBJPZ\nKAN7Y-041SY-8MJWP\nDAH0D-BXAUO-7XSZ6\nXH1HA-WA92X-DPTZD\nCFMLZ-AA93Q-SVB7L\nFEZH2-RVO1Q-6ZR2Y\nCFQB1-MPVJK-QVH0W\n2YS34-U0DKC-UGSJ7\nO39CI-F0NSF-KU9LK\nXFCY2-2WHRT-P7JW1\nHK7N6-QAD1D-AFUUV\n8ONLR-RRU3Q-HHRSD\nJ2PKX-ITU86-6PBFI\n3445E-6H54W-CQ49O\nCJSCO-RUWZS-211W1\nJ2WJJ-SA6Z8-18HA9\nE1717-6DWIN-NS9BI\nXRV1X-KD1M9-YZ22X\nWC3FY-N0DXJ-8AB22\n5QJWS-KU4FM-D22G0\nU95DK-13D5U-IK024\n56XUH-RULIK-OHKRN\nCVQS0-VMXFF-A89PO\n3MOTT-LUF9C-MT44B\nU2A8N-T3J9Z-DUZUR\nJ91QT-KHVY1-L8530\n8RXXM-IDQ6F-JDWBN\nDDVD5-F1G8Q-AZS4V\n8QRB5-U97AK-TOGNM\n87UTB-3Q9UG-KJCPN\n02MNJ-KV5DJ-I4H11\n2GNO3-U7Q3P-Z2CX5\n7OUK1-RR6YJ-68VI9\n0L5WW-KMCLW-XLD4T\n6JONG-BR0XW-PW9YX\n6W7BQ-APCGC-J7K4F\nFGWVY-E7TFA-79CMC\n3KEMK-8G2TZ-KH0PP\nYDSH7-44H4P-6Z5QD\nGNZJM-K9ZRG-C37HY\n7571O-VO2OR-N6O1M\nKHPYK-4E7H3-UUFFZ\n7QQM8-ZT04W-QKRRN\nJNSJJ-YDJZB-HJYZ9\nIQ10W-NAQCU-VIZG8\nPI87D-3X6B3-R28DI\n3BBM0-7IGNN-4AMLK\n5FE88-OMBG8-VSA59\nAZGS0-5DCCS-AC2BQ\nNTVWB-JSQBL-GFB6K\n11019-UY0GY-KTCOY\nPK9DY-CMI3B-61E80\nGOL14-LAVRU-AN821\nD2ONM-CP2WW-Z96QP\nR3G07-MCMQW-LP5W6\nFQEJ1-U7EYX-CDBK7\n2C9O4-KS7CU-2V7ZY\nHLL6V-V76VC-QPUYW\nFNASA-DCFT3-1YCD5\nUBVSP-G2EEJ-5WUIQ\n88IEF-ERYPE-FQDQ1\nBC3V8-THWDO-XBV7F\nV2Y9F-U67VJ-NU8F0\nFW964-C4QJY-EMLFY\nTP086-PE3MY-03N3M\n7OC6X-9KLJA-D4UHX\nTIMXQ-GGQ0A-DO0YO\n8RTEC-GQW96-KW8KM\n3OOYR-VNEK6-VIOJS\nBO4QD-C3NI1-WK881\nOV6PA-Y0ETT-09VC1\n8CO7T-OWI1U-NPFES\nHR71Q-6K61R-ACON0\nH3MFJ-FVAQS-MPAJC\n6AID4-YAF2Y-VHZ0Q\nHNKNT-6FJLF-JEML1\n8T39L-XMB9I-601TL\nXAOJJ-EDYDC-2DT0N\nGU5U9-8NQ4E-6MSFC\nWL85J-BLYLK-GOOFC\n6G4YB-1UEVN-GB78Q\nD884I-54UDG-6MJZV\n7QXVZ-VYHQ4-7MJUQ\n93PT6-SX6Z4-7YEXG\nYDOJR-DP3QG-K4RMW\nZ9LMV-07W69-EA347\nHNH2K-HD6Q4-X3XJL\n0KFYG-554F8-UJX8P\n5RKZX-K7XAS-IQ7FS\nBZ6T1-DDH7Y-3LLOC\nGGGHS-QEJAU-V1EI7\nJS0B4-T8F5Z-RYHCH\n0UJY6-TO47W-CDO1F\nHA26G-P924N-3QQTJ\nQGA9K-5YH6Q-66P31\nSQQIR-21KSV-Z1SUO\nV1SUV-ME6VL-5DYMZ\nS27BN-TQR1O-F8VJP\n4STEZ-KCIZ3-KSOEZ\n77VPX-ROJ02-IM51G\nWJKP5-3G1WA-10ECN\nE8Z1W-5C6LQ-63G4C\n9UFNV-R9YJK-6M04I\nUS48V-7GYN2-8YX3G\nON63V-BZZTN-LTC9P\nJHM54-T84O2-W99HN\nROWIY-4BN5V-PCMUI\nI8B3Z-9H7L1-AIB9I\nZZWDH-SM592-BALBC\n7NRP1-6FT0K-45MC9\nMFEHJ-NJWZ4-11149\nLD4CH-B67AD-MF4L3\nFOLXN-7GGTT-8199R\nE59CR-ULV0V-OIRIP\nLSP98-6Z7NI-A38B5\n7DC6F-J8ZUL-YGTPD\n8VNMI-D7NDZ-SO888\nQNR9W-ESG87-C4Q26\n81K4G-2YL7W-SX7S9\nLSVYO-S5JAV-V6CCG\nXWCRZ-FCI4X-G45HT\n9WOJP-4TEJG-G0P5P\nLZUZA-MG4NS-CGJ7A\nEAAEF-RJ9ME-BIUPS\nE6DBT-EDYOK-M1TNQ\nJAXMI-8BHYN-IKVHN\nRIK8E-ZB6HE-Z1F4V\nNM9DC-VBDN0-R9F4E\nBWU07-J01X0-6EASO\n63677-F453X-EF5WD\nXV3Z4-HKP7P-HPHDZ\nYFPMP-3VY48-BZ19C\nTLDKK-KHAWI-QAZ2Y\n7IJW6-EZ2F4-GBAWT\n8RY03-30811-C9RCW\nMUSPD-7ZDQU-0X1NN\nDJPV2-KC7P0-K8B0T\n65DQO-SFZ42-IRHEF\nB38RV-X7ZOR-DIL9H\nP2JHB-R2R42-TYO53\nSGVZ8-G7HP5-QZ27K\n7IKJ0-B9FSM-J7RR8\nXB76D-KFYYK-E7ZNK\nL36PR-HMIVB-3RXPI\nH06YY-G4F6S-IYM76\nHUBTV-M9GRM-0KS4D\nA26MK-P3EUX-0L52W\nWESL0-RM1TI-4DK10\n57DXL-FVCBD-BTA2Y\nSGO21-0ZHTM-GRRAW\nMJ77C-O2P81-W2AB5\nQ9B4G-L6PAD-TMUTZ\n7P0L2-A0IRC-Q1Q3D\n2LW8O-F775Z-1O4B0\nJHG7N-NFLMR-U0ECB\nLUDWM-8717O-E5CZ2\nI20GK-FRCUL-EUBBJ\n3B51L-TYAR0-O863J\n715LR-FDNST-83NGL\nYKVIC-VBUE6-M7HQF\nK3GY8-BJB8Z-NDSPJ\nLJEPH-NHKP7-X0T58\nI8U2C-QQFAL-PQEJ7\n6ADXG-4BGAC-JPL7E\nD2LC8-ARHMY-L8EI4\nWX1GQ-3V6HQ-WFHQT\nG0Q0W-D2550-FVSKH\nHILRF-C306E-4RYO1\nHYP86-1X69U-JHVRY\nB7LHC-7VE4I-CFNEX\n5OUWX-5U0NQ-JJL1U\nSZ0RE-FPB76-JT6CK\nZVVHA-059H3-ZD46Q\nU9V6P-XQXNW-TVYK3\n97UJQ-3UD7O-N6LSY\nEVH1J-3WMHB-A4BAE\nLHYKP-FVNZP-WGOZI\nRGCLY-NI4HZ-JMKQ1\nFRTAG-OHYRC-1ZHUL\nJMYZR-6QZ5M-ZN2ST\nT2WKF-REZ9T-N5E1O\nAD7IY-CE7UH-YVLOD\nX81PG-WQIUF-AKYOI\nZKIDJ-SPMWE-8ZEEZ\nY8ZL5-UARRF-CEQ36\nWY1X0-Q7RX3-3ILRF\nBOCEN-I0MPH-EXMOX\nBRZ1Q-4GPDD-P7QVA\n50H5Y-IDWU9-6UD5X\nA5Q6L-S61DE-JZUX8\nGGP44-54CS7-4UNCN\nOSOAM-L3HI2-LXUJ6\n6SU38-YBDYN-8GSYH\nG2YL3-97XSL-MOXPG\nJWM2R-5M9IU-0IHWX\nTXUF2-590S2-WLKXQ\nY4TRQ-G0Z5G-7OM5Q\nUTOOK-JR6H6-H0PAN\nRZ5QA-1JWDG-8LTGH\nMKUP5-A7BQD-0A6L8\n721KR-J7NNR-48SYG\nI7RU4-80LRL-YDT15\nUEO3Y-5WPAE-XNWH1\nK1HUF-RPSBV-PVFXM\n2PKZ9-B3CQV-QR0UC\n6XQP1-VBEYJ-0PC74\nZA3BD-7WHJM-9BKEU\nRCNCI-XV07K-62MSY\nH1NYD-708W0-6KJ30\nTBAGG-M8Y43-BXXGY\nY2NZQ-GTZNN-KQ6CN\n86YW6-0RRU2-ODX48\nC6N68-R9H4N-CNZHM\n6DSWN-U6HBH-DBJ23\n0RA1S-O7WQW-S3UHF\n8DYL9-9S8MC-7WCJC\nOLOB1-GLG70-6KTEF\n21YXQ-JJUD3-76AJO\nUD5GR-G35OH-UE9OH\nEFMWW-CFQTJ-0IYMF\n5DXDE-JJV0A-ID3JT\nD02AQ-N8OSE-5DHOW\nW666S-5GDSL-DH8R8\n7JODU-AJE8Q-GN452\nF4MTY-V31GV-O4C0Q\n753YY-G3VR0-TCODA\nFBGPR-71MDN-UO2U9\n61M0Z-4TY1N-ZC6PZ\nTFFLM-XXAS2-2K5DL\n40H6U-H558T-03AC7\nFD1R9-MZX13-ASDFR\nCYS7K-ETTS6-V2YRP\n59JIW-II4LW-6CSPC\nLEHBL-9HLFG-Y2YV0\nME9ED-CNT1P-PSNPQ\nKPFHV-2XSJZ-M0NNL\nQJC4V-A82XP-6BA8K\nTEW9R-IYYVO-0HNYT\nEY2D9-CDWYU-GIIMH\n819G9-5QT4Y-UUGZI\n5KNII-JDVZI-95NZ8\nN2NOV-ES9CR-HZQPK\nL0XGG-LWAHE-M7SMZ\n4FYPA-2H0H2-T1HWK\nZGHY4-JDVGR-HUCJC\nN14BY-O5SCQ-5S2Y8\nSIXZU-OFUOR-9W88Q\nTL7WC-TRPBZ-WRL1Z\n5G1I4-PYNVK-VOJK5\nDHU91-5K6GU-ONKQ7\nJ2NLR-OPB90-T2HUU\n2JF2I-M4X2U-YV1XE\n0K2XX-PZ27K-ITYKT\n5O83I-9TWVZ-5XNCH\nKNVQ0-A1JX4-70VCQ\n6YUBL-6X6Z2-ZRWKB\nDYHLD-3QF0F-420AA\nOBEKX-H7I01-LB8RH\nUL2HG-PVOVX-J1YJL\nLPQIP-CQFFJ-59T7W\n3QHFV-MGII5-KNF16\nEG30V-P1I2X-BVVKL\n7EF3J-5OHA0-J88Y3\nQ8IY7-VI2Q7-22YMV\nQM931-7IFD4-PZG8A\n458A8-A5C39-4M1WE\nGE03G-TMB5J-9607C\nD4K5G-00DKE-Y8OPB\nPZ3TL-RA80D-P7QYC\n1CMZV-P6O29-SND7A\nWO0KJ-Q504I-AIZLR\nJZJ2Y-SH2A1-L9PE0\nP2ZMJ-887O0-C8NY9\n6M36H-ZEITE-1WDQ5\nNKTU5-FU744-5NU1M\n3H949-K6PX0-2AOKZ\nQXLU5-BLWHS-BX4XQ\nULQLX-AY343-R4WXC\nPMD4J-NPJ3M-GFK6L\nLL153-0D1EY-7MRJG\n6SRIN-SF2JU-Y75WY\n506MA-MKUQF-R5WD4\nN0HB6-KILK5-Q5HWX\nRX31K-PRJBK-8Z5VS\nFY1H7-Y08XQ-78Y0F\nPSG6B-4IRYK-CF316\nAD2Z7-UURIJ-U36UL\nK3LKP-M870O-CN5V4\nPYEHJ-U2UW5-Q57XN\nKSBI9-HAYQC-GPYJ3\nXZT35-KKZQB-KVK03\nTWB7E-390EC-VZXST\nKVIOR-69MTG-674CJ\n1HHE4-U3UIG-OADO2\nGC7S0-6YZ8Y-HT8W9\n76LH1-5RXXI-Z009E\nRWOX5-EPJCK-Y5CKO\n810KI-0U248-YO6NB\n4ZDOM-GTUAA-9P40J\nLLB1H-F5I4M-Y5PPE\nROWLE-7W57K-13V1G\nA2P2O-F3WE3-LR5NM\n0905H-DE7VZ-V54BI\nYZ97P-QOW1X-FHD2X\n85T6Q-WHHFH-WC0CJ\nCNG87-BRDAV-4B7I5\nYVPZ2-QCTNN-0LRWC\nTKOMZ-X0EQR-VLDUY\nZOM1R-LN6SA-GRP14\n88AOH-C1MR1-CCK5N\nM0V06-JDJJN-JDIBH\nLGVWZ-I71X6-WRGNG\nND2SM-FCZKH-E4JF3\nU6YEB-H5F0X-IX2SK\n2NHG5-M8TX4-OP7CS\nJMYU4-1W8L3-7XOG9\nLADBZ-M3V3H-4NZR9\n3ILRW-536K4-1A402\nG0IKP-QT8LZ-I9OB8\nOUP97-CNW26-6IIZ6\n5XJQ9-6DWZP-1RAYV\nDI3MN-Y9VED-20JHS\nO1P9E-4QOLA-IGH02\nA9VZ8-16I9G-IOF4T\n3OAU8-ZL9W1-8O7KQ\nUA16X-UCZCR-2DFHJ\nPMHJN-P0OJL-KAAGC\nYZZ7H-OYTZT-TYNIN\nZ8TR1-46NJJ-7A7QO\n32U98-DQAS6-84M5G\n95A2Y-XQMU9-TNS6T\nXYJTE-E7UHJ-59TRL\n617FR-0ZGKP-2BU27\nODH9Z-D61SZ-DLWMA\n72G0V-IZ3G2-ZT6DP\nYCX2G-XJPE0-SWJF8\nPVRPF-G8VGA-83BVU\nVEBRT-2VTWM-K13WY\nQEAJ4-E2L4O-A77VC\n5F0TN-QMIGG-IDZ5L\n39GBR-7IK8L-Y6MJW\nDVAOI-R3A0K-BGHJP\nMG4DC-VZXUY-LSD09\nD07SG-MXLYU-XBRX6\nJ0IQL-QTH1Y-AXT3M\nLT6YT-HDRE8-XQM5H\n0FVTL-CS3T5-T5MB9\n0YNI2-0K5ZK-R9YVX\n3PD3A-GJA5D-LTAML\nXVJD5-CS8DM-TRUY4\n0F7KG-HKAA6-WQLFB\nG16KX-Z58X5-HZPXB\n5UKV5-9YMNR-RE68H\n91IHO-26T1D-268H1\nYOKZ4-N56K1-2VKR9\nROIKO-RD71D-MUKME\nSPFE8-8QVFR-HIL4U\nJBDN5-KOWLL-DXL80\nGQGIG-3RF6C-Q27OT\nS7TF9-N87ZG-99U0D\nC4MK6-OWQFI-CSXDV\nTX1O2-97ZFE-NTMLB\n7SG5A-BXS4I-KCYA4\nL9866-STGRT-RB7FX\n0VD52-YSTX5-U358D\nHLPML-DGW5P-DD9A8\nS15ET-KD1G0-H6FCW\n3M4S7-P3GOW-O4PU4\nI6110-F1RTM-6HQIN\nFYSRR-5PH3T-7VP97\n3J9XW-80IK9-WE7FY\n0OJMR-E64UC-46ZH8\n8JDFF-O9UOT-1BQKZ\n76ZBI-AQWX1-XUODP\nTKZRU-AU9AO-YTGD2\nXNX7Y-EVF5U-JKZ9Y\nN0CVQ-QJ5X3-GBNCG\nXKZ57-RL7I8-NKDSB\n9UF9N-TJ2XP-HO0SN\nL7SP8-8CYYR-KUL6Q\n063O4-IS3H8-UNCU5\nZ72RJ-6R41F-30QQT\nPSG5H-D6IA3-XQJ5U\nEVPYB-RH5YK-EBDXA\nF8SCL-2LV2N-W4P6V\nNBEH5-B8778-PXSI1\nQOK7G-C6N2H-86TEA\nNJUB7-4XLIR-MPGPS\nR03A6-JMN1I-CA9T8\n72QI7-OZZ0V-2O0EE\nFWHMG-JF1AY-P2BQ2\nXGCLG-YBDLH-QQE7G\nI7RA0-MS5G2-PBYVW\nR58W1-9AFT2-GQUUC\nKYWAQ-FFDO9-VLFTF\nB4VTG-JPWD5-6BMBQ\nEI5M4-40JIC-WJ24A\nHFAC9-QDB77-E32DX\n6LUZ6-A9WRK-0C6VQ\nHD974-LCHYF-ODTGF\n6NCHW-JHV1N-7OVSY\n4AUYO-DVSGP-LNX61\nN66B7-NF5NE-Y706E\nYDLT3-KP6NQ-N02JJ\nC819A-BQK72-2J9JY\n3371J-B1ZK2-HCA43\n448X3-VJ80Z-8C640\nQ8IX5-O7OSS-XLDC2\nDAFNY-LMMZ0-8LSM3\nP94FK-BENF6-R1AQB\nVSHV8-61PV6-W9M7B\nMP6P1-BK29I-J7JT1\nVLR2I-FLSOH-0U9KZ\nEC509-DOV1R-PY9J7\nBF1WL-7EIHD-NG3PL\n0XD13-3269E-ZW1R3\nJHON5-Z53AP-P6E8W\nGW3KS-TKNZS-OP5T0\n3QTK8-YSPO5-BJYKJ\n587BM-V2JGG-8EUCD\nBW2RB-7JJDN-BY1QE\nQUDEL-351GA-CRVD7\nEMNG3-BCYHW-ZQJK3\nGEYXS-412LA-7HI8T\nVBEOM-89S0J-D710P\nJ9FMY-4O5LG-4VAO5\nTPZS7-OZFKU-R0WWO\nOZT4X-ZBAU3-YS3AA\nF75NX-W73KH-LI6RG\nIY9MW-CLGX7-DFB7O\nT3OC4-FDG3Q-0TCXX\n1G1FO-WA3VN-FJMW0\n6N1AD-EX2T6-YX8CX\n8J0X3-XAVST-5G5GR\nR7MOA-5HF9W-JFEF9\nVQV8E-3FCWW-4CH4D\n4UBJP-S1Y7P-TN4DN\nWSTJP-P9LLH-0WRXB\nMS6U7-GWTB0-Q6IGQ\nKGLD3-0FLAN-BYW7S\nL07WZ-ZOVN7-ILLXC\n7ILRJ-855ER-CSKN5\nSJA5U-Z8U73-VBAYQ\nDEE6P-CWLKZ-IG51V\nWVTKS-CYSEV-T4HD3\n660HD-6IEDJ-LLGB8\nH6DGQ-LHT14-8O3NK\nEWEO5-WUQOQ-SBKW6\nAZH8M-65S3I-APFED\n0WDVF-TPQY0-FWKHL\n9LL8V-ZPS71-PU0HT\n3A0GT-UKRJP-XRKO2\n2E6RC-EKO8I-013UE\n53MA1-5C06P-BWLYG\nX2D1H-4K5HJ-35SJ3\nROMN4-6TZGK-3VHG7\nQPTKY-K5MZ4-1IO3F\nUWL08-RHKWQ-U4TLO\nESZIV-Z79AP-UFBH6\nBV0XE-MJPA8-FAP74\nG4VJZ-NT8PP-L6FQW\n9PLPD-OQFZN-HSFX9\nBEDX1-U782L-C7ZAC\nSYKB0-Z0UBZ-DQ3CG\nKJCJ1-JCEW2-6I2PI\nRQJPW-HJYN7-BXENP\n27HUN-DD0SL-KKUPV\n0Y0TV-ZHE72-6P0WE\nDPAOB-JYSIP-Y8EG0\n6TFTW-MK0OU-KCDYM\n9NVCD-2GMEY-Q1S6I\nR8SLQ-EB4A3-TAGB5\nLP27U-JE3ZI-QZ40D\n7WK4Y-BIOUM-AGH9D\n8N74L-GGKRY-L3FGW\nK9N47-OK9AA-SWGDF\n0P7J1-A6U1P-IQJ0A\n2RIAJ-5F6PZ-1KE7N\n4QBC2-XWZHX-ZK7HM\nG3RDC-8OPZN-O6R3L\nTQ82B-4366R-1HUS3\nQCFCP-HDAUC-SJH5O\nSPDNB-K20S1-RQX35\n2M8CZ-HTNNL-US1NB\n7EBIO-HCLGU-K3TUL\n19V4O-Z64DX-4VA8R\nT7DNJ-Y5F4S-2YVBT\nV3DN4-J5WGF-HNH06\nLVPPX-9WFJG-1M514\nVYUUZ-7LIO7-5P7JE\nQ3LGX-FQ4AO-87I0I\nASYAX-YIGZN-4WLVZ\nOD8T7-JXS6H-GQ42E\nJPI4M-6UDFG-VTLXV\nQQNLJ-S62EG-M9TUB\nPGW5L-PJLLY-407LG\nMP6CK-DSVI3-IICLB\nKKL87-8KKZN-HMEDL\nN2SY1-WDVFP-0IB9C\n5C03J-2U3RW-5ATRH\nL8E1N-41AAI-4J0BU\nPQW4A-571SS-OKP5X\nQC8DB-0JK4L-28MZR\nV7TM6-L8M5M-T84MQ\nWSE6S-GEV50-UCEKL\n14DF0-GCNCV-NU3XF\nAXJRY-R03P4-MKV07\nANB6S-WOPOD-2EEKG\nTTHVN-4LNX1-LMLMY\nZQ96G-YIYY3-ZZRYW\nDE5AF-IOFZX-I675R\n3XENC-JK22A-PSNIJ\nKHFW5-2Y5WN-ZNJP4\nYM08F-83ERE-9K0UN\nNCWM0-I2C32-95DH7\nF64JK-QHEZP-NXKEZ\nZC8DJ-3N5O6-SAHWG\nL1MY6-V5DVB-DJU0L\nXMFMA-GPAF2-1MYXW\n7UYVW-LOSKQ-VJTX3\nJU0U3-PMVRG-6353E\nJGARI-0GL6W-2XDT1\nZ3CYW-KBVS7-62EV3\nLWOK6-45RA3-MY0S0\nSODRE-F2U5P-HYSIJ\nUTHQL-QV5LO-FDBR8\nW05FX-PVR7N-MQY2X\nO7KTC-3WPOZ-QXY7S\nNUD3Z-TMTPE-5Y2OR\n3ZHLB-F39M2-KBEJ1\nJKQ1C-RW98E-MFEDX\nK0V8O-Y2COD-XAHKW\nLIFYM-SEC7Z-10CZ1\nGCLLO-EVGKY-GTRCA\nC6Q3X-4V1TG-COZ7X\nXMO5J-O2Z3Y-YPEGV\nEOAGW-7A3JK-RI93P\n3PUNB-9ZYGX-EM397\n0UTVV-52GB1-HG29E\nRWBQD-SC6ZQ-ED6SN\nYQW9Z-BRJ4J-7FPYX\nAYGZO-R1R5T-6Z1FW\n1UMJE-RGUTI-BNXOB\nMCVIF-PPJKU-QXEXY\nOVDSA-CEM8H-1XQL3\nLDMH3-ZKA1F-EMWNH\nZBFHX-KK8GU-5Y7Z8\nIF948-GTSQM-JMRXH\nKEG2F-AUNBD-ZPFT5\nEWXGO-7DRB6-KMUTI\nJJHZL-9UF1O-HEQ19\nA6EKW-W2VNN-9Q6YH\nFRIR3-GPX9B-JBQ66\nTFDML-DLP0C-E440A\nA7WDM-AUGZP-9SMSV\nPWC8J-2SD5L-PGUIH\n07GI3-K3VEB-QIAA9\nI232S-Q44ZE-N2I8J\nOJI1P-E4FSB-LZYJH\nZZ77N-VEL50-NSO6B\nAJ0R2-33QNX-576SF\nR69AD-G3RO3-T1DIZ\n0J9LL-KAVM2-VIU51\nET28L-Y72YV-LQVFC\nG8P6M-JRSXE-2CAPZ\nJ9Z4J-H80E0-PFVQT\nKHRUH-9EHFW-0PCYE\nILUEY-J1DZW-3M0E9\nFJ5VA-J1D1Y-JLYA9\n56YFK-C90KC-6YPNU\n7P7BM-ZCEGG-DD2MX\nU7R11-HLBEM-RW0J6\nTX70U-CY1XZ-AZ8YQ\n2MK6Z-PETBG-3KQI1\n0YA05-DJV0V-COHN6\n3DO1L-2J65V-QHBAC\n3M82N-O1J7N-PQ0VN\nF6LZQ-VSSND-X2P70\nUHIVX-V270H-KD7HU\n1QWX2-AWYPL-V2XHQ\nGFFTM-45DUR-MCDSJ\nZS9F0-G4UNL-C24AB\nRKVYT-EV243-ZLDEX\nZ9ITC-VN51V-N011I\nZ9NPL-DPKAG-3AEMA\nP6176-9MOXU-IOQ7S\n8BDNK-D2F9W-PGO0S\nU7TZG-DBZK9-R9JWX\nV9T91-I24HU-XUTMB\nUS0QY-VA2YX-VDDHA\nGHAUZ-66E50-FMHGD\n6TTES-3HKNR-J52GM\nHFX4N-UNAH6-ICRNP\nCMN9H-STXU7-82HI3\nBERSP-8OCTH-7GY10\nUXYQX-X68LL-P9ZU2\nVZ5WZ-YBTSK-ETUXE\nWWIHW-39NGT-97CA7\nI6M96-47I7J-WKQBV\nI9TBT-NUBVA-HRAH8\nH1PK9-ANJCR-V3TU4\n577TY-87Q80-61O6O\n69JC6-H9GXO-GU0D2\nOY4ZP-T8NTS-Q32AX\nQS5PJ-973GK-C15JM\nBRRV9-QIYAR-6Q7P5\n54RWU-MNI2N-X0Y0U\nIU0VH-JZW1J-1SUJJ\nWBC45-JYY92-MDRSY\nRIQ75-PPVYB-2T4RD\n61CBC-7XHLQ-8BI3K\n2ZV74-E7ZSO-KC00J\n7HBMY-YX1UH-KR34Y\n16G7K-NSI0E-20Z1R\nCAW9L-YIDUR-WAFOM\n56A86-GJLN6-MZOVU\n5FW4H-6GRHK-DBT8V\nRE3YU-R8LS7-5YW1V\n1N45L-EKYNE-5XEAN\n1PYZU-NGDM2-563O1\nSZBQT-OOODZ-O412A\nU51MF-S32VJ-ETZ8Z\nMTGCA-7X5O3-EAB2I\nILFWE-FQYHJ-0IPU2\n5Z2M7-K3F3G-9ASDJ\nOHU0Y-TKMIP-0WZKY\nJGXHE-HKRVR-GA22U\nK9Y1Q-6H6KS-T5O7D\n81XXM-O7JKY-NWQJ6\nZ38SR-F007A-4GGMD\nFM3FW-21US4-T5UEJ\nBHE2V-SY58G-IQY6W\nAMTEW-QJ13C-84WMO\n4LL6F-5CZGO-IDDT7\nECEB9-RVJEE-NT7WB\nQ617F-CYCMY-25KZU\nASUA0-2E3HS-048P3\n3CVKA-4A6CW-G322D\n4KMOC-R5XYA-2N2PT\nDNJEJ-ANRFW-KFVB3\nCWYC2-AQXMJ-53F3K\n4KXW5-OOKOV-ZH94P\nRE2O0-4MMBG-W92Z5\n5FIIH-IUQ7E-8YRNO\nE36MZ-2VA6U-6R99A\nQGMV8-N9HN7-95782\nA2XDD-H7VFL-XOY5K\nRXQ34-XIHPY-V2GM5\nNZ5JG-PY8C5-2FDJP\n6HBOH-BWBCB-7ZJDZ\n2MLLU-RIXUI-SVJFH\nBQBJP-9TLDA-KEO41\nDRZ3Q-780XX-9FUH5\n2FRKF-6TVS7-ZQ0DT\nVTD9G-BRYIU-9WAHA\n1Q5BN-VYSNJ-QPX77\nWS6RI-MLD2F-4DE1L\n9NMY6-ZL9BD-1SSNQ\nRT4NT-PH7BE-X9LAR\nMNXVW-1BIYZ-2AVZ0\n9C8KN-1I3QD-QIEEH\nF3Y0U-8I52R-OTJQP\nYK65P-OAVJ9-RHXYN\nXZS7M-H5NVZ-TTRUY\n1JQVE-S32LU-DWOCT\n3THVZ-4YPLI-BGV2S\nSNTMW-G6MEQ-JM2QY\n3J79S-GUI9G-OVPOR\nYIAEE-3484G-P4NDK\nMU1YB-FLONO-BJVMO\n5NREY-A4B76-5RD40\nJBQIC-MPPTD-SLOJC\nZ6WDD-GQUXD-N458X\nRAN9M-CI73E-MFBPO\n7TNIV-7QHOP-YSHTM\nSXCBU-6MPBG-N9YOF\nNRVTS-ORUHV-71Q2I\nLH1S5-4XKM7-7Q383\n1RBEJ-1VDWX-YDZ9X\nKYGHM-NMBRW-HQ3LC\nV7ISA-205CT-VXNRS\nZGVL4-HJ31E-6EQHC\nL3FZ3-QUQ8P-EVU2O\nC87J8-CPWMI-TQ4OM\nCR5M1-IV8J4-3GWP8\nZ6CJF-N7BCR-PRATB\n9KFS9-E6AHZ-VQB3G\nBN75R-BUA85-06V0V\nMSYHB-FJOAR-ZL4EO\nPZU93-MVDDO-EIT9M\n7HO75-L6B2S-P5RJ4\nD21FW-XPLGZ-UIZ4Z\n21P40-YQT2J-OB2S2\nWVKPJ-PIWF0-DUN2S\n1AIVD-GVQQ1-JX8E5\nI6DS4-KQCZE-LFJY4\nMUKYF-MSJ8X-PVZER\n0QVDT-XXS3G-EMBIN\n3LM4E-E0V3M-D9EVM\nDY550-GRVFB-RBI00\nSVDCC-1F2BP-6MIDP\nIZ6B7-NCYXL-IQFZ1\nFR6J2-D8PQF-T5QNN\nTN7LY-40AVN-OGZU7\nTHIK4-YWNRZ-FRQ9O\n2BYS6-POQ5A-SFXG7\nJPE62-JYRA1-9EYDH\n5KLB1-QSSEZ-YJ882\n49BY1-4TRIA-4EXHL\n66UT7-MCWXL-I7UZ6\n277G5-QNS7X-0L57P\nG8K5G-ESQOG-1UT1W\n6BWKO-5NACT-3K8L3\nUP8G2-I6U38-W00TU\nAW1RA-7X355-3EXII\n4ES97-0YB0N-FFVOE\nYWK4Q-83AI6-2B3KV\n02ZRL-0P7QF-EZOG9\nCHWW9-E67Y6-6T7YW\nB4BA2-V0Q1F-Q0KRP\nQ3PNX-3HSRI-MMN98\nELJMC-EFQNC-AD5TF\n8GP42-SYIHX-OOGYY\nR0PHR-BZN2B-8J5IF\nPA325-20VI2-4RR55\n9DOTN-7WJJ7-MNOJ1\nJY5Y8-L73JS-K0HA9\nWYBYM-F1DG4-E5322\n3V8VI-G5LTK-0831X\nK04M6-TJ86S-688MS\n35TKO-B6W6K-RH0JU\nODEHD-G7CN1-FBBA1\nEMXLG-AMWU7-TWSDN\nHC2VJ-G3I8Z-NE71N\n9AFTD-LCBSS-HQX1B\nSX6RQ-Y987E-S7DQR\nF1GF1-870QC-BJ6ML\nP1H9T-9VL7P-5NGI2\n4KDVV-SA7FK-WQ9JO\nGUM0R-P2VCV-0VDF6\nRA3VW-PH13A-4JK14\n07E37-6F3WF-2VWPF\nTDC4Y-7R2SI-WRKSG\n27J58-ZFGB0-13KEC\nQZYA9-JRWIZ-L284E\nJH8EY-957XF-F77LN\nN4H5Z-FC3H7-80O6X\n2WILV-YHG9P-8LF9R\nZEVUQ-B074T-V9GF4\n26CHY-QQTGN-FSO0Q\nW4IEG-DYSZV-V3QK3\n5OVYT-0C3PJ-86TQ5\nJ36US-HMJC7-SX2VK\nILYB8-NCTZK-KLWVE\nK48CV-P1LHJ-F3IBB\nHZDBI-B62MS-OJ7JA\nE6J0Z-JRTDH-A1MJ8\nEBEEW-UH9YG-MTX26\nJ40LL-5E0RB-F7QVK\nUGTLE-ACXGU-8JHGM\nM57PB-IYAZ5-KWYIU\nS1MOJ-Z6ZMY-656O7\nAA5MF-RMPL1-10Q5A\n22V98-QLI4Q-LOBW0\nKE9U3-DQDOS-G2P2B\nINXM2-6M2O2-YMP8O\nGQ3CZ-L4XDL-AVQJ7\nSZED2-O42RJ-WWHFB\nZMW6M-5HPCP-OUD6T\nTK3TB-S0GRC-XOTIY\nK9FZF-K2ZQ7-00792\n70CVP-O2UOG-1BFPI\nMU6U9-KG2I4-FSXOB\n5ZWT0-P9ZDS-W8MFV\nWOXV8-Z9854-VKHU9\nZA6FZ-QA4WQ-ANOA7\nEMQ21-9Y6CP-T2FJN\nX2CB8-9T9SI-XM18P\nYF2MC-QWIDH-DNIEW\nKN9SO-D3PD8-9JRB5\n26N8S-0JWRF-VJKTJ\nS2BQS-9KLFP-X4LRE\nEA1IV-52999-DZ7P8\nQS20D-H097Z-T9JMJ\n66SAU-5KXTC-H4J2R\nKPUF5-DKP3M-5Q076\n7QRDK-9QP91-RWYUN\nHX41A-4ZA85-3L4DL\n794FW-83JN6-MU57K\nBSBDI-3KFZF-TSVWU\n2A5OF-F8F6Z-B3R5C\nPEZ4P-IPVBD-EFG2J\nYYF69-FABNJ-D0O2H\nQML3Z-NOENU-VLPCQ\nW03YD-IV4L8-1BTSF\nO9JMU-TC0GZ-04WG0\nW70X0-V17AP-97ZB5\nLS7NT-WOFD5-C9SKH\nRFF7V-CIMQU-KNFTF\nFD8ZJ-TYZ00-VXVD8\nMVHXD-0NHDA-TLRT1\nK3H3K-U983K-JCECC\nC6T7J-7E23M-116C5\nBTKA9-1D2GS-SUMQF\nVMLXX-UQ4ER-YT7XY\nPZL3C-J8B5G-TOGH7\n01IXQ-BYF5G-H01KS\n4K6WN-FZZ5Y-6C2X7\n4F0V3-335S9-JVHHB\nMIBGG-A9K3S-5RQ2I\n4CIZ9-LIGZT-DW99L\nZDT68-F7QEY-MLNTA\nAEER1-NJER6-LCQNF\nORQ37-3KCH2-K5PI6\nFT250-Y6ZUT-BFZ5I\nYBMA6-WEXI7-HAKYI\nX3990-9I9IE-KNVHF\nGL3CX-UZNGB-P4SRX\nCZKQR-Q8MZM-VZFHY\nSXCK2-NLVGW-AM1ZZ\nQZ5IZ-V0OUA-VN7PI\nS58Z0-AHIYC-QDGI6\nVSOEI-EVICD-D26BF\nRDUMM-M4O1B-OSS8N\nOP5M2-VHBK4-H1PP2\nD1FG2-0SH29-M8RQD\nY9XLI-7BIOA-GGD7E\nI7WYJ-MWPGG-GRAMX\n4395B-H79LW-6KZ48\n6Q5S8-7WMAJ-QN3JK\nQSXZA-SZQ0F-BOF5Q\nPYEQC-YIP9U-A19YG\n8SN1B-HX032-L6E2N\nNSCT1-ZCPRS-35I8W\nW7ZUF-CBUML-BS5R3\nUK4BT-V6FIW-C721Y\nC4GUG-7X24A-7XIL6\nJBUEN-J2MMY-ZJBCI\n1BFJ6-GE7BW-9I26U\nBMYVI-PGEYV-J5K7S\n6H56V-19WNY-9YM1R\nLZWXA-55PIC-NGURV\n9JCAA-VHTUB-2OU06\nWFTCR-L2V6N-G8RDF\n5MH8C-AYR0B-FWND7\nRDMID-J8AAO-CYJKK\nK8U4Y-TVHPC-B5FT8\nX2R2R-S68TU-JLT3K\nSKU68-QDQNY-FQ8O1\n3HKLA-U8AI7-ZVBJF\nVDP00-ZZTYX-6WO0Y\nOD7QG-Q9VZ9-OWKIZ\nNKI7M-4VPRQ-Y61MK\nKCOVM-H2A9J-K5EOZ\nJU1O6-VDX7L-XE3TH\n15J3E-GTH4H-XOJ06\nZSKF0-GYOL7-RF34A\n6387Q-XHZ0M-1YCDW\n9UEN5-UQXQ3-VIWIM\n6RO87-LNJQ0-CKROM\n8I20G-GS8JB-11IB8\nS78N5-8OIGP-US5R1\nXIZA8-3O7JS-Z9620\nY5R30-D5VOQ-K9T6U\nUTB98-ZBU9G-8LLP3\nCAH4K-ZOCHL-G06NP\nABROI-T4XUB-UH5VH\n2R9XG-7FZNV-FLCOP\nMH9S3-3EQS8-HR93X\nZTC8B-OK5EI-FZI1F\nAIIH8-KVUDP-I50Q1\nXSHND-1V2XS-U58C5\nJ0A8U-X5C7U-KOQGE\nXOMPA-RJ2QE-H6TL3\nMK4SI-S9J3Z-0F05N\nR1V2N-1PE6L-1YTT1\n82NV1-VO1NF-KBU6G\n9GISJ-E34UC-LWYW9\nIWUQ8-QXHE1-4K77X\nEJ06W-ID0YB-RYSPF\nH6AU2-JJZ9J-76C1Q\nMDF6L-X4CIY-BJ0AI\nIGIRK-SL65M-QAJM9\nG4B12-S0830-XRZFH\nL2GWC-IPLBK-WK081\nGU1GO-5JKV9-DGZS9\n6SZ58-DGJXZ-XZK02\n5YWCQ-TRT3U-K1QKG\nNZOIY-4BF2Z-A5B06\n063RR-R1A9S-P2ALA\n3QGQA-BCLW8-FBSMC\nUSETW-5R1IH-U2131\n3441P-UFXLL-ZP13J\nW21SK-JH4FO-GUOR1\nRSUG7-6ITGY-3GGF0\nSBAOJ-ONXER-T4B7Z\nXKQKR-GHYXK-6IZ84\nD0SMS-3KXD4-UMA81\nQDX3G-I9WJ4-T6XNP\n37XKV-Q202N-DSM1O\n90QDH-4XE3M-Y1UVY\nOLRX0-8EI2I-GQNGJ\nW3RQT-GB8CG-BK9YG\nY4GPZ-W9YMD-0JAGF\nEYG4S-LETJ9-TE2L3\nH5ADM-X622Q-JOZ8J\n0XBIX-TQK30-NBD98\nP2WGG-Z6P51-S1480\nX6UWA-3V2WH-10RMW\nQ664W-BVCPY-W447Y\nYKNYI-QHX24-7A3WO\n9NN3X-0KURG-N0DK8\nA9HSL-T46F2-B1ZUV\nHUOSW-CD4LH-WYYJ4\nRZENY-UI6ZG-6SSJ1\n9WS9D-ZCGPJ-C7MVI\nFHSOH-VREQR-VXVOP\n48NXO-L4LX2-A5JCH\nKKYVT-JTCRI-JQOVI\n1TMKP-1PFNS-2KH9U\nF5I1A-RLGUB-Q83HH\nXN31G-PZA68-CWCNV\nU1DQN-RJFJX-SMNJ2\n71WS7-TSG27-XLXLO\nVAJ5S-VU3F4-OBQZ5\n4UYY5-5HUZP-E6HIF\nYPWLH-VWUBQ-PSOTZ\n22XVN-Q6Z8W-DLPFM\nVRJAP-3S91Q-BQ36C\nMEORV-1B267-16TKE\nS1OL2-D0N95-XY8JV\n8VHN9-TUWRC-M1SS9\nMLCFG-Q7WRT-RDLE4\nHVK6B-1WFWM-WNF4T\nVV1EF-JMM5W-45PHV\nY7XV1-RR0ME-SLUIF\nMHQKQ-6CNVK-ERH90\nBB3VD-TCLR0-R5URT\nA3AKN-MBYNL-RJNP9\nP6RO2-LYU55-0DUSZ\n2I5M4-Q2TFL-01SDZ\n5Q7G5-ELOX9-QSLGG\n89P6W-9UFLV-2ORLW\nS4LS2-PP3AW-5ST2Y\n4LGZM-VFOM1-5I7AA\nB55TM-F3MBH-1O0WG\n9R4SW-OE954-5GBC4\nZFGGQ-NCACT-AEHFU\nS2XFY-DNECI-0V5UU\nRUQ72-Z8EGH-N0MKK\nF5ZB0-6QAIS-J62Y9\nVE6CX-U1ZCI-Q9AUH\nW0USX-GR20Q-3OZNP\nBPUHU-DPPPY-SZEDC\nMQKN8-KTCOH-AT7Y0\n1029V-FCUU6-BWY7G\nEY3WQ-HRTMF-6PLPV\nUE2IW-C4US9-5MTQZ\nNW1EI-XVVV8-RFM54\nSSFGI-6MNEC-IHCKI\nMDHYP-U441L-ZLS33\nN998R-QQQYW-0N7XJ\nDB5TA-A53B5-7S6ND\nRC75D-LXTQO-X6MJ3\n7PPCV-ZXJ5A-9GXJ0\nPB2AL-WXKQM-6VT5P\nSV7NY-8IYJ3-Y8MQE\nS4GFH-359E9-5R2JJ\n6WDYN-G0JB1-A6WE5\nEB9YA-CQQXE-M0L6B\nA3KHB-68ZSN-44OFY\nT8CZN-U1I3R-THQIF\n0NQRA-JAP16-C8HPT\nP9YJL-M3062-61JO4\n77561-MLAM5-G77Y4\nYOBUQ-6DDN9-5NX3Q\nOS8H1-MV3HG-MDYVF\nOLBHR-TPD6D-4VGGX\nCPKO2-0ZC0U-3GXZR\nG923X-UB93W-KTG39\n7WZL6-2RPQ2-RF7BM\n2KQBW-3IKVT-KUNW8\nJE835-L2KNP-TGZ88\nHM4RK-DMFT1-716NQ\nGC81J-S8F8R-UMWID\nI4GV4-VF667-D0AH0\nJA7XG-9K6U1-893B8\nNIVBT-12BA7-GNM3T\nS786H-FUGGR-81U4L\nALVQ9-AC9ON-JNFO6\nF7E4I-3R6B0-IDG10\nGSXWZ-EAX0C-NSY0W\nIOH4U-F9IGU-X7UIH\nWY9FI-OWMXM-DYQL7\nBC8E3-ZK8QD-2OLR5\nOFEGK-FZULN-YZ66D\n6SX0Z-9WEC9-GRFMX\nRGUAL-9GYOJ-APR51\nVL4P7-QT0XC-015M3\nRJJWQ-EDLTN-S7SAP\n1Q9XO-NEVKK-H5O7S\nH7M7M-6G1NE-YT1EQ\nMB0GJ-4MYGZ-71AE9\n3GZYM-0K3YS-15835\n3XJV8-TBXY1-I9VE3\nFCEYX-FEKU1-MHBC9\nZY4G2-RJ9QL-XO4NN\n5VT8Y-T4IPF-KJ1E8\nJTPD9-9BGZK-B3QLO\n018FO-XNLIS-8MYVL\n4V1UP-YC6JL-4A582\nZND20-N6IA8-NRO4Q\n8L0S6-ETG34-XYL44\n5GQI8-UXG4P-380BR\nXJT62-2627D-KC3H4\nK5ZDU-SENS6-HTX8D\nXCYAC-VDUE8-M7ZAY\nVYTW9-R1ZOB-OR0NK\nX6ZOH-L3VCE-K2VKJ\nP69TV-SG3DG-QIKBF\nNMXJ4-N01E8-ARPNI\nE0SQA-M0QPK-QGKZU\nX04HW-GIEFP-TEJY1\nC2O2N-UJVZX-VP8W6\nWQIKG-UFOVH-P6KMF\nSGGZO-3JOO1-DEWWB\nAKEQ3-LNE1U-N0TSE\n6DPCL-9QWKH-NNSNG\n9IF9D-3TOT2-3POE5\nGYDSO-5S7BI-TE6ED\n9EAG1-ROI2Y-ND39U\nXB24B-CPWON-4TZOD\nLSV83-718MQ-HXENV\nHOFE4-MYL07-RVQL7\n8ESEK-IV669-U1VP3\n8BQJ4-8IXI4-V90EI\nGSJKN-MHWAJ-8JWYV\n2F5FA-L360D-NQ5A4\nA28FW-2WA5E-OMK3J\nWL9NG-B3ZIV-SVO7K\nP8U03-CDC8Q-9KHCA\n4S2O9-XL5KT-C9O5J\nQD2J5-7YY4I-417EQ\n058JO-L3KVH-99GTD\nIVXF3-OPYD5-IJEPW\n2E7XE-C4E72-CD9FC\nH3UAX-MACOB-COHLV\nEYI2G-394NP-G1LRK\nT7ENR-BPH5J-205ML\nJ9FI7-4KWP7-LBCL1\nTW16E-YR7HJ-HE7T5\nO6D1L-3JKQO-KL056\nOOQLU-0SNCD-9Y1VZ\nA0132-SP0C4-NG5IV\nVH9YV-4HPS4-416BS\nGMTPQ-3XYMI-U1TM1\n8GOLP-AHMND-RN6ML\nXX9T5-27ARH-78J43\nVJ963-04MYU-UOED4\nCC1YU-L334E-583V9\nER8EX-VOMOG-SGF34\n29S0A-VK8P6-TNU9B\nMK66K-XEW8I-IDUFB\n19VJV-PC4DE-3UBFE\nJDKOK-IIAB6-Y4XAK\nQ7UAE-01XIL-VD15O\nHRURO-QQAYF-7U4T5\n6BTQ7-SS31F-DLU0R\n1J0HU-0AMOH-GM26P\nJF384-ODLNM-UWUHZ\nJB322-J8V1C-3NHE7\nUTX4U-UTEIR-HXN0H\nUNEHB-HF64C-SOKAA\nEVJQ5-L5CQM-SDM3K\n7VF3Q-6D9JR-19N83\nFPGS9-6WBTG-T5CX1\n71GB5-E7D9B-V1BZ7\nJKVQK-95QXY-4KMKO\n5K6SU-II3A7-KGF1J\n5DZOH-7T1O6-YLUM2\nYZ2E7-MYU44-NBDPT\nP6GC9-C2ZED-I505B\n1DXOC-EJ4AZ-Q2NPK\nFR858-KDCMS-C0UZN\nCVAJ0-4CKV9-1P68M\nLVUPT-WAQOM-NJL72\nVAREE-J5A5S-SKHCH\n657GD-SK5L0-P5PI5\nJRTWW-T2SAA-T48XX\nRDU3P-A560R-WTQYS\n2SGO5-L6GG4-MD7RQ\nJYS2J-YKQ3Z-MMEIX\nTSO82-19ZZK-IN08D\nO87ZR-DVO7W-3ZRNN\n8HTFH-9WS0W-4CM4W\n6N30F-H3RU0-QJLYO\n8ZOV5-D0EPW-1DJD9\nKV2CP-RSCIM-TAWZ3\nPHUDK-R59BW-IKML1\n9MOBO-C545T-RAV6B\n7EDVX-332OI-Q42IA\nURZ4B-QP88Y-LZWKF\nIBP1G-JKOD9-9M5D8\n8U7H7-N8P1S-Q3NJB\nFZT8M-UZV9D-O8YC7\nFZG0Q-G71JW-FUHA9\nR5VVR-5JQC7-D6HM3\nI70R8-OIZ5S-0F7C1\n5OADJ-J2AUH-P9Y25\nUGK54-XU85N-9KEGN\nYT9BY-FZTNS-SKGUM\nTRBAY-VG8ET-2VNI9\n0UMDL-QIANY-R0XIE\nC9NKP-PNOCJ-BOKTY\nS9C8Y-EKOTJ-6J825\n8H4KH-OSCOR-JW751\nEIK8H-M0DXU-T4G3N\nYZA0E-OUZ3G-OAZBP\nHA056-5I2L0-CKGYJ\nRZFW8-OBGOO-XI0JM\n5V92F-Z3OHZ-Y01DX\nVFLGH-RGOPN-MJM1L\nNVCRV-13E0R-SCLEA\nS3X6M-M351X-3X87P\nVEOO5-0H43F-LFHUT\nV5N74-MPM47-52RIO\nJ1HFX-GIP16-NGHY0\nKXQ4C-BGRYP-BM8SU\nMV3S2-042LY-UKPQF\nZSNDG-85O7L-6POMB\nTX87Z-KOK7K-USIU9\nVNKM5-DANW6-GLWIT\nDYXC8-EXGCC-0S5JM\nN1PZC-AEB9F-J4063\nFRGQ8-WQJ61-LLF53\n870JQ-NA4I1-5168O\n1SG3N-28R7A-Q94ID\nO4UVQ-YPRKD-T19I0\n57SJV-T11B6-CVM6V\n9NL37-8S0L9-93STJ\nCX13I-RLGLJ-5N0MD\n2B76J-OTJHU-3HZNV\n5JS3V-3J4JC-3V2RJ\n70E99-S2R73-HMD5G\n5L0MP-A5C3R-691G1\nU7IB8-20NAZ-7ES7O\nEN4G0-C8KYU-RM43M\n5FMPA-71X3K-7UDXV\nT40DR-G5SJ3-C9VTK\nU9PV6-T15FF-WND99\nHNTTC-71YQY-FPRJ2\nU5F5K-1CI83-1U5UT\n3WTAC-Q4COB-X09LW\nAED9T-PU42X-4SMDL\n5M877-FNYLB-9V5D3\nE0KDW-XZE27-W3FJI\nJ3RX0-MVE2R-N94F8\nU5KHQ-E6CJ8-D257C\nSTUGK-1UP9X-9318P\nAT96R-WLX03-BEJMP\n1VJ0L-5KF48-SWTFN\nJM1KG-2UHFR-0N5XJ\n9XYMG-D5DTL-P4NJT\n37VN2-WPPJ7-ZE4XI\nCY4I6-9RD26-RVC2F\n6RHQY-APMCA-VVJNK\n58SOT-11BVO-SKOFF\n9DISV-GW869-XMQG5\nMRBGT-QEZ4M-P2WL1\nVC1DN-E80XZ-X24PW\nP0T0X-TPF39-1HTYB\nE41WC-BZYP7-E1RG9\nJSEZJ-7KYNX-BB0OV\nENR27-KG2TW-K0WMV\nL54NG-A381E-1Z7PY\n9XS3I-ONDFK-OIEKX\nO4DR6-BX3VZ-OFSU8\nKODB2-WELQW-OY4GU\nKC4F4-TPOGX-Y60RC\nKVXJ1-9ZK3Y-FGFE5\nEG610-ITQME-7GN56\n47HY6-6LFSE-JV3DB\n2FAFK-Q76PZ-4LD4X\nUBX3E-DCLOS-YEGB7\nU09BQ-U97I5-JRPI2\nLSW7J-ABCVQ-V51ND\nHTAO7-HPJHV-PQAAP\nLCV88-AESGX-QCAA0\nADU7Q-6UELU-9JTAA\nVPL7J-KL8A1-WJ9TX\n7LX5D-UQ2FU-SA8VR\n62UNJ-N8DJN-IFIFO\nMUDEX-40TTS-IUU2Z\n63UTB-B6GDC-Q66TQ\n1ARAV-Z10TS-WT3FT\nW00CQ-CR3R1-ZR3J2\nFIHHE-8B332-TBJQH\nF6GIR-7MPC1-HEE8P\nIGGDV-XY69G-YH13D\nCUTDK-R64OE-Q9JF7\n0418A-VX47G-369AH\nJWVTK-MUCXN-AAWHN\nF10PL-GTOFP-UOBB9\nJTTU9-6MP6K-EW556\nQ5IBD-54IEV-0SVYG\n5RI1P-409WE-ZS2D9\nF953L-C1RBF-NC3KP\nWOZIZ-74JDA-3PGCY\nVJ0DS-H0O1G-K4K9U\nFTC06-SLRUW-6MW6A\nJJC1S-JX41A-K2S5O\nHAL4O-XIUTB-2G3EM\nTR9T5-9NVEW-SHT30\n5W7HG-8XGFR-JWJD5\n1MAFF-6UOR2-KMTMC\nOGG7J-6DJGF-O932B\nLSD71-I5L7Y-8O726\nR67YO-CHCW6-WTETI\nD6ZSB-XR46A-UXERN\nO08AV-3O04D-V9S80\nCD0QJ-UEPX7-OEO90\nYLXQ7-KE5Z9-DRWN7\n6ZLE1-RW7WS-9IEAB\nRMALJ-L8AEC-WQTQD\nT5R8I-25UL9-G8LOY\nFUUY2-MT1L0-HIOLU\n3PUJN-1QWNB-XHVOC\n5YC9P-G1LHB-X7NN1\nGWE8Q-R23Y2-MFJHJ\nLGPM6-Y9ISJ-BIZOY\nN3GU7-C1M88-DAJXI\n815RR-NOOQ1-JBJAI\n2U7RJ-TNDGQ-B4DR6\nRRZX8-8CUGF-I4RD8\n8VCUQ-KHNIG-G8SQL\nIQ9JN-B5GQM-4Y781\nZRFOV-RX48O-NX1EH\nK4U5H-7BXUD-AJTC5\n2CM3R-QG8ST-5V4S5\n0GUQ0-VGPKD-AV51C\nUJ0GH-OTH9H-VFB5A\nDLZKG-CZKW5-6NUKR\nPQX6D-IRGD3-8YAZI\nWA5OH-ZRPBC-PIWV9\nSVU8G-EBA34-PA6EU\nWUDE2-BROT2-E1WT7\nSL8Q4-K1P95-MB47L\nIUYL0-6AI7F-XQH8F\n7CC6U-DGTSS-DREYM\n4X2BS-NGIEV-OL588\n7MPGL-Y2CWN-ZV06N\nXPGU4-ZA8C8-DNCOY\nT83H7-K42L8-7NEET\nFTSZQ-3CETX-2T3SY\n8Q7W3-UQPVO-HUFLE\nJHWU6-H7MGI-35LO8\nGVUZJ-NQT11-YAU1V\n943ZQ-6TOY0-RLLBT\n83HZ4-DNGTS-OQDFG\n6GD2L-7DMVF-KG67Y\nM7YUE-E3FBE-0KX4E\n12USM-XWMJE-91Q48\nXU84A-4SM9Q-Q00VM\nK8PKW-3CT0R-I39ZP\nESQ1W-I0FOU-AG2LO\n7UM09-0BDP2-BARKF\nLSK0N-0S483-AHAVK\n36WQF-UT5TY-9MHZT\nME1NX-UPF9O-T5FV9\nFV43O-BNF90-5A2NW\n0X9SW-2PCHO-2V8TU\nD2FFS-D7DAB-U42L4\n7JBLW-S8H98-Z1VZC\nEQLR8-GWH1P-KXVC8\n1EFPH-RAVEQ-K0B7C\nLHORP-BOYEU-01E88\n2VJDY-8NX9A-Z5QNM\n9D2MI-2BHDP-7PCF7\nXDA5U-UII90-PJEJ8\nKYA9K-Y69UD-1RYMV\nKG4V5-EYL3R-K1COZ\nN8EMR-AXAT8-DPD5P\nZSWAK-HEBAK-HJBF0\nLLKO1-5QI4T-7D3YW\nQUZ0Q-655VJ-FJM0N\n6E1BZ-GVB5Z-ZJOTF\n6XCLF-EUCDD-AXMG1\n0PAEX-UNLMC-X1VLK\nABZY9-G0DVN-LN1ZW\nMAYQ6-LARR9-OSEOU\nA5KCW-98I0N-PXGO9\n286G4-2GLP7-98LT7\n4KG3X-06BM9-TANWG\n11MHK-XIYML-PE55S\nJJJ9T-L2A8M-9LF97\nPR429-J2KNN-BEHRG\nNM7OU-F48QH-GJV8D\nPCHPA-BJM8D-4BW3J\n0JDPQ-4AAB5-ULLF9\nHFM7G-TK9P2-SSJWJ\nY0VYT-G4AZZ-J5U7R\nO8ZO4-JR277-Q0E67\n945PZ-LTDUP-SATP3\n9JCBG-49QEL-C3V1N\nDHLPE-8100G-B0849\nDNR7Y-ZFG8Q-S0J27\nT9BFL-JUOHR-XNTP8\nMCC34-R73XB-X47MI\nFDV1F-F0KM2-UVWIE\nPNF1E-D8607-GSK8L\nVBNLA-MEVC5-UVZFM\n4W0A7-IHT5Z-GMDBW\nT2W5Q-SLTM9-SSU83\nBFT8H-CM2YN-B9XKQ\nNN0YP-MLVRR-O91KC\nLV2NS-WUENI-JDRIE\nV22VJ-Y2SC7-5PLO8\nYRLWM-JWMBH-37W4J\n4ZEQ7-HCFAW-D8PTP\n0CD96-XQG1F-QF942\nAONQF-XU8Q6-P73CD\n2UILO-N9V51-80209\nH5NQX-RH6IY-6QHBU\nLEGKJ-TKGBN-C4B7J\nW859G-SJOME-X3HHT\nSVEC4-0D5LC-O8LCT\nA162N-H6BEC-OSJZA\nS0G0S-N13T8-IFG8C\nTL7QN-J47IE-S1LP3\nJTH8F-CS5PI-PZY86\n2YHWB-P53M6-LFZPT\nVZZ63-79KRK-E4F6V\nDKSSA-79DT6-6MLZX\nZ9JD1-RQ20Z-LPEYY\nEFOSP-FCY4L-Z1P3H\nUP38O-BLRB8-6BYGD\n07A8P-SW9M6-TLJXN\n0PTDX-VJUZ7-S871J\nPH7RO-7LHLR-X7KLD\n2K0PF-AQ5K1-D06LN\nOR9W6-ZJ3F4-G1DZ5\n8ARZY-VIP1D-0XBZ8\nQECHX-NUQZO-FYN9P\nTX4GY-XV36I-BOFPN\nWVD2G-6RQCX-LL1AL\nXFMCE-CQVW5-86UQV\nKFPQF-95A5U-GV1E9\nB9ASI-JV2X4-45GGY\n88322-QO9KH-A60S1\n12QLR-C91F9-XP8BZ\nT0D6P-D6J2P-MA5PR\n7PDY5-VS12J-NVHIZ\n58T8L-GNVHA-T9V7Q\nUTI8Y-XGPHI-JR9VL\nYBY68-EV83J-S66TM\nROAJS-4PXUC-MLGYN\nN0UDZ-8YUME-E7Z5W\nV4X23-5ADUE-Y7QWC\nK3NZ7-M58PO-09AQX\nKXF71-9CSWJ-TIKUP\n3GBGV-HZIYI-O7A96\n45YX9-JF0EW-EUFIG\nDJHFZ-XTEQN-A1XZC\nIK7LY-OQXLX-EPUHX\nC2788-1ZCN1-HH849\n4XQGB-OEHMQ-Q7YH2\nBIWGJ-ZOTG1-LXCVB\nAIJ5N-913Z3-CLARI\nSKOBY-ZVH9C-4S4FP\nM49CK-ADAOK-WBTWR\nQ9F1G-UP7VZ-7MHL4\nC5PQL-59W98-Z560U\n0VHRQ-SMQSZ-LUA3G\n5DYLY-H669T-NQ0L4\n1P77E-9OGZL-YQHJ7\nJQV06-FY0GR-E49YK\n3Y03E-YGI2W-TRCE8\n5Q87C-VW6C4-VSR8T\nFO7YU-DDW2C-L9XXM\nBA2VA-F0CP7-D1IDF\nIF9ET-MVYGW-N325N\nPOR77-UTDDC-JKIWK\n0AIAQ-0TY4S-NE8Z0\nXK2J3-A5Y9C-WH0EU\nGCCTA-DIW9H-DVYZ2\nNU55V-HNB9O-LEURS\n0AM92-IFDDT-9JEM8\nKMRFC-R4Q4Q-ZRYIM\nCI7KT-QPZTW-YBM8I\nU0DP5-BP7DQ-O2OFW\nZ9K36-IR8OY-1KEYJ\nP0LAB-EOICH-XG1LD\nHI05K-G92C9-S0O33\n7XOGQ-FZ5K2-THSWC\n67ECY-N3UA6-Q2QLN\nHCRIV-WTK94-H9EWJ\nGISFY-P5GB7-J26DR\nSNDKZ-XC5H7-2V3VB\nK0GQK-LBUPI-Y4DB5\nIJBSG-6BFWI-HI1Q9\n17YFA-7DM7A-349J5\nGB1VN-13TOR-OGHYL\nCGH0O-27HA4-HDL7L\n1HN2F-YTG0G-4X79F\nQ2WO2-M1SU3-WP8JO\n1VH4N-IQROV-LY1T8\nJZWQX-06ZN0-QKI1Z\nEVVF5-WH5V3-IIBUU\nUD2BH-EQE8O-87Z6V\nNSC7Y-VR12N-5HTED\nQ3U1D-XVMDA-YEQNV\nTEOK9-1FOJT-CT3ZI\nIOJWC-CILRY-EICLK\nVOMCT-4GA7N-AB416\nWVW7W-93TPC-3VCPB\nNSKOG-VW8RB-BCSYQ\nTG6ZL-C8GUN-BXVCQ\nS30H9-3F93B-W6BQ4\nP2629-2ZM02-NZ7KH\nB3HIW-RQJE2-RM0J1\n3F38O-KPH0V-WK0UN\nSN27J-MDWT8-I2JWO\nWOZPL-TEBOK-NF4IO\n1EOEC-5KDEF-8Q1LS\n91QR0-SFHLG-BJ1TW\nRPBTD-KXDDQ-4Y013\nI6JUY-RT4R2-SK8EB\nENYUR-HEVG9-PMOV1\nF1PPZ-35LSG-1RUEI\nBNWTI-PGGY0-K82FA\nGPN4U-GVKKB-6TAXF\nMCBZK-3CZE7-3Y4ZJ\nSMMNX-UYGP4-P0888\n2UDCN-9OHZA-YMOPB\nOS7E4-VA8GM-S55J4\nVGW2L-N3335-PHXTA\n6UUUD-RM3QI-CNPTM\n5QYO5-HYR1H-HOMTM\nC5HDC-QTDT9-QVKIX\n4HOQ3-2VYMH-76E5O\nU74HR-M1K0V-3CCAX\n5AHPY-48IVX-IOV0V\nZ53SL-ZQNNM-KZQO3\nUPZ7H-I8CHV-H8S38\nVV2UL-XEV3S-PS4ZO\n95CSD-243BH-QRK2F\nMX1YF-Z4RZJ-GTM0I\nG2RUQ-6F9F6-T83RQ\n4FT67-H3UZP-BS4PF\nVG7A6-T1IES-I5Y83\nUPZ5H-Z04ZY-9U6JB\nFWYC5-FBXQ8-MEAAT\nOXO6B-XCB2K-MAPRW\nVDYJA-GVBON-YHAB7\nRGBT3-X5EWM-PF941\nCOZ2N-X3LN2-XQD8L\nKPPMY-07PKZ-4BKCL\nE7RAZ-928IN-P9DHO\nJM3VP-KJ9I5-0G1RX\nM1CGI-DQ9GV-HQ9SP\nTHTA6-59ZZI-VGQKD\nJXK5W-10BX6-DJDZB\nGLRZ8-WKPJ7-LU3SD\n62JCN-V11MQ-MOC3D\nJ7UNU-FQJZB-1MRYQ\nX0B2X-VZWL7-F9DDH\nZCKMI-AYJD2-FQOH5\nTVHQE-9WFND-Y5K8O\nI3FDS-FLE9K-9A8FH\nR0X5D-RD6PQ-JTD2V\nIC80L-8UDC7-A1I19\nAL66Q-S2CKH-1H8AF\nMOMOC-CSG35-1JDB0\nKYZ7Z-TPB5P-G0RVZ\nCPCGD-V7P0H-GI0ML\nY7SU6-9KJW4-KH7GT\nOTSZW-QT0B5-Z1E3R\n0DM72-CT7GC-W1658\n5C9XI-238WL-J5Y5D\n8T5EO-YZQ2Q-TGG3Z\n5KE4T-31VXH-2SJOP\nW9SPU-Y28QM-MNHQW\n0N860-NXGFW-35806\nYFVA6-KTE0M-1HFRA\nUMHPS-8TBLO-ZXE7M\nCZOR0-IY90P-SX32S\nBWNE8-D7F75-87D1H\nX1AFD-WUDAN-M8IES\nH50YP-NPDU9-8HVZM\n6CKWC-I9CJG-AZSMY\nBVO4F-U02K3-0RDVN\n2HGD4-RRL76-4VCOU\n0VRUL-F7GOI-59RV9\nM26TC-LN2BB-FKJQZ\nB989T-A02KZ-9C5Y1\nEDMAP-ABG5W-95HIX\nA1NMX-HXDKW-DISHQ\n8J2A4-ZV78E-JKOHR\nS2BDM-EF2JP-8L5ON\nK11PK-7LYJF-7ZNWV\n1OP1A-U02P8-9R6C5\nX0WYS-22Q98-ZOIG6\nNK6XV-S5UFH-CUTUU\n0T0AI-Z9IT5-MS1HH\nNK3WJ-2YM54-7K1DC\nV69J6-4XIOF-UYTKG\nAJH11-GDXS4-ANFTU\nC7GPB-6WN72-I7L8J\nPARY9-Y54LM-FNPDZ\n9L36F-W5ZRK-VIVFN\n20L1T-IQDEK-TQ9ZZ\nU2V86-N2YZO-KQVC7\nIG5TX-P9JLQ-AV498\n5TRNR-P3YRV-NXFIH\nY8QX2-YVQAQ-D93XU\n8TZJB-9JEOR-ONHQL\nL9G9K-5VFBW-UE7HR\n4WHIJ-5ZDHK-7589F\nBZ609-P0E1E-R87J2\n1YCJL-D1LCO-CQHBB\nA6ZE7-QDW9X-15JIY\nPBDYO-21ZZ8-4VMTO\nC2F4C-OBK4G-0GMTJ\nHLTP5-PFNLQ-LN6ZK\nBFEWH-K6CY5-9ABYE\nDVSFB-J0TFU-1WT5E\nC6KE9-HEH02-VY3FI\nNIDZR-VZSD4-H16IA\nRVG0O-SK3ZZ-R2YJX\nZ74KM-1EQ47-Y0REC\n1771F-78T7U-3TI4C\nY26XT-NOXP3-2NH9F\nJSATH-JGGOC-8P4EI\nXREKJ-DE2MB-7N5BA\nKZ82Q-CG6AY-K5RTM\nJ7JPR-ML8N9-4AQZX\nGFXAF-Z8RT4-C8J5R\nWVRV2-QI8HW-F4M5C\n9RQG1-O390I-8WTFF\nU0UER-FZVOS-PWI4S\nLMPZG-YK6DH-7X46X\nF58MO-IWPO8-GPS98\nWNJNY-ZWPAZ-NZKN8\nN4KZE-8I37K-OTHEV\nG37C0-MKUOY-ZMQH7\nRL5T4-ASSG3-YM1N7\n82R11-209ZT-M826P\nGW7B8-OH6RD-P4GT3\nHTVD0-W6WAH-0V3KN\nMKVUH-L4WPS-6E500\nNG6AB-F7CY4-NZW2K\nA9320-SQPHJ-YV32K\nCVNI6-48OT9-EG4ZX\nB6V7E-7XYSD-M2XYD\nUORRX-IIOC7-RKZRG\nTZB4Q-PZPRU-B9E17\nS4QTM-M0MU7-SZ2W8\nN8PNS-JSH52-GODY0\nVQJSK-71LF8-T1YPS\nVWDIT-RDDY4-G7EYQ\nBPY7H-U8YKQ-4EFD5\nGTX55-30VB9-J54P8\nANSON-3YR90-VXUWP\nRAXVB-HT14M-8JXKI\n6A2BU-QLKX9-HEPIJ\n97SGB-79P4L-60YXW\nJDZ9Q-QXD42-LA5GC\n3I4O0-TDSY4-DFQU3\nMZZ2A-357IL-0M1E1\nQCAG8-Q82EU-OWAGZ\n5EGDO-9CL0O-CLIR7\nUIR3U-5Z9ZO-FYMRK\nBBQ0K-9LXAQ-2OB0X\nZ04OC-VM6Q0-ESFYW\n2TKOD-MJUW1-UM4EF\n4CNR9-4NACJ-BXKM6\nB2L2I-1S134-JOTO6\n3T0U6-44FUR-9045O\n0U32W-QH8KV-M0933\nJBIBO-I78Z6-CY24R\nFDL52-APHKA-IRLFF\nWO82H-OTM2E-8OO2X\n2U9QR-G6H1V-C9JNU\nWT9SN-SNQZU-MPV1T\n507VU-BRRK5-80KOT\nVYJPY-3T8F5-OX1X0\n35G6T-LW8BU-TDY02\n0NGI9-XQMUZ-RLIH8\nD8QGK-H9Q2D-FVEQL\n21WQG-7EV2U-39YY7\nYREBI-LEBPK-9X8JD\nV99K7-LX7Q3-CJAVP\nKVGDJ-G4J5I-YTS9I\n3736G-50P4S-DXK2B\nN4XS6-UVBWO-Y85FZ\nXPSDP-V2NJ3-SOL3S\n2FACX-ZG0VM-GA1Z0\nUACJZ-OGE30-ODOFI\nZINO3-HE2WZ-42Y3X\nDD9UJ-ATX2T-CNVA3\nX73T5-QZGRM-QWH74\nTAWRE-9MAG3-1V87H\nPSHHQ-LQ3WL-LMJPI\nCFYX7-WE6T2-BRFOH\n2RDIC-4L1OJ-7X6IO\nI8RHB-RV62F-V48UY\nX1OAH-E8MG9-A8O8C\nXEWM3-HNDCS-RCA2J\nDBPWL-Y6WA1-1TGGG\nCUTTH-8IEP0-UN7G9\nNRH3C-9KRB1-7P7DI\nLLQWR-SXBBA-VUUGZ\nR0OH9-CT8Q9-FE7OT\nAKC57-KDG75-R2TQI\nAQYUP-Y404Q-0MX0A\nAAG9N-6BPBH-5WGIZ\nG5A6D-3K2E6-SH89R\nMVFBQ-4Q9A7-DFYES\n7BWC7-GN16L-FIP1M\nR3SZU-ECO64-9KLP2\nJMFBO-RRFNW-785NI\nGNS1Y-99RS9-1QW49\n5BF2Z-0Y53O-ONK5F\n50M95-RZT9I-D7JEK\n51R7Z-2TD2M-P0ILK\n4MZA7-LM0QG-24366\nJV6BR-0ACE0-15JUB\nWD7RU-7TEWO-FBIWC\nPEWGM-BLTOD-QGQ5F\nWAMV4-PBSEF-I9K2I\n8KZ4Z-6SS7Y-XWGD2\nK92XJ-NCQO6-1YNCX\nUWHSE-C5Q0L-KO5L2\n2QR0X-A8ANW-83YGI\n1TNNX-OAO8H-7QT6S\n4GJJZ-1RNA7-C2YP5\nXMNQD-1LI4R-J3M0Y\n50BQD-L05WE-YG59I\nQ7U1R-OWZEF-BXOET\n3YJFM-XFSG6-FJQWD\n6MBWF-22EJQ-QHKBE\nCK8UA-GMSFB-IW6RA\nLB2CZ-8FA75-IZ7EJ\n63WSC-X7QJD-HD6LH\n4Z7PU-XWHDH-35D9C\nFOLI4-XZ2O5-YIDTA\n3UMZY-U0GBU-78O8J\nLN3YH-QURU4-J8WHU\nNKP0E-VHNVK-8N0W1\nS10VI-M5PAV-VLRYL\nLSDKB-XY401-JNGAM\nV64VB-3M5DG-TWTFH\nW8LBO-QXPVE-6H626\nF1JBN-B2240-1RJDG\nBVI19-08E1H-CHA5V\n7CKM5-1W28J-9SEIX\nJFN60-0VEVV-TRJ3K\nTODC2-50RWY-9669T\n2XN7M-TH4BU-ERN3G\nWD5WC-3VY31-7O9K7\nEW2AD-H6PZE-Y93JE\nNGH4B-1T7N5-9IB7V\nF63A9-5TIQF-ZW5FL\n92G7I-AEJJB-05YNX\nNO1U0-UXJQN-TI87J\nYALLH-5BCWQ-PJKXQ\nUDLDN-ZQDQN-5K5HY\nBBTXW-5WR56-0KWXH\nVYKGW-VKCWQ-OFHBV\nIL4ZR-4IMYE-F1YQK\nHGWJ5-6R59X-QSBNR\n6OZ2I-FDMYN-0T6SP\nQ39NJ-5C9W4-J4KQ1\nBKM5T-L0SS3-D2A2Q\nQJTYD-A7N7Q-YZ0EA\nNZ0EM-Y8P12-FC2AN\nBDSSA-2V5CD-Y0QG8\nKTG1S-RK4AV-BA6IH\nAJQ7U-QFQ33-UDC2S\nKA2XH-XLACN-6VA96\nCJDD5-ZM9KI-XTZOS\nI7MF3-09ICK-3AL69\n4KJ04-Q4W07-FQFDV\nP4KQ5-JKQIZ-TICR6\nUL8IJ-C1ZHX-1MZXX\n6GPL3-TDMIT-LA48O\n3PHNJ-TYI8Q-BW4HD\n683FR-M9JK0-KRG0Q\nMBCRN-L6EGS-MPQ08\nPOK43-YVFGU-8ZUT7\nUHN0C-NAVI1-IUTVK\nM2L53-4EHWV-CWX54\nJRW3C-UUVGG-T5V61\nRQB96-PXUX9-3LWPC\nAOT4B-I0BGR-O7619\n7VAQW-QQLCB-OAJBC\nYCN35-QAXK0-KGIQS\nE69AI-FMVGR-0LXGF\n43MFD-QMZUJ-Q3NKF\nJODIB-3Q5UL-23IPO\nXUWFR-15Y88-4S553\n7Q2VX-2RVW5-YKDB8\nUGU7V-ILJDL-PJGQF\nX3UFE-60AMV-0HJ12\nE2JA1-7CEJD-2MDGO\nVF6DC-GZKIT-S25YV\nJZKSV-UJP0H-G360P\nLPHL1-NKG8Y-GI32S\n0JMKN-ZZT4I-J5J6Z\nVD4RL-NHLQ9-NDCN4\nIJGM6-VLS2C-W78AN\nXH1O5-462XL-VVVKI\n9LCEU-6IRAH-63F30\nW0GWW-J6CTK-IK3A4\nFN1ZJ-D5D9E-Q67YV\nLV77A-U123E-8J43M\nS5QSJ-NHWJY-FEC1T\n762GU-Y446A-MW70I\n345SC-ACJD4-JF55G\nS4CGU-EWBY2-VYW1T\nSLJBG-F84OU-Q90QR\nJI2HQ-EJOD2-18ARQ\nQR33X-DTCMN-UCU3F\nD4X6V-4NXZ3-JEKBX\nPK9G7-XQ051-YW1BU\nZPRZI-SBMNN-7CANN\nKJYI7-WC5AR-73UAC\nSBYRC-AAXXK-HB3C9\nZ5A5C-U1TV1-ODJDJ\nTCB3J-WQ7C9-94OK4\nQB2M5-VSSOH-5QJ45\nYZI7X-LQP6J-P8KN0\nWW51Y-Y2C19-VWTYP\nF4OT7-2XVSA-8U7V4\nJN6T1-SUGFZ-RPYDI\nKW5A2-G5OWE-6L99U\n0VK5Z-Q0PE5-MWTGP\n686Z6-9WY50-86JS6\nHRUD3-N3Q87-WU9DE\nWMRM2-KCCOI-FAIVQ\nK6UI4-0K7AT-EUSR6\nO5C7K-MUNMH-LRB00\n4P45Z-N2MFW-MYPR6\n3XOZQ-J90CO-EKF72\nKORN6-VTXCJ-8SXKG\nSQFYZ-N8ZMJ-3VVH0\nOJLL8-0IF6P-MJIRA\nL4LZA-I25EG-4AO4A\nRYQJT-ECZGF-TB4N5\nV759A-HW4DV-3PR0E\n9CLWP-G1K19-V68QQ\nA1L81-E8V0I-STOM3\n0DO9C-1WA5T-8G237\n0KF2I-MN86Q-93XLS\n6D1D3-00I1M-AVZ65\nQ00MV-EL9US-0TY9V\nX950X-UXLZH-1AR9K\nXHNCK-SO064-XFY77\n4HVP7-CRFV7-0CO6C\nK9LII-SP614-RAX16\nZLCG4-LH62Z-FOY75\n5IJJA-T8QPX-C9I6P\nTUSGS-FL9HK-8CEOE\n1TWDB-2M66X-LEGPV\nS60JG-8A8EG-CVSLA\n8BIEP-6SFIP-8UC64\nZ3GNN-VXIGG-AWGTF\nY2ATV-8PRM3-4Q4M6\n7G67P-S0VM6-88UXY\nIYRNO-7I7I7-YFVYK\nRQDCU-NNYRP-UIHT9\nILFVW-6BU1O-HNU9Q\nAI17O-JQUVY-66UCK\n6R8D1-RPCH6-DQOZG\nK6KVR-GBZ8Q-76X59\nWB4MY-CRBIZ-YHBYE\nFHPBS-8LEKO-E5U7K\nOOYPG-VK5YS-4WWND\nKSA87-R3AQM-J63E1\n75D6O-0TTUD-M2V7C\nDQL1P-9F4MN-YYVCK\n8QURL-7T721-3K456\n4VT5C-VZ47V-5W6XX\nDBQUM-OH46Z-1PE4Z\n9XDFG-9WLCX-OJS2L\nPTIAZ-TFOJM-AXPY9\nCDTPU-7PSH7-MNQ2P\nRN44H-KRYUR-4EQNQ\nQAPKM-LATYU-CATPM\nSAB4U-D56DK-7Q41A\n3K501-8QN2E-PNYF9\n6Q75P-S0K1F-G8TZ6\nLCGZ2-OMKYN-B1FLC\n4EOEK-6KRNR-00GDI\nG3ZC7-HCAV0-D2NHU\nD9J86-TPZ6L-GQQDR\nTCKDO-8TV27-PT3M6\nODYOT-UUOEA-D6SF6\n8KAMQ-86PBS-73ZCL\n9AFFE-NG2K6-1S4HR\nSKYTK-NZB8N-KZYDW\n1Z0ZF-JM5CD-SRBAD\nCCQK1-OLVS7-Y4ZV6\n5MCIC-37XGT-UEDLX\n7TTGM-C1W08-C4F4Q\nYPG34-HSCGZ-2KH5L\nJB7CY-FZXVM-1Y9Y2\nA2PLD-ECUEX-4YHRT\nN239E-FEUPR-9FHN4\nYINLU-T05DZ-MX0Y1\nPCHMZ-0P0LA-IPYTI\n63MBY-5KA0E-RVY0S\nASSAM-JEXE5-C5ZTH\nEWINB-ETAXD-Y8ROI\nN1LQR-CVRLM-GV0HY\nZUJDM-G9PEZ-VLKH1\n99KBK-AETNL-F2P0G\n6L7PC-A6VOH-W8U51\nNMJLE-09RT8-PFBDP\n84I52-2RRJS-OZT23\nNT6Z8-GVA7A-LNFQ6\nY35YK-7JPDO-LXOMQ\nH9COB-CXXF3-6ZDQY\nI5TIC-UXUCG-2I8XA\nZ4WG3-5WDC4-9BEFU\nYL9PN-XXBBA-8COET\nRVCH8-0K8YO-2WNUZ\n5O12M-M9KCS-27KP1\n4W53E-GGJHM-6A4LA\nXXX3D-VCZWR-4O2Z6\nLF1C8-KUO7V-RX7M4\nG0GAT-PKTBC-QUDI2\n8NO01-FIFD9-V3KX8\nZH2XL-Y79I2-PJUMP\nJ3AQC-I99UY-Z5DA1\nDRG9G-4UPJH-RHEZ2\nJ7E5C-SG41Z-D6VR6\nP4PH8-GZRKX-VFTPF\n42L61-MID1E-TLID8\nOHAA7-OWV9X-TYVDO\nK3NSZ-9F7IP-VAUHG\nVQ2Z6-PVKGS-A1V37\nL1NQD-AHSFJ-NIXP5\nPIMS9-7ODLN-KCHZW\n6XQNV-H4ATN-HL4UJ\nQAUTR-02ADS-FERTX\nPCIZ7-XJJ2M-G01DZ\n67LNO-6TXQ7-GRMAZ\n75SMU-R3NPV-9H6F4\nWGLOZ-ZL6CY-E2BHH\nH1VYG-G33F7-RD4WY\nIXI89-NV3GD-M52R3\n3AFSO-I79MQ-ZEQK6\nMR7YK-UZK5R-TFKU8\n7H27B-LNOEL-XGR0X\n75SFX-NACF7-38KLQ\nLGHEN-4SN5H-90YCD\nGM14K-2UNQ6-GXN67\nF4VV8-PAD47-MLN53\n5UUUL-M0JCC-WXMHC\n37FBU-OVQ2H-O8MZR\nQWAZS-H61KJ-BRCPU\nFOTPK-R4MMB-OD2HF\n2PMLH-R656J-SF2QQ\nVVPF5-H06WA-8CNHP\nVE7S7-TVOU9-O3NLW\n92FBB-ZQJ4D-TEOJ1\n8BJSV-SJ9GD-Z4WNQ\nQGT3K-ETDXA-AYKM2\nKFZN3-CPZR1-FJBI3\nROC8Y-LIND5-FKG6L\nJT19Y-HVRB1-ZTNY1\nA69QH-VXX39-SKAT3\nRY98S-7VTAB-AD4GZ\nAZ4U7-W4152-6RWUZ\nV2YC8-CF5YL-IQXT7\nBQ7MD-RLOJG-J2SNI\n8BNM9-7Y79G-7G7VQ\n0S1CL-S94GI-2YXDQ\nQUGRB-W550Q-QU3YY\nUQ66O-GPWLS-CZQ3F\nQ9EIT-NL9XY-TS2SJ\n0OTYO-C4DJR-03K09\nKUHAJ-JGSGM-8RH9Q\nJ7SP9-8OAB9-E4BGA\nIXTDE-8O6LV-U20IR\nEE5HF-6CAKW-OC4YX\n6XIAP-2ZLWP-UK4RT\n19I28-N2MS0-ILLDE\nX95MJ-L6QBZ-W0QVZ\nG8OEW-5KDWG-OQLKC\nAO3CD-SU5K8-8YARY\nB9QA1-RT79J-U3FOY\nXZKQZ-K6RG7-HMVIV\nEFMFM-GK348-46RFH\nWYFCE-UBPN5-VHPNH\nFPSIR-VMUFA-YJMHP\nVS8VB-TSE9V-XDJPF\nKGEGE-65J9F-67QPR\nUSJZQ-SVJ0R-SR87Y\nR773S-JXLM3-38E67\nL50OF-P7CUJ-VP7UY\n7BOWQ-4XBFE-LG72Q\n1RXP8-MYQ59-LFPRG\nGWIHU-IK3I9-ZN2UF\nGJ4MG-A72T1-AWAL8\nW66UB-NQN5C-4KXAH\nE9VSE-NATUX-YIXH6\nF637U-3OBNR-3EBAX\n7NVSZ-NRFPL-JNWUM\n6IHVJ-F29HA-JODSH\nJH1QW-YM1RY-5WJL2\nZP736-4PSMV-69XDN\n37MQQ-7AYR9-IMKPV\nJ70YT-YL58R-QIP9S\nB3I1J-I9L2T-S590H\nUEFPS-F7IDV-M7ZVP\nH4R5F-J2L42-W39EV\n37CP9-FPXVN-VMOXL\nD0IW3-D4P53-58YET\n7BW69-PWVIK-IAWWR\n8W2V3-26WLI-0A2YU\nSXDW5-HX39G-MMKQJ\nT1UVN-MOSU6-AMF7I\n6I3JZ-1Y3TV-OFOYP\nCZ0S7-T2OU9-WGWP8\nNMO6S-NJ4LG-WNXSU\nQDILG-SXXZZ-OCMRQ\nAJ7EF-ZCJV1-VT4JO\nIKV62-A1QDH-6NA00\nKHC2U-4PQGC-JRB2V\n2ITCY-RXZNM-XKUU4\nV74KZ-X3KK5-6WI9D\n0P8SQ-HBPY8-174GF\nFNM90-VIMKY-Y8T91\n6H155-JE74X-UABYG\n6BOJ1-0IOA8-A21NH\n80NSJ-HOPQR-ALJL9\nGY5TX-EB16O-WQH9G\nCX39J-S0O62-F5MSO\nXC8FB-W5NVL-SRXIX\nJHU5K-ZO7GC-TNBSB\nKO8CH-XDWXF-C4U59\n3N4RK-1FO5P-LVDE5\n1H1HK-OWSL3-1U50N\n5TYY4-74HE8-NJWKA\n0WIVY-CYGPR-EW8IE\nMPOQX-RALGT-KF4P5\nF39CH-5DWZU-FP9R1\n2UXSI-OBNJV-B98NW\n9QQQD-4I2O0-BRN61\n9UVOW-X9TMQ-QSU5E\nPJT5N-LK6A8-95QYI\nTJF8B-SQZJ1-UYETT\nKTI61-B8113-S64IE\nTMG1F-VUHNR-N38R2\nT5KT4-Q0V14-HYJ3R\nODMU8-JT7UO-2NP80\nQ2CWS-FR49I-WNABA\n2SGO1-8I85U-CUWRI\nPJ2WL-CEDR2-CFH3G\nVU17L-0O8N6-UA5X2\nVUV55-Q8B7Q-0BQWJ\nPETTV-LJ0MJ-X4RFU\n58V0C-UXBA3-IW663\nHIFZ7-TDUVN-AGBQP\nCAK2Q-BIUCZ-P4YSS\nCIVRQ-58VHA-2ADII\nFL5M8-3NCRJ-CEP23\n0QNHI-QNPVI-8P9VJ\nV3Y29-3G4TD-KJXNJ\nRICLN-D2YMH-W3TWI\nTN56W-P316Z-VH0LS\n92U9C-IQFS4-UWLXR\n4ZET2-0AZI4-5M9E4\nJ3XBF-PHGBK-81K8E\nVNITY-QN1X9-RPBKB\nZFO8A-H3VOB-6ZK4N\nIL4NA-NUBNM-DCMNH\n7WXBF-O5CQM-QG9NL\n61BM2-TE0D6-M3FI9\n12R17-TFQTW-YGQHH\nPA5RF-O2ILD-NNVNC\n11W46-EVW6W-6VGEZ\nXO92D-W3OLW-8F85N\n53PGU-Y6IUO-9H82X\nOD4DQ-VUUO2-TQLZD\nMWTT8-6LRHJ-YEOJ3\nM3A0S-AF97C-QZOVT\nLKKJI-WILVK-QRRLZ\nJQFXC-ZFIY4-8GIAC\nQ1IT2-TCYQJ-HB7ME\nZB36R-N3LFN-7CW5L\nACTSQ-W6RYP-DGQKO\n2FX8H-WUCB3-CRMZM\nQYOY1-VOTKH-ZPK5Y\nH8HFE-V5GBR-TD0DN\n96JS5-EQ4MU-B4041\nUZ17K-S8P4E-P3PDS\nR2DPW-VBV0U-4LFDL\nJGIIX-YOGZ3-EBM3T\nC7AA0-U08U2-ZB35C\nSRJV0-S4RJJ-AI71J\nWN3WR-JSVRG-9INRQ\n5Q898-TVFGF-M35EQ\nUA1EX-R9T6U-G94ZM\nOW8O8-N39BE-Q3RRI\nFU4SN-AQFB3-GA4MY\nKABVB-4XH9U-I8XV3\nZ4HIS-OWRR5-NNA0B\nOK233-PX3BL-M89BF\n1E2TV-XE7BH-56MXH\nTI9QQ-QQT8A-RFLQ1\n885BM-V6MMB-NQ3A6\nLRXFF-EPZ21-OOKE0\n9CVEJ-WDERI-XCBSS\nIEW9N-EMEXX-SJ8KR\nLUWE8-EV11B-UYEFR\nXCYIX-73CFJ-VSVOF\n3UQN2-VMH7B-VF3OC\nY601Q-Y6HPH-ZPNUS\nA58D0-Q6DVG-MTW4A\nMA4GJ-5990V-L7H71\nJ8OXF-OM6HT-1W0XS\n89Y6R-SIJT6-3OTBB\nGGV9G-NX359-NKVFV\nTBBTD-ZN0GB-LQNUN\nM9472-DUQLS-3G12M\nE1FLY-TBYW0-SX04E\nNGJ99-LFGM0-TA88Q\nL8EUD-YKR4W-WD0X1\nEDKEF-3SPOU-YFKO3\nQEY2S-5WV3E-8UR1Q\nBDTT9-PW7HD-D3PGO\nWPVCJ-C8110-N8A9Q\nRR6T4-5343A-B68W4\nXPB9M-63BH7-HI64C\n277TK-NX5AF-ZFTZR\nJFVLA-JABZM-NBN46\n4O75L-AQ6BH-D1Z18\n0BF10-3DBFD-60ZPF\nMIO84-UY45M-3Z5RB\nB4AT6-ASUSH-OJANT\n2WIXE-BWRIA-9BJHM\nK4T4J-5P4U4-G0LL8\nZWKEN-0U6GH-OQGMF\nEGLJ1-GNXHI-Z1QJZ\nXAGUU-TWGHS-X52WA\nOS74Y-DJ91G-HI37F\nOAMZO-350MH-5U81H\n66WE8-9CET5-A7G0Q\nG0P2B-DSNN1-99ALS\n75NR0-YVK8I-J7TR4\nKLUFP-023CJ-V7NAN\n0CDOH-0782Y-9JJYN\n163CO-S8570-B3KO0\nY4JEZ-7MGD9-QPFI9\n8ZUXO-NY7G6-9CSFP\nPLVCO-UWIJN-5NCLN\nX4RDY-6AM7N-KH5LN\n4YMZ5-36DXZ-A9QEF\nRYUJ2-AQ8CI-EKD0B\nXL5JM-B5XYO-IULBQ\nOYGPF-HC6KM-GSPYS\nAX16E-9UW8Q-3XSRL\nTMRO6-9D3XL-BU3U6\nZ28W1-PLF35-0QRJX\n8TAM4-HLBLC-A7ZUT\nGEE3J-F8A88-JYDUG\n3T4PI-B9A39-5DCQJ\nVKP6Y-YX8IK-LWXN5\nETF20-Z4J1N-4F4S1\nHJURB-8S0V9-MRQM8\n0FAJ7-KKU6M-29LO2\n4I4MV-0Z726-2KRWG\nKIHVO-JDJSJ-2CQLM\nLT86L-99STK-INTGZ\nD96TT-WQFK9-SXDBQ\nHKH7Z-WOMQH-SO2TI\nJEAS1-5S1VD-GRM3W\nYLGIA-EI9M6-XGC84\n66ZGZ-6NKC1-WGR3J\nYQIRE-126FQ-XX70P\nMRJQ8-MZWIO-8PFO5\nQL1IR-WJW44-LDBQA\n7MEVC-OXXAP-KKP1C\nA5127-TJ1Y6-97TOY\n1VP40-12N81-W7512\nBGXY1-EE9FQ-LZR7H\n1GGZ5-37AOZ-OZVLZ\nGV6O2-ZZBF0-HCPAY\nVHKEI-UC7S6-LTR60\nHQ52E-32S53-GFVBQ\nYITY4-0105A-ADPCS\nTKVPP-WZKHK-V7WMI\nH96N3-5A7HT-F8D61\nIKQ28-ON5SL-CJ955\n2LNHA-22T53-6ETWZ\nFEZM1-IIGT3-K871D\nUM5XU-6ABYK-AL80I\nYY2H7-4OF3U-FW9SB\nUCN48-YOP0Y-35R84\n57JEO-6A4WS-N2C7F\nCQK5J-3242H-9LDUM\n2PP7S-4AXT6-SSCAJ\nKZPAZ-YWS2O-BP3YB\n0089V-J63N6-8BCTD\nQMPUP-BESFE-YYYG8\nVKCQN-0MU5J-LMJA9\n4UAHD-DL170-YYXYQ\nAECCV-OKL88-4083K\nETNVH-YG2L9-XLL8C\nKREB0-UKJ8R-MXBSP\nXLV17-FY67N-CFUEA\nFKVGJ-2P7BQ-HX36P\nOHZY0-EMUWW-GVV1I\nH3EX9-H9WG1-VP5G4\nCKWPF-P0SBH-WSRCD\nO2IJ7-9X30B-J6V1C\nJHC75-EYBDU-VAXPL\nI0ARA-KHNCN-LV56W\n1LUKD-ZSNZK-QICSH\n2B0YG-28Y32-L36Z3\n423SC-LW1VI-ZSWAO\nXZYFA-H3HWQ-J39FW\nGT7MH-ELBWX-SPO8G\n5FI4G-UTW6Z-8LDHL\n33HLD-LD8LU-J0A1Q\nZJKZQ-573R9-6FG5G\nI1R1J-40W3B-SJNDH\nXWS21-BPPQB-W2VGY\nXLOJH-J00OV-T1WYI\nM5D5U-DU2Q3-6JDKW\nIPKC0-4LHO4-DFPJQ\n84VYH-M45HY-U8V5C\n5IGXV-OZQ3Z-RHHT2\nRQOQA-E5D5N-G7DSF\n818KJ-10XEE-59UWI\n3PL9P-H17F1-E1329\nZG1AT-KRZDH-SSWO9\n4ZSZZ-E1GAI-AK9W2\nW5M0W-TG8LT-GWAPX\nKTTDL-XK76G-BE9OI\nIOVNA-7D8AA-LWYIM\nOU9FG-NQKT7-NYG15\nG0AV0-6SF36-YGZ3E\nS0OR7-48RTZ-T8LBN\nI7WU6-EJFB5-GESY8\n7IKTG-29PIV-19AIW\nEL1B1-MV75L-MLC8V\nWXM15-MZGWK-HJSEG\nJ7OI8-4YLL9-GQFQR\n8PK6P-KKMRK-2IQUF\nZQ7W2-73P0J-CYWU9\nPQ96Y-ZQ5EG-MGHNB\nFKU8T-6GHM9-V480X\nLK406-5VLVO-6ZBVY\nHKG8A-HK6WV-FFS2K\n6QED7-2G3T2-K9FU7\nXWHY7-3NT92-C0J9M\nILN1H-0SOBF-XKX56\nS6WO5-CXYIP-REDO7\n9JKIW-5OXBR-447C5\nZE6UD-HDE87-KVO1X\n4099U-WTRY4-TQXYC\n2NXE2-088M7-2XJG0\nTZC6N-QY1PC-O3YVZ\nYESES-T8D9B-KBFMZ\nRUXTV-ILHSN-WHEZO\n6Y5H4-YHK39-WZSFH\n33WRA-7PYXZ-BVOET\nXM7C3-3K31P-UYKS0\nK83FH-OR64E-CV328\nP0LY1-W8W00-C65JK\nL900K-0XL2H-DIJQ8\nYQM4V-0HH7F-Y1J1E\n8BMLQ-S4ME2-QGMUA\nKVCG4-6XNMO-7UR2F\nBKQR5-G8CVU-QAGKQ\nDH9FA-Z2D9O-3Y842\n7IMWR-4ZQDU-EIA57\nNETD0-H73D8-W2SIB\n92272-E7VJ7-AQU4S\nSJS3T-PKQCR-7ATDS\nAXU49-2EYSD-BPSUS\n62VK1-UL8HN-JNWUM\nEZ5OV-YFF3K-BKD83\nY0ZQH-JW3PM-WK03B\nDX1SU-HOVMY-C2B9O\nCLJMG-RLDJX-6RQNS\nS4GQP-5369S-O9X9R\nVH0A0-2BHLQ-QFPAX\n4GK1A-BZXOG-PTR8C\nF9ED4-FHURG-6L1MS\n1AW3K-IKKD7-L0LQT\nUUODU-JHY9X-LHHU0\nAN9OO-SW8ZT-44KAL\nZ9IGR-MI392-Y9UYH\nYZV0I-HN6WH-RXLRH\nOKPPQ-DHRLK-M9X5T\n9WYM3-NVW1F-IP8IQ\nDG8UJ-WU66D-JLZYJ\n6VS2I-PKCPA-HEBLR\nYBB7G-DBCJB-YQ89L\nR20O9-WD0S0-3OQGD\n9LFW0-0HOU0-N0K50\nJH27O-01V6W-IW159\n0R084-VB3FY-CRMV8\nYPNHX-HXY73-QVQW1\n4GNHN-6TB7P-9SDNJ\n299EM-HZ1SP-ETGN3\nZ7WRA-F81QV-TXH1J\nZNWYT-RR02C-CW82G\nS918Y-IXBYP-GC32R\n5NXM9-7JSJ8-XPO8X\nNM26S-S1G3K-GU0YQ\nVLEU0-4APK0-TFYY9\nQGISV-F1EA5-1HLHA\nZVNU4-CA8CE-OK3H1\nF9H30-29QQ8-VV8CD\nMVG29-VMDQX-RHVU8\nSLQA2-VTDK3-MICZY\nQP46I-25L7L-1A4NJ\n819ZO-R3K9S-46XU0\nAHJCM-C3N2Y-51HGA\nL6GVT-XU1I0-D3MGX\nCVSNQ-WMLO4-IDHLF\nQAD2T-6X4LX-R0OQ1\nE0CTN-JCZCH-ZB63N\n3BAZC-J8T9Z-P959X\nDLLNN-LKABB-MFBYG\nJZ3J6-QV7IU-VY10T\nE7H5H-IW178-6G0BZ\n2WP5C-S36K6-G7Y1Y\nRASMN-HIVSX-T6QDP\nPCI7B-ZZDLK-L2KAG\nULDPT-TAA4E-Y8JFJ\nS1VZU-V1UQG-ZRPRW\n477SS-TNK3A-A20JP\n6HVZF-25IKC-1KIBB\nSM2H3-OPQVG-ESUOF\nYEB05-GR8B8-S7FFJ\nP0HS8-9KKBQ-CG6MF\nG2OGE-3F8PY-52AHJ\nTXX6W-1F1LS-N6YB1\nSAVWL-B1EKU-N66A2\n3FJGA-MPV26-46GDK\nAEQSP-RAI6W-1AH8H\n2C0KM-L439T-7Q01E\nAVCE6-PV9V5-S4STN\n3U1HQ-SO65Z-LT1VV\nIPNRK-LSGRB-HB2G6\nIE5TE-KF6NX-HIDJV\nOH0T6-CSF16-SYISK\n4ZBD3-W9OYU-K2ZH6\nTPWHY-YW37L-OOI4R\n0V1S5-3ZBVH-XL3SO\n7PS5B-2VN8M-XT7PS\nCJV3E-8JNYI-BUJWK\n89O0J-BKAPQ-5OZ4W\n14V22-5DY6L-YHPEN\n9ZCTO-PTUZK-GYOYL\n88FXY-PIAMQ-41H1E\n0E1U3-DFGFU-E46C7\nREY55-6NR57-UUSK2\nI0ZUS-GAO3H-JDEXQ\nHP5C9-WLQR4-NX0L6\nTPPVB-0HOG1-U78OW\nDBV59-HAQRM-BOXSP\nFSE0P-C0JFQ-HFZS4\nXDWYX-45UD5-2CUYX\n5KSO0-4OCMG-BYCGU\nRXPJQ-HNO8L-EPEFE\n7F52H-3WX8I-VBREH\n8PSRF-Z99Q7-UZVD5\n0PYPP-5MY83-49JJY\nLEN3Z-C7CLU-Z2BQK\nWX3TX-AVZD8-S3G5M\n4QEFU-PCIAY-2UC57\nZLCSV-9RTFB-GQ27U\nMWQY6-AIXK4-6ZH41\n22X4G-4BJQG-FUVUM\n5BTU6-NZBTU-UZP2V\nTSQZU-HJ94Y-XAQCO\n26ZWV-AEJT2-IN4AX\nWZTQK-05JT7-7J1EA\nA72XE-QZ6TI-EFFKD\nBXE4V-TPSBD-9VQ3K\nJWU3H-JCJDF-GYZZM\nH7T7Q-58QIX-ITAZN\n9OR2M-95IXC-DKSAU\nZ5MGD-J28RS-UUUHS\nR0XWP-2IF07-6GASJ\nG8O31-V059D-I6AP0\nZMG1O-56GWG-6EOB5\nW1M1Z-IDSK9-L6LIT\nVZSH5-RZ2Y4-LC1YM\nV338O-EEA7S-09P6T\nBBUY0-D8TYM-9F167\nXEJN5-LJY4Q-T19OF\nITS7F-95TI9-WL4EP\nWOKFL-J05R2-FY2QW\nVZERF-QGRH5-OZGQR\nQK0TH-URP9Z-2PG2H\nQ161V-ADHXC-WEHUG\nD04K4-9X8RH-E1HNK\n32WU9-IPXO3-SNF6H\n4XGKW-9ZIM8-DIJDA\nELA43-HMGL5-Y4XGC\nOO751-QBNP2-48G4B\nLN1NK-VE79B-8NHWV\nO0B8E-TW674-HI61N\nSFEWY-DNTC8-84A64\nWP9U2-OPZ4Y-TYL6H\nJVVFB-AB1MY-DGY9O\nLBQBT-GXYII-A4HJ7\nP54XG-FYJJP-GEXA4\n6GT2D-JZC77-D17ET\nOZZO7-EXM3W-2DDGA\nQC6EE-98F1O-LEPBH\nUZTFY-1YLKM-PGOSY\nFMLAQ-QHF6G-VM2XV\n9TEY2-K61SM-AIXU8\nRT5W7-PIBUA-TBK6P\n49R8R-SW38I-EAE78\nVWBZF-JWILY-1K8GF\n4GGL0-D13AT-M4LAP\n9P20N-LR2ZY-K9PJG\nA77O0-NXCFP-PPB85\nX78MM-9S7QS-ZBQP1\nR96UG-FMBXI-5WWXK\nYF40L-5EDUN-PAD6V\nMH3HY-GPG0R-Z53M8\n0VA2X-LOU0C-8B2SW\nJM3E0-SOZUU-3HJNE\nGEMBJ-HXQUP-1JSNS\n7WA6P-HHJC9-ZRE68\nOS54T-B5Z7Z-XPY2F\nOPY15-1K0WC-4ZEBE\n4FRJM-MNR85-KD1OD\nUPWB7-RHWCJ-73NSP\nNGKS1-RONSS-QXL19\n13SS9-63K3C-BT9EN\nA5JBD-J9GFJ-1GFKP\nGOFKS-EDPYS-KA726\nMUXRC-ZFH1F-FCQKE\nG859O-7N114-CYX4E\nXBO2H-2PG67-9WAKI\n5NPNU-F5JXY-RFBY6\nIWNPI-RS03F-VB1X8\nDAXI6-YOJEZ-6FNMZ\nEYJ3L-1KJBY-BP1ZL\nLF5SN-BHTXD-ZSDCC\nWF0PM-58DJK-GS90B\nUD76E-FDN9Y-T72U2\nPHB3V-UE5A4-TSVPQ\nU74BR-9DLKL-V7JDX\nV3F29-EXBOZ-1NBFC\n8G6W4-J0XYW-Y8A11\nISP6P-UCLY7-QBWCR\nDO7PH-3Q842-CSAP7\nRHVCX-35141-84RO6\nNNBGV-324HS-P03HU\nDH89O-FOHZ1-TGVRD\nJDS6L-O2ODT-V9U6S\n73IE0-JCK7D-3T14V\nTWYOQ-A1H9K-7CH8Q\n7VR0D-07RYR-PXQ8V\n0AX2D-69XFD-YS8X8\nCLJJI-HZUDV-9Q6CM\nV5KSY-7EXWV-NW71T\nBIHS7-GCI3E-QZGP3\nTWN3V-ZV78T-BALQF\nHMFSO-WA5TX-JRJSA\nWLY5P-NQZBY-O3FD6\nDMBYT-K5OL7-YMKGQ\n4O9LP-Y9QPN-0TEOU\nFBTS7-03KE1-TFLNK\n5W9OC-TUKWM-1WE8O\nQKRX7-IFRG4-AJSIC\nZIQ3S-THFG3-B13EI\nMHIDW-8LZ7K-IX4XX\nAXTZ3-81PHY-R2MPY\n2WWRC-HZFXB-YV9BU\n4U371-YV891-PWD8N\nFUYDA-YRUKS-W6UD2\nTUDHK-MDVR6-BMNCH\nBQMO0-YHE2G-3VT4W\nSVEF9-PX3ME-2BQ07\nIU2KW-6L1PR-0KNWW\n7FLUB-2NF22-E7JC0\n87XOJ-HAU0U-0AR4E\nFTCA6-EZ50A-LPKM3\nLOS7G-UFA6J-D9OYW\n8CYGA-YML6M-YQRUK\n9VVCH-F4FDM-56KJO\nB0W6T-TQ0R9-5S2J4\nASE3Z-GSER1-UEYIE\n1317W-F7F84-B8UVQ\nZQQXB-1QF4F-GKF5M\nKPG3J-V5YPS-MZ4P7\nKTY7O-PTLI9-16WRC\nXPEKP-NZDEL-466BF\nKHMS7-AED5I-Y198B\nJC1J7-NEVJ1-CU3VU\nKXO9S-6Z5WR-KHK43\n9J89O-VADJ1-7NWIW\nUNOVX-GHI7U-1R8OT\n72G72-882MD-VWN1N\n3E9AG-5TR13-N2QTU\nRG2YW-S4QZ5-CXF32\nHOITS-BS854-FLPWV\nI3X5M-SO37A-QXOQ2\nH6FA8-INCQK-GZKYQ\n4KU7L-A5COS-722NB\nFKWNP-AMZUF-09VEV\nRU47K-X4ZB5-F4546\n4V24V-KGP4V-48NVN\nVTXQW-B0ZHJ-0IX15\n9W8FG-2TQY0-I8BCO\n7DOQM-359MK-7A7HA\nUG94W-V6IL4-4P2II\n3WV1L-BT0SR-CGM8E\n81F3H-E95DF-ME859\nRG701-1BR02-KCVJC\nXEZYR-24DQG-AZS9A\nGF7JY-9W562-59HZR\nAMX6J-Q40MN-M59O9\nGQV45-6XPEI-MIZE1\n89S86-OQCZM-Y0789\nX260E-IJHXC-S2O0L\nXBNF1-LY1E5-BII9V\nKPFFH-74WMF-C4AR1\nC5V09-9S22T-TYLWW\nA0ZB2-UQBTN-YO3YS\nBDKVE-5UC7U-UNCGN\nTQXAX-UMPFE-0YHF6\n1NCLE-ZQ7YR-6LHCQ\nJ6LOY-5GH32-9UTGV\nL9L4X-AAQID-3HKOK\nJ5SN4-C8AMS-L3W93\nU5ZRR-343WJ-GA877\n86S4I-AKW5P-X1ZNW\n89K7X-I11R3-R0YPY\nIW0S9-9D5KQ-R5JZ1\nTF4HK-0XXTF-NUR4V\nP0IMP-S5HJ5-YOSD8\n0QM4T-ZHAE1-N9G73\nFVB49-207EL-HG1LS\n9TY0F-U4OVX-WQAZD\nEHTE1-LCCBA-K2ZG3\nVRS7O-B3J0A-UGF8B\n7A14F-VK6MB-MAIZT\nYEEWD-W0M0Z-MKYR3\n0H1GN-K7JNA-07MKP\nYVEWM-FT7V2-GEADZ\nJ99RJ-S0KZG-R63YF\nHSJEJ-G3WFP-RFMF8\n3UL3Z-0HYIJ-XQHX0\nR26L3-PBGC3-XMT6K\nBEXFN-TE9MQ-3XUR1\n5RSA4-SK5BK-7PRFS\nZXP5E-5K4VV-2DDPW\nVJ3VJ-A4Y7J-7UKNA\nDA0U0-BUHQ6-2IEWP\nH2V9X-827KW-8UH42\n8SGX1-U8FZ5-XF3JL\nXFRXZ-I1IUZ-PNVV6\nYI29K-HNDXW-D1I69\nXKFIM-H0NV7-8DWEV\nG5Y7Y-WZ1FO-3VWNG\nTY86Z-HWSL3-R2EKT\n9T578-7LXDS-CH0KJ\nSLDSJ-WEAL1-7VHE3\nVAAUW-T56QM-GDJXW\n7UAJ0-73VIX-DLOZK\nDJ347-32WOH-1TVNN\nSOFT0-E6454-3HKQE\nYH7NV-6O83V-HV0Z3\n89D3U-NLJF7-3TCUH\nKOHEQ-YJAFR-2KMSD\nLYXSK-5HY2M-JB34T\n3QMIG-GYSNF-U6O73\nWHML9-O98R9-UJFY6\n19NUM-N6UC0-2DX5G\nT6FZZ-CB5KY-KMMJG\n39I52-T4UE8-3B2FY\nGCHLQ-TZXID-14C74\nVO6JB-GZ2CE-HDC2H\nNBAP1-9H03R-VNZ21\nY11HO-K52LU-451ZI\nTQEG2-AT8SC-QNVUN\n2MPBL-RG7SF-6OFQX\n9NBIU-ZO1H7-XMEH2\nT1S94-XN0Q5-MC6ZP\nAI071-L0M1J-SE3RC\nH4ONQ-3LDTF-N57K5\n9LVTB-OKFOB-8HDLJ\nV3UNQ-8420C-YN84N\nUKNRD-K46ZZ-FP7U4\nARGJJ-NUR2R-WIB2L\nEU7N0-DKO3I-2JBDX\nT73AY-IO9NX-00ZRU\nWATMN-CE6VU-RM0DQ\nKBVYH-42NYP-IFJT2\nG69X5-QTA8X-ICLRN\nORTCC-XJJ1P-0RKIU\nBEB6A-3SLJC-IMO0O\nFMQV1-36HSJ-Y9WKQ\nKZQO4-R92A5-NMO5Z\n9ZWJ8-X2XSI-VHGO5\nWF4NH-ONXJP-VZKYZ\n70AOW-24MDD-T425Z\nIOUSO-KG5JJ-EF1DO\nTKTPH-IR5AQ-3I77Q\nLUOUN-URG67-3W07W\nLUSR4-YLXL1-O3RVZ\nPJT4U-O89DA-PT2SW\nVA71B-4EFL6-I48B3\nCAFAI-SDYIR-47HOE\nPSXSC-YQ123-WRAJF\n88D2L-RKHB9-CYN1Q\nGJGFH-BBN1F-3EENS\n68ZRP-B1Z5V-3EU3D\n6QAJY-ZQLLW-R3NQ9\nD1VCL-MH82C-JFYNZ\nL5SHK-4AZDK-LAQTT\n8JHQU-C3F9E-V4HMI\nB03HQ-9RV9L-9WMWP\n0CP71-8XL4S-7PV5V\nAI026-ZPHJ5-OZYVZ\nX1N3U-6SNNV-32FDB\nJ6LYF-85CXM-5H2BU\nZQT8S-0LZK2-85WMF\nHRLFV-5C06E-EM3G3\n5L5A8-REUGD-FRQ79\n1JUNA-VLPZQ-CO7YF\nU7CIG-263QX-RDVIX\nIBR76-2I4W5-V7FTP\n2W91U-K39EB-Z2AUA\nSXN8D-2XAZ7-FI5ZL\nGWZTO-WB9NY-SD9RQ\n917CA-QL6BB-WKKGM\nFPIAJ-TJURV-SR3BE\nS634O-JF2PW-FXF2L\n5NXDE-T8RZP-WZGVM\nEKDEJ-UHRJI-2VJC3\nJCZUH-G5CDO-GXMIT\n3OU1A-5NVLM-JTC9O\nYPO45-B24K7-7GRM4\n7SGZU-I1E2M-8RPC5\nHKMI9-PZCSC-A739D\nOD8NJ-J1MM3-QFXRD\nQC98A-GMOP1-LTKSY\nTVNDU-2DP74-1FDQ8\n8RFG8-L5PAL-BHSNE\nBWELG-DVWAR-1YKUS\n6DIMT-2SLEQ-3OFR4\n3NK8N-716KN-PJOZS\n1J5AT-7UBVF-MIZQ8\nYOC0A-AGO4Y-568X3\nU2PX0-SFWHW-LPZRL\nVZ85U-JNA16-M019E\nH21DW-2QULA-MHDV6\n9JCAW-TD18V-QPNP8\nWQWGV-YUI8T-B9XT3\n3YSUI-FQEHX-GV7Q3\nAI1WM-8Y3EO-W8GKI\nSQX1R-AOKOP-EQ4RY\n8TJGO-2PJOB-TM2U7\nC6O3L-2XBVX-SD7UB\n9HUY1-45PTI-G1UYI\n4ULF0-UENBV-4BF90\nJXUT8-NO6SO-1PP3F\nN8C3Y-QLQPB-OG5ZX\nZF9AX-CZ22H-FYNH3\nB530Z-9DTXD-PU63M\nHDMO0-QWGNR-XQRYZ\n90K6I-14OVT-PS8L6\nRTRL6-OQCUQ-KLXL8\n53IPB-224PZ-A88ED\nXKOMS-UKW2P-WKDZ4\nAGGCR-7RH60-IQJH7\nF15NT-0B8W3-R4L7F\nWJPVH-0VXZN-14MV4\nSO0HO-Z83U2-4A11C\nJP56O-1F1QL-HLQD4\nXX47F-J08XY-1P2WJ\nZBPZ5-0Q361-LDTL4\nR3S8H-1K40O-4OB01\nJPK97-SJQSV-ED2TA\nIIL1J-NT4LE-90091\n49UAZ-7R9F7-IIC2C\nDGSZ2-RG6TZ-68UY1\nGW5QG-5STOV-MILOF\n17K6D-YVF5H-8CODG\nQ8N55-064L0-96O3U\n0EDZA-E8FCE-LAJDZ\nU5WZY-M6YNB-XAJV5\nT7739-JLZQ4-Y88JF\n313T9-JPOV6-AJA4A\nQ4E15-LG79B-M11ET\nPJYRE-6QTI9-24RCI\n4OKN1-HOOBF-W5C5D\nM1UR9-3VTU5-SA11G\nYQZ4R-BCRUE-3YBJZ\nXOLK4-MZJGR-F1PF7\nL4ZDG-9DK6H-F4TRP\nX7MLO-1AULD-8HKBS\nKQVX0-8943L-Z30G6\n1CXFE-MIF60-ZNXM6\n4BXSV-FONGH-6CY94\nZLPY9-QXCL2-NRWSG\n5E6HM-0AUI3-Q9E0Q\n5NUXV-Z5M2N-BI3W5\n1VJ43-4NLC1-W4DX6\nNIDRJ-DGGGK-T5RJ7\nAHNTB-6JSGW-S6FKT\nP3G9U-6MOR7-18GI8\nRFZBS-O82YC-G2K20\nSWUUM-VU2VF-LGFV0\n2AXMN-JABFO-J4CJH\nO45KI-1AWC9-77PTH\n2NY3E-KIGUJ-JR836\nE2CSK-N8SOA-4WIPC\nQVPE6-KL49H-7SCD8\nLLZBG-QQECS-B00LJ\n0BUOE-OPZV7-G9HWR\n5F7E8-SLWVK-A7B6J\nBO5JA-7KCRK-GDR3O\n197NJ-D7YX1-JC9EY\nUBDMA-MJ6FD-7NFRW\nK6S4Z-XFNK5-BD7OL\n7KUY3-9SR54-EOKI5\nHZBO7-RK4WE-75226\nAWCVD-R7DE0-3UGA9\n9N6RU-GM0IN-HKDI9\n5AOS5-30UIG-74MOM\nDYHAF-FUBHA-S354Q\n8USC5-1OUVV-MXS3X\n82NXF-46HSZ-V434J\nN23H1-Y95XR-O5ZJM\n7GZF7-A1K4D-FPMFQ\nPEMTO-MYPL3-2YHDC\nNAQKO-H0EKK-KQB73\nKUF1Y-9NY6M-PS51W\n6XOWK-3B035-4O3XY\nNXR6S-XEAQ0-XKHQT\nIGIW1-MY0IG-27HVX\nJ0ELK-JKV7P-BNUVD\nQLK0W-HJNI3-FYQ7Z\nXYHH5-K9H70-9X8KM\nQD52Z-82ZDX-83DLS\n9R4HG-PTJ3R-R5BIE\nVYHC9-K17ZF-MTN76\nZBU67-YX2CR-RPL37\nINPSI-X30BF-AL8IQ\nIDZYW-XLI95-528LK\n6DF85-S1M1X-T2GFI\nM2Z9J-FV91O-4G3FV\n5AYVO-B3SA8-F4YLH\nIB95M-77U9A-WC9OS\nX2CNC-G0B7I-GQK0E\nJGA1K-C3KIE-5JTY4\n3IIVV-VWL74-X7J8D\nRFSTU-CEBSS-14YGT\nTR9GU-O7ZN9-4GWBB\nWFIL6-KPRZN-48TIC\n0FA7L-3GVZ9-H64BY\nAHNKS-Q29HQ-NND8M\nTVWU2-H3122-C2EYW\nC2977-TSPYV-TGZO8\n35PRN-R1CV3-Q3DIR\nSVKM8-09PQS-JDF0N\n7JYWX-AYQ4P-AKG9C\nLUEDW-YXUV4-9SENQ\nDOYWJ-KZ9FE-8H8KK\n4O2RS-B0N7D-T35P2\nCXDWM-XETWF-CJN4Q\nRI3YB-SS03A-5D2MT\n02C23-XUOSW-RXU36\nAKPYT-OREQI-C5EOO\nOGBJI-WMHQK-2B6OA\n9YBNE-PVIQG-IHHP2\nL7KF7-O5IVD-5P6GS\n03HS5-UIHG5-W1EUL\nBFSH5-ED6Y6-LH2WJ\n9X2EM-3094V-U8A04\nP7IVA-YRDJE-9A2H7\nI93TB-QQLS6-BK8GY\nQXSZ8-81NFJ-3X8O5\nDB4J6-HFHME-36PJ8\n0L6J6-BDX4F-J4ADP\n2DF0O-OGGRQ-4AHTR\nJLZP0-SLXCW-6G3V0\nL3B0D-FZGTH-Y1UXA\nT7GFJ-SUUCN-7X3Z0\nZU423-B33GM-GYJXT\nSRZGG-1VQ71-1KJV6\nELCAS-NIWAT-6GHYZ\nKZDIA-JEV9H-NACUC\nMX8N9-TDXW8-BEMY4\nKNEC1-BAW1T-EL926\n12MJP-0KSGO-AJIQV\n5UB60-8S3SS-ODIZ1\nUTLDE-65EOM-0NZKR\nPCKI2-0H344-H724J\nBCA2V-VIAKX-NSS58\nLNL4B-JUQL5-4P98X\nDNXRZ-YQK5B-KBHHA\nBKHA9-G8UQU-S98IX\nXW9GQ-J2BC0-O60LI\nDU6UP-BXTYP-LS28G\nARFS2-N7RPR-T00GX\nIDO2U-0MYPS-5QF26\nAX9P7-6ZLOS-H8HJM\nL6HCP-Y8VNB-XBVNU\nSYC0T-UI65B-QT35F\nDREXT-IHEN1-W0QCP\nOSTNL-7NEQI-ROERP\nQCQ4B-V55VG-9TK31\n79KGE-3GL60-HMKPL\nRNUW3-9RIUS-7R3CF\nUTR1J-D6K7V-RVFUA\nHPPKP-BHSPA-ROL4J\n0TIAQ-OV2HG-340V1\n4U06R-E49YT-7V246\nHUIZM-X7RA0-UTPMK\nSFCBL-8BP89-J6NY6\nHGLMC-93VXB-2TU5P\nNJCZJ-QLZC4-CO3BL\nWJMBL-EHXIY-MKPVO\nQMKNW-TU7JD-ED87D\n9O28D-U3JRM-1PW9R\nGJSKH-U1JCU-ZI92R\nNRKW5-8OHPU-J3EQS\nLL9P0-EWVTA-9ZLGK\nLD8IV-THK2Z-MB81Y\n36HTK-0HUB6-OTBKZ\nDU1MJ-RH5MR-12QNR\nAFKNZ-ET3MM-DZZXV\nE1SCP-MC5F0-OOZ0R\nFGIR9-9P868-KNJDB\n996IH-VUTMZ-RGSNE\nRBYEI-BHXKB-O5DTS\nQLYUT-NNUEI-T1EAC\nQA14Z-4B38A-EBKF5\nLLZTC-JFZHX-P84NV\nX2SL6-3QEF2-Y6W4J\nIJYVR-KM97X-82M1Y\nPA5UB-F78V0-20SRL\n4V3KO-YBFWE-A952L\nQXF4P-Z5XHV-3LVLL\n4Z0OH-6EC7G-5V7NY\nC490H-LFDF3-ALHUT\n1XKWY-NAS7K-5XD4C\nADB2J-VDIQF-O8R19\nUS0EL-49J96-RHHRX\nO520R-RA539-IBRPC\n84821-PRLYK-12FOL\nZUZ0N-H03WC-JEDC8\n9OTIJ-3DUBC-Z3DS7\n88MG6-W28JE-T3C1D\nAXHKB-T8EAX-3A3LH\nP52G9-7IAA8-2X0LB\nDLXFE-N8AD2-YPSIH\nH2957-8P0MR-VFBZJ\nXSJC0-FS3WS-S0V1G\n2JMER-SOCKV-PFPWG\nNYRS6-RNJDA-O3R3E\n6R2HD-52Q0S-5JI0M\nD1LPB-XU241-A3PAK\nKA4L4-T1CFS-5UVWI\nBWY9K-UYA4J-JCA7Z\nMBSN2-D7XON-6YZOW\nSUZK6-N470J-OKFD1\n8GZEV-93P0W-I4QDC\nN8OZY-7EW3B-Q4EKY\nLJXQS-0HJ0D-Y998D\nK1G5T-OGAWJ-0YOGX\nB7N8U-Q821N-TM4RG\n3WC2X-NDG5J-QQY86\nHG0K4-QEIMW-LH9TP\nV08T8-FCWZQ-WIB9K\nWGP2T-0WBJ6-IJG50\nU4ZNY-P7827-S7P56\nR5OJU-YFFVI-6OORQ\n8YM0E-TQVS8-KEU8F\nOOTTC-XNITH-WYV61\nMZROI-92SYQ-9WBIR\nAHI69-BY8U4-XERSL\nZ8NPC-VCH5C-FHT72\nD4094-5HNLZ-LTIA8\nXO89E-H2WMN-9B29J\nA9LKX-ZA3HL-0WFP6\n9660M-W8JGI-MB4F9\n6QBUR-ZNT50-TXPCP\nK51EV-5SPGE-I1ATP\nLMUMG-98RLZ-ADNBP\nEWQQ7-KPDJM-I19S0\nFHETK-ZDMLT-26D5R\n7FBYT-IT4B9-IOPPE\nR6ZQR-F3N8M-SOGML\nDYCNB-ARBAV-LFQWK\nKULI2-HPFIM-PS4IK\nUJ165-UBLJD-3MOP7\n30NW1-YG0YX-YA75G\nJEMPS-0MX0I-WIFOM\n7X0LI-96D4A-KYMJW\nF1MHC-4M4JN-Y5OY7\nE7O0H-JDZMB-J0N41\nELT25-IKRBT-HQLGH\nUZVMI-MFQC9-J6JF3\n3UD4Z-ZLZ31-998JN\n66RNV-LCP4V-OFULM\n0Y6JO-3BLJR-ME3GN\n17MYE-S8EU9-7L9WF\n4YJ2W-O4O9L-TV1WG\nC0VU2-F1W55-GOGUO\nIL7GX-ZHG0P-ZGUM5\nAFS07-UP6VD-KKDBY\nCDAUV-45IDH-JAZA6\nS34QN-8WE7F-CFA26\nAEBX0-GWZTV-HRZL4\nMW28K-65GXJ-0TQTL\nXJ3IO-KKQN7-IKVCD\nWJFPQ-ZTUPZ-IXCAP\nQHICU-IJXXC-8964N\n5OKI7-4W7MQ-NX08P\nBMVXP-GAXXX-66LO9\n6HG6E-U3DF9-15WM5\n72IA2-DSXPJ-VC1Y6\nIX8WH-2TB5Q-H7VR0\nE212G-8TLC0-AKKNN\nNS0SV-KEX0S-A5370\nMOF5T-U0MAJ-9X674\nO9BXJ-6X0DH-0TAW7\nNHG4L-URUTN-O8F1Q\nO74YM-VHSH0-0X8OU\nIRN1I-1Q1IJ-3FW8K\n5XGQQ-S3KUL-T9AV9\nQBYVC-CB0R6-78NIM\nJPUZS-LF8OP-D7KEV\n9FK2T-R64SF-RFS8H\nLHFBX-DHHBN-QVSWL\nJNDPB-RWRNQ-VNFC0\nDA4IT-MAA3R-6ZIDJ\nH3BN6-LK3FI-ADM7Q\nVGH5N-YKELJ-IN07T\nBVRT8-D7D8X-4LC79\nLSDG5-WDK6E-SW809\nWH9P6-ZSJX9-EU459\nI6Y96-JOGR7-2QTST\nDMAPO-GY9RF-OPVYO\n33SC5-8CXER-FTO8M\nV9JMR-KVPOX-Q8YJA\nUBTT5-M6PHT-WWHLJ\nLLJPJ-XPU7J-H4CBD\nD1HY4-4MQ71-LSR8N\nM8Z4I-HEAHM-827S1\nKNBR8-TNZ4D-QD2AQ\n0DQVD-ZOQHW-K21EU\nTRWRH-83GXO-QFKIY\nIHQLT-9M79Y-Y47HM\nNTNWW-LKQ59-2ARMM\nEYFA5-9T164-9LIF1\n2MVN8-2HRGQ-YP24H\n52F0O-3RJCT-1TK4M\n7UXTX-02GWF-NPO3M\nEH3OQ-YM418-7E1UT\nR0ZZF-7PBT5-MGKH5\nDQX1F-KMB1W-T3GR1\n322SD-J5C82-MFCHI\nN2W4R-WQ08T-HXPEF\nLN0DP-DBTAQ-3U6TM\nSFI38-C9TK8-KBV01\nII9CH-Y5GW8-KBEHN\nQAQEW-94RFW-D0CXP\nNPF5S-AR43G-EUNZG\nDME6L-WCYSU-LQ6YN\nD6IQO-4G7HI-XB4XS\n15CF8-U02UA-KGUQD\nA39Q8-OTOEB-LNH42\n2WU81-DNB57-DYTIZ\nJ1F7D-ML84W-UNRJ5\nWEAA3-KERW4-ARS7H\n3Y7TF-VKOPK-N56R4\nZ7RDB-6V24U-Y7238\nV3WKD-HGDUW-8C2R7\nQGU4G-DEHDO-TGLCC\n658IU-YWMRG-W76UB\nQASDZ-KPMGO-ESTGE\n7TUNJ-DDLY3-6MPW5\n6CPP8-LN9N3-CYBLC\n8E24I-I73XA-YT74T\nV4J8P-V3COL-P9SSS\nFHFTY-AA4LA-CY9M1\nC4NY7-OP0FX-BR33N\nD2G4D-FMED5-EYIVE\nZ3N18-ZUPEA-F4TK2\nV8W5Q-4ZXUO-DJUUM\nBSMYK-GEG1K-LSF29\nWYY1E-YNKXM-Y68HR\nZTIIN-ATTJ4-LJKWM\n895MA-9XI5S-1B2W0\nI3WRN-TPMN9-A21MR\n8XC3T-TQF43-18JOE\nXOPAX-EU30P-QWKUT\nI7VLS-K3B9R-G1A4F\n6WLIU-CCXGY-DE7EV\nR6F6D-9CGJ3-AKNBH\n5GP2Q-0WGJF-KCT0M\nO9XDM-73VPS-KXE64\nRMIDW-4LCYT-QY723\nSJAW9-FC2KF-ZG3AP\nTT43H-RO9ZP-BEDIP\nRN99Q-BL1B4-8JDPF\nZSJPW-DZR93-D06TN\nUQ1JO-DS9J4-YS3AI\nNU1C4-344RJ-HZ5IC\n8RH5P-QZJDC-S86T4\nW99MN-5QIGD-TVDKO\nTXTFS-2ZUVL-DO4RM\nPGDAB-5O23B-Y0I7F\nIJV78-VFCE1-P97PH\n4S01R-PZINX-SPTIL\nOQRZP-V509D-ULLCN\nNQT7X-V8U2G-DK24H\nNVEZ7-IGJY4-CN4N6\n3N1G6-6YJQT-P08C0\nNZB4D-XCQJU-Z3T8T\nEJR39-TJOXM-60YTB\nUFKKX-4Y6D5-K4UOE\nM034Q-M5HGD-MBEDW\n1WK0X-6PH5M-WE5T6\n8E9GZ-NXQJF-0EE1U\nA0IPD-Z78QY-OGP2H\n8VAKQ-US7VW-NPUU5\nSBAE3-55L07-1QXN6\nND244-XSEZC-OU62V\n5CWLF-ODJO7-GUEGE\nMQMTT-ZX7RH-W5FB8\nLVER7-Z25FL-KXOFH\n462DO-VMZ8V-MQZIM\nBWQ8J-U6UBE-C2ZN9\nFO1HZ-O9T7Z-LMJPS\n397J7-IU3WX-4T80W\nPPSOP-WPCZ4-3J72J\nLJ5GD-1I9WE-LH39I\nH3AMG-5CAUK-7V59C\nP5NA8-Y0HZE-PA4VF\nJO0Y6-3HSET-9CD89\nT9LAI-XKQE6-7C6ML\nS3R51-34QP7-G27M8\nLUWLX-QMIWX-WFS2N\nJMUN3-2INT2-MLKW4\n40CM1-S3694-IX6RK\nSI723-EBLG0-41O44\nCH5QZ-7QOVJ-ZGMNF\nTRBA2-A0XXK-5UY0R\nLNY9U-1YTJZ-TRN7S\nUO70C-2TORM-PLHRZ\nGT5HM-2GH5L-8A6OL\nT1771-9JALI-GVPXC\nBJQUV-ZMV71-4735A\n49O1Y-JTJHV-22TXD\nR4S1O-BN95D-7DHTA\n7D80I-EBMBS-E55RN\nAQM79-662HG-6V5AV\n4QZ2N-4Y3RB-3HVCJ\n8CLQS-WAIFI-UJHZD\nN1WQU-D932J-QTXAC\nST4TP-O92A7-CLRZY\nI2NXH-A49TT-JNHZK\nOCP4G-TANGT-SYTO6\nZN748-CA0TM-WHKPX\nQD91S-4H8C1-P7BMW\n8MB99-RSOG8-C3MY7\nW5MCQ-EW0RB-61RPA\nRRLYW-5HN2N-2DC2L\nP7YP2-D13S5-G0T9I\nFOG7E-CY8L0-Z8CSZ\nJ5MAD-RA2AC-JMVV3\nBQ39U-K34Z0-YOZEL\n0TNA5-7ACCF-SEON5\nFODEN-T9P8X-MOZY1\nWTLY4-JA1AC-H9FR8\n2F571-HW5QZ-6EJGJ\nAGZTB-UR4B7-8EIDV\nJ55K3-5LCFI-J9DMF\nADX75-J3YXN-9Z4YT\nICBWN-X68Q1-3E0NH\nG76OI-09YTQ-MF1M8\nS24TR-B5O0I-FCWN5\nJ5WFW-9I607-8LFHN\nWK1Q8-F9E3V-PTM4K\nFS8HO-1LYR7-NCQ5Q\nS6C3D-3CDZB-TU7TM\nPEXPA-DF4P4-2THHH\nQZ0UT-689KO-RIOOK\nEV0DP-5ZU1R-TY8JS\nBWBZA-BUFKA-ZLLZC\nPT7WC-NG3V2-IADRZ\nPSEPS-JZSSY-T0XEK\nH2R11-3B1LJ-635VT\n4DGZW-4Q5FJ-C3Z6C\n5RQ9H-UBUPM-D2NWK\n5LKU4-0MKZU-XTSK4\nKSGRB-CWATN-B5RSE\nY0GEF-JG34R-MXVW9\n0CN8E-P0C7T-LANPR\nWTW6B-BIVB7-35O13\n1BPJ6-OB9K4-Z22J3\nKCZ8R-XX0PJ-YVCS9\nE0C5J-GTIV9-PXY4W\nJ2WJG-3RE8F-UNTOK\n2WCSW-N8K0Z-3ZFW9\nKK8MP-T0X52-PIS5Q\nDFF3V-IF326-1BNRP\n31J4Q-2KRR3-ZII1K\nS0ONC-OJ0Y3-CJAQX\nM5RNU-M22MQ-AJWIZ\n0EZK8-V083D-JTX0T\n241LY-QGU99-UZBWL\nCJSQ1-CQ80X-J847K\nT0M0L-8C1BA-EQ2ZB\nZG9SC-K2D85-NS3DG\nVUJZ3-5W17L-NE6DY\nTOOUW-6RAHQ-J4JZ5\nRP1DO-FHXRW-E6A4I\nBXO40-XWXAS-YH3GP\n0KFRE-KW10R-QE8ON\nUTLMS-IG3SC-AK0V8\nPHOPV-VSMIU-NXD0F\nH3UBG-SB4WA-CKYU3\nYLWLJ-K178U-61XIU\n0ZSQ9-TFO06-R4UQZ\n1LB49-5QJAW-FTABN\nV7TAB-GWW67-Z89EE\nTVARD-QNMB1-3D77Z\nE89OG-P0HYO-RJ0P4\nJFOQP-0HGSM-IKRDN\nLFXVC-UBPU3-Q9R34\n5I07L-BV1OZ-SZR0U\nOQWU7-RZP4V-ZFVYD\nZSL03-DKJNC-461H2\nT8OS0-6VYNB-VDK9Z\nO4D56-CCOIR-KM87W\nA4O43-C90NS-AVDDH\nAP7YH-KXI2W-JXLTR\nY4AZF-JOUHK-PFSUK\nEWEP6-MUWYT-YBXVI\nRZENB-XTYCZ-C6YCE\n8ZTED-Z9A9U-CU2IV\nDHYP2-YSAJ9-GJ656\n1Q012-4CVFO-A5UWY\nGGIWU-GRNYL-Q6OV6\nZOJNN-B9XU2-SC5SI\nNPY5V-9OM15-XD16N\nBUSB0-5LQME-DG0RN\n7MCD4-J85UK-AL3S4\nO8LO1-L3G84-4CAEW\nQG1H2-8M21N-U5S6S\nAYCL9-ICJYP-FBA5H\n7ZNDR-XOO5F-ASVJD\nPWCKF-4LS6J-3KKDG\nE3FUB-SPEVW-6I4MP\nA5XXU-AYVEG-NWFLJ\nZ0TZF-RRPIM-XQJ9D\n26UV4-4UCCT-ZL6ZT\nIL9QM-ODFHS-8E10I\n4OU04-BUM8K-W8LZF\nJMOJG-5E7HH-59QU1\nNWWQR-XVXSB-Q8IZ4\n58U3F-LHIFW-30H22\n8SR0W-Y890I-VVP2J\nPBY22-47FDS-59KGN\nMFLUO-6VGFT-HJ934\n977UK-86S9C-MWI1W\nY7O6L-LA7EU-CWJH2\nFPZ9V-DX2F8-UCNZB\nK5VWV-NKNIM-LW873\nGFISD-D1WDP-R2ASG\nYM54C-MJ9K1-QWVKZ\nTSX01-XNIJ1-7Q1IC\nLTMAT-WXBFX-7HLVH\nKR9RB-NAB8T-VAQZV\n32JTH-8K1X2-Q8QWL\n4NIME-IV6ZV-REQP6\nUZTHX-BDB96-RA6VV\nC2A05-THI48-9JDAC\nD6FBT-8EA83-EYRNJ\n46ZLH-1CO95-KQS3Y\nKVW50-PG114-2FZ1N\n1KOB5-H3D01-8PF7U\nI37PO-N9CK9-N3T4S\nDFKC0-VN2ET-0JJST\nDQ607-UE2D3-ZTD8N\nX95Q1-TMISF-M7T8F\nU5E2Z-UTYZB-EBPRC\n80CS7-NP07M-1DZCS\nF5S5C-9IDE4-5761K\nA9YLZ-RZYEJ-7AA83\n6DTIG-UAK1D-X27W7\nD5ELA-XHRPN-NMP7K\nQ7KW0-B5WJC-J2ZK2\n0P19L-ANHEX-V1FV4\nXWCFI-KTLRZ-K4S7Z\nWJB7N-WN00K-FKEF7\nO4XAU-91UVN-ZUPOQ\n8SDZW-8DVF0-OILLU\nVJ8HE-10TA9-B7OOK\nGJVS7-H03E1-0WJGQ\nP9JG0-DQ8IC-7653P\n4T2LT-1JJEL-C4QDU\nHTG7S-IXXNK-48S2D\nSWTBC-P5EDO-Z9R4M\n3T2HF-FJ8CK-0YSDG\nGJ09E-BN7P2-UFVH2\nCXQSP-OG8OV-PQ1I7\n8JD42-IV12P-IEZ5Y\nZB6RY-3HUIS-QRPQ7\nK1RSV-UDFV7-7FT5B\nOJR47-F5V7L-QI4C1\n6VLCM-K1OAJ-05YVZ\nQD6KV-C1TBR-MQVR5\nER716-EFA0L-6JSZ1\nGGJOY-4S77O-3EL8Y\n4R6GT-72OFR-AAJ6N\nHVHPF-SJV2D-W6MKI\nADZII-VI44Y-8329B\nLNGE3-WK3GG-MB6ZO\nZA1SB-NDPVL-03P8B\n51QO9-RLNTY-TFWZR\n7QC83-RY072-SQWV4\nQ414L-QKOLN-YE0CR\n55AY3-405U2-OTMFF\n7NT25-8JVQ1-Y7CQ0\nV24EH-PEMG6-6RE3C\nPMELI-437YS-WCMYI\nU5WRG-PFZCL-IW98O\nFPZ2L-PTQA7-AO2OW\nV0FOA-CXUIP-PASXW\nYGRH8-NYB95-TJWC8\nCEFHV-4WFD9-IN7FI\nMNFWJ-36YXL-9G4QN\nAJSEC-YIS7M-EM4D1\nRYM5O-ODBHG-2DIJ2\nR9IRE-V1WM3-S4LRC\nGTK2B-LOFN6-VH0K2\nK29UI-WCFB9-9ALP6\nXAI8N-SNF5Y-FSR3C\nVU17P-M6GCV-Y32LZ\nZD2NU-BWMVI-WSALT\nIEWFG-56UQ2-BKKF9\nIM3V4-QCX7C-IMANT\nRISSZ-8AI9L-6UIX3\nIB51Q-BF7Y3-0GHHI\nNKJ6A-U4QWI-1C797\n0FXV0-M1NLG-WKFU0\n80V17-TACTC-QXPTS\nCXAO2-Z2IO2-7BWSC\n7MADR-B40W0-XXRXA\nFH5LV-2TJLU-HXJ4X\nFWZYS-18XW3-LODMH\nOHGHP-XX53I-UBAVN\nPFTY8-1ZOMO-HWPW7\nR2M29-QEN9M-IM46S\nV202X-ZU6FL-Y0ZNO\nQDMAG-QHCVF-PD445\nIRLW2-7P775-U9072\nGRU8S-YRVT5-SP0Y8\n46N82-9MWHU-Y9SD9\nKIA2A-MU8H8-DFJ2Y\nD42V4-QCBYG-JIYJY\nAGTV4-CAEOS-O21IZ\nWO54C-VOE6A-D2UE4\nJCUJM-AHXD3-3A0AL\n8WI5D-Z74T5-I0RMU\nSGNAB-QIO4X-S0PX1\nZ93X2-12UZB-V1YRQ\nKRZKT-NMBCN-BE25I\nGPVB9-W48UG-W29QV\n8Z0AO-ZHW7W-X41NT\nBTIJN-4XCM8-50ZA1\nHF1U2-6JSWH-WTNKD\nIQIT1-I8ATM-75DWM\nHV7AH-ZDBZP-QP9K8\nB7UFN-V7L61-GROZZ\nD1P85-FPL6R-SI0GX\nTW7R3-MY5MP-V2Z54\nAV2Q1-AKWGL-GN8JC\nL3HVI-7XB2A-ZTMIB\nUBD7Y-D61KS-1XBXA\nCLXXV-GGBOP-EZDPG\n3P9A7-C50BS-PVROE\nN8WRA-YQH37-AO7MU\n0AH9S-662QT-CKCNL\nAFD30-UFPCM-DALOF\nFP5NL-6WCSY-CLYDJ\n32W1H-Y50SZ-MZM65\n6OYEG-B2II3-V4JEH\n461RX-CNQCB-C2P5H\nZ3PKO-N4DDX-G0BN1\n574AN-8FEHM-CABNC\nHE8IO-J0LMV-Y899V\nHG025-6FORH-5UV60\nH9BBQ-6C9W8-JSOHX\nJRYG8-TVMOS-877HN\nHR7QR-HL115-E3OQC\n2KJLT-TE5YR-NEQ99\n1IFC9-7UDHE-6EXE4\n388UX-HM7QC-22YNN\nWWKDB-JKLAO-WTUJB\nPEOC0-JWVN5-P7ZRF\nEG8AB-3QUK6-PUHCO\nK71B2-N6ITX-T2GN7\n1AGAJ-M5RGP-DMVED\nYK7C7-6N14P-H5UE2\n130DB-LDO7I-H8ZVM\nRLEL8-Z6WSE-UEKUJ\n6MTW6-EKPTK-T2VND\n4IBSV-OK80R-VZS6J\n5PYC4-01QPW-UNVZW\nXW66F-J9H3W-U7H70\nFPCZ9-8IAGK-EYEQ8\nHDKZ2-WPWKL-OXXDW\nB3Q0Z-SH2TI-RRWXW\nTAY3X-C075C-L7KUV\nD0AGE-HLI5Y-4VPP1\n939AI-M9RTU-4UFSX\n0PNYD-6FVSB-CXR27\nQ112N-N7KVJ-NR11B\nE5Y9F-6UDNV-MOO7M\nNOVVR-3IGU0-JA0XV\nFICT1-H8JB0-31II8\nLJ5E6-HEXR9-GXMSJ\nJ3ACG-R7NS9-7S2GE\n6XAJQ-CVMJV-XCFFO\n01MI5-PNHY9-GUUEE\nK1J27-16VUA-VET9I\nIWB84-O2FQK-J3AXP\nYNKFL-5TAIY-89TL9\n89CC3-15TDG-4MTG5\nUDI23-XUKN5-BOUX0\n3XMYQ-QBGI3-CLBI2\n68VCC-HR8CH-PCPO8\nFQ2YA-HDM93-CLSPH\nV8VCL-N5S8M-MCWZM\nKVCN1-WAXI3-HFBUD\n09W7S-SB7I0-SWMUP\n5UXWL-RUWAX-V5WBB\nL3NWH-B4QK2-J6WJ0\nP0ZR0-PDI9H-P2OLX\nYOAKV-VIKK9-DOPFX\nG6VBL-F6TZI-6U3R5\nQWUSQ-07O7O-Z5YKW\nD4ARF-4KQTC-3SIPK\nNJHP1-3CC1T-9OTMN\nET919-50DZL-Q7ZVC\nY6Y4P-YELVN-QXC9H\nQOT9K-B7HS6-DUZ1Y\nN8MBQ-DDLIJ-M0J85\nDBYZE-KYOD1-I9RHT\n9SW3Q-IB79H-XAZ9X\nGER40-U56F3-D0WLE\nY1E6C-1BINX-2ZBGG\n05OJW-LMM3P-4EKHC\nYHWRK-HM9BR-9PY2S\nK1B8V-K67LJ-SA0C1\nODM9L-E1X9E-F4HBW\n2KDFT-3L014-AKTV5\n61IMC-72HLQ-855ZJ\nSNIVG-UW0GL-IYUQO\nLKDNX-1ALDW-91QFX\n2XQ78-7MSTI-P4T6M\nKAB76-XW9WQ-O37TJ\nIR868-5IVFP-HRHC7\nUGHB7-JFJ46-H82YK\n2GFQG-Z1LAI-R1YGN\nJ501I-RZMPN-87K10\nK9VP4-PB18W-B7EZ4\nWWWHW-TUXI6-119S6\nUNFG1-UBQGD-Y5NV9\n18FII-LB3LP-8GKFA\nMXXC7-Z7GXT-HZZRE\nOETQ6-9JPYD-94JNG\n4GN1B-SGG4J-LWXUQ\n9K7EQ-KWIWY-WXQIV\nC55JO-07P8E-P5SU6\nV20AC-VM720-PI22R\nY4Q25-BASD9-IKNZQ\nQ1EZN-KFZ0S-VVQIX\nX3QCU-6LDAE-6Q4YI\nN7O8D-SHNOC-BL0SE\nWUMVA-FVLAD-7QIBQ\n4S2BC-F80WL-R3LUR\nP3MDC-XSDRR-XA0N5\n2BQXD-9ZIBC-69UJS\nNGUIP-BWLF2-WADYN\nC30GA-AROKE-CFK2G\nSEK0R-OVFPJ-0GQLK\n8Y5EB-JCC5Q-4M0SV\n8RGI9-E72PY-GL8UU\nGPBLD-KNESD-QD532\n6Q374-DKS6R-M7ZT7\nP9YOL-448UJ-7CI4D\nXB7XB-TLOLI-HF5GX\nTP12V-YUVM2-NJWF7\n5D3WJ-0LKX7-U8QRD\nF6FL0-PSX0H-ETBJ3\nPREDN-D2UYH-13Y0Q\nZF6BB-L3MLU-XBIN5\nWMA5U-R8X2W-8L7AT\nI1LIW-V9TKU-5F5PF\n1E85K-XVXU2-BR348\nHFABH-O6Q89-XOQBQ\n7FFVV-F5UVX-E68T0\nRYZO7-EX1IP-K5X4X\nVQ9KI-2LIZM-9U08B\nKX7JP-OMFVZ-DXYJ3\nKMJU7-5JU1R-00K66\nXQ6A7-EOVZP-WNX9J\nAYEWE-5UITG-PQTUK\nIHMH2-HAXAS-B7EGF\nNM02Z-42AGT-HIQ4Q\n1HUP5-CERPV-YXZUQ\nLR811-F18GE-72JMR\n4QCNG-WWIYP-7B48Z\nT1WRP-MRD28-X0440\n0RFNV-7UAB3-1638A\nW5K64-BWUNF-5453I\n9KJRZ-805UW-9NQ7E\nLNPEQ-IIIF9-A6AAG\n7Y19H-VUO73-7Q6P8\nKC7AC-E58OC-0OFZG\n303UL-9U9VE-3RQ23\n390QV-F55OQ-JFW8Z\nABZVR-I9AYR-48XKL\nWTCND-1W695-QJ2I6\nBQGTB-MILNR-ZMS8D\nEW02A-5DFWZ-PFT40\n1OMV4-BR5SI-668KX\nX7S35-5PFOV-83NJ7\nR03U5-BE06A-LZFQE\nIQ5FC-RN0Y1-1DK2P\nLUMYL-E26UJ-JS0NX\nL06R8-66LPD-HPRU1\nL5UQH-URUXV-ACNQT\n3ERNP-K4INV-RM19Y\nQ0YA9-X0WJZ-N9YOQ\nX94IT-B9FFI-I26GZ\nJM0R1-OQG5V-90KAB\n1XY28-QXLP6-56J8Q\nFW2KN-SONLF-T294P\nDMUIB-KM506-VYSFN\nY7TPH-MSZ2T-NCK4Z\n3HMMF-UDADZ-C80DQ\n66TZR-XIP6U-Q9KRJ\nFY4O2-AXSZI-2U985\nIMUBZ-SO0LQ-RODFY\nGYF0G-C1YWN-FOQ6T\nIMSQ0-1PN63-H010Q\nWSFRW-KTYD0-O7ROM\nYPT2A-CWH1Y-CV9GW\nSAH40-8WW37-EK9BA\nJ4NSB-7XN3W-5AX29\nJ4IY4-NNTQH-6EWU8\nD9LH0-RLFQL-LVWFP\nJLJWM-L9AIL-30J3W\nT581V-8QM9S-7XSWD\nDQIOB-1E99Q-94IDV\nJAEY2-WBK87-TAH7R\n040X4-TL3DG-JGRV2\nL7WWH-SODOW-S0A06\nRDC86-41KDL-BEI1X\n243WV-7CWYA-1Z0U7\nDWETW-EZR9H-YUU40\n4BRXT-XE3RH-3J8ZL\nX4UX1-0GCYI-6P0L5\n6S71L-UX6S4-I476I\nXP9SP-P1Y9H-GH16W\nNC3CO-3WK5V-CXTVY\nZSPF4-UYUWA-5YMAJ\n7SLQF-9EI6I-L833G\nQX35P-5HDP7-7TXID\n8GZZP-YE3KR-GPFMV\nMYMRD-6TS62-112YK\n98FZR-MMLNT-JUBJ7\nBEVZN-I2Y5B-XDPXM\n8WQ7T-RNU5I-DAHGH\n8JMNX-MUW0N-D5IGE\nJS4BI-CZM40-MHRCL\nNDFNO-6AFAZ-DGU0J\nBJDJU-8LPDF-HMPU7\nG3XV7-6DW93-7DBVO\nMF2K1-CR3VY-1DR62\nXVLV2-D096O-2ILOW\nBA94B-PPJOW-B3TWR\nQL8D9-88UR4-A77CF\nFE0QV-6IPFQ-3A93T\nQRBKN-KFRPP-MO684\nG8WLC-JD1EG-GEGVI\nLYEJZ-ENQJU-7641D\nTG8Q4-SW4W9-I2YGD\n8V0WJ-D9D7E-EXRWT\nFC7HY-42XD8-30TKS\nBEZ91-85A4W-PMT9R\nMBW03-ZO79K-KK2Q7\nU2JWT-3XEON-OJS2P\nNTKR8-0CACH-9ZUNF\nGCNTW-T40WS-QRUGE\nC5WRQ-GS9TE-JG2P4\n1QN27-VGWRD-67BQX\nF3BJK-FOMFM-GPAV8\n0NF1D-XW3ZJ-NCSUK\nS7YT3-7RE11-DKJR5\nGUZ3F-GJP67-EJ00F\n2MAR6-0PA9W-Q1C0N\nOW9PF-9IP9K-9RNYU\nRO64R-3YCU2-M6Y1Y\n5ACMF-KSQ9P-LDISL\n8KOJC-DJ63Z-UTMWA\nYHST1-QU8SS-FVIAX\nQGYSF-XVT6T-OITZW\n6QELB-0JVKV-KS7XL\n1X3ET-4JXKU-2SYO9\nL8LFS-XH83P-Y18TA\n9QEUX-90LA1-WHYXE\nSI5NO-15LXD-OX3V6\n5PUB7-CGHY0-6PCXD\nOO874-HNXBY-RZG24\n0HM7C-R48IC-X2KU7\nTE46A-AXE13-9308A\n6HZWE-2XNOX-CIQ7Q\nS3BDI-RCWCG-QUASU\n7VGOD-KL81I-3RSV9\n38VQC-3BJDR-39L3F\n9XJLJ-NZCYV-GSBJ5\n9LYXJ-F6BJT-A55XM\nLTG16-DU4XL-QNJJQ\n8OYPX-FXVJS-55S9D\n179XT-LWW84-BDIZJ\n0CDZT-9JUAV-ZPB90\nA72X2-QTRG8-A5C5X\nVXHPS-YRE9M-LS2VC\n4AWQV-5FJEK-VT6HF\nIDZE6-5XKJU-5V22A\n8Y5HK-E5WIA-AYEMR\nITAY5-4SO0E-KX6DM\nKR9E8-8JA8L-DF4PR\nX3G1K-H9G6R-T0APX\nLGYA7-8K3Y3-4W218\n7EKDX-K9FP1-L32T3\nGS5GB-LAS6R-ULM95\nG92YD-F1W4B-5WSJW\nNHUOH-TS6N6-1WPFN\n84PJT-WCXD9-VNVBI\n29AZZ-SVBCR-0XOX5\nO1YML-IPCH9-1FZDO\nA448S-A1ANR-MJWVF\n7BQNJ-PH6IF-5V6U1\nMXH5X-365ER-89RWT\nT7WSO-PDURB-7MNSV\n8L9X9-OBLZT-OFGVL\nO21QR-BVARY-Q6D24\nOBSR6-HCQ5Q-7WGNM\nX0JWI-1UR5H-66Z78\nNXXMM-YRLFK-3TBJH\nOT8NE-EKFKE-O0OSE\n0P540-4JOMG-RSRUF\nDVWQS-0HRTO-9PISL\nNNVKI-YI18A-1P3FL\n61W0T-2RCT2-VTLYQ\nR4CCZ-JZL56-KHOTB\nWCUKP-DDY1G-9HLPB\nMJHR1-B5JKC-1ODCD\nFX4WW-SE7E7-98HTS\nJKY9M-1610J-VO80C\nTOWTD-SJIPV-OBJU3\nVSRVS-CRSE5-E7DVX\nD2FJ7-5C1DY-QQ8RE\n0081Q-52MDY-LT1R8\nY43GW-V1ZVP-YC4GB\n4RH9A-O1OUK-6R6WY\n3DKEM-LQRP6-IM64N\n6HBM0-B8582-UY3OH\n2YGGI-EBAQZ-I7FBW\n0L41D-9A8RW-Z5X51\nUSOJS-BGJA5-XV794\nZAFH0-U98J5-KGXL2\n47ZWU-DFSCN-MWG90\n6VJDJ-GMUBQ-0UJYF\nFU1E0-DWKV7-4PR7A\nB87CL-3YC19-621TD\nE5OZB-XDPBT-ZJ8CH\nEWCWZ-KRKCR-3WIVE\n441IA-ZX5M5-V8RPI\nYRXVK-U44ZJ-VW596\nKYQXZ-4QV8U-MB5ZW\nGQU10-AN4NT-KMNBF\nEYKU3-5E8Q0-TLQ83\nE2X0R-PHRQK-JZXLO\nMPW05-F1IWV-EODY4\nF0QSH-7K9AC-BWK5R\nTUX27-0MLCG-YQBPQ\nZUO64-PSOB6-6NBUE\nTTSZT-QKIYO-7EQ1J\nCK488-5MT30-RM8WZ\nV8DA1-A4P67-LO8Q6\nGXA83-KY2QM-RAYMI\nYZ685-FFEMK-PTUYW\nTMYL8-B7NKF-9GFG3\nV5T70-BR2XK-PT94Q\n5GWJJ-BAOI2-6T6QM\nYBYG0-4NG39-TC9G9\nKLY1B-TW9AT-PTNIG\nZYGPN-WIFBG-89W3G\n4FUGI-O5N5S-PUF1Q\nG7WSP-93XJF-Y0YFY\nBFPU3-53AZN-BE17Y\n1WLQG-0WSN6-XTLFR\nJSC5L-VM7D4-KBW0F\nP08S4-LOJ89-LKV3N\n95TP7-K9QD2-1MBE2\nBMRT6-SCKY6-TSCC4\nA13YS-XT980-RMSAG\nEC481-GKYT8-DCQJF\n2CZMU-OT4YR-YN8FX\nY85O5-326X3-ZOG67\nH83XF-GDLIR-5ZU87\n2Y24V-ELT8W-INKVK\nVWS8R-D5YM8-D6FFN\nV3HU4-ILPBG-TF6QR\nTAETD-FYJEN-CXO3E\n4XOYT-UH8QV-VG5SR\n02PH0-NVO3Q-FR2WK\nTVYJE-WE1KQ-CG1NQ\nFJZ6J-CXU86-8POF3\nCQ3FZ-K38NP-4ZUJF\nDN3XR-SE1AV-7KEGD\nZK8HZ-0ILIX-BCCAY\n9MB0Y-RBO6R-HJ7EA\nCLM64-EO0OQ-IJYOI\n959DN-W64CW-R66GC\nGUPR0-JHAK2-J3Y4P\nZT2I1-WPMNN-0IJWN\n7EWV4-LEQY0-B2HUE\nE4R9V-1CVMT-J5GPN\nVLWWQ-E30HJ-9J12L\nGLD59-DH1HT-6SA9W\nW4VM1-TPZY1-1Q8O4\nTW8YA-JB6IF-W892S\n32FRR-UHPBW-6C2FL\n9769O-ZOKX9-80HWZ\nZSXEM-O3K1T-4C1F3\nBXY8E-62CVV-HDN1I\nU2WFQ-6IRX8-TG04C\nQN38W-JP46J-0Q750\nBZA1I-QPLF8-ORQHH\nH7GB3-OHZIJ-Z48I8\nLQ3E6-YKCKB-0E793\nBIOBJ-RV9NV-MEOH8\n4T1MS-U23RO-M3JDG\nTI2N4-ZPMG0-UMYNB\nXE5OE-IFFTG-DFN7V\nJW35H-SAN6A-G2WYW\nCL690-POWPI-KF979\nTSX5R-7GO7G-3LPUD\nYTXKV-QK03T-YI32C\n86FH5-UXB04-D4882\nDIRNJ-AICAM-XF7Z1\nPWVTS-3JG92-HWYJ8\nKQ0JM-U0XMP-854V9\n5CG7Y-MTJGO-1VYUP\nPL8XL-FFP6V-RWKT2\nOQLIM-9WFIQ-R1LLF\nP2M76-CXHN6-ESZDG\nHXUOS-V4CJL-298W6\nW1F4C-ZI6I8-KHBFV\nI450A-SW909-J0FN4\nIP7WM-XTMV8-OM9PT\nTUAIY-RFX2Y-A7ZAJ\nT6XB6-76HT6-GFKMA\n6AXTP-OLF3N-IRTHE\n0MOAR-F5L98-Q7F9O\nXNL4I-EAP54-XRLMD\nVN6H0-PVHZW-SV0I5\nH6JN8-C7LSF-SOUJI\n4EDMH-LHZ28-UJDRX\n8Z3RL-QFJQ0-784ZZ\nUX5QS-J0K8U-2BAI7\nKNUTM-K7S7C-7UDEN\nCOE63-0UT1Q-BVM5E\nWX7RW-TG7WV-L6VU8\nPWHBL-IPX9U-DDMAA\nOHDIO-5FRCM-9RLSH\nCTL9Q-FDN3K-X0U6Y\nM8M95-0XWHF-HIDER\n03E82-BPC4C-DAEN5\nHHMEZ-SNJSR-Z3YOM\nIGXWB-HTUPO-25AQE\nO54OJ-Z20KQ-EF3EO\n3VJ3J-QSZ9G-6GVMM\nOT6OC-ZHE8D-F7OJ0\nOH4DB-X31DF-IWB4W\n6TQRW-0WFZV-FVIJ8\nTPEOQ-KX1YO-48GN1\nMUQ4S-AU6SK-1C8H8\n3REJA-E5RIW-28JDL\nIUPJB-HV4F7-O754Z\n08CBY-G4PCW-D07FU\n9SAE1-WH6LA-LEH6D\nXD4KV-S6RLN-7J37O\n7HTAN-WFOQ2-7W0LB\nQCKQY-07SET-BEZCS\nWIL0K-0FCG5-VO21O\n5BL01-EP7QF-3YOP3\nCHJJT-TLDPE-5PGY4\nNC4WA-SIYZ1-XVRGF\n89VXR-TKX5L-OKBXW\nQ6RMU-4OYDS-2EW9U\nKKMNC-LNG5V-ZV5B5\nOY96J-WYRLM-8MQP6\nKHN3J-2AETT-ZVG3D\nY7DRS-FY58V-HG3EZ\nKB0M4-8WVUN-5UZ32\nOF5SV-W3ENK-UNOW2\nTQB8T-4VUIG-7DNWG\nG5PH8-JPVS0-5TFKL\nAS595-CS8CO-EUD2A\nSX0QL-A8XQR-QBL2O\n9RNVT-HV08Y-YR11M\nKR7F6-7W6AD-OUSM1\nL8K47-KDLLN-7DDLV\nH84DV-NE36G-P25JR\nD60ND-N096V-MGECA\n6OBJ9-L9NMK-DEL5P\nSHQKB-DUD58-N1LQA\n7Z4JV-J97R6-W4K5Z\nB7KI4-8EF01-US354\nI3KVN-6SA2C-RAXTQ\n3TR3Z-3NL4K-D1PR2\n0TFAZ-8L4BT-EFZC7\nM1XLM-KENQC-VRW46\n4TF5J-2CTHR-CEKFL\nCEUCF-J6N2R-OLV99\nNWW6E-GXWB5-SZLWF\n9GDRV-MPDFE-AJHTT\n13XIY-1NES0-DTU1T\nLQ03E-SGR9Y-FGQSB\nLZRJ8-NR762-0NSQX\nDD1L8-TWN6D-H4KSU\nG5V70-G146Q-RH6J2\nHVM70-FMNRD-KQ90E\n6Z0MM-8NRT7-Y4X8J\nVZA7X-4STJT-5NY8M\n2D9ON-I7S0O-FISX8\nOEQ84-5W7MV-9S8IQ\nFJE6N-0CU1J-PQC5Y\n1AVER-36LNU-GJPU7\nVC47F-NGLQO-R4F4F\nVNF26-HPCM6-754DC\nFTRLN-6W5VR-78YHX\n8NF9B-0LNAR-UHRFC\nUCZVL-LP6I1-2D9RK\nEF013-7A5IF-GNME9\nM8EAD-EBIEH-VNL25\nP9Q07-QVF7N-J2D9W\nJ8C8K-ZM6MW-EL3K3\nUOEXK-IHOFW-V4552\nWMBRH-O2BEW-1K8IV\nDC8YH-HICN7-5ITET\n2ATYU-P9W53-H905J\nFSC4Z-4N3PZ-FF1WR\n3S8OJ-VML53-5EBM8\nT4RU0-8TWJV-63Z9U\n7MBHU-A9HZP-FPIXJ\nGGAI3-HPVZT-3400K\nSQC7G-Z1OSQ-31V0K\n9T5KJ-F1I18-M2KBE\n457B7-YETXI-JA4K1\nF4WN1-72XIY-LMSDJ\n0DF9C-MBSRI-6FUIL\nFWDDD-5CRMG-4DNCD\n2B9YQ-V90OH-P7YBI\nO3BKY-OLLZ4-K7RTH\nSMK1S-8MIAQ-9ZGCX\nVJ3SW-M7HUD-YUM8O\nNGJGP-ZWUYA-ST3CD\nIUVXM-2RN8N-VFN3V\nBXUNJ-R89YZ-T55XK\n1UTFE-Q6SAE-8263L\nU9IE7-PGNID-JPJ4T\nETBCV-AFBXO-1TV5B\nV889H-9E5U0-PREB0\nRXFFH-K1LQF-7P466\nLZCIT-AE54U-VRKKN\n2F4M4-3DTPF-OFTJW\n0ADKQ-XWGLY-2DAW7\nJWU94-TRGF9-5WF6U\nWP1JU-TKJTQ-AL343\nBMTRN-1AMV6-CQBJ2\n5B3AM-KFF0E-8YUNX\nOAZT9-4A963-YCCW8\n5ZE1S-XPB3Z-7FU8A\nDR2BK-JQN7P-3V2KJ\n92W2J-4EA3Y-9DSL2\n8NCOC-HDO9G-URN5L\n3H4XY-CSWOE-MPXB0\nSMH3U-C2C1Y-S1HUF\nL4M1R-XF6BC-9S2QR\nZ23KJ-THU1P-NJU5M\nWXW6E-0GNZW-VQLD3\n9QEXB-2X55T-ID3MU\nJLWUT-543Z6-94P39\n8H3II-UC0HW-NH7UQ\nIE9FF-TT2UL-FVD34\nL2N94-9NPGP-X3SR2\nGLUB3-ZWSKR-D6XFK\nURBBH-7ACBD-TXHH4\nGJGSJ-0NCTH-CW7M1\nXAKUC-M2D7Q-1MOEW\nDZ4HR-2OIZM-UI5ZV\n5DDYC-BIBXJ-DTR4Q\nXUK4R-IS4N7-N8AVY\nFS0ZA-R2UL1-NOWBX\nWH0R1-O5LGN-LH3O5\nD4DCX-QKKNJ-NVPII\nAJPKO-3MNRW-7JO7G\n0UR0T-JXSTE-BHAST\n8E7NT-TKB6E-DV9SH\nV88DK-WEMNM-3VHA3\n80NIU-VUJ84-HVXPL\nT4TZF-BRZJ3-VT0K7\nNLKN8-Z5IHA-0IDL8\nDQNU8-43JEJ-8V5KO\n0KLCD-JBQAB-FP3M2\nMAYPD-DX71W-EJQP7\nQ9IAC-M9YPN-GOLU7\n2N2W1-3JWJC-7SGR8\nRLTS2-8CQ7U-G37C9\nW7FEO-TL04D-6F5SZ\n8SWSW-P9D54-QUTSI\nT96SW-N1Z5H-D3NY0\nWATCQ-EXNDU-J0YJ9\nWB9QD-9OZRF-NGUHE\nYVW4C-DEDQL-A8B8F\nRC2MW-LJ659-Z9I36\nVNISR-SZS3S-SDMYV\nA7GK7-YH8TS-A0V5X\nZ7S8A-DG60B-NQ2P6\nUF8N5-I9TS3-0E6OG\nERC7Y-0EL36-HCDRS\nKET8H-TGA19-X3LPO\nMSPLR-AVUAI-M4GKA\n8JAM9-MHQNM-99RFU\n1211T-IQO5C-4BJSW\nPH7NX-EAN8Y-2APLN\nZFRHZ-6K8SG-K3Q5F\n0STW5-9W0DT-5EDGV\n1RZSY-AJE9X-ASGOL\nI6MTA-40VFI-C99OI\nLEW0M-2GY7Z-4LF8M\n0MQWV-TYP3S-0UM23\nPTSWI-EQ5WG-4FF6N\nHBIBW-88RGN-S00X8\nFDG1I-0OK9T-2NM6H\nLU2UU-AVF0X-GNTGW\nNXKVQ-I8N3M-XMY1T\n0I3EK-JGN9Y-9B1P4\nF6R4B-0A8FQ-K7HHT\n6J0Y7-EF9OI-7MC8V\nFVEAF-6YF4A-R0QQ1\nO7YHG-YQ4QY-0KDON\nJV2G4-7HLU6-MLA86\n7TLU5-DRHIR-RAPQV\n4KCBS-30YDB-FHP2Y\n4ILNU-OIXFT-07GEM\nDW7U1-NFVKM-1YA3G\n2X416-0177T-ULHJM\n8RGID-3XK7E-2G353\nNT0WT-BBSDZ-91RD5\nFJ4CD-BVDWQ-P94JZ\n2AWX5-5HQL3-SWJBD\nUVGXK-VD1A7-F6RR0\nXW8M5-INRQI-P145Q\nUNOEF-ILPGV-XUZ7S\nSZ5Z6-MK2IG-HNGTP\n2X5PF-FP23B-FHC00\nE64W7-449B5-5M3TC\n4C400-0KUWB-DAQCX\nW26Q3-8NIRW-DZH21\n7DS8N-487H1-2PZ31\n5ZT2S-SOORX-4WK45\nZQB73-61E5H-ZSD4I\nVFTDW-Q4WGQ-6PGYK\n0OIR2-EB58U-J5OZI\nAF4Y8-1YAXY-WSEDX\n110XW-5FXG0-ETCED\nPYCE8-UXHB3-FC0QP\nOQY3U-NRDSY-F1B4L\n0RIB4-C5UBA-IX8GD\nSXELP-UW1EQ-UR07Y\nB1JF7-ZFWOO-WLH9R\n7M1F2-23L1V-ZP5UT\nLJTS1-OD7B3-YQ292\n5LZI1-ODQNP-XQI2D\nXCR7F-QZ723-KKPHE\nR2JUA-HOSC7-HWG3H\nU18T2-061W8-6RVWO\nTF1BF-0EP75-V2WP4\n2WKCW-G9MEM-19FYT\nT8ZUU-XJXPO-1EROV\nEX68D-U0ZKW-YC78E\n686UB-H090Q-JCKUP\nWTM0N-CCTHY-3RAXQ\n1GYLF-CO19V-8QGR8\nY3MDQ-TL5DR-U8SR9\n2N2MX-UYQXK-F0PMT\nL6YBO-2T71W-L6N37\n4DV4N-0O1XS-Z1QSW\n267LX-G4VXT-L3FSU\nHEL7K-UV50S-C0PT8\nH40YF-F8WMA-9WSZL\nPCWSM-Q490F-638UR\nO79RD-IUA9L-RHKAV\nRBRUQ-4IQID-Y5IJN\nB79ZB-X8JH8-M4TWB\n56MV1-JPRJ6-Z219M\n5RZ91-AF74N-OMLC9\nTS34F-SWU4Y-WPFGV\nTD4G2-8GEY6-LC6Y8\nHWYMS-I9ZPR-0EVG8\nSI2ZG-B5VLZ-OV5SD\nK08OD-PHQI0-10YAK\nTNUXL-UZZUE-G8T21\nQA1Y1-9VL7M-H3N6D\nXD36K-MIFZ4-9HH08\nXCCPA-GRNT0-KUF6G\nPNSCL-WWRCD-IH7RU\nWNDVC-1ST9N-GO1YU\nKM0NR-YU4UB-1GODW\nWLCER-EL26O-QGAJ3\nEFOZA-WZM4S-R7WYW\nQ6OM7-U0JFG-AO5BI\nCT803-7GJDY-K5O5T\n8O853-SHOU5-253C3\nDS9RC-WLJ70-8AZAM\n01OPU-DQDUV-RKAVY\n5UAMH-GPXFD-EALTB\nVWQTO-J6IZH-8E83P\nJUR1V-MYWPK-LOPA3\nDB4RX-2S67R-5H5YT\nK1ZD6-TV3FA-TM5KV\nFG7FD-D40ZE-39FZ4\n3R5N5-6QGB8-GJN6B\nLGKY8-FE0ZK-N4TNV\nKWF5W-A5WF6-2K6QE\nWAEBN-K09R4-01YUO\nUY9AN-9PQS7-8QKPG\n3VSZK-WJP7E-GI0DC\n2I5N6-8LDNF-86SXI\nHY6YF-XTQUW-QOLFY\nEHOAE-H95ZS-7UK12\nRKYLQ-1KJJ4-SIWVQ\nSBYFS-1QUCO-CW5S0\nEM5Z4-SJZ1G-ALB2S\nBXXGS-6CO0G-BPCS2\nR1UC3-0NYGX-OCGMF\n915N1-AMAVT-JOLAF\nCS2G0-RYNVR-FSB76\nZ0E68-0MACQ-2ENKT\n18VLX-R6GXV-2TE9N\nF4UWW-F8AD7-T0XYG\n5VVA4-539WK-8RT9D\nV2OMC-G7XPN-ILAJ6\n7YK12-WYCMA-8NDMX\nU91VK-GXS3U-Q3HMZ\nXVQUX-4XWR4-WRKQ2\n4RUMW-8PI10-54D50\nPYWY8-G5L3J-I6B6Y\nPMBNH-74UMV-W8LUF\nTFI0L-GYMXL-NZLBA\nGR19J-4TX72-TJR0J\n5RHLO-ZXWPY-2ANED\n9SK6G-7C72W-XZGPS\n89AI3-PM2TL-BXSQ8\n9LJSE-X4Q3V-FN9SU\nGJ9O6-OD23E-Q2G6F\nX93S2-MSBF2-0D3OW\nQ3BIJ-KNXXP-GPZ38\n6U3T8-JEQOV-ATD81\nCDZB1-LASWR-P21C8\nFXNJT-SB0JB-D5M9H\nQ47QK-TTJ0L-MOFQU\nIZJWM-2G2P9-LD214\nDREFP-YOV5W-BV4ZJ\nITLGW-FLEKR-FVQBV\nWFKBT-UNX5A-XTJBS\nLVUWC-37S9N-XQTK5\n0N98I-KUXIU-Z4EN2\nKHH3T-ANN53-NA7NB\nYJVK2-E954D-BS2RP\nWJUKN-V30AB-OOH50\n9XAIS-F7K7A-43IBJ\n3ZCUZ-GK17Y-XW7PT\nLQXNV-N18FE-11IX3\nCPFMV-R6OSZ-QGS2Z\n9VITU-X9ONY-SV1U4\nX0P07-IORKZ-Y4BU0\nT24GH-L0RFW-5ZA1G\nX6E8Z-YTTFE-TBFBV\nBWO7L-1XZFV-DM87I\n0E8BF-9M0LX-ER1SI\n5V3ZR-S70H0-4OI3W\n17FSY-I9UNW-N3Z68\nBR5KT-1NZDB-O82W8\nQPK2E-LWMQO-O75WH\nYS9I4-897MI-4XXW2\nDZ7OI-RXIQI-XC3NE\nDS4G5-7DEY7-1KRX8\nC2KEM-Y4IXN-SO4UI\n37HYU-TNFX8-B6PT0\nHU21A-IFWUZ-5XKNK\nXSFLT-43VZU-BVB6Q\nHYUK4-QXUL6-YJVBA\n0LV4W-V6MW4-FRNST\nTQSB8-QUIQH-UPHW9\nHXMPU-FLG1B-MUGDW\nGV0ZE-GYWAA-LQAFR\nW03ZE-EL0C4-1RR6O\nP304R-6TCDC-K8YE0\n7RFUV-4VFHF-MYMLG\n0ALVN-5Q2NZ-2ERYB\n3CF4Y-AYE0L-XXDVY\nMA6OS-9945M-MMV07\nTAKN5-9GCFN-H1IPE\n2TESG-F1WCS-4Z5R9\n8276T-EYS1C-2ER3A\nYNG7L-TIUXB-DD9TI\nIHX6X-MDLJK-839RO\n5L5NJ-QDX63-1ZUIL\nDB3A3-9GEZ4-IJTXS\nC9U28-6BQQO-HF8EB\nGR2R0-PIDPI-3UE9B\n04BFQ-S5NQ0-70BTS\nWUFC4-LHNJ6-MPAZU\nHORTT-2K2I4-ADP4Y\n4HJFU-TCK2T-SFJYX\n24PER-H6D4O-72QEF\n8OSV4-JA5SH-VPCOF\nMS2TH-YRSXM-0MNSN\nA2L7L-KDFEK-DOZ7W\nDN904-HRSEI-HFP1S\nCC0QR-RTU98-HAWHH\n1AB1Y-7JGZV-YFL8I\nIV7DY-85W5X-17L1T\n7BTVD-PXE0Y-W0HBB\nZIZIC-6G0BM-ELXDC\nU5DQI-6TQJY-I2BFH\nOZ0YH-KQ4MD-R5GB9\n7F04X-NYVEQ-N93EM\nF3O4A-AE22I-K9D3D\n9QI03-XE9VF-IP2QP\nFD7KM-72C9W-DTVXI\nBKOSR-GNMAA-BR5KU\n95XJ2-4XCA4-VAQ3H\nPM5II-EAHO1-HY4HJ\n0AGJ9-L7VO2-VXPOH\nBO7ZH-U2DW0-J8VF4\n45C1R-XRENZ-6LPVZ\nW0TFD-QDSOJ-14NLP\n2V0VD-MHHP2-0R4W0\nZD8HH-PBFAS-7HYLR\nU2N9L-X7YPZ-RZ59R\nHQ5ZF-7AK66-VZXCK\n5DV7C-02SE7-3H97G\nB2QOW-ZFL16-YU9P3\nJZVPM-63OHD-FXGBQ\nRQUVJ-5BE6Z-CNVBE\nD2XOI-H2XDO-VXMZN\nS14UF-9BOHM-2U7CN\n5NLDY-4SF85-OF300\n1K3CP-TB0AW-7BZYG\nKJEM8-7KNYK-FWGNC\nMGQPK-UVX7V-GXNHG\nRDFJO-SNIDT-OROGJ\nWP1G1-D3HEM-Q8ZBU\n2LLC3-OPFC7-SYPS3\n9GZTE-F8X6J-PLM48\nY7FML-QKL63-PLC42\n7J4KV-SSJWX-08EJS\nFRSKS-3A55A-OFSWH\nJCHC5-3YD3M-4R4TB\nQZSED-2MWS6-C1QNJ\n88UNG-AHN6S-5WOZP\nHJNON-KL50Y-BR1KJ\nJ8NUW-27ITI-BGQCU\n8ZN44-LG2PC-3IWR2\nOJMGB-2SSKH-2IZ29\nEW9KA-5GYBB-ORYAK\n49MM2-0HS3F-6M0CQ\n7BE27-G2P7I-0R8PZ\nE86VR-S27TO-JJP64\nHC05U-PSR5Y-POWRH\nZGVTJ-WM9EA-U3DNQ\nN0NGL-1PWXJ-T3BT4\n0KZB7-WIJH5-98IVX\nAT8GT-SZXZ2-2XPCF\nLLXBW-CH7RL-FIETZ\nG15UM-ZIOOF-0XRY1\nZ2FCX-NFOPY-LJWAP\nMXULI-KFUVK-0YDZ7\nV15FT-YYOL6-JUNHF\nV9LHB-0Y0WP-IIOYV\nSFSLM-74I1Y-VPPGV\nK9WQI-PH51Q-W4BHS\nONYPL-580D8-GFU0R\n5X8HQ-1RM3S-59VDE\n1IC43-AC785-Q5A17\nUX8LA-9ZIHM-OPAIY\nAXDAT-MS2UE-PNGOT\nHMKS5-09WE4-OK8IF\n65YMV-9S94N-2VGMR\nYX4Q7-YIOAU-YHFGY\nT15UL-V8370-E055Q\nYUYK3-806N5-8G92F\nSHFMS-EVSWL-FI5VG\n6E04O-EZT6K-80PHJ\n6TI9J-71FKD-SP322\nLRFP9-FMZKK-6JT6L\nNE94Y-G0BEK-PVT90\nKMCOY-MKK0X-A199U\nMNMNJ-S0XSJ-8C14P\nSR8QA-MJT6G-NEYYX\nHORVX-8HJ28-UMKFU\nKH2QU-B4XUC-1WQO3\nR9MEU-0R93O-E7CG2\nBFX89-YXXD7-7Q0D5\nR2H0O-IJA1X-6T5Z1\n9B67N-H9O23-XCIB0\n2APAI-NRQF8-MWLFI\nW781S-5ZFWC-2V6E6\nM1JDD-780IE-NX24E\nUA4KT-FEA33-OQ23G\n3ODD6-RW1WW-JLOMD\nJF2Y7-9JGO6-NNRIJ\nR7148-0SUMT-9IJRD\n31CQC-VA1LC-8O142\n8NXNG-LUP36-KFU92\nCJXQS-VHRRN-7XYRE\nM5NE2-E88SC-R3P4E\n3EYUO-XCALR-2KBEE\nD0BBZ-2QXSM-E79UU\n806YJ-9FQF7-H4MM5\nZ07LX-1FFFZ-QVSA2\nC9VBL-25951-YMVW8\nEVSXE-5I7YN-OHB7T\nAOOOD-0AJ3Q-0H5QD\n9IXFM-DQ802-Z3BOT\nDDDSA-F7IJL-GX5X6\nDP0F6-6NKD8-VA3R8\n66QCV-BJKB0-FI9OJ\n73Q3D-577HT-ZJXAJ\nACA4C-4GM5O-EK5I5\nN6EJL-JH00F-MCDXK\n24FI9-WU7IQ-49M7I\nA0SWI-VS97Z-LAOEA\nD5IOG-VLFPY-4ZJMZ\nWK25C-VNUFM-RIB69\n10L5W-2H4EI-MLBHS\nR54ER-Y4N53-UXLH9\nTTQ5B-YLHXT-PG7EE\nFZNX1-3N0PE-JSWOY\nZNGYO-W9Z10-M9B7H\nN6DZ6-YL2X3-Z1X4D\nYR2D7-0BORE-QUM39\nL6E4R-D7LIM-XKCVU\nSQV44-IPMLW-PZ7BK\nQ7HZ0-4XESV-NAS3N\nUGNF9-YO6QY-P9FPV\n5DRYZ-S5YHY-Y7S8S\nASS4H-E7QSE-LLNKD\nE84ZZ-CKN00-PRP2M\nPTKDX-WI8QP-9M3V2\n51ZU5-2F795-PKVK5\nYPGC9-JTF5L-PIJRF\nSSBOR-88Z6C-Q8QHU\nGXVB2-OMD1U-H6K72\nKDI07-WNUDH-NELAT\n2DZHP-CP03R-NNJ5N\nHGS8I-R3ZQ7-JI8LH\nQUK0C-FK2DU-S0NEE\nN8U01-DS20S-V549F\n3WROL-UL4ZS-YAY9Y\nBAI8I-YH6LU-OEL02\nOCWGO-SROLK-IO3XK\nYSC7D-310W4-1J31V\nPXSOA-9F2JT-RMIER\nOBFTX-J1CN0-QBLQS\nPYJD7-YRP1V-FJDWC\nS0Q69-WEUD3-IAQAP\nHLI0E-4QQ09-QP6S1\n6T0JK-9UMNC-OFFPK\n9Z6J7-6OIQS-Z00TF\nQ5GLE-PDXF4-LOKC6\nIED67-O3E9N-C43NC\nC1ZVI-EGBUR-NS9KM\n4MOOB-RZL31-W5RZI\n84ONU-EIH21-55AVZ\n064SL-4OAK6-L8OJX\n93M9F-30XSL-MA5HT\n3OV6H-40CYQ-F0JH8\n26EX1-8RXET-BRSI9\nMCK77-3Q18Z-D5FXQ\nCQ50C-3L3NB-HFJN1\nDCL3F-88B6Z-VA1WX\n08JVV-U4410-MTZSA\nBVRV5-4GSF0-8C56F\nMYRS8-AEH2W-TXE8V\nNBBBB-8PC1S-5ESOP\n6FHP4-N6FVJ-AIQG9\nAHGV1-OVU1K-RIEYO\nJU7PS-9RHAL-F01FH\nOHQTN-U3HNV-NYU0K\nG5KXP-PILWO-LQ7MN\n5GT8G-BUVHG-9U49V\nSJTSF-XIOAK-S1B3C\n9PUK2-CV9CE-IVLEA\nD54QM-9U2M4-10AGQ\n1676U-LYYVA-G8253\nMEPBV-R2USK-VDP9Y\nBPCI4-7VC8J-69Q0D\nGFOQM-6VU8O-5K6RF\nPGWU3-DQ81W-FQ5YX\nK0X73-Q6ABY-0DSMY\nVLO8W-IXD6Q-VHGP6\nO32QV-RNIOY-EUOV7\nACEV7-GYB22-RQUYJ\n8BYV6-BKEBJ-A24RW\nJRKXA-5XEHW-WW51H\n4WHSQ-8222D-6J1IW\nKBNPF-PSBSB-53WC2\n6QBE9-PJ1LQ-F8BI5\nGEXAK-UIM36-IDWEH\n07RHS-23X6B-SCSEV\nBQQJQ-3ZIJZ-4B7Y0\nAJRNE-WPPCH-S8CR7\nS70V0-P64H5-QN5J1\nCIMT7-2C6S4-ZKX7K\n7V94W-1VACQ-CHN2B\n4RYP8-O6M55-5LJSZ\nTJEX4-V5GYG-8O06O\nVI9E2-XP1WZ-78W24\nNWWC5-OGO9S-OSYDF\nT4LWX-S55NE-NTH3O\nTMNT5-NF0BY-R9DVJ\nX51MO-DHBKI-Q03FM\nHJ7XI-JGAF6-MYHQK\nGIWN5-GNUME-8EQ6M\nV9D19-CKJYR-57JBE\n37H1B-E91JT-PF8DY\nLWTIE-DYT6N-MRPXD\n3RILJ-F177N-XXL3W\nW651G-6WHGC-CIGPW\nA1QTV-ITD2R-C53BD\nAK9MX-LWI3V-EOOI6\nP4YEC-S038Z-EZGG1\n9PMPZ-7GG6V-DXXMA\nY4LQS-LP53B-62P50\nBHBBO-114UU-1QVF3\nS7KF4-R2B72-W8PJT\nQU7WD-UJ1YH-HH81O\n98WEK-KI6XV-G3ZOG\nQT58N-MEW8B-FZSUL\n6QBFC-1X5S7-SCQO7\nQFRX1-0L6C7-WWKHB\nHRBNB-T99TX-3W2UH\nIQXAY-IN3P9-5OFEY\n9HM3W-A2FXM-YTQ6X\nV61A9-3J8EY-N41MV\nZFEIC-SQVSY-KH8BI\n20JMR-O1XV3-CHV0A\nHLOG9-Y4YR6-5I0LL\n7YDCM-EBO2G-OTJRI\nXUH4P-Q5B65-UO95V\nUSWO3-X8COF-WNK9T\nY41TJ-RD2G2-2COIG\n696MD-OCI35-SCTW9\n05TUI-01EYD-R60WW\nMVA8B-RR6MB-PF3O1\nK38HG-8K6AL-MQDIC\nDEW3E-YFRED-ZHEF0\nPGESG-YRCFB-YX4V6\n7XKGV-C93B3-2AEB4\nV2EFZ-Z5ZFQ-2SVLF\nHLML7-2FAG5-BN8IU\nTZ6JC-YJ0CB-4OS69\n8EKIS-DOO8G-HYLU4\nM21JX-QUJG0-L7M0H\n2SRPD-JZVTX-2HSZY\nXUF39-D4M9V-ZZV0J\nHAY4O-TDXJR-VRVPJ\nXMRWC-SIKS8-I03TC\nGEZGX-YXNYA-AABKL\n8MFJJ-0099N-LTKWP\nVZQTM-Q86CC-FY7KJ\n6BVGS-13TI2-PLVL8\n2H87V-Y39DW-LYQJ8\nW8G50-K84WU-V408K\nV284Y-LWLNL-IF5YR\nL8YGS-2C4EP-M0NZU\nA4ATS-HB6UM-H8Q20\nVYIDL-ZN8QZ-F0RWB\nCXMJU-M531U-WM2XM\nTKFU4-196OM-WANCP\nRW9HG-X3JF3-WNP18\nWQCTB-DVMIW-26ULK\nBKHNR-B1Y7U-X9NRG\n0KMLE-WGKJP-E1KIM\nXBQD6-31YJF-CPQLH\n63JBT-5F47T-GYSH6\nOIZ17-3BSV2-OTUJR\nFLOJR-OC92J-F3YA3\nJWM4S-LH3AY-4JVUT\nCZ3R6-2RD5N-P8DN5\nC1ZVP-R27H4-7Q608\nG80MC-4IW2Y-B79I6\nFO3I0-H5552-FE4U1\nP2WMA-ODVCU-YNYXP\n3T38L-L4SJX-TTLW0\nDB1EZ-7VZVR-1ZDWY\nGSTJO-B2JF6-PYM2T\nZJKZT-K3BOM-RJ1X5\nOLTXQ-XR7PE-WEJSO\nYPPWI-7C8FE-2UY0V\nCCKMG-SYTVZ-TDC5O\nCKKEF-X9X1N-X495Z\n1SNJ8-QMPDG-03UNS\nX8AIX-54U65-42N3L\n28S7Y-UZTE1-MQR0Q\nPT4CL-CN8D9-X8EJ6\n9KXN2-L0BLB-CKG3M\nZ3L52-WBTOW-0MTR0\n7I7ZH-9URHM-B20WC\nKIJ6I-IPSBF-DPCKL\nNBNS5-EYWCM-IWX94\n0BILB-2L90Z-4MPMZ\n3TSTS-U10VV-5T2RS\nTZKII-53T6D-RXCLN\nYIC7Q-7CC0T-2YDT2\nP8EDO-G61M4-CARLR\nXWQ2Z-P4AOP-QAGN3\nNQ6P7-46HKQ-EGM7N\n8M53H-UYIOX-NAKC6\n0WOM9-2U9X8-BD5QZ\nXQ70I-A879D-H4LQ4\nM027R-8JJ6R-1GA9R\nWN7S8-MWRGZ-3J4VP\nQ50CW-BK9T9-23X3V\nC1S7Y-CKXRO-YXQ5C\nOWO9Q-OY3HK-9AZVV\nPKNIT-J6DQS-PR111\n3VRXL-1LBHE-EZ7Z9\nZFGMN-S2T82-8OJFU\nM1XII-8JUS9-KHZJE\nHABN8-UTH1N-7C7AL\nGDXBI-IKT3Z-4X61Q\nWP1JX-WYFZC-VEGEA\nY4K8F-ROI1J-2CTCK\nIVEDK-YMGLC-YTHRT\n864I1-GQZBX-YB9CG\nWBYG1-RT4ZD-9B2PR\nIA2GG-U6ZYP-WWAGA\nOSY75-CH5EO-QWD8K\nJFV9P-ZPO9O-M128C\nUQZH5-061ZP-JZZX2\nZR5TG-F1EAS-QV0H9\n6KF8I-Q88TN-TMMM9\nXGBOU-MANIJ-GC0YD\nL5QTG-V15R2-N3DTD\nR8RCI-7VQOS-4MYHX\nPJAB7-CO99H-WUAZR\nRQVX6-OP9K9-YA0DK\nPW1DA-AQEPR-XG5TQ\nVUY0I-CVJ63-KQPEL\nQTSRN-8I4Y3-VC8JX\nJBN32-L1QO4-L1G4Y\nGE9CN-GTRTD-318BD\nLCVZK-BIREJ-01GQV\nOGX5Q-9IC19-Z7A9T\nH807V-5VBFL-VC8B6\nIHQMV-I27CE-YBDQF\nFDHHB-PWD4C-E7KIT\nEYSM9-W6FQO-08LQO\nKF4UG-7LAOX-LEJHT\nZT602-3WGDP-6XJ6X\nENAS4-7E00X-FF56D\nE4G6W-ZMFPV-PFBQM\nVJ780-JO8NL-PJ01P\nNCNAS-5YST6-M9WL9\nDD9ZY-IHKTA-PF5GK\nEK3FJ-7NWEY-LCGOF\n7T2HU-ZOTA9-4GKB4\nK8WXN-VWH1V-MRTQJ\nCWSLB-0K1LW-O8DL0\nCOOUC-Q45AJ-6EYQZ\n8RRZ0-FIMAS-02NEN\nIRCOW-ID07Q-K1B1S\nO7QWU-3C78O-POUEL\n2Y7ZG-0QW2V-A4J8D\nO0NAM-H449G-FS61A\nY3EPJ-G3E0U-O1J0O\nP1I1P-0L9A9-TXE13\nYAPEF-QDZZH-LMX14\nCAWCN-OEQ3W-KDCWW\nILB1G-AV02Y-WT481\n0T67D-NW84Y-TPTX5\nNBGA9-3FUZM-6UKQH\n8LH8W-T2UCP-GO57O\nRORD7-SCRT5-94EET\nY6DK2-H1QI8-7Z42U\nUFIN5-YOS1G-Y8XDD\nAWW68-14EGS-N2PNQ\nU0WGY-USRFJ-8FFIL\n32QDE-8QA0T-JGTS2\nORRRJ-MIGYT-U8C0D\nMVPQ6-R506O-SHB84\nMAPHK-Q1C73-KWO1P\nYDF74-UNXL6-KG1Y5\n2D6AS-TP39W-HSH0Y\nE6LQV-O3VRY-C36KA\nVE5CE-2RJG3-I4AIL\nHVJZ7-WH1HM-ZNW4X\nJ8423-LE0OG-VNKUT\nOG2E3-Q0L3B-MGECY\nE176G-LT16K-JE4BF\nGCVBU-43DFI-5PUQJ\nHCOPT-U33LK-99R94\nE57UA-S4U21-4F9B8\n1E931-FPMN7-VKNVC\nL07QN-321TZ-3PI1H\nXL01H-UGSBG-XO9T8\n1P0TP-QMMKA-9ZI1V\nJVJVY-4Y4SP-033WE\nOC2AW-SMWZH-135KF\nJSTQ7-GESLB-RUZTR\n6K739-MLN3Y-G5B33\nM57X5-6ZUWU-YAVHF\n2ULMZ-6T43B-91PE7\n029TQ-VS6XS-1L5NO\nMQSAG-AGKQ5-RQS2A\nWT9IV-441KL-JDCZK\nPOI96-KRJ8S-P72J8\nBBOXG-8S8WM-4985H\n81N65-Q3HPI-2P534\nSTBY8-Z8T43-S07AL\nPP34S-9UO32-PHJKZ\n5O7KB-GL6DG-WIK8V\nM044L-RU59T-VXYCN\nYHJEX-B75BZ-1A0CI\nFW075-S5D3M-Z5X01\n3L0GQ-GK3NO-T74O2\nAW225-XSMI6-17I6J\nC8722-PGA6K-OF9JL\nLPWCR-DJQR8-V7G23\n5PW0I-OWKEI-RHQAD\nIR28Y-D3B9H-SANL2\nE49M0-TWZ8C-0RH0V\nSQU46-J8ZZW-3Y0XL\nQH7VU-U7AA4-C98YU\n27WC3-SXMJ0-JXY3N\nU1I36-4YWMN-UA32U\nE2IT6-6R7Q7-SIAFM\nGJOCV-5HSGW-P42YW\nXBUQ9-7J2AJ-GV9LP\nE82FA-WSYUT-MNQK7\nPEFGL-XSI89-P51IH\nJ7ACB-SJTEH-FYS5O\nTNE6I-G0L3T-CO5GC\nEM7TO-UQJ0A-2O5VU\nGO9KO-DWCPA-Q8XYZ\n1POP0-P6B06-7B7KJ\n6B0Q7-0VY0V-3OOWN\n3QJB8-URHU2-F54ID\n3CH8C-WE24M-15HEB\nY1S3W-Y6AUI-C5RM7';
function _localFallbackCodeList() {
  return LOCAL_FALLBACK_CODES.split('\n').map(l => l.trim().toUpperCase()).filter(Boolean);
}

async function redeemPremiumCode(code) {
  const clean = String(code || '').trim().toUpperCase();
  if (!clean) return { ok: false, message: 'Please enter a code.' };

  const p = await loadPremium();
  if ((p.redeemedCodes || []).includes(clean)) {
    return { ok: false, message: 'This code was already used on this device.' };
  }

  let list;
  let usedFallback = false;
  try {
    const res = await fetch(CODES_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    // A free host serving codes.txt behind an anti-bot/JS challenge page
    // (common on free hosting - it works fine when you visit the URL
    // directly in a browser tab, since the browser runs the challenge's
    // JS, but a plain fetch() never does) would return 200 with an HTML
    // challenge page instead of the real file. Detect that case
    // specifically so it's not misreported as "invalid code".
    if (/<html|<!doctype/i.test(text)) throw new Error('server returned a web page instead of the code list - check for a bot/JS challenge on your host');
    list = text.split(/\r?\n/).map(l => l.trim().toUpperCase()).filter(Boolean);
    if (!list.length) throw new Error('code list was empty');
  } catch (e) {
    console.error('[AutoDarts+] Code redemption fetch failed, falling back to the bundled code list:', e);
    list = _localFallbackCodeList();
    usedFallback = true;
  }

  if (!list.includes(clean)) {
    return { ok: false, message: usedFallback ? 'Invalid or expired code (checked against the bundled offline list since the server was unreachable).' : 'Invalid or expired code.' };
  }

  const now = Date.now();
  p.premiumUntil = Math.max(p.premiumUntil || 0, now) + PREMIUM_DURATION_MS;
  p.redeemedCodes = [...(p.redeemedCodes || []), clean].slice(-50);
  await savePremium(p);
  return { ok: true, until: p.premiumUntil, usedFallback };
}

// Exposed cross-file: content-scripts/content.js loads last in the same
// isolated world as src/automation/lobby.js and sync.js (they're all
// listed in the same manifest content_scripts entry), so a plain global
// like this becomes reachable from those files too, the same way
// window.adTourney already is - lets the Local Tournaments code gate
// itself on the same free-games counter without duplicating this logic.
window.adPremium = { loadPremium, savePremium, isPremiumActive, countFreeGamePlayed, freeGamesRemaining, redeemPremiumCode, FREE_GAMES_LIMIT, UPGRADE_URL };
const RANKS=[
  {id:'bronze',     name:'Bronze',      color:'#CD7F32',textColor:'#fff',   grad:'linear-gradient(135deg,#CD7F32,#8B4513)', shadowColor:'rgba(205,127,50,.45)', winMin:20,winMax:45,lossMin:3, lossMax:8 },
  {id:'silver',     name:'Silver',      color:'#C0C0C0',textColor:'#1a1a2e',grad:'linear-gradient(135deg,#D8D8D8,#909090)', shadowColor:'rgba(192,192,192,.45)',winMin:15,winMax:30,lossMin:5, lossMax:10},
  {id:'gold',       name:'Gold',        color:'#FFD700',textColor:'#1a1a2e',grad:'linear-gradient(135deg,#FFD700,#FFA500)', shadowColor:'rgba(255,215,0,.45)',  winMin:12,winMax:25,lossMin:6, lossMax:12},
  {id:'platinum',   name:'Platinum',    color:'#A8D8C8',textColor:'#1a1a2e',grad:'linear-gradient(135deg,#C0E8D8,#78A898)', shadowColor:'rgba(168,216,200,.45)',winMin:8, winMax:15,lossMin:8, lossMax:12},
  {id:'diamond',    name:'Diamond',     color:'#00BFFF',textColor:'#fff',   grad:'linear-gradient(135deg,#00DFFF,#0060CC)', shadowColor:'rgba(0,191,255,.5)',   winMin:3, winMax:8, lossMin:4, lossMax:10},
  {id:'champion',   name:'Champion',    color:'#FF6B35',textColor:'#fff',   grad:'linear-gradient(135deg,#FF8C35,#C0392B)', shadowColor:'rgba(255,107,53,.5)', winMin:2, winMax:6, lossMin:5, lossMax:13},
  {id:'worldmaster',name:'World Master',color:'#C39BD3',textColor:'#fff',   grad:'linear-gradient(135deg,#D7BDE2,#7D3C98)', shadowColor:'rgba(195,155,211,.55)',winMin:1, winMax:5, lossMin:7, lossMax:15,unlimited:true}
];
const BOTS=[{level:1,name:'Bot Level 1',avg:20},{level:2,name:'Bot Level 2',avg:30},{level:3,name:'Bot Level 3',avg:40},{level:4,name:'Bot Level 4',avg:50},{level:5,name:'Bot Level 5',avg:60},{level:6,name:'Bot Level 6',avg:70},{level:7,name:'Bot Level 7',avg:80},{level:8,name:'Bot Level 8',avg:90},{level:9,name:'Bot Level 9',avg:100},{level:10,name:'Bot Level 10',avg:110},{level:11,name:'Bot Level 11',avg:120}];
const RANK_ICONS={
  bronze:      '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#rg)" stroke="#A0522D" stroke-width="1.5"/><defs><radialGradient id="rg" cx="40%" cy="35%"><stop offset="0%" stop-color="#E8A060"/><stop offset="100%" stop-color="#7B3A10"/></radialGradient></defs><path d="M20 10L22 16L28 16L23.5 19.5L25.5 25.5L20 22L14.5 25.5L16.5 19.5L12 16L18 16Z" fill="rgba(255,255,255,.2)" stroke="#FFD700" stroke-width=".7"/></svg>',
  silver:      '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#rg)" stroke="#888" stroke-width="1.5"/><defs><radialGradient id="rg" cx="40%" cy="35%"><stop offset="0%" stop-color="#E8E8E8"/><stop offset="100%" stop-color="#707070"/></radialGradient></defs><path d="M20 10L22 16L28 16L23.5 19.5L25.5 25.5L20 22L14.5 25.5L16.5 19.5L12 16L18 16Z" fill="rgba(255,255,255,.25)" stroke="#FFF" stroke-width=".7"/></svg>',
  gold:        '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#rg)" stroke="#DAA520" stroke-width="1.5"/><defs><radialGradient id="rg" cx="40%" cy="35%"><stop offset="0%" stop-color="#FFE066"/><stop offset="100%" stop-color="#B8860B"/></radialGradient></defs><path d="M20 10L22 16L28 16L23.5 19.5L25.5 25.5L20 22L14.5 25.5L16.5 19.5L12 16L18 16Z" fill="rgba(255,215,0,.2)" stroke="#FFD700" stroke-width=".7"/></svg>',
  platinum:    '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#rg)" stroke="#78A898" stroke-width="1.5"/><defs><radialGradient id="rg" cx="40%" cy="35%"><stop offset="0%" stop-color="#C0E8D8"/><stop offset="100%" stop-color="#3A7868"/></radialGradient></defs><polygon points="20,9 24,17 32,17 26,22 28,30 20,25 12,30 14,22 8,17 16,17" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.7)" stroke-width=".7"/></svg>',
  diamond:     '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#rg)" stroke="#00BFFF" stroke-width="1.5"/><defs><radialGradient id="rg" cx="40%" cy="35%"><stop offset="0%" stop-color="#80DFFF"/><stop offset="100%" stop-color="#0040AA"/></radialGradient></defs><polygon points="20,8 31,16 27,31 13,31 9,16" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.75)" stroke-width=".7"/></svg>',
  champion:    '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#rg)" stroke="#FF4500" stroke-width="1.5"/><defs><radialGradient id="rg" cx="40%" cy="35%"><stop offset="0%" stop-color="#FF9060"/><stop offset="100%" stop-color="#A01010"/></radialGradient></defs><path d="M11,12L11,23C11,28 15.5,32 20,32C24.5,32 29,28 29,23L29,12Z" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.5)" stroke-width=".7"/></svg>',
  worldmaster: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#rg)" stroke="#9B59B6" stroke-width="1.5"/><defs><radialGradient id="rg" cx="40%" cy="35%"><stop offset="0%" stop-color="#E8C8F8"/><stop offset="100%" stop-color="#4A1060"/></radialGradient></defs><path d="M20,8L22,14L29,11L25,17L31,19L25,21L29,27L22,24L20,30L18,24L11,27L15,21L9,19L15,17L11,11L18,14Z" fill="rgba(255,255,255,.18)" stroke="#FFD700" stroke-width=".7"/></svg>'
};
function getRankIcon(id,sz){sz=sz||40;return (RANK_ICONS[id]||RANK_ICONS.bronze).replace('<svg viewBox','<svg width="'+sz+'" height="'+sz+'" viewBox');}
function rndBetween(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function applyRankChange(data,won){
  const ri0=data.rankIndex;
  const rank=RANKS[ri0]||RANKS[0];
  // Use current rank's own min/max — cap to prevent out-of-range values
  const rawChange=won
    ? rndBetween(rank.winMin,rank.winMax)
    : -rndBetween(rank.lossMin,rank.lossMax);
  const change=rawChange; // keep as-is for history display
  let pct=data.percentage+change,ri=ri0;
  // Promotion: carry over the overflow percentage into the new rank
  if(!rank.unlimited&&pct>=100&&ri<RANKS.length-1){
    pct=pct-100; // e.g. 98%+15%=113% → new rank at 13%
    ri++;
    if(pct>=100&&ri<RANKS.length-1){ri++;pct=pct-100;} // edge case: double-promote
    if(pct<0)pct=0;
  }
  // Demotion: carry over the negative into the previous rank
  if(pct<0){
    if(ri===0){pct=0;}
    else{ri--;pct=100+pct;if(pct<0)pct=0;}
  }
  return {rankIndex:ri,percentage:pct,lastChange:change,botLevel:data.botLevel,username:data.username,matchesPlayed:(data.matchesPlayed||0)+1,wins:won?(data.wins||0)+1:(data.wins||0),losses:!won?(data.losses||0)+1:(data.losses||0),history:[{won,change,rankBeforeId:ri0,pctBefore:data.percentage,rankAfterId:ri,pctAfter:pct,date:Date.now(),botLevel:data.botLevel},...(data.history||[]).slice(0,29)]};
}
function defaultRD(){return {rankIndex:0,percentage:0,botLevel:null,matchesPlayed:0,wins:0,losses:0,history:[],username:null};}
const R_KEY='adRankedData', AM_KEY='adRankedActiveMatch';
const loadRanked      = () => new Promise(r=>chrome.storage.local.get(R_KEY,  d=>r(d[R_KEY]  ||defaultRD())));
const saveRanked      = d  => new Promise(r=>chrome.storage.local.set({[R_KEY]:d},r));
const loadAM          = () => new Promise(r=>chrome.storage.local.get(AM_KEY, d=>r(d[AM_KEY] ||null)));
const saveAM          = m  => new Promise(r=>chrome.storage.local.set({[AM_KEY]:m},r));
const clearAM         = () => new Promise(r=>chrome.storage.local.remove(AM_KEY,r));

// ─── AI Match Analysis ──────────────────────────────────────────────
// Premium feature. Uses Groq's OpenAI-compatible chat completions API
// directly from the extension, with the user's own Groq API key (their
// account, their usage/cost - never sent anywhere but api.groq.com).
const AI_SETTINGS_KEY = 'adAiSettings';
const AI_LAST_MATCH_KEY = 'adAiLastMatch';
// Groq deprecates/renames models over time (this is exactly what caused
// the 404 model_not_found error you hit), so this can't be a "set once
// and forget" constant - if it stops working again, check
// https://console.groq.com/docs/models for the current list and update
// both this and the <select> options in the AI Coach page below.
const GROQ_DEFAULT_MODEL = 'llama-3.1-8b-instant';

const loadAiSettings = () => new Promise(r => chrome.storage.local.get(AI_SETTINGS_KEY, d => r({
  groqApiKey: '', model: GROQ_DEFAULT_MODEL, handedness: '', average: '', notes: '',
  ...(d[AI_SETTINGS_KEY] || {})
})));
const saveAiSettings = s => new Promise(r => chrome.storage.local.set({ [AI_SETTINGS_KEY]: s }, r));

// Static model names go stale whenever Groq updates their catalog (which
// is exactly what caused the 404 errors, twice now, on two different
// models) - and which models an API key can even use also depends on
// the account/tier. Rather than keep guessing at hardcoded names, ask
// Groq directly which chat-capable models this key currently has access
// to and use that as the source of truth for both the settings dropdown
// and the automatic-retry fallback.
async function fetchAvailableGroqModels(apiKey) {
  if (!apiKey) return [];
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    });
    if (!res.ok) return [];
    const json = await res.json();
    const ids = (json.data || [])
      .map(m => m.id)
      .filter(id => id && !/whisper|tts|guard|distil/i.test(id)); // keep chat/completions-style models, skip audio/moderation/etc
    return ids;
  } catch (e) {
    return [];
  }
}

// Stores the raw match-stats response (same shape as AutoDarts'
// /as/v0/matches/{id}/stats endpoint, already used elsewhere in this file
// to detect ranked match results) so the AI panel can reference exactly
// what happened in the most recently finished match - legs, averages,
// and per-throw detail if the API includes it.
async function saveLastMatchStats(statsData, matchId) {
  await new Promise(r => chrome.storage.local.set({ [AI_LAST_MATCH_KEY]: { matchId, statsData, savedAt: Date.now() } }, r));
}
const loadLastMatchStats = () => new Promise(r => chrome.storage.local.get(AI_LAST_MATCH_KEY, d => r(d[AI_LAST_MATCH_KEY] || null)));

function buildAiSystemPrompt(settings, matchInfo) {
  const profileLines = [];
  if (settings.average) profileLines.push(`Player's usual average: ${settings.average}`);
  if (settings.handedness) profileLines.push(`Throwing hand: ${settings.handedness}`);
  if (settings.notes) profileLines.push(`Extra instructions from the player about how to coach them: ${settings.notes}`);

  return [
    'You are an expert darts coach and AutoDarts power-user, embedded inside the AutoDarts + browser extension.',
    "You know competitive X01 strategy in depth: checkout routes and doubles/trebles strategy, scoring routines (the standard T20/T19 area, bust rules, in/out modes such as Straight/Double/Master), typical average bands for casual/intermediate/advanced/pro players, and how to read a match's flow from leg-by-leg scores and averages.",
    "You have just been given the raw match statistics JSON AutoDarts recorded for the player's most recently finished match, exactly as returned by AutoDarts' own API. It typically includes players, per-leg/per-turn scores and averages, and may include per-throw detail (segment hit and/or board coordinates) depending on what AutoDarts recorded for this match - use whatever is present, and don't assume fields that aren't there.",

    'CRITICAL - never conflate scoring accuracy with checkout/finishing accuracy. These are different skills and the data usually lets you tell them apart:',
    '- Scoring phase: every turn before the player is in a realistic finishing position (roughly, remaining score above ~170, or before any turn explicitly aimed at a specific checkout combination). Judge this using fields like the overall average, "First 9 average" (the opening exchanges, before any checkout pressure), and "Average until 170" (scoring before entering checkout range) if present - these measure scoring, NOT finishing.',
    '- Checkout/finishing phase: turns where the player is aiming at a specific combination to win the leg (e.g. needing a double). This is governed by the match\'s "out mode" if you can find it in the data or infer it from context (Straight = any way to reach zero; Double = the final scoring dart must land on a double; Master = double or treble) - judge finishing quality using fields like "Checkout %", "Best Checkout points", and how many darts/turns it took to actually close out a leg once in range, not the general scoring average.',
    'A player can have an excellent scoring average (hitting the 20s area consistently) while still missing checkout doubles under pressure at the end of a leg - that is completely normal and is a finishing/nerves/doubles-practice issue, not a scoring issue. NEVER tell a player they "aren\'t hitting the 20 consistently" based on a missed double or a slow checkout - check whether the relevant miss happened during general scoring or during a checkout attempt before saying which skill needs work. If the checkout stats look weaker than the scoring stats, say so explicitly and specifically (e.g. "you were often just under or over the target on your double attempts" or "it took you several turns once you were in range to close it out") rather than defaulting to a generic scoring critique.',
    'When commentary on the finish is warranted, be specific about what the data shows: how close attempts were to the required double, whether the player was consistently too high/low, how many darts/turns were spent trying to check out, and whether nerves or a genuinely tough leg (opponent close behind) affected it - not just "you missed your double".',

    'If per-throw coordinates or segment data are present, use them to spot concrete patterns (e.g. consistently missing wide of a target on doubles specifically, versus general scoring dispersion) rather than only quoting the final average.',
    profileLines.length ? 'Known player profile:\n' + profileLines.join('\n') : '',
    "Answer the player's question directly and conversationally, like a supportive coach would after a match: acknowledge what went well specifically (not just generic praise), point out what went wrong with concrete evidence from the data - correctly separating scoring from finishing as above - and if relevant give one clear, actionable tip to improve. Keep it focused - a few sentences, not an essay - unless the player asks for more detail.",
    "Never invent match events that aren't supported by the data you were given. If the data is too sparse to answer something specific, say so plainly instead of guessing.",
    '\n--- MATCH DATA (JSON) ---\n' + JSON.stringify(matchInfo).slice(0, 12000)
  ].filter(Boolean).join('\n\n');
}

async function askAi(userQuestion, conversationHistory) {
  const settings = await loadAiSettings();
  if (!settings.groqApiKey) return { error: 'No Groq API key set. Add one in the AutoDarts + hub settings.' };

  const lastMatch = await loadLastMatchStats();
  const systemPrompt = buildAiSystemPrompt(settings, lastMatch ? lastMatch.statsData : { note: 'No recent match data available.' });

  const messages = [
    { role: 'system', content: systemPrompt },
    ...(conversationHistory || []),
    { role: 'user', content: userQuestion }
  ];

  const callGroq = async (model) => {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + settings.groqApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages, temperature: 0.6 })
    });
    return res;
  };

  try {
    const requestedModel = settings.model || GROQ_DEFAULT_MODEL;
    let res = await callGroq(requestedModel);
    let usedFallbackModel = null;

    if (!res.ok && res.status === 404) {
      const errBody = await res.text().catch(() => '');
      if (/model_not_found|does not exist/i.test(errBody)) {
        // Groq periodically deprecates/renames models, and access can
        // also depend on the API key's account/tier - rather than fail
        // outright or guess at another hardcoded name, ask Groq which
        // models this key can actually use right now and retry with the
        // first sensible one instead of making the user go fix a setting
        // mid-conversation.
        const available = await fetchAvailableGroqModels(settings.groqApiKey);
        const candidate = available.find(m => m !== requestedModel);
        if (candidate) {
          res = await callGroq(candidate);
          usedFallbackModel = candidate;
        } else {
          return { error: `Groq API error (${res.status}): "${requestedModel}" isn't available to your API key, and no alternative model could be found either. Check your key's access at console.groq.com. ${errBody.slice(0,200)}` };
        }
      } else {
        return { error: `Groq API error (${res.status}). Check your API key and model. ${errBody.slice(0,200)}` };
      }
    }

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      return { error: `Groq API error (${res.status}). Check your API key and model. ${errBody.slice(0,200)}` };
    }
    const json = await res.json();
    const reply = json.choices?.[0]?.message?.content;
    if (!reply) return { error: 'No response from the model.' };
    return { reply: usedFallbackModel ? reply + `\n\n(Note: "${requestedModel}" wasn't available to your API key, so this used ${usedFallbackModel} instead. Consider updating your model choice in AI Coach settings.)` : reply };
  } catch (e) {
    return { error: 'Could not reach Groq: ' + e.message };
  }
}

let _aiConversation = [];

// General-purpose match data capture, independent of Ranked/Local
// Tournament bookkeeping. Works on ANY match page - a live match
// (/matches/{id}) or a past match's review page
// (/history/matches/{id}), which is where AutoDarts shows the full stats
// + per-throw coordinates breakdown (screenshot you sent) for literally
// any match, not just ones this extension started. We already capture
// the user's own Bearer token (pageScript.js), so we can just fetch the
// same stats endpoint ourselves instead of relying on happening to
// intercept the right passive network response.
const MATCH_PAGE_RE = /\/(?:history\/)?matches\/([a-f0-9-]{20,})/i;
let _lastCapturedMatchId = null;

async function tryCaptureMatchForAi(url) {
  const m = url.match(MATCH_PAGE_RE);
  if (!m) return;
  const matchId = m[1];
  if (matchId === _lastCapturedMatchId) return; // already captured this one
  const token = await getTokenAsync();
  if (!token) return;
  try {
    const res = await fetch(window._AD_API + '/as/v0/matches/' + matchId + '/stats', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return;
    const data = await res.json();
    if (!data || (!data.players && !data.matchStats)) return; // nothing usable
    _lastCapturedMatchId = matchId;
    await saveLastMatchStats(data, matchId);
    showAiAnalysisWidget(matchId);
  } catch (e) {
    // Match not finished yet, endpoint not ready, or a transient network
    // issue - nothing to show yet, silently try again on the next
    // navigation/poll rather than erroring at the user.
  }
}

function showAiAnalysisWidget(matchId) {
  document.getElementById('adr-ai-widget')?.remove();
  const btn = document.createElement('button');
  btn.id = 'adr-ai-widget';
  btn.style.cssText = `position:fixed;bottom:20px;left:20px;background:linear-gradient(135deg,rgba(159,122,234,.9),rgba(99,179,237,.9));border:none;border-radius:24px;padding:.7rem 1.1rem;color:white;font-weight:700;font-size:.8rem;font-family:${FONT};cursor:pointer;z-index:99996;box-shadow:0 8px 24px rgba(0,0,0,.4);display:flex;align-items:center;gap:.5rem;`;
  btn.innerHTML = `🧠 Ask AI about this match`;
  btn.onclick = async () => {
    if (!(await isPremiumActive())) {
      showRankedModal({ title: 'Premium required', body: `AI match analysis needs Premium. Get 3 days free at ${UPGRADE_URL}, or redeem a code in the AutoDarts + hub.`, buttons: [{label:'OK', primary:true}] });
      return;
    }
    openAiChatPanel();
  };
  document.body.appendChild(btn);
  setTimeout(() => btn.remove(), 30 * 60 * 1000); // don't linger forever across unrelated later pages
}

function openAiChatPanel() {
  document.getElementById('adr-ai-panel')?.remove();
  _aiConversation = [];
  const panel = document.createElement('div');
  panel.id = 'adr-ai-panel';
  panel.style.cssText = `position:fixed;bottom:20px;left:20px;width:340px;max-height:70vh;background:#151a27;border:1px solid rgba(255,255,255,.12);border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.6);z-index:99997;display:flex;flex-direction:column;font-family:${FONT};overflow:hidden;`;
  panel.innerHTML = `
    <div style="padding:.8rem 1rem;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;">
      <div style="font-weight:800;color:white;font-size:.85rem;">🧠 Match AI</div>
      <button id="adr-ai-close" style="background:none;border:none;color:rgba(255,255,255,.4);font-size:1rem;cursor:pointer;">✕</button>
    </div>
    <div id="adr-ai-msgs" style="flex:1;overflow-y:auto;padding:.8rem 1rem;display:flex;flex-direction:column;gap:.6rem;min-height:120px;max-height:340px;"></div>
    <div style="padding:.7rem;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:.5rem;">
      <input id="adr-ai-input" placeholder="How did I play?" style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .7rem;color:white;font-size:.78rem;font-family:${FONT};outline:none;">
      <button id="adr-ai-send" style="background:rgba(99,179,237,.85);border:none;border-radius:8px;padding:.5rem .8rem;color:white;font-weight:700;cursor:pointer;font-family:${FONT};">➤</button>
    </div>
    <div style="padding:.4rem .8rem .6rem;font-size:.62rem;color:rgba(255,255,255,.25);">Suggestions:</div>
    <div id="adr-ai-suggestions" style="display:flex;gap:.4rem;flex-wrap:wrap;padding:0 .8rem .8rem;"></div>
  `;
  document.body.appendChild(panel);

  const msgsEl = panel.querySelector('#adr-ai-msgs');
  const inputEl = panel.querySelector('#adr-ai-input');
  const addMsg = (text, who) => {
    const bubble = document.createElement('div');
    bubble.style.cssText = `align-self:${who==='user'?'flex-end':'flex-start'};max-width:85%;background:${who==='user'?'rgba(99,179,237,.18)':'rgba(255,255,255,.06)'};border:1px solid ${who==='user'?'rgba(99,179,237,.3)':'rgba(255,255,255,.1)'};border-radius:10px;padding:.5rem .7rem;color:rgba(255,255,255,.9);font-size:.78rem;line-height:1.5;white-space:pre-wrap;`;
    bubble.textContent = text; // textContent, never innerHTML - this echoes model output and the user's own question, both untrusted as far as the DOM is concerned
    msgsEl.appendChild(bubble);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return bubble;
  };

  const send = async (text) => {
    if (!text || !text.trim()) return;
    addMsg(text, 'user');
    _aiConversation.push({ role: 'user', content: text });
    inputEl.value = '';
    const thinking = addMsg('…', 'ai');
    const result = await askAi(text, _aiConversation.slice(0, -1));
    thinking.textContent = result.error ? ('⚠ ' + result.error) : result.reply;
    if (!result.error) _aiConversation.push({ role: 'assistant', content: result.reply });
  };

  panel.querySelector('#adr-ai-close').onclick = () => panel.remove();
  panel.querySelector('#adr-ai-send').onclick = () => send(inputEl.value);
  inputEl.onkeydown = (e) => { if (e.key === 'Enter') send(inputEl.value); };

  const suggestions = ['How did I play?', 'What should I work on?', 'Did I nearly lose?'];
  const sugWrap = panel.querySelector('#adr-ai-suggestions');
  suggestions.forEach(s => {
    const b = document.createElement('button');
    b.textContent = s;
    b.style.cssText = `background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:.3rem .6rem;color:rgba(255,255,255,.6);font-size:.68rem;cursor:pointer;font-family:${FONT};`;
    b.onclick = () => send(s);
    sugWrap.appendChild(b);
  });

  addMsg('Ask me anything about the match you just finished.', 'ai');
}

// Extends the window.adPremium namespace (first populated right after
// redeemPremiumCode above) with the AI helpers, which are defined later
// in this file - src/automation/sync.js calls these too, on the same
// isolated-world global.
Object.assign(window.adPremium, { saveLastMatchStats, loadLastMatchStats, showAiAnalysisWidget });

function getTokenAsync(){return new Promise(res=>{if(window._adToken)return res(window._adToken);let t=0;const iv=setInterval(()=>{t++;if(window._adToken){clearInterval(iv);res(window._adToken);}else if(t>=80){clearInterval(iv);res(null);}},100);});}
async function fetchUsername(token){try{const r=await fetch(window._AD_API+'/as/v0/users/me',{headers:{'Authorization':'Bearer '+token}});if(!r.ok)return null;const u=await r.json();return u.name||u.username||u.nick||(u.email?u.email.split('@')[0]:null)||null;}catch(e){return null;}}

// ─── DOM helpers (unified) ────────────────────────────────────────
// AutoDarts shipped a full redesign on play.autodarts.com (new Tailwind
// UI: <header><nav aria-label="Main navigation">...) while the legacy
// app (still reachable at play-v1.autodarts.com, and possibly still on
// .io for a while) keeps the old Chakra DOM (#root > div > div > 2nd
// child, .chakra-stack sidebar). Rather than branching every call site
// on hostname, every selector we depend on is tried as a list, newest
// layout first — this also means if AutoDarts tweaks class names again,
// only this list needs updating.
const MAIN_NAV_SELECTORS = [
  'nav[aria-label="Main navigation"]',   // new site
  '#root > div > div > .chakra-stack'     // legacy site
];
const MAIN_CONTENT_SELECTORS = [
  'main .h-full.overflow-y-auto',        // new site
  '#root > div > div:nth-of-type(2)'      // legacy site
];
const ROOT_READY_SELECTORS = [
  '#root header',                         // new site
  '#root > div:nth-of-type(1)'            // legacy site
];

function firstMatch(selectors){
  for(const sel of selectors){ const el=document.querySelector(sel); if(el) return el; }
  return null;
}
function waitFor(sel,ms=15000){
  const selectors = Array.isArray(sel) ? sel : [sel];
  return new Promise((res,rej)=>{
    const found=firstMatch(selectors);if(found){res(found);return;}
    const t0=Date.now(),iv=setInterval(()=>{const f=firstMatch(selectors);if(f){clearInterval(iv);res(f);}else if(Date.now()-t0>=ms){clearInterval(iv);rej(new Error('timeout:'+selectors.join(' | ')));}},100);
  });
}
const getMain=()=>firstMatch(MAIN_CONTENT_SELECTORS);
// hideMain knows ALL our prefixes — never accidentally hides dart skin or active pages
function hideMain(){const m=getMain();if(!m)return;Array.from(m.children).forEach(c=>{const id=c.id||'';if(!id.startsWith('adt-')&&!id.startsWith('adr-')&&id!==TOURNEY_DIV_ID)c.style.display='none';});}
function showMain(){const m=getMain();if(!m)return;Array.from(m.children).forEach(c=>c.style.display='');}
function clearAllPages(){
  ['adt-hub','adt-cust','adt-tourn','adr-page','adt-shortcuts','adt-ai-coach','adr-ai-widget','adr-ai-panel'].forEach(id=>document.getElementById(id)?.remove());
  document.getElementById('adt-picker')?.remove();
  const td=document.getElementById(TOURNEY_DIV_ID);if(td&&!td.closest('#adt-tourn'))td.remove();
  activePart=null; showMain();
}

// ─── Ranked CSS (injected once) ───────────────────────────────────
if(!document.getElementById('adr-styles')){const s=document.createElement('style');s.id='adr-styles';s.textContent='@keyframes adrSlideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes adrPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}@keyframes adrDot{0%,100%{opacity:1}50%{opacity:.3}}';document.head.appendChild(s);}

// ─── Ranked modal ─────────────────────────────────────────────────
function showRankedModal(opts){
  document.getElementById('adr-modal')?.remove();
  const ov=document.createElement('div');ov.id='adr-modal';
  ov.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99998;display:flex;align-items:center;justify-content:center;font-family:${FONT};`;
  ov.innerHTML=`<div style="background:#1a1f2e;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:2rem;max-width:420px;width:90%;box-shadow:0 24px 60px rgba(0,0,0,.8);"><h2 style="margin:0 0 .6rem;font-size:1.1rem;font-weight:800;color:#fff;">${opts.title}</h2><div style="color:rgba(255,255,255,.6);font-size:.85rem;line-height:1.6;margin-bottom:1.5rem;">${opts.body}</div><div id="adr-mbtns" style="display:flex;gap:.6rem;justify-content:flex-end;flex-wrap:wrap;"></div></div>`;
  document.body.appendChild(ov);
  (opts.buttons||[]).forEach(b=>{const btn=document.createElement('button');btn.textContent=b.label;btn.style.cssText=`background:${b.primary?'rgba(99,179,237,.85)':'rgba(255,255,255,.07)'};border:1px solid ${b.primary?'rgba(99,179,237,.4)':'rgba(255,255,255,.12)'};border-radius:9px;padding:.5rem 1.1rem;color:#fff;font-size:.82rem;font-weight:700;cursor:pointer;font-family:${FONT};`;btn.onclick=()=>{ov.remove();b.onClick?.();};ov.querySelector('#adr-mbtns').appendChild(btn);});
  ov.onclick=e=>{if(e.target===ov)ov.remove();};
}

function showResultBanner(won,change,oldRi,newRi,newPct){
  document.getElementById('adr-result-banner')?.remove();
  const promoted=newRi>oldRi,demoted=newRi<oldRi,el=document.createElement('div');
  el.id='adr-result-banner';
  el.style.cssText=`position:fixed;top:20px;right:20px;background:${won?'rgba(72,187,120,.14)':'rgba(245,101,101,.14)'};border:1px solid ${won?'rgba(72,187,120,.35)':'rgba(245,101,101,.35)'};border-radius:14px;padding:1rem 1.3rem;color:#fff;font-family:${FONT};z-index:99997;min-width:200px;max-width:280px;box-shadow:0 12px 40px rgba(0,0,0,.6);animation:adrSlideIn .3s ease;`;
  el.innerHTML=`<button id="adr-bx" style="position:absolute;top:8px;right:10px;background:none;border:none;color:rgba(255,255,255,.3);font-size:1rem;cursor:pointer;">✕</button><div style="font-size:1.15rem;font-weight:800;">${won?'✅ Win!':'❌ Loss'}</div><div style="font-size:.85rem;margin-top:.2rem;color:${won?'#68d391':'#fc8181'};font-weight:700;">${change>=0?'+':''}${change}%</div><div style="font-size:.78rem;color:rgba(255,255,255,.45);margin-top:.2rem;">${RANKS[newRi].name} — ${Math.round(newPct)}%</div>${promoted?`<div style="font-size:.8rem;font-weight:700;color:#68d391;margin-top:.3rem;">🏅 Promoted: ${RANKS[newRi].name}!</div>`:''}${demoted?`<div style="font-size:.8rem;font-weight:700;color:#fc8181;margin-top:.3rem;">⬇ Relegated to ${RANKS[newRi].name}</div>`:''}`;
  document.body.appendChild(el);el.querySelector('#adr-bx').onclick=()=>el.remove();setTimeout(()=>el.parentNode&&el.remove(),10000);
}
async function manualResult(won){const data=await loadRanked(),updated=applyRankChange(data,won);await saveRanked(updated);await clearAM();countFreeGamePlayed();showResultBanner(won,updated.lastChange,data.rankIndex,updated.rankIndex,updated.percentage);renderRankedPage();}

// ─── Result polling ───────────────────────────────────────────────
let pollIv=null;
async function startResultPolling(){
  if(!location.pathname.includes('/matches/'))return;
  const active=await loadAM();if(!active)return;
  const matchIdInUrl=(location.pathname.split('/matches/')[1]||'').split('/')[0];
  if(!matchIdInUrl||matchIdInUrl!==active.matchId)return;
  document.getElementById('adr-poll-indicator')?.remove();
  const ind=document.createElement('div');ind.id='adr-poll-indicator';
  ind.style.cssText=`position:fixed;bottom:20px;right:20px;background:rgba(99,179,237,.12);border:1px solid rgba(99,179,237,.3);border-radius:10px;padding:.55rem 1rem;color:rgba(99,179,237,.9);font-size:.75rem;font-weight:700;font-family:${FONT};z-index:99995;display:flex;align-items:center;gap:.5rem;cursor:pointer;`;
  ind.innerHTML=`<div style="width:8px;height:8px;border-radius:50%;background:#63b3ed;animation:adrDot 1.2s infinite;"></div>Ranked active — click to enter result manually`;
  ind.onclick=()=>showRankedModal({title:'Enter Result',body:'How did the ranked match end?',buttons:[{label:'✅ Won',primary:true,onClick:()=>manualResult(true)},{label:'❌ Loss',primary:false,onClick:()=>manualResult(false)},{label:'Ignore',primary:false,onClick:async()=>{await clearAM();ind.remove();}}]});
  document.body.appendChild(ind);
  if(pollIv)clearInterval(pollIv);
  pollIv=setInterval(async()=>{
    try{const token=window._adToken;if(!token)return;
      const res=await fetch(window._AD_API+'/as/v0/matches/'+active.matchId+'/stats',{headers:{'Authorization':'Bearer '+token}});
      if(res.status===404||!res.ok)return;
      const data=await res.json();if(data.winner===undefined||data.winner===-1)return;
      clearInterval(pollIv);pollIv=null;document.getElementById('adr-poll-indicator')?.remove();
      const winnerName=(data.players&&data.players[data.winner]&&data.players[data.winner].name)||'';
      const humanWon=winnerName.trim().toLowerCase()===(active.username||'').trim().toLowerCase();
      const ranked=await loadRanked(),updated=applyRankChange(ranked,humanWon);
      await saveRanked(updated);await clearAM();countFreeGamePlayed();
      await saveLastMatchStats(data, active.matchId);
      showResultBanner(humanWon,updated.lastChange,ranked.rankIndex,updated.rankIndex,updated.percentage);
      showAiAnalysisWidget(active.matchId);
    }catch(e){}
  },4000);
  setTimeout(()=>{if(pollIv){clearInterval(pollIv);pollIv=null;}document.getElementById('adr-poll-indicator')?.remove();},90*60*1000);
}

// ─── Start ranked match ───────────────────────────────────────────
async function startRankedMatch(){
  const btn=document.getElementById('adr-start-match');if(btn){btn.textContent='⏳ Starting...';btn.disabled=true;btn.style.opacity='.7';}
  const remaining = await freeGamesRemaining();
  if (remaining <= 0 && !(await isPremiumActive())) {
    showRankedModal({title:'Premium required', body:`You've used your free games. Get 3 days of Premium for free at ${UPGRADE_URL}, or redeem a code in the AutoDarts + hub.`, buttons:[{label:'OK', primary:true, onClick:resetStartBtn}]});
    return;
  }
  const token=await getTokenAsync();if(!token){showRankedModal({title:'Token missing',body:'Navigate to another page briefly and come back.',buttons:[{label:'OK',primary:true,onClick:resetStartBtn}]});return;}
  const headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'};
  // Load data before try so it's accessible in catch
  const data=await loadRanked();
  if(!data.username){const n=await fetchUsername(token);if(n){data.username=n;await saveRanked(data);}}
  const username=data.username||'Player',bot=BOTS.find(b=>b.level===data.botLevel)||BOTS[0];
  try{
    const boardsRes=await fetch(window._AD_API+'/bs/v0/boards',{headers}),boardsData=await boardsRes.json();
    const allBoards=Array.isArray(boardsData)?boardsData:(boardsData.data||boardsData.boards||boardsData.items||[]);
    const board=(allBoards.filter(b=>b.state&&(b.state.connection==='Connected'||b.state.connected===true))[0])||allBoards[0];
    if(!board){showRankedModal({title:'No Board Found',body:'No connected dartboard found.',buttons:[{label:'OK',primary:true,onClick:resetStartBtn}]});return;}
    const lobby=await (await fetch(window._AD_API+'/gs/v0/lobbies',{method:'POST',headers,body:JSON.stringify({bullOffMode:'Normal',isPrivate:true,legs:1,settings:{baseScore:501,bullMode:'25/50',inMode:'Straight',maxRounds:50,outMode:'Double'},variant:'X01'})})).json();
    if(!lobby.id)throw new Error('No Lobby ID');
    await fetch(window._AD_API+'/gs/v0/lobbies/'+lobby.id+'/players',{method:'POST',headers,body:JSON.stringify({name:username,boardId:board.id})});
    await fetch(window._AD_API+'/gs/v0/lobbies/'+lobby.id+'/players',{method:'POST',headers,body:JSON.stringify({name:bot.name,cpuPPR:bot.avg})});
    const sr=await fetch(window._AD_API+'/gs/v0/lobbies/'+lobby.id+'/start',{method:'POST',headers});
    if(!sr.ok)throw new Error('Start failed ('+sr.status+')');
    await saveAM({matchId:lobby.id,rankIndex:data.rankIndex,percentage:data.percentage,botLevel:data.botLevel,boardId:board.id,username,startedAt:Date.now()});
    window.location.href=window._AD_PLAY+'/matches/'+lobby.id;
  }catch(err){
    // bot is already available from outer scope — no await needed here
    showRankedModal({title:'Error Starting Match',body:`Could not start the match.<br><br><code style="font-size:.72rem;color:rgba(255,255,255,.5);">${err.message}</code><br><br>Manually start a <strong>1-Leg X01-501 Double Out</strong> match vs ${bot.name} and enter your result below.`,buttons:[{label:'✅ Win',primary:false,onClick:()=>manualResult(true)},{label:'❌ Loss',primary:false,onClick:()=>manualResult(false)},{label:'Cancel',primary:true,onClick:resetStartBtn}]});
  }
}
function resetStartBtn(){const btn=document.getElementById('adr-start-match');if(!btn)return;btn.disabled=false;btn.style.opacity='';loadRanked().then(d=>{const b=BOTS.find(x=>x.level===d.botLevel)||BOTS[0];btn.textContent='🎯 Start Ranked Match (1 Leg vs. '+b.name+')';});}

// ─── Shared UI helpers ────────────────────────────────────────────
let activePart=null,liveColors={...DEFAULT_COLORS};

function backBtn(label,onClick){
  const b=document.createElement('button');
  b.style.cssText=`display:inline-flex;align-items:center;gap:.45rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.35rem .85rem;color:rgba(255,255,255,.65);font-size:.78rem;font-weight:600;cursor:pointer;font-family:${FONT};margin-bottom:1.25rem;transition:background .12s;`;
  b.innerHTML=`<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>${label}`;
  b.onmouseover=()=>b.style.background='rgba(255,255,255,.1)';b.onmouseout=()=>b.style.background='rgba(255,255,255,.05)';
  b.addEventListener('click',onClick);return b;
}
function mkTog(id,checked,onColor='rgba(49,130,206,.8)',ton='18px',toff='2px',w=36,h=20){
  return `<div style="position:relative;display:inline-block;width:${w}px;height:${h}px;"><input id="${id}" type="checkbox" ${checked?'checked':''} style="opacity:0;width:0;height:0;position:absolute;"><span id="${id}-track" style="position:absolute;inset:0;border-radius:${h/2}px;background:${checked?onColor:'rgba(255,255,255,.15)'};transition:background .2s;cursor:pointer;"><span id="${id}-thumb" style="position:absolute;top:2px;left:${checked?ton:toff};width:${h-4}px;height:${h-4}px;border-radius:50%;background:white;transition:left .2s;pointer-events:none;"></span></span></div>`;
}
function setTog(id,on,onColor='rgba(49,130,206,.8)',ton='18px',toff='2px'){
  const tr=document.getElementById(id+'-track'),th=document.getElementById(id+'-thumb');
  if(tr)tr.style.background=on?onColor:'rgba(255,255,255,.15)';if(th)th.style.left=on?ton:toff;
}

function openColorPicker(partKey,anchor){
  document.getElementById('adt-picker')?.remove();
  if(activePart===partKey){activePart=null;return;}activePart=partKey;
  const cur=liveColors[partKey]||'#ffffff',pop=document.createElement('div');pop.id='adt-picker';
  pop.innerHTML=`<div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);margin-bottom:.55rem;">Presets</div><div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.75rem;">${PRESET_COLORS.map(p=>`<button data-h="${p.h}" title="${p.l}" style="width:30px;height:30px;border-radius:6px;background:${p.h};border:2px solid ${cur===p.h?'#63b3ed':'rgba(255,255,255,.1)'};cursor:pointer;flex-shrink:0;transition:transform .1s;outline:none;"></button>`).join('')}</div><div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);margin-bottom:.4rem;">Custom</div><div style="display:flex;align-items:center;gap:.45rem;"><input type="color" id="adt-natpick" value="${cur}" style="width:34px;height:30px;border:none;border-radius:6px;background:none;cursor:pointer;padding:0;flex-shrink:0;"><input type="text" id="adt-hexin" maxlength="7" value="${cur}" style="flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:6px;padding:.3rem .55rem;color:white;font-family:monospace;font-size:.82rem;outline:none;min-width:0;"><button id="adt-apply" style="background:#2b6cb0;border:none;border-radius:6px;padding:.3rem .7rem;color:white;font-size:.72rem;font-weight:700;cursor:pointer;flex-shrink:0;font-family:${FONT};">Apply</button></div>`;
  pop.style.cssText=`position:fixed;background:#1a1f2e;border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.9rem;width:250px;box-shadow:0 12px 40px rgba(0,0,0,.75);z-index:99999;box-sizing:border-box;font-family:${FONT};`;
  document.body.appendChild(pop);
  const r=anchor.getBoundingClientRect();let top=r.bottom+8,left=r.left;if(left+254>window.innerWidth)left=window.innerWidth-258;if(top+260>window.innerHeight)top=r.top-268;pop.style.top=top+'px';pop.style.left=left+'px';
  const apply=h=>{liveColors[partKey]=h;updatePreview();const s=document.getElementById('adt-sw-'+partKey);if(s)s.style.background=h;const l=document.getElementById('adt-hl-'+partKey);if(l)l.textContent=h;};
  pop.querySelectorAll('[data-h]').forEach(b=>{b.onclick=()=>{document.getElementById('adt-hexin').value=b.dataset.h;document.getElementById('adt-natpick').value=b.dataset.h;apply(b.dataset.h);};b.onmouseover=()=>b.style.transform='scale(1.18)';b.onmouseout=()=>b.style.transform='scale(1)';});
  document.getElementById('adt-natpick').oninput=e=>{document.getElementById('adt-hexin').value=e.target.value;apply(e.target.value);};
  document.getElementById('adt-hexin').oninput=e=>{let v=e.target.value.trim();if(!v.startsWith('#'))v='#'+v;if(/^#[0-9a-fA-F]{6}$/.test(v)){document.getElementById('adt-natpick').value=v;apply(v);}};
  document.getElementById('adt-apply').onclick=()=>{pop.remove();activePart=null;};
  setTimeout(()=>document.addEventListener('click',function off(e){if(!pop.contains(e.target)&&!anchor.contains(e.target)){pop.remove();activePart=null;document.removeEventListener('click',off);}}),50);
}
const updatePreview=()=>{const p=document.getElementById('adt-prev');if(p)p.innerHTML=buildSvg(liveColors);};

// ─── Import / Export ──────────────────────────────────────────────
const TOURNEY_KEY = 'ad_local_tourney';

// Fills {name} style placeholders in a translated template string, e.g.
// fmt(t.logRankedStats, {rank:'Gold', pct:42}).
function fmt(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ''));
}

function addLog(logEl, msg, type){
  // type: 'ok' | 'warn' | 'err'
  const row = document.createElement('div');
  const color = type==='warn' ? '#ECC94B' : type==='err' ? '#FC8181' : '#68D391';
  const prefix = type==='warn' ? '⚠ ' : type==='err' ? '✗ ' : '✓ ';
  row.style.cssText = `font-size:.72rem;color:${color};padding:.1rem 0;line-height:1.55;`;
  row.textContent = prefix + msg;
  logEl.appendChild(row);
}

async function runExport(logEl){
  const t = T();
  const out = { version:'1.0', exportedAt: new Date().toISOString() };

  // ── Ranked ──
  const rd = await loadRanked();
  if(rd && typeof rd.matchesPlayed !== 'undefined'){
    const rank = RANKS[rd.rankIndex] || RANKS[0];
    out.ranked = {
      rankName:     rank.name,
      rankIndex:    rd.rankIndex,
      percentage:   rd.percentage,
      matchesPlayed:rd.matchesPlayed,
      wins:         rd.wins,
      losses:       rd.losses,
      winRate:      rd.matchesPlayed>0 ? Math.round((rd.wins/rd.matchesPlayed)*100) : 0,
      botLevel:     rd.botLevel,
      username:     rd.username,
      recentMatches: (rd.history||[]).slice(0,10).map(h=>({
        result:    h.won?'Win':'Loss',
        change:    h.change,
        rankBefore:RANKS[h.rankBeforeId]?.name||'?',
        rankAfter: RANKS[h.rankAfterId]?.name||'?',
        date:      new Date(h.date).toISOString(),
        botLevel:  h.botLevel
      })),
      fullHistory: rd.history||[]
    };
    addLog(logEl, fmt(t.logRankedStats, {rank:rank.name, pct:rd.percentage, games:rd.matchesPlayed, wins:rd.wins, rate:out.ranked.winRate}), 'ok');
    if(!rd.username) addLog(logEl, t.logRankedNoUser, 'warn');
    if(!rd.matchesPlayed) addLog(logEl, t.logRankedNoGames, 'warn');
  } else {
    addLog(logEl, t.logRankedNoData, 'warn');
  }

  // ── Local Tournaments ──
  await new Promise(res => chrome.storage.local.get(TOURNEY_KEY, d => {
    if(d[TOURNEY_KEY] && Object.keys(d[TOURNEY_KEY]).length){
      out.tournaments = d[TOURNEY_KEY];
      const td = d[TOURNEY_KEY];
      const name = td.tournament?.name || td.name || '(Tournament)';
      const mode = td.tournament?.mode || td.mode || '?';
      addLog(logEl, fmt(t.logTournNamedMode, {name, mode}), 'ok');
    } else {
      addLog(logEl, t.logTournNoData, 'warn');
    }
    res();
  }));

  // ── Customize Darts ──
  const dc = await loadColors();
  if(dc){
    out.customizeDarts = dc;
    const parts = ['flight','shaft','barrel','point'].map(k=>k+': '+dc[k]).join(', ');
    addLog(logEl, fmt(t.logCustParts, {parts}), 'ok');
    addLog(logEl, fmt(t.logCustFlags, {enabled:dc.enabled, blend:dc.blend, svg: dc.useCustomSvg ? t.active : t.inactive}), 'ok');
    if(dc.useCustomSvg && dc.customSvg) addLog(logEl, fmt(t.logCustSvgSaved, {len: dc.customSvg.length}), 'ok');
    else if(dc.useCustomSvg) addLog(logEl, t.logCustSvgMissing, 'warn');
  } else {
    addLog(logEl, t.logCustNoData, 'warn');
  }

  return out;
}

async function runImport(json, logEl){
  const t = T();
  let data;
  try { data = typeof json==='string' ? JSON.parse(json) : json; }
  catch(e){ addLog(logEl, fmt(t.logJsonError, {msg: e.message}), 'err'); return false; }

  if(!data.version){ addLog(logEl, t.logInvalidFile, 'err'); return false; }

  let anyImported = false;

  // ── Ranked ──
  if(data.ranked){
    const rd = await loadRanked();
    const merged = {
      ...defaultRD(),
      ...rd,
      rankIndex:    data.ranked.rankIndex    ?? rd.rankIndex,
      percentage:   data.ranked.percentage   ?? rd.percentage,
      botLevel:     data.ranked.botLevel     ?? rd.botLevel,
      matchesPlayed:data.ranked.matchesPlayed?? rd.matchesPlayed,
      wins:         data.ranked.wins         ?? rd.wins,
      losses:       data.ranked.losses       ?? rd.losses,
      username:     data.ranked.username     ?? rd.username,
      history:      data.ranked.fullHistory  || data.ranked.recentMatches?.map(m=>({won:m.result==='Win',change:m.change,rankBeforeId:RANKS.findIndex(r=>r.name===m.rankBefore),rankAfterId:RANKS.findIndex(r=>r.name===m.rankAfter),date:new Date(m.date).getTime(),botLevel:m.botLevel})) || rd.history
    };
    await saveRanked(merged);
    const rank = RANKS[merged.rankIndex]||RANKS[0];
    addLog(logEl, fmt(t.logRankedImported, {rank:rank.name, pct:merged.percentage, games:merged.matchesPlayed}), 'ok');
    anyImported = true;
  } else { addLog(logEl, t.logRankedSkipped, 'warn'); }

  // ── Tournaments ──
  if(data.tournaments){
    await new Promise(res => chrome.storage.local.set({[TOURNEY_KEY]: data.tournaments}, res));
    const name = data.tournaments?.tournament?.name || data.tournaments?.name || '(Tournament)';
    addLog(logEl, fmt(t.logTournImported, {name}), 'ok');
    anyImported = true;
  } else { addLog(logEl, t.logTournSkipped, 'warn'); }

  // ── Customize Darts ──
  if(data.customizeDarts){
    // Import comes from an arbitrary, possibly attacker-crafted JSON file
    // (that's the whole point of Import/Export - sharing configs between
    // users). Never trust it as-is: validate every color as a plain hex
    // code and sanitize customSvg before it's stored, not just before
    // it's rendered - storage is itself a place other code paths read
    // from without necessarily re-sanitizing.
    const incoming = data.customizeDarts;
    const merged = {
      ...DEFAULT_COLORS,
      ...incoming,
      flight: isValidHexColor(incoming.flight) ? incoming.flight : DEFAULT_COLORS.flight,
      shaft:  isValidHexColor(incoming.shaft)  ? incoming.shaft  : DEFAULT_COLORS.shaft,
      barrel: isValidHexColor(incoming.barrel) ? incoming.barrel : DEFAULT_COLORS.barrel,
      point:  isValidHexColor(incoming.point)  ? incoming.point  : DEFAULT_COLORS.point,
      customSvg: incoming.customSvg ? sanitizeSvg(String(incoming.customSvg).trim()) : ''
    };
    await saveColors(merged);
    liveColors = merged;
    addLog(logEl, fmt(t.logCustImported, {enabled:merged.enabled, blend:merged.blend, svg: merged.useCustomSvg ? t.active : t.inactive}), 'ok');
    anyImported = true;
  } else { addLog(logEl, t.logCustSkipped, 'warn'); }

  return anyImported;
}

// ─── Hub ──────────────────────────────────────────────────────────
const PLUS_ICON=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`;

function hubCard(id,icon,ibg,ibrd,hvr,title,desc){
  return `<div id="${id}" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1.35rem;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:1.15rem;" onmouseover="this.style.background='rgba(255,255,255,.07)';this.style.borderColor='${hvr}'" onmouseout="this.style.background='rgba(255,255,255,.04)';this.style.borderColor='rgba(255,255,255,.08)'"><div style="width:48px;height:48px;background:${ibg};border:1px solid ${ibrd};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon}</div><div style="flex:1;min-width:0;"><div style="font-size:1rem;font-weight:700;margin-bottom:.25rem;">${title}</div><div style="font-size:.77rem;color:rgba(255,255,255,.4);line-height:1.55;">${desc}</div></div><svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,.2)"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg></div>`;
}

function renderHubPage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const t=T();
  const pg=document.createElement('div');pg.id='adt-hub';pg.className='max-w-400 mx-auto';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem;color:var(--color-mono-white,#fff);font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;

  const btnBase=`cursor:pointer;font-family:${FONT};font-weight:600;font-size:.78rem;border-radius:9px;padding:.5rem 1rem;display:inline-flex;align-items:center;gap:.45rem;transition:background .15s;border:1px solid;`;

  pg.innerHTML=`<div style="width:100%;max-width:640px;display:flex;flex-direction:column;gap:1.1rem;">
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.85rem;margin-bottom:.5rem;">
      <div style="display:flex;align-items:center;gap:.85rem;">
        <div style="width:42px;height:42px;background:linear-gradient(135deg,rgba(49,130,206,.35),rgba(128,90,213,.35));border:1px solid rgba(255,255,255,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgba(99,179,237,.9);">${PLUS_ICON}</div>
        <div><h1 style="font-size:1.4rem;font-weight:800;margin:0;">AutoDarts <span style="color:#63b3ed;">+</span></h1><p style="margin:.1rem 0 0;font-size:.72rem;color:rgba(255,255,255,.35);">${t.plusTagline}</p></div>
      </div>
      <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;">
        <input id="adt-premium-code" placeholder="Code" style="width:110px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.38rem .6rem;color:white;font-size:.7rem;font-family:monospace;text-transform:uppercase;outline:none;">
        <button id="adt-premium-redeem" style="background:rgba(159,122,234,.15);border:1px solid rgba(159,122,234,.3);border-radius:8px;padding:.38rem .7rem;color:#c9b3f5;font-weight:700;font-size:.7rem;cursor:pointer;font-family:${FONT};white-space:nowrap;">Redeem</button>
        <a href="${UPGRADE_URL}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;background:rgba(104,211,145,.1);border:1px solid rgba(104,211,145,.28);border-radius:8px;padding:.38rem .7rem;color:#68d391;font-size:.7rem;font-weight:700;text-decoration:none;font-family:${FONT};white-space:nowrap;">Get free Pro</a>
        <a href="${DONATE_URL}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(252,129,74,.08);border:1px solid rgba(252,129,74,.2);border-radius:8px;padding:.38rem .8rem;color:#fc8181;font-size:.73rem;font-weight:600;text-decoration:none;font-family:${FONT};" onmouseover="this.style.background='rgba(252,129,74,.18)'" onmouseout="this.style.background='rgba(252,129,74,.08)'"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>${t.donate}</a>
      </div>
    </div>
    <div id="adt-premium-status" style="font-size:.72rem;color:rgba(255,255,255,.45);margin-top:-.4rem;"></div>
    <div id="adt-premium-msg" style="display:none;font-size:.72rem;margin-top:-.4rem;"></div>

    <!-- Feature cards -->
    ${hubCard('adt-c-cust',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(99,179,237,.9)"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,'linear-gradient(135deg,rgba(49,130,206,.2),rgba(49,130,206,.08))','rgba(49,130,206,.28)','rgba(99,179,237,.3)',t.custTitle,t.custDesc)}
    ${hubCard('adt-c-ranked',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,214,0,.9)"><path d="M12 2L13.09 8.26L20 9l-5.45 5.27L16 21l-4-2.1L8 21l1.45-6.73L4 9l6.91-.74L12 2z"/></svg>`,'linear-gradient(135deg,rgba(255,214,0,.18),rgba(255,150,0,.08))','rgba(255,214,0,.25)','rgba(255,214,0,.35)',t.rankedTitle,t.rankedDesc)}
    ${hubCard('adt-c-tourn',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(104,211,145,.9)"><path d="M12 0L24 12V24H0V12L4 8V3H7V5L12 0ZM19 9h-2V7H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 19.9V22H7v2h10v-2h-4v-2.1a5.01 5.01 0 003.61-2.96C19.08 16.63 21 14.55 21 12V11c0-1.1-.9-2-2-2zM5 12V11h2v3.82C5.84 14.4 5 13.3 5 12zm14 0c0 1.3-.84 2.4-2 2.82V11h2v1z"/></svg>`,'linear-gradient(135deg,rgba(56,161,105,.2),rgba(56,161,105,.08))','rgba(56,161,105,.28)','rgba(104,211,145,.3)',t.tournTitle,t.tournDesc)}
    ${hubCard('adt-c-shortcuts',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(159,122,234,.9)"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM11 8h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>`,'linear-gradient(135deg,rgba(159,122,234,.2),rgba(159,122,234,.08))','rgba(159,122,234,.28)','rgba(159,122,234,.3)',t.scHubTitle,t.scHubDesc)}
    ${hubCard('adt-c-ai',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,.9)"><path d="M12 2a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8v2h8v-2c3-1.5 5-4.5 5-8a9 9 0 0 0-9-9zm-1 17v-1h2v1h-2zm5-8.5c0 1.9-1 3.5-2.5 4.5l-.5.3V17h-4v-1.7l-.5-.3C7 14 6 12.4 6 10.5 6 7.5 8.5 5 11.5 5h1C15.5 5 18 7.5 18 10.5z"/></svg>`,'linear-gradient(135deg,rgba(129,140,248,.22),rgba(99,179,237,.1))','rgba(129,140,248,.3)','rgba(129,140,248,.35)',t.aiHubTitle,t.aiHubDesc)}

    <!-- Import / Export row -->
    <div style="display:flex;gap:.7rem;flex-wrap:wrap;">
      <button id="adt-hub-export" style="${btnBase}background:rgba(99,179,237,.1);border-color:rgba(99,179,237,.25);color:rgba(99,179,237,.9);flex:1;" onmouseover="this.style.background='rgba(99,179,237,.2)'" onmouseout="this.style.background='rgba(99,179,237,.1)'"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>${t.exportBtn}</button>
      <button id="adt-hub-import" style="${btnBase}background:rgba(104,211,145,.1);border-color:rgba(104,211,145,.25);color:rgba(104,211,145,.9);flex:1;" onmouseover="this.style.background='rgba(104,211,145,.2)'" onmouseout="this.style.background='rgba(104,211,145,.1)'"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 15h4v6h6v-6h4l-7-7-7 7zM5 4v2h14V4H5z"/></svg>${t.importBtn}</button>
    </div>

    <!-- Log panel (hidden by default) -->
    <div id="adt-hub-logwrap" style="display:none;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem;">
      <div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);margin-bottom:.6rem;" id="adt-hub-logtitle">${t.log}</div>
      <div id="adt-hub-log" style="display:flex;flex-direction:column;gap:.1rem;"></div>
      <div id="adt-hub-logactions" style="margin-top:.85rem;display:flex;gap:.6rem;"></div>
    </div>

    <!-- Hidden file input -->
    <input type="file" id="adt-hub-filein" accept=".json" style="display:none;">
  </div>`;

  getMain().appendChild(pg);
  pg.querySelector('#adt-c-cust').onclick=async()=>{liveColors=await loadColors();history.pushState(null,'',CUSTOMIZE_PATH);renderCustomizePage();};
  pg.querySelector('#adt-c-ranked').onclick=()=>{history.pushState(null,'',RANKED_PATH);safeRender(renderRankedPage);};
  pg.querySelector('#adt-c-tourn').onclick=()=>{history.pushState(null,'',TOURNEY_PATH);renderTournamentPage();};
  pg.querySelector('#adt-c-shortcuts').onclick=()=>{history.pushState(null,'',SHORTCUTS_PATH);renderShortcutsPage();};
  pg.querySelector('#adt-c-ai').onclick=()=>{history.pushState(null,'',AI_COACH_PATH);safeRender(renderAiCoachPage);};

  // ── Update banner ──
  // Populated from chrome.storage.local (written by src/core/background.js,
  // which does the actual GitHub API check - a content script's fetch() is
  // still subject to the page's CSP, a background service worker isn't).
  chrome.storage.local.get('adUpdateInfo', (d) => {
    const info = d.adUpdateInfo;
    if (!info || !info.available) return;
    const wrapEl = pg.querySelector('div');
    if (!wrapEl) return;
    const banner = document.createElement('div');
    banner.style.cssText = 'background:rgba(99,179,237,.1);border:1px solid rgba(99,179,237,.28);border-radius:12px;padding:.9rem 1.1rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;';
    banner.innerHTML = `
      <div>
        <div style="font-weight:700;font-size:.85rem;color:#63b3ed;">${t.updAvailable}: v${escHtml(info.latest)}</div>
        <div style="font-size:.72rem;color:rgba(255,255,255,.45);margin-top:.15rem;">${fmt(t.updOnVersion, {v: escHtml(info.installed)})}</div>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        <a href="${STORE_LINKS.edge}" target="_blank" rel="noopener" style="background:rgba(99,179,237,.15);border:1px solid rgba(99,179,237,.3);border-radius:7px;padding:.4rem .75rem;color:#63b3ed;font-size:.72rem;font-weight:700;text-decoration:none;font-family:${FONT};">Edge</a>
        <a href="${STORE_LINKS.firefox}" target="_blank" rel="noopener" style="background:rgba(255,159,10,.12);border:1px solid rgba(255,159,10,.3);border-radius:7px;padding:.4rem .75rem;color:#ff9f0a;font-size:.72rem;font-weight:700;text-decoration:none;font-family:${FONT};">Firefox</a>
        <a href="${STORE_LINKS.github}" target="_blank" rel="noopener" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:7px;padding:.4rem .75rem;color:white;font-size:.72rem;font-weight:700;text-decoration:none;font-family:${FONT};">GitHub</a>
      </div>`;
    wrapEl.insertBefore(banner, wrapEl.firstChild);
  });

  // ── Premium status + code redemption ──
  const refreshPremiumStatus = async () => {
    const statusEl = pg.querySelector('#adt-premium-status');
    const p = await loadPremium();
    const active = p.premiumUntil > Date.now();
    if (active) {
      const days = Math.ceil((p.premiumUntil - Date.now()) / (24*60*60*1000));
      statusEl.textContent = `⭐ Premium active — ${days} day${days===1?'':'s'} left`;
      statusEl.style.color = '#68d391';
    } else {
      const remaining = await freeGamesRemaining();
      statusEl.textContent = `Free plan — ${remaining} of ${FREE_GAMES_LIMIT} free games left (Ranked + Local Tournaments combined)`;
      statusEl.style.color = 'rgba(255,255,255,.55)';
    }
  };
  refreshPremiumStatus();
  pg.querySelector('#adt-premium-redeem').onclick = async () => {
    const input = pg.querySelector('#adt-premium-code');
    const msgEl = pg.querySelector('#adt-premium-msg');
    const code = input.value;
    msgEl.style.display = 'block';
    msgEl.textContent = 'Checking…';
    msgEl.style.color = 'rgba(255,255,255,.5)';
    const result = await redeemPremiumCode(code);
    if (result.ok) {
      msgEl.textContent = result.usedFallback ? '✓ Premium activated for 3 days! (server unreachable, used offline code list)' : '✓ Premium activated for 3 days!';
      msgEl.style.color = '#68d391';
      input.value = '';
      refreshPremiumStatus();
    } else {
      msgEl.textContent = '✗ ' + result.message;
      msgEl.style.color = '#fc8181';
    }
  };

  // ── Export ──
  pg.querySelector('#adt-hub-export').onclick=async()=>{
    const wrap=document.getElementById('adt-hub-logwrap');
    const logEl=document.getElementById('adt-hub-log');
    const title=document.getElementById('adt-hub-logtitle');
    const actions=document.getElementById('adt-hub-logactions');
    logEl.innerHTML=''; actions.innerHTML='';
    title.textContent=t.exportTitleAnalyzing;
    wrap.style.display='block';

    const data = await runExport(logEl);
    title.textContent=t.exportTitleDone;

    // Download button
    const dl=document.createElement('button');
    dl.style.cssText=`${btnBase}background:rgba(99,179,237,.15);border-color:rgba(99,179,237,.3);color:rgba(99,179,237,.9);`;
    dl.innerHTML=`<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>${t.downloadJson}`;
    dl.onmouseover=()=>dl.style.background='rgba(99,179,237,.25)';
    dl.onmouseout=()=>dl.style.background='rgba(99,179,237,.15)';
    dl.onclick=()=>{
      const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;
      a.download='autodarts-plus-backup-'+new Date().toISOString().slice(0,10)+'.json';
      a.click();URL.revokeObjectURL(url);
    };
    actions.appendChild(dl);
  };

  // ── Import ──
  pg.querySelector('#adt-hub-import').onclick=()=>{
    document.getElementById('adt-hub-filein').click();
  };
  pg.querySelector('#adt-hub-filein').onchange=async function(){
    const file=this.files[0]; if(!file) return;
    const wrap=document.getElementById('adt-hub-logwrap');
    const logEl=document.getElementById('adt-hub-log');
    const title=document.getElementById('adt-hub-logtitle');
    const actions=document.getElementById('adt-hub-logactions');
    logEl.innerHTML=''; actions.innerHTML='';
    title.textContent=t.importTitleReading;
    wrap.style.display='block';

    const text = await file.text();
    const ok = await runImport(text, logEl);
    title.textContent = ok ? t.importTitleDone : t.importTitleFailed;
    this.value=''; // allow re-selecting same file
  };
}

// ─── Customize ────────────────────────────────────────────────────
function renderCustomizePage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adt-cust';pg.className='max-w-400 mx-auto';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2rem 1.5rem;color:var(--color-mono-white,#fff);font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  const wrap=document.createElement('div');wrap.style.cssText='width:100%;max-width:600px;display:flex;flex-direction:column;gap:1rem;';
  pg.appendChild(wrap);mc.appendChild(pg);
  wrap.appendChild(backBtn('AutoDarts +',()=>{history.pushState(null,'',PLUS_PATH);renderHubPage();}));
  wrap.innerHTML+=`
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:.65rem;">
      <div><h1 style="font-size:1.25rem;font-weight:700;margin:0 0 .15rem;">Customize Darts</h1><p style="margin:0;font-size:.75rem;color:rgba(255,255,255,.38);">Personalize your dart arrow appearance</p></div>
      <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;user-select:none;"><span id="adt-en-lbl" style="font-size:.78rem;color:${liveColors.enabled?'#68d391':'rgba(255,255,255,.33)'};">${liveColors.enabled?'Enabled':'Disabled'}</span>${mkTog('adt-en',liveColors.enabled,'#48bb78','23px','3px',44,24)}</label>
    </div>
    <div style="background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:2rem 1.5rem;display:flex;align-items:center;justify-content:center;"><div id="adt-prev" style="width:100%;">${buildSvg(liveColors)}</div></div>
    <div id="adt-col-sec" style="${liveColors.useCustomSvg?'opacity:.4;pointer-events:none;':''}transition:opacity .2s;">
      <div style="background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.075);border-radius:14px;overflow:hidden;">
        <div style="padding:.65rem 1rem;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;"><span style="font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);">Colors</span><label style="display:flex;align-items:center;gap:.45rem;cursor:pointer;user-select:none;"><span style="font-size:.7rem;color:rgba(255,255,255,.35);">Blend</span>${mkTog('adt-blend',liveColors.blend)}</label></div>
        ${PARTS.map((p,i)=>`<div style="${i?'border-top:1px solid rgba(255,255,255,.05);':''}display:flex;align-items:center;justify-content:space-between;padding:.7rem 1rem;transition:background .12s;" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='transparent'"><div style="display:flex;align-items:center;gap:.7rem;"><div id="adt-sw-${p.key}" style="width:30px;height:30px;border-radius:7px;background:${liveColors[p.key]};border:1px solid rgba(255,255,255,.15);flex-shrink:0;"></div><div><div style="font-weight:600;font-size:.85rem;">${p.label}</div><div id="adt-hl-${p.key}" style="font-size:.68rem;color:rgba(255,255,255,.33);font-family:monospace;">${liveColors[p.key]}</div></div></div><button id="adt-pick-${p.key}" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:.3rem .75rem;color:rgba(255,255,255,.7);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};transition:background .12s;" onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.07)'">Pick</button></div>`).join('')}
      </div>
    </div>
    <div style="background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.075);border-radius:14px;overflow:hidden;">
      <div style="padding:.65rem 1rem;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;"><div><span style="font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);">Custom SVG</span><span style="margin-left:.5rem;font-size:.62rem;color:rgba(255,255,255,.18);">Overrides colors</span></div><label style="display:flex;align-items:center;gap:.45rem;cursor:pointer;user-select:none;"><span style="font-size:.7rem;color:rgba(255,255,255,.35);">Use custom</span>${mkTog('adt-ctog',liveColors.useCustomSvg)}</label></div>
      <div style="padding:.85rem 1rem;"><textarea id="adt-svgta" placeholder="Paste SVG here..." style="width:100%;min-height:100px;resize:vertical;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.55rem .7rem;color:rgba(255,255,255,.8);font-family:monospace;font-size:.72rem;outline:none;box-sizing:border-box;line-height:1.5;">${escHtml(liveColors.customSvg||'')}</textarea>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;"><button id="adt-prevsvg" style="flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:.38rem .75rem;color:rgba(255,255,255,.7);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};" onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.07)'">Preview</button><button id="adt-clrsvg" style="background:rgba(255,60,60,.07);border:1px solid rgba(255,60,60,.18);border-radius:7px;padding:.38rem .75rem;color:rgba(255,120,120,.8);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};" onmouseover="this.style.background='rgba(255,60,60,.14)'" onmouseout="this.style.background='rgba(255,60,60,.07)'">Clear</button></div>
      <div id="adt-svgerr" style="display:none;margin-top:.45rem;font-size:.7rem;color:#fc8181;padding:.38rem .6rem;background:rgba(255,80,80,.07);border-radius:6px;border:1px solid rgba(255,80,80,.18);"></div></div>
    </div>
    <button id="adt-save" style="background:rgba(43,108,176,.8);border:none;border-radius:10px;padding:.8rem 2rem;color:white;font-weight:700;font-size:.88rem;font-family:${FONT};cursor:pointer;width:100%;transition:background .15s;" onmouseover="this.style.background='rgba(49,130,206,.9)'" onmouseout="this.style.background='rgba(43,108,176,.8)'">Save &amp; Apply</button>
    <div id="adt-savemsg" style="display:none;text-align:center;font-size:.77rem;color:#68d391;padding:.45rem;background:rgba(72,187,120,.07);border-radius:8px;border:1px solid rgba(72,187,120,.16);"></div>`;

  PARTS.forEach(p=>document.getElementById('adt-pick-'+p.key)?.addEventListener('click',e=>{e.stopPropagation();openColorPicker(p.key,e.currentTarget);}));
  const enEl=document.getElementById('adt-en');if(enEl)enEl.onchange=e=>{liveColors.enabled=e.target.checked;setTog('adt-en',liveColors.enabled,'#48bb78','23px','3px');const lb=document.getElementById('adt-en-lbl');if(lb){lb.textContent=liveColors.enabled?'Enabled':'Disabled';lb.style.color=liveColors.enabled?'#68d391':'rgba(255,255,255,.33)';}};
  const blEl=document.getElementById('adt-blend');if(blEl)blEl.onchange=e=>{liveColors.blend=e.target.checked;setTog('adt-blend',liveColors.blend);updatePreview();};
  const ctEl=document.getElementById('adt-ctog');if(ctEl)ctEl.onchange=async e=>{
    if(e.target.checked && !(await isPremiumActive())){
      e.target.checked=false; setTog('adt-ctog',false);
      showRankedModal({title:'Premium required', body:`Custom SVG dart skins need Premium. Get 3 days free at ${UPGRADE_URL}, or redeem a code in the AutoDarts + hub.`, buttons:[{label:'OK', primary:true}]});
      return;
    }
    liveColors.useCustomSvg=e.target.checked;setTog('adt-ctog',liveColors.useCustomSvg);const cs=document.getElementById('adt-col-sec');if(cs){cs.style.opacity=liveColors.useCustomSvg?'.4':'1';cs.style.pointerEvents=liveColors.useCustomSvg?'none':'';}if(liveColors.useCustomSvg)liveColors.customSvg=document.getElementById('adt-svgta')?.value?.trim()||'';updatePreview();};
  document.getElementById('adt-prevsvg')?.addEventListener('click',()=>{const raw=document.getElementById('adt-svgta')?.value?.trim(),err=document.getElementById('adt-svgerr');err.style.display='none';if(!raw){err.textContent='Please paste SVG code first.';err.style.display='block';return;}if(!raw.includes('<svg')){err.textContent='Invalid SVG.';err.style.display='block';return;}const clean=sanitizeSvg(raw);liveColors.customSvg=clean;liveColors.useCustomSvg=true;const p=document.getElementById('adt-prev');if(p)p.innerHTML=clean;const tog=document.getElementById('adt-ctog');if(tog&&!tog.checked){tog.checked=true;tog.dispatchEvent(new Event('change'));}});
  document.getElementById('adt-clrsvg')?.addEventListener('click',()=>{const ta=document.getElementById('adt-svgta');if(ta)ta.value='';liveColors.customSvg='';liveColors.useCustomSvg=false;const tog=document.getElementById('adt-ctog');if(tog&&tog.checked){tog.checked=false;tog.dispatchEvent(new Event('change'));}document.getElementById('adt-svgerr').style.display='none';updatePreview();});
  document.getElementById('adt-save')?.addEventListener('click',async()=>{liveColors.customSvg=sanitizeSvg(document.getElementById('adt-svgta')?.value?.trim()||'');await saveColors(liveColors);const m=document.getElementById('adt-savemsg');m.textContent='✓ Saved — applies on next match page.';m.style.display='block';setTimeout(()=>m.style.display='none',3500);});
}

// ─── Shortcuts ────────────────────────────────────────────────────
// Binds keyboard keys to three in-match actions:
//  - nextPlayer: dispatches a synthetic Space keydown/keyup at the page,
//    which is AutoDarts' own "confirm / next player" key.
//  - back: dispatches a synthetic Backspace keydown/keyup, AutoDarts'
//    own "back" key in menus.
//  - calibrate: sends a POST to the local dartboard software's own HTTP
//    API to trigger auto-calibration, completely separate from AutoDarts
//    itself.
// Stored as event.code values (e.g. "Space", "Backspace", "F9",
// "KeyC") rather than event.key, since .code identifies the physical key
// regardless of keyboard layout, which matters for a "press a key to
// bind it" flow.
const SHORTCUTS_KEY = 'adShortcuts';
const DEFAULT_SHORTCUTS = { nextPlayer: 'Space', back: 'Backspace', calibrate: '' };
const loadShortcuts = () => new Promise(r => chrome.storage.local.get(SHORTCUTS_KEY, d => r({...DEFAULT_SHORTCUTS, ...(d[SHORTCUTS_KEY]||{})})));
const saveShortcuts = s => new Promise(r => chrome.storage.local.set({[SHORTCUTS_KEY]:s}, r));

function dispatchKey(code, key, keyCode) {
  const opts = { code, key, keyCode, which: keyCode, bubbles: true, cancelable: true, composed: true };
  const target = document.activeElement && document.activeElement !== document.body ? document.activeElement : document;
  target.dispatchEvent(new KeyboardEvent('keydown', opts));
  target.dispatchEvent(new KeyboardEvent('keyup', opts));
  // Space (and Enter) activating a focused button is native browser
  // behavior tied to a *trusted* (real, physical) key event - a
  // synthetic KeyboardEvent never triggers it, even though any JS
  // keydown listener on the page still sees and can react to it just
  // fine. That's exactly why "Back" (a page-side JS listener reacting to
  // Backspace) works but "Next Player" didn't: if that button relies on
  // the browser's native "focused button + Space = click" behavior
  // instead of its own JS listener, nothing happens unless we click it
  // ourselves. So: if the currently focused element looks like a
  // button, click it directly too - this is exactly what a real
  // spacebar press would have done to it.
  if (code === 'Space' && target instanceof HTMLElement && typeof target.click === 'function') {
    const tag = target.tagName.toLowerCase();
    const role = target.getAttribute && target.getAttribute('role');
    if (tag === 'button' || tag === 'a' || tag === 'input' || role === 'button') {
      target.click();
    }
  }
}

async function triggerCalibrate() {
  try {
    await fetch('http://localhost:3180/api/config/calibration/auto?distortion=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error('[AD-Shortcuts] Calibrate request failed - is the local AutoDarts board software running?', e);
  }
}

let _shortcutsListenerInstalled = false;
let _liveShortcuts = null;

async function installShortcutListener() {
  _liveShortcuts = await loadShortcuts();
  if (_shortcutsListenerInstalled) return;
  _shortcutsListenerInstalled = true;
  document.addEventListener('keydown', (e) => {
    // Never fire while the user is actually typing somewhere (our own
    // inputs/textareas, or AutoDarts' own text fields) - only react to
    // the bare key press.
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;
    if (!_liveShortcuts) return;
    if (_liveShortcuts.nextPlayer && e.code === _liveShortcuts.nextPlayer) {
      e.preventDefault();
      dispatchKey('Space', ' ', 32);
    } else if (_liveShortcuts.back && e.code === _liveShortcuts.back) {
      e.preventDefault();
      dispatchKey('Backspace', 'Backspace', 8);
    } else if (_liveShortcuts.calibrate && e.code === _liveShortcuts.calibrate) {
      e.preventDefault();
      triggerCalibrate();
    }
  }, true);
}

function keyLabel(code) {
  if (!code) return '—';
  const map = { Space:'Space', Backspace:'Backspace', Enter:'Enter', Escape:'Esc', ArrowUp:'↑', ArrowDown:'↓', ArrowLeft:'←', ArrowRight:'→' };
  if (map[code]) return map[code];
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  return code;
}

function renderShortcutsPage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const t=T();
  const pg=document.createElement('div');pg.id='adt-shortcuts';pg.className='max-w-400 mx-auto';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2rem 1.5rem;color:var(--color-mono-white,#fff);font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  const wrap=document.createElement('div');wrap.style.cssText='width:100%;max-width:600px;display:flex;flex-direction:column;gap:1rem;';
  pg.appendChild(wrap);mc.appendChild(pg);
  wrap.appendChild(backBtn('AutoDarts +',()=>{history.pushState(null,'',PLUS_PATH);renderHubPage();}));

  const rowDef = [
    { key: 'nextPlayer', label: t.scNextPlayer, desc: t.scNextPlayerDesc },
    { key: 'back',       label: t.scBack,       desc: t.scBackDesc },
    { key: 'calibrate',  label: t.scCalibrate,  desc: t.scCalibrateDesc }
  ];

  loadShortcuts().then(current => {
    const rowsHtml = rowDef.map(r => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:.9rem 1rem;${r.key!=='nextPlayer'?'border-top:1px solid rgba(255,255,255,.05);':''}">
        <div style="flex:1;min-width:0;padding-right:1rem;">
          <div style="font-weight:700;font-size:.88rem;">${escHtml(r.label)}</div>
          <div style="font-size:.72rem;color:rgba(255,255,255,.35);margin-top:.15rem;">${escHtml(r.desc)}</div>
        </div>
        <button class="adt-sc-keybtn" data-action="${r.key}" style="min-width:96px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .9rem;color:white;font-weight:700;font-size:.78rem;font-family:monospace;cursor:pointer;text-align:center;">${escHtml(keyLabel(current[r.key]))}</button>
      </div>`).join('');

    wrap.innerHTML += `
      <div>
        <h1 style="font-size:1.25rem;font-weight:700;margin:0 0 .15rem;">${t.scTitle}</h1>
        <p style="margin:0;font-size:.75rem;color:rgba(255,255,255,.38);">${t.scDesc}</p>
      </div>
      <div style="background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.075);border-radius:14px;overflow:hidden;">
        ${rowsHtml}
      </div>
      <div id="adt-sc-hint" style="display:none;text-align:center;font-size:.78rem;color:#63b3ed;padding:.55rem;background:rgba(99,179,237,.08);border-radius:8px;border:1px solid rgba(99,179,237,.18);">${t.scListening}</div>
    `;

    const hint = document.getElementById('adt-sc-hint');
    wrap.querySelectorAll('.adt-sc-keybtn').forEach(btn => {
      btn.onclick = () => {
        if (btn.dataset.capturing) return;
        wrap.querySelectorAll('.adt-sc-keybtn').forEach(b => { delete b.dataset.capturing; b.style.borderColor='rgba(255,255,255,.12)'; });
        btn.dataset.capturing = '1';
        btn.style.borderColor = '#63b3ed';
        btn.textContent = '…';
        hint.style.display = 'block';
        const capture = async (e) => {
          e.preventDefault(); e.stopPropagation();
          window.removeEventListener('keydown', capture, true);
          delete btn.dataset.capturing;
          hint.style.display = 'none';
          if (e.code === 'Escape') {
            // Escape cancels capture without changing the binding.
            const cur = await loadShortcuts();
            btn.textContent = keyLabel(cur[btn.dataset.action]);
            return;
          }
          const updated = await loadShortcuts();
          updated[btn.dataset.action] = e.code;
          await saveShortcuts(updated);
          _liveShortcuts = updated;
          btn.textContent = keyLabel(e.code);
          btn.style.borderColor = 'rgba(255,255,255,.12)';
        };
        window.addEventListener('keydown', capture, true);
      };
    });
  });
}

function renderAiCoachPage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adt-ai-coach';pg.className='max-w-400 mx-auto';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2rem 1.5rem;color:var(--color-mono-white,#fff);font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  const wrap=document.createElement('div');wrap.style.cssText='width:100%;max-width:640px;display:flex;flex-direction:column;gap:1rem;';
  pg.appendChild(wrap);mc.appendChild(pg);
  wrap.appendChild(backBtn('AutoDarts +',()=>{history.pushState(null,'',PLUS_PATH);safeRender(renderHubPage);}));

  wrap.innerHTML += `
    <div>
      <h1 style="font-size:1.25rem;font-weight:700;margin:0 0 .15rem;">🧠 AI Match Coach</h1>
      <p style="margin:0;font-size:.75rem;color:rgba(255,255,255,.38);">Premium feature. Ask questions about your most recently finished match - the AI sees the same stats AutoDarts recorded for it.</p>
    </div>
    <div style="background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.075);border-radius:14px;padding:1rem 1.1rem;display:flex;flex-direction:column;gap:.7rem;">
      <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);">Settings</div>
      <div>
        <label style="font-size:.68rem;color:rgba(255,255,255,.45);display:block;margin-bottom:.3rem;">Groq API key <a href="https://console.groq.com/keys" target="_blank" rel="noopener" style="color:#63b3ed;text-decoration:none;">get one here</a></label>
        <input id="adt-ai-key" type="password" placeholder="gsk_..." style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .7rem;color:white;font-size:.75rem;font-family:monospace;outline:none;">
      </div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap;">
        <div style="flex:1;min-width:160px;">
          <label style="font-size:.68rem;color:rgba(255,255,255,.45);display:block;margin-bottom:.3rem;">Model</label>
          <select id="adt-ai-model" style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .7rem;color:white;font-size:.75rem;outline:none;">
            <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (recommended - fast & currently available)</option>
            <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (larger, but Groq occasionally retires/renames these - if you get a "model_not_found" error, switch back to the option above)</option>
            <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
            <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
          </select>
        </div>
        <div style="flex:1;min-width:120px;">
          <label style="font-size:.68rem;color:rgba(255,255,255,.45);display:block;margin-bottom:.3rem;">Throwing hand</label>
          <select id="adt-ai-handedness" style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .7rem;color:white;font-size:.75rem;outline:none;">
            <option value="">Not set</option>
            <option value="right">Right-handed</option>
            <option value="left">Left-handed</option>
          </select>
        </div>
        <div style="flex:1;min-width:100px;">
          <label style="font-size:.68rem;color:rgba(255,255,255,.45);display:block;margin-bottom:.3rem;">Your average</label>
          <input id="adt-ai-average" type="text" placeholder="e.g. 55" style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .7rem;color:white;font-size:.75rem;outline:none;">
        </div>
      </div>
      <div>
        <label style="font-size:.68rem;color:rgba(255,255,255,.45);display:block;margin-bottom:.3rem;">Extra notes for the AI (things it should know or avoid saying)</label>
        <textarea id="adt-ai-notes" rows="2" placeholder="e.g. don't keep mentioning my T20 accuracy, I know" style="width:100%;box-sizing:border-box;resize:vertical;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .7rem;color:white;font-size:.75rem;font-family:inherit;outline:none;"></textarea>
      </div>
      <button id="adt-ai-save" style="align-self:flex-start;background:rgba(99,179,237,.15);border:1px solid rgba(99,179,237,.3);border-radius:8px;padding:.45rem 1rem;color:#63b3ed;font-weight:700;font-size:.75rem;cursor:pointer;font-family:${FONT};">Save AI settings</button>
    </div>

    <div style="background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.075);border-radius:14px;overflow:hidden;">
      <div style="padding:.8rem 1rem;border-bottom:1px solid rgba(255,255,255,.08);font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);">Chat about your last match</div>
      <div id="adt-ai-msgs" style="padding:.9rem 1rem;display:flex;flex-direction:column;gap:.6rem;min-height:140px;max-height:360px;overflow-y:auto;"></div>
      <div style="padding:.7rem;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:.5rem;">
        <input id="adt-ai-input" placeholder="How did I play?" style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.5rem .7rem;color:white;font-size:.78rem;font-family:${FONT};outline:none;">
        <button id="adt-ai-send" style="background:rgba(99,179,237,.85);border:none;border-radius:8px;padding:.5rem .8rem;color:white;font-weight:700;cursor:pointer;font-family:${FONT};">➤</button>
      </div>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;padding:0 .8rem .8rem;">
        ${['How did I play?','What should I work on?','Did I nearly lose?'].map(s=>`<button class="adt-ai-sug" data-q="${escHtml(s)}" style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:.3rem .6rem;color:rgba(255,255,255,.6);font-size:.68rem;cursor:pointer;font-family:${FONT};">${escHtml(s)}</button>`).join('')}
      </div>
    </div>
  `;

  loadAiSettings().then(async s => {
    wrap.querySelector('#adt-ai-key').value = s.groqApiKey || '';
    wrap.querySelector('#adt-ai-model').value = s.model || GROQ_DEFAULT_MODEL;
    wrap.querySelector('#adt-ai-handedness').value = s.handedness || '';
    wrap.querySelector('#adt-ai-average').value = s.average || '';
    wrap.querySelector('#adt-ai-notes').value = s.notes || '';

    // Populate the dropdown with whatever models this key actually has
    // access to right now, instead of trusting a hardcoded list that
    // keeps going stale as Groq's catalog changes. Falls back to the
    // static options already in the markup if the key's empty or the
    // lookup fails for any reason.
    if (s.groqApiKey) {
      const available = await fetchAvailableGroqModels(s.groqApiKey);
      if (available.length) {
        const selectEl = wrap.querySelector('#adt-ai-model');
        const current = s.model || GROQ_DEFAULT_MODEL;
        selectEl.innerHTML = available.map(id => `<option value="${escHtml(id)}">${escHtml(id)}</option>`).join('');
        selectEl.value = available.includes(current) ? current : available[0];
      }
    }
  });
  wrap.querySelector('#adt-ai-key').addEventListener('change', async (e) => {
    const key = e.target.value.trim();
    if (!key) return;
    const available = await fetchAvailableGroqModels(key);
    if (available.length) {
      const selectEl = wrap.querySelector('#adt-ai-model');
      const current = selectEl.value;
      selectEl.innerHTML = available.map(id => `<option value="${escHtml(id)}">${escHtml(id)}</option>`).join('');
      selectEl.value = available.includes(current) ? current : available[0];
    }
  });
  wrap.querySelector('#adt-ai-save').onclick = async () => {
    const btn = wrap.querySelector('#adt-ai-save');
    await saveAiSettings({
      groqApiKey: wrap.querySelector('#adt-ai-key').value.trim(),
      model: wrap.querySelector('#adt-ai-model').value,
      handedness: wrap.querySelector('#adt-ai-handedness').value,
      average: wrap.querySelector('#adt-ai-average').value.trim(),
      notes: wrap.querySelector('#adt-ai-notes').value.trim()
    });
    const orig = btn.textContent;
    btn.textContent = '✓ Saved';
    setTimeout(() => btn.textContent = orig, 1800);
  };

  const msgsEl = wrap.querySelector('#adt-ai-msgs');
  const inputEl = wrap.querySelector('#adt-ai-input');
  _aiConversation = [];
  const addMsg = (text, who) => {
    const bubble = document.createElement('div');
    bubble.style.cssText = `align-self:${who==='user'?'flex-end':'flex-start'};max-width:85%;background:${who==='user'?'rgba(99,179,237,.18)':'rgba(255,255,255,.06)'};border:1px solid ${who==='user'?'rgba(99,179,237,.3)':'rgba(255,255,255,.1)'};border-radius:10px;padding:.5rem .7rem;color:rgba(255,255,255,.9);font-size:.78rem;line-height:1.5;white-space:pre-wrap;`;
    bubble.textContent = text; // textContent, never innerHTML - echoes model output and the user's own question, both untrusted as far as the DOM is concerned
    msgsEl.appendChild(bubble);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return bubble;
  };
  const send = async (text) => {
    if (!text || !text.trim()) return;
    if (!(await isPremiumActive())) {
      addMsg(`AI Match Coach needs Premium. Get 3 days free at ${UPGRADE_URL}, or redeem a code in the AutoDarts + hub.`, 'ai');
      return;
    }
    addMsg(text, 'user');
    _aiConversation.push({ role: 'user', content: text });
    inputEl.value = '';
    const thinking = addMsg('…', 'ai');
    const result = await askAi(text, _aiConversation.slice(0, -1));
    thinking.textContent = result.error ? ('⚠ ' + result.error) : result.reply;
    if (!result.error) _aiConversation.push({ role: 'assistant', content: result.reply });
  };
  wrap.querySelector('#adt-ai-send').onclick = () => send(inputEl.value);
  inputEl.onkeydown = (e) => { if (e.key === 'Enter') send(inputEl.value); };
  wrap.querySelectorAll('.adt-ai-sug').forEach(b => b.onclick = () => send(b.dataset.q));

  loadLastMatchStats().then(m => {
    addMsg(m ? 'Ask me anything about the match you last finished.' : 'No recent match data yet - play or finish reviewing a match, then come back here.', 'ai');
  });
}

async function renderBotSelectPage(onSelect){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adr-page';pg.className='max-w-400 mx-auto';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem;color:var(--color-mono-white,#fff);font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  const wrap=document.createElement('div');wrap.style.cssText='width:100%;max-width:640px;';pg.appendChild(wrap);mc.appendChild(pg);
  wrap.appendChild(backBtn('AutoDarts +',()=>{history.pushState(null,'',PLUS_PATH);renderHubPage();}));
  const inner=document.createElement('div');inner.innerHTML=`
    <div style="display:flex;align-items:center;gap:.85rem;margin-bottom:1.25rem;"><div style="width:42px;height:42px;background:linear-gradient(135deg,rgba(255,214,0,.25),rgba(255,150,0,.15));border:1px solid rgba(255,214,0,.25);border-radius:12px;display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,214,0,.9)"><path d="M12 2L13.09 8.26L20 9l-5.45 5.27L16 21l-4-2.1L8 21l1.45-6.73L4 9l6.91-.74L12 2z"/></svg></div><div><h1 style="font-size:1.3rem;font-weight:800;margin:0;">AutoDarts <span style="color:#FFD700;">Ranked</span></h1><p style="margin:.05rem 0 0;font-size:.72rem;color:rgba(255,255,255,.35);">Choose your opponent bot</p></div></div>
    <div style="background:rgba(255,214,0,.06);border:1px solid rgba(255,214,0,.15);border-radius:12px;padding:.9rem 1.1rem;margin-bottom:1.25rem;font-size:.8rem;color:rgba(255,255,255,.55);line-height:1.65;">🎯 Choose a bot matching your average. Every ranked match = <strong style="color:rgba(255,255,255,.8);">1 Leg X01-501 Double Out</strong>. The bot throws automatically.</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:.7rem;">${BOTS.map(b=>`<button data-level="${b.level}" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem;cursor:pointer;text-align:left;color:#fff;font-family:${FONT};transition:all .18s;"><div style="font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.3);margin-bottom:.3rem;">Level ${b.level}</div><div style="font-size:.95rem;font-weight:700;margin-bottom:.15rem;">${b.name}</div><div style="font-size:.75rem;color:rgba(255,255,255,.4);">${b.avg} avg</div></button>`).join('')}</div>`;
  wrap.appendChild(inner);
  inner.querySelectorAll('[data-level]').forEach(btn=>{
    btn.onmouseover=()=>{btn.style.background='rgba(255,214,0,.1)';btn.style.borderColor='rgba(255,214,0,.35)';btn.style.transform='translateY(-2px)';};
    btn.onmouseout=()=>{btn.style.background='rgba(255,255,255,.04)';btn.style.borderColor='rgba(255,255,255,.08)';btn.style.transform='';};
    btn.onclick=()=>onSelect(parseInt(btn.dataset.level));
  });
}

async function renderRankedPage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const data=await loadRanked();
  if(data.botLevel===null){renderBotSelectPage(async level=>{const d=await loadRanked();if(!d.username){const tok=await getTokenAsync();if(tok){const n=await fetchUsername(tok);if(n)d.username=n;}}d.botLevel=level;await saveRanked(d);renderRankedPage();});return;}
  const rank=RANKS[data.rankIndex]||RANKS[0],bot=BOTS.find(b=>b.level===data.botLevel)||BOTS[0];
  const winRate=data.matchesPlayed>0?Math.round(data.wins/data.matchesPlayed*100):0,isWelt=!!rank.unlimited;
  const pctDisp=isWelt?(data.percentage%100||(data.percentage>0?100:0)):data.percentage;
  const rankPath=RANKS.map((r,i)=>{const cur=i===data.rankIndex,done=i<data.rankIndex;return `<div style="display:flex;align-items:center;gap:4px;"><div title="${r.name}" style="width:${cur?28:20}px;height:${cur?28:20}px;border-radius:50%;background:${done||cur?r.grad:'rgba(255,255,255,.08)'};border:${cur?'2px solid '+r.color:'1px solid rgba(255,255,255,.1)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:${cur?'0 0 10px '+r.shadowColor:'none'};">${done||cur?getRankIcon(r.id,cur?20:14):''}</div>${i<RANKS.length-1?`<div style="width:10px;height:2px;background:${done?'rgba(255,255,255,.25)':'rgba(255,255,255,.07)'};border-radius:1px;"></div>`:''}</div>`;}).join('');
  const histRows=(data.history||[]).slice(0,8).map(h=>{const rA=RANKS[h.rankAfterId]||RANKS[0],pro=h.rankAfterId>h.rankBeforeId,dem=h.rankAfterId<h.rankBeforeId;const ds=new Date(h.date).toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});return `<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:.55rem .8rem;display:flex;align-items:center;gap:.65rem;"><div style="width:26px;height:26px;border-radius:50%;background:${rA.grad};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${getRankIcon(rA.id,18)}</div><div style="flex:1;"><div style="font-size:.78rem;font-weight:700;color:${h.won?'#68d391':'#fc8181'};">${h.won?'Won':'Loss'}${pro?' ⬆':dem?' ⬇':''}</div><div style="font-size:.67rem;color:rgba(255,255,255,.28);">${rA.name} — ${Math.round(h.pctAfter)}%</div></div><div style="font-size:.8rem;font-weight:700;color:${h.change>=0?'#68d391':'#fc8181'};flex-shrink:0;">${h.change>=0?'+':''}${h.change}%</div><div style="font-size:.63rem;color:rgba(255,255,255,.2);flex-shrink:0;">${ds}</div></div>`;}).join('');
  const allRanks=RANKS.map((r,i)=>{const cur=i===data.rankIndex,done=i<data.rankIndex;return `<div style="background:${cur?'rgba(255,255,255,.06)':'rgba(255,255,255,.02)'};border:1px solid ${cur?'rgba(255,255,255,.12)':'rgba(255,255,255,.05)'};border-radius:10px;padding:.5rem .8rem;display:flex;align-items:center;gap:.65rem;"><div style="width:30px;height:30px;border-radius:50%;background:${done||cur?r.grad:'rgba(255,255,255,.06)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${done||cur?getRankIcon(r.id,22):''}</div><div style="flex:1;font-size:.82rem;font-weight:${cur?800:600};color:${cur?r.color:'rgba(255,255,255,.4)'};">${r.name}${cur?' <span style="font-size:.68rem;color:rgba(255,255,255,.3);">← You</span>':''}</div><div style="font-size:.68rem;text-align:right;"><div style="color:rgba(72,187,120,.6);">+${r.winMin}–${r.winMax}%</div><div style="color:rgba(245,101,101,.6);">-${r.lossMin}–${r.lossMax}%</div></div></div>`;}).join('');
  const pg=document.createElement('div');pg.id='adr-page';pg.className='max-w-400 mx-auto';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem;color:var(--color-mono-white,#fff);font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  const wrap=document.createElement('div');wrap.style.cssText='width:100%;max-width:680px;display:flex;flex-direction:column;gap:1.1rem;';pg.appendChild(wrap);mc.appendChild(pg);
  wrap.appendChild(backBtn('AutoDarts +',()=>{history.pushState(null,'',PLUS_PATH);renderHubPage();}));
  const inner=document.createElement('div');inner.style.cssText='display:flex;flex-direction:column;gap:1.1rem;';
  inner.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;"><div style="display:flex;align-items:center;gap:.85rem;"><div style="width:42px;height:42px;background:linear-gradient(135deg,rgba(255,214,0,.25),rgba(255,150,0,.15));border:1px solid rgba(255,214,0,.25);border-radius:12px;display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,214,0,.9)"><path d="M12 2L13.09 8.26L20 9l-5.45 5.27L16 21l-4-2.1L8 21l1.45-6.73L4 9l6.91-.74L12 2z"/></svg></div><div><h1 style="font-size:1.3rem;font-weight:800;margin:0;">AutoDarts <span style="color:#FFD700;">Ranked</span></h1><p style="margin:.05rem 0 0;font-size:.7rem;color:rgba(255,255,255,.3);">Opponent: ${bot.name} (${bot.avg} avg)</p></div></div><button id="adr-chgbot" style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.35rem .8rem;color:rgba(255,255,255,.5);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};">Change Bot</button></div>
    <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:1.6rem;position:relative;overflow:hidden;"><div style="position:absolute;inset:0;background:${rank.grad};opacity:.05;pointer-events:none;"></div><div style="display:flex;align-items:center;gap:1.1rem;margin-bottom:1.1rem;position:relative;"><div style="width:64px;height:64px;border-radius:50%;background:${rank.grad};padding:3px;box-shadow:0 0 24px ${rank.shadowColor};flex-shrink:0;animation:adrPulse 3s ease-in-out infinite;"><div style="width:100%;height:100%;border-radius:50%;background:#1a1f2e;display:flex;align-items:center;justify-content:center;">${getRankIcon(rank.id,48)}</div></div><div style="flex:1;"><div style="font-size:1.55rem;font-weight:900;letter-spacing:.04em;background:${rank.grad};-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${rank.name}</div><div style="font-size:.82rem;color:rgba(255,255,255,.4);">${isWelt?Math.round(data.percentage)+'% accumulated':Math.round(data.percentage)+'% / 100%'}</div></div>${data.lastChange!==undefined?`<div style="font-size:1rem;font-weight:800;color:${data.lastChange>=0?'#68d391':'#fc8181'};">${data.lastChange>=0?'+':''}${data.lastChange}%</div>`:''}</div><div style="height:10px;background:rgba(255,255,255,.08);border-radius:6px;overflow:hidden;margin-bottom:.4rem;"><div style="height:100%;width:${Math.min(Math.max(pctDisp,0),100)}%;background:${rank.grad};border-radius:6px;box-shadow:0 0 10px ${rank.shadowColor};transition:width .8s;"></div></div>${!isWelt?`<div style="display:flex;justify-content:space-between;font-size:.65rem;color:rgba(255,255,255,.25);"><span>0%</span>${data.rankIndex<RANKS.length-1?`<span style="color:rgba(255,255,255,.35);">→ ${RANKS[data.rankIndex+1].name}</span>`:''}<span>100%</span></div>`:`<div style="text-align:center;font-size:.7rem;color:rgba(155,89,182,.7);font-weight:700;">∞ World Master – unlimited</div>`}<div style="display:flex;align-items:center;gap:4px;margin-top:1rem;flex-wrap:wrap;">${rankPath}</div></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem;"><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:.9rem;text-align:center;"><div style="font-size:1.45rem;font-weight:800;">${data.matchesPlayed}</div><div style="font-size:.62rem;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,.28);margin-top:.15rem;">Games</div></div><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:.9rem;text-align:center;"><div style="font-size:1.45rem;font-weight:800;color:#68d391;">${data.wins}</div><div style="font-size:.62rem;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,.28);margin-top:.15rem;">Wins</div></div><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:.9rem;text-align:center;"><div style="font-size:1.45rem;font-weight:800;color:${winRate>=50?'#68d391':'#fc8181'};">${winRate}%</div><div style="font-size:.62rem;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,.28);margin-top:.15rem;">Win Rate</div></div></div>
    <button id="adr-start-match" style="background:${rank.grad};border:none;border-radius:14px;padding:1rem;color:${rank.textColor};font-weight:800;font-size:1rem;font-family:${FONT};cursor:pointer;width:100%;box-shadow:0 6px 24px ${rank.shadowColor};letter-spacing:.03em;transition:filter .15s,transform .12s;">🎯 Start Ranked Match (1 Leg vs. ${bot.name})</button>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;font-size:.75rem;"><div style="background:rgba(72,187,120,.07);border:1px solid rgba(72,187,120,.15);border-radius:10px;padding:.7rem .9rem;"><div style="color:#68d391;font-weight:700;margin-bottom:.2rem;">✅ Win</div><div style="color:rgba(255,255,255,.45);">+${rank.winMin}% to +${rank.winMax}%</div></div><div style="background:rgba(245,101,101,.07);border:1px solid rgba(245,101,101,.15);border-radius:10px;padding:.7rem .9rem;"><div style="color:#fc8181;font-weight:700;margin-bottom:.2rem;">❌ Loss</div><div style="color:rgba(255,255,255,.45);">-${rank.lossMin}% to -${rank.lossMax}%</div></div></div>
    ${histRows?`<div><div style="font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.28);margin-bottom:.5rem;">Recent Matches</div><div style="display:flex;flex-direction:column;gap:.38rem;">${histRows}</div></div>`:''}
    <div><div style="font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.28);margin-bottom:.5rem;">All Ranks</div><div style="display:flex;flex-direction:column;gap:.3rem;">${allRanks}</div></div>`;
  wrap.appendChild(inner);
  document.getElementById('adr-chgbot').onclick=()=>safeRender(()=>renderBotSelectPage(async level=>{const d=await loadRanked();d.botLevel=level;await saveRanked(d);safeRender(renderRankedPage);}));
  const sb=document.getElementById('adr-start-match');sb.onmouseover=()=>{sb.style.filter='brightness(1.12)';sb.style.transform='translateY(-2px)';};sb.onmouseout=()=>{sb.style.filter='';sb.style.transform='';};sb.onclick=()=>startRankedMatch();
}

// ─── Tournament page ──────────────────────────────────────────────
function renderTournamentPage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adt-tourn';pg.className='max-w-400 mx-auto';pg.style.cssText=`display:flex;flex-direction:column;padding:2rem 1.5rem;color:var(--color-mono-white,#fff);font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  pg.appendChild(backBtn('AutoDarts +',()=>{history.pushState(null,'',PLUS_PATH);renderHubPage();}));
  const hdr=document.createElement('div');hdr.style.cssText='margin-bottom:1.5rem;';hdr.innerHTML=`<h1 style="font-size:1.25rem;font-weight:700;margin:0 0 .15rem;">Local Tournaments</h1><p style="margin:0;font-size:.75rem;color:rgba(255,255,255,.38);">KO · Groups + KO · League — automatic result sync</p>`;pg.appendChild(hdr);
  const td=document.createElement('div');td.id=TOURNEY_DIV_ID;td.style.cssText='flex:1;';pg.appendChild(td);
  const credits=document.createElement('div');credits.style.cssText=`margin-top:2.5rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:flex-start;gap:.85rem;font-family:${FONT};`;credits.innerHTML=`<div style="width:34px;height:34px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgba(255,255,255,.3);"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></div><div><div style="font-size:.72rem;font-weight:600;color:rgba(255,255,255,.45);margin-bottom:.25rem;">Local Tournaments — Credits</div><div style="font-size:.7rem;color:rgba(255,255,255,.25);line-height:1.65;">Based on the <strong style="color:rgba(255,255,255,.4);">Autodarts Local Tournaments</strong> extension by <strong style="color:rgba(255,255,255,.4);">alex</strong> (v1.33). All tournament logic and UI remain the work of the original author. AutoDarts + integrates it into a unified hub.</div></div>`;pg.appendChild(credits);
  mc.appendChild(pg);
  if(window.adTourney?.renderUI){window.adTourney.syncMatchResults?.();window.adTourney.renderUI();}
  else{td.innerHTML=`<div style="text-align:center;padding:3rem;color:rgba(255,255,255,.3);font-family:${FONT};">Loading...</div>`;const iv=setInterval(()=>{if(window.adTourney?.renderUI){clearInterval(iv);window.adTourney.syncMatchResults?.();window.adTourney.renderUI();}},200);setTimeout(()=>clearInterval(iv),10000);}
}

// ─── Sidebar ──────────────────────────────────────────────────────
// Rebuilt to be idempotent and non-overlapping: exactly one watchdog
// runs a cheap *synchronous* DOM check on a fixed interval — it never
// starts a second concurrent injection attempt while one might still be
// pending, and it does nothing (no log spam) on pages where the nav is
// simply not present (e.g. a fullscreen match view), instead of firing
// a fresh 15s waitFor() every tick. That overlapping-timer bug is what
// previously produced dozens of concurrent "Sidebar inject failed"
// timeouts and, worse, could leave more than one button behind once the
// nav reappeared.
let _sidebarWatchdog=null;
let _sidebarBusy=false;

function buildNavButton(nav){
  document.getElementById('adt-plus-btn')?.remove();

  if(nav.matches('nav[aria-label="Main navigation"]')){
    // ── New site (play.autodarts.com): plain text nav link, no icon,
    // same classes as Home/Play/Online/Tournaments/Stats.
    const template=nav.querySelector('a[href]');
    const btn=document.createElement('a');
    btn.id='adt-plus-btn';
    btn.href=PLUS_PATH;
    btn.textContent='AutoDarts +';
    btn.className=template
      ? template.className.replace(/\btext-mono-white\b/g,'').replace(/\btext-black-20\b/g,'').trim()+' text-black-20 hover:text-mono-white'
      : 'font-bold flex items-center relative hover:text-mono-white text-black-20';
    // The site's hover/active underline is a single shared indicator
    // element whose position is driven by React state on the *real*
    // nav items — our injected link never triggers that. Fake the same
    // visual feedback locally with a lightweight animated underline so
    // it doesn't look inert next to Home/Play/Online/etc.
    if(!document.getElementById('adt-nav-btn-style')){
      const st=document.createElement('style');
      st.id='adt-nav-btn-style';
      st.textContent='#adt-plus-btn{position:relative;}#adt-plus-btn::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:2px;background:currentColor;border-radius:1px;transform:scaleX(0);transform-origin:center;transition:transform .25s cubic-bezier(.4,0,.2,1);}#adt-plus-btn:hover::after,#adt-plus-btn[data-status="active"]::after{transform:scaleX(1);}';
      document.head.appendChild(st);
    }
    btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();history.pushState(null,'',PLUS_PATH);renderHubPage();});
    nav.appendChild(btn);
  } else {
    // ── Legacy site (play-v1.autodarts.com / old .io build): icon +
    // label button cloned from the last sidebar item, as before.
    const last=nav.lastElementChild;
    if(!last)return;
    const btn=last.cloneNode(true);
    btn.removeAttribute('href');
    btn.id='adt-plus-btn';
    btn.style.cursor='pointer';
    const w=document.querySelector('#root > div > div')?.getBoundingClientRect().width||999;
    btn.innerHTML=PLUS_ICON+(w>170?`<span style="margin-left:.45rem;font-weight:700;">AutoDarts +</span>`:'');
    btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();history.pushState(null,'',PLUS_PATH);renderHubPage();});
    nav.appendChild(btn);
  }
}

// Cheap per-tick maintenance: only touches the DOM when there's actually
// something to fix (nav present + button missing/detached, or a legacy
// button whose icon/label needs to react to a sidebar resize). No
// waiting, no promises, so ticks can never pile up on top of each other.
function maintainSidebarButton(){
  if(_sidebarBusy) return;
  const nav=firstMatch(MAIN_NAV_SELECTORS);
  if(!nav) return; // e.g. fullscreen match view — nothing we can (or should) do right now
  const existing=document.getElementById('adt-plus-btn');
  if(existing && existing.isConnected){
    if(nav.matches('nav[aria-label="Main navigation"]')){
      existing.dataset.status = location.pathname.startsWith(PLUS_PATH) ? 'active' : '';
    } else {
      const w=document.querySelector('#root > div > div')?.getBoundingClientRect().width||999;
      if(w<170) existing.innerHTML=PLUS_ICON;
      else if(w>200) existing.innerHTML=PLUS_ICON+`<span style="margin-left:.45rem;font-weight:700;">AutoDarts +</span>`;
    }
    return;
  }
  _sidebarBusy=true;
  try{ buildNavButton(nav); } finally { _sidebarBusy=false; }
}

async function injectSidebar(){
  try{
    const nav=await waitFor(MAIN_NAV_SELECTORS,15000);
    buildNavButton(nav);
  }catch(e){console.error('[AutoDarts+] Sidebar inject failed',e&&e.message);}
  if(!_sidebarWatchdog) _sidebarWatchdog=setInterval(maintainSidebarButton,1500);
}


// ─── URL watcher ──────────────────────────────────────────────────
let curUrl=location.href;
function watchUrl(cb){
  const root=document.getElementById('root');
  if(!root)return; // Guard: bail silently if root not ready
  new MutationObserver(()=>{if(location.href!==curUrl){const old=curUrl;curUrl=location.href;cb(curUrl,old);}}).observe(root,{childList:true,subtree:true});
}

// ─── Main ─────────────────────────────────────────────────────────
async function main(){
  try {
    // pageScript.js (MAIN world, document_start) rewrites a hard-loaded
    // /autodarts-plus/... URL to '/' before AutoDarts' own router boots,
    // so it never 404s, and stashes the real intended path here. Pick it
    // back up now that the real app shell has had a chance to mount
    // normally, and treat it exactly like a normal in-app navigation to
    // that path from here on.
    let pendingPath = null;
    try {
        pendingPath = sessionStorage.getItem('_adPlusPendingPath');
        if (pendingPath) sessionStorage.removeItem('_adPlusPendingPath');
    } catch (e) {}
    const initialPath = pendingPath || location.pathname;
    const initialHref = pendingPath ? (location.origin + pendingPath) : location.href;
    if (pendingPath) history.replaceState(history.state, '', pendingPath + location.search + location.hash);

    await waitFor(ROOT_READY_SELECTORS,20000);

    if(initialHref.includes('/matches')) injectDartSkin();
    if(initialHref.includes('/history/matches/')) tryCaptureMatchForAi(initialHref);
    if(initialPath.includes('/matches/')) setTimeout(startResultPolling,2500);

    const mc=await waitFor(MAIN_CONTENT_SELECTORS,10000).catch(()=>null);
    if(mc){
      if(initialHref.includes(CUSTOMIZE_PATH)) safeRender(async()=>{liveColors=await loadColors();renderCustomizePage();});
      else if(initialHref.includes(RANKED_PATH)) safeRender(renderRankedPage);
      else if(initialHref.includes(TOURNEY_PATH)) safeRender(renderTournamentPage);
      else if(initialHref.includes(SHORTCUTS_PATH)) safeRender(renderShortcutsPage);
      else if(initialHref.includes(AI_COACH_PATH)) safeRender(renderAiCoachPage);
      else if(initialHref.includes(PLUS_PATH)) safeRender(renderHubPage);
    }

    await injectSidebar(); // starts Observer — keeps button alive across navigations
    installShortcutListener();

    watchUrl(async url=>{
      const m=await waitFor(MAIN_CONTENT_SELECTORS,5000).catch(()=>null);
      if(!m)return;
      if(url.includes(CUSTOMIZE_PATH)) safeRender(async()=>{liveColors=await loadColors();renderCustomizePage();});
      else if(url.includes(RANKED_PATH)) safeRender(renderRankedPage);
      else if(url.includes(TOURNEY_PATH)) safeRender(renderTournamentPage);
      else if(url.includes(SHORTCUTS_PATH)) safeRender(renderShortcutsPage);
      else if(url.includes(AI_COACH_PATH)) safeRender(renderAiCoachPage);
      else if(url.includes(PLUS_PATH)) safeRender(renderHubPage);
      else clearAllPages();
      if(url.includes('/matches')){injectDartSkin();setTimeout(startResultPolling,2500);}
      else stopDartSkinInjection();
      if(url.includes('/history/matches/')) tryCaptureMatchForAi(url);
    });

  } catch(e) {
    // Friendly error — e might be undefined if a Promise was rejected without a value
    console.error('[AutoDarts+] main failed', e && (e.message||String(e)));
  }
}

main();
