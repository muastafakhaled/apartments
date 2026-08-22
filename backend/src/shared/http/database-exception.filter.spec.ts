import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { QueryFailedError } from 'typeorm';
import { DatabaseExceptionFilter } from './database-exception.filter';
import { ErrorCode } from './error-code.enum';

const queryError = (code: string): QueryFailedError =>
  new QueryFailedError('', undefined, { code } as unknown as Error);

const stubLogger = () =>
  ({ setContext: jest.fn(), error: jest.fn() }) as unknown as PinoLogger;

describe('DatabaseExceptionFilter', () => {
  const filter = new DatabaseExceptionFilter(stubLogger());

  const run = (exception: QueryFailedError) => {
    const json = jest.fn();
    const status = jest.fn((_code: number) => ({ json }));
    const host = {
      switchToHttp: () => ({ getResponse: () => ({ status }) }),
    } as unknown as ArgumentsHost;

    filter.catch(exception, host);
    return { status: status.mock.calls[0][0], body: json.mock.calls[0][0] };
  };

  it('maps a foreign-key violation to 422 / NotFound', () => {
    const { status, body } = run(queryError('23503'));
    expect(status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(body.errorCode).toBe(ErrorCode.NotFound);
  });

  it('maps a unique violation to 409 / Conflict', () => {
    const { status, body } = run(queryError('23505'));
    expect(status).toBe(HttpStatus.CONFLICT);
    expect(body.errorCode).toBe(ErrorCode.Conflict);
  });

  it('falls back to 500 for an unmapped database error', () => {
    const { status, body } = run(queryError('42601'));
    expect(status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(body.errorCode).toBe(ErrorCode.Error);
  });
});
