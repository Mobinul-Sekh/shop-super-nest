import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDetails, ProductDetailsSchema } from 'src/schemas/product-details.schema';
import { ProductDetailsService } from './product-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDetails.name, schema: ProductDetailsSchema }
    ])
  ],
  providers: [ProductDetailsService]
})
export class ProductDetailsModule {}
