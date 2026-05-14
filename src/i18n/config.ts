export const locales = ['En', 'Fr', 'Es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'En'
