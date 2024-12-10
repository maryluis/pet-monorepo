import { useState } from 'react';

import API from '@/API';
import Title from '@/Components/Title';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Link from '@/Components/Link';
import Paths from '@/Paths';
import { IUserRegistration } from '@../../types';

const RegistrationPage = () => {
  const [nickName, setNickname] = useState('');
  const handleSetNickname = (e) => setNickname(e.target.value);

  const [password, setPassword] = useState('');
  const handleSetPassword = (e) => setPassword(e.target.value);

  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSetConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData: IUserRegistration = {
      nickName, password, confirmPassword
    };
    const res = await API.createUser(userData);
    console.log(res);
  };

  return (
    <Card>
      <>
        <Title>Create a new account</Title>
        <form className="w-full" onSubmit={handleSubmit}>
          <Input
            label="Nickname"
            onChange={handleSetNickname}
            value={nickName}
          />
          <Input
            label="Password"
            onChange={handleSetPassword}
            type="password"
            value={password}
          />
          <Input
            label="Confirm password"
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
