import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorCodes } from '@shared/constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(errorCodes.accessDenied).json({ message: 'Access denied' });
  }

  const SECRET_KEY = process.env.SECRET_KEY;

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(errorCodes.invalidToken).json({ message: 'Invalid token', code: errorCodes.invalidToken });
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
      if (err) {
        next();
        return res.status(errorCodes.invalidToken).json({ message: 'Invalid token', code: errorCodes.invalidToken });
      }
      if (decoded.id) {
        req.user = { id: decoded.id };
      }
    });
  }

  next();
};
