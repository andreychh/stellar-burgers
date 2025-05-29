import styles from './ingredients-category.module.css';

import { forwardRef } from 'react';
import { BurgerIngredient } from '@components';

import { TIngredientsCategoryUIProps } from './type';

export const IngredientsCategoryUI = forwardRef<HTMLUListElement, TIngredientsCategoryUIProps>(
  ({ title, titleRef, ingredients, ingredientsCounters }, ref) => (
    <>
      <h3
        ref={titleRef}
        className='text text_type_main-medium mt-10 mb-6'
      >
        {title}
      </h3>
      <ul
        ref={ref}
        className={styles.items}
      >
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            count={ingredientsCounters[ingredient._id]}
            ingredient={ingredient}
          />
        ))}
      </ul>
    </>
  )
);
