import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { ApartmentsModule } from './features/apartments/apartments.module';
import { HealthModule } from './features/health/health.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { CorrelationMiddleware } from './shared/correlation/correlation.middleware';
import { HttpModule } from './shared/http/http.module';
import { LoggingModule } from './shared/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    LoggingModule,
    DatabaseModule,
    HttpModule,
    ApartmentsModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
