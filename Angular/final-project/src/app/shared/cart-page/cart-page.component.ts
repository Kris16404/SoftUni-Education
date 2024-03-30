import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  constructor(private postService: PostService, private router: Router) {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    } else {
      this.cart = [];
    }
  }
  exceptionRoutes: string[] = ['/refresh'];
  services: Service[] = [];
  cart: string[];
  ngOnInit(): void {
    this.postService
      .getCommunityServices()
      .subscribe((services) => this.writeFilterdServices(services));
    this.postService
      .getServices()
      .subscribe((services) => this.writeFilterdServices(services));
  }

  writeFilterdServices(services: any) {
    Object.keys(services).forEach((key: any) => {
      const temp: Service = { id: key, ...services[key] };

      if (this.cart?.includes(temp.id)) {
        this.services.push(temp);
      } else {
      }
    });
  }
  handleCheckout() {
    const currentRoute = this.router.url;

    if (!this.isExceptionRoute(currentRoute) && currentRoute === '/user/cart') {
      this.router
        .navigateByUrl('/refresh', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    }

    this.cart = [];
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  isExceptionRoute(route: string): boolean {
    return this.exceptionRoutes.includes(route);
  }
}
