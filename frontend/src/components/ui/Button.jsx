import { cx } from '../../utils/helpers'

// Varianty tlačítka
const variants = {
  primary:
    'bg-gradient-primary text-white hover:opacity-90 hover:shadow-lg hover:shadow-accent/25 active:scale-95',
  ghost:
    'border border-border text-text-secondary hover:border-accent/60 hover:text-text-primary active:scale-95',
  outline:
    'border border-accent/50 text-accent hover:bg-accent/10 active:scale-95',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  external,
  ...props
}) {
  const classes = cx(
    'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer',
    variants[variant],
    sizes[size],
    className
  )

  // Pokud je předán href, renderuj jako odkaz
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
