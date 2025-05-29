import styles from './burger-ingredient.module.css';

import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { AddButton, Counter, CurrencyIcon } from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;

    return (
      <li className={styles.container}>
        <Link
          className={styles.article}
          state={locationState}
          to={`/ingredients/${_id}`}
        >
          {count && <Counter count={count} />}
          <img
            alt='картинка ингредиента.'
            className={styles.img}
            src={image}
          />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          extraClass={`${styles.addButton} mt-8`}
          text='Добавить'
          onClick={handleAdd}
        />
      </li>
    );
  }
);
