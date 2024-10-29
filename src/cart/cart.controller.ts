import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDTO } from './dtos/cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService
  ) {}

  @Post('add')
  async addProductToCart(
    @Body() body: CartDTO
  ) {
    return await this.cartService.addProductToCart(body);
  }

  @Get('findAll')
  async findAllProductsInCart() {
    return await this.cartService.findAllProductsInCart();
  }

  @Get('findById/:productId')
  async findByProductId(
    @Param('productId') productId: string
  ) {
    return await this.cartService.findByProductId(productId);
  }
}
