import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProductDetailsDto {
  @IsNumber()
  @IsOptional()
  readonly productGSTPercent?: number;

  @IsNumber()
  @IsOptional()
  readonly productGST?: number;

  @IsString()
  @IsNotEmpty()
  readonly desc: string;

  @IsString()
  @IsOptional()
  readonly summary?: string;

  @IsString()
  @IsOptional()
  readonly features?: string;
}
