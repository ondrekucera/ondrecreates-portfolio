import Navbar from './Navbar'
import Background from '../components/common/Background'
import CustomCursor from '../components/ui/CustomCursor'
import BackToTop from '../components/ui/BackToTop'
import ScrollProgressBar from '../components/ui/ScrollProgressBar'

// Hlavní layout – obaluje stránku, renderuje globální UI prvky
//
// Props:
//   animate (bool) – předáno do Navbaru; při false jsou center+right nav
//                    skryty a animují se až po preloaderu
function Layout({ children, animate = true }) {
  return (
    <div className="relative min-h-screen bg-bg-base">
      {/* Animovaný gradient background (z-index: 0) */}
      <Background />

      {/* Custom kurzor – globálně nad vším */}
      <CustomCursor />

      {/* Scroll progress bar – roste od středu do stran (z-index: 61) */}
      <ScrollProgressBar />

      {/* Navigace – animate řídí reveal center + right bloku */}
      <Navbar animate={animate} />

      {/* Obsah stránky – nad backgroundem */}
      <main className="relative z-10">{children}</main>

      {/* Back to top tlačítko */}
      <BackToTop />
    </div>
  )
}

export default Layout
