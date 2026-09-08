import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  domain: z.enum(['civil', 'media', 'coach'], {
    required_error: 'domain',
    invalid_type_error: 'domain',
  }),
  message: z.string().min(20),
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const { t } = useTranslation(['contact', 'common'])
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      // Mock send — ready to wire Resend / EmailJS
      await new Promise((r) => setTimeout(r, 900))
      console.info('Contact form submission', data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-soft">
            {t('contact:form.name')}
          </label>
          <input id="name" className={fieldClass} {...register('name')} />
          {errors.name && (
            <p className="mt-1 text-sm text-accent">{t('contact:form.errors.name')}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-soft">
            {t('contact:form.email')}
          </label>
          <input id="email" type="email" className={fieldClass} {...register('email')} />
          {errors.email && (
            <p className="mt-1 text-sm text-accent">{t('contact:form.errors.email')}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink-soft">
            {t('contact:form.subject')}
          </label>
          <input id="subject" className={fieldClass} {...register('subject')} />
          {errors.subject && (
            <p className="mt-1 text-sm text-accent">{t('contact:form.errors.subject')}</p>
          )}
        </div>
        <div>
          <label htmlFor="domain" className="mb-1.5 block text-sm font-medium text-ink-soft">
            {t('contact:form.domain')}
          </label>
          <select id="domain" className={cn(fieldClass, 'bg-surface')} {...register('domain')} defaultValue="">
            <option value="" disabled>
              {t('contact:form.domainPlaceholder')}
            </option>
            <option value="civil">{t('common:domains.civil')}</option>
            <option value="media">{t('common:domains.media')}</option>
            <option value="coach">{t('common:domains.coach')}</option>
          </select>
          {errors.domain && (
            <p className="mt-1 text-sm text-accent">{t('contact:form.errors.domain')}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-soft">
          {t('contact:form.message')}
        </label>
        <textarea id="message" rows={5} className={fieldClass} {...register('message')} />
        {errors.message && (
          <p className="mt-1 text-sm text-accent">{t('contact:form.errors.message')}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full touch-manipulation sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? t('common:cta.sending') : t('common:cta.send')}
      </Button>

      {status === 'success' && (
        <p className="text-sm font-medium text-primary" role="status">
          {t('contact:form.success')}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm font-medium text-accent" role="alert">
          {t('contact:form.error')}
        </p>
      )}
    </form>
  )
}
