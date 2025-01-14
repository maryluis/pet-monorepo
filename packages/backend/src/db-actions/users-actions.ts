import { Op } from 'sequelize';

import sequelize from '@/config/database';
import { User, Wish, Follower } from '@/models';
import { handleError } from '@/helpers';

export const getUserById = async (id: string) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'nickname'],
      include: [
        {
          model: Wish,
          as: 'myWishes',
          attributes: ['id', 'title', 'description', 'assigned', 'is_received'],
        },
        {
          model: Wish,
          as: 'assignedWishes',
          attributes: ['id', 'title', 'description', 'assigned', 'is_received'],
        },
        {
          model: Follower,
          as: 'followers',
          attributes: ['followedId', 'followerId', 'nickname'],
        },
      ],
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    handleError(error);
  }
};

export const getUserByNickname = async (nickname: string, id = '') => {
// TODO wishes pagination;
  const attributesWithoutId = [
    'id',
    'nickname',
    [
      sequelize.fn('COUNT', sequelize.col('followers.followedId')),
      'followersCount'
    ],
    [
      sequelize.fn('COUNT', sequelize.col('subscribers.followedId')),
      'subscribersCount'
    ],
  ];

  const attributesWithId = [
    ...attributesWithoutId,
    [
      sequelize.fn('COUNT', sequelize.where(
        sequelize.col('followers.followerId'),
        id,
      )),
      'amISubscribed',
    ]
  ];

  const attributes = id ? attributesWithId : attributesWithoutId;
  try {
    const user = await User.findOne({
      where: {
        nickname,
      },
      attributes: attributes,
      include: [
        {
          model: Wish,
          as: 'myWishes',
          attributes: ['id', 'title', 'description', 'assigned', 'is_received'],
        },
        {
          model: Follower,
          as: 'followers',
          attributes: [],
          required: false,
        },
        {
          model: Follower,
          as: 'subscribers',
          attributes: [],
          required: false,
        },
      ],
      subQuery: false,
      group: ['User.id', 'myWishes.id', 'followers.id', 'subscribers.id'],
    });

    if (!user) {
      return null;
    }
    const result = user.toJSON();
    result.wishes = result.myWishes;
    delete result.myWishes;
    result.followersCount = parseInt(result.followersCount, 10);
    result.subscribersCount = parseInt(result.subscribersCount, 10);
    if (id) {
      result.amISubscribed = result.amISubscribed === '1';
    } else {
      result.amISubscribed = false;
    }
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const findUserByPartialSearch = async (partialSearch: string, page = 1, pageSize = 10) => {
  // TODO if token - firstly friends;
  try {
    const offset = (page - 1) * pageSize;
    const users = await User.findAll({
      attributes: [
        'id',
        'nickname',
        [
          sequelize.fn('COUNT', sequelize.col('myWishes.id')),
          'wishesCount'
        ]
      ],
      include: [
        {
          model: Wish,
          as: 'myWishes',
          required: false,
          attributes: [],
        }
      ],
      where: {
        nickname: {
          [Op.iLike]: `%${partialSearch}%`,
        },
      },
      order: [
        [sequelize.col('wishesCount'), 'DESC'],
      ],
      subQuery: false,
      group: ['User.id'],
      offset,
      limit: pageSize,
    });

    const result = users.map(user => {
      const userData = user.toJSON();
      delete userData.wishesCount;
      return userData;
    });

    const hasMore = users.length === pageSize;
    return { users: result, hasMore };
  } catch (error) {
    handleError(error);
  }
};

