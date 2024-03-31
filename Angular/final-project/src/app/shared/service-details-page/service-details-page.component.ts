import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Service } from 'src/app/types/Service';
import { UserForAuth } from 'src/app/types/User';

@Component({
  selector: 'app-service-details-page',
  templateUrl: './service-details-page.component.html',
  styleUrls: ['./service-details-page.component.css'],
})
export class ServiceDetailsPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {
    const session = sessionStorage.getItem('user');
    if (session) {
      this.user = JSON.parse(session);
    } else {
      this.user = undefined;
    }
  }
  exceptionRoutes: string[] = ['/refresh'];
  cart = JSON.parse(sessionStorage.getItem('cart')!) || undefined;
  user: UserForAuth | undefined;
  service: Service = {} as Service;
  serviceId: string = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.serviceId = this.route.snapshot.params['serviceId'];
    this.postService.getCommunityServiceById(this.serviceId).subscribe(
      (data) => {
        if (this.isEmptyCheck(data)) {
          this.postService.getServiceById(this.serviceId).subscribe(
            (data) => {
              this.service = data;
              this.service.id = this.serviceId;

              this.isLoading = false;

              return;
            },
            () => {
              this.router.navigate(['/services/catalog']);
            }
          );

          return;
        }
        this.service = data;
        this.service.id = this.serviceId;
        this.isLoading = false;

        return;
      },
      () => {
        this.router.navigate(['/services/catalog']);
      }
    );
  }
  checkIfAvailableInCart(): boolean {
    if (this.cart?.includes(this.service.id)) {
      return true;
    } else {
      return false;
    }
  }
  handleAddToCart() {
    this.cart = JSON.parse(sessionStorage.getItem('cart')!);
    this.cart.push(this.service.id);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  removeItemFromCart() {
    this.cart = this.cart?.filter((item: string) => item !== this.service.id);
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
  isEmptyCheck(obj: any) {
    if (obj === null || typeof obj === 'undefined') {
      return true;
    }
    if (typeof obj !== 'object') {
      return true;
    }
    return Object.keys(obj).length === 0;
  }
  handleDelete() {
    const isConfirmed = window.confirm(
      `Are You Sure You Want To DELETE ${this.service.name}`
    );
    if (isConfirmed) {
      this.postService
        .deleteCommunityServiceById(this.service.id)
        .subscribe(() => {
          this.router.navigate(['/services/catalog']);
        });
    }
  }
  redirectToEdit() {
    this.router.navigate([`/services/edit/${this.service.id}`]);
  }
}
