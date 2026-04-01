import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './layout/Layout'
import Preloader from './components/Preloader'
import SectionDivider from './components/common/SectionDivider'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  // Detekce předchozí návštěvy – při návratu přeskočí preloader
  const wasVisited = Boolean(sessionStorage.getItem('portfolio_visited'))

  const [preloaderDone, setPreloaderDone] = useState(wasVisited)

  const handlePreloaderDone = () => {
    sessionStorage.setItem('portfolio_visited', '1')
    setPreloaderDone(true)
  }

  return (
    // ThemeProvider musí být nejvně – přidává/odebírá class `dark` na <html>
    // LanguageProvider uvnitř – pro překlady
    <ThemeProvider>
      <LanguageProvider>
        {!preloaderDone && <Preloader onDone={handlePreloaderDone} />}

        {/* visibility: hidden zabraňuje záblesku obsahu před preloaderem
            animate: říká Hero, kdy spustit GSAP animace                   */}
        <div style={{ visibility: preloaderDone ? 'visible' : 'hidden' }}>
          <Layout>

            <Hero animate={preloaderDone} />

            {/* ── Section dividers ───────────────────────────────────────
                flip=false → text vlevo  (About, Projects)
                flip=true  → text vpravo (Skills, Contact)                */}

            <SectionDivider label="About"    index={1} flip={false} />
            <About />

            <SectionDivider label="Skills"   index={2} flip={true}  />
            <Skills />

            <SectionDivider label="Projects" index={3} flip={false} />
            <Projects />

            <SectionDivider label="Contact"  index={4} flip={true}  />
            <Contact />

            <Footer />

          </Layout>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
