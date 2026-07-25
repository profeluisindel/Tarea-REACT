import { DOCENTES_ENDPOINT } from '../api/apiConfig.js'
import { getToken } from './authService.js'

const parseResponse = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || fallbackMessage)
  }

  return data
}

export const obtenerDocentes = async () => {
  const response = await fetch(DOCENTES_ENDPOINT)
  return parseResponse(response, 'No se pudo obtener la lista de docentes.')
}

export const crearDocente = async (docente) => {
  const token = getToken()
  const response = await fetch(DOCENTES_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(docente),
  })

  return parseResponse(response, 'No se pudo registrar el docente.')
}

