import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isAuthenticated: boolean;
  constructor(private userService: UserService) {
    this.isAuthenticated = this.userService.isLogged();
    console.log(this.isAuthenticated);
  }

  logout() {
    this.userService
      .signOut()
      .then(() => {
        sessionStorage.clear();
      })
      .catch((err) => console.error(err));
  }
}
