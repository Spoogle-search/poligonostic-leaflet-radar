# poligonostic-leaflet-radar

A Leaflet plugin that displays animated weather radar, satellite, and alerts using LibreWXR tiles.

## Features
- Animated radar (past + nowcast)
- Optional satellite overlay
- Optional weather alerts overlay
- Palette selection (Viper HD, Rainbow, NEXRAD)
- Simple Leaflet API

## Installation
Install via NPM:
```
npm install poligonostic-leaflet-radar
```

### Browser
```
<script src="src/poligonostic-leaflet-radar.js"></script>

```
## Usage

```js
const map = L.map('map').setView([34.36, -92.81], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const radar = L.poligonosticRadar({
  apiBase: 'https://api.librewxr.net',
  radarPalette: 10,
  showSatellite: true,
  showAlerts: true,
  frameInterval: 800
}).addTo(map);
```
## Demo
```
https://spoogle-search.github.io/poligonostic-leaflet-radar/examples/index.html

