import commonStyles from '../common.module.css';
import styles from './profile.module.css';

import { FC } from 'react';
import { ProfileMenu } from '@components';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';

import { ProfileUIProps } from './type';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
}) => (
  <main className={`${commonStyles.container}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit}
    >
      <>
        <div className='pb-6'>
          <Input
            error={false}
            errorText=''
            icon='EditIcon'
            name='name'
            placeholder='Имя'
            size='default'
            type='text'
            value={formValue.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='pb-6'>
          <Input
            error={false}
            errorText=''
            icon='EditIcon'
            name='email'
            placeholder='E-mail'
            size='default'
            type='email'
            value={formValue.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='pb-6'>
          <Input
            error={false}
            errorText=''
            icon='EditIcon'
            name='password'
            placeholder='Пароль'
            size='default'
            type='password'
            value={formValue.password}
            onChange={handleInputChange}
          />
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              htmlType='button'
              size='medium'
              type='secondary'
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button
              htmlType='submit'
              size='medium'
              type='primary'
            >
              Сохранить
            </Button>
          </div>
        )}
        {updateUserError && (
          <p className={`${commonStyles.error} pt-5 text text_type_main-default`}>{updateUserError}</p>
        )}
      </>
    </form>
  </main>
);
