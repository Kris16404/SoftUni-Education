import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afAuth: AngularFireAuth) {}

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }
}
