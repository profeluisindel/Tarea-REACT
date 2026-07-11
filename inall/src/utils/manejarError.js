export default function manejarError(error, mensajePorDefecto = 'Ocurrió un error inesperado.') {
  if (!error) return mensajePorDefecto
  if (typeof error === 'string') return error
  if (error.message) return error.message
  return mensajePorDefecto
}
