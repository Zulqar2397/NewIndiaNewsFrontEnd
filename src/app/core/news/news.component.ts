import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
event_list:string[]=["assets/images/img_h_1.jpg","assets/images/img_v_1.jpg"];
  constructor() { }

  ngOnInit(): void {
      
  }

}
