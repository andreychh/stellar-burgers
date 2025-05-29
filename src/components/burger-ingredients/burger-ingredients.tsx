import { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';

import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const buns = [];
  const mains = [];
  const sauces = [];

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun') titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return null;

  return (
    <BurgerIngredientsUI
      buns={buns}
      bunsRef={bunsRef}
      currentTab={currentTab}
      mains={mains}
      mainsRef={mainsRef}
      sauces={sauces}
      saucesRef={saucesRef}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      onTabClick={onTabClick}
    />
  );
};
