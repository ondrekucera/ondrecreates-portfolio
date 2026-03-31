import { createContext, useState } from 'react'
import { DEFAULT_LANGUAGE } from '../lib/constants'
import { translate } from '../lib/i18n'

// Kontext pro správu jazyka napříč celou aplikací
export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE)

  // Pomocná funkce dostupná všude přes useLanguage()
  const t = (key) => translate(key, lang)

  const toggleLang = () =>
    setLang((prev) => (prev === 'cs' ? 'en' : 'cs'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
