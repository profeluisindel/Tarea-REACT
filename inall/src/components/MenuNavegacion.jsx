import { NavLink } from 'react-router-dom'
import { clearToken } from '../services/authService.js'

const enlaces = [
  { to: '/inicio', label: 'Inicio' },
  { to: '/docentes', label: 'Listar docentes' },
]

function MenuNavegacion({ isAuthenticated, onLogout }) {
  const handleLogout = () => {
    clearToken()
    onLogout && onLogout()
  }

  return (
    <nav className="nav-menu card shadow-sm mb-4">
      <div className="card-body py-3">
        <ul className="nav nav-pills gap-2">
          {enlaces.map((enlace) => (
            <li className="nav-item" key={enlace.to}>
              <NavLink className="nav-link" to={enlace.to}>
                {enlace.label}
              </NavLink>
            </li>
          ))}

          <li className="nav-item">
            <NavLink className="nav-link" to="/crear">
              Formulario crear docentes
            </NavLink>
          </li>

          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/registro">
                  Crear usuario
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Iniciar sesión
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default MenuNavegacion
