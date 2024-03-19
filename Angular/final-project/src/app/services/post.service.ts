import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.databseUrl}/services.json`);
  }
  postService(data: any): Promise<void> {
    return this.db.object('services').set(data);
  }
}
