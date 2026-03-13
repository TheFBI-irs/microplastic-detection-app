import { Outlet, Link, useLocation } from 'react-router-dom'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''

  return (
    <div className="min-h-screen bg-bg">
      <header className="glass sticky top-0 z-50 border-b border-white/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4" aria-label="Main navigation">
          <div className="flex items-center gap-4">
            {!isHome && (
              <Link
                to="/"
                className="text-sm text-text/80 hover:text-primary transition flex items-center gap-1"
              >
                ← Back
              </Link>
            )}
            <Link to="/" className="text-lg font-semibold text-primary transition hover:opacity-90">
              Microplastic Detection
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/" className="text-text/80 hover:text-primary transition">Home</Link>
            <Link to="/scan" className="text-text/80 hover:text-primary transition">Scan</Link>
            <Link to="/instructions" className="text-text/80 hover:text-primary transition">Instructions</Link>
            <Link to="/kit-design" className="text-text/80 hover:text-primary transition">Kit Design</Link>
            <Link to="/dataset" className="text-text/80 hover:text-primary transition">Dataset Explorer</Link>
            <Link to="/model" className="text-text/80 hover:text-primary transition">AI Model</Link>
            <Link to="/results" className="text-text/80 hover:text-primary transition">Results</Link>
            <Link to="/error-analysis" className="text-text/80 hover:text-primary transition">Error Analysis</Link>
            <Link to="/impact" className="text-text/80 hover:text-primary transition">Impact</Link>
            <Link to="/references" className="text-text/80 hover:text-primary transition">References</Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
