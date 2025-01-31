import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { ResponseInterface } from 'src/error-handler/interfaces';
import { CategoryDto } from './dtos/createCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Post('create')
  async createCategory(
    @Body() body: Category
  ): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: "successfully created new category",
        data: await this.categoryService.createCategory(body)
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }
}
