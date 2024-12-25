import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/zustand';
import { deleteTokenCookie } from '@/cookies';
import API from '@/api';
import Paths from '@/paths';
import Title from '@/components/Title';
import Input from '@/components/Input';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import Card from '@/components/Card';

const ProfilePage = () => {
  const navigate = useNavigate();

  const token = useStore((state) => state.token);
  const removeToken = useStore((state) => state.removeToken);

  const [data, setData] = useState<{ id: string, nickname: string }>({ id: '', nickname: '' });
  const [wishTitle, setWishTitle] = useState('');
  const handleSetWishTitle = (e) => setWishTitle(e.target.value);

  const [wishDescription, setWishDescription] = useState('');
  const handleSetWishDescription = (e) => setWishDescription(e.target.value);

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const wish = {
      title: wishTitle, description: '',
    };
    try {
      await API.createWish(wish, token);
    }
    catch (e) {
      errorsHandler(e);
    }
  };

  return (
    <Card>
      <Title >Hello, {data.nickname}</Title>
      <form className="w-full" onSubmit={handleSubmit}>
        <Input label="New Wish title" onChange={handleSetWishTitle} value={wishTitle} />
        <TextArea height={200} label="New Wish description" onChange={handleSetWishDescription} value={wishDescription} />
        <div className="mt-4 flex justify-center">
          <Button onClick={handleSubmit}>Create wish</Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfilePage;
