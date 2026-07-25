import { API_BASE_URL } from '../api/apiConfig.js'

const AUTH_ENDPOINT = `${API_BASE_URL}/auth`

const parseResponse = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || fallbackMessage)
  }

  return data
}

export const login = async (email, password) => {
  const response = await fetch(`${AUTH_ENDPOINT}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  return parseResponse(response, 'No se pudo iniciar sesión.')
}

export const registro = async (nombre, email, password) => {
  const response = await fetch(`${AUTH_ENDPOINT}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  })

  return parseResponse(response, 'No se pudo registrar el usuario.')
}

export const obtenerPerfil = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${AUTH_ENDPOINT}/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return parseResponse(response, 'No se pudo obtener el perfil.')
}

export const setToken = (token) => localStorage.setItem('token', token)
export const clearToken = () => localStorage.removeItem('token')
export const getToken = () => localStorage.getItem('token')

export default {
  login,
  registro,
  obtenerPerfil,
  setToken,
  clearToken,
  getToken,
}
