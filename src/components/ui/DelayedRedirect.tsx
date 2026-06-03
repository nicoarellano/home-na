'use client'

import { useEffect } from 'react'

export interface DelayedRedirectProps {
  /** Destination URL. Relative values resolve against the current document. */
  href: string
  /** Minimum time to stay on the page before navigating, in ms. */
  delayMs?: number
}

/**
 * Hard-redirects to `href` after `delayMs`, giving the splash animation time to
 * play. Uses location.replace so the splash isn't left in the back/forward
 * history. A no-JS <meta http-equiv="refresh"> fallback should accompany this.
 */
export function DelayedRedirect({ href, delayMs = 1600 }: DelayedRedirectProps) {
  useEffect(() => {
    const id = window.setTimeout(() => window.location.replace(href), delayMs)
    return () => window.clearTimeout(id)
  }, [href, delayMs])

  return null
}
