import { useLanguage } from '../hooks/useLanguage'
import { scrollToSection } from '../utils/helpers'
import { SITE, SECTION_IDS } from '../lib/constants'
import Button from '../components/ui/Button'

function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden"
    >
      {/* Ambientní gradientní záře v pozadí */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-hero pointer-events-none"
      />

      {/* Jemná mřížka v pozadí */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Tagline nad hlavním nadpisem */}
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-text-muted border border-border-subtle rounded-full px-4 py-1.5 bg-bg-surface/50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t('hero.tagline')}
          </span>
        </div>

        {/* Hlavní nadpis – brand */}
        <div className="animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-gradient leading-none">
            {SITE.brand}
          </h1>
        </div>

        {/* Jméno v podpisovém stylu */}
        <div className="animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <p className="font-signature text-3xl sm:text-4xl text-text-secondary font-semibold">
            {SITE.name}
          </p>
        </div>

        {/* Profesionální claim */}
        <div className="animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            {t('hero.claim')}
          </p>
        </div>

        {/* CTA tlačítka */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection(SECTION_IDS.projects)}
          >
            {t('hero.cta_primary')}
            <span aria-hidden="true">↓</span>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollToSection(SECTION_IDS.contact)}
          >
            {t('hero.cta_secondary')}
          </Button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
        <span className="text-xs font-mono">{t('hero.scroll_hint')}</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
      </div>
    </section>
  )
}

export default Hero
