import { useEffect, useState } from 'react'
import { SECTION_IDS } from '../lib/constants'

/**
 * Sleduje, která sekce je aktuálně ve viewportu,
 * a vrací její ID pro zvýraznění v Navbaru.
 */
export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS.hero)

  useEffect(() => {
    const sectionIds = Object.values(SECTION_IDS)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
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
