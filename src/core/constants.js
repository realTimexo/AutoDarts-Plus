(function() {
    window.adTourney = window.adTourney || {};

    // Resolves which translation set to use from AutoDarts' own i18next
    // language setting in localStorage. Falls back to English for any
    // language we don't have a translation for.
    //
    // NOTE: this was accidentally dropped from this file during the .com
    // TLD-detection rewrite, which broke every UI file that calls
    // window.adTourney.getLang() ("Uncaught TypeError:
    // window.adTourney.getLang is not a function" in modals.js,
    // logic.js, bracket.js, tables.js, setup.js, league.js, groups.js,
    // actions.js, renderer.js). A stub was added in pageScript.js
    // instead, but that runs in the MAIN world (the page's own JS
    // context) while all the files above run in the ISOLATED world -
    // two separate `window` objects for a content script, so anything
    // set on one is invisible to the other. The fix has to live here,
    // where constants.js loads first, before every file that needs it.
    window.adTourney.escapeHtml = function(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/[&<>"']/g, (ch) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[ch]));
    };

    window.adTourney.getLang = function() {
        const l = (localStorage.getItem('i18nextLng') || 'en').toLowerCase();
        if (l.startsWith('de')) return 'de';
        if (l.startsWith('nl')) return 'nl';
        return 'en';
    };

    // ── Domain detection: works on both .io and .com ──
    const _tld = location.hostname.endsWith('.com') ? 'com' : 'io';
    window._AD_PLAY = 'https://play.autodarts.' + _tld;
    window._AD_API  = 'https://api.autodarts.'  + _tld;

    window.adTourney.constants = {
        PAGE_ID: 'autodarts-tools-config',
        MENU_ITEM_ID: 'autodarts-local-tournaments-menu-item',
        QUICK_LINK_ID: 'ad-tourney-quick-link',
        STORAGE_KEY: 'ad_local_tourney',
        GROUP_SIZE_OPTIONS: [3, 4, 5, 6, 8, 10, 12, 24, 32],
        ADVANCE_OPTIONS: [2, 4, 8, 16, 32],
        URLS: {
            HISTORY:    window._AD_PLAY + '/history/matches/',
            LOBBY_NEW:  window._AD_PLAY + '/lobbies/new/x01',
            LOBBY_BASE: window._AD_PLAY + '/lobbies/',
            MATCH_BASE: window._AD_PLAY + '/matches/'
        }
    };
})();
