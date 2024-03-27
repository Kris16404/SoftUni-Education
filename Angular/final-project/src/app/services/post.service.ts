import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Service } from '../types/Service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private services$$ = new BehaviorSubject<Service[] | undefined>(undefined);
  private service$ = this.services$$.asObservable();
  services: Service[] | undefined;
  servicesSubscription: Subscription;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.servicesSubscription = this.service$.subscribe((services) => {
      this.services = services;
    });
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
  postService(data: any): Promise<void> {
    return this.db.object('services').set(data);
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
