import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Service } from 'src/app/types/Service';
import { UserForAuth } from 'src/app/types/User';

@Component({
  selector: 'app-service-details-page',
  templateUrl: './service-details-page.component.html',
  styleUrls: ['./service-details-page.component.css'],
})
export class ServiceDetailsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private postService: PostService) {
    const session = sessionStorage.getItem('user');
    if (session) {
      this.user = JSON.parse(session);
    } else {
      this.user = undefined;
    }
  }
  user: UserForAuth | undefined;
  service: Service = {} as Service;
  serviceId: string = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.serviceId = this.route.snapshot.params['serviceId'];
    this.postService
      .getCommunityServiceById(this.serviceId)
      .subscribe((data) => {
        if (this.isEmptyCheck(data)) {
          this.postService.getServiceById(this.serviceId).subscribe((data) => {
            this.service = data;
            this.service.id = this.serviceId;
            console.log(this.isLoading);

            this.isLoading = false;

            return;
          });

          return;
        }
        this.service = data;
        this.service.id = this.serviceId;
        this.isLoading = false;

        return;
      });
  }
  isEmptyCheck(obj: any) {
    if (obj === null || typeof obj === 'undefined') {
      return true;
    }
    if (typeof obj !== 'object') {
      return true;
    }
    return Object.keys(obj).length === 0;
  }
}
