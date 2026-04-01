import { useLanguage } from '../../hooks/useLanguage'

// ─── LanguageToggle ────────────────────────────────────────────────────────────
// Minimalistické tlačítko přepínání CZ / EN.
// Zobrazuje zkratku jazyka, na který se přepne.
// ─────────────────────────────────────────────────────────────────────────────

function LanguageToggle({ onAfterToggle } = {}) {
  const { lang, toggleLang } = useLanguage()

  const handleClick = () => {
    toggleLang()
    onAfterToggle?.()
  }

  return (
    <button
      onClick={handleClick}
      className="lang-toggle"
      aria-label={lang === 'cs' ? 'Switch to English' : 'Přepnout na češtinu'}
      title={lang === 'cs' ? 'English' : 'Čeština'}
    >
      {lang === 'cs' ? 'EN' : 'CZ'}
    </button>
  )
}

export default LanguageToggle
