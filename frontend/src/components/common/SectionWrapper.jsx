// Obal každé sekce – zajišťuje konzistentní padding, ID kotvu a max šířku
// Spacing: uprav py-28 sm:py-36 pro změnu vertikálního rytmu celé stránky

function SectionWrapper({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`py-28 sm:py-36 px-4 sm:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
