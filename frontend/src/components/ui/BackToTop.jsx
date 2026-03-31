import { useState, useEffect } from 'react'

// Zobrazí se po scrollu nad tento práh
const SCROLL_THRESHOLD = 400

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollToTop}
      aria-label="Zpět nahoru"
      className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* Šipka nahoru */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default BackToTop
