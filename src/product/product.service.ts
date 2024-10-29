import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/products.schema';
import { ProductDTO } from './dtos/product.dto';
import { ResponseInterface } from 'src/error-handler/interfaces';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("product") private productModel: Model<Product>
  ) {}

  async createProduct(productDto: ProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(productDto);
    return createdProduct.save();
  }

  async findAllProducts(): Promise<ResponseInterface | Error> {
    try {
      return {
        success: true,
        message: "successfully fetched all cart products",
        data: await this.productModel.find().exec()
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }

  async findByProductId(productId: string): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: "successfully fetched cart product",
        data: await this.productModel.findOne({id: productId}).exec()
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }
}
