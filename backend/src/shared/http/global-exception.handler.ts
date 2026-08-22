import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { CorrelationIdProvider } from '../correlation/correlation-id.provider';
import { BaseResponse } from './base-response';
import { ErrorCode } from './error-code.enum';

/**
 * Catch-all for unexpected failures. Expected business errors are thrown as
 * {@link DomainException}s and handled by {@link HttpExceptionFilter}; anything
 * reaching here is an unhandled bug or infra fault, logged and returned as 500.
 */
@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    logger.setContext(GlobalExceptionHandler.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();
    const referenceId = CorrelationIdProvider.get();

    this.logger.error({ referenceId, err: exception }, 'Unhandled exception');

    const body = BaseResponse.failure(
      ErrorCode.Error,
      'Internal server error',
      null,
      referenceId,
    );
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(instanceToPlain(body));
  }
}
