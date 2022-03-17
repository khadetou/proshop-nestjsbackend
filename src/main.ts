import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application running on ${await app.getUrl()}`);
}
bootstrap();
