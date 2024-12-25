import jwt from 'jsonwebtoken';

import { CustomError } from '@/helpers';
import { User } from '@/models';
import { getUserById } from '@/db-actions';
import { nicknameRegex, passwordRegex } from '../../../constants';

import { IUserRegistration, IRegisteredUser, IUserLogin, IUser } from '../../types';

export const createUserService = async (data: IUserRegistration): Promise<IRegisteredUser> => {
  const { nickname, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    const error = new CustomError('Passwords do not match', 400);
    throw error;
  }

  const userExist = await User.findOne({
    where: { nickname },
  });
  if (userExist) {
    const error = new CustomError('Nickname is already taken', 409);
    throw error;
  }

  if (!nicknameRegex.test(nickname)) {
    const error = new CustomError('Nickname is invalid', 422);
    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new CustomError('Password is invalid', 422);
    throw error;
  }

  const newUser = await User.create({ nickname, password });
  return newUser;
};

export const loginService = async ( data: IUserLogin): Promise<IUser> => {
  const { nickname, password } = data;
  const result = await User.findOne({
    where: { nickname },
  });

  const user = result.get();

  if (!user) {
    const error = new CustomError('User not found or invalid credentials', 400);
    throw error;
  }

  const isMatch = await result.validatePassword(password);
  if (!isMatch) {
    const error = new CustomError('User not found or invalid credentials', 400);
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
    const error = new CustomError('User not founded', 422);
    throw error;
  }
};