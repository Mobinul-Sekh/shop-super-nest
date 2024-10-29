import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env.development' });

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_STRING), ProductModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
