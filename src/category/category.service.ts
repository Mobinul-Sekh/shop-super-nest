import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { CategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ){}

  async createCategory(categoryDto: Category): Promise<Category> {
    const createdCategory = new this.categoryModel(categoryDto);
    createdCategory.save();
    return createdCategory.id;
  }
}
