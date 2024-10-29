import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

  @Post('/create')
  async createProduct(
    @Body() body: ProductDTO
  ) {
    return await this.productService.createProduct(body);
  }

  @Get('findAll')
  async findProducts() {
    return await this.productService.findAllProducts();
  }

  @Get('findById/:productId')
  async findByProductId(
    @Body() productId: string
  ) {
    return await this.productService.findByProductId(productId);
  }
}
