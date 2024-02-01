import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserInputError } from 'apollo-server-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (ve) => {
        return new UserInputError('Validation Failed', {
          ve,
        });
      },
    }),
  );
  await app.listen(3002);
}
bootstrap();
