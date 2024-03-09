import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFireDatabase) {}

  getServices(): Observable<any> {
    return this.db.list('services').valueChanges();
  }
  postService(data: any): Promise<void> {
    return this.db.object('services').set(data);
  }
}
