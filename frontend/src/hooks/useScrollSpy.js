import { useEffect, useState } from 'react'
import { SECTION_IDS } from '../lib/constants'

/**
 * Sleduje, která sekce je aktuálně ve viewportu,
 * a vrací její ID pro zvýraznění v Navbaru.
 *
 * Oprava race condition: při fast scrollu může IntersectionObserver dodat
 * více intersecting entries najednou. Původní forEach bral poslední z pole
 * (nedeterministické pořadí). Nyní se vybere sekce nejblíže horní hraně
 * viewportu (nejmenší absolutní hodnota boundingClientRect.top).
 */
export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS.hero)

  useEffect(() => {
    const sectionIds = Object.values(SECTION_IDS)

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (!intersecting.length) return

        // Pokud vstoupí více sekcí najednou, vyber tu nejblíže horní hraně
        const topmost = intersecting.reduce((prev, curr) =>
          Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top)
            ? curr
            : prev
        )
        setActiveSection(topmost.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}
