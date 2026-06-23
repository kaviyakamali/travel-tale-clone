// Lightweight, dependency-free geo lookup so listings can be placed on a map.
// Maps a location string to approximate coordinates. Falls back to a
// deterministic pseudo-location derived from the string so every listing
// always has a stable point on the map.

const CITY_COORDS: Record<string, [number, number]> = {
  malibu: [34.0259, -118.7798],
  california: [36.7783, -119.4179],
  "los angeles": [34.0522, -118.2437],
  "new york": [40.7128, -74.006],
  aspen: [39.1911, -106.8175],
  colorado: [39.5501, -105.7821],
  miami: [25.7617, -80.1918],
  florida: [27.6648, -81.5158],
  hawaii: [19.8968, -155.5828],
  maui: [20.7984, -156.3319],
  tulum: [20.2114, -87.4654],
  mexico: [23.6345, -102.5528],
  bali: [-8.4095, 115.1889],
  indonesia: [-0.7893, 113.9213],
  santorini: [36.3932, 25.4615],
  greece: [39.0742, 21.8243],
  tuscany: [43.7711, 11.2486],
  italy: [41.8719, 12.5674],
  paris: [48.8566, 2.3522],
  france: [46.2276, 2.2137],
  switzerland: [46.8182, 8.2275],
  alps: [46.8876, 9.6),
  iceland: [64.9631, -19.0208],
  reykjavik: [64.1466, -21.9426],
  norway: [60.472, 8.4689],
  japan: [36.2048, 138.2529],
  kyoto: [35.0116, 135.7681],
  tokyo: [35.6762, 139.6503],
  thailand: [15.87, 100.9925],
  "cape town": [-33.9249, 18.4241],
  "south africa": [-30.5595, 22.9375],
  morocco: [31.7917, -7.0926],
  dubai: [25.2048, 55.2708],
  australia: [-25.2744, 133.7751],
  sydney: [-33.8688, 151.2093],
  "new zealand": [-40.9006, 174.886],
  canada: [56.1304, -106.3468],
  banff: [51.4968, -115.9281],
  oregon: [43.8041, -120.5542],
  texas: [31.9686, -99.9018],
  montana: [46.8797, -110.3626],
  vermont: [44.5588, -72.5778],
  arizona: [34.0489, -111.0937],
  utah: [39.321, -111.0937],
  portugal: [39.3999, -8.2245],
  lisbon: [38.7223, -9.1393],
  spain: [40.4637, -3.7492],
  scotland: [56.4907, -4.2026],
  ireland: [53.4129, -8.2439],
  costa rica: [9.7489, -83.7534],
  peru: [-9.19, -75.0152],
  brazil: [-14.235, -51.9253],
};

// Simple string hash -> stable number in [0, 1)
function hash01(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

export function getCoords(location: string): [number, number] {
  const key = location.toLowerCase();
  for (const city in CITY_COORDS) {
    if (key.includes(city)) {
      const [lat, lng] = CITY_COORDS[city];
      // small deterministic jitter so co-located stays don't overlap perfectly
      const jLat = (hash01(location) - 0.5) * 0.12;
      const jLng = (hash01(location + "x") - 0.5) * 0.12;
      return [lat + jLat, lng + jLng];
    }
  }
  // Fallback: spread across a plausible inhabited band
  const lat = -45 + hash01(location) * 100;
  const lng = -160 + hash01(location + "lng") * 320;
  return [lat, lng];
}

// Builds an OpenStreetMap embed URL (no API key required) centered on a marker.
export function osmEmbedUrl(lat: number, lng: number, zoomSpan = 0.08): string {
  const left = (lng - zoomSpan).toFixed(4);
  const right = (lng + zoomSpan).toFixed(4);
  const top = (lat + zoomSpan).toFixed(4);
  const bottom = (lat - zoomSpan).toFixed(4);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lng}`;
}
