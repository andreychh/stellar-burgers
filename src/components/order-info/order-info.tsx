import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { _selectOrders, selectIngredients } from '@slices';
import { useSelector } from '@store';
import { OrderInfoUI, Preloader } from '@ui';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const url = useParams();
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const orders = useSelector(_selectOrders);
  const orderData = orders.find((order) => order.number === Number(url.number));

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce((acc: TIngredientsWithCount, item) => {
      if (!acc[item]) {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = {
            ...ingredient,
            count: 1,
          };
        }
      } else {
        acc[item].count++;
      }

      return acc;
    }, {});

    const total = Object.values(ingredientsInfo).reduce((acc, item) => acc + item.price * item.count, 0);

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
