// ─── SectionWrapper ───────────────────────────────────────────────────────────
//
// Obal každé sekce – zajišťuje konzistentní padding, ID kotvu a max šířku.
//
// Props:
//   id        (string)  – HTML id pro scroll navigaci
//   children  (node)    – obsah sekce
//   className (string)  – extra Tailwind třídy (pozadí, border atd.)
//   bgTitle   (string)  – velký dekorativní text za obsahem (přeložený)
//                         Zobrazí se jako ghost/outlined text, very low opacity
//                         Reaguje na dark/light mode (viz .section-bg-title v index.css)
//
// Spacing: uprav py-32 sm:py-44 pro změnu vertikálního rytmu celé stránky
// ─────────────────────────────────────────────────────────────────────────────

function SectionWrapper({ id, children, className = '', bgTitle = '' }) {
  return (
    <section
      id={id}
      className={`relative py-32 sm:py-44 px-4 sm:px-8 overflow-hidden ${className}`}
    >
      {/* Dekorativní bg title – velký, ghost text, za obsahem sekce
          Pozice: top-8 sm:top-10 (viditelný v horní části sekce)
          Jak upravit: viz .section-bg-title v index.css                     */}
      {bgTitle && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-8 sm:top-10 pointer-events-none select-none overflow-hidden"
        >
          <span className="section-bg-title">{bgTitle}</span>
        </div>
      )}

      {/* Obsah – relativní z-index zajišťuje vrstvení nad bg title           */}
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
