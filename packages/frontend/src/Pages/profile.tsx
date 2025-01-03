import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/zustand';
import { deleteTokenCookie } from '@/cookies';
import { useErrors } from '@/hooks';
import API from '@/api';
import Paths from '@/paths';
import Title from '@/components/Title';
import Input from '@/components/Input';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import Card from '@/components/Card';

const ProfilePage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const errorsHandler = useErrors();

  const token = useStore((state) => state.token);
  const removeToken = useStore((state) => state.removeToken);

  const [wishTitle, setWishTitle] = useState('');
  const handleSetWishTitle = (e) => setWishTitle(e.target.value);

  const [wishDescription, setWishDescription] = useState('');
  const handleSetWishDescription = (e) => setWishDescription(e.target.value);

  const { data } = useQuery(
    'profile',
    () => API.getProfile(token),
    {
      enabled: !!token,
      onError: async (err: Error) => {
        errorsHandler(err);
        if (err.message === 'Unauthorized') {
          await deleteTokenCookie();
          removeToken();
          navigate(Paths.login);
        }
      }
    }
  );

  const handleSubmit = async(e) => {
    e.preventDefault();
    const wish = {
      title: wishTitle, description: wishDescription,
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
      <Title >{t('Hello')}, {data?.nickname}</Title>
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
