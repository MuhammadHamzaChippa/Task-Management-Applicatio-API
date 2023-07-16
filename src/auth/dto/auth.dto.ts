import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  username?: string;

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  role?: string;
}
