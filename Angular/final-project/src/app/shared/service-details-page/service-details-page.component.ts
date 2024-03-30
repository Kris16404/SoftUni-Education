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
  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['serviceId'];
    this.postService
      .getCommunityServiceById(this.serviceId)
      .subscribe((data) => {
        this.service = data;
        this.service.id = this.serviceId;
        return;
      });
  }
}
