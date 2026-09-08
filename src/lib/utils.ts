export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function getStoredLocale(): 'fr' | 'en' | null {
  const stored = localStorage.getItem('giovani-locale')
  if (stored === 'fr' || stored === 'en') return stored
  return null
}

export function detectBrowserLocale(): 'fr' | 'en' {
  const lang = navigator.language.toLowerCase()
  return lang.startsWith('fr') ? 'fr' : 'en'
}
