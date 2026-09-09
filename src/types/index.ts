export type Locale = 'fr' | 'en'

export type DomainId = 'civil' | 'media' | 'coach'

export interface NavItem {
  key: string
  pathFr: string
  pathEn: string
}

export interface Project {
  id: string
  domain: DomainId
  year: string
  image: string
  featured?: boolean
}

export interface BlogPost {
  id: string
  domain: DomainId
  date: string
  readMinutes: number
  image: string
  featured?: boolean
}

export interface Testimonial {
  id: string
  domain: DomainId
  rating: number
}

export interface ServiceItem {
  id: string
  domain: DomainId
  icon: string
}
