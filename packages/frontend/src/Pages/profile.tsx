import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/zustand';
import { deleteTokenCookie } from '@/cookies';
import API from '@/api';
import Paths from '@/paths';
import Title from '@/components/Title';

const ProfilePage = () => {
  const navigate = useNavigate();

  const token = useStore((state) => state.token);
  const removeToken = useStore((state) => state.removeToken);

  const [data, setData] = useState<{ id: string, nickName: string }>({ id: '', nickName: '' });

  useEffect(() => {
    const getProfile = async () => {
      const res = await API.getProfile(token);
      if (res === 401) {
        await deleteTokenCookie();
        removeToken();
        navigate(Paths.login);
      }
      setData(res);
    };

    if (token) {
      getProfile(token);
    }
  }, [token]);

  return (
    <Title >Hello, {data.nickName}</Title>
  );
};

export default ProfilePage;
