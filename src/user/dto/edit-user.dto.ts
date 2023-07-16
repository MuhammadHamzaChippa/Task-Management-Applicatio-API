import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditUser {
  @IsOptional()
  @IsString()
  @ApiProperty()
  username?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;
}
