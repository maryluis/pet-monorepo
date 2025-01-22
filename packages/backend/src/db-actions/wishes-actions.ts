import { handleError, CustomError } from '@/helpers';
import { Wish } from '@/models';

import { errorCodes } from '@shared/constants';
import { IWish } from '@shared/types';

export const getWishesByAuthorId = async (authorId: string, executorId = '', page = 1, pageSize = 10): { wishes: IWish[], hasMore: boolean } => {
  try {
    const offset = (page - 1) * pageSize;
    const whereWithoutExecutor = {
      authorId,
    };
    const whereWithExecutor = {
      ...whereWithoutExecutor,
      executorId,
    };

    const where = executorId ? whereWithExecutor : whereWithoutExecutor;
    const wishes = await Wish.findAll({
      where,
      attributes: ['id', 'authorId', 'title', 'description', 'executorId', 'isAssigned', 'isReceived', 'createdAt', 'updatedAt'],
      limit: pageSize,
      group: ['Wish.id'],
      offset
    });

    if (!wishes) {
      return null;
    }
    const hasMore = wishes.length === pageSize;
    return { wishes, hasMore };
  } catch (error) {
    handleError(error);
  }
};

export async function assignExecutorToWish(wishId: string, executorId: string): IWish {
  try {
    const wish = await Wish.findOne({
      where: {
        id: wishId,
        isAssigned: false
      }
    });
    if (!wish) {
      const error = new CustomError('Wish not found or already assigned', errorCodes.dataNotFounded);
      throw error;
    }

    wish.executorId = executorId;
    wish.isAssigned = true;

    await wish.save();

    return wish.get();
  } catch (error) {
    handleError(error);
  }
}

export async function cancelExecutorFromWish(wishId: string, executorId: string): IWish {
  try {
    const wish = await Wish.findOne({
      where: {
        id: wishId,
        isAssigned: true
      }
    });

    if (!wish || wish.executorId !== executorId) {
      const error = new CustomError('Wish not found or already assigned', errorCodes.dataNotFounded);
      throw error;
    }

    wish.executorId = null;
    wish.isAssigned = false;

    await wish.save();

    return wish.get();
  } catch (error) {
    handleError(error);
  }
}
