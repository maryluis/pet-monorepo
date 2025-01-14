import { useState,
  useEffect
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import API from '@/api';
import Title from '@/components/Title';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { ReactFormInput } from '@/components/Input';
import { requestTypes } from '@/constants';
import AuthFormContainer from '@/components/AuthFormContainer';
import Link from '@/components/Link';
import Paths from '@/paths';
import { setTokenCookie, getTokenCookie } from '@/cookies';
import { useErrors } from '@/hooks';
import { useStore } from '@/zustand';
import { IUserLogin } from '@shared/types';
import { nicknameRegex, passwordRegex } from '@shared/constants';

export default function LoginPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fallback = queryParams.get('fallback');
  const addToken = useStore((state) => state.addToken);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const errorsHandler = useErrors();
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<IUserLogin>(
    {
      mode: 'onSubmit',
    }
  );

  const { mutate: mutateLogin, isLoading: loadingLogin } = useMutation(
    (loginData: IUserLogin) => API.login(loginData), {
      onSuccess: async (data) => {
        if (data.token) {
          await setTokenCookie(data.token);
          addToken(data.token);
          if (fallback) {
            navigate(fallback);
          } else {
            navigate(Paths.profile);
          }
        }
      },
      onError: async (error: Error) => {
        const res = await errorsHandler(error, requestTypes.auth);
        setError(res?.message);
      },
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

  const onSubmit: SubmitHandler<IUserLogin> = async (userData: IUserLogin) => await mutateLogin(userData);

  return (
    <AuthFormContainer>
      <Card>
        <Title>{t('login')}</Title>
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
            autocomplete="current-password"
            errors={errors}
            label={t('password')}
            name="password"
            pattern={passwordRegex}
            register={register}
            required
            type="password"
          />
          <div className="flex justify-between">
            <div className="text-pink-600 h-6">{error}</div>
            <Link path={Paths.registration} underline>{t('hasntAccount')}</Link>
          </div>
          <div className="mt-4 flex justify-center">
            <Button loading={loadingLogin} onClick={handleSubmit(onSubmit)}>{t('login')}</Button>
          </div>
        </form>
      </Card>
    </AuthFormContainer>
  );
};
