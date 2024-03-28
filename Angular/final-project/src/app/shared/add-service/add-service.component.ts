import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    name: [''],
    imageUrl: [''],
    price: [0],
    description: [''],
  });
}
