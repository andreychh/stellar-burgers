import { ReactNode } from 'react';

export type ProtectedRouteProps = {
  children: ReactNode;
  isPublic?: boolean;
};
