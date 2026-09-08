import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import type { Locale } from '@/types'

interface SeoProps {
  title: string
  description: string
}

export function Seo({ title, description }: SeoProps) {
  const { i18n } = useTranslation()
  const location = useLocation()
  const locale = (i18n.language.startsWith('en') ? 'en' : 'fr') as Locale
  const url = `https://giovanihouenou.com${location.pathname}`

  useEffect(() => {
    document.title = title
    document.documentElement.lang = locale

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', url, true)
    setMeta('og:type', 'website', true)
    setMeta('og:locale', locale === 'fr' ? 'fr_FR' : 'en_US', true)
    setMeta('twitter:card', 'summary_large_image')

    const ensureHreflang = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`) as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.rel = 'alternate'
        link.hreflang = hreflang
        document.head.appendChild(link)
      }
      link.href = href
    }

    const pathWithoutLocale = location.pathname.replace(/^\/(fr|en)/, '') || ''
    ensureHreflang('fr', `https://giovanihouenou.com/fr${pathWithoutLocale}`)
    ensureHreflang('en', `https://giovanihouenou.com/en${pathWithoutLocale}`)
    ensureHreflang('x-default', `https://giovanihouenou.com/fr${pathWithoutLocale}`)
  }, [title, description, locale, location.pathname, url])

  return null
}
