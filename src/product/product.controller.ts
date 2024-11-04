import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDocument } from 'src/schemas/products.schema';
import { ResponseInterface } from 'src/error-handler/interfaces';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

  @Post('/create')
  async createProduct(
    @Body() body: ProductDocument
  ): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: "successfully added product to db",
        data: await this.productService.createProduct(body)
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }

  @Get('findAll')
  async findProducts(): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: "successfully fetched all products",
        data: await this.productService.findAllProducts()
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }

  @Get('findById/:productId')
  async findByProductId(
    @Body() productId: string
  ) {
    try {
      return {
        success: true,
        message: `successfully fetched product with id ${productId}`,
        data: this.productService.findByProductId(productId)
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }
}
