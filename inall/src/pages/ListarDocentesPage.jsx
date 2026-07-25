import { useEffect, useMemo, useState } from 'react'
import ListaDocentes from '../components/ListaDocentes.jsx'

const DOCENTES_POR_PAGINA = 4

function ListarDocentesPage({ docentes, cargando, error, success, onReload }) {
  const [mostrarLista, setMostrarLista] = useState(true)
  const [paginaActual, setPaginaActual] = useState(1)

  const totalPaginas = Math.max(1, Math.ceil(docentes.length / DOCENTES_POR_PAGINA))

  const docentesPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * DOCENTES_POR_PAGINA
    return docentes.slice(inicio, inicio + DOCENTES_POR_PAGINA)
  }, [docentes, paginaActual])

  useEffect(() => {
    setPaginaActual(1)
  }, [docentes.length])

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas)
    }
  }, [paginaActual, totalPaginas])

  return (
    <section className="card shadow-sm border-warning bg-black text-warning">
      <div className="card-body">
        <div className="d-flex align-items-start justify-content-between mb-3 gap-3 flex-column flex-sm-row">
          <div>
            <p className="eyebrow mb-1 text-warning">Directorio académico</p>
            <h2 className="h5 mb-2 text-warning">Listado de docentes</h2>
            <p className="panel-copy mb-0 text-warning-opacity-75">
              Vista conectada al endpoint <code className="text-warning">GET /api/docentes</code>.
            </p>
          </div>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-warning btn-sm" onClick={onReload}>
              Recargar
            </button>
            <button type="button" className="btn btn-outline-warning btn-sm" onClick={() => setMostrarLista((actual) => !actual)}>
              {mostrarLista ? 'Ocultar lista' : 'Ver lista de docentes'}
            </button>
          </div>
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
            <>
              <ListaDocentes docentes={docentesPagina} />

              <div className="pagination-controls mt-4 d-flex align-items-center justify-content-between gap-3 flex-wrap">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => setPaginaActual((actual) => Math.max(1, actual - 1))}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>

                <span className="pagination-info">
                  Página {paginaActual} de {totalPaginas}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => setPaginaActual((actual) => Math.min(totalPaginas, actual + 1))}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </button>
              </div>
            </>
          )
        ) : null}

        {success ? <div className="alert alert-success mt-3 mb-0">{success}</div> : null}
        {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
      </div>
    </section>
  )
}

export default ListarDocentesPage
