import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { BaseResponse } from './base-response';

/**
 * Wraps every successful controller return value in the shared
 * {@link BaseResponse} envelope, so handlers return plain DTOs and the envelope
 * lives in exactly one place. The HTTP status is owned by Nest (route default
 * or `@HttpCode`); we only derive the human-facing `message` from it.
 */
@Injectable()
export class ResponseEnvelopeInterceptor<T> implements NestInterceptor<
  T,
  BaseResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<BaseResponse<T>> {
    const res = context.switchToHttp().getResponse<Response>();

    return next
      .handle()
      .pipe(
        map((data) =>
          BaseResponse.success(
            data,
            res.statusCode === HttpStatus.CREATED ? 'Created' : 'OK',
          ),
        ),
      );
  }
}
