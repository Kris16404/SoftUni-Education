import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceForPostReq } from 'src/app/types/Service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    imageUrl: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^data:image/(jpeg|png|gif|bmp|webp);base64,([a-zA-Z0-9+/]+={0,2})(;base64)?'
        ),
      ],
    ],
    price: ['', [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    termsCheckbox: [false, Validators.requiredTrue],
  });

  log() {
    console.log(this.form.get('imageUrl')?.errors);
  }
  postSubmit() {
    if (this.form.invalid) {
      return;
    }
    const session = JSON.parse(sessionStorage.getItem('user')!);
    const userId = session.id;
    const tempService: ServiceForPostReq = {
      name: this.form.get('name')?.value!,
      imageUrl: this.form.get('imageUrl')?.value!,
      price: +this.form.get('price')?.value!,
      description: this.form.get('description')?.value!,
      ownerId: userId,
    };
    this.postService
      .postService(tempService)
      .subscribe(() => this.router.navigate(['/services/catalog']));
  }
}
