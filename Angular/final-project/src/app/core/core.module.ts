import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { DegreesPipe } from './pipes/degrees.pipe';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, DegreesPipe],
  imports: [CommonModule, RouterModule],
  exports: [NavBarComponent, FooterComponent],
})
export class CoreModule {}
