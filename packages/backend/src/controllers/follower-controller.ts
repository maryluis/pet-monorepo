import { Request, Response } from 'express';
import { handleError } from '@/helpers';
import { followUserService, unFollowUserService } from '@/services';

import { errorCodes } from '@shared/constants';

interface RequestWithId extends Request {
  id?: string,
}

export const followUserController = async (req: RequestWithId, res: Response) => {
  try {
    const followerId = req.id;
    const { followedId } = req.body;
    if (followerId && followedId) {
      await followUserService({ followerId, followedId });
      res.status(200).json({ message: 'You are followed' });
    } else {
      res.status(errorCodes.dataNotFounded).json({ message: 'Wrong data' });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const unFollowUserController = async (req: RequestWithId, res: Response) => {
  try {
    const followerId = req.id;
    const { followedId } = req.body;
    if (followerId && followedId) {
      await unFollowUserService({ followerId, followedId });
      res.status(200).json({ message: 'You have been unfollowed' });
    } else {
      res.status(errorCodes.dataNotFounded).json({ message: 'Wrong data' });
    }
  } catch (error) {
    handleError(error, res);
  }
};
