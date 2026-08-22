import { IncomingMessage, ServerResponse } from 'node:http';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { resolveTraceId } from '../correlation/trace-id';

/**
 * Structured JSON logging via pino. Every request/response line is tagged with
 * `reqId`, resolved through the shared trace-id helper so pino's `reqId`, the
 * response header, and the `referenceId` on the BaseResponse envelope are all
 * the same value for a given request. Pretty-printed in development; raw JSON in
 * production for log shippers.
 */
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',
        genReqId: (req: IncomingMessage, res: ServerResponse) =>
          resolveTraceId(req, res),
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : { target: 'pino-pretty', options: { singleLine: true } },
      },
    }),
  ],
})
export class LoggingModule {}
