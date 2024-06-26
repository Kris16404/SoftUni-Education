import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../utils/match-pass-validator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserForAuth } from 'src/app/types/User';
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

  user: UserForAuth | undefined;
  isPassMatch = true;
  isRegisterFailed = false;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
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

  checkPasses() {
    if (
      this.form.get('passGroup')?.get('password')?.value !==
      this.form.get('passGroup')?.get('rePassword')?.value
    ) {
      this.isPassMatch = false;
      return;
    }
    this.isPassMatch = true;
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
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        () => {
          this.isRegisterFailed = true;
        }
      );
  }
}
