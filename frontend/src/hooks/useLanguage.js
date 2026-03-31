import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

// Hook pro přístup k jazykovému kontextu
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage musí být uvnitř LanguageProvider')
  return ctx
}
