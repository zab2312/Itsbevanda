import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { SECRET_ADMIN_BASE } from './constants/routes'
import { LandingPage } from './pages/LandingPage'
import { BlogListPage } from './pages/blog/BlogListPage'
import { BlogDetailPage } from './pages/blog/BlogDetailPage'
import { AdminBlogPage } from './pages/admin/AdminBlogPage'
import { AdminBlogEditorPage } from './pages/admin/AdminBlogEditorPage'
import { AuthGate } from './components/auth/AuthGate'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' }
]

const SiteNav = () => (
  <header className="pointer-events-none fixed inset-x-0 top-6 z-40 flex justify-center px-4">
    <div className="pointer-events-auto inline-flex items-center justify-center">
      <nav className="inline-flex items-center justify-center gap-1 rounded-full border border-white/10 bg-[#1C1C24]/95 px-1 py-1 text-xs font-semibold text-white/70 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-full px-3 py-1.5 transition-all duration-200 ${
                isActive
                  ? 'bg-[#8B5CF6] text-white shadow-[0_15px_35px_rgba(139,92,246,0.45)]'
                  : 'text-white/70 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
)

function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const mainSpacing = isLanding ? 'pt-16 sm:pt-20' : 'pt-32'

  return (
    <div className="min-h-screen bg-[#121216] text-white">
      <SiteNav />
      <main className={`${mainSpacing} transition-[padding] duration-300`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route
            path={SECRET_ADMIN_BASE}
            element={
              <AuthGate>
                <AdminBlogPage />
              </AuthGate>
            }
          />
          <Route
            path={`${SECRET_ADMIN_BASE}/new`}
            element={
              <AuthGate>
                <AdminBlogEditorPage mode="create" />
              </AuthGate>
            }
          />
          <Route
            path={`${SECRET_ADMIN_BASE}/edit/:id`}
            element={
              <AuthGate>
                <AdminBlogEditorPage mode="edit" />
              </AuthGate>
            }
          />
          <Route path="*" element={
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">404</h1>
                <p className="text-white/70">Stranica nije pronađena</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
  </div>
  )
}

export default App

