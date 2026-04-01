import { useEffect, useRef, useState } from 'react'

// ─── Nastavení kurzoru ────────────────────────────────────────────────────────
const DOT_SIZE    = 8    // px – velikost tečky
const HOVER_SCALE = 2.2  // násobek při hoveru nad klikatelným prvkem
// ─────────────────────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef     = useRef(null)
  const posRef     = useRef({ x: 0, y: 0 })  // pozice jako ref → bez re-renderu
  const hoveredRef = useRef(false)            // hover stav jako ref → bez stale closure

  // State jen pro části, kde je re-render nutný (box-shadow, opacity)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    if (!dot) return

    // Kombinuje translate + scale v jednom transform call.
    // Dřívější bug: React kontroloval scale přes style.transform a onMove
    // přepisoval translate → po každém re-renderu nebo pohybu myší
    // se ztratila buď pozice nebo scale.
    const applyTransform = () => {
      const { x, y } = posRef.current
      const scale     = hoveredRef.current ? HOVER_SCALE : 1
      dot.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
    }

    const onMove = (e) => {
      posRef.current = { x: e.clientX - DOT_SIZE / 2, y: e.clientY - DOT_SIZE / 2 }
      applyTransform()
      if (!visible) setVisible(true)
    }

    const onOver = (e) => {
      const isClickable = !!e.target.closest(
        'a, button, [role="button"], input, textarea, label, select'
      )
      if (isClickable === hoveredRef.current) return
      hoveredRef.current = isClickable
      setHovered(isClickable)  // re-render jen kvůli box-shadow
      applyTransform()
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove',    onMove, { passive: true })
    document.addEventListener('mouseover',  onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove',    onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, []) // [] – listenery se registrují jednou; dříve [visible] způsoboval
         // re-registraci při každém pohybu myší (první mousemove → visible = true
         // → cleanup + re-attach)

  if (!window.matchMedia('(pointer: fine)').matches) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
      style={{
        width:        DOT_SIZE,
        height:       DOT_SIZE,
        borderRadius: '50%',
        background:   'rgba(139, 92, 246, 0.9)',
        boxShadow: hovered
          ? '0 0 14px 6px rgba(139, 92, 246, 0.5)'
          : '0 0 8px 3px rgba(139, 92, 246, 0.3)',
        opacity: visible ? 1 : 0,
        // transform není v style – řídí ho výhradně applyTransform() výše
        transition: 'box-shadow 0.2s ease, opacity 0.3s ease, transform 0.15s ease',
      }}
    />
  )
}

export default CustomCursor
