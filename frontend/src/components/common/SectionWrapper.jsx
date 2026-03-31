// Obal každé sekce – zajišťuje konzistentní padding, ID kotvu a max šířku

function SectionWrapper({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`py-24 px-4 sm:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
