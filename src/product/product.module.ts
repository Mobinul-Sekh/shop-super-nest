import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schemas/products.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: "product", schema: ProductSchema}])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: []
})
export class ProductModule {}
