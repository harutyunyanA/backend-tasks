import { IsEmail, IsInt, IsString } from 'class-validator';
import { IsLoginUnique } from '../decorators/is-login-unique.decorator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsLoginUnique()
  login: string;
  @IsEmail()
  email: string;
  @IsInt()
  age: number;
}
