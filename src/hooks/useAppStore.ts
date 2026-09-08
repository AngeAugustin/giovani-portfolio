import { create } from 'zustand'
import type { Locale } from '@/types'

interface AppState {
  locale: Locale
  setLocale: (locale: Locale) => void
  loaderDone: boolean
  setLoaderDone: (done: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'fr',
  setLocale: (locale) => {
    localStorage.setItem('giovani-locale', locale)
    set({ locale })
  },
  loaderDone: false,
  setLoaderDone: (done) => set({ loaderDone: done }),
}))
