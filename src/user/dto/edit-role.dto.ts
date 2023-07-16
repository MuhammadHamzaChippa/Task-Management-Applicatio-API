import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditRole {
  @ApiProperty()
  @IsIn(['user', 'admin'])
  role: string;
}
