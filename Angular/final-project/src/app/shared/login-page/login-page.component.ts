import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isFailedToLogin = false;

  updateFail() {
    this.isFailedToLogin = false;
  }
  login(): void {
    if (this.form.invalid) {
      return;
    }

    this.userService
      .login(this.form.get('email')?.value!, this.form.get('password')?.value!)
      .subscribe(
        () => this.router.navigate(['/']),
        (err) => {
          this.isFailedToLogin = true;
        }
      );
  }
}
