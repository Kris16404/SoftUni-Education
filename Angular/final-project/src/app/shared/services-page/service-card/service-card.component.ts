import { Component, Input } from '@angular/core';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
})
export class ServiceCardComponent {
  @Input() service = {} as Service;
}
