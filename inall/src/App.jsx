import { useEffect, useState } from 'react'
import { obtenerDocentes, crearDocente } from './services/docentesService.js'
import manejarError from './utils/manejarError.js'
import Encabezado from './components/Encabezado.jsx'
import FormularioCrear from './components/FormularioCrear.jsx'
import ListaDocentes from './components/ListaDocentes.jsx'
import PieDePagina from './components/PieDePagina.jsx'
import './App.css'

function App() {
  const [docentes, setDocentes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    cargarDocentes()
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

  const manejarEditar = () => {
    setError('')
    setMensaje('')
  }

  const [mostrarLista, setMostrarLista] = useState(true)

  const cambiarVisibilidadLista = () => {
    setMostrarLista((actual) => !actual)
  }

  return (
    <div className="app-shell container py-4">
      <Encabezado />

      <main className="row gy-4">
        <section className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <FormularioCrear
                onCrear={manejarCrear}
                loading={guardando}
                error={error}
                success={mensaje}
              />
            </div>
          </div>
        </section>

        <section className="col-lg-8">
          <div className="card shadow-sm border-warning bg-black text-warning">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between mb-3 gap-3 flex-column flex-sm-row">
                <div>
                  <p className="eyebrow mb-1 text-warning">Directorio académico</p>
                  <h2 className="h5 mb-2 text-warning">Listado de docentes</h2>
                  <p className="panel-copy mb-0 text-warning-opacity-75">
                    Vista conectada al endpoint <code className="text-warning">GET /api/docentes</code>.
                  </p>
                </div>

                <button type="button" className="btn btn-outline-warning btn-sm" onClick={cambiarVisibilidadLista}>
                  {mostrarLista ? 'Ocultar lista' : 'Ver lista de docentes'}
                </button>
              </div>

              {cargando ? <p className="estado">Cargando docentes...</p> : null}

              {!mostrarLista ? (
                <p className="estado">Haz clic en el botón para ver la lista de docentes.</p>
              ) : null}

              {mostrarLista ? (
                docentes.length === 0 ? (
                  !cargando && (
                    <p className="estado">
                      Todavía no hay docentes registrados. Agrega el primero desde el formulario.
                    </p>
                  )
                ) : (
                  <ListaDocentes docentes={docentes} />
                )
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <PieDePagina />
    </div>
  )
}

export default App
