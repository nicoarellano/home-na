'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import SimpleMap from '@/components/ui/SimpleMap'

interface HeroSectionProps {
  assetsUrl: string
}

export default function HeroSection({ assetsUrl }: HeroSectionProps) {
  const tHero = useTranslations('HomePage.hero')

  const handleDemoRequest = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      sessionStorage.setItem('cdt_demo_request', '1')
    } catch { }
    const target = document.getElementById('contact')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    else window.location.hash = '#contact'
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      style={{ background: 'var(--hp-surface)' }}
    >
      <AnimatedBackground assetsUrl={assetsUrl} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="stat-pill">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--hp-primary-container)' }}
                />
                {tHero('tagline')}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
                lineHeight: '0.98',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {tHero('title')}
              <br />
              <span className="text-signature">{tHero('titleEm')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ color: 'var(--hp-on-surface-variant)' }}
            >
              {tHero('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-3 pt-2"
            >
              <Button
                size="lg"
                className="btn-sovereign text-base px-8 w-full sm:w-auto"
                asChild
              >
                <a href="#contact" onClick={handleDemoRequest}>
                  {tHero('primaryCta')}
                </a>
              </Button>
              <Button
                size="lg"
                className="btn-glass text-base px-8 w-full sm:w-auto"
                asChild
              >
                <a href="https://app.collabdt.org/cdt" target="_blank" rel="noopener noreferrer">
                  {tHero('secondaryCta')}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            id="demo"
            className="relative w-full hidden md:block"
          >
            <div className="w-full relative overflow-hidden aspect-square">
              <SimpleMap
                width="100%"
                height="100%"
                mapStyleUrl="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
