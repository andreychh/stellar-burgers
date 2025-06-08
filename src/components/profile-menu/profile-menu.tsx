import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { logoutUser } from '@slices';
import { useDispatch } from '@store';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ProfileMenuUI
      handleLogout={handleLogout}
      pathname={pathname}
    />
  );
};
