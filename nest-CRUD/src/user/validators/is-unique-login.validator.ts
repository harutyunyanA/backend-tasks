import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getUserByLogin } from '../db/db';

@ValidatorConstraint({ async: true })
export class UniqueLogin implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments) {
    const user = await getUserByLogin(value);
    return !user;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'login is busy';
  }
}
