import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/types/Weather';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private weatherService: WeatherService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  weather: Weather = {};
  ngOnInit(): void {
    this.weatherService
      .getWeather('sofia')
      .subscribe((res) => (this.weather = res));
    console.log(this.weather);
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
