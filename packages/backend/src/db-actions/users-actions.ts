import { Op } from 'sequelize';

import sequelize from '@/config/database';
import { User, Wish, Follower } from '@/models';
import { dbErrorsHandler } from '@/helpers';


export const getUserById = async (id: string) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'nickname'],
      include: [
        {
          model: Wish,
          as: 'myWishes',
          attributes: ['id', 'title', 'description', 'isAssigned', 'isReceived'],
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
  } catch {
    dbErrorsHandler();
  }
};

export const getUserByNickname = async (nickname: string, id = '') => {
  const attributesWithoutId = [
    'id',
    'nickname',
    [
      sequelize.fn('COUNT', sequelize.literal('DISTINCT "myWishes"."id"')),
      'wishesCount'
    ],
    [
      sequelize.fn('COUNT', sequelize.literal('DISTINCT "followers"."id"')),
      'followersCount'
    ],
    [
      sequelize.fn('COUNT', sequelize.literal('DISTINCT "subscribers"."id"')),
      'subscribersCount'
    ],
  ];

  const attributesWithId = [
    ...attributesWithoutId,
    [
      sequelize.fn('COUNT', sequelize.where(
        sequelize.literal('DISTINCT "followers"."followerId"'),
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
      attributes,
      include: [
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
        {
          model: Wish,
          as: 'myWishes',
          attributes: [],
          required: false,
        },
      ],
      subQuery: false,
      limit: 1,
      group: ['User.id'],
    });

    if (!user) {
      return null;
    }
    const result = user.toJSON();
    if (typeof result.followersCount === 'string') {
      result.followersCount = parseInt(result.followersCount, 10);
    } else {
      result.followersCount = 0;
    }
    if (typeof result.subscribersCount === 'string') {
      result.subscribersCount = parseInt(result.subscribersCount, 10);
    } else {
      result.subscribersCount = 0;
    }
    if (typeof result.wishesCount === 'string') {
      result.wishesCount = parseInt(result.wishesCount, 10);
    } else {
      result.wishesCount = 0;
    }
    if (id) {
      result.amISubscribed = result.amISubscribed === '1';
    } else {
      result.amISubscribed = false;
    }
    return result;
  } catch {
    dbErrorsHandler();
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
  } catch {
    dbErrorsHandler();
  }
};

