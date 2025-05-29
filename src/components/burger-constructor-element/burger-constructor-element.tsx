import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';

import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(({ ingredient, index, totalItems }) => {
  const handleMoveDown = () => {};

  const handleMoveUp = () => {};

  const handleClose = () => {};

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
