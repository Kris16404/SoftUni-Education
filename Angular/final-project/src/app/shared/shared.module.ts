import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ServicesComponent } from './services-page/services.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServiceCardComponent } from './services-page/service-card/service-card.component';

@NgModule({
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ServicesComponent,
    AboutUsPageComponent,
    ErrorPageComponent,
    ServiceCardComponent,
  ],
  imports: [CommonModule],
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
