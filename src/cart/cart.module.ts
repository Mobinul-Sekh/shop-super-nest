import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../schemas/cart.schema';
import { ProductService } from '../product/product.service';
import { Product, ProductSchema } from '../schemas/products.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Cart.name, schema: CartSchema},
    {name: Product.name, schema: ProductSchema}
  ])],
  providers: [CartService, ProductService],
  controllers: [CartController]
})
export class CartModule {}
