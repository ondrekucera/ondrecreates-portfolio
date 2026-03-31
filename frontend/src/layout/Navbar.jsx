import { useState, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { scrollToSection, cx } from '../utils/helpers'
import { SITE, SECTION_IDS } from '../lib/constants'

// Navigační položky – pořadí odpovídá sekcím na stránce
const NAV_ITEMS = [
  { key: 'nav.about', id: SECTION_IDS.about },
  { key: 'nav.skills', id: SECTION_IDS.skills },
  { key: 'nav.projects', id: SECTION_IDS.projects },
  { key: 'nav.contact', id: SECTION_IDS.contact },
]

function Navbar() {
  const { t, lang, toggleLang } = useLanguage()
  const activeSection = useScrollSpy()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Přidá pozadí Navbaru po odscrollování
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <header
      className={cx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg-surface/90 backdrop-blur-md border-b border-border-subtle'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand – neon glow + terminálový kurzor */}
        <button
          onClick={() => handleNavClick(SECTION_IDS.hero)}
          className="navbar-brand-glow font-mono text-sm font-medium text-text-primary hover:text-accent"
        >
          {SITE.brand}
          <span className="text-accent">.</span>
          {/* Blikající _ kurzor – terminal / command line detail */}
          <span className="navbar-cursor text-accent/50 ml-px">_</span>
        </button>

        {/* Desktop navigace */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={cx(
                'text-sm font-medium transition-colors duration-200',
                activeSection === id
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {t(key)}
              {/* Aktivní indikátor */}
              {activeSection === id && (
                <span className="block h-px mt-0.5 bg-gradient-primary rounded-full" />
              )}
            </button>
          ))}

          {/* Jazykový přepínač */}
          <button
            onClick={toggleLang}
            className="text-xs font-mono font-medium text-text-muted hover:text-accent transition-colors duration-200 border border-border rounded px-2 py-1"
          >
            {lang === 'cs' ? 'EN' : 'CZ'}
          </button>
        </div>

        {/* Mobilní hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <span className={cx('block h-px bg-current transition-all duration-300', menuOpen ? 'rotate-45 translate-y-2' : '')} />
            <span className={cx('block h-px bg-current transition-all duration-300', menuOpen ? 'opacity-0' : '')} />
            <span className={cx('block h-px bg-current transition-all duration-300', menuOpen ? '-rotate-45 -translate-y-2' : '')} />
          </div>
        </button>
      </nav>

      {/* Mobilní menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-surface/95 backdrop-blur-md border-b border-border-subtle px-4 py-4 space-y-3">
          {NAV_ITEMS.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="block w-full text-left text-sm font-medium text-text-secondary hover:text-text-primary transition-colors py-1"
            >
              {t(key)}
            </button>
          ))}
          <button
            onClick={() => { toggleLang(); setMenuOpen(false) }}
            className="text-xs font-mono font-medium text-text-muted hover:text-accent transition-colors border border-border rounded px-2 py-1 mt-2"
          >
            {lang === 'cs' ? 'Switch to EN' : 'Přepnout na CZ'}
          </button>
        </div>
      )}
    </header>
  )
}

export default Navbar
