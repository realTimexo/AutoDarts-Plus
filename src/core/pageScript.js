// Läuft in MAIN world bei document_start — VOR dem Autodarts-Code
// Fängt fetch ab und schickt Token per postMessage an tokenHelper.js
(function() {
    // ── getLang stub: autodarts.com's own JS calls window.adTourney.getLang()
    // We create the namespace first, so their code doesn't crash.
    // Their code will overwrite getLang with the real one when it loads.
    window.adTourney = window.adTourney || {};
    if (typeof window.adTourney.getLang !== 'function') {
        window.adTourney.getLang = function(key) { return key || ''; };
    }

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
                    window.postMessage({ type: 'AD_TOKEN_CAPTURED', token }, '*');
                }
            }
        } catch(e) {}
        return _origFetch.apply(this, args);
    };

    // ── Token capture via XHR ────────────────────────────────────────
    const _origSetHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
        if (name?.toLowerCase() === 'authorization' && value?.startsWith('Bearer ')) {
            window.postMessage({ type: 'AD_TOKEN_CAPTURED', token: value.slice(7) }, '*');
        }
        return _origSetHeader.apply(this, arguments);
    };
})();
