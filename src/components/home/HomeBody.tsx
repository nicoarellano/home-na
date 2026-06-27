'use client'

import HeroSection from './HeroSection'
import TrustedBySection from './TrustedBySection'
import MissionSection from './MissionSection'
import WhyCdtSection from './WhyCdtSection'
import CapabilitiesSection from './CapabilitiesSection'
import DemosSection from './DemosSection'
import ContactSection from './ContactSection'
import { useContactForm } from './useContactForm'

interface HomeBodyProps {
  assetsUrl: string
}

export function HomeBody({ assetsUrl }: HomeBodyProps) {
  const { handleSubmit, isSubmitting } = useContactForm()

  return (
    <>
      <HeroSection assetsUrl={assetsUrl} />
      <MissionSection />
      <DemosSection assetsUrl={assetsUrl} />
      <WhyCdtSection background="var(--hp-low)" />
      <CapabilitiesSection />
      <TrustedBySection />
      <ContactSection onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
