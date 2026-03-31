import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './layout/Layout'
import Preloader from './components/Preloader'
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
    <LanguageProvider>
      {!preloaderDone && <Preloader onDone={handlePreloaderDone} />}

      {/* animate: říká Hero, kdy spustit GSAP animace
          visibility: hidden zabraňuje záblesku obsahu před preloaderem */}
      <div style={{ visibility: preloaderDone ? 'visible' : 'hidden' }}>
        <Layout>
          <Hero animate={preloaderDone} />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </Layout>
      </div>
    </LanguageProvider>
  )
}

export default App
