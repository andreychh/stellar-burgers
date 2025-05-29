import styles from './orders-list.module.css';

import { FC } from 'react';
import { OrderCard } from '@components';

import { OrdersListUIProps } from './type';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard
        key={order._id}
        order={order}
      />
    ))}
  </div>
);
