import { IsNotEmpty, IsNumber, IsString,Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product Name' })
  @IsNotEmpty({ message: 'Product Name Required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Product Price Required' })
  @IsNumber()
  price: string;

  @IsNotEmpty({ message: 'Product Descripton Optional' })
  @IsString()
  @Length(0, 500)
  description: string;
}
