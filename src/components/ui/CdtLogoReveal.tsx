import React, { type CSSProperties } from 'react'

export interface CdtLogoRevealProps {
  /** Rendered width in px (height follows the artwork's aspect ratio). */
  size?: number | string
  className?: string
  style?: CSSProperties
}

// One-shot "reveal" animation: the mark is reconstructed with drawn strokes,
// then cross-fades to the solid logo. The main shapes use currentColor, so the
// colour follows whatever `color` is set on the <svg> — defaulting to
// var(--hp-on-surface) makes it the theme's near-white in dark mode and
// near-black in light mode. Selectors are scoped under .cdt-logo-reveal so the
// generic class names (.s/.d/.real/...) don't leak to other SVGs on the page.
const CSS = `
.cdt-logo-reveal{color-scheme:light dark;--t:1.5s;--tc:#ef9262}
.cdt-logo-reveal .s{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:62;stroke-dasharray:100}
.cdt-logo-reveal .d{animation:cdtrDDraw var(--t) linear 1 normal forwards,cdtrWD var(--t) linear 1 normal forwards}
.cdt-logo-reveal .t{animation:cdtrStemDraw var(--t) linear 1 normal forwards,cdtrWD var(--t) linear 1 normal forwards}
.cdt-logo-reveal .hr{animation:cdtrTDraw var(--t) linear 1 normal forwards,cdtrWD var(--t) linear 1 normal forwards}
.cdt-logo-reveal .hl{animation:cdtrTDraw var(--t) linear 1 normal forwards,cdtrHCol var(--t) linear 1 normal forwards,cdtrWD var(--t) linear 1 normal forwards}
.cdt-logo-reveal .recon{animation:cdtrReconF var(--t) linear 1 normal forwards}
.cdt-logo-reveal .real{opacity:0;animation:cdtrRealF var(--t) linear 1 normal forwards}
.cdt-logo-reveal .real .w{fill:currentColor}.cdt-logo-reveal .real .tc{fill:var(--tc)}
@keyframes cdtrDDraw{0%{stroke-dashoffset:100}5%{stroke-dashoffset:96}40%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
@keyframes cdtrTDraw{0%,42%{stroke-dashoffset:100}58%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
@keyframes cdtrStemDraw{0%,42%{stroke-dashoffset:100}58%{stroke-dashoffset:28}62%{stroke-dashoffset:28}74%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
@keyframes cdtrHCol{0%,60%{stroke:currentColor}72%,100%{stroke:var(--tc)}}
@keyframes cdtrWD{0%,100%{stroke-width:62}}
@keyframes cdtrReconF{0%,62%{opacity:1}74%,100%{opacity:0}}
@keyframes cdtrRealF{0%,62%{opacity:0}74%,100%{opacity:1}}
@media(prefers-reduced-motion:reduce){.cdt-logo-reveal .recon{display:none}.cdt-logo-reveal .real{opacity:1;animation:none}}
`

export const CdtLogoReveal = ({ size = 72, className, style }: CdtLogoRevealProps) => {
  return (
    <svg
      className={['cdt-logo-reveal', className].filter(Boolean).join(' ')}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 466.83 448.49'
      role='img'
      aria-label='Collab Digital Twins'
      preserveAspectRatio='xMidYMid meet'
      style={{ width: size, height: 'auto', color: 'var(--hp-on-surface)', ...style }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <g className='real'>
        <path
          className='w'
          d='M450.47,199.92c6.06,6.07,9.09,14.01,9.09,21.95s-3.03,15.9-9.09,21.96l-195.57,195.56c-12.12,12.13-31.78,12.13-43.9,0l.07-.22c-.99-.76-1.95-1.61-2.86-2.52L9.1,237.53c-12.13-12.12-12.13-31.78,0-43.9l107.84-107.43c12.12-12.12,31.78-12.12,43.9,0,6.06,6.06,9.09,14.01,9.09,21.95s-3.03,15.89-9.09,21.95l-85.68,85.69,157.8,157.8.02-.07,152.28-152.28-121.22-121.22.21,119.39c0,10.42-3.46,19.86-9.06,26.69s-13.33,11.06-21.87,11.06c-17.08,0-30.92-16.9-30.92-37.75l-.31-188.49C202.09,13.84,218.82,0,239.45,0h181.34c10.32,0,20.82,3.98,27.58,9.57,6.76,5.6,10.94,13.33,10.94,21.87,0,17.08-16.72,30.93-37.36,30.93l-109.35-.32,136.34,136.34c.26.26.51.51.74.78h0c.27.24.53.49.79.75Z'
        />
        <path
          className='tc'
          d='M26.39,62.68l133.28.52c14.47,0,26.2-13.85,26.2-30.93h0c0-17.08-11.73-30.93-26.2-30.93L26.39.83c-14.47,0-26.2,13.85-26.2,30.93H.19c0,17.08,11.73,30.93,26.2,30.93Z'
        />
      </g>
      <g className='recon'>
        <path className='s d' pathLength={100} d='M143,104 L31,216 L232,417 L428,221 L232,31' />
        <path className='s t' pathLength={100} d='M232,31 L232,257' />
        <path className='s hr' pathLength={100} d='M232,31 L412,31' />
        <path className='s hl' pathLength={100} d='M232,31 L31,31' />
      </g>
    </svg>
  )
}
