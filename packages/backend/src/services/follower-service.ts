import { CustomError } from '@/helpers';
import { Follower } from '@/models';
import { isAlreadyFollowed } from '@/db-actions';

import { errorCodes } from '@shared/constants';
import { IFollowActionData } from '@shared/types';

export const followUserService = async (data: IFollowActionData) => {
  const alreadyFollowed = await isAlreadyFollowed(data);
  if (alreadyFollowed) {
    const error = new CustomError('You are followed already', errorCodes.alreadyExists);
    throw error;
  }
  const result = await Follower.create({ ...data, nickname: '' });
  return result;
};

export const unFollowUserService = async (data: IFollowActionData) => {
  const alreadyFollowed = await isAlreadyFollowed(data);
  if (!alreadyFollowed) {
    const error = new CustomError('Not founded', errorCodes.dataNotFounded);
    throw error;
  }
  const result = await Follower.destroy({
    where: {
      followerId: data.followerId,
      followedId: data.followedId
    }
  });
  return result;
};
