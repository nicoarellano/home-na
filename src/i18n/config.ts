export const locales = ['En', 'Fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'En'
