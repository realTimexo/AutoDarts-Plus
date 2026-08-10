(function() {
    window.adTourney = window.adTourney || {};

    // Escapes text before it is interpolated into an innerHTML template.
    // Player names, board names, etc. can contain arbitrary characters
    // (they are free-text fields), so they must never be inserted into
    // HTML unescaped - doing so would allow stored/self XSS on
    // play.autodarts.io. Always run untrusted strings through this
    // before putting them inside a template literal that ends up in
    // .innerHTML.
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

    // Resolves which translation set to use from AutoDarts' own i18next
    // language setting in localStorage. Falls back to English for any
    // language we don't have a translation for.
    window.adTourney.getLang = function() {
        const l = (localStorage.getItem('i18nextLng') || 'en').toLowerCase();
        if (l.startsWith('de')) return 'de';
        if (l.startsWith('nl')) return 'nl';
        return 'en';
    };

    window.adTourney.constants = {
        PAGE_ID: 'autodarts-tools-config',
        MENU_ITEM_ID: 'autodarts-local-tournaments-menu-item',
        QUICK_LINK_ID: 'ad-tourney-quick-link',
        STORAGE_KEY: 'ad_local_tourney',
        GROUP_SIZE_OPTIONS: [3, 4, 5, 6, 8, 10, 12, 24, 32],
        ADVANCE_OPTIONS: [2, 4, 8, 16, 32],
        URLS: {
            HISTORY: 'https://play.autodarts.io/history/matches/',
            LOBBY_NEW: 'https://play.autodarts.io/lobbies/new/x01',
            LOBBY_BASE: 'https://play.autodarts.io/lobbies/',
            MATCH_BASE: 'https://play.autodarts.io/matches/'
        }
    };
})();
