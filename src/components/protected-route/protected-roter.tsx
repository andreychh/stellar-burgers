import { Navigate, useLocation } from 'react-router-dom';
import { selectChecked, selectName } from '@slices';
import { useSelector } from '@store';
import { Preloader } from '@ui';

import { ProtectedRouteProps } from './type';

export function ProtectedRoute({ children, isPublic }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(selectName);
  const userCheck = useSelector(selectChecked);

  if (!userCheck) {
    return <Preloader />;
  }

  if (!isPublic && !user) {
    return (
      <Navigate
        replace
        state={{ from: location }}
        to='/login'
      />
    );
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate
        replace
        to={from}
      />
    );
  }

  return children;
}
