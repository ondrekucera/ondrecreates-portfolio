/**
 * Plynulý scroll na sekci podle ID.
 * @param {string} id - ID elementu
 */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Spojí podmíněné class names (jednoduchá alternativa ke clsx).
 * @param {...string} classes
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
