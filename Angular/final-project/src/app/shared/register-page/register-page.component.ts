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
      .then((res) => {
        const user = res.user;
        const userId = user?.uid;
        const userEmail = user?.email;

        user?.getIdToken().then((token) => {
          this.user = {
            email: userEmail!,
            id: userId!,
            token: token!,
          };
          sessionStorage.setItem('user', JSON.stringify(user));
        });

        this.router.navigate(['/']);
      })
      .catch((err) => console.error(err));
  }
}
