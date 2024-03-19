import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  constructor(private postService: PostService) {}
  services: Service[] = [];
  ngOnInit(): void {
    this.postService.getServices().subscribe((data) => {
      console.log(data);

      Object.keys(data).forEach((key: any) => {
        const temp: Service = { id: key, ...data[key] };
        this.services.push(temp);
      });
    });
  }
}
