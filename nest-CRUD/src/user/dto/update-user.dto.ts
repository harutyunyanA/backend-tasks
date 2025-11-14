import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';
import { IsLoginUnique } from '../decorators/is-login-unique.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;
  @IsString()
  @IsLoginUnique()
  login: string;
}
