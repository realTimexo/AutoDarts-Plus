// ================================================================
//  AutoDarts + – content.js  v2.0
//  Hub · Dart Skin Customizer · Local Tournaments
// ================================================================

// Save board-id for tournament auto-lobby
(function() {
  const b = localStorage.getItem('autodarts-board');
  if (b) chrome.storage.local.set({ 'autodarts-board': b });
})();

// ─── Constants ───────────────────────────────────────────────────
const PLUS_PATH       = '/autodarts-plus';
const CUSTOMIZE_PATH  = '/autodarts-plus/customize';
const TOURNAMENT_PATH = '/autodarts-plus/tournaments';
const DONATE_URL      = 'https://www.paypal.com/donate/?hosted_button_id=38GT8LH75W4GU';
const TOURNEY_PAGE_ID = 'autodarts-tools-config';

const DEFAULT_COLORS = {
  flight:'#ffffff', shaft:'#ffffff', barrel:'#c0c0c0', point:'#d9d9d9',
  enabled:true, blend:false, customSvg:'', useCustomSvg:false
};
const PRESET_COLORS = [
  {l:'White', h:'#ffffff'},{l:'Silver',h:'#c0c0c0'},{l:'Black', h:'#1a1a1a'},
  {l:'Red',   h:'#e53e3e'},{l:'Blue',  h:'#3182ce'},{l:'Green', h:'#38a169'},
  {l:'Yellow',h:'#d69e2e'},{l:'Purple',h:'#805ad5'},{l:'Orange',h:'#dd6b20'},
  {l:'Pink',  h:'#d53f8c'},{l:'Cyan',  h:'#00b5d8'},{l:'Gold',  h:'#b7791f'},
];
const PARTS = [
  {key:'flight',label:'Flight'},{key:'shaft',label:'Shaft'},
  {key:'barrel',label:'Barrel'},{key:'point',label:'Point'},
];

// Shared font
const FONT = "var(--chakra-fonts-body,'Open Sans',sans-serif)";

// ─── SVG builder ─────────────────────────────────────────────────
function buildSvg(c) {
  if (c.useCustomSvg && c.customSvg && c.customSvg.trim()) return c.customSvg.trim();
  const stops = c.blend
    ? `<stop offset="0%"   stop-color="${c.flight}"/>
       <stop offset="20%"  stop-color="${c.flight}"/>
       <stop offset="35%"  stop-color="${c.shaft}"/>
       <stop offset="55%"  stop-color="${c.barrel}"/>
       <stop offset="80%"  stop-color="${c.barrel}"/>
       <stop offset="100%" stop-color="${c.point}"/>`
    : `<stop offset="0%"   stop-color="${c.flight}"/>
       <stop offset="20%"  stop-color="${c.flight}"/>
       <stop offset="20%"  stop-color="${c.shaft}"/>
       <stop offset="35%"  stop-color="${c.shaft}"/>
       <stop offset="35%"  stop-color="${c.barrel}"/>
       <stop offset="80%"  stop-color="${c.barrel}"/>
       <stop offset="80%"  stop-color="${c.point}"/>
       <stop offset="100%" stop-color="${c.point}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 102">
  <defs><linearGradient id="dg" x1="0" y1="0" x2="477" y2="0" gradientUnits="userSpaceOnUse">${stops}</linearGradient></defs>
  <path fill="url(#dg)" d="M26.56.5h53.65l.14.11,55.78,45,42.2-.07,42.49.07c.95-.56,6.88-4,10.06-4h152.73c2.11,0,4.43.36,6.9,1.07,1.96.56,4.03,1.35,6.13,2.34,3.16,1.48,5.42,2.94,5.98,3.31,2.04,0,23.83-.1,40.68-.1,10.34,0,16.83.03,19.29.1,5.75.16,13.13,1.98,13.95,2.19h.02s-.12.48-.12.48h0s.12.5.12.5h-.02c-.82.21-8.2,2.02-13.95,2.19-2.45.07-8.94.1-19.29.1-16.85,0-38.64-.09-40.68-.1-.56.37-2.82,1.83-5.98,3.31-3.32,1.55-8.27,3.41-13.03,3.41h-152.73c-3.19,0-9.11-3.44-10.06-4l-42.49.07-42.2-.07-55.78,45-.14.11H26.56l-.14-.27L1,51.23l-.12-.23.12-.23L26.43.77l.14-.27Z"/>
</svg>`;
}

// ─── Storage ──────────────────────────────────────────────────────
const loadColors = () => new Promise(r =>
  chrome.storage.local.get('dartColors', d =>
    r(d.dartColors ? {...DEFAULT_COLORS,...d.dartColors} : {...DEFAULT_COLORS})));
const saveColors = c => new Promise(r => chrome.storage.local.set({dartColors:c}, r));

// ─── Match dart injection ─────────────────────────────────────────
async function injectDartSkin() {
  const c = await loadColors();
  if (!c.enabled) return;
  const encoded = 'data:image/svg+xml;utf8,' + encodeURIComponent(buildSvg(c));
  const tryIt = () => {
    const imgs = document.querySelectorAll('img');
    if (imgs.length >= 6) { [3,4,5].forEach(i => { if(imgs[i]) imgs[i].src = encoded; }); return true; }
    return false;
  };
  if (!tryIt()) {
    const obs = new MutationObserver(() => { if(tryIt()) obs.disconnect(); });
    obs.observe(document.body, {childList:true,subtree:true});
    setTimeout(() => obs.disconnect(), 10000);
  }
}

// ─── DOM helpers ──────────────────────────────────────────────────
function waitFor(sel, t=15000) {
  return new Promise((res,rej) => {
    const el = document.querySelector(sel); if (el) { res(el); return; }
    const s = Date.now();
    const iv = setInterval(() => {
      const f = document.querySelector(sel);
      if (f) { clearInterval(iv); res(f); return; }
      if (Date.now()-s >= t) { clearInterval(iv); rej(); }
    }, 100);
  });
}
const getMain = () => document.querySelector('#root > div > div:nth-of-type(2)');
const hideMain = () => {
  const m = getMain(); if (!m) return;
  Array.from(m.children).forEach(c => { if (!c.id.startsWith('adt-') && c.id !== TOURNEY_PAGE_ID) c.style.display='none'; });
};
const showMain = () => {
  const m = getMain(); if (!m) return;
  Array.from(m.children).forEach(c => c.style.display='');
};

// ─── Color picker ─────────────────────────────────────────────────
let activePart = null;
let liveColors = {...DEFAULT_COLORS};

function openColorPicker(partKey, anchor) {
  document.getElementById('adt-picker')?.remove();
  if (activePart === partKey) { activePart = null; return; }
  activePart = partKey;
  const cur = liveColors[partKey] || '#ffffff';
  const pop = document.createElement('div');
  pop.id = 'adt-picker';
  pop.innerHTML = `
    <div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);margin-bottom:.55rem;">Presets</div>
    <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.75rem;">
      ${PRESET_COLORS.map(p=>`<button data-h="${p.h}" title="${p.l}" style="width:30px;height:30px;border-radius:6px;background:${p.h};border:2px solid ${cur===p.h?'#63b3ed':'rgba(255,255,255,.1)'};cursor:pointer;flex-shrink:0;transition:transform .1s;outline:none;"></button>`).join('')}
    </div>
    <div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);margin-bottom:.4rem;">Custom</div>
    <div style="display:flex;align-items:center;gap:.45rem;">
      <input type="color" id="adt-natpick" value="${cur}" style="width:34px;height:30px;border:none;border-radius:6px;background:none;cursor:pointer;padding:0;flex-shrink:0;">
      <input type="text" id="adt-hexin" maxlength="7" value="${cur}" style="flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:6px;padding:.3rem .55rem;color:white;font-family:monospace;font-size:.82rem;outline:none;min-width:0;">
      <button id="adt-apply" style="background:#2b6cb0;border:none;border-radius:6px;padding:.3rem .7rem;color:white;font-size:.72rem;font-weight:700;cursor:pointer;flex-shrink:0;font-family:${FONT};">Apply</button>
    </div>`;
  pop.style.cssText = `position:fixed;background:#1a1f2e;border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.9rem;width:250px;box-shadow:0 12px 40px rgba(0,0,0,.75);z-index:99999;box-sizing:border-box;font-family:${FONT};`;
  document.body.appendChild(pop);
  const r = anchor.getBoundingClientRect();
  let top=r.bottom+8, left=r.left;
  if (left+254>window.innerWidth) left=window.innerWidth-258;
  if (top+260>window.innerHeight) top=r.top-268;
  pop.style.top=top+'px'; pop.style.left=left+'px';
  const apply = h => { liveColors[partKey]=h; updatePreview(); updateSwatch(partKey,h); };
  pop.querySelectorAll('[data-h]').forEach(b => {
    b.addEventListener('click', () => { document.getElementById('adt-hexin').value=b.dataset.h; document.getElementById('adt-natpick').value=b.dataset.h; apply(b.dataset.h); });
    b.addEventListener('mouseover', () => b.style.transform='scale(1.18)');
    b.addEventListener('mouseout',  () => b.style.transform='scale(1)');
  });
  document.getElementById('adt-natpick').addEventListener('input', e => { document.getElementById('adt-hexin').value=e.target.value; apply(e.target.value); });
  document.getElementById('adt-hexin').addEventListener('input', e => {
    let v=e.target.value.trim(); if(!v.startsWith('#')) v='#'+v;
    if(/^#[0-9a-fA-F]{6}$/.test(v)) { document.getElementById('adt-natpick').value=v; apply(v); }
  });
  document.getElementById('adt-apply').addEventListener('click', () => { pop.remove(); activePart=null; });
  setTimeout(() => document.addEventListener('click', function off(e) {
    if (!pop.contains(e.target) && !anchor.contains(e.target)) { pop.remove(); activePart=null; document.removeEventListener('click',off); }
  }), 50);
}
const updateSwatch = (k,h) => {
  document.getElementById(`adt-sw-${k}`)?.style.setProperty('background',h);
  const lbl=document.getElementById(`adt-hl-${k}`); if(lbl) lbl.textContent=h;
};
const updatePreview = () => { const p=document.getElementById('adt-prev'); if(p) p.innerHTML=buildSvg(liveColors); };

// ─── Shared back button ───────────────────────────────────────────
function backBtn(label, onClick) {
  const b = document.createElement('button');
  b.style.cssText = `display:inline-flex;align-items:center;gap:.45rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.35rem .85rem;color:rgba(255,255,255,.65);font-size:.78rem;font-weight:600;cursor:pointer;font-family:${FONT};margin-bottom:1.25rem;transition:background .12s;`;
  b.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>${label}`;
  b.addEventListener('mouseover', () => b.style.background='rgba(255,255,255,.1)');
  b.addEventListener('mouseout',  () => b.style.background='rgba(255,255,255,.05)');
  b.addEventListener('click', onClick);
  return b;
}

// ─── Toggle helper ────────────────────────────────────────────────
function toggle(checked, ids) {
  const {track,thumb,label,onColor='#48bb78',offColor='rgba(255,255,255,.15)',onText,offText,onTColor,offTColor} = ids;
  const tr=document.getElementById(track), th=document.getElementById(thumb);
  if (tr) tr.style.background = checked ? onColor : offColor;
  if (th) th.style.left = checked ? (ids.thumbOn||'23px') : (ids.thumbOff||'3px');
  if (label && onText) {
    const lel=document.getElementById(label);
    if (lel) { lel.textContent=checked?onText:offText; lel.style.color=checked?(onTColor||'#68d391'):(offTColor||'rgba(255,255,255,.35)'); }
  }
}
function mkToggle(id, checked, onColor='rgba(49,130,206,.8)', thumbOn='18px', thumbOff='2px', w=36, h=20) {
  return `<div style="position:relative;display:inline-block;width:${w}px;height:${h}px;">
    <input id="${id}" type="checkbox" ${checked?'checked':''} style="opacity:0;width:0;height:0;position:absolute;">
    <span id="${id}-track" style="position:absolute;inset:0;border-radius:${h/2}px;background:${checked?onColor:'rgba(255,255,255,.15)'};transition:background .2s;cursor:pointer;">
      <span id="${id}-thumb" style="position:absolute;top:2px;left:${checked?thumbOn:thumbOff};width:${h-4}px;height:${h-4}px;border-radius:50%;background:white;transition:left .2s;pointer-events:none;"></span>
    </span>
  </div>`;
}

// ─── Section wrapper ──────────────────────────────────────────────
const card = (content, extra='') =>
  `<div style="background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.075);border-radius:14px;overflow:hidden;${extra}">${content}</div>`;
const cardHeader = (left, right='') =>
  `<div style="padding:.65rem 1rem;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;">
    <span style="font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.3);">${left}</span>
    ${right}
  </div>`;

// ─── HUB PAGE ─────────────────────────────────────────────────────
const PLUS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`;

function renderHubPage() {
  clearPages();
  const mc = getMain(); if (!mc) return;
  hideMain();
  const pg = document.createElement('div');
  pg.id = 'adt-hub';
  pg.style.cssText = `display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem;color:white;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  pg.innerHTML = `<div style="width:100%;max-width:640px;display:flex;flex-direction:column;gap:1.5rem;">
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.85rem;">
      <div style="display:flex;align-items:center;gap:.85rem;">
        <div style="width:42px;height:42px;background:linear-gradient(135deg,rgba(49,130,206,.35),rgba(128,90,213,.35));border:1px solid rgba(255,255,255,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgba(99,179,237,.9);">${PLUS_ICON}</div>
        <div>
          <h1 style="font-size:1.4rem;font-weight:800;margin:0;letter-spacing:.03em;">AutoDarts <span style="color:#63b3ed;">+</span></h1>
          <p style="margin:.1rem 0 0;font-size:.72rem;color:rgba(255,255,255,.35);">Enhanced features for autodarts.io</p>
        </div>
      </div>
      <a href="${DONATE_URL}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(252,129,74,.08);border:1px solid rgba(252,129,74,.2);border-radius:8px;padding:.38rem .8rem;color:#fc8181;font-size:.73rem;font-weight:600;text-decoration:none;font-family:${FONT};transition:background .15s;" onmouseover="this.style.background='rgba(252,129,74,.18)'" onmouseout="this.style.background='rgba(252,129,74,.08)'">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
        Donate
      </a>
    </div>
    <!-- Cards -->
    <div id="adt-card-cust" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1.35rem;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:1.15rem;" onmouseover="this.style.background='rgba(255,255,255,.07)';this.style.borderColor='rgba(99,179,237,.3)'" onmouseout="this.style.background='rgba(255,255,255,.04)';this.style.borderColor='rgba(255,255,255,.08)'">
      <div style="width:48px;height:48px;background:linear-gradient(135deg,rgba(49,130,206,.2),rgba(49,130,206,.08));border:1px solid rgba(49,130,206,.28);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(99,179,237,.9)"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:1rem;font-weight:700;margin-bottom:.25rem;">Customize Darts</div>
        <div style="font-size:.77rem;color:rgba(255,255,255,.4);line-height:1.55;">Change the color and appearance of your dart arrows shown during matches. Supports per-part colors and custom SVG skins.</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,.2)" flex-shrink="0"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
    </div>
    <div id="adt-card-tourn" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1.35rem;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:1.15rem;" onmouseover="this.style.background='rgba(255,255,255,.07)';this.style.borderColor='rgba(104,211,145,.3)'" onmouseout="this.style.background='rgba(255,255,255,.04)';this.style.borderColor='rgba(255,255,255,.08)'">
      <div style="width:48px;height:48px;background:linear-gradient(135deg,rgba(56,161,105,.2),rgba(56,161,105,.08));border:1px solid rgba(56,161,105,.28);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(104,211,145,.9)"><path d="M12 0L24 12V24H0V12L4 8V3H7V5L12 0ZM19 9h-2V7H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 19.9V22H7v2h10v-2h-4v-2.1a5.01 5.01 0 003.61-2.96C19.08 16.63 21 14.55 21 12V11c0-1.1-.9-2-2-2zM5 12V11h2v3.82C5.84 14.4 5 13.3 5 12zm14 0c0 1.3-.84 2.4-2 2.82V11h2v1z"/></svg>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:1rem;font-weight:700;margin-bottom:.25rem;">Local Tournaments</div>
        <div style="font-size:.77rem;color:rgba(255,255,255,.4);line-height:1.55;">Organize local dart tournaments in KO, League or Groups + KO format. Automatic result sync and live bracket view.</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,.2)" flex-shrink="0"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
    </div>
  </div>`;
  mc.appendChild(pg);
  pg.querySelector('#adt-card-cust').addEventListener('click', async () => {
    liveColors = await loadColors();
    history.pushState(null,'',CUSTOMIZE_PATH);
    renderCustomizePage();
  });
  pg.querySelector('#adt-card-tourn').addEventListener('click', () => {
    history.pushState(null,'',TOURNAMENT_PATH);
    renderTournamentPage();
  });
}

// ─── CUSTOMIZE PAGE ───────────────────────────────────────────────
function renderCustomizePage() {
  clearPages();
  const mc = getMain(); if (!mc) return;
  hideMain();
  const pg = document.createElement('div');
  pg.id = 'adt-cust';
  pg.style.cssText = `display:flex;flex-direction:column;align-items:center;padding:2rem 1.5rem;color:white;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%;max-width:600px;display:flex;flex-direction:column;gap:1rem;';
  pg.appendChild(wrap);
  mc.appendChild(pg);
  wrap.appendChild(backBtn('AutoDarts +', () => { history.pushState(null,'',PLUS_PATH); renderHubPage(); }));

  const enToggle = mkToggle('adt-en', liveColors.enabled, '#48bb78', '23px', '3px', 44, 24);
  const blendToggle = mkToggle('adt-blend', liveColors.blend);
  const custToggle  = mkToggle('adt-cust-tog', liveColors.useCustomSvg);

  const colorSection = `
    ${card(`
      ${cardHeader('Colors',`<label style="display:flex;align-items:center;gap:.45rem;cursor:pointer;user-select:none;">
        <span style="font-size:.7rem;color:rgba(255,255,255,.35);">Blend</span>${blendToggle}
      </label>`)}
      ${PARTS.map((p,i)=>`
        <div style="${i>0?'border-top:1px solid rgba(255,255,255,.05);':''}display:flex;align-items:center;justify-content:space-between;padding:.7rem 1rem;transition:background .12s;" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='transparent'">
          <div style="display:flex;align-items:center;gap:.7rem;">
            <div id="adt-sw-${p.key}" style="width:30px;height:30px;border-radius:7px;background:${liveColors[p.key]};border:1px solid rgba(255,255,255,.15);flex-shrink:0;"></div>
            <div>
              <div style="font-weight:600;font-size:.85rem;">${p.label}</div>
              <div id="adt-hl-${p.key}" style="font-size:.68rem;color:rgba(255,255,255,.33);font-family:monospace;">${liveColors[p.key]}</div>
            </div>
          </div>
          <button id="adt-pick-${p.key}" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:.3rem .75rem;color:rgba(255,255,255,.7);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};transition:background .12s;" onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.07)'">Pick</button>
        </div>`).join('')}
    `,'', liveColors.useCustomSvg?'opacity:.4;pointer-events:none;':'')}`;

  wrap.innerHTML += `
    <!-- Header -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:.65rem;">
      <div>
        <h1 style="font-size:1.25rem;font-weight:700;margin:0 0 .15rem;">Customize Darts</h1>
        <p style="margin:0;font-size:.75rem;color:rgba(255,255,255,.38);">Personalize your dart arrow appearance</p>
      </div>
      <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;user-select:none;">
        <span id="adt-en-lbl" style="font-size:.78rem;color:${liveColors.enabled?'#68d391':'rgba(255,255,255,.33)'};">${liveColors.enabled?'Enabled':'Disabled'}</span>
        ${enToggle}
      </label>
    </div>
    <!-- Preview -->
    ${card(`<div style="padding:2rem 1.5rem;display:flex;align-items:center;justify-content:center;"><div id="adt-prev" style="width:100%;">${buildSvg(liveColors)}</div></div>`,'background:rgba(0,0,0,.25);')}
    <!-- Colors -->
    <div id="adt-color-section" style="${liveColors.useCustomSvg?'opacity:.4;pointer-events:none;':''}transition:opacity .2s;">
      ${card(`
        ${cardHeader('Colors',`<label style="display:flex;align-items:center;gap:.45rem;cursor:pointer;user-select:none;"><span style="font-size:.7rem;color:rgba(255,255,255,.35);">Blend</span>${blendToggle}</label>`)}
        ${PARTS.map((p,i)=>`
          <div style="${i>0?'border-top:1px solid rgba(255,255,255,.05);':''}display:flex;align-items:center;justify-content:space-between;padding:.7rem 1rem;transition:background .12s;" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='transparent'">
            <div style="display:flex;align-items:center;gap:.7rem;">
              <div id="adt-sw-${p.key}" style="width:30px;height:30px;border-radius:7px;background:${liveColors[p.key]};border:1px solid rgba(255,255,255,.15);flex-shrink:0;"></div>
              <div>
                <div style="font-weight:600;font-size:.85rem;">${p.label}</div>
                <div id="adt-hl-${p.key}" style="font-size:.68rem;color:rgba(255,255,255,.33);font-family:monospace;">${liveColors[p.key]}</div>
              </div>
            </div>
            <button id="adt-pick-${p.key}" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:.3rem .75rem;color:rgba(255,255,255,.7);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};transition:background .12s;" onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.07)'">Pick</button>
          </div>`).join('')}
      `)}
    </div>
    <!-- Custom SVG -->
    ${card(`
      ${cardHeader('Custom SVG',`<label style="display:flex;align-items:center;gap:.45rem;cursor:pointer;user-select:none;"><span style="font-size:.7rem;color:rgba(255,255,255,.35);">Use custom</span>${custToggle}</label>`)}
      <div style="padding:.85rem 1rem;">
        <textarea id="adt-svg-ta" placeholder='Paste your SVG code here...' style="width:100%;min-height:100px;resize:vertical;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.55rem .7rem;color:rgba(255,255,255,.8);font-family:monospace;font-size:.72rem;outline:none;box-sizing:border-box;line-height:1.5;">${liveColors.customSvg||''}</textarea>
        <div style="display:flex;gap:.5rem;margin-top:.5rem;">
          <button id="adt-prev-svg" style="flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:.38rem .75rem;color:rgba(255,255,255,.7);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};transition:background .12s;" onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.07)'">Preview</button>
          <button id="adt-clr-svg" style="background:rgba(255,60,60,.07);border:1px solid rgba(255,60,60,.18);border-radius:7px;padding:.38rem .75rem;color:rgba(255,120,120,.8);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};transition:background .12s;" onmouseover="this.style.background='rgba(255,60,60,.14)'" onmouseout="this.style.background='rgba(255,60,60,.07)'">Clear</button>
        </div>
        <div id="adt-svg-err" style="display:none;margin-top:.45rem;font-size:.7rem;color:#fc8181;padding:.38rem .6rem;background:rgba(255,80,80,.07);border-radius:6px;border:1px solid rgba(255,80,80,.18);"></div>
      </div>
    `)}
    <!-- Save -->
    <button id="adt-save" style="background:rgba(43,108,176,.8);border:none;border-radius:10px;padding:.8rem 2rem;color:white;font-weight:700;font-size:.88rem;font-family:${FONT};cursor:pointer;width:100%;transition:background .15s;" onmouseover="this.style.background='rgba(49,130,206,.9)'" onmouseout="this.style.background='rgba(43,108,176,.8)'">Save &amp; Apply</button>
    <div id="adt-save-msg" style="display:none;text-align:center;font-size:.77rem;color:#68d391;padding:.45rem;background:rgba(72,187,120,.07);border-radius:8px;border:1px solid rgba(72,187,120,.16);"></div>`;

  // Listeners
  PARTS.forEach(p => {
    document.getElementById(`adt-pick-${p.key}`)?.addEventListener('click', e => {
      e.stopPropagation(); openColorPicker(p.key, e.currentTarget);
    });
  });
  document.getElementById('adt-en')?.addEventListener('change', e => {
    liveColors.enabled = e.target.checked;
    toggle(liveColors.enabled, {track:'adt-en-track',thumb:'adt-en-thumb',label:'adt-en-lbl',onColor:'#48bb78',onText:'Enabled',offText:'Disabled',thumbOn:'23px',thumbOff:'3px'});
  });
  document.getElementById('adt-blend')?.addEventListener('change', e => {
    liveColors.blend = e.target.checked;
    toggle(liveColors.blend, {track:'adt-blend-track',thumb:'adt-blend-thumb'});
    updatePreview();
  });
  document.getElementById('adt-cust-tog')?.addEventListener('change', e => {
    liveColors.useCustomSvg = e.target.checked;
    toggle(liveColors.useCustomSvg, {track:'adt-cust-tog-track',thumb:'adt-cust-tog-thumb'});
    const cs = document.getElementById('adt-color-section');
    if (cs) { cs.style.opacity=liveColors.useCustomSvg?'.4':'1'; cs.style.pointerEvents=liveColors.useCustomSvg?'none':''; }
    if (liveColors.useCustomSvg) liveColors.customSvg = document.getElementById('adt-svg-ta')?.value?.trim()||'';
    updatePreview();
  });
  document.getElementById('adt-prev-svg')?.addEventListener('click', () => {
    const raw = document.getElementById('adt-svg-ta')?.value?.trim();
    const err = document.getElementById('adt-svg-err'); err.style.display='none';
    if (!raw) { err.textContent='Please paste SVG code first.'; err.style.display='block'; return; }
    if (!raw.includes('<svg')) { err.textContent='Invalid SVG: must include <svg>...</svg>.'; err.style.display='block'; return; }
    liveColors.customSvg=raw; liveColors.useCustomSvg=true;
    const p=document.getElementById('adt-prev'); if(p) p.innerHTML=raw;
    const tog=document.getElementById('adt-cust-tog'); if(tog&&!tog.checked){tog.checked=true;tog.dispatchEvent(new Event('change'));}
  });
  document.getElementById('adt-clr-svg')?.addEventListener('click', () => {
    const ta=document.getElementById('adt-svg-ta'); if(ta) ta.value='';
    liveColors.customSvg=''; liveColors.useCustomSvg=false;
    const tog=document.getElementById('adt-cust-tog'); if(tog&&tog.checked){tog.checked=false;tog.dispatchEvent(new Event('change'));}
    document.getElementById('adt-svg-err').style.display='none';
    updatePreview();
  });
  document.getElementById('adt-save')?.addEventListener('click', async () => {
    liveColors.customSvg = document.getElementById('adt-svg-ta')?.value?.trim()||'';
    await saveColors(liveColors);
    const m=document.getElementById('adt-save-msg');
    m.textContent='✓ Saved — will be applied on the next match page.';
    m.style.display='block';
    setTimeout(()=>m.style.display='none', 3500);
  });
}

// ─── TOURNAMENT PAGE ──────────────────────────────────────────────
function renderTournamentPage() {
  clearPages();
  const mc = getMain(); if (!mc) return;
  hideMain();

  const pg = document.createElement('div');
  pg.id = 'adt-tourn';
  pg.style.cssText = `display:flex;flex-direction:column;padding:2rem 1.5rem;color:white;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;

  // Back button
  const bb = backBtn('AutoDarts +', () => { history.pushState(null,'',PLUS_PATH); renderHubPage(); });
  pg.appendChild(bb);

  // Page header
  const hdr = document.createElement('div');
  hdr.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:.65rem;margin-bottom:1.5rem;';
  hdr.innerHTML = `
    <div>
      <h1 style="font-size:1.25rem;font-weight:700;margin:0 0 .15rem;">Local Tournaments</h1>
      <p style="margin:0;font-size:.75rem;color:rgba(255,255,255,.38);">KO · Groups + KO · League — with automatic result sync</p>
    </div>`;
  pg.appendChild(hdr);

  // Tournament div (used by adTourney.renderUI)
  const td = document.createElement('div');
  td.id = TOURNEY_PAGE_ID;
  td.style.cssText = 'flex:1;';
  pg.appendChild(td);

  // Credits footer
  const credits = document.createElement('div');
  credits.style.cssText = `margin-top:2.5rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:flex-start;gap:.85rem;font-family:${FONT};`;
  credits.innerHTML = `
    <div style="width:34px;height:34px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgba(255,255,255,.3);">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
    </div>
    <div>
      <div style="font-size:.72rem;font-weight:600;color:rgba(255,255,255,.45);margin-bottom:.25rem;">Local Tournaments — Credits</div>
      <div style="font-size:.7rem;color:rgba(255,255,255,.25);line-height:1.65;">
        The local tournaments feature is based on the <strong style="color:rgba(255,255,255,.4);">Autodarts Local Tournaments</strong> extension by <strong style="color:rgba(255,255,255,.4);">alex</strong> (v1.33).
        It has been integrated into AutoDarts + with full permission. All tournament logic, automation and UI components remain the work of the original author.
        AutoDarts + wraps this functionality into a unified hub for play.autodarts.io.
      </div>
    </div>`;
  pg.appendChild(credits);
  mc.appendChild(pg);

  // Trigger tournament render
  if (window.adTourney?.renderUI) {
    window.adTourney.syncMatchResults?.();
    window.adTourney.renderUI();
  } else {
    td.innerHTML = `<div style="text-align:center;padding:3rem;color:rgba(255,255,255,.3);font-family:${FONT};">Loading...</div>`;
    const iv = setInterval(() => {
      if (window.adTourney?.renderUI) {
        clearInterval(iv);
        window.adTourney.syncMatchResults?.();
        window.adTourney.renderUI();
      }
    }, 200);
    setTimeout(() => clearInterval(iv), 10000);
  }
}

// ─── Clear all pages ──────────────────────────────────────────────
function clearPages() {
  ['adt-hub','adt-cust','adt-tourn'].forEach(id => document.getElementById(id)?.remove());
  document.getElementById('adt-picker')?.remove();
  const s = document.getElementById(TOURNEY_PAGE_ID);
  if (s && !s.closest('#adt-tourn')) s.remove();
  activePart = null;
  showMain();
}

// ─── Sidebar button ───────────────────────────────────────────────
let sbInterval = null;

async function injectSidebar() {
  document.getElementById('adt-sidebar-btn')?.remove();
  try {
    const stack = await waitFor('#root > div > div > .chakra-stack', 15000);
    const last = stack.lastElementChild; if (!last) return;
    const btn = last.cloneNode(true);
    btn.removeAttribute('href'); btn.id='adt-sidebar-btn'; btn.style.cursor='pointer';
    const w = document.querySelector('#root > div > div')?.getBoundingClientRect().width;
    const exp = !w || w > 170;
    btn.innerHTML = PLUS_ICON + (exp ? `<span style="margin-left:.45rem;font-weight:700;">AutoDarts +</span>` : '');
    btn.addEventListener('click', () => { history.pushState(null,'',PLUS_PATH); renderHubPage(); });
    stack.appendChild(btn);
    if (sbInterval) clearInterval(sbInterval);
    sbInterval = setInterval(() => {
      const b = document.getElementById('adt-sidebar-btn'); if (!b) return;
      const w2 = document.querySelector('#root > div > div')?.getBoundingClientRect().width;
      b.innerHTML = (w2 && w2<170) ? PLUS_ICON : PLUS_ICON + `<span style="margin-left:.45rem;font-weight:700;">AutoDarts +</span>`;
    }, 1000);
  } catch(e) { console.error('[AutoDarts+] sidebar inject failed', e); }
}

// ─── URL watcher ─────────────────────────────────────────────────
let curUrl = location.href;
function watchUrl(cb) {
  new MutationObserver(() => {
    if (location.href !== curUrl) { const old=curUrl; curUrl=location.href; cb(curUrl,old); }
  }).observe(document.getElementById('root'), {childList:true,subtree:true});
}

// ─── Main ─────────────────────────────────────────────────────────
async function main() {
  try {
    liveColors = await loadColors();
    await waitFor('#root > div:nth-of-type(1)', 15000);

    if (location.href.includes('/matches')) injectDartSkin();

    const mc = await waitFor('#root > div > div:nth-of-type(2)', 8000).catch(()=>null);
    if (mc) {
      if (location.href.includes(CUSTOMIZE_PATH)) renderCustomizePage();
      else if (location.href.includes(TOURNAMENT_PATH)) renderTournamentPage();
      else if (location.href.includes(PLUS_PATH)) renderHubPage();
    }

    await injectSidebar();

    watchUrl(async url => {
      const m = await waitFor('#root > div > div:nth-of-type(2)', 5000).catch(()=>null);
      if (!m) return;
      if (url.includes(CUSTOMIZE_PATH)) { liveColors=await loadColors(); renderCustomizePage(); }
      else if (url.includes(TOURNAMENT_PATH)) renderTournamentPage();
      else if (url.includes(PLUS_PATH)) renderHubPage();
      else clearPages();
      if (url.includes('/matches')) setTimeout(injectDartSkin, 800);
      injectSidebar();
    });
  } catch(e) { console.error('[AutoDarts+] main failed', e); }
}

main();
