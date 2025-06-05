import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { selectEmail, selectName, updateUser } from '@slices';
import { useDispatch, useSelector } from '@store';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectName);
  const userEmail = useSelector(selectEmail);
  const user = {
    name: '',
    email: '',
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });

  useEffect(() => {
    setFormValue(() => ({
      name: userName,
      email: userEmail,
      password: '',
    }));
  }, [userName, userEmail]);

  const isFormChanged = formValue.name !== userName || formValue.email !== userEmail || !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userName,
      email: userEmail,
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isFormChanged={isFormChanged}
    />
  );
};
