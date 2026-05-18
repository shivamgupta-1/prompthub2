import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'

/**
 * RequireAuth
 * - Redirects to `/` (home) when no active MSAL account is present.
 * - Keeps the attempted location in state if you want to prompt login later.
 */
const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { instance } = useMsal()
  const location = useLocation();

  let active = null
  try {
    // Guard against msal instance not being fully initialized or throwing
    const activeAccount = instance?.getActiveAccount?.()
    const all = instance?.getAllAccounts?.() ?? []
    active = activeAccount ?? (all.length > 0 ? all[0] : null)
  } catch (e) {
    // If MSAL throws (uninitialized_public_client_application), treat as unauthenticated
    // and redirect to home. Log for debugging.
    // eslint-disable-next-line no-console
    console.warn('RequireAuth: error checking MSAL accounts, redirecting to /', e)
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (!active) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
