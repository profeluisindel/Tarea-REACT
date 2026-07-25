import FormularioCrear from '../components/FormularioCrear.jsx'

function CrearDocentePage({ onCrear, loading, error, success }) {
  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <FormularioCrear onCrear={onCrear} loading={loading} error={error} success={success} />
      </div>
    </section>
  )
}

export default CrearDocentePage
