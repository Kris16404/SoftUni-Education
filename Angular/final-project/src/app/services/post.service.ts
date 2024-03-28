import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Service } from '../types/Service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private services$$ = new BehaviorSubject<Service[] | undefined>(undefined);
  private service$ = this.services$$.asObservable();
  private authToken: string | undefined;
  services: Service[] | undefined;
  servicesSubscription: Subscription;

  constructor(private http: HttpClient) {
    this.servicesSubscription = this.service$.subscribe((services) => {
      this.services = services;
    });
    const session = sessionStorage.getItem('user');
    if (session) {
      const authData = JSON.parse(session);
      this.authToken = authData.token;
    } else {
      this.authToken = undefined;
    }
  }

  getServices(): Observable<Service[]> {
    return this.http
      .get<Service[]>(`${environment.databseUrl}/services.json`)
      .pipe(
        tap((data) => {
          return this.services$$.next(data);
        })
      );
  }
  postService(data: any) {
    const session = sessionStorage.getItem('user');
    const authData = JSON.parse(session!);
    this.authToken = authData.token;
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authToken
    );
    return this.http
      .post<any>(`${environment.databseUrl}/community.json`, data, { headers })
      .pipe(tap((data) => console.log(data)));
  }
  getCommunityServices() {
    return this.http
      .get<Service[]>(`${environment.databseUrl}/community.json`)
      .pipe(
        tap((data) => {
          return this.services$$.next(data);
        })
      );
  }
}
