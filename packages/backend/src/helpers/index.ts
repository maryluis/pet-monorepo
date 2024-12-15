import { Response } from 'express';

export class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || 400;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleError(error: Error | CustomError, res: Response) {
  if (error.code) {
    const errorObj = { code: error.code, message: error.message };
    res.status(error.code).json({ error: errorObj, });
  } else {
    console.error(error);
    const errorObj = { message: 'Internal server error', stack: error.stack };
    res.status(500).json({ error: errorObj });
  }
}
