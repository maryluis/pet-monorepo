import { Request, Response } from 'express';
import { createUserService, getProfileService, loginService, getUsersByPartialSearch } from '@/services';
import { handleError } from '@/helpers';
import { errorCodes } from '@shared/constants';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    handleError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  const { nickname, password } = req.body;
  if (!nickname || !password) {
    return res.status(errorCodes.nicknamePAsswordRequired).json({ message: 'NickName and Password are required' });
  }
  try {
    const token = await loginService(req.body);
    res.status(200).json({ message: 'Success', token });
  } catch (error) {
    handleError(error, res);
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req;
  if (!id) {
    return res.status(errorCodes.dataNotFounded).json({ message: 'Profile not founded' });
  }
  try {
    const user = await getProfileService(id);
    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const getUsersBySearch = async (req: Request, res: Response) => {
  const { search, pageNumber } = req.query;
  if (!search) {
    return res.status(errorCodes.dataNotFounded).json({ message: 'Users not founded' });
  }
  try {
    const users = await getUsersByPartialSearch(search, +pageNumber);
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};
