import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  isLoading: boolean = false;
  buttonState$$ = new BehaviorSubject<string>('right');
  buttonState$ = this.buttonState$$.asObservable();

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.communityServicesLoad();
  }
  ourServicesLoad() {
    this.isLoading = true;
    this.postService.getServices().subscribe((data) => {
      this.writeToServices(data);
      this.isLoading = false;
    });
  }
  communityServicesLoad() {
    this.isLoading = true;

    this.postService.getCommunityServices().subscribe((data) => {
      this.writeToServices(data);
      this.isLoading = false;
    });
  }

  writeToServices(data: any) {
    return Object.keys(data).forEach((key: any) => {
      const temp: Service = { id: key, ...data[key] };
      this.services.push(temp);
    });
  }

  toggleLeft() {
    this.services = [];
    this.ourServicesLoad();
    this.buttonState$$.next('left');
  }

  toggleRight() {
    this.services = [];
    this.communityServicesLoad();
    this.buttonState$$.next('right');
  }
}
