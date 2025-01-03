import { CustomError } from '@/helpers';
import { Wish } from '@/models';

import { IWishCreateData, IWish } from '../../../types';
import { errorCodes } from '../../../constants';

export const createWish = async (data: IWishCreateData): Promise<IWish> => {
  const { authorId, title, description = '' } = data;
  if (!title) {
    const error = new CustomError('Title cant be empty', errorCodes.wrongWishData);
    throw error;
  }
  const newWish = await Wish.create({ authorId, title, description });
  return newWish;
};
