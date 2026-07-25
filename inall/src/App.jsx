import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate, Route, Routes } from 'react-router-dom'
import { obtenerDocentes, crearDocente } from './services/docentesService.js'
import manejarError from './utils/manejarError.js'
import Encabezado from './components/Encabezado.jsx'
import MenuNavegacion from './components/MenuNavegacion.jsx'
import PieDePagina from './components/PieDePagina.jsx'
import InicioPage from './pages/InicioPage.jsx'
import ListarDocentesPage from './pages/ListarDocentesPage.jsx'
import CrearDocentePage from './pages/CrearDocentePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { getToken, clearToken } from './services/authService.js'
import './App.css'

function App() {
  const [docentes, setDocentes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [token, setToken] = useState(null)

  useEffect(() => {
    cargarDocentes()
    const t = getToken()
    if (t) setToken(t)
  }, [])

  const cargarDocentes = async () => {
    setCargando(true)
    setError('')
    setMensaje('')

    try {
      const data = await obtenerDocentes()
      setDocentes(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(manejarError(err, 'Ocurrió un error al consultar el backend.'))
    } finally {
      setCargando(false)
    }
  }

  const manejarCrear = async (docente) => {
    setGuardando(true)
    setError('')
    setMensaje('')

    try {
      const nuevoDocente = await crearDocente(docente)
      setDocentes((actual) => [nuevoDocente, ...actual])
      setMensaje('Docente agregado correctamente.')
    } catch (err) {
      setError(manejarError(err, 'Ocurrió un error al guardar el docente.'))
      throw err
    } finally {
      setGuardando(false)
    }
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    clearToken()
    setToken(null)
    navigate('/login')
  }

  return (
    <div className="app-shell container py-4">
      <Encabezado />
      <MenuNavegacion isAuthenticated={!!token} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<InicioPage />} />
          <Route
            path="/docentes"
            element={
              <ListarDocentesPage
                docentes={docentes}
                cargando={cargando}
                error={error}
                success={mensaje}
                onReload={cargarDocentes}
              />
            }
          />
          <Route
            path="/crear"
            element={
              token ? (
                <CrearDocentePage
                  onCrear={manejarCrear}
                  loading={guardando}
                  error={error}
                  success={mensaje}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/login" element={<LoginPage onLogin={(t) => setToken(t)} />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Routes>
      </main>

      <PieDePagina />
    </div>
  )
}

export default App
