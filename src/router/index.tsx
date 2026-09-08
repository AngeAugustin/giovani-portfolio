import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { detectBrowserLocale, getStoredLocale } from '@/lib/utils'
import { DomainDetailPage } from '@/pages/DomainDetailPage'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const DomainsPage = lazy(() =>
  import('@/pages/DomainsPage').then((m) => ({ default: m.DomainsPage })),
)
const PortfolioPage = lazy(() =>
  import('@/pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
)
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-ink-muted" role="status">
      …
    </div>
  )
}

function defaultLocale() {
  return getStoredLocale() ?? detectBrowserLocale()
}

/** Redirection ancienne route /services → listing domaines. */
function ServicesRedirect() {
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  return <Navigate to={localizedPath('domains', locale)} replace />
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to={`/${defaultLocale()}`} replace />} />

        <Route path="/:lang" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="a-propos" element={<AboutPage />} />
          <Route path="about" element={<AboutPage />} />

          <Route path="domaines" element={<DomainsPage />} />
          <Route path="domains" element={<DomainsPage />} />
          <Route path="domaines/genie-civil" element={<DomainDetailPage domain="civil" />} />
          <Route path="domains/civil-engineering" element={<DomainDetailPage domain="civil" />} />
          <Route path="domaines/tv-mc" element={<DomainDetailPage domain="media" />} />
          <Route path="domains/tv-presenter" element={<DomainDetailPage domain="media" />} />
          <Route path="domaines/coaching" element={<DomainDetailPage domain="coach" />} />
          <Route path="domains/speaking-coach" element={<DomainDetailPage domain="coach" />} />

          <Route path="realisations" element={<PortfolioPage />} />
          <Route path="work" element={<PortfolioPage />} />
          <Route path="realisations/:id" element={<ProjectDetailPage />} />
          <Route path="work/:id" element={<ProjectDetailPage />} />

          <Route path="services" element={<ServicesRedirect />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="*" element={<Navigate to={`/${defaultLocale()}`} replace />} />
      </Routes>
    </Suspense>
  )
}
