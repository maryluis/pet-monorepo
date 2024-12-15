import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// import { CustomError } from '@/helpers';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const SECRET_KEY = process.env.SECRET_KEY;

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token', code: 401 });
    }
    else {
      req.id = decoded.id;
      next();
    }
  });
};

export default authMiddleware;