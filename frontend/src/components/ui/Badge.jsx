import { cx } from '../../utils/helpers'

// Varianty na module level → objekt nevzniká při každém renderu Badge
// (dříve byl definován uvnitř komponenty)
const VARIANTS = {
  default: 'bg-bg-surface-2 text-text-secondary border border-border-subtle',
  accent:  'bg-accent/10 text-accent border border-accent/20',
  live:    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  wip:     'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  soon:    'bg-bg-surface-2 text-text-muted border border-border-subtle',
}

// Tech tag / badge – zobrazuje technologii nebo status projektu
function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cx(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
