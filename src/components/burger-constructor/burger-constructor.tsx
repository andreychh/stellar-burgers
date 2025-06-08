import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearConstructor, orderBurger, selectConstructor, selectName, selectOrder, selectOrdering } from '@slices';
import { useDispatch, useSelector } from '@store';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructor);
  const orderRequest = useSelector(selectOrdering);
  const userName = useSelector(selectName);
  const orderModalData = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!userName) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id,
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s: number, v: TConstructorIngredient) => s + v.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      closeOrderModal={closeOrderModal}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      orderRequest={orderRequest}
      price={price}
      onOrderClick={onOrderClick}
    />
  );
};
