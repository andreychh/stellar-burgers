import styles from '../common.module.css';

import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@zlden/react-developer-burger-ui-components';

import { LoginUIProps } from './type';

export const LoginUI: FC<LoginUIProps> = ({ email, setEmail, errorText, handleSubmit, password, setPassword }) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Вход</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='login'
        onSubmit={handleSubmit}
      >
        <>
          <div className='pb-6'>
            <Input
              error={false}
              errorText=''
              name='email'
              placeholder='E-mail'
              size='default'
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
              Войти
            </Button>
          </div>
          {errorText && <p className={`${styles.error} text text_type_main-default pb-6`}>{errorText}</p>}
        </>
      </form>
      <div className={`pb-4 ${styles.question} text text_type_main-default`}>
        Вы - новый пользователь?
        <Link
          className={`pl-2 ${styles.link}`}
          to='/register'
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Забыли пароль?
        <Link
          className={`pl-2 ${styles.link}`}
          to='/forgot-password'
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  </main>
);
