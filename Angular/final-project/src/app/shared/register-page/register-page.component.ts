import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../utils/match-pass-validator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]],
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
    this.userService
      .register(
        this.form.get('email')?.value!,
        this.form.get('passGroup')?.get('password')?.value!
      )
      .then((res) => console.log(res.user))
      .then(() => this.router.navigate(['/']))
      .catch((err) => console.error(err));
  }
}
