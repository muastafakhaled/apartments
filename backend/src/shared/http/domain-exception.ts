import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

/**
 * Base class for expected business failures. Extends {@link HttpException} so it
 * flows through Nest's normal exception pipeline, but also carries a stable
 * {@link ErrorCode} that {@link HttpExceptionFilter} lifts onto the response
 * envelope. Handlers throw these; they never assemble responses themselves.
 */
export class DomainException extends HttpException {
  constructor(
    readonly errorCode: ErrorCode,
    message: string,
    status: HttpStatus,
  ) {
    super(message, status);
  }
}

/** A requested resource does not exist. */
export class ResourceNotFoundError extends DomainException {
  constructor(message: string) {
    super(ErrorCode.NotFound, message, HttpStatus.NOT_FOUND);
  }
}
