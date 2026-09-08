# Portfolio Giovani HOUENOU

Site vitrine bilingue (FR/EN) pour Giovani HOUENOU — ingénieur en génie civil, présentateur TV & maître de cérémonie, coach en prise de parole.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (design tokens)
- React Router (routes `/fr/...` et `/en/...`)
- react-i18next
- Framer Motion
- React Hook Form + Zod
- Zustand

## Démarrage

```bash
npm install
npm run dev
```

Build production :

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── components/
│   ├── ui/           # Button, Eyebrow, MediaFrame, ProjectCard, DomainRow,
│   │                 # QuoteBlock, PageHero, Section, DetailLayout…
│   ├── layout/       # Header, Footer, MobileDrawer, SkipLink, RootLayout
│   └── sections/
│       ├── home/     # HomeHero (brand-first), Domains, Featured, Quotes, CTA
│       └── contact/  # ContactForm
├── constants/        # layout + navigation
├── domains/          # données projets / services / témoignages
├── i18n/fr|en
├── pages/
├── router/
├── styles/tokens.css # tokens « Scène + Structure »
└── types/
```

Direction artistique : **scène + structure** — blanc éditorial, bleu d'autorité, orange cue light (5–10%), typo Fraunces / Outfit.
## Éditer les contenus

| Contenu | Fichier |
|--------|---------|
| Textes UI, nav, footer | `src/i18n/{fr,en}/common.json` |
| Accueil | `src/i18n/{fr,en}/home.json` |
| À propos | `src/i18n/{fr,en}/about.json` |
| Domaines | `src/i18n/{fr,en}/domains.json` |
| Projets (textes) | `src/i18n/{fr,en}/portfolio.json` |
| Liste projets / images | `src/domains/content.ts` |
| Services | `src/i18n/{fr,en}/services.json` |
| Contact | `src/i18n/{fr,en}/contact.json` |
| Témoignages | `src/i18n/{fr,en}/testimonials.json` |

## Design tokens

Couleurs, typo et spacing : `src/styles/tokens.css` + miroir documentaire `tailwind.config.ts`.

- Primaire : `#0B3D91` / `#1656C9` / `#E8F0FE`
- Accent : `#FF7A30`
- Display : Syne · Corps : Figtree

## Formulaire de contact

Le formulaire valide via Zod et simule un envoi (console). Brancher Resend ou EmailJS dans `src/components/sections/contact/ContactForm.tsx`.

## Déploiement

Compatible Vercel / Netlify. Le rewrite SPA est géré par le fallback Vite ; sur Vercel, un `vercel.json` optionnel peut rediriger toutes les routes vers `index.html`.
