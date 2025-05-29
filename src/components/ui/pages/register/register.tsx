import styles from '../common.module.css';

import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@zlden/react-developer-burger-ui-components';

import { RegisterUIProps } from './type';

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName,
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='register'
        onSubmit={handleSubmit}
      >
        <>
          <div className='pb-6'>
            <Input
              error={false}
              errorText=''
              name='name'
              placeholder='Имя'
              size='default'
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='pb-6'>
            <Input
              error={false}
              errorText=''
              name={'email'}
              placeholder='E-mail'
              size={'default'}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='pb-6'>
            <PasswordInput
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button
              htmlType='submit'
              size='medium'
              type='primary'
            >
              Зарегистрироваться
            </Button>
          </div>
          {errorText && <p className={`${styles.error} text text_type_main-default pb-6`}>{errorText}</p>}
        </>
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Уже зарегистрированы?
        <Link
          className={`pl-2 ${styles.link}`}
          to='/login'
        >
          Войти
        </Link>
      </div>
    </div>
  </main>
);
