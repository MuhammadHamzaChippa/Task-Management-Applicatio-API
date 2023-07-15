import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUser {
  @IsOptional()
  @IsString()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
