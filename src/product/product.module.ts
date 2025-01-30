import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/products.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema}
  ])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: []
})
export class ProductModule {}
