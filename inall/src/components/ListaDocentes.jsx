import TarjetaDocente from './TarjetaDocente.jsx'

function ListaDocentes({ docentes }) {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {docentes.map((docente) => (
        <div key={docente.id} className="col">
          <TarjetaDocente docente={docente} />
        </div>
      ))}
    </div>
  )
}

export default ListaDocentes
