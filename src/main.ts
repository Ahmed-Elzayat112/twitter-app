import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ValidationPipe } from '@nestjs/common';
import { GqlHttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GqlHttpExceptionFilter());
  app.use(graphqlUploadExpress({ maxFileSize: 2000000, maxFiles: 5 }));
  await app.listen(3000);
}
bootstrap();
