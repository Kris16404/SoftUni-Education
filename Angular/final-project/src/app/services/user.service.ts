import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subscription, from, tap } from 'rxjs';
import { UserForAuth } from '../types/User';
@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!sessionStorage.getItem('user');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('user');
  }
  constructor(private afAuth: AngularFireAuth) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(email: string, password: string) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      tap(async (userCredential) => {
        const token = await userCredential.user?.getIdToken();
        const tempUser: UserForAuth = {
          email: userCredential.user?.email!,
          id: userCredential.user?.uid!,
          token: token!,
        };
        sessionStorage.setItem('user', JSON.stringify(tempUser));
        return this.user$$.next(tempUser);
      })
    );
  }
  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(async (userCredential) => {
        const token = await userCredential.user?.getIdToken();
        const tempUser: UserForAuth = {
          email: userCredential.user?.email!,
          id: userCredential.user?.uid!,
          token: token!,
        };
        sessionStorage.setItem('user', JSON.stringify(tempUser));
        return this.user$$.next(tempUser);
      })
    );
  }
  signOut() {
    return from(this.afAuth.signOut()).pipe(
      tap(() => this.user$$.next(undefined))
    );
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
