import { Follower } from '@/models';

import { IFollowActionData } from '@shared/types';
import { handleError } from '@/helpers';

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
  } catch (error) {
    handleError(error);
  }
};
