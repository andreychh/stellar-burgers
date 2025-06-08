import styles from './app-header.module.css';

import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@zlden/react-developer-burger-ui-components';

import { TAppHeaderUIProps } from './type';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
          to='/'
        >
          <BurgerIcon type='primary' />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
          to='/feed'
        >
          <ListIcon type='primary' />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <NavLink
        className={styles.logo}
        to='/'
      >
        <Logo className='' />
      </NavLink>
      <NavLink
        className={styles.link_position_last}
        to='profile'
      >
        <ProfileIcon type='primary' />
        <p className='text text_type_main-default ml-2'>{userName || 'Личный кабинет'}</p>
      </NavLink>
    </nav>
  </header>
);
