import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['En', 'Fr', 'Es'],
  defaultLocale: 'En',
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
