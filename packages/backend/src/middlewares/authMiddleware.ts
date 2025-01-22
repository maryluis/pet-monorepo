import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorCodes } from '@shared/constants';

interface RequestWithId extends Request {
  id: string,
}

export const authMiddleware = (req: RequestWithId, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(errorCodes.accessDenied).json({ message: 'Access denied' });
  }

  const SECRET_KEY = process.env.SECRET_KEY;

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(errorCodes.invalidToken).json({ message: 'Invalid token', code: errorCodes.invalidToken });
    }
    else {
      req.id = decoded.id;
      next();
    }
  });
};

export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.header('Authorization')) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (decoded?.id) {
        req.id = decoded.id;
      }
    });
  }
  next();
};
