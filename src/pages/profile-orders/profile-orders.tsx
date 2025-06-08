import { FC, useEffect } from 'react';
import { fetchOrders, selectLoaded, selectOrders } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  const loaded: boolean = useSelector(selectLoaded);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (loaded) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
