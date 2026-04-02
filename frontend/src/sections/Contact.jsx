import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { SECTION_IDS, API_BASE_URL } from '../lib/constants'
import SectionWrapper from '../components/common/SectionWrapper'
import SectionHeading from '../components/common/SectionHeading'
import ScrollReveal from '../components/common/ScrollReveal'
import Button from '../components/ui/Button'

const FORM_STATE = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' }

// Sdílená třída pro všechny formulářové inputy
const INPUT_CLASS =
  'w-full bg-bg-surface border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors duration-200'

function Contact() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState(FORM_STATE.IDLE)
  const [fields, setFields] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState(FORM_STATE.SENDING)

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(fields),
      })
      if (!res.ok) throw new Error('Server error')
      setFormState(FORM_STATE.SUCCESS)
      setFields({ name: '', email: '', message: '' })
    } catch {
      setFormState(FORM_STATE.ERROR)
    }
  }

  return (
    <SectionWrapper id={SECTION_IDS.contact} className="bg-bg-surface/30">
      <div className="max-w-2xl mx-auto">

        <ScrollReveal>
          <SectionHeading
            subtitle={t('contact.subtitle')}
            title={t('contact.title')}
            description={t('contact.description')}
            center
            className="mb-12"
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Jméno – htmlFor/id propojuje label s inputem (a11y) */}
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-medium text-text-secondary">
                {t('contact.name_label')}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={fields.name}
                onChange={handleChange}
                placeholder={t('contact.name_placeholder')}
                className={INPUT_CLASS}
              />
            </div>

            {/* E-mail */}
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium text-text-secondary">
                {t('contact.email_label')}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                value={fields.email}
                onChange={handleChange}
                placeholder={t('contact.email_placeholder')}
                className={INPUT_CLASS}
              />
            </div>

            {/* Zpráva */}
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium text-text-secondary">
                {t('contact.message_label')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={fields.message}
                onChange={handleChange}
                placeholder={t('contact.message_placeholder')}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              disabled={formState === FORM_STATE.SENDING}
            >
              {formState === FORM_STATE.SENDING ? t('contact.sending') : t('contact.submit')}
            </Button>

            {formState === FORM_STATE.SUCCESS && (
              <p className="text-center text-sm text-emerald-400">{t('contact.success')}</p>
            )}
            {formState === FORM_STATE.ERROR && (
              <p className="text-center text-sm text-red-400">{t('contact.error')}</p>
            )}
          </form>
        </ScrollReveal>

      </div>
    </SectionWrapper>
  )
}

export default Contact
