'use client'

import { useEffect, useRef } from 'react'

interface MarqueeOptions {
  /** Base scroll speed in px per second. */
  baseSpeed?: number
  direction?: 'left' | 'right'
}

/**
 * Drives a tripled-content track with requestAnimationFrame so it is always
 * spinning, and lets the user accelerate it by scrolling (wheel) or dragging
 * over it. The extra "boost" decays exponentially back to the base speed.
 *
 * The element this ref is attached to must contain its items repeated 3× and
 * use `width: max-content`; the hook wraps seamlessly every one-third.
 */
export function useMarquee({ baseSpeed = 60, direction = 'left' }: MarqueeOptions = {}) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const dir = direction === 'left' ? -1 : 1
    const baseVel = dir * baseSpeed // signed, constant px/s
    const MAX_EXTRA = 2400

    let offset = 0
    // Signed velocity the user adds on top of the base. Can point either way
    // (so a drag can briefly reverse the spin) and decays back to zero.
    let extra = 0
    let last = 0
    let raf = 0
    let dragging = false
    let lastPointerX = 0

    const frame = (t: number) => {
      if (!last) last = t
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t

      const single = track.scrollWidth / 3 || 1
      offset += (baseVel + extra) * dt

      // Seamless wrap within a single copy of the content (both directions).
      if (offset <= -single) offset += single
      else if (offset >= 0) offset -= single

      track.style.transform = `translate3d(${offset}px, 0, 0)`

      // Decay the user's contribution back toward the base spin (~1s).
      extra *= Math.pow(0.0015, dt)
      if (Math.abs(extra) < 0.5) extra = 0

      raf = requestAnimationFrame(frame)
    }

    const addExtra = (amount: number) => {
      extra = Math.max(-MAX_EXTRA, Math.min(extra + amount, MAX_EXTRA))
    }

    const onWheel = (e: WheelEvent) => {
      // Scrolling just speeds the spin up in its current base direction.
      addExtra(dir * Math.abs(e.deltaY || e.deltaX) * 3)
    }

    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      lastPointerX = e.clientX
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastPointerX
      lastPointerX = e.clientX
      // Directional: drag right pushes it right-to-left -> left-to-right, etc.
      addExtra(dx * 40)
    }
    const onPointerUp = () => {
      dragging = false
    }

    track.addEventListener('wheel', onWheel, { passive: true })
    track.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('wheel', onWheel)
      track.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [baseSpeed, direction])

  return trackRef
}
