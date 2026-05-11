'use client'

import { useState, useEffect } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ContributorsSection from './ContributorsSection'
import ContactSection from './ContactSection'
import Footer from './Footer'
import { Language } from '@/lib/language'

interface HomeProps {
  assetsUrl: string
}

export function Home({ assetsUrl }: HomeProps) {
  const [activeSection, setActiveSection] = useState('about')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const locale = useLocale() as Language
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState(locale)
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1])
  const navY = useSpring(useTransform(scrollY, [0, 100], [0, 0]), { stiffness: 300, damping: 30 })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', true)

    const handleScroll = () => {
      const sections = ['about', 'contributors', 'contact']
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

  const toggleLanguage = () => {
    const homeLocales = [Language.En, Language.Fr]
    const currentIndex = homeLocales.indexOf(currentLocale)
    const nextLocale = homeLocales[(currentIndex + 1) % homeLocales.length]

    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)
    document.cookie = `NEXT_LOCALE=${nextLocale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`

    setCurrentLocale(nextLocale)
    router.refresh()
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
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
        locale={currentLocale}
        navOpacity={navOpacity}
        navY={navY}
        onToggleTheme={toggleTheme}
        onToggleLanguage={toggleLanguage}
        onScrollToSection={scrollToSection}
      />
      <HeroSection assetsUrl={assetsUrl} />
      <AboutSection />
      <ContributorsSection />
      <ContactSection onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <Footer />
    </div>
  )
}
