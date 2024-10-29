import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config({ path: process.cwd() + '/.env.development' }); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  Logger.log(`Server Running on port ${process.env.PORT ?? 3000}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
