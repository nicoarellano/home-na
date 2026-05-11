'use client'

import { useState } from 'react'
import { ArrowLeft, Sun, Moon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { CdtIcon } from '@/components/ui/CdtIcon'
import './policy.css'

interface PolicyLayoutProps {
  children: React.ReactNode
  title: string
  eyebrow: string
  lastUpdated: string
  effectiveDate: string
}

export function PolicyLayout({ children, title, eyebrow, lastUpdated, effectiveDate }: PolicyLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  return (
    <div className={`policy-page${theme === 'dark' ? ' dark' : ''}`}>
      <nav className="policy-nav">
        <Link href="/" className="policy-nav-brand">
          <CdtIcon className="policy-nav-logo" />
          Collab Digital Twins
        </Link>

        <div className="policy-nav-actions">
          <button
            type="button"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            className="policy-theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <Link href="/" className="policy-nav-back">
            <ArrowLeft size={13} />
            Back to home
          </Link>
        </div>
      </nav>

      <div className="policy-content">
        <div className="policy-hero">
          <div className="policy-eyebrow">{eyebrow}</div>
          <h1 className="policy-title">{title}</h1>
          <div className="policy-meta">
            <span>Last updated: {lastUpdated}</span>
            <span>Effective: {effectiveDate}</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
