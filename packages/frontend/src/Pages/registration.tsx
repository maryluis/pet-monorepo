import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '@/api';
import Title from '@/components/Title';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Link from '@/components/Link';
import Paths from '@/paths';
import { getTokenCookie, setTokenCookie } from '@/cookies';
import { useErrors } from '@/hooks';
import { IUserRegistration } from '@../../types';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const errorsHandler = useErrors();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getTokenCookie();

      if (token) {
        navigate(Paths.profile);
      }
    };

    checkToken();
  }, [navigate]);

  const [nickName, setNickname] = useState('');
  const handleSetNickname = (e) => setNickname(e.target.value);

  const [password, setPassword] = useState('');
  const handleSetPassword = (e) => setPassword(e.target.value);

  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSetConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData: IUserRegistration = {
      nickName, password, confirmPassword
    };
    try {
      await API.createUser(userData);
      const loginData = { nickName, password };
      const data = await API.login(loginData);
      if (data.token) {
        await setTokenCookie(data.token);
        navigate(Paths.profile);
      }
    } catch (e) {
      errorsHandler(e);
    }
  };

  return (
    <Card>
      <>
        <Title>Create a new account</Title>
        <form className="w-full" onSubmit={handleSubmit}>
          <Input
            label="Nickname"
            name="nickName"
            onChange={handleSetNickname}
            value={nickName}
          />
          <Input
            label="Password"
            name="password"
            onChange={handleSetPassword}
            type="password"
            value={password}
          />
          <Input
            label="Confirm password"
            name="confirmPassword"
            onChange={handleSetConfirmPassword}
            type="password" value={confirmPassword}
          />
          <div className="flex justify-end">
            <Link path={Paths.login}>Has an account</Link>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={handleSubmit}>Create</Button>
          </div>
        </form>
      </>
    </Card>);
};

export default RegistrationPage;
