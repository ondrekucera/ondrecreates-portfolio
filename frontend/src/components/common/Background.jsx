// Animovaný gradient background – plovoucí bloby
// Rychlost blob animace: uprav číslo v 'animationDuration' (sekundy)
// Intenzita glow: uprav rgba opacity hodnoty v 'background'

function Background() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Blob 1 – dark purple záře vlevo nahoře */}
      <div
        className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(86,11,173,0.14) 0%, transparent 70%)',
          animation: 'blob-drift-1 30s ease-in-out infinite',
        }}
      />

      {/* Blob 2 – deep violet záře vpravo uprostřed */}
      <div
        className="absolute top-1/3 -right-48 w-[550px] h-[550px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(81,16,211,0.12) 0%, transparent 70%)',
          animation: 'blob-drift-2 38s ease-in-out infinite',
        }}
      />

      {/* Blob 3 – jemná záře dole uprostřed */}
      <div
        className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(86,11,173,0.10) 0%, transparent 70%)',
          animation: 'blob-drift-3 45s ease-in-out infinite',
        }}
      />
    </div>
  )
}

export default Background
