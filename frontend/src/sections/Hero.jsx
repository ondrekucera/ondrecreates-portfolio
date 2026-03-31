import { useRef, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../hooks/useLanguage'
import { scrollToSection } from '../utils/helpers'
import { SITE, SECTION_IDS } from '../lib/constants'
import Button from '../components/ui/Button'
import Signature from '../components/common/Signature'

// ─── Parallax konfigurace ─────────────────────────────────────────────────────
// Uprav pro změnu intenzity kurzorového parallaxu na title:
const PARALLAX_X = 8   // px – max horizontální posun
const PARALLAX_Y = 4   // px – max vertikální posun
// ─────────────────────────────────────────────────────────────────────────────

function Hero({ animate }) {
  const { t } = useLanguage()

  // Refs pro GSAP
  const titleRef    = useRef(null)   // <h1> wrapper – parallax target
  const letterRefs  = useRef([])     // pole <span> písmen
  const sigWrapRef  = useRef(null)   // wrapper podpisu
  const sigSvgRef   = useRef(null)   // SVG element (předán přes Signature)
  const subtitleRef = useRef(null)   // role + claim blok
  const ctaRef      = useRef(null)   // CTA tlačítka

  // ── Intro animace (stagger + signature reveal) ────────────────────────────
  // useLayoutEffect: spouští se před malováním → žádný záblesk
  useLayoutEffect(() => {
    // Skryjeme elementy okamžitě – bez ohledu na animate prop
    const ctx = gsap.context(() => {
      gsap.set(letterRefs.current, { yPercent: 110, opacity: 0 })
      gsap.set([subtitleRef.current, ctaRef.current], { y: 24, opacity: 0 })
      // Signature: schovaná clip-path
      if (sigWrapRef.current) {
        gsap.set(sigWrapRef.current, { clipPath: 'inset(0 102% 0 0 round 1px)' })
      }
    }, titleRef)

    return () => ctx.revert()
  }, []) // prázdné – jen initial set

  useEffect(() => {
    if (!animate) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Písmena přijedou zdola (stagger)
      tl.to(letterRefs.current, {
        yPercent: 0,
        opacity:  1,
        duration: 0.7,
        stagger:  0.045,
      })

      // 2. Signature reveal (clip-path zleva doprava)
      .to(sigWrapRef.current, {
        clipPath: 'inset(0 0% 0 0 round 1px)',
        duration: 1.4,
        ease:     'power2.inOut',
      }, '-=0.3')

      // 3. Subtitle + CTA
      .to([subtitleRef.current, ctaRef.current], {
        y:        0,
        opacity:  1,
        duration: 0.6,
        stagger:  0.12,
      }, '-=0.8')
    }, titleRef)

    return () => ctx.revert()
  }, [animate])

  // ── Cursor parallax na title ──────────────────────────────────────────────
  // Viewport-wide: jemný posun h1 podle pozice kurzoru (ne per-letter deformace)
  // Vypnuto na touch zařízeních (pointer: coarse)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch || !titleRef.current) return

    // quickTo: optimalizovaná funkce pro rychlé opakované volání
    const setX = gsap.quickTo(titleRef.current, 'x', { duration: 1.2, ease: 'power3.out' })
    const setY = gsap.quickTo(titleRef.current, 'y', { duration: 1.2, ease: 'power3.out' })

    const onMouseMove = (e) => {
      // Normalizace: 0 = střed, ±1 = kraj viewportu
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2

      setX(nx * PARALLAX_X)
      setY(ny * PARALLAX_Y)
    }

    const onMouseLeave = () => {
      setX(0)
      setY(0)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // Pole písmen – CSS text-transform: uppercase na h1 obstará velká písmena
  const letters = SITE.brand.split('')

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden"
    >
      {/* ── Pozadí ─────────────────────────────────────────────────── */}

      <div aria-hidden="true" className="absolute inset-0 hero-halftone pointer-events-none z-0" />
      <div aria-hidden="true" className="absolute inset-0 hero-scanlines pointer-events-none z-0" />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Boční glow vrstvy */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[10%] w-80 h-[70vh] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at left, rgba(86,11,173,0.11) 0%, transparent 68%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-[20%] w-80 h-[70vh] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at right, rgba(247,37,133,0.08) 0%, transparent 68%)' }}
      />

      {/* ── Obsah ──────────────────────────────────────────────────── */}

      {/* ONDRECREATES – full-width title blok (není omezen max-w-5xl)
          Role + CTA zůstávají v max-w-5xl níže                              */}
      <div className="relative z-10 w-full text-center">

        {/* Jak upravit velikost titulku:
              font-size: clamp(min, preferred-vw, max) – uprav 12.5vw / 9rem
            Jak upravit parallax intenzitu:
              PARALLAX_X / PARALLAX_Y konstanty v horní části tohoto souboru */}
        <h1
          ref={titleRef}
          className="hero-title text-[clamp(2rem,12.5vw,9rem)] font-extrabold leading-none uppercase"
          aria-label={SITE.brand}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el }}
              className="hero-letter"
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* ── SVG Signature / podpis ──────────────────────────────────
            Pozice: top-[64%] = lehce pod středem nadpisu
            Jak upravit:
              top-[64%]     → větší % = níž | menší % = výš
              rotate(-2deg) → větší záporná hodnota = výraznější náklon
              opacity: 0.85 → průhlednost podpisu (rozsah 0.70–0.95)       */}
        <div
          ref={sigWrapRef}
          className="absolute top-[64%] left-1/2 z-20 pointer-events-none select-none"
          style={{ transform: 'translateX(-50%) rotate(-2deg)', opacity: 0.85 }}
        >
          <Signature svgRef={sigSvgRef} />
        </div>
      </div>

      {/* Role + claim + CTA – omezeny max-w-5xl pro čistý layout */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">

        {/* Role + claim */}
        <div
          ref={subtitleRef}
          className="text-center mt-28 sm:mt-32 md:mt-36 space-y-3"
        >
          <p className="text-base sm:text-lg font-semibold text-text-primary tracking-[0.18em] uppercase">
            {t('hero.role')}
          </p>
          <p className="text-sm sm:text-base text-text-secondary max-w-sm mx-auto leading-relaxed">
            {t('hero.claim')}
          </p>
        </div>

        {/* CTA tlačítka */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
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

      {/* Scroll hint – bounce animace
          POZOR: left-1/2 -translate-x-1/2 nesmí být použito společně s bounce-y,
          protože bounce-y (translateY) přepíše translateX → pravý posun.
          Řešení: left-0 right-0 + flex justify-center pokryje plnou šířku.   */}
      <div
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
        style={{ animation: 'bounce-y 2.8s ease-in-out 1.6s infinite' }}
      >
        <span className="text-xs font-mono text-text-secondary tracking-[0.22em] uppercase opacity-75">
          {t('hero.scroll_hint')}
        </span>
        <div className="w-px h-9 bg-gradient-to-b from-text-secondary/50 to-transparent" />
      </div>
    </section>
  )
}

export default Hero
