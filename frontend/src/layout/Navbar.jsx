import { useState, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { scrollToSection, cx } from '../utils/helpers'
import { SITE, SECTION_IDS } from '../lib/constants'
import ThemeToggle from '../components/ui/ThemeToggle'
import LanguageToggle from '../components/ui/LanguageToggle'

// Navigační položky – pořadí odpovídá sekcím na stránce
const NAV_ITEMS = [
  { key: 'nav.about',    id: SECTION_IDS.about    },
  { key: 'nav.skills',   id: SECTION_IDS.skills   },
  { key: 'nav.projects', id: SECTION_IDS.projects },
  { key: 'nav.contact',  id: SECTION_IDS.contact  },
]

function Navbar() {
  const { t } = useLanguage()
  const activeSection = useScrollSpy()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Přidá pozadí navbaru po odscrollování
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
      {/* ── Desktop navbar – 3-column layout ─────────────────────────────── */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 grid grid-cols-3 items-center">

        {/* LEFT – brand + blikající kurzor */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavClick(SECTION_IDS.hero)}
            className="navbar-brand-glow font-mono text-sm font-medium text-text-primary hover:text-accent transition-colors"
            aria-label="Zpět na začátek"
          >
            {SITE.brand}
            <span className="text-accent">.</span>
            {/* Terminálový _ kurzor – bliká, developer detail */}
            <span className="navbar-cursor text-accent/50 ml-px" aria-hidden="true">_</span>
          </button>
        </div>

        {/* CENTER – hlavní navigace (pouze desktop)
            Jak upravit spacing mezi položkami: uprav gap-8                  */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {NAV_ITEMS.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={cx(
                'relative text-sm font-medium transition-colors duration-200',
                activeSection === id
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {t(key)}
              {/* Aktivní sekce – tečka nebo linka pod textem                */}
              {activeSection === id && (
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-primary rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* RIGHT – jazykový + theme přepínač (pouze desktop)
            Na mobilu jsou přepínače v mobilním menu níže                    */}
        <div className="flex items-center justify-end gap-2">
          {/* Přepínače viditelné pouze na desktopu */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobilní hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-1.5 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={menuOpen}
          >
            <span className={cx('block w-5 h-px bg-current transition-all duration-300 origin-center', menuOpen ? 'rotate-45 translate-y-[7px]' : '')} />
            <span className={cx('block w-5 h-px bg-current transition-all duration-300', menuOpen ? 'opacity-0 scale-x-0' : '')} />
            <span className={cx('block w-5 h-px bg-current transition-all duration-300 origin-center', menuOpen ? '-rotate-45 -translate-y-[7px]' : '')} />
          </button>
        </div>
      </nav>

      {/* ── Mobilní menu ─────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden bg-bg-surface/96 backdrop-blur-lg border-b border-border-subtle">
          <div className="max-w-6xl mx-auto px-4 py-5 space-y-1">

            {/* Nav položky */}
            {NAV_ITEMS.map(({ key, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={cx(
                  'block w-full text-left text-sm font-medium py-2.5 px-2 rounded-lg transition-colors duration-150',
                  activeSection === id
                    ? 'text-text-primary bg-bg-surface-2/50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-2/30'
                )}
              >
                {t(key)}
              </button>
            ))}

            {/* Oddělovač */}
            <div className="border-t border-border-subtle my-3 pt-3">
              {/* Přepínače v jednom řádku */}
              <div className="flex items-center gap-3 px-2">
                <span className="text-xs font-mono text-text-muted">
                  {/* Popis pro screen readery */}
                </span>
                <LanguageToggle onAfterToggle={() => setMenuOpen(false)} />
                <ThemeToggle />
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
