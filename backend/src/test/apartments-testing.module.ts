import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsModule } from '../features/apartments/apartments.module';
import { buildDataSourceOptions } from '../infrastructure/database/typeorm.config';

/**
 * Compiles the real ApartmentsModule wired to the container Postgres, so specs
 * resolve production handlers/mappers/repositories and exercise actual SQL —
 * only the HTTP layer (controller, pipes, filters) is left out.
 */
export function createApartmentsTestingModule(): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        useFactory: () => buildDataSourceOptions(),
      }),
      ApartmentsModule,
    ],
  }).compile();
}
