import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/zustand';
import { deleteTokenCookie } from '@/cookies';
import Paths from '@/paths';

export const useErrors = () => {
  const navigate = useNavigate();
  const removeToken = useStore((state) => state.removeToken);
  const { t } = useTranslation();

  return async (e) => {
    if (e.code === 409) {
      return { code: e.code, message: t('nicknameTaken') };
    }
    if (e.code === 401) {
      await deleteTokenCookie();
      removeToken();
      navigate(Paths.login);
      return e;
    }
    console.error(e);
  };
};

export default useErrors;
