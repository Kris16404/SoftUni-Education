import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { RegisterPageComponent } from './shared/register-page/register-page.component';
import { AboutUsPageComponent } from './shared/about-us-page/about-us-page.component';
import { ServicesComponent } from './shared/services-page/services.component';
import { HomePageComponent } from './shared/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'user/login',
    component: LoginPageComponent,
  },
  {
    path: 'user/register',
    component: RegisterPageComponent,
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
