import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import type { RootState } from './store'
import { logout, updateToken } from './authSlice';

/**
 * ----------------------------------------
 * 1. BASE QUERY
 * ----------------------------------------
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://vm-service-slide-1.onrender.com/api',
  // credentials: 'include', // needed if using httpOnly cookies
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    // Optional: CSRF token (only if backend requires it)
    const csrfToken = state.auth.csrfToken
    if (csrfToken) {
      headers.set('x-csrf-token', csrfToken)
    }

    headers.set('content-type', 'application/json')
    return headers
  },
})

/**
 * ----------------------------------------
 * 2. BASE QUERY WITH TOKEN REFRESH
 * ----------------------------------------
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401 || result.error?.status === 403) {
    // Attempt refresh
  const refreshResult = await rawBaseQuery(
  { url: '/auth/login', method: 'POST', body: { username: 'user', password: 'password' } },
  api,
  extraOptions
)

console.log('Refresh result:', refreshResult)

// if (refreshResult.data) {
//   const data = refreshResult.data as RefreshResponse
//   api.dispatch(setCredentials(data))
//   result = await rawBaseQuery(args, api, extraOptions)
// } else {
//   api.dispatch(logout())
// }

   
if (
  refreshResult.data &&
  typeof (refreshResult.data as any).token === 'string'
) {
  api.dispatch(
    updateToken({
      accessToken: (refreshResult.data as RefreshResponse).token,
    })
  )
}
 else {
      // Refresh failed → force logout
      api.dispatch(logout())
    }
  }

  return result
}

/**
 * ----------------------------------------
 * 3. API DEFINITIONS
 * ----------------------------------------
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardItem[], void>({
      query: () => '/admin/url-requests',
      providesTags: ['Items'],
    }),

    // Admin URL requests: CRUD operations for service tiles/URLs
    getServiceById: builder.query<UrlRequest, number>({
      query: (id) => `/admin/url-requests/${id}`,
    }),

    updateService: builder.mutation<UrlRequest, Partial<UrlRequest> & { id: number }>({
      query: (body) => ({
        url: `/admin/url-requests/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Items'],
    }),

    deleteService: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/admin/url-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Items'],
    }),

    createService: builder.mutation<UrlRequest, CreateUrlRequest>({
      query: (body) => ({
        url: '/admin/url-requests',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Items'],
    }),

    // Create an application
    createApplication: builder.mutation<Application, { name: string; description: string }>({
      query: (body) => ({
        url: '/admin/applications',
        method: 'POST',
        body,
      }),
    }),
  }),
})

/**
 * ----------------------------------------
 * 4. HOOK EXPORTS
 * ----------------------------------------
 */
export const {
  useGetDashboardQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useCreateServiceMutation,
  useCreateApplicationMutation,
} = api

/**
 * ----------------------------------------
 * 5. TYPES
 * ----------------------------------------
 */

export interface DashboardItem {
  id: number;
  baseUrl: string;
  tile: string;
  description: string;
  applicationId: number | null;
  applicationName: string | null;
  environmentId: number | null;
  environmentName: string | null;
  sectionId: number | null;
  sectionName: string | null;
  status: string | null;
  body: unknown | null;
}

export interface UpdateWidgetRequest {
  id: string
  enabled: boolean
}

export interface UpdateWidgetResponse {
  success: boolean
}

export interface Tile {
  id: string
  title: string
  description?: string
  position?: number
  [key: string]: any
}

export interface CreateTileRequest {
  title: string
  description?: string
}

export interface CreateTileResponse {
  success: boolean
  tile: Tile
}

export interface UpdateTileRequest {
  id: string
  title?: string
  description?: string
}

export interface UpdateTileResponse {
  success: boolean
  tile?: Tile
}

export interface DeleteTileRequest {
  id: string
}

export interface DeleteTileResponse {
  success: boolean
}


interface RefreshResponse {
  token: string,
}

export interface AuthResponse {
  accessToken: string
  csrfToken?: string
  [key: string]: any
}

export interface LoginRequest {
  username: string
  password: string
}

// --- Admin URL / Application types ---
export interface UrlRequest {
  id: number
  baseUrl: string
  tile?: string
  description?: string
  applicationId?: number | null
  applicationName?: string | null
  environmentId?: number | null
  environmentName?: string | null
  sectionId?: number | null
  sectionName?: string | null
  status?: number | null
  body?: string | null
  urls?: Array<{ url?: string }>
  [key: string]: any
}

export interface CreateUrlRequest extends Omit<UrlRequest, 'id'> {
  id?: number
}

export interface Application {
  id: number
  name: string
  description?: string
  [key: string]: any
}
