import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComment {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
}
