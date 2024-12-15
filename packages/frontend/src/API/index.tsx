import { IUserRegistration, IUserLogin } from '@../../types';
import URLS from '../../../api-urls';
import { handleError } from '@/helpers';

const BASE_URL = 'http://localhost:3001';

const createUser = async(userData: IUserRegistration) => {
  const url = `${BASE_URL}${URLS.createUser}`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    handleError(error);
  }
};

const login = async(userData: IUserLogin) => {
  const url = `${BASE_URL}${URLS.login}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

const getHolidaysByCountryYear = async (year, countryCode = 'UA', ) => {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`, {
      method: 'GET',
    });
    const holidays = response.json();
    return holidays;
  } catch (error) {
    handleError(error);
  }
};

const getProfile = async (token: string,) => {
  const URL = `${BASE_URL}${URLS.profile}` as string;
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  if (response.status === 401) {
    return 401;
  }
  const content = await response.json();

  return content;
};

export const API = {
  createUser,
  getHolidaysByCountryYear,
  getProfile,
  login,
};

export default API;
