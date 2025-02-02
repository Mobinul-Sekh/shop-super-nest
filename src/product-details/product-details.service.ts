import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDetails, ProductDetailsDocument } from 'src/schemas/product-details.schema';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectModel(ProductDetails.name) private productDetailsModel: Model<ProductDetails>
  ){}

  async createProductDetails(productDetailsDto: ProductDetails): Promise<ProductDetails> {
    const createdProductDetails = new this.productDetailsModel(productDetailsDto);
    return createdProductDetails.save();
  }
}
