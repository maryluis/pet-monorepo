import { useState, useEffect } from 'react';

import { useStore } from '@/zustand';

const useAuth = () => {
  const [result, setResult] = useState({ token: '', isLogged: false, id: '' });
  const token = useStore(store => store.token);
  const id = useStore(store => store.id);
  useEffect(() => {
    if (token && id) {
      setResult({ token, isLogged: !!token, id });
    } else {
      setResult({ token: token ?? '', isLogged: !!token, id: '' });
    }
  }, [token]);
  return result;
};

export default useAuth;
