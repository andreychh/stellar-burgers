import { FC, SyntheticEvent, useState } from 'react';
import { registerUser } from '@slices';
import { useDispatch } from '@store';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      alert('Заполни все поля');
      return;
    }
    dispatch(registerUser({ email, name: userName, password }));
  };

  return (
    <RegisterUI
      email={email}
      errorText=''
      handleSubmit={handleSubmit}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      userName={userName}
    />
  );
};
