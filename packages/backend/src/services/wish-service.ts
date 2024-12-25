import { CustomError } from '@/helpers';
import { Wish } from '@/models';

import { IWishCreateData, IWish } from '../../../types';

export const createWish = async (data: IWishCreateData): Promise<IWish> => {
  const { authorId, title, description = '' } = data;
  if (!title) {
    const error = new CustomError('Title cant be empty', 400);
    throw error;
  }
  const newWish = await Wish.create({ authorId, title, description });
  return newWish;
};
