import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '@slices';
import { useSelector } from '@store';
import { IngredientDetailsUI, Preloader } from '@ui';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const idParams = useParams();
  const ingredientData = ingredients.find((ingredient) => ingredient._id === idParams.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
