import { useLanguage } from '../hooks/useLanguage'
import { scrollToSection } from '../utils/helpers'
import { SITE, SECTION_IDS } from '../lib/constants'

// Rok se nemění za života aplikace → module level, ne uvnitř komponenty
const CURRENT_YEAR = new Date().getFullYear()

function Footer() {
  const { t } = useLanguage()
  const year = CURRENT_YEAR

  return (
    <footer className="border-t border-border-subtle bg-bg-surface/50 px-4 sm:px-8 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <button
          onClick={() => scrollToSection(SECTION_IDS.hero)}
          className="font-mono text-sm font-medium text-text-muted hover:text-accent transition-colors"
        >
          {SITE.brand}<span className="text-accent">.</span>
        </button>

        {/* Copyright */}
        <p className="text-xs text-text-muted font-mono text-center">
          © {year} {SITE.name} — {t('footer.rights')}
        </p>

        {/* Sociální sítě */}
        <div className="flex items-center gap-4">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
          <span className="text-border text-xs">·</span>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-border text-xs">·</span>
          <a
            href={`mailto:${SITE.email}`}
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
