import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { addIngredient } from '@slices';
import { useDispatch } from '@store';
import { BurgerIngredientUI } from '@ui';

import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(({ ingredient, count }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <BurgerIngredientUI
      count={count}
      handleAdd={handleAdd}
      ingredient={ingredient}
      locationState={{ background: location }}
    />
  );
});
