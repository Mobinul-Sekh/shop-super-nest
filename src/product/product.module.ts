import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/products.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { VariantService } from 'src/variant/variant.service';
import { VariantModule } from 'src/variant/variant.module';
import { Variant, VariantSchema } from 'src/schemas/variant.schema';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { ProductDetails, ProductDetailsSchema } from 'src/schemas/product-details.schema';
import { ProductDetailsModule } from 'src/product-details/product-details.module';
import { ProductDetailsService } from 'src/product-details/product-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Variant.name, schema: VariantSchema },
      { name: Category.name, schema: CategorySchema },
      { name: ProductDetails.name, schema: ProductDetailsSchema },
    ]),
    VariantModule,
    CategoryModule,
    ProductDetailsModule
],
  controllers: [ProductController],
  providers: [ProductService, VariantService, CategoryService, ProductDetailsService],
  exports: []
})
export class ProductModule {}
