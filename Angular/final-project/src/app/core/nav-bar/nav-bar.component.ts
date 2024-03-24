import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  logout() {
    this.userService.signOut().subscribe({
      next: () => {
        this.router.navigate(['/user/login']);
        sessionStorage.clear();
      },
      error: () => {
        this.router.navigate(['/user/login']);
      },
    });
  }
}
