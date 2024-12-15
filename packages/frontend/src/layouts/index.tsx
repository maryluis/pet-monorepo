import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTokenCookie, deleteTokenCookie } from '@/cookies';
import { useStore } from '@/zustand';
import { holidayT } from '@/types';
import { useNearestHoliday } from '@/hooks';
import Button from '@/components/Button';
import { Paths } from '@/paths';

export const PublicLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const navigate = useNavigate();
  const handleLogin = () => navigate(Paths.login);

  const nextHoliday: holidayT | null = useNearestHoliday();

  return (<div
    className="grid w-screen h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    style={{
      gridTemplateRows: '50px 1fr 50px',
    }}
  >
    <div className="p-2 w-full h-full bg-green-200 flex justify-end items-center">
      {nextHoliday !== null
      && <h2 style={{ marginRight: '12px' }}>The next holiday is {nextHoliday.name} on {nextHoliday.date} </h2>}
      <Button onClick={handleLogin}>
        Login
      </Button>
    </div>
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
    <div className="w-full h-full bg-green-200" />
  </div>);
};

export const PrivateLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const addToken = useStore((state) => state.addToken);
  const nextHoliday: holidayT | null = useNearestHoliday();

  const navigate = useNavigate();
  useEffect(() => {
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
    <div className="p-2 w-full h-full bg-green-200 flex justify-end items-center">
      {nextHoliday !== null
      && <h2 style={{ marginRight: '12px' }}>The next holiday is {nextHoliday.name} on {nextHoliday.date} </h2>}
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
    <div className="w-full h-full bg-green-200" />
  </div>);
};
