import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { CorrelationIdProvider } from '../correlation/correlation-id.provider';
import { BaseResponse } from './base-response';
import { DomainException } from './domain-exception';
import { ErrorCode } from './error-code.enum';

/**
 * Renders every {@link HttpException} as a {@link BaseResponse} failure. Domain
 * errors carry their own {@link ErrorCode}; framework exceptions (ValidationPipe,
 * ParseIntPipe, guards) fall back to a generic code — their HTTP status still
 * comes through, only the business code is coarse. ValidationPipe surfaces
 * `message` as a `string[]`, which is preserved under `data.errors`.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const referenceId = CorrelationIdProvider.get();

    const raw = (exception.getResponse() as { message?: unknown }).message;
    const validationErrors = Array.isArray(raw) ? raw : null;

    const errorCode =
      exception instanceof DomainException
        ? exception.errorCode
        : validationErrors
          ? ErrorCode.Validation
          : ErrorCode.Error;

    const message =
      exception instanceof DomainException
        ? exception.message
        : validationErrors
          ? 'Validation failed'
          : exception.message;

    // 5xx is a server fault, 4xx is the caller's — split the level so alerting
    // can key off errors without drowning in expected client rejections.
    const log = { referenceId, status, err: exception };
    if (status >= 500) {
      this.logger.error(log, message);
    } else {
      this.logger.warn(log, message);
    }

    const body = BaseResponse.failure(
      errorCode,
      message,
      validationErrors ? { errors: validationErrors } : null,
      referenceId,
    );
    res.status(status).json(instanceToPlain(body));
  }
}
