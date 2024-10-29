import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/products.schema';
import { ProductDTO } from './dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("product") private productModel: Model<Product>
  ) {}

  async createProduct(productDto: ProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(productDto);
    return createdProduct.save();
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
