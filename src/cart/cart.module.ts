import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../schemas/cart.schema';
import { ProductService } from '../product/product.service';
import { Product, ProductSchema } from '../schemas/products.schema';
import { VariantModule } from 'src/variant/variant.module';
import { Variant, VariantSchema } from 'src/schemas/variant.schema';
import { VariantService } from 'src/variant/variant.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { ProductDetails, ProductDetailsSchema } from 'src/schemas/product-details.schema';
import { ProductDetailsModule } from 'src/product-details/product-details.module';
import { ProductDetailsService } from 'src/product-details/product-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Cart.name, schema: CartSchema},
      {name: Product.name, schema: ProductSchema},
      {name: Variant.name, schema: VariantSchema},
      { name: Category.name, schema: CategorySchema },
      { name: ProductDetails.name, schema: ProductDetailsSchema },
    ]),
    VariantModule,
    CategoryModule,
    ProductDetailsModule
  ],
  providers: [CartService, ProductService, VariantService, CategoryService, ProductDetailsService],
  controllers: [CartController]
})
export class CartModule {}
