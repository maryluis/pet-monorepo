import { User, Wish } from '@/models';

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
    console.error('Error getting user by id:', error);
    throw error;
  }
};

export const findUserById = async (userId: string) => {
  const result = await User.findOne({
    where: { id: userId },
  });
  const user = result.get();
  return !!user;
};
