import { useInView } from '../../hooks/useInView'
import { cx } from '../../utils/helpers'

/**
 * Obalí children a spustí fade+slide animaci při vstupu do viewportu.
 * @param {number}  delay     - zpoždění animace v ms (pro kaskádový efekt)
 * @param {boolean} cinematic - true = pomalejší easing + blur reveal efekt
 */
function ScrollReveal({ children, delay = 0, className = '', cinematic = false }) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={cx(
        cinematic ? '' : 'transition-all duration-700 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        ...(cinematic && {
          transition: [
            'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            'filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          ].join(', '),
          filter: isInView ? 'blur(0px)' : 'blur(8px)',
        }),
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
