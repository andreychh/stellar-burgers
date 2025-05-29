import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';

import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(({ ingredient, count }) => {
  const location = useLocation();

  const handleAdd = () => {};

  return (
    <BurgerIngredientUI
      count={count}
      handleAdd={handleAdd}
      ingredient={ingredient}
      locationState={{ background: location }}
    />
  );
});
