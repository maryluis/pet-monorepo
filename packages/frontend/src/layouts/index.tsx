import type { ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getTokenCookie, deleteTokenCookie } from '@/cookies';
import { useStore } from '@/zustand';
import NextHolidayCard from '@/components/NextHolidayCard';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { Paths } from '@/paths';

const LayoutContainer = (props: { children: ReactNode}) => (
  <div
    className="grid w-screen h-screen"
    style={{
      gridTemplateRows: '70px 1fr 50px',
    }}
  >
    {props.children}
  </div>
);

export const PublicLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const removeToken = useStore((state) => state.removeToken);

  const handleLogout = async () => {
    await deleteTokenCookie();
    removeToken();
    navigate(Paths.login);
  };

  const handleLogin = () => navigate(Paths.login);

  const token = useStore((state) => state.token);
  const topButton = token
    ? <Button onClick={handleLogout}>
      {t('logout')}
    </Button>
    : <Button onClick={handleLogin}>
      {t('login')}
    </Button>;
  const isLoginPage = location.pathname === Paths.login;

  return (
    <LayoutContainer>
      <Header>
        {!isLoginPage
      && topButton}
      </Header>
      <div className="flex flex-col items-center h-full">
        <div className="w-full flex justify-start items-start"><NextHolidayCard /></div>
        {children}
      </div>
      <div className="w-full h-full" />
    </LayoutContainer>);
};

export const PrivateLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const addToken = useStore((state) => state.addToken);
  const removeToken = useStore((state) => state.removeToken);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const checkToken = async () => {
    const token = await getTokenCookie();
    if (!token) {
      navigate(Paths.login);
    } else {
      addToken(token);
    }
  };

  useLayoutEffect(() => {
    checkToken();
  }, [navigate]);

  const handleLogout = async () => {
    await deleteTokenCookie();
    removeToken();
    navigate(Paths.login);
  };

  return (
    <LayoutContainer>
      <Header>
        <Button onClick={handleLogout}>
          {t('logout')}
        </Button>
      </Header>
      <div className="flex flex-col items-center h-full">
        <div className="w-full flex justify-end items-end"><NextHolidayCard /></div>
        <div className="flex flex-col justify-center items-center h-full w-full">
          {children}
        </div>
      </div>
      <div className="w-full h-full" />
    </LayoutContainer>
  );
};
