import gsap from '../lib/gsap'

// ─── scrollToSection ──────────────────────────────────────────────────────────
// Plynulý scroll k sekci pomocí GSAP ScrollToPlugin.
// Lepší než native scrollIntoView – kontrola duration, easingu a offsetu.
//
// Jak upravit:
//   duration: 0.95  → délka animace v sekundách
//   offsetY:  72    → offset od horní hrany (výška navbaru 64px + buffer)
//   ease:     power2.inOut
// ─────────────────────────────────────────────────────────────────────────────
export function scrollToSection(id) {
  gsap.to(window, {
    duration: 0.95,
    scrollTo: { y: `#${id}`, offsetY: 72 },
    ease: 'power2.inOut',
  })
}

// ─── cx ───────────────────────────────────────────────────────────────────────
// Spojí CSS class stringy, filtruje falsy hodnoty.
// ─────────────────────────────────────────────────────────────────────────────
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
