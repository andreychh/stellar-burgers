import styles from './burger-constructor-element.module.css';

import React, { FC, memo } from 'react';
import { ConstructorElement, MoveButton } from '@zlden/react-developer-burger-ui-components';

import { BurgerConstructorElementUIProps } from './type';

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> = memo(
  ({ ingredient, index, totalItems, handleMoveUp, handleMoveDown, handleClose }) => (
    <li className={`${styles.element} mb-4 mr-2`}>
      <MoveButton
        handleMoveDown={handleMoveDown}
        handleMoveUp={handleMoveUp}
        isDownDisabled={index === totalItems - 1}
        isUpDisabled={index === 0}
      />
      <div
        className={`${styles.element_fullwidth} ml-2`}
        data-cy={`constructor-ingredient-${ingredient._id}`}
      >
        <ConstructorElement
          handleClose={handleClose}
          price={ingredient.price}
          text={ingredient.name}
          thumbnail={ingredient.image}
        />
      </div>
    </li>
  )
);
