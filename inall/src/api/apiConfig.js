// Por defecto apunta al backend en desarrollo en el puerto 3000.
// Puedes sobrescribir con la variable de entorno VITE_API_URL.
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
export const DOCENTES_ENDPOINT = `${API_BASE_URL}/docentes`
