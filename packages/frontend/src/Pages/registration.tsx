import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import API from '@/api';
import Title from '@/components/Title';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { ReactFormInput } from '@/components/Input';
import Link from '@/components/Link';
import Paths from '@/paths';
import AuthFormContainer from '@/components/AuthFormContainer';
import { getTokenCookie, setTokenCookie } from '@/cookies';
import { useErrors } from '@/hooks';
import { useStore } from '@/zustand';
import { IUserRegistration } from '@../../types';
import { nicknameRegex, passwordRegex } from '../../../constants';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const errorsHandler = useErrors();
  const [error, setError] = useState('');
  const addToken = useStore((state) => state.addToken);

  const { mutate, isLoading: loadingRegistration } = useMutation(
    (userData: IUserRegistration) => API.createUser(userData), {
      onSuccess: async (_, variables) => {
        const loginData = { nickname: variables.nickname, password: variables.password };
        mutateLogin(loginData);
      },
      onError: async (error: Error) => {
        const res = await errorsHandler(error);
        setError(res?.message);
      },
    }
  );

  const { mutate: mutateLogin, isLoading: loadingLogin } = useMutation(
    (loginData: IUserRegistration) => API.login(loginData), {
      onSuccess: async (data) => {
        if (data.token) {
          await setTokenCookie(data.token);
          addToken(data.token);
          navigate(Paths.profile);
        }
      },
      onError: async (error: Error) => {
        const res = await errorsHandler(error);
        setError(res?.message);
      },
    }
  );

  const { register, handleSubmit, formState: { errors }, watch } = useForm<IUserRegistration>(
    {
      mode: 'onSubmit',
    }
  );

  useEffect(() => {
    const checkToken = async () => {
      const token = await getTokenCookie();

      if (token) {
        navigate(Paths.profile);
      }
    };

    checkToken();
  }, [navigate]);

  const onSubmit: SubmitHandler<IUserRegistration> = async (userData: IUserRegistration) => {
    try {
      await mutate(userData);
    } catch (e) {
      const res = await errorsHandler(e);
      setError(res);
    }
  };

  return (
    <AuthFormContainer>
      <Card className="max-w-md">
        <Title>{t('createAccount')}</Title>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ReactFormInput
            errors={errors}
            label={t('nickname')}
            name="nickname"
            pattern={nicknameRegex}
            register={register}
            required
          />
          <ReactFormInput
            errors={errors}
            label={t('password')}
            name="password"
            pattern={passwordRegex}
            register={register}
            required
            type="password"
          />
          <ReactFormInput
            errors={errors}
            label={t('confirmPassword')}
            name="confirmPassword"
            register={register}
            required
            type="password"
            validate={(value) => value === watch('password') || 'Passwords do not match'}
          />
          <div className="flex justify-between">
            <div className="text-pink-600 h-6">{error}</div>
            <Link path={Paths.login} underline>{t('hasAccount')}</Link>
          </div>
          <div className="mt-4 flex justify-center">
            <Button loading={loadingRegistration || loadingLogin} onClick={handleSubmit(onSubmit)}>{t('create')}</Button>
          </div>
        </form>
      </Card>
    </AuthFormContainer>
  );
};

export default RegistrationPage;
