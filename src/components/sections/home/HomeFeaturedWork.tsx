import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { projects } from '@/domains/content'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

export function HomeFeaturedWork() {
  const { t } = useTranslation(['home', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const featured = projects.filter((p) => p.featured)
  const [lead, ...rest] = featured

  return (
    <Section tone="primary" flush>
      {/* Atmosphere full-bleed - bleu primaire + touche accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 100% -10%, rgb(22 86 201 / 0.65), transparent 55%),
            radial-gradient(ellipse 40% 35% at 0% 100%, rgb(255 122 48 / 0.14), transparent 50%)
          `,
        }}
      />

      <Container className="relative">
        <SectionHeader
          tone="onDark"
          eyebrow={t('home:featured.eyebrow')}
          title={t('home:featured.title')}
          description={t('home:featured.subtitle')}
          action={{
            label: t('common:cta.allProjects'),
            to: localizedPath('portfolio', locale),
          }}
        />

        {lead && (
          <ScrollReveal>
            <ProjectCard
              id={lead.id}
              domain={lead.domain}
              year={lead.year}
              image={lead.image}
              href={localizedPath('project', locale, lead.id)}
              layout="featured"
            />
          </ScrollReveal>
        )}

        {rest.length > 0 && (
          <div className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-2">
            {rest.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.06}>
                <ProjectCard
                  id={project.id}
                  domain={project.domain}
                  year={project.year}
                  image={project.image}
                  href={localizedPath('project', locale, project.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
