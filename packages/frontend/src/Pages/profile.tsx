import { type ChangeEvent, type FormEvent, type MouseEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/zustand';
import { useErrors } from '@/hooks';
import API from '@/api';
import Title from '@/components/Title';
import Input from '@/components/Input';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import Card from '@/components/Card';
import { CustomError } from '@/helpers';

const ProfilePage = () => {
  const { t } = useTranslation();

  const errorsHandler = useErrors();

  const token = useStore((state) => state.token) || '';

  const [wishTitle, setWishTitle] = useState('');
  const handleSetWishTitle = (e: ChangeEvent<HTMLInputElement>) => setWishTitle(e.target.value);

  const [wishDescription, setWishDescription] = useState('');
  const handleSetWishDescription = (e: ChangeEvent<HTMLTextAreaElement>) => setWishDescription(e.target.value);

  const { data } = useQuery(
    'profile',
    () => API.getProfile(token || ''),
    {
      enabled: !!token,
      onError: async (err: CustomError) => {
        errorsHandler(err);
      }
    }
  );

  const handleSubmit = async(e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const wish = {
      title: wishTitle, description: wishDescription,
    };
    if (token) {
      try {
        await API.createWish(wish, token);
      }
      catch (e) {
        errorsHandler(e as CustomError);
      }
    }
  };

  const title = `${t('Hello')}, ${data?.nickname || ' '}`;
  return (
    <Card>
      <Title >{title}</Title>
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
