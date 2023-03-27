import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import JwtAuthenticationGuard from './auth/jwt-authentication.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useWebSocketAdapter(new IoAdapter(app));

  // prefix 예외처리

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'view/(.*)', method: RequestMethod.GET },
    ],
  });

  app.useStaticAssets(join(__dirname, '..', 'src', 'public')); // 정적파일제공 (nest모듈로했으니 안해도된다.)
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views')); // dir
  app.setViewEngine('ejs'); // 템플릿 엔진설정
  app.use(cookieParser());

  // swagger 설정 - 공식문서 - 의미없는 cats API 제거
  const config = new DocumentBuilder()
    .setTitle('글래머와 캠핑')
    .setDescription('글램핑 페이지 개발을 위한 API 문서')
    .setVersion('1.0')
    .addCookieAuth('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 로거를 사용하도록 앱을 구성함
  const logger = new Logger('Application');
  app.useLogger(logger);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // DTO의 유효성 검사 코드
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // 이 한줄만 넣어주면 됩니다! 잊지마세요!

  // 전역 가드 설정
  app.useGlobalGuards(new JwtAuthenticationGuard());

  console.log(`${port} 서버가 열렸어요`);
}
bootstrap();
