import { cx } from '../../utils/helpers'

// Základní karta – pozadí, border, hover efekt
function Card({ children, className, featured = false }) {
  return (
    <div
      className={cx(
        'rounded-2xl border transition-all duration-300',
        featured
          ? 'bg-bg-surface border-accent/20 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10'
          : 'bg-bg-surface border-border-subtle hover:border-border hover:shadow-lg hover:shadow-black/20',
        '-translate-y-0 hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
