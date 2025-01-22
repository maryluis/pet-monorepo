import { Response } from 'express';
import { errorCodes } from '@shared/constants';

export class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || 400;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleError(error: Error | CustomError | unknown, res: Response) {
  if (error instanceof CustomError) {
    const errorObj = { code: error.code, message: error.message };
    res.status(error.code).json({ error: errorObj, });
  } else if (error instanceof Error) {
    const errorObj = { message: 'Internal server error', stack: error.stack };
    res.status(errorCodes.serverError).json({ error: errorObj });
  } else {
    res.status(errorCodes.serverError).json('Internal server error');
  }
}
