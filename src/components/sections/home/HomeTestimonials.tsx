import { useTranslation } from 'react-i18next'
import { useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { QuoteBlock } from '@/components/ui/QuoteBlock'
import { testimonials } from '@/domains/content'

export function HomeTestimonials() {
  const { t } = useTranslation(['home', 'testimonials'])
  const reduce = useReducedMotion()

  const cards = testimonials.map((item) => ({
    id: item.id,
    quote: t(`testimonials:items.${item.id}.quote`),
    author: t(`testimonials:items.${item.id}.author`),
    role: t(`testimonials:items.${item.id}.role`),
  }))

  const loop = [...cards, ...cards]

  return (
    <Section>
      <SectionHeader
        eyebrow={t('home:testimonials.eyebrow')}
        title={t('home:testimonials.title')}
        description={t('home:testimonials.subtitle')}
      />

      {reduce ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <QuoteBlock
              key={card.id}
              quote={card.quote}
              author={card.author}
              role={card.role}
            />
          ))}
        </div>
      ) : (
        <div
          className="overflow-hidden"
          role="region"
          aria-label={t('home:testimonials.title')}
        >
          <ul className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]">
            {loop.map((card, i) => (
              <li
                key={`${card.id}-${i}`}
                className="w-[min(85vw,22rem)] shrink-0 sm:w-[24rem]"
                aria-hidden={i >= cards.length}
              >
                <QuoteBlock
                  quote={card.quote}
                  author={card.author}
                  role={card.role}
                  className="min-h-[17.5rem]"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
