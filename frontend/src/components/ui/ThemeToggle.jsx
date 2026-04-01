import { useTheme } from '../../hooks/useTheme'

// ─── ThemeToggle ──────────────────────────────────────────────────────────────
// Minimalistické tlačítko přepínání dark / light.
// Ikona: Slunce (dark mode → přepni na light) / Měsíc (light mode → přepni na dark)
// ─────────────────────────────────────────────────────────────────────────────

// Ikona Slunce – zobrazena v dark mode (kliknutím přejdeš na light)
function SunIcon() {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93"  y1="4.93"  x2="7.05"  y2="7.05"  />
      <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
      <line x1="4.93"  y1="19.07" x2="7.05"  y2="16.95" />
      <line x1="16.95" y1="7.05"  x2="19.07" y2="4.93"  />
    </svg>
  )
}

// Ikona Měsíc – zobrazena v light mode (kliknutím přejdeš na dark)
function MoonIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? 'Přepnout na světlý motiv' : 'Přepnout na tmavý motiv'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default ThemeToggle
