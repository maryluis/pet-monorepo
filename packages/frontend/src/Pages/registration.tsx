import { useState } from 'react';

import API from '@/API';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
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

  return (<div>
    <h2>Create a new account</h2>
    <form onSubmit={handleSubmit}>
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
      <Button onClick={handleSubmit}>Create</Button>
    </form>
  </div>);
};

export default RegistrationPage;
