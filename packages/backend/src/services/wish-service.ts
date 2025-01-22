import { CustomError } from '@/helpers';
import { Wish } from '@/models';
import { getWishesByAuthorId, assignExecutorToWish, cancelExecutorFromWish } from '@/db-actions';

import { IWishCreateData, IWish, IWishGetData } from '@shared/types';
import { errorCodes } from '@shared/constants';

export const assignedWish = async (data: { executorId: string, wishId: string }): Promise<IWish | null> => {
  const { executorId, wishId } = data;
  if (!executorId || !wishId) {
    const error = new CustomError('Wrong data', errorCodes.wrongWishData);
    throw error;
  }
  const result = await assignExecutorToWish(wishId, executorId);
  return result;
};

export const cancelFromWish = async (data: { executorId: string, wishId: string }): Promise<IWish | null> => {
  const { executorId, wishId } = data;
  if (!executorId || !wishId) {
    const error = new CustomError('Wrong data', errorCodes.wrongWishData);
    throw error;
  }
  const result = await cancelExecutorFromWish(wishId, executorId);
  return result;
};

export const createWish = async (data: IWishCreateData): Promise<IWish | null> => {
  const { authorId, title, description = '' } = data;
  if (!title) {
    const error = new CustomError('Title cant be empty', errorCodes.wrongWishData);
    throw error;
  }
  const newWish = await Wish.create({ authorId, title, description });
  return newWish.get();
};

type wishList = { wishes: IWish[], hasMore: boolean };
export const getWishes = async (data: IWishGetData): Promise<wishList> => {
  const { authorId, executorId = '' } = data;
  if (!authorId) {
    const error = new CustomError('AuthorId cant be empty', errorCodes.wrongWishData);
    throw error;
  }
  const wishes = await getWishesByAuthorId(authorId, executorId);
  return wishes;
};

