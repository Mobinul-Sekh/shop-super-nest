import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from 'src/schemas/cart.schema';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { ProductSchema } from 'src/schemas/products.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "cart", schema: CartSchema}, {name: "product", schema: ProductSchema}])],
  providers: [CartService, ProductService],
  controllers: [CartController]
})
export class CartModule {}
