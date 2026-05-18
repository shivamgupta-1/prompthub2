/**
 * Axios instance + helpers
 * - Centralizes API calls (GET/POST/PUT/PATCH/DELETE)
 * - Automatically attaches `Authorization: Bearer <token>` from redux `state.auth.accessToken`
 * - Accepts success and failure callbacks for each request
 * - Usage: import { apiGet, apiPost } from 'src/utils/axiosInstance'
 */

import axios, { type AxiosRequestConfig, type Method } from 'axios'
import store from '../redux/store'
import { logout } from '../redux/authSlice'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'https://vm-service-slide-1.onrender.com'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach token from redux
axiosInstance.interceptors.request.use((config) => {
  try {
    const state: any = store.getState()
    const token = state?.auth?.accessToken
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } catch (e) {
    // ignore
  }
  return config
})

// Response interceptor: auto-logout on 401
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      try {
        store.dispatch(logout())
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error)
  }
)

export interface ApiRequestOptions extends AxiosRequestConfig {
  successCallback?: (data: any) => void
  failureCallback?: (error: any) => void
}

async function apiRequest(
  method: Method,
  url: string,
  data?: any,
  opts?: ApiRequestOptions
) {
  const config: AxiosRequestConfig = {
    ...(opts ?? {}),
  }

  if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    config.data = data
  } else if (method.toUpperCase() === 'GET' && data) {
    config.params = data
  }

  try {
    const response = await axiosInstance.request({ method, url, ...config })
    opts?.successCallback?.(response.data)
    return response.data
  } catch (error) {
    opts?.failureCallback?.(error)
    throw error
  }
}

export const apiGet = (url: string, opts?: ApiRequestOptions) => apiRequest('GET', url, undefined, opts)
export const apiPost = (url: string, data?: any, opts?: ApiRequestOptions) => apiRequest('POST', url, data, opts)
export const apiPut = (url: string, data?: any, opts?: ApiRequestOptions) => apiRequest('PUT', url, data, opts)
export const apiPatch = (url: string, data?: any, opts?: ApiRequestOptions) => apiRequest('PATCH', url, data, opts)
export const apiDelete = (url: string, opts?: ApiRequestOptions) => apiRequest('DELETE', url, undefined, opts)

export default axiosInstance
