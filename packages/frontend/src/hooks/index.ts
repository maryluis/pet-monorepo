import { useEffect, useState } from 'react';

import { holidayT } from '@/types';
import { getNearestHoliday } from '@/helpers';
import useErrors from './use-errors';

const useNearestHoliday: holidayT | null = () => {
  const [nextHoliday, setNextHoliday] = useState<holidayT | null>(null);
  useEffect(() => {
    const getHoliday = async () => {
      const res = await getNearestHoliday();
      if (res) {
        setNextHoliday(res);
      }
    };
    getHoliday();
  }, []);
  return nextHoliday;
};

export { useErrors, useNearestHoliday };
