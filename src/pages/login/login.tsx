import { FC, SyntheticEvent, useState } from 'react';
import { loginUser } from '@slices';
import { useDispatch } from '@store';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      email={email}
      errorText=''
      handleSubmit={handleSubmit}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};
