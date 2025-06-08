import styles from './burger-ingredients.module.css';

import React, { FC, memo } from 'react';
import { IngredientsCategory } from '@components';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import { BurgerIngredientsUIProps } from './type';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick,
  }) => (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab
              active={currentTab === 'bun'}
              value='bun'
              onClick={onTabClick}
            >
              Булки
            </Tab>
            <Tab
              active={currentTab === 'main'}
              value='main'
              onClick={onTabClick}
            >
              Начинки
            </Tab>
            <Tab
              active={currentTab === 'sauce'}
              value='sauce'
              onClick={onTabClick}
            >
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={styles.content}>
          <IngredientsCategory
            ref={bunsRef}
            data-cy='bun-ingredient'
            ingredients={buns}
            title='Булки'
            titleRef={titleBunRef}
          />
          <IngredientsCategory
            ref={mainsRef}
            data-cy='main-ingredient'
            ingredients={mains}
            title='Начинки'
            titleRef={titleMainRef}
          />
          <IngredientsCategory
            ref={saucesRef}
            data-cy='sauces-ingredient'
            ingredients={sauces}
            title='Соусы'
            titleRef={titleSaucesRef}
          />
        </div>
      </section>
    </>
  )
);
