import Navbar from './Navbar'

// Hlavní layout obalující celou stránku
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
