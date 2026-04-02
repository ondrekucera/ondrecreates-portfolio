import { useRef, useEffect } from 'react'
import gsap, { ScrollTrigger } from '../../lib/gsap'
import { useLanguage } from '../../hooks/useLanguage'

// ─── SectionDivider ───────────────────────────────────────────────────────────
//
// Vizuální oddělovač mezi sekcemi. Obsahuje:
//   – velký ghost text (outlined, velmi nízká opacity) jako chapter marker
//   – tenkou 1px linku
//   – volitelné pořadové číslo sekce
//
// Props:
//   labelKey (string)  – i18n klíč, např. "about.title"; přeloží interně přes t()
//                        Upřednostněno před `label`. Zajišťuje CZ/EN label.
//   label    (string)  – fallback: přímý text (backward compat, bez překladu)
//   index    (number)  – volitelné pořadové číslo (zobrazí se jako "01", "02"...)
//   flip     (boolean) – zarovná obsah doprava (střídání pro vizuální rytmus)
//
// Animace (ScrollTrigger):
//   – text: opacity + jemný posun X při vstupu do viewportu
//   – linka: scaleX 0 → 1 (draw efekt)
//   – number: opacity + posun Y
//
// Parallax:
//   – dva-layer pattern: `textWrapRef` obdrží entrance animaci,
//     `textRef` (inner span) obdrží parallax scrub → žádný konflikt
//   – vypnuto na touch zařízeních
// ─────────────────────────────────────────────────────────────────────────────

function SectionDivider({ labelKey, label, index, flip = false }) {
  const { t } = useLanguage()
  // labelKey má přednost – zajišťuje přeložený text podle aktuálního jazyka
  const displayLabel = labelKey ? t(labelKey) : label
  const wrapRef     = useRef(null)   // celý komponent – ScrollTrigger trigger
  const textWrapRef = useRef(null)   // vnější wrapper textu – entrance animace
  const textRef     = useRef(null)   // vnitřní span textu – parallax scrub
  const lineRef     = useRef(null)   // 1px linka – draw animace
  const numRef      = useRef(null)   // číslo sekce – fade animace

  // ── Entrance animace (ScrollTrigger, play once) ───────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Výchozí stavy – okamžitě před malováním
      gsap.set(textWrapRef.current, {
        x:       flip ? 50 : -50,
        opacity: 0,
      })
      gsap.set(lineRef.current, {
        scaleX:          0,
        transformOrigin: flip ? 'right center' : 'left center',
      })
      if (numRef.current) {
        gsap.set(numRef.current, { opacity: 0, y: 8 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       wrapRef.current,
          start:         'top 88%',   // spustí se, když je top divíderu 88% výšky okna
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      })

      tl
        // Velký text přijede ze strany
        .to(textWrapRef.current, {
          x:        0,
          opacity:  1,
          duration: 0.9,
        })
        // Linka se "nakreslí" – překryv -0.4s pro plynulost
        .to(lineRef.current, {
          scaleX:   1,
          duration: 0.8,
          ease:     'power2.inOut',
        }, '-=0.4')

      if (numRef.current) {
        tl.to(numRef.current, {
          opacity:  1,
          y:        0,
          duration: 0.5,
        }, '-=0.6')
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [flip])

  // ── Parallax scrub na textRef (vnitřní span) ──────────────────────────────
  // Oddělený od entrance animace → žádný konflikt hodnot
  // Intenzita: uprav `x` hodnotu (výchozí: ±18px celkový pohyb)
  useEffect(() => {
    if (!textRef.current) return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start:   'top bottom',
      end:     'bottom top',
      scrub:   2,
      onUpdate: (self) => {
        // progress 0 → 1 při scrollu přes komponent
        // Pohyb: flip = doprava, normál = doleva
        const offset = (self.progress - 0.5) * (flip ? 18 : -18)
        gsap.set(textRef.current, { x: offset })
      },
    })

    return () => st.kill()
  }, [flip])

  const alignClass = flip ? 'items-end text-right' : 'items-start text-left'

  return (
    <div
      ref={wrapRef}
      className="w-full px-4 sm:px-8 overflow-hidden"
      aria-hidden="true"
    >
      <div className="max-w-6xl mx-auto">

        {/* Pořadové číslo sekce – malé, monospace, nízká opacity
            Umístění: naproti zarovnání textu                                 */}
        {index != null && (
          <div className={`flex mb-1 ${flip ? 'justify-start' : 'justify-end'}`}>
            <span ref={numRef} className="section-divider-index">
              {String(index).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Velký ghost text – outlined, dekorativní, chapter marker
            Jak upravit velikost: viz .section-divider-label v index.css
            Jak upravit outline barvu: -webkit-text-stroke v index.css        */}
        <div ref={textWrapRef}>
          <span ref={textRef} className={`section-divider-label block ${alignClass.split(' ')[1]}`}>
            {displayLabel}
          </span>
        </div>

        {/* Tenká oddělující linka – draw animace (scaleX)
            Barva: viz .section-divider-line v index.css                       */}
        <div
          ref={lineRef}
          className="section-divider-line mt-3"
        />

      </div>
    </div>
  )
}

export default SectionDivider
