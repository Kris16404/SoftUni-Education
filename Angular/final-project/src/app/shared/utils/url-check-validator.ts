import { ValidatorFn } from '@angular/forms';

export function urlCheck(imageUrlControlName: string): ValidatorFn {
  return (control) => {
    const imageUrlControlValue = control.get(imageUrlControlName)?.value;
    const regex = new RegExp(
      '^data:image/(jpeg|png|gif|bmp|webp);base64,([a-zA-Z0-9+/]+={0,2})(;base64)?'
    );
    const areMatching = regex.test(imageUrlControlValue);
    return areMatching ? null : { matchPasswordsValidator: true };
  };
}
