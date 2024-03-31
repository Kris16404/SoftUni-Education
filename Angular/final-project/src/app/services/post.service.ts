import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, from, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Service, ServiceForPostReq } from '../types/Service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserForAuth } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private services$$ = new BehaviorSubject<Service[] | undefined>(undefined);
  private service$ = this.services$$.asObservable();
  private authToken: string | undefined;
  services: Service[] | undefined;
  servicesSubscription: Subscription;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
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

  isOwner(id: string, user: UserForAuth) {
    let isOwner = false;
    let data: Service = {} as Service;
    return this.getCommunityServiceById(id).subscribe((dataCom) => {
      data = dataCom;
      if (data.id === user.id) {
        isOwner = true;
      }
      return isOwner;
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
  postService(data: ServiceForPostReq) {
    return from(this.db.list('/community').push(data));
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
  getCommunityServiceById(id: string | '') {
    const url = `${environment.databseUrl}/community/${id}.json`;
    return this.http.get<Service>(url);
  }
  getServiceById(id: string | '') {
    const url = `${environment.databseUrl}/services/${id}.json`;
    return this.http.get<Service>(url);
  }
  deleteCommunityServiceById(id: string) {
    return from(this.db.list('/community').remove(id));
  }
  updateCommunityServiceById(id: string, service: ServiceForPostReq) {
    return from(this.db.object(`/community/${id}`).update(service));
  }
}
