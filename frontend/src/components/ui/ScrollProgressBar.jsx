import { useRef, useEffect } from 'react'

// ─── ScrollProgressBar ────────────────────────────────────────────────────────
//
// Tenký 1px progress bar přichycený k horní hraně stránky.
//
// Chování:
//   Roste od STŘEDU do STRAN (transform-origin: center, scaleX 0→1).
//   Reaguje OKAMŽITĚ na scroll – žádná CSS transition, přímá DOM manipulace.
//   will-change: transform → GPU compositing, žádné trhání.
//
// Proč useRef místo useState:
//   setState → React re-render (batching, scheduling) → viditelný lag při rychlém scrollu.
//   barRef.current.style.transform → přímý zápis do DOM, synchronní s onScroll.
//   Výsledek: instantní vizuální odezva bez trhání.
//
// Jak upravit:
//   Výška:          h-px (1px) → h-[2px] (výraznější)
//   Viditelnost:    via-accent/55 → via-accent (plná intenzita)
//   Plynulost:      willChange + passive listener jsou dostatečné
// ─────────────────────────────────────────────────────────────────────────────

function ScrollProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      // Přímý zápis do DOM – bez React re-renderu, bez batching delay
      bar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`
    }

    window.addEventListener('scroll', update, { passive: true })
    update() // inicializace – stránka může být scrollnutá při renderu

    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[61] h-px pointer-events-none"
    >
      {/* Gradient: accent/25 → accent/55 → accent/25 ≈ 50 % viditelnosti
          transformOrigin center: bar roste symetricky od středu do obou stran
          willChange transform: GPU composite layer – bez layout / paint cost  */}
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-accent/25 via-accent/55 to-accent/25"
        style={{
          transform:       'scaleX(0)',
          transformOrigin: 'center',
          willChange:      'transform',
        }}
      />
    </div>
  )
}

export default ScrollProgressBar
