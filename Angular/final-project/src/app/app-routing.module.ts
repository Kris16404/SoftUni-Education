import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { RegisterPageComponent } from './shared/register-page/register-page.component';
import { AboutUsPageComponent } from './shared/about-us-page/about-us-page.component';
import { ServicesComponent } from './shared/services-page/services.component';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { CartPageComponent } from './shared/cart-page/cart-page.component';
import { ProfilePageComponent } from './shared/profile-page/profile-page.component';
import { AuthGuardService } from './shared/utils/auth-guard.service';
import { AuthRedirectGuardService } from './shared/utils/auth-redirect-guard.service';
import { AddServiceComponent } from './shared/add-service/add-service.component';
import { ServiceDetailsPageComponent } from './shared/service-details-page/service-details-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'user/login',
    component: LoginPageComponent,
    canActivate: [AuthRedirectGuardService],
  },
  {
    path: 'user/register',
    component: RegisterPageComponent,
    canActivate: [AuthRedirectGuardService],
  },
  {
    path: 'user/cart',
    component: CartPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user/profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'about-us',
    component: AboutUsPageComponent,
  },
  {
    path: 'services/catalog',
    component: ServicesComponent,
  },
  {
    path: 'services/add',
    component: AddServiceComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'services/:serviceId',
    component: ServiceDetailsPageComponent,
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },

  {
    path: '**',

    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
