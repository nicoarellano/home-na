export interface HeroFlow {
  source: [number, number]
  target: [number, number]
}

const OTTAWA: [number, number] = [-75.6972, 45.4215]

export const HERO_FLOWS: HeroFlow[] = [
  { source: OTTAWA, target: [-74.006, 40.7128] },     // New York
  { source: OTTAWA, target: [-118.2437, 34.0522] },   // Los Angeles
  { source: OTTAWA, target: [-123.1207, 49.2827] },   // Vancouver
  { source: OTTAWA, target: [-99.1332, 19.4326] },    // Mexico City
  { source: OTTAWA, target: [-58.3816, -34.6037] },   // Buenos Aires
  { source: OTTAWA, target: [-46.6333, -23.5505] },   // Sao Paulo
  { source: OTTAWA, target: [-0.1276, 51.5074] },     // London
  { source: OTTAWA, target: [2.3522, 48.8566] },      // Paris
  { source: OTTAWA, target: [13.405, 52.52] },        // Berlin
  { source: OTTAWA, target: [12.4964, 41.9028] },     // Rome
  { source: OTTAWA, target: [37.6173, 55.7558] },     // Moscow
  { source: OTTAWA, target: [31.2357, 30.0444] },     // Cairo
  { source: OTTAWA, target: [18.4241, -33.9249] },    // Cape Town
  { source: OTTAWA, target: [3.3792, 6.5244] },       // Lagos
  { source: OTTAWA, target: [72.8777, 19.076] },      // Mumbai
  { source: OTTAWA, target: [103.8198, 1.3521] },     // Singapore
  { source: OTTAWA, target: [116.4074, 39.9042] },    // Beijing
  { source: OTTAWA, target: [139.6503, 35.6762] },    // Tokyo
  { source: OTTAWA, target: [151.2093, -33.8688] },   // Sydney
  { source: OTTAWA, target: [174.7633, -36.8485] },   // Auckland
  { source: OTTAWA, target: [-157.8581, 21.3069] },   // Honolulu
  { source: OTTAWA, target: [55.2708, 25.2048] },     // Dubai
  { source: OTTAWA, target: [-43.1729, -22.9068] },   // Rio de Janeiro
  { source: OTTAWA, target: [126.978, 37.5665] },     // Seoul
]
