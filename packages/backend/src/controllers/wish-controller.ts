import { Request, Response } from 'express';
import { createWish } from '@/services';
import { handleError } from '@/helpers';

export const createWishController = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const authorId = req.id;
    const wish = await createWish({ authorId, title, description });
    res.status(200).json({ message: 'Wish created successfully', wish });
  } catch (error) {
    handleError(error, res);
  }
};
