import { CustomError } from './custom-error';

export class NotFoundPageError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundPageError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}