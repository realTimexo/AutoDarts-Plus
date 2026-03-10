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
const DONATE_URL     = 'https://www.paypal.com/donate/?hosted_button_id=38GT8LH75W4GU';
const TOURNEY_DIV_ID = 'autodarts-tools-config';

// ─── Dart skin ────────────────────────────────────────────────────
const DEFAULT_COLORS = { flight:'#ffffff',shaft:'#ffffff',barrel:'#c0c0c0',point:'#d9d9d9',enabled:true,blend:false,customSvg:'',useCustomSvg:false };
const PRESET_COLORS  = [{l:'White',h:'#ffffff'},{l:'Silver',h:'#c0c0c0'},{l:'Black',h:'#1a1a1a'},{l:'Red',h:'#e53e3e'},{l:'Blue',h:'#3182ce'},{l:'Green',h:'#38a169'},{l:'Yellow',h:'#d69e2e'},{l:'Purple',h:'#805ad5'},{l:'Orange',h:'#dd6b20'},{l:'Pink',h:'#d53f8c'},{l:'Cyan',h:'#00b5d8'},{l:'Gold',h:'#b7791f'}];
const PARTS          = [{key:'flight',label:'Flight'},{key:'shaft',label:'Shaft'},{key:'barrel',label:'Barrel'},{key:'point',label:'Point'}];

function buildSvg(c) {
  if (c.useCustomSvg && c.customSvg && c.customSvg.trim()) return c.customSvg.trim();
  const stops = c.blend
    ? `<stop offset="0%" stop-color="${c.flight}"/><stop offset="20%" stop-color="${c.flight}"/><stop offset="35%" stop-color="${c.shaft}"/><stop offset="55%" stop-color="${c.barrel}"/><stop offset="80%" stop-color="${c.barrel}"/><stop offset="100%" stop-color="${c.point}"/>`
    : `<stop offset="0%" stop-color="${c.flight}"/><stop offset="20%" stop-color="${c.flight}"/><stop offset="20%" stop-color="${c.shaft}"/><stop offset="35%" stop-color="${c.shaft}"/><stop offset="35%" stop-color="${c.barrel}"/><stop offset="80%" stop-color="${c.barrel}"/><stop offset="80%" stop-color="${c.point}"/><stop offset="100%" stop-color="${c.point}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 102"><defs><linearGradient id="dg" x1="0" y1="0" x2="477" y2="0" gradientUnits="userSpaceOnUse">${stops}</linearGradient></defs><path fill="url(#dg)" d="M26.56.5h53.65l.14.11,55.78,45,42.2-.07,42.49.07c.95-.56,6.88-4,10.06-4h152.73c2.11,0,4.43.36,6.9,1.07,1.96.56,4.03,1.35,6.13,2.34,3.16,1.48,5.42,2.94,5.98,3.31,2.04,0,23.83-.1,40.68-.1,10.34,0,16.83.03,19.29.1,5.75.16,13.13,1.98,13.95,2.19h.02s-.12.48-.12.48h0s.12.5.12.5h-.02c-.82.21-8.2,2.02-13.95,2.19-2.45.07-8.94.1-19.29.1-16.85,0-38.64-.09-40.68-.1-.56.37-2.82,1.83-5.98,3.31-3.32,1.55-8.27,3.41-13.03,3.41h-152.73c-3.19,0-9.11-3.44-10.06-4l-42.49.07-42.2-.07-55.78,45-.14.11H26.56l-.14-.27L1,51.23l-.12-.23.12-.23L26.43.77l.14-.27Z"/></svg>`;
}
const loadColors = () => new Promise(r => chrome.storage.local.get('dartColors', d => r(d.dartColors ? {...DEFAULT_COLORS,...d.dartColors} : {...DEFAULT_COLORS})));
const saveColors = c => new Promise(r => chrome.storage.local.set({dartColors:c}, r));

async function injectDartSkin() {
  const c = await loadColors(); if (!c.enabled) return;
  const src = 'data:image/svg+xml;utf8,' + encodeURIComponent(buildSvg(c));
  const tryIt = () => { const imgs=document.querySelectorAll('img'); if(imgs.length>=6){[3,4,5].forEach(i=>{if(imgs[i])imgs[i].src=src;});return true;} return false; };
  if (!tryIt()) { const obs=new MutationObserver(()=>{if(tryIt())obs.disconnect();}); obs.observe(document.body,{childList:true,subtree:true}); setTimeout(()=>obs.disconnect(),10000); }
}

// ─── Ranked data ──────────────────────────────────────────────────
const R_KEY='adRankedData', AM_KEY='adRankedActiveMatch';
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
  const rank=RANKS[data.rankIndex],change=won?rndBetween(rank.winMin,rank.winMax):-rndBetween(rank.lossMin,rank.lossMax);
  let pct=data.percentage+change,ri=data.rankIndex;
  if(!rank.unlimited&&pct>=100&&ri<RANKS.length-1){ri++;pct=0;}
  if(pct<0){if(ri===0)pct=0;else{ri--;pct=100+pct;if(pct<0)pct=0;}}
  return {rankIndex:ri,percentage:pct,lastChange:change,botLevel:data.botLevel,username:data.username,matchesPlayed:(data.matchesPlayed||0)+1,wins:won?(data.wins||0)+1:(data.wins||0),losses:!won?(data.losses||0)+1:(data.losses||0),history:[{won,change,rankBeforeId:data.rankIndex,pctBefore:data.percentage,rankAfterId:ri,pctAfter:pct,date:Date.now(),botLevel:data.botLevel},...(data.history||[]).slice(0,29)]};
}
function defaultRD(){return {rankIndex:0,percentage:0,botLevel:null,matchesPlayed:0,wins:0,losses:0,history:[],username:null};}
const loadRanked      = () => new Promise(r=>chrome.storage.local.get(R_KEY,  d=>r(d[R_KEY]  ||defaultRD())));
const saveRanked      = d  => new Promise(r=>chrome.storage.local.set({[R_KEY]:d},r));
const loadAM          = () => new Promise(r=>chrome.storage.local.get(AM_KEY, d=>r(d[AM_KEY] ||null)));
const saveAM          = m  => new Promise(r=>chrome.storage.local.set({[AM_KEY]:m},r));
const clearAM         = () => new Promise(r=>chrome.storage.local.remove(AM_KEY,r));

function getTokenAsync(){return new Promise(res=>{if(window._adToken)return res(window._adToken);let t=0;const iv=setInterval(()=>{t++;if(window._adToken){clearInterval(iv);res(window._adToken);}else if(t>=80){clearInterval(iv);res(null);}},100);});}
async function fetchUsername(token){try{const r=await fetch('https://api.autodarts.io/as/v0/users/me',{headers:{'Authorization':'Bearer '+token}});if(!r.ok)return null;const u=await r.json();return u.name||u.username||u.nick||(u.email?u.email.split('@')[0]:null)||null;}catch(e){return null;}}

// ─── DOM helpers (unified) ────────────────────────────────────────
function waitFor(sel,ms=15000){
  return new Promise((res,rej)=>{
    const el=document.querySelector(sel);if(el){res(el);return;}
    const t0=Date.now(),iv=setInterval(()=>{const f=document.querySelector(sel);if(f){clearInterval(iv);res(f);}else if(Date.now()-t0>=ms){clearInterval(iv);rej(new Error('timeout:'+sel));}},100);
  });
}
const getMain=()=>document.querySelector('#root > div > div:nth-of-type(2)');
// hideMain knows ALL our prefixes — never accidentally hides dart skin or active pages
function hideMain(){const m=getMain();if(!m)return;Array.from(m.children).forEach(c=>{const id=c.id||'';if(!id.startsWith('adt-')&&!id.startsWith('adr-')&&id!==TOURNEY_DIV_ID)c.style.display='none';});}
function showMain(){const m=getMain();if(!m)return;Array.from(m.children).forEach(c=>c.style.display='');}
function clearAllPages(){
  ['adt-hub','adt-cust','adt-tourn','adr-page'].forEach(id=>document.getElementById(id)?.remove());
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
async function manualResult(won){const data=await loadRanked(),updated=applyRankChange(data,won);await saveRanked(updated);await clearAM();showResultBanner(won,updated.lastChange,data.rankIndex,updated.rankIndex,updated.percentage);renderRankedPage();}

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
      const res=await fetch('https://api.autodarts.io/as/v0/matches/'+active.matchId+'/stats',{headers:{'Authorization':'Bearer '+token}});
      if(res.status===404||!res.ok)return;
      const data=await res.json();if(data.winner===undefined||data.winner===-1)return;
      clearInterval(pollIv);pollIv=null;document.getElementById('adr-poll-indicator')?.remove();
      const winnerName=(data.players&&data.players[data.winner]&&data.players[data.winner].name)||'';
      const humanWon=winnerName.trim().toLowerCase()===(active.username||'').trim().toLowerCase();
      const ranked=await loadRanked(),updated=applyRankChange(ranked,humanWon);
      await saveRanked(updated);await clearAM();showResultBanner(humanWon,updated.lastChange,ranked.rankIndex,updated.rankIndex,updated.percentage);
    }catch(e){}
  },4000);
  setTimeout(()=>{if(pollIv){clearInterval(pollIv);pollIv=null;}document.getElementById('adr-poll-indicator')?.remove();},90*60*1000);
}

// ─── Start ranked match ───────────────────────────────────────────
async function startRankedMatch(){
  const btn=document.getElementById('adr-start-match');if(btn){btn.textContent='⏳ Starting...';btn.disabled=true;btn.style.opacity='.7';}
  const token=await getTokenAsync();if(!token){showRankedModal({title:'Token missing',body:'Navigate to another page briefly and come back.',buttons:[{label:'OK',primary:true,onClick:resetStartBtn}]});return;}
  const headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'};
  // Load data before try so it's accessible in catch
  const data=await loadRanked();
  if(!data.username){const n=await fetchUsername(token);if(n){data.username=n;await saveRanked(data);}}
  const username=data.username||'Player',bot=BOTS.find(b=>b.level===data.botLevel)||BOTS[0];
  try{
    const boardsRes=await fetch('https://api.autodarts.io/bs/v0/boards',{headers}),boardsData=await boardsRes.json();
    const allBoards=Array.isArray(boardsData)?boardsData:(boardsData.data||boardsData.boards||boardsData.items||[]);
    const board=(allBoards.filter(b=>b.state&&(b.state.connection==='Connected'||b.state.connected===true))[0])||allBoards[0];
    if(!board){showRankedModal({title:'No Board Found',body:'No connected dartboard found.',buttons:[{label:'OK',primary:true,onClick:resetStartBtn}]});return;}
    const lobby=await (await fetch('https://api.autodarts.io/gs/v0/lobbies',{method:'POST',headers,body:JSON.stringify({bullOffMode:'Normal',isPrivate:true,legs:1,settings:{baseScore:501,bullMode:'25/50',inMode:'Straight',maxRounds:50,outMode:'Double'},variant:'X01'})})).json();
    if(!lobby.id)throw new Error('No Lobby ID');
    await fetch('https://api.autodarts.io/gs/v0/lobbies/'+lobby.id+'/players',{method:'POST',headers,body:JSON.stringify({name:username,boardId:board.id})});
    await fetch('https://api.autodarts.io/gs/v0/lobbies/'+lobby.id+'/players',{method:'POST',headers,body:JSON.stringify({name:bot.name,cpuPPR:bot.avg})});
    const sr=await fetch('https://api.autodarts.io/gs/v0/lobbies/'+lobby.id+'/start',{method:'POST',headers});
    if(!sr.ok)throw new Error('Start failed ('+sr.status+')');
    await saveAM({matchId:lobby.id,rankIndex:data.rankIndex,percentage:data.percentage,botLevel:data.botLevel,boardId:board.id,username,startedAt:Date.now()});
    window.location.href='https://play.autodarts.io/matches/'+lobby.id;
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

// ─── Hub ──────────────────────────────────────────────────────────
const PLUS_ICON=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`;

function hubCard(id,icon,ibg,ibrd,hvr,title,desc){
  return `<div id="${id}" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1.35rem;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:1.15rem;" onmouseover="this.style.background='rgba(255,255,255,.07)';this.style.borderColor='${hvr}'" onmouseout="this.style.background='rgba(255,255,255,.04)';this.style.borderColor='rgba(255,255,255,.08)'"><div style="width:48px;height:48px;background:${ibg};border:1px solid ${ibrd};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon}</div><div style="flex:1;min-width:0;"><div style="font-size:1rem;font-weight:700;margin-bottom:.25rem;">${title}</div><div style="font-size:.77rem;color:rgba(255,255,255,.4);line-height:1.55;">${desc}</div></div><svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,.2)"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg></div>`;
}

function renderHubPage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adt-hub';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem;color:white;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  pg.innerHTML=`<div style="width:100%;max-width:640px;display:flex;flex-direction:column;gap:1.1rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.85rem;margin-bottom:.5rem;">
      <div style="display:flex;align-items:center;gap:.85rem;">
        <div style="width:42px;height:42px;background:linear-gradient(135deg,rgba(49,130,206,.35),rgba(128,90,213,.35));border:1px solid rgba(255,255,255,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgba(99,179,237,.9);">${PLUS_ICON}</div>
        <div><h1 style="font-size:1.4rem;font-weight:800;margin:0;">AutoDarts <span style="color:#63b3ed;">+</span></h1><p style="margin:.1rem 0 0;font-size:.72rem;color:rgba(255,255,255,.35);">Enhanced features for autodarts.io</p></div>
      </div>
      <a href="${DONATE_URL}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(252,129,74,.08);border:1px solid rgba(252,129,74,.2);border-radius:8px;padding:.38rem .8rem;color:#fc8181;font-size:.73rem;font-weight:600;text-decoration:none;font-family:${FONT};" onmouseover="this.style.background='rgba(252,129,74,.18)'" onmouseout="this.style.background='rgba(252,129,74,.08)'"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>Donate</a>
    </div>
    ${hubCard('adt-c-cust',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(99,179,237,.9)"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,'linear-gradient(135deg,rgba(49,130,206,.2),rgba(49,130,206,.08))','rgba(49,130,206,.28)','rgba(99,179,237,.3)','Customize Darts','Change the color and look of your dart arrows during matches. Per-part colors and custom SVG support.')}
    ${hubCard('adt-c-ranked',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,214,0,.9)"><path d="M12 2L13.09 8.26L20 9l-5.45 5.27L16 21l-4-2.1L8 21l1.45-6.73L4 9l6.91-.74L12 2z"/></svg>`,'linear-gradient(135deg,rgba(255,214,0,.18),rgba(255,150,0,.08))','rgba(255,214,0,.25)','rgba(255,214,0,.35)','Ranked','Climb from Bronze to World Master by beating bots. Track your rank, win rate and match history.')}
    ${hubCard('adt-c-tourn',`<svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(104,211,145,.9)"><path d="M12 0L24 12V24H0V12L4 8V3H7V5L12 0ZM19 9h-2V7H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 19.9V22H7v2h10v-2h-4v-2.1a5.01 5.01 0 003.61-2.96C19.08 16.63 21 14.55 21 12V11c0-1.1-.9-2-2-2zM5 12V11h2v3.82C5.84 14.4 5 13.3 5 12zm14 0c0 1.3-.84 2.4-2 2.82V11h2v1z"/></svg>`,'linear-gradient(135deg,rgba(56,161,105,.2),rgba(56,161,105,.08))','rgba(56,161,105,.28)','rgba(104,211,145,.3)','Local Tournaments','KO · Groups + KO · League with automatic result sync and live bracket view.')}
  </div>`;
  getMain().appendChild(pg);
  pg.querySelector('#adt-c-cust').onclick=async()=>{liveColors=await loadColors();history.pushState(null,'',CUSTOMIZE_PATH);renderCustomizePage();};
  pg.querySelector('#adt-c-ranked').onclick=()=>{history.pushState(null,'',RANKED_PATH);renderRankedPage();};
  pg.querySelector('#adt-c-tourn').onclick=()=>{history.pushState(null,'',TOURNEY_PATH);renderTournamentPage();};
}

// ─── Customize ────────────────────────────────────────────────────
function renderCustomizePage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adt-cust';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2rem 1.5rem;color:white;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
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
      <div style="padding:.85rem 1rem;"><textarea id="adt-svgta" placeholder="Paste SVG here..." style="width:100%;min-height:100px;resize:vertical;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.55rem .7rem;color:rgba(255,255,255,.8);font-family:monospace;font-size:.72rem;outline:none;box-sizing:border-box;line-height:1.5;">${liveColors.customSvg||''}</textarea>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;"><button id="adt-prevsvg" style="flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:.38rem .75rem;color:rgba(255,255,255,.7);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};" onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.07)'">Preview</button><button id="adt-clrsvg" style="background:rgba(255,60,60,.07);border:1px solid rgba(255,60,60,.18);border-radius:7px;padding:.38rem .75rem;color:rgba(255,120,120,.8);font-size:.72rem;font-weight:600;cursor:pointer;font-family:${FONT};" onmouseover="this.style.background='rgba(255,60,60,.14)'" onmouseout="this.style.background='rgba(255,60,60,.07)'">Clear</button></div>
      <div id="adt-svgerr" style="display:none;margin-top:.45rem;font-size:.7rem;color:#fc8181;padding:.38rem .6rem;background:rgba(255,80,80,.07);border-radius:6px;border:1px solid rgba(255,80,80,.18);"></div></div>
    </div>
    <button id="adt-save" style="background:rgba(43,108,176,.8);border:none;border-radius:10px;padding:.8rem 2rem;color:white;font-weight:700;font-size:.88rem;font-family:${FONT};cursor:pointer;width:100%;transition:background .15s;" onmouseover="this.style.background='rgba(49,130,206,.9)'" onmouseout="this.style.background='rgba(43,108,176,.8)'">Save &amp; Apply</button>
    <div id="adt-savemsg" style="display:none;text-align:center;font-size:.77rem;color:#68d391;padding:.45rem;background:rgba(72,187,120,.07);border-radius:8px;border:1px solid rgba(72,187,120,.16);"></div>`;

  PARTS.forEach(p=>document.getElementById('adt-pick-'+p.key)?.addEventListener('click',e=>{e.stopPropagation();openColorPicker(p.key,e.currentTarget);}));
  const enEl=document.getElementById('adt-en');if(enEl)enEl.onchange=e=>{liveColors.enabled=e.target.checked;setTog('adt-en',liveColors.enabled,'#48bb78','23px','3px');const lb=document.getElementById('adt-en-lbl');if(lb){lb.textContent=liveColors.enabled?'Enabled':'Disabled';lb.style.color=liveColors.enabled?'#68d391':'rgba(255,255,255,.33)';}};
  const blEl=document.getElementById('adt-blend');if(blEl)blEl.onchange=e=>{liveColors.blend=e.target.checked;setTog('adt-blend',liveColors.blend);updatePreview();};
  const ctEl=document.getElementById('adt-ctog');if(ctEl)ctEl.onchange=e=>{liveColors.useCustomSvg=e.target.checked;setTog('adt-ctog',liveColors.useCustomSvg);const cs=document.getElementById('adt-col-sec');if(cs){cs.style.opacity=liveColors.useCustomSvg?'.4':'1';cs.style.pointerEvents=liveColors.useCustomSvg?'none':'';}if(liveColors.useCustomSvg)liveColors.customSvg=document.getElementById('adt-svgta')?.value?.trim()||'';updatePreview();};
  document.getElementById('adt-prevsvg')?.addEventListener('click',()=>{const raw=document.getElementById('adt-svgta')?.value?.trim(),err=document.getElementById('adt-svgerr');err.style.display='none';if(!raw){err.textContent='Please paste SVG code first.';err.style.display='block';return;}if(!raw.includes('<svg')){err.textContent='Invalid SVG.';err.style.display='block';return;}liveColors.customSvg=raw;liveColors.useCustomSvg=true;const p=document.getElementById('adt-prev');if(p)p.innerHTML=raw;const tog=document.getElementById('adt-ctog');if(tog&&!tog.checked){tog.checked=true;tog.dispatchEvent(new Event('change'));}});
  document.getElementById('adt-clrsvg')?.addEventListener('click',()=>{const ta=document.getElementById('adt-svgta');if(ta)ta.value='';liveColors.customSvg='';liveColors.useCustomSvg=false;const tog=document.getElementById('adt-ctog');if(tog&&tog.checked){tog.checked=false;tog.dispatchEvent(new Event('change'));}document.getElementById('adt-svgerr').style.display='none';updatePreview();});
  document.getElementById('adt-save')?.addEventListener('click',async()=>{liveColors.customSvg=document.getElementById('adt-svgta')?.value?.trim()||'';await saveColors(liveColors);const m=document.getElementById('adt-savemsg');m.textContent='✓ Saved — applies on next match page.';m.style.display='block';setTimeout(()=>m.style.display='none',3500);});
}

// ─── Ranked pages ─────────────────────────────────────────────────
async function renderBotSelectPage(onSelect){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adr-page';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem;color:#fff;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
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
  const rank=RANKS[data.rankIndex],bot=BOTS.find(b=>b.level===data.botLevel)||BOTS[0];
  const winRate=data.matchesPlayed>0?Math.round(data.wins/data.matchesPlayed*100):0,isWelt=!!rank.unlimited;
  const pctDisp=isWelt?(data.percentage%100||(data.percentage>0?100:0)):data.percentage;
  const rankPath=RANKS.map((r,i)=>{const cur=i===data.rankIndex,done=i<data.rankIndex;return `<div style="display:flex;align-items:center;gap:4px;"><div title="${r.name}" style="width:${cur?28:20}px;height:${cur?28:20}px;border-radius:50%;background:${done||cur?r.grad:'rgba(255,255,255,.08)'};border:${cur?'2px solid '+r.color:'1px solid rgba(255,255,255,.1)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:${cur?'0 0 10px '+r.shadowColor:'none'};">${done||cur?getRankIcon(r.id,cur?20:14):''}</div>${i<RANKS.length-1?`<div style="width:10px;height:2px;background:${done?'rgba(255,255,255,.25)':'rgba(255,255,255,.07)'};border-radius:1px;"></div>`:''}</div>`;}).join('');
  const histRows=(data.history||[]).slice(0,8).map(h=>{const rA=RANKS[h.rankAfterId]||RANKS[0],pro=h.rankAfterId>h.rankBeforeId,dem=h.rankAfterId<h.rankBeforeId;const ds=new Date(h.date).toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});return `<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:.55rem .8rem;display:flex;align-items:center;gap:.65rem;"><div style="width:26px;height:26px;border-radius:50%;background:${rA.grad};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${getRankIcon(rA.id,18)}</div><div style="flex:1;"><div style="font-size:.78rem;font-weight:700;color:${h.won?'#68d391':'#fc8181'};">${h.won?'Won':'Loss'}${pro?' ⬆':dem?' ⬇':''}</div><div style="font-size:.67rem;color:rgba(255,255,255,.28);">${rA.name} — ${Math.round(h.pctAfter)}%</div></div><div style="font-size:.8rem;font-weight:700;color:${h.change>=0?'#68d391':'#fc8181'};flex-shrink:0;">${h.change>=0?'+':''}${h.change}%</div><div style="font-size:.63rem;color:rgba(255,255,255,.2);flex-shrink:0;">${ds}</div></div>`;}).join('');
  const allRanks=RANKS.map((r,i)=>{const cur=i===data.rankIndex,done=i<data.rankIndex;return `<div style="background:${cur?'rgba(255,255,255,.06)':'rgba(255,255,255,.02)'};border:1px solid ${cur?'rgba(255,255,255,.12)':'rgba(255,255,255,.05)'};border-radius:10px;padding:.5rem .8rem;display:flex;align-items:center;gap:.65rem;"><div style="width:30px;height:30px;border-radius:50%;background:${done||cur?r.grad:'rgba(255,255,255,.06)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${done||cur?getRankIcon(r.id,22):''}</div><div style="flex:1;font-size:.82rem;font-weight:${cur?800:600};color:${cur?r.color:'rgba(255,255,255,.4)'};">${r.name}${cur?' <span style="font-size:.68rem;color:rgba(255,255,255,.3);">← You</span>':''}</div><div style="font-size:.68rem;text-align:right;"><div style="color:rgba(72,187,120,.6);">+${r.winMin}–${r.winMax}%</div><div style="color:rgba(245,101,101,.6);">-${r.lossMin}–${r.lossMax}%</div></div></div>`;}).join('');
  const pg=document.createElement('div');pg.id='adr-page';pg.style.cssText=`display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem;color:#fff;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
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
  document.getElementById('adr-chgbot').onclick=()=>renderBotSelectPage(async level=>{const d=await loadRanked();d.botLevel=level;await saveRanked(d);renderRankedPage();});
  const sb=document.getElementById('adr-start-match');sb.onmouseover=()=>{sb.style.filter='brightness(1.12)';sb.style.transform='translateY(-2px)';};sb.onmouseout=()=>{sb.style.filter='';sb.style.transform='';};sb.onclick=()=>startRankedMatch();
}

// ─── Tournament page ──────────────────────────────────────────────
function renderTournamentPage(){
  clearAllPages();const mc=getMain();if(!mc)return;hideMain();
  const pg=document.createElement('div');pg.id='adt-tourn';pg.style.cssText=`display:flex;flex-direction:column;padding:2rem 1.5rem;color:white;font-family:${FONT};min-height:80vh;width:100%;box-sizing:border-box;`;
  pg.appendChild(backBtn('AutoDarts +',()=>{history.pushState(null,'',PLUS_PATH);renderHubPage();}));
  const hdr=document.createElement('div');hdr.style.cssText='margin-bottom:1.5rem;';hdr.innerHTML=`<h1 style="font-size:1.25rem;font-weight:700;margin:0 0 .15rem;">Local Tournaments</h1><p style="margin:0;font-size:.75rem;color:rgba(255,255,255,.38);">KO · Groups + KO · League — automatic result sync</p>`;pg.appendChild(hdr);
  const td=document.createElement('div');td.id=TOURNEY_DIV_ID;td.style.cssText='flex:1;';pg.appendChild(td);
  const credits=document.createElement('div');credits.style.cssText=`margin-top:2.5rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:flex-start;gap:.85rem;font-family:${FONT};`;credits.innerHTML=`<div style="width:34px;height:34px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgba(255,255,255,.3);"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></div><div><div style="font-size:.72rem;font-weight:600;color:rgba(255,255,255,.45);margin-bottom:.25rem;">Local Tournaments — Credits</div><div style="font-size:.7rem;color:rgba(255,255,255,.25);line-height:1.65;">Based on the <strong style="color:rgba(255,255,255,.4);">Autodarts Local Tournaments</strong> extension by <strong style="color:rgba(255,255,255,.4);">alex</strong> (v1.33). All tournament logic and UI remain the work of the original author. AutoDarts + integrates it into a unified hub.</div></div>`;pg.appendChild(credits);
  mc.appendChild(pg);
  if(window.adTourney?.renderUI){window.adTourney.syncMatchResults?.();window.adTourney.renderUI();}
  else{td.innerHTML=`<div style="text-align:center;padding:3rem;color:rgba(255,255,255,.3);font-family:${FONT};">Loading...</div>`;const iv=setInterval(()=>{if(window.adTourney?.renderUI){clearInterval(iv);window.adTourney.syncMatchResults?.();window.adTourney.renderUI();}},200);setTimeout(()=>clearInterval(iv),10000);}
}

// ─── Sidebar ──────────────────────────────────────────────────────
let sbInterval=null;

async function injectSidebar(){
  document.getElementById('adt-plus-btn')?.remove();
  try{
    const stack=await waitFor('#root > div > div > .chakra-stack',15000);
    const last=stack.lastElementChild;
    if(!last)return;
    const btn=last.cloneNode(true);
    btn.removeAttribute('href');
    btn.id='adt-plus-btn';
    btn.style.cursor='pointer';
    const w=document.querySelector('#root > div > div')?.getBoundingClientRect().width||999;
    btn.innerHTML=PLUS_ICON+(w>170?`<span style="margin-left:.45rem;font-weight:700;">AutoDarts +</span>`:'');
    btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();history.pushState(null,'',PLUS_PATH);renderHubPage();});
    stack.appendChild(btn);
    if(sbInterval)clearInterval(sbInterval);
    sbInterval=setInterval(()=>{
      const b=document.getElementById('adt-plus-btn');
      if(!b){injectSidebar();return;}
      const w2=document.querySelector('#root > div > div')?.getBoundingClientRect().width||999;
      if(w2<170) b.innerHTML=PLUS_ICON;
      else if(w2>200) b.innerHTML=PLUS_ICON+`<span style="margin-left:.45rem;font-weight:700;">AutoDarts +</span>`;
    },1000);
  }catch(e){console.error('[AutoDarts+] Sidebar inject failed',e&&e.message);}
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
    await waitFor('#root > div:nth-of-type(1)',20000);

    if(location.href.includes('/matches')) injectDartSkin();
    if(location.pathname.includes('/matches/')) setTimeout(startResultPolling,2500);

    const mc=await waitFor('#root > div > div:nth-of-type(2)',10000).catch(()=>null);
    if(mc){
      if(location.href.includes(CUSTOMIZE_PATH)){liveColors=await loadColors();renderCustomizePage();}
      else if(location.href.includes(RANKED_PATH)) renderRankedPage();
      else if(location.href.includes(TOURNEY_PATH)) renderTournamentPage();
      else if(location.href.includes(PLUS_PATH)) renderHubPage();
    }

    await injectSidebar(); // starts Observer — keeps button alive across navigations

    watchUrl(async url=>{
      const m=await waitFor('#root > div > div:nth-of-type(2)',5000).catch(()=>null);
      if(!m)return;
      if(url.includes(CUSTOMIZE_PATH)){liveColors=await loadColors();renderCustomizePage();}
      else if(url.includes(RANKED_PATH)) renderRankedPage();
      else if(url.includes(TOURNEY_PATH)) renderTournamentPage();
      else if(url.includes(PLUS_PATH)) renderHubPage();
      else clearAllPages();
      if(url.includes('/matches')){injectDartSkin();setTimeout(startResultPolling,2500);}
    });

  } catch(e) {
    // Friendly error — e might be undefined if a Promise was rejected without a value
    console.error('[AutoDarts+] main failed', e && (e.message||String(e)));
  }
}

main();
