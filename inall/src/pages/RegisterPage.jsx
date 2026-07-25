import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registro as registroApi } from '../services/authService.js'

function RegisterPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)

    try {
      await registroApi(nombre, email, password)
      navigate('/login', {
        state: {
          success: 'Usuario creado correctamente. Ya puedes iniciar sesión.',
        },
      })
    } catch (err) {
      setError(err.message || 'No se pudo crear el usuario.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: 520 }}>
      <div className="card-body">
        <h3 className="card-title mb-3">Crear usuario</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

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
              minLength={6}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <Link to="/login" className="btn btn-outline-secondary">
              Ya tengo cuenta
            </Link>

            <button className="btn btn-primary" disabled={loading}>
              {loading ? 'Creando...' : 'Crear usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
