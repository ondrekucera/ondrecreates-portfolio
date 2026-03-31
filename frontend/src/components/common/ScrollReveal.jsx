import { useInView } from '../../hooks/useInView'
import { cx } from '../../utils/helpers'

/**
 * Obalí children a spustí fade+slide animaci při vstupu do viewportu.
 * @param {number} delay - zpoždění animace v ms (pro kaskádový efekt)
 */
function ScrollReveal({ children, delay = 0, className = '' }) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={cx(
        'transition-all duration-700 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
