import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // prefix 예외처리
  // exclude: [{ path: 'health', method: RequestMethod.GET }],
  app.setGlobalPrefix('api');

  // swagger 설정 - 공식문서
  const config = new DocumentBuilder()
    .setTitle('글래머와 캠핑')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 로그인시도에 사용해볼 옵션 {
  // retryAttempts: message retry count(default: 0)
  // retryDelay: Delay between message retry attempts(ms)(default: 0)
  // }

  await app.listen(3000);
}
bootstrap();
