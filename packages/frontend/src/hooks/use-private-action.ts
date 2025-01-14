import { useNavigate, useLocation } from 'react-router-dom';
import Paths from '@/paths';
import useAuth from './use-auth';

export const usePrivateAction = (action: () => void) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  return () => {
    if (isLogged) {
      action();
    } else {
      navigate(Paths.loginWithFallback(location.pathname));
    }
  };
};

export default usePrivateAction;
