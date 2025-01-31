import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantDocument } from 'src/schemas/variant.schema';
import { ResponseInterface } from 'src/error-handler/interfaces';

@Controller('variant')
export class VariantController {
  constructor(
    private readonly variantService: VariantService
  ) {}

  @Post('create')
  async createVariant(
    @Body() body: VariantDocument
  ): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: "successfully created new variant",
        data: await this.variantService.createVariant(body)
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }
}
