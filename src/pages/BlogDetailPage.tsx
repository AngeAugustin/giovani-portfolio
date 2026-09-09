import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DetailLayout } from '@/components/ui/DetailLayout'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BlogCard } from '@/components/ui/BlogCard'
import { blogPosts } from '@/domains/content'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

interface BlogSection {
  heading?: string
  paragraphs: string[]
}

/**
 * Détail article - hero overlay + corps éditorial + articles liés.
 */
export function BlogDetailPage() {
  const { t, i18n } = useTranslation(['blog', 'common'])
  const { lang, id } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    return <Navigate to={localizedPath('blog', locale)} replace />
  }

  const base = `blog:items.${post.id}`
  const title = t(`${base}.title`)
  const sections = t(`${base}.sections`, { returnObjects: true }) as BlogSection[]
  const related = blogPosts
    .filter((p) => p.id !== post.id && p.domain === post.domain)
    .slice(0, 2)

  const formattedDate = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.date))

  return (
    <>
      <Seo title={`${title} - Giovani HOUENOU`} description={t(`${base}.excerpt`)} />

      <DetailLayout
        backTo={localizedPath('blog', locale)}
        backLabel={t('blog:detail.back')}
        title={title}
        coverImage={post.image}
        heroLayout="overlay"
        contentWidth="article"
        badge={<Badge tone="invert">{t(`common:domains.${post.domain}`)}</Badge>}
        meta={
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            <p>
              <span className="text-white/45">{t('blog:detail.date')} </span>
              <time dateTime={post.date}>{formattedDate}</time>
            </p>
            <p>{t('blog:readTime', { count: post.readMinutes })}</p>
          </div>
        }
      >
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {t(`${base}.lead`)}
        </p>

        <div className="mt-12 space-y-12 border-t border-border pt-12 sm:mt-14 sm:space-y-14 sm:pt-14">
          {sections.map((section) => (
            <section key={section.heading ?? section.paragraphs[0]}>
              {section.heading && (
                <h2 className="font-display text-2xl text-ink sm:text-3xl">{section.heading}</h2>
              )}
              <div className={section.heading ? 'mt-4 space-y-4' : 'space-y-4'}>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="text-base leading-relaxed text-ink-soft sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
            <SectionHeader
              title={t('blog:detail.related')}
              action={{
                label: t('blog:detail.back'),
                to: localizedPath('blog', locale),
              }}
            />
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
              {related.map((item) => (
                <BlogCard
                  key={item.id}
                  id={item.id}
                  domain={item.domain}
                  date={item.date}
                  readMinutes={item.readMinutes}
                  image={item.image}
                  href={localizedPath('post', locale, item.id)}
                  locale={i18n.language.startsWith('en') ? 'en' : 'fr'}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 border border-border bg-primary-soft/40 p-6 sm:mt-20 sm:p-8 md:flex md:items-end md:justify-between md:gap-10 md:p-10">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {t('blog:detail.ctaTitle')}
            </h2>
            <p className="mt-3 text-ink-muted sm:text-lg">{t('blog:detail.ctaText')}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
            <Button asChild size="lg" variant="primary">
              <Link to={localizedPath('contact', locale)}>
                {t('common:cta.contact')}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to={localizedPath('blog', locale)}>{t('blog:detail.back')}</Link>
            </Button>
          </div>
        </section>
      </DetailLayout>
    </>
  )
}
