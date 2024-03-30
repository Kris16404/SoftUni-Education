import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
})
export class ServiceCardComponent {
  constructor(private router: Router) {}
  @Input() service = {} as Service;

  handleDetails() {
    console.log(this.service);

    this.router.navigate(['/services', this.service.id]);
  }
}
