'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import LanguageToggle from '@/components/ui/LanguageToggle'
import GithubReleaseButton from '@/components/home/GithubReleaseButton'
import { CdtIcon } from '@/components/ui/CdtIcon'
import { Language } from '@/lib/language'

interface NavbarProps {
  theme: 'light' | 'dark'
  locale: Language
  onToggleTheme: () => void
  onSelectLanguage: (target: Language) => void
  showNavigation?: boolean
}

type NavKey = 'home' | 'about' | 'resources' | 'services' | 'contact'

const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'resources', href: '/resources' },
  { key: 'services', href: '/services' },
  { key: 'contact', href: '/#contact' },
]

export default function Navbar({
  theme,
  locale,
  onToggleTheme,
  onSelectLanguage,
  showNavigation = true,
}: NavbarProps) {
  const tNav = useTranslations('HomePage.nav')
  const tHero = useTranslations('HomePage.hero')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <motion.nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className="flex items-center gap-3 group cursor-pointer"
              aria-label="Back to home"
            >
              <CdtIcon className="w-8 h-8" />
              <span
                className="font-display text-xl tracking-wide max-xs:text-sm max-xs:text-nowrap lowercase transition-colors duration-200"
                style={{ color: 'var(--hp-on-surface)' }}
              >
                <>
                  <span style={{ color: 'var(--hp-primary-container)' }}>collab</span>
                  digitaltwins
                </>
              </span>
            </Link>
          </motion.div>

          {showNavigation && (
            <div className="hidden sm:flex items-center gap-1 flex-1 justify-center">
              {NAV_ITEMS.map(({ key, href }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={key}
                    href={href}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize font-display"
                    style={{
                      color: active
                        ? 'var(--hp-primary-container)'
                        : 'var(--hp-on-surface-variant)',
                      fontWeight: active ? 700 : 500,
                    }}
                  >
                    {tNav(key)}
                    {active && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-[17px] left-2 right-2 h-[2px]"
                        style={{ background: 'var(--hp-primary-container)' }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          )}

          <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
            <div className="hidden sm:flex items-center gap-3">
              <LanguageToggle currentLanguage={locale} onSelect={onSelectLanguage} />

              <Button
                variant="ghost"
                onClick={onToggleTheme}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--hp-on-surface-variant)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <GithubReleaseButton />

              <Button size="sm" className="btn-nav-cta rounded-md px-5 text-sm" asChild>
                <a href="https://app.collabdt.org/cdt" target="_blank" rel="noopener noreferrer">
                  {tHero('platformButton')}
                </a>
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--hp-on-surface-variant)' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {showNavigation &&
                  NAV_ITEMS.map(({ key, href }) => {
                    const active = isActive(href)
                    return (
                      <Link
                        key={key}
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all capitalize font-display"
                        style={{
                          color: active
                            ? 'var(--hp-primary-container)'
                            : 'var(--hp-on-surface-variant)',
                          background: active
                            ? 'rgba(239, 145, 97, 0.08)'
                            : 'transparent',
                        }}
                      >
                        {tNav(key)}
                      </Link>
                    )
                  })}

                <div className="flex items-center gap-2 px-4 py-2 pt-3">
                  <Button
                    variant="ghost"
                    onClick={onToggleTheme}
                    className="flex-1 p-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span className="text-sm">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </Button>
                  <div className="flex-1">
                    <LanguageToggle currentLanguage={locale} onSelect={onSelectLanguage} />
                  </div>
                </div>

                <div className="pt-2 px-1 flex items-center gap-2">
                  <GithubReleaseButton />
                  <Button size="sm" className="btn-sovereign flex-1 rounded-md" asChild>
                    <a href="https://app.collabdt.org/cdt" target="_blank" rel="noopener noreferrer">
                      {tHero('platformButton')}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
