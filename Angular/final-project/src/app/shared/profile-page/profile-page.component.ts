import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  services: Service[] = [];
  user = JSON.parse(sessionStorage.getItem('user')!);
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getCommunityServices().subscribe((services) => {
      this.writeFilterdServices(services);
    });
  }
  writeFilterdServices(services: any) {
    Object.keys(services).forEach((key: any) => {
      const temp: Service = { id: key, ...services[key] };
      this.services.push(temp);
    });

    this.services = this.services.filter(
      (service) => service.ownerId === this.user.id
    );
  }
}
