import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseExceptionFilter } from './database-exception.filter';
import { GlobalExceptionHandler } from './global-exception.handler';
import { HttpExceptionFilter } from './http-exception.filter';

/**
 * Binds the exception filters as providers so they can inject the pino logger.
 * The catch-all is registered first on purpose: Nest applies the last-registered
 * matching filter, so QueryFailedError and HttpException are handled by their
 * specific filters and only the unclassified rest falls through to the catch-all.
 */
@Module({
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionHandler },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: DatabaseExceptionFilter },
  ],
})
export class HttpModule {}
