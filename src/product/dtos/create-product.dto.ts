import { IsString, IsNotEmpty, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDetailsDto } from '../../product-details/dtos/create-product-details.dto';
import { CategoryDto } from '../../category/dtos/createCategory.dto';

class RatingDto {
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsBoolean()
  readonly isAddedToCart?: boolean = false;

  @ValidateNested()
  @Type(() => RatingDto)
  readonly rating: RatingDto;

  @ValidateNested()
  @Type(() => ProductDetailsDto)
  readonly productDetailsData: ProductDetailsDto;

  @ValidateNested()
  @Type(() => CategoryDto)
  readonly categoryData: CategoryDto;
}
