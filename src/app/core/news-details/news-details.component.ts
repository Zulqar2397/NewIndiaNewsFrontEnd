import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsappService } from '../service/newsapp.service';
import { News } from 'src/app/shared/models/news';
import { Comment } from '../../shared/models/comment'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  news: News;
  updatedLikes: number;
  constructor(private newsService: NewsappService) { }

  ngOnInit(): void {
    this.newsService.newsSubjectAsObservable.subscribe(data => {
      this.news = data;
      this.updatedLikes = data?.likeCount;
      console.log(data);

    })
  }
  checkLike() {
    if (!this.myDiv.nativeElement.classList.contains('like-btn--disabled')) {
      this.updatedLikes = this.updatedLikes + 1;
      this.myDiv.nativeElement.disabled = true;
    }

  }
//Adding comment
commentGiven:Comment;
  commentDetails = new FormGroup({
    postedBy: new FormControl(),
    comment: new FormControl()
  });
  onSubmit()
  {
    this.commentGiven=new Comment();
    this.commentGiven.postedBy=this.commentDetails.value.postedBy;
    this.commentGiven.comment=this.commentDetails.value.comment;
    console.log(this.commentGiven);
    

  }

}
