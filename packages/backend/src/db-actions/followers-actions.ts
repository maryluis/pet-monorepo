import { Follower } from '@/models';
import { dbErrorsHandler } from '@/helpers';

import { IFollowActionData } from '@shared/types';

export const isAlreadyFollowed = async (data: IFollowActionData) => {
  const { followedId, followerId } = data;
  try {
    const following = await Follower.findOne({
      where: {
        followedId,
        followerId,
      },
    });
    return !!following;
  } catch {
    dbErrorsHandler();
  }
};
