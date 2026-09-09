import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FilterBar } from '@/components/ui/FilterBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { BlogCard } from '@/components/ui/BlogCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CtaBand } from '@/components/sections/home'
import { blogPosts } from '@/domains/content'
import { localizedPath } from '@/router/paths'
import type { DomainId, Locale } from '@/types'

const filters: Array<'all' | DomainId> = ['all', 'civil', 'media', 'coach']

/**
 * Listing blog - hero watermark + filtres domaine + grille d'articles.
 */
export function BlogPage() {
  const { t } = useTranslation(['blog', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const [filter, setFilter] = useState<'all' | DomainId>('all')

  const filtered = useMemo(() => {
    const list =
      filter === 'all' ? blogPosts : blogPosts.filter((p) => p.domain === filter)
    return [...list].sort((a, b) => b.date.localeCompare(a.date))
  }, [filter])

  return (
    <>
      <Seo title={t('blog:meta.title')} description={t('blog:meta.description')} />

      <div className="bg-home-mosaic">
        <section className="relative overflow-hidden pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
          <Container className="relative">
            <Link
              to={localizedPath('home', locale)}
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden />
              {t('blog:backHome')}
            </Link>

            <div className="relative mt-10 max-w-3xl md:mt-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 top-0 -z-0 select-none font-display text-[clamp(4.5rem,16vw,9rem)] font-semibold leading-none tracking-[-0.05em] text-primary-deep/[0.06] sm:-left-4"
              >
                {t('blog:watermark')}
              </span>

              <Badge tone="muted" className="relative rounded-full px-3.5 normal-case tracking-[0.08em]">
                {t('blog:eyebrow')}
              </Badge>

              <h1 className="relative mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-primary-deep text-balance">
                {t('blog:title')}
              </h1>

              <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg md:text-xl">
                {t('blog:subtitle')}
              </p>

              <div className="relative mt-8">
                <Button asChild size="lg" variant="primary">
                  <Link to={localizedPath('contact', locale)}>
                    {t('blog:ctaContact')}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <Section className="!pt-2 md:!pt-4">
          <ScrollReveal className="mb-8 sm:mb-10">
            <FilterBar
              variant="pills"
              label={t('blog:filterLabel')}
              filters={filters.map((f) => ({
                id: f,
                label: f === 'all' ? t('common:domains.all') : t(`common:domains.${f}`),
                active: filter === f,
                onClick: () => setFilter(f),
              }))}
            />
          </ScrollReveal>

          {filtered.length === 0 ? (
            <EmptyState message={t('blog:empty')} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
              {filtered.map((post, i) => (
                <ScrollReveal key={post.id} delay={Math.min(i, 5) * 0.05}>
                  <BlogCard
                    id={post.id}
                    domain={post.domain}
                    date={post.date}
                    readMinutes={post.readMinutes}
                    image={post.image}
                    href={localizedPath('post', locale, post.id)}
                    locale={locale}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </Section>

        <CtaBand />
      </div>
    </>
  )
}
