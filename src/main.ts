import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggingService } from './logger/logger.service';
import { HttpExceptionFilter } from './utils/exeptionFilter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(LoggingService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(logger);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 4000);

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${JSON.stringify(err)}`);
  });

  process.on('uncaughtException', (err) => {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    logger.error(`Uncaught Exception: ${message}`);
  });
}
bootstrap();
