import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ResponseEnvelopeInterceptor } from './shared/http/response-envelope.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseEnvelopeInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Apartments API')
    .setDescription('Nawy apartment listing API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use('/reference', apiReference({ content: document }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
