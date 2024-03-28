import { ValidatorFn } from '@angular/forms';

export function urlCheck(imageUrlControlName: string): ValidatorFn {
  return (control) => {
    const imageUrlControlValue = control.get(imageUrlControlName)?.value;
    const regex = new RegExp('^(https?|ftp)://[^s/$.?#].[^s]*$');
    const areMatching = regex.test(imageUrlControlValue);
    return areMatching ? null : { matchPasswordsValidator: true };
  };
}
