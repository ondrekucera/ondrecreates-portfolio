import { createContext, useState, useEffect } from 'react'
import { DEFAULT_LANGUAGE } from '../lib/constants'
import { translate } from '../lib/i18n'

// Kontext pro správu jazyka napříč celou aplikací
export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  // Inicializace z localStorage – zachová volbu uživatele po refreshi.
  // Dříve se vždy načítal DEFAULT_LANGUAGE → přepnutí na EN se nepamatovalo.
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('portfolio_lang') ?? DEFAULT_LANGUAGE
    } catch {
      // Fallback pro případy kdy je localStorage nedostupné (incognito, iframe...)
      return DEFAULT_LANGUAGE
    }
  })

  // Uloží jazyk při každé změně
  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang)
  }, [lang])

  const t = (key) => translate(key, lang)

  const toggleLang = () =>
    setLang((prev) => (prev === 'cs' ? 'en' : 'cs'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
