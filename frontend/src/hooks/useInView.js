import { useEffect, useRef, useState } from 'react'

/**
 * Sleduje, zda je element ve viewportu (Intersection Observer).
 * Používá se pro animace při scrollu.
 * @param {number} threshold - procento viditelnosti (0–1)
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Odpojí se po prvním zásahu – animace se spustí jen jednou
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}
