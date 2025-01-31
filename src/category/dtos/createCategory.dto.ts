import { IsString, IsNotEmpty, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryTypeEnum } from '../../schemas/category.schema';
import { VariantDto } from '../../variant/dtos/createVariant.dto';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(CategoryTypeEnum)
  readonly type: CategoryTypeEnum;

  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  readonly variantsData: VariantDto[];
}
