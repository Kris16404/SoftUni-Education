import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ServicesComponent } from './services-page/services.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServiceCardComponent } from './services-page/service-card/service-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceDetailsPageComponent } from './service-details-page/service-details-page.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
@NgModule({
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ServicesComponent,
    AboutUsPageComponent,
    ErrorPageComponent,
    ServiceCardComponent,
    CartPageComponent,
    ProfilePageComponent,
    AddServiceComponent,
    ServiceDetailsPageComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ServicesComponent,
    AboutUsPageComponent,
    ErrorPageComponent,
  ],
})
export class SharedModule {}
