import { useTranslation } from 'react-i18next'

export function SkipLink() {
  const { t } = useTranslation('common')

  return (
    <a
      href="#main-content"
      className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:block focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:rounded-[var(--radius-md)] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:[clip:auto]"
    >
      {t('a11y.skip')}
    </a>
  )
}
