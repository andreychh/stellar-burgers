import styles from './burger-constructor.module.css';

import React, { FC } from 'react';
import { BurgerConstructorElement, Modal } from '@components';
import { OrderDetailsUI, Preloader } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { Button, ConstructorElement, CurrencyIcon } from '@zlden/react-developer-burger-ui-components';

import { BurgerConstructorUIProps } from './type';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal,
}) => (
  <section className={styles.burger_constructor}>
    {constructorItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          isLocked
          price={constructorItems.bun.price}
          text={`${constructorItems.bun.name} (верх)`}
          thumbnail={constructorItems.bun.image}
          type='top'
        />
      </div>
    ) : (
      <div className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}>
        Выберите булки
      </div>
    )}
    <ul className={styles.elements}>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map((item: TConstructorIngredient, index: number) => (
          <BurgerConstructorElement
            key={item.id}
            index={index}
            ingredient={item}
            totalItems={constructorItems.ingredients.length}
          />
        ))
      ) : (
        <div className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}>Выберите начинку</div>
      )}
    </ul>
    {constructorItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          isLocked
          price={constructorItems.bun.price}
          text={`${constructorItems.bun.name} (низ)`}
          thumbnail={constructorItems.bun.image}
          type='bottom'
        />
      </div>
    ) : (
      <div className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}>
        Выберите булки
      </div>
    )}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        children='Оформить заказ'
        htmlType='button'
        size='large'
        type='primary'
        onClick={onOrderClick}
      />
    </div>

    {orderRequest && (
      <Modal
        title='Оформляем заказ...'
        onClose={closeOrderModal}
      >
        <Preloader />
      </Modal>
    )}

    {orderModalData && (
      <Modal
        title={orderRequest ? 'Оформляем заказ...' : ''}
        onClose={closeOrderModal}
      >
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);
