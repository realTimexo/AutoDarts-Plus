(function() {
    window.adTourney = window.adTourney || {};

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
