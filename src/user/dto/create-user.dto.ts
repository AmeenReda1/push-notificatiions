import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user Name',
    example: 'john deo',
  })
  @IsNotEmpty({ message: 'User Name Required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  @IsNotEmpty({ message: ' User Email Required' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
    example: 'test123',
  })
  @IsNotEmpty({ message: 'User Password Required' })
  @IsString()
  password: string;
}
