import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [
    trigger('buttonState', [
      state(
        'left',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition('* => *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ServicesComponent implements OnInit {
  constructor(private postService: PostService) {}
  services: Service[] = [];
  buttonState: 'left' | 'right' = 'left';

  ngOnInit(): void {
    this.postService.getServices().subscribe((data) => {
      console.log(data);

      Object.keys(data).forEach((key: any) => {
        const temp: Service = { ...data[key] };
        this.services.push(temp);
      });
    });
  }

  toggleLeft() {
    this.buttonState = 'left';
  }

  toggleRight() {
    this.buttonState = 'right';
  }
}
