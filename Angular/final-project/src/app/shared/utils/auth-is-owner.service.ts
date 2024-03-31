import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class AuthIsOwnerService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Get the ID parameter from the URL
    const id = next.paramMap.get('serviceId');
    if (id) {
      const user = this.userService.getUser();
      if (user) {
        const isOwner = !!this.postService.isOwner(id, user);
        if (isOwner) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      }
      this.router.navigate(['/']);

      return false;
    } else {
      this.router.navigate(['/']);

      return false;
    }
  }
}
