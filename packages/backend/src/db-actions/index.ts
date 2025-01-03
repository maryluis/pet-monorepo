import { Op } from 'sequelize';

import sequelize from '@/config/database';
import { User, Wish } from '@/models';
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

export const findUserById = async (userId: string) => {
  const result = await User.findOne({
    where: { id: userId },
  });
  const user = result.get();
  return !!user;
};

export const findUserByPartialSearch = async (partialSearch: string, page = 1, pageSize = 10) => {
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

    const hasMore = users.length === pageSize;
    return { users, hasMore };
  } catch (error) {
    handleError(error);
  }
};

