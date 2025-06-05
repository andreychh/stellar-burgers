import { FC, memo } from 'react';
import { moveDown, moveUp, removeIngredient } from '@slices';
import { useDispatch } from '@store';
import { BurgerConstructorElementUI } from '@ui';

import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(({ ingredient, index, totalItems }) => {
  const dispatch = useDispatch();
  const handleMoveDown = () => {
    dispatch(moveDown(index));
  };
  const handleMoveUp = () => {
    dispatch(moveUp(index));
  };
  const handleClose = () => {
    dispatch(removeIngredient(ingredient.id));
  };
  return (
    <BurgerConstructorElementUI
      handleClose={handleClose}
      handleMoveDown={handleMoveDown}
      handleMoveUp={handleMoveUp}
      index={index}
      ingredient={ingredient}
      totalItems={totalItems}
    />
  );
});
