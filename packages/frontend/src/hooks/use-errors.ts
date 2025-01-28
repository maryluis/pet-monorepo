import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/zustand';
import { requestTypes } from '@/constants';
import { deleteTokenCookie } from '@/cookies';
import Paths from '@/paths';
import { errorCodes } from '@shared/constants';

export const useErrors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const removeToken = useStore((state) => state.removeToken);
  const { t } = useTranslation();

  return async (e, requestType?: string) => {
    if (requestType === requestTypes.auth && e.code === errorCodes.userNotFoundedOrWrongCredentials) {
      return { code: e.code, message: t('wrongNicknameOrPassword') };
    }
    if (e.code === errorCodes.nicknameTaken) {
      return { code: e.code, message: t('nicknameTaken') };
    }
    if (e.code === errorCodes.invalidToken) {
      await deleteTokenCookie();
      removeToken();
      navigate(Paths.loginWithFallback(location.pathname));
      return e;
    }
    console.error(`err ${e}`);
  };
};

export default useErrors;
