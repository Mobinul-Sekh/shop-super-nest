import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { VariantTypeEnum } from '../../schemas/variant.schema';

export class VariantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(VariantTypeEnum)
  readonly type: VariantTypeEnum;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly typeOptions: string[];
}
