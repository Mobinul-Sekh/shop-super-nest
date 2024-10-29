import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env.development' });

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_STRING), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
