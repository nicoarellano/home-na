'use client'

import * as React from 'react'
import Map from 'react-map-gl/maplibre'
import type { MapRef } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'

// @ts-ignore
import 'maplibre-gl/dist/maplibre-gl.css'

import DeckOverlay from './DeckOverlay'
import AnimatedArcLayer from './AnimatedArcLayer'

interface Flight {
  time1: number
  time2: number
  lon1: number
  lat1: number
  alt1: number
  lon2: number
  lat2: number
  alt2: number
}

// Dataset matches the deck.gl maplibre example.
const FLIGHTS_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/globe/2020-01-14.csv'
const ANIMATION_SPEED = 320

// Length of time window to show active flights, in seconds. 2400s = 40min, which is a reasonable duration for a flight.
const TIME_WINDOW = 2400
const SEC_PER_DAY = 86400
// Dataset offset (seconds since midnight UTC) so the loop opens mid-day with the globe already busy.
const START_TIME = 43200

const DARK_PURPLE: [number, number, number] = [88, 28, 135]
const TERRACOTTA: [number, number, number] = [222, 101, 53]

interface PaddingOptions {
  top: number
  bottom: number
  left: number
  right: number
}

interface Props {
  mapStyleUrl?: string
  padding?: PaddingOptions
}

const ROTATION_SPEED = 0.1

// Globe diameter ≈ FIT_DIVISOR * 2^zoom (px) — the empirical constant that fits
// the sphere to a given pixel size.
const FIT_DIVISOR = 160

// We size the globe off the viewport + the known hero layout (stable and
// correct the instant the component mounts) instead of measuring the hero box,
// which can be reported mid-layout when the page remounts (About -> Home) and
// used to latch the globe at the wrong size.

// Hero layout constants — mirror tailwind.config.ts `screens` + HeroSection.
// Tailwind's centered `.container` is 100% wide but its max-width steps up to
// the largest screen <= viewport width, so it caps at 1400px on big displays.
const CONTAINER_SCREENS = [450, 575, 768, 992, 1200, 1400]
const CONTAINER_PADDING = 48 // px-6 => 1.5rem each side
const TWO_COL_BREAKPOINT = 992 // `lg` — grid switches to two columns
const COLUMN_GAP = 64 // lg:gap-16 => 4rem

// The sphere is inset inside its square canvas so the canvas edges never crop
// it, and the square is never taller than (a fraction of) the viewport so the
// whole globe always stays on screen.
const GLOBE_INSET = 0.94
const VH_FILL = 0.85

// On large screens (past the container's max width) let the globe grow a little
// to fill more of its column, gaining GROWTH_PER_PX per extra px of viewport.
// MAX_GROWTH is capped so the globe never grows wider than its column — it just
// fills it — and so it never overflows across the gap toward the headline.
const CONTAINER_MAX = 1400 // largest entry in CONTAINER_SCREENS
const GROWTH_PER_PX = 0.12
const MAX_GROWTH = 40

// Final safety clamp; in practice the column width is what limits the size.
const MAX_ZOOM = 2.6
// Server render has no window; this default is corrected on mount.
const DEFAULT_SIDE = 560

function rightColumnWidth(vw: number) {
  let containerWidth = vw
  for (const screen of CONTAINER_SCREENS) {
    if (vw >= screen) containerWidth = screen
  }
  const content = containerWidth - CONTAINER_PADDING
  // Two columns at lg+, otherwise the globe block spans the full content width.
  return vw >= TWO_COL_BREAKPOINT ? (content - COLUMN_GAP) / 2 : content
}

function computeGlobeSide() {
  if (typeof window === 'undefined') return DEFAULT_SIDE
  // clientWidth excludes the scrollbar, matching the actual layout width.
  const vw = document.documentElement.clientWidth || window.innerWidth
  const growth = Math.min(Math.max(0, vw - CONTAINER_MAX) * GROWTH_PER_PX, MAX_GROWTH)
  // Never wider than its column (+ the large-screen growth) nor taller than the
  // viewport, so it stays off the headline and the whole sphere stays visible.
  return Math.min(rightColumnWidth(vw) + growth, window.innerHeight * VH_FILL)
}

function sideToZoom(side: number) {
  return Math.max(-1, Math.min(MAX_ZOOM, Math.log2((side * GLOBE_INSET) / FIT_DIVISOR)))
}

export default function Globe({ mapStyleUrl, padding }: Props) {
  const [side, setSide] = React.useState(DEFAULT_SIDE)
  const [zoom, setZoom] = React.useState(() => sideToZoom(DEFAULT_SIDE))
  const [flights, setFlights] = React.useState<Flight[]>([])
  const [currentTime, setCurrentTime] = React.useState(0)
  const mapRef = React.useRef<MapRef>(null)
  const paddingRef = React.useRef<PaddingOptions | undefined>(padding)
  const animationRef = React.useRef<number>(0)
  const timeAnimRef = React.useRef<number>(0)
  const userInteracting = React.useRef(false)
  const resumeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    paddingRef.current = padding
  }, [padding])

  React.useEffect(() => {
    const onResize = () => {
      const next = computeGlobeSide()
      setSide(next)
      setZoom(sideToZoom(next))
      // Tell maplibre its canvas changed size so the projection re-centers.
      mapRef.current?.getMap()?.resize()
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current)
      cancelAnimationFrame(timeAnimRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  React.useEffect(() => {
    let cancelled = false
    fetch(FLIGHTS_URL)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return
        const lines = text.trim().split('\n').slice(1)
        const parsed: Flight[] = []
        // Sample ~half the rows for a lighter scene.
        for (let i = 0; i < lines.length; i += 2) {
          const v = lines[i].split(',')
          parsed.push({
            time1: Number(v[0]),
            time2: Number(v[1]),
            lon1: Number(v[2]),
            lat1: Number(v[3]),
            alt1: Number(v[4]),
            lon2: Number(v[5]),
            lat2: Number(v[6]),
            alt2: Number(v[7]),
          })
        }
        setFlights(parsed)
      })
      .catch(() => { })
    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      setCurrentTime((START_TIME + elapsed * ANIMATION_SPEED) % SEC_PER_DAY)
      timeAnimRef.current = requestAnimationFrame(tick)
    }
    timeAnimRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(timeAnimRef.current)
  }, [])

  const layers = React.useMemo(() => {
    if (!flights.length) return []
    return [
      new AnimatedArcLayer<Flight>({
        id: 'flights',
        data: flights,
        getSourcePosition: (d) => [d.lon1, d.lat1, d.alt1],
        getTargetPosition: (d) => [d.lon2, d.lat2, d.alt2],
        getSourceTimestamp: (d) => d.time1,
        getTargetTimestamp: (d) => d.time2,
        getSourceColor: TERRACOTTA,
        getTargetColor: DARK_PURPLE,
        getHeight: 0.1,
        getWidth: 2,
        timeRange: [currentTime, currentTime + TIME_WINDOW],
        parameters: { cullMode: 'none' },
      }),
    ]
  }, [flights, currentTime])

  React.useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) return

    // Order matters: setMinZoom rejects values above the current maxZoom (and vice versa).
    // Widen first, then collapse to the desired window so we never cross the invariant mid-update.
    const nextMin = zoom
    const nextMax = zoom + 0.2
    map.setMinZoom(-2)
    map.setMaxZoom(24)
    map.setZoom(zoom)
    map.setMaxZoom(nextMax)
    map.setMinZoom(nextMin)

    const currentPadding = paddingRef.current
    if (!currentPadding) return
    map.setPadding(currentPadding)
  }, [padding, zoom])

  const viewState = {
    longitude: -75.74,
    latitude: 0,
    zoom,
  }

  const resolvedStyle = React.useMemo(() => {
    if (!mapStyleUrl) return undefined

    const isTileTemplate =
      mapStyleUrl.includes('{x}') && mapStyleUrl.includes('{y}') && mapStyleUrl.includes('{z}')
    if (!isTileTemplate) return mapStyleUrl

    return {
      version: 8 as const,
      sources: {
        rasterTiles: {
          type: 'raster' as const,
          tiles: [mapStyleUrl],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: 'raster-tiles',
          type: 'raster' as const,
          source: 'rasterTiles',
        },
      ],
    }
  }, [mapStyleUrl])

  const handleMapLoad = React.useCallback(() => {
    const map = mapRef.current?.getMap()
    if (!map) return

    const applyCurrentPadding = () => {
      const currentPadding = paddingRef.current
      if (!currentPadding) return
      map.setPadding(currentPadding)
    }

    applyCurrentPadding()
    map.on('styledata', applyCurrentPadding)

    const onInteractionStart = () => {
      userInteracting.current = true
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }

    const onInteractionEnd = () => {
      resumeTimeoutRef.current = setTimeout(() => {
        userInteracting.current = false
      }, 1500)
    }

    const onMouseDown = (e: maplibregl.MapMouseEvent) => {
      if (e.originalEvent.button !== 0) return
      onInteractionStart()
    }
    const onMouseUp = (e: maplibregl.MapMouseEvent) => {
      if (e.originalEvent.button !== 0) return
      onInteractionEnd()
    }

    map.on('mousedown', onMouseDown)
    map.on('mouseup', onMouseUp)
    map.on('touchstart', onInteractionStart)
    map.on('touchend', onInteractionEnd)
    map.on('dragstart', onInteractionStart)
    map.on('dragend', onInteractionEnd)

    function rotate() {
      if (!userInteracting.current) {
        const center = map.getCenter()
        center.lng -= ROTATION_SPEED
        map.jumpTo({
          center: { lng: center.lng, lat: center.lat },
          padding: map.getPadding(),
        })
      }
      animationRef.current = requestAnimationFrame(rotate)
    }

    animationRef.current = requestAnimationFrame(rotate)
  }, [])

  return (
    <div
      className="pointer-events-auto opacity-75 absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ width: side, height: side }}
    >
      <Map
        ref={mapRef}
        mapStyle={resolvedStyle}
        mapLib={maplibregl}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        initialViewState={viewState}
        projection="globe"
        onLoad={handleMapLoad}
        attributionControl={false}
        dragRotate={false}
        touchPitch={false}
        keyboard={false}
        boxZoom={false}
        pitchWithRotate={false}
        // Zoom is fixed at the fit level; allowing zoom-in lets the sphere grow
        // past its square canvas and expose the canvas edge ("frames").
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
      >
        <DeckOverlay interleaved layers={layers} />
      </Map>
    </div>
  )
}
