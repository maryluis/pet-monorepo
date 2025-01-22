import { Request, Response } from 'express';
import { assignedWish, createWish, getWishes, cancelFromWish } from '@/services';
import { handleError } from '@/helpers';

import { IWish } from '@shared/types';

interface RequestWithId extends Request {
  id?: string,
}

export const assignedWishController = async (req: RequestWithId, res: Response) => {
  try {
    const { wishId } = req.body;
    const executorId = req.id;
    const wish = await assignedWish({ executorId, wishId });
    res.status(200).json({ wish });
  } catch (error) {
    handleError(error, res);
  }
};

export const cancelWishController = async (req: RequestWithId, res: Response) => {
  try {
    const { wishId } = req.body;
    const executorId = req.id;
    const wish = await cancelFromWish({ executorId, wishId });
    res.status(200).json({ wish });
  } catch (error) {
    handleError(error, res);
  }
};

export const createWishController = async (req: RequestWithId, res: Response) => {
  try {
    const { title, description } = req.body;
    const authorId = req.id || '';
    const wish: IWish | null = await createWish({ authorId, title, description });
    res.status(200).json({ message: 'Wish created successfully', wish });
  } catch (error) {
    handleError(error, res);
  }
};

interface GetWishRequest extends Request {
  query: {
    authorId: string;
    executorId: string;
  }
}
export const getWishesController = async (req: GetWishRequest, res: Response) => {
  try {
    const { authorId, executorId = '' } = req.query;
    const result: { wishes: IWish[], hasMore: boolean } | null = await getWishes({ authorId, executorId });
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};
