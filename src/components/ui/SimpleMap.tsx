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
  width?: string
  height?: string
  mapStyleUrl?: string
  padding?: PaddingOptions
}

const ROTATION_SPEED = 0.1

// Empirically tuned so the whole sphere fits inside the container.
// Globe diameter ≈ FIT_DIVISOR * 2^zoom, so larger values yield more margin.
const FIT_DIVISOR = 160

export default function SimpleMap({
  width = '100%',
  height = '100%',
  mapStyleUrl,
  padding,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = React.useState(2.8)
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
    const el = containerRef.current
    if (!el) return

    const computeZoom = () => {
      const { clientWidth, clientHeight } = el
      const minDim = Math.min(clientWidth, clientHeight)
      if (minDim <= 0) return
      const next = Math.log2(minDim / FIT_DIVISOR)
      setZoom(Math.max(-1, Math.min(3.5, next)))
      // Tell maplibre its canvas changed size — otherwise the projection keeps the
      // old viewport and the globe drifts off-center after a window resize.
      mapRef.current?.getMap()?.resize()
    }

    computeZoom()
    const observer = new ResizeObserver(computeZoom)
    observer.observe(el)
    return () => observer.disconnect()
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
    <div ref={containerRef} className="pointer-events-auto opacity-75 relative z-10 h-full w-full">
      <Map
        ref={mapRef}
        mapStyle={resolvedStyle}
        mapLib={maplibregl}
        style={{ width, height, position: 'absolute', inset: 0, top: 0 }}
        initialViewState={viewState}
        projection="globe"
        onLoad={handleMapLoad}
        attributionControl={false}
        dragRotate={false}
        touchPitch={false}
        keyboard={false}
        boxZoom={false}
        pitchWithRotate={false}
      >
        <DeckOverlay interleaved layers={layers} />
      </Map>
    </div>
  )
}
