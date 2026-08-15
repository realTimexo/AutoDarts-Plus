// Läuft in MAIN world bei document_start — VOR dem Autodarts-Code
// Fängt fetch ab und schickt Token per postMessage an tokenHelper.js
(function() {

    // ── Virtual-path rescue ──────────────────────────────────────────
    // AutoDarts + adds its own "pages" (/autodarts-plus, .../customize,
    // .../tournaments, .../ranked) that only exist as client-side routes
    // WE handle via history.pushState + our own render functions - the
    // real autodarts.io/.com React app has never heard of them. That's
    // fine for in-app navigation (clicking our own links), but breaks on
    // a hard page load: a browser refresh, someone bookmarking/sharing
    // the URL, or a redirect back to one of these paths (e.g. after an
    // OAuth callback) sends AutoDarts' own router a path it doesn't
    // recognize, and it 404s - which also broke "back to hub" once
    // already on a broken/404'd page, since our own overlay was then
    // being mounted into whatever AutoDarts' 404 page's DOM shape is
    // instead of the normal app shell it expects.
    //
    // Fix: rewrite the URL to '/' before AutoDarts' own bundle boots and
    // reads location.pathname for routing (this script runs at
    // document_start, ahead of it), and stash the original path so our
    // content script (content-scripts/content.js, document_idle) can
    // pick it back up once the real app shell has mounted normally.
    try {
        const VIRTUAL_PATHS = ['/autodarts-plus'];
        const p = location.pathname;
        if (VIRTUAL_PATHS.some(v => p === v || p.startsWith(v + '/'))) {
            sessionStorage.setItem('_adPlusPendingPath', p);
            history.replaceState(history.state, '', '/' + location.search + location.hash);
        }
    } catch (e) {}

    // ── Token capture via fetch ──────────────────────────────────────
    const _origFetch = window.fetch;
    window.fetch = function(...args) {
        try {
            const opts = args[1] || {};
            let auth = null;
            if (opts.headers) {
                if (typeof opts.headers.get === 'function') {
                    auth = opts.headers.get('Authorization') || opts.headers.get('authorization');
                } else {
                    auth = opts.headers['Authorization'] || opts.headers['authorization'];
                }
            }
            if (!auth && args[0] instanceof Request) {
                auth = args[0].headers?.get?.('Authorization');
            }
            if (auth && auth.startsWith('Bearer ')) {
                const token = auth.slice(7);
                if (token.length > 20) {
                    window.postMessage({ type: 'AD_TOKEN_CAPTURED', token }, window.location.origin);
                }
            }
        } catch(e) {}
        return _origFetch.apply(this, args);
    };

    // ── Token capture via XHR ────────────────────────────────────────
    const _origSetHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
        if (name?.toLowerCase() === 'authorization' && value?.startsWith('Bearer ')) {
            window.postMessage({ type: 'AD_TOKEN_CAPTURED', token: value.slice(7) }, window.location.origin);
        }
        return _origSetHeader.apply(this, arguments);
    };
})();
