import type { DomainId, Project, ServiceItem, Testimonial } from '@/types'

export const projects: Project[] = [
  {
    id: 'pont-cotonou',
    domain: 'civil',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'complexe-residential',
    domain: 'civil',
    year: '2022',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'voirie-porto',
    domain: 'civil',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'emission-prime',
    domain: 'media',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'gala-national',
    domain: 'media',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'conference-ceo',
    domain: 'media',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'atelier-executives',
    domain: 'coach',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'masterclass-youth',
    domain: 'coach',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'coaching-politique',
    domain: 'coach',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&auto=format&fit=crop',
  },
]

export const testimonials: Testimonial[] = [
  { id: 't1', domain: 'civil', rating: 5 },
  { id: 't2', domain: 'media', rating: 5 },
  { id: 't3', domain: 'coach', rating: 5 },
  { id: 't4', domain: 'media', rating: 5 },
  { id: 't5', domain: 'coach', rating: 5 },
  { id: 't6', domain: 'civil', rating: 5 },
]

export const services: ServiceItem[] = [
  { id: 's1', domain: 'civil', icon: 'building' },
  { id: 's2', domain: 'civil', icon: 'ruler' },
  { id: 's3', domain: 'media', icon: 'mic' },
  { id: 's4', domain: 'media', icon: 'tv' },
  { id: 's5', domain: 'coach', icon: 'users' },
  { id: 's6', domain: 'coach', icon: 'sparkles' },
]

export const domainMeta: Record<
  DomainId,
  { pathFr: string; pathEn: string; accentClass: string }
> = {
  civil: {
    pathFr: 'genie-civil',
    pathEn: 'civil-engineering',
    accentClass: 'text-primary',
  },
  media: {
    pathFr: 'tv-mc',
    pathEn: 'tv-presenter',
    accentClass: 'text-accent',
  },
  coach: {
    pathFr: 'coaching',
    pathEn: 'speaking-coach',
    accentClass: 'text-primary-deep',
  },
}
