import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import gsap from '../lib/gsap'
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

// Props:
//   animate (bool) – při false jsou center + right bloky skryty (opacity: 0)
//                    a animují se až po dokončení preloaderu
//                    Brand vlevo NIKDY neskrývat – musí být viditelný hned
function Navbar({ animate = true }) {
  const { t } = useLanguage()
  const activeSection = useScrollSpy()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Refs pro GSAP reveal center + right bloků
  const centerRef = useRef(null)
  const rightRef  = useRef(null)

  // Přidá pozadí navbaru po odscrollování
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Initial hide: skryj center + right před preloaderem (jen při 1. návštěvě)
  // useLayoutEffect: synchronně před malováním → žádný záblesk viditelnosti
  useLayoutEffect(() => {
    if (animate) return          // revisit: neanimovat, vše zobrazit ihned
    if (!centerRef.current || !rightRef.current) return
    gsap.set([centerRef.current, rightRef.current], { opacity: 0, y: -5 })
  }, [animate])

  // ── Reveal animace: spustí se když animate přejde false → true
  // Delay 0.45s: stránka má čas se rozfadovat, brand zůstane „kotvou"
  useEffect(() => {
    if (!animate) return
    if (!centerRef.current || !rightRef.current) return
    const ctx = gsap.context(() => {
      gsap.to([centerRef.current, rightRef.current], {
        opacity:  1,
        y:        0,
        duration: 0.5,
        stagger:  0.1,
        ease:     'power2.out',
        delay:    0.45,
      })
    })
    return () => ctx.revert()
  }, [animate])

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
      {/* ── Desktop navbar ──────────────────────────────────────────────────
          w-full: nav pokrývá celou šířku viewportu → brand vlevo u kraje,
          toggles vpravo u kraje (stejný padding jako Preloader inner div)
          px-6 sm:px-8: brand/toggles = 24/32px od okraje – čisté a premium
          grid-cols-[1fr_auto_1fr]: center = auto width, outer = rovnoměrný zbytek
          POZOR: tyto třídy MUSÍ být shodné s Preloader vnitřním kontejnerem
                 aby byl brand pixel-perfect zarovnaný                       */}
      <nav className="w-full px-6 sm:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center">

        {/* LEFT – brand + kurzor (NIKDY neskrývat – slouží jako „kotva"
            při preloader → navbar brand přechodu)                         */}
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
            ref: GSAP reveal po preloaderu
            Jak upravit spacing: uprav gap-8                               */}
        <div ref={centerRef} className="hidden md:flex items-center justify-center gap-8">
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
              {/* Aktivní sekce – linka pod textem */}
              {activeSection === id && (
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-primary rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* RIGHT – jazykový + theme přepínač + hamburger
            ref: GSAP reveal po preloaderu (spolu s center, se staggerem)  */}
        <div ref={rightRef} className="flex items-center justify-end gap-2">
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
          <div className="px-6 sm:px-8 py-5 space-y-1">

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

            {/* Oddělovač + přepínače */}
            <div className="border-t border-border-subtle my-3 pt-3">
              <div className="flex items-center gap-3 px-2">
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
