'use client'

import HeroSection from './HeroSection'
import TrustedBySection from './TrustedBySection'
import MissionSection from './MissionSection'
import CapabilitiesSection from './CapabilitiesSection'
import DemosSection from './DemosSection'
import TrustBandSection from './TrustBandSection'
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
      <TrustedBySection />
      <MissionSection />
      <CapabilitiesSection />
      <DemosSection assetsUrl={assetsUrl} />
      <TrustBandSection />
      <ContactSection onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
