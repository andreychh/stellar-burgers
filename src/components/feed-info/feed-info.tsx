import { FC } from 'react';
import { _selectOrders, selectTotal, selectTotalToday } from '@slices';
import { useSelector } from '@store';
import { FeedInfoUI } from '@ui';
import { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const total = useSelector(selectTotal);
  const totalToday = useSelector(selectTotalToday);
  const orders = useSelector(_selectOrders);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      feed={feed}
      pendingOrders={pendingOrders}
      readyOrders={readyOrders}
    />
  );
};
