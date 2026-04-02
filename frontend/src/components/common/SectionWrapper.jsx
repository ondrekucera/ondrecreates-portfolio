// ─── SectionWrapper ───────────────────────────────────────────────────────────
//
// Obal každé sekce – fullscreen blok s vertikálně centrovaným obsahem.
//
// Props:
//   id        (string) – HTML id pro scroll navigaci
//   children  (node)   – obsah sekce
//   className (string) – extra Tailwind třídy (pozadí, border atd.)
//
// Layout:
//   min-h-screen:              každá sekce zabírá alespoň celý viewport
//   flex flex-col justify-center: obsah vertikálně uprostřed viewportu
//   py-20 sm:py-28:            min. dýchací prostor od horního / dolního okraje
//
// Jak upravit:
//   Min. výška:         min-h-screen → min-h-[90vh] (menší blok)
//   Vertikální prostor: py-20 sm:py-28 (větší = obsah výš/níž od kraje)
// ─────────────────────────────────────────────────────────────────────────────

function SectionWrapper({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Obsah – w-full zajišťuje správné zarovnání v flex kontextu */}
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
