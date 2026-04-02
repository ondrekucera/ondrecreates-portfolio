import { useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
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
  // Preloader se zobrazí při každém načtení stránky.
  // sessionStorage úmyslně nepoužíváme – přežívá reload a způsoboval
  // přeskočení loaderu při F5.
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  // Voláno na ZAČÁTKU fade-out preloaderu:
  // pouze přepne animate prop – stránka má vždy opacity 1 (výchozí),
  // žádný gsap.fromTo nepotřebujeme.
  //
  // Proč to funguje bez animace stránky:
  //   Preloader (z-index 9999, dark bg) překrývá stránku.
  //   Jak preloader mizí (opacity 1→0), stránka se odkrývá při plné opacity.
  //   Navbar brand (opacity 1 pod preloaderem) a preloader brand (fading out)
  //   jsou na stejné pozici → brand je vždy 100% viditelný, žádný dip.
  const handlePreloaderReveal = useCallback(() => setPreloaderDone(true), [])

  // Voláno po DOKONČENÍ fade-out preloaderu → odpojí Preloader z DOM
  const handlePreloaderDone = useCallback(() => setShowPreloader(false), [])

  return (
    <ThemeProvider>
      <LanguageProvider>

        {showPreloader && (
          <Preloader
            onReveal={handlePreloaderReveal}
            onDone={handlePreloaderDone}
          />
        )}

        {/* Stránka je vždy opacity 1 – preloader ji zakrývá přes z-index.
            Navbar brand pod preloaderem = seamless přechod bez bliknutí.  */}
        <div>
          <Layout animate={preloaderDone}>

            <Hero animate={preloaderDone} />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />

          </Layout>
        </div>

      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
