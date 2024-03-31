import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Service, ServiceForPostReq } from 'src/app/types/Service';

@Component({
  selector: 'app-edit-service-page',
  templateUrl: './edit-service-page.component.html',
  styleUrls: ['./edit-service-page.component.css'],
})
export class EditServicePageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  service: Service = {} as Service;
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
  ngOnInit(): void {
    const serviceId = this.route.snapshot.params['serviceId'];
    this.postService.getCommunityServiceById(serviceId).subscribe((data) => {
      this.service = data;
      this.service.id = serviceId;

      this.form.get('name')?.setValue(this.service.name);
      this.form.get('imageUrl')?.setValue(this.service.imageUrl);
      this.form.get('price')?.setValue(this.service.price.toString());
      this.form.get('description')?.setValue(this.service.description);
    });
  }

  editSubmit() {
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
      .updateCommunityServiceById(this.service.id, tempService)
      .subscribe(() => this.router.navigate(['/services/catalog']));
  }
}
