// ─── SectionHeading ───────────────────────────────────────────────────────────
//
// Přeložitelný nadpis sekce: malý monospace subtitle + velký h2.
// Eliminuje identický pattern opakující se v About, Skills, Projects, Contact.
//
// Props:
//   subtitle    (string)  – malý horní popisek (mono, uppercase, accent)
//   title       (string)  – hlavní nadpis h2
//   description (string)  – volitelný popis pod nadpisem
//   center      (bool)    – text-center zarovnání (default: false = left)
//   className   (string)  – extra třídy (typicky mb-16 nebo mb-12)
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({ subtitle, title, description, center = false, className = '' }) {
  return (
    <div className={`space-y-2 ${center ? 'text-center' : ''} ${className}`}>
      <p className="text-xs font-mono text-accent tracking-widest uppercase">
        {subtitle}
      </p>
      <h2 className="text-4xl font-bold text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary leading-relaxed mt-4">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
