import type { ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import API from '@/api';
import { getTokenCookie, deleteTokenCookie } from '@/cookies';
import { useStore } from '@/zustand';
import { useAuth } from '@/hooks';
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
  const addId = useStore((state) => state.addId);
  const addToken = useStore((state) => state.addToken);
  const removeId = useStore((state) => state.removeId);
  const removeToken = useStore((state) => state.removeToken);
  const { isLogged } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenCookie();
      if (token) {
        const id = await API.checkToken(token);
        if (id) {
          addToken(token);
          addId(id);
        } else {
          removeToken();
          removeId();
          navigate(Paths.loginWithFallback(location.pathname));
        }
      }
    };
    fetchToken();
    const intervalId = setInterval(() => fetchToken(), 300000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = async () => {
    await deleteTokenCookie();
    removeToken();
    navigate(Paths.login);
  };

  const handleLogin = () => navigate(Paths.login);

  const topButton = isLogged
    ? <Button onClick={handleLogout}>
      {t('logout')}
    </Button>
    : <Button onClick={handleLogin}>
      {t('login')}
    </Button>;
  const isLoginPage = location.pathname === Paths.login;

  return (
    <LayoutContainer>
      <Header isLogged={isLogged}>
        {!isLoginPage
      && topButton}
      </Header>
      <div className="flex flex-col items-center h-full">
        <div className="w-11/12 max-w-screen-2xl flex justify-start items-start"><NextHolidayCard /></div>
        {children}
      </div>
      <div className="w-full h-full" />
    </LayoutContainer>);
};

export const PrivateLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const addToken = useStore((state) => state.addToken);
  const addId = useStore((state) => state.addId);
  const removeId = useStore((state) => state.removeId);
  const removeToken = useStore((state) => state.removeToken);
  const { t } = useTranslation();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenCookie();
      if (!token) {
        navigate(Paths.login);
      } else {
        try {
          const id = await API.checkToken(token);
          addToken(token);
          addId(id);
        } catch {
          await deleteTokenCookie();
          removeId();
          removeToken();
          navigate(Paths.login);
        }
      }
    };
    fetchToken();
    const intervalId = setInterval(() => fetchToken(), 300000);
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  const handleLogout = async () => {
    await deleteTokenCookie();
    removeToken();
    navigate(Paths.login);
  };

  return (
    <LayoutContainer>
      <Header isLogged>
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
