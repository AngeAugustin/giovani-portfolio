import type { RouteKey } from '@/router/paths'

/** Liens de navigation principale - labels via i18n `common:nav.*`. */
export const mainNavKeys = [
  'home',
  'about',
  'domains',
  'portfolio',
  'blog',
  'contact',
] as const satisfies readonly RouteKey[]

export type MainNavKey = (typeof mainNavKeys)[number]

/** Groupes footer - même pattern que l'espace public Rotary. */
export const footerNavGroups = [
  {
    titleKey: 'footer.navTitle' as const,
    keys: ['home', 'about', 'domains', 'portfolio', 'blog', 'contact'] as const satisfies readonly RouteKey[],
  },
  {
    titleKey: 'footer.domainsTitle' as const,
    keys: ['domainCivil', 'domainMedia', 'domainCoach'] as const satisfies readonly RouteKey[],
  },
] as const
