import type { Locale } from '@/types'

/** Translated path segments per locale — mirrors augustinfachehoun.pro bilingual slugs */
export const routes = {
  home: { fr: '', en: '' },
  about: { fr: 'a-propos', en: 'about' },
  domains: { fr: 'domaines', en: 'domains' },
  domainCivil: { fr: 'domaines/genie-civil', en: 'domains/civil-engineering' },
  domainMedia: { fr: 'domaines/tv-mc', en: 'domains/tv-presenter' },
  domainCoach: { fr: 'domaines/coaching', en: 'domains/speaking-coach' },
  portfolio: { fr: 'realisations', en: 'work' },
  project: { fr: 'realisations', en: 'work' },
  contact: { fr: 'contact', en: 'contact' },
} as const

export type RouteKey = keyof typeof routes

export function localizedPath(key: RouteKey, locale: Locale, id?: string): string {
  const segment = routes[key][locale]
  const base = `/${locale}${segment ? `/${segment}` : ''}`
  return id ? `${base}/${id}` : base
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return `/${nextLocale}`

  const currentLocale = parts[0] === 'en' || parts[0] === 'fr' ? parts[0] : null
  const rest = currentLocale ? parts.slice(1) : parts

  if (rest.length === 0) return `/${nextLocale}`

  const pathMap: Record<string, Record<Locale, string>> = {
    'a-propos': { fr: 'a-propos', en: 'about' },
    about: { fr: 'a-propos', en: 'about' },
    domaines: { fr: 'domaines', en: 'domains' },
    domains: { fr: 'domaines', en: 'domains' },
    'genie-civil': { fr: 'genie-civil', en: 'civil-engineering' },
    'civil-engineering': { fr: 'genie-civil', en: 'civil-engineering' },
    'tv-mc': { fr: 'tv-mc', en: 'tv-presenter' },
    'tv-presenter': { fr: 'tv-mc', en: 'tv-presenter' },
    coaching: { fr: 'coaching', en: 'speaking-coach' },
    'speaking-coach': { fr: 'coaching', en: 'speaking-coach' },
    realisations: { fr: 'realisations', en: 'work' },
    work: { fr: 'realisations', en: 'work' },
    services: { fr: 'services', en: 'services' },
    contact: { fr: 'contact', en: 'contact' },
  }

  const mapped = rest.map((seg) => pathMap[seg]?.[nextLocale] ?? seg)
  return `/${nextLocale}/${mapped.join('/')}`
}
