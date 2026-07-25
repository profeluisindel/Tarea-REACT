import { useState } from 'react'

const estadoInicial = {
  nombre: '',
  apellido: '',
  especialidad: '',
  email: '',
}

function FormularioCrear({ onCrear, loading, error, success }) {
  const [formulario, setFormulario] = useState(estadoInicial)

  const manejarCambio = ({ target }) => {
    const { name, value } = target
    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }))
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()
    try {
      await onCrear(formulario)
      setFormulario(estadoInicial)
    } catch {
      // El estado de error ya lo maneja el contenedor.
    }
  }

  return (
    <>
      <div className="mb-4">
        <p className="eyebrow text-uppercase text-primary mb-2">Nuevo registro</p>
        <h2 className="h5 mb-2">Agregar docente</h2>
        <p className="panel-copy text-muted mb-0">
          Completa los datos para enviar un nuevo docente al backend.
        </p>
      </div>

      <form className="docente-form" onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Ana"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            className="form-control"
            name="apellido"
            value={formulario.apellido}
            onChange={manejarCambio}
            placeholder="Martinez"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Especialidad</label>
          <input
            className="form-control"
            name="especialidad"
            value={formulario.especialidad}
            onChange={manejarCambio}
            placeholder="Matemática"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            placeholder="ana@colegio.com"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Guardando...' : 'Agregar docente'}
        </button>
      </form>

      {success ? <div className="alert alert-success mt-3 mb-0">{success}</div> : null}
      {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
    </>
  )
}

export default FormularioCrear
