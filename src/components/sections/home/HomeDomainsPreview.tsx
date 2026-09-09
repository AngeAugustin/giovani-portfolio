import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DomainRow } from '@/components/ui/DomainRow'
import { TextLink } from '@/components/ui/TextLink'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

const domains = [
  {
    key: 'civil' as const,
    route: 'domainCivil' as const,
    index: '01',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop',
    descKey: 'civilDesc' as const,
  },
  {
    key: 'media' as const,
    route: 'domainMedia' as const,
    index: '02',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80&auto=format&fit=crop',
    descKey: 'mediaDesc' as const,
    reverse: true,
  },
  {
    key: 'coach' as const,
    route: 'domainCoach' as const,
    index: '03',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80&auto=format&fit=crop',
    descKey: 'coachDesc' as const,
  },
]

/** Section Univers - bandeau autonome (fond blanc opaque), distinct du hero mosaïque. */
export function HomeDomainsPreview() {
  const { t } = useTranslation(['home', 'common', 'domains'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale

  return (
    <Section id="univers" className="border-y border-border bg-surface">
      <SectionHeader
        eyebrow={t('home:domainsPreview.eyebrow')}
        title={t('home:domainsPreview.title')}
        description={t('home:domainsPreview.subtitle')}
        action={{
          label: t('home:domainsPreview.viewAll'),
          to: localizedPath('domains', locale),
        }}
      />

      <div>
        {domains.map((d) => (
          <DomainRow
            key={d.key}
            index={d.index}
            title={t(`common:domains.${d.key}`)}
            tagline={t(`domains:${d.key}.tagline`)}
            description={t(`home:domainsPreview.${d.descKey}`)}
            href={localizedPath(d.route, locale)}
            image={d.image}
            reverse={d.reverse}
            ctaLabel={t('home:domainsPreview.explore')}
          />
        ))}
      </div>
    </Section>
  )
}
