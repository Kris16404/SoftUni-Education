import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Service } from '../../types/Service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  services: Service[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getServices().subscribe((data) => {
      console.log(data);

      this.services = data;
    });
  }
  printType() {
    console.log(typeof this.services);
    console.log(this.services);
  }
}
