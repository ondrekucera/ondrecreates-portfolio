import { createContext, useState, useEffect } from 'react'

// ─── ThemeContext ──────────────────────────────────────────────────────────────
//
// Spravuje dark / light mode. Default = dark.
//
// Jak funguje:
//   – Přidává / odebírá class `dark` na <html> element
//   – CSS proměnné v :root vs .dark řídí všechny barvy (viz index.css)
//   – Ukládá volbu do localStorage pod klíčem `portfolio_theme`
//
// Poznámka: anti-FOUC inline script v index.html zabrání záblesku
//           světlého pozadí před hydratací Reactu.
// ─────────────────────────────────────────────────────────────────────────────

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Při prvním renderování přečti localStorage – nebo default dark
    return localStorage.getItem('portfolio_theme') ?? 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('portfolio_theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
