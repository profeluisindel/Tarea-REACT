function TarjetaDocente({ docente }) {
  const nombreCompleto = `${docente.nombre} ${docente.apellido}`

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className="badge bg-info text-dark">#{docente.id}</span>
            <span className="text-muted small text-uppercase">Docente</span>
          </div>

          <h3 className="h6 mb-3">{nombreCompleto}</h3>

          <dl className="row mb-0 text-muted">
            <dt className="col-5 small text-uppercase">Especialidad</dt>
            <dd className="col-7 mb-2">{docente.especialidad}</dd>

            <dt className="col-5 small text-uppercase">Email</dt>
            <dd className="col-7 mb-0">
              <a className="link-primary" href={`mailto:${docente.email}`}>
                {docente.email}
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </article>
  )
}

export default TarjetaDocente
