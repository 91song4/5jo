import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // DTO의 유효성 검사 코드
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // 이 한줄만 넣어주면 됩니다! 잊지마세요!
  await app.listen(3000);
}
bootstrap();
