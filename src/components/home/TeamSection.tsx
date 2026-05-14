'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

interface Director {
  name: string
  title: string
  avatar: string
  email: string
  github?: string
  linkedin?: string
}

const directors: Director[] = [
  {
    name: 'Lara Chow',
    title: 'Director / Secretary',
    avatar: `${BASE}/images/homepage/team/lc.png`,
    email: 'lara@collabdt.org',
    github: 'lchowCIMS',
    linkedin: 'lara-chow-1508666a',
  },
  {
    name: 'Nicolas Arellano',
    title: 'Director / President',
    avatar: `${BASE}/images/homepage/team/na.png`,
    email: 'nico@collabdt.org',
    github: 'nicoarellano',
    linkedin: 'nicolasarellano',
  },
  {
    name: 'Ken Percy',
    title: 'Director / Treasurer',
    avatar: `${BASE}/images/homepage/team/kp.png`,
    email: 'ken@collabdt.org',
    github: 'ken-99',
    linkedin: 'kenpercyarchitecture',
  },
  {
    name: 'Dr. Stephen Fai',
    title: 'Director',
    avatar: `${BASE}/images/homepage/team/sf.png`,
    email: 'steve@collabdt.org',
    linkedin: 'stephen-fai-58a211a3',
  },
  {
    name: 'Laurie Smith',
    title: 'Director',
    avatar: `${BASE}/images/homepage/team/ls.png`,
    email: 'laurie@collabdt.org',
  },
]

function initials(name: string) {
  return name
    .replace(/^Dr\.\s+/, '')
    .split(' ')
    .map((w) => w[0])
    .join('')
}

function DirectorCard({ director }: { director: Director }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col items-center text-center gap-4"
    >
      {/* Avatar */}
      <div
        className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 transition-shadow duration-300 shadow-[0_0_18px_4px_rgba(239,145,97,0.25)] hover:shadow-[0_0_48px_16px_rgba(239,145,97,0.55)]"
        style={{ background: 'var(--hp-surface-variant)' }}
      >
        {director.avatar ? (
          <img
            src={director.avatar}
            alt={director.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget
              el.style.display = 'none'
              el.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        <span
          className={`font-display font-bold text-2xl ${director.avatar ? 'hidden' : ''}`}
          style={{ color: 'var(--hp-primary-container)' }}
        >
          {initials(director.name)}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p
          className="font-display font-semibold text-sm leading-tight"
          style={{ color: 'var(--hp-on-surface)' }}
        >
          {director.name}
        </p>
        <p
          className="text-xs"
          style={{ color: 'var(--hp-on-surface-variant)' }}
        >
          {director.title}
        </p>
      </div>

      {/* Links */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="p-2 rounded-lg" asChild>
          <a href={`mailto:${director.email}`} aria-label={`Email ${director.name}`}>
            <Mail className="w-4 h-4" style={{ color: 'var(--hp-on-surface-variant)' }} />
          </a>
        </Button>
        {director.github && (
          <Button variant="ghost" size="sm" className="p-2 rounded-lg" asChild>
            <a
              href={`https://github.com/${director.github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${director.name} on GitHub`}
            >
              <Github className="w-4 h-4" style={{ color: 'var(--hp-on-surface-variant)' }} />
            </a>
          </Button>
        )}
        {director.linkedin && (
          <Button variant="ghost" size="sm" className="p-2 rounded-lg" asChild>
            <a
              href={`https://www.linkedin.com/in/${director.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${director.name} on LinkedIn`}
            >
              <Linkedin className="w-4 h-4" style={{ color: 'var(--hp-on-surface-variant)' }} />
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
  const tTeam = useTranslations('HomePage.leadership')

  return (
    <section
      id="team"
      className="py-32 relative"
      style={{ background: 'var(--hp-lowest)' }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-5 mb-16 max-w-3xl lg:max-w-4xl"
        >
          <div className="section-label">{tTeam('sectionLabel')}</div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: 'var(--hp-on-surface)',
            }}
          >
            {tTeam('title')}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--hp-on-surface-variant)' }}
          >
            {tTeam('intro')}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:justify-between">
          {directors.map((director) => (
            <DirectorCard key={director.name} director={director} />
          ))}
        </div>
      </div>
    </section>
  )
}
