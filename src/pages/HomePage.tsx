import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/ui/Seo'
import {
  HomeHero,
  HomeDomainsPreview,
  HomeFeaturedWork,
  HomeTestimonials,
  HomeCtaBand,
} from '@/components/sections/home'

export function HomePage() {
  const { t } = useTranslation('home')

  return (
    <>
      <Seo title={t('meta.title')} description={t('meta.description')} />

      {/* Hero - mosaïque */}
      <div className="bg-home-mosaic">
        <HomeHero />
      </div>

      {/* Univers - section à part */}
      <HomeDomainsPreview />

      {/* Suite - mosaïque sous les bandes colorées */}
      <div className="bg-home-mosaic">
        <HomeFeaturedWork />
        <HomeTestimonials />
        <HomeCtaBand />
      </div>
    </>
  )
}
