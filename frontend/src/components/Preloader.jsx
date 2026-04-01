import { useEffect, useRef } from 'react'
import gsap from '../lib/gsap'

// ─── Timing – uprav zde ───────────────────────────────────────────────────────
const TYPING_DURATION = 1.0   // s – celková délka psaní textu
const BLINK_PAUSE     = 0.35  // s – pauza s kurzorem po dopsání
const FADE_DURATION   = 0.5   // s – fade out overlay
// ─────────────────────────────────────────────────────────────────────────────

// Text intra – uprav zde ('_' kurzor je renderován zvlášť via .intro-cursor)
const INTRO_TEXT = 'ondrecreates'

function Preloader({ onDone }) {
  const containerRef = useRef(null)
  const textRef      = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Proxy objekt pro GSAP – index float 0 → délka textu
      const proxy = { index: 0 }

      gsap.timeline()
        // Typewriter: GSAP interpoluje index, onUpdate aktualizuje DOM
        .to(proxy, {
          index:    INTRO_TEXT.length,
          duration: TYPING_DURATION,
          ease:     'none',
          onUpdate() {
            if (textRef.current) {
              textRef.current.textContent = INTRO_TEXT.slice(0, Math.round(proxy.index))
            }
          },
        })
        // Krátká pauza s blikajícím kurzorem
        .to({}, { duration: BLINK_PAUSE })
        // Fade out celého overlay
        .to(containerRef.current, {
          opacity:         0,
          duration:        FADE_DURATION,
          ease:            'power2.inOut',
          pointerEvents:   'none',
          onComplete:      onDone,
        })
    }, containerRef)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div ref={containerRef} className="intro-screen">

      {/* Ambientní glow – fialová záře za textem
          Intenzita: uprav opacity třídy bg-accent/[...] níže               */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[700px] h-56 rounded-full bg-accent/[0.08] blur-[100px]" />
        <div className="absolute w-96 h-40 rounded-full bg-accent-violet/[0.09] blur-[80px] translate-x-20 translate-y-6" />
      </div>

      {/* Intro text + kurzor
          Styly: viz .intro-text a .intro-cursor v index.css                */}
      <div className="relative z-10">
        <span className="intro-text">
          <span ref={textRef} />
          {/* Kurzor bliká čistě přes CSS animaci – žádný JS interval       */}
          <span className="intro-cursor">_</span>
        </span>
      </div>

    </div>
  )
}

export default Preloader
