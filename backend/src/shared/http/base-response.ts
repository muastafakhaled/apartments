import { ApiProperty } from '@nestjs/swagger';
import { CorrelationIdProvider } from '../correlation/correlation-id.provider';
import { ErrorCode } from './error-code.enum';

/**
 * Uniform envelope wrapping every HTTP payload. `referenceId` carries the
 * per-request trace id so a caller can quote it back and we can pin every log
 * line for that request. The HTTP status is owned by the framework (route
 * default, `@HttpCode`, or the thrown exception) — it never lives on the body.
 */
export class BaseResponse<T> {
  @ApiProperty({ nullable: true })
  data: T | null;

  @ApiProperty({ example: 'OK' })
  message: string;

  @ApiProperty({ enum: ErrorCode, example: ErrorCode.Success })
  errorCode: ErrorCode;

  @ApiProperty({ example: '3f1c...trace-id' })
  referenceId: string;

  private constructor(init: {
    data: T | null;
    message: string;
    errorCode: ErrorCode;
    referenceId: string;
  }) {
    this.data = init.data;
    this.message = init.message;
    this.errorCode = init.errorCode;
    this.referenceId = init.referenceId;
  }

  static success<T>(
    data: T,
    message = 'OK',
    referenceId?: string,
  ): BaseResponse<T> {
    return new BaseResponse<T>({
      data,
      message,
      errorCode: ErrorCode.Success,
      referenceId: referenceId ?? CorrelationIdProvider.get(),
    });
  }

  static failure<T = null>(
    errorCode: ErrorCode,
    message: string,
    data: T | null = null,
    referenceId?: string,
  ): BaseResponse<T> {
    return new BaseResponse<T>({
      data,
      message,
      errorCode,
      referenceId: referenceId ?? CorrelationIdProvider.get(),
    });
  }
}
