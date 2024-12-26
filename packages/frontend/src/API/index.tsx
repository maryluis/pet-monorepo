import axios from 'axios';

import { IUserRegistration, IUserLogin } from '@../../types';
import URLS from '../../../api-urls';
import { handleError } from '@/helpers';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

const createUser = async (userData: IUserRegistration) => {
  try {
    const response = await axiosInstance.post(URLS.createUser, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const createWish = async (dataWish: { title: string, description: string }, token: string) => {
  try {
    const response = await axiosInstance.post(URLS.createWish, dataWish, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const login = async (userData: IUserLogin) => {
  try {
    const response = await axiosInstance.post(URLS.login, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getHolidaysByCountryYear = async (year: number, countryCode: string = 'UA') => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DATE_URL}${year}/${countryCode}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getProfile = async (token: string) => {
  try {
    const response = await axiosInstance.get(URLS.profile, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;

  } catch (error) {
    handleError(error);
  }
};

export const API = {
  createUser,
  createWish,
  getHolidaysByCountryYear,
  getProfile,
  login,
};

export default API;
