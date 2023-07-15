import { IsIn } from 'class-validator';

export class EditRole {
  @IsIn(['user', 'admin'])
  role: string;
}
