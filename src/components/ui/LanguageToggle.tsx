'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Language } from '@/lib/language'

interface LanguageToggleProps {
  currentLanguage: Language
  onSelect: (language: Language) => void
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: Language.En, label: 'EN' },
  { value: Language.Fr, label: 'FR' },
  { value: Language.Es, label: 'ES' },
]

export default function LanguageToggle({ currentLanguage, onSelect }: LanguageToggleProps) {
  return (
    <Tabs
      value={currentLanguage}
      onValueChange={(value) => onSelect(value as Language)}
    >
      <TabsList className="h-8 gap-1 p-0 bg-transparent">
        {LANGUAGES.map((lang) => (
          <TabsTrigger
            key={lang.value}
            value={lang.value}
            className="h-7 px-2.5 text-xs font-display font-semibold tracking-wider rounded-md border border-transparent bg-transparent shadow-none transition-colors text-[var(--hp-on-surface-variant)] hover:text-[var(--hp-on-surface)] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-[var(--hp-primary-container)] data-[state=active]:text-[var(--hp-primary-container)]"
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
