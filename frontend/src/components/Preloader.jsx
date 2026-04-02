import { useEffect, useRef } from 'react'
import gsap from '../lib/gsap'

// ─── Timing ───────────────────────────────────────────────────────────────────
const TYPING_DURATION = 1.4   // s – délka psaní (100ms/znak = čitelné a premium)
const BLINK_PAUSE     = 0.6   // s – pauza po dopsání (kurzor bliká, pak fade)
const FADE_DURATION   = 0.65  // s – fade-out overlay
// ─────────────────────────────────────────────────────────────────────────────

const INTRO_TEXT = 'ondrecreates.'

// Props:
//   onReveal – voláno na ZAČÁTKU fade-outu (App přepne animate prop)
//   onDone   – voláno po DOKONČENÍ fade-outu (App odpojí Preloader z DOM)
function Preloader({ onReveal, onDone }) {
  const containerRef = useRef(null)
  const textRef      = useRef(null)
  const cursorRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { index: 0 }

      gsap.timeline()
        // ── Psaní textu ──────────────────────────────────────────────────
        // Kurzor je během psaní solid (CSS nemá animaci) – viz index.css.
        // Přidání třídy 'is-blinking' proběhne až po dopsání.
        .to(proxy, {
          index:    INTRO_TEXT.length,
          duration: TYPING_DURATION,
          ease:     'none',
          onUpdate() {
            if (textRef.current) {
              textRef.current.textContent = INTRO_TEXT.slice(0, Math.round(proxy.index))
            }
          },
          onComplete() {
            // Po dopsání povolíme blikání kurzoru přes CSS třídu
            cursorRef.current?.classList.add('is-blinking')
          },
        })
        // ── Pauza (kurzor bliká) ─────────────────────────────────────────
        .to({}, { duration: BLINK_PAUSE })
        // ── Fade-out overlaye ────────────────────────────────────────────
        //   onStart    → App přepne animate prop (navbar + hero reveal)
        //   onComplete → App odpojí Preloader z DOM
        .to(containerRef.current, {
          opacity:       0,
          duration:      FADE_DURATION,
          ease:          'power2.inOut',
          pointerEvents: 'none',
          onStart:       onReveal,
          onComplete:    onDone,
        })
    }, containerRef)

    return () => ctx.revert()
  }, [onReveal, onDone])

  return (
    <div ref={containerRef} className="intro-screen">

      {/* Kontejner zrcadlí přesně <nav> v Navbaru: w-full px-6 sm:px-8 h-16
          → brand je pixel-perfect na stejné pozici jako navbar brand          */}
      <div className="w-full px-6 sm:px-8 h-16 flex items-center">
        <span className="intro-text">
          <span ref={textRef} />
          {/* Kurzor: solid při psaní, bliká po dopsání (třída .is-blinking) */}
          <span ref={cursorRef} className="intro-cursor">_</span>
        </span>
      </div>

    </div>
  )
}

export default Preloader
