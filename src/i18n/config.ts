import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonFr from './fr/common.json'
import homeFr from './fr/home.json'
import aboutFr from './fr/about.json'
import domainsFr from './fr/domains.json'
import portfolioFr from './fr/portfolio.json'
import servicesFr from './fr/services.json'
import contactFr from './fr/contact.json'
import testimonialsFr from './fr/testimonials.json'
import blogFr from './fr/blog.json'

import commonEn from './en/common.json'
import homeEn from './en/home.json'
import aboutEn from './en/about.json'
import domainsEn from './en/domains.json'
import portfolioEn from './en/portfolio.json'
import servicesEn from './en/services.json'
import contactEn from './en/contact.json'
import testimonialsEn from './en/testimonials.json'
import blogEn from './en/blog.json'

import { detectBrowserLocale, getStoredLocale } from '@/lib/utils'

void i18n.use(initReactI18next).init({
  resources: {
    fr: {
      common: commonFr,
      home: homeFr,
      about: aboutFr,
      domains: domainsFr,
      portfolio: portfolioFr,
      services: servicesFr,
      contact: contactFr,
      testimonials: testimonialsFr,
      blog: blogFr,
    },
    en: {
      common: commonEn,
      home: homeEn,
      about: aboutEn,
      domains: domainsEn,
      portfolio: portfolioEn,
      services: servicesEn,
      contact: contactEn,
      testimonials: testimonialsEn,
      blog: blogEn,
    },
  },
  lng: getStoredLocale() ?? detectBrowserLocale(),
  fallbackLng: 'fr',
  defaultNS: 'common',
  ns: [
    'common',
    'home',
    'about',
    'domains',
    'portfolio',
    'services',
    'contact',
    'testimonials',
    'blog',
  ],
  interpolation: { escapeValue: false },
  returnNull: false,
})

export default i18n
