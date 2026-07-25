import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login as loginApi, setToken } from '../services/authService.js'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.success || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await loginApi(email, password)
      const token = data.token
      if (token) {
        setToken(token)
        onLogin && onLogin(token)
        navigate('/inicio')
      } else {
        setError('Respuesta inesperada del servidor')
      }
    } catch (err) {
      setError(err.message || 'Error en el login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: 480 }}>
      <div className="card-body">
        <h3 className="card-title mb-3">Iniciar sesión</h3>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <Link to="/registro" className="btn btn-outline-secondary">
              Crear usuario
            </Link>

            <button className="btn btn-primary" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
