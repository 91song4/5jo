import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // prefix 예외처리

  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });

  app.useStaticAssets(join(__dirname, '..', 'public')); // 정적파일제공 (nest모듈로했으니 안해도된다.)
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // dir
  app.setViewEngine('ejs'); // 템플릿 엔진설정

  // swagger 설정 - 공식문서
  const config = new DocumentBuilder()
    .setTitle('글래머와 캠핑')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
