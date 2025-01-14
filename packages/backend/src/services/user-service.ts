import jwt from 'jsonwebtoken';

import { CustomError } from '@/helpers';
import { User } from '@/models';
import { getUserById, findUserByPartialSearch, getUserByNickname } from '@/db-actions';
import { nicknameRegex, passwordRegex, errorCodes } from '@shared/constants';


import { IUserRegistration, IRegisteredUser, IUserLogin, IUser } from '@shared/types';

export const createUserService = async (data: IUserRegistration): Promise<IRegisteredUser> => {
  const { nickname, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    const error = new CustomError('Passwords do not match', errorCodes.wrongCredentialsRegistration);
    throw error;
  }

  const userExist = await User.findOne({
    where: { nickname },
  });

  if (userExist) {
    const error = new CustomError('Nickname is already taken', errorCodes.nicknameTaken);
    throw error;
  }

  if (!nicknameRegex.test(nickname)) {
    const error = new CustomError('Nickname is invalid', errorCodes.wrongCredentialsRegistration);
    throw error;
  }
  if (!passwordRegex.test(password)) {
    const error = new CustomError('Password is invalid', errorCodes.wrongCredentialsRegistration);
    throw error;
  }
  const newUser = await User.create({ nickname, password });
  const result = { nickname, id: newUser.id };
  return result;
};

export const loginService = async ( data: IUserLogin): Promise<IUser> => {
  const { nickname, password } = data;
  const result = await User.findOne({
    where: { nickname },
  });
  if (!result) {
    const error = new CustomError('User not found or invalid credentials', errorCodes.userNotFoundedOrWrongCredentials);
    throw error;
  }
  const user = result.get();
  if (!user) {
    const error = new CustomError('User not found or invalid credentials', errorCodes.userNotFoundedOrWrongCredentials);
    throw error;
  }
  const isMatch = await result.validatePassword(password);
  if (!isMatch) {
    const error = new CustomError('User not found or invalid credentials', errorCodes.userNotFoundedOrWrongCredentials);
    throw error;
  }
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

export const getProfileService = async (id: string) => {
  try {
    const result = await getUserById(id);
    return result;
  } catch {
    const error = new CustomError('User not founded', errorCodes.userNotFoundedOrWrongCredentials);
    throw error;
  }
};

export const getUserCommonInfo = async (nickname: string, id = '') => {
  try {
    const result = await getUserByNickname(nickname, id);
    return result;
  } catch {
    const error = new CustomError('User not founded', errorCodes.dataNotFounded);
    throw error;
  }
};

export const getUsersByPartialSearch = async (partialSearch: string, pageNumber = 1) => {
  try {
    const result = await findUserByPartialSearch(partialSearch, pageNumber);
    return result;
  } catch {
    const error = new CustomError('User not founded', errorCodes.userNotFoundedOrWrongCredentials);
    throw error;
  }
};
