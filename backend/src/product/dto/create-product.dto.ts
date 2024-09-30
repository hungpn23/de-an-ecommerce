// src/dto/create-product.dto.ts
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayMinSize,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  is_best_seller: boolean;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsArray()
  @ArrayMinSize(1)
  categories: string[];

  @IsArray()
  sizes: string[];
}
