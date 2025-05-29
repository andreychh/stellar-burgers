import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
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
