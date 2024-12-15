import { v4 as uuid4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { CustomError } from '../helpers';
import { getUserById } from '../db';
import { nicknameRegex, passwordRegex } from '../../../constants';
import pool from '../../db';
import { IUserRegistration, IRegisteredUser, IUserLogin, IUser } from '../../types';

export const createUserService = async (data: IUserRegistration): Promise<IRegisteredUser> => {
  const { nickName, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    const error = new CustomError('Passwords do not match', 400);
    throw error;
  }

  const usersWithThisNickname = await pool.query('SELECT * FROM users WHERE nickName = $1', [nickName]);
  const user = usersWithThisNickname.rows[0];
  if (user) {
    const error = new CustomError('Nickname is already taken', 409);
    throw error;
  }

  if (!nicknameRegex.test(nickName)) {
    const error = new CustomError('Nickname is invalid', 422);
    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new CustomError('Password is invalid', 422);
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = uuid4();

  const result = await pool.query('INSERT INTO users(id, nickName, password) VALUES($1, $2, $3) RETURNING *',
    [id, nickName, hashedPassword]);

  return result.rows[0];
};

export const loginService = async ( data: IUserLogin): Promise<IUser> => {
  const { nickName, password } = data;
  const result = await pool.query('SELECT * FROM users WHERE nickName = $1', [nickName]);
  const user = result.rows[0];

  if (!user) {
    const error = new CustomError('User not found or invalid credentials', 400);
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
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

