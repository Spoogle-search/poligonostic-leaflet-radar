(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('leaflet'));
  } else {
    factory(L);
  }
}(function (L) {

  L.PoligonosticRadar = L.Layer.extend({
    initialize: function (options = {}) {
      L.setOptions(this, options);
      this._apiBase = options.apiBase || 'https://api.librewxr.net';
      this._framesRadar = [];
      this._framesSatellite = [];
      this._currentIndex = 0;
    },

    onAdd: function (map) {
      this._map = map;
      this._loadMetadata();
    },

    _loadMetadata: async function () {
      const res = await fetch(this._apiBase + '/public/weather-maps.json');
      const data = await res.json();
      const host = data.host || this._apiBase;

      this._framesRadar = data.radar.past.map(f => ({
        timestamp: f.time,
        path: f.path
      }));

      this._host = host;
      this._updateRadarFrame();
    },

    _radarTileUrl: function (frame) {
      const palette = this.options.radarPalette || 10;
      return `${this._host}${frame.path}/256/{z}/{x}/{y}/${palette}/1_0.webp`;
    },

    _updateRadarFrame: function () {
      const frame = this._framesRadar[this._currentIndex];
      if (this._radarLayer) this._map.removeLayer(this._radarLayer);

      this._radarLayer = L.tileLayer(this._radarTileUrl(frame), {
        opacity: 0.8,
        tileSize: 256
      }).addTo(this._map);
    },

    nextFrame: function () {
      this._currentIndex = (this._currentIndex + 1) % this._framesRadar.length;
      this._updateRadarFrame();
    },

    prevFrame: function () {
      this._currentIndex = (this._currentIndex - 1 + this._framesRadar.length) % this._framesRadar.length;
      this._updateRadarFrame();
    }
  });

  L.poligonosticRadar = function (options) {
    return new L.PoligonosticRadar(options);
  };

}));
