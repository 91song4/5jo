import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // prefix 예외처리
  // exclude: [{ path: 'health', method: RequestMethod.GET }],
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
