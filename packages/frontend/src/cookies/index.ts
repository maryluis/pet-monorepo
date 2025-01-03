import cookies from 'js-cookie';
import { tokenT } from '@/types';
import { langType } from '@shared/types';
import { default_lang } from '@shared/constants';

const KEY_TOKEN = 'token_user';

export const setTokenCookie = (token: string) => {
  cookies.set(KEY_TOKEN, token, {
    expires: 30,
    path: '/',
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
};

export const getTokenCookie = async (): tokenT => {
  const token = await cookies.get(KEY_TOKEN);
  if (token) {
    return token;
  }
  return null;
};

export const deleteTokenCookie = () => {
  cookies.remove(KEY_TOKEN, { path: '/' });
};

export const KEY_LANG = 'lang_cookie';

export const setLangCookie = (lang: langType) => {
  cookies.set(KEY_LANG, lang, {
    expires: 30,
    path: '/',
    sameSite: 'Strict',
  });
};

export const getLangCookie = async (): langType => {
  const lang = await cookies.get(KEY_LANG);
  if (lang) {
    return lang;
  }
  return default_lang;
};

export const deleteLangCookie = () => {
  cookies.remove(KEY_TOKEN, { path: '/' });
};
