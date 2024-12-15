import { useState,
  useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';

import API from '@/api';
import Title from '@/components/Title';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Link from '@/components/Link';
import Paths from '@/paths';
import { setTokenCookie, getTokenCookie } from '@/cookies';
import { useErrors } from '@/hooks';
import { useStore } from '@/zustand';
import { IUserLogin } from '@../../types';

export default function LoginPage() {
  const addToken = useStore((state) => state.addToken);
  const navigate = useNavigate();
  const [nickName, setNickname] = useState('');
  const handleSetNickname = (e) => setNickname(e.target.value);

  const errorsHandler = useErrors();

  const [password, setPassword] = useState('');
  const handleSetPassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getTokenCookie();

      if (token) {
        navigate(Paths.profile);
      }
    };

    checkToken();
  }, [navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData: IUserLogin = {
      nickName, password
    };
    try {
      const data = await API.login(userData);
      await setTokenCookie(data.token);
      addToken(data.token);
      navigate(Paths.profile);
    }
    catch (e) {
      errorsHandler(e);
    }
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
