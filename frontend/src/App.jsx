import { LanguageProvider } from './context/LanguageContext'
import Layout from './layout/Layout'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

// Hlavní komponenta – sestavuje celou one-page stránku
function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </Layout>
    </LanguageProvider>
  )
}

export default App
