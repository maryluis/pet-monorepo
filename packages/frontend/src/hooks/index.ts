import { useEffect, useState } from 'react';

import { holidayT } from '@/types';
import { getNearestHoliday } from '@/helpers';
import useErrors from './use-errors';
import useAuth from './use-auth';
import usePrivateAction from './use-private-action';

const useNearestHoliday = (countryCode: string = 'US'): holidayT | null => {
  const [nextHoliday, setNextHoliday] = useState<holidayT | null>(null);
  useEffect(() => {
    const getHoliday = async () => {
      const res = await getNearestHoliday(countryCode);
      if (res) {
        setNextHoliday(res);
      }
    };
    getHoliday();
  }, [countryCode]);
  return nextHoliday;
};

export { useErrors, useNearestHoliday, useAuth, usePrivateAction };
