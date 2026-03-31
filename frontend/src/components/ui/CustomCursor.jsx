import { useEffect, useRef, useState } from 'react'

// ─── Nastavení kurzoru – uprav zde ───────────────────────────────────────────
const DOT_SIZE   = 8    // px – velikost tečky v klidovém stavu
const HOVER_SCALE = 2.2  // násobek velikosti při hoveru nad klikatelným prvkem
// ─────────────────────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef   = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Zobraz pouze na zařízeních s myší (ne touch)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    if (!dot) return

    // Přímá manipulace s DOM pro maximální plynulost
    const onMove = (e) => {
      dot.style.transform = `translate(${e.clientX - DOT_SIZE / 2}px, ${e.clientY - DOT_SIZE / 2}px)`
      if (!visible) setVisible(true)
    }

    // Detekce hoveru nad klikatelným prvkem
    const onOver = (e) => {
      const isClickable = e.target.closest('a, button, [role="button"], input, textarea, label, select')
      setHovered(!!isClickable)
    }

    // Schování při opuštění okna
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [visible])

  // Na touch zařízeních nerenderuj nic
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: '50%',
        background: 'rgba(139, 92, 246, 0.9)',
        boxShadow: hovered
          ? '0 0 14px 6px rgba(139, 92, 246, 0.5)'
          : '0 0 8px 3px rgba(139, 92, 246, 0.3)',
        opacity: visible ? 1 : 0,
        transform: hovered ? `scale(${HOVER_SCALE})` : 'scale(1)',
        transition: 'box-shadow 0.2s ease, opacity 0.3s ease, transform 0.15s ease',
      }}
    />
  )
}

export default CustomCursor
