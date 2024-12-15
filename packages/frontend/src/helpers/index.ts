import { isFuture, isToday, getYear } from 'date-fns';

import { API } from '@/api';
import { holidayT } from '@/types';

export const handleError = (e) => {
  console.error('Request failed:', e);
};


export const getNearestHoliday = async () => {
  const today = new Date();
  const thisYear = getYear(today);
  let holidayResult: null | holidayT = null;
  try {
    const thisYearHolidays = await API.getHolidaysByCountryYear(thisYear);
    if (thisYearHolidays?.length > 0) {
      for (const holiday of thisYearHolidays) {
        const date = new Date (holiday.date);
        if (isToday(date) || isFuture(date)) {
          holidayResult = { ...holiday };
          break;
        }
      };
    }
    if (holidayResult === null) {
      const futureYearsHolidays = await API.getHolidaysByCountryYear(thisYear);
      if (futureYearsHolidays?.length > 0) {
        holidayResult = { ...futureYearsHolidays[0] };
      }
    }
    return holidayResult;
  } catch (error) {
    handleError(error);
  }
};
