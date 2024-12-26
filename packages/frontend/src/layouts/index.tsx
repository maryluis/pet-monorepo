import type { ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getTokenCookie, deleteTokenCookie } from '@/cookies';
import { useStore } from '@/zustand';
import { Exit } from '@/icons';
import NextHolidayCard from '@/components/NextHolidayCard';
import Button from '@/components/Button';
import { Paths } from '@/paths';

export const PublicLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isLoginPage = location.pathname === Paths.login;

  const handleLogin = () => navigate(Paths.login);

  return (<div
    className="grid w-screen h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    style={{
      gridTemplateRows: '50px 1fr 50px',
    }}
  >
    <div className="p-2 w-full h-full flex justify-end items-center">
      {!isLoginPage && <Button onClick={handleLogin}>
        {t('login')}
      </Button>}
    </div>
    <div className="flex flex-col items-center h-full">
      <div className="w-full flex justify-end items-end"><NextHolidayCard /></div>
      <div className="flex flex-col items-center justify-center h-full w-full">
        {children}
      </div>
    </div>
    <div className="w-full h-full" />
  </div>);
};

export const PrivateLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const addToken = useStore((state) => state.addToken);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const checkToken = async () => {
      const token = await getTokenCookie();

      if (!token) {
        navigate(Paths.login);
      } else {
        addToken(token);
      }
    };

    checkToken();
  }, [navigate]);

  const handleLogout = async () => {
    await deleteTokenCookie();
    navigate(Paths.login);
  };

  return (<div
    className="grid w-screen h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    style={{
      gridTemplateRows: '50px 1fr 50px',
    }}
  >
    <div className="p-2 w-full h-full flex justify-end items-center">
      <div onClick={handleLogout}>
        <Exit />
      </div>
    </div>
    <div className="flex flex-col items-center h-full">
      <div className="w-full flex justify-end items-end"><NextHolidayCard /></div>
      <div className="flex flex-col justify-center items-center h-full w-full">
        {children}
      </div>
    </div>
    <div className="w-full h-full" />
  </div>);
};
