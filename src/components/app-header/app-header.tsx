import { FC } from 'react';
import { selectName } from '@slices';
import { useSelector } from '@store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector(selectName);
  return <AppHeaderUI userName={userName} />;
};
