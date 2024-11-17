import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}

export const HttpError = (error: any) =>
  new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: error.message,
    },
    HttpStatus.BAD_REQUEST,
    {
      cause: error,
    },
  );
