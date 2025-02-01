import { isFuture, isToday, getYear } from 'date-fns';

import { API } from '@/api';
import { holidayT } from '@/types';

export class CustomError extends Error {
  code: number;
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || 400;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (errorData) => {
  if (errorData?.status === 409) {
    const error = new CustomError('Already exists', 409);
    throw error;
  }
  if (errorData?.status === 401) {
    const error = new CustomError('Invalid token', 401);
    throw error;
  }
  const error = new CustomError(errorData?.message || 'Something went wrong', errorData?.status || 401);
  throw error;
};


export const getNearestHoliday = async (countryCode: string = 'US') => {
  const today = new Date();
  const thisYear = getYear(today);
  let holidayResult: null | holidayT = null;
  try {
    const thisYearHolidays = await API.getHolidaysByCountryYear(thisYear, countryCode);
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
      const futureYearsHolidays = await API.getHolidaysByCountryYear(thisYear + 1);
      if (futureYearsHolidays?.length > 0) {
        holidayResult = { ...futureYearsHolidays[0] };
      }
    }
    return holidayResult;
  } catch (error) {
    handleError(error);
  }
};
