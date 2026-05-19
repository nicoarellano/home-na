'use client'

import * as React from 'react'
import Map from 'react-map-gl/maplibre'
import type { MapRef } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'

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
  const mapRef = React.useRef<MapRef>(null)
  const paddingRef = React.useRef<PaddingOptions | undefined>(padding)
  const userInteracting = React.useRef(false)
  const animationRef = React.useRef<number>(0)
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
    }

    computeZoom()
    const observer = new ResizeObserver(computeZoom)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  React.useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) return
    map.setZoom(zoom)

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

    map.on('mousedown', onInteractionStart)
    map.on('mouseup', onInteractionEnd)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-auto relative z-10 h-full w-full">
      <Map
        ref={mapRef}
        mapStyle={resolvedStyle}
        mapLib={maplibregl}
        style={{ width, height, position: 'absolute', inset: 0, top: 0 }}
        initialViewState={viewState}
        projection="globe"
        onLoad={handleMapLoad}
        attributionControl={false}
      >
      </Map>
    </div>
  )
}
