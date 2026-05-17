import React from 'react';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types/auth.types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Don't render the UI element if role doesn't match
  }

  return <>{children}</>;
};

export default RoleGuard;
