import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { SECRET_ADMIN_BASE } from '../../constants/routes'

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-[#8B5CF6] text-white shadow-[0_15px_35px_rgba(139,92,246,0.45)]'
      : 'text-white/60 hover:text-white hover:bg-white/5'
  }`

export function AdminNav() {
  const { isSuperadmin } = useAuth()

  return (
    <nav className="inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-[#1C1C24]/95 px-1 py-1">
      <NavLink to={SECRET_ADMIN_BASE} end className={linkClass}>
        Blog objave
      </NavLink>
      {isSuperadmin ? (
        <NavLink to={`${SECRET_ADMIN_BASE}/members`} className={linkClass}>
          Članovi
        </NavLink>
      ) : null}
    </nav>
  )
}
