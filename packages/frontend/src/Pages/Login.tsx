import { useState } from 'react';

// import API from '@/API';
import Title from '@/Components/Title';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Link from '@/Components/Link';
import Paths from '@/Paths';
// import { IUserRegistration } from '@../../types';

export default function LoginPage() {
  const [nickName, setNickname] = useState('');
  const handleSetNickname = (e) => setNickname(e.target.value);

  const [password, setPassword] = useState('');
  const handleSetPassword = (e) => setPassword(e.target.value);

  // const [confirmPassword, setConfirmPassword] = useState('');
  // const handleSetConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = {
      nickName, password
    };
    // const res = await API.createUser(userData);
    console.log(userData);
  };

  return (
    <Card>
      <>
        <Title>Login</Title>
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
          <div className="flex justify-end">
            <Link path={Paths.registration}>Hasn't account</Link>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={handleSubmit}>Login</Button>
          </div>
        </form>
      </>
    </Card>
  );
};
