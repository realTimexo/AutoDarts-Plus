/**
 * AutoDarts+ – Minimal DOMPurify-compatible sanitizer
 * SVG user input is sanitised via DOMParser; extension-internal HTML templates
 * (constants, numbers, hex colours) are returned as-is.
 */
(function () {
  'use strict';
  window.DOMPurify = {
    sanitize: function (dirty) {
      if (typeof dirty !== 'string') return '';
      if (dirty.trimStart().startsWith('<svg')) {
        try {
          var doc = new DOMParser().parseFromString(dirty, 'image/svg+xml');
          if (doc.querySelector('parsererror')) return '';
          doc.querySelectorAll('script').forEach(function (el) { el.remove(); });
          doc.querySelectorAll('*').forEach(function (el) {
            Array.from(el.attributes).forEach(function (attr) {
              var name = attr.name.toLowerCase();
              var val  = (attr.value || '').toLowerCase();
              if (name.startsWith('on') || val.indexOf('javascript:') !== -1) {
                el.removeAttribute(attr.name);
              }
            });
          });
          return new XMLSerializer().serializeToString(doc.documentElement);
        } catch (e) { return ''; }
      }
      return dirty; // Extension-internal HTML — trusted source
    }
  };
})();
