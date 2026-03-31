import { useLanguage } from '../hooks/useLanguage'
import { SITE, SECTION_IDS } from '../lib/constants'
import SectionWrapper from '../components/common/SectionWrapper'
import ScrollReveal from '../components/common/ScrollReveal'

function About() {
  const { t } = useLanguage()

  return (
    <SectionWrapper id={SECTION_IDS.about}>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Textová část */}
        <div className="space-y-8">
          <ScrollReveal>
            <div className="space-y-2">
              <p className="text-xs font-mono text-accent tracking-widest uppercase">
                {t('about.subtitle')}
              </p>
              <h2 className="text-4xl font-bold text-text-primary">
                {t('about.title')}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-text-secondary leading-relaxed text-base">
              {t('about.paragraph1')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-text-secondary leading-relaxed text-base">
              {t('about.paragraph2')}
            </p>
          </ScrollReveal>

          {/* Meta info */}
          <ScrollReveal delay={300}>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-text-muted font-mono">📍</span>
                <span className="text-text-secondary">{t('about.location')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-text-muted font-mono">💼</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-medium">{t('about.status')}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Vizuální část – dekorativní blok */}
        <ScrollReveal delay={150} className="flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            {/* Vnější glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-10 blur-2xl scale-110" />
            {/* Karta s iniciálami / placeholderem pro foto */}
            <div className="relative w-full h-full rounded-3xl bg-bg-surface border border-border-subtle flex items-center justify-center overflow-hidden">
              <div className="text-center space-y-2">
                <span className="font-signature text-6xl text-gradient font-bold">
                  OK
                </span>
                <p className="text-xs font-mono text-text-muted">{SITE.name}</p>
              </div>
              {/* Dekorativní roh */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-accent/30 rounded-br-lg" />
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-accent/30 rounded-tl-lg" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  )
}

export default About
