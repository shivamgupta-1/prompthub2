import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface RequireRoleProps {
  allowedRole: string;
  children: React.ReactElement;
}

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRole, children }) => {
  const role = useSelector((state: any) => state.auth.role as string[]);
  const isAllowed = Array.isArray(role) && role.includes(allowedRole);

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireRole;
