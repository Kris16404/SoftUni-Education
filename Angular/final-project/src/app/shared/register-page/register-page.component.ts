import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../utils/match-pass-validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
    termsCheckbox: [false, Validators.requiredTrue],
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
