import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { QueryFailedError } from 'typeorm';
import { CorrelationIdProvider } from '../correlation/correlation-id.provider';
import { BaseResponse } from './base-response';
import { ErrorCode } from './error-code.enum';

const FK_VIOLATION = '23503';
const UNIQUE_VIOLATION = '23505';

interface MappedError {
  status: HttpStatus;
  errorCode: ErrorCode;
  message: string;
}

function mapConstraint(exception: QueryFailedError): MappedError | null {
  switch ((exception.driverError as { code?: string }).code) {
    case FK_VIOLATION:
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errorCode: ErrorCode.NotFound,
        message: 'A referenced record does not exist',
      };
    case UNIQUE_VIOLATION:
      return {
        status: HttpStatus.CONFLICT,
        errorCode: ErrorCode.Conflict,
        message: 'A record with the same unique value already exists',
      };
    default:
      return null;
  }
}

/**
 * Maps known Postgres constraint failures to meaningful responses. An
 * unrecognised database error is a genuine fault, so it is logged and reported
 * as a 500.
 */
@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    logger.setContext(DatabaseExceptionFilter.name);
  }

  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();
    const referenceId = CorrelationIdProvider.get();
    const mapped = mapConstraint(exception);

    if (!mapped) {
      this.logger.error(
        { referenceId, err: exception },
        'Unhandled database error',
      );
    }

    const body = BaseResponse.failure(
      mapped?.errorCode ?? ErrorCode.Error,
      mapped?.message ?? 'Internal server error',
      null,
      referenceId,
    );
    res
      .status(mapped?.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json(instanceToPlain(body));
  }
}
