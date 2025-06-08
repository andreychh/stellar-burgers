import { FC, useEffect } from 'react';
import { _selectOrders, fetchFeeds } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(_selectOrders);

  const handleFeedUpdate = () => {
    dispatch(fetchFeeds());
  };

  useEffect(() => {
    const interval = setInterval(handleFeedUpdate, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      handleGetFeeds={handleFeedUpdate}
      orders={orders}
    />
  );
};
