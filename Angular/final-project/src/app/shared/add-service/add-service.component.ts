import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { urlCheck } from '../utils/url-check-validator';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(5)]],
      imageUrl: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      termsCheckbox: [false, Validators.requiredTrue],
    },
    {
      validators: [urlCheck('imageUrl')],
    }
  );

  postService() {
    if (this.form.invalid) {
      return;
    }
  }
}
