import { forwardRef, useMemo } from 'react';
import { selectConstructor } from '@slices';
import { useSelector } from '@store';
import { IngredientsCategoryUI } from '@ui';
import { TIngredient } from '@utils-types';

import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<HTMLUListElement, TIngredientsCategoryProps>(
  ({ title, titleRef, ingredients }, ref) => {
    const burgerConstructor = useSelector(selectConstructor);

    const ingredientsCounters = useMemo(() => {
      const { bun, ingredients } = burgerConstructor;
      const counters: { [key: string]: number } = {};
      ingredients.forEach((ingredient: TIngredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
      });
      if (bun) counters[bun._id] = 2;
      return counters;
    }, [burgerConstructor]);

    return (
      <IngredientsCategoryUI
        ref={ref}
        ingredients={ingredients}
        ingredientsCounters={ingredientsCounters}
        title={title}
        titleRef={titleRef}
      />
    );
  }
);
