'use client'

import { useState, useEffect } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import TrustBandSection from './TrustBandSection'
import MissionSection from './MissionSection'
import CapabilitiesSection from './CapabilitiesSection'
import DemosSection from './DemosSection'
import SolutionsSection from './SolutionsSection'
import AboutSection from './AboutSection'
import DeveloperPlatformSection from './DeveloperPlatformSection'
import TeamSection from './TeamSection'
import ContactSection from './ContactSection'
import Footer from './Footer'
import { Language } from '@/lib/language'

interface HomeProps {
  assetsUrl: string
}

export function Home({ assetsUrl }: HomeProps) {
  const [activeSection, setActiveSection] = useState('capabilities')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const locale = useLocale() as Language
  const router = useRouter()
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1])
  const navY = useSpring(useTransform(scrollY, [0, 100], [0, 0]), { stiffness: 300, damping: 30 })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', true)

    const handleScroll = () => {
      const sections = ['capabilities', 'solutions', 'developers', 'contact']
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const selectLanguage = (target: Language) => {
    if (target === locale) return
    router.replace(pathname, { locale: target })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      organization: formData.get('organization') as string,
      message: formData.get('message') as string,
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      toast.error('Contact form is not configured', {
        description: 'Please email us directly at info@collabdt.org',
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Contact Form: Message from ${data.firstName} ${data.lastName}`,
          from_name: `${data.firstName} ${data.lastName}`,
          replyto: data.email,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          organization: data.organization || '(not provided)',
          message: data.message,
        }),
      })

      const result = await response.json().catch(() => ({ success: false }))
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message')
      }

      toast.success('Message Sent!', {
        description: 'Thank you for reaching out. We will get back to you soon.',
      })

      form.reset()
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later or email us directly at info@collabdt.org',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="hp min-h-screen bg-background text-foreground">
      <Toaster richColors />
      <Navbar
        activeSection={activeSection}
        theme={theme}
        locale={locale}
        navOpacity={navOpacity}
        navY={navY}
        onToggleTheme={toggleTheme}
        onSelectLanguage={selectLanguage}
        onScrollToSection={scrollToSection}
      />
      <HeroSection assetsUrl={assetsUrl} />
      <TrustBandSection />
      <MissionSection />
      <CapabilitiesSection />
      <DemosSection assetsUrl={assetsUrl} />
      <SolutionsSection />
      <AboutSection />
      <DeveloperPlatformSection />
      <TeamSection />
      <ContactSection onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <Footer />
    </div>
  )
}
