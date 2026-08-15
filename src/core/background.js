// MV3 background service worker. Runs outside any page's CSP, so it's the
// right place for the GitHub API call - a content script's fetch() is
// still subject to the page's Content-Security-Policy, and AutoDarts'
// own CSP has no reason to allow connect-src to api.github.com.
//
// This can only ever *check and notify* - browsers give extensions no way
// to programmatically replace/update themselves (store-installed or not),
// so "auto update" here means "detect a newer release exists and hand the
// user a link", not a silent self-install.

const REPO = 'realTimexo/AutoDarts-Plus';
const CHECK_ALARM = 'adUpdateCheck';
const RESULT_KEY = 'adUpdateInfo';

// AMO (Firefox) requires this add-on's version to sort after an older,
// unrelated listing that already used 1.x/2.x, so Firefox releases are
// versioned as "3.<realVersion>" (e.g. real version 2.0.0 ships on AMO as
// 3.2.0.0) while Chrome/Edge ship the real version directly (2.0.0).
// GitHub release tags always use the real (Chrome/Edge) version. Strip
// the Firefox-only leading "3." segment before comparing so both stores
// agree on whether an update is available.
function canonicalVersion(v) {
    const parts = v.split('.');
    if (parts.length === 4 && parts[0] === '3') return parts.slice(1).join('.');
    return v;
}

function compareVersions(a, b) {
    const pa = a.split('.').map(n => parseInt(n, 10) || 0);
    const pb = b.split('.').map(n => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const x = pa[i] || 0, y = pb[i] || 0;
        if (x > y) return 1;
        if (x < y) return -1;
    }
    return 0;
}

async function checkForUpdate() {
    try {
        const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
            headers: { 'Accept': 'application/vnd.github+json' }
        });
        if (!res.ok) return;
        const data = await res.json();
        const tag = (data.tag_name || '').replace(/^v/i, '');
        if (!tag) return;

        const installed = canonicalVersion(chrome.runtime.getManifest().version);
        const available = compareVersions(tag, installed) > 0;

        await chrome.storage.local.set({
            [RESULT_KEY]: {
                available,
                latest: tag,
                installed,
                releaseUrl: data.html_url || `https://github.com/${REPO}/releases`,
                checkedAt: Date.now()
            }
        });
    } catch (e) {
        // Offline, rate-limited, or GitHub unreachable - just try again on
        // the next alarm, no need to surface this to the user.
    }
}

chrome.runtime.onInstalled.addListener(() => {
    checkForUpdate();
    chrome.alarms.create(CHECK_ALARM, { periodInMinutes: 12 * 60 }); // twice a day
});

chrome.runtime.onStartup.addListener(() => {
    checkForUpdate();
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === CHECK_ALARM) checkForUpdate();
});
