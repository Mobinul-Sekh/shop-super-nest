import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserAddressModule } from './user-address/user-address.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserCredentialModule } from './user-credential/user-credential.module';
import * as dotenv from 'dotenv';
import { VariantModule } from './variant/variant.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CategoryModule } from './category/category.module';
import { ProductDetailsModule } from './product-details/product-details.module';

dotenv.config({ path: process.cwd() + '/.env.development' });

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_STRING), ProductModule, CartModule, AuthModule, UserModule, UserAddressModule, UserDetailsModule, UserCredentialModule, VariantModule, CategoryModule, ProductDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
  }
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('**');
  }
}
