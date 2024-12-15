import { Request, Response } from 'express';
import { createUserService, getProfileService, loginService } from '../services';
import { handleError } from '../helpers';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    handleError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  const { nickName, password } = req.body;
  if (!nickName || !password) {
    return res.status(400).json({ message: 'NickName and Password are required' });
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
    return res.status(400).json({ message: 'Profile not founded' });
  }
  try {
    const user = await getProfileService(id);
    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
};
