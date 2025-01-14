import { Request, Response } from 'express';
import { handleError } from '@/helpers';
import { followUserService, unFollowUserService } from '@/services';

export const followUserController = async (req: Request, res: Response) => {
  try {
    const followerId = req.id;
    const { followedId } = req.body;
    await followUserService({ followerId, followedId });
    res.status(200).json({ message: 'You are followed' });
  } catch (error) {
    handleError(error, res);
  }
};

export const unFollowUserController = async (req: Request, res: Response) => {
  try {
    const followerId = req.id;
    const { followedId } = req.body;
    await unFollowUserService({ followerId, followedId });
    res.status(200).json({ message: 'You have been unfollowed' });
  } catch (error) {
    handleError(error, res);
  }
};
