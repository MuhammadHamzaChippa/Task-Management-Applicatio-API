import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTask {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dueDate?: Date;

  @IsOptional()
  @ApiProperty()
  @IsIn(['In Progress', 'Completed', 'Pending'])
  status?: string;

  @IsOptional()
  @ApiProperty()
  @IsIn(['High', 'Low', 'Medium'])
  priority?: string;
}
