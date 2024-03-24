import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private userService: UserService) {}

  logout() {
    this.userService
      .signOut()
      .then(() => {
        sessionStorage.clear();
      })
      .catch((err) => console.error(err));
  }
}
