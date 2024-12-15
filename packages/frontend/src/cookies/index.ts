import cookies from 'js-cookie';
import { tokenT } from '@/types';

const KEY = 'token_user';

export const setTokenCookie = (token: string) => {
  cookies.set(KEY, token, {
    expires: 30,
    path: '/',
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
};

export const getTokenCookie = async (): tokenT => {
  const token = await cookies.get(KEY);
  if (token) {
    return token;
  }
  return null;
};

export const deleteTokenCookie = () => {
  cookies.remove(KEY, { path: '/' });
};
