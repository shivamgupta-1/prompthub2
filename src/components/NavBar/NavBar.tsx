
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { useMsal } from '@azure/msal-react';
import { useGetDashboardQuery } from '../../redux/api';

/**
 * NavBar
 * - Rendered once in `App.tsx` so it's visible across all pages.
 * - Dynamically renders controls based on the signed-in user's role and current route.
 */
const NavBar: React.FC = () => {
  const { username, role, accessToken } = useSelector((state: any) => state.auth || { username: '', role: [], accessToken: null });
  const {fulfilledTimeStamp } = useGetDashboardQuery()


  const dispatch = useDispatch();
  const { instance } = useMsal();

  const activeAccount = instance.getActiveAccount();
  const groups = (activeAccount?.idTokenClaims as any)?.groups || [];
  const isAdmin = Array.isArray(role) && role.includes('Admin');
  const location = useLocation();
  const navigate = useNavigate();
  
  /**
   * Inline UserProfile component
   * - Renders profile icon + username
   * - Shows roles tooltip on hover and focus
   * - Kept in same file per request
   */
  const UserProfile: React.FC<{
    username: string;
    roles?: string[];
    onClick?: () => void;
  }> = ({ username, roles = [], onClick }) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<number | null>(null);

    const show = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setVisible(true);
    };

    const hide = () => {
      // small delay to make hovering into tooltip possible
      timerRef.current = window.setTimeout(() => setVisible(false), 150);
    };

    const isClickable = typeof onClick === 'function';

    return (
      <div className="relative inline-block">
        {isClickable ? (
          <button
            type="button"
            onClick={onClick}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-describedby={visible ? 'nav-roles-tooltip' : undefined}
            className="inline-flex items-center gap-2 rounded px-3 py-1 hover:bg-purple-50 hover:text-purple-700 transition text-sm cursor-pointer"
          >
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="font-medium text-slate-700">{username}</span>
          </button>
        ) : (
          <div
            tabIndex={0}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-describedby={visible ? 'nav-roles-tooltip' : undefined}
            className="inline-flex items-center gap-2 rounded px-3 py-1 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-300"
          >
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="font-medium text-slate-700">{username}</span>
          </div>
        )}

        {visible && roles && roles.length > 0 && (
          <div id="nav-roles-tooltip" role="status" className="absolute right-0 mt-2 w-max bg-white border border-slate-100 shadow-md text-xs text-slate-700 rounded py-1 px-2">
            {roles.join(', ')}
          </div>
        )}
      </div>
    );
  };

  const path = location.pathname;

  const onDashboardClick = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    if (!activeAccount) return;
    const idToken = (activeAccount as any)?.idToken || '';
    const usernameFromMsal = activeAccount?.name;
    if (!usernameFromMsal) return;

    // Determine roles from MSAL groups. Default to 'User' when not Admin.
    const roles = Array.isArray(groups) && groups.includes('Admin') ? ['Admin'] : ['Admin'];

    const user = {
      accessToken: idToken,
      username: usernameFromMsal,
      role: roles,
    };

    dispatch(setCredentials(user));
  }, [activeAccount?.homeAccountId]);

  return (
    <nav>
      <header>
        <div className="bg-white border-b border-slate-200 shadow-[0_6px_8px_-6px_rgba(15,23,42,0.08)]">
          <div className="mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="font-poppins text-4xl font-bold text-purple-600 cursor-pointer" onClick={()=>navigate("/")}>Slide</h1>
              </div>
            </div>

            <div className="font-poppins flex items-center gap-4 text-slate-700">
              {path === '/dashboard' ? (
                // dashboard page: show stats and admin button when allowed
                <>
                  <div className="hidden sm:flex items-center gap-4">Auto-refresh: <span className="font-medium text-purple-600">10s</span></div>
                  <div className="hidden sm:flex items-center gap-4">Last checked: <span className="font-medium text-purple-600">{fulfilledTimeStamp ? new Date(fulfilledTimeStamp).toLocaleTimeString() : ''}</span></div>
                  {/* replace admin button with clickable name on dashboard */}
                  {accessToken && (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <UserProfile username={username} roles={role} onClick={isAdmin ? () => navigate('/admin') : undefined} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // home or other pages
                <>
                  {/* On homepage when not logged in: hide links */}
                  {!accessToken ? null : (
                    <>
                      <button
                        onClick={onDashboardClick}
                        className="rounded px-3 py-1 bg-transparent hover:bg-slate-50 cursor-pointer"
                      >
                        Dashboard
                      </button>

                      {/* Username handling:
                          - Admin: clickable name that routes to /admin
                          - User: non-clickable name
                      */}
                      {isAdmin ? (
                        <UserProfile username={username} roles={role} onClick={() => navigate('/admin')} />
                      ) : (
                        <UserProfile username={username} roles={role} />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default NavBar;