import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueLogin } from '../validators/is-unique-login.validator';

export function IsLoginUnique(validationOptions?: ValidationOptions) {
  return function (target: any, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueLogin,
    });
  };
}
