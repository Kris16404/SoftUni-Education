import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Service } from 'src/app/types/Service';
import { UserForAuth } from 'src/app/types/User';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
})
export class ServiceCardComponent {
  constructor(private router: Router) {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    } else {
      this.cart = undefined;
    }
  }
  @Input() service = {} as Service;
  exceptionRoutes: string[] = ['/refresh'];
  cart: string[] | undefined;
  handleDetails() {
    console.log(this.service);

    this.router.navigate(['/services', this.service.id]);
  }
  handleAddToCart() {
    this.cart?.push(this.service.id);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  checkIfAvailableInCart(): boolean {
    if (this.cart?.includes(this.service.id)) {
      return true;
    } else {
      return false;
    }
  }
  removeItemFromCart() {
    this.cart = this.cart?.filter((item) => item !== this.service.id);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));

    const currentRoute = this.router.url;

    if (!this.isExceptionRoute(currentRoute) && currentRoute === '/user/cart') {
      this.router
        .navigateByUrl('/refresh', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    }
  }

  isExceptionRoute(route: string): boolean {
    return this.exceptionRoutes.includes(route);
  }
  isOwner(): boolean {
    const session = sessionStorage.getItem('user');
    if (session) {
      const user: UserForAuth = JSON.parse(session);

      if (user.id === this.service.ownerId) {
        return true;
      }
      return false;
    }
    return false;
  }
}
