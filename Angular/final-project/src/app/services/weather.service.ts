import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Weather } from '../types/Weather';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weather$$ = new BehaviorSubject<any>(undefined);
  private weather$ = this.weather$$.asObservable();

  constructor(private http: HttpClient) {}
  getWeather(city: string) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.weatherApiKey}&units=metric`;
    return this.http.get<Weather>(apiUrl).pipe(
      tap((data) => {
        console.log(data);

        return this.weather$$.next(data);
      })
    );
  }
}
