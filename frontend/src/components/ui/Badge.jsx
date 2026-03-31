import { cx } from '../../utils/helpers'

// Tech tag / badge – zobrazuje technologii nebo status
function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-bg-surface-2 text-text-secondary border border-border-subtle',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    live: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    wip: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    soon: 'bg-bg-surface-2 text-text-muted border border-border-subtle',
  }

  return (
    <span
      className={cx(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
