import axios from 'axios';

import { IUserLogin, IWish } from '@shared/types';
import { IErrorData } from '@/types';
import URLS from '@shared/api-urls';
import { handleError } from '@/helpers';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

const headerWithToken = (token:string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const assignWish = async (token: string, wishId: string) => {
  const response = await axiosInstance.put(URLS.assignWish, { wishId }, {
    headers: headerWithToken(token),
  });
  return response.data;
};

const cancelAssignWish = async (token: string, wishId: string) => {
  const response = await axiosInstance.put(URLS.cancelAssignWish, { wishId }, {
    headers: headerWithToken(token),
  });
  return response.data;
};

const checkToken = async (token: string) => {
  try {
    const response = await axiosInstance.get(URLS.authCheck, {
      headers: headerWithToken(token),
    });
    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
  }
};

const createUser = async (userData: IUserLogin) => {
  try {
    const response = await axiosInstance.post(URLS.createUser, userData);
    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
  }
};

const createWish = async (dataWish: { title: string, description: string }, token: string) => {
  try {
    const response = await axiosInstance.post(URLS.createWish, dataWish, {
      headers: headerWithToken(token),
    });

    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
  }
};

const followUser = async (followedId: string, token: string) => {
  try {
    const response = await axiosInstance.post(URLS.followers, { followedId }, {
      headers: headerWithToken(token),
    });
    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
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
    handleError(error as IErrorData);
  }
};

const getHolidaysByCountryYear = async (year: number, countryCode: string = 'UA') => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DATE_URL}${year}/${countryCode}`);
    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
  }
};

const getProfile = async (token: string) => {
  try {
    const response = await axiosInstance.get(URLS.profile, {
      headers: headerWithToken(token),
    });
    return response.data;

  } catch (error) {
    handleError(error as IErrorData);
  }
};

const getUserByNickname = async (nickname: string, token = '') => {
  try {
    const headers = token ? {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    } : undefined;
    const response = await axiosInstance.get(URLS.userByNickname(nickname), { headers });
    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
  }
};

const getUsersByParticularSearch = async (search: string, pageNumber = 1, token = '') => {
  try {
    const headers = token ? {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    } : undefined;

    const response = await axiosInstance.get(URLS.usersSearch(search, pageNumber.toString()), { headers });
    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
  }
};

const unFollowUser = async (followedId: string, token: string) => {
  try {
    const response = await axiosInstance.delete(URLS.followers, {
      headers: headerWithToken(token),
      data: { followedId },
    });
    return response.data;
  } catch (error) {
    handleError(error as IErrorData);
  }
};

const getWishes = async (authorId: string, pageNumber = 1, executorId = '') => {
  try {
    const response = await axiosInstance.get(URLS.wishesList(authorId, pageNumber, executorId));
    return response.data as { wishes: IWish[]};
  } catch (error) {
    handleError(error as IErrorData);
  }
};

export const API = {
  assignWish,
  cancelAssignWish,
  checkToken,
  createUser,
  createWish,
  followUser,
  getHolidaysByCountryYear,
  getProfile,
  getUserByNickname,
  getUsersByParticularSearch,
  getWishes,
  login,
  unFollowUser,
};

export default API;
