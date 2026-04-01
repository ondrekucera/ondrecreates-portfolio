import Navbar from './Navbar'
import Background from '../components/common/Background'
import CustomCursor from '../components/ui/CustomCursor'
import BackToTop from '../components/ui/BackToTop'

// Hlavní layout – obaluje stránku, renderuje globální UI prvky
function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-bg-base">
      {/* Animovaný gradient background (z-index: 0) */}
      <Background />

      {/* Custom kurzor – globálně nad vším */}
      <CustomCursor />

      {/* Navigace */}
      <Navbar />

      {/* Obsah stránky – nad backgroundem */}
      <main className="relative z-10">{children}</main>

      {/* Back to top tlačítko */}
      <BackToTop />
    </div>
  )
}

export default Layout
