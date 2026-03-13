import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="glass sticky top-0 z-50 border-b border-white/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4" aria-label="Main navigation">
          <Link to="/" className="text-lg font-semibold text-primary transition hover:opacity-90">
            Microplastic Detection
          </Link>
          <div className="flex gap-4">
            <Link to="/instructions" className="text-sm text-text/80 hover:text-primary transition">Instructions</Link>
            <Link to="/scan" className="text-sm text-text/80 hover:text-primary transition">Scan</Link>
            <Link to="/research" className="text-sm text-text/80 hover:text-primary transition">Research</Link>
            <Link to="/about" className="text-sm text-text/80 hover:text-primary transition">About</Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
